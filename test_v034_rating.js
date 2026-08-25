'use strict';
const fs=require('fs');
function cleanLine(s){return String(s||'').replace(/\u00a0/g,' ').replace(/^\s*\|\s*/,'').replace(/\s+/g,' ').trim();}
function ratingLooksLikeYearLabel(x){x=cleanLine(x||'');return /^(?:19|20)\d{2}\s*[-–—\/]\s*(?:(?:19|20)\d{2}|\d{2})(?:\s*(?:учебн[а-яё]*\s*год|уч\.?\s*год))?$/i.test(x)||/^(?:учебн[а-яё]*\s*год\s*)?(?:19|20)\d{2}\s*[-–—\/]\s*(?:(?:19|20)\d{2}|\d{2})$/i.test(x);}
function ratingLooksLikeSemesterLabel(x){x=cleanLine(x||'');return /^(?:(?:[1-9]|i{1,3}|iv)\s*(?:-?\s*й)?\s*семестр|семестр\s*(?:[1-9]|i{1,3}|iv)|(?:осенн|весенн)[а-яё]*\s*семестр)$/i.test(x);}
function ratingLooksLikeSemesterShort(x){return /^[1-9]$/.test(cleanLine(x||''));}
function ratingOptionIsActionable(o){if(!o)return false;if(String(o.url||'').trim())return true;if(String(o.field||'').trim())return true;let mode=String(o.mode||'').toLowerCase();return mode==='url'||mode==='form'||mode==='catalog'||mode==='live';}
function ratingCanonicalYearLabel(label){let t=cleanLine(label||'').replace(/\s+/g,' '),m=t.match(/((?:19|20)\d{2})\s*[-–—\/]\s*((?:19|20)\d{2}|\d{2})/i);if(!m)return t;let a=m[1],b=m[2];if(b.length===2)b=a.slice(0,2)+b;return a+'/'+b+' учебный год';}
function ratingCanonicalYearKey(label){let c=ratingCanonicalYearLabel(label),m=c.match(/((?:19|20)\d{2})\/((?:19|20)\d{2})/);return m?m[1]+'-'+m[2]:cleanLine(c).toLowerCase();}
function ratingCanonicalSemesterKey(label){let t=cleanLine(label||'').toLowerCase().replace(/ё/g,'е');if(/осенн/.test(t))return 'autumn';if(/весенн/.test(t))return 'spring';let m=t.match(/(?:^|\s)([1-9]|i{1,3}|iv)(?:\s|$)/i);return m?String(m[1]).toLowerCase():t;}
function ratingPeriodOptionRank(o){if(!o)return -1;let score=0;if(o.selected)score+=100;if(ratingOptionIsActionable(o))score+=50;let mode=String(o.mode||'').toLowerCase();if(mode==='form'||mode==='url'||mode==='catalog')score+=12;if(mode==='live')score+=8;if(mode!=='filter')score+=4;if(o.field)score+=3;if(o.url)score+=3;if(/^\d{3,}$/.test(String(o.value||'')))score+=2;return score;}
function ratingMergeOptionRecord(a,b){if(!a)return Object.assign({},b||{});if(!b)return Object.assign({},a||{});let preferred=ratingPeriodOptionRank(b)>ratingPeriodOptionRank(a)?b:a,other=preferred===a?b:a,out=Object.assign({},preferred);['field','url','mode','yearLabel','yearValue'].forEach(function(k){if(!out[k]&&other[k])out[k]=other[k];});out.selected=!!(a.selected||b.selected);return out;}
function sanitizeRatingPeriodOptions(opts){opts=opts&&typeof opts==='object'?opts:{};let yearMap=new Map(),semesterMap=new Map();(opts.years||[]).forEach(function(o){if(!o||!ratingLooksLikeYearLabel(o.label||''))return;let item=Object.assign({},o),canonical=ratingCanonicalYearLabel(item.label||item.value||'');item.label=canonical;if(item.yearLabel)item.yearLabel=ratingCanonicalYearLabel(item.yearLabel);let key=ratingCanonicalYearKey(canonical),existing=yearMap.get(key);yearMap.set(key,ratingMergeOptionRecord(existing,item));});(opts.semesters||[]).forEach(function(o){if(!o||(!ratingLooksLikeSemesterLabel(o.label||'')&&!ratingLooksLikeSemesterShort(o.label||'')))return;let item=Object.assign({},o);if(item.yearLabel)item.yearLabel=ratingCanonicalYearLabel(item.yearLabel);let yk=item.yearLabel?ratingCanonicalYearKey(item.yearLabel):'*',key=yk+'|'+ratingCanonicalSemesterKey(item.label||item.value||''),existing=semesterMap.get(key);semesterMap.set(key,ratingMergeOptionRecord(existing,item));});let years=Array.from(yearMap.values());years.sort(function(a,b){let ay=parseInt((a.label.match(/(?:19|20)\d{2}/)||['0'])[0],10)||0,by=parseInt((b.label.match(/(?:19|20)\d{2}/)||['0'])[0],10)||0;return by-ay;});return {years:years,semesters:Array.from(semesterMap.values())};}
function ratingDetailControlPointNumber(text){let t=cleanLine(text||'').toLowerCase().replace(/ё/g,'е');if(!t)return 0;let m=t.match(/(?:^|\b)(?:кт|контрольн[а-яё]*\s+точк[а-яё]*|точк[а-яё]*)\s*(?:№\s*)?([1-5])(?:\b|$)/i);if(!m)m=t.match(/(?:^|\b)([1-5])\s*(?:-?я|-?й)?\s*(?:контрольн[а-яё]*\s+точк[а-яё]*|точк[а-яё]*)(?:\b|$)/i);return m?parseInt(m[1],10):0;}
function ratingDetailScoreValue(text){let t=cleanLine(text||'');if(!t)return '';if(/^(?:—|–|-)$/i.test(t))return '—';let exact=t.match(/^(-?\d{1,3}(?:[.,]\d{1,2})?)\s*(?:балл(?:а|ов)?|б\.)?$/i);if(exact){let n=parseFloat(exact[1].replace(',','.'));if(Number.isFinite(n)&&n>=0&&n<=100)return exact[1].replace('.',',');}let pref=t.match(/(?:балл(?:ы|а|ов)?|оценк[а-яё]*)\s*[:=]?\s*(-?\d{1,3}(?:[.,]\d{1,2})?)/i);if(pref){let n=parseFloat(pref[1].replace(',','.'));if(Number.isFinite(n)&&n>=0&&n<=100)return pref[1].replace('.',',');}let from=t.match(/^(-?\d{1,3}(?:[.,]\d{1,2})?)\s*(?:из|\/|\\)\s*\d{1,3}(?:[.,]\d{1,2})?$/i);if(from){let n=parseFloat(from[1].replace(',','.'));if(Number.isFinite(n)&&n>=0&&n<=100)return from[1].replace('.',',');}return '';}
function mkCell(text){return {textContent:String(text),children:[],getAttribute(){return null;}};}
function mkRow(items){let cells=items.map(mkCell);return {querySelectorAll(sel){return sel==='th,td'?cells:[];},textContent:items.join(' ')};}
function mkTable(rows){let rr=rows.map(mkRow);let cells=rr.flatMap(r=>r.querySelectorAll('th,td'));return {querySelectorAll(sel){if(sel==='tr')return rr;return [];},textContent:rows.flat().join(' '),_cells:cells,_rows:rr};}
function mkDoc(tables){let rows=tables.flatMap(t=>t._rows),cells=tables.flatMap(t=>t._cells);return {querySelectorAll(sel){if(sel==='tr')return rows;if(sel==='table')return tables;if(sel==='body *')return cells;if(sel==='input,select,textarea,[data-value],[aria-label],[title]')return [];return [];}};}
function ratingModuleOneControlPointsFromDetailDoc(doc){let found=new Map();function setPoint(n,value){n=Number(n)||0;value=ratingDetailScoreValue(value);if(n>=1&&n<=5&&value!==''&&!found.has(n))found.set(n,value);}function complete(){return found.size>=5;}Array.from(doc.querySelectorAll('tr')).forEach(function(tr){if(complete())return;let cells=Array.from(tr.querySelectorAll('th,td')),texts=cells.map(c=>cleanLine(c.textContent||''));texts.forEach(function(t,i){let n=ratingDetailControlPointNumber(t);if(!n||found.has(n))return;let ownTail=t.replace(/.*?(?:кт|контрольн[а-яё]*\s+точк[а-яё]*|точк[а-яё]*)\s*(?:№\s*)?[1-5]/i,'').trim(),own=ratingDetailScoreValue(ownTail);if(own){setPoint(n,own);return;}for(let j=i+1;j<texts.length&&j<=i+3;j++){let v=ratingDetailScoreValue(texts[j]);if(v){setPoint(n,v);break;}if(ratingDetailControlPointNumber(texts[j]))break;}});});Array.from(doc.querySelectorAll('table')).forEach(function(table){if(complete())return;let rows=Array.from(table.querySelectorAll('tr'));for(let ri=0;ri<rows.length-1&&!complete();ri++){let heads=Array.from(rows[ri].querySelectorAll('th,td')).map(c=>cleanLine(c.textContent||'')),cols=[];heads.forEach(function(t,i){let n=ratingDetailControlPointNumber(t);if(n)cols.push({n:n,i:i});});if(cols.length<2)continue;for(let rj=ri+1;rj<Math.min(rows.length,ri+4)&&!complete();rj++){let vals=Array.from(rows[rj].querySelectorAll('th,td')).map(c=>cleanLine(c.textContent||'')),good=0,pairs=[];cols.forEach(function(c){let v=c.i<vals.length?ratingDetailScoreValue(vals[c.i]):'';if(v){good++;pairs.push([c.n,v]);}});if(good>=Math.min(3,cols.length)){pairs.forEach(x=>setPoint(x[0],x[1]));break;}}}});if(!complete()){let leaves=[];Array.from(doc.querySelectorAll('body *')).forEach(function(el){if(el.children&&el.children.length)return;let t=cleanLine(el.textContent||'');if(t)leaves.push(t);});for(let i=0;i<leaves.length&&!complete();i++){let n=ratingDetailControlPointNumber(leaves[i]);if(!n||found.has(n))continue;for(let j=i+1;j<leaves.length&&j<=i+4;j++){if(ratingDetailControlPointNumber(leaves[j]))break;let v=ratingDetailScoreValue(leaves[j]);if(v){setPoint(n,v);break;}}}}let out=[];for(let n=1;n<=5;n++)out.push({label:'Контрольная точка '+n,value:found.has(n)?found.get(n):'—'});return out;}

