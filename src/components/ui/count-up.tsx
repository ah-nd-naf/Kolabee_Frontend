// src/components/ui/count-up.tsx
"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   CountUp — animates a number from 0 → target
   Uses requestAnimationFrame with the canonical
   easing curve [0.16, 1, 0.3, 1] (ease-snap).
───────────────────────────────────────────── */

function easeSnap(t: number): number {
  // Cubic bezier approximation of [0.16, 1, 0.3, 1]
  // Using a simple ease-out-expo which closely matches
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

interface CountUpProps {
  /** Target number to count up to */
  to: number;
  /** Duration in milliseconds (default: 1400) */
  duration?: number;
  /** Delay before starting in milliseconds */
  delay?: number;
  /** Number of decimal places */
  decimals?: number;
  /** Prefix string (e.g. "$") */
  prefix?: string;
  /** Suffix string (e.g. "%", "+") */
  suffix?: string;
  /** Custom formatter function */
  formatter?: (n: number) => string;
  /** CSS class names */
  className?: string;
}

export function CountUp({
  to,
  duration = 1400,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  formatter,
  className,
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      hasStarted.current = true;

      const animate = (timestamp: number) => {
        if (startTimeRef.current === null) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeSnap(progress);
        setValue(easedProgress * to);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setValue(to);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(startDelay);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [to, duration, delay]);

  const display = formatter
    ? formatter(value)
    : `${prefix}${value.toFixed(decimals)}${suffix}`;

  return <span className={className}>{display}</span>;
}

/* ── Convenience: useCountUp hook ── */
export function useCountUp(
  to: number,
  options: { duration?: number; delay?: number } = {}
) {
  const { duration = 1400, delay = 0 } = options;
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (startTimeRef.current === null) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        setValue(easeSnap(progress) * to);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setValue(to);
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(startDelay);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [to, duration, delay]);

  return value;
}
