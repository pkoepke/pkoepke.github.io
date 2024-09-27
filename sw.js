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

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(cacheName);
  for (const resource of resources) {
    try { await cache.add(resource); } catch (e) { console.error(e) } // when using cache.addAll, a single 404 will stop the whole proces. Doing it one by one and catching errors allows the browser to cache anything that succeeds even if there are failures.
  }
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      '/bettingOddsTranslator/bettingOddsTranslator.js',
      '/bettingOddsTranslator/index.html',
      '/favicon 512x512.png',
      '/favicon old black on white.png',
      '/favicon.png',
      '/favicon.svg',
      '/filename-fixer/content_copy_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg',
      '/filename-fixer/index.html',
      '/filename-fixer/script.js',
      '/icons/favicon 128x128.png',
      '/icons/favicon 512x512.png',
      '/icons/favicon maskable.png',
      '/index.html',
      '/internet-access-checker-notifier/index.html',
      '/internet-access-checker-notifier/manifest.json',
      '/internet-access-checker-notifier/material-symbols--signal-cellular-alt.png',
      '/internet-access-checker-notifier/material-symbols--signal-cellular-alt.svg',
      '/internet-access-checker-notifier/script.js',
      '/internet-access-checker-notifier/styles.css',
      '/manifest.json',
      '/noto_sans/NotoSans-Italic-VariableFont_wdth,wght.ttf',
      '/noto_sans/NotoSans-VariableFont_wdth,wght.ttf',
      '/platesAndWeight/barbell 512x512.png',
      '/platesAndWeight/barbell maskable icon.png',
      '/platesAndWeight/barbell monochrome icon.png',
      '/platesAndWeight/barbell.svg',
      '/platesAndWeight/index.html',
      '/platesAndWeight/manifest.json',
      '/platesAndWeight/plates and weight screenshot desktop and large tablet view.png',
      '/platesAndWeight/plates and weights calculator mobile 1 for Windows store.png',
      '/platesAndWeight/plates and weights calculator mobile 1.png',
      '/platesAndWeight/plates and weights calculator mobile 2.png',
      '/platesAndWeight/script.js',
      '/platesAndWeight/styles.css',
      '/platesAndWeight/sw.js',
      '/redditSearch/index.html',
      '/redditSearch/redditSearch.js',
      '/styles_dark.css',
      '/tip_calculator/darkTheme.css',
      '/tip_calculator/index.html',
      '/tip_calculator/lightTheme.css',
      '/tip_calculator/manifest.json',
      '/tip_calculator/screenshots/Pixel 3 XL dark mode.png',
      '/tip_calculator/script.js',
      '/tip_calculator/styles.css',
      '/tip_calculator/sw.js',
      '/tip_calculator/tip calculator icon 512x512 maskable.png',
      '/tip_calculator/tipCalculatorIcon.xcf',
      '/tip_calculator/tipCalculatorIcon_128x128.png',
      '/tip_calculator/tipCalculatorIcon_32X32.png',
      '/tip_calculator/tipCalculatorIcon_512x512.png',
      '/tip_calculator/tipCalculatorIcon_512x512.svg',
      '/tip_calculator/tipCalculatorIcon_64x64.png',
      '/tip_calculator/tip_calculator.html',
      '/twitternitter/index.html',
      '/twitternitter/styles.css',
      '/twitternitter/twitternitter.js',
      '/unitpricecomparison/.DS_Store',
      '/unitpricecomparison/.last_build_id',
      '/unitpricecomparison/assets/AssetManifest.bin',
      '/unitpricecomparison/assets/AssetManifest.bin.json',
      '/unitpricecomparison/assets/AssetManifest.json',
      '/unitpricecomparison/assets/FontManifest.json',
      '/unitpricecomparison/assets/NOTICES',
      '/unitpricecomparison/assets/fonts/MaterialIcons-Regular.otf',
      '/unitpricecomparison/assets/fonts/NotoSans-Italic-VariableFont_wdth,wght.ttf',
      '/unitpricecomparison/assets/fonts/NotoSans-VariableFont_wdth,wght.ttf',
      '/unitpricecomparison/assets/shaders/ink_sparkle.frag',
      '/unitpricecomparison/canvaskit/canvaskit.js',
      '/unitpricecomparison/canvaskit/canvaskit.wasm',
      '/unitpricecomparison/canvaskit/chromium/canvaskit.js',
      '/unitpricecomparison/canvaskit/chromium/canvaskit.wasm',
      '/unitpricecomparison/canvaskit/skwasm.js',
      '/unitpricecomparison/canvaskit/skwasm.wasm',
      '/unitpricecomparison/canvaskit/skwasm.worker.js',
      '/unitpricecomparison/favicon.png',
      '/unitpricecomparison/flutter.js',
      '/unitpricecomparison/flutter_service_worker.js',
      '/unitpricecomparison/icons/Icon-192.png',
      '/unitpricecomparison/icons/Icon-512.png',
      '/unitpricecomparison/icons/Icon-maskable-192.png',
      '/unitpricecomparison/icons/Icon-maskable-512.png',
      '/unitpricecomparison/index.html',
      '/unitpricecomparison/main.dart.js',
      '/unitpricecomparison/manifest.json',
      '/unitpricecomparison/sw.js',
      '/unitpricecomparison/version.json',
      '/unitpricecomparison - sept 12 2023, the last good version/favicon.png',
      '/unitpricecomparison-wasm/favicon.png',
      '/',
      '/bettingOddsTranslator/',
      '/filename-fixer/',
      '/pkoepke.github.io/icons/',
      '/internet-access-checker-notifier/',
      '/noto_sans/',
      '/platesAndWeight/',
      '/redditSearch/',
      '/tip_calculator/',
      '/twitternitter/',
      '/unitpricecomparison/'
    ]),
  );
});

const putInCache = async (request, response) => {
  if (request.url.includes('internet-access-checker-notifier/test-files') // Don't cache Internet Access Checker test files.
  ) {
    return;
  } else {
    const cache = await caches.open(cacheName);
    cache.put(request, response);
  }
};

const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    setTimeout(async () => { // Check for updates and add them to the cache, but don't wait for the response - serve the cached version.
      const responseFromNetwork = await fetch(request, { cache: "reload" });
      await putInCache(request, responseFromNetwork.clone());
    });
    return responseFromCache;
  }
  const responseFromNetwork = await fetch(request);
  putInCache(request, responseFromNetwork.clone());
  return responseFromNetwork;
};

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});
