"use client";

import { motion } from "framer-motion";

type Bar = {
  label: string;
  value: number;
};

type BarChartRaceProps = {
  bars: Bar[];
  title?: string;
};

/** Skeleton for animated bar-chart-race hero — values are placeholders */
export function BarChartRace({
  bars,
  title = "Chart race (placeholder data)",
}: BarChartRaceProps) {
  const max = Math.max(...bars.map((bar) => bar.value), 1);

  return (
    <div className="w-full border border-white/10 bg-black px-4 py-6 text-white">
      <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-white/50">
        {title}
      </p>
      <ul className="space-y-3">
        {bars.map((bar, index) => (
          <li key={bar.label} className="grid grid-cols-[7rem_1fr_3rem] gap-3 items-center">
            <span className="truncate text-xs uppercase tracking-wider text-white/70">
              {bar.label}
            </span>
            <div className="h-3 bg-white/10">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${(bar.value / max) * 100}%` }}
                transition={{
                  duration: 1.1,
                  delay: index * 0.08,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            </div>
            <span className="text-right text-xs tabular-nums text-white/60">
              {bar.value}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[10px] text-white/35">
        [— replace with real chart series / race keyframes from Espresso
        prototype —]
      </p>
    </div>
  );
}
