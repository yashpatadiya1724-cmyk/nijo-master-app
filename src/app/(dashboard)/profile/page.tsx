"use client";

import { ArrowLeft, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("nijo_onboarded");
    router.replace("/");
  };

  return (
    <div className="flex flex-col h-full bg-[var(--surface-2)]">
      <header className="flex items-center px-4 py-4 bg-white border-b border-[var(--border-color)]">
        <button onClick={() => router.back()} className="mr-3 text-[var(--text-secondary)] md:hidden">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-semibold text-xl text-[var(--text-primary)]">Profile</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white p-6 rounded-3xl border border-[var(--border-color)] shadow-sm flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-[var(--primary-start)] mb-4">
            <User size={40} />
          </div>
          <h2 className="font-bold text-2xl text-[var(--text-primary)]">Yash</h2>
          <p className="text-[var(--text-secondary)]">+91 9876543210</p>
          <div 
            onClick={() => router.push('/plus')}
            className="mt-4 px-5 py-2 bg-gradient-to-tr from-[var(--primary-start)] to-[var(--primary-end)] text-white rounded-full text-sm font-bold cursor-pointer hover:opacity-90 shadow-sm transition-opacity"
          >
            Upgrade to Plus ✨
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-[var(--border-color)] shadow-sm">
          <ul className="space-y-2">
            <li className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl cursor-pointer" onClick={() => router.push('/settings')}>
              <span className="font-medium text-[var(--text-primary)]">Settings</span>
              <span className="text-[var(--text-secondary)]">›</span>
            </li>
            <li className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl cursor-pointer" onClick={() => router.push('/support')}>
              <span className="font-medium text-[var(--text-primary)]">Safety & Support</span>
              <span className="text-[var(--text-secondary)]">›</span>
            </li>
          </ul>
        </div>

        <Button variant="secondary" onClick={handleLogout} className="w-full text-red-500 rounded-full h-14 font-semibold mt-4 shadow-sm border-red-100">
          <LogOut size={20} className="mr-2" /> Log Out
        </Button>
      </div>
    </div>
  );
}
