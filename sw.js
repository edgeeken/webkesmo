const CACHE_NAME = 'web-kesmo-v1';
const urlsToCache = [
  './',
  './index.html',
  './icon.svg',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/three@0.156.1/build/three.module.js',
  'https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/controls/OrbitControls.js',
  'https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/controls/TransformControls.js',
  'https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/postprocessing/EffectComposer.js',
  'https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/postprocessing/RenderPass.js',
  'https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/postprocessing/ShaderPass.js',
  'https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/helpers/ViewHelper.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://unpkg.com/es-module-shims@1.8.0/dist/es-module-shims.js'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