// Exact portal layouts observed on detailed.php on 2026-08-25.
let portalWide=mkDoc([mkTable([
  ['Точка 1','Точка 2','Точка 3','Точка 4','Точка 5','Модуль 2','Итого'],
  ['20.09.2025','18.10.2025','08.11.2025','22.11.2025','13.12.2025','—','—'],
  ['10','10','10','10','5','35','80']
])]);
let a=ratingModuleOneControlPointsFromDetailDoc(portalWide).map(x=>x.value).join('|');
if(a!=='10|10|10|10|5')throw new Error('portal wide parser '+a);
let portalVertical=mkDoc([mkTable([
  ['Номер КТ','Дата КТ','Баллы'],
  ['Точка 1','20.09.2025','10'],['Точка 2','18.10.2025','10'],['Точка 3','08.11.2025','10'],['Точка 4','22.11.2025','10'],['Точка 5','13.12.2025','5'],['Модуль 2','—','35'],['Итого','—','80']
])]);
let b=ratingModuleOneControlPointsFromDetailDoc(portalVertical).map(x=>x.value).join('|');
if(b!=='10|10|10|10|5')throw new Error('portal vertical parser '+b);

let dedup=sanitizeRatingPeriodOptions({years:[
  {value:'000000015',label:'2025/2026 учебный год',field:'year',mode:'form',selected:true},
  {value:'2025 - 2026 учебный год',label:'2025 - 2026 учебный год',mode:'filter'},
  {value:'000000014',label:'2024/2025 учебный год',field:'year',mode:'form'},
  {value:'2024 - 2025 учебный год',label:'2024 - 2025 учебный год',mode:'filter'}
],semesters:[]});
if(dedup.years.length!==2)throw new Error('year duplicates remain: '+JSON.stringify(dedup.years));
if(dedup.years[0].label!=='2025/2026 учебный год'||dedup.years[0].value!=='000000015')throw new Error('year canonical/action lost: '+JSON.stringify(dedup.years[0]));

