"use client";
import { useState } from "react";
import { projectTopics } from "@/data/project-topics";
import { SectionHeading, ExternalLink } from "./ui";
export function ProjectTopics() {
  const [level, setLevel] = useState("Tous");
  const [formation, setFormation] = useState("Toutes");
  const filtered = projectTopics.filter(
    (topic) =>
      (level === "Tous" || topic.level === level) &&
      (formation === "Toutes" || topic.formation === formation),
  );
  return (
    <section
      id="sujets"
      className="section topics-section"
      aria-labelledby="topics-title"
    >
      <div className="container">
        <SectionHeading
          id="topics-title"
          eyebrow="IDÉES DE PROJETS ÉTUDIANTS"
          title={
            <>
              À chaque formation, <em>des idées de projets.</em>
            </>
          }
          description="Des idées de projets à proposer aux étudiants de L3, M1 et M2, selon leur formation. Choisissez un niveau et une formation pour découvrir les sujets et les livrables possibles."
        />
        <p className="method-note">
          Des pistes à adapter avec les étudiants et leurs enseignants, selon
          les objectifs de la formation.
        </p>
        <div className="topic-controls">
          <div
            className="topic-levels"
            role="group"
            aria-label="Niveau proposé"
          >
            {["Tous", "L3", "M1", "M2"].map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={level === item}
                onClick={() => setLevel(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label>
            Formation
            <select
              aria-label="Formation"
              value={formation}
              onChange={(event) => setFormation(event.target.value)}
            >
              <option>Toutes</option>
              {[...new Set(projectTopics.map((topic) => topic.formation))].map(
                (item) => (
                  <option key={item}>{item}</option>
                ),
              )}
            </select>
          </label>
        </div>
        <p role="status">
          {filtered.length} sujet{filtered.length > 1 ? "s" : ""} proposé
          {filtered.length > 1 ? "s" : ""}
        </p>
        <div className="topic-grid">
          {filtered.map((topic) => (
            <article className="topic-card" key={topic.id}>
              <span className="topic-level">
                {topic.level} · Niveau proposé
              </span>
              <p className="topic-formation">{topic.formation}</p>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <p>
                <strong>Livrable envisagé : </strong>
                {topic.deliverable}
              </p>
              <div className="topic-links">
                <ExternalLink href={topic.source}>
                  Consulter la formation
                </ExternalLink>
              </div>
            </article>
          ))}
        </div>
        {!filtered.length && (
          <div className="empty-state">
            <p>Aucun sujet proposé pour cette combinaison.</p>
            <button
              type="button"
              className="button button-outline"
              onClick={() => {
                setLevel("Tous");
                setFormation("Toutes");
              }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
