import { CalendarDays, ArrowUpRight, Route } from "lucide-react";
import { campusRoadmap, solteaRoadmap, campaign2027 } from "@/data/roadmap";
import { SectionHeading, ExternalLink } from "@/components/ui";

export function Roadmap() {
  return (
    <section
      id="calendrier"
      className="section roadmap-section"
      aria-labelledby="roadmap-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="NOTRE FEUILLE DE ROUTE"
          id="roadmap-title"
          title={
            <>
              Préparer les rencontres.
              <br />
              <em>Accompagner le bon moment.</em>
            </>
          }
          description="Deux calendriers à lire en parallèle : les actions proposées par CampusBoost et les périodes réglementaires d’affectation sur SOLTéA."
        />
        <div className="roadmap-lane">
          <div className="lane-heading">
            <Route size={23} aria-hidden="true" />
            <h3>Le parcours CampusBoost</h3>
            <span className="status-label status-envisaged">
              Planning prévisionnel
            </span>
          </div>
          <p>
            Un ordre de travail proposé, sans dates d’engagement. Faites défiler
            les étapes sur ordinateur.
          </p>
          <div
            className="timeline-scroll"
            role="region"
            aria-label="Chronologie CampusBoost, défilement horizontal"
            tabIndex={0}
          >
            <ol className="timeline campus-timeline">
              {campusRoadmap.map((step, index) => (
                <li key={step.title}>
                  <span className="timeline-marker">0{index + 1}</span>
                  <span
                    className={`timeline-status ${index === 0 ? "current" : ""}`}
                  >
                    {step.status}
                  </span>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="roadmap-lane soltea-lane">
          <div className="lane-heading">
            <CalendarDays size={23} aria-hidden="true" />
            <h3>La campagne SOLTéA 2027</h3>
            <span className="status-label status-envisaged">
              Dates à confirmer
            </span>
          </div>
          <p>
            Calendrier des employeurs : les échéances seront précisées après
            publication officielle.
          </p>
          <ol className="timeline soltea-timeline">
            {solteaRoadmap.map((step, index) => (
              <li key={step.title}>
                <span className="timeline-marker">0{index + 1}</span>
                <span className="timeline-status">{step.date}</span>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
          <p className="method-note">{campaign2027.note}</p>
          <ExternalLink href={campaign2027.calendarUrl}>
            Vérifier les annonces officielles SOLTéA
          </ExternalLink>
        </div>
        <div className="section-endnote">
          <p>
            Les choix employeurs de la campagne 2026 ont pris fin le 21 octobre
            2026. Les dates 2026 ne sont pas reportées automatiquement en 2027.
          </p>
          <a className="text-link" href="#soutenir">
            Comprendre l’affectation{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
