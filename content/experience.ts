export type Company = {
  id: string;
  name: string;
  role: string;
  /** Placeholder path for now — swap asset without changing layout */
  image: string;
  description: string;
  achievements: string[];
};

export const companies: Company[] = [
  {
    id: "kantar",
    name: "Kantar",
    role: "Lead Designer / Design Engineer",
    // TODO: replace with final photography
    image: "/images/placeholders/kantar.jpg",
    description:
      "I pioneered a role that didn't exist before I made a case for it — feeding Figma files to Cursor AI until they came out the other side as working Angular, React, and Next.js apps, cutting the engineering team's frontend workload by 70%. Along the way I built the design system the whole org quietly depends on, shipped dashboards people actually enjoy opening, and designed \"Ask Me,\" a chatbot that lets you just ask an analytics platform for your data instead of interrogating a filter panel.",
    achievements: [],
  },
  {
    id: "analytics-quotient",
    name: "Analytics Quotient (Kantar)",
    role: "User Experience Architect",
    // TODO: replace with final photography
    image: "/images/placeholders/analytics-quotient.jpg",
    description:
      "Before I could automate the handoff, I was the handoff — turning dashboard designs into working prototypes and handing developers everything short of a working app: SVGs, sprites, and enough visual guides to make \"but what did the designer mean\" a non-issue. I also snuck animations and transitions into the product one polite negotiation at a time.",
    achievements: [],
  },
  {
    id: "ivista",
    name: "iVista Web Solutions",
    role: "UI Designer",
    // TODO: replace with final photography
    image: "/images/placeholders/ivista.jpg",
    description:
      "My first real taste of \"make it pretty and make it work.\" I built wireframes and prototypes with product and engineering, turned mockups into actual HTML and CSS, and ran user research to figure out when my \"great idea\" was actually just my opinion in disguise.",
    achievements: [],
  },
  {
    id: "ibizsoft",
    name: "iBizsoft Inc",
    role: "Web Designer",
    // TODO: replace with final photography
    image: "/images/placeholders/ibizsoft.jpg",
    description:
      "Where I cut my teeth designing eCommerce pages for Oracle's EBS, Endeca, and ATG platforms — proof that even enterprise software with acronyms for names deserves a UI that doesn't hate its users. Kept the branding consistent across sites, emails, and marketing so nothing looked like it came from three different companies.",
    achievements: [],
  },
];
