import type { Metadata } from "next";
import { LockedGate } from "@/components/signal/LockedGate";
import { WorkList } from "@/components/signal/WorkList";
import { projects } from "@/data/projects";
import { getSignalTracks } from "@/lib/auth/vault";
import { visibleProjectsForTracks } from "@/lib/signal/content";

export const metadata: Metadata = {
  title: "Selected UX & UI Projects",
  description:
    "Explore selected work across digital product design, responsive interfaces, design systems and frontend implementation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SignalPage() {
  const tracks = await getSignalTracks();
  if (!tracks) {
    return <LockedGate />;
  }

  const visible = visibleProjectsForTracks(projects, tracks);

  return <WorkList projects={visible} />;
}
