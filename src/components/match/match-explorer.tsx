"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Network,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { sectors } from "@/data/sectors";
import { projects } from "@/data/projects";
import { skillById } from "@/data/skills";
import { siteConfig } from "@/data/site";
import { publishedRealizations } from "@/data/realizations";
import { impactCategories } from "@/data/impact";
import { getMatches, getRelevantSkills } from "@/lib/matching";
import { SectorIcon, SectionHeading, ExternalLink } from "@/components/ui";
import { ProgramCard } from "./program-card";
import { NetworkVisual } from "@/components/3d/network-visual";
import type { SectorId } from "@/types/content";

export function MatchExplorer() {
  const [choice, setChoice] = useState<{
    sectorId: SectorId;
    needs: string[];
  } | null>(null);
  const [showAll, setShowAll] = useState(false);
  const sectorId = choice?.sectorId;
  const selectedNeeds = choice?.needs ?? [];
  const sector = sectors.find((item) => item.id === sectorId);
  const matches = sector ? getMatches(sector, selectedNeeds) : [];
  const relevantSkills = sector ? getRelevantSkills(sector, selectedNeeds) : [];
  const relatedRealizations = publishedRealizations.filter((item) =>
    item.skills.some((skill) => relevantSkills.includes(skill)),
  );
  const relatedFunding = impactCategories.filter((item) =>
    item.skills.some((skill) => relevantSkills.includes(skill)),
  );
  const project = projects.find((item) => item.id === sector?.projectId);
  const selection = sectors.findIndex((item) => item.id === sectorId);
  function chooseSector(id: SectorId) {
    const nextSector = sectors.find((item) => item.id === id)!;
    setChoice({ sectorId: id, needs: nextSector.needs.map((need) => need.id) });
    setShowAll(false);
  }
  function toggleNeed(id: string) {
    setChoice((current) => {
      // Ignore toute interaction issue d’une ancienne sélection.
      if (
        !current ||
        current.sectorId !== sectorId ||
        !sector?.needs.some((need) => need.id === id)
      )
        return current;
      return {
        ...current,
        needs: current.needs.includes(id)
          ? current.needs.filter((item) => item !== id)
          : [...current.needs, id],
      };
    });
    setShowAll(false);
  }

  return (
    <section
      id="match"
      className="section match-section"
      aria-labelledby="match-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="CAMPUS BOOST MATCH"
          id="match-title"
          title={
            <>
              Votre activité.
              <br />
              Leurs compétences. <em>Le bon match.</em>
            </>
          }
          description="Votre secteur est notre point de départ. Explorez les liens entre vos enjeux métiers et les compétences développées à l’université."
        />
        <div className="match-panel">
          <div className="panel-step-heading">
            <div>
              <span className="step-number">01</span>
              <h3>Quel est votre secteur ?</h3>
            </div>
            <span className="mini-note">
              8 secteurs · Sans compte · En quelques clics
            </span>
          </div>
          <div
            className="sector-grid"
            role="group"
            aria-label="Choisir votre secteur d’activité"
          >
            {sectors.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`sector-button ${sectorId === item.id ? "selected" : ""}`}
                aria-pressed={sectorId === item.id}
                onClick={() => chooseSector(item.id)}
              >
                <SectorIcon name={item.icon} />
                <span>{item.name}</span>
                {sectorId === item.id ? (
                  <Check
                    className="sector-check"
                    size={16}
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowUpRight
                    className="sector-check"
                    size={15}
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>
          <div className="match-content">
            {sector ? (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.16 }}
              >
                <div className="needs-area">
                  <div className="panel-step-heading">
                    <div>
                      <span className="step-number">02</span>
                      <h3>Les enjeux de votre secteur</h3>
                    </div>
                    <button
                      type="button"
                      className="text-link small"
                      onClick={() => chooseSector(sector.id)}
                    >
                      <RotateCcw size={13} aria-hidden="true" /> Tout
                      sélectionner
                    </button>
                  </div>
                  <p>
                    Ajustez les besoins pour affiner les correspondances. Ces
                    exemples sont illustratifs.
                  </p>
                  <div
                    className="need-chips"
                    role="group"
                    aria-label="Besoins métiers"
                  >
                    {sector.needs.map((need) => (
                      <button
                        key={need.id}
                        type="button"
                        aria-pressed={selectedNeeds.includes(need.id)}
                        className={`need-chip ${selectedNeeds.includes(need.id) ? "selected" : ""}`}
                        onClick={() => toggleNeed(need.id)}
                      >
                        <span className="chip-check">
                          {selectedNeeds.includes(need.id) && (
                            <Check size={12} aria-hidden="true" />
                          )}
                        </span>
                        {need.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="matching-visual">
                  <div className="matching-visual-copy">
                    <p className="eyebrow eyebrow-light">
                      <span /> LES CONNEXIONS PRENNENT FORME
                    </p>
                    <h3>{sector.description}</h3>
                    <p>
                      {relevantSkills.length > 0
                        ? `${relevantSkills.length} domaines de compétences reliés à vos enjeux.`
                        : "Sélectionnez au moins un besoin pour créer les connexions."}
                    </p>
                    <div className="skill-tags dark-tags">
                      {relevantSkills.map((id) => (
                        <span key={id}>{skillById[id].name}</span>
                      ))}
                    </div>
                  </div>
                  <NetworkVisual
                    dark
                    selection={selection + selectedNeeds.length}
                    active={selectedNeeds.length > 0}
                  />
                </div>
                <ol
                  className={`match-flow ${selectedNeeds.length === 0 ? "inactive" : ""}`}
                  aria-label="Chaîne de correspondance"
                >
                  <li>
                    <small>ENTREPRISE</small>
                    <strong>{sector.short}</strong>
                  </li>
                  <li>
                    <small>BESOINS MÉTIERS</small>
                    <strong>{selectedNeeds.length} enjeux choisis</strong>
                  </li>
                  <li>
                    <small>COMPÉTENCES</small>
                    <strong>{relevantSkills.length} domaines</strong>
                  </li>
                  <li>
                    <small>FORMATIONS</small>
                    <strong>{matches.length} correspondances</strong>
                  </li>
                  <li>
                    <small>PROJETS PÉDAGOGIQUES</small>
                    <strong>
                      {selectedNeeds.length
                        ? "Une idée à explorer"
                        : "À explorer"}
                    </strong>
                  </li>
                </ol>
                <div className="match-results">
                  <div className="panel-step-heading">
                    <div>
                      <span className="step-number">03</span>
                      <h3>Des formations qui font écho à vos enjeux</h3>
                    </div>
                    <span
                      className="result-count"
                      role="status"
                      aria-live="polite"
                    >
                      {matches.length} correspondance
                      {matches.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {matches.length ? (
                    <>
                      <div className="program-grid">
                        {(showAll ? matches : matches.slice(0, 3)).map(
                          (match) => (
                            <ProgramCard key={match.program.id} {...match} />
                          ),
                        )}
                      </div>
                      {matches.length > 3 && (
                        <button
                          className="button button-outline show-more"
                          type="button"
                          aria-expanded={showAll}
                          onClick={() => setShowAll(!showAll)}
                        >
                          {showAll
                            ? "Réduire la sélection"
                            : `Voir les ${matches.length} formations`}
                          <ArrowRight size={16} aria-hidden="true" />
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="empty-state">
                      <Network size={30} aria-hidden="true" />
                      <h4>Créons une première connexion.</h4>
                      <p>
                        Sélectionnez un besoin métier ci-dessus pour découvrir
                        les formations associées.
                      </p>
                    </div>
                  )}
                  <p className="method-note">
                    Les correspondances reposent sur des compétences communes,
                    sans score prédictif. Elles ne garantissent ni recrutement
                    ni éligibilité au solde. Les références 2026 sont à
                    revérifier pour chaque campagne.{" "}
                    <a href="/sources">Voir les sources et la méthode.</a>
                  </p>
                </div>
                {project && selectedNeeds.length > 0 && (
                  <div className="matched-project">
                    <div className="project-icon">
                      <SectorIcon name={project.icon} size={32} />
                    </div>
                    <div>
                      <p className="eyebrow">
                        <span /> 04 · UNE IDÉE POUR PASSER À LA PRATIQUE
                      </p>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <span className="proposal-label">
                        Exemple pédagogique · Proposition à valider avec l’UFR
                      </span>
                    </div>
                    <a
                      href={`#projet-${project.id}`}
                      className="icon-button"
                      aria-label={`Découvrir le projet : ${project.title}`}
                    >
                      <ArrowUpRight />
                    </a>
                  </div>
                )}
                {selectedNeeds.length > 0 && (
                  <div className="match-next-steps">
                    <div>
                      <p className="eyebrow">
                        <span /> 05 · LES RÉALISATIONS ÉTUDIANTES
                      </p>
                      <h3>Des compétences mises en pratique</h3>
                      {relatedRealizations.length ? (
                        relatedRealizations.map((item) => (
                          <a
                            className="match-related-link"
                            key={item.id}
                            href={`#realisation-${item.id}`}
                          >
                            <strong>{item.title}</strong>
                            <span>
                              Lien par compétences communes :{" "}
                              {item.skills
                                .filter((skill) =>
                                  relevantSkills.includes(skill),
                                )
                                .map((skill) => skillById[skill].short)
                                .join(", ")}
                              .
                            </span>
                            <span className="text-link">
                              Voir la réalisation documentée{" "}
                              <ArrowUpRight size={15} aria-hidden="true" />
                            </span>
                          </a>
                        ))
                      ) : (
                        <p>
                          Aucune réalisation publiée ne correspond encore à ces
                          compétences.{" "}
                          <a className="text-link" href="#realisations">
                            Explorer la vitrine étudiante
                          </a>
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="eyebrow">
                        <span /> 06 · LES MOYENS POUR APPRENDRE
                      </p>
                      <h3>Des besoins pédagogiques à explorer</h3>
                      <ul>
                        {relatedFunding.map((item) => (
                          <li key={item.number}>
                            <a href={`#besoin-${item.number}`}>
                              <strong>{item.title}</strong>
                              <span>
                                {item.skills
                                  .filter((skill) =>
                                    relevantSkills.includes(skill),
                                  )
                                  .map((skill) => skillById[skill].short)
                                  .join(" · ")}
                              </span>
                              <ArrowUpRight size={16} aria-hidden="true" />
                            </a>
                          </li>
                        ))}
                      </ul>
                      <p className="method-note">
                        Liens proposés par compétences communes. Usages et
                        besoins à valider avec l’UFR.
                      </p>
                    </div>
                  </div>
                )}
                <div className="match-cta">
                  <div>
                    <Sparkles size={21} aria-hidden="true" />
                    <p>
                      Vos métiers évoluent.
                      <br />
                      <strong>
                        Les compétences de demain se construisent aujourd’hui.
                      </strong>
                    </p>
                  </div>
                  <div className="match-cta-links">
                    <a href="#projets" className="text-link">
                      Les projets pédagogiques{" "}
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                    <a href="#soutenir" className="button button-primary">
                      Soutenir les talents de votre secteur{" "}
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                    <ExternalLink href={siteConfig.soltea.url}>
                      Les informations SOLTéA
                    </ExternalLink>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="match-welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="welcome-network" aria-hidden="true">
                  <span />
                  <Network size={38} strokeWidth={1} />
                  <span />
                </div>
                <h3>Tout commence par une connexion.</h3>
                <p>
                  Choisissez votre secteur pour découvrir les compétences,
                  <br className="desktop-break" /> les formations et une idée de
                  projet qui lui correspondent.
                </p>
                <span className="small-label">
                  VOTRE ENTREPRISE <ArrowRight size={13} /> NOS TALENTS{" "}
                  <ArrowRight size={13} /> DEMAIN
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
