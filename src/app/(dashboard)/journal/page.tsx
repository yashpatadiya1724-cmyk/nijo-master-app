"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Edit3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

type Journal = {
  id: string;
  content: string;
  createdAt: string;
};

export default function JournalPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const res = await fetch("/api/journal");
      if (res.ok) {
        const data = await res.json();
        setJournals(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!content.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        setContent("");
        fetchJournals();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--surface-2)]">
      <header className="flex items-center px-4 py-4 bg-white border-b border-[var(--border-color)]">
        <button onClick={() => router.back()} className="mr-3 text-[var(--text-secondary)] md:hidden">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-semibold text-xl text-[var(--text-primary)]">Journal</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white p-6 rounded-3xl border border-[var(--border-color)] shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-[var(--primary-start)]">
            <Edit3 size={20} />
            <h2 className="font-semibold">Write your thoughts</h2>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-40 bg-[var(--background)] p-4 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-[var(--primary-start)] resize-none"
            placeholder="How was your day?"
            disabled={isLoading}
          />
          <div className="mt-4 flex justify-end">
            <Button onClick={handleSave} disabled={!content.trim() || isLoading} className="rounded-full px-8">
              {isLoading ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-[var(--text-secondary)] mb-3 px-2">Recent Entries</h3>
          <div className="space-y-3">
            {journals.length === 0 ? (
              <p className="text-sm text-[var(--text-secondary)] px-2">No entries yet. Start writing above!</p>
            ) : (
              journals.map((journal) => (
                <div key={journal.id} className="bg-white p-4 rounded-2xl border border-[var(--border-color)] shadow-sm">
                  <p className="text-xs text-[var(--text-secondary)] mb-1">
                    {new Date(journal.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-[var(--text-primary)] whitespace-pre-wrap">{journal.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
