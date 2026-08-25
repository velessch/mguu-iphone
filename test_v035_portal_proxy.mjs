import assert from "node:assert/strict";

class MockHeaders{
  constructor(values={}){this.values=values;}
  get(name){return this.values[String(name).toLowerCase()]||null;}
  getSetCookie(){return this.values["set-cookie"]||[];}
}
function response(status,body,headers={}){
  return {status,headers:new MockHeaders(headers),arrayBuffer:async()=>Buffer.from(body||""),text:async()=>String(body||"")};
}
const {default:handler}=await import("./api/backend.mjs?test="+Date.now());
async function invoke(path){
  let status=0,headers={},chunks=[];
  const req={url:path,method:"GET",headers:{host:"example.vercel.app","x-forwarded-proto":"https","user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1","accept-language":"ru-RU,ru;q=0.9"}};
  const res={writeHead(s,h){status=s;headers=h||{};},end(x){if(x)chunks.push(Buffer.from(x));}};
  await handler(req,res);return {status,headers,body:Buffer.concat(chunks).toString()};
}

// personalrating.php: direct 403 -> rating landing -> retry with portal cookie and rating Referer.
{
  let calls=[];
  globalThis.fetch=async (url,opts={})=>{
    const u=String(url);calls.push({url:u,headers:opts.headers||{}});
    const personalCalls=calls.filter(x=>x.url.includes("personalrating.php")).length;
    if(u.includes("personalrating.php")&&personalCalls===1)return response(403,"forbidden");
    if(u.endsWith("/student/rating.php"))return response(200,"landing",{"set-cookie":["PHPSESSID=abc123; Path=/; HttpOnly"]});
    if(u.includes("personalrating.php")){
      assert.match(String(opts.headers["user-agent"]||""),/^Mozilla\/5\.0/);
      assert.equal(opts.headers.referer,"https://portal.mguu.ru/student/rating.php");
      assert.match(String(opts.headers.cookie||""),/PHPSESSID=abc123/);
      return response(200,"<html>rating ok</html>",{"content-type":"text/html; charset=utf-8"});
    }
    return response(200,"ok");
  };
  const out=await invoke("/portal/student/personalrating.php?userid=000097470&year=000000015&sem=0");
  assert.equal(out.status,200);assert.equal(out.body,"<html>rating ok</html>");assert.ok(calls.length>=3);
}

// detailed.php: direct 403 -> rating landing -> personalrating parent -> detailed retry.
{
  let calls=[];
  globalThis.fetch=async (url,opts={})=>{
    const u=String(url);calls.push({url:u,headers:opts.headers||{}});
    const detailedCalls=calls.filter(x=>x.url.includes("detailed.php")).length;
    if(u.includes("detailed.php")&&detailedCalls===1)return response(403,"forbidden");
    if(u.endsWith("/student/rating.php"))return response(200,"landing",{"set-cookie":["PHPSESSID=abc123; Path=/; HttpOnly"]});
    if(u.includes("personalrating.php")){
      assert.match(String(opts.headers.cookie||""),/PHPSESSID=abc123/);
      return response(200,"parent",{"set-cookie":["RATINGCTX=xyz; Path=/"]});
    }
    if(u.includes("detailed.php")){
      assert.match(String(opts.headers.cookie||""),/PHPSESSID=abc123/);
      assert.match(String(opts.headers.cookie||""),/RATINGCTX=xyz/);
      assert.match(String(opts.headers.referer||""),/personalrating\.php\?userid=000097470&year=000000015&sem=0/);
      return response(200,"<html>detail ok</html>",{"content-type":"text/html; charset=utf-8"});
    }
    return response(200,"ok");
  };
  const out=await invoke("/portal/student/detailed.php?userid=000097470&year=000000015&sem=0&disciplineCode=000000246");
  assert.equal(out.status,200);assert.equal(out.body,"<html>detail ok</html>");assert.ok(calls.length>=4);
}
console.log("portal proxy 403 fallback tests: OK");
