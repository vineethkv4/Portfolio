"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { SectionTopBar } from "@/components/sections/SectionTopBar";
import { SectionNav } from "@/components/sections/SectionNav";
import { Button } from "@/components/ui/button";
import { SIGNAL_SESSION_STARTED_KEY } from "@/hooks/use-signal-idle-logout";
import { cn } from "@/lib/utils";

export function LockedGate() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(0);

  useEffect(() => {
    sessionStorage.removeItem(SIGNAL_SESSION_STARTED_KEY);
  }, []);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!code.trim() || loading || success) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/vault/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setError(payload?.error ?? "Incorrect passcode.");
        setShake((n) => n + 1);
        setLoading(false);
        return;
      }

      setSuccess(true);
      sessionStorage.setItem(SIGNAL_SESSION_STARTED_KEY, String(Date.now()));
      window.setTimeout(() => {
        router.refresh();
      }, 300);
    } catch {
      setError("Something went wrong. Please retry.");
      setShake((n) => n + 1);
      setLoading(false);
    }
  }

  return (
    <div className="signal-grid-bg relative min-h-dvh w-full overflow-x-hidden text-white">
      <SectionTopBar theme="dark" />
      <SectionNav />

      <div className="relative mx-auto w-full max-w-[1500px] px-6 pt-[16vh] pb-16 sm:px-8 lg:px-12">
        <div className="max-w-[520px] my-0 mx-auto">
          <h1 className="font-[family-name:var(--font-display-serif)] text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.02em] text-white">
            <span className="block">SIGNAL IS</span>
            <span className="block">ENCRYPTED.</span>
          </h1>

          <p className="mt-8 max-w-[500px] font-[family-name:var(--font-mono)] text-[13px] leading-relaxed text-white/45 sm:text-sm">
            Case studies here include confidential client dashboards and product
            work, shared privately with recruiters, hiring managers, and
            collaborators.{" "}
            {/* TODO: confirm target — Connect page vs mailto */}
            <a
              href="mailto:vineethkv.pro@gmail.com?subject=Signal%20passcode"
              className="text-white/70 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
            >
              No passcode yet?
            </a>
          </p>

          <form onSubmit={onSubmit} className="mt-12">
            <label
              htmlFor="signal-passcode"
              className="block font-[family-name:var(--font-mono)] text-[10px] tracking-[0.22em] text-white/40 uppercase"
            >
              Enter passcode to decode the work
            </label>

            <motion.div
              key={shake}
              className="group mt-0"
              animate={
                shake > 0 ? { x: [-6, 6, -4, 4, 0] } : { x: 0 }
              }
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <input
                id="signal-passcode"
                type="password"
                autoComplete="current-password"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  if (error) setError(null);
                }}
                className="h-12 w-full border-none bg-transparent px-0 font-[family-name:var(--font-mono)] text-base tracking-[0.28em] text-white shadow-none outline-none ring-0 placeholder:text-white/20"
                style={{ border: "none", boxShadow: "none" }}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "signal-passcode-error" : undefined}
              />
              <span
                className={cn(
                  "block h-px w-full transition-colors",
                  error
                    ? "bg-red-500"
                    : success
                      ? "bg-[#00CF2D]"
                      : "bg-white group-hover:bg-[#00CF2D] group-focus-within:bg-[#00CF2D]",
                )}
                aria-hidden
              />
            </motion.div>

            {error ? (
              <p
                id="signal-passcode-error"
                className="mt-3 font-[family-name:var(--font-mono)] text-xs text-red-400"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              disabled={!code.trim() || loading || success}
              className="mt-8 h-11 rounded-md bg-[#2a2a2a] px-6 text-sm text-white hover:bg-[#333] disabled:opacity-40"
            >
              {success ? (
                <>
                  Unlocked
                  <Check className="size-4" aria-hidden />
                </>
              ) : loading ? (
                "Checking…"
              ) : (
                <>
                  Unlock
                  <ArrowRight className="size-4" aria-hidden />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
