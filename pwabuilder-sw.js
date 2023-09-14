importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');


const CACHE_NAME = "pwabuilder-page";
const OFFLINE_PAGE = "index.html";
const OFFLINE_PAGE3 = "index.js";
const OFFLINE_PAGE2 = "style.css";
const OFFLINE_PAGE4 = "guardarensesion.php";
const OFFLINE_PAGE5 = "conexion.php"

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});


workbox.precaching.precacheAndRoute([
  { url: OFFLINE_PAGE, revision: null }, 
]);

workbox.precaching.precacheAndRoute([
  { url: OFFLINE_PAGE2, revision: null }, 
]);

workbox.precaching.precacheAndRoute([
  { url: OFFLINE_PAGE3, revision: null }, 
]);

workbox.precaching.precacheAndRoute([
  {url: OFFLINE_PAGE4, revision: null},
]);

workbox.precaching.precacheAndRoute([
  { url: OFFLINE_PAGE5, revision: null }, 
]);

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting()); // Activa inmediatamente el nuevo Service Worker.
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim()); // Toma el control de las páginas abiertas sin recargar.
});


self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);

        // Si la solicitud en línea es exitosa, actualiza la caché con la respuesta.
        if (networkResp && networkResp.status === 200) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request.url, networkResp.clone());
        }

        return networkResp;
      } catch (error) {
        const cache = await caches.open(CACHE_NAME);
        const cachedResp = await cache.match(event.request) || await cache.match(OFFLINE_PAGE);

        if (cachedResp) {
          return cachedResp;
        } else {
          
          return new Response("No tienes conexión a Internet. Por favor, inténtalo de nuevo más tarde.", { status: 404, statusText: "Not Found" });
        }
      }
    })());
  }
});



