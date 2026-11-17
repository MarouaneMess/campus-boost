"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { skillById } from "@/data/skills";
import { SectionHeading, SectorIcon } from "@/components/ui";

export function Projects() {
  const [allVisible, setAllVisible] = useState(false);
  return (
    <section
      id="projets"
      className="section projects-section"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="LES PROJETS PÉDAGOGIQUES"
          id="projects-title"
          title={
            <>
              Et si leurs idées
              <br />
              <em>prenaient leur envol ?</em>
            </>
          }
          description="Des scénarios pour se projeter dans l’apprentissage. Ces exemples sont des propositions à valider avec l’UFR, sans résultat ni partenariat revendiqué."
        />
        <div className="projects-grid">
          {projects.map((project, i) => (
            <article
              id={`projet-${project.id}`}
              key={project.id}
              className={`project-card project-card-${project.icon} ${i > 2 && !allVisible ? "extra-project" : ""}`}
            >
              <div className="project-art" aria-hidden="true">
                <div className="project-grid-bg" />
                <svg viewBox="0 0 360 170" className="project-trajectory">
                  <path d="M-20 130 C80 130 40 20 180 90 S290 20 380 35" />
                  <path d="M-10 145 C100 150 85 55 180 100 S280 65 380 50" />
                  <circle cx="56" cy="107" r="4" />
                  <circle cx="295" cy="55" r="4" />
                </svg>
                <div className="project-art-icon">
                  <SectorIcon name={project.icon} size={42} />
                </div>
                <span className="project-art-label">
                  EXPLORATION {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="project-copy">
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <details>
                  <summary>
                    Le livrable envisagé{" "}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </summary>
                  <p>{project.deliverable}</p>
                  <div className="skill-tags">
                    {project.skills.map((skill) => (
                      <span key={skill}>{skillById[skill].short}</span>
                    ))}
                  </div>
                </details>
                <span className="proposal-label">
                  Proposition à valider avec l’UFR
                </span>
              </div>
            </article>
          ))}
        </div>
        <button
          type="button"
          className="button button-outline show-more"
          aria-expanded={allVisible}
          onClick={() => setAllVisible(!allVisible)}
        >
          {allVisible
            ? "Voir moins de projets"
            : "Explorer les 8 idées de projets"}
          <ArrowDown size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
