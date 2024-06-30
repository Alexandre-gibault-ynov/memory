import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

// Le contenu de self.__WB_MANIFEST sera injecté par VitePWA
declare let self: ServiceWorkerGlobalScope & { skipWaiting(): void };

// Precacher les fichiers statiques
precacheAndRoute(self.__WB_MANIFEST);

// Nettoyer les anciens caches
cleanupOutdatedCaches();

// Prendre le contrôle des clients immédiatement après l'activation du service worker
self.skipWaiting();
clientsClaim();

// Route pour naviguer dans l'application hors ligne
const handler = new NetworkFirst({
  cacheName: 'memory-cache',
  plugins: [],
});

// Navigation fallback pour gérer la navigation
const navigationRoute = new NavigationRoute(handler);
registerRoute(navigationRoute);
