import type { SignalTrack } from "@/lib/signal/types";

export type SignalProjectContent = {
  summary: string;
  body: string;
};

export type Project = {
  id: string;
  slug: string;
  index: string;
  name: string;
  /** TODO: replace placeholder tags with real project tags */
  tags: string[];
  /** TODO: swap per-project photography */
  image: string;
  href: string;
  /** Live product URL for the Launch control. Falls back to `href`. */
  launchHref?: string;
  tracks: SignalTrack[];
  content: {
    default: SignalProjectContent;
    design?: SignalProjectContent;
    tech?: SignalProjectContent;
  };
};

const PLACEHOLDER_B = "/images/work-002.jpg";
const PLACEHOLDER_C = "/images/work-003.jpg";
const PLACEHOLDER_D = "/images/work-004.jpg";
const PLACEHOLDER_E = "/images/work-005.jpg";
const PLACEHOLDER_F = "/images/work-006.jpg";
const PLACEHOLDER_G = "/images/work-007.jpg";

function pendingCopy(note: string): SignalProjectContent {
  return {
    summary: `[TODO: ${note}]`,
    body: `[TODO: ${note}]`,
  };
}

export const projects: Project[] = [
  {
    id: "official-charts",
    slug: "official-charts",
    index: "001",
    name: "Official Charts",
    tags: ["DATA", "WEB"],
    image: "/images/projects/official_charts/cover.jpg",
    href: "/work/official-charts",
    launchHref: "https://www.officialcharts.pro/",
    tracks: ["design"],
    content: {
      default: pendingCopy("case study summary pending"),
    },
  },
  {
    id: "loreal-echo",
    slug: "loreal",
    index: "002",
    name: "L'Oréal ECHO",
    tags: ["BRANDING", "WEB"],
    image: PLACEHOLDER_B,
    href: "/work/loreal",
    tracks: ["tech"],
    content: {
      default: pendingCopy("case study summary pending"),
      // TODO: Vineeth to write final copy — build-emphasis
      tech: pendingCopy("Vineeth to write final copy — build-emphasis"),
    },
  },
  {
    id: "google-civics",
    slug: "google-civics",
    index: "003",
    name: "Google Civics",
    tags: ["PRODUCT", "WEB"],
    image: PLACEHOLDER_C,
    href: "/work/google-civics",
    tracks: ["tech"],
    content: {
      default: pendingCopy("case study summary pending"),
    },
  },
  {
    id: "design-forge",
    slug: "design-forge",
    index: "004",
    name: "Design Forge",
    tags: ["BRANDING", "PRODUCT"],
    image: PLACEHOLDER_D,
    href: "/work/design-forge",
    tracks: ["design", "tech"],
    content: {
      default: pendingCopy("case study summary pending"),
    },
  },
  {
    id: "tiny-world",
    slug: "tiny-world",
    index: "005",
    name: "Tiny World",
    tags: ["BRANDING", "WEB"],
    image: PLACEHOLDER_E,
    href: "/work/tiny-world",
    tracks: ["tech"],
    content: {
      default: pendingCopy("case study summary pending"),
    },
  },
  {
    id: "explorer-plus",
    slug: "explorer-plus",
    index: "006",
    name: "Explorer+",
    tags: ["PRODUCT", "DATA"],
    image: PLACEHOLDER_F,
    href: "/work/explorer-plus",
    tracks: ["design"],
    content: {
      default: pendingCopy("case study summary pending"),
    },
  },
  {
    id: "vault",
    slug: "vault",
    index: "007",
    name: "Vault",
    tags: ["PRODUCT", "WEB"],
    image: PLACEHOLDER_G,
    href: "/work/vault",
    tracks: ["design", "tech"],
    content: {
      default: pendingCopy("case study summary pending"),
    },
  },
];
