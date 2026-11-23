import Image from "next/image";
import {
  ArrowUpRight,
  ShieldCheck,
  Code2,
  Terminal,
  ChartNoAxesCombined,
  Sigma,
  Trophy,
} from "lucide-react";
import {
  competitionTracks,
  competitionResults,
  competitionPartners,
} from "@/data/competitions";
import { SectionHeading, ExternalLink } from "@/components/ui";

const icons = {
  shield: ShieldCheck,
  code: Code2,
  terminal: Terminal,
  data: ChartNoAxesCombined,
  math: Sigma,
};
export function Competitions() {
  const partners = competitionPartners.filter(
    (partner) => partner.participationSource && partner.logoPermissionDate,
  );
  return (
    <section
      id="competitions"
      className="section competitions-section"
      aria-labelledby="competitions-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="APPRENDRE, AUSSI PAR LE DÉFI"
          id="competitions-title"
          title={
            <>
              L’esprit d’équipe.
              <br />
              <em>Le goût du challenge.</em>
            </>
          }
          description="Cinq pistes de compétitions pour progresser ensemble. Les organismes cités sont des références à explorer ; aucune inscription de l’UFR n’est annoncée ici."
        />
        <div className="competition-list">
          {competitionTracks.map((track, index) => {
            const Icon = icons[track.icon as keyof typeof icons];
            return (
              <details className="competition-track" key={track.id}>
                <summary>
                  <span className="track-number">0{index + 1}</span>
                  <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
                  <h3>{track.title}</h3>
                  <span className="track-hint">Explorer la piste</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </summary>
                <div className="competition-detail">
                  <p>{track.idea}</p>
                  <p className="small-label">{track.skills}</p>
                  <ExternalLink href={track.url}>
                    {track.reference}
                  </ExternalLink>
                  <span className="proposal-label">
                    Piste à discuter avec les équipes pédagogiques
                  </span>
                </div>
              </details>
            );
          })}
        </div>
        <div className="competition-proof">
          <div>
            <Trophy size={27} strokeWidth={1.5} aria-hidden="true" />
            <h3>Les réussites à raconter</h3>
            {competitionResults.length ? (
              competitionResults.map((result) => (
                <article key={result.title}>
                  <h4>{result.title}</h4>
                  <p>
                    {result.team} · {result.result}
                  </p>
                  <ExternalLink href={result.source}>
                    Consulter le résultat documenté
                  </ExternalLink>
                </article>
              ))
            ) : (
              <p>
                Cette place est réservée aux participations et résultats
                vérifiés de nos étudiants. Aucun palmarès n’est revendiqué à ce
                stade.
              </p>
            )}
          </div>
          <div>
            <span className="small-label">PARTENAIRES DES COMPÉTITIONS</span>
            {partners.length ? (
              partners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} (nouvel onglet)`}
                    width={150}
                    height={70}
                  />
                </a>
              ))
            ) : (
              <p>
                Les soutiens seront présentés après confirmation de leur
                participation et de l’autorisation d’utiliser leur logo.
              </p>
            )}
            <a href="#ambassadeurs" className="text-link">
              Faire connaître une initiative{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <p className="method-note">
          L’UFR mentionne le soutien aux compétitions internationales de
          programmation parmi ses objectifs pédagogiques.{" "}
          <ExternalLink href="https://math-info.u-paris.fr/entreprises/">
            Consulter la source UFR
          </ExternalLink>
        </p>
      </div>
    </section>
  );
}
