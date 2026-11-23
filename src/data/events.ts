import type { CampusEvent } from "../types/content.ts";

/** Une date officielle d’événement ne confirme jamais notre participation. */
export const campusEvents: CampusEvent[] = [
  {
    id: "nuit-info",
    name: "La Nuit de l’Info",
    category: "Défi de développement",
    dateLabel: "3–4 décembre 2026",
    startDate: "2026-12-03",
    endDate: "2026-12-04",
    location: "Sites participants et en ligne · site d’accueil à choisir",
    audience: "Étudiants, équipes pédagogiques et professionnels du numérique",
    reason:
      "Un format collectif pour pratiquer le développement et présenter des démarches de projet.",
    companyProfiles:
      "Professionnels et entreprises proposant des défis, selon la liste de l’organisateur.",
    action:
      "Étudier l’inscription d’une équipe et préparer une restitution des apprentissages.",
    participation: "envisaged",
    source: {
      url: "https://www.nuitdelinfo.com/",
      label: "Calendrier de l’organisateur",
    },
  },
  {
    id: "rencontre-ufr",
    name: "Rencontre étudiants–entreprises",
    category: "Rencontre professionnelle",
    dateLabel: "À définir",
    location: "À définir avec l’UFR",
    audience: "Étudiants, alumni, recruteurs et équipes pédagogiques",
    reason:
      "Créer un temps de dialogue autour des compétences, des métiers et des projets.",
    companyProfiles:
      "ESN, équipes SI, cabinets de conseil et recruteurs à identifier.",
    action:
      "Proposer un stand CampusBoost et une démonstration de MATCH à l’équipe organisatrice.",
    participation: "envisaged",
  },
  {
    id: "vivatech",
    name: "Viva Technology 2027",
    category: "Salon du numérique",
    dateLabel: "16–19 juin 2027",
    startDate: "2027-06-16",
    endDate: "2027-06-19",
    location: "Paris Expo Porte de Versailles",
    audience: "Entreprises, startups et acteurs de l’innovation",
    reason:
      "Repérer des usages de l’IA et du numérique à mettre en regard des formations.",
    companyProfiles:
      "Exposants de l’édition 2027 à consulter auprès de l’organisateur.",
    action:
      "Étudier une visite de prospection, ses conditions d’accès et les contacts à préparer.",
    participation: "envisaged",
    source: {
      url: "https://vivatech.com/",
      label: "Informations de l’organisateur",
    },
  },
  {
    id: "conference",
    name: "Regards croisés : données & métiers",
    category: "Idée de conférence",
    dateLabel: "À définir",
    location: "Campus ou visioconférence · à confirmer",
    audience: "Étudiants, enseignants, alumni et professionnels",
    reason:
      "Relier un sujet de cours à une problématique professionnelle concrète.",
    companyProfiles:
      "Équipes data et SI ; intervenants à solliciter, sans engagement acquis.",
    action:
      "Construire un format court avec une présentation étudiante et un échange métier.",
    participation: "envisaged",
  },
  {
    id: "hackathon",
    name: "Un défi, une équipe, un prototype",
    category: "Idée de hackathon",
    dateLabel: "À définir",
    location: "À définir avec les équipes pédagogiques",
    audience: "Étudiants en informatique et mathématiques",
    reason:
      "Travailler la coopération, le prototypage et la présentation d’une solution.",
    companyProfiles:
      "Acteurs du logiciel et de la donnée susceptibles de proposer un sujet.",
    action:
      "Soumettre un cadre pédagogique, un sujet et des règles d’utilisation des données.",
    participation: "envisaged",
  },
  {
    id: "competition",
    name: "Atelier de préparation aux compétitions",
    category: "Idée d’atelier informatique & maths",
    dateLabel: "À définir",
    location: "À définir",
    audience: "Étudiants volontaires et encadrants",
    reason:
      "Aborder la résolution de problèmes, l’algorithmique et les raisonnements mathématiques.",
    companyProfiles:
      "Éventuels mentors techniques à identifier ; aucun partenaire confirmé.",
    action:
      "Identifier une compétition adaptée et organiser des séances d’entraînement.",
    participation: "envisaged",
  },
  {
    id: "campusboost",
    name: "Les connexions CampusBoost",
    category: "Idée de rendez-vous CampusBoost",
    dateLabel: "À définir",
    location: "À définir avec l’UFR",
    audience: "Communauté de l’UFR et contacts professionnels",
    reason:
      "Donner à voir les projets et rendre le fonctionnement de SOLTéA compréhensible.",
    companyProfiles:
      "Contacts des étudiants et alumni, invités après validation du format.",
    action:
      "Préparer des démonstrations, des témoignages autorisés et un point d’information SOLTéA.",
    participation: "envisaged",
  },
];

export type EventStatus = "envisaged" | "confirmed" | "past";
export const eventStatusLabels: Record<EventStatus, string> = {
  envisaged: "Envisagé",
  confirmed: "Confirmé",
  past: "Passé",
};

/** Dates civiles françaises : le statut d’un événement passé n’affirme pas notre présence. */
export function getEventStatus(event: CampusEvent, today: string): EventStatus {
  const lastDay = event.endDate ?? event.startDate;
  if (lastDay && lastDay < today) return "past";
  return event.participation === "confirmed" && event.confirmationSource
    ? "confirmed"
    : "envisaged";
}
