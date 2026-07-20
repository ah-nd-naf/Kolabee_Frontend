// src/components/ui/navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hexagon,
  Zap,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  LayoutDashboard,
  BarChart3,
  Link2,
  Users,
  Building2,
  Sparkles,
} from "lucide-react";
import { ThemeToggleSimple } from "@/components/ui/theme-toggle";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Nav data ─── */
const productLinks = [
  { label: "Creator Dashboard",  href: "/dashboard/creator/links", icon: Link2,      desc: "Manage your referral links"     },
  { label: "Link Analytics",     href: "/dashboard/analytics",    icon: BarChart3,   desc: "Real-time funnel insights"      },
  { label: "Campaign Overview",  href: "/dashboard",              icon: LayoutDashboard, desc: "Your performance at a glance" },
];

const audienceLinks = [
  { label: "For Businesses",  href: "/dashboard", icon: Building2, desc: "Post briefs & hire creators"     },
  { label: "For Creators",    href: "/dashboard", icon: Users,     desc: "Apply, deliver & get paid"       },
];

const navLinks = [
  { label: "Features",  dropdown: productLinks  },
  { label: "Audience",  dropdown: audienceLinks },
  { label: "Pricing",   href: "/#pricing"       },
  { label: "About",     href: "/#"              },
];

/* ─── Dropdown menu ─── */
function DropdownMenu({ items, isOpen }: { items: typeof productLinks; isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ duration: 0.22, ease: EASE }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 origin-top"
        >
          {/* Arrow tip */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 rounded-sm bg-white dark:bg-stone-900 ring-1 ring-stone-200/80 dark:ring-stone-700" />

          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-stone-900 shadow-xl shadow-stone-200/60 dark:shadow-black/40 ring-1 ring-stone-200/80 dark:ring-stone-700 p-2">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-cyan-50 dark:hover:bg-cyan-950/40"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 ring-1 ring-cyan-100 dark:ring-cyan-800/50 transition-colors group-hover:bg-cyan-600 group-hover:text-white group-hover:ring-cyan-600">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-800 dark:text-stone-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                      {item.label}
                    </p>
                    <p className="text-xs text-stone-400 dark:text-stone-500">{item.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Animated underline nav link ─── */
function NavLinkWithUnderline({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative inline-flex flex-col items-center"
    >
      <Link href={href} className={className}>
        {children}
      </Link>
      <motion.span
        className="absolute -bottom-0.5 left-2 right-2 h-px bg-cyan-400/80 origin-left"
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.25, ease: EASE }}
      />
    </motion.div>
  );
}

/* ─── Mobile menu ─── */
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-stone-950/30 dark:bg-black/50 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed top-20 inset-x-4 z-50 origin-top rounded-2xl bg-white dark:bg-stone-900 shadow-2xl shadow-stone-200/80 dark:shadow-black/60 ring-1 ring-stone-200 dark:ring-stone-700 overflow-hidden lg:hidden"
          >
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.href ? (
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <div>
                      <p className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                        {link.label}
                      </p>
                      {link.dropdown?.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={onClose}
                            className="group flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-cyan-50 dark:hover:bg-cyan-950/40"
                          >
                            <Icon className="h-4 w-4 text-cyan-500" />
                            <span className="text-sm font-medium text-stone-700 dark:text-stone-200">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-2 flex flex-col gap-2 border-t border-stone-100 dark:border-stone-800 pt-3">
                <ThemeToggleSimple />
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white hover:bg-cyan-500 transition-colors"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Navbar ─── */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        className="fixed top-0 inset-x-0 z-50"
        onMouseLeave={() => setOpenDropdown(null)}
      >
        {/* Outer container — transitions from transparent to blurred glass */}
        <div
          className={`mx-auto transition-all duration-500 ${
            scrolled
              ? "mt-3 max-w-5xl rounded-2xl"
              : "mt-0 max-w-full rounded-none"
          }`}
        >
          <div
            className={`relative flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
              scrolled
                ? "h-14 rounded-2xl bg-white/80 dark:bg-stone-950/80 backdrop-blur-xl shadow-lg shadow-stone-200/50 dark:shadow-black/40 ring-1 ring-stone-200/80 dark:ring-stone-700/80"
                : "h-20 bg-transparent"
            }`}
          >
            {/* ── Logo ── */}
            <Link href="/" className="group flex shrink-0 items-center gap-2.5">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="relative flex h-9 w-9 items-center justify-center"
              >
                <Hexagon
                  className="h-9 w-9 text-cyan-500 transition-colors group-hover:text-cyan-400"
                  fill="currentColor"
                  strokeWidth={0}
                />
                <Zap className="absolute h-4 w-4 fill-white text-white" strokeWidth={0} />
              </motion.div>
              <span
                className={`font-heading text-xl font-bold tracking-tight transition-colors duration-300 ${
                  scrolled
                    ? "text-cyan-950 dark:text-white"
                    : "text-white"
                }`}
              >
                Kolabee
              </span>
            </Link>

            {/* ── Desktop Nav — absolutely centered in the bar ── */}
            <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.label} className="relative">
                  {link.href ? (
                    <NavLinkWithUnderline
                      href={link.href}
                      className={`flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                        scrolled
                          ? "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </NavLinkWithUnderline>
                  ) : (
                    <motion.div
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      className="relative inline-flex flex-col items-center"
                    >
                      <button
                        onClick={() => toggleDropdown(link.label)}
                        className={`flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                          scrolled
                            ? "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
                            : "text-white/80 hover:text-white"
                        } ${openDropdown === link.label ? (scrolled ? "text-stone-900 dark:text-white" : "text-white") : ""}`}
                      >
                        {link.label}
                        <motion.span
                          animate={{ rotate: openDropdown === link.label ? 180 : 0 }}
                          transition={{ duration: 0.2, ease: EASE }}
                        >
                          <ChevronDown className="h-3.5 w-3.5" />
                        </motion.span>
                      </button>
                      {/* Underline on dropdown buttons too */}
                      <motion.span
                        className="absolute -bottom-0.5 left-2 right-2 h-px bg-cyan-400/80 origin-left"
                        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                        transition={{ duration: 0.25, ease: EASE }}
                      />
                    </motion.div>
                  )}

                  {link.dropdown && (
                    <DropdownMenu items={link.dropdown} isOpen={openDropdown === link.label} />
                  )}
                </div>
              ))}
            </nav>

            {/* ── Right actions ── */}
            <div className="hidden lg:flex items-center gap-3">
              <ThemeToggleSimple />

              <Link
                href="/dashboard"
                className={`text-sm font-semibold transition-colors duration-200 ${
                  scrolled
                    ? "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                Sign in
              </Link>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.15, ease: EASE }}>
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-1.5 rounded-full bg-cyan-500 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:bg-cyan-400 transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Get Started
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>

            {/* ── Mobile hamburger ── */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggleSimple />
              <motion.button
                onClick={() => setMobileOpen((v) => !v)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15, ease: EASE }}
                aria-label="Open menu"
                className={`rounded-xl p-2 transition-colors ${
                  scrolled
                    ? "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="x"
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                      transition={{ duration: 0.2, ease: EASE }}
                    >
                      <X className="h-5 w-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                      transition={{ duration: 0.2, ease: EASE }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu rendered outside the header for proper stacking */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Spacer — only when NOT scrolled (hero section handles its own padding) */}
    </>
  );
}
