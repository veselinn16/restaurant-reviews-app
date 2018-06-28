let nameOfCache = 'restaurants-reviews-v1.0';

self.addEventListener('install', function (event) {
    console.log('Worker install event in progress.')
    event.waitUntil(
        caches.open(nameOfCache).then(function (cache) {
            return cache.addAll([
                '/index.html',
                '/restaurant.html',
                'js/main.js',
                'js/dbhelper.js',
                'js/restaurant_info.js',
                'css/styles.css',
                'css/media_queries.css',
                'img/1.jpg',
                'img/2.jpg',
                'img/3.jpg',
                'img/4.jpg',
                'img/5.jpg',
                'img/6.jpg',
                'img/7.jpg',
                'img/8.jpg',
                'img/9.jpg',
                'img/10.jpg'
            ]);
        })
            .then(function () {
                console.log('Installation complete')
            }).catch(function() {
                console.log('Cache install failed!')
            })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('restaurants-reviews') &&
                        cacheName != nameOfCache;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    let requestUrl = new URL(event.request.url);

    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
})