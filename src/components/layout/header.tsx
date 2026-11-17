"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, Play } from "lucide-react";

const links = [
  { href: "/#projet", label: "Le projet" },
  { href: "/#match", label: "Campus Boost MATCH" },
  { href: "/#impact", label: "Votre impact" },
  { href: "/#formations", label: "Les formations" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
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
        <Link
          href="/"
          className="brand"
          aria-label="Campus Boost — accueil"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/campus-boost.webp"
            width={105}
            height={70}
            priority
            alt="Campus Boost"
          />
          <span className="brand-divider" aria-hidden="true" />
          <span className="university-wordmark">
            UNIVERSITÉ
            <br />
            <strong>PARIS CITÉ</strong>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Navigation principale">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
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
          {links.map((link) => (
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
    </header>
  );
}
