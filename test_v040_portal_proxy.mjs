import handler from './api/backend.mjs';

const seen=[];
globalThis.fetch=async (url,opts={})=>{
  const u=new URL(String(url));
  seen.push({url:u.href,headers:Object.fromEntries(Object.entries(opts.headers||{}))});
  const h=opts.headers||{};
  if(u.pathname==='/student/personalrating.php'){
    const ok=String(h.cookie||'').includes('sid=abc')&&String(h.cookie||'').includes('grp=ok')&&/groupid=000000230/.test(String(h.referer||''));
    return new Response(ok?'<html>rating ok</html>':'forbidden',{status:ok?200:403,headers:{'content-type':'text/html'}});
  }
  if(u.pathname==='/student/rating.php'&&!u.search){
    return new Response('<html>landing</html>',{status:200,headers:{'set-cookie':'sid=abc; Path=/; HttpOnly'}});
  }
  if(u.pathname==='/student/rating.php'&&u.searchParams.get('groupid')==='000000230'){
    const ok=String(h.cookie||'').includes('sid=abc');
    return new Response(ok?'<html>group</html>':'bad cookie',{status:ok?200:403,headers:{'set-cookie':'grp=ok; Path=/'}});
  }
  return new Response('unexpected',{status:500});
};

const req={method:'GET',url:'/portal/student/personalrating.php?sem=0&userid=000099997&year=000000015&__mguu_groupid=000000230&__mguu_groupname=24%D0%93%D0%9C%D0%A3-%D0%A1%D0%9A%D0%A011.1',headers:{host:'example.vercel.app','x-forwarded-proto':'https','user-agent':'Mozilla/5.0 iPhone','accept-language':'ru-RU'}};
let status=0,headers={},body=Buffer.alloc(0);
const res={writeHead(s,h){status=s;headers=h||{};},end(v){body=Buffer.isBuffer(v)?v:Buffer.from(String(v||''));}};
await handler(req,res);
if(status!==200)throw new Error('expected 200, got '+status+' body='+body.toString());
if(!body.toString().includes('rating ok'))throw new Error('wrong body');
if(seen.some(x=>x.url.includes('__mguu_')))throw new Error('internal proxy params leaked upstream');
if(!seen.some(x=>/rating\.php\?groupid=000000230/.test(x.url)))throw new Error('group page was not primed');
console.log('v0.40 portal proxy chain test: OK');
console.log(seen.map((x,i)=>`${i+1}. ${x.url} ref=${x.headers.referer||''} cookie=${x.headers.cookie||''}`).join('\n'));
