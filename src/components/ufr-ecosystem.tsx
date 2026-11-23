"use client";

import { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { ufrActors } from "@/data/ufr";
import { SectionHeading, ExternalLink } from "@/components/ui";

const icons = {
  students: GraduationCap,
  teachers: BookOpen,
  alumni: BriefcaseBusiness,
  companies: Building2,
};

export function UfrEcosystem() {
  const [selected, setSelected] = useState(0);
  const actor = ufrActors[selected];
  return (
    <section
      id="ufr"
      className="section ufr-section"
      aria-labelledby="ufr-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="NOTRE UFR, NOTRE POINT DE RENCONTRE"
          id="ufr-title"
          title={
            <>
              Les savoirs se croisent.
              <br />
              <em>Les parcours se construisent.</em>
            </>
          }
          description="Composante d’Université Paris Cité, l’UFR Mathématiques et Informatique associe formation, recherche et ouverture vers les métiers. CampusBoost est une initiative de ses étudiants de M1 MIAGE."
        />
        <div className="ecosystem-layout">
          <div className="ecosystem-map">
            <svg
              className="ecosystem-lines"
              viewBox="0 0 600 360"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M145 75L300 180L455 75M145 285L300 180L455 285" />
            </svg>
            <div className="ecosystem-hub" aria-hidden="true">
              <span>UFR</span>
              <strong>
                Mathématiques
                <br />& Informatique
              </strong>
              <small>UNIVERSITÉ PARIS CITÉ</small>
            </div>
            <div
              className="ecosystem-actors"
              role="group"
              aria-label="Explorer la communauté de l’UFR"
            >
              {ufrActors.map((item, index) => {
                const Icon = icons[item.icon];
                return (
                  <button
                    type="button"
                    key={item.id}
                    aria-pressed={selected === index}
                    aria-controls="ecosystem-detail"
                    className={`ecosystem-actor actor-${item.id} ${selected === index ? "selected" : ""}`}
                    onClick={() => setSelected(index)}
                  >
                    <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
                    <strong>{item.label}</strong>
                    <span>{item.verb}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div
            id="ecosystem-detail"
            className="ecosystem-detail"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="small-label">
              {String(selected + 1).padStart(2, "0")} / QUATRE REGARDS, UNE
              COMMUNAUTÉ
            </span>
            <h3>{actor.label}</h3>
            <p>{actor.description}</p>
            <blockquote>{actor.contribution}</blockquote>
            {actor.href.startsWith("https:") ? (
              <ExternalLink href={actor.href}>{actor.cta}</ExternalLink>
            ) : (
              <a className="text-link" href={actor.href}>
                {actor.cta}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
        <div className="section-endnote">
          <p>
            Des mathématiques appliquées aux systèmes d’information : explorez
            les parcours et les compétences qui relient cette communauté.
          </p>
          <a className="text-link" href="#formations">
            Découvrir les 9 formations{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
