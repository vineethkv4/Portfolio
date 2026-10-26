export type ShowcaseFacts = {
  role: string;
  scope: string;
  tools: string;
  status: string;
};

export type ShowcaseBullet = string | { lead: string; rest: string };

export type ShowcaseBuilt = {
  paragraphs: string[];
  bullets: ShowcaseBullet[];
};

export type ShowcaseMetaItem = {
  label: string;
  value: string;
};

export type ShowcaseStat = {
  value: string;
  label: string;
  /** Count from 0 to this integer. Omit to keep `value` as static text. */
  countTo?: number;
};

export type ShowcaseScreen = {
  src: string;
  caption: string;
  alt: string;
};

export type ShowcaseRailItem = {
  id: string;
  label: string;
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
  impactBullets?: ShowcaseBullet[];
  /** Replaces the Role / Scope / Tools / Status grid when set. */
  meta?: ShowcaseMetaItem[];
  chips?: string[];
  /** Shown above the Impact bullets. */
  stats?: ShowcaseStat[];
  /** Section rail. Presence switches this study to the rail + screens layout. */
  rail?: ShowcaseRailItem[];
  /** Overview heading. The rail label stays "Overview". */
  overviewTitle?: string;
  sectionTitles?: {
    role?: string;
    challenge?: string;
    built?: string;
    impact?: string;
  };
  screens?: ShowcaseScreen[];
  /** TODO: set when the case-study CTA should leave the page. */
  ctaHref?: string;
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
    title: "L'Oréal ECHO Dashboard",
    shortTitle: "L'Oréal ECHO Dashboard",
    headerColor: "#ce6fb6",
    lede: "Brand Power Echo — Global Analytics & Reporting Platform",
    overviewTitle: "One Dashboard For Global Brand Performance",
    sectionTitles: {
      role: "Role",
      challenge: "Challenge",
      built: "What I Built",
      impact: "Impact",
    },
    rail: [
      { id: "overview", label: "Overview" },
      { id: "role", label: "Role" },
      { id: "challenge", label: "Challenge" },
      { id: "built", label: "What I Built" },
      { id: "impact", label: "Impact" },
      { id: "screens", label: "Screens" },
    ],
    facts: {
      role: "Design lead · Design-to-code",
      scope: "Leadership & marketing teams",
      tools: "ECHO Dashboard · L'Oréal",
      status: "5 live at launch",
    },
    meta: [
      { label: "Product", value: "ECHO Dashboard · L'Oréal" },
      { label: "Role", value: "Design lead · Design-to-code" },
      { label: "Users", value: "Leadership & marketing teams" },
      { label: "Markets", value: "5 live at launch" },
    ],
    chips: [
      "Design leadership",
      "Data visualisation",
      "Design systems",
      "Design to code",
      "AI-assisted build",
    ],
    stats: [
      { value: "5", label: "Markets live at launch", countTo: 5 },
      { value: "40–50%", label: "Reduction in UI development workload" },
      { value: "20–30%", label: "Reduction in functionality build effort" },
    ],
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
        {
          lead: "A modular dashboard architecture",
          rest: " — 7 live analysis modules (Single Country × Multi Brands, Single Brand × Multi Country, Single Brand × Targets, Multi Brand × Multi Country, Brand Ranking per KPI, Brand Profiling, Trends), with 6 more in the roadmap (Mappings, Category Drivers, Cross Category Analysis, Megabrand, Touch Points, Ad Module) — all sharing one consistent visual and interaction language.",
        },
        {
          lead: "A structured filtering system",
          rest: " for market, time period (by half-year, fiscal year, or custom range), and brand/category selection — built to stay usable as the number of markets grows.",
        },
        {
          lead: "Dense, multi-brand comparison views",
          rest: " — side-by-side KPI, ranking, and perception charts across competitor brands, designed to stay legible even at high data density.",
        },
        {
          lead: "A design-to-code pipeline",
          rest: " — using Cursor to take modules like Brand Profiling and Trends from Figma to functioning frontend in about two weeks, keeping design fidelity intact through the handoff.",
        },
      ],
    },
    impact: [],
    impactBullets: [
      {
        lead: "5 markets live at launch",
        rest: ", with the platform architected to scale to more as new regions onboard.",
      },
      {
        lead: "40–50% reduction in UI development workload and 20–30% reduction in functionality build effort",
        rest: ", per direct feedback from the engineering team, since most of the frontend arrived pre-built from the design-to-code workflow rather than from scratch.",
      },
      {
        lead: "Adopted as the primary brand analytics tool",
        rest: " for leadership and marketing teams globally, replacing fragmented, market-by-market reporting.",
      },
    ],
    quote: {
      text: "The code you shared for the UI has been really helpful. For the UI, we only made minimal design adjustments, which allowed us to cut the workload by around 40–50%. For the functionality, we only needed to tweak some parts, resulting in a 20–30% reduction in effort compared to building everything from scratch.",
      attribution: "Engineering Lead, L'Oréal ECHO",
    },
    images: [
      "/images/projects/loreal_echo/cover.jpg",
      "/images/projects/loreal_echo/01.jpg",
      "/images/projects/loreal_echo/03.jpg",
      "/images/projects/loreal_echo/02.jpg",
    ],
    screens: [
      {
        src: "/images/projects/loreal_echo/cover.jpg",
        caption: "Brand Power Echo — Global Analytics & Reporting Platform",
        alt: "Brand Power Echo key visual for the L'Oréal ECHO dashboard",
      },
      {
        src: "/images/projects/loreal_echo/01.jpg",
        caption: "A modular dashboard architecture",
        alt: "ECHO module menu listing the live analysis modules and roadmap",
      },
      {
        src: "/images/projects/loreal_echo/03.jpg",
        caption: "Brand Profiling",
        alt: "Brand Profiling dashboard with brand equity and perception charts",
      },
      {
        src: "/images/projects/loreal_echo/02.jpg",
        caption: "Filters: market, time period, brand and category",
        alt: "ECHO filters for time period and market",
      },
    ],
    ctaStatement: "Have something to build?",
    ctaAccent: "I'm in.",
    // TODO: point this CTA at the contact destination.
    ctaHref: "#",
  },
  {
    slug: "official-charts",
    title: "Official Charts",
    shortTitle: "Official Charts",
    headerColor: "#d25ebb",
    lede: "A fully responsive web-based tool designed to adapt seamlessly across web, tablet, and mobile — in both light and dark themes — under a tight delivery timeline.",
    overviewTitle: "Responsive Across Every Breakpoint and Theme",
    sectionTitles: {
      role: "Role",
      challenge: "Challenge",
      built: "What I Built",
      impact: "Impact",
    },
    rail: [
      { id: "overview", label: "Overview" },
      { id: "role", label: "Role" },
      { id: "challenge", label: "Challenge" },
      { id: "built", label: "What I Built" },
      { id: "impact", label: "Impact" },
      { id: "screens", label: "Screens" },
    ],
    facts: {
      role: "UX/UI Design, Prototyping",
      scope: "Web, tablet, mobile · light + dark",
      tools: "Figma",
      status: "Delivered",
    },
    meta: [
      { label: "Product", value: "Official Charts Pro (OCC)" },
      { label: "Role", value: "UX/UI Design, Prototyping" },
      { label: "Scope", value: "Web, tablet, mobile · light + dark" },
      { label: "Status", value: "Delivered" },
    ],
    chips: [
      "Responsive design",
      "Figma prototyping",
      "Light + dark themes",
      "Complex UI",
    ],
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
    impact: [],
    impactBullets: [
      {
        lead: "A polished, fully responsive tool that exceeded client expectations",
        rest: " — praised for its interactivity, usability, and consistency across themes, and a strong example of delivering high-quality design under real constraints.",
      },
    ],
    images: [
      "/images/projects/official_charts/cover.jpg",
      "/images/projects/official_charts/01.jpg",
      "/images/projects/official_charts/02.jpg",
      "/images/projects/official_charts/03.jpg",
      "/images/projects/official_charts/04.jpg",
    ],
    screens: [
      {
        src: "/images/projects/official_charts/cover.jpg",
        caption: "Official Charts Pro — key visual",
        alt: "Official Charts Pro cover screen",
      },
      {
        src: "/images/projects/official_charts/01.jpg",
        caption: "Desktop layout and chart views",
        alt: "Official Charts desktop interface",
      },
      {
        src: "/images/projects/official_charts/02.jpg",
        caption: "Tablet-responsive layouts",
        alt: "Official Charts tablet layout",
      },
      {
        src: "/images/projects/official_charts/03.jpg",
        caption: "Light theme UI states",
        alt: "Official Charts light theme",
      },
      {
        src: "/images/projects/official_charts/04.jpg",
        caption: "Dark theme UI states",
        alt: "Official Charts dark theme",
      },
    ],
    ctaStatement: "Let's create something",
    ctaAccent: "beautiful.",
    ctaHref: "#",
  },
  {
    slug: "google-civics",
    title: "Google Civics",
    shortTitle: "Google Civics",
    headerColor: "#4285f4",
    lede: "Live Election Data Platform — Kantar · Analytics Centre of Excellence",
    overviewTitle: "When India Votes, Google Needs Data In Seconds",
    sectionTitles: {
      role: "Role",
      challenge: "Challenge",
      built: "What I Built",
      impact: "Impact",
    },
    rail: [
      { id: "overview", label: "Overview" },
      { id: "role", label: "Role" },
      { id: "challenge", label: "Challenge" },
      { id: "built", label: "What I Built" },
      { id: "impact", label: "Impact" },
      { id: "screens", label: "Screens" },
    ],
    facts: {
      role: "UX Engineer / Designer",
      scope: "Indian elections · live data",
      tools: "Angular",
      status: "4 state elections, no failures",
    },
    meta: [
      { label: "Client", value: "Google · Kantar ACE" },
      { label: "Role", value: "UX Engineer / Designer" },
      { label: "Stack", value: "Angular frontend" },
      { label: "Status", value: "Live · expanding globally" },
    ],
    chips: [
      "UX engineering",
      "Angular",
      "Live data",
      "Design to code",
      "Mobile micro-site",
    ],
    stats: [
      { value: "80%", label: "Reduction in frontend workload for tech team" },
      { value: "4", label: "State elections run without failure", countTo: 4 },
    ],
    overview: [
      "When India votes, millions of people turn to Google for results. Google Civics is the data entry platform behind that experience. It's where live election data is entered, checked, approved, and delivered.",
      "Built for Indian elections, with Kerala, Bengal, and Tamil Nadu as its first users, it has since run across the last four state elections without a failure. Google's leadership team appreciated the result, and they now want to set it up for other countries.",
    ],
    myRole: [
      "UX Engineer / Designer. I designed the experience and built the whole frontend in Angular.",
    ],
    challenge: [
      "Speed. The data is live, so every extra bit of frontend weight shows up as delay. I optimised the code as far as it would go.",
      "Reality on the ground. Counting centres don't allow laptops, so agents needed a way to enter data from a phone. That led to a separate micro mobile site.",
      "Non-technical users. The people entering data aren't tech people and they work under pressure. A light theme and a clear, forgiving interface mattered more than visual flair.",
      "This wasn't a design-heavy project. The design job was to stay out of the way and make the right action obvious.",
    ],
    built: {
      paragraphs: [
        "Six screens on desktop, each with its own job, plus a field micro-site and a reusable Angular component library so new regions don't start from scratch.",
      ],
      bullets: [
        {
          lead: "Sign in",
          rest: " — a clean, single-purpose entry point.",
        },
        {
          lead: "Election selection",
          rest: " — operators choose National or Regional, then the election they're working on.",
        },
        {
          lead: "Control Room, live entry",
          rest: " — a round-by-round table (R1 to R5) comparing counts per candidate, with winner toggles and inline editing for fast entry.",
        },
        {
          lead: "Control Room, QC and approval",
          rest: " — verification status, data-variance flags, ECI data approval, forced punch-in and won approval, so nothing goes live unchecked.",
        },
        {
          lead: "Generate XML",
          rest: " — pick country, state, and election to produce the delivery file, then upload it and track its delivery status.",
        },
        {
          lead: "Micro mobile site",
          rest: " — same visual style with fewer functions for agents at counting centres where laptops aren't allowed.",
        },
      ],
    },
    impact: [],
    impactBullets: [
      {
        lead: "80% reduction in the tech team's frontend workload",
        rest: ", with the UI delivered ready for integration.",
      },
      {
        lead: "Ran the Indian live election and the last four state elections successfully",
        rest: ", with no platform failures during live counts.",
      },
      {
        lead: "Well received by Google's leadership team",
        rest: ", with plans to expand the platform to other countries.",
      },
      {
        lead: "Kantar ACE Strategic Collaborator Award",
        rest: " for the delivery.",
      },
    ],
    images: [
      "/images/projects/google_civic/cover.jpg",
      "/images/projects/google_civic/01.jpg",
      "/images/projects/google_civic/02.jpg",
      "/images/projects/google_civic/03.jpg",
      "/images/projects/google_civic/04.jpg",
    ],
    screens: [
      {
        src: "/images/projects/google_civic/cover.jpg",
        caption: "Sign in — single-purpose entry point",
        alt: "Google Civics sign-in screen",
      },
      {
        src: "/images/projects/google_civic/01.jpg",
        caption: "Election selection — National or Regional",
        alt: "Google Civics election selection screen",
      },
      {
        src: "/images/projects/google_civic/02.jpg",
        caption: "Control Room — live round-by-round entry",
        alt: "Google Civics live data entry table",
      },
      {
        src: "/images/projects/google_civic/03.jpg",
        caption: "Control Room — QC and approval",
        alt: "Google Civics verification and approval screen",
      },
      {
        src: "/images/projects/google_civic/04.jpg",
        caption: "Generate XML — delivery file and upload status",
        alt: "Google Civics XML generation screen",
      },
    ],
    ctaStatement: "Have something to build?",
    ctaAccent: "I'm in.",
    ctaHref: "#",
  },
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
    overviewTitle: "Self-Serve Brand Insights at Scale",
    sectionTitles: {
      role: "Role",
      challenge: "Challenge",
      built: "What I Built",
      impact: "Impact",
    },
    rail: [
      { id: "overview", label: "Overview" },
      { id: "role", label: "Role" },
      { id: "challenge", label: "Challenge" },
      { id: "built", label: "What I Built" },
      { id: "impact", label: "Impact" },
      { id: "screens", label: "Screens" },
    ],
    facts: {
      role: "UX Designer, UI Architect",
      scope: "Insights platform · 30+ clients",
      tools: "Figma",
      status: "Live",
    },
    meta: [
      { label: "Product", value: "Explorer+" },
      { label: "Role", value: "UX Designer, UI Architect" },
      { label: "Clients", value: "30+ onboarded" },
      { label: "Status", value: "Live" },
    ],
    chips: [
      "UX architecture",
      "Data exploration",
      "Admin theming",
      "Alerts",
      "Figma",
    ],
    stats: [
      { value: "30+", label: "Clients onboarded" },
      { value: "1 week", label: "Max onboarding time per dashboard" },
      { value: "1 day", label: "Max time for client theming" },
    ],
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
    impact: [],
    impactBullets: [
      {
        lead: "Client onboarding cut to a maximum of 1 week",
        rest: ", down from a slower process largely bottlenecked by manual data setup.",
      },
      {
        lead: "Theming reduced to a maximum of 1 day",
        rest: ", from what was once a multi-day design task.",
      },
      {
        lead: "30+ clients onboarded",
        rest: " onto the platform.",
      },
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
    screens: [
      {
        src: "/images/projects/Explorer%2B/cover.png",
        caption: "Explorer+ — data exploration suite",
        alt: "Explorer+ product cover",
      },
      {
        src: "/images/projects/Explorer%2B/01.jpg",
        caption: "Snapshot — charts and tables",
        alt: "Explorer+ Snapshot module",
      },
      {
        src: "/images/projects/Explorer%2B/02.png",
        caption: "Crosstab — slice, dice, and filter",
        alt: "Explorer+ Crosstab module",
      },
      {
        src: "/images/projects/Explorer%2B/03.png",
        caption: "Brand Analysis — KPI views",
        alt: "Explorer+ Brand Analysis",
      },
      {
        src: "/images/projects/Explorer%2B/04.png",
        caption: "Ask Me — natural-language insights",
        alt: "Explorer+ Ask Me module",
      },
      {
        src: "/images/projects/Explorer%2B/05.jpg",
        caption: "Alerts — benchmark thresholds",
        alt: "Explorer+ Alerts feature",
      },
      {
        src: "/images/projects/Explorer%2B/06.jpg",
        caption: "Admin theming — client branding",
        alt: "Explorer+ admin theme customization",
      },
      {
        src: "/images/projects/Explorer%2B/07.jpg",
        caption: "Dashboard overview",
        alt: "Explorer+ dashboard screen",
      },
      {
        src: "/images/projects/Explorer%2B/08.jpg",
        caption: "Exploration workflow",
        alt: "Explorer+ analysis workflow",
      },
    ],
    ctaStatement: "Have something to build?",
    ctaAccent: "I'm in.",
    ctaHref: "#",
  },
  {
    slug: "lift-plus",
    title: "Lift+",
    shortTitle: "Lift+",
    headerColor: "#e6c415",
    lede: "Kantar's cross-channel measurement product.",
    overviewTitle: "Cross-Channel Measurement, Evolved In Place",
    sectionTitles: {
      role: "Role",
      challenge: "Challenge",
      built: "What I Built",
      impact: "Impact",
    },
    rail: [
      { id: "overview", label: "Overview" },
      { id: "role", label: "Role" },
      { id: "challenge", label: "Challenge" },
      { id: "built", label: "What I Built" },
      { id: "impact", label: "Impact" },
      { id: "screens", label: "Screens" },
    ],
    facts: {
      role: "Dashboard design end to end",
      scope: "Live product, newsletters",
      tools: "UX, theme, admin customisation",
      status: "Live",
    },
    meta: [
      { label: "Product", value: "Lift+" },
      { label: "Role", value: "Dashboard design end to end" },
      { label: "Scope", value: "Live product, newsletters" },
      { label: "Status", value: "Live" },
    ],
    chips: [
      "Dashboard UX",
      "Admin customisation",
      "Accessible theming",
      "Newsletter design",
      "Kantar",
    ],
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
    impact: [],
    impactBullets: [
      {
        lead: "Client dashboards are now fully self-serve",
        rest: ": widget position, naming, and visibility changes that used to require a developer or designer are handled by the client admin directly in the product.",
      },
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
    screens: [
      {
        src: "/images/projects/lift%2B/cover.jpg",
        caption: "Lift+ — cross-channel measurement",
        alt: "Lift+ product cover",
      },
      {
        src: "/images/projects/lift%2B/01.jpg",
        caption: "Restructured left-nav hierarchy",
        alt: "Lift+ dashboard navigation",
      },
      {
        src: "/images/projects/lift%2B/02.jpg",
        caption: "Comparison-first frequency curves",
        alt: "Lift+ frequency curve comparison",
      },
      {
        src: "/images/projects/lift%2B/03.jpg",
        caption: "Summary + dashboard view",
        alt: "Lift+ campaign summary dashboard",
      },
      {
        src: "/images/projects/lift%2B/04.jpg",
        caption: "Dashboard Management Mode",
        alt: "Lift+ admin widget customisation",
      },
      {
        src: "/images/projects/lift%2B/05.jpg",
        caption: "Accessible theme refresh",
        alt: "Lift+ accessible light theme",
      },
      {
        src: "/images/projects/lift%2B/06.jpg",
        caption: "Lift+ newsletter layout",
        alt: "Lift+ case-study newsletter design",
      },
    ],
    ctaStatement: "Have something to build?",
    ctaAccent: "I'm in.",
    ctaHref: "#",
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
