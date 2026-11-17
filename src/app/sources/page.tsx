import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { programs, eligibilityLabels } from "@/data/programs";
import { siteConfig } from "@/data/site";
import { Eyebrow, ExternalLink } from "@/components/ui";

export const metadata: Metadata = { title: "Sources & transparence" };

export default function SourcesPage() {
  return (
    <main id="main-content" className="document-page container">
      <Link href="/" className="text-link">
        <ArrowLeft size={15} aria-hidden="true" /> Retour au site
      </Link>
      <Eyebrow>DES INFORMATIONS VÉRIFIABLES</Eyebrow>
      <h1>
        Sources & <em>transparence.</em>
      </h1>
      <p className="document-lead">
        Dernière vérification éditoriale : {siteConfig.verificationLabel}.
        Campus Boost est un projet étudiant, distinct des sites institutionnels
        officiels.
      </p>
      <section>
        <h2>Les formations et leur statut</h2>
        <p>
          Les intitulés et les domaines de compétences sont documentés à partir
          des pages de l’UFR et du catalogue officiel de l’université. Un lien
          pédagogique avec un secteur ne vaut pas habilitation au solde.
        </p>
        <p>
          La page Entreprises de l’UFR référence les masters MIAGE, IAD, DCI,
          RSA et VMI pour la campagne 2026. L’absence d’une formation sur cette
          page ne signifie pas qu’elle est inéligible. Les habilitations et les
          bénéficiaires exacts doivent être revérifiés dans SOLTéA pour la
          campagne choisie.
        </p>
        <div className="source-table-wrapper">
          <table className="source-table">
            <caption>Références du catalogue Campus Boost</caption>
            <thead>
              <tr>
                <th scope="col">Formation</th>
                <th scope="col">Référence</th>
                <th scope="col">Statut documentaire</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program) => (
                <tr key={program.id}>
                  <th scope="row">
                    {program.level} {program.short}
                    <span>{program.name}</span>
                  </th>
                  <td>
                    <a
                      href={program.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Fiche officielle
                      <ArrowUpRight size={13} aria-hidden="true" />
                      <span className="sr-only"> (nouvel onglet)</span>
                    </a>
                  </td>
                  <td>
                    {eligibilityLabels[program.eligibility]}
                    {program.affiliationNote && (
                      <p>{program.affiliationNote}</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Le M2 MVA est présenté comme une voie en partenariat accessible sur
          dossier après le M1 MMAS, pilotée par l’ENS Paris-Saclay. La L3 MIAGE
          requiert une attention particulière au rattachement à l’IUT Paris –
          Rives de Seine dans la fiche officielle.
        </p>
        <ExternalLink href={siteConfig.soltea.ufrUrl}>
          La page Entreprises de l’UFR
        </ExternalLink>
      </section>
      <section>
        <h2>Une source complémentaire pour les mathématiques</h2>
        <p>
          La plaquette de l’université « Formations et structures éligibles au
          versement du solde de la taxe d’apprentissage 2026 », page 11,
          référence également IMB, MMAS et MVA sous l’UFR Mathématiques et
          Informatique. Leur badge identifie cette source complémentaire, tout
          en conservant la précision de partenariat pour MVA. Cette référence
          pour 2026 ne garantit pas une habilitation pour une campagne
          ultérieure.
        </p>
        <ExternalLink href={siteConfig.soltea.eligibilityPdfUrl}>
          Consulter la plaquette officielle 2026 · page 11 (PDF)
        </ExternalLink>
      </section>
      <section>
        <h2>Comment fonctionne MATCH ?</h2>
        <p>
          Chaque besoin métier illustratif est associé à un ou plusieurs
          domaines de compétences. Une formation apparaît si ses domaines
          documentés recoupent au moins une compétence associée aux besoins
          sélectionnés. L’ordre dépend du nombre de domaines communs ; les ex
          æquo sont ordonnés par identifiant.
        </p>
        <p>
          Il s’agit d’une mise en relation éditoriale et déterministe, sans
          intelligence artificielle distante, taux de compatibilité, prédiction
          de recrutement ou recommandation commerciale personnalisée. Les
          secteurs ne représentent pas des partenaires ou des entreprises ayant
          déclaré leurs besoins.
        </p>
      </section>
      <section>
        <h2>Les projets et le simulateur</h2>
        <p>
          Les huit projets pédagogiques et les six catégories d’équipements sont
          des propositions à valider avec l’UFR. Aucun achat, financement,
          résultat mesuré ou partenariat n’est annoncé comme réalisé.
        </p>
        <p>
          Les prix unitaires du simulateur sont des estimations illustratives
          sans devis. Chaque type de matériel représente une alternative
          indépendante, arrondie au nombre entier d’unités que permet le budget.
          Les quantités ne s’additionnent pas. Le reste affiché est uniquement
          arithmétique.
        </p>
        <p>
          Le montant saisi ne constitue ni un calcul fiscal ni le solde réel de
          l’entreprise. Il n’est envoyé à aucun serveur. Il n’est pas possible
          d’acheter ou de réserver un matériel sur ce site ; l’établissement
          décide de l’utilisation effective des fonds.
        </p>
      </section>
      <section>
        <h2>La démarche SOLTéA</h2>
        <p>
          L’UAI {siteConfig.soltea.uai} et le SIRET {siteConfig.soltea.siret}{" "}
          proviennent de la page Entreprises de l’UFR. Ce sont des références de
          l’université : sélectionnez ensuite le bénéficiaire exact. Le
          calendrier affiché est un repère daté ; aucune date de répartition
          2027 n’est extrapolée.
        </p>
        <div className="source-links">
          <ExternalLink href={siteConfig.soltea.url}>
            La plateforme officielle SOLTéA
          </ExternalLink>
          <ExternalLink href={siteConfig.soltea.guideUrl}>
            Le mode d’emploi employeur
          </ExternalLink>
          <ExternalLink href="https://www.soltea.education.gouv.fr/espace-public/conditions-generales-utilisation-taxe-apprentissage">
            Les conditions d’utilisation de SOLTéA
          </ExternalLink>
          <ExternalLink href={siteConfig.soltea.ufrUrl}>
            Les références publiées par l’UFR
          </ExternalLink>
        </div>
      </section>
      <section>
        <h2>Images, vidéo et témoignages</h2>
        <p>
          Le logo Campus Boost est le fichier fourni avec le projet. Ses
          couleurs et ses proportions ont été préservées. Les illustrations de
          réseaux, projets et équipements sont des dessins vectoriels ou des
          scènes 3D, sans attribution à des installations réelles.
        </p>
        <p>
          Aucun logo officiel de l’université n’a été recréé. Les cartes de
          témoignages sont des emplacements de démonstration sans personne ni
          citation inventée. Aucune vidéo promotionnelle n’est disponible à ce
          stade.
        </p>
      </section>
    </main>
  );
}
