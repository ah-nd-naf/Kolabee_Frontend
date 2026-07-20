"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Megaphone,
  Camera,
  Video,
  Users,
  FileText,
  UserCheck,
  CreditCard,
  UserCircle,
  Briefcase,
  Banknote,
  CheckCircle2,
  Hexagon,
  Zap,
  AtSign,
  Share2,
  Globe,
  Mail,
  Rocket,
  TrendingUp,
  Star,
  ArrowUpRight,
  Users2,
  Building2,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { CountUp } from "@/components/ui/count-up";
import { Navbar } from "@/components/ui/navbar";
import { ParticleField } from "@/components/ui/particle-field";
import { DecodeText } from "@/components/ui/decode-text";
import { FocusText } from "@/components/ui/focus-text";

// ── Components ──

/* ───────────────────────────────────────────────────
   ANIMATED AURORA BACKGROUND
   Three giant cyan blobs drift slowly behind the hero.
   Inline CSS filter: blur(...) used for guaranteed rendering;
   Tailwind arbitrary blur values can be unreliable at runtime.
─────────────────────────────────────────────────── */
function AnimatedAurora() {
  const prefersReduced = useReducedMotion();

  const sharedClass = "absolute will-change-transform";
  const easing = [0.45, 0, 0.55, 1] as [number, number, number, number];

  const blob1Style: React.CSSProperties = {
    top: "-25%", left: "-15%",
    width: "80vw", height: "80vw",
    maxWidth: 900, maxHeight: 900,
    borderRadius: "50%",
    background: "radial-gradient(circle at center, rgba(8,145,178,0.55) 0%, rgba(8,145,178,0.18) 45%, transparent 70%)",
    filter: "blur(90px)",
  };
  const blob2Style: React.CSSProperties = {
    top: "10%", right: "-20%",
    width: "75vw", height: "75vw",
    maxWidth: 850, maxHeight: 850,
    borderRadius: "50%",
    background: "radial-gradient(circle at center, rgba(34,211,238,0.45) 0%, rgba(34,211,238,0.14) 45%, transparent 70%)",
    filter: "blur(100px)",
  };
  const blob3Style: React.CSSProperties = {
    bottom: "-30%", left: "10%",
    width: "70vw", height: "70vw",
    maxWidth: 800, maxHeight: 800,
    borderRadius: "50%",
    background: "radial-gradient(circle at center, rgba(103,232,249,0.40) 0%, rgba(103,232,249,0.12) 45%, transparent 70%)",
    filter: "blur(110px)",
  };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#083344", zIndex: 0 }}
    >
      {prefersReduced ? (
        <>
          <div className={sharedClass} style={blob1Style} />
          <div className={sharedClass} style={blob2Style} />
          <div className={sharedClass} style={blob3Style} />
        </>
      ) : (
        <>
          <motion.div
            className={sharedClass} style={blob1Style}
            animate={{ x: ["0%","18%","-6%","0%"], y: ["0%","-14%","10%","0%"], scale: [1, 1.15, 0.88, 1] }}
            transition={{ duration: 24, ease: easing, repeat: Infinity, repeatType: "mirror" }}
          />
          <motion.div
            className={sharedClass} style={blob2Style}
            animate={{ x: ["0%","-14%","12%","0%"], y: ["0%","16%","-8%","0%"], scale: [1, 0.85, 1.12, 1] }}
            transition={{ duration: 30, ease: easing, repeat: Infinity, repeatType: "mirror" }}
          />
          <motion.div
            className={sharedClass} style={blob3Style}
            animate={{ x: ["0%","10%","-18%","0%"], y: ["0%","8%","-12%","0%"], scale: [1, 1.2, 0.82, 1] }}
            transition={{ duration: 18, ease: easing, repeat: Infinity, repeatType: "mirror" }}
          />
        </>
      )}

      {/* Centre vignette — keeps headline readable */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 30%, rgba(8,51,68,0.55) 100%)" }}
      />

      {/* SVG Noise grain ~4% */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}

/* ───────────────────────────────────────────────────
   CURSOR GLOW
   A large soft radial glow that follows the cursor
   with spring-based lag (stiffness:60, damping:20).
   Disabled: touch devices & prefers-reduced-motion.
─────────────────────────────────────────────────── */
function CursorGlow({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
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
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      style={{ top: 0, left: 0 }}
    >
      <motion.div
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
    </motion.div>
  );
}

export default function LandingPage() {
  const [activePersona, setActivePersona] = useState<"business" | "creator">("business");
  // Ref passed to CursorGlow so it can track mouse position relative to the hero section
  const heroRef = useRef<HTMLElement>(null);

  // ── Consistent easing [0.16, 1, 0.3, 1] applied to ALL animations ──
  const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
  // Keep alias for sections below that already use customEasing
  const customEasing = EASE;

  // ── Per-element staggered hero entrance ──────────────────────────────
  // Each element is animated individually so we can control order precisely:
  // badge → h1 line 1 → h1 line 2 → subtext → CTAs
  // Using delay prop rather than stagger parent so each is independently tuned.
  const heroItem = (delay: number) => ({
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: EASE, delay },
    },
  });

  // Keep legacy container/item variants for sections further down the page
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const heroItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
  };

  // --- Service Category Animations ---
  const servicesContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const serviceCardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEasing } },
  };

  const services = [
    { title: "Product Promotion", description: "Get your product in front of the right audience with authentic influencer campaigns.", icon: Megaphone },
    { title: "Product Photoshoots", description: "Commission high-quality, brand-aligned visual assets for your storefront and socials.", icon: Camera },
    { title: "Videography & UGC", description: "Source engaging user-generated content and professional video edits.", icon: Video },
    { title: "Ambassadorship & Referrals", description: "Turn top-performing creators into long-term partners with shared affiliate links.", icon: Users },
  ];

  // --- How It Works Data ---
  const flowData = {
    business: [
      { step: "01", title: "Post a brief", description: "Outline your requirements, deliverables, and budget in minutes.", icon: FileText },
      { step: "02", title: "Get matched & hire", description: "Review applications, compare performance data, and hire the best fit.", icon: UserCheck },
      { step: "03", title: "Pay on delivery", description: "Funds are held securely and only released when you approve the work.", icon: CreditCard },
    ],
    creator: [
      { step: "01", title: "Build your profile", description: "Showcase your portfolio, rates, and past performance metrics.", icon: UserCircle },
      { step: "02", title: "Get matched to briefs", description: "Apply to open campaigns or receive direct invites from top brands.", icon: Briefcase },
      { step: "03", title: "Deliver & get paid", description: "Submit your work and get paid reliably. No chasing invoices.", icon: Banknote },
    ]
  };

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-[#0a0f14] text-stone-900 dark:text-slate-100">
      <Navbar />
      
      {/* ─────────────────────────────────────────────
         1. Hero Section
         z-layers (bottom → top):
           [0]  AnimatedAurora (dark teal base + blobs)
           [1]  ParticleField canvas
           [2]  CursorGlow (spring-following radial)
           [3]  HeroGrain (animated noise texture)
           [10] Hero text / badge / CTAs
           [10] Scroll indicator
      ───────────────────────────────────────────── */}
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
          <motion.div
            variants={heroItem(0.05)}
            initial="hidden"
            animate="visible"
            className="mb-8 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-cyan-900/50 px-4 py-1.5 text-sm font-medium text-cyan-200 ring-1 ring-cyan-700/50 backdrop-blur-sm">
              {/* Sparkle icon breathes on an infinite 2.5s loop */}
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.15, 0.9] }}
                transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
                className="flex"
              >
                <Sparkles className="h-4 w-4" />
              </motion.span>
              <span>Matched to your brand, not just your budget.</span>
            </span>
          </motion.div>

          {/* H1 — two-beat reveal: line 1 then line 2 with gradient on second line */}
          <h1 className="font-heading text-5xl font-bold tracking-tight text-white sm:text-7xl" style={{ textShadow: "0 0 80px rgba(34,211,238,0.15)" }}>
            <motion.span
              variants={heroItem(0.16)}
              initial="hidden"
              animate="visible"
              className="block"
            >
              <FocusText text="Everything a product" delayMs={200} staggerMs={40} />
            </motion.span>
            <motion.span
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
            </motion.span>
          </h1>

          {/* Subtext — animates after headline */}
          <motion.p
            variants={heroItem(0.40)}
            initial="hidden"
            animate="visible"
            className="mt-6 text-lg leading-8 text-cyan-100/90 sm:text-xl"
          >
            Kolabee connects businesses with top-tier creators for product promotion,
            photoshoots, and referral programs. One simple platform. Shared data.
          </motion.p>

          {/* CTAs — animate last */}
          <motion.div
            variants={heroItem(0.52)}
            initial="hidden"
            animate="visible"
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            {/* Primary button — glow on hover, arrow nudge */}
            <motion.div
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
                <motion.span
                  className="flex"
                  variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                  initial="rest"
                  whileHover="hover"
                  transition={{ duration: 0.18, ease: EASE }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </motion.div>

            {/* Secondary text link — arrow nudge + animated underline draw */}
            <motion.div
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
                <motion.span
                  className="flex"
                  variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                  transition={{ duration: 0.18, ease: EASE }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
              {/* Underline draws left-to-right on hover */}
              <motion.span
                className="absolute -bottom-0.5 left-0 h-px bg-cyan-300"
                variants={{ rest: { scaleX: 0, originX: 0 }, hover: { scaleX: 1, originX: 0 } }}
                transition={{ duration: 0.25, ease: EASE }}
                style={{ width: "100%" }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">Scroll Down</span>
          <motion.button
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-900/40 text-cyan-400 ring-1 ring-cyan-800 backdrop-blur-sm"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.button>
        </div>
      </section>

      {/* 2. Service Categories Section */}
      <section id="features" className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: customEasing }} className="mb-16 text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-cyan-950 sm:text-4xl">One platform. Four ways to grow.</h2>
            <p className="mt-4 text-lg text-stone-600">Stop juggling spreadsheets and DMs. Handle every type of creator collaboration in one place.</p>
          </motion.div>
          <motion.div variants={servicesContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.title} variants={serviceCardVariants} whileHover={{ y: -8 }} className="group relative rounded-2xl bg-white p-8 ring-1 ring-stone-200/50 shadow-sm transition-shadow hover:shadow-xl">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100 transition-colors group-hover:bg-cyan-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-cyan-950">{service.title}</h3>
                  <p className="mt-3 text-sm text-stone-600 leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="bg-white dark:bg-[#0f1923] px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: customEasing }} className="mb-16 text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-cyan-950 sm:text-4xl">How Kolabee works</h2>
            <p className="mt-4 text-lg text-stone-600">Built to make collaboration seamless, whichever side of the brief you are on.</p>
            
            {/* Interactive Toggle */}
            <div className="mt-8 flex justify-center">
              <div className="relative flex space-x-1 rounded-full bg-stone-100 dark:bg-white/[0.05] p-1 ring-1 ring-stone-200 dark:ring-white/[0.05]">
                {(["business", "creator"] as const).map((persona) => (
                  <button
                    key={persona}
                    onClick={() => setActivePersona(persona)}
                    className={`relative rounded-full px-6 py-2.5 text-sm font-semibold outline-none transition-colors ${
                      activePersona === persona ? "text-cyan-900 dark:text-cyan-50" : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
                    }`}
                  >
                    {activePersona === persona && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-full bg-white dark:bg-cyan-900/60 shadow-sm ring-1 ring-stone-200/50 dark:ring-cyan-800/50"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 capitalize">For {persona === "business" ? "Businesses" : "Creators"}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Animated Steps Container */}
          <div className="relative mx-auto max-w-5xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePersona}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: customEasing }}
                className="grid grid-cols-1 gap-8 md:grid-cols-3"
              >
                {flowData[activePersona].map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.step} className="relative flex flex-col items-center text-center">
                      <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 ring-8 ring-white dark:ring-[#0f1923]">
                        <Icon className="h-7 w-7" />
                      </div>
                      {/* Connecting Line */}
                      {index !== flowData[activePersona].length - 1 && (
                        <div className="absolute top-8 left-[60%] hidden h-[2px] w-[80%] bg-stone-200/60 dark:bg-white/10 md:block" />
                      )}
                      <h3 className="font-heading text-xl font-bold text-cyan-950">
                        <span className="mb-2 block text-sm font-medium text-cyan-600">Step {step.step}</span>
                        {step.title}
                      </h3>
                      <p className="mt-3 text-stone-600">{step.description}</p>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. Pricing Section */}
      <section id="pricing" className="relative overflow-hidden bg-dark-section px-6 py-24 sm:py-32 lg:px-8 text-center z-0">
        <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />

        <div className="mx-auto max-w-4xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: customEasing }}
          >
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              One simple fee. Only when a deal completes.
            </h2>
            <p className="mt-4 text-lg text-cyan-200">
              No subscriptions. No listing fees. We only make money when you do.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: customEasing, delay: 0.1 }}
            className="mt-16 mx-auto max-w-2xl rounded-3xl bg-gradient-to-b from-cyan-400 to-cyan-900 p-[1px] shadow-2xl shadow-cyan-900/50"
          >
            <div className="rounded-[23px] bg-cyan-950 p-8 sm:p-12">
              <div className="grid grid-cols-1 gap-8 divide-y divide-cyan-800 md:grid-cols-2 md:divide-y-0 md:divide-x">
                
                <div className="flex flex-col items-center md:pr-8">
                  <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Service Deals</span>
                  <div className="mt-4 flex items-baseline text-6xl font-extrabold text-white">
                    10<span className="text-4xl">%</span>
                  </div>
                  <p className="mt-4 text-sm text-cyan-200 text-center leading-relaxed">
                    Deducted from escrow <strong className="text-white font-medium">only</strong> when funds are released to the creator.
                  </p>
                </div>

                <div className="flex flex-col items-center pt-8 md:pl-8 md:pt-0">
                  <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Referral Programs</span>
                  <div className="mt-4 flex items-baseline text-6xl font-extrabold text-white">
                    2<span className="text-4xl">%</span>
                  </div>
                  <p className="mt-4 text-sm text-cyan-200 text-center leading-relaxed">
                    Of the attributed order value. Deducted alongside the creator's commission.
                  </p>
                </div>

              </div>

              <ul className="mt-10 flex flex-col justify-center gap-4 border-t border-cyan-800/50 pt-8 sm:flex-row sm:gap-10">
                <li className="flex items-center justify-center gap-2 text-sm font-medium text-cyan-100">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400" /> 
                  Zero Subscription Fees
                </li>
                <li className="flex items-center justify-center gap-2 text-sm font-medium text-cyan-100">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400" /> 
                  Zero Listing Fees
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Final CTA Section — White / light section for visual relief */}
      <section className="relative overflow-hidden bg-white">

        {/* Decorative top divider — thin cyan line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-60" />

        {/* Soft radial colour bleed — top-right corner accent */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-50 opacity-80 blur-[80px]" />
          <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-stone-100 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

            {/* ── LEFT: Copy + CTAs ── */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow chip */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-1.5 ring-1 ring-cyan-200">
                <Rocket className="h-3.5 w-3.5 text-cyan-600" />
                <span className="text-xs font-semibold uppercase tracking-widest text-cyan-600">Ready when you are</span>
              </div>

              {/* Headline — dark ink + cyan gradient accent */}
              <h2 className="font-heading text-4xl font-bold leading-tight tracking-tight text-cyan-950 sm:text-5xl lg:text-[3.25rem]">
                Your next deal<br />
                <span className="bg-gradient-to-r from-cyan-500 to-cyan-700 bg-clip-text text-transparent">
                  is waiting.
                </span>
              </h2>

              {/* Body copy — warm stone */}
              <p className="mt-6 max-w-lg text-base leading-relaxed text-stone-500">
                Whether you're launching a new product or looking for your next brand partnership — Kolabee is where the work gets done, transparently.
              </p>

              {/* Trust badges — light cyan tints */}
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { icon: BadgeCheck, label: 'No subscription fees' },
                  { icon: BadgeCheck, label: 'Escrow-protected payments' },
                  { icon: BadgeCheck, label: 'Shared real-time analytics' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1.5 ring-1 ring-cyan-200">
                    <Icon className="h-3.5 w-3.5 text-cyan-500" />
                    <span className="text-xs font-medium text-cyan-700">{label}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/dashboard"
                    className="group inline-flex items-center gap-2 rounded-full bg-cyan-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:bg-cyan-500"
                  >
                    Post a Brief
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-7 py-3.5 text-sm font-semibold text-stone-700 ring-1 ring-stone-200 transition-all hover:bg-stone-200"
                  >
                    Join as a Creator
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* ── RIGHT: Proof cards stack — white cards with shadows ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="flex flex-col gap-4"
            >
              {/* Card 1: creator stat */}
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, ease: customEasing }}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md shadow-stone-200/80 ring-1 ring-stone-200"
              >
                <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-cyan-100/60 blur-2xl transition-all group-hover:bg-cyan-200/60" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
                      <Users2 className="h-5 w-5" />
                    </div>
                    <p className="font-heading text-3xl font-extrabold text-cyan-950">
                      <CountUp to={12000} duration={1600} formatter={(n) => `${Math.round(n).toLocaleString()}+`} />
                    </p>
                    <p className="mt-1 text-sm text-stone-500">Vetted creators across all niches</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-200">
                    <TrendingUp className="h-3 w-3" /> +24%
                  </div>
                </div>
              </motion.div>

              {/* Card 2: brand stat — offset right for depth */}
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, ease: customEasing }}
                className="group relative ml-6 overflow-hidden rounded-2xl bg-white p-6 shadow-md shadow-stone-200/80 ring-1 ring-stone-200"
              >
                <div className="absolute -left-6 -bottom-6 h-28 w-28 rounded-full bg-stone-100/80 blur-2xl transition-all group-hover:bg-cyan-100/60" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <p className="font-heading text-3xl font-extrabold text-cyan-950">
                      <CountUp to={2400} duration={1400} delay={100} formatter={(n) => `${Math.round(n).toLocaleString()}+`} />
                    </p>
                    <p className="mt-1 text-sm text-stone-500">Brands running active campaigns</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-200">
                    <TrendingUp className="h-3 w-3" /> +18%
                  </div>
                </div>
              </motion.div>

              {/* Card 3: rating strip */}
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-950 to-cyan-900 p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar stack */}
                    <div className="flex -space-x-2">
                      {['#0891b2','#06b6d4','#67e8f9','#a5f3fc'].map((c, i) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full ring-2 ring-cyan-950"
                          style={{ background: `radial-gradient(circle at 35% 35%, ${c}, ${c}88)` }}
                        />
                      ))}
                    </div>
                    <div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="mt-0.5 text-xs text-cyan-400">4.9 / 5 from 3,200+ reviews</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-cyan-800/60 px-3 py-1.5 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-700">
                    Trusted platform
                  </span>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          FOOTER
      ──────────────────────────────────────── */}
      <footer className="relative overflow-hidden bg-dark-section">

        {/* Pulsing shimmer border */}
        <motion.div
          className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ opacity: [0.25, 0.85, 0.25] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ambient glow blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-64 -top-32 h-[600px] w-[600px] rounded-full bg-cyan-500/[0.07] blur-[140px]" />
          <div className="absolute -right-64 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-700/[0.06] blur-[120px]" />
        </div>

        {/* Giant KOLABEE watermark — anchored to the bottom */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 flex select-none items-end justify-center overflow-hidden"
        >
          <span
            className="font-heading translate-y-[38%] whitespace-nowrap text-[20vw] font-black uppercase leading-none tracking-tighter"
            style={{ color: 'rgba(6, 40, 52, 0.9)' }}
          >
            KOLABEE
          </span>
        </div>

        {/* ── Main content ── */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-10 pt-20 lg:px-8">

          {/* Top grid: Brand + Nav */}
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">

            {/* ── Brand column ── */}
            <div className="lg:col-span-2">
              {/* Logo mark */}
              <div className="mb-5 flex items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                  <Hexagon className="h-10 w-10 text-cyan-500" fill="currentColor" strokeWidth={0} />
                  <Zap className="absolute h-[18px] w-[18px] fill-white text-white" strokeWidth={0} />
                </div>
                <span className="font-heading text-2xl font-bold tracking-tight text-white">Kolabee</span>
              </div>

              <p className="max-w-xs text-sm leading-relaxed text-cyan-300/80">
                The platform where brands and creators build real partnerships
                — with shared analytics, transparent payments, and zero friction.
              </p>

              {/* Live platform badge */}
              <div className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-cyan-900/70 px-4 py-2 ring-1 ring-cyan-800/80">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                <span className="text-xs font-medium text-cyan-300">12,000+ active creators</span>
              </div>

              {/* Social icons */}
              <div className="mt-8 flex gap-3">
                {(
                  [
                    { Icon: AtSign,  label: 'Instagram' },
                    { Icon: Share2,  label: 'LinkedIn'  },
                    { Icon: Globe,   label: 'Website'   },
                    { Icon: Mail,    label: 'Email'     },
                  ] as const
                ).map(({ Icon, label }) => (
                  <motion.a
                    key={label}
                    href="#"
                    aria-label={label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-900/80 text-cyan-400 ring-1 ring-cyan-800 transition-all duration-200 hover:bg-cyan-500 hover:text-white hover:ring-cyan-400"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* ── Navigation columns ── */}
            <div className="grid grid-cols-3 gap-8 lg:col-span-3">
              {([
                {
                  heading: 'Product',
                  links: ['How it works', 'Post a Brief', 'Creator Marketplace', 'Link Analytics', 'Pricing'],
                  hrefs: ['#how-it-works', '/dashboard', '/dashboard', '/dashboard/analytics', '#pricing'],
                },
                {
                  heading: 'Company',
                  links: ['About', 'Blog', 'Careers', 'Press Kit', 'Contact'],
                  hrefs: ['#', '#', '#', '#', '#'],
                },
                {
                  heading: 'Legal',
                  links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Licenses'],
                  hrefs: ['#', '#', '#', '#'],
                },
              ]).map(({ heading, links, hrefs }) => (
                <div key={heading}>
                  <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500">
                    {heading}
                  </p>
                  <ul className="space-y-4">
                    {links.map((label, i) => (
                      <li key={label}>
                        <Link
                          href={hrefs[i]}
                          className="group flex items-center gap-2 text-sm text-white/60 transition-colors duration-200 hover:text-white"
                        >
                          <span className="h-px w-0 shrink-0 rounded-full bg-cyan-500 transition-all duration-300 ease-out group-hover:w-3" />
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── Stats grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-cyan-800/30 ring-1 ring-cyan-800/40 sm:grid-cols-4"
          >
            {([
              { label: 'Creators',             rawValue: 12000,  formatter: (n: number) => `${Math.round(n / 1000 * 10) / 10}K+`, delay: 0 },
              { label: 'Brands',               rawValue: 2400,   formatter: (n: number) => `${Math.round(n).toLocaleString()}+`, delay: 80 },
              { label: 'Campaigns Delivered',  rawValue: 38000,  formatter: (n: number) => `${Math.round(n / 1000 * 10) / 10}K+`, delay: 160 },
              { label: 'Paid Out to Creators', rawValue: 4.2,    formatter: (n: number) => `$${n.toFixed(1)}M+`, delay: 240 },
            ]).map(({ label, rawValue, formatter, delay }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: delay / 1000 }}
                className="flex flex-col items-center justify-center bg-cyan-950 px-6 py-10 text-center"
              >
                <span className="font-heading text-3xl font-extrabold text-white">
                  <CountUp
                    to={rawValue}
                    duration={1500}
                    delay={delay + 200}
                    formatter={formatter}
                  />
                </span>
                <span className="mt-1.5 text-xs text-cyan-500">{label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Bottom bar ── */}
          <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-cyan-900 pt-8 sm:flex-row">
            <p className="text-xs text-cyan-800">
              © {new Date().getFullYear()} Kolabee Ltd. All rights reserved.
            </p>



            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-cyan-900 px-4 py-2 text-xs font-medium text-cyan-400 ring-1 ring-cyan-800 transition-all hover:bg-cyan-500 hover:text-white hover:ring-cyan-500"
            >
              Back to top ↑
            </motion.button>
          </div>
        </div>
      </footer>

    </main>
  );
}