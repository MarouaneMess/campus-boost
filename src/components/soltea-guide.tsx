"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { solteaSteps } from "@/data/soltea";
import { Eyebrow, ExternalLink } from "@/components/ui";

export function SolteaGuide({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(0);
  const [copyStatus, setCopyStatus] = useState("");
  async function copy(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(`${label} copié.`);
    } catch {
      setCopyStatus(
        `Copie indisponible. Vous pouvez sélectionner le ${label} affiché.`,
      );
    }
  }
  const guide = (
    <div className={`soltea-guide ${compact ? "soltea-compact" : ""}`}>
      <ol className="soltea-steps" aria-label="Étapes du parcours SOLTéA">
        {solteaSteps.map((item, index) => (
          <li key={item.short}>
            <button
              type="button"
              aria-current={step === index ? "step" : undefined}
              className={`${step === index ? "current" : ""} ${index < step ? "visited" : ""}`}
              onClick={() => setStep(index)}
            >
              <span>
                {index < step ? (
                  <Check size={15} aria-hidden="true" />
                ) : (
                  `0${index + 1}`
                )}
              </span>
              <strong>{item.short}</strong>
            </button>
          </li>
        ))}
      </ol>
      <div
        className="soltea-step-content"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="soltea-big-number" aria-hidden="true">
          0{step + 1}
        </span>
        <div>
          <p className="small-label">ÉTAPE {step + 1} SUR 5</p>
          <h3>{solteaSteps[step].title}</h3>
          <p>{solteaSteps[step].description}</p>
          <p className="soltea-detail">{solteaSteps[step].detail}</p>
        </div>
      </div>
      <div className="soltea-step-navigation">
        <button
          type="button"
          className="text-link"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
        >
          <ArrowLeft size={16} aria-hidden="true" /> Précédent
        </button>
        <span>{step + 1} / 5</span>
        <button
          type="button"
          className="text-link"
          disabled={step === 4}
          onClick={() => setStep(step + 1)}
        >
          Suivant <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
      <div className="beneficiary-card">
        <div>
          <span className="small-label">
            REPÈRES VÉRIFIÉS · UNIVERSITÉ PARIS CITÉ
          </span>
          <strong>Précisez ensuite « UFR Maths-Info » dans SOLTéA.</strong>
          <span className="beneficiary-source">
            Source : page Entreprises de l’UFR · {siteConfig.verificationLabel}
          </span>
        </div>
        <div className="beneficiary-codes">
          <button
            type="button"
            onClick={() => copy(siteConfig.soltea.uai, "UAI")}
            aria-label={`Copier l’UAI ${siteConfig.soltea.uai}`}
          >
            <span>UAI</span>
            <code>{siteConfig.soltea.uai}</code>
            <Copy size={14} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => copy(siteConfig.soltea.siret, "SIRET")}
            aria-label={`Copier le SIRET ${siteConfig.soltea.siret}`}
          >
            <span>SIRET</span>
            <code>{siteConfig.soltea.siret}</code>
            <Copy size={14} aria-hidden="true" />
          </button>
        </div>
        <p className="copy-status" role="status">
          {copyStatus}
        </p>
      </div>
      <div className="campaign-note">
        <CalendarDays size={18} aria-hidden="true" />
        <p>
          <strong>Repère au {siteConfig.verificationLabel}.</strong>{" "}
          {siteConfig.soltea.campaignNote}
        </p>
      </div>
      <div className="soltea-links">
        <ExternalLink
          href={siteConfig.soltea.url}
          className="button button-primary"
        >
          Accéder à SOLTéA
        </ExternalLink>
        <ExternalLink href={siteConfig.soltea.ufrUrl}>
          Les informations officielles de l’UFR
        </ExternalLink>
        <ExternalLink href={siteConfig.soltea.guideUrl}>
          Le guide employeur
        </ExternalLink>
      </div>
    </div>
  );
  if (compact) return guide;
  return (
    <section
      id="soutenir"
      className="section support-section"
      aria-labelledby="support-title"
    >
      <div className="container">
        <div className="support-heading">
          <div>
            <Eyebrow>LE PROCHAIN PAS EST LE VÔTRE</Eyebrow>
            <h2 id="support-title">
              Comment soutenir
              <br />
              <em>notre UFR ?</em>
            </h2>
          </div>
          <div>
            <p>
              Le solde de la taxe d’apprentissage peut soutenir des formations
              habilitées. SOLTéA permet aux employeurs de choisir leurs
              bénéficiaires.
            </p>
            <p>Voici le parcours général, en cinq étapes.</p>
          </div>
        </div>
        {guide}
        <div className="support-faq">
          <details>
            <summary>
              Est-ce un don à Campus Boost ?{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </summary>
            <p>
              Non. Campus Boost est un projet étudiant de présentation. Nous ne
              collectons aucun paiement. La répartition du solde s’effectue sur
              la plateforme officielle SOLTéA au bénéfice de l’établissement ou
              de la formation habilitée sélectionnée.
            </p>
          </details>
          <details>
            <summary>
              Puis-je choisir un équipement précis ?{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </summary>
            <p>
              Le simulateur illustre des possibilités pédagogiques. Il ne
              constitue pas une commande et ne permet pas d’affecter le solde à
              un matériel précis. L’établissement décide de l’usage réel des
              fonds.
            </p>
          </details>
          <details>
            <summary>
              Toutes les formations présentées sont-elles éligibles ?{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </summary>
            <p>
              Le catalogue pédagogique et la liste des bénéficiaires habilités
              sont distincts. Les fiches indiquent leur source de référence.
              Vérifiez toujours l’habilitation et le bénéficiaire exacts pour la
              campagne en cours dans SOLTéA.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
