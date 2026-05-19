// 솔비 메모 Service Worker — 오프라인 셸 + 메모 큐 동기화
// v1.0 (2026-05-19)
const CACHE = 'solbi-memo-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL).catch(()=>{})));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// 셸은 cache-first, 솔비 API POST는 항상 네트워크
self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  // 솔비 API — 항상 네트워크 (오프라인이면 client가 localStorage 큐로 보관)
  if (url.host.includes('script.google.com')) return;
  // navigation/fetch — cache-first with network fallback
  if (req.method === 'GET') {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
        return res;
      }).catch(() => caches.match('./index.html')))
    );
  }
});

// 클라이언트에서 보낸 메시지로 큐 재시도 신호
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'flush-queue') {
    // 클라이언트 측에서 처리 — SW는 알림만 받음
  }
});
