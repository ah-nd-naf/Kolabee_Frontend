"use client";

import { m } from "framer-motion";

/* ─────────────────────────────────────────────────────
   SectionDivider — animated glowing horizon line
   used between landing page sections (dark mode only).

   Props:
   - color:    Tailwind color name segment (e.g. "teal", "cyan", "purple", "blue")
   - duration: animation cycle duration in seconds
   - direction: comet travel direction ("ltr" | "rtl")
─────────────────────────────────────────────────────── */

interface SectionDividerProps {
  color: string;
  duration?: number;
  pulseDuration?: number;
  direction?: "ltr" | "rtl";
}

export function SectionDivider({
  color,
  duration = 5,
  pulseDuration = 4,
  direction = "ltr",
}: SectionDividerProps) {
  const cometFrom = direction === "ltr" ? "-20%" : "120%";
  const cometTo   = direction === "ltr" ? "120%"  : "-20%";

  return (
    <div className="relative w-full h-0 hidden dark:block z-20">
      <div className="absolute top-0 inset-x-0 flex justify-center">
        {/* Base subtle line */}
        <div className={`absolute w-full h-[1px] bg-gradient-to-r from-transparent via-${color}-900/40 to-transparent`} />

        {/* Breathing core glow */}
        <m.div
          animate={{ opacity: [0.3, 0.7, 0.3], scaleX: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: pulseDuration, ease: "easeInOut" }}
          className={`absolute w-2/3 h-[1px] bg-gradient-to-r from-transparent via-${color}-500/80 to-transparent blur-[2px]`}
        />

        {/* Central bright hot-spot */}
        <div className={`absolute top-[-1px] w-32 h-[3px] bg-${color}-400/80 blur-[3px] rounded-full`} />
        <div className="absolute top-[0px] w-12 h-[1px] bg-white rounded-full" />

        {/* Shooting energy pulse / comet */}
        <div className="absolute top-[-2px] inset-x-0 h-[6px] overflow-hidden">
          <m.div
            animate={{ left: [cometFrom, cometTo] }}
            transition={{ repeat: Infinity, duration, ease: "linear" }}
            className={`absolute top-[1px] w-[15%] h-[2px] bg-gradient-to-${direction === "ltr" ? "r" : "l"} from-transparent via-${color}-200 to-transparent blur-[1px]`}
          />
        </div>

        {/* Ambient Up/Down Light Bleed to blend the backgrounds */}
        <div className={`absolute top-[-120px] w-3/4 h-[240px] bg-${color}-500/10 blur-[80px] pointer-events-none rounded-full`} />
      </div>
    </div>
  );
}
