// src/app/dashboard/analytics/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ShoppingCart,
  Activity,
  ArrowUpRight,
  Filter,
  TrendingDown,
  ChevronRight,
  MousePointerClick,
  Banknote,
  Link2,
  Award,
  Star,
  TrendingUp,
} from "lucide-react";
import { mockFunnelData, mockCreatorLinks, mockCreatorEarnings } from "@/lib/mock-data";
import { CountUp } from "@/components/ui/count-up";
import { StatCardSkeleton } from "@/components/ui/skeleton";
import { usePersona } from "@/lib/persona-context";

// Canonical easing curve — [0.16, 1, 0.3, 1]
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/* ──────────────────────────────────────────────────
   Premium Custom Funnel Chart (Ultra Modern)
─────────────────────────────────────────────────── */

interface FunnelStage {
  stage: string;
  count: number;
  icon: React.ElementType;
}

const GRADIENTS = [
  { from: "#0ea5e9", to: "#3b82f6", shadow: "rgba(59, 130, 246, 0.4)" }, // Sky to Blue
  { from: "#06b6d4", to: "#0ea5e9", shadow: "rgba(14, 165, 233, 0.4)" }, // Cyan to Sky
  { from: "#14b8a6", to: "#06b6d4", shadow: "rgba(6, 182, 212, 0.4)" },  // Teal to Cyan
  { from: "#10b981", to: "#14b8a6", shadow: "rgba(20, 184, 166, 0.4)" }, // Emerald to Teal
  { from: "#34d399", to: "#10b981", shadow: "rgba(16, 185, 129, 0.4)" }, // Light Emerald to Emerald
];

const stageIcons = [Users, Filter, Activity, ArrowUpRight, ShoppingCart];

