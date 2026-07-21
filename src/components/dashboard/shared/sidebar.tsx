"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import Image from "next/image";
import {
  LayoutDashboard,
  Link2,
  BarChart3,
  TrendingUp,
  LogOut,
  Hexagon,
  Settings,
  ArrowLeft,
  Home,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const EASE = [0.16, 1, 0.3, 1] as const;

const navLinks = {
  creator: [
    { name: "Overview",   href: "/dashboard",                icon: LayoutDashboard },
    { name: "My Links",   href: "/dashboard/creator/links",  icon: Link2           },
    { name: "Analytics",  href: "/dashboard/analytics",      icon: BarChart3       },
  ],
  business: [
    { name: "Overview",     href: "/dashboard",                        icon: LayoutDashboard },
    { name: "Performance",  href: "/dashboard/business/performance",   icon: TrendingUp      },
    { name: "Analytics",    href: "/dashboard/analytics",              icon: BarChart3       },
  ],
};

interface DashboardSidebarProps {
  persona: "business" | "creator";
  setPersona: (p: "business" | "creator") => void;
  logoHovered: boolean;
  setLogoHovered: (v: boolean) => void;
}

export function DashboardSidebar({
  persona,
  setPersona,
  logoHovered,
  setLogoHovered,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const currentLinks = navLinks[persona];

  return (
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
      {/* — Logo / Back to Home — */}
      <div className="flex h-16 shrink-0 items-center">
        <Link
          href="/"
          className="group relative flex w-full items-center gap-2 rounded-xl p-1 -ml-1 outline-none"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          {/* Hexagon with glow on hover */}
          <m.div
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
          </m.div>

          {/* Brand name / "Back to site" reveal */}
          <div className="relative flex-1 overflow-hidden h-7">
            {/* "Kolabee" — slides up+fades out on hover */}
            <m.span
              animate={logoHovered ? { y: -28, opacity: 0 } : { y: 0, opacity: 1 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="absolute inset-0 flex items-center font-heading text-xl font-bold text-white tracking-tight whitespace-nowrap"
            >
              Kolabee
            </m.span>

            {/* "← Back to site" — slides up+fades in on hover */}
            <m.span
              animate={logoHovered ? { y: 0, opacity: 1 } : { y: 28, opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="absolute inset-0 flex items-center gap-1.5 text-sm font-semibold text-cyan-300 whitespace-nowrap"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to site
            </m.span>
          </div>

          {/* Small home icon on far right, fades in on hover */}
          <m.div
            animate={logoHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <Home className="h-4 w-4 text-cyan-400" />
          </m.div>
        </Link>
      </div>

      {/* Persona toggle */}
      <div className="rounded-xl bg-cyan-900/50 p-1 ring-1 ring-cyan-800">
        <div className="relative flex space-x-1">
          {(["business", "creator"] as const).map((p) => (
            <m.button
              key={p}
              onClick={() => setPersona(p)}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15, ease: EASE }}
              className={`relative flex-1 rounded-lg py-2 text-xs font-semibold uppercase tracking-wider outline-none transition-colors ${
                persona === p ? "text-cyan-950" : "text-cyan-300 hover:text-white"
              }`}
            >
              {persona === p && (
                <m.div
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-lg bg-cyan-400 shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{p}</span>
            </m.button>
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
                  <m.li
                    key={item.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05, ease: EASE }}
                  >
                    <m.div
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
                          <m.span
                            layoutId="nav-active-dot"
                            className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400 self-center"
                            transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                          />
                        )}
                      </Link>
                    </m.div>
                  </m.li>
                );
              })}
            </ul>
          </li>

          <li className="mt-auto -mx-2 space-y-3">
            <div className="px-2 pt-1">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-cyan-600/60">Appearance</p>
              <ThemeToggle variant="full" />
            </div>

            <m.div
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
            </m.div>

            <div className="flex items-center gap-x-4 py-3 px-2.5 mt-2 rounded-lg bg-cyan-900/30 ring-1 ring-cyan-800/50">
              <Image
                className="h-9 w-9 rounded-full bg-cyan-800 object-cover ring-2 ring-cyan-900"
                src="https://i.pravatar.cc/150?u=kolabee_admin"
                alt="User avatar"
                width={36}
                height={36}
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">Alex Morgan</span>
                <span className="text-xs text-cyan-400">kolabee.co</span>
              </div>
              <m.button
                whileHover={{ scale: 1.2, color: "#67e8f9" }}
                whileTap={{ scale: 0.85 }}
                transition={{ duration: 0.15, ease: EASE }}
                className="ml-auto"
              >
                <LogOut className="h-4 w-4 text-cyan-500 cursor-pointer transition-colors" />
              </m.button>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
