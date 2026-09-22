export const SECTION_NAV = [
  {
    id: "identity",
    href: "/identity",
    n: "01",
    label: "Identity",
    ghost: "WHO I AM",
  },
  {
    id: "ascent",
    href: "/ascent",
    n: "02",
    label: "Ascent",
    ghost: "MY JOURNEY",
  },
  {
    id: "signal",
    href: "/signal",
    n: "03",
    label: "Signal",
    ghost: "MY WORK",
  },
  {
    id: "connect",
    href: "/connect",
    n: "04",
    label: "Connect",
    ghost: "LETS CONNECT",
  },
] as const;

export type SectionNavItem = (typeof SECTION_NAV)[number];
export type SectionId = SectionNavItem["id"];

/** Resolve section from pathname — add new pages to SECTION_NAV only. */
export function sectionFromPath(pathname: string): SectionNavItem {
  const match = SECTION_NAV.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return match ?? SECTION_NAV[0];
}
