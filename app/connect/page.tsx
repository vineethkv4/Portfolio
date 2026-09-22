import type { Metadata } from "next";
import { Connect } from "@/components/sections/Connect";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Get in touch with Vineeth Vijayan — roles, collaborations, and design-to-code conversations.",
};

export default function ConnectPage() {
  return <Connect />;
}
