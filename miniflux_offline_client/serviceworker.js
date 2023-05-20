const cacheName = 'miniflux_offline_client'

// Once the SW is installed, cache files for offline use.
self.addEventListener("install", (e) => {
  console.log("Service Worker Install event fired, caching files.");
  const contentToCache = ['index.html', 'script.js', 'styles.css', '/favicon.png']; // Array of URLs to cache.
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      await cache.addAll(contentToCache);
    })()
  );
});