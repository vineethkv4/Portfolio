import type { Metadata } from "next";
import { LockedGate } from "@/components/signal/LockedGate";
import { WorkList } from "@/components/signal/WorkList";
import { projects } from "@/data/projects";
import { getSignalTracks } from "@/lib/auth/vault";
import { visibleProjectsForTracks } from "@/lib/signal/content";

export const metadata: Metadata = {
  title: "Signal",
  description:
    "Selected product and client work — gated case studies shared privately.",
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
