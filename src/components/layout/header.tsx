"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, Play } from "lucide-react";
import { Brand } from "./brand";

const links = [
  { href: "/#ufr", label: "Notre UFR" },
  { href: "/#match", label: "MATCH" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#impact", label: "Votre impact" },
];
const moreLinks = [
  { href: "/#projet", label: "Le projet CampusBoost" },
  { href: "/#formations", label: "Les 9 formations" },
  { href: "/#projets", label: "Les idées pédagogiques" },
  { href: "/#temoignages", label: "Les parcours" },
  { href: "/#terrain", label: "Salons & rencontres" },
  { href: "/#competitions", label: "Les compétitions" },
  { href: "/#calendrier", label: "La feuille de route" },
  { href: "/#ambassadeurs", label: "Le kit ambassadeur" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const desktopMenu = useRef<HTMLDetailsElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const total = document.documentElement.scrollHeight - innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, scrollY / total)) : 0})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && desktopMenu.current?.open) {
        desktopMenu.current.open = false;
        desktopMenu.current.querySelector("summary")?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (
        desktopMenu.current &&
        !desktopMenu.current.contains(event.target as Node)
      )
        desktopMenu.current.open = false;
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand onNavigate={() => setOpen(false)} />
        <nav className="desktop-nav" aria-label="Navigation principale">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <details className="explore-menu" ref={desktopMenu}>
            <summary>
              Explorer <span aria-hidden="true">+</span>
            </summary>
            <div>
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    if (desktopMenu.current) desktopMenu.current.open = false;
                  }}
                >
                  {link.label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <div className="header-actions">
          <Link
            className={`demo-link${pathname === "/demo" ? " active" : ""}`}
            href="/demo"
          >
            <Play size={13} aria-hidden="true" /> Démo
          </Link>
          <Link
            className="button button-small button-dark header-cta"
            href="/#soutenir"
          >
            Soutenir l’UFR <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="icon-button mobile-toggle"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Navigation mobile"
        >
          {[
            ...links,
            ...moreLinks,
            { href: "/demo", label: "La démonstration" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          ))}
          <Link href="/#soutenir" onClick={() => setOpen(false)}>
            Comment soutenir l’UFR ?
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </nav>
      )}
      <div className="reading-track" aria-hidden="true">
        <div ref={progress} className="reading-progress" />
      </div>
    </header>
  );
}
