"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Link2,
  BarChart3,
  TrendingUp,
  MousePointerClick,
  ShoppingCart,
  Activity,
  Banknote,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { CountUp } from "@/components/ui/count-up";
import { StatCardSkeleton } from "@/components/ui/skeleton";
import { usePersona } from "@/lib/persona-context";
import { mockCreatorLinks, mockCreatorEarnings } from "@/lib/mock-data";
import { ActiveDealTracker } from "@/components/dashboard/business/active-deal-tracker";
import { TierProgressCard } from "@/components/dashboard/creator/tier-progress-card";
import { CollabInvitesList } from "@/components/dashboard/creator/collab-invites-list";

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// — Business-side data —
const businessStats = [
  { label: "Total Clicks",     value: 24500, icon: MousePointerClick, change: "+12.5%" },
  { label: "Total Orders",     value: 1405,  icon: ShoppingCart,      change: "+8.2%"  },
  { label: "Active Links",     value: 3,     icon: Link2,             change: "+1"     },
  { label: "Live in Checkout", value: 42,    icon: Activity,          change: "live"   },
];

const quickLinks = [
  { label: "My Links",  href: "/dashboard/creator/links",   icon: Link2,     desc: "Manage referral links"  },
  { label: "Analytics", href: "/dashboard/analytics",       icon: BarChart3, desc: "View funnel data"       },
];
const businessQuickLinks = [
  { label: "Performance", href: "/dashboard/business/performance", icon: TrendingUp, desc: "Creator roster & metrics"   },
  { label: "Analytics",   href: "/dashboard/analytics",            icon: BarChart3,  desc: "Platform-wide funnel data"  },
];

// — Business Overview —
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
      {!isLoading && <ActiveDealTracker />}

      {/* Quick nav */}
      {!isLoading && (
        <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35, ease: EASE }}>
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

// — Creator Overview —
function CreatorOverview({ isLoading }: { isLoading: boolean }) {
  const totalClicks = mockCreatorLinks.reduce((s, l) => s + l.clicks, 0);
  const activeLinks = mockCreatorLinks.filter((l) => l.status === "Active").length;

  const creatorStats = [
    { label: "My Total Clicks",         value: totalClicks,                          icon: MousePointerClick, change: "+9.4%",    prefix: "",  format: (n: number) => Math.round(n).toLocaleString() },
    { label: "Commissions This Month",  value: mockCreatorEarnings.clearedThisMonth, icon: Banknote,          change: "+14.2%",   prefix: "৳", format: (n: number) => Math.round(n).toLocaleString() },
    { label: "Active Links",            value: activeLinks,                          icon: Link2,             change: `${activeLinks} active`, prefix: "", format: (n: number) => Math.round(n).toString() },
    { label: "Available Balance",       value: mockCreatorEarnings.availableBalance, icon: Wallet,            change: "withdraw", prefix: "৳", format: (n: number) => Math.round(n).toLocaleString() },
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
        <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45, ease: EASE }}>
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

// — Main Page —
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
        <m.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE }}>
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
