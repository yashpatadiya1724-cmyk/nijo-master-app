"use client";

import { ArrowLeft, Bell, Lock, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-[var(--surface-2)]">
      <header className="flex items-center px-4 py-4 bg-white border-b border-[var(--border-color)]">
        <button onClick={() => router.back()} className="mr-3 text-[var(--text-secondary)] md:hidden">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-semibold text-xl text-[var(--text-primary)]">Settings</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white p-4 rounded-3xl border border-[var(--border-color)] shadow-sm">
          <h3 className="font-semibold text-[var(--text-secondary)] px-3 mb-2 text-sm uppercase tracking-wider">Preferences</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
              <Globe size={20} className="text-[var(--text-secondary)]" />
              <div className="flex-1">
                <span className="font-medium text-[var(--text-primary)] block">Language</span>
                <span className="text-xs text-[var(--text-secondary)]">Hinglish</span>
              </div>
            </li>
            <li className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
              <Bell size={20} className="text-[var(--text-secondary)]" />
              <div className="flex-1">
                <span className="font-medium text-[var(--text-primary)] block">Notifications</span>
                <span className="text-xs text-[var(--text-secondary)]">Daily Check-ins</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-[var(--border-color)] shadow-sm">
          <h3 className="font-semibold text-[var(--text-secondary)] px-3 mb-2 text-sm uppercase tracking-wider">Privacy & Security</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl cursor-pointer">
              <Lock size={20} className="text-[var(--text-secondary)]" />
              <div className="flex-1">
                <span className="font-medium text-[var(--text-primary)] block">Data Export</span>
                <span className="text-xs text-[var(--text-secondary)]">Download your chats and journals</span>
              </div>
            </li>
            <li className="flex items-center gap-3 p-3 hover:bg-red-50 rounded-xl cursor-pointer text-red-500">
              <div className="flex-1">
                <span className="font-medium block">Delete Account</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
