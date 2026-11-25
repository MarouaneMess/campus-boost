import { Check, ArrowUpRight } from "lucide-react";
import type { Program, SkillId } from "@/types/content";
import { skillById } from "@/data/skills";
import { eligibilityLabels } from "@/data/programs";

export function ProgramCard({
  program,
  sharedSkills,
}: {
  program: Program;
  sharedSkills?: SkillId[];
}) {
  return (
    <article className="program-card">
      <div className="program-top">
        <span>
          {program.level} <span aria-hidden="true">/</span> {program.short}
        </span>
        <ArrowUpRight size={20} aria-hidden="true" />
      </div>
      <p className="program-mention">{program.mention}</p>
      <h3>{program.name}</h3>
      <p>{program.description}</p>
      <div className="skill-tags">
        {(sharedSkills ?? program.skills).map((id) => (
          <span key={id}>
            {sharedSkills && <Check size={11} aria-hidden="true" />}
            {skillById[id].short}
          </span>
        ))}
      </div>
      <div className="program-bottom">
        <span
          className={`eligibility ${program.eligibility === "to-check" ? "eligibility-pending" : ""}`}
        >
          <span />
          {eligibilityLabels[program.eligibility]}
        </span>
        <a href={program.url} target="_blank" rel="noopener noreferrer">
          Fiche officielle
          <span className="sr-only"> : {program.name} (nouvel onglet)</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
