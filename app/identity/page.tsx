import type { Metadata } from "next";
import { Identity } from "@/components/sections/Identity";
import { identityContent } from "@/content/sections/identity";

export const metadata: Metadata = {
  title: "Identity",
  description: identityContent.headline,
};

export default function IdentityPage() {
  return <Identity headline={identityContent.headline} />;
}
