import { businessContacts, contactMailto } from "@/data/business-contact";
import { SectionHeading, ExternalLink } from "./ui";
export function BusinessContact() {
  return (
    <section
      id="contact"
      className="section business-contact"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <SectionHeading
          id="contact-title"
          eyebrow="PARLONS DE VOTRE BESOIN"
          title={
            <>
              Un premier échange, <em>le bon interlocuteur.</em>
            </>
          }
          description="Un sujet de projet, une offre ou une question sur SOLTéA ? Retrouvez les coordonnées publiées par l’UFR et l’Université."
        />
        <div className="contact-grid">
          <article id="contact-ufr" className="contact-card">
            <span className="topic-level">PROJETS & RELATIONS ENTREPRISES</span>
            <h3>Contacter l’UFR</h3>
            <p>
              Proposez un sujet, une offre de stage ou d’alternance, ou une
              intervention pour donner la parole à votre entreprise. Pour un
              projet pédagogique, demandez à être orienté vers l’équipe
              concernée.
            </p>
            <p>{businessContacts.ufr.name}</p>
            <a
              className="contact-address"
              href={`mailto:${businessContacts.ufr.email}`}
            >
              {businessContacts.ufr.email}
            </a>
            <a
              className="button button-dark"
              href={contactMailto("ufr", "Projet ou échange avec l’UFR")}
            >
              Préparer mon email ↗
            </a>
            <ExternalLink href={businessContacts.ufr.source}>
              Coordonnées officielles de l’UFR
            </ExternalLink>
          </article>
          <article id="contact-taxe" className="contact-card">
            <span className="topic-level">TAXE D’APPRENTISSAGE & SOLTÉA</span>
            <h3>Être accompagné</h3>
            <p>
              Adressez vos questions sur la taxe d’apprentissage au service
              central de l’Université Paris Cité. Précisez la formation que vous
              souhaitez soutenir.
            </p>
            <p>{businessContacts.tax.name}</p>
            <a
              className="contact-address"
              href={`mailto:${businessContacts.tax.email}`}
            >
              {businessContacts.tax.email}
            </a>
            <a
              className="button button-dark"
              href={contactMailto(
                "tax",
                "Question sur la campagne SOLTéA 2027",
              )}
            >
              Préparer mon email ↗
            </a>
            <ExternalLink href={businessContacts.tax.source}>
              Coordonnées officielles du service
            </ExternalLink>
          </article>
        </div>
        <p className="method-note">
          Ces liens ouvrent votre messagerie avec un brouillon à compléter. Vous
          choisissez de l’envoyer. Coordonnées vérifiées le 25 novembre 2026.
        </p>
      </div>
    </section>
  );
}
