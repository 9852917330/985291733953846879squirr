const CACHE='ieltsquirrel-v144-full-review';
const SHELL=["./","./app.css?v=144","./model-answers.css?v=144","./app-runtime.js?v=144","./seo-routes.js?v=144","./router.js?v=144","./pwa.js?v=144","./speaking-practice-audio-data.js?v=144","./speaking-practice-audio.js?v=144","./manifest.webmanifest?v=144","./brand-logo-v119.png","./favicon-96.png","./app-icon-192-v125.png","./app-icon-512-v125.png","./buy-me-coffee-qr.png","./usdt-tron-qr.png","./content-writing-general.js?v=144","./content-writing-academic.js?v=144","./content-writing-task-2.js?v=144","./content-speaking-part-1.js?v=144","./content-speaking-part-2.js?v=144","./content-speaking-part-3.js?v=144"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('ieltsquirrel-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||request.headers.has('range')||request.destination==='audio'||url.pathname.endsWith('.mp3'))return;
 const remember=response=>{
   if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{}));}
   return response;
 };
 if(request.mode==='navigate'){
   event.respondWith(fetch(request).then(remember).catch(async()=>await caches.match(request)||await caches.match(new URL('./',self.location.href))||Response.error()));
 }else{
   event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(remember)));
 }
});
