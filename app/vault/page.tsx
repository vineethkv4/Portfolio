import { Suspense } from "react";
import type { Metadata } from "next";
import { VaultPasscodeForm } from "@/components/vault/VaultPasscodeForm";
import { TractorFeedFrame } from "@/components/case-study/TractorFeedFrame";

export const metadata: Metadata = {
  title: "Vault Access",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VaultLandingPage() {
  return (
    <main className="dot-grid-bg flex min-h-screen items-center py-16">
      <TractorFeedFrame className="w-full">
        <div className="mx-auto max-w-md">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">
            Restricted print job
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-pixel)] text-3xl">
            Vault
          </h1>
          <p className="mt-3 mb-8 text-sm text-foreground/65">
            Enter the shared passcode to view confidential case studies.
          </p>
          <Suspense fallback={<p className="text-sm">Loading form…</p>}>
            <VaultPasscodeForm />
          </Suspense>
        </div>
      </TractorFeedFrame>
    </main>
  );
}
