import { ArrowUpRight } from "lucide-react";

const objectives = [
  {
    href: "#sujets",
    title: "Proposer un projet",
    text: "Explorer des idées par formation.",
  },
  {
    href: "#terrain",
    title: "Rencontrer les étudiants",
    text: "Partager un métier, un défi ou une expérience.",
  },
  {
    href: "#contribuer",
    title: "Soutenir une formation",
    text: "Comprendre SOLTÉA et préparer votre démarche.",
  },
];

export function CompanyOverview() {
  return (
    <section
      id="ufr"
      className="company-overview container"
      aria-labelledby="company-overview-title"
    >
      <div>
        <p className="eyebrow">UFR MATHÉMATIQUES ET INFORMATIQUE</p>
        <h2 id="company-overview-title">Trois façons de construire un lien.</h2>
        <p>
          À Université Paris Cité, les mathématiques, l’informatique et les
          systèmes d’information se rencontrent. CampusBoost vous aide à
          explorer ces compétences et à échanger avec l’UFR.
        </p>
      </div>
      <nav aria-label="Votre objectif entreprise">
        {objectives.map((item) => (
          <a href={item.href} key={item.href}>
            <strong>
              {item.title}
              <ArrowUpRight size={18} aria-hidden="true" />
            </strong>
            <span>{item.text}</span>
          </a>
        ))}
      </nav>
    </section>
  );
}
