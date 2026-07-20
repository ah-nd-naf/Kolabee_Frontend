// src/components/ui/theme-toggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─────────────────────────────────────────────────────
   ThemeToggle — a premium animated 3-way switch
   Light | System | Dark

   The pill slides to the active segment. Icons
   morph with a cross-fade. Works in both the
   dashboard sidebar and the landing navbar.
───────────────────────────────────────────────────── */

type Mode = "light" | "system" | "dark";

const modes: { value: Mode; Icon: React.ElementType; label: string }[] = [
  { value: "light",  Icon: Sun,     label: "Light"  },
  { value: "system", Icon: Monitor, label: "System" },
  { value: "dark",   Icon: Moon,    label: "Dark"   },
];

interface ThemeToggleProps {
  /** "compact" shows only icons; "full" shows icon + label */
  variant?: "compact" | "full";
}

export function ThemeToggle({ variant = "compact" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — render nothing until client-side
  useEffect(() => setMounted(true), []);
  if (!mounted) return <ThemeToggleSkeleton variant={variant} />;

  const active = (theme as Mode) ?? "system";

  return (
    <div
      role="group"
      aria-label="Choose color theme"
      className={`relative flex items-center rounded-full p-1 ${
        variant === "full"
          ? "bg-stone-100 dark:bg-stone-800 ring-1 ring-stone-200 dark:ring-stone-700 gap-0.5"
          : "bg-stone-100 dark:bg-stone-800 ring-1 ring-stone-200 dark:ring-stone-700"
      }`}
    >
      {modes.map(({ value, Icon, label }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            aria-label={`${label} mode`}
            aria-pressed={isActive}
            className={`relative flex items-center gap-1.5 rounded-full outline-none transition-colors duration-150
              ${variant === "full" ? "px-3 py-1.5" : "p-2"}
              ${isActive
                ? "text-cyan-950 dark:text-white"
                : "text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300"
              }`}
          >
            {/* Sliding active pill */}
            {isActive && (
              <motion.div
                layoutId="theme-pill"
                className="absolute inset-0 rounded-full bg-white dark:bg-stone-700 shadow-sm ring-1 ring-stone-200/80 dark:ring-stone-600"
                transition={{ type: "spring", bounce: 0.25, duration: 0.45 }}
              />
            )}

            {/* Icon with scale animation */}
            <motion.span
              key={`${value}-icon`}
              className="relative z-10"
              animate={isActive
                ? { scale: 1, rotate: 0 }
                : { scale: 0.9, rotate: value === "dark" ? 20 : value === "light" ? -20 : 0 }
              }
              transition={{ duration: 0.3, ease: EASE }}
            >
              <Icon className={`${variant === "full" ? "h-3.5 w-3.5" : "h-4 w-4"}`} />
            </motion.span>

            {/* Label (full variant only) */}
            {variant === "full" && (
              <span className={`relative z-10 text-xs font-semibold`}>{label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ── Compact icon-only toggle (cycles through modes) ── */
export function ThemeToggleSimple() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9 rounded-full skeleton-shimmer" />;

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.18, ease: EASE }}
      aria-label="Toggle theme"
      className="relative flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 ring-1 ring-stone-200 dark:ring-stone-700 text-stone-600 dark:text-stone-300 hover:ring-cyan-300 dark:hover:ring-cyan-600 transition-all overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ y: 16, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -16, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="absolute"
          >
            <Moon className="h-4 w-4" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ y: 16, opacity: 0, rotate: 30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -16, opacity: 0, rotate: -30 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="absolute"
          >
            <Sun className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ── Loading skeleton ── */
function ThemeToggleSkeleton({ variant }: { variant: "compact" | "full" }) {
  return (
    <div
      className={`skeleton-shimmer rounded-full ${
        variant === "full" ? "h-9 w-48" : "h-9 w-28"
      }`}
    />
  );
}
