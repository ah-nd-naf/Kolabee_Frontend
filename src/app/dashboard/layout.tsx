"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PersonaContext } from "@/lib/persona-context";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X, Hexagon } from "lucide-react";
import { CommandPalette } from "@/components/ui/command-palette";
import { BriefWizard } from "@/components/ui/brief-wizard";
import { AmbientBackground } from "@/components/dashboard/shared/ambient-bg";
import { DashboardSidebar } from "@/components/dashboard/shared/sidebar";
import { DashboardTopBar } from "@/components/dashboard/shared/top-bar";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [persona, setPersona] = useState<"business" | "creator">("business");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [isBriefWizardOpen, setIsBriefWizardOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const triggerCommandPalette = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <div className="h-screen flex w-full bg-slate-100 dark:bg-[#080c10] overflow-hidden text-stone-900 relative">

      {/* Ambient glassmorphism background blobs */}
      <AmbientBackground />

      <div className="z-10 flex w-full">
        <CommandPalette />
        <BriefWizard isOpen={isBriefWizardOpen} onClose={() => setIsBriefWizardOpen(false)} />

        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:z-40">
          <DashboardSidebar
            persona={persona}
            setPersona={setPersona}
            logoHovered={logoHovered}
            setLogoHovered={setLogoHovered}
          />
        </div>

        {/* Mobile top bar */}
        <div className="lg:hidden fixed top-0 z-30 flex h-16 w-full items-center justify-between border-b border-stone-200 bg-white px-4 shadow-sm sm:px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <Hexagon className="h-6 w-6 text-cyan-600 group-hover:text-cyan-500 transition-colors" />
            <span className="font-heading text-lg font-bold text-cyan-950">Kolabee</span>
          </Link>
          <m.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15, ease: EASE }}
            className="-m-2.5 p-2.5 text-stone-700"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </m.button>
        </div>

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="fixed inset-0 z-40 bg-cyan-950/80 backdrop-blur-sm lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <m.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.4, ease: EASE }}
                className="fixed inset-y-0 left-0 z-40 w-full max-w-xs flex-col lg:hidden"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <m.button
                    type="button"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="-m-2.5 p-2.5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <X className="h-6 w-6 text-white" aria-hidden="true" />
                  </m.button>
                </div>
                <DashboardSidebar
                  persona={persona}
                  setPersona={setPersona}
                  logoHovered={logoHovered}
                  setLogoHovered={setLogoHovered}
                />
              </m.div>
            </>
          )}
        </AnimatePresence>

        {/* Main content area */}
        <div className="flex-1 lg:pl-72 flex flex-col h-screen relative z-10">

          <DashboardTopBar
            persona={persona}
            onOpenBriefWizard={() => setIsBriefWizardOpen(true)}
            onOpenCommandPalette={triggerCommandPalette}
          />

          {/* Page content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <m.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="mx-auto max-w-7xl h-full"
              >
                <PersonaContext.Provider value={persona}>
                  {children}
                </PersonaContext.Provider>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
