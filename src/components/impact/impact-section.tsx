import {
  Monitor,
  Cpu,
  ShieldCheck,
  ChartNoAxesCombined,
  Users,
  Layers,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { impactCategories } from "@/data/impact";
import { programs } from "@/data/programs";
import { projects } from "@/data/projects";
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
              <article key={category.number} id={`besoin-${category.number}`}>
                <div className="impact-category-top">
                  <Icon size={27} strokeWidth={1.4} aria-hidden="true" />
                  <span>{category.number}</span>
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <details className="funding-detail">
                  <summary>
                    Pourquoi et pour qui ?{" "}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </summary>
                  <p>{category.why}</p>
                  <h4>Formations potentiellement concernées</h4>
                  <div className="skill-tags">
                    {category.programIds.map((id) => {
                      const program = programs.find((item) => item.id === id)!;
                      return (
                        <a href="#formations" key={id}>
                          {program.short}
                        </a>
                      );
                    })}
                  </div>
                  <h4>Scénarios pédagogiques associés</h4>
                  <ul>
                    {category.projectIds.map((id) => (
                      <li key={id}>
                        <a href={`#projet-${id}`}>
                          {projects.find((item) => item.id === id)!.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <h4>Bénéfice envisagé pour les étudiants</h4>
                  <p>{category.benefit}</p>
                </details>
                <span className="proposal-label">
                  Proposition à valider avec l’UFR
                </span>
              </article>
            );
          })}
        </div>
        <div className="section-endnote">
          <p>
            Ces usages sont des pistes pédagogiques, sans diagnostic de manque
            ni engagement d’achat de l’UFR.
          </p>
          <a className="text-link" href="#soutenir">
            Comprendre comment contribuer{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div id="simulateur">
          <ImpactSimulator />
        </div>
      </div>
    </section>
  );
}
