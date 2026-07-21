"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Link2, 
  Copy, 
  ExternalLink, 
  MoreVertical, 
  X, 
  CheckCircle2, 
  Plus,
  MousePointerClick,
  ShoppingCart,
  Smartphone
} from "lucide-react";
import { mockCreatorLinks, CreatorLink } from "@/lib/mock-data";
import { CountUp } from "@/components/ui/count-up";
import { LinkCardSkeleton } from "@/components/ui/skeleton";

// Canonical easing curve
const EASE = [0.16, 1, 0.3, 1] as const;

// Stagger container — 50ms between cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
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

  // Only show active links in the public phone preview
  const activeLinks = mockCreatorLinks.filter(link => link.status === "Active");

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <h1 className="font-heading text-3xl font-bold text-cyan-950 dark:text-white">My Links</h1>
          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Manage your referral links and track your audience conversions.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="flex h-10 items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            <Plus className="h-4 w-4" />
            <span>Generate New Link</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Main Split Layout */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        
        {/* Left Side: Link Roster (Takes up majority of space) */}
        <div className="w-full lg:flex-1">
          {isLoading ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div key={i} variants={cardVariants}>
                  <LinkCardSkeleton />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2"
            >
              <AnimatePresence>
                {mockCreatorLinks.map((link, index) => (
                  <motion.div
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
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.15, ease: EASE }}
                        className="text-stone-400 dark:text-stone-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors shrink-0"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </motion.button>
                    </div>

                    {/* Stats Row — CountUp on numbers */}
                    <div className="mt-6 flex items-center justify-between border-y border-stone-100 dark:border-white/5 py-4">
                      <div className="flex flex-col items-center gap-1 w-1/2 border-r border-stone-100 dark:border-white/5">
                        <span className="flex items-center gap-1 text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                          <MousePointerClick className="h-3 w-3" /> Clicks
                        </span>
                        <span className="text-xl font-bold text-cyan-950 dark:text-white">
                          <CountUp
                            to={link.clicks}
                            duration={1300}
                            delay={index * 60 + 200}
                            formatter={(n) => Math.round(n).toLocaleString()}
                          />
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-1 w-1/2">
                        <span className="flex items-center gap-1 text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                          <ShoppingCart className="h-3 w-3" /> Orders
                        </span>
                        <span className="text-xl font-bold text-cyan-950 dark:text-white">
                          <CountUp
                            to={link.orders}
                            duration={1300}
                            delay={index * 60 + 250}
                            formatter={(n) => Math.round(n).toLocaleString()}
                          />
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex items-center gap-2">
                      <motion.button 
                        onClick={() => setSelectedLink(link)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ duration: 0.15, ease: EASE }}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-stone-50 dark:bg-stone-800/50 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700/50 ring-1 ring-stone-200 dark:ring-stone-700/50 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 shrink-0" />
                        Destination
                      </motion.button>
                      <motion.button 
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
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Right Side: Smart Link Preview (Mobile Phone Mockup) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          className="hidden lg:flex w-[320px] shrink-0 flex-col items-center sticky top-24"
        >
          <div className="flex items-center gap-2 mb-4 text-cyan-900/50">
            <Smartphone className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Live Preview</span>
          </div>

          {/* Phone Hardware Frame */}
          <div className="relative h-[650px] w-full rounded-[3rem] border-[10px] border-stone-900 bg-stone-900 shadow-2xl overflow-hidden ring-1 ring-stone-900/20">
            
            {/* Phone Notch/Dynamic Island */}
            <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
              <div className="w-32 h-6 bg-stone-900 rounded-b-3xl"></div>
            </div>

            {/* Phone Screen UI */}
            <div className="relative h-full w-full bg-stone-50 overflow-y-auto overflow-x-hidden no-scrollbar">
              
              {/* Premium Background Mesh inside phone */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.15),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(8,51,68,0.1),transparent_50%)]" />

              <div className="relative z-10 flex flex-col px-6 pt-16 pb-10">
                
                {/* Creator Public Profile */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
                  className="flex flex-col items-center text-center mb-8"
                >
                  <img 
                    src="https://i.pravatar.cc/150?u=kolabee_admin" 
                    alt="Alex Morgan" 
                    className="h-24 w-24 rounded-full object-cover shadow-lg ring-4 ring-white mb-4"
                  />
                  <h2 className="font-heading text-xl font-bold text-cyan-950">Alex Morgan</h2>
                  <p className="mt-1 text-sm font-medium text-stone-500">@kolabee.co</p>
                  <p className="mt-3 text-xs text-stone-600 leading-relaxed px-2">
                    Creating tech content & reviewing the best gadgets out there. Welcome to my storefront! 🚀
                  </p>
                </motion.div>

                {/* Simulated Public Links */}
                <div className="flex flex-col gap-3">
                  {isLoading ? (
                    // Phone Link Skeletons
                    [1, 2].map((i) => (
                      <div key={i} className="h-14 w-full rounded-2xl bg-stone-200 animate-pulse" />
                    ))
                  ) : (
                    activeLinks.map((link, index) => (
                      <motion.a
                        key={link.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 + (index * 0.1), ease: EASE }}
                        href="#"
                        className="group flex items-center justify-center p-4 rounded-2xl bg-white text-sm font-semibold text-cyan-950 shadow-sm ring-1 ring-stone-200/50 hover:ring-cyan-300 hover:shadow-md transition-all active:scale-95 relative overflow-hidden"
                      >
                        <span className="relative z-10">{link.title}</span>
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-50 to-transparent transition-opacity" />
                      </motion.a>
                    ))
                  )}
                </div>

                {/* Kolabee Watermark */}
                <div className="mt-12 flex justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 flex items-center gap-1">
                    Powered by Kolabee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Destination Modal */}
      <AnimatePresence>
        {selectedLink && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
              onClick={() => setSelectedLink(null)}
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl premium-glass shadow-2xl shadow-cyan-900/20 ring-1 ring-stone-200/50 dark:ring-white/10"
            >
              <div className="border-b border-stone-100/50 dark:border-white/10 bg-white/40 dark:bg-[#0a0f14]/40 px-6 py-4 flex items-center justify-between">
                <h3 className="font-heading text-lg font-bold text-cyan-950 dark:text-white">Link Configuration</h3>
                <motion.button 
                  onClick={() => setSelectedLink(null)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="rounded-full p-1.5 text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              
              <div className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300">
                    <Link2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900 dark:text-white">{selectedLink.title}</h4>
                    <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-1">kolabee.com/l/{selectedLink.code}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">Destination URL</label>
                    <div className="flex rounded-lg shadow-sm ring-1 ring-inset ring-stone-300 dark:ring-stone-700 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-600 sm:max-w-md bg-white/50 dark:bg-black/20">
                      <span className="flex select-none items-center pl-3 text-stone-500 dark:text-stone-400 sm:text-sm">https://</span>
                      <input
                        type="text"
                        defaultValue={selectedLink.destination.replace('https://', '')}
                        className="block flex-1 border-0 bg-transparent py-2.5 pl-1 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                      />
                    </div>
                    <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                      This is where traffic will be redirected after hitting the Kolabee resolver.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-stone-50/50 dark:bg-stone-900/50 px-6 py-4 flex items-center justify-end gap-3 border-t border-stone-100/50 dark:border-white/10">
                <motion.button 
                  onClick={() => setSelectedLink(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.15, ease: EASE }}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button 
                  onClick={() => setSelectedLink(null)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15, ease: EASE }}
                  className="rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 transition-colors"
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}