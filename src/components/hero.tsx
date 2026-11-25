import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  GraduationCap,
  Sparkles,
  Braces,
  Lightbulb,
} from "lucide-react";
import { NetworkVisual } from "@/components/3d/network-visual";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="initiative-label">
            <span className="status-dot" /> UNE INITIATIVE ÉTUDIANTE, UNE
            AMBITION COLLECTIVE
          </div>
          <p className="hero-kicker">CAMPUS BOOST</p>
          <h1 id="hero-title">
            Investissez dans
            <br />
            les talents de
            <br />
            <em>demain.</em>
            <span className="hero-spark" aria-hidden="true">
              ✳
            </span>
          </h1>
          <p className="hero-description">
            Découvrez comment votre taxe d’apprentissage peut contribuer à
            développer les compétences scientifiques et numériques de demain au
            sein de l’UFR Mathématiques et Informatique de l’Université Paris
            Cité.
          </p>
          <div className="hero-buttons">
            <a href="#match" className="button button-primary">
              Découvrir Campus Boost MATCH{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a href="#formations" className="button button-outline">
              Nos formations <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <a href="#soutenir" className="hero-tertiary">
            Comprendre la taxe d’apprentissage{" "}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
        <div
          className="hero-art"
          role="group"
          aria-label="Campus Boost connecte les entreprises, l’université, les étudiants, les compétences et l’innovation"
        >
          <div className="art-coordinate coordinate-top">
            FIG. 01 — L’ÉCOSYSTÈME CAMPUS BOOST
          </div>
          <NetworkVisual />
          <div className="orbit-label orbit-enterprise">
            <Building2 size={19} aria-hidden="true" />
            <div>
              <small>VOTRE ENTREPRISE</small>
              <strong>Une vision d’avenir</strong>
            </div>
            <span className="orbit-dot" />
          </div>
          <div className="orbit-label orbit-students">
            <GraduationCap size={20} aria-hidden="true" />
            <div>
              <small>LES ÉTUDIANTS</small>
              <strong>Le potentiel de demain</strong>
            </div>
          </div>
          <div className="orbit-label orbit-skills">
            <Braces size={18} aria-hidden="true" />
            <span>Les compétences</span>
          </div>
          <div className="orbit-label orbit-innovation">
            <Lightbulb size={18} aria-hidden="true" />
            <span>L’innovation</span>
          </div>
          <div className="core-caption">
            <span>CAMPUS BOOST</span>
            <small>LE POINT DE CONNEXION</small>
          </div>
          <div className="art-footnote">
            <span className="live-dot" /> Les connexions d’aujourd’hui font les
            talents de demain.
          </div>
        </div>
      </div>
      <div className="container hero-bottom">
        <a href="#ufr">
          <ArrowDown size={17} aria-hidden="true" />
          <span>L’avenir commence ici</span>
        </a>
        <div>
          <span>MATHÉMATIQUES</span>
          <span className="ribbon-plus">+</span>
          <span>INFORMATIQUE</span>
          <span className="ribbon-plus">=</span>
          <span>
            DE NOUVELLES POSSIBILITÉS <Sparkles size={14} aria-hidden="true" />
          </span>
        </div>
        <Link href="/demo" className="hero-demo">
          Le projet en 3 minutes <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
