import {URL} from "node:url";

export const maxDuration = 60;

const APP_VERSION="0.45";
const LEGACY_SDO_COOKIE="mguu_sdo_session";
const ALLOWED_PORTAL=new Set(["/student/scheduler1.php","/student/rating.php","/student/personalrating.php","/student/detailed.php"]);

function send(res,status,body,type,headers){
  const out=Buffer.isBuffer(body)?body:Buffer.from(String(body==null?"":body));
  res.writeHead(status,Object.assign({
    "content-type":type||"text/plain; charset=utf-8",
    "content-length":out.length,
    "cache-control":"no-store",
    "x-content-type-options":"nosniff",
    "referrer-policy":"same-origin"
  },headers||{}));
  res.end(out);
}
function sendJson(res,status,value,headers){send(res,status,JSON.stringify(value),"application/json; charset=utf-8",headers);}
function clearLegacySdoCookie(){
  return `${LEGACY_SDO_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure`;
}

function portalUserAgent(req){
  const incoming=String(req&&req.headers&&req.headers["user-agent"]||"").trim();
  if(/^Mozilla\/5\.0/i.test(incoming))return incoming.slice(0,500);
  return "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
}
function portalGroupUrl(groupId,groupName){
  const u=new URL("https://portal.mguu.ru/student/rating.php");
  if(groupId)u.searchParams.set("groupid",String(groupId));
  if(groupName)u.searchParams.set("groupname",String(groupName));
  return u;
}
function portalRefererFor(target,context){
  context=context||{};
  const groupUrl=portalGroupUrl(context.groupId,context.groupName).href;
  if(/\/student\/detailed\.php$/i.test(target.pathname)){
    const parent=new URL("https://portal.mguu.ru/student/personalrating.php");
    for(const key of ["userid","year","sem"]){const value=target.searchParams.get(key);if(value!=null&&value!=="")parent.searchParams.set(key,value);}
    return parent.href;
  }
  if(/\/student\/personalrating\.php$/i.test(target.pathname))return context.groupId?groupUrl:"https://portal.mguu.ru/student/rating.php";
  return "https://portal.mguu.ru/student/";
}
function portalSetCookies(headers){
  if(!headers)return [];
  try{if(typeof headers.getSetCookie==="function")return headers.getSetCookie().filter(Boolean);}catch(e){}
  const raw=headers.get&&headers.get("set-cookie");
  if(!raw)return [];
  // Node runtimes that flatten Set-Cookie need a conservative split that does
  // not break the comma inside an Expires attribute.
  return String(raw).split(/,(?=\s*[!#$%&'*+.^_`|~0-9A-Za-z-]+=)/g).map(x=>x.trim()).filter(Boolean);
}
function portalMergeCookies(base,setCookies){
  const jar=new Map();
  String(base||"").split(";").forEach(part=>{const i=part.indexOf("=");if(i>0)jar.set(part.slice(0,i).trim(),part.slice(i+1).trim());});
  for(const raw of setCookies||[]){const first=String(raw||"").split(";",1)[0],i=first.indexOf("=");if(i>0)jar.set(first.slice(0,i).trim(),first.slice(i+1).trim());}
  return Array.from(jar.entries()).map(([k,v])=>k+"="+v).join("; ");
}
function portalHeaders(req,target,cookie,referer){
  const h={
    "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "accept-language":String(req&&req.headers&&req.headers["accept-language"]||"ru-RU,ru;q=0.9,en-US;q=0.7,en;q=0.6").slice(0,300),
    "cache-control":"no-cache",
    "pragma":"no-cache",
    "upgrade-insecure-requests":"1",
    "sec-fetch-dest":"document",
    "sec-fetch-mode":"navigate",
    "sec-fetch-site":"same-origin",
    "sec-fetch-user":"?1",
    "user-agent":portalUserAgent(req),
    "referer":referer||"https://portal.mguu.ru/student/"
  };
  if(cookie)h.cookie=cookie;
  return h;
}
async function portalFetchOnce(target,req,signal,cookie,referer){
  return await fetch(target,{method:"GET",redirect:"manual",signal,headers:portalHeaders(req,target,cookie,referer)});
}
async function portalFetchFollow(target,req,signal,cookie,referer,maxRedirects=6){
  let current=new URL(target),jar=String(cookie||""),ref=referer||"https://portal.mguu.ru/student/";
  for(let i=0;i<=maxRedirects;i++){
    const response=await portalFetchOnce(current,req,signal,jar,ref);
    jar=portalMergeCookies(jar,portalSetCookies(response.headers));
    if(response.status>=300&&response.status<400){
      const location=response.headers.get("location");
      if(!location)return {response,cookie:jar,finalUrl:current};
      try{await response.arrayBuffer();}catch(e){}
      const next=new URL(location,current);
      // Never follow a portal redirect to a different host.
      if(next.origin!=="https://portal.mguu.ru")return {response,cookie:jar,finalUrl:current};
      ref=current.href;current=next;continue;
    }
    return {response,cookie:jar,finalUrl:current};
  }
  throw Object.assign(new Error("Слишком много перенаправлений портала"),{status:502});
}
async function portalPrimeAndRetry(target,req,signal,context){
  context=context||{};
  let cookie="";
  // Reproduce the real navigation chain instead of jumping directly to a
  // student's personal page: Rating -> selected group -> gradebook.
  const landingUrl=new URL("https://portal.mguu.ru/student/rating.php");
  let step=await portalFetchFollow(landingUrl,req,signal,cookie,"https://portal.mguu.ru/student/");
  cookie=step.cookie;
  try{await step.response.arrayBuffer();}catch(e){}

  let groupRef=landingUrl.href;
  if(context.groupId){
    const groupUrl=portalGroupUrl(context.groupId,context.groupName);
    step=await portalFetchFollow(groupUrl,req,signal,cookie,landingUrl.href);
    cookie=step.cookie;
    try{await step.response.arrayBuffer();}catch(e){}
    groupRef=groupUrl.href;
  }

  let referer=groupRef;
  if(/\/student\/detailed\.php$/i.test(target.pathname)){
    const parent=new URL("https://portal.mguu.ru/student/personalrating.php");
    for(const key of ["userid","year","sem"]){const value=target.searchParams.get(key);if(value!=null&&value!=="")parent.searchParams.set(key,value);}
    step=await portalFetchFollow(parent,req,signal,cookie,groupRef);
    cookie=step.cookie;
    try{await step.response.arrayBuffer();}catch(e){}
    referer=parent.href;
  }
  return await portalFetchFollow(target,req,signal,cookie,referer);
}
async function proxyPortal(req,res,url){
  const portalPath=url.pathname.slice("/portal".length);
  if(!ALLOWED_PORTAL.has(portalPath)){send(res,404,"Недоступный адрес портала");return;}

  // These parameters belong only to our proxy. They are deliberately removed
  // before forwarding the URL to portal.mguu.ru.
  const context={
    groupId:String(url.searchParams.get("__mguu_groupid")||""),
    groupName:String(url.searchParams.get("__mguu_groupname")||""),
    forcePrime:url.searchParams.get("__mguu_forceprime")==="1"
  };
  const target=new URL("https://portal.mguu.ru"+portalPath);
  url.searchParams.forEach((value,key)=>{if(!key.startsWith("__mguu_"))target.searchParams.append(key,value);});

  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),30000);
  let stage="direct";
  try{
    let result;
    if(context.forcePrime&&(/\/student\/(?:personalrating|detailed)\.php$/i.test(target.pathname))){
      stage="forced-prime";
      result=await portalPrimeAndRetry(target,req,controller.signal,context);
    }else{
      result=await portalFetchFollow(target,req,controller.signal,"",portalRefererFor(target,context));
      if(result.response.status===403&&(/\/student\/(?:personalrating|detailed)\.php$/i.test(target.pathname))){
        try{await result.response.arrayBuffer();}catch(e){}
        stage=context.groupId?"group-prime":"landing-prime";
        result=await portalPrimeAndRetry(target,req,controller.signal,context);
      }
    }
    let upstream=result.response;
    const data=Buffer.from(await upstream.arrayBuffer());
    res.writeHead(upstream.status,{
      "content-type":upstream.headers.get("content-type")||"text/html; charset=utf-8",
      "cache-control":"no-store, no-cache, must-revalidate",
      "pragma":"no-cache",
      "x-content-type-options":"nosniff",
      "x-mguu-portal-status":String(upstream.status),
      "x-mguu-portal-stage":stage,
      "x-mguu-portal-final":String(result.finalUrl&&result.finalUrl.pathname||target.pathname)
    });
    res.end(data);
  }catch(err){
    send(res,502,"Портал МГУУ временно недоступен: "+(err&&err.name==="AbortError"?"превышено время ожидания":"ошибка соединения"),"text/plain; charset=utf-8",{"x-mguu-portal-stage":stage});
  }
  finally{clearTimeout(timer);}
}
function routedUrl(req){
  const internal=new URL(req.url||"/","http://localhost");
  let route="";
  if(req.query&&req.query.route!=null)route=Array.isArray(req.query.route)?req.query.route.join("/"):String(req.query.route);
  if(!route)route=internal.searchParams.get("route")||"";
  const pathname=route?"/"+route.replace(/^\/+/,""):internal.pathname;
  const out=new URL(pathname,"http://localhost");
  internal.searchParams.forEach((value,key)=>{if(key!=="route")out.searchParams.append(key,value);});
  return out;
}

export default async function handler(req,res){
  const url=routedUrl(req);
  if(url.pathname==="/api/health"&&req.method==="GET"){
    sendJson(res,200,{ok:true,version:APP_VERSION,platform:"vercel",ratingProxy:true,sdo:false},{"set-cookie":clearLegacySdoCookie()});return;
  }
  if(req.method!=="GET"&&req.method!=="HEAD"){send(res,405,"Метод не поддерживается");return;}
  if(url.pathname.startsWith("/portal/")){await proxyPortal(req,res,url);return;}
  sendJson(res,404,{ok:false,error:"Маршрут backend не найден",path:url.pathname});
}
