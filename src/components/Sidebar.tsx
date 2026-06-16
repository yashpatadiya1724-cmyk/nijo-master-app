"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Edit3, Smile, Home, User, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Sidebar() {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { label: "Home", href: "/home", icon: Home },
    { label: "Chat", href: "/chat", icon: MessageCircle },
    { label: "Journal", href: "/journal", icon: Edit3 },
    { label: "Mood", href: "/mood", icon: Smile },
  ];

  const BOTTOM_ITEMS = [
    { label: "Profile", href: "/profile", icon: User },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 h-full bg-[var(--surface-1)] border-r border-[var(--border-color)] flex flex-col transition-colors duration-300">
      <div className="p-6 flex items-center justify-between">
        <h2 className="font-bold text-2xl brand-gradient-text">Nijo</h2>
        <ThemeToggle />
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                isActive
                  ? "bg-[var(--surface-2)] text-[var(--primary-start)] shadow-sm border border-[var(--border-color)]/30"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 space-y-2 border-t border-[var(--border-color)]">
        {BOTTOM_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                isActive
                  ? "bg-[var(--surface-2)] text-[var(--primary-start)] shadow-sm border border-[var(--border-color)]/30"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/plus"
          className="mt-4 flex items-center justify-center py-3 brand-gradient-bg rounded-xl font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          Nijo Plus ✨
        </Link>
      </div>
    </aside>
  );
}
