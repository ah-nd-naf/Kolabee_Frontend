"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ArrowUpDown,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Settings2,
  Ban
} from "lucide-react";
import { mockPartners, Partner } from "@/lib/mock-data";

// The columns we want to be sortable
type SortKey = "orders" | "commissionPaid" | "conversionRate" | "commissionRateBps" | "trendValue";

export default function PerformancePage() {
  const [sortKey, setSortKey] = useState<SortKey>("commissionPaid");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const sortedPartners = [...mockPartners].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (sortDirection === "asc") return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Platinum": return "bg-cyan-100 text-cyan-800 ring-cyan-200";
      case "Gold": return "bg-amber-50 text-amber-700 ring-amber-200";
      case "Silver": return "bg-stone-100 text-stone-700 ring-stone-200";
      case "Bronze": return "bg-orange-50 text-orange-800 ring-orange-200";
      default: return "bg-stone-50 text-stone-600 ring-stone-200";
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-cyan-950">Partner Performance</h1>
          <p className="mt-1 text-sm text-stone-500">
            Compare your active creator roster. Numbers shown for the last 30 days.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search partners..."
              className="h-10 w-full rounded-full border border-stone-200 bg-white pl-10 pr-4 text-sm text-stone-900 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 sm:w-64"
            />
          </div>
          <button className="flex h-10 items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-4 text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* The Data Table (Built with CSS Grid for smooth layout animations) */}
      <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
        
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 border-b border-stone-200 bg-stone-50/50 p-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
          <div className="col-span-3">Partner</div>
          <div className="col-span-2">Tier & Rate</div>
          
          <div 
            className="col-span-2 flex cursor-pointer items-center gap-1 hover:text-cyan-700 transition-colors"
            onClick={() => handleSort("orders")}
          >
            Orders & Conv <ArrowUpDown className="h-3 w-3" />
          </div>
          
          <div 
            className="col-span-2 flex cursor-pointer items-center gap-1 hover:text-cyan-700 transition-colors"
            onClick={() => handleSort("commissionPaid")}
          >
            Commission Paid <ArrowUpDown className="h-3 w-3" />
          </div>
          
          <div 
            className="col-span-2 flex cursor-pointer items-center gap-1 hover:text-cyan-700 transition-colors"
            onClick={() => handleSort("trendValue")}
          >
            30d Trend <ArrowUpDown className="h-3 w-3" />
          </div>
          
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col">
          <AnimatePresence>
            {sortedPartners.map((partner) => (
              <motion.div
                key={partner.id}
                layout // This single prop enables the smooth re-sorting animation!
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                className="grid grid-cols-12 gap-4 items-center border-b border-stone-100 p-4 last:border-0 hover:bg-stone-50/50 transition-colors"
              >
                
                {/* 1. Avatar & Name */}
                <div className="col-span-3 flex items-center gap-3">
                  <img 
                    src={partner.avatar} 
                    alt={partner.name} 
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-stone-200"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-cyan-950">{partner.name}</span>
                    <span className="text-xs text-stone-500">{partner.handle}</span>
                  </div>
                </div>

                {/* 2. Tier & Rate */}
                <div className="col-span-2 flex flex-col items-start gap-1.5">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 inset-ring ${getTierColor(partner.tier)}`}>
                    {partner.tier}
                  </span>
                  <span className="text-xs font-medium text-stone-600">
                    {(partner.commissionRateBps / 100).toFixed(2)}% Rate
                  </span>
                </div>

                {/* 3. Orders & Conversion */}
                <div className="col-span-2 flex flex-col">
                  <span className="text-sm font-semibold text-stone-900">{partner.orders.toLocaleString()}</span>
                  <span className="text-xs text-stone-500">{partner.conversionRate}% conv.</span>
                </div>

                {/* 4. Commission Paid (BDT as per PRD) */}
                <div className="col-span-2 flex flex-col">
                  <span className="text-sm font-semibold text-stone-900">৳{partner.commissionPaid.toLocaleString()}</span>
                </div>

                {/* 5. 30-Day Trend (With subtle pulsing animation) */}
                <div className="col-span-2 flex items-center gap-2">
                  {partner.trend === "up" && (
                    <>
                      <motion.div 
                        animate={{ opacity: [0.5, 1, 0.5] }} 
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </motion.div>
                      <span className="text-sm font-medium text-green-600">+{partner.trendValue}%</span>
                    </>
                  )}
                  {partner.trend === "down" && (
                    <>
                      <motion.div 
                        animate={{ opacity: [0.5, 1, 0.5] }} 
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600"
                      >
                        <ArrowDownRight className="h-4 w-4" />
                      </motion.div>
                      <span className="text-sm font-medium text-red-600">-{partner.trendValue}%</span>
                    </>
                  )}
                  {partner.trend === "neutral" && (
                    <>
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-100 text-stone-500">
                        <Minus className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-stone-500">0.0%</span>
                    </>
                  )}
                </div>

                {/* 6. Actions */}
                <div className="col-span-1 flex justify-end">
                  <div className="group relative flex items-center justify-center">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-stone-400 hover:bg-stone-100 hover:text-cyan-700 transition-colors">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                    
                    {/* Hover Dropdown Menu Mockup */}
                    <div className="absolute right-0 top-full z-10 mt-1 hidden w-40 flex-col rounded-xl border border-stone-200 bg-white p-1 shadow-lg group-hover:flex">
                      <button className="flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50 hover:text-cyan-700">
                        <Settings2 className="h-4 w-4" /> Adjust Rate
                      </button>
                      <button className="flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50 hover:text-cyan-700">
                        <Mail className="h-4 w-4" /> Message
                      </button>
                      <div className="my-1 border-t border-stone-100"></div>
                      <button className="flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50">
                        <Ban className="h-4 w-4" /> End Partnership
                      </button>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}