const NAME_OF_CACHE = "restaurants-reviews-v1.0";
let assets = [
  "/index.html",
  "/restaurant.html",
  "js/main.js",
  "js/dbhelper.js",
  "js/restaurant_info.js",
  "css/styles.css",
  "css/media_queries.css",
  "data/restaurants.json",
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
  "img/6.jpg",
  "img/7.jpg",
  "img/8.jpg",
  "img/9.jpg",
  "img/10.jpg"
];

self.addEventListener("install", function(event) {
  console.log("Worker install event in progress.");
  event.waitUntil(
    caches
      .open(NAME_OF_CACHE)
      .then(function(cache) {
        return cache.addAll(assets);
      })
      .then(function() {
        console.log("Installation complete");
      })
      .catch(function() {
        console.log("Cache install failed!");
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(cacheName => {
          if ([NAME_OF_CACHE].indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // if there is such a response in the cache, return it or perform the fetch request normally
      return response || fetch(event.request);
    })
  );
});
