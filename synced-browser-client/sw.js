const CACHE = "synced-browser-cache";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

self.addEventListener("sync", (event) => {
  if (event.tag == "send-message") {
    postUrl();
    console.log("postUrl() ran");
    event.waitUntil(sendMessage());
  }
});

const postUrl = async () => {
  let url = document.getElementById("urlInput").value;
  let response = await fetch(url, { method: 'POST' })
}