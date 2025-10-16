const CACHE_NAME = 'miausairovi-v2';
const STATIC_CACHE = 'miausairovi-static-v2';
const urlsToCache = ['/', '/cats', '/gallery', '/contact', '/faq'];

// Critical assets to prefetch
const criticalAssets = ['/', '/manifest.json'];

self.addEventListener('install', (event) => {
  // Skip waiting to activate immediately
  self.skipWaiting();

  event.waitUntil(
    Promise.all([
      // Cache routes
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache);
      }),
      // Cache critical static assets
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(criticalAssets);
      }),
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Cache-first strategy for static assets (JS, CSS, images)
  if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        });
      })
    );
    return;
  }

  // Network-first strategy for HTML/API
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME, STATIC_CACHE];
  event.waitUntil(
    Promise.all([
      // Take control immediately
      self.clients.claim(),
      // Clean old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
    ])
  );
});
