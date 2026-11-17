import type { Sector } from "../types/content.ts";

/** Illustrations de besoins métiers, sans entreprise ni partenariat attribué. */
export const sectors: Sector[] = [
  {
    id: "banking",
    name: "Banque et assurance",
    short: "Banque",
    icon: "bank",
    description: "Éclairer les décisions. Protéger la confiance.",
    projectId: "fraud",
    needs: [
      {
        id: "fraud",
        label: "Détection de fraude",
        skills: ["ai", "data", "statistics"],
      },
      { id: "security", label: "Cybersécurité", skills: ["cyber", "networks"] },
      {
        id: "risk",
        label: "Gestion des risques",
        skills: ["modeling", "statistics"],
      },
      {
        id: "analytics",
        label: "Analyse de données",
        skills: ["data", "management"],
      },
      {
        id: "decision",
        label: "Intelligence artificielle",
        skills: ["ai", "software"],
      },
    ],
  },
  {
    id: "tech",
    name: "Informatique et conseil",
    short: "Informatique",
    icon: "code",
    description: "Construire les outils qui font avancer les organisations.",
    projectId: "software",
    needs: [
      {
        id: "software",
        label: "Applications métier",
        skills: ["software", "management"],
      },
      {
        id: "cloud",
        label: "Cloud et infrastructures",
        skills: ["networks", "cyber"],
      },
      { id: "data", label: "Valorisation des données", skills: ["data", "ai"] },
      {
        id: "security",
        label: "Sécurité des systèmes",
        skills: ["cyber", "software"],
      },
      {
        id: "transformation",
        label: "Transformation numérique",
        skills: ["management", "software"],
      },
    ],
  },
  {
    id: "aviation",
    name: "Aviation et aéronautique",
    short: "Aviation",
    icon: "plane",
    description:
      "Modéliser la complexité. Donner de nouvelles perspectives au ciel.",
    projectId: "trajectory",
    needs: [
      {
        id: "trajectory",
        label: "Optimisation des trajectoires",
        skills: ["modeling", "ai"],
      },
      {
        id: "flows",
        label: "Analyse des flux",
        skills: ["data", "statistics"],
      },
      {
        id: "simulation",
        label: "Simulation mathématique",
        skills: ["modeling", "software"],
      },
      {
        id: "maintenance",
        label: "Maintenance prédictive",
        skills: ["ai", "data", "statistics"],
      },
      { id: "vision", label: "Vision artificielle", skills: ["vision", "ai"] },
    ],
  },
  {
    id: "health",
    name: "Santé et pharmacie",
    short: "Santé",
    icon: "heart",
    description: "Faire parler les données pour mieux comprendre le vivant.",
    projectId: "imaging",
    needs: [
      {
        id: "biostats",
        label: "Biostatistiques",
        skills: ["statistics", "modeling"],
      },
      { id: "data", label: "Données de santé", skills: ["data", "cyber"] },
      { id: "imaging", label: "Imagerie médicale", skills: ["vision", "ai"] },
      {
        id: "models",
        label: "Modélisation",
        skills: ["modeling", "statistics"],
      },
      { id: "ai", label: "Intelligence artificielle", skills: ["ai", "data"] },
    ],
  },
  {
    id: "energy",
    name: "Énergie",
    short: "Énergie",
    icon: "energy",
    description: "Anticiper la demande. Mieux comprendre les ressources.",
    projectId: "energy",
    needs: [
      {
        id: "forecast",
        label: "Prévision de la demande",
        skills: ["statistics", "ai", "data"],
      },
      {
        id: "grid",
        label: "Réseaux intelligents",
        skills: ["networks", "modeling"],
      },
      {
        id: "maintenance",
        label: "Maintenance prédictive",
        skills: ["ai", "data"],
      },
      {
        id: "models",
        label: "Simulation des systèmes",
        skills: ["modeling", "software"],
      },
      {
        id: "security",
        label: "Sécurité des infrastructures",
        skills: ["cyber", "networks"],
      },
    ],
  },
  {
    id: "retail",
    name: "Commerce et distribution",
    short: "Commerce",
    icon: "shop",
    description: "Comprendre les usages. Fluidifier les opérations.",
    projectId: "retail",
    needs: [
      {
        id: "forecast",
        label: "Prévision des ventes",
        skills: ["statistics", "data"],
      },
      {
        id: "stock",
        label: "Optimisation des stocks",
        skills: ["modeling", "management"],
      },
      { id: "recommendation", label: "Recommandation", skills: ["ai", "data"] },
      {
        id: "commerce",
        label: "Plateformes e-commerce",
        skills: ["software", "management"],
      },
      {
        id: "privacy",
        label: "Protection des données",
        skills: ["cyber", "software"],
      },
    ],
  },
  {
    id: "telecom",
    name: "Télécommunications",
    short: "Télécoms",
    icon: "radio",
    description: "Connecter les usages. Assurer la continuité des services.",
    projectId: "network",
    needs: [
      {
        id: "networks",
        label: "Performance des réseaux",
        skills: ["networks", "modeling"],
      },
      {
        id: "anomalies",
        label: "Détection d’anomalies",
        skills: ["ai", "data"],
      },
      { id: "security", label: "Cybersécurité", skills: ["cyber", "networks"] },
      {
        id: "iot",
        label: "Objets connectés",
        skills: ["networks", "software"],
      },
      {
        id: "traffic",
        label: "Analyse du trafic",
        skills: ["statistics", "data"],
      },
    ],
  },
  {
    id: "transport",
    name: "Transport et logistique",
    short: "Transport",
    icon: "truck",
    description: "Organiser les flux. Rapprocher les territoires.",
    projectId: "logistics",
    needs: [
      {
        id: "routes",
        label: "Optimisation des tournées",
        skills: ["modeling", "ai"],
      },
      {
        id: "forecast",
        label: "Prévision des flux",
        skills: ["statistics", "data"],
      },
      {
        id: "tracking",
        label: "Traçabilité",
        skills: ["software", "networks"],
      },
      {
        id: "planning",
        label: "Planification",
        skills: ["management", "modeling"],
      },
      { id: "vision", label: "Vision et contrôle", skills: ["vision", "ai"] },
    ],
  },
];
