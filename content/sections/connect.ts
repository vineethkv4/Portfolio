export const connectContent = {
  heading: "Let's talk.",
  intro:
    "Open to roles, collaborations, and conversations about design systems, product UI, and design-to-code.",
  email: "vineethkv.pro@gmail.com",
  /** Leave empty to hide the phone row */
  phone: "" as string,
  location: "Bangalore, India",
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/vineeth-vijayan-bb836334/",
    },
    {
      label: "GitHub",
      // TODO: replace with real profile
      href: "https://github.com/",
    },
    {
      label: "Resume",
      // TODO: drop a PDF in /public and point here
      href: "#",
    },
  ],
} as const;
