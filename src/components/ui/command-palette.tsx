// src/components/ui/command-palette.tsx
"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import { 
  Search, 
  LayoutDashboard, 
  Link2, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  FileText,
  UserCircle
} from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle the menu when âŒ˜K (Mac) or Ctrl+K (Windows) is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 sm:pt-40 px-4">
          {/* Blurred Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-cyan-950/40 backdrop-blur-sm"
          />
          
          {/* Palette Container */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl ring-1 ring-black/5"
          >
            <Command className="w-full bg-white text-stone-900" loop>
              {/* Search Input */}
              <div className="flex items-center border-b border-stone-100 px-4">
                <Search className="h-5 w-5 text-stone-400 shrink-0" />
                <Command.Input 
                  placeholder="What do you need to do?" 
                  className="flex h-14 w-full rounded-md bg-transparent py-3 pl-3 pr-4 text-sm outline-none placeholder:text-stone-400 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <div className="flex items-center gap-1 rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium text-stone-500">
                  ESC
                </div>
              </div>

              {/* Results List */}
              <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-smooth">
                <Command.Empty className="py-6 text-center text-sm text-stone-500">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="px-2 py-1 text-xs font-medium text-stone-500 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-cyan-900/50 uppercase tracking-wider">
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/dashboard"))}
                    className="flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-stone-700 transition-colors data-[selected=true]:bg-cyan-50 data-[selected=true]:text-cyan-900"
                  >
                    <LayoutDashboard className="h-4 w-4 text-cyan-600" />
                    Dashboard Overview
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/dashboard/business/performance"))}
                    className="flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-stone-700 transition-colors data-[selected=true]:bg-cyan-50 data-[selected=true]:text-cyan-900"
                  >
                    <TrendingUp className="h-4 w-4 text-cyan-600" />
                    Partner Performance
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/dashboard/creator/links"))}
                    className="flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-stone-700 transition-colors data-[selected=true]:bg-cyan-50 data-[selected=true]:text-cyan-900"
                  >
                    <Link2 className="h-4 w-4 text-cyan-600" />
                    My Links (Creator)
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/dashboard/analytics"))}
                    className="flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-stone-700 transition-colors data-[selected=true]:bg-cyan-50 data-[selected=true]:text-cyan-900"
                  >
                    <BarChart3 className="h-4 w-4 text-cyan-600" />
                    Link Analytics
                  </Command.Item>
                </Command.Group>

                <Command.Separator className="my-1 h-px bg-stone-100" />

                <Command.Group heading="Quick Actions" className="px-2 py-1 text-xs font-medium text-stone-500 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-cyan-900/50 uppercase tracking-wider">
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/dashboard"))}
                    className="flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-stone-700 transition-colors data-[selected=true]:bg-cyan-50 data-[selected=true]:text-cyan-900"
                  >
                    <FileText className="h-4 w-4 text-stone-400" />
                    Post a new Brief
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/dashboard"))}
                    className="flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-stone-700 transition-colors data-[selected=true]:bg-cyan-50 data-[selected=true]:text-cyan-900"
                  >
                    <UserCircle className="h-4 w-4 text-stone-400" />
                    Update Profile
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/dashboard"))}
                    className="flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-stone-700 transition-colors data-[selected=true]:bg-cyan-50 data-[selected=true]:text-cyan-900"
                  >
                    <Settings className="h-4 w-4 text-stone-400" />
                    Account Settings
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
