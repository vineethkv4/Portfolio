import type { Metadata } from "next";
import { Connect } from "@/components/sections/Connect";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Vineeth Vijayan | Product Designer | UX Engineer",
  },
  description:
    "Get in touch with Vineeth Vijayan about UX engineering, product design and design systems opportunities.",
};

export default function ConnectPage() {
  return <Connect />;
}
