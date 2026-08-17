const CACHE='mguu-web-v032-vercel';
const BASE=new URL('./',self.location.href);
const asset=p=>new URL(p,BASE).href;
const SHELL=['./','./index.html','./app.js','./manifest.webmanifest','./emblem.png','./icon-180.png','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./badge-96.png'].map(asset);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('mguu-web-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  const rel=url.pathname.startsWith(BASE.pathname)?url.pathname.slice(BASE.pathname.length):url.pathname.replace(/^\//,'');
  if(rel.startsWith('portal/')||rel.startsWith('api/')){event.respondWith(fetch(event.request,{cache:'no-store'}));return;}
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(asset('./index.html'),copy));return r;}).catch(()=>caches.match(asset('./index.html'))));return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(r=>{if(r.ok)caches.open(CACHE).then(c=>c.put(event.request,r.clone()));return r;})));
});
self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const id=event.notification.data&&event.notification.data.notificationId?event.notification.data.notificationId:'';
  const target=asset('./?notification='+encodeURIComponent(id));
  event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(clients=>{
    for(const client of clients){if('focus' in client){client.postMessage({type:'OPEN_NOTIFICATION',id});return client.focus();}}
    return self.clients.openWindow?self.clients.openWindow(target):undefined;
  }));
});
self.addEventListener('message',event=>{if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting();});
