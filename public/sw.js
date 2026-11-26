/* Cache exclusivement local : aucun service tiers, aucune donnée d’entreprise. */
const CACHE = "campus-boost-demo-v4";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(
            (key) => key.startsWith("campus-boost-demo-") && key !== CACHE,
          )
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});
self.addEventListener("message", (event) => {
  if (event.data?.type !== "CACHE_DEMO") return;
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE);
        const urls = event.data.urls.filter((value) => {
          const url = new URL(value, self.location.origin);
          return (
            url.origin === self.location.origin &&
            (url.pathname === "/demo" ||
              url.pathname.startsWith("/_next/static/") ||
              url.pathname.startsWith("/brand/"))
          );
        });
        const results = await Promise.all(
          urls.map(async (url) => {
            try {
              const response = await fetch(url, { cache: "reload" });
              if (!response.ok) return false;
              await cache.put(url, response);
              return true;
            } catch {
              return Boolean(await cache.match(url));
            }
          }),
        );
        event.ports[0]?.postMessage({
          ready: results.every(Boolean) && Boolean(await cache.match("/demo")),
        });
      } catch {
        event.ports[0]?.postMessage({ ready: false });
      }
    })(),
  );
});
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin)
    return;
  // Une réponse RSC ne doit jamais être confondue avec le document HTML de /demo.
  if (
    event.request.mode === "navigate" &&
    url.pathname.replace(/\/$/, "") === "/demo"
  ) {
    event.respondWith(
      fetch(event.request).catch(
        async () => (await caches.match("/demo")) || Response.error(),
      ),
    );
  } else if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/brand/")
  ) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        const response = await fetch(event.request);
        if (response.ok) {
          const cache = await caches.open(CACHE);
          await cache.put(event.request, response.clone());
        }
        return response;
      })(),
    );
  }
});
