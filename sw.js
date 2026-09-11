const CACHE='ieltsquirrel-v97';
const ASSETS=['./','./index.html?v=97','./manifest-v97.webmanifest','./manifest.webmanifest','./app-icon-32-v97.png','./app-icon-180-v97.png','./app-icon-192-v97.png','./app-icon-512-v97.png','./app-icon-maskable-512-v97.png','./squirrel-logo.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})))})
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()})
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;if(e.request.destination==='audio'||new URL(e.request.url).pathname.endsWith('.mp3'))return;e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html?v=97'))))})
