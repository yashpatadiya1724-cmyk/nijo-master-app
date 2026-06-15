"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Edit3, Smile, Home } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const NAV_ITEMS = [
    { label: "Home", href: "/home", icon: Home },
    { label: "Chat", href: "/chat", icon: MessageCircle },
    { label: "Mood", href: "/mood", icon: Smile },
    { label: "Journal", href: "/journal", icon: Edit3 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[var(--border-color)] flex items-center justify-around md:hidden px-2 pb-safe">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
              isActive ? "text-[var(--primary-start)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
