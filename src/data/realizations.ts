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
    id: "jeu-dames-ia",
    title: "Jeu de dames : explorer les décisions d’une IA",
    formation: "Projet partagé par Marouane · intelligence artificielle",
    programIds: [],
    summary:
      "Un jeu en Python pour confronter des stratégies de décision et comprendre la recherche de coups.",
    problem:
      "Comment choisir un coup en explorant les possibilités du jeu tout en limitant le nombre de positions évaluées ?",
    technologies: ["Python", "Tkinter", "Minimax", "Alpha-Beta"],
    skills: ["ai", "software"],
    domains: ["ai", "software"],
    teamLabel:
      "Marouane Messafri et Adel Nekiche · auteurs indiqués dans le dépôt",
    images: [
      {
        src: "/projects/jeu-dames-benchmarks.png",
        alt: "Graphiques de comparaison des évaluateurs publiés dans le dépôt Jeu-Dames-Ai.",
      },
    ],
    result:
      "Le dépôt présente une interface Tkinter, trois niveaux d’IA, des tests et des scripts de comparaison. Les graphiques reproduisent les résultats publiés par les auteurs ; aucune mesure n’a été reproduite pour cette présentation.",
    repository: "https://github.com/MarouaneMess/Jeu-Dames-Ai",
    evidence: {
      url: "https://github.com/MarouaneMess/Jeu-Dames-Ai",
      label: "README, code et graphiques du projet",
      checkedAt: "2026-11-26",
    },
    status: "documented",
  },
  {
    id: "mini-sgbd",
    title: "Mini-SGBD : comprendre le stockage des données",
    formation: "Projet BDDA · bases de données avancées",
    programIds: [],
    summary:
      "Un moteur pédagogique en Java qui relie stockage sur disque, mémoire tampon et gestion des tables.",
    problem:
      "Comment organiser les couches d’un système de gestion de base de données et exposer des commandes de manipulation de tables ?",
    technologies: ["Java", "Stockage disque", "Buffer manager", "SQL"],
    skills: ["data", "software"],
    domains: ["data", "software"],
    teamLabel: "Projet publié sur le compte GitHub MarouaneMess",
    images: [],
    result:
      "Le dépôt documente un SGBD simplifié développé pour le cours BDDA : gestion du stockage, des buffers, du schéma et des commandes CREATE, DROP et DESCRIBE TABLE. Il comprend le code, des tests et un guide de lancement.",
    repository: "https://github.com/MarouaneMess/PROJET_BBDA",
    evidence: {
      url: "https://github.com/MarouaneMess/PROJET_BBDA",
      label: "README et architecture du mini-SGBD",
      checkedAt: "2026-11-26",
    },
    status: "documented",
  },
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
