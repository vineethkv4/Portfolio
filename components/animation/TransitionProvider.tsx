"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Preloader } from "./Preloader";
import { Curtains } from "./Curtains";

type TransitionContextValue = {
  /** Navigate with curtain-door transition */
  navigate: (href: string) => void;
  /** True after preloader finishes on first visit */
  isReady: boolean;
  /** True once first transition completes — navband should pin sticky */
  navPinned: boolean;
  setNavPinned: (pinned: boolean) => void;
  /** Hero/navband reveal flag after preloader */
  revealHero: boolean;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within TransitionProvider");
  }
  return ctx;
}

type TransitionProviderProps = {
  children: ReactNode;
};

const SESSION_PRELOADER_KEY = "folio-preloader-done";

export function TransitionProvider({ children }: TransitionProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const [hasMounted, setHasMounted] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [revealHero, setRevealHero] = useState(false);
  const [navPinned, setNavPinned] = useState(false);
  const [curtainsClosed, setCurtainsClosed] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    setHasMounted(true);
    const seen = sessionStorage.getItem(SESSION_PRELOADER_KEY) === "1";
    if (seen) {
      setPreloaderDone(true);
      setRevealHero(true);
    }
  }, []);

  const handlePreloaderReveal = useCallback(() => {
    // Navband expansion + hero reveal fire as curtains open
    setRevealHero(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    sessionStorage.setItem(SESSION_PRELOADER_KEY, "1");
    setPreloaderDone(true);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || curtainsClosed) return;

      setCurtainsClosed(true);
      setPendingHref(href);

      // Midpoint: swap route while panels meet at center
      window.setTimeout(() => {
        startTransition(() => {
          router.push(href);
        });
      }, 700);
    },
    [pathname, curtainsClosed, router],
  );

  // Retract curtains after route change completes
  useEffect(() => {
    if (!pendingHref) return;
    if (pathname !== pendingHref) return;

    const t = window.setTimeout(() => {
      setCurtainsClosed(false);
      setPendingHref(null);
      setNavPinned(true);
    }, 80);

    return () => window.clearTimeout(t);
  }, [pathname, pendingHref]);

  const showPreloader = hasMounted && !preloaderDone;

  return (
    <TransitionContext.Provider
      value={{
        navigate,
        isReady: preloaderDone,
        navPinned,
        setNavPinned,
        revealHero,
      }}
    >
      {showPreloader && (
        <Preloader
          onReveal={handlePreloaderReveal}
          onComplete={handlePreloaderComplete}
        />
      )}

      {preloaderDone && (
        <Curtains closed={curtainsClosed} mode="transition" />
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: revealHero || preloaderDone ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="flex min-h-full flex-1 flex-col"
          data-nav-pinned={navPinned ? "true" : "false"}
          data-hero-reveal={revealHero ? "true" : "false"}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
