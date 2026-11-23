import type { Equipment, FundingNeed } from "../types/content.ts";

export const equipment: Equipment[] = [
  {
    id: "workstation",
    name: "Poste informatique",
    pluralName: "Postes informatiques",
    unit: "poste",
    unitPrice: 1000,
    description:
      "Écran et ordinateur pour programmer, modéliser et travailler en projet.",
  },
  {
    id: "gpu",
    name: "Station de calcul IA",
    pluralName: "Stations de calcul IA",
    unit: "station",
    unitPrice: 2500,
    description:
      "Une station équipée d’un GPU pour expérimenter l’apprentissage automatique.",
  },
  {
    id: "network-kit",
    name: "Kit réseau pédagogique",
    pluralName: "Kits réseau pédagogiques",
    unit: "kit",
    unitPrice: 500,
    description:
      "Routeur et commutateur pour un environnement de travaux pratiques isolé.",
  },
  {
    id: "project-kit",
    name: "Kit projet étudiant",
    pluralName: "Kits projet étudiant",
    unit: "kit",
    unitPrice: 250,
    description:
      "Carte programmable, capteurs et accessoires pour un prototype étudiant.",
  },
];

export const impactCategories: FundingNeed[] = [
  {
    number: "01",
    title: "Des salles informatiques à la hauteur",
    description:
      "Postes de travail, écrans et périphériques pour les travaux pratiques.",
    icon: "monitor",
    why: "Disposer d’un environnement de travail commun pourrait faciliter les travaux pratiques et les projets en équipe.",
    programIds: ["miage", "dci", "rsa"],
    projectIds: ["software", "retail"],
    skills: ["software", "data", "management"],
    benefit:
      "Développer, tester et présenter une application dans de bonnes conditions.",
  },
  {
    number: "02",
    title: "L’IA au-delà de la théorie",
    description:
      "Stations GPU et ressources de calcul pour manipuler de vrais modèles.",
    icon: "cpu",
    why: "Des ressources de calcul pourraient permettre de comparer des modèles et de manipuler des données plus exigeantes.",
    programIds: ["iad", "dci", "vmi", "mmas"],
    projectIds: ["imaging", "fraud"],
    skills: ["ai", "vision", "data"],
    benefit:
      "Comprendre le coût du calcul, l’évaluation et les limites d’un modèle.",
  },
  {
    number: "03",
    title: "La cybersécurité par la pratique",
    description:
      "Routeurs, commutateurs et machines isolées pour un laboratoire pédagogique.",
    icon: "shield",
    why: "Un environnement isolé permettrait d’expérimenter des configurations sans intervenir sur un réseau en production.",
    programIds: ["rsa", "miage"],
    projectIds: ["network"],
    skills: ["cyber", "networks"],
    benefit:
      "Observer des flux, diagnostiquer des incidents et documenter une architecture.",
  },
  {
    number: "04",
    title: "Des mathématiques en action",
    description:
      "Tablettes graphiques, ressources de calcul et outils d’analyse statistique.",
    icon: "chart",
    why: "Des outils de calcul et de visualisation pourraient aider à confronter une hypothèse mathématique à des données.",
    programIds: ["imb", "mmas", "mva"],
    projectIds: ["trajectory", "energy", "logistics"],
    skills: ["modeling", "statistics"],
    benefit:
      "Tester un modèle, représenter l’incertitude et expliquer les résultats.",
  },
  {
    number: "05",
    title: "De l’espace pour les idées",
    description:
      "Écrans de partage et tableaux mobiles pour les ateliers collaboratifs.",
    icon: "users",
    why: "Des espaces équipés pourraient faciliter les revues de projet et le partage de prototypes.",
    programIds: ["miage", "iad", "dci"],
    projectIds: ["software", "logistics"],
    skills: ["management", "software"],
    benefit:
      "Apprendre à argumenter, répartir les tâches et restituer un travail collectif.",
  },
  {
    number: "06",
    title: "Des projets qui prennent forme",
    description:
      "Cartes programmables, capteurs et kits de prototypage pour les projets étudiants.",
    icon: "layers",
    why: "Le prototypage pourrait rendre plus tangible le lien entre logiciels, mesures et objets connectés.",
    programIds: ["rsa", "vmi", "miage"],
    projectIds: ["energy", "network"],
    skills: ["networks", "software", "vision"],
    benefit:
      "Passer d’une idée à une preuve de concept et en comprendre les contraintes.",
  },
];
