import type { PedagogicalProject } from "../types/content.ts";

export const projects: PedagogicalProject[] = [
  {
    id: "trajectory",
    title: "Et si l’on optimisait une trajectoire aérienne ?",
    category: "Aéronautique · Modélisation & IA",
    description:
      "Comparer des itinéraires sur un jeu de données synthétiques, sous contraintes de distance, de météo simulée et de consommation estimée.",
    deliverable:
      "Un simulateur de trajectoires et une analyse critique des modèles.",
    skills: ["modeling", "ai", "data"],
    icon: "plane",
    status: "illustrative",
  },
  {
    id: "fraud",
    title: "Repérer l’inhabituel dans les transactions",
    category: "Banque · Données & statistiques",
    description:
      "Explorer la détection d’anomalies sur des transactions synthétiques et mesurer les faux positifs pour discuter les limites d’un modèle.",
    deliverable:
      "Un tableau d’analyse explicable et une évaluation des erreurs.",
    skills: ["data", "ai", "statistics"],
    icon: "bank",
    status: "illustrative",
  },
  {
    id: "software",
    title: "Un outil métier, de l’idée au prototype",
    category: "Informatique · Logiciel & SI",
    description:
      "Concevoir une application de gestion de ressources, depuis le recueil des besoins jusqu’aux tests et à l’accessibilité.",
    deliverable: "Une application testée, accompagnée de sa documentation.",
    skills: ["software", "management", "cyber"],
    icon: "code",
    status: "illustrative",
  },
  {
    id: "imaging",
    title: "Apprendre à lire les images autrement",
    category: "Santé · Vision & IA",
    description:
      "Étudier la segmentation d’images sur des données pédagogiques autorisées, en comparant plusieurs méthodes sans usage clinique.",
    deliverable: "Un prototype de segmentation et un rapport d’évaluation.",
    skills: ["vision", "ai", "statistics"],
    icon: "heart",
    status: "illustrative",
  },
  {
    id: "energy",
    title: "Anticiper la consommation d’un bâtiment",
    category: "Énergie · Statistiques & données",
    description:
      "Construire une prévision à partir de séries temporelles synthétiques et analyser l’effet de la saison et des usages.",
    deliverable: "Un modèle de prévision avec intervalles d’incertitude.",
    skills: ["statistics", "data", "modeling"],
    icon: "energy",
    status: "illustrative",
  },
  {
    id: "retail",
    title: "Mieux prévoir pour mieux approvisionner",
    category: "Commerce · Données & modélisation",
    description:
      "Tester des méthodes de prévision sur des ventes simulées pour comparer les scénarios de stock et les ruptures.",
    deliverable: "Un outil de comparaison des politiques d’approvisionnement.",
    skills: ["statistics", "data", "management"],
    icon: "shop",
    status: "illustrative",
  },
  {
    id: "network",
    title: "Un réseau pédagogique sous observation",
    category: "Télécoms · Réseaux & sécurité",
    description:
      "Observer le trafic d’un réseau isolé de laboratoire et identifier des écarts de performance dans un cadre autorisé.",
    deliverable: "Un tableau de supervision et une étude de résilience.",
    skills: ["networks", "cyber", "data"],
    icon: "radio",
    status: "illustrative",
  },
  {
    id: "logistics",
    title: "Dessiner une tournée plus efficace",
    category: "Logistique · Optimisation & IA",
    description:
      "Comparer des algorithmes de tournées sur une carte fictive avec des fenêtres horaires et des contraintes de capacité.",
    deliverable:
      "Un comparateur d’itinéraires et de compromis de planification.",
    skills: ["modeling", "ai", "software"],
    icon: "truck",
    status: "illustrative",
  },
];
