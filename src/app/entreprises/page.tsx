import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { WhyUfr } from "@/components/about";
import { UfrEcosystem } from "@/components/ufr-ecosystem";
import { MatchExplorer } from "@/components/match/match-explorer";
import { ImpactSection } from "@/components/impact/impact-section";
import { Programs } from "@/components/programs";
import { Realizations } from "@/components/realizations";
import { ProjectTopics } from "@/components/project-topics";
import { Roadmap } from "@/components/roadmap";
import { SolteaGuide } from "@/components/soltea-guide";
import { BusinessContact } from "@/components/business-contact";
import { CampusEvents } from "@/components/campus-events";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Entreprises · Talents, projets et SOLTéA",
  description:
    "Explorez les compétences de l’UFR, les sujets de projets par formation et les étapes pour contribuer. Contactez directement l’UFR ou le service taxe d’apprentissage.",
  alternates: { canonical: "/entreprises" },
};

export default function CompaniesPage() {
  return (
    <main id="main-content">
      <Hero />
      <UfrEcosystem />
      <MatchExplorer />
      <Reveal>
        <WhyUfr />
      </Reveal>
      <ImpactSection />
      <Programs />
      <Realizations />
      <ProjectTopics />
      <CampusEvents />
      <Roadmap />
      <SolteaGuide />
      <BusinessContact />
    </main>
  );
}
