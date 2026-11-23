export const competitionTracks = [
  {
    id: "cyber",
    title: "CTF & cybersécurité",
    icon: "shield",
    reference: "France Cybersecurity Challenge · ANSSI",
    url: "https://cyber.gouv.fr/offre-de-service/formations-entrainement-et-decouverte-des-metiers/challenges/france-cybersecurity-challenge/",
    idea: "Constituer un groupe d’entraînement aux challenges techniques, dans les environnements autorisés du concours.",
    skills: "Analyse, sécurité, résolution de problèmes",
  },
  {
    id: "hackathon",
    title: "Hackathons",
    icon: "code",
    reference: "La Nuit de l’Info",
    url: "https://www.nuitdelinfo.com/",
    idea: "Construire une application en équipe et raconter les choix techniques dans une démonstration courte.",
    skills: "Développement, coopération, prototypage",
  },
  {
    id: "algorithm",
    title: "Programmation algorithmique",
    icon: "terminal",
    reference: "International Collegiate Programming Contest",
    url: "https://icpc.global/",
    idea: "S’entraîner à résoudre des problèmes sous contrainte de temps, en s’appuyant sur la complémentarité de l’équipe.",
    skills: "Algorithmique, logique, travail en équipe",
  },
  {
    id: "data",
    title: "Intelligence artificielle & data",
    icon: "data",
    reference: "Challenge Data",
    url: "https://challengedata.ens.fr/",
    idea: "Comparer des approches sur un jeu de données autorisé et expliquer la démarche d’évaluation.",
    skills: "Statistiques, modélisation, apprentissage",
  },
  {
    id: "math",
    title: "Concours de mathématiques",
    icon: "math",
    reference: "International Mathematics Competition",
    url: "https://www.imc-math.org.uk/",
    idea: "Préparer des problèmes de mathématiques et travailler la rigueur des démonstrations avec un encadrement adapté.",
    skills: "Raisonnement, démonstration, persévérance",
  },
];

/** Ajouter une réussite uniquement avec une source et un rattachement UFR vérifiés. */
export const competitionResults: {
  title: string;
  team: string;
  result: string;
  source: string;
}[] = [];
/** Un logo n’est affiché que si participation ET droits sont documentés. */
export const competitionPartners: {
  name: string;
  logo: string;
  url: string;
  participationSource: string;
  logoPermissionDate: string;
}[] = [];
