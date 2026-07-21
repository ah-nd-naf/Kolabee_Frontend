"use client";

import { m } from "framer-motion";
import {
  ShieldCheck,
  FileText,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const activeDeal = {
  partner: "GadgetHub",
  campaign: "Summer Tech Promo",
  escrowAmount: "৳45,000",
  currentStep: 3,
  steps: [
    { id: 1, title: "Brief Accepted",  date: "Oct 12",         icon: FileText    },
    { id: 2, title: "Escrow Funded",   date: "Oct 13",         icon: ShieldCheck },
    { id: 3, title: "Content Review",  date: "Pending Action", icon: UploadCloud },
    { id: 4, title: "Approved & Paid", date: "Upcoming",       icon: CheckCircle2 },
  ],
};

export function ActiveDealTracker() {
  return (
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
            {activeDeal.campaign} · <span className="font-medium text-stone-700 dark:text-stone-300">{activeDeal.partner}</span>
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
              const isCurrent   = index + 1 === activeDeal.currentStep;
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
                      isCurrent   ? "bg-white dark:bg-[#0f1923] text-cyan-600 dark:text-cyan-400 ring-4 ring-cyan-100 dark:ring-cyan-900/50 shadow-lg" :
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
  );
}
