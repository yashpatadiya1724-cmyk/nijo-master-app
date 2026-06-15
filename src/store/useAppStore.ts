import { create } from 'zustand';

interface AppState {
  language: string;
  setLanguage: (lang: string) => void;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: 'hin', // Default to Hinglish as recommended
  setLanguage: (lang) => set({ language: lang }),
  hasCompletedOnboarding: false,
  completeOnboarding: () => set({ hasCompletedOnboarding: true }),
}));
