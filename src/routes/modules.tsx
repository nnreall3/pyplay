import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Lock, Play } from "lucide-react";
import { MODULES } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/modules")({
  head: () => ({
    meta: [
      { title: "بايثونا — المسارات" },
      { name: "description", content: "كل مسارات تعلّم بايثون من الأساسيات إلى الاحتراف." },
    ],
  }),
  component: ModulesPage,
});

function ModulesPage() {
  const { isCompleted, isUnlocked } = useProgress();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold">خريطة الطريق</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          أكمل كل درس لفتح الذي يليه واكسب نقاط الخبرة.
        </p>
      </header>

      <div className="space-y-8">
        {MODULES.map((m, midx) => (
          <section key={m.id} id={m.id} className="scroll-mt-24">
            <div className="mb-3 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-hero text-primary-foreground shadow-glow">
                <span className="text-sm font-extrabold">{midx + 1}</span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-bold">{m.title}</h2>
                <p className="text-xs text-muted-foreground">{m.description}</p>
              </div>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
                {m.level}
              </span>
            </div>

            <ol className="space-y-2">
              {m.lessons.map((l, i) => {
                const done = isCompleted(l.id);
                const unlocked = isUnlocked(l.id);
                return (
                  <li key={l.id}>
                    {unlocked ? (
                    <Link
                      to="/lesson/$id"
                      params={{ id: l.id }}
                      className={`flex items-center gap-3 rounded-2xl border p-4 transition ${
                        done
                          ? "border-success/40 bg-success/5"
                          : "border-border bg-card shadow-card hover:border-primary/50"
                      }`}
                    >
                      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                        done ? "bg-success text-success-foreground"
                          : unlocked ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {done ? <Check className="h-5 w-5" />
                          : unlocked ? <Play className="h-4 w-4" />
                          : <Lock className="h-4 w-4" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-muted-foreground">{i + 1}.</span>
                          <h3 className="truncate font-bold">{l.title}</h3>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">{l.intro}</p>
                      </div>
                      <div className="shrink-0 rounded-full bg-xp/15 px-2.5 py-1 text-[11px] font-bold text-xp">
                        +{l.xp} XP
                      </div>
                    </Link>
                    ) : (
                      <div
                        aria-disabled="true"
                        className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card/40 p-4 opacity-60"
                      >
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                          <Lock className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-muted-foreground">{i + 1}.</span>
                            <h3 className="truncate font-bold">{l.title}</h3>
                          </div>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">أكمل الدرس السابق لفتح هذا الدرس</p>
                        </div>
                        <div className="shrink-0 rounded-full bg-xp/15 px-2.5 py-1 text-[11px] font-bold text-xp">
                          +{l.xp} XP
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
