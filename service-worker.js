const CACHE_NAME = 'duluth-parking-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.js',
  '/styles.css',
  '/manifest.json',
  '/icon_192.png',
  '/icon_512.png',
  '/icon.svg',
];

// Pre‑cache static assets during installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  // Activate immediately without waiting for old workers to finish
  self.skipWaiting();
});

// Clean up old caches on activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Network‑first strategy with fallback to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Update cache with the latest response
        const copy = response.clone();
        caches.open(CACHE_NAME).then((c) => c.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
