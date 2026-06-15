"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

const MOODS = [
  { score: 1, emoji: "😢", label: "Terrible" },
  { score: 2, emoji: "😕", label: "Bad" },
  { score: 3, emoji: "😐", label: "Okay" },
  { score: 4, emoji: "🙂", label: "Good" },
  { score: 5, emoji: "😁", label: "Great" },
];

const TAGS = ["Anxious", "Calm", "Stressed", "Happy", "Tired", "Energetic", "Lonely"];

export default function MoodPage() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleSave = async () => {
    if (!selectedMood) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: selectedMood, tags: selectedTags }),
      });
      if (res.ok) {
        router.push('/home');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--surface-2)]">
      <header className="flex items-center px-4 py-4 bg-transparent">
        <button onClick={() => router.back()} className="mr-3 text-[var(--text-secondary)] md:hidden">
          <ArrowLeft size={24} />
        </button>
      </header>

      <div className="flex-1 p-6 flex flex-col">
        <h1 className="font-bold text-3xl text-[var(--text-primary)] mb-2">How are you<br/>feeling?</h1>
        
        <div className="flex justify-between mt-10 mb-12 bg-white p-4 rounded-[40px] shadow-sm border border-[var(--border-color)]">
          {MOODS.map(m => (
            <div 
              key={m.score} 
              onClick={() => setSelectedMood(m.score)}
              className={`flex flex-col items-center cursor-pointer transition-transform ${selectedMood === m.score ? 'scale-125' : 'opacity-60 hover:opacity-100'}`}
            >
              <span className="text-3xl mb-1">{m.emoji}</span>
              {selectedMood === m.score && <span className="text-[10px] font-bold text-[var(--primary-start)]">{m.label}</span>}
            </div>
          ))}
        </div>

        {selectedMood && (
          <div className="animate-in fade-in slide-in-from-bottom-4">
            <h3 className="font-semibold text-[var(--text-secondary)] mb-3">What's making you feel this way?</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {TAGS.map(tag => (
                <div 
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium cursor-pointer transition-colors ${
                    selectedTags.includes(tag) 
                      ? 'bg-[var(--primary-start)] text-white border-[var(--primary-start)]' 
                      : 'bg-white text-[var(--text-primary)] border-[var(--border-color)]'
                  }`}
                >
                  {tag}
                </div>
              ))}
            </div>

            <Button onClick={handleSave} disabled={isLoading} className="w-full rounded-full h-14 text-lg shadow-md shadow-orange-500/20 mt-auto">
              {isLoading ? "Logging..." : "Log Mood"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
