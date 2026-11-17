import { programs } from "../data/programs.ts";
import type { Program, Sector, SkillId } from "../types/content.ts";

export interface ProgramMatch {
  program: Program;
  sharedSkills: SkillId[];
}

/** Mise en relation éditoriale, sans prédiction de recrutement ni score artificiel. */
export function getMatches(
  sector: Sector,
  selectedNeeds: readonly string[],
): ProgramMatch[] {
  const relevantSkills = new Set(
    sector.needs
      .filter((need) => selectedNeeds.includes(need.id))
      .flatMap((need) => need.skills),
  );
  return programs
    .map((program) => ({
      program,
      sharedSkills: program.skills.filter((skill) => relevantSkills.has(skill)),
    }))
    .filter((match) => match.sharedSkills.length > 0)
    .sort(
      (a, b) =>
        b.sharedSkills.length - a.sharedSkills.length ||
        a.program.id.localeCompare(b.program.id),
    );
}

export function getRelevantSkills(
  sector: Sector,
  selectedNeeds: readonly string[],
): SkillId[] {
  return [
    ...new Set(
      sector.needs
        .filter((need) => selectedNeeds.includes(need.id))
        .flatMap((need) => need.skills),
    ),
  ];
}
