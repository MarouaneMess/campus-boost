import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Image
              src="/brand/campus-boost.webp"
              width={140}
              height={94}
              alt="Campus Boost"
            />
            <p>
              Une initiative étudiante.
              <br />
              Des connexions qui font grandir.
            </p>
          </div>
          <div>
            <p className="footer-label">EXPLORER</p>
            <Link href="/#match">Campus Boost MATCH</Link>
            <Link href="/#formations">Les formations</Link>
            <Link href="/#impact">Votre impact</Link>
            <Link href="/demo">La démonstration</Link>
          </div>
          <div>
            <p className="footer-label">ALLER PLUS LOIN</p>
            <a
              href={siteConfig.soltea.ufrUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              L’UFR et les entreprises{" "}
              <ArrowUpRight size={13} aria-hidden="true" />
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
            <a
              href={siteConfig.soltea.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              La plateforme SOLTéA <ArrowUpRight size={13} aria-hidden="true" />
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
            <Link href="/sources">Sources & transparence</Link>
            <Link href="/mentions-legales">Informations sur le site</Link>
          </div>
          <div className="footer-statement">
            <span>Le futur se construit</span>
            <span>
              ensemble<span className="accent">.</span>
            </span>
            <p>
              UFR Mathématiques et Informatique
              <br />
              Université Paris Cité
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Campus Boost · Projet de 7 étudiants</span>
          <span>Site de présentation étudiant · Aucune collecte de dons</span>
          <a href="#top">Retour en haut ↑</a>
        </div>
      </div>
    </footer>
  );
}
