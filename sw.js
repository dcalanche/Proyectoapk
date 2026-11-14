const CACHE_NAME = "tecnocampus-cache-v1";
const urlsToCache = [
  "./index.html",
  "./estudiante.html",
  "./curso.html",
  "./curso-detalle.html",
  "./modulo.html",
  "./evaluacion.html",
  "./admin.html",
  "./diploma.html",
  "./estilos.css",
  "./main.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
