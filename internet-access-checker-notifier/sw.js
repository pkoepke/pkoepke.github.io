// This is the `Offline copy of pages` service worker

const CACHE = `internet-access-checker-and-notifier`;

importScripts(`https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js`);

self.addEventListener(`message`, (event) => {
  if (event.data && event.data.type === `SKIP_WAITING`) {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  //new RegExp(`/*`),
  `index.html`,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

workbox.routing.registerRoute(({ url, request, event }) => {
  console.log(`workbox URL: ${url}`);
  if (url.includes(`index.html`) || url.includes(`script.js`) || url.includes(`styles.css`)) {
    return true
  } else return false
},
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);