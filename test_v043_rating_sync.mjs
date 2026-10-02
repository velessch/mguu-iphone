import fs from 'node:fs';
import vm from 'node:vm';
const app=fs.readFileSync(new URL('./app.js',import.meta.url),'utf8');
function extract(name){
  let marker='function '+name+'(';let start=app.indexOf(marker);if(start<0)throw new Error('missing '+name);
  let i=app.indexOf('{',start),depth=0,q='',esc=false;
  for(;i<app.length;i++){let c=app[i];if(q){if(esc)esc=false;else if(c==='\\')esc=true;else if(c===q)q='';continue;}if(c==='"'||c==="'"||c==='`'){q=c;continue;}if(c==='{')depth++;else if(c==='}'&&--depth===0)return app.slice(start,i+1);}throw new Error('unterminated '+name);
}
function must(x,msg){if(!x)throw new Error(msg)}
function eq(a,b,msg){if(JSON.stringify(a)!==JSON.stringify(b))throw new Error(msg+'\n'+JSON.stringify(a)+' != '+JSON.stringify(b));}
const ctx={console,Map,Set,Array,String,Number,Date,Promise,Math,RegExp};
ctx.cleanLine=s=>String(s||'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
ctx.normalizeSubject=s=>ctx.cleanLine(s).toLowerCase().replace(/ё/g,'е');
ctx.isScoreValue=v=>/^[-–—]$/.test(ctx.cleanLine(v))||/^\d+(?:[.,]\d+)?$/.test(ctx.cleanLine(v));
ctx.ratingSubjectsResolved=d=>d&&Array.isArray(d.subjects)?d.subjects:[];
ctx.normalizeRatingPeriod=p=>({...p});
ctx.selectedBook={url:'https://portal.mguu.ru/student/personalrating.php?userid=1&year=000000033&sem=0'};
ctx.ratingPeriod={year:'000000033',yearLabel:'2026/2027 учебный год',semester:'0',semesterLabel:'Осенний семестр'};
ctx.notices=[];ctx.addAppNotification=(kind,title,body,extra)=>ctx.notices.push({kind,title,body,extra});
vm.createContext(ctx);
for(const n of ['ratingSubjectsSignature','ratingIsRealScoreValue','ratingLooksGradeMetric','ratingMetricIsTotal','ratingMetricIsPoint','ratingMetricIsModuleOne','ratingMetricIsModuleTwo','ratingNumericScore','ratingPointSum','ratingModuleOneSignatureValue','ratingScoreChanges','ratingNotificationChanges','addRatingChangeNotifications','ratingCardDisplayScore'])vm.runInContext(extract(n),ctx);
const D='—';
const subj=(name,v)=>({subject:name,moduleOneTotal:v.m1??'',total:v.total??'',totalLabel:'Общий балл',details:v.kt?[...v.kt.map((x,i)=>({label:'Контрольная точка '+(i+1),value:x})),{label:'Модуль 2',value:v.m2??D},{label:'Общий балл',value:v.total??D}]:[{label:'Модуль 1',value:v.m1??D},{label:'Модуль 2',value:v.m2??D},{label:'Общий балл',value:v.total??D}]});
// Closed card: current semester score must be visible even while total is blank.
eq(ctx.ratingCardDisplayScore(subj('A',{m1:'10',total:''})),{label:'Модуль 1',value:'10'},'module1 headline');
eq(ctx.ratingCardDisplayScore(subj('A',{m1:'46',total:'92'})),{label:'Общий балл',value:'92'},'historical total headline');
eq(ctx.ratingCardDisplayScore(subj('A',{m1:'0',total:''})),{label:'Модуль 1',value:'0'},'zero score');
// Existing card new KT.
let oldData={subjects:[subj('Психология',{kt:[D,D,D,D,D],total:D})]};
let newData={subjects:[subj('Психология',{kt:['10',D,D,D,D],total:D})]};
let changes=ctx.ratingScoreChanges(oldData,newData);must(changes.some(x=>x.label==='Контрольная точка 1'&&x.newValue==='10'),'existing card grade not detected');
ctx.notices=[];ctx.addRatingChangeNotifications(changes,newData);must(ctx.notices.length===1&&ctx.notices[0].title==='Новая оценка','existing card notification missing');
// Brand new card with grade.
oldData={subjects:[subj('Старая',{m1:D,total:D})]};newData={subjects:[subj('Старая',{m1:D,total:D}),subj('Новая дисциплина',{m1:'7',total:D})]};changes=ctx.ratingScoreChanges(oldData,newData);must(changes.some(x=>x.subject==='Новая дисциплина'&&x.newSubject&&x.newValue==='7'),'new-card first score not detected');
ctx.notices=[];ctx.addRatingChangeNotifications(changes,newData);must(ctx.notices.some(n=>/Новая дисциплина/.test(n.body)&&/7/.test(n.body)),'new-card notification missing');
// No spam when detailed points merely expose same already-known Module 1 sum.
oldData={subjects:[subj('A',{m1:'10',total:D})]};newData={subjects:[Object.assign(subj('A',{kt:['10',D,D,D,D],total:D}),{moduleOneTotal:'10'})]};must(ctx.ratingScoreChanges(oldData,newData).length===0,'structural KT expansion produced duplicate notification');
// Parser branch must preserve empty portal columns and keep empty new cards.
must(app.includes("portalRow.querySelector('.brs-data1')")&&app.includes("portalRow.querySelector('.brs-data2')")&&app.includes("portalRow.querySelector('.brs-rating')"),'positional portal parser missing');
must(app.includes("result.push({subject:subject,total:total,totalLabel:'Общий балл',moduleOneTotal:module1"),'new/empty card parser missing');
must(app.includes('ratingPatchCardDisplayScore(job.subject,live||item)'),'progressive closed-card update missing');
console.log('PASS v0.43 rating parity: closed-card scores, new cards, grade notifications, no structural duplicates.');
