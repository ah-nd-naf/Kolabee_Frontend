"use client";

import { useRef } from "react";
import { m } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { DecodeText } from "@/components/effects/decode-text";
import { FocusText } from "@/components/effects/focus-text";
import { CursorGlow } from "@/components/effects/cursor-glow";

const ParticleField = dynamic(
  () => import("@/components/effects/particle-field").then((m) => ({ default: m.ParticleField })),
  { ssr: false }
);
const AnimatedAurora = dynamic(
  () => import("@/components/effects/animated-aurora").then((m) => ({ default: m.AnimatedAurora })),
  {
    ssr: false,
    loading: () => (
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "#083344", zIndex: 0 }} />
    ),
  }
);

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const heroItem = (delay: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE, delay },
  },
});

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden px-6 flex flex-col justify-center items-center text-center lg:px-8"
      style={{ minHeight: "100svh", paddingTop: "80px", paddingBottom: "80px" }}
    >
      {/* [0] Aurora background */}
      <AnimatedAurora />

      {/* [1] Particle field */}
      <ParticleField
        count={150}
        color="#67e8f9"
        minOpacity={0.2}
        maxOpacity={0.6}
        minRadius={1.0}
        maxRadius={2.5}
        speedFactor={1.5}
        mouseRadius={150}
        className="z-[1]"
      />

      {/* [2] Cursor glow — spring-follow, above particles */}
      <CursorGlow containerRef={heroRef} />

      {/* [3] Animated film-grain texture — above glow, below text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' seed='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          animation: "grain-shift 8s steps(1) infinite",
        }}
      />

      {/* Hero content — z-10 */}
      <div className="mx-auto max-w-3xl relative z-10">

        {/* Badge pill — animates in first, then breathes */}
        <m.div
          variants={heroItem(0.05)}
          initial="hidden"
          animate="visible"
          className="mb-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-900/50 px-4 py-1.5 text-sm font-medium text-cyan-200 ring-1 ring-cyan-700/50 backdrop-blur-sm">
            {/* Sparkle icon breathes on an infinite 2.5s loop */}
            <m.span
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.15, 0.9] }}
              transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
              className="flex"
            >
              <Sparkles className="h-4 w-4" />
            </m.span>
            <span>Matched to your brand, not just your budget.</span>
          </span>
        </m.div>

        {/* H1 — two-beat reveal: line 1 then line 2 with gradient on second line */}
        <h1 className="font-heading text-5xl font-bold tracking-tight text-white sm:text-7xl" style={{ textShadow: "0 0 80px rgba(34,211,238,0.15)" }}>
          <m.span
            variants={heroItem(0.16)}
            initial="hidden"
            animate="visible"
            className="block"
          >
            <FocusText text="Everything a product" delayMs={200} staggerMs={40} />
          </m.span>
          <m.span
            variants={heroItem(0.27)}
            initial="hidden"
            animate="visible"
            className="block"
          >
            {/* "launch needs" gets a subtle cyan gradient and decode reveal */}
            <DecodeText
              text="launch needs"
              underlineWord="needs"
              delayMs={1200}
              className="inline-block"
              style={{
                background: "linear-gradient(95deg, #e0f7fa 0%, #67e8f9 45%, #22d3ee 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            />
          </m.span>
        </h1>

        {/* Subtext — animates after headline */}
        <m.p
          variants={heroItem(0.40)}
          initial="hidden"
          animate="visible"
          className="mt-6 text-lg leading-8 text-slate-50/70 sm:text-xl"
        >
          Kolabee connects businesses with top-tier creators for product promotion,
          photoshoots, and referral programs. One simple platform. Shared data.
        </m.p>

        {/* CTAs — animate last */}
        <m.div
          variants={heroItem(0.52)}
          initial="hidden"
          animate="visible"
          className="mt-10 flex items-center justify-center gap-x-6"
        >
          {/* Primary button — glow on hover, arrow nudge */}
          <m.div
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 28px 6px rgba(34,211,238,0.35), 0 4px 20px rgba(34,211,238,0.2)",
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.18, ease: EASE }}
            style={{ borderRadius: "9999px" }}
          >
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 transition-colors"
            >
              Post a Brief
              <m.span
                className="flex"
                variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                initial="rest"
                whileHover="hover"
                transition={{ duration: 0.18, ease: EASE }}
              >
                <ArrowRight className="h-4 w-4" />
              </m.span>
            </Link>
          </m.div>

          {/* Secondary text link — arrow nudge + animated underline draw */}
          <m.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="relative flex flex-col items-start"
          >
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-sm font-semibold leading-6 text-cyan-100 hover:text-white transition-colors"
            >
              Join as a Creator
              <m.span
                className="flex"
                variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                transition={{ duration: 0.18, ease: EASE }}
              >
                <ArrowRight className="h-4 w-4" />
              </m.span>
            </Link>
            {/* Underline draws left-to-right on hover */}
            <m.span
              className="absolute -bottom-0.5 left-0 h-px bg-cyan-300"
              variants={{ rest: { scaleX: 0, originX: 0 }, hover: { scaleX: 1, originX: 0 } }}
              transition={{ duration: 0.25, ease: EASE }}
              style={{ width: "100%" }}
            />
          </m.div>
        </m.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity z-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">Scroll Down</span>
        <m.button
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-900/40 text-cyan-400 ring-1 ring-cyan-800 backdrop-blur-sm"
          onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown className="h-4 w-4" />
        </m.button>
      </div>
    </section>
  );
}
