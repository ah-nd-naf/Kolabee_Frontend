"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Handshake, Check, X } from "lucide-react";
import Image from "next/image";
import { mockCollabInvites, CollabInvite } from "@/lib/mock-data";

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function CollabInvitesList() {
  const [invites, setInvites] = useState<CollabInvite[]>(mockCollabInvites);
  const [dismissing, setDismissing] = useState<string[]>([]);

  const handleAction = (id: string) => {
    setDismissing((prev) => [...prev, id]);
    setTimeout(() => {
      setInvites((prev) => prev.filter((inv) => inv.id !== id));
      setDismissing((prev) => prev.filter((d) => d !== id));
    }, 450);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
    >
      <h2 className="font-heading text-lg font-semibold text-cyan-950 dark:text-white mb-4 flex items-center gap-2">
        <Handshake className="h-5 w-5 text-cyan-500" />
        Collaboration Invites
        {invites.length > 0 && (
          <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-white">
            {invites.length}
          </span>
        )}
      </h2>

      <AnimatePresence>
        {invites.length === 0 ? (
          <m.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="premium-glass rounded-2xl p-10 flex flex-col items-center justify-center gap-3 text-center"
          >
            <Handshake className="h-10 w-10 text-stone-300 dark:text-stone-600" />
            <p className="font-heading font-semibold text-stone-500 dark:text-stone-400">No pending invites</p>
            <p className="text-sm text-stone-400 dark:text-stone-500">New brand invitations will appear here.</p>
          </m.div>
        ) : (
          <m.div
            key="list"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3"
          >
            {invites.map((invite) => {
              const isDismissing = dismissing.includes(invite.id);
              return (
                <m.div
                  key={invite.id}
                  variants={cardVariants}
                  animate={isDismissing ? { opacity: 0, x: 40, height: 0, marginBottom: 0, padding: 0 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="premium-glass rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 overflow-hidden"
                >
                  {/* Logo + Info */}
                  <Image
                    src={invite.businessLogo}
                    alt={invite.businessName}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-stone-200 dark:ring-stone-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-cyan-950 dark:text-white truncate">{invite.businessName}</p>
                    <p className="text-sm text-stone-500 dark:text-stone-400 truncate">{invite.category}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Rate</p>
                      <p className="font-heading font-extrabold text-cyan-700 dark:text-cyan-400">
                        {(invite.proposedRateBps / 100).toFixed(2)}%
                      </p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Invited</p>
                      <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{invite.invitedAt}</p>
                    </div>
                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction(invite.id)}
                        className="flex items-center gap-1.5 rounded-full bg-cyan-500/20 px-4 py-1.5 text-sm font-semibold text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/30 transition-colors shadow-sm"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Accept
                      </m.button>
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction(invite.id)}
                        className="flex items-center gap-1.5 rounded-full bg-black/5 dark:bg-white/10 px-4 py-1.5 text-sm font-semibold text-stone-700 dark:text-stone-300 hover:bg-black/10 dark:hover:bg-white/20 ring-1 ring-black/5 dark:ring-white/10 transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                        Decline
                      </m.button>
                    </div>
                  </div>
                </m.div>
              );
            })}
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}
