import type { Testimonial } from "../types/content.ts";

/** Une citation réelle n’est rendue que si status=approved et consentDate sont renseignés. */
export const testimonials: Testimonial[] = [
  {
    id: "student",
    role: "Étudiant·e",
    status: "placeholder",
    title: "Du cours au premier prototype",
    description:
      "Un futur témoignage sur l’apprentissage par projet, les outils utilisés et les compétences acquises.",
  },
  {
    id: "teacher",
    role: "Enseignant·e",
    status: "placeholder",
    title: "Donner les moyens d’expérimenter",
    description:
      "Un futur regard pédagogique sur la place des équipements et des mises en pratique dans la formation.",
  },
  {
    id: "alumni",
    role: "Diplômé·e",
    status: "placeholder",
    title: "Des compétences qui ouvrent des portes",
    description:
      "Un futur retour d’expérience sur le passage de l’université au monde professionnel.",
  },
];