function PremiumFunnelChart({ stages }: { stages: FunnelStage[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const maxCount = stages[0].count;

  return (
    <div ref={containerRef} className="relative mt-8">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/5 blur-[80px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col pl-2 sm:pl-8">
        {/* Continuous Vertical Timeline Line */}
        <div className="absolute left-[1.75rem] sm:left-[3.25rem] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-cyan-200 to-transparent dark:via-cyan-800" />

        {stages.map((stage, i) => {
          const pct = (stage.count / maxCount) * 100;
          const stagePercent = ((stage.count / stages[0].count) * 100).toFixed(1);
          const dropOff = i > 0
            ? (((stages[i - 1].count - stage.count) / stages[i - 1].count) * 100).toFixed(1)
            : null;
          const isHovered = hoveredIndex === i;
          const StageIcon = stages[i].icon || stageIcons[i] || Users;

          return (
            <div key={stage.stage} className="relative mb-6 last:mb-0">
              {/* Drop-off Badge */}
              {dropOff && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.1, ease: EASE }}
                  className="absolute -top-5 left-[-1.5rem] sm:left-[-1.5rem] z-20 flex items-center"
                >
                  <div className="flex h-6 items-center gap-1.5 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-md px-2.5 py-1 ring-1 ring-stone-200/50 dark:ring-white/10 shadow-sm">
                    <TrendingDown className="h-3 w-3 text-red-500" />
                    <span className="text-[10px] font-bold text-stone-700 dark:text-stone-300">
                      -{dropOff}%
                    </span>
                  </div>
                </motion.div>
              )}

              <div 
                className="relative z-10 flex items-center gap-4 sm:gap-6 group"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Timeline Icon Node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/40 dark:bg-black/40 ring-4 ring-white/30 dark:ring-white/5 shadow-sm border border-stone-200/50 dark:border-white/10 cursor-default"
                >
                  {isHovered && (
                    <motion.div
                      layoutId="glow"
                      className="absolute inset-0 rounded-full"
                      style={{ background: GRADIENTS[i].from, filter: "blur(8px)", opacity: 0.6 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <motion.div 
                    className="absolute inset-0 rounded-full z-0" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    style={{ background: `linear-gradient(135deg, ${GRADIENTS[i].from}, ${GRADIENTS[i].to})` }}
                    transition={{ duration: 0.2 }}
                  />
                  <StageIcon className="h-4 w-4 relative z-10 transition-colors duration-200" style={{ color: isHovered ? '#fff' : GRADIENTS[i].from }} />
                </motion.div>

                {/* Bar Area */}
                <div className="flex flex-1 flex-col justify-center gap-2 py-2 cursor-default">
                  <div className="flex items-center justify-between pr-2 sm:pr-4">
                    <span className={`text-sm font-semibold transition-colors duration-200 ${isHovered ? "text-cyan-900 dark:text-cyan-100" : "text-stone-700 dark:text-stone-300"}`}>
                      {stage.stage}
                    </span>
                    <div className="flex gap-2 sm:gap-3 items-center">
                      <span className={`text-sm sm:text-base font-bold transition-colors duration-200 ${isHovered ? "text-cyan-950 dark:text-white" : "text-stone-900 dark:text-stone-100"}`}>
                        {stage.count.toLocaleString()}
                      </span>
                      <span className="text-xs font-medium text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/50 px-2 py-0.5 rounded-full ring-1 ring-stone-200 dark:ring-stone-700">
                        {stagePercent}%
                      </span>
                    </div>
                  </div>

                  {/* The Bar itself */}
                  <div className="relative h-3 sm:h-4 w-full rounded-full bg-black/5 dark:bg-white/5 overflow-hidden shadow-inner ring-1 ring-black/5 dark:ring-white/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full"
                      initial={{ width: "0%" }}
                      animate={isVisible ? { width: `${pct}%` } : { width: "0%" }}
                      transition={{ duration: 1.2, delay: i * 0.1 + 0.2, ease: EASE }}
                      style={{
                        background: `linear-gradient(90deg, ${GRADIENTS[i].from}, ${GRADIENTS[i].to})`,
                        boxShadow: isHovered ? `0 0 12px ${GRADIENTS[i].shadow}` : 'none',
                      }}
                    >
                      {/* Inner highlight for 3D glassy feel */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                      
                      {/* Animated shimmer sweep */}
                      <motion.div
                        className="absolute inset-0"
                        animate={isVisible ? { x: ["−100%", "200%"] } : {}}
                        transition={{
                          duration: 2.5,
                          delay: i * 0.1 + 0.6,
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay: Math.random() * 2 + 1
                        }}
                        style={{
                          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                          width: "50%",
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern Summary Row */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: stages.length * 0.1 + 0.3, ease: EASE }}
        className="mt-10 overflow-hidden rounded-3xl premium-glass p-6 sm:px-8 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-6 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 opacity-5 blur-xl pointer-events-none" />
        <div className="relative flex flex-col items-center sm:items-start gap-1 w-full sm:w-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-500" />
            Overall Conversion
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-4xl font-extrabold bg-gradient-to-br from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              {((stages[stages.length - 1].count / stages[0].count) * 100).toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="relative flex gap-4 sm:gap-8 w-full sm:w-auto justify-between sm:justify-end">
          {[
            { label: "Total In", val: stages[0].count.toLocaleString() },
            { label: "Converted", val: stages[stages.length - 1].count.toLocaleString(), highlight: true },
            { label: "Lost", val: (stages[0].count - stages[stages.length - 1].count).toLocaleString() },
          ].map(({ label, val, highlight }) => (
            <div key={label} className="flex flex-col items-center sm:items-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">{label}</span>
              <span className={`font-heading text-lg sm:text-xl font-bold ${highlight ? 'text-cyan-600 dark:text-cyan-400' : 'text-stone-800 dark:text-stone-200'}`}>
                {val}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────
   Main Page
─────────────────────────────────────────────────── */

// ─── Creator Rate Detail Card ─────────────────────────────────────────────────
const TIER_COLORS: Record<string, { bg: string; text: string; ring: string }> = {
  Bronze:   { bg: "bg-orange-500/10 dark:bg-orange-500/20",  text: "text-orange-700 dark:text-orange-300",  ring: "ring-orange-500/20 dark:ring-orange-500/30" },
  Silver:   { bg: "bg-stone-500/10 dark:bg-stone-500/20",    text: "text-stone-700 dark:text-stone-300",    ring: "ring-stone-500/20 dark:ring-stone-500/30"   },
  Gold:     { bg: "bg-amber-500/10 dark:bg-amber-500/20",    text: "text-amber-700 dark:text-amber-300",    ring: "ring-amber-500/20 dark:ring-amber-500/30"   },
  Platinum: { bg: "bg-cyan-500/10 dark:bg-cyan-500/20",      text: "text-cyan-700 dark:text-cyan-300",      ring: "ring-cyan-500/20 dark:ring-cyan-500/30"     },
};
const NEXT_TIER_RATES: Record<string, number> = { Gold: 250, Platinum: 300 };

function CreatorRateDetailCard() {
  const e = mockCreatorEarnings;
  const pct = Math.min((e.progressTowardNextTier / e.nextTierThresholdBDT) * 100, 100);
  const currentColors = TIER_COLORS[e.currentTier] ?? TIER_COLORS.Silver;
  const nextColors    = TIER_COLORS[e.nextTier]    ?? TIER_COLORS.Gold;
  const nextRate      = NEXT_TIER_RATES[e.nextTier] ?? 250;
  const remaining     = e.nextTierThresholdBDT - e.progressTowardNextTier;
  const ordersNeeded  = Math.ceil(remaining / ((e.currentRateBps / 100 / 100) * 1000)); // rough estimate

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
      className="rounded-3xl premium-glass p-6 sm:p-8 shadow-lg"
    >
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-heading text-2xl font-bold text-cyan-950 dark:text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-cyan-500" />
            Commission Rate Progress
          </h3>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Detailed breakdown of your tier progress and how to level up.
          </p>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider ring-1 ${currentColors.bg} ${currentColors.text} ${currentColors.ring}`}>
          <Star className="h-3.5 w-3.5" />
          {e.currentTier} · {(e.currentRateBps / 100).toFixed(2)}%
        </span>
      </div>

      {/* Big progress bar */}
      <div className="mb-6">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
            ৳{e.progressTowardNextTier.toLocaleString()}
            <span className="text-stone-400 dark:text-stone-500 font-normal"> cleared toward {e.nextTier}</span>
          </span>
          <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">{pct.toFixed(1)}%</span>
        </div>
        <div className="h-4 w-full rounded-full bg-black/5 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 relative overflow-hidden"
            initial={{ width: "0%" }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
            <motion.div
              className="absolute inset-0"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, delay: 1.2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
              style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)", width: "50%" }}
            />
          </motion.div>
        </div>
        <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
          ৳{remaining.toLocaleString()} more to unlock <strong className={`font-semibold ${nextColors.text}`}>{e.nextTier}</strong> at <strong className={`font-semibold ${nextColors.text}`}>{(nextRate / 100).toFixed(2)}%</strong>
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Current Rate",     value: `${(e.currentRateBps / 100).toFixed(2)}%`,           sub: e.currentTier,                                     colors: currentColors },
          { label: "Next Rate",        value: `${(nextRate / 100).toFixed(2)}%`,                   sub: e.nextTier,                                        colors: nextColors    },
          { label: "Cleared This Month", value: `৳${e.progressTowardNextTier.toLocaleString()}`,    sub: `of ৳${e.nextTierThresholdBDT.toLocaleString()}`, colors: null          },
          { label: "Still Needed",     value: `৳${remaining.toLocaleString()}`,                    sub: "to level up",                                     colors: null          },
        ].map(({ label, value, sub, colors }) => (
          <div key={label} className={`rounded-xl p-4 ring-1 ${colors ? `${colors.bg} ${colors.ring}` : "bg-black/5 dark:bg-white/5 ring-black/5 dark:ring-white/10"}`}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-1">{label}</p>
            <p className={`font-heading text-lg font-extrabold ${colors ? colors.text : "text-stone-800 dark:text-stone-200"}`}>{value}</p>
            <p className={`text-xs font-medium ${colors ? colors.text + " opacity-70" : "text-stone-500 dark:text-stone-400"}`}>{sub}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function AnalyticsPage() {
  const persona = usePersona();
  const [isLoading, setIsLoading] = useState(true);
  const [liveCheckout, setLiveCheckout] = useState(mockFunnelData.liveInCheckoutBase);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCheckout((prev) => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(12, prev + change);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const conversionRate = (mockFunnelData.orderConfirmed / mockFunnelData.totalVisits) * 100;

  // Build typed funnel stages for Business
  const funnelStages: FunnelStage[] = mockFunnelData.chartData.map((d, i) => ({
    stage: d.stage,
    count: d.count,
    icon: stageIcons[i % stageIcons.length],
  }));

  // Creator-specific derived stats
  const totalClicks   = mockCreatorLinks.reduce((s, l) => s + l.clicks, 0);
  const scaleFactor   = mockFunnelData.totalVisits > 0 ? totalClicks / mockFunnelData.totalVisits : 0;
  
  const creatorFunnelStages: FunnelStage[] = mockFunnelData.chartData.map((d, i) => ({
    stage: d.stage,
    count: Math.round(d.count * scaleFactor),
    icon: stageIcons[i % stageIcons.length],
  }));

  const creatorTotalOrders = creatorFunnelStages[creatorFunnelStages.length - 1]?.count || 0;
  const myConversion  = totalClicks > 0 ? (creatorTotalOrders / totalClicks) * 100 : 0;

  // ── Skeleton ──────────────────────────────────────────────────────────────
  const skeletonChart = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
      className="rounded-3xl premium-glass p-6 sm:p-10"
    >
      <div className="h-6 w-48 rounded-full skeleton-shimmer mb-8" />
      <div className="flex flex-col gap-6">
        {[80, 65, 42, 26, 18].map((w, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full skeleton-shimmer shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
               <div className="flex justify-between">
                 <div className="w-24 h-4 rounded-full skeleton-shimmer" />
                 <div className="w-16 h-4 rounded-full skeleton-shimmer" />
               </div>
               <div className="h-4 rounded-full skeleton-shimmer w-full" style={{ maxWidth: `${w}%` }} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // ── Filter button (shared) ─────────────────────────────────────────────────
  const filterBtn = (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex items-center gap-3"
    >
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2, ease: EASE }}
        className="flex h-10 items-center justify-center gap-2 rounded-full border border-stone-200 bg-white dark:border-stone-800 dark:bg-[#0a0f14] px-4 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 hover:border-stone-300 transition-colors"
      >
        <Filter className="h-4 w-4" />
        <span>Last 30 Days</span>
      </motion.button>
    </motion.div>
  );

  // ════════════════════════════════════════════════════════════
  //  CREATOR ANALYTICS VIEW
  // ════════════════════════════════════════════════════════════
  if (persona === "creator") {
    return (
      <div className="flex flex-col gap-8 pb-10">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <h1 className="font-heading text-3xl font-bold text-cyan-950 dark:text-white">My Analytics</h1>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Your personal link performance and commission rate progress.
            </p>
          </motion.div>
          {filterBtn}
        </div>

        {/* Creator KPI Cards */}
        {isLoading ? (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (<motion.div key={i} variants={cardVariants}><StatCardSkeleton /></motion.div>))}
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* My Total Clicks */}
            <motion.div variants={cardVariants} whileHover={{ y: -3 }} transition={{ duration: 0.22, ease: EASE }} className="premium-glass rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-stone-500 dark:text-stone-400">My Total Clicks</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400"><MousePointerClick className="h-5 w-5" /></div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-cyan-950 dark:text-white">
                  <CountUp to={totalClicks} duration={1400} delay={200} formatter={(n) => Math.round(n).toLocaleString()} />
                </span>
                <span className="flex items-center text-sm font-medium text-green-600"><ArrowUpRight className="h-4 w-4" /> 9.4%</span>
              </div>
            </motion.div>

            {/* My Conversion Rate */}
            <motion.div variants={cardVariants} whileHover={{ y: -3 }} transition={{ duration: 0.22, ease: EASE }} className="premium-glass rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-stone-500 dark:text-stone-400">My Conversion Rate</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400"><TrendingUp className="h-5 w-5" /></div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-cyan-950 dark:text-white">
                  <CountUp to={myConversion} duration={1400} delay={250} decimals={2} suffix="%" />
                </span>
                <span className="flex items-center text-sm font-medium text-green-600"><ArrowUpRight className="h-4 w-4" /> 1.2%</span>
              </div>
            </motion.div>

            {/* Commissions This Month */}
            <motion.div variants={cardVariants} whileHover={{ y: -3 }} transition={{ duration: 0.22, ease: EASE }} className="relative overflow-hidden premium-glass rounded-2xl p-6">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-100/50 dark:bg-cyan-400/10 blur-xl" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-sm font-medium text-stone-500 dark:text-stone-400">Commissions This Month</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400"><Banknote className="h-5 w-5" /></div>
              </div>
              <div className="relative z-10 mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-cyan-950 dark:text-white">
                  ৳<CountUp to={mockCreatorEarnings.clearedThisMonth} duration={1400} delay={300} formatter={(n) => Math.round(n).toLocaleString()} />
                </span>
                <span className="flex items-center text-sm font-medium text-green-600"><ArrowUpRight className="h-4 w-4" /> 14.2%</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Creator Funnel Chart */}
        {!isLoading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25, ease: EASE }} className="rounded-3xl premium-glass p-6 sm:p-10 shadow-lg">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-2xl font-bold text-cyan-950 dark:text-white flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-cyan-500" />
                  Your Funnel
                </h3>
                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  Visitor journey through <strong className="font-semibold text-stone-700 dark:text-stone-300">your links</strong> — from first click to confirmed order.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-cyan-50 dark:bg-cyan-950/50 px-4 py-2 ring-1 ring-cyan-100 dark:ring-cyan-900/50">
                <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="h-2 w-2 rounded-full bg-cyan-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">Last 30 Days</span>
              </div>
            </div>
            <PremiumFunnelChart stages={creatorFunnelStages} />
          </motion.div>
        )}
        {isLoading && skeletonChart}

        {/* Rate Detail */}
        {!isLoading && <CreatorRateDetailCard />}
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════
  //  BUSINESS ANALYTICS VIEW
  // ════════════════════════════════════════════════════════════
  return (
    <div className="flex flex-col gap-8 pb-10">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h1 className="font-heading text-3xl font-bold text-cyan-950 dark:text-white">Link Analytics</h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Real-time funnel conversion and attribution data.
          </p>
        </motion.div>
        {filterBtn}
      </div>

      {/* KPI Cards */}
      {isLoading ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {[0, 1, 2].map((i) => (
            <motion.div key={i} variants={cardVariants}>
              <StatCardSkeleton />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {/* Total Visits */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="premium-glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-500 dark:text-stone-400">Total Visits</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-cyan-950 dark:text-white">
                <CountUp
                  to={mockFunnelData.totalVisits}
                  duration={1400}
                  delay={200}
                  formatter={(n) => Math.round(n).toLocaleString()}
                />
              </span>
              <span className="flex items-center text-sm font-medium text-green-600">
                <ArrowUpRight className="h-4 w-4" /> 12.5%
              </span>
            </div>
          </motion.div>

          {/* Conversion Rate */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="premium-glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-500 dark:text-stone-400">Avg. Conversion Rate</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                <ShoppingCart className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-cyan-950 dark:text-white">
                <CountUp to={conversionRate} duration={1400} delay={250} decimals={2} suffix="%" />
              </span>
              <span className="flex items-center text-sm font-medium text-green-600">
                <ArrowUpRight className="h-4 w-4" /> 2.1%
              </span>
            </div>
          </motion.div>

          {/* Live Checkout */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="relative overflow-hidden premium-glass rounded-2xl p-6"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-100/50 dark:bg-cyan-400/10 blur-xl" />
            <div className="relative z-10 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-medium text-cyan-800 dark:text-cyan-300">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="h-2 w-2 rounded-full bg-red-500"
                />
                Live in Checkout
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/40 dark:bg-black/40 text-cyan-600 dark:text-cyan-400 shadow-sm ring-1 ring-white/50 dark:ring-white/10">
                <Activity className="h-5 w-5" />
              </div>
            </div>
            <div className="relative z-10 mt-4 flex items-baseline gap-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={liveCheckout}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="text-3xl font-bold text-cyan-950 dark:text-white"
                >
                  {liveCheckout}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm font-medium text-cyan-700 dark:text-cyan-400">users right now</span>
            </div>
          </motion.div>
        </motion.div>
      )}


      {/* Premium Funnel Chart */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="rounded-3xl premium-glass p-6 sm:p-10 shadow-lg"
        >
          {/* Chart header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h3 className="font-heading text-2xl font-bold text-cyan-950 dark:text-white flex items-center gap-2">
                <Filter className="h-5 w-5 text-cyan-500" />
                Traffic Funnel
              </h3>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Visitor journey from first touch to confirmed order
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-cyan-50 dark:bg-cyan-950/50 px-4 py-2 ring-1 ring-cyan-100 dark:ring-cyan-900/50">
              <motion.span 
                animate={{ opacity: [1, 0.4, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }} 
                className="h-2 w-2 rounded-full bg-cyan-500" 
              />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">Last 30 Days</span>
            </div>
          </div>

          <PremiumFunnelChart stages={funnelStages} />
        </motion.div>
      )}

      {/* Skeleton chart while loading */}
      {isLoading && skeletonChart}

    </div>
  );
}