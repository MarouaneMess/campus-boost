import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Building2, UsersRound, ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui";
import { LegacyAnchorRedirect } from "@/components/legacy-anchor-redirect";

export const metadata: Metadata = {
  title: "Campus Boost — Entreprises & ambassadeurs",
  description:
    "Choisissez votre parcours : découvrir les talents de l’UFR et contribuer en tant qu’entreprise, ou faire connaître CampusBoost en tant qu’ambassadeur.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main id="main-content" className="audience-home">
      <LegacyAnchorRedirect />
      <section
        className="audience-gateway container"
        aria-labelledby="audience-title"
      >
        <div className="gateway-heading">
          <Eyebrow>CAMPUS BOOST · UNIVERSITÉ PARIS CITÉ</Eyebrow>
          <h1 id="audience-title">
            Je suis<em>…</em>
          </h1>
          <p>
            Deux façons de faire grandir les liens
            <br className="desktop-break" /> avec l’UFR Mathématiques et
            Informatique.
          </p>
        </div>
        <div className="audience-choices">
          <Link
            href="/entreprises"
            className="audience-choice company-choice"
            aria-label="Je suis une entreprise"
            prefetch={false}
          >
            <span className="choice-top">
              <Building2 size={32} strokeWidth={1.35} aria-hidden="true" />
              <span>01 / DÉCOUVRIR & CONTRIBUER</span>
            </span>
            <h2>
              Une entreprise<em>.</em>
            </h2>
            <p>
              Découvrez les compétences, explorez des sujets de projets et
              échangez avec l’UFR pour préparer votre soutien.
            </p>
            <ul>
              <li>MATCH & formations</li>
              <li>Sujets étudiants</li>
              <li>SOLTéA & contact</li>
            </ul>
            <span className="choice-action">
              Accéder au parcours entreprises{" "}
              <ArrowUpRight size={21} aria-hidden="true" />
            </span>
          </Link>
          <Link
            href="/ambassadeurs"
            className="audience-choice ambassador-choice"
            aria-label="Je suis un ambassadeur"
            prefetch={false}
          >
            <span className="choice-top">
              <UsersRound size={32} strokeWidth={1.35} aria-hidden="true" />
              <span>02 / PARTAGER & MOBILISER</span>
            </span>
            <h2>
              Un ambassadeur<em>.</em>
            </h2>
            <p>
              Étudiant, alumni ou enseignant : trouvez les supports pour
              présenter CampusBoost et faire vivre notre communauté.
            </p>
            <ul>
              <li>Kit à partager</li>
              <li>Parcours & témoignages</li>
              <li>Rencontres & défis</li>
            </ul>
            <span className="choice-action">
              Accéder au parcours ambassadeurs{" "}
              <ArrowUpRight size={21} aria-hidden="true" />
            </span>
          </Link>
        </div>
        <p className="gateway-note">
          Une initiative étudiante du M1 MIAGE.{" "}
          <span>
            Vous pourrez changer de parcours à tout moment.{" "}
            <ArrowRight size={14} aria-hidden="true" />
          </span>
        </p>
      </section>
    </main>
  );
}
