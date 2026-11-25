export const audienceNavigation = {
  entreprises: {
    label: "Parcours entreprises",
    primary: [
      { href: "/entreprises#ufr", label: "Notre UFR" },
      { href: "/entreprises#match", label: "MATCH" },
      { href: "/entreprises#sujets", label: "Idées de projets" },
      { href: "/entreprises#calendrier", label: "Calendrier" },
    ],
    more: [
      { href: "/entreprises#formations", label: "Les 9 formations" },
      { href: "/entreprises#realisations", label: "Réalisations étudiantes" },
      { href: "/entreprises#terrain", label: "Rencontres entreprises" },
      { href: "/entreprises#impact", label: "Besoins & simulateur" },
      { href: "/entreprises#soutenir", label: "Le guide SOLTéA" },
      { href: "/demo", label: "La démonstration" },
    ],
    action: { href: "/entreprises#contact", label: "Contacter l’UFR" },
  },
  ambassadeurs: {
    label: "Parcours ambassadeurs",
    primary: [
      { href: "/ambassadeurs#projet", label: "Notre initiative" },
      { href: "/ambassadeurs#ambassadeurs", label: "Kit ambassadeur" },
      { href: "/ambassadeurs#temoignages", label: "Les parcours" },
    ],
    more: [
      { href: "/ambassadeurs#competitions", label: "Les compétitions" },
      { href: "/ambassadeurs#video", label: "Les supports vidéo" },
      { href: "/kit-ambassadeur/brochure", label: "Lire la brochure" },
    ],
    action: { href: "/ambassadeurs#ambassadeurs", label: "Ouvrir le kit" },
  },
};

export function getAudience(
  pathname: string,
): keyof typeof audienceNavigation | null {
  if (
    pathname.startsWith("/ambassadeurs") ||
    pathname.startsWith("/kit-ambassadeur")
  )
    return "ambassadeurs";
  if (pathname.startsWith("/entreprises") || pathname === "/demo")
    return "entreprises";
  return null;
}

/** Conserver les liens partagés avant la séparation des parcours. */
export function getLegacyDestination(hash: string): string | null {
  const id = hash.slice(1);
  if (id === "projets" || id.startsWith("projet-"))
    return "/entreprises#sujets";
  if (
    ["projet", "ambassadeurs", "temoignages", "competitions", "video"].includes(
      id,
    )
  )
    return `/ambassadeurs${hash}`;
  if (
    [
      "ufr",
      "match",
      "formations",
      "impact",
      "simulateur",
      "realisations",
      "projets",
      "calendrier",
      "soutenir",
      "sujets",
      "contact",
      "terrain",
    ].includes(id) ||
    /^(projet-|realisation-|besoin-)/.test(id)
  )
    return `/entreprises${hash}`;
  return null;
}
