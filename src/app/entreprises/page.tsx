import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { CompanyOverview } from "@/components/company-overview";
import { CompanySupport } from "@/components/company-support";
import { MatchExplorer } from "@/components/match/match-explorer";
import { Programs } from "@/components/programs";
import { Realizations } from "@/components/realizations";
import { ProjectTopics } from "@/components/project-topics";
import { BusinessContact } from "@/components/business-contact";
import { CampusEvents } from "@/components/campus-events";

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
      <CompanyOverview />
      <MatchExplorer />
      <Programs />
      <Realizations />
      <ProjectTopics />
      <CampusEvents />
      <CompanySupport />
      <BusinessContact />
    </main>
  );
}
