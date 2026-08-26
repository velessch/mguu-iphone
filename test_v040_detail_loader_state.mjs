import fs from 'node:fs';
import vm from 'node:vm';
const app=fs.readFileSync(new URL('./app.js',import.meta.url),'utf8');

function extractFunction(name){
  let marker='async function '+name+'(';
  let start=app.indexOf(marker);
  if(start<0){marker='function '+name+'(';start=app.indexOf(marker);}
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

// This is the exact dependency that was present in Android v0.48 but missing in web v0.39.
if(!/let\s+ratingDetailInflight\s*=\s*new Map\(\)/.test(app))throw new Error('ratingDetailInflight state missing');
if(!/let\s+ratingDetailRunSeq\s*=\s*0/.test(app))throw new Error('ratingDetailRunSeq state missing');
if(!app.includes('ratingRepairBrokenDetailCachesV040();'))throw new Error('v0.40 detail-cache repair is not called');
if(!app.includes('let points=cachedPoints||(itemPoints&&ratingControlPointsHaveValues(itemPoints)?itemPoints:null)||ratingPlaceholderControlPoints()'))throw new Error('valid detailed cache does not override stale summary dashes');

const ctx={
  console,Map,Set,Array,String,Number,Date,Promise,Math,
  ratingDetailRunSeq:0,
  section:'rating',ratingData:null,
  normalizeSubject:s=>String(s||'').toLowerCase(),
  ratingSubjectsResolved:data=>data.subjects||[],
  ratingFetchDetailControlPoints:async url=>({recognized:true,points:[1,2,3,4,5].map((n)=>({label:'Контрольная точка '+n,value:String(n)}))}),
  ratingReadDetailCache:()=>null,
  ratingControlPointsHaveValues:pts=>pts.some(p=>p.value!=='—'),
  ratingWriteDetailPoints:()=>{},
  ratingSubjectItem:(data,subject)=>(data.subjects||[]).find(x=>x.subject===subject)||null,
  ratingReplaceModuleOneWithControlPoints:(item,points)=>{item.points=points;return item;},
  writeJson:()=>{},
  ratingContextMatches:()=>false,
  ratingScoreChanges:()=>[],
  addRatingChangeNotifications:()=>{},
  renderRating:()=>{},
  setStatus:()=>{},
  normalizeRatingPeriod:x=>x||{},
};
vm.createContext(ctx);
vm.runInContext(extractFunction('ratingRefreshControlPointsProgressively'),ctx);
const data={subjects:[{subject:'A',detailUrl:'u1'},{subject:'B',detailUrl:'u2'}]};
await ctx.ratingRefreshControlPointsProgressively(data,{cacheKey:'k',period:{},scopeChanged:true},null,['A','B']);
if(!data.subjects.every(x=>Array.isArray(x.points)&&x.points[0].value==='1'))throw new Error('progressive detailed loader did not process all jobs');
console.log('v0.40 detailed loader state/parity test: OK');
