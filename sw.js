const CACHE='ieltsquirrel-v94';
const ASSETS=['./','./index.html?v=94','./manifest.webmanifest?v=94','./app-icon-32.png','./app-icon-180.png','./app-icon-192.png','./app-icon-512.png','./app-icon-maskable-512.png','./squirrel-logo.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS).catch(()=>{})))})
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()})
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;if(e.request.destination==='audio'||new URL(e.request.url).pathname.endsWith('.mp3'))return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html?v=94'))))})
