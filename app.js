(function(){
'use strict';
if(window.__mguuWebV035){return;}
window.__mguuWebV035=true;

const APP_VERSION='0.35 Web · Vercel';
const DEFAULT_GROUP={id:'000000230',name:'24ГМУ-СКР11.1'};
const APP_ROOT=new URL('./',window.location.href);
const IS_GITHUB_PAGES=/\.github\.io$/i.test(window.location.hostname);
function localBackendUrl(path){
  path=String(path||'').replace(/^\/+/, '');
  if(IS_GITHUB_PAGES)return new URL('./'+path,APP_ROOT).href;
  return new URL('/'+path,window.location.origin).href;
}
const BASE_URL=localBackendUrl('portal/student/scheduler1.php');
const RATING_URL=localBackendUrl('portal/student/rating.php');
function toPortalProxyUrl(value){
  try{
    let u=new URL(value,window.location.href);
    if(u.hostname==='portal.mguu.ru')return localBackendUrl('portal'+u.pathname+u.search+u.hash);
    return u.href;
  }catch(e){return String(value||'');}
}
const K_SELECTED_GROUP='olesya_v08_selected_group';
const K_RATING_SELECTED_GROUP='olesya_v018_rating_selected_group';
const K_GROUPS_CACHE='olesya_v08_groups_cache';
const K_CACHE_BASE='olesya_v08_cache';
const K_SNAPSHOT_BASE='olesya_v08_snapshot';
const K_CHANGES_BASE='olesya_v08_changes';
const LEGACY_CACHE='olesya_v06_cache';
const LEGACY_SNAPSHOT='olesya_v06_snapshot';
const LEGACY_CHANGES='olesya_v06_changes';
const K_COLORS='olesya_v05_colors';
const K_THEME='olesya_v05_theme';
const K_SECTION='olesya_v014_section';
const K_RATING_GROUPS='olesya_v014_rating_groups';
const K_RATING_BOOK_BASE='olesya_v014_rating_book';
const K_RATING_BOOKS_BASE='olesya_v014_rating_books';
const K_RATING_CACHE_BASE='olesya_v014_rating_cache';
const K_RATING_PERIOD_BASE='olesya_v035_rating_period';
const K_RATING_BG_LAST='mguu_v046_rating_bg_last';
const K_RATING_DETAIL_CACHE_BASE='mguu_v047_rating_detail';
const K_RATING_CACHE_REPAIR_V048='mguu_v048_rating_cache_repaired';
const RATING_BACKGROUND_INTERVAL=2*60*1000;
const K_NOTIFICATIONS='mguu_v017_notifications';
const K_NOTIFY_SCHEDULE_SCOPE='mguu_v021_notify_schedule_scope';
const K_NOTIFY_RATING_SCOPE='mguu_v021_notify_rating_scope';
const K_PERSONAL_TASKS='mguu_v023_personal_tasks';
const K_SDO_SNAPSHOT='mguu_v029_sdo_snapshot';
const MAX_NOTIFICATIONS=100;
const pastel=['#ffd6e0','#ffe5b4','#fff3b0','#cdeac0','#bde0fe','#cdb4db','#d8e2dc','#fbc4ab','#caffbf','#a0c4ff','#e2cfea','#f1c0e8'];
const calmPalette=['#E8B7B1','#E2C4A6','#F1D9A6','#D8E7B8','#BFDCC4','#B9DDE1','#BBD1EA','#C9C1E6','#D8C0D7','#E8C5CF','#D8B79F','#C8D2BE','#B9C4D6','#D7DDE8','#E6D5C6','#C7DCC8','#D4C8B5','#C7B9AF','#D9C9E8','#BFD2C1','#E4D7AE','#C9D6A3','#C7DCEF','#D6C7C2'];
const fullPalette=['#F28B82','#F6BF26','#FFF475','#CCFF90','#A7FFEB','#CBF0F8','#AECBFA','#D7AEFB','#FDCFE8','#E6C9A8','#E8EAED','#DADCE0','#E57373','#FBC02D','#FFF176','#9CCC65','#4DB6AC','#4FC3F7','#64B5F6','#9575CD','#F48FB1','#BCAAA4','#B0BEC5','#90A4AE','#EF5350','#FFA726','#FFEE58','#66BB6A','#26A69A','#29B6F6','#42A5F5','#7E57C2','#EC407A','#8D6E63','#78909C','#5C6BC0','#D32F2F','#FB8C00','#FDD835','#43A047','#00897B','#039BE5','#1E88E5','#5E35B1','#D81B60','#6D4C41','#607D8B','#37474F','#C62828','#EF6C00','#F9A825','#2E7D32','#00695C','#0277BD','#1565C0','#4527A0','#AD1457','#4E342E','#455A64','#263238'];
const SPLASH_LOGO='data:image/png;base64,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';
const ruDays=['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
const ruMonths=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
let selectedGroup=readJson(K_SELECTED_GROUP,null)||{id:DEFAULT_GROUP.id,name:DEFAULT_GROUP.name};
if(!selectedGroup.id||!selectedGroup.name)selectedGroup={id:DEFAULT_GROUP.id,name:DEFAULT_GROUP.name};
let ratingGroup=readJson(K_RATING_SELECTED_GROUP,null)||{id:selectedGroup.id,name:selectedGroup.name};
if(!ratingGroup.id||!ratingGroup.name)ratingGroup={id:selectedGroup.id,name:selectedGroup.name};
let colors=readJson(K_COLORS,{})||{};
let colorDraft=null;
let theme=localStorage.getItem(K_THEME)||((window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');
let section=localStorage.getItem(K_SECTION)||'schedule';
if(section!=='schedule'&&section!=='rating'&&section!=='sdo')section='schedule';
let selectedBook=null;
let ratingBooks=[];
let ratingData=null;
let ratingBusy=false;
let ratingPeriod={year:'',yearLabel:'',semester:'',semesterLabel:''};
let ratingPeriodOptions={years:[],semesters:[]};
let ratingPeriodCatalog=[];
let ratingBackgroundBusy=false;
let ratingLastBackgroundAt=Number(localStorage.getItem(K_RATING_BG_LAST)||0)||0;
let ratingBackgroundTimer=null;
let ratingLoadSeq=0;
let pendingRatingSubjects=[];
let pendingRatingMarks=[];
let pendingScheduleMarks=[];
let pendingScheduleSubjectJump=null;
let subjectCalendarState=null;
let splashDismissed=false;
let splashStartedAt=Date.now();
let appNotifications=readJson(K_NOTIFICATIONS,[])||[];
let personalTasks=readJson(K_PERSONAL_TASKS,[])||[];
let sdoAuthenticated=null;
let sdoData=null;
let sdoBusy=false;
let sdoUser=null;
let mode='day';
let allEvents=[];
let calendarEvents=[];
let calendarRange=null;
let selectedDate=today();
let weekDate=startOfWeek(selectedDate);
let lastRange=null;
let busy=false;
let reloadAfterBusy=false;
let lastStatus='Загрузка расписания...';

function pad(n){return String(n).padStart(2,'0');}
function today(){let d=new Date();d.setHours(12,0,0,0);return d;}
function cloneDate(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate(),12);}
function addDays(d,n){let x=cloneDate(d);x.setDate(x.getDate()+n);return x;}
function startOfWeek(d){let x=cloneDate(d),k=(x.getDay()+6)%7;return addDays(x,-k);}
function iso(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());}
function portalDate(d){return pad(d.getDate())+'.'+pad(d.getMonth()+1)+'.'+d.getFullYear();}
function parseDate(s){let m=/^(\d{2})\.(\d{2})\.(\d{4})$/.exec(s);return m?new Date(+m[3],+m[2]-1,+m[1],12):null;}
function dateIso(s){let d=parseDate(s);return d?iso(d):'';}
function fmtDate(d){return d.getDate()+' '+ruMonths[d.getMonth()]+' '+d.getFullYear();}
function fmtShort(d){return pad(d.getDate())+'.'+pad(d.getMonth()+1)+'.'+d.getFullYear();}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function readJson(k,f){try{let v=localStorage.getItem(k);return v?JSON.parse(v):f;}catch(e){return f;}}
function writeJson(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
function dismissSplash(){
  if(splashDismissed)return;
  let elapsed=Date.now()-splashStartedAt,delay=Math.max(0,900-elapsed);
  setTimeout(function(){
    if(splashDismissed)return;splashDismissed=true;
    let el=document.getElementById('splashScreen');if(!el)return;
    el.classList.add('splashLeaving');setTimeout(function(){if(el&&el.parentNode)el.parentNode.removeChild(el);},520);
  },delay);
}
function normalizeSubject(value){return cleanLine(value).toLocaleLowerCase('ru-RU');}
function pendingScheduleMatch(e){
  if(!pendingScheduleMarks||!pendingScheduleMarks.length)return false;
  return pendingScheduleMarks.some(function(m){
    let dateOk=!m.date||m.date===e.date,pairOk=!m.pair||String(m.pair)===String(e.pair),subjectOk=!m.subject||normalizeSubject(m.subject)===normalizeSubject(e.subject);
    return dateOk&&pairOk&&subjectOk;
  });
}
function ratingMarksForSubject(subject){return (pendingRatingMarks||[]).filter(function(m){return normalizeSubject(m.subject)===normalizeSubject(subject);});}
function changeDotHtml(extraClass){return '<span class="changeDot '+(extraClass||'')+'" aria-label="Изменено"></span>';}

function nativeNotificationAction(action,payload){
  payload=payload||{};
  if(action==='request'){
    if(!('Notification' in window)){setStatus('Системные уведомления не поддерживаются');return;}
    Notification.requestPermission().then(function(result){
      if(result==='granted'){
        setStatus('Системные уведомления разрешены');
        navigator.serviceWorker&&navigator.serviceWorker.ready.then(function(reg){return reg.showNotification('МГУУ',{body:'Уведомления включены',icon:new URL('./icon-192.png',window.location.href).href,badge:new URL('./badge-96.png',window.location.href).href,tag:'mguu-permission'});}).catch(function(){});
      }else setStatus(result==='denied'?'Уведомления запрещены в настройках iPhone':'Разрешение не выдано');
    }).catch(function(){setStatus('Не удалось запросить уведомления');});
    return;
  }
  if(action==='settings'){
    try{openModal('Уведомления','<div class="muted" style="line-height:1.55">На iPhone откройте <b>Настройки → Уведомления → МГУУ</b>. Разрешение впервые выдаётся кнопкой «Разрешить системные уведомления» внутри установленного веб-приложения.</div>');}catch(e){alert('Настройки → Уведомления → МГУУ');}
    return;
  }
  if(action==='show'){
    try{if('setAppBadge' in navigator)navigator.setAppBadge(Number(payload.badge)||0).catch(function(){});}catch(e){}
    if(!('Notification' in window)||Notification.permission!=='granted'||!navigator.serviceWorker)return;
    navigator.serviceWorker.ready.then(function(reg){
      return reg.showNotification(payload.title||'МГУУ',{body:payload.body||'',icon:new URL('./icon-192.png',window.location.href).href,badge:new URL('./badge-96.png',window.location.href).href,tag:'mguu-'+String(payload.id||Date.now()),data:{notificationId:String(payload.id||'')},renotify:false});
    }).catch(function(){});
    return;
  }
}
function notificationSignature(n){return [n.kind,n.title,n.body,n.groupId||'',n.book||''].join('|');}
function saveAppNotifications(){appNotifications=(appNotifications||[]).slice(0,MAX_NOTIFICATIONS);writeJson(K_NOTIFICATIONS,appNotifications);updateNotificationBadge();}
function unreadNotificationCount(){return (appNotifications||[]).filter(n=>!n.read).length;}
function updateNotificationBadge(){
  let badge=document.getElementById('notificationBadge'),count=unreadNotificationCount();
  if(!badge)return;
  badge.classList.toggle('hidden',count===0);
  badge.textContent=count>9?'9+':String(count);
}
function addAppNotification(kind,title,body,extra){
  extra=extra||{};
  let noticeGroup=kind==='rating'?ratingGroup:(kind==='sdo'?{id:'sdo',name:'СДО'}:selectedGroup);
  let now=Date.now(),candidate={id:String(now)+'_'+Math.random().toString(36).slice(2,7),kind:kind,title:title,body:body,createdAt:new Date(now).toISOString(),read:false,groupId:noticeGroup.id,groupName:noticeGroup.name,book:selectedBook&&selectedBook.label?selectedBook.label:'',bookUrl:selectedBook&&selectedBook.url?selectedBook.url:'',extra:extra};
  let sig=notificationSignature(candidate),last=(appNotifications||[]).find(n=>notificationSignature(n)===sig&&now-new Date(n.createdAt).getTime()<10*60*1000);
  if(last)return;
  appNotifications.unshift(candidate);saveAppNotifications();
  nativeNotificationAction('show',{id:candidate.id,kind:kind,title:title,body:body,badge:unreadNotificationCount()});
}
function formatNotificationTime(value){try{return new Date(value).toLocaleString('ru-RU',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});}catch(e){return '';}}
function renderNotificationsPanel(){
  let list=document.getElementById('notificationList');if(!list)return;
  if(!appNotifications.length){list.innerHTML='<div class="notificationEmpty"><div class="notificationEmptyIcon">♡</div><div class="emptyTitle">Уведомлений нет</div></div>';return;}
  list.innerHTML='<div class="notificationCards">'+appNotifications.map(function(n){
    let isRating=n.kind==='rating',isSdo=n.kind==='sdo';
    let action=isRating?'Открыть отметку':(isSdo?'Открыть СДО':'Открыть день');
    let type=isRating?'Рейтинг':(isSdo?'СДО':'Расписание');
    let cls=isRating?'ratingNotice':(isSdo?'sdoNotice':'scheduleNotice');
    return '<button type="button" class="notificationCard '+cls+'" data-notification-id="'+esc(n.id)+'"><div class="notificationType">'+type+'</div><h3>'+esc(n.title)+'</h3><p>'+esc(n.body)+'</p><div class="notificationMeta">'+esc(n.groupName||'')+(n.book?' · '+esc(n.book):'')+'<span>'+esc(formatNotificationTime(n.createdAt))+'</span></div><div class="notificationOpen"><span>'+action+'</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></div></button>';
  }).join('')+'</div>';
  document.querySelectorAll('.notificationCard[data-notification-id]').forEach(function(card){card.onclick=function(){openNotificationTarget(this.dataset.notificationId);};});
}
function openNotificationsPanel(){
  closeDrawer();
  appNotifications.forEach(n=>n.read=true);saveAppNotifications();renderNotificationsPanel();
  document.getElementById('notificationPanel').classList.remove('hidden');
}
function closeNotificationsPanel(){let p=document.getElementById('notificationPanel');if(p)p.classList.add('hidden');}
function clearNotifications(){appNotifications=[];saveAppNotifications();renderNotificationsPanel();}
function setGroupFromNotification(n){
  if(!n||!n.groupId)return false;
  if(String(selectedGroup.id)===String(n.groupId))return false;
  selectedGroup={id:String(n.groupId),name:n.groupName||selectedGroup.name};writeJson(K_SELECTED_GROUP,selectedGroup);
  ratingGroup={id:selectedGroup.id,name:selectedGroup.name};writeJson(K_RATING_SELECTED_GROUP,ratingGroup);
  calendarEvents=[];calendarRange=null;allEvents=[];lastRange=null;updateGroupButton();
  return true;
}
function openScheduleNotification(n){
  let groupChanged=setGroupFromNotification(n);
  pendingScheduleMarks=(n&&n.extra&&Array.isArray(n.extra.changes)?n.extra.changes:[]).map(function(x){return {date:x.date||(n.extra.date||''),pair:x.pair||'',subject:x.subject||''};});
  section='schedule';localStorage.setItem(K_SECTION,section);closeNotificationsPanel();applySection();
  mode='day';let target=n&&n.extra&&(n.extra.date||((n.extra.dates||[])[0]));let parsed=target?parseDate(target):null;selectedDate=parsed||today();weekDate=startOfWeek(selectedDate);
  document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.mode==='day'));let nav=document.querySelector('.navrow');if(nav)nav.classList.remove('hidden');
  let cache=readGroupJson(K_CACHE_BASE,null);allEvents=cache&&cache.events?cache.events:[];lastRange=cache&&cache.start?{start:cache.start,end:cache.end}:null;render();
  setTimeout(function(){if(!pendingScheduleMarks.length)return;pendingScheduleMarks=[];document.querySelectorAll('.lessonButton.notificationChanged').forEach(function(x){x.classList.remove('notificationChanged');let d=x.querySelector('.cardChangeDot');if(d)d.remove();});},60000);
  setStatus(allEvents.length?'Открыт день изменения':'Загрузка дня изменения...');
  setTimeout(function(){let c=document.getElementById('content');if(c)c.scrollIntoView({block:'start'});},80);
  if(groupChanged||!allEvents.length)loadMain(false);
}
function openRatingNotification(n){
  if(n&&n.groupId){ratingGroup={id:String(n.groupId),name:n.groupName||ratingGroup.name};writeJson(K_RATING_SELECTED_GROUP,ratingGroup);}
  if(n&&n.bookUrl){selectedBook={label:n.book||'Зачётная книжка',url:n.bookUrl};writeJson(ratingBookKey(),selectedBook);}else{selectedBook=readJson(ratingBookKey(),selectedBook);}
  ratingPeriod=selectedBook?loadStoredRatingPeriod(selectedBook):normalizeRatingPeriod({});
  pendingRatingSubjects=[];pendingRatingMarks=[];
  if(n&&n.extra){
    if(n.extra.ratingPeriod&&selectedBook){ratingPeriod=normalizeRatingPeriod(n.extra.ratingPeriod);writeJson(ratingPeriodKey(selectedBook),ratingPeriod);}
    if(Array.isArray(n.extra.subjects))pendingRatingSubjects=n.extra.subjects.slice();else if(n.extra.subject)pendingRatingSubjects=[n.extra.subject];
    if(Array.isArray(n.extra.scoreChanges))pendingRatingMarks=n.extra.scoreChanges.map(function(x){return {subject:x.subject||n.extra.subject||'',label:x.label||'',oldValue:x.oldValue||'',newValue:x.newValue||'',kind:x.kind||'',isTotal:!!x.isTotal};});
  }
  section='rating';localStorage.setItem(K_SECTION,section);closeNotificationsPanel();applySection();updateBookButton();
  let cache=selectedBook?readJson(ratingCacheKey(selectedBook,ratingPeriod),null):null;if(cache){ratingData=cache;ratingPeriodOptions=sanitizeRatingPeriodOptions(cache.periodOptions||{years:[],semesters:[]});renderRating();}
  else{ratingData=null;renderRating();}
  loadRatingBooks();
}
function openNotificationTarget(id){
  let n=(appNotifications||[]).find(x=>String(x.id)===String(id));if(!n)return;
  n.read=true;saveAppNotifications();
  if(n.kind==='rating')openRatingNotification(n);else if(n.kind==='sdo')openSdoNotification(n);else openScheduleNotification(n);
}
window.mguuOpenNotification=function(id){openNotificationTarget(id);};
function scheduleChangeBody(changes){
  let a=changes.filter(x=>x.kind==='added').length,r=changes.filter(x=>x.kind==='removed').length,c=changes.filter(x=>x.kind==='changed').length,parts=[];
  if(a)parts.push('добавлено '+a);if(r)parts.push('отменено '+r);if(c)parts.push('изменено '+c);
  return 'Группа '+groupLabel()+': '+(parts.join(', ')||'обнаружены изменения')+'.';
}
function scheduleChangeDate(change){let e=change&&(change.now||change.old);return e&&e.date?e.date:'';}
function scheduleChangeDescription(change){
  let e=change&&(change.now||change.old);if(!e)return 'Обнаружено изменение расписания.';
  let prefix=change.kind==='added'?'Добавлено':change.kind==='removed'?'Отменено':'Изменено';
  return prefix+': '+e.pair+' пара · '+e.subject+(e.time?' · '+e.time:'')+'.';
}
function addScheduleChangeNotifications(changes){
  let byDate=new Map();(changes||[]).forEach(function(ch){let d=scheduleChangeDate(ch)||'';if(!byDate.has(d))byDate.set(d,[]);byDate.get(d).push(ch);});
  byDate.forEach(function(items,date){
    let d=parseDate(date),title='Расписание изменилось'+(d?' — '+fmtShort(d):'');
    let body=items.length===1?scheduleChangeDescription(items[0]):scheduleChangeBody(items);
    addAppNotification('schedule',title,body,{date:date,count:items.length,changes:items.map(function(ch){let e=ch.now||ch.old||{};return {kind:ch.kind,date:e.date||date,pair:e.pair||'',subject:e.subject||''};})});
  });
}
function ratingSubjectsSignature(data){return ratingSubjectsResolved(data).map(x=>({subject:x.subject,total:x.total,details:x.details}));}
function ratingScoreChanges(oldData,newData){
  let oldItems=ratingSubjectsSignature(oldData),newItems=ratingSubjectsSignature(newData);if(!oldItems.length||!newItems.length)return [];
  let oldMap=new Map(oldItems.map(x=>[normalizeSubject(x.subject),x])),changes=[];
  newItems.forEach(function(item){
    let old=oldMap.get(normalizeSubject(item.subject));if(!old)return;
    let oldDetails=new Map((old.details||[]).map(d=>[normalizeSubject(d.label),String(d.value||'')]));
    (item.details||[]).forEach(function(d){
      let key=normalizeSubject(d.label),before=oldDetails.has(key)?oldDetails.get(key):'',after=String(d.value||'');
      if(before===after)return;
      let looksGrade=/(кт\s*\d*|контрольн[а-яё]*\s+точк|балл|оценк|итог|общий|сумм|всего|рейтинг|экзамен|зач[её]т|результат)/i.test(d.label)||isScoreValue(after)||isScoreValue(before);
      if(!looksGrade)return;
      changes.push({subject:item.subject,label:d.label,oldValue:before,newValue:after,kind:before?'changed':'added',isTotal:/(итог|общий|сумм|всего|рейтинг|результат)/i.test(d.label)});
    });
  });
  return changes;
}
function addRatingChangeNotifications(changes,data){
  let groups=new Map();(changes||[]).forEach(function(ch){if(!groups.has(ch.subject))groups.set(ch.subject,[]);groups.get(ch.subject).push(ch);});
  groups.forEach(function(items,subject){
    items.sort(function(a,b){return Number(a.isTotal)-Number(b.isTotal);});let first=items[0],isNew=!first.oldValue||/^[-–—]$/.test(first.oldValue),title=isNew?'Новая оценка':'Изменилась оценка';
    let scoreText=isNew?(first.label+': '+first.newValue):(first.label+': '+first.oldValue+' → '+first.newValue);
    let body=subject+' · '+scoreText+(items.length>1?' · ещё изменений: '+(items.length-1):'')+'.';
    addAppNotification('rating',title,body,{subject:subject,subjects:[subject],scoreChanges:items,bookUrl:selectedBook&&selectedBook.url?selectedBook.url:'',ratingPeriod:normalizeRatingPeriod(ratingPeriod)});
  });
}

function savePersonalTasks(){
  personalTasks=(personalTasks||[]).filter(function(x){return x&&x.id&&x.date&&x.time&&x.text;});
  writeJson(K_PERSONAL_TASKS,personalTasks);
}
function timeMinutes(value){
  let m=/^(\d{1,2}):(\d{2})/.exec(String(value||''));
  if(!m)return 24*60+999;
  return Math.max(0,Math.min(23,+m[1]))*60+Math.max(0,Math.min(59,+m[2]));
}
function tasksForDate(d){
  let key=portalDate(d);
  return (personalTasks||[]).filter(function(x){return x.date===key;});
}
function combinedItemsForDate(d,lessonList){
  let lessons=eventsForDate(d,lessonList).map(function(e){return {kind:'lesson',data:e};});
  let tasks=tasksForDate(d).map(function(e){return {kind:'task',data:e};});
  return lessons.concat(tasks).sort(function(a,b){
    let am=timeMinutes(a.data.time),bm=timeMinutes(b.data.time);
    if(am!==bm)return am-bm;
    if(a.kind!==b.kind)return a.kind==='lesson'?-1:1;
    return String(a.data.pair||a.data.text||'').localeCompare(String(b.data.pair||b.data.text||''),'ru',{numeric:true});
  });
}
function personalTaskHtml(task){
  let bg=task.color&&pastel.includes(task.color)?task.color:pastel[0],fg=textColor(bg);
  return `<button type="button" class="lesson personalTask" data-task-id="${esc(task.id)}" style="--card:${bg};--ink:${fg}"><div class="pair"><b>Д</b><span>дело</span></div><div class="time taskTime">${esc(task.time)}</div><div class="info"><h3>${esc(task.text)}</h3></div></button>`;
}
function scheduleItemHtml(item){return item.kind==='task'?personalTaskHtml(item.data):cardHtml(item.data);}
function addTaskButtonHtml(d){
  return `<div class="addTaskWrap"><button type="button" class="addTaskButton" data-task-date="${esc(portalDate(d))}" aria-label="Добавить дело"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button></div>`;
}
function bindPersonalTaskControls(){
  document.querySelectorAll('.addTaskButton[data-task-date]').forEach(function(btn){btn.onclick=function(){openPersonalTaskEditor(null,this.dataset.taskDate);};});
  document.querySelectorAll('.personalTask[data-task-id]').forEach(function(btn){btn.onclick=function(){openPersonalTaskEditor(this.dataset.taskId);};});
}
function taskColorGrid(selected){
  return '<div class="pickerHint">Цвет карточки</div><div class="swatchGrid taskSwatchGrid">'+pastel.map(function(c){return `<button type="button" class="swatchBtn taskColorSwatch${c===selected?' selected':''}" data-task-color="${c}" style="--swatch:${c}" aria-label="Выбрать цвет"></button>`;}).join('')+'</div>';
}
function openPersonalTaskEditor(id,dateValue){
  let current=id?(personalTasks||[]).find(function(x){return String(x.id)===String(id);}):null;
  let date=current&&current.date?current.date:(dateValue||portalDate(selectedDate));
  let color=current&&pastel.includes(current.color)?current.color:pastel[hash(date+String(Date.now()))%pastel.length];
  let time=current&&current.time?current.time:'12:00';
  let text=current&&current.text?current.text:'';
  let actions=current?'<button id="deletePersonalTask" type="button" class="danger">Удалить</button><button id="savePersonalTask" type="button" class="primary">Сохранить</button>':'<button id="cancelPersonalTask" type="button" class="secondary">Отмена</button><button id="savePersonalTask" type="button" class="primary">Сохранить</button>';
  openModal(current?'Изменить дело':'Новое дело',`<div class="form taskForm"><div class="hint">${esc(date)}</div><label>Время<input id="personalTaskTime" type="time" value="${esc(time)}"></label><label>Заметка или дело<input id="personalTaskText" type="text" maxlength="160" value="${esc(text)}" placeholder="Например, позвонить преподавателю"></label>${taskColorGrid(color)}<div id="personalTaskError" class="taskError hidden"></div><div class="modalActions">${actions}</div></div>`);
  let chosen=color;
  function bindColors(){document.querySelectorAll('.taskColorSwatch').forEach(function(btn){btn.onclick=function(){chosen=this.dataset.taskColor;document.querySelectorAll('.taskColorSwatch').forEach(function(x){x.classList.toggle('selected',x.dataset.taskColor===chosen);});};});}
  bindColors();
  let cancel=document.getElementById('cancelPersonalTask');if(cancel)cancel.onclick=closeModal;
  let del=document.getElementById('deletePersonalTask');if(del)del.onclick=function(){personalTasks=personalTasks.filter(function(x){return String(x.id)!==String(id);});savePersonalTasks();closeModal();render();};
  document.getElementById('savePersonalTask').onclick=function(){
    let tm=String(document.getElementById('personalTaskTime').value||'').trim();
    let tx=cleanLine(document.getElementById('personalTaskText').value||'');
    let err=document.getElementById('personalTaskError');
    if(!tm||!tx){if(err){err.textContent='Укажите время и текст дела.';err.classList.remove('hidden');}return;}
    if(current){current.time=tm;current.text=tx;current.color=chosen;}
    else personalTasks.push({id:'task_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),date:date,time:tm,text:tx,color:chosen,createdAt:new Date().toISOString()});
    savePersonalTasks();closeModal();render();
  };
}

function monthStart(d){return new Date(d.getFullYear(),d.getMonth(),1,12);}
function monthKey(d){return d.getFullYear()+'-'+pad(d.getMonth()+1);}
function subjectOccurrenceDates(subject){return [...new Set((allEvents||[]).filter(function(e){return normalizeSubject(e.subject)===normalizeSubject(subject);}).map(function(e){return e.date;}))].sort(function(a,b){return dateIso(a).localeCompare(dateIso(b));});}
function openSubjectCalendar(subject,dateValue){
  let occurrence=subjectOccurrenceDates(subject),base=parseDate(dateValue)||selectedDate;
  subjectCalendarState={subject:subject,month:monthStart(base),dates:occurrence};
  openModal(subject,'<div id="subjectCalendarBody"></div>');renderSubjectCalendar();
}
function renderSubjectCalendar(){
  let st=subjectCalendarState,host=document.getElementById('subjectCalendarBody');if(!st||!host)return;
  let m=st.month,first=monthStart(m),offset=(first.getDay()+6)%7,days=new Date(m.getFullYear(),m.getMonth()+1,0).getDate(),active=new Set(st.dates),bg=cardColor(st.subject),fg=textColor(bg);
  let occurrenceMonths=st.dates.map(parseDate).filter(Boolean).map(monthKey),minM=occurrenceMonths.length?occurrenceMonths.sort()[0]:monthKey(m),maxM=occurrenceMonths.length?occurrenceMonths.sort().slice(-1)[0]:monthKey(m);
  let cells='';for(let i=0;i<offset;i++)cells+='<span class="subjectDay blank"></span>';
  for(let day=1;day<=days;day++){
    let d=new Date(m.getFullYear(),m.getMonth(),day,12),ds=portalDate(d),has=active.has(ds),isToday=iso(d)===iso(today());
    cells+='<button type="button" class="subjectDay'+(has?' hasSubject':'')+(isToday?' today':'')+'" '+(has?'data-subject-date="'+esc(ds)+'"':'disabled')+' style="'+(has?'--subjectDay:'+bg+';--subjectInk:'+fg:'')+'">'+day+'</button>';
  }
  host.innerHTML='<div class="subjectCalendar"><div class="subjectCalendarNav"><button id="subjectMonthPrev" type="button" class="navbtn" '+(monthKey(m)<=minM?'disabled':'')+'><svg class="btnSvg navSvg" viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></svg></button><b>'+['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'][m.getMonth()]+' '+m.getFullYear()+'</b><button id="subjectMonthNext" type="button" class="navbtn" '+(monthKey(m)>=maxM?'disabled':'')+'><svg class="btnSvg navSvg" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></button></div><div class="subjectWeekdays"><span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span></div><div class="subjectCalendarGrid">'+cells+'</div><div class="subjectCalendarHint">Отмечено занятий: '+st.dates.length+'</div></div>';
  let prev=document.getElementById('subjectMonthPrev'),next=document.getElementById('subjectMonthNext');if(prev)prev.onclick=function(){st.month=new Date(st.month.getFullYear(),st.month.getMonth()-1,1,12);renderSubjectCalendar();};if(next)next.onclick=function(){st.month=new Date(st.month.getFullYear(),st.month.getMonth()+1,1,12);renderSubjectCalendar();};
  host.querySelectorAll('.subjectDay[data-subject-date]').forEach(function(btn){btn.onclick=function(){goToSubjectDate(this.dataset.subjectDate,st.subject);};});
}
function goToSubjectDate(dateValue,subject){
  let d=parseDate(dateValue);if(!d)return;closeModal();section='schedule';localStorage.setItem(K_SECTION,section);applySection();mode='day';selectedDate=d;weekDate=startOfWeek(d);pendingScheduleSubjectJump={date:dateValue,subject:subject};document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.mode==='day'));let nav=document.querySelector('.navrow');if(nav)nav.classList.remove('hidden');render();
}
function bindLessonCards(){
  document.querySelectorAll('.lessonButton[data-lesson-subject]').forEach(function(btn){btn.onclick=function(){openSubjectCalendar(this.dataset.lessonSubject,this.dataset.lessonDate);};});
  let changedCards=document.querySelectorAll('.lessonButton.notificationChanged');if(changedCards.length&&!document.body.dataset.scheduleDotTimer){document.body.dataset.scheduleDotTimer='1';setTimeout(function(){pendingScheduleMarks=[];document.querySelectorAll('.lessonButton.notificationChanged').forEach(function(x){x.classList.remove('notificationChanged');let d=x.querySelector('.cardChangeDot');if(d)d.remove();});delete document.body.dataset.scheduleDotTimer;},4200);}
  if(pendingScheduleSubjectJump){let target=Array.from(document.querySelectorAll('.lessonButton[data-lesson-subject]')).find(function(btn){return btn.dataset.lessonDate===pendingScheduleSubjectJump.date&&normalizeSubject(btn.dataset.lessonSubject)===normalizeSubject(pendingScheduleSubjectJump.subject);});if(target){target.classList.add('subjectJumpTarget');setTimeout(function(){target.scrollIntoView({behavior:'smooth',block:'center'});},80);setTimeout(function(){target.classList.remove('subjectJumpTarget');},2800);pendingScheduleSubjectJump=null;}}
}

function groupStorageKey(base){return base+'_'+selectedGroup.id;}
function legacyKey(base){if(base===K_CACHE_BASE)return LEGACY_CACHE;if(base===K_SNAPSHOT_BASE)return LEGACY_SNAPSHOT;if(base===K_CHANGES_BASE)return LEGACY_CHANGES;return '';}
function readGroupJson(base,f){let v=readJson(groupStorageKey(base),null);if(v!==null)return v;if(selectedGroup.id===DEFAULT_GROUP.id){let lk=legacyKey(base),old=lk?readJson(lk,null):null;if(old!==null){writeJson(groupStorageKey(base),old);return old;}}return f;}
function writeGroupJson(base,v){writeJson(groupStorageKey(base),v);}
function naturalGroupSort(a,b){let ay=(/^\d{2}/.exec(a.name)||['00'])[0],by=(/^\d{2}/.exec(b.name)||['00'])[0];if(ay!==by)return by.localeCompare(ay,'ru',{numeric:true});return a.name.localeCompare(b.name,'ru',{numeric:true,sensitivity:'base'});}
function groupLabel(){return selectedGroup.name||DEFAULT_GROUP.name;}
function ratingGroupLabel(){return ratingGroup.name||groupLabel();}
function scheduleNotificationScope(group){let g=group||selectedGroup;return String(g&&g.id||'');}
function ratingNotificationScope(book){let p=ratingPeriod||{};return String(ratingGroup&&ratingGroup.id||'')+'|'+String(book&&book.url||'')+'|'+String(p.year||'')+'|'+String(p.semester||'');}
function hash(s){let h=0;for(let i=0;i<s.length;i++)h=((h<<5)-h+s.charCodeAt(i))|0;return Math.abs(h);}
function cardColor(subject){return colors[subject]||pastel[hash(subject)%pastel.length];}
function textColor(hex){let h=(hex||'').replace('#','');if(h.length!==6)return '#1f2937';let r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);return (0.299*r+0.587*g+0.114*b)>155?'#172033':'#ffffff';}
function normalizeType(s){if(!s)return '';if(/выезд/i.test(s))return 'Выездное занятие';if(/практи/i.test(s))return 'Практическое занятие';if(/лекц/i.test(s))return 'Лекция';return s;}
function cleanLine(s){return String(s||'').replace(/\u00a0/g,' ').replace(/^\s*\|\s*/,'').replace(/\s+/g,' ').trim();}

