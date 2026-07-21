"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Link2,
  BarChart3,
  TrendingUp,
  Users,
  MousePointerClick,
  ShoppingCart,
  Activity,
  FileText,
  ShieldCheck,
  UploadCloud,
  CheckCircle2,
  Wallet,
  Banknote,
  Award,
  Handshake,
  Check,
  X,
  Star,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CountUp } from "@/components/ui/count-up";
import { StatCardSkeleton } from "@/components/ui/skeleton";
import { usePersona } from "@/lib/persona-context";
import {
  mockCreatorLinks,
  mockCreatorEarnings,
  mockCollabInvites,
  CollabInvite,
} from "@/lib/mock-data";

// Canonical easing curve
const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// â”€â”€â”€ Business-side data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const businessStats = [
  { label: "Total Clicks",     value: 24500,  icon: MousePointerClick, change: "+12.5%" },
  { label: "Total Orders",     value: 1405,   icon: ShoppingCart,      change: "+8.2%"  },
  { label: "Active Links",     value: 3,      icon: Link2,             change: "+1"     },
  { label: "Live in Checkout", value: 42,     icon: Activity,          change: "live"   },
];

const quickLinks = [
  { label: "My Links",   href: "/dashboard/creator/links",   icon: Link2,     desc: "Manage referral links" },
  { label: "Analytics",  href: "/dashboard/analytics",       icon: BarChart3, desc: "View funnel data"      },
];

const businessQuickLinks = [
  { label: "Performance", href: "/dashboard/business/performance", icon: TrendingUp, desc: "Creator roster & metrics" },
  { label: "Analytics",   href: "/dashboard/analytics",            icon: BarChart3,  desc: "Platform-wide funnel data" },
];

// Mock data for the Deal Lifecycle Visualizer
const activeDeal = {
  partner: "GadgetHub",
  campaign: "Summer Tech Promo",
  escrowAmount: "৳45,000",
  currentStep: 3,
  steps: [
    { id: 1, title: "Brief Accepted",  date: "Oct 12",        icon: FileText    },
    { id: 2, title: "Escrow Funded",   date: "Oct 13",        icon: ShieldCheck },
    { id: 3, title: "Content Review",  date: "Pending Action", icon: UploadCloud },
    { id: 4, title: "Approved & Paid", date: "Upcoming",      icon: CheckCircle2 },
  ],
};

// â”€â”€â”€ Tier Progress Card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const TIER_COLORS: Record<string, { bg: string; text: string; ring: string }> = {
  Bronze:   { bg: "bg-orange-500/10 dark:bg-orange-500/20",  text: "text-orange-700 dark:text-orange-300",  ring: "ring-orange-500/20 dark:ring-orange-500/30" },
  Silver:   { bg: "bg-stone-500/10 dark:bg-stone-500/20",    text: "text-stone-700 dark:text-stone-300",    ring: "ring-stone-500/20 dark:ring-stone-500/30"   },
  Gold:     { bg: "bg-amber-500/10 dark:bg-amber-500/20",    text: "text-amber-700 dark:text-amber-300",    ring: "ring-amber-500/20 dark:ring-amber-500/30"   },
  Platinum: { bg: "bg-cyan-500/10 dark:bg-cyan-500/20",      text: "text-cyan-700 dark:text-cyan-300",      ring: "ring-cyan-500/20 dark:ring-cyan-500/30"     },
};

const NEXT_TIER_RATES: Record<string, number> = { Gold: 250, Platinum: 300 };

