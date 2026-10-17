const CACHE='ieltsquirrel-v140-practice-simple-audio-batch1';
const SHELL=['./','./app.css','./model-answers.css','./app-runtime.js','./seo-routes.js','./router.js','./pwa.js','./speaking-practice-audio-data.js','./speaking-practice-audio.js','./manifest.webmanifest','./brand-logo-v119.png','./favicon-96.png','./app-icon-192-v125.png','./app-icon-512-v125.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('ieltsquirrel-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||request.headers.has('range')||request.destination==='audio'||url.pathname.endsWith('.mp3'))return;
 event.respondWith(fetch(request,{cache:'no-cache'}).then(response=>{
   if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)));}
   return response;
 }).catch(async()=>{
   const cached=await caches.match(request);if(cached)return cached;
   if(request.mode==='navigate')return (await caches.match('./'))||Response.error();
   return Response.error();
 }));
});
