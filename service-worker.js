const CACHE_NAME = 'duluth-parking-v2';

self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then(r => {
        caches.open(CACHE_NAME).then(c => c.put(e.request, r.clone()));
        return r;
      })
      .catch(() => caches.match(e.request))
  );
});
