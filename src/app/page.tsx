import { Hero } from "@/components/hero";
import { About, WhyUfr } from "@/components/about";
import { MatchExplorer } from "@/components/match/match-explorer";
import { ImpactSection } from "@/components/impact/impact-section";
import { Programs } from "@/components/programs";
import { Projects } from "@/components/projects";
import { Stories } from "@/components/stories";
import { VideoSection } from "@/components/video-section";
import { SolteaGuide } from "@/components/soltea-guide";
import { Reveal } from "@/components/reveal";
import { UfrEcosystem } from "@/components/ufr-ecosystem";
import { Realizations } from "@/components/realizations";
import { CampusEvents } from "@/components/campus-events";
import { Competitions } from "@/components/competitions";
import { Roadmap } from "@/components/roadmap";
import { AmbassadorKit } from "@/components/ambassador-kit";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Reveal>
        <About />
      </Reveal>
      <UfrEcosystem />
      <MatchExplorer />
      <Reveal>
        <WhyUfr />
      </Reveal>
      <ImpactSection />
      <Programs />
      <Realizations />
      <Projects />
      <Reveal>
        <Stories />
      </Reveal>
      <Reveal>
        <VideoSection />
      </Reveal>
      <CampusEvents />
      <Competitions />
      <Roadmap />
      <SolteaGuide />
      <AmbassadorKit />
    </main>
  );
}
