"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const hasOnboarded = localStorage.getItem("nijo_onboarded");
    if (hasOnboarded) {
      router.replace("/home");
    } else {
      router.replace("/onboarding");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <p className="text-[var(--text-secondary)]">Loading Nijo...</p>
    </div>
  );
}
