"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Link2,
  BarChart3,
  TrendingUp,
  Menu,
  X,
  LogOut,
  Hexagon,
  Bell,
  Settings,
  Search,
  ArrowLeft,
  Home,
  Plus
} from "lucide-react";
import { CommandPalette } from "@/components/ui/command-palette";
import { ThemeToggle, ThemeToggleSimple } from "@/components/ui/theme-toggle";
import { BriefWizard } from "@/components/ui/brief-wizard";

// Canonical easing curve — [0.16, 1, 0.3, 1]
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

  const navLinks = {
    creator: [
      { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { name: "My Links", href: "/dashboard/creator/links", icon: Link2 },
      { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    ],
    business: [
      { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { name: "Performance", href: "/dashboard/business/performance", icon: TrendingUp },
      { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    ],
  };

  const currentLinks = navLinks[persona];

  const triggerCommandPalette = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  const SidebarContent = () => (
    <div
      className="flex h-full flex-col gap-y-5 px-6 pb-4"
      style={{
        backgroundColor: '#083344',
        backgroundImage: [
          'radial-gradient(ellipse 90% 60% at 0% 0%, rgba(6,182,212,0.18) 0%, transparent 65%)',
          'radial-gradient(ellipse 70% 50% at 100% 100%, rgba(8,145,178,0.12) 0%, transparent 65%)',
          'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(6,182,212,0.05) 0%, transparent 100%)',
          `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`
        ].join(', '),
        backgroundSize: 'auto, auto, auto, 200px 200px',
      }}
    >
      {/* ── Logo / Back to Home ── */}
      <div className="flex h-16 shrink-0 items-center">
        <Link
          href="/"
          className="group relative flex w-full items-center gap-2 rounded-xl p-1 -ml-1 outline-none"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          {/* Hexagon with glow on hover */}
          <motion.div
            animate={logoHovered ? {
              filter: "drop-shadow(0 0 8px rgba(34,211,238,0.7))",
              scale: 1.08,
            } : {
              filter: "drop-shadow(0 0 0px rgba(34,211,238,0))",
              scale: 1,
            }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <Hexagon className="h-8 w-8 text-cyan-400 fill-cyan-400/20 shrink-0" />
          </motion.div>

          {/* Brand name / "Back to site" reveal */}
          <div className="relative flex-1 overflow-hidden h-7">
            {/* "Kolabee" — slides up+fades out on hover */}
            <motion.span
              animate={logoHovered ? { y: -28, opacity: 0 } : { y: 0, opacity: 1 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="absolute inset-0 flex items-center font-heading text-xl font-bold text-white tracking-tight whitespace-nowrap"
            >
              Kolabee
            </motion.span>

            {/* "← Back to site" — slides up+fades in on hover */}
            <motion.span
              animate={logoHovered ? { y: 0, opacity: 1 } : { y: 28, opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="absolute inset-0 flex items-center gap-1.5 text-sm font-semibold text-cyan-300 whitespace-nowrap"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to site
            </motion.span>
          </div>

          {/* Small home icon on far right, fades in on hover */}
          <motion.div
            animate={logoHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <Home className="h-4 w-4 text-cyan-400" />
          </motion.div>
        </Link>
      </div>

      {/* Persona toggle */}
      <div className="rounded-xl bg-cyan-900/50 p-1 ring-1 ring-cyan-800">
        <div className="relative flex space-x-1">
          {(["business", "creator"] as const).map((p) => (
            <motion.button
              key={p}
              onClick={() => setPersona(p)}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15, ease: EASE }}
              className={`relative flex-1 rounded-lg py-2 text-xs font-semibold uppercase tracking-wider outline-none transition-colors ${
                persona === p ? "text-cyan-950" : "text-cyan-300 hover:text-white"
              }`}
            >
              {persona === p && (
                <motion.div
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-lg bg-cyan-400 shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{p}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <nav className="flex flex-1 flex-col mt-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {currentLinks.map((item, index) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: EASE }}
                  >
                    <motion.div
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.18, ease: EASE }}
                    >
                      <Link
                        href={item.href}
                        className={`group flex gap-x-3 rounded-lg p-2.5 text-sm leading-6 font-medium transition-all ${
                          isActive
                            ? "bg-cyan-900 text-white"
                            : "text-cyan-200 hover:bg-cyan-900/50 hover:text-white"
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 shrink-0 transition-colors ${
                            isActive ? "text-cyan-400" : "text-cyan-400/70 group-hover:text-cyan-400"
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active-dot"
                            className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400 self-center"
                            transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  </motion.li>
                );
              })}
            </ul>
          </li>

          <li className="mt-auto -mx-2 space-y-3">
            <div className="px-2 pt-1">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-cyan-600/60">Appearance</p>
              <ThemeToggle variant="full" />
            </div>

            <motion.div
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18, ease: EASE }}
            >
              <Link
                href="#"
                className="group flex gap-x-3 rounded-lg p-2.5 text-sm leading-6 font-medium text-cyan-200 hover:bg-cyan-900/50 hover:text-white transition-all"
              >
                <Settings className="h-5 w-5 shrink-0 text-cyan-400/70 group-hover:text-cyan-400 transition-colors" />
                Settings
              </Link>
            </motion.div>

            <div className="flex items-center gap-x-4 py-3 px-2.5 mt-2 rounded-lg bg-cyan-900/30 ring-1 ring-cyan-800/50">
              <img
                className="h-9 w-9 rounded-full bg-cyan-800 object-cover ring-2 ring-cyan-900"
                src="https://i.pravatar.cc/150?u=kolabee_admin"
                alt="User avatar"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">Alex Morgan</span>
                <span className="text-xs text-cyan-400">kolabee.co</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.2, color: "#67e8f9" }}
                whileTap={{ scale: 0.85 }}
                transition={{ duration: 0.15, ease: EASE }}
                className="ml-auto"
              >
                <LogOut className="h-4 w-4 text-cyan-500 cursor-pointer transition-colors" />
              </motion.button>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="h-screen flex w-full bg-slate-100 dark:bg-[#080c10] overflow-hidden text-stone-900 relative">
      
      {/* Ambient Background Gradient for Glassmorphism */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[50%] rounded-full bg-cyan-400/30 dark:bg-cyan-500/10 blur-[100px]" />
        <div className="absolute top-[30%] -right-[5%] w-[35%] h-[50%] rounded-full bg-blue-500/20 dark:bg-blue-600/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[15%] w-[50%] h-[40%] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-[100px]" />
      </div>

      <div className="z-10 flex w-full">
        <CommandPalette />
      <BriefWizard isOpen={isBriefWizardOpen} onClose={() => setIsBriefWizardOpen(false)} />

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:z-40">
        <SidebarContent />
      </div>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 z-30 flex h-16 w-full items-center justify-between border-b border-stone-200 bg-white px-4 shadow-sm sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <Hexagon className="h-6 w-6 text-cyan-600 group-hover:text-cyan-500 transition-colors" />
          <span className="font-heading text-lg font-bold text-cyan-950">Kolabee</span>
        </Link>
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.15, ease: EASE }}
          className="-m-2.5 p-2.5 text-stone-700"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </motion.button>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="fixed inset-0 z-40 bg-cyan-950/80 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="fixed inset-y-0 left-0 z-40 w-full max-w-xs flex-col lg:hidden"
            >
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="-m-2.5 p-2.5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" aria-hidden="true" />
                </motion.button>
              </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 lg:pl-72 flex flex-col h-screen relative z-10">
        
        <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-stone-200/50 dark:border-white/5 bg-white/60 dark:bg-[#0a0f14]/60 backdrop-blur-xl px-4 py-3 sm:gap-x-6 sm:px-6 lg:px-8">
          <h1 className="font-heading text-xl font-semibold text-cyan-950 capitalize dark:text-white">
            {pathname === '/dashboard' ? 'Overview' : pathname.split('/').pop()}
          </h1>

          <div className="flex items-center gap-6">
            
            {/* NEW: Post Brief Button (Only visible for business persona) */}
            <AnimatePresence>
              {persona === "business" && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setIsBriefWizardOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 rounded-full bg-cyan-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Post Brief</span>
                </motion.button>
              )}
            </AnimatePresence>

            <div className="hidden h-6 w-px bg-stone-200 sm:block" />

            <motion.button
              onClick={triggerCommandPalette}
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
            </motion.button>

            {/* Notification bell */}
            <ThemeToggleSimple />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15, ease: EASE }}
              className="relative rounded-full p-2 text-stone-400 hover:text-stone-500 hover:bg-stone-100 transition-colors"
            >
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-500 ring-2 ring-white" />
              <Bell className="h-5 w-5" />
            </motion.button>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="mx-auto max-w-7xl h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </div>
    </div>
  );
}