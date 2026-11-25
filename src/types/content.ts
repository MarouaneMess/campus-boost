export type SkillId =
  | "ai"
  | "data"
  | "cyber"
  | "software"
  | "networks"
  | "vision"
  | "modeling"
  | "statistics"
  | "management";
export type SectorId =
  | "banking"
  | "tech"
  | "aviation"
  | "health"
  | "energy"
  | "retail"
  | "telecom"
  | "transport";
export type IconName =
  "bank" | "code" | "plane" | "heart" | "energy" | "shop" | "radio" | "truck";

export interface Skill {
  id: SkillId;
  name: string;
  short: string;
  description: string;
}
export interface BusinessNeed {
  id: string;
  label: string;
  skills: SkillId[];
}
export interface Sector {
  id: SectorId;
  name: string;
  short: string;
  icon: IconName;
  description: string;
  needs: BusinessNeed[];
  projectId: string;
}
export type Eligibility = "ufr-listed" | "university-listed" | "to-check";
export interface Program {
  id: string;
  short: string;
  level: "Licence 3" | "Master" | "Master 2";
  mention: string;
  name: string;
  description: string;
  skills: SkillId[];
  eligibility: Eligibility;
  url: string;
}
export interface PedagogicalProject {
  id: string;
  title: string;
  category: string;
  description: string;
  deliverable: string;
  skills: SkillId[];
  icon: IconName;
  status: "illustrative";
}
export interface Equipment {
  id: string;
  name: string;
  pluralName: string;
  unit: string;
  unitPrice: number;
  description: string;
}
export interface Testimonial {
  id: string;
  role: "Étudiant·e" | "Enseignant·e" | "Diplômé·e";
  status: "placeholder" | "approved";
  title: string;
  description: string;
  quote?: string;
  name?: string;
  photo?: string;
  video?: string;
  consentDate?: string;
  function?: string;
  program?: string;
  journey?: string;
  linkedin?: string;
  subtitles?: string;
}

export type ProjectDomain =
  "software" | "cyber" | "ai" | "data" | "math" | "management";
export interface StudentRealization {
  id: string;
  title: string;
  programIds: string[];
  formation: string;
  summary: string;
  problem: string;
  technologies: string[];
  skills: SkillId[];
  domains: ProjectDomain[];
  teamLabel: string;
  participants?: { name: string; consentDate: string }[];
  images: { src: string; alt: string }[];
  video?: string;
  subtitles?: string;
  result: string;
  repository?: string;
  demo?: string;
  evidence: { url: string; label: string; checkedAt: string };
  status: "documented" | "draft";
}

export interface CampusEvent {
  id: string;
  name: string;
  category: string;
  dateLabel: string;
  startDate?: string;
  endDate?: string;
  location: string;
  audience: string;
  reason: string;
  companyProfiles: string;
  action: string;
  participation: "envisaged" | "confirmed";
  confirmationSource?: string;
  source?: { url: string; label: string };
}

export interface FundingNeed {
  number: string;
  title: string;
  description: string;
  icon: string;
  why: string;
  programIds: string[];
  projectIds: string[];
  skills: SkillId[];
  benefit: string;
}
