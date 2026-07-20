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
  FileText,
  ShieldCheck,
  UploadCloud,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
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
  { label: "Total Orders",     value: 1405,   icon: ShoppingCart,      suffix: "",  color: "cyan",  change: "+8.2%"  },
  { label: "Active Links",     value: 3,      icon: Link2,             suffix: "",  color: "cyan",  change: "+1"     },
  { label: "Live in Checkout", value: 42,     icon: Activity,          suffix: "",  color: "red",   change: "live"   },
];

const quickLinks = [
  { label: "My Links", href: "/dashboard/creator/links", icon: Link2,     desc: "Manage referral links" },
  { label: "Analytics", href: "/dashboard/analytics",   icon: BarChart3, desc: "View funnel data"     },
];

// Mock data for the Deal Lifecycle Visualizer
const activeDeal = {
  partner: "GadgetHub",
  campaign: "Summer Tech Promo",
  escrowAmount: "৳45,000",
  currentStep: 3, // 1-based index (1: Brief, 2: Escrow, 3: Content, 4: Paid)
  steps: [
    { id: 1, title: "Brief Accepted", date: "Oct 12", icon: FileText },
    { id: 2, title: "Escrow Funded", date: "Oct 13", icon: ShieldCheck },
    { id: 3, title: "Content Review", date: "Pending Action", icon: UploadCloud },
    { id: 4, title: "Approved & Paid", date: "Upcoming", icon: CheckCircle2 },
  ]
};

export default function DashboardOverview() {
  const [isLoading, setIsLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-8 pb-10">

      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h1 className="font-heading text-3xl font-bold text-cyan-950 dark:text-white">Overview</h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Your performance snapshot for today.
          </p>
        </motion.div>
      </div>

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
                whileHover={{ y: -3 }}    
                transition={{ duration: 0.22, ease: EASE }}
                className="premium-glass rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-500 dark:text-stone-400">{stat.label}</span>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isLive ? "bg-red-50" : "bg-cyan-50"} ${isLive ? "text-red-500" : "text-cyan-600"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-cyan-950 dark:text-white">
                    <CountUp
                      to={stat.value}
                      duration={1300}
                      delay={i * 60 + 150}
                      formatter={(n) => Math.round(n).toLocaleString()}
                    />
                  </span>
                  {isLive ? (
                    <span className="flex items-center gap-1 text-sm font-medium text-red-500 dark:text-red-400">
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

      {/* NEW: Deal Lifecycle Visualizer (Tier S Feature) */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
          className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden"
        >
          {/* Section Header */}
          <div className="border-b border-stone-100 dark:border-white/[0.05] bg-stone-50/50 dark:bg-white/[0.02] px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-lg font-bold text-cyan-950 dark:text-white flex items-center gap-2">
                Active Deal Tracker
                <span className="inline-flex items-center rounded-full bg-cyan-100 dark:bg-cyan-900/40 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:text-cyan-300">
                  Action Required
                </span>
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                {activeDeal.campaign} • <span className="font-medium text-stone-700 dark:text-stone-300">{activeDeal.partner}</span>
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

          {/* Stepper UI */}
          <div className="p-6 sm:p-10">
            <div className="relative mx-auto max-w-4xl">
              
              {/* Background Track Line */}
              <div className="absolute left-[10%] top-6 w-[80%] h-1 bg-stone-100 dark:bg-white/10 rounded-full" />
              
              {/* Animated Progress Line */}
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: `${((activeDeal.currentStep - 1) / (activeDeal.steps.length - 1)) * 80}%` }}
                transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
                className="absolute left-[10%] top-6 h-1 bg-cyan-500 rounded-full origin-left"
              />

              {/* Steps */}
              <div className="relative flex justify-between">
                {activeDeal.steps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = index + 1 < activeDeal.currentStep;
                  const isCurrent = index + 1 === activeDeal.currentStep;
                  const isUpcoming = index + 1 > activeDeal.currentStep;

                  return (
                    <div key={step.id} className="flex flex-col items-center w-1/4 relative group">
                      
                      {/* Icon Circle */}
                      <div className="relative mb-4">
                        {/* Pulsing ring for current step */}
                        {isCurrent && (
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="absolute inset-0 rounded-full bg-cyan-400"
                          />
                        )}
                        
                        <div className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                          isCompleted ? 'bg-cyan-600 text-white ring-4 ring-white dark:ring-[#0f1923]' :
                          isCurrent ? 'bg-white dark:bg-[#0f1923] text-cyan-600 dark:text-cyan-400 ring-4 ring-cyan-100 dark:ring-cyan-900/50 shadow-lg shadow-cyan-900/10' :
                          'bg-white dark:bg-[#0f1923] text-stone-300 dark:text-stone-600 ring-4 ring-white dark:ring-[#0f1923] border-2 border-dashed border-stone-200 dark:border-stone-700'
                        }`}>
                          <Icon className={`h-5 w-5 ${isCurrent ? 'animate-pulse' : ''}`} />
                        </div>
                      </div>

                      {/* Text */}
                      <h3 className={`text-center font-heading text-sm font-semibold transition-colors ${
                        isCompleted || isCurrent ? 'text-cyan-950 dark:text-white' : 'text-stone-400 dark:text-stone-500'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`mt-1 text-center text-xs font-medium ${
                        isCurrent ? 'text-cyan-600 dark:text-cyan-400' : 'text-stone-500 dark:text-stone-500'
                      }`}>
                        {step.date}
                      </p>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Area below the stepper (contextual to the current step) */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2, ease: EASE }}
              className="mt-10 flex justify-center"
            >
              <button className="flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-600/20 hover:bg-cyan-500 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
                <UploadCloud className="h-4 w-4" />
                Review Submitted Content
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Quick nav to pages */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
        >
          <h2 className="font-heading text-lg font-semibold text-cyan-950 mb-4 mt-2">Quick Navigation</h2>
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
      )}

    </div>
  );
}