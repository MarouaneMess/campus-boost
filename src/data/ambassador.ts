import { siteConfig } from "./site.ts";
import { solteaSteps } from "./soltea.ts";

export const siteUrl = "https://campus-boost.vercel.app/";
export const shareUrl = `${siteUrl}entreprises`;
export const ufrPitch =
  "L’UFR Mathématiques et Informatique d’Université Paris Cité forme à l’informatique, aux mathématiques appliquées et aux systèmes d’information. CampusBoost, initiative étudiante du M1 MIAGE, propose de découvrir ces compétences, les projets et les possibilités de soutien aux formations habilitées via SOLTéA.";
export const solteaExplanation =
  "Le solde de la taxe d’apprentissage contribue au financement de formations habilitées. Sur SOLTéA, les employeurs désignent leurs bénéficiaires et répartissent leur solde en pourcentages pendant les périodes officielles. CampusBoost ne collecte aucun paiement. Le bénéficiaire exact, son habilitation et les dates de la campagne doivent être vérifiés sur la plateforme. L’affectation ne permet pas de réserver un équipement.";
export const ambassadorTemplates = [
  {
    id: "email",
    label: "Email professionnel",
    filename: "campusboost-email.txt",
    hint: "Personnalisez le nom du contact, votre signature et le contexte de votre échange.",
    text: `Objet : Découvrir les talents de l’UFR Mathématiques et Informatique\n\nBonjour [Nom],\n\nJe vous contacte dans le cadre de CampusBoost, une initiative étudiante du Master 1 MIAGE d’Université Paris Cité.\n\nNous souhaitons faire découvrir les compétences de notre UFR Mathématiques et Informatique et leurs liens avec les enjeux des entreprises. Notre outil MATCH permet d’explorer des formations à partir d’un secteur d’activité.\n\nSi votre entreprise est concernée par le solde de la taxe d’apprentissage, vous pouvez également découvrir le parcours d’affectation sur la plateforme officielle SOLTéA. L’habilitation du bénéficiaire et le calendrier sont à vérifier pour la campagne en cours.\n\nVoici notre présentation : ${shareUrl}\nLes informations officielles de l’UFR : ${siteConfig.soltea.ufrUrl}\n\nSeriez-vous disponible pour un premier échange autour de ces sujets ?\n\nBien cordialement,\n[Prénom Nom]\n[Formation ou fonction]\n[Coordonnées professionnelles]`,
  },
  {
    id: "linkedin",
    label: "Message LinkedIn",
    filename: "campusboost-linkedin.txt",
    hint: "Adaptez ce message à votre relation avec la personne ; aucun envoi automatique n’est effectué.",
    text: `Bonjour [Prénom], je participe à CampusBoost, une initiative étudiante du M1 MIAGE d’Université Paris Cité. Nous faisons découvrir les compétences de l’UFR Mathématiques et Informatique et les possibilités de soutien aux formations habilitées via SOLTéA. Je serais heureux·se d’échanger avec vous sur les liens avec votre activité. Notre présentation : ${shareUrl}`,
  },
  {
    id: "ufr",
    label: "Présenter l’UFR",
    filename: "campusboost-presentation-ufr.txt",
    hint: "Une présentation courte pour introduire l’UFR et le projet étudiant.",
    text: `${ufrPitch}\n\nDécouvrir CampusBoost : ${shareUrl}\nSource officielle : ${siteConfig.soltea.ufrUrl}`,
  },
  {
    id: "soltea",
    label: "Expliquer SOLTéA",
    filename: "campusboost-guide-soltea.txt",
    hint: "Repères généraux à relire avec les informations de la campagne en cours.",
    text: `${solteaExplanation}\n\n${solteaSteps.map((step, index) => `${index + 1}. ${step.title}\n${step.description}\n${step.detail}`).join("\n\n")}\n\nUniversité Paris Cité · UAI ${siteConfig.soltea.uai} · SIRET ${siteConfig.soltea.siret}\nPréciser ensuite la composante UFR Mathématiques et Informatique ou la formation habilitée.\n\nCampagne 2027 : dates d’affectation à confirmer au 25 novembre 2026.\nPlateforme officielle : ${siteConfig.soltea.url}\nGuide officiel : ${siteConfig.soltea.guideUrl}\nSource UFR : ${siteConfig.soltea.ufrUrl}`,
  },
  {
    id: "project",
    label: "Présenter un projet",
    filename: "campusboost-fiche-projet.txt",
    hint: "Ce modèle aide à documenter une réalisation réelle avant sa publication ; il n’envoie aucune donnée.",
    text: "FICHE DE RÉALISATION ÉTUDIANTE\n\nNom du projet :\nFormation et année :\nProblématique :\nDescription de la solution :\nTechnologies utilisées :\nCompétences mobilisées :\nRésultat réellement obtenu :\nÉquipe (noms uniquement avec accord) :\nLien vers une démonstration ou un dépôt public :\nSource attestant la réalisation :\nCaptures d’écran et droits de diffusion :\nVidéo et sous-titres, si disponibles :\nAccords des participants et date :\n\nUne idée non réalisée doit rester présentée comme une proposition pédagogique.",
  },
];
