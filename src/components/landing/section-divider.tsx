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
  color: "teal" | "cyan" | "purple" | "blue";
  duration?: number;
  pulseDuration?: number;
  direction?: "ltr" | "rtl";
}

const colorMaps = {
  teal: {
    core: "bg-teal-400",
    glow: "via-teal-500/80",
    ambient: "bg-teal-500/15",
    spark: "bg-teal-300",
  },
  cyan: {
    core: "bg-cyan-400",
    glow: "via-cyan-500/80",
    ambient: "bg-cyan-500/15",
    spark: "bg-cyan-300",
  },
  purple: {
    core: "bg-purple-400",
    glow: "via-purple-500/80",
    ambient: "bg-purple-500/15",
    spark: "bg-purple-300",
  },
  blue: {
    core: "bg-blue-400",
    glow: "via-blue-500/80",
    ambient: "bg-blue-500/15",
    spark: "bg-blue-300",
  },
} as const;

export function SectionDivider({
  color,
  duration = 5,
  pulseDuration = 4,
}: SectionDividerProps) {
  const theme = colorMaps[color];

  return (
    <div className="relative w-full h-32 hidden dark:flex items-center justify-center -my-16 z-20 pointer-events-none overflow-visible">
      
      {/* 1. Ambient Light Bleed (Background) */}
      <m.div 
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ repeat: Infinity, duration: pulseDuration * 1.5, ease: "easeInOut" }}
        className={`absolute w-full max-w-4xl h-[250px] ${theme.ambient} blur-[120px] rounded-[100%]`} 
      />

      {/* 2. The Main Glowing Horizon Line */}
      <div className={`absolute w-full h-[1px] bg-gradient-to-r from-transparent ${theme.glow} to-transparent opacity-60`} />
      
      {/* 3. The Animated Energy Pulse (Expanding outwards from center) */}
      <m.div
        animate={{ scaleX: [0, 1.5, 0], opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration, ease: "easeInOut" }}
        className={`absolute w-2/3 h-[2px] bg-gradient-to-r from-transparent ${theme.glow} to-transparent blur-[2px]`}
      />

      {/* 4. The Core Diamond (Center energy node) */}
      <div className="relative flex items-center justify-center">
        {/* Outer pulsating diamond glow */}
        <m.div 
          animate={{ rotate: 45, scale: [0.8, 1.4, 0.8] }}
          transition={{ repeat: Infinity, duration: pulseDuration, ease: "easeInOut" }}
          className={`absolute w-5 h-5 ${theme.core} blur-[10px] opacity-80`} 
        />
        {/* Inner sharp diamond */}
        <m.div 
          animate={{ rotate: [45, 225] }}
          transition={{ repeat: Infinity, duration: duration * 2, ease: "linear" }}
          className={`relative w-1.5 h-1.5 bg-white shadow-[0_0_12px_3px] shadow-white rounded-[1px]`} 
        />
      </div>

      {/* 5. Floating Sparks/Particles */}
      <m.div 
        animate={{ y: [-15, 15, -15], x: [-10, 10, -10], opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
        transition={{ repeat: Infinity, duration: duration * 0.8, ease: "easeInOut" }}
        className={`absolute ml-48 mb-12 w-1.5 h-1.5 rounded-full ${theme.spark} blur-[1px]`} 
      />
      <m.div 
        animate={{ y: [15, -15, 15], x: [10, -10, 10], opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
        transition={{ repeat: Infinity, duration: duration * 1.2, ease: "easeInOut", delay: 1 }}
        className={`absolute mr-56 mt-10 w-1.5 h-1.5 rounded-full ${theme.spark} blur-[1px]`} 
      />
    </div>
  );
}