function TierProgressCard() {
  const e = mockCreatorEarnings;
  const pct = Math.min((e.progressTowardNextTier / e.nextTierThresholdBDT) * 100, 100);
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
          {e.currentTier} Â· {(e.currentRateBps / 100).toFixed(2)}%
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

        {/* Current â†’ Next comparison */}
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

// â”€â”€â”€ Collab Invites Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CollabInvitesList() {
  const [invites, setInvites] = useState<CollabInvite[]>(mockCollabInvites);
  const [dismissing, setDismissing] = useState<string[]>([]);

  const handleAction = (id: string) => {
    setDismissing((prev) => [...prev, id]);
    setTimeout(() => {
      setInvites((prev) => prev.filter((inv) => inv.id !== id));
      setDismissing((prev) => prev.filter((d) => d !== id));
    }, 450);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
    >
      <h2 className="font-heading text-lg font-semibold text-cyan-950 dark:text-white mb-4 flex items-center gap-2">
        <Handshake className="h-5 w-5 text-cyan-500" />
        Collaboration Invites
        {invites.length > 0 && (
          <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-white">
            {invites.length}
          </span>
        )}
      </h2>

      <AnimatePresence>
        {invites.length === 0 ? (
          <m.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="premium-glass rounded-2xl p-10 flex flex-col items-center justify-center gap-3 text-center"
          >
            <Handshake className="h-10 w-10 text-stone-300 dark:text-stone-600" />
            <p className="font-heading font-semibold text-stone-500 dark:text-stone-400">No pending invites</p>
            <p className="text-sm text-stone-400 dark:text-stone-500">New brand invitations will appear here.</p>
          </m.div>
        ) : (
          <m.div
            key="list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3"
          >
            {invites.map((invite, i) => {
              const isDismissing = dismissing.includes(invite.id);
              return (
                <m.div
                  key={invite.id}
                  variants={cardVariants}
                  animate={isDismissing ? { opacity: 0, x: 40, height: 0, marginBottom: 0, padding: 0 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="premium-glass rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 overflow-hidden"
                >
                  {/* Logo + Info */}
                  <Image
                    src={invite.businessLogo}
                    alt={invite.businessName}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-stone-200 dark:ring-stone-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-cyan-950 dark:text-white truncate">{invite.businessName}</p>
                    <p className="text-sm text-stone-500 dark:text-stone-400 truncate">{invite.category}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Rate</p>
                      <p className="font-heading font-extrabold text-cyan-700 dark:text-cyan-400">
                        {(invite.proposedRateBps / 100).toFixed(2)}%
                      </p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Invited</p>
                      <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{invite.invitedAt}</p>
                    </div>
                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction(invite.id)}
                        className="flex items-center gap-1.5 rounded-full bg-cyan-500/20 px-4 py-1.5 text-sm font-semibold text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/30 transition-colors shadow-sm"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Accept
                      </m.button>
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction(invite.id)}
                        className="flex items-center gap-1.5 rounded-full bg-black/5 dark:bg-white/10 px-4 py-1.5 text-sm font-semibold text-stone-700 dark:text-stone-300 hover:bg-black/10 dark:hover:bg-white/20 ring-1 ring-black/5 dark:ring-white/10 transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                        Decline
                      </m.button>
                    </div>
                  </div>
                </m.div>
              );
            })}
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

// â”€â”€â”€ Business Overview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function BusinessOverview({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {/* Stat Cards */}
      {isLoading ? (
        <m.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <m.div key={i} variants={cardVariants}><StatCardSkeleton /></m.div>
          ))}
        </m.div>
      ) : (
        <m.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {businessStats.map((stat, i) => {
            const Icon = stat.icon;
            const isLive = stat.change === "live";
            return (
              <m.div
                key={stat.label}
                variants={cardVariants}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="premium-glass rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-500 dark:text-stone-400">{stat.label}</span>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isLive ? "bg-red-500/10" : "bg-cyan-500/10"} ${isLive ? "text-red-500 dark:text-red-400" : "text-cyan-700 dark:text-cyan-400"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-cyan-950 dark:text-white">
                    <CountUp to={stat.value} duration={1300} delay={i * 60 + 150} formatter={(n) => Math.round(n).toLocaleString()} />
                  </span>
                  {isLive ? (
                    <span className="flex items-center gap-1 text-sm font-medium text-red-500 dark:text-red-400">
                      <m.span animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
                      live
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  )}
                </div>
              </m.div>
            );
          })}
        </m.div>
      )}

      {/* Active Deal Tracker */}
      {!isLoading && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden dark:border-white/[0.05] dark:bg-white/[0.02]"
        >
          <div className="border-b border-stone-100 dark:border-white/[0.05] bg-stone-50/50 dark:bg-white/[0.02] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-lg font-bold text-cyan-950 dark:text-white flex items-center gap-2">
                Active Deal Tracker
                <span className="inline-flex items-center rounded-full bg-cyan-100 dark:bg-cyan-900/40 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:text-cyan-300">
                  Action Required
                </span>
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                {activeDeal.campaign} Â· <span className="font-medium text-stone-700 dark:text-stone-300">{activeDeal.partner}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white dark:bg-white/[0.03] px-4 py-2 ring-1 ring-stone-200 dark:ring-white/[0.07] shadow-sm">
              <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-500" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 leading-none">Escrow Secured</span>
                <span className="text-sm font-bold text-cyan-950 dark:text-white leading-tight">{activeDeal.escrowAmount}</span>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-10">
            <div className="relative mx-auto max-w-4xl">
              <div className="absolute left-[10%] top-6 w-[80%] h-1 bg-stone-100 dark:bg-white/10 rounded-full" />
              <m.div
                initial={{ width: "0%" }}
                animate={{ width: `${((activeDeal.currentStep - 1) / (activeDeal.steps.length - 1)) * 80}%` }}
                transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
                className="absolute left-[10%] top-6 h-1 bg-cyan-500 rounded-full origin-left"
              />
              <div className="relative flex justify-between">
                {activeDeal.steps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = index + 1 < activeDeal.currentStep;
                  const isCurrent = index + 1 === activeDeal.currentStep;
                  const isUpcoming = index + 1 > activeDeal.currentStep;
                  return (
                    <div key={step.id} className="flex flex-col items-center w-1/4 relative group">
                      <div className="relative mb-4">
                        {isCurrent && (
                          <m.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="absolute inset-0 rounded-full bg-cyan-400"
                          />
                        )}
                        <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                          isCompleted ? "bg-cyan-600 text-white ring-4 ring-white dark:ring-[#0f1923]" :
                          isCurrent  ? "bg-white dark:bg-[#0f1923] text-cyan-600 dark:text-cyan-400 ring-4 ring-cyan-100 dark:ring-cyan-900/50 shadow-lg" :
                          "bg-white dark:bg-[#0f1923] text-stone-300 dark:text-stone-600 ring-4 ring-white dark:ring-[#0f1923] border-2 border-dashed border-stone-200 dark:border-stone-700"
                        }`}>
                          <Icon className={`h-5 w-5 ${isCurrent ? "animate-pulse" : ""}`} />
                        </div>
                      </div>
                      <h3 className={`text-center font-heading text-sm font-semibold transition-colors ${isCompleted || isCurrent ? "text-cyan-950 dark:text-white" : "text-stone-400 dark:text-stone-500"}`}>
                        {step.title}
                      </h3>
                      <p className={`mt-1 text-center text-xs font-medium ${isCurrent ? "text-cyan-600 dark:text-cyan-400" : "text-stone-500 dark:text-stone-500"}`}>
                        {step.date}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2, ease: EASE }}
              className="mt-10 flex justify-center"
            >
              <button className="flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-600/20 hover:bg-cyan-500 transition-all">
                <UploadCloud className="h-4 w-4" />
                Review Submitted Content
              </button>
            </m.div>
          </div>
        </m.div>
      )}

      {/* Quick nav */}
      {!isLoading && (
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
        >
          <h2 className="font-heading text-lg font-semibold text-cyan-950 dark:text-white mb-4 mt-2">Quick Navigation</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {businessQuickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <m.div key={link.href} whileHover={{ y: -3, boxShadow: "0 12px 24px -4px rgb(8 145 178 / 0.12)" }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2, ease: EASE }}>
                  <Link href={link.href} className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.02] p-5 shadow-sm transition-colors hover:border-cyan-200 dark:hover:border-cyan-800">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100 transition-colors group-hover:bg-cyan-600 group-hover:text-white group-hover:ring-cyan-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-heading font-semibold text-cyan-950 dark:text-white">{link.label}</p>
                      <p className="text-sm text-stone-500 dark:text-stone-400">{link.desc}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-stone-300 transition-transform group-hover:translate-x-1 group-hover:text-cyan-500" />
                  </Link>
                </m.div>
              );
            })}
          </div>
        </m.div>
      )}
    </>
  );
}

// â”€â”€â”€ Creator Overview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CreatorOverview({ isLoading }: { isLoading: boolean }) {
  const totalClicks  = mockCreatorLinks.reduce((s, l) => s + l.clicks, 0);
  const activeLinks  = mockCreatorLinks.filter((l) => l.status === "Active").length;

  const creatorStats = [
    { label: "My Total Clicks",          value: totalClicks,                       icon: MousePointerClick, change: "+9.4%",   prefix: "",  format: (n: number) => Math.round(n).toLocaleString() },
    { label: "Commissions This Month",   value: mockCreatorEarnings.clearedThisMonth, icon: Banknote,       change: "+14.2%",  prefix: "৳", format: (n: number) => Math.round(n).toLocaleString() },
    { label: "Active Links",             value: activeLinks,                       icon: Link2,             change: `${activeLinks} active`, prefix: "", format: (n: number) => Math.round(n).toString() },
    { label: "Available Balance",        value: mockCreatorEarnings.availableBalance, icon: Wallet,         change: "withdraw", prefix: "৳", format: (n: number) => Math.round(n).toLocaleString() },
  ];

  return (
    <>
      {/* Stat Cards */}
      {isLoading ? (
        <m.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <m.div key={i} variants={cardVariants}><StatCardSkeleton /></m.div>
          ))}
        </m.div>
      ) : (
        <m.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {creatorStats.map((stat, i) => {
            const Icon = stat.icon;
            const isWithdraw = stat.change === "withdraw";
            return (
              <m.div
                key={stat.label}
                variants={cardVariants}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="premium-glass rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-500 dark:text-stone-400">{stat.label}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-cyan-950 dark:text-white">
                    {stat.prefix}
                    <CountUp to={stat.value} duration={1300} delay={i * 60 + 150} formatter={stat.format} />
                  </span>
                  {isWithdraw ? (
                    <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full ring-1 ring-cyan-500/20 cursor-pointer hover:bg-cyan-500/20 transition-colors">
                      Withdraw
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  )}
                </div>
              </m.div>
            );
          })}
        </m.div>
      )}

      {/* Tier Progress Card */}
      {!isLoading && <TierProgressCard />}

      {/* Collab Invites */}
      {!isLoading && <CollabInvitesList />}

      {/* Quick nav */}
      {!isLoading && (
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
        >
          <h2 className="font-heading text-lg font-semibold text-cyan-950 dark:text-white mb-4 mt-2">Quick Navigation</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <m.div key={link.href} whileHover={{ y: -3, boxShadow: "0 12px 24px -4px rgb(8 145 178 / 0.12)" }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2, ease: EASE }}>
                  <Link href={link.href} className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.02] p-5 shadow-sm transition-colors hover:border-cyan-200 dark:hover:border-cyan-800">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100 transition-colors group-hover:bg-cyan-600 group-hover:text-white group-hover:ring-cyan-600">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-heading font-semibold text-cyan-950 dark:text-white">{link.label}</p>
                      <p className="text-sm text-stone-500 dark:text-stone-400">{link.desc}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-stone-300 transition-transform group-hover:translate-x-1 group-hover:text-cyan-500" />
                  </Link>
                </m.div>
              );
            })}
          </div>
        </m.div>
      )}
    </>
  );
}

// â”€â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function DashboardOverview() {
  const [isLoading, setIsLoading] = useState(true);
  const persona = usePersona();

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h1 className="font-heading text-3xl font-bold text-cyan-950 dark:text-white">Overview</h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            {persona === "creator"
              ? "Your personal earnings and link performance snapshot."
              : "Your performance snapshot for today."}
          </p>
        </m.div>
      </div>

      <AnimatePresence mode="wait">
        {persona === "creator" ? (
          <m.div key="creator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="flex flex-col gap-8">
            <CreatorOverview isLoading={isLoading} />
          </m.div>
        ) : (
          <m.div key="business" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="flex flex-col gap-8">
            <BusinessOverview isLoading={isLoading} />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

