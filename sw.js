const CACHE = "root-cache";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open("CACHE").then((cache) => {
    cache.addAll([
      '/', // Begin main page
      '/index.html',
      '/styles_dark.css',
      '/noto_sans/NotoSans-VariableFont_wdth,wght.ttf',
      '/noto_sans/NotoSans-Italic-VariableFont_wdth,wght.ttf',
      '/favicon.svg',
      '/tip_calculator/', // Begin Tip Calculator
      '/tip_calculator/index.html',
      '/tip_calculator/styles.css',
      '/tip_calculator/darkTheme.css',
      '/tip_calculator/script.js',
      '/tip_calculator/tipCalculatorIcon_128x128.png',
      '/redditSearch/', // Begin Reddit Search Generator
      '/redditSearch/index.html',
      '/redditSearch/redditSearch.js',
      '/twitternitter/', // Begin twitternitter
      '/twitternitter/index.html',
      '/twitternitter/styles.css',
      '/twitternitter/twitternitter.js',
      '/bettingOddsTranslator/', // Begin betting odds
      '/bettingOddsTranslator/index.html',
      '/bettingOddsTranslator/bettingOddsTranslator.js',
      '/platesAndWeight/', // Begin plates and weights
      '/platesAndWeight/index.html',
      '/platesAndWeight/styles.css',
      '/platesAndWeight/script.js',
      '/platesAndWeight/barbell%20512x512.png',
      '/filename-fixer/index.html', // Begin filename fixer
      '/filename-fixer/script.js',
      '/internet-access-checker-notifier/', // Begin Internet Access Checker
      '/internet-access-checker-notifier/styles.css',
      '/internet-access-checker-notifier/script.js',
      '/internet-access-checker-notifier/ph--cell-signal-full-bold.svg'
    ]);
  },),);
});

workbox.routing.registerRoute(({ url, request, event }) => {
  console.log(`workbox URL: ${url}`);
  /*if (url.includes(`internet-access-checker-notifier`)) { // commented out because url.includes was throwing an error.
    return false // Exclude all IACN files, the few that should be cached will be handled by their own service worker.
  } else*/ return true // Cache everything else.
},
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);