// src/siteConfig.ts
export type SiteConfig = {
  heroRole: string;
  heroName: string;
  heroTagline: string;
  linkedInUrl: string;
  email: string;
  githubUrl: string;
  aboutHeading: string;
  aboutLocation: string;
  aboutP1: string;
  aboutP2: string;
  skillsCsv: string;

  // Navbar / section visibility flags
  navShowExperience: boolean;
  navShowProjects: boolean;
  navShowCertificates: boolean;
  navShowWork: boolean;
};

const STORAGE_KEY = "sugeeth-portfolio-config-v1";

export const defaultConfig: SiteConfig = {
  heroRole: "Software Quality Engineer · Fintech",
  heroName: "Sugeeth Raj V M",
  heroTagline:
    "QA engineer crafting reliable payment experiences across UPI, NACH, and mobile banking — with a focus on precision, automation, and implementation reality.",
  linkedInUrl: "https://www.linkedin.com/in/sugeethrajvm",
  email: "sugeethraj99@gmail.com",
  githubUrl: "https://github.com/SGHAli3",

  aboutHeading: "Building and validating fintech products with precision and ownership",
  aboutLocation: "Bangalore, Karnataka · 3+ years in Software Quality Engineering (Fintech)",
  aboutP1:
    "I work as a Software Quality Engineer at Paycorp.io, focusing on UPI & NACH implementations, core banking integrations, and mobile banking applications. My work spans manual testing, automation, and implementation support.",
  aboutP2:
    "I’m comfortable owning testing end-to-end: understanding requirements, designing test cases, validating APIs and mobile flows, and collaborating with BAs and developers to ship stable releases on time.",

  skillsCsv:
    "Manual & Regression Testing, Playwright + Cucumber, Cypress & API Testing, Mobile App & SDK Testing, SQL · MSSQL · Oracle, Linux · Windows · macOS",

  // default: show all sections in navbar
  navShowExperience: true,
  navShowProjects: true,
  navShowCertificates: true,
  navShowWork: true,
};

export function loadConfig(): SiteConfig {
  if (typeof window === "undefined") return defaultConfig;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultConfig;
    const parsed = JSON.parse(raw);
    // merge to keep defaults for new fields
    return { ...defaultConfig, ...parsed };
  } catch {
    return defaultConfig;
  }
}

export function saveConfig(cfg: SiteConfig) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
}
