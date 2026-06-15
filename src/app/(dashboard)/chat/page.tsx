"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

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
    <div className="flex h-full items-center justify-center bg-[var(--surface-2)]">
      <div className="w-6 h-6 border-2 border-[var(--primary-start)] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function ChatUI({ initialMessages, router }: { initialMessages: AnyMessage[], router: any }) {
  const { messages, sendMessage, status } = useChat({
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
    <div className="flex flex-col h-full bg-[var(--surface-2)] max-w-3xl mx-auto w-full border-x border-[var(--border-color)]">
      <header className="flex items-center px-4 py-4 bg-white/50 backdrop-blur-md border-b border-[var(--border-color)] sticky top-0 z-10">
        <button onClick={() => router.back()} className="mr-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors md:hidden">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--primary-start)] to-[var(--primary-end)] p-[2px]">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <span className="text-[var(--primary-start)] font-bold text-lg">N</span>
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-lg text-[var(--text-primary)] leading-tight">Nijo</h1>
            <p className="text-xs text-[var(--success)] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-[var(--text-secondary)] opacity-60">
            <div className="w-16 h-16 rounded-full bg-[var(--border-color)] flex items-center justify-center mb-2">
              <span className="text-3xl">🌱</span>
            </div>
            <p>I'm here for you.<br/>What's on your mind today?</p>
          </div>
        )}
        
        {(messages as any[]).map((m: any) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[85%] px-5 py-3 rounded-3xl shadow-sm
              ${m.role === 'user' 
                ? 'bg-gradient-to-r from-[var(--primary-start)] to-[var(--primary-end)] text-white rounded-tr-sm' 
                : 'bg-white text-[var(--text-primary)] border border-[var(--border-color)] rounded-tl-sm'
              }
            `}>
              <p className="leading-relaxed text-[15px]">
                {typeof m.content === "string" ? m.content : JSON.stringify(m.content)}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white px-5 py-4 rounded-3xl rounded-tl-sm border border-[var(--border-color)] flex gap-1">
              <span className="w-2 h-2 bg-[var(--text-secondary)]/40 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-[var(--text-secondary)]/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-[var(--text-secondary)]/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-[var(--border-color)] flex gap-2 pb-safe">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Nijo..."
          className="flex-1 h-12 rounded-full px-5 border border-[var(--border-color)] bg-[var(--surface-1)] focus:outline-none focus:border-[var(--primary-start)] focus:ring-1 focus:ring-[var(--primary-start)] transition-all"
        />
        <Button type="submit" disabled={!input.trim() || isLoading} className="w-12 h-12 rounded-full p-0 flex items-center justify-center shadow-md">
          <Send size={20} className="ml-1" />
        </Button>
      </form>
    </div>
  );
}
