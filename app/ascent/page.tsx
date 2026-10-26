import type { Metadata } from "next";
import { Ascent } from "@/components/sections/Ascent";

export const metadata: Metadata = {
  title: "My Design Journey",
  description:
    "Explore my journey from web and UI design to UX engineering, design systems and frontend development.",
};

export default function AscentPage() {
  return <Ascent />;
}
