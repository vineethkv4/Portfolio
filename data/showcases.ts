export type ShowcaseFacts = {
  role: string;
  scope: string;
  tools: string;
  status: string;
};

export type ShowcaseBuilt = {
  paragraphs: string[];
  bullets: string[];
};

export type Showcase = {
  slug: string;
  title: string;
  shortTitle: string;
  lede: string;
  facts: ShowcaseFacts;
  overview: string[];
  myRole: string[];
  challenge: string[];
  built: ShowcaseBuilt;
  impact: string[];
  images: string[];
  ctaStatement: string;
  ctaAccent: string;
};

/** Existing asset — user path was project/; repo file is projects/ */
export const SHOWCASE_PLACEHOLDER = "/images/projects/loreal/mockup.jpg";

function frames(count: number, src = SHOWCASE_PLACEHOLDER) {
  return Array.from({ length: count }, () => src);
}

function pendingCase(input: {
  slug: string;
  title: string;
  shortTitle: string;
  lede: string;
  facts: ShowcaseFacts;
  overview: string[];
  ctaStatement?: string;
  ctaAccent?: string;
}): Showcase {
  return {
    ...input,
    myRole: ["Case study narrative coming soon."],
    challenge: ["Case study narrative coming soon."],
    built: {
      paragraphs: ["Case study narrative coming soon."],
      bullets: [],
    },
    impact: ["Case study narrative coming soon."],
    images: frames(13),
    ctaStatement: input.ctaStatement ?? "Let's create something",
    ctaAccent: input.ctaAccent ?? "beautiful.",
  };
}

export const showcases: Showcase[] = [
  pendingCase({
    slug: "loreal",
    title: "L'ORÉAL Echo. L'ORÉAL Echo. ",
    shortTitle: "L'Oréal ECHO",
    lede: "A branded digital experience built around discovery, ritual, and product storytelling.",
    facts: {
      role: "Lead Designer",
      scope: "Brand, web",
      tools: "Figma, React, Next.js, Motion",
      status: "Delivered",
    },
    overview: [
      "A branded digital experience built around discovery, ritual, and product storytelling.",
      "The work leans on oversized type, cinematic product frames, and a restrained interface so the imagery carries the narrative.",
    ],
    ctaStatement: "Got something in mind?",
    ctaAccent: "Let's talk it through.",
  }),
  {
    slug: "official-charts",
    title: "Official Charts. Official Charts",
    shortTitle: "Official Charts",
    lede: "A fully responsive web-based tool designed to adapt seamlessly across web, tablet, and mobile — in both light and dark themes — under a tight delivery timeline.",
    facts: {
      role: "UX/UI Design, Prototyping",
      scope: "Web, tablet, mobile · light + dark",
      tools: "Figma",
      status: "Delivered",
    },
    overview: [
      "The OCC tool was built under a tight timeline, adding real pressure to an already complex brief: a fully responsive web-based tool that needed to work seamlessly across desktop, tablet, and mobile, in both light and dark themes.",
      "Since responsive design was still a growing area for our team at the time, I took the lead in researching, learning, and experimenting to get the execution right.",
    ],
    myRole: [
      "I led the responsive design approach for the tool, taking the initiative to research and test patterns for adapting complex layouts across breakpoints and themes, then translating that into detailed, interactive prototypes.",
    ],
    challenge: [
      "Responsive design across three device classes and two themes is a demanding brief on its own — doing it with a team new to the discipline, on a short timeline, raised the stakes further.",
      "The tool also carried genuinely complex design functionality, which meant every responsive decision had to hold up under real interaction, not just look right in a static frame.",
    ],
    built: {
      paragraphs: [
        "To manage the complexity, I built detailed interactive prototypes in Figma, which let the team work through tricky design functionality before it hit development.",
      ],
      bullets: [
        "Researched and tested responsive patterns across web, tablet, and mobile breakpoints",
        "Designed a consistent light and dark theme system across every screen state",
        "Built high-fidelity interactive Figma prototypes to validate complex functionality pre-build",
      ],
    },
    impact: [
      "The result was a polished, fully responsive tool that exceeded client expectations — praised for its interactivity, usability, and consistency across themes, and a strong example of delivering high-quality design under real constraints.",
    ],
    images: [
      "/images/projects/official_charts/cover.jpg",
      "/images/projects/official_charts/01.jpg",
      "/images/projects/official_charts/02.jpg",
      "/images/projects/official_charts/03.jpg",
      "/images/projects/official_charts/04.jpg",
    ],
    ctaStatement: "Let's create something",
    ctaAccent: "beautiful.",
  },
  pendingCase({
    slug: "google-civics",
    title: "Google Civics. Google Civics",
    shortTitle: "Google Civics",
    lede: "Civic information, designed to be scanned in seconds.",
    facts: {
      role: "UX Engineer",
      scope: "Web, product",
      tools: "Figma, Next.js, Maps, Motion",
      status: "Delivered",
    },
    overview: [
      "Civic information, designed to be scanned in seconds.",
    ],
  }),
  pendingCase({
    slug: "design-forge",
    title: "Design Forge",
    shortTitle: "Design Forge",
    lede: "A system for shipping consistent product UI without slowing the work down.",
    facts: {
      role: "Design Systems",
      scope: "Product, systems",
      tools: "Figma, React, Tokens",
      status: "Delivered",
    },
    overview: [
      "A system for shipping consistent product UI without slowing the work down.",
    ],
  }),
  pendingCase({
    slug: "tiny-world",
    title: "Tiny World. Tiny World",
    shortTitle: "Tiny World",
    lede: "A small brand with a large visual voice.",
    facts: {
      role: "Brand + Web",
      scope: "Brand, web",
      tools: "Figma, Next.js, Motion",
      status: "Delivered",
    },
    overview: ["A small brand with a large visual voice."],
  }),
  pendingCase({
    slug: "explorer-plus",
    title: "Explorer+. Explorer+",
    shortTitle: "Explorer+",
    lede: "An exploration product designed around glanceable maps and quiet UI.",
    facts: {
      role: "Product Designer",
      scope: "Product, mobile",
      tools: "Figma, React Native, Maps",
      status: "Delivered",
    },
    overview: [
      "An exploration product designed around glanceable maps and quiet UI.",
    ],
  }),
  pendingCase({
    slug: "vault",
    title: "The Vault. The Vault",
    shortTitle: "Vault",
    lede: "A gated body of work — shown only when it should be.",
    facts: {
      role: "Lead Designer",
      scope: "Product, web",
      tools: "Figma, Next.js, Auth, Motion",
      status: "Private",
    },
    overview: ["A gated body of work — shown only when it should be."],
  }),
];

export function getShowcaseBySlug(slug: string): Showcase | undefined {
  return showcases.find((item) => item.slug === slug);
}

export function getShowcaseSlugs(): string[] {
  return showcases.map((item) => item.slug);
}

export function showcaseImage(showcase: Showcase, index: number) {
  return showcase.images[index % showcase.images.length];
}
