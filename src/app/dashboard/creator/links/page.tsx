"use client";

import { useState, useEffect, useMemo } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
  Link2, 
  Copy, 
  ExternalLink, 
  MoreVertical, 
  CheckCircle2, 
  Plus,
  MousePointerClick,
  ShoppingCart
} from "lucide-react";
import { mockCreatorLinks, CreatorLink } from "@/lib/mock-data";
import { CountUp } from "@/components/ui/count-up";
import { LinkCardSkeleton } from "@/components/ui/skeleton";
import { LivePreviewPhone } from "@/components/dashboard/creator/live-preview-phone";
import { LinkConfigModal } from "@/components/dashboard/creator/link-config-modal";

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export default function CreatorLinksPage() {
  const [selectedLink, setSelectedLink] = useState<CreatorLink | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(`kolabee.com/l/${code}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activeLinks = useMemo(() => mockCreatorLinks.filter(link => link.status === "Active"), []);

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <m.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE }}>
          <h1 className="font-heading text-3xl font-bold text-cyan-950 dark:text-white">My Links</h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Manage your referral links and track your audience conversions.
          </p>
        </m.div>
        <m.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE }}>
          <m.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="flex h-10 items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            <Plus className="h-4 w-4" />
            <span>Generate New Link</span>
          </m.button>
        </m.div>
      </div>

      {/* Main Split Layout */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        
        {/* Left Side: Link Roster */}
        <div className="w-full lg:flex-1">
          {isLoading ? (
            <m.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2">
              {[0, 1, 2].map((i) => <m.div key={i} variants={cardVariants}><LinkCardSkeleton /></m.div>)}
            </m.div>
          ) : (
            <m.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2">
              <AnimatePresence>
                {mockCreatorLinks.map((link, index) => (
                  <m.div
                    key={link.id}
                    variants={cardVariants}
                    whileHover={{ y: -5, boxShadow: "0 16px 32px -8px rgb(8 145 178 / 0.12)" }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="flex flex-col rounded-2xl premium-glass p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${link.status === 'Active' ? 'bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400' : 'bg-stone-100 dark:bg-stone-800/50 text-stone-400 dark:text-stone-500'}`}>
                          <Link2 className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-cyan-950 dark:text-white line-clamp-1">{link.title}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${link.status === 'Active' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 ring-1 ring-green-200 dark:ring-green-800/50' : 'bg-stone-100 dark:bg-stone-800/50 text-stone-600 dark:text-stone-400 ring-1 ring-stone-200 dark:ring-stone-700/50'}`}>
                              {link.status}
                            </span>
                            <span className="text-xs text-stone-400 dark:text-stone-500">{link.createdAt}</span>
                          </div>
                        </div>
                      </div>
                      <m.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.15, ease: EASE }}
                        className="text-stone-400 dark:text-stone-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors shrink-0"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </m.button>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-y border-stone-100 dark:border-white/5 py-4">
                      <div className="flex flex-col items-center gap-1 w-1/2 border-r border-stone-100 dark:border-white/5">
                        <span className="flex items-center gap-1 text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                          <MousePointerClick className="h-3 w-3" /> Clicks
                        </span>
                        <span className="text-xl font-bold text-cyan-950 dark:text-white">
                          <CountUp to={link.clicks} duration={1300} delay={index * 60 + 200} formatter={(n) => Math.round(n).toLocaleString()} />
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1 w-1/2">
                        <span className="flex items-center gap-1 text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                          <ShoppingCart className="h-3 w-3" /> Orders
                        </span>
                        <span className="text-xl font-bold text-cyan-950 dark:text-white">
                          <CountUp to={link.orders} duration={1300} delay={index * 60 + 250} formatter={(n) => Math.round(n).toLocaleString()} />
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <m.button 
                        onClick={() => setSelectedLink(link)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ duration: 0.15, ease: EASE }}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-stone-50 dark:bg-stone-800/50 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700/50 ring-1 ring-stone-200 dark:ring-stone-700/50 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 shrink-0" />
                        Destination
                      </m.button>
                      <m.button 
                        onClick={() => handleCopy(link.id, link.code)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ duration: 0.15, ease: EASE }}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
                          copiedId === link.id 
                          ? "bg-green-50 dark:bg-green-900/40 text-green-700 dark:text-green-400 ring-1 ring-green-200 dark:ring-green-800/50" 
                          : "bg-cyan-50 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-800/50 ring-1 ring-cyan-200 dark:ring-cyan-800/50"
                        }`}
                      >
                        {copiedId === link.id ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <Copy className="h-4 w-4 shrink-0" />}
                        {copiedId === link.id ? "Copied!" : "Copy Link"}
                      </m.button>
                    </div>
                  </m.div>
                ))}
              </AnimatePresence>
            </m.div>
          )}
        </div>

        {/* Right Side: Smart Link Preview (Mobile Phone Mockup) */}
        <LivePreviewPhone isLoading={isLoading} activeLinks={activeLinks} />
      </div>

      {/* Destination Modal */}
      <LinkConfigModal selectedLink={selectedLink} onClose={() => setSelectedLink(null)} />
    </div>
  );
}
