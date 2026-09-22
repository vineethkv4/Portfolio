import type { Metadata } from "next";
import { Ascent } from "@/components/sections/Ascent";

export const metadata: Metadata = {
  title: "Ascent",
  description:
    "My journey — work history across Kantar, Analytics Quotient, iVista, and iBizsoft.",
};

export default function AscentPage() {
  return <Ascent />;
}
