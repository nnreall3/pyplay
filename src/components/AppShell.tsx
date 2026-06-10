import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, Terminal, User, Moon, Sun, Flame, Trophy, Rocket, BookA } from "lucide-react";
import type { ReactNode } from "react";
import { useTheme } from "@/lib/theme";
import { useProgress } from "@/lib/progress";

const NAV = [
  { to: "/", label: "الرئيسية", icon: Home },
  { to: "/modules", label: "المسارات", icon: BookOpen },
  { to: "/projects", label: "مشاريع", icon: Rocket },
  { to: "/playground", label: "المختبر", icon: Terminal },
  { to: "/glossary", label: "المعجم", icon: BookA },
  { to: "/profile", label: "حسابي", icon: User },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme();
  const { progress } = useProgress();
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg gradient-hero shadow-glow">
              <span className="font-mono text-sm font-bold text-primary-foreground">Py</span>
            </div>
            <span className="font-bold tracking-tight">بايثونا</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 rounded-full bg-card px-3 py-1.5 text-xs font-bold shadow-card sm:flex">
              <Flame className="h-3.5 w-3.5 text-streak" />
              <span>{progress.streak}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-card px-3 py-1.5 text-xs font-bold shadow-card">
              <Trophy className="h-3.5 w-3.5 text-xp" />
              <span>{progress.xp} XP</span>
            </div>
            <button
              onClick={toggle}
              aria-label="تبديل الوضع"
              className="grid h-9 w-9 place-items-center rounded-full bg-card text-foreground transition hover:bg-secondary"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* desktop nav */}
        <nav className="mx-auto hidden max-w-5xl gap-1 px-4 pb-2 md:flex">
          {NAV.map((n) => {
            const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-4 md:pb-10">{children}</main>

      {/* mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl safe-bottom md:hidden">
        <ul className="mx-auto flex max-w-5xl items-stretch justify-around">
          {NAV.map((n) => {
            const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
            return (
              <li key={n.to} className="flex-1">
                <Link
                  to={n.to}
                  className={`flex flex-col items-center gap-1 px-2 py-2.5 text-[11px] font-semibold ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <n.icon className={`h-5 w-5 ${active ? "scale-110" : ""} transition`} />
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
