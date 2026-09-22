"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/** Hard session cap — must match JWT / cookie maxAge (30 minutes). */
export const SIGNAL_SESSION_MS = 30 * 60 * 1000;
/** Extra lock if the tab is idle before the hard cap. */
export const SIGNAL_IDLE_MS = 20 * 60 * 1000;
export const SIGNAL_SESSION_STARTED_KEY = "signal_session_started";

const ACTIVITY_EVENTS = [
  "pointermove",
  "keydown",
  "scroll",
  "touchstart",
] as const;

async function lockSignal(router: ReturnType<typeof useRouter>) {
  sessionStorage.removeItem(SIGNAL_SESSION_STARTED_KEY);
  try {
    await fetch("/api/vault/logout", { method: "POST" });
  } finally {
    router.refresh();
  }
}

/**
 * Locks Signal after 30 minutes (absolute) or 20 minutes idle,
 * and returns to the passcode gate without waiting for a refresh.
 */
export function useSignalIdleLogout() {
  const router = useRouter();
  const loggingOut = useRef(false);

  useEffect(() => {
    if (!sessionStorage.getItem(SIGNAL_SESSION_STARTED_KEY)) {
      sessionStorage.setItem(SIGNAL_SESSION_STARTED_KEY, String(Date.now()));
    }

    let idleTimer: number;
    let sessionTimer: number;

    async function logout() {
      if (loggingOut.current) return;
      loggingOut.current = true;
      await lockSignal(router);
    }

    function sessionRemaining() {
      const started = Number(
        sessionStorage.getItem(SIGNAL_SESSION_STARTED_KEY) ?? "0",
      );
      if (!started) return SIGNAL_SESSION_MS;
      return SIGNAL_SESSION_MS - (Date.now() - started);
    }

    function armIdle() {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        void logout();
      }, SIGNAL_IDLE_MS);
    }

    function armSession() {
      window.clearTimeout(sessionTimer);
      const remaining = sessionRemaining();
      if (remaining <= 0) {
        void logout();
        return;
      }
      sessionTimer = window.setTimeout(() => {
        void logout();
      }, remaining);
    }

    function onVisible() {
      if (document.visibilityState !== "visible") return;
      if (sessionRemaining() <= 0) void logout();
    }

    armIdle();
    armSession();

    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, armIdle, { passive: true });
    }
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearTimeout(idleTimer);
      window.clearTimeout(sessionTimer);
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, armIdle);
      }
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [router]);
}
