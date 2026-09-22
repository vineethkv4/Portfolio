import type { SignalTrack } from "@/lib/signal/types";
import type { Project, SignalProjectContent } from "@/data/projects";

export type VisibleSignalProject = Project & {
  resolved: SignalProjectContent;
};

/**
 * TODO: Vineeth — confirm this is the right resolution rule for combined access.
 * Combined access (SIGNAL999): prefer `content.default` when the visitor has both tracks.
 */
export function resolveContent(
  project: Project,
  visitorTracks: SignalTrack[],
): SignalProjectContent {
  if (visitorTracks.length > 1) {
    return project.content.default;
  }
  const track = visitorTracks[0];
  if (track === "design") {
    return project.content.design ?? project.content.default;
  }
  if (track === "tech") {
    return project.content.tech ?? project.content.default;
  }
  return project.content.default;
}

export function visibleProjectsForTracks(
  catalog: Project[],
  tracks: SignalTrack[],
): VisibleSignalProject[] {
  return catalog
    .filter((project) =>
      project.tracks.some((track) => tracks.includes(track)),
    )
    .map((project, index) => ({
      ...project,
      index: String(index + 1).padStart(3, "0"),
      resolved: resolveContent(project, tracks),
    }));
}
