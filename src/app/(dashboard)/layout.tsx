import { ReactNode } from "react";
import { BottomNav } from "@/components/BottomNav";
import { PageWrapper } from "@/components/PageWrapper";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center h-[100dvh] bg-[var(--surface-warm)] overflow-hidden transition-colors duration-300">
      {/* Main Content Area - Mobile restricted width for desktop */}
      <main className="w-full max-w-md h-full bg-[var(--background)] shadow-2xl flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-y-auto pb-16">
          <PageWrapper>
            {children}
          </PageWrapper>
        </div>
        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </main>
    </div>
  );
}
