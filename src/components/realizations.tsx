"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, CheckCircle2, Code2, X } from "lucide-react";
import { publishedRealizations, projectDomains } from "@/data/realizations";
import { skillById } from "@/data/skills";
import { SectionHeading, ExternalLink } from "@/components/ui";
import type { ProjectDomain, StudentRealization } from "@/types/content";

export function Realizations() {
  const [filter, setFilter] = useState<ProjectDomain | "all">("all");
  const [active, setActive] = useState<StudentRealization | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = publishedRealizations.filter(
    (project) => filter === "all" || project.domains.includes(filter),
  );
  useEffect(() => {
    if (active) dialog.current?.showModal();
    else dialog.current?.close();
  }, [active]);
  useEffect(() => {
    const showLinkedProject = () => {
      const project = publishedRealizations.find(
        (item) => location.hash === `#realisation-${item.id}`,
      );
      if (project) {
        setFilter("all");
        setActive(project);
      }
    };
    window.addEventListener("hashchange", showLinkedProject);
    const timer = window.setTimeout(showLinkedProject, 0);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", showLinkedProject);
    };
  }, []);
  function close() {
    dialog.current?.close();
    setActive(null);
    if (location.hash.startsWith("#realisation-"))
      history.replaceState(null, "", "#realisations");
  }
  return (
    <section
      id="realisations"
      className="section realizations-section"
      aria-labelledby="realizations-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="RÉALISATIONS ÉTUDIANTES"
          id="realizations-title"
          title={
            <>
              De l’idée au projet.
              <br />
              <em>Du concret à partager.</em>
            </>
          }
          description="Des travaux réellement développés, accompagnés d’une source et d’un aperçu. Cette vitrine s’enrichira avec les projets et les accords de leurs équipes."
        />
        <div
          className="filter-tabs wrap-filters"
          role="group"
          aria-label="Filtrer les réalisations par domaine"
        >
          {[{ id: "all", label: "Tous les domaines" }, ...projectDomains].map(
            (item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={filter === item.id}
                className={filter === item.id ? "active" : ""}
                onClick={() => setFilter(item.id as ProjectDomain | "all")}
              >
                {item.label}
              </button>
            ),
          )}
        </div>
        <p className="filter-result" role="status">
          {visible.length} réalisation
          {visible.length === 1 ? " documentée" : "s documentées"}
        </p>
        {visible.length ? (
          <div className="realizations-grid">
            {visible.map((project) => (
              <article
                className="realization-card"
                id={`realisation-${project.id}`}
                key={project.id}
              >
                <button
                  type="button"
                  className="realization-open"
                  onClick={() => setActive(project)}
                  aria-label={`Découvrir la réalisation : ${project.title}`}
                  aria-haspopup="dialog"
                >
                  <div className="realization-image">
                    <Image
                      src={project.images[0].src}
                      alt={project.images[0].alt}
                      width={1200}
                      height={720}
                      sizes="(max-width: 760px) 100vw, 55vw"
                    />
                    <span className="documented-label">
                      <CheckCircle2 size={14} aria-hidden="true" /> Réalisation
                      documentée
                    </span>
                  </div>
                  <div className="realization-copy">
                    <span className="small-label">{project.formation}</span>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <div className="skill-tags">
                      {project.technologies.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <span className="text-link">
                      Explorer le projet{" "}
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </div>
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Code2 size={30} aria-hidden="true" />
            <h3>La prochaine réalisation reste à documenter.</h3>
            <p>
              Aucun projet réel publié pour ce domaine. Les propositions
              pédagogiques ci-dessous donnent des pistes à explorer.
            </p>
            <a href="#sujets" className="text-link">
              Découvrir les idées de projets{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        )}
        <div className="section-endnote">
          <p>
            Vous avez un projet à partager ? Préparez une description, une
            démonstration et l’accord de l’équipe avec le kit ambassadeur.
          </p>
          <a className="text-link" href="/ambassadeurs#ambassadeurs">
            Préparer une présentation{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {active && (
          <div className="project-dialog-content">
            <button
              type="button"
              className="icon-button dialog-close"
              onClick={close}
              autoFocus
              aria-label="Fermer la présentation du projet"
            >
              <X size={22} />
            </button>
            <p className="eyebrow">
              <span /> RÉALISATION DOCUMENTÉE
            </p>
            <h2 id="project-dialog-title">{active.title}</h2>
            <p className="muted">{active.formation}</p>
            {active.images.map((picture) => (
              <figure key={picture.src}>
                <Image
                  src={picture.src}
                  alt={picture.alt}
                  width={1200}
                  height={720}
                  sizes="(max-width: 760px) 90vw, 800px"
                />
                <figcaption>{picture.alt}</figcaption>
              </figure>
            ))}
            <div className="project-detail-grid">
              <div>
                <h3>La problématique</h3>
                <p>{active.problem}</p>
                <h3>Le résultat</h3>
                <p>{active.result}</p>
              </div>
              <div>
                <h3>Technologies</h3>
                <div className="skill-tags">
                  {active.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <h3>Compétences mobilisées</h3>
                <div className="skill-tags">
                  {active.skills.map((skill) => (
                    <span key={skill}>{skillById[skill].name}</span>
                  ))}
                </div>
                <h3>L’équipe</h3>
                <p>{active.teamLabel}</p>
                {active.participants
                  ?.filter((person) => person.consentDate)
                  .map((person) => (
                    <p key={person.name}>{person.name}</p>
                  ))}
              </div>
            </div>
            {active.video && (
              <video
                controls
                preload="none"
                src={active.video}
                aria-label={`Démonstration de ${active.title}`}
              >
                {active.subtitles && (
                  <track
                    default
                    kind="captions"
                    src={active.subtitles}
                    srcLang="fr"
                    label="Français"
                  />
                )}
              </video>
            )}
            <div className="dialog-actions">
              {active.demo &&
                (active.demo.startsWith("/") ? (
                  <Link
                    className="button button-primary"
                    href={active.demo}
                    onClick={close}
                  >
                    Voir la démonstration{" "}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                ) : (
                  <ExternalLink
                    className="button button-primary"
                    href={active.demo}
                  >
                    Voir la démonstration
                  </ExternalLink>
                ))}
              {active.repository && (
                <ExternalLink href={active.repository}>
                  Consulter le code public
                </ExternalLink>
              )}
              <a className="text-link" href="#formations" onClick={close}>
                Découvrez les formations associées{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <p className="method-note">
              Source :{" "}
              <a
                href={active.evidence.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {active.evidence.label} (nouvel onglet)
              </a>
              . Le projet est présenté par son équipe ; aucune validation
              institutionnelle ni distinction n’est revendiquée.
            </p>
          </div>
        )}
      </dialog>
    </section>
  );
}
