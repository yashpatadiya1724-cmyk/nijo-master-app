"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { ArrowLeft, MoreHorizontal, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type AnyMessage = any;

export default function ChatPage() {
  const router = useRouter();
  const [initialMessages, setInitialMessages] = useState<AnyMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/chat/history')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setInitialMessages(data);
        }
        setIsLoaded(true);
      })
      .catch(err => {
        console.error(err);
        setIsLoaded(true);
      });
  }, []);

  return isLoaded ? <ChatUI initialMessages={initialMessages} router={router} /> : (
    <div className="flex h-full items-center justify-center bg-[var(--background)]">
      <div className="w-6 h-6 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function ChatUI({ initialMessages, router }: { initialMessages: AnyMessage[], router: any }) {
  const { messages, sendMessage, status, append } = useChat({
    initialMessages: initialMessages as any,
  } as any);
  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ role: "user", content: input } as any);
    setInput("");
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[var(--background)] max-w-md mx-auto w-full relative pb-16 md:pb-0 font-sans">
      <header className="flex items-center justify-between px-4 py-4 bg-[var(--background)] sticky top-0 z-20">
        <button onClick={() => router.back()} className="text-[var(--text-secondary)] p-2">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <div className="w-4 h-4 rounded-full bg-[var(--companion)]" />
          </div>
          <div>
            <h1 className="font-semibold text-lg text-[var(--text-primary)] leading-tight">Nijo</h1>
            <p className="text-xs text-[var(--companion)] flex items-center gap-1 font-medium">
              <span className="w-2 h-2 rounded-full bg-[var(--companion)]"></span>
              here with you
            </p>
          </div>
        </div>
        <button className="text-[var(--text-secondary)] p-2">
          <MoreHorizontal size={24} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <AnimatePresence>
          {(messages as any[]).map((m: any) => (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              key={m.id} 
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className={`
                max-w-[85%] px-5 py-3 shadow-sm
                ${m.role === 'user' 
                  ? 'bg-[var(--primary)] text-white rounded-[24px] rounded-br-sm' 
                  : 'bg-[var(--surface-warm)] text-[var(--text-primary)] rounded-[24px] rounded-bl-sm'
                }
              `}>
                <p className="leading-relaxed text-[16px]">
                  {typeof m.content === "string" ? m.content : JSON.stringify(m.content)}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-[var(--surface-warm)] px-5 py-4 rounded-[24px] rounded-bl-sm flex gap-1.5 shadow-sm">
              <span className="w-2 h-2 bg-[var(--companion)] rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-[var(--companion)] rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-[var(--companion)] rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-[var(--background)] z-10 relative">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Nijo..."
            className="flex-1 h-12 rounded-[24px] px-5 border border-[var(--border-color)] bg-white text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all placeholder:text-[var(--text-secondary)] shadow-sm"
          />
          <motion.button 
            type="submit" 
            disabled={!input.trim() || isLoading} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--primary)] text-white disabled:opacity-50 disabled:bg-[var(--border-color)] transition-colors shadow-sm"
          >
            <Send size={20} className="ml-0.5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
}
