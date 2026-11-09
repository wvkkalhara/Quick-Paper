// A/L Pro service worker: works offline, updates itself when online.
const V='phy-f8930cd090',LIB='fb-sdk-v1',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!==LIB).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  // Firebase SDK files (versioned, never change): cache first so login works offline after the first visit
  if(u.hostname==='www.gstatic.com'&&u.pathname.startsWith('/firebasejs/')){e.respondWith(caches.open(LIB).then(c=>c.match(r).then(h=>h||fetch(r).then(n=>{if(n.ok)c.put(r,n.clone());return n}))));return}
  if(u.origin!==location.origin)return; // auth + database traffic always goes to the network
  // the app page: network first (fresh updates), cache when offline
  if(r.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/')){e.respondWith(fetch(r).then(n=>{if(n.ok){const c=n.clone();caches.open(V).then(x=>x.put('index.html',c))}return n}).catch(()=>caches.match('index.html')));return}
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>h||fetch(r)))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return self.clients.openWindow('./index.html#plan')}))});
