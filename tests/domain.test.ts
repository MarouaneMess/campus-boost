import test from "node:test";
import assert from "node:assert/strict";
import { sectors } from "../src/data/sectors.ts";
import { projects } from "../src/data/projects.ts";
import { programs } from "../src/data/programs.ts";
import { skills } from "../src/data/skills.ts";
import { equipment, impactCategories } from "../src/data/impact.ts";
import {
  publishedRealizations,
  projectDomains,
} from "../src/data/realizations.ts";
import { campusEvents, getEventStatus } from "../src/data/events.ts";
import { competitionPartners } from "../src/data/competitions.ts";
import { solteaRoadmap } from "../src/data/roadmap.ts";
import { getMatches, getRelevantSkills } from "../src/lib/matching.ts";
import { normalizeAmount, simulateEquipment } from "../src/lib/simulator.ts";

test("les huit parcours disposent de données cohérentes et de résultats documentés", () => {
  assert.equal(sectors.length, 8);
  assert.equal(new Set(sectors.map((sector) => sector.id)).size, 8);
  const skillIds = new Set(skills.map((skill) => skill.id));
  for (const sector of sectors) {
    assert(projects.some((project) => project.id === sector.projectId));
    assert.equal(
      new Set(sector.needs.map((need) => need.id)).size,
      sector.needs.length,
    );
    for (const need of sector.needs)
      for (const skill of need.skills) assert(skillIds.has(skill));
    const matches = getMatches(
      sector,
      sector.needs.map((need) => need.id),
    );
    assert(matches.length >= 3);
    assert(matches.every((match) => match.sharedSkills.length > 0));
    assert.deepEqual(getMatches(sector, []), []);
    assert.deepEqual(getMatches(sector, ["absent"]), []);
  }
  assert(programs.every((program) => program.url.startsWith("https://")));
});

test("un besoin de vision ne retourne que des formations avec vision ou IA", () => {
  const aviation = sectors.find((sector) => sector.id === "aviation")!;
  assert.deepEqual(getRelevantSkills(aviation, ["vision"]), ["vision", "ai"]);
  const matches = getMatches(aviation, ["vision"]);
  assert(matches.some((match) => match.program.id === "vmi"));
  assert(!matches.some((match) => match.program.id === "l3-miage"));
  for (const match of matches)
    assert(
      match.sharedSkills.every((skill) => skill === "vision" || skill === "ai"),
    );
});

test("les simulations respectent le budget, les limites et des quantités entières", () => {
  assert.equal(normalizeAmount(-10), 0);
  assert.equal(normalizeAmount(Number.NaN), 0);
  assert.equal(normalizeAmount(Infinity), 0);
  assert.equal(normalizeAmount(100001), 100000);
  assert.equal(normalizeAmount(999.9), 999);
  for (const amount of [0, 1, 249, 500, 1000, 2500, 5000, 10000, 100000]) {
    for (const item of equipment) {
      const result = simulateEquipment(amount, item);
      assert(Number.isInteger(result.quantity));
      assert(result.quantity >= 0);
      assert(result.remainder >= 0 && result.remainder < item.unitPrice);
      assert.equal(result.quantity * item.unitPrice + result.remainder, amount);
    }
  }
  assert.deepEqual(simulateEquipment(2500, equipment[0]), {
    quantity: 2,
    remainder: 500,
    unitPrice: 1000,
  });
  assert.throws(
    () => simulateEquipment(500, { ...equipment[0], unitPrice: 0 }),
    RangeError,
  );
});

test("les statuts différencient les sources et le rattachement de la L3", () => {
  assert.equal(
    programs.filter((program) => program.eligibility === "ufr-listed").length,
    5,
  );
  assert.equal(
    programs.filter((program) => program.eligibility === "university-listed")
      .length,
    3,
  );
  assert.equal(
    programs.find((program) => program.id === "l3-miage")?.eligibility,
    "to-check",
  );
  assert(
    programs
      .find((program) => program.id === "mva")
      ?.affiliationNote?.includes("ENS Paris-Saclay"),
  );
});

test("la V2 ne relie que des contenus existants et des réalisations documentées", () => {
  assert.equal(impactCategories.length, 6);
  const programIds = new Set(programs.map((program) => program.id));
  const projectIds = new Set(projects.map((project) => project.id));
  const skillIds = new Set(skills.map((skill) => skill.id));
  for (const need of impactCategories) {
    assert(
      need.programIds.length && need.projectIds.length && need.skills.length,
    );
    need.programIds.forEach((id) => assert(programIds.has(id)));
    need.projectIds.forEach((id) => assert(projectIds.has(id)));
    need.skills.forEach((id) => assert(skillIds.has(id)));
  }
  for (const project of publishedRealizations) {
    assert(project.evidence.url.startsWith("https://"));
    assert(project.evidence.checkedAt);
    assert(project.images.length > 0);
    project.programIds.forEach((id) => assert(programIds.has(id)));
    project.skills.forEach((id) => assert(skillIds.has(id)));
    project.domains.forEach((domain) =>
      assert(projectDomains.some((item) => item.id === domain)),
    );
    project.participants?.forEach((person) => assert(person.consentDate));
  }
  assert(
    competitionPartners.every(
      (partner) => partner.participationSource && partner.logoPermissionDate,
    ),
  );
  assert(solteaRoadmap.every((step) => step.date === "À confirmer"));
});

test("les événements distinguent échéance passée et preuve de participation", () => {
  const event = campusEvents[0];
  assert.equal(getEventStatus(event, "2026-12-03"), "envisaged");
  assert.equal(getEventStatus(event, "2026-12-04"), "envisaged");
  assert.equal(getEventStatus(event, "2026-12-05"), "past");
  assert.equal(
    getEventStatus({ ...event, participation: "confirmed" }, "2026-12-03"),
    "envisaged",
  );
  assert.equal(
    getEventStatus(
      {
        ...event,
        participation: "confirmed",
        confirmationSource: "https://example.org/proof",
      },
      "2026-12-03",
    ),
    "confirmed",
  );
  assert.equal(
    getEventStatus(
      { ...event, startDate: undefined, endDate: undefined },
      "2027-10-01",
    ),
    "envisaged",
  );
});
