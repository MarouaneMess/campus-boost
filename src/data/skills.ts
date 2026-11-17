import type { Skill } from "../types/content.ts";

export const skills: Skill[] = [
  {
    id: "ai",
    name: "Intelligence artificielle",
    short: "IA",
    description:
      "Concevoir des modèles qui apprennent, raisonnent et aident à décider.",
  },
  {
    id: "data",
    name: "Science des données",
    short: "Data",
    description: "Structurer, explorer et valoriser des données complexes.",
  },
  {
    id: "cyber",
    name: "Cybersécurité",
    short: "Sécurité",
    description:
      "Comprendre les risques et protéger les données et les systèmes.",
  },
  {
    id: "software",
    name: "Développement logiciel",
    short: "Logiciel",
    description:
      "Transformer un besoin en une application fiable et maintenable.",
  },
  {
    id: "networks",
    name: "Réseaux et systèmes",
    short: "Réseaux",
    description: "Connecter les infrastructures, les services et les objets.",
  },
  {
    id: "vision",
    name: "Vision par ordinateur",
    short: "Vision",
    description: "Extraire de l’information des images et des signaux.",
  },
  {
    id: "modeling",
    name: "Modélisation mathématique",
    short: "Modélisation",
    description: "Représenter des phénomènes et explorer des scénarios.",
  },
  {
    id: "statistics",
    name: "Statistiques",
    short: "Statistiques",
    description: "Quantifier l’incertitude et interpréter des observations.",
  },
  {
    id: "management",
    name: "Systèmes d’information",
    short: "SI & gestion",
    description:
      "Articuler informatique, gestion de projet et besoins des organisations.",
  },
];

export const skillById = Object.fromEntries(
  skills.map((skill) => [skill.id, skill]),
) as Record<Skill["id"], Skill>;
