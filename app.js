(function(){
'use strict';
if(window.__mguuWebV031){return;}
window.__mguuWebV031=true;

const APP_VERSION='0.31 Web';
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
  pendingRatingSubjects=[];pendingRatingMarks=[];
  if(n&&n.extra){
    if(Array.isArray(n.extra.subjects))pendingRatingSubjects=n.extra.subjects.slice();else if(n.extra.subject)pendingRatingSubjects=[n.extra.subject];
    if(Array.isArray(n.extra.scoreChanges))pendingRatingMarks=n.extra.scoreChanges.map(function(x){return {subject:x.subject||n.extra.subject||'',label:x.label||'',oldValue:x.oldValue||'',newValue:x.newValue||'',kind:x.kind||'',isTotal:!!x.isTotal};});
  }
  section='rating';localStorage.setItem(K_SECTION,section);closeNotificationsPanel();applySection();updateBookButton();
  let cache=selectedBook?readJson(ratingCacheKey(selectedBook),null):null;if(cache){ratingData=cache;renderRating();}
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
function ratingSubjectsSignature(data){return ratingSubjectsFromTables((data&&data.tables)||[]).map(x=>({subject:x.subject,total:x.total,details:x.details}));}
function ratingScoreChanges(oldData,newData){
  let oldItems=ratingSubjectsSignature(oldData),newItems=ratingSubjectsSignature(newData);if(!oldItems.length||!newItems.length)return [];
  let oldMap=new Map(oldItems.map(x=>[normalizeSubject(x.subject),x])),changes=[];
  newItems.forEach(function(item){
    let old=oldMap.get(normalizeSubject(item.subject));if(!old)return;
    let oldDetails=new Map((old.details||[]).map(d=>[normalizeSubject(d.label),String(d.value||'')]));
    (item.details||[]).forEach(function(d){
      let key=normalizeSubject(d.label),before=oldDetails.has(key)?oldDetails.get(key):'',after=String(d.value||'');
      if(before===after)return;
      changes.push({subject:item.subject,label:d.label,oldValue:before,newValue:after,kind:before?'changed':'added',isTotal:/(итог|общий|сумм|всего|рейтинг)/i.test(d.label)});
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
    addAppNotification('rating',title,body,{subject:subject,subjects:[subject],scoreChanges:items,bookUrl:selectedBook&&selectedBook.url?selectedBook.url:''});
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
function ratingNotificationScope(book){return String(ratingGroup&&ratingGroup.id||'')+'|'+String(book&&book.url||'');}
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
function ratingCacheKey(book){return K_RATING_CACHE_BASE+'_'+ratingGroup.id+'_'+hash((book&&book.url)||'none');}
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
      u=new URL(toPortalProxyUrl(u.href));
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
function parseRatingDoc(doc){
  let tables=[];
  Array.from(doc.querySelectorAll('table')).forEach(function(table){
    let rows=Array.from(table.querySelectorAll('tr')).map(function(tr){return Array.from(tr.querySelectorAll('th,td')).map(td=>cleanLine(td.textContent||'')).filter(Boolean);}).filter(r=>r.length);
    if(rows.length>=2&&Math.max.apply(null,rows.map(r=>r.length))>=2)tables.push(rows);
  });
  let raw=[];
  Array.from(doc.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,dt,dd')).forEach(function(el){let s=cleanLine(el.textContent||'');if(s)raw.push(s);});
  let seen=new Set(),lines=raw.filter(function(s){
    let low=s.toLowerCase();
    if(seen.has(s)||/университет правительства москвы|учим управлять городом|контакты|новости|ресурсы|мероприятия|сервисы|к выбору группы/i.test(low))return false;
    seen.add(s);return true;
  }).slice(0,120);
  let title='';try{title=cleanLine((doc.querySelector('h1,h2,h3,h4')||{}).textContent||'');}catch(e){}
  return {title:title,tables:tables,lines:lines,loadedAt:new Date().toISOString()};
}
async function fetchRatingData(book){let doc=await fetchHtmlDoc(book.url);return parseRatingDoc(doc);}
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
  if(!url)return;selectedBook={label:label||'Зачётная книжка',url:url};writeJson(ratingBookKey(),selectedBook);closeModal();updateBookButton();loadRating(false);
}
function updateBookButton(){let el=document.getElementById('bookName');if(el)el.textContent=selectedBook?selectedBook.label:'Выберите зачётную книжку';}
function isScoreValue(v){
  let s=cleanLine(v);
  return /^[-–—]$/.test(s)||/^\d+(?:[.,]\d+)?(?:\s*\/\s*\d+(?:[.,]\d+)?)?$/.test(s)||/^\d+(?:[.,]\d+)?\s*(?:балл(?:а|ов)?|%)?$/i.test(s);
}
function isNoiseRatingLabel(s){
  return /^(?:№|номер|п\/п|группа|фио|студент|зач[её]тная книжка|семестр|курс|форма обучения|учебный год)$/i.test(cleanLine(s));
}
function ratingSubjectsFromTables(tables){
  let result=[],bySubject=new Map();
  (tables||[]).forEach(function(rows){
    if(!rows||rows.length<2)return;
    let header=(rows[0]||[]).map(cleanLine),body=rows.slice(1);
    let width=Math.max.apply(null,rows.map(r=>r.length));
    let subjectIndex=header.findIndex(h=>/(дисциплин|предмет|наименован)/i.test(h));
    if(subjectIndex<0){
      let best=-1,bestScore=-1;
      for(let j=0;j<width;j++){
        let vals=body.map(r=>cleanLine(r[j]||'')).filter(Boolean);
        if(!vals.length)continue;
        let textCount=vals.filter(v=>!isScoreValue(v)&&v.length>4).length;
        let avg=vals.reduce((a,v)=>a+v.length,0)/vals.length;
        let score=textCount*3+avg-(isNoiseRatingLabel(header[j]||'')?20:0);
        if(score>bestScore){bestScore=score;best=j;}
      }
      subjectIndex=best;
    }
    if(subjectIndex<0)return;
    body.forEach(function(row){
      let subject=cleanLine(row[subjectIndex]||'');
      if(!subject||subject.length<3||isScoreValue(subject)||/^(итого|всего|средний балл|рейтинг)$/i.test(subject))return;
      if(/университет|правительства москвы|контакты|новости|ресурсы|мероприятия|сервисы|правила рейтинга|к выбору группы/i.test(subject))return;
      let details=[];
      for(let j=0;j<Math.max(header.length,row.length);j++){
        if(j===subjectIndex)continue;
        let value=cleanLine(row[j]||'');
        if(!value)continue;
        let label=cleanLine(header[j]||'');
        if(isNoiseRatingLabel(label))continue;
        if(!label)label='КТ '+(details.length+1);
        let relevant=/(?:^|\s)(?:кт\s*\d*|контрольн\w*\s+точк\w*|итог|общий|сумм|балл|рейтинг|экзамен|зач[её]т)(?:$|\s)/i.test(label)||isScoreValue(value);
        if(!relevant)continue;
        details.push({label:label,value:value});
      }
      if(!details.length)return;
      let totalDetail=details.find(d=>/(итог|общий|сумм|всего|рейтинг)/i.test(d.label));
      if(!totalDetail)totalDetail=details.slice().reverse().find(d=>isScoreValue(d.value));
      let item=bySubject.get(subject);
      if(!item){item={subject:subject,total:totalDetail?totalDetail.value:'—',details:[]};bySubject.set(subject,item);result.push(item);}
      details.forEach(function(d){if(!item.details.some(x=>x.label===d.label&&x.value===d.value))item.details.push(d);});
      if(totalDetail)item.total=totalDetail.value;
    });
  });
  return result;
}
function ratingCardHtml(item,index){
  let bg=cardColor(item.subject),fg=textColor(bg),subjectMarks=ratingMarksForSubject(item.subject),marked=subjectMarks.length||pendingRatingSubjects.some(x=>normalizeSubject(x)===normalizeSubject(item.subject));
  let details=item.details.map(function(d){let total=/(итог|общий|сумм|всего|рейтинг)/i.test(d.label);return '<div class="ratingPoint'+(total?' total':'')+'" data-rating-label="'+esc(d.label)+'" data-rating-value="'+esc(d.value)+'"><span>'+esc(d.label)+'</span><b>'+esc(d.value)+'</b></div>';}).join('');
  return '<article class="ratingCard" data-rating-subject="'+esc(item.subject)+'" style="--card:'+bg+';--ink:'+fg+'"><button class="ratingCardHead" type="button" data-rating-index="'+index+'" aria-expanded="false"><div class="ratingSubject">'+esc(item.subject)+'</div><div class="ratingTotal"><span>Общий балл</span><b>'+esc(item.total||'—')+'</b></div><svg class="ratingChevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg>'+(marked?changeDotHtml('cardChangeDot'):'')+'</button><div class="ratingDetails hidden">'+details+'</div></article>';
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
  if(first){setTimeout(function(){first.scrollIntoView({behavior:'smooth',block:'center'});},100);setTimeout(function(){document.querySelectorAll('.ratingCard.notificationTarget').forEach(x=>x.classList.remove('notificationTarget'));},2600);}
}

function renderRating(){
  let c=document.getElementById('ratingContent');if(!c)return;
  updateBookButton();
  if(!selectedBook){c.innerHTML='<div class="empty"><div class="emptyTitle">Выберите зачётную книжку</div><button id="pickBookNow" class="primary">Выбрать</button></div>';let b=document.getElementById('pickBookNow');if(b)b.onclick=openRatingBooks;return;}
  if(!ratingData){c.innerHTML='<div class="loading">Загрузка рейтинга...</div>';return;}
  let subjects=ratingSubjectsFromTables(ratingData.tables||[]);
  if(!subjects.length){c.innerHTML='<div class="empty"><div class="emptyTitle">Данные рейтинга не найдены</div></div>';return;}
  c.innerHTML='<div class="ratingCards">'+subjects.map(ratingCardHtml).join('')+'</div>';
  bindRatingCards();applyPendingRatingNavigation();
}
async function loadRating(){
  if(section!=='rating')return;
  if(!selectedBook){renderRating();setStatus('Выберите зачётную книжку');return;}
  if(ratingBusy)return;ratingBusy=true;setBusy(true);setStatus('Загружаем рейтинг...');ratingData=null;renderRating();
  try{let notifyScope=ratingNotificationScope(selectedBook);let scopeChanged=localStorage.getItem(K_NOTIFY_RATING_SCOPE)!==notifyScope;localStorage.setItem(K_NOTIFY_RATING_SCOPE,notifyScope);let oldData=readJson(ratingCacheKey(selectedBook),null);let data=await fetchRatingData(selectedBook);let changed=ratingScoreChanges(oldData,data);ratingData=data;writeJson(ratingCacheKey(selectedBook),data);if(changed.length&&!scopeChanged){addRatingChangeNotifications(changed,data);}setStatus('Рейтинг обновлён '+new Date().toLocaleString('ru-RU',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}));renderRating();}
  catch(err){let cache=readJson(ratingCacheKey(selectedBook),null);if(cache){ratingData=cache;setStatus('Нет сети — показана сохранённая версия');renderRating();}else{let c=document.getElementById('ratingContent');if(c)c.innerHTML='<div class="empty"><div class="emptyTitle">Рейтинг не загрузился</div><div class="muted">'+esc(err.message||'Проверьте интернет')+'</div><button id="retryRating" class="primary">Повторить</button></div>';let b=document.getElementById('retryRating');if(b)b.onclick=()=>loadRating();setStatus('Не удалось загрузить рейтинг');}}
  finally{ratingBusy=false;setBusy(false);dismissSplash();}
}
async function loadRatingBooks(){
  selectedBook=readJson(ratingBookKey(),null);updateBookButton();let cached=readJson(ratingBooksKey(),null);ratingBooks=cached&&cached.books?cached.books:[];
  if(selectedBook){let cache=readJson(ratingCacheKey(selectedBook),null);if(cache){ratingData=cache;renderRating();}}
  else renderRating();
  if(selectedBook)loadRating();
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
      <section class="ratingControls"><button id="bookSelect" class="bookSelect"><span id="bookName">Выберите зачётную книжку</span><svg class="groupChevron" viewBox="0 0 24 24"><path d="m7 10 5 5 5-5"/></svg></button></section>
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
  document.getElementById('refresh').onclick=()=>section==='rating'?loadRating():(section==='sdo'?loadSdo(false):loadMain(false));
  document.getElementById('groupSelect').onclick=()=>section==='rating'?openRatingGroups():openGroups();
  document.getElementById('bookSelect').onclick=openRatingBooks;
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
  document.querySelectorAll('.drawerItem').forEach(b=>b.classList.toggle('active',b.dataset.section===section));updateGroupButton();updateBookButton();
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
function showError(msg){let c=document.getElementById('content'),extra=IS_GITHUB_PAGES?'<div class="muted" style="margin-top:10px">Интерфейс запущен с GitHub Pages. Для загрузки расписания, рейтинга и СДО нужно открыть эту же версию через сервер Render, потому что GitHub Pages не запускает server.js.</div>':'';if(c)c.innerHTML='<div class="empty"><div class="emptyTitle">Расписание не загрузилось</div><div class="muted">'+esc(msg)+'</div>'+extra+'<button id="retry" class="primary">Повторить</button></div>';let b=document.getElementById('retry');if(b)b.onclick=()=>loadMain(false);}

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
/* iPhone / Safari / Home Screen — v0.30 */
@supports (-webkit-touch-callout:none){html,body{overscroll-behavior:none;-webkit-text-size-adjust:100%}#app{min-height:100dvh}.top{padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}.tabs{margin-left:max(16px,env(safe-area-inset-left,0px));margin-right:max(16px,env(safe-area-inset-right,0px))}.navrow{padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}.changeBanner{margin-left:max(16px,env(safe-area-inset-left,0px));margin-right:max(16px,env(safe-area-inset-right,0px))}main,.sdoDashboard{padding-left:max(14px,env(safe-area-inset-left,0px));padding-right:max(14px,env(safe-area-inset-right,0px))}footer{padding-left:max(17px,env(safe-area-inset-left,0px));padding-right:max(17px,env(safe-area-inset-right,0px));padding-bottom:max(12px,env(safe-area-inset-bottom,0px))}.modalBox{padding-bottom:max(16px,calc(env(safe-area-inset-bottom,0px) + 10px))}.notificationPanel{padding-left:max(14px,env(safe-area-inset-left,0px));padding-right:max(14px,env(safe-area-inset-right,0px))}.drawer{padding-left:max(14px,env(safe-area-inset-left,0px))}input,select,textarea{font-size:16px!important}}
`;

document.addEventListener('click',function(ev){
  const btn=ev.target&&ev.target.closest?ev.target.closest('button'):null;
  if(btn){setTimeout(function(){try{btn.blur();}catch(e){}},0);}
},true);

let initialEvents=[];try{initialEvents=parseScheduleDoc(document);}catch(e){}
installShell();
nativeNotificationAction('ready');
let cache=readGroupJson(K_CACHE_BASE,null);if(cache&&cache.events&&cache.events.length){allEvents=cache.events;lastRange={start:cache.start,end:cache.end};render();setStatus('Показана сохранённая версия, проверяем обновления...');setTimeout(dismissSplash,1050);}else if(selectedGroup.id===DEFAULT_GROUP.id&&initialEvents.length){allEvents=initialEvents;render();setTimeout(dismissSplash,1050);}
updateBanner();
setTimeout(dismissSplash,4500);
if(section==='rating')loadRatingBooks();else if(section==='sdo')loadSdo(false);else loadMain(true);
handlePwaNotificationLink();
})();
