import Link from "next/link";
import { MessageCircle, Edit3, Smile, User } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-full bg-[var(--surface-2)] md:bg-transparent px-6 pt-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-sans font-bold text-[32px] text-[var(--text-primary)] leading-tight">Good morning,<br/>Yash</h1>
        </div>
        <Link href="/profile" className="md:hidden w-12 h-12 rounded-full bg-white shadow-sm border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary-start)] transition-colors">
          <User size={24} />
        </Link>
      </div>
      <p className="text-[var(--text-secondary)] text-[16px] mb-8">What do you need today?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/chat" className="bg-white p-5 rounded-[24px] flex items-center md:flex-col md:text-center md:justify-center md:py-8 gap-4 shadow-sm border border-[var(--border-color)] transition-transform hover:scale-[1.02]">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-orange-100 flex items-center justify-center text-[var(--primary-start)]">
            <MessageCircle size={24} className="md:w-8 md:h-8" />
          </div>
          <div>
            <h3 className="font-bold text-[18px] text-[var(--text-primary)]">Talk to Nijo</h3>
            <p className="text-[14px] text-[var(--text-secondary)]">Vent or reflect without judgment</p>
          </div>
        </Link>

        <Link href="/mood" className="bg-white p-5 rounded-[24px] flex items-center md:flex-col md:text-center md:justify-center md:py-8 gap-4 shadow-sm border border-[var(--border-color)] transition-transform hover:scale-[1.02]">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
            <Smile size={24} className="md:w-8 md:h-8" />
          </div>
          <div>
            <h3 className="font-bold text-[18px] text-[var(--text-primary)]">Log Mood</h3>
            <p className="text-[14px] text-[var(--text-secondary)]">Track how you are feeling</p>
          </div>
        </Link>

        <Link href="/journal" className="bg-white p-5 rounded-[24px] flex items-center md:flex-col md:text-center md:justify-center md:py-8 gap-4 shadow-sm border border-[var(--border-color)] transition-transform hover:scale-[1.02]">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-100 flex items-center justify-center text-[var(--success)]">
            <Edit3 size={24} className="md:w-8 md:h-8" />
          </div>
          <div>
            <h3 className="font-bold text-[18px] text-[var(--text-primary)]">Journal</h3>
            <p className="text-[14px] text-[var(--text-secondary)]">Write down your thoughts privately</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
