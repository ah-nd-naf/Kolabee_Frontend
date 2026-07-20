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
} from "lucide-react";
import { mockFunnelData } from "@/lib/mock-data";
import { CountUp } from "@/components/ui/count-up";
import { StatCardSkeleton } from "@/components/ui/skeleton";

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
   Premium Custom Funnel Chart
   - Animated horizontal gradient bars (width: 0→%)
   - Drop-off % badge between each stage
   - Count + stage % labels
   - Hover: bar brightens + tooltip info
   - Staggered entrance per row
─────────────────────────────────────────────────── */

interface FunnelStage {
  stage: string;
  count: number;
  icon: React.ElementType;
}

// Bar gradient colours — dark cyan → bright cyan across stages
const GRADIENTS = [
  { from: "#0e7490", to: "#0891b2" }, // stage 1
  { from: "#0891b2", to: "#06b6d4" }, // stage 2
  { from: "#06b6d4", to: "#22d3ee" }, // stage 3
  { from: "#22d3ee", to: "#67e8f9" }, // stage 4
  { from: "#67e8f9", to: "#a5f3fc" }, // stage 5
];

const stageIcons = [Users, ShoppingCart, ShoppingCart, ShoppingCart, Activity];

function PremiumFunnelChart({ stages }: { stages: FunnelStage[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer — animate bars when chart scrolls into view
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
    <div ref={containerRef} className="flex flex-col gap-0">
      {stages.map((stage, i) => {
        const pct = (stage.count / maxCount) * 100;
        const stagePercent = ((stage.count / stages[0].count) * 100).toFixed(1);
        const dropOff = i > 0
          ? (((stages[i - 1].count - stage.count) / stages[i - 1].count) * 100).toFixed(1)
          : null;
        const isHovered = hoveredIndex === i;
        const StageIcon = stageIcons[i];

        return (
          <div key={stage.stage}>
            {/* Drop-off row between stages */}
            {dropOff && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.09 + 0.15, ease: EASE }}
                className="flex items-center gap-2 py-1.5 pl-[152px]"
              >
                <div className="flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 ring-1 ring-red-100">
                  <TrendingDown className="h-3 w-3 text-red-400" />
                  <span className="text-[11px] font-semibold text-red-500">
                    −{dropOff}% drop-off
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-red-100 to-transparent" />
              </motion.div>
            )}

            {/* Stage row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.09, ease: EASE }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex items-center gap-4 py-2"
            >
              {/* Stage label + icon */}
              <div className="flex w-36 shrink-0 items-center gap-2 justify-end">
                <motion.div
                  animate={isHovered ? { scale: 1.1, opacity: 1 } : { scale: 1, opacity: 0.5 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${GRADIENTS[i].from}22` }}
                >
                  <StageIcon className="h-3.5 w-3.5" style={{ color: GRADIENTS[i].to }} />
                </motion.div>
                <span className={`text-sm font-medium transition-colors duration-150 ${
                  isHovered ? "text-cyan-900" : "text-stone-500"
                }`}>
                  {stage.stage}
                </span>
              </div>

              {/* Animated bar */}
              <div className="relative flex-1 h-11 rounded-r-full overflow-hidden bg-stone-50">
                {/* Track glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-r-full"
                  animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: `linear-gradient(90deg, ${GRADIENTS[i].from}15, ${GRADIENTS[i].to}08)`,
                  }}
                />

                {/* The bar itself */}
                <motion.div
                  className="absolute inset-y-0 left-0 flex items-center rounded-r-full overflow-hidden"
                  initial={{ width: "0%" }}
                  animate={isVisible ? { width: `${pct}%` } : { width: "0%" }}
                  transition={{ duration: 1.1, delay: i * 0.1 + 0.2, ease: EASE }}
                  style={{
                    background: `linear-gradient(90deg, ${GRADIENTS[i].from}, ${GRADIENTS[i].to})`,
                  }}
                >
                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute inset-0"
                    animate={isVisible ? { x: ["−100%", "200%"] } : {}}
                    transition={{
                      duration: 1.6,
                      delay: i * 0.1 + 0.5,
                      ease: "easeOut",
                      repeat: 0,
                    }}
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
                      width: "60%",
                    }}
                  />
                </motion.div>

                {/* ChevronRight connector at bar end */}
                <motion.div
                  className="absolute inset-y-0 flex items-center"
                  initial={{ left: "0%", opacity: 0 }}
                  animate={isVisible ? { left: `calc(${pct}% - 14px)`, opacity: 0.6 } : {}}
                  transition={{ duration: 1.1, delay: i * 0.1 + 0.2, ease: EASE }}
                >
                  <ChevronRight className="h-4 w-4 text-white" />
                </motion.div>
              </div>

              {/* Count + % label */}
              <motion.div
                animate={isHovered ? { scale: 1.04 } : { scale: 1 }}
                transition={{ duration: 0.18, ease: EASE }}
                className="w-32 shrink-0"
              >
                <div className="flex items-baseline gap-1.5">
                  <span
                    className="font-heading text-lg font-bold transition-colors duration-150"
                    style={{ color: isHovered ? GRADIENTS[i].from : "#164e63" }}
                  >
                    {stage.count.toLocaleString()}
                  </span>
                  <span className={`text-xs font-semibold transition-colors duration-150 ${
                    isHovered ? "text-stone-500" : "text-stone-400"
                  }`}>
                    {stagePercent}%
                  </span>
                </div>
                <div className="mt-0.5 h-1 w-full rounded-full bg-stone-100 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: "0%" }}
                    animate={isVisible ? { width: `${pct}%` } : {}}
                    transition={{ duration: 1.1, delay: i * 0.1 + 0.3, ease: EASE }}
                    style={{ background: `linear-gradient(90deg, ${GRADIENTS[i].from}, ${GRADIENTS[i].to})` }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        );
      })}

      {/* Bottom summary row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: stages.length * 0.09 + 0.3, ease: EASE }}
        className="mt-6 flex items-center justify-between rounded-2xl bg-gradient-to-r from-cyan-950 to-cyan-900 px-6 py-4"
      >
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Overall Conversion
          </span>
          <span className="font-heading text-2xl font-bold text-white">
            {((stages[stages.length - 1].count / stages[0].count) * 100).toFixed(2)}%
          </span>
        </div>
        <div className="flex gap-6">
          {[
            { label: "Total In", val: stages[0].count.toLocaleString() },
            { label: "Converted", val: stages[stages.length - 1].count.toLocaleString() },
            { label: "Lost", val: (stages[0].count - stages[stages.length - 1].count).toLocaleString() },
          ].map(({ label, val }) => (
            <div key={label} className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-cyan-500">{label}</span>
              <span className="font-heading text-base font-bold text-white">{val}</span>
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

export default function AnalyticsPage() {
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

  // Build typed funnel stages
  const funnelStages: FunnelStage[] = mockFunnelData.chartData.map((d, i) => ({
    stage: d.stage,
    count: d.count,
    icon: stageIcons[i],
  }));

  return (
    <div className="flex flex-col gap-8 pb-10">

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h1 className="font-heading text-3xl font-bold text-cyan-950">Link Analytics</h1>
          <p className="mt-1 text-sm text-stone-500">
            Real-time funnel conversion and attribution data.
          </p>
        </motion.div>
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
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-4 text-sm font-medium text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Last 30 Days</span>
          </motion.button>
        </motion.div>
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
            whileHover={{ y: -4, boxShadow: "0 12px 24px -4px rgb(8 145 178 / 0.10)" }}
            transition={{ duration: 0.25, ease: EASE }}
            className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-500">Total Visits</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-cyan-950">
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
            whileHover={{ y: -4, boxShadow: "0 12px 24px -4px rgb(8 145 178 / 0.10)" }}
            transition={{ duration: 0.25, ease: EASE }}
            className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-500">Avg. Conversion Rate</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-50 text-cyan-600">
                <ShoppingCart className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-cyan-950">
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
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="relative overflow-hidden rounded-2xl border border-cyan-200 dark:border-cyan-800/60 bg-cyan-50 dark:bg-cyan-950/40 p-6 shadow-sm"
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
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-cyan-900/60 text-cyan-600 dark:text-cyan-400 shadow-sm">
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
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
        >
          {/* Chart header */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h3 className="font-heading text-lg font-semibold text-cyan-950">Traffic Funnel</h3>
              <p className="mt-0.5 text-sm text-stone-400">
                Visitor journey from first touch to confirmed order
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1.5 ring-1 ring-cyan-100">
              <span className="h-2 w-2 rounded-full bg-cyan-500" />
              <span className="text-xs font-semibold text-cyan-700">Last 30 days</span>
            </div>
          </div>

          <PremiumFunnelChart stages={funnelStages} />
        </motion.div>
      )}

      {/* Skeleton chart while loading */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
        >
          <div className="h-5 w-40 rounded-full skeleton-shimmer mb-8" />
          <div className="flex flex-col gap-5">
            {[80, 65, 42, 26, 18].map((w, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-36 h-3 rounded-full skeleton-shimmer" />
                <div className="h-11 rounded-r-full skeleton-shimmer flex-1" style={{ maxWidth: `${w}%` }} />
                <div className="w-20 h-4 rounded-full skeleton-shimmer" />
              </div>
            ))}
          </div>
        </motion.div>
      )}

    </div>
  );
}