"use client";

import Link from "next/link";
import { MessageCircle, Edit3, Smile, User } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-full bg-[var(--surface-2)] md:bg-transparent px-6 pt-12 transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-6"
      >
        <div>
          <h1 className="font-sans font-bold text-[32px] text-[var(--text-primary)] leading-tight">Good morning,<br/>Yash</h1>
        </div>
        <Link href="/profile" className="md:hidden w-12 h-12 rounded-full bg-[var(--surface-1)] shadow-sm border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary-start)] transition-colors">
          <User size={24} />
        </Link>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-[var(--text-secondary)] text-[16px] mb-8"
      >
        What do you need today?
      </motion.p>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <motion.div variants={item}>
          <Link href="/chat" className="bg-[var(--surface-1)] p-5 rounded-[24px] flex items-center md:flex-col md:text-center md:justify-center md:py-8 gap-4 shadow-sm border border-[var(--border-color)] transition-all hover:scale-[1.02] hover:shadow-md hover:border-[var(--primary-start)]/50 group block">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--primary-start)]/10 flex items-center justify-center text-[var(--primary-start)] group-hover:bg-[var(--primary-start)] group-hover:text-white transition-colors">
              <MessageCircle size={24} className="md:w-8 md:h-8" />
            </div>
            <div>
              <h3 className="font-bold text-[18px] text-[var(--text-primary)]">Talk to Nijo</h3>
              <p className="text-[14px] text-[var(--text-secondary)] mt-1">Vent or reflect without judgment</p>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link href="/mood" className="bg-[var(--surface-1)] p-5 rounded-[24px] flex items-center md:flex-col md:text-center md:justify-center md:py-8 gap-4 shadow-sm border border-[var(--border-color)] transition-all hover:scale-[1.02] hover:shadow-md hover:border-blue-500/50 group block">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Smile size={24} className="md:w-8 md:h-8" />
            </div>
            <div>
              <h3 className="font-bold text-[18px] text-[var(--text-primary)]">Log Mood</h3>
              <p className="text-[14px] text-[var(--text-secondary)] mt-1">Track how you are feeling</p>
            </div>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link href="/journal" className="bg-[var(--surface-1)] p-5 rounded-[24px] flex items-center md:flex-col md:text-center md:justify-center md:py-8 gap-4 shadow-sm border border-[var(--border-color)] transition-all hover:scale-[1.02] hover:shadow-md hover:border-[var(--success)]/50 group block">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[var(--success)]/10 flex items-center justify-center text-[var(--success)] group-hover:bg-[var(--success)] group-hover:text-white transition-colors">
              <Edit3 size={24} className="md:w-8 md:h-8" />
            </div>
            <div>
              <h3 className="font-bold text-[18px] text-[var(--text-primary)]">Journal</h3>
              <p className="text-[14px] text-[var(--text-secondary)] mt-1">Write down your thoughts privately</p>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
