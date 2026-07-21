// src/components/effects/cursor-glow.tsx
"use client";

import { useEffect } from "react";
import { m, useReducedMotion, useMotionValue, useSpring } from "framer-motion";

/* ─────────────────────────────────────────────────────
   CursorGlow — a large soft radial glow that follows
   the cursor with spring-based lag (stiffness:60, damping:20).
   Disabled on touch devices & prefers-reduced-motion.
───────────────────────────────────────────────────── */

interface CursorGlowProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export function CursorGlow({ containerRef }: CursorGlowProps) {
  const prefersReduced = useReducedMotion();

  // Raw mouse position (in px relative to container)
  const rawX = useMotionValue(-999);
  const rawY = useMotionValue(-999);

  // Spring-smoothed position — gives the "catching up" feel
  const springConfig = { stiffness: 60, damping: 20, mass: 0.8 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  useEffect(() => {
    if (prefersReduced) return;

    // Check for coarse pointer (touch-only device) — skip glow
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const el = containerRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
    };

    const onMouseLeave = () => {
      // Park the glow off-screen when cursor leaves
      rawX.set(-999);
      rawY.set(-999);
    };

    el.addEventListener("mousemove", onMouseMove, { passive: true });
    el.addEventListener("mouseleave", onMouseLeave, { passive: true });
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [prefersReduced, containerRef, rawX, rawY]);

  if (prefersReduced) return null;

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      style={{ top: 0, left: 0 }}
    >
      <m.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(34,211,238,0.12) 0%, rgba(34,211,238,0.05) 40%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
    </m.div>
  );
}
