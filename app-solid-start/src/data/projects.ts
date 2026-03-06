/**
 * Single source of truth for project metadata
 * Used by homepage, projects page, and nav
 */

export type ProjectStatus = "live" | "in-development" | "coming-soon";

export interface ProjectMeta {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: ProjectStatus;
  accentColor: string;
  imageUrl: string;
  imageAlt: string;
  /** Light bg for card hover */
  cardHoverBg: string;
  cardHoverBorder: string;
  hoverBg: string;
  hoverColor: string;
  hoverBorder: string;
  /** Optional: npm package, repo, docs */
  npmPackage?: string;
  repoUrl?: string;
  docsUrl?: string;
}

export const PROJECTS: ProjectMeta[] = [
  {
    id: "jayson",
    name: "JaySON",
    slug: "jayson",
    description: "JSON Schema toolkit — validate, infer, generate types, transform data",
    status: "live",
    accentColor: "#FDC500",
    imageUrl: "/abstract_176.png",
    imageAlt: "Abstract pattern",
    cardHoverBg: "#fef6d9",
    cardHoverBorder: "#e6b300",
    hoverBg: "#FDC500",
    hoverColor: "#3d2e00",
    hoverBorder: "#FDC500",
    npmPackage: "@casinelli/jayson",
  },
  {
    id: "color",
    name: "Color",
    slug: "color",
    description: "Color utility tools",
    status: "coming-soon",
    accentColor: "#4F772D",
    imageUrl: "/floral_176.png",
    imageAlt: "Floral pattern",
    cardHoverBg: "#dce8d3",
    cardHoverBorder: "#90a97a",
    hoverBg: "#4F772D",
    hoverColor: "#ffffff",
    hoverBorder: "#4F772D",
  },
  {
    id: "theme-ui",
    name: "Theme UI",
    slug: "theme-ui",
    description: "Theme builder and previewer",
    status: "coming-soon",
    accentColor: "#004E89",
    imageUrl: "/geometric_176.png",
    imageAlt: "Geometric pattern",
    cardHoverBg: "#d9e4f0",
    cardHoverBorder: "#6699bb",
    hoverBg: "#004E89",
    hoverColor: "#ffffff",
    hoverBorder: "#004E89",
  },
];

export const getProjectBySlug = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug) ?? null;

export const getProjectPath = (slug: string) => `/projects/${slug}`;
