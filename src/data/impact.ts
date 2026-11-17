import type { Equipment } from "../types/content.ts";

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

export const impactCategories = [
  {
    number: "01",
    title: "Des salles informatiques à la hauteur",
    description:
      "Postes de travail, écrans et périphériques pour les travaux pratiques.",
    icon: "monitor",
  },
  {
    number: "02",
    title: "L’IA au-delà de la théorie",
    description:
      "Stations GPU et ressources de calcul pour manipuler de vrais modèles.",
    icon: "cpu",
  },
  {
    number: "03",
    title: "La cybersécurité par la pratique",
    description:
      "Routeurs, commutateurs et machines isolées pour un laboratoire pédagogique.",
    icon: "shield",
  },
  {
    number: "04",
    title: "Des mathématiques en action",
    description:
      "Tablettes graphiques, ressources de calcul et outils d’analyse statistique.",
    icon: "chart",
  },
  {
    number: "05",
    title: "De l’espace pour les idées",
    description:
      "Écrans de partage et tableaux mobiles pour les ateliers collaboratifs.",
    icon: "users",
  },
  {
    number: "06",
    title: "Des projets qui prennent forme",
    description:
      "Cartes programmables, capteurs et kits de prototypage pour les projets étudiants.",
    icon: "layers",
  },
] as const;
