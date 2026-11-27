// A/L Pro service worker: works offline, updates itself when online.
const V='phy-7bdf646e-r2',LIB='fb-sdk-v1',A=['./','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png'];
// The host redirects /index.html to /. A redirected response can't be shown for an app launch (ERR_FAILED),
// so the page is always fetched and stored as the folder URL './' and any redirected copy is rebuilt as a plain one.
const ROOT=new URL('./',self.registration.scope).href;
const clean=n=>n&&n.redirected?n.blob().then(b=>new Response(b,{status:n.status,statusText:n.statusText,headers:n.headers})):Promise.resolve(n);
const cached=()=>caches.match(ROOT).then(clean);
function page(){const net=fetch(ROOT,{cache:'no-store',credentials:'same-origin'}).then(clean).then(n=>{if(!n.ok)throw 0;const c=n.clone();caches.open(V).then(x=>x.put(ROOT,c));return n});
  // slow connection: show the saved copy after 4 s, the fresh one is still saved for next time
  const slow=new Promise(ok=>setTimeout(ok,4000)).then(cached).then(h=>h||net);
  return Promise.race([net,slow]).catch(()=>cached()).then(h=>h||net).catch(()=>new Response('<meta name=viewport content="width=device-width"><body style="font-family:sans-serif;padding:24px;background:#14162b;color:#fff"><h3>You are offline</h3><p>Connect to the internet once to open A/L Pro, then it works offline.</p><button onclick="location.reload()" style="padding:10px 18px">Try again</button>',{headers:{'Content-Type':'text/html'}}))}
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(A.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!==LIB&&x!=='phq-v1').map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  // Firebase SDK files (versioned, never change): cache first so login works offline after the first visit
  if(u.hostname==='www.gstatic.com'&&u.pathname.startsWith('/firebasejs/')){e.respondWith(caches.open(LIB).then(c=>c.match(r).then(h=>h||fetch(r).then(n=>{if(n.ok)c.put(r,n.clone());return n}))));return}
  // PDF viewer library (versioned): cache first so papers open offline after the first use
  if(u.hostname==='cdnjs.cloudflare.com'&&u.pathname.includes('/pdf.js/')){e.respondWith(caches.open(LIB).then(c=>c.match(r).then(h=>h||fetch(r).then(n=>{if(n.ok)c.put(r,n.clone());return n}))));return}
  if(u.origin!==location.origin)return; // auth + database traffic always goes to the network
  // the app page: network first (fresh updates), cache when offline
  if(u.pathname.endsWith('/version.json'))return; // always straight from the network
  if(r.mode==='navigate'||u.pathname.endsWith('/index.html')||u.href.split(/[?#]/)[0]===ROOT){e.respondWith(page());return}
  // past-paper question pictures: index network first, pictures cache first (kept across app updates)
  if(u.pathname.includes('/q/')){if(u.pathname.endsWith('.json')){e.respondWith(fetch(r).then(n=>{if(n.ok)caches.open('phq-v1').then(c=>c.put(r,n.clone()));return n}).catch(()=>caches.match(r)));return}
    e.respondWith(caches.open('phq-v1').then(c=>c.match(r).then(h=>h||fetch(r).then(n=>{if(n.ok)c.put(r,n.clone());return n}))));return}
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>h||fetch(r)))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return self.clients.openWindow('./#plan')}))});
