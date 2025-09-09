// Service Worker Version: 2025-09-09
self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  self.skipWaiting(); // Activate worker immediately
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Cache-busting: always fetch from network, fallback to cache if offline
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// Register service worker with cache-busting query string
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js?v=20250909').then(function() {
    console.log('Service Worker Registered');
  });
}