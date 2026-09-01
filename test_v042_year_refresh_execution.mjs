import fs from 'node:fs';
import vm from 'node:vm';
const app=fs.readFileSync(new URL('./app.js',import.meta.url),'utf8');
const fn=app.match(/async function refreshRatingAvailablePeriods\(force,pickerKind\)\{[\s\S]*?\n\}/)?.[0];
if(!fn)throw new Error('refreshRatingAvailablePeriods not found');
const stateDecl=app.match(/const ratingPeriodRefreshState=\{busy:false,lastAt:0\};/)?.[0];
if(!stateDecl)throw new Error('refresh state declaration missing');
const context={
  console,
  Date,
  RATING_PERIOD_OPTIONS_INTERVAL:120000,
  ratingGroup:{id:'g1',name:'Group'},
  ratingPeriodOptions:{years:[],semesters:[]},
  fetchCount:0,
  document:{getElementById(){return null;}},
  ratingPeriodOptionsSignature(o){return JSON.stringify(o||{});},
  ratingStoredAvailablePeriods(){return {years:[],semesters:[]};},
  async fetchRatingResponse(){context.fetchCount++;return {doc:{},url:'https://example/portal/student/rating.php'};},
  ratingGroupUrl(){return 'https://example/portal/student/rating.php';},
  ratingActionablePeriodOptions(){return {years:[{value:'000000016',label:'2026/2027 учебный год'}],semesters:[{value:'0',label:'Осенний семестр'}]};},
  ratingPeriodStateFromDoc(){return {};},
  sanitizeRatingPeriodOptions(o){return o;},
  ratingStoreAvailablePeriods(o){return o;},
  ratingPickerOptions(){return [];},
  ratingPeriodPickerHtml(){return '';},
  ratingBindNativePeriodItems(){}
};
vm.createContext(context);
vm.runInContext(`${stateDecl}\n${fn}\nthis.__refresh=refreshRatingAvailablePeriods;this.__state=ratingPeriodRefreshState;`,context);
const first=await context.__refresh(true);
if(first!==true)throw new Error('forced year refresh did not report new options');
if(context.fetchCount!==1)throw new Error('forced year refresh did not perform exactly one request');
if(context.__state.busy!==false)throw new Error('busy state was not released after successful refresh');
const second=await context.__refresh(false);
if(second!==false)throw new Error('throttled refresh should return false');
if(context.fetchCount!==1)throw new Error('throttled refresh unexpectedly performed another request');
context.__state.lastAt=0;
context.fetchRatingResponse=async()=>{context.fetchCount++;throw new Error('network fail');};
const third=await context.__refresh(true);
if(third!==false)throw new Error('failed refresh should return false');
if(context.__state.busy!==false)throw new Error('busy state was not released after failed refresh');
console.log('PASS v0.42: academic-year refresh executes, throttles, and releases state after errors');
