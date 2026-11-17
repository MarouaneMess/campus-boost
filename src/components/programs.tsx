"use client";

import { useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { programs } from "@/data/programs";
import { ProgramCard } from "@/components/match/program-card";
import { SectionHeading } from "@/components/ui";

const filters = ["Toutes", "Informatique", "Mathématiques", "MIAGE"] as const;

export function Programs() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Toutes");
  const [query, setQuery] = useState("");
  const normalize = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const visible = programs.filter((program) => {
    const groupMatches =
      filter === "Toutes" ||
      (filter === "MIAGE"
        ? program.short === "MIAGE"
        : filter === "Mathématiques"
          ? program.mention === "Mathématiques et applications"
          : program.mention === "Informatique" && program.short !== "MIAGE");
    return (
      groupMatches &&
      normalize(
        `${program.name} ${program.short} ${program.description}`,
      ).includes(normalize(query))
    );
  });
  return (
    <section
      id="formations"
      className="section programs-section"
      aria-labelledby="programs-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="LES FORMATIONS"
          id="programs-title"
          title={
            <>
              Des savoirs solides.
              <br />
              <em>Des horizons ouverts.</em>
            </>
          }
          description="Explorez les parcours documentés par l’UFR et leurs compétences. Chaque fiche renvoie vers l’information officielle."
        />
        <div className="program-controls">
          <div
            className="filter-tabs"
            role="group"
            aria-label="Filtrer les formations"
          >
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="search-box">
            <Search size={17} aria-hidden="true" />
            <label className="sr-only" htmlFor="program-search">
              Rechercher une formation
            </label>
            <input
              id="program-search"
              type="search"
              placeholder="Rechercher une formation…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
        <p className="sr-only" role="status">
          {visible.length} formations affichées
        </p>
        {visible.length ? (
          <div className="program-grid catalog-grid">
            {visible.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={30} aria-hidden="true" />
            <h3>Aucune formation pour cette recherche.</h3>
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setFilter("Toutes");
                setQuery("");
              }}
            >
              Réinitialiser les filtres{" "}
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </div>
        )}
        <p className="method-note">
          Une formation proposée et un bénéficiaire habilité sont deux
          informations distinctes. Les badges précisent la source et l’année de
          référence. Le statut en vigueur se vérifie dans SOLTéA.{" "}
          <a href="/sources">Sources & précisions</a>
        </p>
      </div>
    </section>
  );
}
