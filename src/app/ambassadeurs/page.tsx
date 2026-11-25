import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Copy, MessageSquare, UsersRound } from "lucide-react";
import { About } from "@/components/about";
import { Stories } from "@/components/stories";
import { VideoSection } from "@/components/video-section";
import { Competitions } from "@/components/competitions";
import { AmbassadorKit } from "@/components/ambassador-kit";
import { Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Ambassadeurs · Faire connaître CampusBoost",
  description:
    "Étudiants, alumni et enseignants : des modèles à partager, des parcours à raconter et des initiatives pour faire connaître l’UFR.",
  alternates: { canonical: "/ambassadeurs" },
};

export default function AmbassadorsPage() {
  return (
    <main id="main-content">
      <section
        className="ambassador-hero section"
        aria-labelledby="ambassador-hero-title"
      >
        <div className="container ambassador-hero-grid">
          <div>
            <Eyebrow>LE PARCOURS AMBASSADEURS</Eyebrow>
            <h1 id="ambassador-hero-title">
              Faites connaître
              <br />
              <em>les talents du campus.</em>
            </h1>
            <p>
              Vous êtes étudiant, alumni ou enseignant ? Une présentation, un
              retour d’expérience ou une mise en relation peut ouvrir une
              nouvelle porte à l’UFR.
            </p>
            <a className="button button-primary" href="#ambassadeurs">
              Découvrir le kit ambassadeur{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <ol className="ambassador-steps">
            <li>
              <Copy size={25} aria-hidden="true" />
              <div>
                <h2>Présenter</h2>
                <p>
                  Un email, un message LinkedIn ou une brochure à partager avec
                  vos contacts.
                </p>
              </div>
            </li>
            <li>
              <MessageSquare size={25} aria-hidden="true" />
              <div>
                <h2>Raconter</h2>
                <p>
                  Un parcours ou un projet, avec des faits documentés et
                  l’accord de son équipe.
                </p>
              </div>
            </li>
            <li>
              <UsersRound size={25} aria-hidden="true" />
              <div>
                <h2>Mobiliser</h2>
                <p>Des initiatives à relayer pour faire vivre la communauté.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <AmbassadorKit />
      <Reveal>
        <About />
      </Reveal>
      <Stories />
      <Reveal>
        <VideoSection />
      </Reveal>
      <Competitions />
      <section className="audience-handoff">
        <div className="container">
          <div>
            <h2>Un contact professionnel intéressé ?</h2>
            <p>
              Adressez-lui le parcours conçu pour les entreprises : formations,
              sujets de projets, calendrier et contact.
            </p>
          </div>
          <Link className="button button-dark" href="/entreprises">
            Voir le parcours entreprises{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
