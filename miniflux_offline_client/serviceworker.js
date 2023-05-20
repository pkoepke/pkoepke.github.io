// TODO: add periodic background sync: https://developer.mozilla.org/en-US/docs/Web/API/Web_Periodic_Background_Synchronization_API

const cacheName = 'miniflux_offline_client'

// Once the SW is installed, cache files for offline use.
self.addEventListener("install", (e) => {
  console.log("Service Worker Install event fired, caching files.");
  const contentToCache = ['index.html', 'script.js', 'styles.css', '/favicon.png']; // Array of URLs to cache.
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(contentToCache);
    })()
  );
});

// Listen for network requests and server from cache if possible.
self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`); // Attempt to serve from cache.
      if (r) {
        return r; // Ends here if the resource is in the cache.
      }
      const response = await fetch(e.request); // If the resource wasn't found in the cache, fetch it online.
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
