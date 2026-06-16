"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-full bg-[var(--background)] px-6 pt-12 pb-24 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="text-[18px] text-[var(--text-secondary)] font-medium mb-1">Good evening,</p>
        <h1 className="font-semibold text-[32px] text-[var(--text-primary)] leading-tight">Yash</h1>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-[20px] font-semibold text-[var(--text-primary)] mb-2">How are you feeling?</h2>
        <p className="text-[15px] text-[var(--text-secondary)]">
          Nijo is here to listen, whenever you need it. आज कैसा महसूस हो रहा है?
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {/* Wide Tile: Talk to Nijo */}
        <motion.div variants={item}>
          <Link href="/chat" className="bg-[var(--surface-warm)] p-5 rounded-[24px] flex items-center justify-between shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-[var(--companion)]" />
              </div>
              <h3 className="font-semibold text-[18px] text-[var(--text-primary)]">Talk to Nijo</h3>
            </div>
            <ChevronRight className="text-[var(--text-secondary)]" size={20} />
          </Link>
        </motion.div>

        {/* Square Tiles Row */}
        <div className="flex gap-4">
          <motion.div variants={item} className="flex-1">
            <Link href="/journal" className="bg-[var(--surface-warm)] p-5 rounded-[24px] flex flex-col items-start gap-8 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] h-full">
              <div className="w-10 h-10 rounded-[12px] bg-white" />
              <h3 className="font-semibold text-[16px] text-[var(--text-primary)]">Journal</h3>
            </Link>
          </motion.div>

          <motion.div variants={item} className="flex-1">
            <Link href="/mood" className="bg-[var(--surface-warm)] p-5 rounded-[24px] flex flex-col items-start gap-8 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] h-full">
              <div className="w-10 h-10 rounded-[12px] bg-white" />
              <h3 className="font-semibold text-[16px] text-[var(--text-primary)]">Mood</h3>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
