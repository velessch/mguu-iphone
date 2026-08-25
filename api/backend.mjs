import crypto from "node:crypto";
import {URL} from "node:url";

export const maxDuration = 60;

const APP_VERSION="0.35";
const SDO_BASE_URL=new URL(process.env.MGUU_SDO_BASE_URL||"https://online.mguu.ru/");
const COOKIE_NAME="mguu_sdo_session";
const COOKIE_AGE=30*24*60*60;
const suppliedSecret=String(process.env.MGUU_SESSION_SECRET||"");
const sessionKey=suppliedSecret?crypto.createHash("sha256").update(suppliedSecret).digest():null;
if(!suppliedSecret)console.warn("MGUU_SESSION_SECRET is not set: SDO login is disabled until it is configured in Vercel.");

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
function parseCookies(req){
  const out={};
  String(req.headers.cookie||"").split(";").forEach(part=>{const i=part.indexOf("=");if(i<0)return;out[part.slice(0,i).trim()]=decodeURIComponent(part.slice(i+1).trim());});
  return out;
}
function cookieHeader(value,maxAge){
  const secure=process.env.VERCEL==="1"||process.env.NODE_ENV==="production";
  return `${COOKIE_NAME}=${encodeURIComponent(value||"")}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.max(0,maxAge|0)}${secure?"; Secure":""}`;
}
function sealSession(payload){
  if(!sessionKey)throw Object.assign(new Error("MGUU_SESSION_SECRET не настроен в Vercel"),{status:503,code:"secret_not_configured"});
  const iv=crypto.randomBytes(12);
  const cipher=crypto.createCipheriv("aes-256-gcm",sessionKey,iv);
  const plain=Buffer.from(JSON.stringify(payload),"utf8");
  const encrypted=Buffer.concat([cipher.update(plain),cipher.final()]);
  const tag=cipher.getAuthTag();
  return Buffer.concat([iv,tag,encrypted]).toString("base64url");
}
function openSession(value){
  if(!sessionKey)return null;
  try{
    const raw=Buffer.from(String(value||""),"base64url");
    if(raw.length<29)return null;
    const iv=raw.subarray(0,12),tag=raw.subarray(12,28),encrypted=raw.subarray(28);
    const decipher=crypto.createDecipheriv("aes-256-gcm",sessionKey,iv);decipher.setAuthTag(tag);
    const payload=JSON.parse(Buffer.concat([decipher.update(encrypted),decipher.final()]).toString("utf8"));
    if(!payload||!payload.token||!payload.createdAt)return null;
    if(Date.now()-Number(payload.createdAt)>COOKIE_AGE*1000)return null;
    return payload;
  }catch(e){return null;}
}
function getSession(req){return openSession(parseCookies(req)[COOKIE_NAME]);}
function requestOrigin(req){
  const proto=String(req.headers["x-forwarded-proto"]||"http").split(",")[0].trim();
  return `${proto}://${req.headers.host||"localhost"}`;
}
function sameOrigin(req){const origin=req.headers.origin;if(!origin)return true;return origin===requestOrigin(req);}
async function readJsonBody(req,limit=16384){
  if(req.body!=null){
    if(typeof req.body==="object"&&!Buffer.isBuffer(req.body))return req.body;
    const text=Buffer.isBuffer(req.body)?req.body.toString("utf8"):String(req.body||"");
    if(Buffer.byteLength(text)>limit)throw Object.assign(new Error("Слишком большой запрос"),{status:413});
    try{return text?JSON.parse(text):{};}catch(e){throw Object.assign(new Error("Некорректный JSON"),{status:400});}
  }
  return await new Promise((resolve,reject)=>{
    let size=0,chunks=[];
    req.on("data",chunk=>{size+=chunk.length;if(size>limit){reject(Object.assign(new Error("Слишком большой запрос"),{status:413}));return;}chunks.push(chunk);});
    req.on("end",()=>{try{const text=Buffer.concat(chunks).toString("utf8");resolve(text?JSON.parse(text):{});}catch(e){reject(Object.assign(new Error("Некорректный JSON"),{status:400}));}});
    req.on("error",reject);
  });
}
function timeoutSignal(ms){const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),ms);return {signal:controller.signal,clear:()=>clearTimeout(timer)};}
async function fetchJson(url,options,timeout=25000){
  const t=timeoutSignal(timeout);
  try{
    const response=await fetch(url,Object.assign({},options||{},{signal:t.signal}));
    const text=await response.text();
    let data;try{data=JSON.parse(text);}catch(e){throw Object.assign(new Error("СДО вернула неожиданный ответ"),{status:502,upstreamStatus:response.status});}
    if(!response.ok)throw Object.assign(new Error("СДО временно недоступна"),{status:502,upstreamStatus:response.status,data});
    return data;
  }catch(err){
    if(err&&err.name==="AbortError")throw Object.assign(new Error("СДО не ответила вовремя"),{status:504});
    throw err;
  }finally{t.clear();}
}
function moodleError(data){
  if(!data||typeof data!=="object")return null;
  if(data.exception||data.errorcode||data.error){
    const code=String(data.errorcode||"");
    let message=String(data.message||data.error||"Ошибка СДО");
    if(code==="invalidtoken")message="Сеанс СДО закончился. Войдите снова.";
    if(code==="invalidlogin")message="Неверный логин или пароль.";
    if(code==="servicenotavailable"||code==="webservicenotavailable")message="Мобильный доступ СДО отключён администратором.";
    const err=Object.assign(new Error(message),{status:code==="invalidtoken"?401:502,code,data});
    return err;
  }
  return null;
}
function appendParam(search,key,value){
  if(value==null)return;
  if(Array.isArray(value)){value.forEach((item,i)=>appendParam(search,`${key}[${i}]`,item));return;}
  if(typeof value==="object"){Object.keys(value).forEach(k=>appendParam(search,`${key}[${k}]`,value[k]));return;}
  search.append(key,String(value));
}
async function moodleCall(token,wsfunction,params){
  const body=new URLSearchParams();
  body.set("wstoken",token);body.set("wsfunction",wsfunction);body.set("moodlewsrestformat","json");body.set("moodlewssettinglang","ru");
  Object.keys(params||{}).forEach(k=>appendParam(body,k,params[k]));
  const target=new URL("webservice/rest/server.php",SDO_BASE_URL);
  const data=await fetchJson(target,{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded;charset=UTF-8","accept":"application/json","user-agent":`MGUU-Web/${APP_VERSION} (+SDO)`},body});
  const problem=moodleError(data);if(problem)throw problem;
  return data;
}
async function getSdoToken(username,password){
  const body=new URLSearchParams({username,password,service:"moodle_mobile_app"});
  const target=new URL("login/token.php",SDO_BASE_URL);
  const data=await fetchJson(target,{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded;charset=UTF-8","accept":"application/json","user-agent":`MGUU-Web/${APP_VERSION} (+SDO login)`},body});
  const problem=moodleError(data);if(problem)throw problem;
  if(!data||!data.token)throw Object.assign(new Error("СДО не выдала мобильный токен. Возможно, мобильный API отключён."),{status:502,code:"no_token"});
  return data;
}
function stripHtml(value){return String(value||"").replace(/<script[\s\S]*?<\/script>/gi,"").replace(/<style[\s\S]*?<\/style>/gi,"").replace(/<[^>]+>/g," ").replace(/&nbsp;/gi," ").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&quot;/gi,'"').replace(/&#39;/gi,"'").replace(/\s+/g," ").trim();}
function safeSdoUrl(value,fallbackPath){
  try{
    const u=new URL(value||fallbackPath||"/",SDO_BASE_URL);
    if(u.origin!==SDO_BASE_URL.origin)return new URL(fallbackPath||"/",SDO_BASE_URL).href;
    u.protocol="https:";
    return u.href;
  }catch(e){return new URL(fallbackPath||"/",SDO_BASE_URL).href;}
}
async function optionalCall(token,name,params){try{return {ok:true,data:await moodleCall(token,name,params)};}catch(err){return {ok:false,error:err};}}
function normalizeAssignments(raw,coursesById){
  const out=[];
  for(const course of (raw&&raw.courses)||[]){
    const courseName=course.fullname||(coursesById.get(Number(course.id))||{}).fullname||"Курс";
    for(const item of course.assignments||[]){
      out.push({
        id:Number(item.id)||0,cmid:Number(item.cmid)||0,courseId:Number(course.id)||Number(item.course)||0,courseName,
        name:String(item.name||"Задание"),intro:stripHtml(item.intro),dueDate:Number(item.duedate)||0,cutoffDate:Number(item.cutoffdate)||0,
        allowFrom:Number(item.allowsubmissionsfromdate)||0,submissionDrafts:!!item.submissiondrafts,
        url:safeSdoUrl("",`/mod/assign/view.php?id=${Number(item.cmid)||0}`)
      });
    }
  }
  return out.sort((a,b)=>(a.dueDate||Number.MAX_SAFE_INTEGER)-(b.dueDate||Number.MAX_SAFE_INTEGER));
}
function normalizeCalendar(raw){
  const events=Array.isArray(raw)?raw:(raw&&raw.events)||[];
  return events.map(item=>({
    id:Number(item.id)||0,name:String(item.name||"Событие"),description:stripHtml(item.description),courseId:Number(item.courseid)||0,
    moduleName:String(item.modulename||""),timeStart:Number(item.timestart)||0,timeDuration:Number(item.timeduration)||0,
    url:safeSdoUrl(item.url,item.modulename&&item.instance?`/mod/${item.modulename}/view.php?id=${item.instance}`:"/calendar/view.php")
  })).sort((a,b)=>a.timeStart-b.timeStart);
}
function normalizeGrades(raw,coursesById){
  const list=Array.isArray(raw)?raw:(raw&&raw.grades)||[];
  return list.map(item=>({
    courseId:Number(item.courseid)||0,courseName:String(item.coursefullname||(coursesById.get(Number(item.courseid))||{}).fullname||"Курс"),
    grade:String(item.grade||item.gradeformatted||"—"),rawGrade:item.rawgrade==null?null:Number(item.rawgrade),rank:String(item.rank||""),
    url:safeSdoUrl("",`/grade/report/overview/index.php`)
  }));
}
async function buildDashboard(session){
  const site=await moodleCall(session.token,"core_webservice_get_site_info",{});
  const userId=Number(site.userid)||0;
  const coursesRaw=await moodleCall(session.token,"core_enrol_get_users_courses",{userid:userId});
  const courses=(Array.isArray(coursesRaw)?coursesRaw:[]).map(c=>({
    id:Number(c.id)||0,shortName:String(c.shortname||""),fullName:String(c.fullname||c.displayname||"Курс"),
    summary:stripHtml(c.summary),startDate:Number(c.startdate)||0,endDate:Number(c.enddate)||0,progress:c.progress==null?null:Number(c.progress),
    url:safeSdoUrl("",`/course/view.php?id=${Number(c.id)||0}`)
  }));
  const coursesById=new Map(courses.map(c=>[c.id,{fullname:c.fullName}]));
  const courseIds=courses.slice(0,80).map(c=>c.id).filter(Boolean);
  const now=Math.floor(Date.now()/1000),future=now+180*24*60*60;
  const [assignmentsResult,calendarResult,gradesResult]=await Promise.all([
    courseIds.length?optionalCall(session.token,"mod_assign_get_assignments",{courseids:courseIds}):Promise.resolve({ok:true,data:{courses:[]}}),
    optionalCall(session.token,"core_calendar_get_calendar_events",{events:{courseids:courseIds},options:{userevents:1,siteevents:0,timestart:now-7*24*60*60,timeend:future,ignorehidden:1}}),
    optionalCall(session.token,"gradereport_overview_get_course_grades",{userid:userId})
  ]);
  return {
    user:{id:userId,fullName:String(site.fullname||site.username||session.username||"Студент"),userName:String(site.username||session.username||""),siteName:String(site.sitename||"СДО МГУУ")},
    siteUrl:SDO_BASE_URL.href,
    courses,
    assignments:assignmentsResult.ok?normalizeAssignments(assignmentsResult.data,coursesById):[],
    calendarEvents:calendarResult.ok?normalizeCalendar(calendarResult.data):[],
    grades:gradesResult.ok?normalizeGrades(gradesResult.data,coursesById):[],
    partial:{assignments:!assignmentsResult.ok,calendar:!calendarResult.ok,grades:!gradesResult.ok},
    updatedAt:new Date().toISOString()
  };
}
async function buildCourse(session,courseId){
  const site=await moodleCall(session.token,"core_webservice_get_site_info",{});const userId=Number(site.userid)||0;
  const [contentsResult,gradesResult]=await Promise.all([
    optionalCall(session.token,"core_course_get_contents",{courseid:courseId}),
    optionalCall(session.token,"gradereport_user_get_grade_items",{courseid:courseId,userid:userId})
  ]);
  const sections=[];
  if(contentsResult.ok){
    for(const section of Array.isArray(contentsResult.data)?contentsResult.data:[]){
      const modules=(section.modules||[]).map(m=>({id:Number(m.id)||0,name:String(m.name||"Материал"),moduleName:String(m.modname||""),description:stripHtml(m.description),url:safeSdoUrl(m.url,m.id?`/mod/${m.modname||"resource"}/view.php?id=${m.id}`:`/course/view.php?id=${courseId}`),visible:m.visible!==0}));
      if(modules.length)sections.push({id:Number(section.id)||0,name:String(section.name||"Раздел"),summary:stripHtml(section.summary),modules});
    }
  }
  const gradeItems=[];
  if(gradesResult.ok){
    const users=gradesResult.data&&gradesResult.data.usergrades||[];
    for(const item of users[0]&&users[0].gradeitems||[]){
      if(!item.itemname&&!item.gradeformatted)continue;
      gradeItems.push({name:String(item.itemname||item.itemmodule||"Оценка"),grade:String(item.gradeformatted||"—"),percentage:String(item.percentageformatted||""),feedback:stripHtml(item.feedback),module:String(item.itemmodule||"")});
    }
  }
  return {courseId,sections,gradeItems,partial:{contents:!contentsResult.ok,grades:!gradesResult.ok},url:safeSdoUrl("",`/course/view.php?id=${courseId}`)};
}
function portalUserAgent(req){
  const incoming=String(req&&req.headers&&req.headers["user-agent"]||"").trim();
  if(/^Mozilla\/5\.0/i.test(incoming))return incoming.slice(0,500);
  return "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
}
function portalRefererFor(target){
  if(/\/student\/detailed\.php$/i.test(target.pathname)){
    const parent=new URL("https://portal.mguu.ru/student/personalrating.php");
    for(const key of ["userid","year","sem"]){const value=target.searchParams.get(key);if(value!=null&&value!=="")parent.searchParams.set(key,value);}
    return parent.href;
  }
  if(/\/student\/personalrating\.php$/i.test(target.pathname))return "https://portal.mguu.ru/student/rating.php";
  return "https://portal.mguu.ru/student/";
}
function portalSetCookies(headers){
  if(!headers)return [];
  try{if(typeof headers.getSetCookie==="function")return headers.getSetCookie().filter(Boolean);}catch(e){}
  const raw=headers.get&&headers.get("set-cookie");return raw?[raw]:[];
}
function portalMergeCookies(base,setCookies){
  const jar=new Map();
  String(base||"").split(";").forEach(part=>{const i=part.indexOf("=");if(i>0)jar.set(part.slice(0,i).trim(),part.slice(i+1).trim());});
  for(const raw of setCookies||[]){const first=String(raw||"").split(";",1)[0],i=first.indexOf("=");if(i>0)jar.set(first.slice(0,i).trim(),first.slice(i+1).trim());}
  return Array.from(jar.entries()).map(([k,v])=>k+"="+v).join("; ");
}
function portalHeaders(req,target,cookie,referer){
  const h={
    "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "accept-language":String(req&&req.headers&&req.headers["accept-language"]||"ru-RU,ru;q=0.9,en;q=0.7").slice(0,300),
    "cache-control":"no-cache",
    "pragma":"no-cache",
    "upgrade-insecure-requests":"1",
    "user-agent":portalUserAgent(req),
    "referer":referer||portalRefererFor(target)
  };
  if(cookie)h.cookie=cookie;
  return h;
}
async function portalFetch(target,req,signal,cookie,referer){
  return await fetch(target,{method:"GET",redirect:"follow",signal,headers:portalHeaders(req,target,cookie,referer)});
}
async function portalPrimeAndRetry(target,req,signal){
  let cookie="";
  const ratingLanding=new URL("https://portal.mguu.ru/student/rating.php");
  const landing=await portalFetch(ratingLanding,req,signal,cookie,"https://portal.mguu.ru/student/");
  cookie=portalMergeCookies(cookie,portalSetCookies(landing.headers));
  try{await landing.arrayBuffer();}catch(e){}

  let referer="https://portal.mguu.ru/student/rating.php";
  if(/\/student\/detailed\.php$/i.test(target.pathname)){
    const parent=new URL("https://portal.mguu.ru/student/personalrating.php");
    for(const key of ["userid","year","sem"]){const value=target.searchParams.get(key);if(value!=null&&value!=="")parent.searchParams.set(key,value);}
    const parentResponse=await portalFetch(parent,req,signal,cookie,"https://portal.mguu.ru/student/rating.php");
    cookie=portalMergeCookies(cookie,portalSetCookies(parentResponse.headers));
    try{await parentResponse.arrayBuffer();}catch(e){}
    referer=parent.href;
  }
  return await portalFetch(target,req,signal,cookie,referer);
}
async function proxyPortal(req,res,url){
  const portalPath=url.pathname.slice("/portal".length);
  if(!ALLOWED_PORTAL.has(portalPath)){send(res,404,"Недоступный адрес портала");return;}
  const target=new URL("https://portal.mguu.ru"+portalPath+url.search);
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),25000);
  try{
    let upstream=await portalFetch(target,req,controller.signal,"",portalRefererFor(target));
    if(upstream.status===403&&(/\/student\/(?:personalrating|detailed)\.php$/i.test(target.pathname))){
      try{await upstream.arrayBuffer();}catch(e){}
      upstream=await portalPrimeAndRetry(target,req,controller.signal);
    }
    const data=Buffer.from(await upstream.arrayBuffer());
    res.writeHead(upstream.status,{
      "content-type":upstream.headers.get("content-type")||"text/html; charset=utf-8",
      "cache-control":"no-store, no-cache, must-revalidate",
      "pragma":"no-cache",
      "x-content-type-options":"nosniff",
      "x-mguu-portal-status":String(upstream.status)
    });
    res.end(data);
  }catch(err){send(res,502,"Портал МГУУ временно недоступен: "+(err&&err.name==="AbortError"?"превышено время ожидания":"ошибка соединения"));}
  finally{clearTimeout(timer);}
}
async function handleSdo(req,res,url){
  if(!sameOrigin(req)){sendJson(res,403,{ok:false,error:"Запрос отклонён"});return;}
  try{
    if(url.pathname==="/api/sdo/status"&&req.method==="GET"){
      const session=getSession(req);sendJson(res,200,{ok:true,authenticated:!!session,configured:!!sessionKey,user:session?session.user:null,siteUrl:SDO_BASE_URL.href});return;
    }
    if(url.pathname==="/api/sdo/login"&&req.method==="POST"){
      if(!sessionKey){sendJson(res,503,{ok:false,error:"Сначала настройте MGUU_SESSION_SECRET в Vercel",code:"secret_not_configured"});return;}
      const body=await readJsonBody(req);const username=String(body.username||"").trim(),password=String(body.password||"");
      if(!username||!password){sendJson(res,400,{ok:false,error:"Введите логин и пароль"});return;}
      if(username.length>200||password.length>500){sendJson(res,400,{ok:false,error:"Слишком длинные данные входа"});return;}
      const tokenData=await getSdoToken(username,password);
      const site=await moodleCall(tokenData.token,"core_webservice_get_site_info",{});
      const user={id:Number(site.userid)||0,fullName:String(site.fullname||site.username||username),userName:String(site.username||username)};
      const sealed=sealSession({token:tokenData.token,privateToken:tokenData.privatetoken||"",username,user,createdAt:Date.now()});
      sendJson(res,200,{ok:true,authenticated:true,user,siteName:String(site.sitename||"СДО МГУУ")},{"set-cookie":cookieHeader(sealed,COOKIE_AGE)});return;
    }
    if(url.pathname==="/api/sdo/logout"&&req.method==="POST"){
      sendJson(res,200,{ok:true,authenticated:false},{"set-cookie":cookieHeader("",0)});return;
    }
    const session=getSession(req);
    if(!session){sendJson(res,401,{ok:false,error:"Войдите в СДО",code:"not_authenticated"});return;}
    if(url.pathname==="/api/sdo/dashboard"&&req.method==="GET"){
      const data=await buildDashboard(session);sendJson(res,200,{ok:true,data});return;
    }
    if(url.pathname==="/api/sdo/course"&&req.method==="GET"){
      const courseId=Number(url.searchParams.get("courseid"));if(!Number.isInteger(courseId)||courseId<=0){sendJson(res,400,{ok:false,error:"Некорректный курс"});return;}
      const data=await buildCourse(session,courseId);sendJson(res,200,{ok:true,data});return;
    }
    sendJson(res,404,{ok:false,error:"Не найдено"});
  }catch(err){
    const status=Number(err&&err.status)||502;
    const headers=status===401?{"set-cookie":cookieHeader("",0)}:undefined;
    sendJson(res,status,{ok:false,error:String(err&&err.message||"Ошибка СДО"),code:String(err&&err.code||"")},headers);
  }
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
    sendJson(res,200,{ok:true,version:APP_VERSION,sdo:true,platform:"vercel",sessionSecretConfigured:!!sessionKey});return;
  }
  if(url.pathname.startsWith("/api/sdo/")){await handleSdo(req,res,url);return;}
  if(req.method!=="GET"&&req.method!=="HEAD"){send(res,405,"Метод не поддерживается");return;}
  if(url.pathname.startsWith("/portal/")){await proxyPortal(req,res,url);return;}
  sendJson(res,404,{ok:false,error:"Маршрут backend не найден",path:url.pathname});
}
