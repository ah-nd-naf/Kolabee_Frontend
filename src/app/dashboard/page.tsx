// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import Link from "next/link";
import { CountUp } from "@/components/ui/count-up";
import { StatCardSkeleton } from "@/components/ui/skeleton";

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

const quickStats = [
  { label: "Total Clicks",     value: 24500,  icon: MousePointerClick, suffix: "",  color: "cyan",  change: "+12.5%" },
  { label: "Total Orders",     value: 1405,   icon: ShoppingCart,       suffix: "",  color: "cyan",  change: "+8.2%"  },
  { label: "Active Links",     value: 3,      icon: Link2,              suffix: "",  color: "cyan",  change: "+1"     },
  { label: "Live in Checkout", value: 42,     icon: Activity,           suffix: "",  color: "red",   change: "live"   },
];

const quickLinks = [
  { label: "My Links", href: "/dashboard/creator/links", icon: Link2,     desc: "Manage referral links" },
  { label: "Analytics", href: "/dashboard/analytics",   icon: BarChart3, desc: "View funnel data"     },
];

export default function DashboardOverview() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-10">

      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <h1 className="font-heading text-3xl font-bold text-cyan-950">Overview</h1>
        <p className="mt-1 text-sm text-stone-500">
          Your performance snapshot for today.
        </p>
      </motion.div>

      {/* Stat Cards — skeleton or live */}
      {isLoading ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[0, 1, 2, 3].map((i) => (
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
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {quickStats.map((stat, i) => {
            const Icon = stat.icon;
            const isLive = stat.change === "live";
            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                whileHover={{ y: -4, boxShadow: "0 12px 24px -4px rgb(8 145 178 / 0.10)" }}
                transition={{ duration: 0.22, ease: EASE }}
                className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-500">{stat.label}</span>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isLive ? "bg-red-50" : "bg-cyan-50"} ${isLive ? "text-red-500" : "text-cyan-600"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-cyan-950">
                    <CountUp
                      to={stat.value}
                      duration={1300}
                      delay={i * 60 + 150}
                      formatter={(n) => Math.round(n).toLocaleString()}
                    />
                  </span>
                  {isLive ? (
                    <span className="flex items-center gap-1 text-sm font-medium text-red-500">
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="inline-block h-1.5 w-1.5 rounded-full bg-red-500"
                      />
                      live
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Quick nav to pages */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
      >
        <h2 className="font-heading text-lg font-semibold text-cyan-950 mb-4">Quick Navigation</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {quickLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.href}
                whileHover={{ y: -3, boxShadow: "0 12px 24px -4px rgb(8 145 178 / 0.12)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                <Link
                  href={link.href}
                  className="group flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-colors hover:border-cyan-200"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100 transition-colors group-hover:bg-cyan-600 group-hover:text-white group-hover:ring-cyan-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-heading font-semibold text-cyan-950">{link.label}</p>
                    <p className="text-sm text-stone-500">{link.desc}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-stone-300 transition-transform group-hover:translate-x-1 group-hover:text-cyan-500" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

    </div>
  );
}