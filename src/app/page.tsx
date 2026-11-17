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

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Reveal>
        <About />
      </Reveal>
      <MatchExplorer />
      <Reveal>
        <WhyUfr />
      </Reveal>
      <ImpactSection />
      <Programs />
      <Projects />
      <Reveal>
        <Stories />
      </Reveal>
      <Reveal>
        <VideoSection />
      </Reveal>
      <SolteaGuide />
    </main>
  );
}
