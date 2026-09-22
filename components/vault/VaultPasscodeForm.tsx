"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function VaultPasscodeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/vault";

  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/vault-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      if (!response.ok) {
        setError("Invalid passcode. Try again.");
        setLoading(false);
        return;
      }

      router.replace(nextPath === "/vault" ? "/" : nextPath);
      router.refresh();
    } catch {
      setError("Something went wrong. Please retry.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="passcode" className="uppercase tracking-[0.2em]">
          Access code
        </Label>
        <Input
          id="passcode"
          type="password"
          autoComplete="current-password"
          value={passcode}
          onChange={(event) => setPasscode(event.target.value)}
          className="font-[family-name:var(--font-pixel)] tracking-[0.3em]"
          placeholder="••••••••"
          required
        />
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" disabled={loading} className="w-full uppercase tracking-widest">
        {loading ? "Checking…" : "Enter vault"}
      </Button>
    </form>
  );
}
