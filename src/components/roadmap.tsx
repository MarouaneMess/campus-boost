import { CalendarDays, ArrowUpRight } from "lucide-react";
import { solteaRoadmap, campaign2027 } from "@/data/roadmap";
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
          eyebrow="VOS RENDEZ-VOUS ENTREPRISES"
          id="roadmap-title"
          title={
            <>
              Les échéances utiles.
              <br />
              <em>Échanger au bon moment.</em>
            </>
          }
          description="Les étapes de la campagne SOLTéA qui concernent votre entreprise, puis les possibilités d’échanger avec l’UFR."
        />
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
        <div className="company-actions">
          <article>
            <h3>Être accompagné</h3>
            <p>
              Échanger avec le service taxe d’apprentissage pour préparer votre
              affectation. Rendez-vous à convenir.
            </p>
            <a href="#contact-taxe" className="text-link">
              Demander un échange ↗
            </a>
          </article>
          <article>
            <h3>Donner la parole à votre entreprise</h3>
            <p>
              Proposer un retour d’expérience, un métier à présenter ou une
              rencontre avec les étudiants. Format et date à convenir avec
              l’UFR.
            </p>
            <a href="#contact-ufr" className="text-link">
              Proposer une intervention ↗
            </a>
          </article>
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
