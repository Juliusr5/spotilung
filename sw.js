// Naikkan versi ini setiap kali index.html diubah, supaya iPhone mengambil versi baru.
const C = 'spotilung-v10';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon.png'];
// cache: 'reload' melewati cache HTTP browser; tanpa ini versi baru bisa menyimpan index.html lama
// (GitHub Pages mengizinkan file disimpan sementara sampai 10 menit).
self.addEventListener('install', e => e.waitUntil(
  caches.open(C).then(c => c.addAll(FILES.map(f => new Request(f, {cache: 'reload'})))).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => e.respondWith(
  caches.match(e.request, {ignoreSearch: true}).then(r => r || fetch(e.request))));
