"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  RotateCcw,
  Play,
  Clock3,
} from "lucide-react";
import Link from "next/link";
import { sectors } from "@/data/sectors";
import { projects } from "@/data/projects";
import { skillById } from "@/data/skills";
import { getMatches, getRelevantSkills } from "@/lib/matching";
import type { SectorId } from "@/types/content";
import { StaticNetwork } from "@/components/3d/static-network";
import { Eyebrow, SectorIcon } from "@/components/ui";
import { ProgramCard } from "@/components/match/program-card";
import { ImpactSimulator } from "@/components/impact/impact-simulator";
import { SolteaGuide } from "@/components/soltea-guide";
import { OfflineStatus } from "./offline-status";

const steps = [
  "Le projet",
  "Votre secteur",
  "Vos enjeux",
  "Les compétences",
  "Un projet",
  "L’impact",
  "Soutenir l’UFR",
];

export function DemoExperience() {
  const [step, setStep] = useState(0);
  const [sectorId, setSectorId] = useState<SectorId | null>(null);
  const [needs, setNeeds] = useState<string[]>([]);
  const [run, setRun] = useState(0);
  const title = useRef<HTMLHeadingElement>(null);
  const hasNavigated = useRef(false);
  const sector = sectors.find((item) => item.id === sectorId);
  const matches = sector ? getMatches(sector, needs) : [];
  const relevantSkills = sector ? getRelevantSkills(sector, needs) : [];
  const project = projects.find((item) => item.id === sector?.projectId);
  const canAdvance =
    step === 1 ? Boolean(sector) : step === 2 ? needs.length > 0 : true;
  useEffect(() => {
    if (hasNavigated.current) title.current?.focus({ preventScroll: true });
    hasNavigated.current = true;
  }, [step]);
  function reset() {
    setStep(0);
    setSectorId(null);
    setNeeds([]);
    setRun((value) => value + 1);
  }
  function chooseSector(id: SectorId) {
    const chosen = sectors.find((item) => item.id === id)!;
    setSectorId(id);
    setNeeds(chosen.needs.map((need) => need.id));
  }

  return (
    <div className="container demo-container">
      <div className="demo-topline">
        <Link href="/" className="text-link">
          <ArrowLeft size={15} aria-hidden="true" /> Retour au site
        </Link>
        <span>
          <Clock3 size={15} aria-hidden="true" /> PARCOURS GUIDÉ · ENVIRON 3
          MINUTES
        </span>
        <button className="text-link" type="button" onClick={reset}>
          <RotateCcw size={14} aria-hidden="true" /> Recommencer la
          démonstration
        </button>
      </div>
      <div
        className="demo-progress"
        aria-label="Progression de la démonstration"
      >
        {steps.map((label, index) => (
          <button
            key={label}
            type="button"
            disabled={
              index > 1 && (!sector || (index > 2 && needs.length === 0))
            }
            aria-current={index === step ? "step" : undefined}
            className={
              index === step ? "active" : index < step ? "complete" : ""
            }
            onClick={() => setStep(index)}
          >
            <span>
              {index < step ? (
                <Check size={13} aria-hidden="true" />
              ) : (
                `0${index + 1}`
              )}
            </span>
            <strong>{label}</strong>
          </button>
        ))}
      </div>
      <div className={`demo-stage demo-stage-${step}`} key={`${run}-${step}`}>
        <div className="demo-stage-heading">
          <Eyebrow>LA DÉMONSTRATION / 0{step + 1}</Eyebrow>
          <h1 ref={title} tabIndex={-1}>
            {
              [
                <>
                  Investissez dans les talents <em>de demain.</em>
                </>,
                <>
                  Tout commence par <em>votre activité.</em>
                </>,
                <>
                  Des enjeux concrets.
                  <br />
                  <em>Des besoins à explorer.</em>
                </>,
                <>
                  Les bonnes compétences.
                  <br />
                  <em>Les bonnes connexions.</em>
                </>,
                <>
                  De la connaissance
                  <br />
                  <em>à l’expérimentation.</em>
                </>,
                <>
                  Rendre votre impact
                  <br />
                  <em>plus tangible.</em>
                </>,
                <>
                  Le prochain pas ?<br />
                  <em>Sur SOLTéA.</em>
                </>,
              ][step]
            }
          </h1>
        </div>
        {step === 0 && (
          <div className="demo-intro">
            <div>
              <p className="demo-lead">
                Campus Boost relie les enjeux des entreprises aux compétences de
                l’UFR Mathématiques et Informatique de l’Université Paris Cité.
              </p>
              <p>
                En quelques étapes : un secteur, ses besoins, les formations
                associées, une idée de projet et une simulation d’impact.
              </p>
              <div className="demo-scenario">
                <SectorIcon name="plane" />
                <div>
                  <strong>Le scénario conseillé : l’aviation</strong>
                  <p>
                    Suivez le fil de la modélisation à l’optimisation d’une
                    trajectoire.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="button button-primary"
                onClick={() => setStep(1)}
              >
                Commencer la démonstration <Play size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="demo-static">
              <StaticNetwork />
              <span>
                LES CONNEXIONS D’AUJOURD’HUI.
                <br />
                LES TALENTS DE DEMAIN.
              </span>
            </div>
          </div>
        )}
        {step === 1 && (
          <>
            <p className="demo-lead">
              Choisissez « Aviation et aéronautique » pour le scénario
              conseillé, ou explorez un autre secteur.
            </p>
            <div
              className="sector-grid demo-sector-grid"
              role="group"
              aria-label="Secteur de démonstration"
            >
              {sectors.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={`sector-button ${sectorId === item.id ? "selected" : ""}`}
                  aria-pressed={sectorId === item.id}
                  onClick={() => chooseSector(item.id)}
                >
                  <SectorIcon name={item.icon} />
                  <span>{item.name}</span>
                  {sectorId === item.id && (
                    <Check size={17} aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
            <p className="demo-selection" role="status">
              {sector
                ? `${sector.name} : ${sector.description}`
                : "Sélectionnez un secteur pour continuer."}
            </p>
          </>
        )}
        {step === 2 && sector && (
          <>
            <p className="demo-lead">
              Pour le secteur {sector.short.toLocaleLowerCase("fr")}, quels
              enjeux souhaitez-vous explorer ?
            </p>
            <div
              className="demo-needs"
              role="group"
              aria-label="Enjeux à explorer"
            >
              {sector.needs.map((need, index) => (
                <button
                  type="button"
                  key={need.id}
                  aria-pressed={needs.includes(need.id)}
                  className={needs.includes(need.id) ? "selected" : ""}
                  onClick={() =>
                    setNeeds((current) =>
                      current.includes(need.id)
                        ? current.filter((id) => id !== need.id)
                        : [...current, need.id],
                    )
                  }
                >
                  <span>0{index + 1}</span>
                  <strong>{need.label}</strong>
                  <span className="chip-check">
                    {needs.includes(need.id) && (
                      <Check size={14} aria-hidden="true" />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <p className="method-note">
              Exemples illustratifs de besoins métiers, sans entreprise
              particulière. Sélectionnez au moins un enjeu.
            </p>
          </>
        )}
        {step === 3 && sector && (
          <>
            <div className="demo-skill-flow">
              <span>
                <SectorIcon name={sector.icon} />
                {sector.short}
              </span>
              <ArrowRight size={22} aria-hidden="true" />
              <div className="skill-tags">
                {relevantSkills.map((id) => (
                  <span key={id}>{skillById[id].name}</span>
                ))}
              </div>
            </div>
            <p className="demo-lead">
              Voici deux correspondances parmi les {matches.length} formations
              reliées aux compétences sélectionnées.
            </p>
            <div className="program-grid demo-programs">
              {matches.slice(0, 2).map((match) => (
                <ProgramCard key={match.program.id} {...match} />
              ))}
            </div>
            <p className="method-note">
              Correspondances pédagogiques explicables, sans score prédictif.
              L’habilitation se vérifie dans SOLTéA pour la campagne en cours.
            </p>
          </>
        )}
        {step === 4 && project && (
          <div className="demo-project">
            <div className="demo-project-illustration">
              <div className="project-art-icon">
                <SectorIcon name={project.icon} size={62} />
              </div>
              <svg viewBox="0 0 400 250" aria-hidden="true">
                <path d="M-10 210C150 230 60 50 210 100S320 10 410 50" />
                <path d="M-10 240C120 200 120 100 240 120S330 100 410 80" />
              </svg>
              <span>DU MODÈLE À L’EXPÉRIENCE</span>
            </div>
            <div>
              <p className="eyebrow">
                <span />
                {project.category}
              </p>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="project-deliverable">
                <strong>Le livrable envisagé</strong>
                <p>{project.deliverable}</p>
              </div>
              <span className="proposal-label">
                Exemple pédagogique · Proposition à valider avec l’UFR
              </span>
            </div>
          </div>
        )}
        {step === 5 && <ImpactSimulator compact />}
        {step === 6 && <SolteaGuide compact />}
      </div>
      <div className="demo-navigation">
        <button
          type="button"
          className="button button-outline"
          disabled={step === 0}
          onClick={() => setStep((value) => value - 1)}
        >
          <ArrowLeft size={16} aria-hidden="true" /> Étape précédente
        </button>
        <span>
          0{step + 1}
          <span> / 07</span>
        </span>
        {step === 6 ? (
          <button
            type="button"
            className="button button-primary"
            onClick={reset}
          >
            Recommencer <RotateCcw size={16} aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            className="button button-dark"
            disabled={!canAdvance}
            onClick={() => setStep((value) => value + 1)}
          >
            Étape suivante <ArrowRight size={16} aria-hidden="true" />
          </button>
        )}
      </div>
      <div className="demo-footnote">
        <OfflineStatus />
        <Link className="text-link small" href="/sources">
          Sources & transparence <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
