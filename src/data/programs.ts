import type { Program } from "../types/content.ts";

export const programs: Program[] = [
  {
    id: "iad",
    short: "IAD",
    level: "Master",
    mention: "Informatique",
    name: "Intelligence artificielle distribuée",
    description:
      "Apprentissage automatique, raisonnement et coordination de systèmes multiagents.",
    skills: ["ai", "software", "modeling"],
    eligibility: "ufr-listed",
    url: "https://math-info.u-paris.fr/master-informatique/parcours-intelligence-artificielle-distribuee/",
  },
  {
    id: "dci",
    short: "DCI",
    level: "Master",
    mention: "Informatique",
    name: "Données, connaissances et intelligence",
    description:
      "De l’intégration de données à l’analyse, à l’apprentissage et à la représentation des connaissances.",
    skills: ["data", "ai", "statistics", "software"],
    eligibility: "ufr-listed",
    url: "https://math-info.u-paris.fr/parcours-donnees-connaissances-et-intelligence/",
  },
  {
    id: "rsa",
    short: "RSA",
    level: "Master",
    mention: "Informatique",
    name: "Réseaux et systèmes autonomes",
    description:
      "Réseaux, cloud, virtualisation, objets connectés et sécurité des infrastructures.",
    skills: ["networks", "cyber", "software", "data"],
    eligibility: "ufr-listed",
    url: "https://math-info.u-paris.fr/master-parcours-reseaux-et-systemes-autonomes/",
  },
  {
    id: "vmi",
    short: "VMI",
    level: "Master",
    mention: "Informatique",
    name: "Vision et machine intelligente",
    description:
      "Traitement d’images, vision informatique et apprentissage pour interpréter le monde visuel.",
    skills: ["vision", "ai", "modeling"],
    eligibility: "ufr-listed",
    url: "https://math-info.u-paris.fr/master-informatique/parcours-vision-et-machine-intelligente/",
  },
  {
    id: "miage",
    short: "MIAGE",
    level: "Master",
    mention: "Méthodes informatiques appliquées à la gestion des entreprises",
    name: "Valorisation et protection des données de l’entreprise",
    description:
      "Systèmes d’information, développement, décisionnel et protection des données de l’entreprise.",
    skills: ["management", "software", "data", "cyber"],
    eligibility: "ufr-listed",
    url: "https://math-info.u-paris.fr/master-miage/",
  },
  {
    id: "imb",
    short: "IMB",
    level: "Master",
    mention: "Mathématiques et applications",
    name: "Ingénierie mathématique et biostatistique",
    description:
      "Statistiques, données de santé et méthodes mathématiques pour l’analyse et la modélisation.",
    skills: ["statistics", "modeling", "data", "ai"],
    eligibility: "university-listed",
    url: "https://math-info.u-paris.fr/master-mathematiques-et-applications/specialite-ingenierie-mathematique-et-biostatistique/",
  },
  {
    id: "mmas",
    short: "MMAS",
    level: "Master",
    mention: "Mathématiques et applications",
    name: "Mathématiques, modélisation et apprentissage statistique",
    description:
      "Probabilités, modèles mathématiques et apprentissage statistique pour les données et les images.",
    skills: ["modeling", "statistics", "ai", "vision"],
    eligibility: "university-listed",
    url: "https://math-info.u-paris.fr/master-mathematiques-et-applications/parcours-mathematiques-modelisation-et-apprentissage-statistique/",
  },
  {
    id: "l3-miage",
    short: "MIAGE",
    level: "Licence 3",
    mention: "Informatique",
    name: "Méthodes informatiques appliquées à la gestion des entreprises",
    description:
      "Une double culture en informatique et en gestion des organisations.",
    skills: ["software", "management"],
    eligibility: "to-check",
    affiliationNote:
      "Parcours identifié par l’UFR ; la fiche de formation rattache la L3 à l’IUT Paris – Rives de Seine. Vérifier le bénéficiaire exact dans SOLTéA.",
    url: "https://odf.u-paris.fr/fr/offre-de-formation/licence-XA/sciences-technologies-sante-STS/informatique-K2VO937D/licence-informatique-parcours-methodes-informatiques-appliquees-a-la-gestion-des-entreprises-miage-M4VBZXTY.html",
  },
  {
    id: "mva",
    short: "MVA",
    level: "Master 2",
    mention: "Mathématiques et applications",
    name: "Mathématiques, vision, apprentissage",
    description:
      "Une voie de spécialisation en apprentissage et en vision, accessible sur dossier après le M1 MMAS.",
    skills: ["vision", "ai", "modeling", "statistics"],
    eligibility: "university-listed",
    affiliationNote:
      "Formation en partenariat, pilotée par l’ENS Paris-Saclay. L’admission et le rattachement administratif sont à confirmer individuellement.",
    url: "https://math-info.u-paris.fr/master-mathematiques-et-applications/",
  },
];

export const eligibilityLabels = {
  "ufr-listed": "Référencé SOLTéA par l’UFR · 2026",
  "university-listed": "Référencé dans la plaquette TA · 2026",
  "to-check": "Bénéficiaire SOLTéA à vérifier",
} as const;
