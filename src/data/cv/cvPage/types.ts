export type SkillLevel = "expert" | "advanced" | "intermediate";

export type SkillCategory = {
  title: string;
  skills: { name: string; level: SkillLevel }[];
};

export type Experience = {
  title: string;
  company: string;
  period: string;
  tasks: string[];
};

export type EducationEntry = {
  title: string;
  school: string;
  period: string;
  details?: string;
};

export type ContactInfo = {
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  tryhackme: string;
  entourage?: string;
};
