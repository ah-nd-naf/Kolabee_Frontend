"use client";

import { m } from "framer-motion";
import { Award, Star, ChevronRight } from "lucide-react";
import { mockCreatorEarnings } from "@/lib/mock-data";

const EASE = [0.16, 1, 0.3, 1] as const;

const TIER_COLORS: Record<string, { bg: string; text: string; ring: string }> = {
  Bronze:   { bg: "bg-orange-500/10 dark:bg-orange-500/20",  text: "text-orange-700 dark:text-orange-300",  ring: "ring-orange-500/20 dark:ring-orange-500/30" },
  Silver:   { bg: "bg-stone-500/10 dark:bg-stone-500/20",    text: "text-stone-700 dark:text-stone-300",    ring: "ring-stone-500/20 dark:ring-stone-500/30"   },
  Gold:     { bg: "bg-amber-500/10 dark:bg-amber-500/20",    text: "text-amber-700 dark:text-amber-300",    ring: "ring-amber-500/20 dark:ring-amber-500/30"   },
  Platinum: { bg: "bg-cyan-500/10 dark:bg-cyan-500/20",      text: "text-cyan-700 dark:text-cyan-300",      ring: "ring-cyan-500/20 dark:ring-cyan-500/30"     },
};

const NEXT_TIER_RATES: Record<string, number> = { Gold: 250, Platinum: 300 };

export function TierProgressCard() {
  const e = mockCreatorEarnings;
  const pct           = Math.min((e.progressTowardNextTier / e.nextTierThresholdBDT) * 100, 100);
  const currentColors = TIER_COLORS[e.currentTier] ?? TIER_COLORS.Silver;
  const nextColors    = TIER_COLORS[e.nextTier]    ?? TIER_COLORS.Gold;
  const nextRate      = NEXT_TIER_RATES[e.nextTier] ?? 250;
  const remaining     = e.nextTierThresholdBDT - e.progressTowardNextTier;

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
      className="rounded-2xl premium-glass overflow-hidden"
    >
      {/* Header */}
      <div className="border-b border-stone-100 dark:border-white/[0.05] bg-stone-50/50 dark:bg-white/[0.02] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-lg font-bold text-cyan-950 dark:text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-cyan-500" />
            Tier Progress
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
            Track your earnings toward unlocking a higher commission rate.
          </p>
        </div>
        {/* Current tier badge */}
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider ring-1 ${currentColors.bg} ${currentColors.text} ${currentColors.ring}`}>
          <Star className="h-3.5 w-3.5" />
          {e.currentTier} · {(e.currentRateBps / 100).toFixed(2)}%
        </span>
      </div>

      {/* Progress body */}
      <div className="p-6 sm:p-8 flex flex-col gap-6">
        {/* Progress bar */}
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
              ৳{e.progressTowardNextTier.toLocaleString()}
              <span className="text-stone-400 dark:text-stone-500 font-normal"> / ৳{e.nextTierThresholdBDT.toLocaleString()}</span>
            </span>
            <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">{pct.toFixed(0)}%</span>
          </div>
          <div className="h-3 w-full rounded-full bg-black/5 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
            <m.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 relative overflow-hidden"
              initial={{ width: "0%" }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.4, delay: 0.4, ease: EASE }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
            </m.div>
          </div>
          <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
            ৳{remaining.toLocaleString()} more in cleared commissions to reach <strong className={`font-semibold ${nextColors.text}`}>{e.nextTier}</strong>
          </p>
        </div>

        {/* Current → Next comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`rounded-xl p-4 ring-1 ${currentColors.bg} ${currentColors.ring}`}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-1">Current</p>
            <p className={`font-heading text-xl font-extrabold ${currentColors.text}`}>{e.currentTier}</p>
            <p className={`text-sm font-medium ${currentColors.text} opacity-80`}>{(e.currentRateBps / 100).toFixed(2)}% commission</p>
          </div>
          <div className={`rounded-xl p-4 ring-1 ${nextColors.bg} ${nextColors.ring} relative`}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 mb-1">Unlock Next</p>
            <p className={`font-heading text-xl font-extrabold ${nextColors.text}`}>{e.nextTier}</p>
            <p className={`text-sm font-medium ${nextColors.text} opacity-80`}>{(nextRate / 100).toFixed(2)}% commission</p>
            <ChevronRight className={`absolute top-4 right-4 h-4 w-4 ${nextColors.text} opacity-50`} />
          </div>
        </div>
      </div>
    </m.div>
  );
}
