import {
  ArrowUpRight,
  Code2,
  Sigma,
  MoveUpRight,
  Fingerprint,
} from "lucide-react";
import { Eyebrow, ExternalLink } from "@/components/ui";

export function About() {
  return (
    <section
      id="projet"
      className="section about-section"
      aria-labelledby="about-title"
    >
      <div className="container about-grid">
        <div>
          <Eyebrow>LE PROJET CAMPUS BOOST</Eyebrow>
          <h2 id="about-title">
            Le prochain grand pas
            <br />
            commence par
            <br />
            <em>un lien.</em>
          </h2>
          <p className="about-lead">
            Entre vos enjeux et nos savoirs.
            <br />
            Entre l’université et le monde professionnel.
          </p>
          <p>
            Nous sommes sept étudiants de l’Université Paris Cité. Avec Campus
            Boost, nous rendons visibles les connexions entre les métiers des
            entreprises et les formations de notre UFR Mathématiques et
            Informatique.
          </p>
          <p>
            Notre ambition : vous aider à comprendre comment l’affectation de
            votre solde de taxe d’apprentissage peut soutenir l’apprentissage et
            les projets pédagogiques.
          </p>
          <a href="#match" className="text-link">
            Trouver votre point de connexion{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="about-composition">
          <div className="discipline-card math-card">
            <Sigma size={36} strokeWidth={1.3} aria-hidden="true" />
            <span>01 / COMPRENDRE</span>
            <h3>
              La rigueur
              <br />
              des mathématiques.
            </h3>
            <p>Modéliser. Analyser. Démontrer.</p>
            <div className="math-lines" aria-hidden="true">
              <svg viewBox="0 0 280 80">
                <path d="M0 65Q45 65 70 45T140 42T210 15T280 5" />
                <path d="M0 70Q40 20 75 43T140 30T210 32T280 8" />
                <path d="M0 67Q40 60 75 64T140 12T210 30T280 2" />
              </svg>
            </div>
          </div>
          <div className="discipline-card code-card">
            <Code2 size={36} strokeWidth={1.3} aria-hidden="true" />
            <span>02 / CONSTRUIRE</span>
            <h3>
              La puissance
              <br />
              de l’informatique.
            </h3>
            <p>Concevoir. Connecter. Transformer.</p>
            <div className="code-visual" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="discipline-connector" aria-hidden="true">
            +
          </div>
          <span className="composition-caption">
            <Fingerprint size={15} aria-hidden="true" /> DEUX CULTURES, UNE MÊME
            AMBITION.
          </span>
        </div>
      </div>
    </section>
  );
}

export function WhyUfr() {
  const strengths = [
    [
      "01",
      "Intelligence artificielle & données",
      "De la qualité d’un jeu de données à l’évaluation d’un modèle : relier les fondements à la mise en pratique.",
      "IAD · DCI · VMI",
    ],
    [
      "02",
      "Réseaux, sécurité & logiciel",
      "Concevoir une application, comprendre son infrastructure et interroger la protection de ses données.",
      "RSA · MIAGE",
    ],
    [
      "03",
      "Statistiques & modélisation",
      "Tester des hypothèses, représenter des phénomènes et rendre l’incertitude compréhensible.",
      "IMB · MMAS",
    ],
    [
      "04",
      "Culture scientifique & projets",
      "Apprendre à formuler un problème, expérimenter et expliquer ses choix, au contact d’enjeux professionnels.",
      "DES COMPÉTENCES TRANSVERSALES",
    ],
  ];
  return (
    <section className="why-section" aria-labelledby="why-title">
      <div className="container why-grid">
        <div className="why-intro">
          <Eyebrow light>POURQUOI NOTRE UFR ?</Eyebrow>
          <h2 id="why-title">
            Comprendre
            <br />
            en profondeur.
            <br />
            <em>Agir en pratique.</em>
          </h2>
          <p>
            La complémentarité des mathématiques et de l’informatique ouvre
            plusieurs façons d’aborder un même défi.
          </p>
          <ExternalLink
            href="https://math-info.u-paris.fr/entreprises/"
            className="text-link light-link"
          >
            Découvrir l’UFR
          </ExternalLink>
          <div className="why-symbol" aria-hidden="true">
            <MoveUpRight strokeWidth={0.6} />
          </div>
        </div>
        <div className="strengths">
          {strengths.map(([number, title, description, label]) => (
            <article key={number}>
              <span className="strength-number">{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="strength-label">{label}</span>
              </div>
              <ArrowUpRight size={18} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
