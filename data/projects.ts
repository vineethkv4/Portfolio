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
  /** Right-side row label. Defaults to Launch. */
  actionLabel?: string;
  tracks: SignalTrack[];
  content: {
    default: SignalProjectContent;
    design?: SignalProjectContent;
    tech?: SignalProjectContent;
  };
};

const PLACEHOLDER_C = "/images/work-003.jpg";
const PLACEHOLDER_D = "/images/work-004.jpg";

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
    image: "/images/projects/loreal_echo/cover.jpg",
    href: "/work/loreal",
    actionLabel: "Case study",
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
    actionLabel: "Case study",
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
    id: "explorer-plus",
    slug: "explorer-plus",
    index: "006",
    name: "Explorer+",
    tags: ["PRODUCT", "DATA"],
    image: "/images/projects/Explorer%2B/cover.png",
    href: "/work/explorer-plus",
    actionLabel: "Case study",
    tracks: ["design"],
    content: {
      default: pendingCopy("case study summary pending"),
    },
  },
  {
    id: "lift-plus",
    slug: "lift-plus",
    index: "007",
    name: "Lift+",
    tags: ["PRODUCT", "DATA"],
    image: "/images/projects/lift%2B/cover.jpg",
    href: "/work/lift-plus",
    actionLabel: "Case study",
    tracks: ["design"],
    content: {
      default: pendingCopy("case study summary pending"),
    },
  },
];
