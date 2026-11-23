import type { ProjectDomain, StudentRealization } from "../types/content.ts";

export const projectDomains: { id: ProjectDomain; label: string }[] = [
  { id: "software", label: "Développement" },
  { id: "cyber", label: "Cybersécurité" },
  { id: "ai", label: "Intelligence artificielle" },
  { id: "data", label: "Data" },
  { id: "math", label: "Mathématiques" },
  { id: "management", label: "Systèmes d’information" },
];

/** Ne publier que des travaux documentés, avec preuve et médias autorisés. */
export const studentRealizations: StudentRealization[] = [
  {
    id: "campus-boost",
    title: "CampusBoost : rendre les connexions visibles",
    formation: "Master 1 MIAGE · initiative de l’équipe CampusBoost",
    programIds: ["miage"],
    summary:
      "Une expérience web pour relier les enjeux des entreprises aux compétences de l’UFR et expliquer le parcours SOLTéA.",
    problem:
      "Comment rendre une offre de formation lisible pour une entreprise, tout en distinguant les faits documentés des pistes pédagogiques ?",
    technologies: ["Next.js", "React", "TypeScript", "Three.js"],
    skills: ["software", "management"],
    domains: ["software", "management"],
    teamLabel: "L’équipe étudiante CampusBoost · M1 MIAGE",
    images: [
      {
        src: "/projects/campus-boost-match.webp",
        alt: "Capture réelle de CampusBoost MATCH : sélection du secteur et correspondances pédagogiques.",
      },
    ],
    result:
      "Un site fonctionnel avec huit parcours métiers, un catalogue de neuf formations, un simulateur illustratif et une démonstration guidée. Aucun montant collecté ni résultat commercial n’est revendiqué.",
    repository: "https://github.com/MarouaneMess/campus-boost",
    demo: "/demo",
    evidence: {
      url: "https://github.com/MarouaneMess/campus-boost",
      label: "Code source public du projet",
      checkedAt: "2026-11-18",
    },
    status: "documented",
  },
];

export const publishedRealizations = studentRealizations.filter(
  (project) => project.status === "documented" && project.evidence.url,
);
