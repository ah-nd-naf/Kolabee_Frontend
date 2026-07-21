"use client";

import { m, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ArrowUpDown,
  MoreHorizontal,
  Mail,
  Settings2,
  Ban,
} from "lucide-react";
import Image from "next/image";
import { mockPartners, Partner } from "@/lib/mock-data";

type SortKey = "orders" | "commissionPaid" | "conversionRate" | "commissionRateBps" | "trendValue";

interface PartnerPerformanceTableProps {
  sortKey: SortKey;
  sortDirection: "asc" | "desc";
  onSort: (key: SortKey) => void;
  sortedPartners: Partner[];
}

const getTierColor = (tier: string) => {
  switch (tier) {
    case "Platinum": return "bg-cyan-500/10 text-cyan-700 ring-cyan-500/20 dark:bg-cyan-500/20 dark:text-cyan-300 dark:ring-cyan-500/30";
    case "Gold":     return "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:bg-amber-500/20 dark:text-amber-300 dark:ring-amber-500/30";
    case "Silver":   return "bg-stone-500/10 text-stone-700 ring-stone-500/20 dark:bg-stone-500/20 dark:text-stone-300 dark:ring-stone-500/30";
    case "Bronze":   return "bg-orange-500/10 text-orange-700 ring-orange-500/20 dark:bg-orange-500/20 dark:text-orange-300 dark:ring-orange-500/30";
    default:         return "bg-stone-500/10 text-stone-600 ring-stone-500/20 dark:bg-stone-500/20 dark:text-stone-400 dark:ring-stone-500/30";
  }
};

export function PartnerPerformanceTable({ sortKey, sortDirection, onSort, sortedPartners }: PartnerPerformanceTableProps) {
  return (
    <div className="rounded-3xl premium-glass overflow-hidden shadow-lg">

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 border-b border-stone-200/50 dark:border-white/10 bg-white/40 dark:bg-[#0a0f14]/40 p-4 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-slate-400">
        <div className="col-span-3">Partner</div>
        <div className="col-span-2">Tier & Rate</div>

        <div className="col-span-2 flex cursor-pointer items-center gap-1 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors" onClick={() => onSort("orders")}>
          Orders & Conv <ArrowUpDown className="h-3 w-3" />
        </div>
        <div className="col-span-2 flex cursor-pointer items-center gap-1 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors" onClick={() => onSort("commissionPaid")}>
          Commission Paid <ArrowUpDown className="h-3 w-3" />
        </div>
        <div className="col-span-2 flex cursor-pointer items-center gap-1 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors" onClick={() => onSort("trendValue")}>
          30d Trend <ArrowUpDown className="h-3 w-3" />
        </div>
        <div className="col-span-1 text-right">Actions</div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        <AnimatePresence>
          {sortedPartners.map((partner) => (
            <m.div
              key={partner.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              className="grid grid-cols-12 gap-4 items-center border-b border-stone-200/40 dark:border-white/5 p-4 last:border-0 hover:bg-white/50 dark:hover:bg-white/5 transition-colors"
            >
              {/* 1. Avatar & Name */}
              <div className="col-span-3 flex items-center gap-3">
                <Image
                  src={partner.avatar}
                  alt={partner.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-800"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-cyan-950 dark:text-white">{partner.name}</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">{partner.handle}</span>
                </div>
              </div>

              {/* 2. Tier & Rate */}
              <div className="col-span-2 flex flex-col items-start gap-1.5">
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 inset-ring ${getTierColor(partner.tier)}`}>
                  {partner.tier}
                </span>
                <span className="text-xs font-medium text-stone-600 dark:text-stone-400">
                  {(partner.commissionRateBps / 100).toFixed(2)}% Rate
                </span>
              </div>

              {/* 3. Orders & Conversion */}
              <div className="col-span-2 flex flex-col">
                <span className="text-sm font-semibold text-stone-900 dark:text-stone-200">{partner.orders.toLocaleString()}</span>
                <span className="text-xs text-stone-500 dark:text-stone-400">{partner.conversionRate}% conv.</span>
              </div>

              {/* 4. Commission Paid */}
              <div className="col-span-2 flex flex-col">
                <span className="text-sm font-semibold text-stone-900 dark:text-stone-200">৳{partner.commissionPaid.toLocaleString()}</span>
              </div>

              {/* 5. 30-Day Trend */}
              <div className="col-span-2 flex items-center gap-2">
                {partner.trend === "up" && (
                  <>
                    <m.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                      <ArrowUpRight className="h-4 w-4" />
                    </m.div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">+{partner.trendValue}%</span>
                  </>
                )}
                {partner.trend === "down" && (
                  <>
                    <m.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-600 dark:text-red-400">
                      <ArrowDownRight className="h-4 w-4" />
                    </m.div>
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">-{partner.trendValue}%</span>
                  </>
                )}
                {partner.trend === "neutral" && (
                  <>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-500/10 text-stone-500 dark:text-stone-400">
                      <Minus className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-stone-500 dark:text-stone-400">0.0%</span>
                  </>
                )}
              </div>

              {/* 6. Actions */}
              <div className="col-span-1 flex justify-end">
                <div className="group relative flex items-center justify-center">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 dark:hover:bg-white/10 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                  {/* Hover Dropdown Menu Mockup */}
                  <div className="absolute right-0 top-full z-10 mt-1 hidden w-40 flex-col rounded-xl border border-stone-200/50 dark:border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur-md p-1 shadow-lg group-hover:flex">
                    <button className="flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-white/5 hover:text-cyan-700 dark:hover:text-cyan-400">
                      <Settings2 className="h-4 w-4" /> Adjust Rate
                    </button>
                    <button className="flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-white/5 hover:text-cyan-700 dark:hover:text-cyan-400">
                      <Mail className="h-4 w-4" /> Message
                    </button>
                    <div className="my-1 border-t border-stone-100 dark:border-stone-800"></div>
                    <button className="flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30">
                      <Ban className="h-4 w-4" /> End Partnership
                    </button>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
