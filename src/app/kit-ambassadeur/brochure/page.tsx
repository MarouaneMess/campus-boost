import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { programs } from "@/data/programs";
import { siteConfig } from "@/data/site";
import {
  siteUrl,
  shareUrl,
  ufrPitch,
  solteaExplanation,
} from "@/data/ambassador";
import { solteaSteps } from "@/data/soltea";

export const metadata: Metadata = {
  title: "Brochure CampusBoost · Kit ambassadeur",
  description:
    "Présentation accessible de l’UFR Mathématiques et Informatique, de CampusBoost et du parcours SOLTéA.",
};

export default function BrochurePage() {
  return (
    <main id="main-content" className="brochure-page container">
      <Link
        href="/ambassadeurs#ambassadeurs"
        className="text-link brochure-back"
      >
        ← Retour au kit ambassadeur
      </Link>
      <article className="brochure-sheet">
        <div className="brochure-brands">
          <Image
            src="/brand/campus-boost.webp"
            alt="Campus Boost"
            width={145}
            height={97}
          />
          <Image
            src="/brand/ufr-mathematiques-informatique.jpg"
            alt="UFR Mathématiques et Informatique — Université Paris Cité"
            width={2560}
            height={805}
            className="brochure-ufr-logo"
          />
        </div>
        <p className="eyebrow">
          <span /> UFR MATHÉMATIQUES ET INFORMATIQUE
        </p>
        <h1>
          Investissez dans
          <br />
          <em>les talents de demain.</em>
        </h1>
        <p className="document-lead">{ufrPitch}</p>
        <div className="brochure-columns">
          <section>
            <h2>Relier les savoirs aux métiers</h2>
            <p>
              Étudiants, enseignants, alumni et entreprises : CampusBoost rend
              visibles les liens entre compétences et enjeux professionnels.
            </p>
            <p>
              MATCH propose huit secteurs pour explorer les formations, leurs
              domaines de compétences et des idées pédagogiques explicables.
            </p>
          </section>
          <section>
            <h2>Des formations à découvrir</h2>
            <ul>
              {programs.map((program) => (
                <li key={program.id}>
                  {program.level} {program.short} — {program.name}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <section>
          <h2>Des moyens pour apprendre</h2>
          <p>
            Informatique, calcul pour l’IA, réseaux, outils mathématiques,
            collaboration et prototypage : six pistes pour enrichir les
            expériences pédagogiques. Les propositions et montants du simulateur
            sont illustratifs, à valider avec l’UFR. Ils ne constituent ni un
            devis ni une promesse d’achat.
          </p>
        </section>
        <p className="brochure-footer">
          Catalogue : vérifier le rattachement de la L3 MIAGE à l’IUT Paris –
          Rives de Seine ; le M2 MVA est une formation en partenariat pilotée
          par l’ENS Paris-Saclay.
          <br />
          CampusBoost · Initiative étudiante du M1 MIAGE · {shareUrl}
        </p>
      </article>
      <article className="brochure-sheet">
        <p className="eyebrow">
          <span /> COMPRENDRE COMMENT CONTRIBUER
        </p>
        <h2>
          Le parcours <em>SOLTéA.</em>
        </h2>
        <p>{solteaExplanation}</p>
        <ol className="brochure-steps">
          {solteaSteps.map((step) => (
            <li key={step.short}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <div className="brochure-reference">
          <h3>Identifier le bon bénéficiaire</h3>
          <p>
            UNIVERSITE PARIS CITE · UAI <strong>{siteConfig.soltea.uai}</strong>{" "}
            · SIRET <strong>{siteConfig.soltea.siret}</strong>
          </p>
          <p>
            Précisez ensuite la composante UFR Mathématiques et Informatique ou
            la formation habilitée. Vérifiez son statut pour la campagne
            choisie.
          </p>
          <p>
            <strong>Campagne 2027 : dates d’affectation à confirmer.</strong>{" "}
            Vérification des annonces au 25 novembre 2026. Le calendrier
            d’habilitation des établissements est une procédure distincte.
          </p>
        </div>
        <section>
          <h3>Sources et liens utiles</h3>
          <ul className="brochure-sources">
            <li>
              <a href={shareUrl}>CampusBoost : {shareUrl}</a>
            </li>
            <li>
              <a href={siteConfig.soltea.ufrUrl}>
                UFR : {siteConfig.soltea.ufrUrl}
              </a>
            </li>
            <li>
              <a href={siteConfig.soltea.url}>
                SOLTéA : {siteConfig.soltea.url}
              </a>
            </li>
            <li>
              <a href={`${siteUrl}sources`}>
                Sources et limites : {siteUrl}sources
              </a>
            </li>
          </ul>
        </section>
        <p className="method-note">
          Support étudiant préparé le 25 novembre 2026. Les références des
          formations reposent sur des sources 2026, à revérifier pour la
          nouvelle campagne. CampusBoost n’est pas une plateforme de paiement ni
          le site institutionnel de l’université. Support à valider avec l’UFR.
        </p>
      </article>
    </main>
  );
}
