"use client";

import { useEffect, useRef } from "react";
import { ImpactSection } from "./impact/impact-section";
import { Roadmap } from "./roadmap";
import { SolteaGuide } from "./soltea-guide";
import { SectionHeading } from "./ui";

export function CompanySupport() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    function revealTarget(hash: string) {
      const target = document.getElementById(hash.slice(1));
      if (!target || !root.current?.contains(target)) return;

      const panel = target.closest(
        "details.support-panel",
      ) as HTMLDetailsElement | null;
      if (panel) {
        panel.open = true;
        requestAnimationFrame(() =>
          target.scrollIntoView({ block: "start", behavior: "auto" }),
        );
      }
    }

    function revealHash() {
      revealTarget(location.hash);
    }

    function followLink(event: MouseEvent) {
      if (
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor = (event.target as Element).closest("a[href]");
      if (!anchor) return;

      const url = new URL(anchor.getAttribute("href")!, location.href);
      if (
        url.origin === location.origin &&
        url.pathname === location.pathname &&
        url.hash
      ) {
        revealTarget(url.hash);
      }
    }

    const timer = window.setTimeout(revealHash, 0);
    window.addEventListener("hashchange", revealHash);
    document.addEventListener("click", followLink, true);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", revealHash);
      document.removeEventListener("click", followLink, true);
    };
  }, []);

  return (
    <section
      id="contribuer"
      className="section company-support"
      ref={root}
      aria-labelledby="company-support-title"
    >
      <div className="container">
        <SectionHeading
          id="company-support-title"
          eyebrow="SOUTENIR LES FORMATIONS"
          title={
            <>
              Votre contribution, <em>étape par étape.</em>
            </>
          }
          description="Ouvrez le repère qui vous intéresse : les échéances, les démarches ou les besoins pédagogiques."
        />
      </div>
      <details className="support-panel">
        <summary>01 · Consulter le calendrier entreprises</summary>
        <Roadmap />
      </details>
      <details className="support-panel">
        <summary>02 · Comprendre les démarches SOLTÉA</summary>
        <SolteaGuide />
      </details>
      <details className="support-panel">
        <summary>03 · Explorer les besoins et le simulateur</summary>
        <ImpactSection />
      </details>
    </section>
  );
}
