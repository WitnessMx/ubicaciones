const mapaPWA = "MapaEIMP";
const assets = [
  "/ubicaciones/",
  "/ubicaciones/index.html",
  "/ubicaciones/src/scripts/app.js",
  "/ubicaciones/src/scripts/leaflet-search.js",
  "/ubicaciones/src/scripts/mapa.js",
  "/ubicaciones/src/UBICACIONES.json",
  "/ubicaciones/src/scripts/leaflet.js",
  "/ubicaciones/src/images/Layout_010221_01.png",
  "/ubicaciones/src/images/loader.gif",
  "/ubicaciones/src/images/search-icon.png",
  "/ubicaciones/src/images/search-icon-mobile.png",
  "/ubicaciones/src/images/marcadores/marcador2.png",
  "/ubicaciones/src/styles/leaflet.css",
  "/ubicaciones/src/styles/leaflet-search.css",
  "/ubicaciones/src/styles/style_calibracion2023.css"

];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(mapaPWA).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
