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
    image: "/images/projects/OCC.jpg",
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
    image: "/images/projects/loreal.jpg",
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
    image: "/images/projects/googlecivic.jpg",
    href: "/work/google-civics",
    actionLabel: "Case study",
    tracks: ["design", "tech"],
    content: {
      default: {
        summary:
          "Live election data platform behind Google's results experience.",
        body:
          "When India votes, millions turn to Google for results. Google Civics is where live election data is entered, checked, approved, and delivered — designed and built as the full Angular frontend.",
      },
      design: {
        summary:
          "Civic data UX built for speed, clarity, and pressure — not flair.",
        body:
          "Designed six focused workflows (sign-in through XML delivery) plus a micro mobile site for counting centres, with a light theme and forgiving controls for non-technical operators.",
      },
      tech: {
        summary:
          "Angular frontend and reusable component library for live elections.",
        body:
          "Owned the full frontend build: performance-tuned live tables, QC and approval flows, XML generation, and shared components so new regions don't start from scratch.",
      },
    },
  },
  //{
  //  id: "design-forge",
  //  slug: "design-forge",
  //  index: "004",
  //  name: "Design Forge",
  //  tags: ["BRANDING", "PRODUCT"],
  //  image: "/images/projects/designforge.jpg",
  //  href: "/work/design-forge",
  //  tracks: ["design", "tech"],
  //  content: {
  //    default: pendingCopy("case study summary pending"),
  //  },
  //},
  {
    id: "explorer-plus",
    slug: "explorer-plus",
    index: "003",
    name: "Explorer+",
    tags: ["PRODUCT", "DATA"],
    image: "/images/projects/Explore.jpg",
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
    index: "004",
    name: "Lift+",
    tags: ["PRODUCT", "DATA"],
    image: "/images/projects/lift.jpg",
    href: "/work/lift-plus",
    actionLabel: "Case study",
    tracks: ["design"],
    content: {
      default: pendingCopy("case study summary pending"),
    },
  },
  {
    id: "design-explorations",
    slug: "design-explorations",
    index: "005",
    name: "Design Explorations",
    tags: ["UI", "Design"],
    image: "/images/work-002.jpg",
    href: "https://www.behance.net/vineethkv43218",
    launchHref: "https://www.behance.net/vineethkv43218",
    actionLabel: "View on Behance",
    tracks: ["design"],
    content: {
      default: pendingCopy("case study summary pending"),
    },
  },
];
