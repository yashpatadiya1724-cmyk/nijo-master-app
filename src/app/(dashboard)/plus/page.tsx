"use client";

import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function PlusPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-[#FFF0E5]">
      <header className="flex items-center px-4 py-4 bg-transparent">
        <button onClick={() => router.back()} className="mr-3 text-[#2C2622]">
          <ArrowLeft size={24} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 mb-6">
          <Sparkles className="w-10 h-10 text-orange-500" />
        </div>
        
        <h1 className="font-bold text-3xl text-[#2C2622] mb-2">Upgrade to Nijo Plus</h1>
        <p className="text-[#666666] mb-8 px-4">Deepen your reflection with unlimited voice chat and advanced AI insights.</p>

        <div className="bg-white rounded-[32px] p-6 w-full shadow-sm text-left mb-8 border border-orange-100">
          <h3 className="font-bold text-xl mb-4 text-[#2C2622]">What's included</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-[#2C2622]">Unlimited Voice Chat</p>
                <p className="text-sm text-[#666666]">Talk to Nijo naturally, just like a phone call.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-[#2C2622]">Advanced Journal Insights</p>
                <p className="text-sm text-[#666666]">Get weekly AI summaries identifying your emotional patterns.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-[#2C2622]">Priority Memory</p>
                <p className="text-sm text-[#666666]">Nijo remembers intricate details for much longer.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="w-full mt-auto mb-6">
          <Button className="w-full h-[60px] text-lg rounded-full font-bold shadow-lg shadow-orange-500/30">
            Start 7-Day Free Trial
          </Button>
          <p className="text-xs text-[#666666] mt-4 font-medium">₹299/month after trial. Cancel anytime.</p>
        </div>
      </div>
    </div>
  );
}