function parseScheduleTokens(tokens){
  let raw=(tokens||[]).map(cleanLine).filter(Boolean);
  let out=[],currentDate='';
  for(let i=0;i<raw.length;i++){
    if(/^\d{2}\.\d{2}\.\d{4}$/.test(raw[i])){currentDate=raw[i];continue;}
    let pm=/^№\s*пары\s*[-–—:]\s*(\d+)/i.exec(raw[i]);
    if(!pm||!currentDate)continue;
    let pair=pm[1],time='',fields=[];
    i++;
    while(i<raw.length&&!/^\d{1,2}:\d{2}\s*[-–—]\s*\d{1,2}:\d{2}$/.test(raw[i])){
      if(/^№\s*пары/i.test(raw[i])||/^\d{2}\.\d{2}\.\d{4}$/.test(raw[i])){i--;break;}
      i++;
    }
    if(i<raw.length&&/^\d{1,2}:\d{2}\s*[-–—]\s*\d{1,2}:\d{2}$/.test(raw[i]))time=raw[i].replace(/[–—]/g,'-');
    i++;
    while(i<raw.length&&!/^№\s*пары/i.test(raw[i])&&!/^\d{2}\.\d{2}\.\d{4}$/.test(raw[i])){
      let v=cleanLine(raw[i]);
      if(v&&!/^(Первая|Вторая)\s+подгруппа$/i.test(v)&&!/^К выбору группы$/i.test(v)&&!/^Контакты$/i.test(v)&&!/^Расписание занятий/i.test(v))fields.push(v);
      i++;
    }
    i--;
    if(!fields.length)continue;
    let subject=fields[0]||'';
    let room='',type='',teacher='';
    for(let j=1;j<fields.length;j++){
      let v=fields[j];
      if(!room&&(/^(Ауд\.|ауд\.)/i.test(v)||/^(Онлайн|Дистанционно)/i.test(v))){room=v;continue;}
      if(!type&&/(лекц|практи|выезд|семинар|экзамен|зач[её]т|консультац)/i.test(v)){type=normalizeType(v);continue;}
      if(!teacher)teacher=v;
    }
    out.push({date:currentDate,pair:String(pair),time:time,subject:subject,teacher:teacher,room:room,type:type});
  }
  out.sort(function(a,b){return dateIso(a.date).localeCompare(dateIso(b.date))||(+a.pair)-(+b.pair)||a.subject.localeCompare(b.subject)||a.teacher.localeCompare(b.teacher);});
  return out;
}
function parseScheduleText(text){return parseScheduleTokens(String(text||'').split(/\r?\n/));}
function parseScheduleDoc(doc){
  if(!doc)return [];
  let headings=[];
  try{headings=Array.from(doc.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(function(el){return el.textContent||'';});}catch(e){}
  let events=parseScheduleTokens(headings);
  if(events.length)return events;
  let blocks=[];
  try{blocks=Array.from(doc.querySelectorAll('div,p,li,td,th,span,strong,b')).map(function(el){return el.textContent||'';});}catch(e){}
  events=parseScheduleTokens(blocks);
  if(events.length)return events;
  let text='';
  try{text=(doc.body&&(doc.body.innerText||doc.body.textContent))||'';}catch(e){}
  return parseScheduleText(text);
}

function eventId(e){return [e.date,e.pair,e.time,e.subject,e.teacher,e.room,e.type].join('|');}
function baseId(e){return [e.date,e.pair,e.subject].join('|');}
function compareSnapshots(oldS,newS){
  if(!oldS||!oldS.events||!oldS.start||!oldS.end)return [];
  let lo=oldS.start>newS.start?oldS.start:newS.start;
  let hi=oldS.end<newS.end?oldS.end:newS.end;
  let oldE=oldS.events.filter(e=>dateIso(e.date)>=lo&&dateIso(e.date)<=hi),newE=newS.events.filter(e=>dateIso(e.date)>=lo&&dateIso(e.date)<=hi);
  let oldMap=new Map(oldE.map(e=>[eventId(e),e])),newMap=new Map(newE.map(e=>[eventId(e),e]));
  let removed=oldE.filter(e=>!newMap.has(eventId(e))),added=newE.filter(e=>!oldMap.has(eventId(e))),changes=[];
  let used=new Set();
  removed.forEach(function(o){let k=baseId(o),idx=added.findIndex((a,n)=>!used.has(n)&&baseId(a)===k);if(idx>=0){used.add(idx);changes.push({kind:'changed',old:o,now:added[idx]});}else changes.push({kind:'removed',old:o});});
  added.forEach(function(a,n){if(!used.has(n))changes.push({kind:'added',now:a});});
  return changes;
}

function makeUrl(start,end,group){let g=group||selectedGroup;return BASE_URL+'?groupid='+encodeURIComponent(g.id)+'&groupname='+encodeURIComponent(g.name)+'&startDate='+encodeURIComponent(portalDate(start))+'&endDate='+encodeURIComponent(portalDate(end))+'#schedule';}
async function fetchRange(start,end,group){
  let r=await fetch(makeUrl(start,end,group),{cache:'no-store',credentials:'same-origin'});
  if(!r.ok)throw new Error('Сервер вернул '+r.status);
  let html=await r.text();
  let doc=new DOMParser().parseFromString(html,'text/html');
  let events=parseScheduleDoc(doc);
  let marker='';try{marker=(doc.body&&(doc.body.textContent||''))||'';}catch(e){}
  if(!events.length&&/№\s*пары/i.test(marker))throw new Error('Портал открылся, но формат расписания не распознан');
  return events;
}

async function fetchGroups(){
  let r=await fetch(BASE_URL,{cache:'no-store',credentials:'same-origin'});
  if(!r.ok)throw new Error('Сервер вернул '+r.status);
  let html=await r.text(),doc=new DOMParser().parseFromString(html,'text/html'),groups=[],seen=new Set();
  Array.from(doc.querySelectorAll('a[href]')).forEach(function(a){
    try{
      let u=new URL(a.getAttribute('href')||'',BASE_URL),id=u.searchParams.get('groupid'),name=u.searchParams.get('groupname')||cleanLine(a.textContent||'');
      if(!id||!name)return;
      let key=id+'|'+name;if(seen.has(key))return;seen.add(key);groups.push({id:id,name:name});
    }catch(e){}
  });
  groups.sort(naturalGroupSort);
  if(!groups.length)throw new Error('Список групп на портале не найден');
  writeJson(K_GROUPS_CACHE,{checkedAt:new Date().toISOString(),groups:groups});
  return groups;
}

function ratingBookKey(){return K_RATING_BOOK_BASE+'_'+ratingGroup.id;}
function ratingBooksKey(){return K_RATING_BOOKS_BASE+'_'+ratingGroup.id;}
function ratingPeriodKey(book){return K_RATING_PERIOD_BASE+'_'+ratingGroup.id+'_'+hash((book&&book.url)||'none');}
function normalizeRatingPeriod(p){p=p&&typeof p==='object'?p:{};return {year:String(p.year||''),yearLabel:String(p.yearLabel||p.year||''),semester:String(p.semester||''),semesterLabel:String(p.semesterLabel||p.semester||'')};}
function loadStoredRatingPeriod(book){return sanitizeRatingPeriod(normalizeRatingPeriod(readJson(ratingPeriodKey(book),{})));}
function saveRatingPeriod(){if(selectedBook){ratingPeriod=sanitizeRatingPeriod(ratingPeriod);writeJson(ratingPeriodKey(selectedBook),ratingPeriod);}}
function ratingCacheKey(book,period){let p=normalizeRatingPeriod(period||ratingPeriod);return K_RATING_CACHE_BASE+'_'+ratingGroup.id+'_'+hash(String(book&&book.url||'none')+'|'+p.year+'|'+p.semester);}
function ratingDetailCacheKey(url){return K_RATING_DETAIL_CACHE_BASE+'_'+hash(String(url||''));}
function ratingReadDetailCache(url){let v=readJson(ratingDetailCacheKey(url),null);return v&&Array.isArray(v.points)?v:null;}
function ratingReadDetailPoints(url){let v=ratingReadDetailCache(url);return v?v.points:null;}
function ratingWriteDetailPoints(url,points){if(!url||!Array.isArray(points))return;writeJson(ratingDetailCacheKey(url),{checkedAt:new Date().toISOString(),points:points.map(function(p,i){return {label:'Контрольная точка '+(i+1),value:cleanLine(p&&p.value||'')||'—'};})});}
function ratingControlPointsHaveValues(points){return Array.isArray(points)&&points.some(function(p){let v=cleanLine(p&&p.value||'');return !!v&&!/^[—–-]$/.test(v);});}
function ratingPlaceholderControlPoints(){return [1,2,3,4,5].map(function(n){return {label:'Контрольная точка '+n,value:'—'};});}
function ratingApplyStoredControlPoints(subjects){(subjects||[]).forEach(function(item){let cached=item&&item.detailUrl?ratingReadDetailPoints(item.detailUrl):null;ratingReplaceModuleOneWithControlPoints(item,cached||ratingPlaceholderControlPoints());});return subjects||[];}
function ratingGroupUrl(group){let g=group||ratingGroup;return RATING_URL+'?groupid='+encodeURIComponent(g.id)+'&groupname='+encodeURIComponent(g.name);}
async function fetchHtmlDoc(url){
  let r=await fetch(toPortalProxyUrl(url),{cache:'no-store',credentials:'same-origin'});
  if(!r.ok)throw new Error('Сервер вернул '+r.status);
  let html=await r.text();
  return new DOMParser().parseFromString(html,'text/html');
}
function parseRatingGroupsDoc(doc){
  let groups=[],seen=new Set();
  Array.from(doc.querySelectorAll('a[href]')).forEach(function(a){
    try{
      let u=new URL(a.getAttribute('href')||'',RATING_URL),id=u.searchParams.get('groupid'),name=u.searchParams.get('groupname')||cleanLine(a.textContent||'');
      if(!id||!name)return;
      let key=id+'|'+name;if(seen.has(key))return;seen.add(key);groups.push({id:id,name:name});
    }catch(e){}
  });
  groups.sort(naturalGroupSort);return groups;
}
async function fetchRatingGroups(){
  let doc=await fetchHtmlDoc(RATING_URL),groups=parseRatingGroupsDoc(doc);
  if(!groups.length)throw new Error('Список групп рейтинга на портале не найден');
  writeJson(K_RATING_GROUPS,{checkedAt:new Date().toISOString(),groups:groups});
  return groups;
}
function normalizeBookLabel(label,url){
  let s=cleanLine(label||'');
  if(s&&s.length<120)return s;
  try{
    let u=new URL(url,RATING_URL),vals=[];
    u.searchParams.forEach(function(v,k){if(k!=='groupid'&&k!=='groupname'&&v)vals.push(v);});
    if(vals.length)return vals.join(' · ');
  }catch(e){}
  return 'Зачётная книжка';
}
function parseRatingBooksDoc(doc,group){
  let books=[],seen=new Set(),base=ratingGroupUrl(group);
  function add(label,url){
    try{
      let u=new URL(url,base);
      if(!/^https?:$/.test(u.protocol))return;
      let gid=u.searchParams.get('groupid');if(gid&&gid!==group.id)return;
      let params=[];u.searchParams.forEach(function(v,k){if(k!=='groupid'&&k!=='groupname'&&v)params.push(k+'='+v);});
      let path=(u.pathname||'').toLowerCase();
      let lbl=normalizeBookLabel(label,u.href);
      let looksBook=params.length>0||(path.indexOf('rating')>=0&&/\d{3,}/.test(lbl));
      if(!looksBook||/к выбору группы|правила рейтинга|новости|расписание|ресурсы|мероприятия|сервисы/i.test(lbl))return;
      let key=u.href;if(seen.has(key))return;seen.add(key);books.push({label:lbl,url:u.href});
    }catch(e){}
  }
  Array.from(doc.querySelectorAll('a[href]')).forEach(a=>add(a.textContent||'',a.getAttribute('href')||''));
  Array.from(doc.querySelectorAll('form')).forEach(function(form){
    let action=form.getAttribute('action')||base;
    Array.from(form.querySelectorAll('select')).forEach(function(sel){
      if(typeof ratingSelectKind==='function'&&ratingSelectKind(sel))return;
      let pname=sel.name||sel.id||'book';
      Array.from(sel.options||[]).forEach(function(opt){
        let val=String(opt.value||'').trim(),lbl=cleanLine(opt.textContent||'');
        if(!val||!lbl||/выберите/i.test(lbl))return;
        try{
          if(/^https?:|^\//i.test(val)){add(lbl,val);return;}
          let u=new URL(action,base);u.searchParams.set('groupid',group.id);u.searchParams.set('groupname',group.name);u.searchParams.set(pname,val);add(lbl,u.href);
        }catch(e){}
      });
    });
  });
  books.sort((a,b)=>a.label.localeCompare(b.label,'ru',{numeric:true,sensitivity:'base'}));
  return books;
}
async function fetchRatingBooks(group){
  let doc=await fetchHtmlDoc(ratingGroupUrl(group)),books=parseRatingBooksDoc(doc,group);
  if(!books.length)throw new Error('На странице группы не найдены зачётные книжки');
  writeJson(ratingBooksKey(),{checkedAt:new Date().toISOString(),books:books});return books;
}
function ratingElementDescriptor(el){
  // Descriptor is intentionally local. Do not inspect broad parent text: on the
  // real portal the rating table lives near the period controls, and broad
  // parent text caused discipline links to be mistaken for year/semester items.
  let bits=[el&&el.name,el&&el.id,el&&el.getAttribute&&el.getAttribute('aria-label'),el&&el.getAttribute&&el.getAttribute('title'),el&&el.getAttribute&&el.getAttribute('data-name')].filter(Boolean).map(cleanLine);
  try{let id=el.id;if(id){let lab=el.ownerDocument.querySelector('label[for="'+id.replace(/"/g,'\\"')+'"]');if(lab)bits.push(cleanLine(lab.textContent||''));}}catch(e){}
  try{let lab=el.closest('label');if(lab)bits.push(cleanLine(lab.textContent||''));}catch(e){}
  try{let prev=el.previousElementSibling;if(prev&&/label|span|b|strong|legend|h[1-6]/i.test(prev.tagName||''))bits.push(cleanLine(prev.textContent||''));}catch(e){}
  return bits.join(' · ');
}
function ratingSelectDescriptor(sel){return ratingElementDescriptor(sel);}
function ratingSelectOptions(sel){
  return Array.from(sel&&sel.options||[]).map(function(opt){return {value:String(opt.value||''),label:cleanLine(opt.textContent||''),selected:!!opt.selected};}).filter(function(o){return o.label&&!/^(?:выберите.*|--+|—+)$/i.test(o.label);});
}
function ratingLooksLikeYearLabel(x){
  x=cleanLine(x||'');
  // A study year is a span, not an opaque portal id such as 00000015.
  return /^(?:19|20)\d{2}\s*[-–—\/]\s*(?:(?:19|20)\d{2}|\d{2})(?:\s*(?:учебн[а-яё]*\s*год|уч\.?\s*год))?$/i.test(x)||/^(?:учебн[а-яё]*\s*год\s*)?(?:19|20)\d{2}\s*[-–—\/]\s*(?:(?:19|20)\d{2}|\d{2})$/i.test(x);
}
function ratingLooksLikeSemesterLabel(x){
  x=cleanLine(x||'');
  return /^(?:(?:[1-9]|i{1,3}|iv)\s*(?:-?\s*й)?\s*семестр|семестр\s*(?:[1-9]|i{1,3}|iv)|(?:осенн|весенн)[а-яё]*\s*семестр)$/i.test(x);
}
function ratingLooksLikeSemesterShort(x){return /^[1-9]$/.test(cleanLine(x||''));}
function ratingPeriodKindFromText(text){
  let d=cleanLine(text||'').toLowerCase();
  if(/учебн[а-яё]*\s*год|academic\s*year|study\s*year|(?:^|[^a-zа-я])year(?:[^a-zа-я]|$)|uch(?:eb)?(?:ny)?[_-]?year|uchgod|studyyear|study_year|academic_year|schoolyear/i.test(d))return 'year';
  if(/семестр|semester|(?:^|[^a-zа-я])sem(?:[^a-zа-я]|$)|semestr|term[_-]?id|studyterm/i.test(d))return 'semester';
  return '';
}
function ratingSelectKind(sel){
  let opts=ratingSelectOptions(sel),labels=opts.map(o=>o.label),own=[sel&&sel.name,sel&&sel.id,sel&&sel.getAttribute&&sel.getAttribute('aria-label'),sel&&sel.getAttribute&&sel.getAttribute('title')].filter(Boolean).join(' '),ownKind=ratingPeriodKindFromText(own);
  if(ownKind)return ownKind;
  let yearLike=labels.filter(ratingLooksLikeYearLabel).length,semLike=labels.filter(x=>ratingLooksLikeSemesterLabel(x)||ratingLooksLikeSemesterShort(x)).length;
  if(yearLike&&yearLike>=Math.max(1,Math.ceil(opts.length*.50)))return 'year';
  if(semLike&&semLike>=Math.max(1,Math.ceil(opts.length*.50)))return 'semester';
  let d=ratingSelectDescriptor(sel),byText=ratingPeriodKindFromText(d);if(byText)return byText;
  return '';
}
function ratingControlForKind(doc,kind){
  let matches=Array.from(doc.querySelectorAll('select')).filter(function(sel){return ratingSelectKind(sel)===kind;});
  if(!matches.length)return null;
  matches.sort(function(a,b){let da=ratingSelectDescriptor(a),db=ratingSelectDescriptor(b),ra=kind==='year'?/учебн|year|год/i.test(da):/семестр|semester|sem/i.test(da),rb=kind==='year'?/учебн|year|год/i.test(db):/семестр|semester|sem/i.test(db);return Number(rb)-Number(ra);});
  return matches[0];
}
function ratingAssociatedLabel(el){
  let t='';
  try{let id=el.id;if(id){let lab=el.ownerDocument.querySelector('label[for="'+id.replace(/"/g,'\\"')+'"]');if(lab)t=cleanLine(lab.textContent||'');}}catch(e){}
  if(!t)try{let lab=el.closest('label');if(lab)t=cleanLine(lab.textContent||'');}catch(e){}
  if(!t)try{let sib=el.nextElementSibling;if(sib)t=cleanLine(sib.textContent||'');}catch(e){}
  if(!t)t=cleanLine(el.getAttribute&&el.getAttribute('aria-label')||el.value||'');
  return t;
}
function ratingExtractJsUrl(el,sourceUrl){
  let raw='';
  try{raw=String(el.getAttribute('data-url')||el.getAttribute('data-href')||el.getAttribute('href')||'').trim();}catch(e){}
  if(raw&&raw!=='#'&&!/^javascript:/i.test(raw)){try{return new URL(raw,sourceUrl).href;}catch(e){}}
  let js='';try{js=String(el.getAttribute('onclick')||'');}catch(e){}
  let m=js.match(/(?:location(?:\.href)?|window\.location(?:\.href)?)\s*=\s*['\"]([^'\"]+)['\"]/i)||js.match(/(?:open|location\.assign|location\.replace)\s*\(\s*['\"]([^'\"]+)['\"]/i);
  if(m&&m[1])try{return new URL(m[1],sourceUrl).href;}catch(e){}
  return '';
}
function ratingUrlPeriodValue(url,kind,sourceUrl){
  try{
    let u=new URL(url,sourceUrl),found=null;
    u.searchParams.forEach(function(v,k){if(found)return;let kk=ratingPeriodKindFromText(k);if(kk===kind)found={field:k,value:String(v||'')};});
    return found;
  }catch(e){return null;}
}
function ratingCanonicalYearLabel(label){
  let t=cleanLine(label||'').replace(/\s+/g,' '),m=t.match(/((?:19|20)\d{2})\s*[-–—\/]\s*((?:19|20)\d{2}|\d{2})/i);if(!m)return t;
  let a=m[1],b=m[2];if(b.length===2)b=a.slice(0,2)+b;return a+'/'+b+' учебный год';
}
function ratingCanonicalYearKey(label){
  let c=ratingCanonicalYearLabel(label),m=c.match(/((?:19|20)\d{2})\/((?:19|20)\d{2})/);return m?m[1]+'-'+m[2]:cleanLine(c).toLowerCase();
}
function ratingCanonicalSemesterKey(label){
  let t=cleanLine(label||'').toLowerCase().replace(/ё/g,'е');if(/осенн/.test(t))return 'autumn';if(/весенн/.test(t))return 'spring';let m=t.match(/(?:^|\s)([1-9]|i{1,3}|iv)(?:\s|$)/i);return m?String(m[1]).toLowerCase():t;
}
function ratingPeriodOptionRank(o){
  if(!o)return -1;let score=0;if(o.selected)score+=100;if(ratingOptionIsActionable(o))score+=50;let mode=String(o.mode||'').toLowerCase();if(mode==='form'||mode==='url'||mode==='catalog')score+=12;if(mode==='live')score+=8;if(mode!=='filter')score+=4;if(o.field)score+=3;if(o.url)score+=3;if(/^\d{3,}$/.test(String(o.value||'')))score+=2;return score;
}
function ratingMergeOptionRecord(a,b){
  if(!a)return Object.assign({},b||{});if(!b)return Object.assign({},a||{});let preferred=ratingPeriodOptionRank(b)>ratingPeriodOptionRank(a)?b:a,other=preferred===a?b:a,out=Object.assign({},preferred);
  ['field','url','mode','yearLabel','yearValue'].forEach(function(k){if(!out[k]&&other[k])out[k]=other[k];});out.selected=!!(a.selected||b.selected);return out;
}
function sanitizeRatingPeriodOptions(opts){
  opts=opts&&typeof opts==='object'?opts:{};
  let yearMap=new Map(),semesterMap=new Map();
  (opts.years||[]).forEach(function(o){
    if(!o||!ratingLooksLikeYearLabel(o.label||''))return;let item=Object.assign({},o),canonical=ratingCanonicalYearLabel(item.label||item.value||'');item.label=canonical;if(item.yearLabel)item.yearLabel=ratingCanonicalYearLabel(item.yearLabel);
    let key=ratingCanonicalYearKey(canonical),existing=yearMap.get(key);yearMap.set(key,ratingMergeOptionRecord(existing,item));
  });
  (opts.semesters||[]).forEach(function(o){
    if(!o||(!ratingLooksLikeSemesterLabel(o.label||'')&&!ratingLooksLikeSemesterShort(o.label||'')))return;let item=Object.assign({},o);if(item.yearLabel)item.yearLabel=ratingCanonicalYearLabel(item.yearLabel);
    let yk=item.yearLabel?ratingCanonicalYearKey(item.yearLabel):'*',key=yk+'|'+ratingCanonicalSemesterKey(item.label||item.value||''),existing=semesterMap.get(key);semesterMap.set(key,ratingMergeOptionRecord(existing,item));
  });
  let years=Array.from(yearMap.values());years.sort(function(a,b){let ay=parseInt((a.label.match(/(?:19|20)\d{2}/)||['0'])[0],10)||0,by=parseInt((b.label.match(/(?:19|20)\d{2}/)||['0'])[0],10)||0;return by-ay;});
  return {years:years,semesters:Array.from(semesterMap.values())};
}
function sanitizeRatingPeriod(p){
  p=normalizeRatingPeriod(p||{});let yLabel=cleanLine(p.yearLabel||''),sLabel=cleanLine(p.semesterLabel||'');
  if(!(ratingLooksLikeYearLabel(yLabel)||(!yLabel&&ratingLooksLikeYearLabel(p.year)))){p.year='';p.yearLabel='';}else if(yLabel){p.yearLabel=ratingCanonicalYearLabel(yLabel);}else if(ratingLooksLikeYearLabel(p.year)){p.yearLabel=ratingCanonicalYearLabel(p.year);}
  if(!(ratingLooksLikeSemesterLabel(sLabel)||ratingLooksLikeSemesterShort(sLabel)||(!sLabel&&(ratingLooksLikeSemesterLabel(p.semester)||ratingLooksLikeSemesterShort(p.semester))))){p.semester='';p.semesterLabel='';}
  return p;
}
function ratingPeriodOptionsFromTables(doc){
  let years=[],semesters=[],seenY=new Set(),seenS=new Set();
  function push(list,seen,label,kind){
    label=cleanLine(label||'');if(!label)return;
    if(kind==='year'&&!ratingLooksLikeYearLabel(label))return;
    if(kind==='semester'&&!ratingLooksLikeSemesterLabel(label)&&!ratingLooksLikeSemesterShort(label))return;
    let key=label.toLowerCase();if(seen.has(key))return;seen.add(key);
    list.push({value:label,label:label,selected:false,field:'',url:'',mode:'filter'});
  }
  Array.from(doc.querySelectorAll('table')).forEach(function(table){
    let trs=Array.from(table.querySelectorAll('tr'));if(!trs.length)return;
    let headerIndex=-1,yidx=-1,sidx=-1;
    for(let i=0;i<Math.min(5,trs.length);i++){
      let cells=Array.from(trs[i].querySelectorAll('th,td')).map(td=>cleanLine(td.textContent||''));
      let yi=cells.findIndex(x=>/учебн[а-яё]*\s*год|год\s*обучения|academic\s*year|study\s*year/i.test(x));
      let si=cells.findIndex(x=>/семестр|semester|study\s*term/i.test(x));
      if(yi>=0||si>=0){headerIndex=i;yidx=yi;sidx=si;break;}
    }
    if(headerIndex<0)return;
    trs.slice(headerIndex+1).forEach(function(tr){
      let cells=Array.from(tr.querySelectorAll('th,td')).map(td=>cleanLine(td.textContent||''));
      if(yidx>=0)push(years,seenY,cells[yidx]||'','year');
      if(sidx>=0)push(semesters,seenS,cells[sidx]||'','semester');
    });
  });
  return {years:years,semesters:semesters};
}
function ratingExtractPeriodLabelsFromText(text){
  text=cleanLine(text||'');let years=[],semesters=[],seenY=new Set(),seenS=new Set();
  function add(list,seen,label){label=cleanLine(label||'');let key=label.toLowerCase();if(!label||seen.has(key))return;seen.add(key);list.push(label);}
  let ym,yr=/(?:19|20)\d{2}\s*[-–—\/]\s*(?:(?:19|20)\d{2}|\d{2})(?:\s*(?:учебн[а-яё]*\s*год|уч\.?\s*год))?/ig;
  while((ym=yr.exec(text)))add(years,seenY,ym[0]);
  [/(?:осенн[а-яё]*|весенн[а-яё]*)\s+семестр/ig,/(?:[1-9]|i{1,3}|iv)\s*(?:-?\s*й)?\s*семестр/ig,/семестр\s*(?:[1-9]|i{1,3}|iv)/ig].forEach(function(re){let m;while((m=re.exec(text)))add(semesters,seenS,m[0]);});
  return {years:years,semesters:semesters};
}
function ratingPeriodOptionsFromVisibleText(doc){
  let years=[],semesters=[],seenY=new Set(),seenS=new Set();
  function add(kind,label){
    label=cleanLine(label||'');if(!label||label.length>70)return;
    if(kind==='year'&&!ratingLooksLikeYearLabel(label))return;
    if(kind==='semester'&&!ratingLooksLikeSemesterLabel(label)&&!ratingLooksLikeSemesterShort(label))return;
    let seen=kind==='year'?seenY:seenS,list=kind==='year'?years:semesters,key=label.toLowerCase();if(seen.has(key))return;seen.add(key);
    list.push({value:label,label:label,selected:false,field:'',url:'',mode:'filter'});
  }
  function scanText(t){let found=ratingExtractPeriodLabelsFromText(t);found.years.forEach(x=>add('year',x));found.semesters.forEach(x=>add('semester',x));}
  Array.from(doc.querySelectorAll('option,label,legend,h1,h2,h3,h4,h5,h6,th,td,button,a,span,strong,b,div,p')).forEach(function(el){
    let t=cleanLine(el.textContent||'');if(!t||t.length>180)return;
    if(ratingLooksLikeYearLabel(t))add('year',t);
    if(ratingLooksLikeSemesterLabel(t)||ratingLooksLikeSemesterShort(t))add('semester',t);
    scanText(t);
  });
  try{let bodyText=cleanLine(doc.body&&((doc.body.innerText||doc.body.textContent)||'')||'');if(bodyText)scanText(bodyText);}catch(e){}
  return {years:years,semesters:semesters};
}
function ratingMergePeriodOptions(base,extra){
  base=sanitizeRatingPeriodOptions(base||{years:[],semesters:[]});extra=sanitizeRatingPeriodOptions(extra||{years:[],semesters:[]});
  return sanitizeRatingPeriodOptions({years:(base.years||[]).concat(extra.years||[]),semesters:(base.semesters||[]).concat(extra.semesters||[])});
}

function ratingOptionIsActionable(o){
  if(!o)return false;
  if(String(o.url||'').trim())return true;
  if(String(o.field||'').trim())return true;
  let mode=String(o.mode||'').toLowerCase();
  return mode==='url'||mode==='form'||mode==='catalog'||mode==='live';
}
function ratingActionablePeriodOptions(opts){
  opts=sanitizeRatingPeriodOptions(opts||{years:[],semesters:[]});
  return {years:(opts.years||[]).filter(ratingOptionIsActionable),semesters:(opts.semesters||[]).filter(ratingOptionIsActionable)};
}
function ratingPeriodFromVisibleDoc(doc){
  let v=ratingPeriodOptionsFromVisibleText(doc),year=(v.years||[])[0]||null,semester=(v.semesters||[])[0]||null;
  return {year:year?year.label:'',semester:semester?semester.label:''};
}
function ratingNormalizeIdentity(s){return cleanLine(s||'').toLocaleLowerCase('ru-RU').replace(/[\s‐‑‒–—-]+/g,'');}
function ratingDocMatchesBook(doc,book){
  if(!doc||!book||!book.label)return false;
  let needle=ratingNormalizeIdentity(book.label);if(!needle)return false;
  let title='';try{title=cleanLine(doc.title||'')+' '+cleanLine((doc.querySelector('h1,h2,h3,h4')||{}).textContent||'');}catch(e){}
  let body='';try{body=cleanLine(doc.body&&((doc.body.innerText||doc.body.textContent)||'')||'');}catch(e){}
  let hay=ratingNormalizeIdentity((title+' '+body).slice(0,24000));return hay.indexOf(needle)>=0;
}
function ratingCatalogLinkCandidates(doc,sourceUrl,book){
  let out=[],seen=new Set(),baseBook='';try{baseBook=new URL(book.url,sourceUrl).href;}catch(e){baseBook=book.url||'';}
  function add(raw){
    if(!raw)return;try{let u=new URL(raw,sourceUrl);if(u.origin!==location.origin||!/\/student\/rating\.php$/i.test(u.pathname))return;let href=u.href;if(seen.has(href))return;seen.add(href);out.push(href);}catch(e){}
  }
  Array.from(doc.querySelectorAll('a[href],a[data-href],[data-url],a[onclick],button[onclick]')).forEach(function(a){
    let raw=a.getAttribute('href')||a.getAttribute('data-href')||a.getAttribute('data-url')||ratingExtractJsUrl(a,sourceUrl)||'',label=cleanLine(a.textContent||a.getAttribute('aria-label')||a.getAttribute('title')||'');
    let useful=ratingLooksLikeYearLabel(label)||ratingLooksLikeSemesterLabel(label)||ratingNormalizeIdentity(label)===ratingNormalizeIdentity(book.label)||/архив|предыдущ|следующ|период|учебн[а-яё]*\s*год|семестр/i.test(label);
    if(!useful){
      try{let u=new URL(raw,sourceUrl),b=new URL(baseBook||sourceUrl,sourceUrl),shared=0;b.searchParams.forEach(function(v,k){if(/^(?:groupid|groupname)$/i.test(k))return;if(u.searchParams.get(k)===v&&v)shared++;});useful=shared>0;}catch(e){}
    }
    if(useful)add(raw);
  });
  return out.slice(0,60);
}
function ratingCatalogOptions(entries){
  let years=[],semesters=[],seenY=new Set(),seenS=new Set();
  (entries||[]).forEach(function(e){
    let yl=cleanLine(e.yearLabel||''),sl=cleanLine(e.semesterLabel||'');if(!ratingLooksLikeYearLabel(yl)||!ratingLooksLikeSemesterLabel(sl))return;
    let yv=String(e.yearValue!==undefined&&e.yearValue!==null?e.yearValue:yl),sv=String(e.semesterValue!==undefined&&e.semesterValue!==null?e.semesterValue:sl);
    let yk=yl.toLowerCase();if(!seenY.has(yk)){seenY.add(yk);years.push({value:yv,label:yl,selected:false,field:'year',url:'',mode:'catalog'});}
    let sk=yk+'|'+sl.toLowerCase();if(!seenS.has(sk)){seenS.add(sk);semesters.push({value:sv,label:sl,selected:false,field:'sem',url:e.url||'',mode:'catalog',yearLabel:yl,yearValue:yv});}
  });
  years.sort(function(a,b){let ay=parseInt((a.label.match(/(?:19|20)\d{2}/)||['0'])[0],10)||0,by=parseInt((b.label.match(/(?:19|20)\d{2}/)||['0'])[0],10)||0;return by-ay;});
  return {years:years,semesters:semesters};
}
function ratingSemesterOptionsForYear(options,yearLabel){
  let yk=ratingCanonicalYearKey(yearLabel||''),filtered=(options||[]).filter(function(o){return !o.yearLabel||!yk||ratingCanonicalYearKey(o.yearLabel)===yk;}),bySem=new Map();
  filtered.forEach(function(o){let key=ratingCanonicalSemesterKey(o.label||o.value||''),existing=bySem.get(key);bySem.set(key,ratingMergeOptionRecord(existing,o));});return Array.from(bySem.values());
}

function filterRatingTablesByPeriod(tables,period){
  period=sanitizeRatingPeriod(period||{});if(!period.year&&!period.semester)return tables||[];
  let out=[];(tables||[]).forEach(function(rows){
    if(!rows||!rows.length){return;}
    let hi=-1,yi=-1,si=-1;
    for(let i=0;i<Math.min(5,rows.length);i++){let h=(rows[i]||[]).map(cleanLine),y=h.findIndex(x=>/учебн[а-яё]*\s*год|год\s*обучения|academic\s*year|study\s*year/i.test(x)),ss=h.findIndex(x=>/семестр|semester|study\s*term/i.test(x));if(y>=0||ss>=0){hi=i;yi=y;si=ss;break;}}
    if(hi<0){out.push(rows);return;}
    let head=rows.slice(0,hi+1),body=rows.slice(hi+1).filter(function(r){
      if(period.year&&yi>=0&&cleanLine(r[yi]||'')!==cleanLine(period.yearLabel||period.year))return false;
      if(period.semester&&si>=0){let have=cleanLine(r[si]||''),want=cleanLine(period.semesterLabel||period.semester);if(have!==want)return false;}
      return true;
    });
    out.push(head.concat(body));
  });return out;
}
function ratingPeriodStateFromDoc(doc,sourceUrl){
  let years=[],semesters=[],seen={year:new Map(),semester:new Map()},fields={year:'',semester:''};
  function add(kind,o){
    if(kind!=='year'&&kind!=='semester')return;
    let label=cleanLine(o&&o.label||''),value=String(o&&o.value!==undefined?o.value:'').trim(),trusted=!!(o&&o.trusted);
    if(!label||/^(?:выберите.*|--+|—+)$/i.test(label))return;
    // Critical safety rule: an opaque URL parameter is not a display option.
    // This prevents discipline links containing ?year=<id>&semester=<id> from
    // being rendered as period choices.
    if(kind==='year'&&!ratingLooksLikeYearLabel(label))return;
    if(kind==='semester'&&!ratingLooksLikeSemesterLabel(label)&&!(trusted&&ratingLooksLikeSemesterShort(label)))return;
    let key='v:'+value+'|'+label.toLowerCase();let map=seen[kind];
    if(map.has(key)){let ex=map.get(key);if(o.selected)ex.selected=true;if(!ex.url&&o.url)ex.url=o.url;return;}
    let item={value:value||label,label:label,selected:!!(o&&o.selected),field:String(o&&o.field||''),url:String(o&&o.url||''),mode:String(o&&o.mode||'form')};
    map.set(key,item);(kind==='year'?years:semesters).push(item);if(item.field&&!fields[kind])fields[kind]=item.field;
  }
  // Native selects: the control itself can establish the kind, but each year
  // still needs a human-readable study-year label.
  Array.from(doc.querySelectorAll('select')).forEach(function(sel){
    let kind=ratingSelectKind(sel);if(!kind)return;let field=sel.name||sel.id||'';
    ratingSelectOptions(sel).forEach(function(o){add(kind,{value:o.value,label:o.label,selected:o.selected||String(sel.value||'')===String(o.value),field:field,mode:'form',trusted:true});});
  });
  // Radio groups: classify by the field name or by a majority of valid labels;
  // never by large surrounding container text.
  let radioGroups={};
  Array.from(doc.querySelectorAll('input[type="radio"][name]')).forEach(function(input){let name=input.name||'';(radioGroups[name]||(radioGroups[name]=[])).push(input);});
  Object.keys(radioGroups).forEach(function(name){
    let arr=radioGroups[name],labels=arr.map(ratingAssociatedLabel),kind=ratingPeriodKindFromText(name);
    if(!kind){let yc=labels.filter(ratingLooksLikeYearLabel).length,sc=labels.filter(x=>ratingLooksLikeSemesterLabel(x)||ratingLooksLikeSemesterShort(x)).length;if(yc>=Math.max(1,Math.ceil(labels.length*.5)))kind='year';else if(sc>=Math.max(1,Math.ceil(labels.length*.5)))kind='semester';}
    if(!kind)return;arr.forEach(function(input,i){add(kind,{value:input.value||labels[i],label:labels[i]||input.value,selected:!!input.checked,field:name,mode:'form',trusted:true});});
  });
  // Submit buttons are accepted only when their own name/label identifies the period.
  Array.from(doc.querySelectorAll('button[name],input[type="submit"][name],input[type="button"][name]')).forEach(function(btn){
    let name=btn.name||'',label=cleanLine(btn.textContent||btn.value||btn.getAttribute('aria-label')||''),kind=ratingPeriodKindFromText(name)|| (ratingLooksLikeYearLabel(label)?'year':(ratingLooksLikeSemesterLabel(label)?'semester':''));if(!kind)return;
    let value=String(btn.value||label||'').trim();add(kind,{value:value,label:label||value,selected:/\bactive\b|\bselected\b|\bcurrent\b/i.test(btn.className||'')||btn.getAttribute('aria-pressed')==='true',field:name,mode:'form',trusted:true});
  });
  // Links/tabs: infer the kind ONLY from the visible label. Query params on
  // ordinary discipline links may contain year/semester ids and must not turn
  // those links into chooser options.
  Array.from(doc.querySelectorAll('a[href],a[onclick],button[onclick],[data-url],[data-href]')).forEach(function(el){
    let label=cleanLine(el.textContent||el.getAttribute('aria-label')||el.getAttribute('title')||''),kind=ratingLooksLikeYearLabel(label)?'year':(ratingLooksLikeSemesterLabel(label)?'semester':'');if(!kind)return;
    let url=ratingExtractJsUrl(el,sourceUrl);if(!url)return;let uv=ratingUrlPeriodValue(url,kind,sourceUrl),value=uv?uv.value:label,field=uv?uv.field:'';
    let selected=/\bactive\b|\bselected\b|\bcurrent\b/i.test(String(el.className||''))||el.getAttribute('aria-current')==='true'||el.getAttribute('aria-selected')==='true';
    add(kind,{value:value,label:label,selected:selected,field:field,url:url,mode:'url',trusted:true});
  });
  // Options opened dynamically by the live portal probe.
  Array.from(doc.querySelectorAll('[data-mguu-period-kind]')).forEach(function(el){let kind=el.getAttribute('data-mguu-period-kind')||'',label=cleanLine(el.textContent||''),value=el.getAttribute('data-value')||label;add(kind,{value:value,label:label,selected:false,field:'',url:'',mode:'live',trusted:true});});
  // Explicit data-* period widgets still need a human-readable period label.
  Array.from(doc.querySelectorAll('[data-year],[data-semester],[data-semestr],[data-studyyear],[data-study-year]')).forEach(function(el){
    let kind='',value='';if(el.hasAttribute('data-year')||el.hasAttribute('data-studyyear')||el.hasAttribute('data-study-year')){kind='year';value=el.getAttribute('data-year')||el.getAttribute('data-studyyear')||el.getAttribute('data-study-year')||'';}else{kind='semester';value=el.getAttribute('data-semester')||el.getAttribute('data-semestr')||'';}
    let label=cleanLine(el.textContent||el.getAttribute('aria-label')||''),url=ratingExtractJsUrl(el,sourceUrl);add(kind,{value:value||label,label:label||value,selected:/\bactive\b|\bselected\b|\bcurrent\b/i.test(String(el.className||'')),field:kind==='year'?'year':'semester',url:url,mode:url?'url':'form',trusted:true});
  });
  function selectedFor(kind,options){
    let selected=options.find(o=>o.selected)||null;
    if(!selected)try{let u=new URL(sourceUrl,RATING_URL);for(let o of options){if(!o.field)continue;let v=u.searchParams.get(o.field);if(v!==null&&String(v)===String(o.value)){selected=o;break;}}}catch(e){}
    return selected||null;
  }
  let clean=sanitizeRatingPeriodOptions({years:years,semesters:semesters});years=clean.years;semesters=clean.semesters;
  // Some current portal pages render the period chooser after page load, and
  // some expose year/semester only in rating table columns. Merge both safe
  // fallbacks instead of reporting that no variants exist.
  let fallback=ratingMergePeriodOptions(ratingPeriodOptionsFromTables(doc),ratingPeriodOptionsFromVisibleText(doc));
  let merged=ratingMergePeriodOptions({years:years,semesters:semesters},fallback);years=merged.years;semesters=merged.semesters;
  let sy=selectedFor('year',years),ss=selectedFor('semester',semesters);
  return {years:years,semesters:semesters,selected:{year:sy?sy.value:'',yearLabel:sy?sy.label:'',semester:ss?ss.value:'',semesterLabel:ss?ss.label:''},fields:fields,sourceUrl:sourceUrl};
}
function chooseRatingOption(options,wantedValue,wantedLabel,currentValue){
  options=options||[];let x=null;
  if(wantedValue)x=options.find(o=>String(o.value)===String(wantedValue));
  if(!x&&wantedLabel)x=options.find(o=>cleanLine(o.label).toLowerCase()===cleanLine(wantedLabel).toLowerCase());
  if(!x&&currentValue)x=options.find(o=>String(o.value)===String(currentValue));
  if(!x)x=options.find(o=>o.selected)||options[0]||null;
  return x;
}
function findRatingOptionExact(options,wantedValue,wantedLabel){
  options=options||[];let x=null;if(wantedValue)x=options.find(o=>String(o.value)===String(wantedValue));
  if(!x&&wantedLabel&&ratingLooksLikeYearLabel(wantedLabel))x=options.find(o=>ratingCanonicalYearKey(o.label||'')===ratingCanonicalYearKey(wantedLabel));
  if(!x&&wantedLabel)x=options.find(o=>cleanLine(o.label).toLowerCase()===cleanLine(wantedLabel).toLowerCase());return x||null;
}
function ratingFormParams(form){
  let params=new URLSearchParams();if(!form)return params;
  Array.from(form.querySelectorAll('input[name],select[name],textarea[name]')).forEach(function(el){
    if(el.disabled)return;let name=el.name;if(!name)return;
    let type=(el.type||'').toLowerCase();if((type==='checkbox'||type==='radio')&&!el.checked)return;
    if(el.tagName==='SELECT'&&el.multiple){Array.from(el.selectedOptions||[]).forEach(o=>params.append(name,String(o.value||'')));return;}
    params.set(name,String(el.value||''));
  });
  return params;
}
function ratingPortalControlCandidates(doc,kind){
  let word=kind==='year'?/учебн[а-яё]*\s*год|academic\s*year|study\s*year/i:/семестр|semester/i;
  let out=[],seen=new Map();
  function add(el,score){if(!el||!el.nodeType)return;score=score||0;if(seen.has(el)){let item=seen.get(el);if(score>item.score)item.score=score;return;}let item={el:el,score:score};seen.set(el,item);out.push(item);}
  Array.from(doc.querySelectorAll('select,[role="combobox"],button,.select2-selection,.dropdown-toggle,.chosen-single,.form-select,.custom-select,input')).forEach(function(el){
    let d=ratingElementDescriptor(el)+' '+cleanLine(el.textContent||el.value||'');if(word.test(d))add(el,30);
  });
  Array.from(doc.querySelectorAll('label,legend,span,div,p,strong,b,h1,h2,h3,h4,h5,h6')).forEach(function(label){
    let t=cleanLine(label.textContent||'');if(!word.test(t)||t.length>80)return;
    let base=label.closest('label,.form-group,.field,.control-group,.row,.filter,.select-wrapper,.input-group')||label.parentElement;
    if(!base)return;
    Array.from(base.querySelectorAll('select,[role="combobox"],button,.select2-selection,.dropdown-toggle,.chosen-single,.form-select,.custom-select,input')).forEach(function(el){add(el,60);});
    let sib=label.nextElementSibling;if(sib&&sib.matches&&sib.matches('select,[role="combobox"],button,.select2-selection,.dropdown-toggle,.chosen-single,.form-select,.custom-select,input'))add(sib,40);
  });
  return out.sort((a,b)=>b.score-a.score).map(x=>x.el);
}
function ratingClickLikeUser(win,el){
  if(!el)return;
  try{el.scrollIntoView({block:'center',inline:'nearest'});}catch(e){}
  ['pointerdown','mousedown','pointerup','mouseup','click'].forEach(function(type){try{el.dispatchEvent(new win.MouseEvent(type,{bubbles:true,cancelable:true,view:win}));}catch(e){try{el.click();}catch(_){}}});
  try{el.focus();}catch(e){}
}
function ratingDynamicOptions(doc,kind){
  let result=[],seen=new Set();
  function add(label,value,selected,field){label=cleanLine(label||'');if(!label)return;if(kind==='year'&&!ratingLooksLikeYearLabel(label))return;if(kind==='semester'&&!ratingLooksLikeSemesterLabel(label)&&!ratingLooksLikeSemesterShort(label))return;let k=label.toLowerCase()+'|'+String(value||'');if(seen.has(k))return;seen.add(k);result.push({value:String(value||label),label:label,selected:!!selected,field:String(field||''),url:'',mode:'form',trusted:true});}
  Array.from(doc.querySelectorAll('option')).forEach(function(o){add(o.textContent,o.value,o.selected,o.parentElement&&(o.parentElement.name||o.parentElement.id));});
  Array.from(doc.querySelectorAll('[role="option"],.select2-results__option,.dropdown-menu .dropdown-item,.dropdown-menu a,.chosen-results li,.ui-menu-item,.ui-autocomplete li,.multiselect-container li,.choices__item--choice')).forEach(function(o){let label=cleanLine(o.textContent||'');add(label,o.getAttribute('data-value')||o.getAttribute('data-select2-id')||label,o.getAttribute('aria-selected')==='true'||/selected|active|highlight/i.test(o.className||''),'');});
  return result;
}
async function ratingPrimeRenderedPeriods(frame){
  let doc=frame.contentDocument,win=frame.contentWindow;if(!doc||!win)return {years:[],semesters:[]};
  let collected={years:[],semesters:[]};
  async function prime(kind){
    let candidates=ratingPortalControlCandidates(doc,kind),target=candidates[0];if(!target)return;
    ratingClickLikeUser(win,target);await new Promise(r=>setTimeout(r,700));
    let opts=ratingDynamicOptions(doc,kind);if(kind==='year')collected.years=opts;else collected.semesters=opts;
    try{win.document.dispatchEvent(new win.KeyboardEvent('keydown',{key:'Escape',code:'Escape',keyCode:27,which:27,bubbles:true}));}catch(e){}
  }
  await prime('year');await prime('semester');return collected;
}
function ratingSelectedFromLiveDoc(doc,kind){
  let sel=ratingControlForKind(doc,kind);if(sel){let o=Array.from(sel.options||[]).find(x=>x.selected)||null;if(o){let label=cleanLine(o.textContent||'');if((kind==='year'&&ratingLooksLikeYearLabel(label))||(kind==='semester'&&(ratingLooksLikeSemesterLabel(label)||ratingLooksLikeSemesterShort(label))))return {value:String(o.value||label),label:label};}}
  let radios=Array.from(doc.querySelectorAll('input[type="radio"]:checked'));for(let r of radios){let label=ratingAssociatedLabel(r),rk=ratingPeriodKindFromText(r.name||'')||((kind==='year'&&ratingLooksLikeYearLabel(label))?'year':((kind==='semester'&&(ratingLooksLikeSemesterLabel(label)||ratingLooksLikeSemesterShort(label)))?'semester':''));if(rk===kind)return {value:String(r.value||label),label:label||String(r.value||'')};}
  let dyn=ratingDynamicOptions(doc,kind).find(o=>o.selected);if(dyn)return {value:dyn.value,label:dyn.label};
  let state=ratingPeriodStateFromDoc(doc,(doc.location&&doc.location.href)||location.href),arr=kind==='year'?state.years:state.semesters;return arr.find(o=>o.selected)||arr[0]||null;
}
function ratingBindNativePeriodItems(kind){
  document.querySelectorAll('.ratingPeriodItem').forEach(function(btn){btn.onclick=function(){let value=this.dataset.ratingPeriodValue||'';closeModal();selectRatingPeriod(kind,value);};});
}
function ratingNativePickerEmptyHtml(kind,message){
  let what=kind==='year'?'учебного года':'семестра';
  return '<div class="ratingPeriodNativeState"><div class="ratingPeriodNativeIcon">!</div><div class="emptyTitle">Не удалось получить варианты</div><div class="muted">'+esc(message||('Портал пока не передал варианты '+what+'.'))+'</div><button id="ratingPeriodRetry" class="primary full" type="button">Повторить</button></div>';
}
function ratingNativePickerLoadingHtml(kind){
  return '<div class="ratingPeriodNativeState"><div class="ratingPeriodSpinner" aria-hidden="true"></div><div class="emptyTitle">Получаем '+(kind==='year'?'учебные годы':'семестры')+'</div><div class="muted">Данные загружаются с портала МГУУ в фоне.</div></div>';
}
async function refreshNativeRatingPeriodPicker(kind){
  let host=document.getElementById('ratingPeriodPickerHost');if(!host||!selectedBook)return;host.innerHTML=ratingNativePickerLoadingHtml(kind);
  try{
    let received=await fetchRatingPeriodOptionsFast(selectedBook);ratingPeriodCatalog=[];ratingPeriodOptions=ratingMergePeriodOptions(ratingPeriodOptions,received);ratingPeriodOptions=sanitizeRatingPeriodOptions(ratingPeriodOptions);
    let options=ratingPickerOptions(kind);host=document.getElementById('ratingPeriodPickerHost');if(!host)return;
    if(!options||!options.length){host.innerHTML=ratingNativePickerEmptyHtml(kind,'Портал не вернул доступные варианты. Страница портала не будет показана — можно повторить загрузку.');let retry=document.getElementById('ratingPeriodRetry');if(retry)retry.onclick=function(){refreshNativeRatingPeriodPicker(kind);};return;}
    host.innerHTML=ratingPeriodPickerHtml(kind,options);ratingBindNativePeriodItems(kind);
  }catch(e){host=document.getElementById('ratingPeriodPickerHost');if(!host)return;host.innerHTML=ratingNativePickerEmptyHtml(kind,e&&e.message?e.message:'Проверьте интернет-соединение.');let retry=document.getElementById('ratingPeriodRetry');if(retry)retry.onclick=function(){refreshNativeRatingPeriodPicker(kind);};}
}
function fetchRenderedRatingResponse(url){
  return new Promise(function(resolve,reject){
    let frame=document.createElement('iframe'),done=false,loadTimer=null,hardTimer=null;
    function finish(err,result){if(done)return;done=true;clearTimeout(loadTimer);clearTimeout(hardTimer);try{frame.remove();}catch(e){}if(err)reject(err);else resolve(result);}
    frame.setAttribute('aria-hidden','true');
    frame.setAttribute('sandbox','allow-scripts allow-forms allow-same-origin');
    frame.style.cssText='position:fixed;left:-10000px;top:0;width:390px;height:844px;opacity:0;pointer-events:none;border:0;z-index:-1';
    frame.onload=function(){
      clearTimeout(loadTimer);
      // Give portal JavaScript time to create custom selects/tabs. Static fetches
      // do not execute that code, which was the reason v0.37 saw no periods.
      loadTimer=setTimeout(async function(){
        try{
          let d=frame.contentDocument;if(!d||!d.documentElement)throw new Error('Страница рейтинга не отобразилась');
          let primed=await ratingPrimeRenderedPeriods(frame);
          if((primed.years&&primed.years.length)||(primed.semesters&&primed.semesters.length)){
            let store=d.createElement('div');store.id='mguu-period-probe';store.style.display='none';
            (primed.years||[]).forEach(function(o){let x=d.createElement('span');x.setAttribute('data-mguu-period-kind','year');x.setAttribute('data-value',o.value||o.label);x.textContent=o.label||o.value;store.appendChild(x);});
            (primed.semesters||[]).forEach(function(o){let x=d.createElement('span');x.setAttribute('data-mguu-period-kind','semester');x.setAttribute('data-value',o.value||o.label);x.textContent=o.label||o.value;store.appendChild(x);});
            d.body.appendChild(store);
          }
          let finalUrl=url;try{finalUrl=frame.contentWindow.location.href||url;}catch(e){}
          let html='<!doctype html>'+d.documentElement.outerHTML;
          finish(null,{doc:new DOMParser().parseFromString(html,'text/html'),url:finalUrl,rendered:true});
        }catch(e){finish(e);}
      },900);
    };
    frame.onerror=function(){finish(new Error('Не удалось открыть страницу рейтинга'));};
    hardTimer=setTimeout(function(){finish(new Error('Страница рейтинга загружается слишком долго'));},6500);
    try{document.body.appendChild(frame);frame.src=new URL(url,location.href).href;}catch(e){finish(e);}
  });
}
function fetchRenderedRatingSelection(url,yearChoice,semesterChoice){
  // Some portal builds use JavaScript/custom dropdowns instead of ordinary
  // form fields. Reproduce the user's choice inside an invisible same-origin
  // iframe, then copy only the resulting DOM back into the native app parser.
  return new Promise(function(resolve,reject){
    let frame=document.createElement('iframe'),done=false,started=false,hardTimer=null;
    function finish(err,result){if(done)return;done=true;clearTimeout(hardTimer);try{frame.remove();}catch(e){}if(err)reject(err);else resolve(result);}
    function wait(ms){return new Promise(r=>setTimeout(r,ms));}
    function sameLabel(a,b){return cleanLine(a||'').toLocaleLowerCase('ru-RU')===cleanLine(b||'').toLocaleLowerCase('ru-RU');}
    function dynamicCandidates(doc){return Array.from(doc.querySelectorAll('option,[role="option"],.select2-results__option,.dropdown-menu .dropdown-item,.dropdown-menu a,.chosen-results li,.ui-menu-item,.ui-autocomplete li,.multiselect-container li,.choices__item--choice'));}
    async function choose(kind,choice){
      if(!choice)return false;let doc=frame.contentDocument,win=frame.contentWindow;if(!doc||!win)return false;
      let wantedValue=String(choice.value||''),wantedLabel=cleanLine(choice.label||choice.value||'');
      let sel=ratingControlForKind(doc,kind);
      if(sel){
        let opt=Array.from(sel.options||[]).find(function(o){return String(o.value||'')===wantedValue||sameLabel(o.textContent,wantedLabel);});
        if(opt){
          try{sel.value=opt.value;opt.selected=true;sel.dispatchEvent(new win.Event('input',{bubbles:true}));sel.dispatchEvent(new win.Event('change',{bubbles:true}));}catch(e){try{opt.selected=true;}catch(_){} }
          await wait(1200);return true;
        }
      }
      let control=(ratingPortalControlCandidates(doc,kind)||[])[0]||null;
      if(control){ratingClickLikeUser(win,control);await wait(650);doc=frame.contentDocument||doc;win=frame.contentWindow||win;}
      let item=dynamicCandidates(doc).find(function(o){let label=cleanLine(o.textContent||o.getAttribute('aria-label')||''),value=String(o.getAttribute('data-value')||o.getAttribute('data-select2-id')||o.value||'');return (wantedLabel&&sameLabel(label,wantedLabel))||(wantedValue&&value===wantedValue);});
      if(item){ratingClickLikeUser(win,item);await wait(1300);return true;}
      let radios=Array.from(doc.querySelectorAll('input[type="radio"]'));
      let radio=radios.find(function(r){let rk=ratingPeriodKindFromText(r.name||'')||ratingPeriodKindFromText(r.id||''),label=ratingAssociatedLabel(r);return rk===kind&&((wantedValue&&String(r.value||'')===wantedValue)||(wantedLabel&&sameLabel(label,wantedLabel)));});
      if(radio){try{radio.checked=true;radio.dispatchEvent(new win.Event('change',{bubbles:true}));radio.click();}catch(e){}await wait(1200);return true;}
      return false;
    }
    async function run(){
      if(started||done)return;started=true;
      try{
        await wait(850);
        if(yearChoice)await choose('year',yearChoice);
        if(semesterChoice)await choose('semester',semesterChoice);
        await wait(650);
        let d=frame.contentDocument;if(!d||!d.documentElement)throw new Error('Страница рейтинга не отобразилась');
        // Probe the final state as well, so choosing a year can reveal the real
        // semester list without ever exposing the portal page to the user.
        let primed=await ratingPrimeRenderedPeriods(frame);
        d=frame.contentDocument;if(!d||!d.documentElement)throw new Error('Страница рейтинга не отобразилась');
        if((primed.years&&primed.years.length)||(primed.semesters&&primed.semesters.length)){
          let old=d.getElementById('mguu-period-probe');if(old)old.remove();let store=d.createElement('div');store.id='mguu-period-probe';store.style.display='none';
          (primed.years||[]).forEach(function(o){let x=d.createElement('span');x.setAttribute('data-mguu-period-kind','year');x.setAttribute('data-value',o.value||o.label);x.textContent=o.label||o.value;store.appendChild(x);});
          (primed.semesters||[]).forEach(function(o){let x=d.createElement('span');x.setAttribute('data-mguu-period-kind','semester');x.setAttribute('data-value',o.value||o.label);x.textContent=o.label||o.value;store.appendChild(x);});d.body.appendChild(store);
        }
        let finalUrl=url;try{finalUrl=frame.contentWindow.location.href||url;}catch(e){}
        let html='<!doctype html>'+d.documentElement.outerHTML;finish(null,{doc:new DOMParser().parseFromString(html,'text/html'),url:finalUrl,rendered:true});
      }catch(e){finish(e);}
    }
    frame.setAttribute('aria-hidden','true');frame.setAttribute('sandbox','allow-scripts allow-forms allow-same-origin');frame.style.cssText='position:fixed;left:-10000px;top:0;width:390px;height:844px;opacity:0;pointer-events:none;border:0;z-index:-1';
    frame.onload=function(){if(!started)setTimeout(run,120);};frame.onerror=function(){finish(new Error('Не удалось открыть страницу рейтинга'));};hardTimer=setTimeout(function(){finish(new Error('Страница рейтинга загружается слишком долго'));},11000);
    try{document.body.appendChild(frame);frame.src=new URL(url,location.href).href;}catch(e){finish(e);}
  });
}

async function fetchRatingResponse(url,options){
  let opts=options||{};
  // v0.41: rating data must come from the untouched portal response. A hidden
  // rendered iframe is useful only as an optional period-control probe: on
  // some Android WebView versions an iframe can be affected by the app shell
  // lifecycle and then no longer contains the original rating table.
  let r=await fetch(toPortalProxyUrl(url),Object.assign({cache:'no-store',credentials:'same-origin'},opts));
  if(!r.ok)throw new Error('Сервер вернул '+r.status);
  let html=await r.text();return {doc:new DOMParser().parseFromString(html,'text/html'),url:r.url||url,rendered:false};
}
async function fetchRatingPeriodOptionsFast(book){
  // Same transport principle as the schedule: one direct portal request,
  // parse the returned HTML, and keep the portal page invisible.
  let merged={years:[],semesters:[]},errors=[];
  try{let g=await fetchRatingResponse(ratingGroupUrl(ratingGroup)),state=ratingActionablePeriodOptions(ratingPeriodStateFromDoc(g.doc,g.url||ratingGroupUrl(ratingGroup)));merged=ratingMergePeriodOptions(merged,state);}catch(e){errors.push(e);}
  if((!merged.years.length||!merged.semesters.length)&&book){
    try{let b=await fetchRatingResponse(book.url),state=ratingActionablePeriodOptions(ratingPeriodStateFromDoc(b.doc,b.url||book.url));merged=ratingMergePeriodOptions(merged,state);}catch(e){errors.push(e);}
  }
  merged=sanitizeRatingPeriodOptions(merged);if(!merged.years.length&&!merged.semesters.length)throw (errors[0]||new Error('Портал не вернул варианты учебного периода'));return merged;
}


function ratingPersonalUrlInfo(raw){
  try{
    let u=new URL(raw,RATING_URL);if(!/\/student\/personalrating\.php$/i.test(u.pathname))return null;
    let userid=String(u.searchParams.get('userid')||'').trim(),year=String(u.searchParams.get('year')||'').trim(),sem=String(u.searchParams.get('sem')||'').trim();
    if(!userid)return null;return {url:u,userid:userid,year:year,sem:sem};
  }catch(e){return null;}
}
function ratingPersonalUrl(book,year,sem){
  let info=ratingPersonalUrlInfo(book&&book.url||'');if(!info)return String(book&&book.url||'');
  let u=new URL(info.url.href);if(year!==undefined&&year!==null&&String(year)!=='')u.searchParams.set('year',String(year));if(sem!==undefined&&sem!==null&&String(sem)!=='')u.searchParams.set('sem',String(sem));return u.href;
}
function ratingPersonalCurrentEntry(doc,sourceUrl){
  let info=ratingPersonalUrlInfo(sourceUrl),p=ratingPeriodFromVisibleDoc(doc);if(!info||!p.year||!p.semester)return null;
  return {yearLabel:p.year,semesterLabel:p.semester,yearValue:info.year||p.year,semesterValue:info.sem||p.semester,url:sourceUrl};
}
async function discoverPersonalRatingPeriodCatalog(book,firstDoc,firstUrl){
  let info=ratingPersonalUrlInfo(firstUrl||book.url);if(!info)return [];
  let entries=[],seen=new Set();
  function accept(doc,url,yearValue,semValue){
    if(!doc||!ratingDocMatchesBook(doc,book))return;
    let p=ratingPeriodFromVisibleDoc(doc);if(!p.year||!p.semester||!ratingLooksLikeYearLabel(p.year)||!ratingLooksLikeSemesterLabel(p.semester))return;
    let key=cleanLine(p.year).toLowerCase()+'|'+cleanLine(p.semester).toLowerCase();if(seen.has(key))return;seen.add(key);
    entries.push({yearLabel:p.year,semesterLabel:p.semester,yearValue:String(yearValue||''),semesterValue:String(semValue||''),url:url});
  }
  let current=ratingPersonalCurrentEntry(firstDoc,firstUrl||book.url);if(current){seen.add(cleanLine(current.yearLabel).toLowerCase()+'|'+cleanLine(current.semesterLabel).toLowerCase());entries.push(current);}
  let rawYear=String(info.year||'').trim(),num=/^\d+$/.test(rawYear)?parseInt(rawYear,10):NaN,width=rawYear.length;
  if(!Number.isFinite(num))return entries;
  // The public portal uses personalrating.php?userid=...&year=<id>&sem=<id>.
  // Probe nearby opaque ids and accept only labels actually returned by the portal.
  let years=[];for(let n=Math.max(1,num-7);n<=num+1;n++)years.push(String(n).padStart(width,'0'));
  let semValues=['0','1'],jobs=[];
  years.forEach(function(y){semValues.forEach(function(sm){if(y===info.year&&sm===info.sem)return;jobs.push({year:y,sem:sm,url:ratingPersonalUrl(book,y,sm)});});});
  let cursor=0,workers=Math.min(4,jobs.length);
  async function worker(){
    while(cursor<jobs.length){let job=jobs[cursor++];try{let r=await fetchRatingResponse(job.url);accept(r.doc,r.url||job.url,job.year,job.sem);}catch(e){}}
  }
  await Promise.all(Array.from({length:workers},worker));
  entries.sort(function(a,b){let ay=parseInt((a.yearLabel.match(/(?:19|20)\d{2}/)||['0'])[0],10)||0,by=parseInt((b.yearLabel.match(/(?:19|20)\d{2}/)||['0'])[0],10)||0;if(ay!==by)return by-ay;return String(a.semesterValue).localeCompare(String(b.semesterValue),'ru',{numeric:true});});
  return entries;
}

async function discoverRatingPeriodCatalog(book,firstDoc,firstUrl){
  let queue=[],queued=new Set(),visited=new Set(),entries=[],entrySeen=new Set(),maxPages=28;
  function enqueue(raw){if(!raw)return;try{let u=new URL(raw,firstUrl||book.url);if(u.origin!==location.origin||!/\/student\/rating\.php$/i.test(u.pathname))return;let href=u.href;if(queued.has(href)||visited.has(href))return;queued.add(href);queue.push(href);}catch(e){}}
  function accept(doc,url,force){
    let p=ratingPeriodFromVisibleDoc(doc);if(!p.year||!p.semester)return;
    if(!force&&!ratingDocMatchesBook(doc,book))return;
    let key=cleanLine(p.year).toLowerCase()+'|'+cleanLine(p.semester).toLowerCase();if(entrySeen.has(key))return;entrySeen.add(key);entries.push({yearLabel:p.year,semesterLabel:p.semester,url:url});
  }
  let start=firstUrl||book.url;enqueue(start);
  if(firstDoc){accept(firstDoc,start,true);ratingCatalogLinkCandidates(firstDoc,start,book).forEach(enqueue);visited.add(start);queued.delete(start);}
  try{
    let group=await fetchRatingResponse(ratingGroupUrl(ratingGroup)),gdoc=group.doc,gurl=group.url||ratingGroupUrl(ratingGroup),needle=ratingNormalizeIdentity(book.label);
    Array.from(gdoc.querySelectorAll('a[href]')).forEach(function(a){let label=ratingNormalizeIdentity(a.textContent||'');if(label===needle)enqueue(a.getAttribute('href'));});
    ratingCatalogLinkCandidates(gdoc,gurl,book).forEach(enqueue);
  }catch(e){}
  while(queue.length&&visited.size<maxPages){
    let url=queue.shift();queued.delete(url);if(visited.has(url))continue;visited.add(url);
    try{
      let r=await fetchRatingResponse(url),doc=r.doc,finalUrl=r.url||url;accept(doc,finalUrl,url===start);ratingCatalogLinkCandidates(doc,finalUrl,book).forEach(enqueue);
    }catch(e){}
  }
  return entries;
}

async function discoverRenderedRatingPeriods(url){
  try{
    let rendered=await fetchRenderedRatingResponse(url),state=ratingPeriodStateFromDoc(rendered.doc,rendered.url||url);
    return {years:state.years||[],semesters:state.semesters||[]};
  }catch(e){return {years:[],semesters:[]};}
}
async function applyRatingPeriodControl(doc,sourceUrl,kind,value,choice){
  choice=choice||null;
  if(choice&&choice.url){return fetchRatingResponse(new URL(choice.url,sourceUrl).href);}
  let sel=ratingControlForKind(doc,kind),field=choice&&choice.field?choice.field:(sel&&(sel.name||sel.id)||'');
  if(sel&&!choice){let option=Array.from(sel.options||[]).find(o=>String(o.value||'')===String(value));let raw=option?String(option.value||'').trim():String(value||'').trim();if(/^(?:https?:\/\/|\/|\?)/i.test(raw)){try{return await fetchRatingResponse(new URL(raw,sourceUrl).href);}catch(e){if(/^https?:\/\//i.test(raw))throw e;}}}
  if(!field)return {doc:doc,url:sourceUrl};
  let controls=Array.from(doc.querySelectorAll('[name]')).filter(function(el){return String(el.name||'')===String(field);});
  let control=controls.find(function(el){return el.form||el.closest&&el.closest('form');})||controls[0]||sel;
  let form=control&&(control.form||(control.closest&&control.closest('form'))),params=ratingFormParams(form);params.set(field,String(value));
  // If the option is represented by a submit button, keep its own name/value in the request.
  if(choice&&choice.field)params.set(choice.field,String(choice.value||value));
  let source=new URL(sourceUrl,RATING_URL),action=new URL((form&&form.getAttribute('action'))||source.href,source.href);
  source.searchParams.forEach(function(v,k){if(!action.searchParams.has(k)&&!params.has(k))action.searchParams.set(k,v);});
  let method=String(form&&form.getAttribute('method')||'GET').toUpperCase();
  if(method==='POST')return fetchRatingResponse(action.href,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:params.toString()});
  params.forEach(function(v,k){action.searchParams.set(k,v);});return fetchRatingResponse(action.href);
}
function parseRatingDoc(doc){
  let tables=[];
  Array.from(doc.querySelectorAll('table')).forEach(function(table){
    let rows=Array.from(table.querySelectorAll('tr')).map(function(tr){
      let row=Array.from(tr.querySelectorAll('th,td')).map(td=>cleanLine(td.textContent||''));while(row.length&&!row[row.length-1])row.pop();return row;
    }).filter(r=>r.some(Boolean));
    if(rows.length){
      let width=Math.max.apply(null,rows.map(r=>r.length)),joined=cleanLine(rows.map(r=>r.join(' ')).join(' '));
      // The portal sometimes visually renders a normal rating grid while its
      // HTML exposes the row as one packed cell. Keep such a table instead of
      // discarding it just because width===1.
      if(width>=2||(/дисциплин/i.test(joined)&&/(модуль|балл|рейтинг|зач[её]т|экзамен)/i.test(joined)))tables.push(rows);
    }
  });
  let raw=[];
  Array.from(doc.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,dt,dd')).forEach(function(el){let s=cleanLine(el.textContent||'');if(s)raw.push(s);});
  let seen=new Set(),lines=raw.filter(function(s){
    let low=s.toLowerCase();
    if(seen.has(s)||/университет правительства москвы|учим управлять городом|контакты|новости|ресурсы|мероприятия|сервисы|к выбору группы/i.test(low))return false;
    seen.add(s);return true;
  }).slice(0,180);
  let title='';try{title=cleanLine((doc.querySelector('h1,h2,h3,h4')||{}).textContent||'');}catch(e){}
  return {title:title,tables:tables,lines:lines,subjects:[],loadedAt:new Date().toISOString()};
}
async function fetchRatingData(book){
  // v0.47: same first-frame model as the schedule. One direct personalrating.php
  // request produces the visible cards immediately. Detailed control-point pages
  // are NOT awaited here; cached points are merged now and refreshed separately.
  let stored=loadStoredRatingPeriod(book),targetUrl=String(book&&book.url||''),baseInfo=ratingPersonalUrlInfo(targetUrl);
  if(baseInfo){let y=stored.year||baseInfo.year,sm=stored.semester||baseInfo.sem;targetUrl=ratingPersonalUrl(book,y,sm);}
  let first=await fetchRatingResponse(targetUrl),doc=first.doc,sourceUrl=first.url||targetUrl,visible=ratingPeriodFromVisibleDoc(doc),info=ratingPersonalUrlInfo(sourceUrl)||baseInfo;
  let period=sanitizeRatingPeriod({year:stored.year||(info&&info.year)||visible.year,yearLabel:visible.year||stored.yearLabel||stored.year,semester:stored.semester||(info&&info.sem)||visible.semester,semesterLabel:visible.semester||stored.semesterLabel||stored.semester});
  let parsed=parseRatingDoc(doc),state=ratingActionablePeriodOptions(ratingPeriodStateFromDoc(doc,sourceUrl));
  if(ratingPersonalUrlInfo(sourceUrl))parsed.subjects=ratingApplyStoredControlPoints(ratingSubjectsFromPersonalDom(doc,sourceUrl));
  parsed.period=period;parsed.periodOptions=ratingMergePeriodOptions(ratingPeriodOptions,state);parsed.periodCatalog=[];parsed.sourceUrl=sourceUrl;parsed.detailsPending=ratingSubjectsResolved(parsed).some(function(x){return !!x.detailUrl;});return parsed;
}

function bookListHtml(books,query){
  let q=String(query||'').trim().toLocaleLowerCase('ru-RU'),list=books.filter(b=>!q||b.label.toLocaleLowerCase('ru-RU').includes(q));
  if(!list.length)return '<div class="emptySmall">Зачётные книжки не найдены</div>';
  return list.map(function(b){let current=selectedBook&&selectedBook.url===b.url;return '<button class="bookItem'+(current?' current':'')+'" data-book-url="'+esc(b.url)+'" data-book-label="'+esc(b.label)+'"><span>'+esc(b.label)+'</span><span class="groupMark">'+(current?'✓':'›')+'</span></button>';}).join('');
}
function bindBookItems(books){
  document.querySelectorAll('.bookItem').forEach(function(b){b.onclick=function(){selectRatingBook(this.dataset.bookLabel,this.dataset.bookUrl);};});
  let search=document.getElementById('bookSearch'),box=document.getElementById('bookList');
  if(search&&box)search.oninput=function(){box.innerHTML=bookListHtml(books,this.value);bindBookItems(books);};
}
async function openRatingBooks(){
  openModal('Выберите зачётную книжку','<div class="groupPicker"><input id="bookSearch" class="groupSearch" type="search" placeholder="Поиск по номеру"><div id="bookCount" class="hint">Загрузка списка...</div><div id="bookList"><div class="loadingSmall">Получаем зачётные книжки с портала...</div></div></div>');
  let cached=readJson(ratingBooksKey(),null),books=cached&&cached.books?cached.books:ratingBooks;
  if(books&&books.length){document.getElementById('bookCount').textContent='Зачётных книжек: '+books.length;document.getElementById('bookList').innerHTML=bookListHtml(books,'');bindBookItems(books);}
  try{books=await fetchRatingBooks(ratingGroup);ratingBooks=books;let c=document.getElementById('bookCount'),l=document.getElementById('bookList');if(!c||!l)return;c.textContent='Зачётных книжек: '+books.length;l.innerHTML=bookListHtml(books,'');bindBookItems(books);}catch(err){if(!books||!books.length){let l=document.getElementById('bookList');if(l)l.innerHTML='<div class="emptySmall">Не удалось получить список.<br><span class="muted">'+esc(err.message||'Проверьте интернет')+'</span></div>';}}
}
function selectRatingBook(label,url){
  if(!url)return;selectedBook={label:label||'Зачётная книжка',url:url};writeJson(ratingBookKey(),selectedBook);ratingLastBackgroundAt=0;ratingPeriod=loadStoredRatingPeriod(selectedBook);ratingPeriodOptions={years:[],semesters:[]};ratingPeriodCatalog=[];ratingData=null;closeModal();updateBookButton();updateRatingPeriodControls();loadRating(false);
}
function updateBookButton(){let el=document.getElementById('bookName');if(el)el.textContent=selectedBook?selectedBook.label:'Выберите зачётную книжку';}
function ratingPeriodButtonLabel(kind){
  ratingPeriod=sanitizeRatingPeriod(ratingPeriod);
  let value=kind==='year'?(ratingPeriod.yearLabel||ratingPeriod.year):(ratingPeriod.semesterLabel||ratingPeriod.semester);
  if(value)return value;
  return kind==='year'?'Учебный год':'Семестр';
}
function updateRatingPeriodControls(){
  let y=document.getElementById('ratingYearValue'),s=document.getElementById('ratingSemesterValue');
  if(y)y.textContent=ratingPeriodButtonLabel('year');
  if(s)s.textContent=ratingPeriodButtonLabel('semester');
  let yb=document.getElementById('ratingYear'),sb=document.getElementById('ratingSemester');
  if(yb)yb.setAttribute('aria-label','Учебный год: '+ratingPeriodButtonLabel('year'));
  if(sb)sb.setAttribute('aria-label','Семестр: '+ratingPeriodButtonLabel('semester'));
}
function ratingPickerOptions(kind){
  if(kind==='year')return ratingPeriodOptions.years||[];
  return ratingSemesterOptionsForYear(ratingPeriodOptions.semesters||[],ratingPeriod.yearLabel||ratingPeriod.year);
}
function ratingPeriodPickerHtml(kind,options){
  let current=kind==='year'?ratingPeriod.year:ratingPeriod.semester;
  if(!options||!options.length)return '<div class="emptySmall">Варианты пока не получены с портала.</div>';
  return '<div class="ratingPeriodPicker">'+options.map(function(o){let active=String(o.value)===String(current);return '<button type="button" class="ratingPeriodItem'+(active?' current':'')+'" data-rating-period-value="'+esc(o.value)+'"><span>'+esc(o.label||o.value)+'</span><span class="groupMark">'+(active?'✓':'›')+'</span></button>';}).join('')+'</div>';
}
async function openRatingPeriodPicker(kind){
  let title=kind==='year'?'Учебный год':'Семестр';
  if(!selectedBook){
    openModal(title,'<div class="emptySmall">Сначала выберите зачётную книжку.</div><button id="ratingPeriodPickBook" class="primary full" type="button">Выбрать зачётную книжку</button>');
    let pick=document.getElementById('ratingPeriodPickBook');if(pick)pick.onclick=function(){closeModal();openRatingBooks();};
    return;
  }
  let options=ratingPickerOptions(kind);
  openModal(title,'<div id="ratingPeriodPickerHost">'+((options&&options.length)?ratingPeriodPickerHtml(kind,options):ratingNativePickerLoadingHtml(kind))+'</div>');
  if(options&&options.length){ratingBindNativePeriodItems(kind);return;}
  refreshNativeRatingPeriodPicker(kind);
}
function selectRatingPeriod(kind,value){
  if(!selectedBook)return;let options=ratingPickerOptions(kind),found=(options||[]).find(o=>String(o.value)===String(value));
  if(kind==='year'){ratingPeriod.year=String(value||'');ratingPeriod.yearLabel=found?ratingCanonicalYearLabel(found.label):ratingCanonicalYearLabel(String(value||''));ratingPeriod.semester='';ratingPeriod.semesterLabel='';}
  else{ratingPeriod.semester=String(value||'');ratingPeriod.semesterLabel=found?found.label:String(value||'');}
  saveRatingPeriod();ratingLastBackgroundAt=0;ratingLoadSeq++;updateRatingPeriodControls();
  if(kind==='year'){ratingData=null;renderRating();setStatus('Выберите семестр');return;}
  let cached=readJson(ratingCacheKey(selectedBook,ratingPeriod),null);if(cached){ratingData=ratingRepairControlPointDuplicatesInData(cached);ratingPeriodOptions=sanitizeRatingPeriodOptions(cached.periodOptions||ratingPeriodOptions);ratingPeriodCatalog=Array.isArray(cached.periodCatalog)?cached.periodCatalog:[];renderRating();setStatus('Показан сохранённый рейтинг · проверяем изменения...');}else{ratingData=null;renderRating();}
  loadRating(false);
}
function isScoreValue(v){
  let s=cleanLine(v);
  return /^[-–—]$/.test(s)||/^\d+(?:[.,]\d+)?(?:\s*\/\s*\d+(?:[.,]\d+)?)?$/.test(s)||/^\d+(?:[.,]\d+)?\s*(?:балл(?:а|ов)?|%)?$/i.test(s)||/^(?:зачтено|не\s*зачтено|незачтено|отлично|хорошо|удовлетворительно|неудовлетворительно|A|B|C|D|E|F)$/i.test(s);
}
function isNoiseRatingLabel(s){
  return /^(?:№|номер|п\/п|группа|фио|студент|зач[её]тная книжка|семестр|курс|форма обучения|учебный год)$/i.test(cleanLine(s));
}
function ratingTableShape(rows){
  if(!rows||rows.length<2)return null;let limit=Math.min(4,rows.length),best={index:0,score:-1,subjectIndex:-1,header:rows[0]||[]};
  for(let i=0;i<limit;i++){
    let h=(rows[i]||[]).map(cleanLine),subjectIndex=h.findIndex(x=>/(дисциплин|предмет|наименован[а-яё]*\s+дисциплин|учебн[а-яё]*\s+дисциплин)/i.test(x));
    let score=(subjectIndex>=0?100:0)+h.filter(x=>/(кт\s*\d*|контрольн[а-яё]*\s+точк|балл|итог|оценк|зач[её]т|экзамен|посещ|рейтинг)/i.test(x)).length*7+h.filter(Boolean).length;
    if(score>best.score)best={index:i,score:score,subjectIndex:subjectIndex,header:h};
  }
  if(best.subjectIndex<0&&best.score<18)return null;
  if(best.subjectIndex<0){
    let body=rows.slice(best.index+1),width=Math.max.apply(null,rows.map(r=>r.length)),bestCol=-1,bestColScore=-1;
    for(let j=0;j<width;j++){
      let vals=body.map(r=>cleanLine(r[j]||'')).filter(Boolean);if(!vals.length)continue;let textCount=vals.filter(v=>!isScoreValue(v)&&v.length>4).length,avg=vals.reduce((a,v)=>a+v.length,0)/vals.length,score=textCount*3+avg-(isNoiseRatingLabel(best.header[j]||'')?30:0);if(score>bestColScore){bestColScore=score;bestCol=j;}
    }
    best.subjectIndex=bestCol;
  }
  return best.subjectIndex>=0?best:null;
}
function ratingSubjectsFromTables(tables){
  let result=[],bySubject=new Map();
  (tables||[]).forEach(function(rows){
    let shape=ratingTableShape(rows);if(!shape)return;let header=shape.header,body=rows.slice(shape.index+1),subjectIndex=shape.subjectIndex,width=Math.max.apply(null,rows.map(r=>r.length));
    body.forEach(function(row){
      let subject=cleanLine(row[subjectIndex]||'');
      if(!subject||subject.length<3||isScoreValue(subject)||/^(итого|всего|средний балл|рейтинг)$/i.test(subject))return;
      if(/университет|правительства москвы|контакты|новости|ресурсы|мероприятия|сервисы|правила рейтинга|к выбору группы/i.test(subject))return;
      let details=[];
      for(let j=0;j<Math.max(width,row.length);j++){
        if(j===subjectIndex)continue;let value=cleanLine(row[j]||'');if(!value)continue;let label=cleanLine(header[j]||'');
        if(/^(?:№|номер|п\/п)$/i.test(label))continue;if(!label)label='Показатель '+(j+1);
        details.push({label:label,value:value});
      }
      if(!details.length)return;
      let totalDetail=details.find(d=>/(итог|общий|сумм|всего|рейтинг|результат)/i.test(d.label));if(!totalDetail)totalDetail=details.slice().reverse().find(d=>isScoreValue(d.value))||details[details.length-1];
      let item=bySubject.get(subject);if(!item){item={subject:subject,total:totalDetail?totalDetail.value:'—',totalLabel:totalDetail?totalDetail.label:'Итог',details:[]};bySubject.set(subject,item);result.push(item);}
      details.forEach(function(d){if(!item.details.some(x=>x.label===d.label&&x.value===d.value))item.details.push(d);});if(totalDetail){item.total=totalDetail.value;item.totalLabel=totalDetail.label;}
    });
  });return result;
}
function ratingPackedMetricLabels(text){
  text=cleanLine(text||'');let matches=[],re=/(?:модуль\s*\d+|кт\s*\d+|контрольн[а-яё]*\s+точк[а-яё]*(?:\s*\d+)?|общий\s+балл|итогов[а-яё]*\s+балл|итог|рейтинг|оценка|зач[её]т|экзамен)/ig,m;
  while((m=re.exec(text))){let label=cleanLine(m[0]);if(!matches.some(x=>x.toLowerCase()===label.toLowerCase()))matches.push(label);}
  return matches;
}
function ratingTakeTrailingScores(text,maxCount){
  let rest=cleanLine(text||''),values=[];maxCount=Math.max(1,maxCount||6);
  while(rest&&values.length<maxCount){
    let parts=rest.split(/\s+/),found='',take=0;
    for(let n=Math.min(3,parts.length);n>=1;n--){let candidate=cleanLine(parts.slice(parts.length-n).join(' '));if(isScoreValue(candidate)){found=candidate;take=n;break;}}
    if(!found)break;values.unshift(found);parts.splice(parts.length-take,take);rest=cleanLine(parts.join(' '));
  }
  return {rest:rest,values:values};
}
function ratingSubjectsFromPackedTables(tables){
  let result=[],bySubject=new Map();
  (tables||[]).forEach(function(rows){
    if(!rows||!rows.length)return;let headerIndex=-1,labels=[];
    for(let i=0;i<Math.min(5,rows.length);i++){
      let h=cleanLine((rows[i]||[]).join(' '));if(!/дисциплин|предмет|наименован[а-яё]*\s+дисциплин/i.test(h))continue;
      let found=ratingPackedMetricLabels(h);if(found.length){headerIndex=i;labels=found;break;}
    }
    if(headerIndex<0||!labels.length)return;
    rows.slice(headerIndex+1).forEach(function(row){
      let text=cleanLine((row||[]).join(' '));if(!text||/^(?:итого|всего|средний балл|рейтинг)$/i.test(text))return;
      if(/университет|правительства москвы|контакты|новости|ресурсы|мероприятия|сервисы|правила рейтинга|к выбору группы/i.test(text))return;
      let tail=ratingTakeTrailingScores(text,labels.length);if(!tail.values.length)return;
      let subject=tail.rest,control='';
      let cm=subject.match(/(?:[,;]\s*|\s+)(зач[её]т|экзамен|дифференцированн[а-яё]*\s+зач[её]т)\s*$/i);
      if(cm){control=cleanLine(cm[1]);subject=cleanLine(subject.slice(0,cm.index));}
      subject=subject.replace(/^\s*\d+[.)]?\s+/,'').trim();
      if(!subject||subject.length<3||isScoreValue(subject))return;
      let usedLabels=labels.slice(Math.max(0,labels.length-tail.values.length)),details=[];
      if(control)details.push({label:'Форма контроля',value:control});
      tail.values.forEach(function(value,i){details.push({label:usedLabels[i]||('Показатель '+(i+1)),value:value});});
      if(!details.length)return;
      let totalDetail=details.find(d=>/(итог|общий|сумм|всего|рейтинг|результат)/i.test(d.label))||details.slice().reverse().find(d=>isScoreValue(d.value))||details[details.length-1];
      let key=normalizeSubject(subject),item=bySubject.get(key);if(!item){item={subject:subject,total:totalDetail?totalDetail.value:'—',totalLabel:totalDetail?totalDetail.label:'Итог',details:[]};bySubject.set(key,item);result.push(item);}
      details.forEach(function(d){if(!item.details.some(x=>x.label===d.label&&x.value===d.value))item.details.push(d);});if(totalDetail){item.total=totalDetail.value;item.totalLabel=totalDetail.label;}
    });
  });return result;
}
function ratingSummaryMetricLabels(doc){
  let out=[],seen=new Set();
  Array.from(doc.querySelectorAll('th,h3,h4,h5,h6,strong,b,span,div')).forEach(function(el){
    if(el.children&&el.children.length)return;let t=cleanLine(el.textContent||'');if(!t||t.length>60)return;
    if(!/^(?:модуль\s*\d+|кт\s*\d+|контрольн[а-яё]*\s+точк[а-яё]*(?:\s*\d+)?|общий\s+балл|итогов[а-яё]*\s+балл|итого|итог|рейтинг|оценка)$/i.test(t))return;
    let k=t.toLowerCase();if(seen.has(k))return;seen.add(k);out.push(t);
  });
  if(!out.length)out=['Модуль 1','Модуль 2','Общий балл'];
  if(out.length>6)out=out.slice(0,6);return out;
}
function ratingLeafTextNodes(doc){
  let list=[];Array.from(doc.querySelectorAll('body *')).forEach(function(el){
    if(el.children&&el.children.length)return;let t=cleanLine(el.textContent||'');if(!t)return;list.push({el:el,text:t});
  });return list;
}
function ratingSubjectsFromPersonalDom(doc,sourceUrl){
  let anchors=Array.from(doc.querySelectorAll('a[href]')).filter(function(a){try{return /\/student\/detailed\.php$/i.test(new URL(a.getAttribute('href')||'',sourceUrl).pathname);}catch(e){return false;}});
  if(!anchors.length)return [];
  let metricLabels=ratingSummaryMetricLabels(doc),leaves=ratingLeafTextNodes(doc),anchorIndex=new Map(),anchorSet=new Set(anchors);leaves.forEach(function(x,i){let a=null;try{a=x.el&&x.el.tagName==='A'?x.el:(x.el&&x.el.closest?x.el.closest('a[href]'):null);}catch(e){}if(a&&anchorSet.has(a)&&!anchorIndex.has(a))anchorIndex.set(a,i);});
  let result=[],seen=new Set();
  anchors.forEach(function(a,ai){
    let rawLabel=cleanLine(a.textContent||'');if(!rawLabel)return;let href='';try{href=new URL(a.getAttribute('href')||'',sourceUrl).href;}catch(e){return;}
    let discipline=rawLabel;try{let q=new URL(href).searchParams.get('discipline');if(q)discipline=cleanLine(q);}catch(e){}
    let control='',subject=discipline,cm=subject.match(/(?:[,;]\s*|\s+)(зач[её]т(?:\s+с\s+оценкой)?|экзамен|дифференцированн[а-яё]*\s+зач[её]т)\s*$/i);if(cm){control=cleanLine(cm[1]);subject=cleanLine(subject.slice(0,cm.index));}
    let key=normalizeSubject(subject);if(!subject||subject.length<3||seen.has(key))return;
    let values=[],cur=a.parentElement,best=[];
    for(let depth=0;cur&&depth<7;depth++,cur=cur.parentElement){
      let vals=[];Array.from(cur.querySelectorAll('*')).forEach(function(el){if(el.children&&el.children.length)return;let t=cleanLine(el.textContent||'');if(t&&isScoreValue(t))vals.push(t);});
      if(vals.length&&vals.length<=Math.max(8,metricLabels.length+3)){best=vals;if(vals.length>=Math.min(3,metricLabels.length))break;}
    }
    values=best;
    if(!values.length){
      let start=anchorIndex.has(a)?anchorIndex.get(a):-1,end=leaves.length;
      for(let j=ai+1;j<anchors.length;j++){let ix=anchorIndex.get(anchors[j]);if(ix!==undefined&&ix>start){end=ix;break;}}
      if(start>=0){for(let i=start+1;i<end&&values.length<metricLabels.length;i++){let t=leaves[i].text;if(isScoreValue(t))values.push(t);}}
    }
    if(!values.length)return;if(values.length>metricLabels.length)values=values.slice(values.length-metricLabels.length);
    let labels=metricLabels.slice(Math.max(0,metricLabels.length-values.length)),details=[];if(control)details.push({label:'Форма контроля',value:control});
    values.forEach(function(v,i){details.push({label:labels[i]||('Показатель '+(i+1)),value:v});});
    let totalDetail=details.find(function(d){return /(итог|общий|сумм|всего|рейтинг|результат)/i.test(d.label);})||details.slice().reverse().find(function(d){return isScoreValue(d.value);});
    seen.add(key);result.push({subject:subject,total:totalDetail?totalDetail.value:'—',totalLabel:totalDetail?totalDetail.label:'Итог',details:details,detailUrl:href});
  });
  return result;
}

function ratingDetailControlPointNumber(text){
  let t=cleanLine(text||'').toLowerCase().replace(/ё/g,'е');if(!t)return 0;
  let m=t.match(/(?:^|\b)(?:кт|контрольн[а-яё]*\s+точк[а-яё]*|точк[а-яё]*)\s*(?:№\s*)?([1-5])(?:\b|$)/i);
  if(!m)m=t.match(/(?:^|\b)([1-5])\s*(?:-?я|-?й)?\s*(?:контрольн[а-яё]*\s+точк[а-яё]*|точк[а-яё]*)(?:\b|$)/i);return m?parseInt(m[1],10):0;
}
function ratingDetailScoreValue(text){
  let t=cleanLine(text||'');if(!t)return '';
  if(/^(?:—|–|-)$/i.test(t))return '—';
  let exact=t.match(/^(-?\d{1,3}(?:[.,]\d{1,2})?)\s*(?:балл(?:а|ов)?|б\.)?$/i);
  if(exact){let n=parseFloat(exact[1].replace(',','.'));if(Number.isFinite(n)&&n>=0&&n<=100)return exact[1].replace('.',',');}
  let pref=t.match(/(?:балл(?:ы|а|ов)?|оценк[а-яё]*)\s*[:=]?\s*(-?\d{1,3}(?:[.,]\d{1,2})?)/i);
  if(pref){let n=parseFloat(pref[1].replace(',','.'));if(Number.isFinite(n)&&n>=0&&n<=100)return pref[1].replace('.',',');}
  let from=t.match(/^(-?\d{1,3}(?:[.,]\d{1,2})?)\s*(?:из|\/|\\)\s*\d{1,3}(?:[.,]\d{1,2})?$/i);
  if(from){let n=parseFloat(from[1].replace(',','.'));if(Number.isFinite(n)&&n>=0&&n<=100)return from[1].replace('.',',');}
  return '';
}
function ratingModuleOneControlPointsFromDetailDoc(doc){
  let found=new Map();
  function setPoint(n,value){n=Number(n)||0;value=ratingDetailScoreValue(value);if(n>=1&&n<=5&&value!==''&&!found.has(n))found.set(n,value);}
  function complete(){return found.size>=5;}
  // 1) Ordinary vertical rows: "Контрольная точка 1 | 8".
  Array.from(doc.querySelectorAll('tr')).forEach(function(tr){
    if(complete())return;let cells=Array.from(tr.querySelectorAll('th,td')),texts=cells.map(function(c){return cleanLine(c.textContent||'');});
    texts.forEach(function(t,i){let n=ratingDetailControlPointNumber(t);if(!n||found.has(n))return;
      let ownTail=t.replace(/.*?(?:кт|контрольн[а-яё]*\s+точк[а-яё]*|точк[а-яё]*)\s*(?:№\s*)?[1-5]/i,'').trim(),own=ratingDetailScoreValue(ownTail);if(own){setPoint(n,own);return;}
      for(let j=i+1;j<texts.length&&j<=i+3;j++){let v=ratingDetailScoreValue(texts[j]);if(v){setPoint(n,v);break;}if(ratingDetailControlPointNumber(texts[j]))break;}
    });
  });
  // 2) Header columns: KT1..KT5 in one row and scores in the following row.
  Array.from(doc.querySelectorAll('table')).forEach(function(table){
    if(complete())return;let rows=Array.from(table.querySelectorAll('tr'));for(let ri=0;ri<rows.length-1&&!complete();ri++){
      let heads=Array.from(rows[ri].querySelectorAll('th,td')).map(function(c){return cleanLine(c.textContent||'');}),cols=[];
      heads.forEach(function(t,i){let n=ratingDetailControlPointNumber(t);if(n)cols.push({n:n,i:i});});if(cols.length<2)continue;
      for(let rj=ri+1;rj<Math.min(rows.length,ri+4)&&!complete();rj++){
        let vals=Array.from(rows[rj].querySelectorAll('th,td')).map(function(c){return cleanLine(c.textContent||'');}),good=0,pairs=[];
        cols.forEach(function(c){let v=c.i<vals.length?ratingDetailScoreValue(vals[c.i]):'';if(v){good++;pairs.push([c.n,v]);}});
        if(good>=Math.min(3,cols.length)){pairs.forEach(function(x){setPoint(x[0],x[1]);});break;}
      }
    }
  });
  // 3) Leaf-node layout used by responsive/mobile portal markup.
  if(!complete()){
    let leaves=[];Array.from(doc.querySelectorAll('body *')).forEach(function(el){if(el.children&&el.children.length)return;let t=cleanLine(el.textContent||'');if(t)leaves.push(t);});
    for(let i=0;i<leaves.length&&!complete();i++){
      let n=ratingDetailControlPointNumber(leaves[i]);if(!n||found.has(n))continue;
      for(let j=i+1;j<leaves.length&&j<=i+4;j++){if(ratingDetailControlPointNumber(leaves[j]))break;let v=ratingDetailScoreValue(leaves[j]);if(v){setPoint(n,v);break;}}
    }
  }
  // 4) Inputs/data attributes, if the portal renders scores through form controls.
  if(!complete())Array.from(doc.querySelectorAll('input,select,textarea,[data-value],[aria-label],[title]')).forEach(function(el){
    if(complete())return;let label=[el.getAttribute('aria-label'),el.getAttribute('title'),el.getAttribute('name'),el.getAttribute('id')].filter(Boolean).join(' '),n=ratingDetailControlPointNumber(label);if(!n||found.has(n))return;
    let v=el.value!==undefined?String(el.value||''):String(el.getAttribute('data-value')||el.textContent||'');setPoint(n,v);
  });
  // 5) Some portal tables identify rows only by the point number (1..5), while
  // a nearby cell names the section "Модуль 1". Use such rows only inside a
  // table/section that explicitly contains "Модуль 1", avoiding guessed scores.
  if(!complete())Array.from(doc.querySelectorAll('table')).forEach(function(table){
    if(complete())return;let all=cleanLine(table.textContent||'');if(!/модуль\s*1/i.test(all))return;
    Array.from(table.querySelectorAll('tr')).forEach(function(tr){if(complete())return;let cells=Array.from(tr.querySelectorAll('th,td')).map(function(c){return cleanLine(c.textContent||'');});if(cells.length<2)return;
      let n=0;for(let i=0;i<Math.min(3,cells.length);i++){let m=cells[i].match(/^(?:кт\s*)?(?:№\s*)?([1-5])(?:\s*(?:контрольн[а-яё]*\s+точк[а-яё]*))?$/i);if(m){n=parseInt(m[1],10);break;}}
      if(!n||found.has(n))return;for(let j=cells.length-1;j>=0;j--){let v=ratingDetailScoreValue(cells[j]);if(v&&String(v)!==String(n)){setPoint(n,v);break;}}
    });
  });
  let out=[];for(let n=1;n<=5;n++)out.push({label:'Контрольная точка '+n,value:found.has(n)?found.get(n):'—'});return out;
}
function ratingReplaceModuleOneWithControlPoints(item,points){
  // v0.48: this function is deliberately idempotent. v0.47 inserted another
  // five rows every time a cached subject was refreshed because after the
  // first pass there was no longer a "Модуль 1" row to replace. Strip every
  // existing Module 1 / control-point row first, then insert exactly five once.
  if(!item)return item;let source=Array.isArray(item.details)?item.details:[],out=[],anchor=-1;
  source.forEach(function(d){
    let label=cleanLine(d&&d.label||''),isModuleOne=/^модуль\s*1$/i.test(label),isPoint=/^контрольная\s+точка\s+[1-5]$/i.test(label);
    if(isModuleOne||isPoint){
      if(anchor<0)anchor=out.length;
      if(isModuleOne&&!item.moduleOneTotal){item.moduleOneTotal=cleanLine(d&&d.value||'');}
      return;
    }
    out.push(d);
  });
  if(anchor<0){anchor=out.findIndex(function(d){return /^модуль\s*2$/i.test(cleanLine(d&&d.label||''));});if(anchor<0)anchor=out.findIndex(function(d){return /(итог|общий|сумм|всего|рейтинг|результат)/i.test(cleanLine(d&&d.label||''));});if(anchor<0)anchor=out.length;}
  let normalized=[];for(let i=0;i<5;i++){let p=points&&points[i];normalized.push({label:'Контрольная точка '+(i+1),value:cleanLine(p&&p.value||'')||'—'});}
  out.splice.apply(out,[anchor,0].concat(normalized));item.details=out;return item;
}
async function ratingEnrichModuleOneControlPoints(subjects){
  let list=Array.isArray(subjects)?subjects:[],jobs=list.map(function(item,index){return {item:item,index:index,url:String(item&&item.detailUrl||'')};}).filter(function(j){return !!j.url;}),cursor=0;
  async function worker(){while(cursor<jobs.length){let job=jobs[cursor++],points=[];try{let r=await fetchRatingResponse(job.url);points=ratingModuleOneControlPointsFromDetailDoc(r.doc);}catch(e){points=ratingModuleOneControlPointsFromDetailDoc(new DOMParser().parseFromString('<html></html>','text/html'));}ratingReplaceModuleOneWithControlPoints(job.item,points);}}
  let workers=Math.min(12,jobs.length);if(workers)await Promise.all(Array.from({length:workers},worker));
  // Even if a detail page is temporarily unavailable, the UI contract is five
  // control points instead of the aggregate Module 1. Missing portal values are
  // shown as an em dash; Module 2 and Общий балл stay untouched.
  list.forEach(function(item){if(!(item.details||[]).some(function(d){return /^контрольная\s+точка\s+1$/i.test(cleanLine(d&&d.label||''));}))ratingReplaceModuleOneWithControlPoints(item,[1,2,3,4,5].map(function(n){return {label:'Контрольная точка '+n,value:'—'};}));});
  return list;
}

function ratingDetailDocHasPointStructure(doc){
  let text='';try{text=cleanLine(doc&&doc.body&&doc.body.textContent||'');}catch(e){}return /(?:\bкт|контрольн[а-яё]*\s+точк[а-яё]*|\bточк[а-яё]*)\s*(?:№\s*)?[1-5](?:\b|$)/i.test(text);
}
function ratingFetchDetailControlPoints(url){
  url=String(url||'');if(!url)return Promise.resolve({points:ratingPlaceholderControlPoints(),recognized:false});
  if(ratingDetailInflight.has(url))return ratingDetailInflight.get(url);
  let task=(async function(){let r=await fetchRatingResponse(url),points=ratingModuleOneControlPointsFromDetailDoc(r.doc);return {points:points,recognized:ratingDetailDocHasPointStructure(r.doc)};})().finally(function(){ratingDetailInflight.delete(url);});
  ratingDetailInflight.set(url,task);return task;
}
function ratingContextMatches(ctx){
  if(!ctx)return false;let p=normalizeRatingPeriod(ratingPeriod);return String(ratingGroup&&ratingGroup.id||'')===String(ctx.groupId||'')&&String(selectedBook&&selectedBook.url||'')===String(ctx.bookUrl||'')&&String(p.year||'')===String(ctx.period&&ctx.period.year||'')&&String(p.semester||'')===String(ctx.period&&ctx.period.semester||'');
}
function ratingSubjectItem(data,subject){return ratingSubjectsResolved(data).find(function(x){return normalizeSubject(x.subject)===normalizeSubject(subject);})||null;}
function ratingControlPointsFromItem(item){let map=new Map();(item&&item.details||[]).forEach(function(d){let m=cleanLine(d&&d.label||'').match(/^контрольная\s+точка\s+([1-5])$/i);if(m)map.set(Number(m[1]),{label:'Контрольная точка '+m[1],value:cleanLine(d&&d.value||'')||'—'});});let out=[];for(let n=1;n<=5;n++)if(map.has(n))out.push(map.get(n));return out.length===5?out:null;}
function ratingRepairControlPointDuplicatesInData(data){
  if(!data)return data;ratingSubjectsResolved(data).forEach(function(item){
    let hasModule=(item.details||[]).some(function(d){return /^модуль\s*1$/i.test(cleanLine(d&&d.label||''));});
    let hasPoint=(item.details||[]).some(function(d){return /^контрольная\s+точка\s+[1-5]$/i.test(cleanLine(d&&d.label||''));});
    if(!hasModule&&!hasPoint&&!item.detailUrl)return;
    let points=ratingControlPointsFromItem(item)||(item.detailUrl?ratingReadDetailPoints(item.detailUrl):null)||ratingPlaceholderControlPoints();ratingReplaceModuleOneWithControlPoints(item,points);
  });return data;
}
function ratingRepairAllCachedControlPointsV048(){
  try{if(localStorage.getItem(K_RATING_CACHE_REPAIR_V048)==='1')return;let changed=0;
    for(let i=0;i<localStorage.length;i++){let key=localStorage.key(i);if(!key||key.indexOf(K_RATING_CACHE_BASE+'_')!==0)continue;let data=readJson(key,null);if(!data)continue;ratingRepairControlPointDuplicatesInData(data);writeJson(key,data);changed++;}
    localStorage.setItem(K_RATING_CACHE_REPAIR_V048,'1');
  }catch(e){}
}
function ratingSummarySubjectSnapshot(item){
  item=item||{};let details=item.details||[],find=function(re){let d=details.find(function(x){return re.test(cleanLine(x&&x.label||''));});return d?cleanLine(d.value||''):'';};
  return {subject:normalizeSubject(item.subject||''),form:find(/^форма\s+контроля$/i),module1:cleanLine(item.moduleOneTotal||find(/^модуль\s*1$/i)),module2:find(/^модуль\s*2$/i),total:cleanLine(item.total||find(/^(?:общий\s+балл|итог|итого|рейтинг|результат)$/i))};
}
function ratingSummaryChangedSubjects(oldData,newData){
  let fresh=ratingSubjectsResolved(newData),old=ratingSubjectsResolved(oldData),oldMap=new Map();old.forEach(function(x){oldMap.set(normalizeSubject(x.subject||''),ratingSummarySubjectSnapshot(x));});
  if(!old.length)return fresh.map(function(x){return x.subject;});let changed=[];
  fresh.forEach(function(x){let key=normalizeSubject(x.subject||''),before=oldMap.get(key),after=ratingSummarySubjectSnapshot(x);if(!before||JSON.stringify(before)!==JSON.stringify(after))changed.push(x.subject);});return changed;
}
function ratingDetailSubjectsToRefresh(data,baseline,forceAll){
  let list=ratingSubjectsResolved(data);if(forceAll||!baseline)return list.filter(function(x){return !!x.detailUrl;}).map(function(x){return x.subject;});
  let changed=new Set(ratingSummaryChangedSubjects(baseline,data).map(normalizeSubject));return list.filter(function(x){return !!x.detailUrl&&(!ratingReadDetailCache(x.detailUrl)||changed.has(normalizeSubject(x.subject)));}).map(function(x){return x.subject;});
}
function ratingSeedDetailPointsFromCache(data,baseline){
  if(!baseline)return data;ratingSubjectsResolved(data).forEach(function(item){if(!item||!item.detailUrl||ratingReadDetailCache(item.detailUrl))return;let old=ratingSubjectItem(baseline,item.subject),points=ratingControlPointsFromItem(old);if(!points)return;ratingWriteDetailPoints(item.detailUrl,points);ratingReplaceModuleOneWithControlPoints(item,points);});return data;
}
function ratingPatchControlPointRows(subject,points){
  let card=Array.from(document.querySelectorAll('.ratingCard[data-rating-subject]')).find(function(c){return normalizeSubject(c.dataset.ratingSubject||'')===normalizeSubject(subject);});if(!card)return;
  (points||[]).slice(0,5).forEach(function(p,i){let label='Контрольная точка '+(i+1),row=Array.from(card.querySelectorAll('.ratingPoint')).find(function(r){return normalizeSubject(r.dataset.ratingLabel||'')===normalizeSubject(label);});if(!row)return;let value=cleanLine(p&&p.value||'')||'—',b=row.querySelector('b');row.dataset.ratingValue=value;if(b)b.textContent=value;});
}
async function ratingRefreshControlPointsProgressively(data,ctx,baseline,subjectsToRefresh){
  let wanted=Array.isArray(subjectsToRefresh)?new Set(subjectsToRefresh.map(normalizeSubject)):null,list=ratingSubjectsResolved(data),jobs=list.map(function(item){return {subject:item.subject,url:String(item&&item.detailUrl||'')};}).filter(function(j){return !!j.url&&(!wanted||wanted.has(normalizeSubject(j.subject)));}),cursor=0,run=++ratingDetailRunSeq;
  async function worker(){
    while(cursor<jobs.length){let job=jobs[cursor++],result=null;try{result=await ratingFetchDetailControlPoints(job.url);}catch(e){continue;}
      let previous=ratingReadDetailCache(job.url);if(!result||(!result.recognized&&!ratingControlPointsHaveValues(result.points)))continue;
      let points=result.points||ratingPlaceholderControlPoints();ratingWriteDetailPoints(job.url,points);
      let item=ratingSubjectItem(data,job.subject);if(item)ratingReplaceModuleOneWithControlPoints(item,points);
      data.detailsPending=true;data.detailsUpdatedAt=new Date().toISOString();writeJson(ctx.cacheKey,data);
      if(ratingContextMatches(ctx)){
        let live=ratingSubjectItem(ratingData,job.subject);if(live)ratingReplaceModuleOneWithControlPoints(live,points);if(section==='rating')ratingPatchControlPointRows(job.subject,points);
      }
    }
  }
  let workers=Math.min(8,jobs.length);if(workers)await Promise.all(Array.from({length:workers},worker));
  data.detailsPending=false;data.detailsLoadedAt=new Date().toISOString();writeJson(ctx.cacheKey,data);
  if(run!==ratingDetailRunSeq)return;
  if(!ctx.scopeChanged){let changed=ratingScoreChanges(baseline,data);if(changed.length&&ratingContextMatches(ctx))addRatingChangeNotifications(changed,data);}
  if(ratingContextMatches(ctx)){
    if(ratingData!==data){ratingData=data;renderRating();}
    let suffix=[ctx.period.yearLabel,ctx.period.semesterLabel].filter(Boolean).join(' · ');if(section==='rating')setStatus('Рейтинг обновлён'+(suffix?' · '+suffix:'')+' · '+new Date().toLocaleString('ru-RU',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}));
  }
}

function ratingSubjectsResolved(data){
  if(data&&Array.isArray(data.subjects)&&data.subjects.length)return data.subjects;
  let tables=Array.isArray(data)?data:((data&&data.tables)||[]),regular=ratingSubjectsFromTables(tables),packed=ratingSubjectsFromPackedTables(tables);
  if(!regular.length)return packed;if(!packed.length)return regular;
  let out=regular.slice(),seen=new Set(out.map(x=>normalizeSubject(x.subject)));packed.forEach(function(x){let k=normalizeSubject(x.subject);if(!seen.has(k)){seen.add(k);out.push(x);}});return out;
}

function ratingCardHtml(item,index){
  let bg=cardColor(item.subject),fg=textColor(bg),subjectMarks=ratingMarksForSubject(item.subject),marked=subjectMarks.length||pendingRatingSubjects.some(x=>normalizeSubject(x)===normalizeSubject(item.subject));
  let details=item.details.map(function(d){let total=/(итог|общий|сумм|всего|рейтинг|результат)/i.test(d.label);return '<div class="ratingPoint'+(total?' total':'')+'" data-rating-label="'+esc(d.label)+'" data-rating-value="'+esc(d.value)+'"><span>'+esc(d.label)+'</span><b>'+esc(d.value)+'</b></div>';}).join('');
  return '<article class="ratingCard" data-rating-subject="'+esc(item.subject)+'" style="--card:'+bg+';--ink:'+fg+'"><button class="ratingCardHead" type="button" data-rating-index="'+index+'" aria-expanded="false"><div class="ratingSubject">'+esc(item.subject)+'</div><div class="ratingTotal"><span>'+esc(item.totalLabel||'Итог')+'</span><b>'+esc(item.total||'—')+'</b></div><svg class="ratingChevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg>'+(marked?changeDotHtml('cardChangeDot'):'')+'</button><div class="ratingDetails hidden">'+details+'</div></article>';
}
function revealRatingScoreMarks(card){
  if(!card)return;let subject=card.dataset.ratingSubject||'',marks=ratingMarksForSubject(subject);if(!marks.length)return;
  marks.forEach(function(mark){
    let rows=Array.from(card.querySelectorAll('.ratingPoint'));
    let row=rows.find(function(r){return normalizeSubject(r.dataset.ratingLabel||'')===normalizeSubject(mark.label)&&(!mark.newValue||String(r.dataset.ratingValue||'')===String(mark.newValue));})||rows.find(function(r){return normalizeSubject(r.dataset.ratingLabel||'')===normalizeSubject(mark.label);});
    if(row&&!row.querySelector('.scoreChangeDot')){row.classList.add('scoreChanged');row.insertAdjacentHTML('beforeend',changeDotHtml('scoreChangeDot'));setTimeout(function(){row.classList.remove('scoreChanged');let dot=row.querySelector('.scoreChangeDot');if(dot)dot.remove();},4200);}
  });
}
function bindRatingCards(){
  document.querySelectorAll('.ratingCardHead').forEach(function(btn){btn.onclick=function(){let card=this.closest('.ratingCard'),details=card&&card.querySelector('.ratingDetails');if(!details)return;let open=details.classList.toggle('hidden')===false;this.setAttribute('aria-expanded',open?'true':'false');card.classList.toggle('open',open);if(open)revealRatingScoreMarks(card);};});
}
function applyPendingRatingNavigation(){
  if((!pendingRatingSubjects||!pendingRatingSubjects.length)&&(!pendingRatingMarks||!pendingRatingMarks.length))return;
  let wanted=[...new Set((pendingRatingSubjects||[]).concat((pendingRatingMarks||[]).map(x=>x.subject)))].map(x=>normalizeSubject(x)),first=null;
  document.querySelectorAll('.ratingCard[data-rating-subject]').forEach(function(card){let subject=normalizeSubject(card.dataset.ratingSubject||'');if(!wanted.includes(subject))return;card.classList.add('notificationTarget');if(!first)first=card;});
  if(first){
    let head=first.querySelector('.ratingCardHead'),details=first.querySelector('.ratingDetails');if(head&&details){details.classList.remove('hidden');head.setAttribute('aria-expanded','true');first.classList.add('open');}
    revealRatingScoreMarks(first);
    let firstMark=ratingMarksForSubject(first.dataset.ratingSubject||'')[0],targetRow=null;if(firstMark){let rows=Array.from(first.querySelectorAll('.ratingPoint'));targetRow=rows.find(function(r){return normalizeSubject(r.dataset.ratingLabel||'')===normalizeSubject(firstMark.label)&&(!firstMark.newValue||String(r.dataset.ratingValue||'')===String(firstMark.newValue));})||rows.find(function(r){return normalizeSubject(r.dataset.ratingLabel||'')===normalizeSubject(firstMark.label);});}
    setTimeout(function(){(targetRow||first).scrollIntoView({behavior:'smooth',block:'center'});},120);
    setTimeout(function(){document.querySelectorAll('.ratingCard.notificationTarget').forEach(x=>x.classList.remove('notificationTarget'));},2600);
    setTimeout(function(){pendingRatingSubjects=[];pendingRatingMarks=[];document.querySelectorAll('.ratingCard .cardChangeDot').forEach(function(x){x.remove();});},4600);
  }
}
function renderRating(){
  let c=document.getElementById('ratingContent');if(!c)return;updateBookButton();updateRatingPeriodControls();if(ratingData)ratingRepairControlPointDuplicatesInData(ratingData);
  if(!selectedBook){c.innerHTML='<div class="empty"><div class="emptyTitle">Выберите зачётную книжку</div><button id="pickBookNow" class="primary">Выбрать</button></div>';let b=document.getElementById('pickBookNow');if(b)b.onclick=openRatingBooks;return;}
  if(ratingPeriod.year&&!ratingPeriod.semester){c.innerHTML='<div class="empty"><div class="emptyTitle">Выберите семестр</div></div>';return;}
  if(!ratingData){c.innerHTML='<div class="loading">Загрузка рейтинга...</div>';return;}
  let subjects=ratingSubjectsResolved(ratingData);
  if(!subjects.length){c.innerHTML='<div class="empty"><div class="emptyTitle">Дисциплины рейтинга не найдены</div></div>';return;}
  c.innerHTML='<div class="ratingCards">'+subjects.map(ratingCardHtml).join('')+'</div>';bindRatingCards();applyPendingRatingNavigation();
}
async function loadRating(forceDetails){
  if(section!=='rating')return;if(!selectedBook){renderRating();setStatus('Выберите зачётную книжку');return;}if(ratingPeriod.year&&!ratingPeriod.semester){renderRating();setStatus('Выберите семестр');return;}
  let run=++ratingLoadSeq,requestGroup=String(ratingGroup.id||''),requestBookUrl=String(selectedBook.url||''),requestPeriod=normalizeRatingPeriod(ratingPeriod),requestKey=ratingCacheKey(selectedBook,requestPeriod),baseline=readJson(requestKey,null);if(baseline)ratingRepairControlPointDuplicatesInData(baseline);
  if(!ratingData&&baseline){ratingData=baseline;ratingPeriod=sanitizeRatingPeriod(baseline.period||ratingPeriod);ratingPeriodOptions=sanitizeRatingPeriodOptions(baseline.periodOptions||ratingPeriodOptions);ratingPeriodCatalog=Array.isArray(baseline.periodCatalog)?baseline.periodCatalog:[];renderRating();}
  ratingBusy=true;setBusy(true);setStatus(baseline?'Проверяем изменения рейтинга...':'Загружаем рейтинг...');if(!ratingData)renderRating();
  try{
    let data=await fetchRatingData(selectedBook);if(run!==ratingLoadSeq)return;if(requestGroup!==String(ratingGroup.id||'')||requestBookUrl!==String(selectedBook&&selectedBook.url||''))return;
    let current=normalizeRatingPeriod(ratingPeriod);if(String(current.year||'')!==String(requestPeriod.year||'')||String(current.semester||'')!==String(requestPeriod.semester||''))return;
    ratingLastBackgroundAt=Date.now();try{localStorage.setItem(K_RATING_BG_LAST,String(ratingLastBackgroundAt));}catch(e){}
    ratingPeriod=sanitizeRatingPeriod(data.period);ratingPeriodOptions=sanitizeRatingPeriodOptions(data.periodOptions||{years:[],semesters:[]});ratingPeriodCatalog=Array.isArray(data.periodCatalog)?data.periodCatalog:[];saveRatingPeriod();
    let finalKey=ratingCacheKey(selectedBook,ratingPeriod),oldData=readJson(finalKey,null)||baseline;if(oldData)ratingRepairControlPointDuplicatesInData(oldData);ratingSeedDetailPointsFromCache(data,oldData);ratingRepairControlPointDuplicatesInData(data);
    let notifyScope=ratingNotificationScope(selectedBook),scopeChanged=localStorage.getItem(K_NOTIFY_RATING_SCOPE)!==notifyScope;localStorage.setItem(K_NOTIFY_RATING_SCOPE,notifyScope);
    let detailSubjects=ratingDetailSubjectsToRefresh(data,oldData,!!forceDetails);data.detailsPending=detailSubjects.length>0;ratingData=data;writeJson(finalKey,data);renderRating();
    let suffix=[ratingPeriod.yearLabel,ratingPeriod.semesterLabel].filter(Boolean).join(' · ');
    if(!detailSubjects.length){data.detailsPending=false;data.detailsLoadedAt=new Date().toISOString();writeJson(finalKey,data);setStatus('Рейтинг актуален'+(suffix?' · '+suffix:'')+' · '+new Date().toLocaleString('ru-RU',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}));if(!scopeChanged){let changed=ratingScoreChanges(oldData,data);if(changed.length)addRatingChangeNotifications(changed,data);}return;}
    setStatus('Рейтинг загружен'+(suffix?' · '+suffix:'')+' · уточняем изменившиеся оценки в фоне');
    let ctx={groupId:String(ratingGroup.id||''),bookUrl:String(selectedBook.url||''),period:normalizeRatingPeriod(ratingPeriod),cacheKey:finalKey,scopeChanged:scopeChanged};ratingRefreshControlPointsProgressively(data,ctx,oldData,detailSubjects);
  }catch(err){
    if(run!==ratingLoadSeq)return;let cache=readJson(requestKey,null);if(cache){ratingData=ratingRepairControlPointDuplicatesInData(cache);ratingPeriod=sanitizeRatingPeriod(cache.period||ratingPeriod);ratingPeriodOptions=sanitizeRatingPeriodOptions(cache.periodOptions||ratingPeriodOptions);ratingPeriodCatalog=Array.isArray(cache.periodCatalog)?cache.periodCatalog:[];setStatus('Нет сети — показана сохранённая версия');renderRating();}
    else{let c=document.getElementById('ratingContent');if(c)c.innerHTML='<div class="empty"><div class="emptyTitle">Рейтинг не загрузился</div><div class="muted">'+esc(err.message||'Проверьте интернет')+'</div><button id="retryRating" class="primary">Повторить</button></div>';let b=document.getElementById('retryRating');if(b)b.onclick=()=>loadRating(true);setStatus('Не удалось загрузить рейтинг');}
  }finally{if(run===ratingLoadSeq){ratingBusy=false;setBusy(false);dismissSplash();}}
}

function ratingHydrateStoredState(){
  let storedBook=readJson(ratingBookKey(),null),storedPeriod=storedBook?loadStoredRatingPeriod(storedBook):normalizeRatingPeriod({}),sameBook=!!(selectedBook&&storedBook&&String(selectedBook.url||'')===String(storedBook.url||'')),samePeriod=sameBook&&String(ratingPeriod.year||'')===String(storedPeriod.year||'')&&String(ratingPeriod.semester||'')===String(storedPeriod.semester||'');
  let cachedBooks=readJson(ratingBooksKey(),null);ratingBooks=cachedBooks&&cachedBooks.books?cachedBooks.books:[];
  selectedBook=storedBook;ratingPeriod=storedPeriod;
  if(!selectedBook){ratingData=null;ratingPeriodOptions={years:[],semesters:[]};ratingPeriodCatalog=[];updateBookButton();updateRatingPeriodControls();renderRating();return false;}
  let cache=readJson(ratingCacheKey(selectedBook,ratingPeriod),null),sameData=!!(samePeriod&&ratingData&&cache&&String(ratingData.loadedAt||'')===String(cache.loadedAt||''));
  if(sameData){updateBookButton();updateRatingPeriodControls();return true;}
  ratingPeriodOptions={years:[],semesters:[]};ratingPeriodCatalog=[];
  if(cache){ratingData=ratingRepairControlPointDuplicatesInData(cache);ratingPeriod=sanitizeRatingPeriod(cache.period||ratingPeriod);ratingPeriodOptions=sanitizeRatingPeriodOptions(cache.periodOptions||ratingPeriodOptions);ratingPeriodCatalog=Array.isArray(cache.periodCatalog)?cache.periodCatalog:[];updateBookButton();updateRatingPeriodControls();renderRating();return true;}
  ratingData=null;updateBookButton();updateRatingPeriodControls();renderRating();return false;
}
async function checkRatingInBackground(force){
  if(!selectedBook){selectedBook=readJson(ratingBookKey(),null);ratingPeriod=selectedBook?loadStoredRatingPeriod(selectedBook):normalizeRatingPeriod({});}
  if(!selectedBook||ratingBackgroundBusy||ratingBusy)return;if(ratingPeriod.year&&!ratingPeriod.semester)return;
  let now=Date.now();if(!force&&now-ratingLastBackgroundAt<RATING_BACKGROUND_INTERVAL)return;
  let requestGroup=String(ratingGroup.id||''),requestBookUrl=String(selectedBook.url||''),requestPeriod=normalizeRatingPeriod(ratingPeriod),requestKey=ratingCacheKey(selectedBook,requestPeriod),oldData=readJson(requestKey,null);if(oldData)ratingRepairControlPointDuplicatesInData(oldData);
  ratingBackgroundBusy=true;ratingLastBackgroundAt=now;try{localStorage.setItem(K_RATING_BG_LAST,String(now));}catch(e){}
  try{
    let data=await fetchRatingData(selectedBook);if(requestGroup!==String(ratingGroup.id||'')||requestBookUrl!==String(selectedBook&&selectedBook.url||''))return;let current=normalizeRatingPeriod(ratingPeriod);if(String(current.year||'')!==String(requestPeriod.year||'')||String(current.semester||'')!==String(requestPeriod.semester||''))return;
    let actualPeriod=sanitizeRatingPeriod(data.period||requestPeriod),finalKey=ratingCacheKey(selectedBook,actualPeriod),baseline=readJson(finalKey,null)||oldData;if(baseline)ratingRepairControlPointDuplicatesInData(baseline);ratingSeedDetailPointsFromCache(data,baseline);ratingRepairControlPointDuplicatesInData(data);
    let notifyScope=ratingNotificationScope(selectedBook),scopeChanged=localStorage.getItem(K_NOTIFY_RATING_SCOPE)!==notifyScope;localStorage.setItem(K_NOTIFY_RATING_SCOPE,notifyScope);let detailSubjects=ratingDetailSubjectsToRefresh(data,baseline,!!force);data.detailsPending=detailSubjects.length>0;writeJson(finalKey,data);
    if(section==='rating'&&ratingContextMatches({groupId:requestGroup,bookUrl:requestBookUrl,period:actualPeriod})){ratingData=data;ratingPeriod=actualPeriod;ratingPeriodOptions=sanitizeRatingPeriodOptions(data.periodOptions||ratingPeriodOptions);ratingPeriodCatalog=Array.isArray(data.periodCatalog)?data.periodCatalog:[];saveRatingPeriod();renderRating();}
    if(!detailSubjects.length){if(!scopeChanged){let changed=ratingScoreChanges(baseline,data);if(changed.length&&ratingContextMatches({groupId:requestGroup,bookUrl:requestBookUrl,period:actualPeriod}))addRatingChangeNotifications(changed,data);}return;}
    let ctx={groupId:requestGroup,bookUrl:requestBookUrl,period:actualPeriod,cacheKey:finalKey,scopeChanged:scopeChanged};ratingRefreshControlPointsProgressively(data,ctx,baseline,detailSubjects);
  }catch(e){}finally{ratingBackgroundBusy=false;}
}

function startRatingBackgroundChecks(){
  setTimeout(function(){if(!document.hidden)checkRatingInBackground(false);},1600);
  if(ratingBackgroundTimer)clearInterval(ratingBackgroundTimer);ratingBackgroundTimer=setInterval(function(){if(!document.hidden)checkRatingInBackground(false);},RATING_BACKGROUND_INTERVAL);
  document.addEventListener('visibilitychange',function(){if(!document.hidden){if(section==='rating')ratingHydrateStoredState();checkRatingInBackground(false);}});
}
async function loadRatingBooks(){
  let hadCache=ratingHydrateStoredState();
  if(!selectedBook){dismissSplash();return;}
  if(hadCache){let suffix=[ratingPeriod.yearLabel,ratingPeriod.semesterLabel].filter(Boolean).join(' · ');setStatus('Сохранённый рейтинг'+(suffix?' · '+suffix:''));dismissSplash();setTimeout(function(){checkRatingInBackground(false);},250);return;}
  loadRating();
}

function mergeGroupLists(){
  let out=[],seen=new Set();
  Array.from(arguments).forEach(function(list){(list||[]).forEach(function(g){if(!g||!g.id||!g.name)return;let key=g.id+'|'+g.name;if(seen.has(key))return;seen.add(key);out.push({id:String(g.id),name:String(g.name)});});});
  out.sort(naturalGroupSort);return out;
}
async function fetchAllGroups(){
  let scheduleGroups=[],ratingGroups=[],errors=[];
  try{ratingGroups=await fetchRatingGroups();}catch(e){errors.push(e);}
  try{scheduleGroups=await fetchGroups();}catch(e){errors.push(e);}
  let groups=mergeGroupLists(ratingGroups,scheduleGroups);
  if(!groups.length)throw (errors[0]||new Error('Список групп на портале не найден'));
  let payload={checkedAt:new Date().toISOString(),groups:groups};
  writeJson(K_GROUPS_CACHE,payload);writeJson(K_RATING_GROUPS,payload);
  return groups;
}
async function openRatingGroups(){
  openModal('Выберите группу','<div class="groupPicker"><input id="groupSearch" class="groupSearch" type="search" placeholder="Поиск по названию группы"><div id="groupCount" class="hint">Загрузка списка...</div><div id="groupList"><div class="loadingSmall">Получаем группы с портала...</div></div></div>');
  let a=readJson(K_RATING_GROUPS,null),b=readJson(K_GROUPS_CACHE,null),groups=mergeGroupLists(a&&a.groups?a.groups:[],b&&b.groups?b.groups:[]);
  if(groups.length){document.getElementById('groupCount').textContent='Групп: '+groups.length;document.getElementById('groupList').innerHTML=groupListHtml(groups,'',ratingGroup);bindGroupItems(groups,selectRatingGroup,ratingGroup);}
  try{groups=await fetchAllGroups();let c=document.getElementById('groupCount'),l=document.getElementById('groupList');if(!c||!l)return;c.textContent='Групп: '+groups.length;l.innerHTML=groupListHtml(groups,'',ratingGroup);bindGroupItems(groups,selectRatingGroup,ratingGroup);}catch(err){if(!groups.length){let l=document.getElementById('groupList');if(l)l.innerHTML='<div class="emptySmall">Не удалось получить список групп.<br><span class="muted">'+esc(err.message||'Проверьте интернет')+'</span></div>';}}
}
function groupListHtml(groups,query,currentGroup){
  currentGroup=currentGroup||selectedGroup;
  let q=String(query||'').trim().toLocaleLowerCase('ru-RU');
  let list=groups.filter(g=>!q||g.name.toLocaleLowerCase('ru-RU').includes(q));
  if(!list.length)return '<div class="emptySmall">Группы не найдены</div>';
  let sections={},order=[];
  list.forEach(function(g){let y=(/^\d{2}/.exec(g.name)||['Другие'])[0];if(!sections[y]){sections[y]=[];order.push(y);}sections[y].push(g);});
  return order.map(function(y){let title=/^\d{2}$/.test(y)?'Набор 20'+y:y;return '<section class="groupSection"><div class="groupSectionTitle">'+esc(title)+'</div>'+sections[y].map(function(g){let current=g.id===currentGroup.id;return '<button class="groupItem'+(current?' current':'')+'" data-group-id="'+esc(g.id)+'" data-group-name="'+esc(g.name)+'"><span>'+esc(g.name)+'</span><span class="groupMark">'+(current?'✓':'›')+'</span></button>';}).join('')+'</section>';}).join('');
}
function bindGroupItems(groups,onSelect,currentGroup){
  onSelect=onSelect||selectGroup;currentGroup=currentGroup||selectedGroup;
  document.querySelectorAll('.groupItem').forEach(function(b){b.onclick=function(){onSelect(this.dataset.groupId,this.dataset.groupName);};});
  let search=document.getElementById('groupSearch'),box=document.getElementById('groupList');
  if(search&&box)search.oninput=function(){box.innerHTML=groupListHtml(groups,this.value,currentGroup);bindGroupItems(groups,onSelect,currentGroup);let n=document.getElementById('groupCount');if(n)n.textContent='Групп: '+groups.filter(g=>!this.value.trim()||g.name.toLocaleLowerCase('ru-RU').includes(this.value.trim().toLocaleLowerCase('ru-RU'))).length;};
}
async function openGroups(){
  openModal('Выберите группу','<div class="groupPicker"><input id="groupSearch" class="groupSearch" type="search" placeholder="Поиск по названию группы"><div id="groupCount" class="hint">Загрузка списка...</div><div id="groupList"><div class="loadingSmall">Получаем группы с портала...</div></div></div>');
  let a=readJson(K_GROUPS_CACHE,null),b=readJson(K_RATING_GROUPS,null),groups=mergeGroupLists(a&&a.groups?a.groups:[],b&&b.groups?b.groups:[]);
  if(groups.length){document.getElementById('groupCount').textContent='Групп: '+groups.length;document.getElementById('groupList').innerHTML=groupListHtml(groups,'',selectedGroup);bindGroupItems(groups,selectGroup,selectedGroup);}
  try{groups=await fetchAllGroups();let c=document.getElementById('groupCount'),l=document.getElementById('groupList');if(!c||!l)return;c.textContent='Групп: '+groups.length;l.innerHTML=groupListHtml(groups,'',selectedGroup);bindGroupItems(groups,selectGroup,selectedGroup);}catch(err){if(!groups.length){let l=document.getElementById('groupList');if(l)l.innerHTML='<div class="emptySmall">Не удалось получить список групп.<br><span class="muted">'+esc(err&&err.message?err.message:'Проверьте интернет')+'</span></div>';}}
}
function updateGroupButton(){let el=document.getElementById('groupName');if(el)el.textContent=section==='rating'?ratingGroupLabel():groupLabel();}
function selectGroup(id,name){
  if(!id||!name)return;
  let scheduleChanged=id!==selectedGroup.id,ratingChanged=id!==ratingGroup.id;
  selectedGroup={id:id,name:name};writeJson(K_SELECTED_GROUP,selectedGroup);
  ratingGroup={id:id,name:name};writeJson(K_RATING_SELECTED_GROUP,ratingGroup);
  selectedBook=readJson(ratingBookKey(),null);ratingBooks=[];ratingData=null;
  updateGroupButton();closeModal();
  if(!scheduleChanged){if(ratingChanged)updateBookButton();return;}
  calendarEvents=[];calendarRange=null;allEvents=[];lastRange=null;mode='day';selectedDate=today();weekDate=startOfWeek(selectedDate);
  document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.mode==='day'));document.querySelector('.navrow').classList.remove('hidden');
  let cache=readGroupJson(K_CACHE_BASE,null);
  if(cache&&cache.events){allEvents=cache.events;lastRange={start:cache.start,end:cache.end};setStatus('Показана сохранённая версия группы '+groupLabel());render();}
  else{let c=document.getElementById('content');if(c)c.innerHTML='<div class="loading">Загрузка расписания группы '+esc(groupLabel())+'...</div>';setStatus('Загрузка группы '+groupLabel()+'...');}
  updateBanner();loadMain(false);
}
function selectRatingGroup(id,name){
  if(!id||!name)return;
  let changed=id!==ratingGroup.id;
  ratingGroup={id:id,name:name};writeJson(K_RATING_SELECTED_GROUP,ratingGroup);updateGroupButton();closeModal();
  if(!changed)return;
  selectedBook=readJson(ratingBookKey(),null);ratingBooks=[];ratingData=null;updateBookButton();renderRating();setStatus('Загрузка группы '+ratingGroupLabel()+'...');loadRatingBooks();
}


function sdoExternalUrl(path){
  try{return new URL(path||'/',(sdoData&&sdoData.siteUrl)||'https://online.mguu.ru/').href;}catch(e){return 'https://online.mguu.ru/';}
}
async function sdoApi(url,options){
  let target=/^https?:/i.test(String(url||''))?String(url):localBackendUrl(String(url||'').replace(/^\/+/,''));
  let response=await fetch(target,Object.assign({credentials:'same-origin',cache:'no-store',headers:{'accept':'application/json'}},options||{}));
  let data=null;try{data=await response.json();}catch(e){}
  if(!response.ok||!data||data.ok===false){let err=new Error(data&&data.error?data.error:'Ошибка соединения с СДО');err.status=response.status;err.code=data&&data.code||'';throw err;}
  return data;
}
function sdoDate(value,withTime){
  let n=Number(value)||0;if(!n)return 'Срок не указан';
  try{return new Date(n*1000).toLocaleString('ru-RU',withTime?{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}:{day:'2-digit',month:'long',year:'numeric'});}catch(e){return '';}
}
function sdoLoginHtml(message){
  return '<div class="sdoLoginWrap"><div class="sdoLoginCard"><div class="sdoSeal"><img src="./emblem.png" alt="МГУУ"></div><h2>Вход в СДО</h2><p>Используйте логин и пароль от официальной системы дистанционного обучения МГУУ.</p>'+(message?'<div class="sdoError">'+esc(message)+'</div>':'')+'<form id="sdoLoginForm" class="sdoLoginForm"><label>Логин<input id="sdoLoginName" name="username" autocomplete="username" autocapitalize="none" spellcheck="false" required></label><label>Пароль<div class="sdoPassword"><input id="sdoLoginPassword" name="password" type="password" autocomplete="current-password" required><button id="sdoPasswordToggle" type="button" aria-label="Показать пароль">○</button></div></label><button id="sdoLoginButton" class="primary" type="submit">Войти</button></form><div class="sdoPrivacy"><b>Безопасность</b>Пароль передаётся только для получения токена Moodle и не сохраняется. Токен хранится в зашифрованной HttpOnly-сессии.</div><button id="sdoOpenOfficial" class="secondary sdoOfficial" type="button">Открыть официальный сайт СДО</button></div></div>';
}
function bindSdoLogin(){
  let form=document.getElementById('sdoLoginForm');if(form)form.onsubmit=loginSdo;
  let toggle=document.getElementById('sdoPasswordToggle');if(toggle)toggle.onclick=function(){let input=document.getElementById('sdoLoginPassword');if(!input)return;input.type=input.type==='password'?'text':'password';this.textContent=input.type==='password'?'○':'●';};
  let open=document.getElementById('sdoOpenOfficial');if(open)open.onclick=function(){window.open('https://online.mguu.ru/','_blank','noopener');};
}
function renderSdoLogin(message){let content=document.getElementById('sdoContent');if(!content)return;content.innerHTML=sdoLoginHtml(message);bindSdoLogin();}
function sdoUpcomingItems(data){
  let now=Math.floor(Date.now()/1000)-12*60*60,items=[];
  (data.assignments||[]).forEach(function(a){if(!a.dueDate||a.dueDate>=now)items.push({kind:'Задание',name:a.name,course:a.courseName,time:a.dueDate,url:a.url});});
  (data.calendarEvents||[]).forEach(function(e){if(e.timeStart>=now)items.push({kind:e.moduleName==='assign'?'Задание':'Событие',name:e.name,course:'',time:e.timeStart,url:e.url});});
  let seen=new Set();return items.sort(function(a,b){return (a.time||9e15)-(b.time||9e15);}).filter(function(x){let k=[x.name,x.course,x.time].join('|');if(seen.has(k))return false;seen.add(k);return true;}).slice(0,12);
}
function sdoSnapshot(data){
  return {assignments:(data.assignments||[]).map(function(a){return {id:String(a.id||a.cmid||a.name),name:a.name,course:a.courseName,due:Number(a.dueDate)||0};}),grades:(data.grades||[]).map(function(g){return {id:String(g.courseId||g.courseName),course:g.courseName,grade:String(g.grade||'')};})};
}
function notifySdoChanges(data){
  let next=sdoSnapshot(data),old=readJson(K_SDO_SNAPSHOT,null);writeJson(K_SDO_SNAPSHOT,next);if(!old)return;
  let oldA=new Map((old.assignments||[]).map(function(x){return [x.id,x];}));
  next.assignments.forEach(function(a){if(!oldA.has(a.id))addAppNotification('sdo','Новое задание',a.course+' · '+a.name+(a.due?' · до '+sdoDate(a.due,true):''),{section:'assignments',itemId:a.id});});
  let oldG=new Map((old.grades||[]).map(function(x){return [x.id,x.grade];}));
  next.grades.forEach(function(g){if(oldG.has(g.id)&&oldG.get(g.id)!==g.grade)addAppNotification('sdo','Изменилась оценка',g.course+' · '+oldG.get(g.id)+' → '+g.grade,{section:'grades',courseId:g.id});});
}
function renderSdoDashboard(data){
  let content=document.getElementById('sdoContent');if(!content)return;
  let upcoming=sdoUpcomingItems(data),courses=data.courses||[],grades=data.grades||[],partial=data.partial||{};
  let warning=(partial.assignments||partial.calendar||partial.grades)?'<div class="sdoWarning">Часть данных СДО недоступна через мобильный API. Курсы и доступные сведения всё равно показаны.</div>':'';
  let upcomingHtml=upcoming.length?upcoming.map(function(x){return '<button class="sdoDeadline" data-sdo-url="'+esc(x.url||'')+'"><span class="sdoDeadlineDate">'+esc(x.time?sdoDate(x.time,true):'Без срока')+'</span><b>'+esc(x.name)+'</b><span>'+esc(x.course||x.kind)+'</span></button>';}).join(''):'<div class="sdoEmpty">Ближайших заданий и событий нет</div>';
  let coursesHtml=courses.length?courses.map(function(c){let progress=Number.isFinite(c.progress)?'<span class="sdoProgress"><i style="width:'+Math.max(0,Math.min(100,c.progress))+'%"></i></span><small>'+Math.round(c.progress)+'% выполнено</small>':'';return '<button class="sdoCourseCard" data-sdo-course="'+c.id+'"><div class="sdoCourseIcon">▤</div><div><b>'+esc(c.fullName)+'</b>'+(c.shortName?'<span>'+esc(c.shortName)+'</span>':'')+progress+'</div><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></button>';}).join(''):'<div class="sdoEmpty">Доступных курсов пока нет</div>';
  let gradesHtml=grades.length?grades.map(function(g){return '<button class="sdoGradeCard" data-sdo-url="'+esc(g.url||'')+'"><span>'+esc(g.courseName)+'</span><b>'+esc(g.grade||'—')+'</b></button>';}).join(''):'<div class="sdoEmpty">Общая ведомость оценок недоступна или пока пуста</div>';
  content.innerHTML='<div class="sdoDashboard"><section class="sdoProfile"><div class="sdoAvatar">'+esc((data.user&&data.user.fullName||'С').trim().slice(0,1).toUpperCase())+'</div><div><span>СДО МГУУ</span><b>'+esc(data.user&&data.user.fullName||'Студент')+'</b><small>Обновлено '+esc(new Date(data.updatedAt||Date.now()).toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'}))+'</small></div><button id="sdoLogout" class="sdoLogout">Выйти</button></section>'+warning+'<section class="sdoBlock"><div class="sdoBlockTitle"><h2>Ближайшее</h2><span>'+upcoming.length+'</span></div><div class="sdoDeadlineList">'+upcomingHtml+'</div></section><section class="sdoBlock"><div class="sdoBlockTitle"><h2>Мои курсы</h2><span>'+courses.length+'</span></div><div class="sdoCourseList">'+coursesHtml+'</div></section><section class="sdoBlock"><div class="sdoBlockTitle"><h2>Оценки</h2><span>'+grades.length+'</span></div><div class="sdoGradeList">'+gradesHtml+'</div></section><button id="sdoOfficialDashboard" class="secondary sdoOfficial" type="button">Открыть официальный сайт СДО</button></div>';
  document.querySelectorAll('[data-sdo-url]').forEach(function(b){b.onclick=function(){if(this.dataset.sdoUrl)window.open(this.dataset.sdoUrl,'_blank','noopener');};});
  document.querySelectorAll('[data-sdo-course]').forEach(function(b){b.onclick=function(){openSdoCourse(Number(this.dataset.sdoCourse),this.querySelector('b')?this.querySelector('b').textContent:'Курс');};});
  let logout=document.getElementById('sdoLogout');if(logout)logout.onclick=logoutSdo;
  let official=document.getElementById('sdoOfficialDashboard');if(official)official.onclick=function(){window.open(data.siteUrl||'https://online.mguu.ru/','_blank','noopener');};
}
function renderSdoLoading(text){let content=document.getElementById('sdoContent');if(content)content.innerHTML='<div class="sdoLoading"><div class="sdoSpinner"></div><b>'+esc(text||'Загрузка СДО...')+'</b></div>';}
async function loginSdo(event){
  event.preventDefault();if(sdoBusy)return;
  let username=document.getElementById('sdoLoginName'),password=document.getElementById('sdoLoginPassword'),button=document.getElementById('sdoLoginButton');if(!username||!password)return;
  sdoBusy=true;if(button){button.disabled=true;button.textContent='Вход...';}setStatus('Вход в СДО...');
  try{let result=await sdoApi('/api/sdo/login',{method:'POST',headers:{'content-type':'application/json','accept':'application/json'},body:JSON.stringify({username:username.value.trim(),password:password.value})});password.value='';sdoAuthenticated=true;sdoUser=result.user||null;setStatus('Вход выполнен');await loadSdo(true);}
  catch(err){password.value='';sdoAuthenticated=false;renderSdoLogin(err.message||'Не удалось войти');setStatus('Не удалось войти в СДО');}
  finally{sdoBusy=false;}
}
async function logoutSdo(){
  if(sdoBusy)return;sdoBusy=true;setStatus('Выход из СДО...');
  try{await sdoApi('/api/sdo/logout',{method:'POST',headers:{'content-type':'application/json'},body:'{}'});}catch(e){}
  sdoAuthenticated=false;sdoData=null;sdoUser=null;renderSdoLogin('Вы вышли из СДО');setStatus('Выход выполнен');sdoBusy=false;
}
async function loadSdo(force){
  if(sdoBusy&&!force)return;
  let content=document.getElementById('sdoContent');if(!content)return;
  sdoBusy=true;renderSdoLoading(sdoAuthenticated===null?'Проверяем вход...':'Загружаем курсы...');setBusy(true);setStatus('Загрузка СДО...');
  try{
    if(sdoAuthenticated===null){let status=await sdoApi('/api/sdo/status');sdoAuthenticated=!!status.authenticated;sdoUser=status.user||null;}
    if(!sdoAuthenticated){renderSdoLogin();setStatus('Войдите в СДО');return;}
    let result=await sdoApi('/api/sdo/dashboard');sdoData=result.data;sdoAuthenticated=true;sdoUser=sdoData.user||sdoUser;notifySdoChanges(sdoData);renderSdoDashboard(sdoData);setStatus('СДО обновлена');
  }catch(err){
    if(err.status===401){sdoAuthenticated=false;sdoData=null;renderSdoLogin('Сеанс закончился. Войдите снова.');}
    else if(sdoData){renderSdoDashboard(sdoData);setStatus('СДО не обновилась — показаны последние данные');}
    else renderSdoLogin(err.message||'Не удалось загрузить СДО');
  }finally{sdoBusy=false;setBusy(false);}
}
async function openSdoCourse(courseId,title){
  if(!courseId)return;openModal(title||'Курс','<div class="sdoLoading modalSdoLoading"><div class="sdoSpinner"></div><b>Загрузка курса...</b></div>');
  try{
    let result=await sdoApi('/api/sdo/course?courseid='+encodeURIComponent(courseId)),data=result.data,sections=data.sections||[],grades=data.gradeItems||[];
    let sectionsHtml=sections.length?sections.map(function(sec){return '<div class="sdoCourseSection"><h3>'+esc(sec.name||'Раздел')+'</h3>'+(sec.summary?'<p>'+esc(sec.summary)+'</p>':'')+(sec.modules||[]).map(function(m){return '<button data-sdo-url="'+esc(m.url||'')+'"><span><b>'+esc(m.name)+'</b><small>'+esc(m.moduleName||'Материал')+'</small></span><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></button>';}).join('')+'</div>';}).join(''):'<div class="sdoEmpty">Материалы курса недоступны через мобильный API</div>';
    let gradesHtml=grades.length?'<div class="sdoCourseSection"><h3>Оценки курса</h3>'+grades.map(function(g){return '<div class="sdoCourseGrade"><span>'+esc(g.name)+'</span><b>'+esc(g.grade||'—')+(g.percentage?' · '+esc(g.percentage):'')+'</b></div>';}).join('')+'</div>':'';
    document.getElementById('modalBody').innerHTML='<div class="sdoCourseModal">'+sectionsHtml+gradesHtml+'<button id="sdoCourseOfficial" class="primary">Открыть курс в СДО</button></div>';
    document.querySelectorAll('#modalBody [data-sdo-url]').forEach(function(b){b.onclick=function(){window.open(this.dataset.sdoUrl,'_blank','noopener');};});
    let official=document.getElementById('sdoCourseOfficial');if(official)official.onclick=function(){window.open(data.url||sdoExternalUrl('/course/view.php?id='+courseId),'_blank','noopener');};
  }catch(err){let body=document.getElementById('modalBody');if(body)body.innerHTML='<div class="empty"><div class="emptyTitle">Курс не загрузился</div><div class="muted">'+esc(err.message||'Проверьте интернет')+'</div><button id="sdoCourseFallback" class="primary">Открыть на сайте СДО</button></div>';let fallback=document.getElementById('sdoCourseFallback');if(fallback)fallback.onclick=function(){window.open(sdoExternalUrl('/course/view.php?id='+courseId),'_blank','noopener');};}
}
function openSdoNotification(){section='sdo';localStorage.setItem(K_SECTION,section);closeNotificationsPanel();applySection();loadSdo(false);}

function installShell(){
  const ua=navigator.userAgent||'';
  const androidMatch=/Android\s+(\d+)/i.exec(ua);
  const androidMajor=androidMatch?parseInt(androidMatch[1],10):0;
  document.documentElement.classList.toggle('samsung-fold',/\bSM-F[A-Z0-9-]+/i.test(ua));
  document.documentElement.classList.toggle('android-edge',androidMajor>=15);
  document.title='МГУУ';
  document.head.innerHTML='<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#f7f8fc"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="default"><meta name="apple-mobile-web-app-title" content="МГУУ"><link rel="manifest" href="./manifest.webmanifest"><link rel="apple-touch-icon" href="./icon-180.png"><style>'+CSS+'</style>';
  document.body.innerHTML=`
  <div id="app" data-theme="${theme}">
    <div id="splashScreen" class="splashScreen"><div class="splashInner"><img src="${SPLASH_LOGO}" alt="Эмблема МГУУ"><div class="splashName">МГУУ</div><div class="splashDots"><i></i><i></i><i></i></div></div></div>
    <div id="drawerShade" class="drawerShade"></div>
    <aside id="drawer" class="drawer" aria-label="Разделы приложения">
      <div class="drawerTop"><div class="drawerBrand">МГУУ</div><button id="drawerClose" class="close" aria-label="Закрыть меню"><svg class="btnSvg closeSvg" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>
      <nav class="drawerNav"><button class="drawerItem" data-section="schedule"><span class="drawerIcon">▦</span><span>Расписание занятий</span></button><button class="drawerItem" data-section="rating"><span class="drawerIcon">★</span><span>Рейтинг</span></button><button class="drawerItem" data-section="sdo"><span class="drawerIcon">◉</span><span>СДО</span></button></nav>
      <div class="drawerBottom"><button id="notificationBell" class="bellButton" aria-label="Уведомления"><svg class="btnSvg bellSvg" viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg><span id="notificationBadge" class="notificationBadge hidden">0</span></button></div>
    </aside>
    <header class="top"><div class="heading"><div id="mainTitle" class="title">Расписание занятий</div><button id="groupSelect" class="groupButton" title="Выбрать учебную группу"><span id="groupName">${esc(groupLabel())}</span><svg class="groupChevron" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5"/></svg></button></div><div class="topBtns"><button id="refresh" class="icon" title="Обновить"><svg class="btnSvg refreshSvg" viewBox="0 0 24 24"><path d="M20 5v5h-5"/><path d="M19.2 10A7.5 7.5 0 1 0 20 15"/></svg></button><button id="palette" class="icon" title="Цвета"><svg class="btnSvg paletteSvg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path class="paletteFill" d="M12 4a8 8 0 0 0 0 16Z"/></svg></button><button id="theme" class="icon" title="Тема"><svg class="btnSvg themeMoon" viewBox="0 0 24 24"><path d="M20 15.2A8 8 0 0 1 8.8 4 8.3 8.3 0 1 0 20 15.2Z"/></svg><svg class="btnSvg themeSun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></button></div></header>
    <div id="scheduleView">
      <nav class="tabs"><button data-mode="day" class="active">День</button><button data-mode="week">Неделя</button><button data-mode="calendar">Календарь</button></nav>
      <div id="changeBanner" class="changeBanner hidden"></div>
      <section class="navrow"><button id="prev" class="navbtn"><svg class="btnSvg navSvg" viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></svg></button><div id="periodTitle" class="periodTitle"></div><button id="next" class="navbtn"><svg class="btnSvg navSvg" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></button></section>
      <main id="content"><div class="loading">Загрузка расписания...</div></main>
    </div>
    <div id="ratingView" class="hidden">
      <section class="ratingControls">
        <button id="bookSelect" class="bookSelect"><span id="bookName">Выберите зачётную книжку</span><svg class="groupChevron" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5"/></svg></button>
        <div class="ratingPeriodControls">
          <button id="ratingYear" class="ratingPeriodButton" type="button"><strong id="ratingYearValue">Учебный год</strong><svg class="groupChevron" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5"/></svg></button>
          <button id="ratingSemester" class="ratingPeriodButton" type="button"><strong id="ratingSemesterValue">Семестр</strong><svg class="groupChevron" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5"/></svg></button>
        </div>
      </section>
      <main id="ratingContent"><div class="loading">Загрузка рейтинга...</div></main>
    </div>
    <div id="sdoView" class="hidden"><main id="sdoContent"><div class="sdoLoading"><div class="sdoSpinner"></div><b>Загрузка СДО...</b></div></main></div>
    <footer><span id="status">${esc(lastStatus)}</span><span>v${APP_VERSION}</span></footer>
    <div id="modal" class="modal hidden"><div class="modalBox"><div class="modalHead"><b id="modalTitle"></b><button id="modalClose" class="close"><svg class="btnSvg closeSvg" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div><div id="modalBody"></div></div></div>
    <section id="notificationPanel" class="notificationPanel hidden" aria-label="Уведомления"><header class="notificationHead"><button id="notificationClose" class="close"><svg class="btnSvg closeSvg" viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></svg></button><h2>Уведомления</h2><button id="notificationSettings" class="close" aria-label="Настройки уведомлений"><svg class="btnSvg settingsSvg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6V3h4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg></button></header><div class="notificationPermission"><button id="notificationEnable" class="primary">Разрешить системные уведомления</button><button id="notificationDeviceSettings" class="secondary">Настройки устройства</button></div><div id="notificationList" class="notificationList"></div><div class="notificationFooter"><button id="notificationClear" class="secondary">Очистить историю</button></div></section>
    <div id="pwaInstallHint" class="pwaInstallHint hidden"><div><b>Установите МГУУ на iPhone</b>В Safari: «Поделиться» → «На экран Домой» → «Открывать как веб-приложение».</div><button id="pwaHintClose" type="button">Понятно</button></div>
  </div>`;
  bindUi();
  setupPwaInstallHint();bindDrawerGestures();applyTheme();applySection();updateNotificationBadge();
}

function isStandalonePwa(){return !!(window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches)||window.navigator.standalone===true;}
function setupPwaInstallHint(){
  let el=document.getElementById('pwaInstallHint'),close=document.getElementById('pwaHintClose');if(!el)return;
  let dismissed=localStorage.getItem('mguu_pwa_install_hint_dismissed')==='1';
  if(!isStandalonePwa()&&!dismissed)setTimeout(function(){el.classList.remove('hidden');},1200);
  if(close)close.onclick=function(){el.classList.add('hidden');localStorage.setItem('mguu_pwa_install_hint_dismissed','1');};
}
function handlePwaNotificationLink(){
  try{
    let u=new URL(window.location.href),id=u.searchParams.get('notification');if(!id)return;
    setTimeout(function(){openNotificationTarget(id);u.searchParams.delete('notification');history.replaceState({},'',u.pathname+(u.search||'')+(u.hash||''));},1100);
  }catch(e){}
}
function bindUi(){
  document.querySelectorAll('.tabs button').forEach(b=>b.onclick=function(){let m=b.dataset.mode;if(m==='calendar'){openPeriodPicker();return;}setMode(m);});
  document.getElementById('prev').onclick=()=>movePeriod(-1);
  document.getElementById('next').onclick=()=>movePeriod(1);
  document.getElementById('refresh').onclick=()=>section==='rating'?loadRating(true):(section==='sdo'?loadSdo(false):loadMain(false));
  document.getElementById('groupSelect').onclick=()=>section==='rating'?openRatingGroups():openGroups();
  document.getElementById('bookSelect').onclick=openRatingBooks;
  document.getElementById('ratingYear').onclick=function(){openRatingPeriodPicker('year');};
  document.getElementById('ratingSemester').onclick=function(){openRatingPeriodPicker('semester');};
  document.getElementById('palette').onclick=openColors;
  document.getElementById('theme').onclick=toggleTheme;
  document.getElementById('modalClose').onclick=closeModal;
  document.getElementById('modal').onclick=function(e){if(e.target===this)closeModal();};
  document.getElementById('drawerClose').onclick=closeDrawer;
  document.getElementById('drawerShade').onclick=closeDrawer;
  document.querySelectorAll('.drawerItem').forEach(b=>b.onclick=function(){setSection(this.dataset.section);});
  document.getElementById('notificationBell').onclick=openNotificationsPanel;
  document.getElementById('notificationClose').onclick=closeNotificationsPanel;
  document.getElementById('notificationEnable').onclick=function(){nativeNotificationAction('request',{});};
  document.getElementById('notificationSettings').onclick=function(){nativeNotificationAction('settings',{});};
  document.getElementById('notificationDeviceSettings').onclick=function(){nativeNotificationAction('settings',{});};
  document.getElementById('notificationClear').onclick=clearNotifications;
}
function openDrawer(){document.getElementById('app').classList.add('drawerOpen');}
function closeDrawer(){document.getElementById('app').classList.remove('drawerOpen');}
function bindDrawerGestures(){
  let sx=0,sy=0,tracking=false,opened=false;
  document.addEventListener('touchstart',function(e){if(!e.touches||!e.touches.length)return;let t=e.touches[0];opened=document.getElementById('app').classList.contains('drawerOpen');if(t.clientX<=28||opened){sx=t.clientX;sy=t.clientY;tracking=true;}},{passive:true});
  document.addEventListener('touchend',function(e){if(!tracking)return;tracking=false;let t=e.changedTouches&&e.changedTouches[0];if(!t)return;let dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)<50||Math.abs(dx)<Math.abs(dy)*1.2)return;if(dx>0&&!opened)openDrawer();if(dx<0&&opened)closeDrawer();},{passive:true});
}
function setSection(next){
  if(next!=='schedule'&&next!=='rating'&&next!=='sdo')return;section=next;localStorage.setItem(K_SECTION,section);closeDrawer();applySection();
  if(section==='rating'){loadRatingBooks();return;}
  if(section==='sdo'){loadSdo(false);return;}
  calendarEvents=[];calendarRange=null;lastRange=null;mode='day';selectedDate=today();weekDate=startOfWeek(selectedDate);
  document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.mode==='day'));let nav=document.querySelector('.navrow');if(nav)nav.classList.remove('hidden');
  let cache=readGroupJson(K_CACHE_BASE,null);allEvents=cache&&cache.events?cache.events:[];render();setStatus(allEvents.length?'Показана сохранённая версия группы '+groupLabel():'Загрузка расписания группы '+groupLabel()+'...');loadMain(false);
}
function applySection(){
  let schedule=document.getElementById('scheduleView'),rating=document.getElementById('ratingView'),sdo=document.getElementById('sdoView'),palette=document.getElementById('palette'),title=document.getElementById('mainTitle'),groupSelect=document.getElementById('groupSelect');
  if(!schedule||!rating||!sdo)return;
  let isRating=section==='rating',isSdo=section==='sdo';
  schedule.classList.toggle('hidden',isRating||isSdo);rating.classList.toggle('hidden',!isRating);sdo.classList.toggle('hidden',!isSdo);palette.classList.toggle('hidden',isRating||isSdo);groupSelect.classList.toggle('hidden',isSdo);title.textContent=isSdo?'СДО':(isRating?'Рейтинг студентов':'Расписание занятий');
  document.querySelectorAll('.drawerItem').forEach(b=>b.classList.toggle('active',b.dataset.section===section));updateGroupButton();updateBookButton();if(isRating)updateRatingPeriodControls();
}
function setMode(m){mode=m;document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.mode===m));document.querySelector('.navrow').classList.toggle('hidden',m==='calendar');render();}
function movePeriod(dir){if(mode==='day')selectedDate=addDays(selectedDate,dir);else if(mode==='week')weekDate=addDays(weekDate,dir*7);render();}
function toggleTheme(){theme=theme==='dark'?'light':'dark';localStorage.setItem(K_THEME,theme);applyTheme();render();}
function applyTheme(){let a=document.getElementById('app');if(a)a.dataset.theme=theme;let meta=document.querySelector('meta[name=theme-color]');if(meta)meta.content=theme==='dark'?'#111318':'#f7f8fc';try{if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.theme)window.webkit.messageHandlers.theme.postMessage(theme);}catch(e){}}
function setStatus(s){lastStatus=s;let el=document.getElementById('status');if(el)el.textContent=s;}
function setBusy(v){busy=v;let b=document.getElementById('refresh');if(b){b.disabled=v;b.classList.toggle('spin',v);}}

async function loadMain(initial){
  if(busy){reloadAfterBusy=true;return;}
  let requested={id:selectedGroup.id,name:selectedGroup.name};
  setBusy(true);setStatus('Проверяем портал...');
  let start=addDays(today(),-7),end=addDays(today(),120),s=iso(start),e=iso(end);
  try{
    let events=await fetchRange(start,end,requested);
    if(requested.id!==selectedGroup.id)return;
    let nextS={start:s,end:e,checkedAt:new Date().toISOString(),events:events};
    let notifyScope=scheduleNotificationScope(requested);
    let scopeChanged=localStorage.getItem(K_NOTIFY_SCHEDULE_SCOPE)!==notifyScope;
    localStorage.setItem(K_NOTIFY_SCHEDULE_SCOPE,notifyScope);
    let oldS=readGroupJson(K_SNAPSHOT_BASE,null);
    let changes=compareSnapshots(oldS,nextS);
    writeGroupJson(K_SNAPSHOT_BASE,nextS);writeGroupJson(K_CACHE_BASE,nextS);
    if(changes.length&&!scopeChanged){writeGroupJson(K_CHANGES_BASE,changes);addScheduleChangeNotifications(changes);}else if(initial&&!scopeChanged&&readGroupJson(K_CHANGES_BASE,null)){}else writeGroupJson(K_CHANGES_BASE,[]);
    allEvents=events;lastRange={start:s,end:e};
    setStatus('Обновлено '+new Date().toLocaleString('ru-RU',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})+' · занятий '+events.length);
    updateBanner();render();
  }catch(err){
    if(requested.id!==selectedGroup.id)return;
    let cache=readGroupJson(K_CACHE_BASE,null);
    if(cache&&cache.events){allEvents=cache.events;lastRange={start:cache.start,end:cache.end};setStatus('Нет сети — показана сохранённая версия');render();}
    else{setStatus('Не удалось загрузить расписание');showError(err&&err.message?err.message:'Проверьте интернет');}
  }finally{
    setBusy(false);dismissSplash();
    if(reloadAfterBusy){reloadAfterBusy=false;setTimeout(function(){loadMain(false);},0);}
  }
}
function updateBanner(){
  let ch=readGroupJson(K_CHANGES_BASE,[])||[],b=document.getElementById('changeBanner');
  if(!b)return;
  if(!ch.length){b.classList.add('hidden');b.innerHTML='';return;}
  b.classList.remove('hidden');b.innerHTML='<span><b>Расписание изменилось:</b> '+ch.length+'</span><button id="showChanges">Посмотреть</button>';
  document.getElementById('showChanges').onclick=()=>openChanges(ch);
}

function eventsForDate(d,list){let k=portalDate(d);return (list||allEvents).filter(e=>e.date===k);}
function nextStudyDay(after){let key=iso(after),dates=[...new Set(allEvents.map(e=>e.date))].filter(x=>dateIso(x)>=key).sort((a,b)=>dateIso(a).localeCompare(dateIso(b)));return dates.length?parseDate(dates[0]):null;}
function render(){
  updateBanner();let c=document.getElementById('content'),t=document.getElementById('periodTitle');if(!c||!t)return;
  if(mode==='day'){
    t.textContent=ruDays[selectedDate.getDay()]+', '+fmtDate(selectedDate);
    let items=combinedItemsForDate(selectedDate);
    if(items.length)c.innerHTML='<div class="cards">'+items.map(scheduleItemHtml).join('')+'</div>'+addTaskButtonHtml(selectedDate);
    else{let n=nextStudyDay(selectedDate);c.innerHTML='<div class="empty"><div class="emptyTitle">Занятий и дел нет</div><div class="muted">На выбранную дату расписание и личные дела отсутствуют.</div>'+(n?'<button id="nearest" class="primary">Ближайший учебный день — '+esc(fmtShort(n))+'</button>':'')+'</div>'+addTaskButtonHtml(selectedDate);let b=document.getElementById('nearest');if(b)b.onclick=()=>{selectedDate=n;render();};}
  }else if(mode==='week'){
    let end=addDays(weekDate,6);t.textContent=fmtShort(weekDate)+' — '+fmtShort(end);
    let html='',has=false;for(let i=0;i<7;i++){let d=addDays(weekDate,i),items=combinedItemsForDate(d);if(!items.length)continue;has=true;html+='<section class="dayBlock"><h2>'+ruDays[d.getDay()]+' <span>'+fmtDate(d)+'</span></h2><div class="cards">'+items.map(scheduleItemHtml).join('')+'</div></section>';}
    c.innerHTML=has?html:'<div class="empty"><div class="emptyTitle">На этой неделе занятий и дел нет</div></div>';
  }else{
    t.textContent='Выбранный период';let list=calendarEvents||[],html='',has=false;
    let start=calendarRange&&calendarRange.start?calendarRange.start:null,end=calendarRange&&calendarRange.end?calendarRange.end:null;
    if(start&&end){for(let d=cloneDate(start);d<=end;d=addDays(d,1)){let items=combinedItemsForDate(d,list);if(!items.length)continue;has=true;html+='<section class="dayBlock"><h2>'+ruDays[d.getDay()]+' <span>'+fmtDate(d)+'</span></h2><div class="cards">'+items.map(scheduleItemHtml).join('')+'</div></section>';}}
    else{let dates=[...new Set(list.map(e=>e.date).concat((personalTasks||[]).map(x=>x.date)))].sort((a,b)=>dateIso(a).localeCompare(dateIso(b)));dates.forEach(function(ds){let d=parseDate(ds),items=combinedItemsForDate(d,list);if(!items.length)return;has=true;html+='<section class="dayBlock"><h2>'+ruDays[d.getDay()]+' <span>'+fmtDate(d)+'</span></h2><div class="cards">'+items.map(scheduleItemHtml).join('')+'</div></section>';});}
    c.innerHTML=has?html:'<div class="empty"><div class="emptyTitle">В выбранном периоде занятий и дел нет</div><div class="muted">Если занятия точно есть, нажмите ↻ или выберите период ещё раз.</div></div>';
  }
  bindPersonalTaskControls();bindLessonCards();
}
function cardHtml(e){let bg=cardColor(e.subject),fg=textColor(bg),marked=pendingScheduleMatch(e);return `<button type="button" class="lesson lessonButton${marked?' notificationChanged':''}" data-lesson-subject="${esc(e.subject)}" data-lesson-date="${esc(e.date)}" style="--card:${bg};--ink:${fg}"><div class="pair"><b>${esc(e.pair)}</b><span>пара</span></div><div class="time">${esc(e.time).replace(' - ','<br>')}</div><div class="info"><h3>${esc(e.subject)}</h3>${e.type?'<div class="type">'+esc(e.type)+'</div>':''}<div class="meta">${e.teacher?'<span>'+esc(e.teacher)+'</span>':''}${e.room?'<span>'+esc(e.room)+'</span>':''}</div></div>${marked?changeDotHtml('cardChangeDot'):''}</button>`;}
function showError(msg){let c=document.getElementById('content'),extra=IS_GITHUB_PAGES?'<div class="muted" style="margin-top:10px">Интерфейс запущен с GitHub Pages. GitHub Pages показывает только интерфейс. Для расписания, рейтинга и СДО откройте опубликованный адрес Vercel этого проекта.</div>':'';if(c)c.innerHTML='<div class="empty"><div class="emptyTitle">Расписание не загрузилось</div><div class="muted">'+esc(msg)+'</div>'+extra+'<button id="retry" class="primary">Повторить</button></div>';let b=document.getElementById('retry');if(b)b.onclick=()=>loadMain(false);}

function openModal(title,html){document.getElementById('modalTitle').textContent=title;document.getElementById('modalBody').innerHTML=html;document.getElementById('modal').classList.remove('hidden');}
function closeModal(){document.getElementById('modal').classList.add('hidden');}
function openPeriodPicker(){let now=today(),a=new Date(now.getFullYear(),now.getMonth(),1,12),b=new Date(now.getFullYear(),now.getMonth()+1,0,12);openModal('Выберите период',`<div class="form"><label>Начало<input id="rangeStart" type="date" value="${iso(a)}"></label><label>Окончание<input id="rangeEnd" type="date" value="${iso(b)}"></label><button id="applyRange" class="primary">Показать расписание</button></div>`);document.getElementById('applyRange').onclick=async function(){let sv=document.getElementById('rangeStart').value,ev=document.getElementById('rangeEnd').value;if(!sv||!ev)return;let s=new Date(sv+'T12:00:00'),e=new Date(ev+'T12:00:00');if(e<s){alert('Дата окончания должна быть не раньше даты начала');return;}this.disabled=true;this.textContent='Загрузка...';try{calendarEvents=await fetchRange(s,e);calendarRange={start:cloneDate(s),end:cloneDate(e)};setStatus('Период загружен · занятий '+calendarEvents.length);closeModal();mode='calendar';document.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('active',x.dataset.mode==='calendar'));document.querySelector('.navrow').classList.add('hidden');render();}catch(x){this.disabled=false;this.textContent='Показать расписание';alert('Не удалось загрузить период: '+(x.message||x));}};}
function openColors(){
  let subjects=[...new Set(allEvents.map(e=>e.subject))].sort();
  colorDraft=Object.assign({},colors);
  if(!subjects.length){
    openModal('Цвета карточек','<div class="hint">Пока нет загруженных занятий для настройки цветов.</div>');
    return;
  }
  renderColorsModal();
}
function renderColorsModal(){
  let subjects=[...new Set(allEvents.map(e=>e.subject))].sort();
  let html='<div class="hint">Назначьте предметам спокойные цвета. Изменения сохраняются на телефоне.</div><div class="colorList">'+subjects.map(s=>`<label class="colorRow"><span>${esc(s)}</span><button class="colorChip" type="button" data-subject="${esc(s)}" style="--chip:${colorDraft[s]||cardColor(s)}"><span class="colorChipInner"></span></button></label>`).join('')+'</div><div class="modalActions"><button id="resetColors" class="secondary">Сбросить</button><button id="saveColors" class="primary">Сохранить</button></div>';
  openModal('Цвета карточек',html);
  document.querySelectorAll('.colorChip').forEach(btn=>btn.onclick=function(){openColorPicker(this.dataset.subject);});
  document.getElementById('saveColors').onclick=function(){colors=Object.assign({},colorDraft||{});writeJson(K_COLORS,colors);closeModal();render();};
  document.getElementById('resetColors').onclick=function(){colorDraft={};renderColorsModal();};
}
function openColorPicker(subject){
  let current=(colorDraft&&colorDraft[subject])||cardColor(subject);
  let html='<div class="pickerHint">'+esc(subject)+'</div><div class="pickerSubtle">Спокойные цвета</div><div class="swatchGrid">'+calmPalette.map(c=>`<button type="button" class="swatchBtn${c.toLowerCase()===String(current).toLowerCase()?' selected':''}" data-color="${c}" style="--swatch:${c}"></button>`).join('')+'</div><div class="pickerMeta"><button id="customColorBtn" class="customColorBtn" type="button">Свой вариант</button><div class="pickerSelected"><span class="pickerSelectedLabel">Выбранный цвет</span><span id="pickerCurrent" class="pickerCurrent" style="--pick:${current}"></span></div></div><div id="advancedPalette" class="advancedPalette hidden"><div class="pickerSubtle">Расширенная палитра</div><div class="swatchGrid swatchGridWide">'+fullPalette.map(c=>`<button type="button" class="swatchBtn paletteWide${c.toLowerCase()===String(current).toLowerCase()?' selected':''}" data-color="${c}" style="--swatch:${c}"></button>`).join('')+'</div></div><div class="modalActions"><button id="cancelColor" class="secondary">Отмена</button><button id="applyColor" class="primary">Установить</button></div>';
  openModal('Выберите цвет',html);
  let selected=current;
  function updatePick(){
    let prev=document.getElementById('pickerCurrent');
    if(prev)prev.style.setProperty('--pick',selected);
    document.querySelectorAll('.swatchBtn').forEach(b=>b.classList.toggle('selected',String(b.dataset.color).toLowerCase()===String(selected).toLowerCase()));
  }
  document.querySelectorAll('.swatchBtn').forEach(btn=>btn.onclick=function(){selected=this.dataset.color;updatePick();});
  document.getElementById('customColorBtn').onclick=function(){
    let box=document.getElementById('advancedPalette');
    if(box)box.classList.toggle('hidden');
    this.classList.toggle('expanded');
    this.textContent=this.classList.contains('expanded')?'Скрыть расширенную палитру':'Свой вариант';
  };
  document.getElementById('cancelColor').onclick=function(){renderColorsModal();};
  document.getElementById('applyColor').onclick=function(){colorDraft[subject]=selected;renderColorsModal();};
}
function describeEvent(e){return fmtShort(parseDate(e.date))+' · '+e.pair+' пара · '+e.subject+(e.time?' · '+e.time:'')+(e.room?' · '+e.room:'');}
function openChanges(ch){let html='<div class="changes">'+ch.map(x=>{if(x.kind==='added')return '<div class="change added"><b>Добавлено</b><div>'+esc(describeEvent(x.now))+'</div></div>';if(x.kind==='removed')return '<div class="change removed"><b>Отменено</b><div>'+esc(describeEvent(x.old))+'</div></div>';return '<div class="change changed"><b>Изменено</b><div class="old">Было: '+esc(describeEvent(x.old))+'</div><div>Стало: '+esc(describeEvent(x.now))+'</div></div>';}).join('')+'</div><button id="ackChanges" class="primary full">Понятно</button>';openModal('Изменения расписания',html);document.getElementById('ackChanges').onclick=function(){writeGroupJson(K_CHANGES_BASE,[]);closeModal();updateBanner();};}

const CSS=`
*{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif}html{background:#f7f8fc}body{background:#f7f8fc;color:#1f2937}button,input{font:inherit}button{cursor:pointer;-webkit-appearance:none;appearance:none;-webkit-tap-highlight-color:transparent;outline:none;touch-action:manipulation;-webkit-user-select:none;user-select:none;transition:transform .08s ease,filter .08s ease,box-shadow .08s ease}button:focus,button:focus-visible{outline:none}button:not(:disabled):active{transform:translateY(1px) scale(.97);filter:brightness(.93)}#app{min-height:100vh;min-height:100dvh;background:#f7f8fc;color:#1f2937;padding-bottom:max(10px,env(safe-area-inset-bottom,0px))}.top{position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;padding:max(18px,calc(env(safe-area-inset-top,0px) + 12px)) 16px 12px;background:rgba(247,248,252,.96);backdrop-filter:blur(10px)}.title{font-size:27px;font-weight:800;line-height:1.08}.heading{min-width:0;flex:1;margin-right:8px}.groupButton{display:inline-flex;align-items:center;justify-content:flex-start;gap:5px;max-width:100%;min-height:30px;margin:7px 0 0;padding:6px 9px;border:0;background:#e9edf5;color:#526078;font-size:13px;font-weight:650;text-align:left;border-radius:10px;box-shadow:inset 0 0 0 1px rgba(71,85,105,.05)}.groupButton:active{transform:translateY(1px) scale(.985)}.groupButton span:first-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.groupChevron{display:block;width:16px;height:16px;flex:0 0 16px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}.topBtns{display:flex;gap:7px;flex:0 0 auto}.icon,.navbtn,.close{display:inline-flex;align-items:center;justify-content:center;border:0;background:#e9edf5;color:#334155;border-radius:13px;width:42px;height:42px;padding:0;line-height:0;vertical-align:middle}.btnSvg{display:block;width:22px;height:22px;flex:0 0 auto;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;transform:none}.paletteSvg{stroke-width:1.8}.paletteFill{fill:currentColor;stroke:none;opacity:.78}.navSvg{width:25px;height:25px;stroke-width:2.6}.closeSvg{width:21px;height:21px;stroke-width:2.3}.themeSun,.themeMoon{position:absolute}.icon{position:relative}.icon:disabled{opacity:.55}#app[data-theme=dark] .themeMoon{display:none}#app:not([data-theme=dark]) .themeSun{display:none}.tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin:4px 16px 10px;padding:4px;border-radius:16px;background:#e9edf5}.tabs button{border:0;border-radius:12px;padding:10px 5px;background:transparent;color:#64748b;font-weight:700}.tabs button.active{background:#fff;color:#202a44;box-shadow:0 2px 8px rgba(30,41,59,.12)}.navrow{display:grid;grid-template-columns:42px 1fr 42px;gap:8px;align-items:center;padding:4px 16px 12px}.periodTitle{text-align:center;font-weight:750;font-size:16px}.navbtn{font-size:0}.changeBanner{margin:0 16px 10px;padding:12px 14px;border-radius:14px;background:#fff1b8;color:#5d4600;display:flex;justify-content:space-between;align-items:center;gap:10px}.changeBanner button{border:0;border-radius:10px;padding:8px 11px;background:#6b5500;color:#fff;font-weight:700}main{padding:0 14px 12px}.cards{display:flex;flex-direction:column;gap:10px}.lesson{display:grid;grid-template-columns:48px 72px 1fr;align-items:stretch;min-height:108px;border-radius:18px;background:var(--card);color:var(--ink);overflow:hidden;box-shadow:0 4px 14px rgba(40,50,70,.09)}.pair{display:flex;flex-direction:column;justify-content:center;align-items:center;border-right:1px solid rgba(255,255,255,.38)}.pair b{font-size:21px}.pair span{font-size:10px;opacity:.78}.time{display:flex;align-items:center;justify-content:center;text-align:center;font-size:13px;font-weight:700;line-height:1.45;border-right:1px solid rgba(255,255,255,.38)}.info{padding:12px 12px 11px;min-width:0}.info h3{margin:0 0 5px;font-size:16px;line-height:1.25}.type{display:inline-block;margin:0 0 7px;padding:3px 7px;border-radius:999px;background:rgba(255,255,255,.30);font-size:11px;font-weight:750}.meta{display:flex;flex-direction:column;gap:3px;font-size:12px;line-height:1.25;opacity:.9}.dayBlock{margin:0 0 20px}.dayBlock h2{margin:4px 3px 10px;font-size:18px}.dayBlock h2 span{font-weight:500;color:#778195;font-size:13px;margin-left:5px}.empty,.loading{text-align:center;padding:48px 18px;background:#fff;border-radius:20px;box-shadow:0 4px 14px rgba(40,50,70,.06)}.emptyTitle{font-size:20px;font-weight:800;margin-bottom:7px}.muted,.hint{color:#758095;font-size:14px;line-height:1.45}.primary,.secondary{border:0;border-radius:13px;padding:12px 15px;font-weight:750}.primary{background:#5b6fe8;color:#fff}.secondary{background:#e9edf5;color:#334155}.empty .primary{margin-top:18px}footer{display:flex;justify-content:space-between;gap:12px;padding:6px 17px 12px;color:#8791a3;font-size:11px}.modal{position:fixed;inset:0;z-index:20;background:rgba(12,17,28,.55);display:flex;align-items:flex-end;justify-content:center;padding-top:30px}.modalBox{width:100%;max-width:620px;max-height:88vh;overflow:auto;background:#fff;border-radius:24px 24px 0 0;padding:16px}.modalHead{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;font-size:20px}.close{width:36px;height:36px}.form{display:flex;flex-direction:column;gap:15px}.form label{display:flex;flex-direction:column;gap:6px;font-weight:650}.form input,.groupSearch{width:100%;border:1px solid #d8deea;border-radius:12px;padding:12px;background:#fff;color:#1f2937}.groupPicker{display:flex;flex-direction:column;gap:10px}.groupList{display:flex;flex-direction:column}.groupSection{margin-top:8px}.groupSectionTitle{position:sticky;top:-16px;z-index:1;padding:9px 4px 7px;background:#fff;color:#758095;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.04em}.groupItem{width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 12px;border:0;border-bottom:1px solid #eef1f6;background:transparent;color:#1f2937;text-align:left;font-weight:650}.groupItem.current{background:#eef2ff;color:#3949ab;border-radius:12px;border-bottom-color:transparent}.groupMark{font-size:19px}.loadingSmall,.emptySmall{text-align:center;padding:28px 12px;color:#758095}.colorList{display:flex;flex-direction:column;margin-top:12px}.colorRow{display:grid;grid-template-columns:1fr 64px;gap:10px;align-items:center;padding:10px 0;border-bottom:1px solid #eef1f6;font-size:13px}.colorChip{width:58px;height:36px;padding:5px;border-radius:12px;border:1.5px solid rgba(17,24,39,.22);background:var(--chip);display:inline-flex;align-items:center;justify-content:center;box-shadow:inset 0 0 0 1px rgba(255,255,255,.35)}.colorChipInner{display:block;width:100%;height:100%;border-radius:8px;background:var(--chip)}.swatchGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:10px 0 14px}.swatchBtn{width:100%;aspect-ratio:1;border-radius:14px;border:1.5px solid rgba(17,24,39,.22);background:var(--swatch);box-shadow:inset 0 0 0 1px rgba(255,255,255,.35)}.swatchBtn.selected{box-shadow:0 0 0 3px rgba(91,111,232,.28),inset 0 0 0 1px rgba(255,255,255,.35);border-color:rgba(91,111,232,.65)}.pickerHint{font-size:15px;font-weight:700;margin:0 0 8px}.pickerSubtle{font-size:12px;font-weight:800;letter-spacing:.02em;color:#748199;margin:6px 0 8px}.pickerMeta{display:grid;grid-template-columns:1fr;gap:12px;margin-top:4px}.customColorBtn{border:0;border-radius:13px;padding:12px 14px;background:#dce5fb;color:#223a73;font-weight:800;text-align:center;box-shadow:inset 0 0 0 1px rgba(91,111,232,.22)}.customColorBtn.expanded{background:#cad8ff;color:#16336f}.pickerSelected{display:flex;align-items:center;gap:10px;flex-wrap:wrap}.pickerSelectedLabel{font-size:13px;color:#6b7280;font-weight:700}.pickerCurrent{width:28px;height:28px;border-radius:8px;background:var(--pick);border:1.5px solid rgba(17,24,39,.18)}.advancedPalette{margin-top:10px;padding-top:10px;border-top:1px solid #e6ebf3}.swatchGridWide{grid-template-columns:repeat(5,1fr)}.paletteWide{border-radius:12px}.modalActions{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:15px}.changes{display:flex;flex-direction:column;gap:9px}.change{padding:12px;border-radius:13px;font-size:13px;line-height:1.4}.change b{display:block;margin-bottom:4px}.added{background:#dcfce7;color:#14532d}.removed{background:#fee2e2;color:#7f1d1d}.changed{background:#fef3c7;color:#713f12}.old{text-decoration:line-through;opacity:.78}.full{width:100%;margin-top:14px}.hidden{display:none!important}.spin .refreshSvg{animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}

.personalTask{width:100%;padding:0;border:0;text-align:left;font:inherit}.personalTask .info{display:flex;align-items:center}.personalTask .info h3{margin:0}.taskTime{font-size:15px}.addTaskWrap{display:flex;justify-content:center;padding:15px 0 5px}.addTaskButton{width:48px;height:48px;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:14px;background:#e9edf5;color:#334155}.addTaskButton svg{width:25px;height:25px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round}.taskSwatchGrid{grid-template-columns:repeat(4,1fr);margin-top:8px}.taskColorSwatch{aspect-ratio:1.35}.taskError{padding:10px 12px;border-radius:11px;background:#fee2e2;color:#7f1d1d;font-size:13px;font-weight:650}.danger{border:0;border-radius:13px;padding:12px 15px;background:#fee2e2;color:#9b1c1c;font-weight:800}#app[data-theme=dark] .addTaskButton{background:#242832;color:#e8edf5}#app[data-theme=dark] .danger{background:#4b2529;color:#ffd7da}#app[data-theme=dark] .taskError{background:#4b2529;color:#ffd7da}
#app[data-theme=dark]{background:#111318;color:#edf1f7}#app[data-theme=dark] .top{background:rgba(17,19,24,.96)}#app[data-theme=dark] footer,#app[data-theme=dark] .muted,#app[data-theme=dark] .hint,#app[data-theme=dark] .dayBlock h2 span{color:#9ca6b8}#app[data-theme=dark] .groupButton{background:#242832;color:#e8edf5}#app[data-theme=dark] .tabs,#app[data-theme=dark] .icon,#app[data-theme=dark] .navbtn,#app[data-theme=dark] .close,#app[data-theme=dark] .secondary{background:#242832;color:#e8edf5}#app[data-theme=dark] .tabs button{color:#aeb7c7}#app[data-theme=dark] .tabs button.active{background:#3a4050;color:#fff}#app[data-theme=dark] .empty,#app[data-theme=dark] .loading,#app[data-theme=dark] .modalBox{background:#1c2028;color:#edf1f7}#app[data-theme=dark] .form input,#app[data-theme=dark] .groupSearch{background:#252a34;color:#fff;border-color:#3a4150}#app[data-theme=dark] .colorRow,#app[data-theme=dark] .groupItem{border-color:#303642}#app[data-theme=dark] .groupSectionTitle{background:#1c2028;color:#9ca6b8}#app[data-theme=dark] .groupItem{color:#edf1f7}#app[data-theme=dark] .groupItem.current{background:#30374a;color:#fff}#app[data-theme=dark] .colorChip{border-color:rgba(226,232,240,.22);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)}#app[data-theme=dark] .swatchBtn{border-color:rgba(226,232,240,.22);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12)}#app[data-theme=dark] .swatchBtn.selected{box-shadow:0 0 0 3px rgba(122,141,255,.25),inset 0 0 0 1px rgba(255,255,255,.12);border-color:rgba(122,141,255,.68)}#app[data-theme=dark] .customColorBtn{background:#2a3140;color:#f5f7fb;box-shadow:inset 0 0 0 1px rgba(145,162,255,.2)}#app[data-theme=dark] .customColorBtn.expanded{background:#32405e;color:#fff}#app[data-theme=dark] .pickerSelectedLabel{color:#b0b8c8}#app[data-theme=dark] .pickerSubtle{color:#aeb8cb}#app[data-theme=dark] .advancedPalette{border-top-color:#303642}

.drawerShade{position:fixed;inset:0;z-index:28;background:rgba(7,10,18,.52);opacity:0;pointer-events:none;transition:opacity .22s ease}.drawer{position:fixed;left:0;top:0;bottom:0;z-index:29;width:min(82vw,330px);padding:max(22px,calc(env(safe-area-inset-top,0px) + 14px)) 14px max(18px,env(safe-area-inset-bottom,0px));background:#fff;color:#1f2937;transform:translateX(-102%);transition:transform .24s ease;box-shadow:10px 0 32px rgba(9,16,31,.22);display:flex;flex-direction:column}.drawerOpen .drawer{transform:translateX(0)}.drawerOpen .drawerShade{opacity:1;pointer-events:auto}.drawerTop{display:flex;align-items:center;justify-content:space-between;padding:0 4px 18px}.drawerBrand{font-size:22px;font-weight:850}.drawerNav{display:flex;flex-direction:column;gap:8px}.drawerItem{display:flex;align-items:center;gap:12px;width:100%;padding:14px 13px;border:0;border-radius:14px;background:transparent;color:#3c4658;text-align:left;font-weight:750}.drawerItem.active{background:#e9edf8;color:#263c77;box-shadow:inset 0 0 0 1px rgba(91,111,232,.1)}.drawerIcon{width:28px;text-align:center;font-size:20px}.ratingControls{padding:3px 16px 12px}.bookSelect{width:100%;min-height:48px;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 14px;border:0;border-radius:15px;background:#e9edf5;color:#334155;font-weight:750;text-align:left}.bookSelect span:first-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bookItem{width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 12px;border:0;border-bottom:1px solid #eef1f6;background:transparent;color:#1f2937;text-align:left;font-weight:650}.bookItem.current{background:#eef2ff;color:#3949ab;border-radius:12px;border-bottom-color:transparent}#ratingContent{padding-top:0}.ratingCards{display:flex;flex-direction:column;gap:10px}.ratingCard{border-radius:18px;background:var(--card);color:var(--ink);overflow:hidden;box-shadow:0 4px 14px rgba(40,50,70,.09)}.ratingCardHead{width:100%;min-height:88px;display:grid;grid-template-columns:minmax(0,1fr) auto 24px;gap:12px;align-items:center;padding:14px;border:0;background:transparent;color:inherit;text-align:left}.ratingSubject{font-size:16px;font-weight:800;line-height:1.28;min-width:0}.ratingTotal{display:flex;flex-direction:column;align-items:flex-end;gap:2px;white-space:nowrap}.ratingTotal span{font-size:10px;font-weight:700;opacity:.75}.ratingTotal b{font-size:22px;line-height:1}.ratingChevron{display:block;width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;transition:transform .18s ease}.ratingCard.open .ratingChevron{transform:rotate(180deg)}.ratingCard.notificationTarget{outline:3px solid #e53935;outline-offset:2px;animation:targetPulse .75s ease-in-out 2}@keyframes targetPulse{50%{transform:scale(.985)}}.ratingDetails{padding:0 14px 14px;border-top:1px solid rgba(255,255,255,.38)}.ratingPoint{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px 2px;border-bottom:1px solid rgba(255,255,255,.28);font-size:13px}.ratingPoint:last-child{border-bottom:0}.ratingPoint span{font-weight:650;opacity:.86}.ratingPoint b{font-size:15px}.ratingPoint.total{font-weight:800}.ratingPoint.total span{opacity:1}.ratingPoint.total b{font-size:18px}
.drawerBottom{margin-top:auto;display:flex;justify-content:flex-start;flex-shrink:0;padding:16px 4px 0}.bellButton{position:relative;width:46px;height:46px;display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:14px;background:#e9edf5;color:#334155}.bellSvg{width:23px;height:23px}.notificationBadge{position:absolute;right:-3px;top:-4px;min-width:19px;height:19px;padding:0 5px;border-radius:999px;background:#e53935;color:#fff;font-size:11px;font-weight:850;line-height:19px;text-align:center;box-shadow:0 0 0 2px #fff}.notificationPanel{position:fixed;inset:0;z-index:40;display:flex;flex-direction:column;background:#f7f8fc;color:#1f2937;padding:max(14px,env(safe-area-inset-top,0px)) 14px max(12px,env(safe-area-inset-bottom,0px))}.notificationHead{display:grid;grid-template-columns:42px 1fr 42px;align-items:center;gap:10px;padding:4px 0 12px}.notificationHead h2{margin:0;text-align:center;font-size:22px}.settingsSvg{width:21px;height:21px}.notificationPermission{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding-bottom:12px}.notificationPermission button{min-height:44px;padding:9px 10px;font-size:12px}.notificationList{flex:1;min-height:0;overflow:auto}.notificationCards{display:flex;flex-direction:column;gap:10px;padding-bottom:12px}.notificationCard{width:100%;padding:14px;border:0;border-radius:17px;background:#fff;color:#1f2937;text-align:left;box-shadow:0 4px 14px rgba(40,50,70,.07);border-left:4px solid #7285ef}.notificationCard.ratingNotice{border-left-color:#a178d0}.notificationCard h3{margin:4px 0 6px;font-size:16px}.notificationCard p{margin:0;color:#566176;font-size:13px;line-height:1.45}.notificationType{font-size:11px;font-weight:850;color:#5b6fe8;text-transform:uppercase;letter-spacing:.04em}.ratingNotice .notificationType{color:#8d64bd}.notificationMeta{display:flex;justify-content:space-between;gap:10px;margin-top:10px;color:#8a94a6;font-size:11px}.notificationMeta span{white-space:nowrap}.notificationOpen{display:flex;align-items:center;justify-content:flex-end;gap:5px;margin-top:10px;color:#5b6fe8;font-size:12px;font-weight:800}.ratingNotice .notificationOpen{color:#8d64bd}.notificationOpen svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}.notificationEmpty{height:100%;min-height:300px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#8791a3}.notificationEmptyIcon{font-size:38px;margin-bottom:8px}.notificationFooter{padding-top:10px}.notificationFooter button{width:100%}#app[data-theme=dark] .drawer{background:#1b1f27;color:#edf1f7}#app[data-theme=dark] .drawerItem{color:#c7cfdd}#app[data-theme=dark] .drawerItem.active{background:#30374a;color:#fff}#app[data-theme=dark] .bellButton{background:#242832;color:#e8edf5}#app[data-theme=dark] .notificationBadge{box-shadow:0 0 0 2px #1b1f27}#app[data-theme=dark] .notificationPanel{background:#111318;color:#edf1f7}#app[data-theme=dark] .notificationCard{background:#1c2028;color:#edf1f7}#app[data-theme=dark] .notificationCard p{color:#b8c0cf}#app[data-theme=dark] .notificationMeta{color:#909bad}#app[data-theme=dark] .bookSelect{background:#242832;color:#e8edf5}#app[data-theme=dark] .bookItem{color:#edf1f7;border-color:#303642}#app[data-theme=dark] .bookItem.current{background:#30374a;color:#fff}

.splashScreen{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;background:#f7f8fc;color:#29364a;opacity:1;transition:opacity .48s ease,visibility .48s ease}.splashScreen.splashLeaving{opacity:0;visibility:hidden}.splashInner{display:flex;flex-direction:column;align-items:center;justify-content:center;transform:translateY(-2vh)}.splashInner img{width:min(55vw,230px);height:min(55vw,230px);object-fit:contain;filter:drop-shadow(0 10px 22px rgba(48,58,82,.13));animation:splashEmblem .82s cubic-bezier(.2,.75,.25,1) both}.splashName{margin-top:18px;font-size:25px;font-weight:900;letter-spacing:.08em;animation:splashText .7s .22s ease both}.splashDots{display:flex;gap:7px;margin-top:18px}.splashDots i{width:7px;height:7px;border-radius:50%;background:#7285ef;animation:splashDot 1.1s ease-in-out infinite}.splashDots i:nth-child(2){animation-delay:.16s}.splashDots i:nth-child(3){animation-delay:.32s}@keyframes splashEmblem{0%{opacity:0;transform:scale(.72)}100%{opacity:1;transform:scale(1)}}@keyframes splashText{0%{opacity:0;transform:translateY(8px)}100%{opacity:1;transform:none}}@keyframes splashDot{0%,70%,100%{opacity:.28;transform:translateY(0)}35%{opacity:1;transform:translateY(-4px)}}#app[data-theme=dark] .splashScreen{background:#111318;color:#edf1f7}
.lessonButton{position:relative;width:100%;border:0;text-align:left;font:inherit}.lessonButton:disabled{opacity:1}.lessonButton.subjectJumpTarget{outline:3px solid rgba(91,111,232,.9);outline-offset:2px;animation:targetPulse .75s ease-in-out 2}.changeDot{position:absolute;display:block;width:13px;height:13px;border-radius:50%;background:#e53935;box-shadow:0 0 0 3px rgba(255,255,255,.9);animation:changeDotFade 3.2s .35s ease forwards;pointer-events:none}.cardChangeDot{right:10px;top:10px}@keyframes changeDotFade{0%,18%{opacity:1;transform:scale(1)}70%{opacity:.72;transform:scale(.92)}100%{opacity:0;transform:scale(.55)}}#app[data-theme=dark] .changeDot{box-shadow:0 0 0 3px rgba(28,32,40,.92)}
.subjectCalendar{padding:2px 0 4px}.subjectCalendarNav{display:grid;grid-template-columns:42px 1fr 42px;align-items:center;gap:10px;margin-bottom:12px}.subjectCalendarNav b{text-align:center;font-size:17px}.subjectCalendarNav .navbtn:disabled{opacity:.3}.subjectWeekdays,.subjectCalendarGrid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}.subjectWeekdays{margin-bottom:7px;color:#7d8798;font-size:11px;font-weight:800;text-align:center}.subjectDay{position:relative;aspect-ratio:1;border:0;border-radius:12px;background:#eef1f6;color:#6b7484;font-weight:750}.subjectDay.blank{visibility:hidden}.subjectDay:disabled{opacity:.48}.subjectDay.hasSubject{background:var(--subjectDay);color:var(--subjectInk);opacity:1;box-shadow:0 3px 9px rgba(43,53,75,.09)}.subjectDay.today:after{content:"";position:absolute;inset:3px;border:2px solid currentColor;border-radius:10px;opacity:.65}.subjectCalendarHint{margin-top:13px;text-align:center;color:#7d8798;font-size:12px}#app[data-theme=dark] .subjectDay{background:#252a34;color:#aeb7c7}#app[data-theme=dark] .subjectDay.hasSubject{background:var(--subjectDay);color:var(--subjectInk)}
.ratingCardHead{position:relative}.ratingCardHead .cardChangeDot{right:8px;top:8px}.ratingPoint{position:relative;padding-right:24px}.ratingPoint .scoreChangeDot{right:2px;top:50%;margin-top:-6px}.ratingPoint.scoreChanged{animation:scorePulse 1s ease 2}@keyframes scorePulse{50%{transform:translateX(-2px)}}

.pwaInstallHint{position:fixed;left:12px;right:12px;bottom:max(12px,env(safe-area-inset-bottom,0px));z-index:95;display:flex;align-items:center;gap:10px;padding:11px 12px;border-radius:16px;background:rgba(255,255,255,.97);color:#253047;box-shadow:0 8px 28px rgba(28,36,56,.18);font-size:12px;line-height:1.35}.pwaInstallHint b{display:block;font-size:13px}.pwaInstallHint button{margin-left:auto;flex:0 0 auto;border:0;border-radius:12px;background:#e9edf5;color:#253047;padding:9px 11px;font-weight:800}.pwaInstallHint.hidden{display:none}#app[data-theme=dark] .pwaInstallHint{background:rgba(28,32,40,.98);color:#edf1f7}#app[data-theme=dark] .pwaInstallHint button{background:#303642;color:#edf1f7}

.sdoDashboard{padding:0 14px 24px;display:flex;flex-direction:column;gap:13px}.sdoProfile{display:grid;grid-template-columns:52px minmax(0,1fr) auto;align-items:center;gap:11px;padding:14px;border-radius:19px;background:linear-gradient(135deg,#dfe7ff,#f2e8ff);color:#273450;box-shadow:0 5px 16px rgba(47,61,98,.09)}.sdoAvatar{width:52px;height:52px;display:flex;align-items:center;justify-content:center;border-radius:17px;background:#fff;color:#586bd5;font-size:23px;font-weight:900;box-shadow:0 3px 10px rgba(48,60,96,.12)}.sdoProfile div:nth-child(2){display:flex;min-width:0;flex-direction:column}.sdoProfile span,.sdoProfile small{font-size:11px;opacity:.72}.sdoProfile b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:16px;margin:2px 0}.sdoLogout{border:0;border-radius:12px;padding:9px 10px;background:rgba(255,255,255,.72);color:#4b5b79;font-weight:800}.sdoWarning{padding:11px 13px;border-radius:14px;background:#fff1d7;color:#765223;font-size:12px;line-height:1.4}.sdoBlock{padding:13px;border-radius:19px;background:#fff;box-shadow:0 4px 14px rgba(40,50,70,.07)}.sdoBlockTitle{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}.sdoBlockTitle h2{margin:0;font-size:18px}.sdoBlockTitle span{min-width:26px;padding:4px 7px;border-radius:999px;background:#edf0fa;color:#586bd5;text-align:center;font-size:11px;font-weight:850}.sdoDeadlineList,.sdoCourseList,.sdoGradeList{display:flex;flex-direction:column;gap:8px}.sdoDeadline{display:grid;grid-template-columns:92px minmax(0,1fr);gap:2px 10px;width:100%;padding:11px;border:0;border-radius:14px;background:#f5f6fa;color:#273142;text-align:left}.sdoDeadlineDate{grid-row:1/3;align-self:center;color:#6c7bdd;font-size:11px;font-weight:800}.sdoDeadline b{font-size:13px;line-height:1.3}.sdoDeadline span:last-child{color:#7b8495;font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.sdoCourseCard{display:grid;grid-template-columns:40px minmax(0,1fr) 20px;align-items:center;gap:10px;width:100%;padding:11px;border:0;border-radius:15px;background:#f5f6fa;color:#273142;text-align:left}.sdoCourseIcon{width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:13px;background:#e6ebff;color:#6175df;font-size:20px}.sdoCourseCard>div:nth-child(2){min-width:0;display:flex;flex-direction:column;gap:3px}.sdoCourseCard b{font-size:13px;line-height:1.28}.sdoCourseCard span,.sdoCourseCard small{color:#7b8495;font-size:10px}.sdoCourseCard svg,.sdoCourseSection button svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}.sdoProgress{height:5px!important;display:block;margin-top:3px;border-radius:999px;background:#e1e5ee;overflow:hidden}.sdoProgress i{display:block;height:100%;border-radius:999px;background:#7285ef}.sdoGradeCard{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding:11px 12px;border:0;border-radius:14px;background:#f5f6fa;color:#273142;text-align:left}.sdoGradeCard span{font-size:12px;font-weight:700}.sdoGradeCard b{font-size:17px;color:#7d57ae}.sdoOfficial{width:100%;min-height:46px}.sdoEmpty{padding:18px 10px;color:#8992a3;text-align:center;font-size:12px}.sdoLoading{min-height:55vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#6c7586}.sdoSpinner{width:30px;height:30px;border:3px solid #d9deea;border-top-color:#7285ef;border-radius:50%;animation:sdoSpin .85s linear infinite}@keyframes sdoSpin{to{transform:rotate(360deg)}}.sdoLoginWrap{padding:18px 14px 28px}.sdoLoginCard{max-width:470px;margin:0 auto;padding:20px 16px;border-radius:23px;background:#fff;box-shadow:0 7px 24px rgba(37,49,76,.1)}.sdoSeal{display:flex;justify-content:center}.sdoSeal img{width:92px;height:92px;object-fit:contain}.sdoLoginCard h2{margin:10px 0 7px;text-align:center}.sdoLoginCard>p{margin:0 auto 17px;max-width:330px;color:#6f798b;text-align:center;font-size:13px;line-height:1.45}.sdoLoginForm{display:flex;flex-direction:column;gap:12px}.sdoLoginForm label{display:flex;flex-direction:column;gap:6px;color:#596477;font-size:12px;font-weight:800}.sdoLoginForm input{width:100%;box-sizing:border-box;padding:13px 12px;border:1px solid #d9dee8;border-radius:13px;background:#f8f9fb;color:#202938;font-size:16px;outline:none}.sdoLoginForm input:focus{border-color:#7b8ced;box-shadow:0 0 0 3px rgba(114,133,239,.14)}.sdoPassword{position:relative}.sdoPassword input{padding-right:47px}.sdoPassword button{position:absolute;right:4px;top:4px;bottom:4px;width:39px;border:0;border-radius:10px;background:transparent;color:#6f7de0;font-size:19px}.sdoPrivacy{margin:14px 0 11px;padding:11px;border-radius:13px;background:#f1f4fb;color:#6b7587;font-size:11px;line-height:1.45}.sdoPrivacy b{display:block;color:#4d5b73}.sdoError{margin-bottom:12px;padding:10px 11px;border-radius:12px;background:#ffe8e6;color:#9b332d;font-size:12px;line-height:1.4}.sdoCourseModal{display:flex;flex-direction:column;gap:12px}.sdoCourseSection{overflow:hidden;border:1px solid #e5e8ef;border-radius:15px}.sdoCourseSection h3{margin:0;padding:12px 12px 8px;font-size:15px}.sdoCourseSection>p{margin:0;padding:0 12px 10px;color:#737d8e;font-size:11px;line-height:1.4}.sdoCourseSection button{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 12px;border:0;border-top:1px solid #eef0f4;background:transparent;color:#263142;text-align:left}.sdoCourseSection button span{display:flex;flex-direction:column;gap:3px}.sdoCourseSection button b{font-size:12px}.sdoCourseSection button small{color:#8891a1}.sdoCourseGrade{display:flex;justify-content:space-between;gap:10px;padding:10px 12px;border-top:1px solid #eef0f4;font-size:12px}.sdoCourseGrade b{color:#7d57ae}.modalSdoLoading{min-height:240px}.notificationCard.sdoNotice{border-left-color:#3f9b7a}.sdoNotice .notificationType,.sdoNotice .notificationOpen{color:#2f8d6c}
#app[data-theme=dark] .sdoProfile{background:linear-gradient(135deg,#29334b,#3a2f4c);color:#eef2fa}#app[data-theme=dark] .sdoAvatar{background:#1b2029;color:#9dacff}#app[data-theme=dark] .sdoLogout{background:rgba(28,32,42,.68);color:#dce3f0}#app[data-theme=dark] .sdoBlock,#app[data-theme=dark] .sdoLoginCard{background:#1c2028;color:#edf1f7}#app[data-theme=dark] .sdoDeadline,#app[data-theme=dark] .sdoCourseCard,#app[data-theme=dark] .sdoGradeCard{background:#252a34;color:#e7ebf3}#app[data-theme=dark] .sdoCourseIcon{background:#32394c;color:#aebcff}#app[data-theme=dark] .sdoLoginForm input{background:#242933;border-color:#3b424f;color:#f1f4f9}#app[data-theme=dark] .sdoPrivacy{background:#252b36;color:#b7c0cf}#app[data-theme=dark] .sdoPrivacy b{color:#e2e7ef}#app[data-theme=dark] .sdoCourseSection{border-color:#363d49}#app[data-theme=dark] .sdoCourseSection button,#app[data-theme=dark] .sdoCourseGrade{color:#e8edf5;border-color:#323845}
html.samsung-fold .top{padding-top:max(38px,calc(env(safe-area-inset-top,0px) + 14px))}html.android-edge:not(.samsung-fold) .top{padding-top:max(28px,calc(env(safe-area-inset-top,0px) + 12px))}@media(max-width:390px) and (min-height:700px){.top{padding-top:max(30px,calc(env(safe-area-inset-top,0px) + 12px))}}@media(max-width:360px){.title{font-size:23px}.lesson{grid-template-columns:42px 65px 1fr}.info h3{font-size:15px}.top{padding-left:12px;padding-right:12px}.tabs,.changeBanner{margin-left:12px;margin-right:12px}main{padding-left:11px;padding-right:11px}}
.ratingControls{display:flex;flex-direction:column;gap:10px;padding:3px 16px 13px}.ratingPeriodControls{display:grid;grid-template-columns:1fr 1fr;gap:9px}.ratingPeriodButton{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 18px;align-items:center;column-gap:8px;min-width:0;min-height:54px;padding:10px 12px;border:0;border-radius:14px;background:#e9edf5;color:#334155;text-align:left;box-shadow:0 2px 7px rgba(45,57,82,.05)}.ratingPeriodButton>strong{grid-column:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:800}.ratingPeriodButton .groupChevron{grid-column:2;width:17px;height:17px}.ratingPeriodButton:active{transform:scale(.985);filter:brightness(.97)}.ratingPeriodPicker{display:flex;flex-direction:column;gap:7px}.ratingPeriodNativeState{min-height:190px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px 10px}.ratingPeriodNativeState .emptyTitle{margin-top:10px}.ratingPeriodNativeIcon{width:42px;height:42px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:#e9edf8;color:#5b6fe8;font-size:22px;font-weight:900}.ratingPeriodSpinner{width:34px;height:34px;border-radius:50%;border:3px solid rgba(91,111,232,.18);border-top-color:#5b6fe8;animation:spin .8s linear infinite}#app[data-theme=dark] .ratingPeriodNativeIcon{background:#30374a;color:#c9d2ff}#app[data-theme=dark] .ratingPeriodSpinner{border-color:rgba(201,210,255,.18);border-top-color:#c9d2ff}.ratingPeriodItem{width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:48px;padding:11px 13px;border:0;border-radius:14px;background:#f1f3f8;color:#2c3749;text-align:left;font-size:13px;font-weight:780}.ratingPeriodItem.current{background:#e4e9ff;color:#4051ad}.ratingDetails{background:rgba(255,255,255,.24)}#app[data-theme=dark] .ratingPeriodButton{background:#242832;color:#e8edf5}#app[data-theme=dark] .ratingPeriodItem{background:#242933;color:#edf1f7}#app[data-theme=dark] .ratingPeriodItem.current{background:#313a5a;color:#c9d2ff}@media(max-width:370px){.ratingPeriodControls{grid-template-columns:1fr}.ratingCardHead{grid-template-columns:minmax(0,1fr) auto 22px}.ratingTotal b{font-size:19px}}
/* iPhone / Safari / Home Screen — v0.35 / Vercel */
@supports (-webkit-touch-callout:none){html,body{overscroll-behavior:none;-webkit-text-size-adjust:100%}#app{min-height:100dvh}.top{padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}.tabs{margin-left:max(16px,env(safe-area-inset-left,0px));margin-right:max(16px,env(safe-area-inset-right,0px))}.navrow{padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}.changeBanner{margin-left:max(16px,env(safe-area-inset-left,0px));margin-right:max(16px,env(safe-area-inset-right,0px))}main,.sdoDashboard{padding-left:max(14px,env(safe-area-inset-left,0px));padding-right:max(14px,env(safe-area-inset-right,0px))}footer{padding-left:max(17px,env(safe-area-inset-left,0px));padding-right:max(17px,env(safe-area-inset-right,0px));padding-bottom:max(12px,env(safe-area-inset-bottom,0px))}.modalBox{padding-bottom:max(16px,calc(env(safe-area-inset-bottom,0px) + 10px))}.notificationPanel{padding-left:max(14px,env(safe-area-inset-left,0px));padding-right:max(14px,env(safe-area-inset-right,0px))}.drawer{padding-left:max(14px,env(safe-area-inset-left,0px))}input,select,textarea{font-size:16px!important}}
`;

document.addEventListener('click',function(ev){
  const btn=ev.target&&ev.target.closest?ev.target.closest('button'):null;
  if(btn){setTimeout(function(){try{btn.blur();}catch(e){}},0);}
},true);

let initialEvents=[];try{initialEvents=parseScheduleDoc(document);}catch(e){}
installShell();
ratingRepairAllCachedControlPointsV048();
nativeNotificationAction('ready');
let cache=readGroupJson(K_CACHE_BASE,null);if(cache&&cache.events&&cache.events.length){allEvents=cache.events;lastRange={start:cache.start,end:cache.end};render();setStatus('Показана сохранённая версия, проверяем обновления...');setTimeout(dismissSplash,1050);}else if(selectedGroup.id===DEFAULT_GROUP.id&&initialEvents.length){allEvents=initialEvents;render();setTimeout(dismissSplash,1050);}
updateBanner();
startRatingBackgroundChecks();
setTimeout(dismissSplash,4500);
if(section==='rating')loadRatingBooks();else if(section==='sdo')loadSdo(false);else loadMain(true);
handlePwaNotificationLink();
})();
