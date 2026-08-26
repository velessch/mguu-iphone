const CACHE='mguu-web-v037-vercel';
const BUILD='037';
const BASE=new URL('./',self.location.href);
const asset=p=>new URL(p,BASE).href;
const SHELL=[
  './index.html?v='+BUILD,
  './app.js?v='+BUILD,
  './manifest.webmanifest?v='+BUILD,
  './emblem.png','./icon-180.png','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./badge-96.png'
].map(asset);

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).catch(()=>{}).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys()
    .then(keys=>Promise.all(keys.filter(k=>k.startsWith('mguu-web-')&&k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});

function relPath(url){
  return url.pathname.startsWith(BASE.pathname)?url.pathname.slice(BASE.pathname.length):url.pathname.replace(/^\//,'');
}
function offlineIndex(){return caches.match(asset('./index.html?v='+BUILD));}
async function networkFirst(request,fallback){
  try{
    const response=await fetch(request,{cache:'no-store'});
    if(response&&response.ok){
      const copy=response.clone();
      caches.open(CACHE).then(c=>c.put(request,copy)).catch(()=>{});
    }
    return response;
  }catch(err){
    const cached=await caches.match(request);
    if(cached)return cached;
    if(fallback){const fb=await fallback();if(fb)return fb;}
    throw err;
  }
}

self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  const rel=relPath(url);

  // Portal/API responses must never come from a PWA cache.
  if(rel.startsWith('portal/')||rel.startsWith('api/')){
    event.respondWith(fetch(event.request,{cache:'no-store'}));
    return;
  }

  // Always revalidate the app shell/code. This is the key v0.37 fix: an old
  // iPhone PWA can no longer keep serving app.js from a previous release.
  if(event.request.mode==='navigate'){
    event.respondWith(networkFirst(event.request,offlineIndex));
    return;
  }
  if(/^(?:app\.js|index\.html|manifest\.webmanifest|sw\.js)$/i.test(rel)){
    event.respondWith(networkFirst(event.request,null));
    return;
  }

  // Images/icons remain cache-first for fast offline startup.
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    if(response&&response.ok)caches.open(CACHE).then(c=>c.put(event.request,response.clone())).catch(()=>{});
    return response;
  })));
});

self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const id=event.notification.data&&event.notification.data.notificationId?event.notification.data.notificationId:'';
  const target=asset('./?notification='+encodeURIComponent(id)+'&v='+BUILD);
  event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(clients=>{
    for(const client of clients){if('focus' in client){client.postMessage({type:'OPEN_NOTIFICATION',id});return client.focus();}}
    return self.clients.openWindow?self.clients.openWindow(target):undefined;
  }));
});

self.addEventListener('message',event=>{
  if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting();
  if(event.data&&event.data.type==='GET_BUILD'&&event.source){try{event.source.postMessage({type:'MGUU_BUILD',build:BUILD});}catch(e){}}
});
