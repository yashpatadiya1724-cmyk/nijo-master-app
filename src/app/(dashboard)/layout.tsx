import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { BottomNav } from "@/components/BottomNav";
import { PageWrapper } from "@/components/PageWrapper";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[var(--background)] overflow-hidden transition-colors duration-300">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0 z-10 shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative pb-16 md:pb-0">
        <div className="max-w-4xl mx-auto h-full w-full bg-[var(--background)] md:border-x border-[var(--border-color)] shadow-sm flex flex-col relative overflow-x-hidden">
          <PageWrapper>
            {children}
          </PageWrapper>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
