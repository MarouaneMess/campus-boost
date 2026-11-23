"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Download, WifiOff } from "lucide-react";

export function OfflineStatus() {
  const [status, setStatus] = useState("Chargement des ressources locales…");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const timeout = setTimeout(
        () =>
          setStatus(
            "Démo locale · Mode hors ligne complet avec npm run build puis npm start",
          ),
        0,
      );
      return () => clearTimeout(timeout);
    }
    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    async function prepare() {
      if (!("serviceWorker" in navigator)) {
        setStatus(
          "Démo locale · Cache hors ligne non pris en charge par ce navigateur",
        );
        return;
      }
      try {
        await navigator.serviceWorker.register("/sw.js", { scope: "/" });
        const registration = await navigator.serviceWorker.ready;
        await document.fonts.ready;
        // Les modules de toutes les étapes sont importés par la page dès son chargement.
        const resources = new Set([
          "/demo",
          "/brand/campus-boost.webp",
          "/brand/universite-paris-cite.png",
          "/brand/icon.png",
          "/brand/favicon.png",
        ]);
        performance.getEntriesByType("resource").forEach((entry) => {
          const url = new URL(entry.name);
          if (
            url.origin === location.origin &&
            (url.pathname.startsWith("/_next/static/") ||
              url.pathname.startsWith("/brand/"))
          )
            resources.add(url.pathname);
        });
        document
          .querySelectorAll<HTMLScriptElement | HTMLLinkElement>(
            "script[src], link[rel=stylesheet], link[rel=preload]",
          )
          .forEach((element) => {
            const value =
              element instanceof HTMLScriptElement ? element.src : element.href;
            const url = new URL(value, location.origin);
            if (
              url.origin === location.origin &&
              url.pathname.startsWith("/_next/static/")
            )
              resources.add(url.pathname);
          });
        const channel = new MessageChannel();
        channel.port1.onmessage = (event) => {
          if (disposed) return;
          clearTimeout(timer);
          setReady(Boolean(event.data.ready));
          setStatus(
            event.data.ready
              ? "Démo prête hors ligne"
              : "Cache incomplet · Gardez le serveur local accessible",
          );
          channel.port1.close();
        };
        timer = setTimeout(() => {
          if (!disposed)
            setStatus("Préparation hors ligne incomplète · Rechargez la page");
        }, 30000);
        registration.active?.postMessage(
          { type: "CACHE_DEMO", urls: [...resources] },
          [channel.port2],
        );
      } catch {
        if (!disposed)
          setStatus(
            "Cache hors ligne indisponible · Démo accessible sur le serveur local",
          );
      }
    }
    void prepare();
    return () => {
      disposed = true;
      clearTimeout(timer);
    };
  }, []);
  const Icon = ready
    ? CheckCircle2
    : status.includes("indisponible")
      ? WifiOff
      : Download;
  return (
    <span className={`offline-status ${ready ? "ready" : ""}`} role="status">
      <Icon size={14} aria-hidden="true" />
      {status}
    </span>
  );
}
