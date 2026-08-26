import fs from 'node:fs';
import vm from 'node:vm';
const app=fs.readFileSync(new URL('./app.js',import.meta.url),'utf8');

function extractFunction(name){
  const marker='function '+name+'(';
  const start=app.indexOf(marker);
  if(start<0)throw new Error('missing '+name);
  const brace=app.indexOf('{',start);
  let depth=0, quote='', esc=false;
  for(let i=brace;i<app.length;i++){
    const c=app[i];
    if(quote){
      if(esc){esc=false;continue;}
      if(c==='\\'){esc=true;continue;}
      if(c===quote)quote='';
      continue;
    }
    if(c==='"'||c==="'"||c==='`'){quote=c;continue;}
    if(c==='{')depth++;
    else if(c==='}'&&--depth===0)return app.slice(start,i+1);
  }
  throw new Error('unterminated '+name);
}

const ctx={console,Map,Array,String,Number,RegExp,Math,Date};
vm.createContext(ctx);
for(const name of ['cleanLine','ratingDetailControlPointNumber','ratingDetailScoreValue','ratingModuleOneControlPointsFromDetailDoc','ratingControlPointsHaveValues','ratingDetailCacheUsable']){
  vm.runInContext(extractFunction(name),ctx);
}

function cell(text){return {textContent:text};}
function row(values){const cells=values.map(cell);return {querySelectorAll(sel){return sel==='th,td'?cells:[];}};}
const rows=[
  row(['Номер КТ','Дата КТ','Баллы']),
  row(['Точка 1','20.09.2025','10']),
  row(['Точка 2','18.10.2025','10']),
  row(['Точка 3','08.11.2025','10']),
  row(['Точка 4','22.11.2025','10']),
  row(['Точка 5','13.12.2025','5']),
  row(['Модуль 2','—','35']),
  row(['Итого','—','80'])
];
const table={textContent:'Модуль 1 '+rows.map(r=>r.querySelectorAll('th,td').map(c=>c.textContent).join(' ')).join(' '),querySelectorAll(sel){return sel==='tr'?rows:[];}};
const doc={querySelectorAll(sel){if(sel==='tr')return rows;if(sel==='table')return [table];return [];}};
const points=ctx.ratingModuleOneControlPointsFromDetailDoc(doc);
const values=Array.from(points,p=>p.value);
if(JSON.stringify(values)!==JSON.stringify(['10','10','10','10','5']))throw new Error('portal KT parser failed: '+JSON.stringify(values));

const stale={points:[1,2,3,4,5].map(n=>({label:'Контрольная точка '+n,value:'—'}))};
if(ctx.ratingDetailCacheUsable(stale)!==false)throw new Error('v0.38 placeholder cache must be invalidated');
const recognized={recognized:true,points:stale.points};
if(ctx.ratingDetailCacheUsable(recognized)!==true)throw new Error('recognized empty portal result should remain cacheable');
const scored={points:[{label:'Контрольная точка 1',value:'10'}]};
if(ctx.ratingDetailCacheUsable(scored)!==true)throw new Error('scored cache should be usable');

if(!app.includes('ratingRepairBrokenDetailCachesV039();'))throw new Error('v0.39 stale KT cache migration is not called');
if(!app.includes('ratingWriteDetailPoints(job.url,points,!!result.recognized);'))throw new Error('recognized detail response is not persisted');
console.log('v0.39 KT live-data/cache repair test: OK');
