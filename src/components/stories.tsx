"use client";

import Image from "next/image";
import { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  BriefcaseBusiness,
  Quote,
  ArrowUpRight,
} from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading, ExternalLink } from "@/components/ui";
import type { Testimonial } from "@/types/content";

const categories: { label: string; role: Testimonial["role"] | "all" }[] = [
  { label: "Tous les parcours", role: "all" },
  { label: "Étudiants actuels", role: "Étudiant·e" },
  { label: "Alumni", role: "Diplômé·e" },
  { label: "Enseignants", role: "Enseignant·e" },
];

export function Stories() {
  const [category, setCategory] = useState<Testimonial["role"] | "all">("all");
  const icons = {
    "Étudiant·e": GraduationCap,
    "Enseignant·e": BookOpen,
    "Diplômé·e": BriefcaseBusiness,
  };
  const visible = testimonials.filter(
    (story) => category === "all" || story.role === category,
  );
  const approvedCount = testimonials.filter(
    (story) =>
      story.status === "approved" &&
      story.consentDate &&
      story.name &&
      story.quote,
  ).length;
  return (
    <section
      id="temoignages"
      className="section stories-section"
      aria-labelledby="stories-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="LES VOIX DU CAMPUS"
          id="stories-title"
          title={
            <>
              Derrière les compétences,
              <br />
              <em>des parcours.</em>
            </>
          }
          description="Étudiants, enseignants, diplômés : trois regards que nous souhaitons faire entendre dans la suite du projet."
        />
        <div
          className="filter-tabs wrap-filters"
          role="group"
          aria-label="Filtrer les témoignages par catégorie"
        >
          {categories.map((item) => (
            <button
              type="button"
              key={item.role}
              className={category === item.role ? "active" : ""}
              aria-pressed={category === item.role}
              onClick={() => setCategory(item.role)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="filter-result" role="status">
          {visible.length} parcours à découvrir
        </p>
        <div className="stories-grid">
          {visible.map((story) => {
            const Icon = icons[story.role];
            const approved =
              story.status === "approved" &&
              story.consentDate &&
              story.name &&
              story.quote;
            return (
              <article className="story-card" key={story.id}>
                <div className="story-top">
                  <span className="story-avatar">
                    {approved && story.photo ? (
                      <Image
                        src={story.photo}
                        alt={story.name!}
                        width={48}
                        height={48}
                      />
                    ) : (
                      <Icon size={23} aria-hidden="true" />
                    )}
                  </span>
                  <span>{story.role}</span>
                  <Quote size={20} aria-hidden="true" />
                </div>
                <h3>{story.title}</h3>
                {approved ? (
                  <>
                    <blockquote>{story.quote}</blockquote>
                    <p>{story.name}</p>
                    {story.function && (
                      <p className="small muted">{story.function}</p>
                    )}
                    {story.program && (
                      <p className="small-label">{story.program}</p>
                    )}
                    {story.journey && <p>{story.journey}</p>}
                    {story.video && (
                      <video
                        controls
                        preload="none"
                        src={story.video}
                        aria-label={`Témoignage de ${story.name}`}
                      >
                        {story.subtitles && (
                          <track
                            default
                            kind="captions"
                            src={story.subtitles}
                            srcLang="fr"
                            label="Français"
                          />
                        )}
                      </video>
                    )}
                    {story.linkedin && (
                      <ExternalLink href={story.linkedin}>
                        Retrouver ce parcours sur LinkedIn
                      </ExternalLink>
                    )}
                  </>
                ) : (
                  <>
                    <p>{story.description}</p>
                    <span className="story-placeholder">
                      Carte de démonstration · Témoignage à recueillir
                    </span>
                  </>
                )}
              </article>
            );
          })}
        </div>
        <p className="method-note">
          {approvedCount === 0
            ? "Aucun témoignage réel n’est encore reproduit. Les cartes de démonstration restent visibles jusqu’à réception de contenus autorisés."
            : "Les témoignages identifiés comme réels sont publiés avec l’accord des personnes concernées. Les autres emplacements restent signalés."}
        </p>
        <div className="section-endnote">
          <a href="/entreprises#match" className="text-link">
            Explorez les compétences de notre UFR{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href="#ambassadeurs" className="text-link">
            Partager votre parcours{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
