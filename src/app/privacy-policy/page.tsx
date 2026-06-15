import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FCFAF8] flex flex-col items-center">
      <div className="w-full max-w-[400px] h-full min-h-screen bg-[#FCFAF8] flex flex-col relative md:border-x border-[#EBE8E3]">
        <header className="flex items-center px-6 py-6 sticky top-0 bg-[#FCFAF8]/90 backdrop-blur-sm border-b border-[#EBE8E3] z-10">
          <Link href="/onboarding" className="w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center border border-[#EBE8E3] mr-4 text-[#1C1A17]">
            <ArrowLeft size={20} strokeWidth={2} />
          </Link>
          <h1 className="font-bold text-xl text-[#1C1A17]">Privacy Policy</h1>
        </header>
        
        <div className="p-6 prose prose-sm text-[#847F78]">
          <h2 className="text-[#1C1A17] font-bold text-lg mb-2">1. Data Protection</h2>
          <p className="mb-6">We protect your data under India's Digital Personal Data Protection (DPDP) Act. All your journals and moods are fully encrypted and only visible to you.</p>
          
          <h2 className="text-[#1C1A17] font-bold text-lg mb-2">2. Data Usage</h2>
          <p className="mb-6">We never sell your personal information. Your chat history is used solely to provide a personalized experience and long-term memory for Nijo to better assist you.</p>
          
          <h2 className="text-[#1C1A17] font-bold text-lg mb-2">3. Your Rights</h2>
          <p className="mb-6">You have the right to export or delete your data at any time from the app settings. Once deleted, it cannot be recovered.</p>
          
          <p className="mt-8 text-sm text-[#A39E98]">Last updated: June 2026</p>
        </div>
      </div>
    </div>
  );
}
