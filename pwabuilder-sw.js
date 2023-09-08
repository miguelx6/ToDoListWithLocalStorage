importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE_NAME = "pwabuilder-page";
const OFFLINE_PAGE = "index.html";
const OFFLINE_PAGE3 = "index.js";
const OFFLINE_PAGE2 = "style.css";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Precargue los recursos importantes aquí si es necesario
workbox.precaching.precacheAndRoute([
  { url: OFFLINE_PAGE, revision: null }, // Reemplaza null con una revisión adecuada si es necesario
]);

workbox.precaching.precacheAndRoute([
  { url: OFFLINE_PAGE2, revision: null }, // Reemplaza null con una revisión adecuada si es necesario
]);

workbox.precaching.precacheAndRoute([
  { url: OFFLINE_PAGE3, revision: null }, // Reemplaza null con una revisión adecuada si es necesario
]);

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
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
          // Personaliza la respuesta en caso de que no se encuentre en caché ningún recurso
          return new Response("No tienes conexión a Internet. Por favor, inténtalo de nuevo más tarde.", { status: 404, statusText: "Not Found" });
        }
      }
    })());
  }
});



