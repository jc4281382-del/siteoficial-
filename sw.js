const CACHE_NAME = 'precision-barber-v1.0';
const ASSETS_TO_CACHE = [
  './barbearia.html',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Ignora erros caso o arquivo não exista ou de erro no fetch
      return cache.addAll(ASSETS_TO_CACHE).catch(err => console.log('Erro cache', err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Ignora chamadas à API do Supabase e foca no frontend
  if (event.request.url.includes('supabase.co')) return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        // Fallback básico caso falhe offline
        return caches.match('./barbearia.html');
      });
    })
  );
});
