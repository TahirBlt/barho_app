// Installationsphase: Ressourcen cachen
self.addEventListener('install', (event) => {
    console.log('Service Worker installiert');
    event.waitUntil(
        caches.open('pwa-cache').then((cache) => {
            return cache.addAll([
                '/',  // Startseite
                '/index.html',  // Hauptseite
                '/manifest.json',  // Manifest
                '/icon.png',  // App-Icon
                'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css', // Tailwind CSS
            ]);
        })
    );
});

// Aktivierungsphase: Alte Caches löschen (falls nötig)
self.addEventListener('activate', (event) => {
    console.log('Service Worker aktiviert');
    const cacheWhitelist = ['pwa-cache'];  // Liste der Caches, die wir behalten möchten
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);  // Löscht alte Caches
                    }
                })
            );
        })
    );
});

// Abrufen von Anfragen: Von Cache bedienen oder vom Netz holen
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);  // Wenn vorhanden, aus Cache bedienen, andernfalls aus Netz
        })
    );
});
