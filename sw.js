/**
 * Service Worker — Precision Barber PWA
 * 
 * Funcionalidades:
 * 1. Cache Network-First para assets estáticos
 * 2. Bypass de cache para chamadas ao Supabase
 * 3. Suporte a Web Push Notifications (evento push + notificationclick)
 */

const CACHE_NAME = 'precision-barber-v2.0';
const ASSETS_TO_CACHE = [
  './barbearia.html',
  './cliente.html',
  './manifest.json',
  './logo.png'
];

// ─── INSTALL ─────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => console.log('[SW] Erro ao cachear assets:', err));
    })
  );
  self.skipWaiting();
});

// ─── ACTIVATE ────────────────────────────────────────────────────────
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

// ─── FETCH (Network First) ──────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  // Não cacheia chamadas ao Supabase nem a CDNs de JS
  if (event.request.url.includes('supabase.co') || 
      event.request.url.includes('cdn.jsdelivr.net') ||
      event.request.url.includes('cdn.tailwindcss.com')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match('./barbearia.html');
        });
      })
  );
});

// ─── PUSH NOTIFICATION ──────────────────────────────────────────────
// Disparado quando o servidor envia uma notificação push
self.addEventListener('push', (event) => {
  let data = { title: 'Precision Barber', body: 'Você tem uma atualização!' };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body || 'Chegou a sua vez!',
    icon: './logo.png',
    badge: './logo.png',
    vibrate: [200, 100, 200, 100, 400],
    tag: 'precision-barber-notification',
    renotify: true,
    data: {
      url: data.url || './cliente.html'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Precision Barber', options)
  );
});

// ─── NOTIFICATION CLICK ─────────────────────────────────────────────
// Abre a app quando o utilizador clica na notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || './cliente.html';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Se já tiver uma aba aberta, foca nela
      for (const client of clientList) {
        if (client.url.includes('cliente.html') && 'focus' in client) {
          return client.focus();
        }
      }
      // Senão abre uma nova
      return clients.openWindow(urlToOpen);
    })
  );
});
