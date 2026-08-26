import handler from './api/backend.mjs';
const seen=[];
globalThis.fetch=async (url,opts={})=>{
  const u=new URL(String(url)); const h=opts.headers||{}; seen.push({url:u.href,headers:{...h}});
  if(u.pathname==='/student/detailed.php'){
    const ok=String(h.cookie||'').includes('sid=abc')&&String(h.cookie||'').includes('grp=ok')&&String(h.cookie||'').includes('book=ok')&&/personalrating\.php/.test(String(h.referer||''));
    return new Response(ok?'<html>detail ok</html>':'forbidden',{status:ok?200:403,headers:{'content-type':'text/html'}});
  }
  if(u.pathname==='/student/personalrating.php'){
    const ok=String(h.cookie||'').includes('sid=abc')&&String(h.cookie||'').includes('grp=ok');
    return new Response(ok?'<html>personal</html>':'forbidden',{status:ok?200:403,headers:{'set-cookie':'book=ok; Path=/'}});
  }
  if(u.pathname==='/student/rating.php'&&!u.search)return new Response('landing',{status:200,headers:{'set-cookie':'sid=abc; Path=/'}});
  if(u.pathname==='/student/rating.php'&&u.searchParams.get('groupid'))return new Response('group',{status:200,headers:{'set-cookie':'grp=ok; Path=/'}});
  return new Response('unexpected',{status:500});
};
const q='sem=0&userid=000099997&year=000000015&disciplineCode=000000246&controlCode=000000003&__mguu_groupid=000000230&__mguu_groupname=24%D0%93%D0%9C%D0%A3-%D0%A1%D0%9A%D0%A011.1';
const req={method:'GET',url:'/portal/student/detailed.php?'+q,headers:{host:'example.vercel.app','x-forwarded-proto':'https','user-agent':'Mozilla/5.0 iPhone'}};
let status=0,body=Buffer.alloc(0);const res={writeHead(s){status=s;},end(v){body=Buffer.isBuffer(v)?v:Buffer.from(String(v||''));}};
await handler(req,res);
if(status!==200||!body.toString().includes('detail ok'))throw new Error(`bad ${status} ${body}`);
if(seen.some(x=>x.url.includes('__mguu_')))throw new Error('proxy params leaked');
console.log('v0.38 detailed proxy chain test: OK');
