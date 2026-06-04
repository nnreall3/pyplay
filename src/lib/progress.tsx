import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ALL_LESSONS } from "./curriculum";

interface Progress {
  completed: Record<string, boolean>;
  xp: number;
  streak: number;
  lastDay: string | null;
  badges: string[];
}

const STORAGE_KEY = "py-progress-v1";

const DEFAULT: Progress = {
  completed: {},
  xp: 0,
  streak: 0,
  lastDay: null,
  badges: [],
};

interface Ctx {
  progress: Progress;
  isCompleted: (id: string) => boolean;
  isUnlocked: (id: string) => boolean;
  completeLesson: (id: string, xp: number) => string[]; // returns newly earned badges
  reset: () => void;
}

const ProgressContext = createContext<Ctx | null>(null);

function loadProgress(): Progress {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string) {
  const da = new Date(a).getTime();
  const db = new Date(b).getTime();
  return Math.round((db - da) / 86400000);
}

const BADGE_RULES: { id: string; label: string; check: (p: Progress) => boolean }[] = [
  { id: "first-step", label: "الخطوة الأولى", check: (p) => Object.keys(p.completed).length >= 1 },
  { id: "five-lessons", label: "خمسة دروس", check: (p) => Object.keys(p.completed).length >= 5 },
  { id: "ten-lessons", label: "عشرة دروس", check: (p) => Object.keys(p.completed).length >= 10 },
  { id: "xp-100", label: "‎100 XP", check: (p) => p.xp >= 100 },
  { id: "xp-500", label: "‎500 XP", check: (p) => p.xp >= 500 },
  { id: "streak-3", label: "‎3 أيام متتالية", check: (p) => p.streak >= 3 },
  { id: "streak-7", label: "أسبوع كامل", check: (p) => p.streak >= 7 },
];

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(DEFAULT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress, mounted]);

  const isCompleted = (id: string) => !!progress.completed[id];

  const isUnlocked = (id: string) => {
    const idx = ALL_LESSONS.findIndex((l) => l.id === id);
    if (idx <= 0) return true;
    const prev = ALL_LESSONS[idx - 1];
    return !!progress.completed[prev.id];
  };

  const completeLesson = (id: string, xp: number) => {
    const newBadges: string[] = [];
    setProgress((p) => {
      if (p.completed[id]) return p;
      const today = todayStr();
      let streak = p.streak;
      if (!p.lastDay) streak = 1;
      else {
        const d = daysBetween(p.lastDay, today);
        if (d === 0) streak = p.streak || 1;
        else if (d === 1) streak = p.streak + 1;
        else streak = 1;
      }
      const next: Progress = {
        ...p,
        completed: { ...p.completed, [id]: true },
        xp: p.xp + xp,
        streak,
        lastDay: today,
      };
      const earned: string[] = [];
      for (const b of BADGE_RULES) {
        if (b.check(next) && !next.badges.includes(b.id)) {
          earned.push(b.id);
        }
      }
      if (earned.length) {
        next.badges = [...next.badges, ...earned];
        newBadges.push(...earned);
      }
      return next;
    });
    return newBadges;
  };

  const reset = () => setProgress(DEFAULT);

  return (
    <ProgressContext.Provider value={{ progress, isCompleted, isUnlocked, completeLesson, reset }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be inside ProgressProvider");
  return ctx;
}

export function getBadgeLabel(id: string) {
  return BADGE_RULES.find((b) => b.id === id)?.label ?? id;
}

export const BADGES = BADGE_RULES;
