import {
  Monitor,
  Cpu,
  ShieldCheck,
  ChartNoAxesCombined,
  Users,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { impactCategories } from "@/data/impact";
import { SectionHeading } from "@/components/ui";
import { ImpactSimulator } from "./impact-simulator";

const icons: Record<string, LucideIcon> = {
  monitor: Monitor,
  cpu: Cpu,
  shield: ShieldCheck,
  chart: ChartNoAxesCombined,
  users: Users,
  layers: Layers,
};

export function ImpactSection() {
  return (
    <section
      id="impact"
      className="section impact-section"
      aria-labelledby="impact-title"
    >
      <div className="container">
        <SectionHeading
          eyebrow="VOTRE CONTRIBUTION, UN IMPACT CONCRET"
          id="impact-title"
          title={
            <>
              Les moyens d’apprendre.
              <br />
              <em>La liberté d’innover.</em>
            </>
          }
          description="Derrière les compétences, il y a des outils, des espaces et des expériences. Voici six pistes pour leur donner plus de place."
        />
        <div className="impact-categories">
          {impactCategories.map((category) => {
            const Icon = icons[category.icon];
            return (
              <article key={category.number}>
                <div className="impact-category-top">
                  <Icon size={27} strokeWidth={1.4} aria-hidden="true" />
                  <span>{category.number}</span>
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span className="proposal-label">
                  Proposition à valider avec l’UFR
                </span>
              </article>
            );
          })}
        </div>
        <div id="simulateur">
          <ImpactSimulator />
        </div>
      </div>
    </section>
  );
}
