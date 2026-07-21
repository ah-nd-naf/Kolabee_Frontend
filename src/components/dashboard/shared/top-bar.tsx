"use client";

import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { Bell, Search, Plus } from "lucide-react";
import { ThemeToggleSimple } from "@/components/ui/theme-toggle";

const EASE = [0.16, 1, 0.3, 1] as const;

interface DashboardTopBarProps {
  persona: "business" | "creator";
  onOpenBriefWizard: () => void;
  onOpenCommandPalette: () => void;
}

export function DashboardTopBar({
  persona,
  onOpenBriefWizard,
  onOpenCommandPalette,
}: DashboardTopBarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-stone-200/50 dark:border-white/5 bg-white/60 dark:bg-[#0a0f14]/60 backdrop-blur-xl px-4 py-3 sm:gap-x-6 sm:px-6 lg:px-8">
      <h2 className="font-heading text-xl font-semibold text-cyan-950 capitalize dark:text-white">
        {pathname === '/dashboard' ? 'Overview' : pathname.split('/').pop()}
      </h2>

      <div className="flex items-center gap-6">

        {/* Post Brief Button — only visible for business persona */}
        <AnimatePresence>
          {persona === "business" && (
            <m.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={onOpenBriefWizard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-full bg-cyan-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Post Brief</span>
            </m.button>
          )}
        </AnimatePresence>

        <div className="hidden h-6 w-px bg-stone-200 sm:block" />

        <m.button
          onClick={onOpenCommandPalette}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15, ease: EASE }}
          className="group flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 py-1.5 pl-3 pr-2 text-sm text-stone-500 hover:border-cyan-300 hover:text-cyan-700 transition-colors"
        >
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <span className="rounded bg-white px-1.5 py-0.5 text-xs font-semibold text-stone-400 ring-1 ring-stone-200 group-hover:text-cyan-600 group-hover:ring-cyan-200 transition-colors">
            ⌘K
          </span>
        </m.button>

        {/* Theme toggle */}
        <ThemeToggleSimple />

        {/* Notification bell */}
        <m.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.15, ease: EASE }}
          className="relative rounded-full p-2 text-stone-400 hover:text-stone-500 hover:bg-stone-100 transition-colors"
        >
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-500 ring-2 ring-white" />
          <Bell className="h-5 w-5" />
        </m.button>
      </div>
    </header>
  );
}
