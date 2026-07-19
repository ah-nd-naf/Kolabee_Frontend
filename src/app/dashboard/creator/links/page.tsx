"use client";

import { useState } from "react";
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
  ShoppingCart
} from "lucide-react";
import { mockCreatorLinks, CreatorLink } from "@/lib/mock-data";

export default function CreatorLinksPage() {
  const [selectedLink, setSelectedLink] = useState<CreatorLink | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const customEasing = [0.16, 1, 0.3, 1];

  // Simulated copy to clipboard
  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(`kolabee.com/l/${code}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: customEasing }}
        >
          <h1 className="font-heading text-3xl font-bold text-cyan-950">My Links</h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage your referral links and track your audience conversions.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: customEasing }}
        >
          <button className="flex h-10 items-center justify-center gap-2 rounded-full bg-cyan-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
            <Plus className="h-4 w-4" />
            <span>Generate New Link</span>
          </button>
        </motion.div>
      </div>

      {/* Link Roster (Cards) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence>
          {mockCreatorLinks.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: customEasing }}
              className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${link.status === 'Active' ? 'bg-cyan-50 text-cyan-600' : 'bg-stone-100 text-stone-400'}`}>
                    <Link2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-cyan-950">{link.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${link.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-600'}`}>
                        {link.status}
                      </span>
                      <span className="text-xs text-stone-400">{link.createdAt}</span>
                    </div>
                  </div>
                </div>
                <button className="text-stone-400 hover:text-cyan-600 transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              {/* Stats Row */}
              <div className="mt-6 flex items-center justify-between border-y border-stone-100 py-4">
                <div className="flex flex-col items-center gap-1 w-1/2 border-r border-stone-100">
                  <span className="flex items-center gap-1 text-xs font-medium text-stone-500 uppercase tracking-wider">
                    <MousePointerClick className="h-3 w-3" /> Clicks
                  </span>
                  <span className="text-xl font-bold text-cyan-950">{link.clicks.toLocaleString()}</span>
                </div>
                <div className="flex flex-col items-center gap-1 w-1/2">
                  <span className="flex items-center gap-1 text-xs font-medium text-stone-500 uppercase tracking-wider">
                    <ShoppingCart className="h-3 w-3" /> Orders
                  </span>
                  <span className="text-xl font-bold text-cyan-950">{link.orders.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex items-center gap-2">
                <button 
                  onClick={() => setSelectedLink(link)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-stone-50 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Destination
                </button>
                <button 
                  onClick={() => handleCopy(link.id, link.code)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
                    copiedId === link.id 
                    ? "bg-green-50 text-green-700 ring-1 ring-green-200" 
                    : "bg-cyan-50 text-cyan-700 hover:bg-cyan-100"
                  }`}
                >
                  {copiedId === link.id ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copiedId === link.id ? "Copied!" : "Copy Link"}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Smooth Destination Modal using AnimatePresence */}
      <AnimatePresence>
        {selectedLink && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLink(null)}
              className="absolute inset-0 bg-cyan-950/20 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: customEasing }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl shadow-cyan-900/20 ring-1 ring-stone-200"
            >
              <div className="border-b border-stone-100 bg-stone-50/50 px-6 py-4 flex items-center justify-between">
                <h3 className="font-heading text-lg font-bold text-cyan-950">Link Configuration</h3>
                <button 
                  onClick={() => setSelectedLink(null)}
                  className="rounded-full p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                    <Link2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stone-900">{selectedLink.title}</h4>
                    <p className="text-sm text-stone-500">kolabee.com/l/{selectedLink.code}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Destination URL</label>
                    <div className="flex rounded-lg shadow-sm ring-1 ring-inset ring-stone-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-stone-500 sm:text-sm">https://</span>
                      <input
                        type="text"
                        defaultValue={selectedLink.destination.replace('https://', '')}
                        className="block flex-1 border-0 bg-transparent py-2.5 pl-1 text-stone-900 placeholder:text-stone-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                      />
                    </div>
                    <p className="mt-2 text-xs text-stone-500">
                      This is where traffic will be redirected after hitting the Kolabee resolver.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-stone-100">
                <button 
                  onClick={() => setSelectedLink(null)}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setSelectedLink(null)}
                  className="rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}