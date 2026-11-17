export const siteConfig = {
  name: "Campus Boost",
  slogan: "Investissez dans les talents de demain.",
  verificationDate: "2026-11-17",
  verificationLabel: "17 novembre 2026",
  soltea: {
    url: "https://www.soltea.education.gouv.fr/",
    ufrUrl: "https://math-info.u-paris.fr/entreprises/",
    guideUrl: "https://www.soltea.education.gouv.fr/espace-public/node/1864",
    eligibilityPdfUrl:
      "https://formationcontinue.u-paris.fr/wp-content/uploads/sites/50/2026/04/Plaquette-formations-%C3%A9ligibles-%C3%A0-la-TA-2026.pdf",
    beneficiary: "UNIVERSITE PARIS CITE",
    component: "UFR Mathématiques et Informatique",
    // Confirmés sur la page Entreprises de l’UFR, le 17/11/2026. Ne pas les remplacer par des exemples.
    uai: "0755976N",
    siret: "13002573700011",
    campaignNote:
      "La campagne de répartition 2026 est close depuis le 21 octobre. Consultez SOLTéA pour le calendrier de la prochaine campagne.",
  },
  video: {
    // Ajouter un MP4 local et des sous-titres VTT autorisés ; aucun fichier fictif n’est chargé.
    src: null as string | null,
    subtitles: null as string | null,
    poster: "/images/video-poster.svg",
    title: "Campus Boost, les talents en mouvement",
  },
};