function ratingReplaceModuleOneWithControlPoints(item,points){
  if(!item)return item;let source=Array.isArray(item.details)?item.details:[],out=[],anchor=-1;
  source.forEach(function(d){let label=cleanLine(d&&d.label||''),isModuleOne=/^модуль\s*1$/i.test(label),isPoint=/^контрольная\s+точка\s+[1-5]$/i.test(label);if(isModuleOne||isPoint){if(anchor<0)anchor=out.length;if(isModuleOne&&!item.moduleOneTotal)item.moduleOneTotal=cleanLine(d&&d.value||'');return;}out.push(d);});
  if(anchor<0){anchor=out.findIndex(d=>/^модуль\s*2$/i.test(cleanLine(d&&d.label||'')));if(anchor<0)anchor=out.findIndex(d=>/(итог|общий|сумм|всего|рейтинг|результат)/i.test(cleanLine(d&&d.label||'')));if(anchor<0)anchor=out.length;}
  let normalized=[];for(let i=0;i<5;i++){let p=points&&points[i];normalized.push({label:'Контрольная точка '+(i+1),value:cleanLine(p&&p.value||'')||'—'});}out.splice.apply(out,[anchor,0].concat(normalized));item.details=out;return item;
}
let duplicateItem={details:[
  {label:'Форма контроля',value:'Экзамен'},
  {label:'Контрольная точка 1',value:'10'},{label:'Контрольная точка 2',value:'10'},{label:'Контрольная точка 3',value:'10'},{label:'Контрольная точка 4',value:'10'},{label:'Контрольная точка 5',value:'5'},
  {label:'Контрольная точка 1',value:'10'},{label:'Контрольная точка 2',value:'10'},{label:'Контрольная точка 3',value:'10'},{label:'Контрольная точка 4',value:'10'},{label:'Контрольная точка 5',value:'5'},
  {label:'Модуль 2',value:'35'},{label:'Общий балл',value:'90'}
]};
let pts=[10,10,10,10,5].map((v,i)=>({label:'Контрольная точка '+(i+1),value:String(v)}));
ratingReplaceModuleOneWithControlPoints(duplicateItem,pts);ratingReplaceModuleOneWithControlPoints(duplicateItem,pts);
let cp=duplicateItem.details.filter(x=>/^Контрольная точка [1-5]$/.test(x.label));
if(cp.length!==5)throw new Error('control point duplication remains: '+cp.length);
if(duplicateItem.details.filter(x=>x.label==='Форма контроля').length!==1||duplicateItem.details.filter(x=>x.label==='Модуль 2').length!==1||duplicateItem.details.filter(x=>x.label==='Общий балл').length!==1)throw new Error('neighbor rating rows damaged');

