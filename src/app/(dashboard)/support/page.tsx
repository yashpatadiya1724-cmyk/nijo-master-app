"use client";

import { ArrowLeft, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import { CareCard } from "@/components/ui/CareCard";

export default function SupportPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full bg-[var(--surface-2)]">
      <header className="flex items-center px-4 py-4 bg-white border-b border-[var(--border-color)]">
        <button onClick={() => router.back()} className="mr-3 text-[var(--text-secondary)] md:hidden">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-semibold text-xl text-[var(--text-primary)]">Safety & Support</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <p className="text-[var(--text-secondary)] font-medium px-2">
          If you or someone you know is going through a tough time, please reach out to professional support. Nijo is not a substitute for medical help.
        </p>

        <CareCard 
          title="Kiran Helpline (India)" 
          text="24/7 mental health rehabilitation helpline by the Govt of India." 
          actionText="Call 1800-599-0019" 
        />

        <CareCard 
          title="Vandrevala Foundation" 
          text="Free psychological counselling and crisis intervention." 
          actionText="Call 9999 666 555" 
        />

        <CareCard 
          title="AASRA" 
          text="Voluntary organization working in the area of suicide prevention." 
          actionText="Call 9820466726" 
        />
      </div>
    </div>
  );
}
