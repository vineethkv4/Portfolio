import { projects } from "@/data/projects";
import type { SignalTrack } from "@/lib/signal/types";

const ASSET_RULES: { prefix: string; tracks: SignalTrack[] }[] = [
  { prefix: "/images/projects/loreal", tracks: ["tech"] },
  { prefix: "/images/projects/official_charts", tracks: ["design"] },
  { prefix: "/images/projects/OCC.jpg", tracks: ["design"] },
  { prefix: "/images/projects/google", tracks: ["design", "tech"] },
  { prefix: "/images/projects/Explorer", tracks: ["design"] },
  { prefix: "/images/projects/lift", tracks: ["design"] },
  { prefix: "/images/work-002.jpg", tracks: ["design"] },
];

export function tracksForWorkSlug(slug: string): SignalTrack[] | null {
  const project = projects.find(
    (item) => item.slug === slug || item.href === `/work/${slug}`,
  );
  return project?.tracks ?? null;
}

/** Unknown showcase slugs still require a Signal session. */
export function canViewWork(slug: string, visitorTracks: SignalTrack[]): boolean {
  const required = tracksForWorkSlug(slug);
  if (!required) return visitorTracks.length > 0;
  return required.some((track) => visitorTracks.includes(track));
}

export function requiredTracksForAsset(
  pathname: string,
): SignalTrack[] | "any" | null {
  let path = pathname;
  try {
    path = decodeURIComponent(pathname);
  } catch {
    path = pathname;
  }
  const protectedPath =
    path.startsWith("/images/projects/") || path === "/images/work-002.jpg";
  if (!protectedPath) return null;
  const rule = ASSET_RULES.find((item) => path.startsWith(item.prefix));
  return rule?.tracks ?? "any";
}

export function visitorCanSee(
  required: SignalTrack[] | "any",
  visitorTracks: SignalTrack[],
): boolean {
  if (required === "any") return visitorTracks.length > 0;
  return required.some((track) => visitorTracks.includes(track));
}
