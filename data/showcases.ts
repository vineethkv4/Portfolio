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
  /** Sticky case-study heading color. Defaults to signal green. */
  headerColor: string;
  facts: ShowcaseFacts;
  overview: string[];
  myRole: string[];
  challenge: string[];
  built: ShowcaseBuilt;
  impact: string[];
  images: string[];
  /** Visible labels when a frame has no `src` yet. */
  imageTodos?: string[];
  ctaStatement: string;
  ctaAccent: string;
  quote?: {
    text: string;
    attribution: string;
  };
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
  headerColor?: string;
  facts: ShowcaseFacts;
  overview: string[];
  ctaStatement?: string;
  ctaAccent?: string;
}): Showcase {
  return {
    ...input,
    headerColor: input.headerColor ?? "#00cf2d",
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
  {
    slug: "loreal",
    title: "L'Oréal ECHO",
    shortTitle: "L'Oréal ECHO",
    headerColor: "#ce6fb6",
    lede: "Brand Power Echo — Global Analytics & Reporting Platform",
    facts: {
      role: "Lead Designer, design-to-code",
      scope: "Global dashboard · 5 markets live",
      tools: "Figma, Cursor",
      status: "Launched",
    },
    overview: [
      "ECHO is L'Oréal's global brand analytics platform — a single dashboard consolidating brand health, equity, funnel, profiling, and trend data across markets, categories, brands, audiences, and study types. Built for leadership and marketing teams to compare brand performance, decode consumer perception, and track trends without waiting on a static report.",
      "Launched across 5 markets with more being added as the platform scales globally.",
    ],
    myRole: [
      "Led the design team of 3 designers end-to-end — from data harmonisation and UX architecture through to interactive dashboard design. On the technical side, personally owned the design-to-code build, translating the design system into working frontend using an AI-assisted workflow via Cursor.",
      "This dual ownership — designing the system and shipping the code behind it — meant less lost in translation between design intent and what actually got built.",
    ],
    challenge: [
      "ECHO needed to hold an unusually large surface area of data — multiple study types, dozens of KPIs, brand-vs-brand comparisons, market filters, audience profiling — without turning into a wall of charts. Every module (Single Brand × Multi Country, Brand Ranking, Brand Profiling, Trends, and more) needed its own comparison logic, but all of it had to feel like one coherent system, not a stitched-together set of tools.",
      "On top of the design problem, there was a delivery problem: six months of overall development, with new major modules — like Brand Profiling and Trends — needing to go from design to shipped code in roughly two weeks each.",
    ],
    built: {
      paragraphs: [],
      bullets: [
        "A modular dashboard architecture — 7 live analysis modules (Single Country × Multi Brands, Single Brand × Multi Country, Single Brand × Targets, Multi Brand × Multi Country, Brand Ranking per KPI, Brand Profiling, Trends), with 6 more in the roadmap (Mappings, Category Drivers, Cross Category Analysis, Megabrand, Touch Points, Ad Module) — all sharing one consistent visual and interaction language.",
        "A structured filtering system for market, time period (by half-year, fiscal year, or custom range), and brand/category selection — built to stay usable as the number of markets grows.",
        "Dense, multi-brand comparison views — side-by-side KPI, ranking, and perception charts across competitor brands, designed to stay legible even at high data density.",
        "A design-to-code pipeline — using Cursor to take modules like Brand Profiling and Trends from Figma to functioning frontend in about two weeks, keeping design fidelity intact through the handoff.",
      ],
    },
    impact: [
      "5 markets live at launch, with the platform architected to scale to more as new regions onboard.",
      "40–50% reduction in UI development workload and 20–30% reduction in functionality build effort, per direct feedback from the engineering team, since most of the frontend arrived pre-built from the design-to-code workflow rather than from scratch.",
      "Adopted as the primary brand analytics tool for leadership and marketing teams globally, replacing fragmented, market-by-market reporting.",
    ],
    quote: {
      text: "The code you shared for the UI has been really helpful. For the UI, we only made minimal design adjustments, which allowed us to cut the workload by around 40–50%. For the functionality, we only needed to tweak some parts, resulting in a 20–30% reduction in effort compared to building everything from scratch.",
      attribution: "Engineering Lead, L'Oréal ECHO",
    },
    images: [
      "/images/projects/loreal_echo/cover.jpg",
      "/images/projects/loreal_echo/01.jpg",
      "/images/projects/loreal_echo/02.jpg",
      "/images/projects/loreal_echo/03.jpg",
    ],
    ctaStatement: "Have something to build?",
    ctaAccent: "I'm in.",
  },
  {
    slug: "official-charts",
    title: "Official Charts",
    shortTitle: "Official Charts",
    headerColor: "#d25ebb",
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
    title: "Google Civics",
    shortTitle: "Google Civics",
    headerColor: "#FFFFFF",
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
    title: "Tiny World",
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
  {
    slug: "explorer-plus",
    title: "Explorer+",
    shortTitle: "Explorer+",
    headerColor: "#6e72ff",
    lede: "Your All-in-One Data Exploration Suite",
    facts: {
      role: "UX Designer, UI Architect",
      scope: "Insights platform · 30+ clients",
      tools: "Figma",
      status: "Live",
    },
    overview: [
      "Explorer+ puts brand tracking data in the hands of the people who need it. It's an insights-ready exploration platform that lets teams interrogate a single data source — self-serve analysis and visual reporting, without waiting on an analyst to pull a report. Built to simplify data analysis and visualization so users can explore performance, uncover insights, and make faster, smarter decisions without needing technical expertise.",
      "Onboarded by 30+ clients.",
    ],
    myRole: [
      "UX Designer and UI Architect on Explorer+. Worked directly with project managers on the requirement — teams needed to know the moment a brand's performance crossed a benchmark, above or below — and sat with the team to shape that into the Alerts feature, owning the UX side of the solution. Also designed the admin panel for theme customization, built to let one non-technical admin spin up a complete client dashboard — no developer or designer involvement required — and switch the visual theme to match each client's brand guidelines.",
    ],
    challenge: [
      "The admin panel needed to let a non-designer configure a fully branded dashboard for any client, but the person running that setup wasn't equipped to make design decisions — color systems, styling, brand fidelity weren't their skillset. The fix was a theme upload flow: a designer sets a client's brand colors in a lightweight Excel-based tool — a five-minute task well within a designer's comfort zone — and the rest of the dashboard's theme switches over automatically, no manual restyling required.",
    ],
    built: {
      paragraphs: [
        "Four core exploration modules, one consistent interaction language, plus the systems that make the platform scale across clients:",
      ],
      bullets: [
        "Snapshot — visualization module supporting pie charts, bar charts, sortable tables, and aster plots",
        "Crosstab — dynamic table generation with slice, dice, and filtering capabilities for granular-level analysis",
        "Brand Analysis — brand performance assessment via KPIs grouped into Brand Dependent and Brand Independent categories",
        "Ask Me — natural-language query module that pulls instant insights from Snapshot, Crosstab, or Brand Analysis, removing the need for manual selection",
        "Alerts — threshold-based notifications when a benchmark exceeds or drops",
        "Admin theming panel — a five-minute, designer-driven color upload flow that lets one admin platform stand up fully branded dashboards for any client, with no per-client dev or design work",
      ],
    },
    impact: [
      "Client onboarding for a new dashboard cut to a maximum of 1 week, down from a slower process largely bottlenecked by the admin needing to manually analyze and set up each client's data.",
      "The theming step itself — once a multi-day design task — now takes a maximum of 1 day.",
      "30+ clients onboarded onto the platform.",
    ],
    images: [
      "/images/projects/Explorer%2B/cover.png",
      "/images/projects/Explorer%2B/01.jpg",
      "/images/projects/Explorer%2B/02.png",
      "/images/projects/Explorer%2B/03.png",
      "/images/projects/Explorer%2B/04.png",
      "/images/projects/Explorer%2B/05.jpg",
      "/images/projects/Explorer%2B/06.jpg",
      "/images/projects/Explorer%2B/07.jpg",
      "/images/projects/Explorer%2B/08.jpg",
    ],
    ctaStatement: "Have something to build?",
    ctaAccent: "I'm in.",
  },
  {
    slug: "lift-plus",
    title: "Lift+",
    shortTitle: "Lift+",
    headerColor: "#e6c415",
    lede: "Kantar's cross-channel measurement product.",
    facts: {
      role: "Dashboard design end to end",
      scope: "Live product, newsletters",
      tools: "UX, theme, admin customisation",
      status: "Live",
    },
    overview: [
      "Lift+ is Kantar's cross-channel measurement product. It shows brands which channels, creatives and audiences actually move their KPIs. I took it over in 2022 as a build project after a third party had handled the original design. I evolved it from the inside rather than restarting, so the live product never faced a disruptive relaunch.",
    ],
    myRole: [
      "I owned the dashboard design end to end: UX flow, theme, and the admin customisation feature. I also designed the visual system for Lift+ newsletters, translating dense analysis into scannable one-pagers. Analysts supplied the findings; I gave them a format.",
    ],
    challenge: [
      "The inherited dashboard had three problems.",
      "No structure or flow. Content had no logical order, so users had no clear path through the data.",
      "Randomly placed filters. Drill-down filters were scattered across the UI.",
      "An inaccessible dark theme. The all-black UI created accessibility problems, particularly around readability.",
      "The product was already live with real clients, so the redesign had to happen gradually, layered on top of the existing build.",
    ],
    built: {
      paragraphs: [],
      bullets: [
        "Restructured UX flow. Findings are organised into a clear left-nav hierarchy — Drivers of Lift, Frequency Curves, Efficiencies, Effectiveness, Dimensionalized Result, Brand Impact on Sales.",
        "Comparison-first analysis views. Frequency-curve widgets, such as Favourability and Intent, sit side by side for an at-a-glance comparison.",
        "Summary + Dashboard view. Campaign Context, Brand Health Metrics, Suggested Optimizations and Expected Impact are surfaced together.",
        "Full admin customisation in the client portal. Dashboard Management Mode lets an admin reorder widgets by drag-and-drop, show or hide them, add sub-widgets (Lift per Person, Direct vs Impact of Exposures), and edit widget text and comments inline — no developer or designer needed.",
        "A new accessible theme, replacing the inaccessible dark theme.",
        "Newsletter design. Visual system and layout for Lift+ case-study newsletters — KPI callouts, charts, and one-page takeaways.",
      ],
    },
    impact: [
      "Client dashboards are now fully self-serve: widget position, naming, and visibility changes that used to require a developer or designer are now handled by the client admin directly, inside the product.",
    ],
    images: [
      "/images/projects/lift%2B/cover.jpg",
      "/images/projects/lift%2B/01.jpg",
      "/images/projects/lift%2B/02.jpg",
      "/images/projects/lift%2B/03.jpg",
      "/images/projects/lift%2B/04.jpg",
      "/images/projects/lift%2B/05.jpg",
      "/images/projects/lift%2B/06.jpg",
    ],
    ctaStatement: "Have something to build?",
    ctaAccent: "I'm in.",
  },
  pendingCase({
    slug: "vault",
    title: "The Vault",
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
