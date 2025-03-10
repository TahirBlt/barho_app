if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('Service Worker registriert mit Erfolg:', registration);
        }).catch(function(error) {
            console.log('Service Worker Registrierung fehlgeschlagen:', error);
        });
    });
}
