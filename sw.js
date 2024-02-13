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
      '/noto_sans/NotoSans-Regular.ttf',
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
      'platesAndWeight/', // Begin plates and weights
      'platesAndWeight/index.html',
      'platesAndWeight/styles.css',
      'platesAndWeight/script.js',
      'platesAndWeight/barbell%20512x512.png'
    ]);
  },),);
});

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);