let app=fs.readFileSync(__dirname+'/app.js','utf8');
if(!/const APP_VERSION='0\.34 Web · Vercel'/.test(app))throw new Error('wrong iPhone web version');
if(!/K_RATING_PERIOD_BASE/.test(app)||!/K_RATING_DETAIL_CACHE_BASE/.test(app))throw new Error('rating persistence/detail cache missing');
if(!/ratingRepairAllCachedControlPointsV048/.test(app)||!/K_RATING_CACHE_REPAIR_V048/.test(app))throw new Error('all-period cache repair missing');
let main=app.slice(app.indexOf('async function fetchRatingData'),app.indexOf('function bookListHtml'));
if(/discoverPersonalRatingPeriodCatalog|discoverRatingPeriodCatalog|discoverRenderedRatingPeriods|fetchRenderedRatingSelection/.test(main))throw new Error('slow probing still present in main rating load');
if(/await\s+ratingEnrichModuleOneControlPoints/.test(main))throw new Error('first-frame load waits for detailed.php');
if(!/ratingApplyStoredControlPoints/.test(main))throw new Error('first-frame load does not merge stored points');
let select=app.slice(app.indexOf('function selectRatingPeriod'),app.indexOf('function isScoreValue'));
if(!/readJson\(ratingCacheKey\(selectedBook,ratingPeriod\),null\)/.test(select)||!/Показан сохранённый рейтинг/.test(select))throw new Error('semester cache-first switch missing');
if(!/ratingLoadSeq\+\+/.test(select))throw new Error('period switch does not invalidate stale requests');
let load=app.slice(app.indexOf('async function loadRating'),app.indexOf('function ratingHydrateStoredState'));
if(!/ratingDetailSubjectsToRefresh\(data,oldData,!!forceDetails\)/.test(load))throw new Error('summary-change detail filtering missing');
if(!/if\(!detailSubjects\.length\)/.test(load))throw new Error('unchanged rating does not skip detailed.php');
if(!/run!==ratingLoadSeq/.test(load)||!/current\.semester/.test(load))throw new Error('stale semester response guard missing');
let bg=app.slice(app.indexOf('async function checkRatingInBackground'),app.indexOf('function startRatingBackgroundChecks'));
if(!/ratingDetailSubjectsToRefresh\(data,baseline,!!force\)/.test(bg)||!/if\(!detailSubjects\.length\)/.test(bg))throw new Error('background change-only model missing');
let ui=app.slice(app.indexOf('function bindUi'),app.indexOf('function openDrawer'));
if(!/loadRating\(true\)/.test(ui)||!/ratingYear/.test(ui)||!/ratingSemester/.test(ui))throw new Error('manual full refresh / period buttons missing');
if(!/toPortalProxyUrl\(url\)/.test(app.slice(app.indexOf('async function fetchHtmlDoc'),app.indexOf('function parseRatingGroupsDoc'))))throw new Error('rating page is not routed via iPhone/Vercel proxy');
let backend=fs.readFileSync(__dirname+'/api/backend.mjs','utf8');
if(!/personalrating\.php/.test(backend)||!/detailed\.php/.test(backend))throw new Error('Vercel rating proxy paths missing');
console.log('PASS Web v0.34: iPhone settings preserved; rating v0.48 mechanics ported with cache-first periods, no duplicate KTs, scoped detail refresh');
