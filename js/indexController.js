navigator.serviceWorker.register('/sw.js')
.then(function(reg) {
    console.log('Service Worker Registered!');
}).catch(function(err) {
    console.log('Failed!');
})