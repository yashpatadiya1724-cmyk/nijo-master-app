"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Edit3, Smile, Home, User, Settings } from "lucide-react";

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
    <aside className="w-64 h-full bg-white border-r border-[var(--border-color)] flex flex-col">
      <div className="p-6">
        <h2 className="font-bold text-2xl text-[var(--text-primary)]">Nijo</h2>
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
                  ? "bg-orange-50 text-[var(--primary-start)]"
                  : "text-[var(--text-secondary)] hover:bg-gray-50 hover:text-[var(--text-primary)]"
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
                  ? "bg-orange-50 text-[var(--primary-start)]"
                  : "text-[var(--text-secondary)] hover:bg-gray-50 hover:text-[var(--text-primary)]"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/plus"
          className="mt-4 flex items-center justify-center py-3 bg-gradient-to-tr from-[var(--primary-start)] to-[var(--primary-end)] text-white rounded-xl font-bold shadow-sm hover:opacity-90 transition-opacity"
        >
          Nijo Plus ✨
        </Link>
      </div>
    </aside>
  );
}
