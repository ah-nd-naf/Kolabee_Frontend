"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { mockPartners, Partner } from "@/lib/mock-data";
import { PartnerPerformanceTable } from "@/components/dashboard/business/partner-performance-table";

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

  const sortedPartners = useMemo(() => {
    return [...mockPartners].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (sortDirection === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
  }, [sortKey, sortDirection]);

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-cyan-950 dark:text-white">Partner Performance</h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Compare your active creator roster. Numbers shown for the last 30 days.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search partners..."
              className="h-10 w-full rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0a0f14] pl-10 pr-4 text-sm text-stone-900 dark:text-stone-100 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 sm:w-64"
            />
          </div>
          <button className="flex h-10 items-center justify-center gap-2 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0a0f14] px-4 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <PartnerPerformanceTable
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
        sortedPartners={sortedPartners}
      />
    </div>
  );
}
