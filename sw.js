// Service Worker Version: 2025-11-28
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  self.skipWaiting(); // Activate worker immediately
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');
  // Clear old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Network first, then cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
          const clonedResponse = response.clone();
          caches.open('v1').then(cache => {
            cache.put(event.request, clonedResponse);
          });
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Register service worker with cache-busting query string
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js?v=20251128').then(function() {
    console.log('Service Worker Registered');
  });
}