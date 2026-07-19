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
  Settings
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [persona, setPersona] = useState<"business" | "creator">("business");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu automatically when the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Navigation defined strictly by the PRD for each persona
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

  const SidebarContent = () => (
    <div className="flex h-full flex-col gap-y-5 bg-cyan-950 px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center gap-2">
        <Hexagon className="h-8 w-8 text-cyan-400 fill-cyan-400/20" />
        <span className="font-heading text-xl font-bold text-white tracking-tight">Kolabee</span>
      </div>

      {/* Persona Switcher Toggle */}
      <div className="rounded-xl bg-cyan-900/50 p-1 ring-1 ring-cyan-800">
        <div className="relative flex space-x-1">
          {(["business", "creator"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPersona(p)}
              className={`relative flex-1 rounded-lg py-2 text-xs font-semibold uppercase tracking-wider outline-none transition-colors ${
                persona === p ? "text-cyan-950" : "text-cyan-300 hover:text-white"
              }`}
            >
              {persona === p && (
                <motion.div
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-lg bg-cyan-400 shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{p}</span>
            </button>
          ))}
        </div>
      </div>

      <nav className="flex flex-1 flex-col mt-4">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-2">
              {currentLinks.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`group flex gap-x-3 rounded-lg p-2.5 text-sm leading-6 font-medium transition-all ${
                        isActive
                          ? "bg-cyan-900 text-white"
                          : "text-cyan-200 hover:bg-cyan-900/50 hover:text-white"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 shrink-0 ${
                          isActive ? "text-cyan-400" : "text-cyan-400/70 group-hover:text-cyan-400"
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          
          {/* Bottom Settings & User Profile Mockup */}
          <li className="mt-auto -mx-2 space-y-2">
            <Link
              href="#"
              className="group flex gap-x-3 rounded-lg p-2.5 text-sm leading-6 font-medium text-cyan-200 hover:bg-cyan-900/50 hover:text-white transition-all"
            >
              <Settings className="h-5 w-5 shrink-0 text-cyan-400/70 group-hover:text-cyan-400" />
              Settings
            </Link>
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
              <LogOut className="h-4 w-4 text-cyan-500 ml-auto cursor-pointer hover:text-cyan-300 transition-colors" />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="h-screen flex w-full bg-stone-50 overflow-hidden text-stone-900">
      
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
        <SidebarContent />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 z-40 flex h-16 w-full items-center justify-between border-b border-stone-200 bg-white px-4 shadow-sm sm:px-6">
        <div className="flex items-center gap-2">
          <Hexagon className="h-6 w-6 text-cyan-600" />
          <span className="font-heading text-lg font-bold text-cyan-950">Kolabee</span>
        </div>
        <button
          type="button"
          className="-m-2.5 p-2.5 text-stone-700"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-cyan-950/80 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 z-50 w-full max-w-xs flex-col lg:hidden"
            >
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" className="-m-2.5 p-2.5" onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-72 flex flex-col h-screen overflow-hidden">
        
        {/* Top bar for contextual actions / breadcrumbs */}
        <header className="hidden lg:flex h-16 shrink-0 items-center justify-between border-b border-stone-200 bg-white px-8 shadow-sm">
          <h1 className="font-heading text-xl font-semibold text-cyan-950 capitalize">
            {pathname === '/dashboard' ? 'Overview' : pathname.split('/').pop()}
          </h1>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-stone-400 hover:text-stone-500 hover:bg-stone-100 transition-colors">
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-500 ring-2 ring-white"></span>
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Scrollable Content Container with Route Transitions */}
        <div className="flex-1 overflow-y-auto mt-16 lg:mt-0 p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname} // This triggers the animation on route change
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-7xl h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

    </div>
  );
}