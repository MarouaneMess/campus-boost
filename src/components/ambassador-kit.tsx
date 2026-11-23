"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Copy, Download, FileText, Link2 } from "lucide-react";
import { ambassadorTemplates, shareUrl } from "@/data/ambassador";
import { SectionHeading } from "@/components/ui";

export function AmbassadorKit() {
  const [selected, setSelected] = useState("email");
  const [message, setMessage] = useState("");
  const template = ambassadorTemplates.find((item) => item.id === selected)!;
  async function copy(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setMessage(`${label} copié.`);
    } catch {
      setMessage(
        "Copie automatique indisponible : sélectionnez le texte affiché puis utilisez Ctrl+C ou ⌘C.",
      );
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob(["\uFEFF", template.text], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = template.filename;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section
      id="ambassadeurs"
      className="section ambassador-section"
      aria-labelledby="ambassador-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="LE KIT AMBASSADEUR"
          id="ambassador-title"
          title={
            <>
              Une connexion peut
              <br />
              <em>commencer avec vous.</em>
            </>
          }
          description="Étudiants, enseignants, alumni : des supports pour parler de l’UFR à vos contacts professionnels. À personnaliser, à partager, à faire vivre."
        />
        <div className="ambassador-layout">
          <div className="ambassador-editor">
            <div
              className="filter-tabs wrap-filters"
              role="group"
              aria-label="Choisir un modèle du kit ambassadeur"
            >
              {ambassadorTemplates.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === selected}
                  className={item.id === selected ? "active" : ""}
                  onClick={() => {
                    setSelected(item.id);
                    setMessage("");
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="template-hint">{template.hint}</p>
            <label className="sr-only" htmlFor="ambassador-template">
              Texte du modèle : {template.label}
            </label>
            <textarea
              id="ambassador-template"
              readOnly
              value={template.text}
              spellCheck={false}
            />
            <div className="kit-actions">
              <button
                className="button button-dark"
                type="button"
                onClick={() => copy(template.text, "Modèle")}
              >
                <Copy size={16} aria-hidden="true" />
                Copier le modèle
              </button>
              <button
                className="button button-outline"
                type="button"
                onClick={download}
              >
                <Download size={16} aria-hidden="true" />
                Télécharger le texte
              </button>
            </div>
          </div>
          <aside
            className="ambassador-resources"
            aria-label="Supports à partager"
          >
            <FileText size={36} strokeWidth={1.2} aria-hidden="true" />
            <p className="eyebrow">
              <span /> À GARDER SOUS LA MAIN
            </p>
            <h3>
              L’essentiel,
              <br />
              <em>en quelques pages.</em>
            </h3>
            <p>
              Une brochure présentant l’UFR, CampusBoost et les repères du
              parcours SOLTéA.
            </p>
            <a
              className="button button-primary"
              href="/documents/campusboost-brochure.pdf"
              download
            >
              <Download size={16} aria-hidden="true" />
              Télécharger la brochure PDF
            </a>
            <Link className="text-link" href="/kit-ambassadeur/brochure">
              Lire la version accessible{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <div className="share-link">
              <label htmlFor="campus-share">Le lien CampusBoost</label>
              <input id="campus-share" value={shareUrl} readOnly />
              <button
                className="text-link"
                type="button"
                onClick={() => copy(shareUrl, "Lien")}
              >
                <Link2 size={16} aria-hidden="true" />
                Copier le lien à partager
              </button>
            </div>
            <a href="#soutenir" className="text-link">
              Le guide SOLTéA en 5 étapes{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </aside>
        </div>
        <p className="copy-feedback" role="status" aria-live="polite">
          {message}
        </p>
        <p className="method-note">
          Supports de l’initiative étudiante, à faire valider avant toute
          communication au nom de l’UFR. Aucun message n’est envoyé depuis ce
          site.
        </p>
      </div>
    </section>
  );
}
