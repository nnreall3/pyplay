import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Flame, Trophy, Sparkles, Target } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { ALL_LESSONS, MODULES, TOTAL_LESSONS, TOTAL_XP } from "@/lib/curriculum";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "بايبلاي — الرئيسية" },
      { name: "description", content: "تابع تقدمك في تعلّم بايثون واكسب XP يومياً." },
    ],
  }),
  component: Home,
});

function Home() {
  const { progress, isCompleted } = useProgress();
  const completedCount = Object.keys(progress.completed).length;
  const pct = Math.round((completedCount / TOTAL_LESSONS) * 100);
  const nextLesson = ALL_LESSONS.find((l) => !isCompleted(l.id)) ?? ALL_LESSONS[0];
  const nextModule = MODULES.find((m) => m.id === (nextLesson as { moduleId: string }).moduleId);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl gradient-hero p-6 text-primary-foreground shadow-glow">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold opacity-80">أهلاً بك 👋</p>
            <h1 className="mt-1 text-2xl font-extrabold leading-tight">رحلتك مع بايثون مستمرة</h1>
            <p className="mt-2 text-sm opacity-90">{completedCount} من {TOTAL_LESSONS} درس مكتمل</p>
          </div>
          <div className="grid place-items-center rounded-2xl bg-black/20 px-4 py-3 text-center">
            <Sparkles className="h-5 w-5" />
            <span className="mt-1 text-xs font-bold">{pct}%</span>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/25">
          <div className="h-full rounded-full bg-white transition-all" style={{ width: `${pct}%` }} />
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        <Stat icon={Trophy} label="نقاط الخبرة" value={`${progress.xp}`} sub={`من ${TOTAL_XP}`} color="text-xp" />
        <Stat icon={Flame} label="الأيام المتتالية" value={`${progress.streak}`} sub="يوم" color="text-streak" />
        <Stat icon={Target} label="الشارات" value={`${progress.badges.length}`} sub="مكتسبة" color="text-accent" />
      </section>

      <section>
        <Link
          to="/lesson/$id"
          params={{ id: nextLesson.id }}
          className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition hover:border-primary/50"
        >
          <div className="min-w-0">
            <p className="text-xs font-bold text-primary">{nextModule?.title}</p>
            <h2 className="mt-1 truncate text-lg font-bold">{nextLesson.title}</h2>
            <p className="mt-1 truncate text-sm text-muted-foreground">{nextLesson.intro}</p>
          </div>
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition group-hover:scale-110">
            <ArrowLeft className="h-5 w-5" />
          </div>
        </Link>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">المسارات</h2>
          <Link to="/modules" className="text-sm font-bold text-primary">عرض الكل</Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MODULES.slice(0, 4).map((m) => {
            const done = m.lessons.filter((l) => isCompleted(l.id)).length;
            const total = m.lessons.length;
            const p = Math.round((done / total) * 100);
            return (
              <Link
                key={m.id}
                to="/modules"
                hash={m.id}
                className="rounded-2xl border border-border bg-card p-4 shadow-card transition hover:border-primary/40"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground">{m.level}</span>
                  <span className="text-xs font-bold text-muted-foreground">{done}/{total}</span>
                </div>
                <h3 className="mt-2 font-bold">{m.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{m.description}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-primary transition-all" style={{ width: `${p}%` }} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Stat({
  icon: Icon, label, value, sub, color,
}: { icon: typeof Trophy; label: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-card">
      <Icon className={`mx-auto h-5 w-5 ${color}`} />
      <div className="mt-2 text-xl font-extrabold">{value}</div>
      <div className="text-[10px] font-bold text-muted-foreground">{label}</div>
      <div className="text-[10px] text-muted-foreground/70">{sub}</div>
    </div>
  );
}
