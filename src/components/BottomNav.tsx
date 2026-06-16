"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, Book, User } from "lucide-react";
import { motion } from "framer-motion";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Talk", href: "/chat", icon: MessageCircle },
    { name: "Journal", href: "/journal", icon: Book },
    { name: "You", href: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--border-color)] pb-safe z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/chat' && pathname.startsWith('/chat'));
          const Icon = item.icon;

          return (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex flex-col items-center justify-center w-full h-full space-y-1 relative"
            >
              <div className="relative">
                <Icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`transition-colors duration-200 ${isActive ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'}`} 
                />
              </div>
              <span 
                className={`text-[10px] font-medium transition-colors duration-200 ${isActive ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'}`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
