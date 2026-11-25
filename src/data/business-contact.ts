export const businessContacts = {
  ufr: {
    name: "UFR · Communication et offres entreprises",
    email: "communication@mi.parisdescartes.fr",
    source: "https://math-info.u-paris.fr/vous-etes-une-entreprise/",
  },
  tax: {
    name: "Université Paris Cité · DEFI, Pôle Formation Professionnelle",
    email: "taxe-apprentissage.defi@u-paris.fr",
    source: "https://formationcontinue.u-paris.fr/vos-interlocuteurs/",
  },
};
export function contactMailto(
  kind: keyof typeof businessContacts,
  subject: string,
) {
  return `mailto:${businessContacts[kind].email}?subject=${encodeURIComponent(`CampusBoost — ${subject}`)}&body=${encodeURIComponent("Bonjour,\n\nJe représente [entreprise].\nMa demande : [contexte, formation concernée et disponibilités].\nPourriez-vous m’orienter vers la personne compétente ?\n\nBien cordialement,\n[Nom et coordonnées]")}`;
}
