// Following MDN tutorial: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

const cacheName = "root-cache";

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
    console.log(`registerServiceWorker() ran`)
  }
};

registerServiceWorker();

// Gets an array of URLs to cache, and adds them one-by-one to the cache. Used when first populating the cache after the SW 'install' event.
const addResourcesToCache = async (resources) => {
  const cache = await caches.open(cacheName);
  for (const resource of resources) {
    try {
      await cache.add(resource);
    } catch (e) {
      console.error(e)
    } // when using cache.addAll, a single 404 will stop the whole proces. Doing it one by one and catching errors allows the browser to cache anything that succeeds even if there are failures.
  }
};

// Get the JSON list of all resources that should be cached so the whole site is cached as soon as the SW is installed. Otherwise, only pages that the users had visited would be cached, but we want the whole site to work offline as soon as the SW is instlled.
const getResourcesToCache = async () => {
  const response = await fetch(`/sw-files-to-cache.json`);
  const body = await response.json();
  return body;
}

// Used in cacheFirst() to save resources to cache as the user navigates the site.
// Slightly different from addResourcesToCache() - in this case, we already have a response with the resource so we
// don't need to use cache.add() to get the resource, we can save the already-received resource.
const putInCache = async (request, response) => {
  if (request.url.includes('internet-access-checker-notifier/test-files') // Don't cache Internet Access Checker test files.
  ) {
    return;
  } else {
    const cache = await caches.open(cacheName);
    cache.put(request, response);
  }
};

// Try to serve all reqests from cache, but also check for updates every time so the user gets the updated version the next time they visit the page.
const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    setTimeout(async () => { // Check for updates and add them to the cache, but don't wait for the response - serve the cached version right away.
      // const responseFromNetwork = await fetch(request, { cache: "reload" }); // Originally this downloaded the resource every single time, whether it was updated or not. That works find but results in unnecessary downloads every time you visit a page.
      const responseFromNetwork = await fetch(request, { cache: "no-cache" }); // no-cache: if the resource is in the browser cache (whether fresh or stale), the browser makes a conditional request to see if it has been updated. If it has been updated, the browser will download it to the cache. If it has not been updated it will use the cached value.
      await putInCache(request, responseFromNetwork.clone());
    });
    return responseFromCache;
  }
  const responseFromNetwork = await fetch(request);
  putInCache(request, responseFromNetwork.clone());
  return responseFromNetwork;
};

// When the SW is installed, immediately get the JSON list of resources to cache and cache them all so the whole site immediatelyn works offline.
self.addEventListener("install", async (event) => {
  /*event.waitUntil(addResourcesToCache([ // Old way with a manually copy-and-pasted list. removed a bunch of copy and pasted lines from here, just keeping as an example.
  '/bettingOddsTranslator/bettingOddsTranslator.js', '/bettingOddsTranslator/index.html','/favicon old black on white.png','/favicon.png','/','/bettingOddsTranslator/','/filename-fixer/','/internet-access-checker-notifier/','/noto_sans/','/platesAndWeight/','/redditSearch/','/tip_calculator/','/twitternitter/','/unitpricecomparison/'
  ]))*/
  addResourcesToCache(await getResourcesToCache())
});

// Intercept all fetch events and try to server from cache.
self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});
