import { createFileRoute } from "@tanstack/react-router";
import { Award, Flame, Trophy, RotateCcw } from "lucide-react";
import { BADGES, useProgress, getBadgeLabel } from "@/lib/progress";
import { TOTAL_LESSONS, TOTAL_XP } from "@/lib/curriculum";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "بايبلاي — حسابي" },
      { name: "description", content: "إنجازاتك، شاراتك، وتقدمك في تعلّم بايثون." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { progress, reset } = useProgress();
  const completed = Object.keys(progress.completed).length;
  const lvl = Math.floor(progress.xp / 100) + 1;
  const xpInLvl = progress.xp % 100;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl gradient-hero p-6 text-primary-foreground shadow-glow">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-black/25 text-2xl font-extrabold">
            {lvl}
          </div>
          <div>
            <p className="text-xs font-bold opacity-80">المستوى</p>
            <h1 className="text-2xl font-extrabold">Pythonista #{lvl}</h1>
            <p className="text-sm opacity-90">{progress.xp} / {TOTAL_XP} XP</p>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/25">
          <div className="h-full bg-white" style={{ width: `${xpInLvl}%` }} />
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        <Mini icon={Trophy} v={`${progress.xp}`} l="XP" />
        <Mini icon={Flame} v={`${progress.streak}`} l="متتالية" />
        <Mini icon={Award} v={`${completed}/${TOTAL_LESSONS}`} l="دروس" />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">الشارات</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {BADGES.map((b) => {
            const owned = progress.badges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`rounded-2xl border p-4 text-center transition ${
                  owned
                    ? "border-xp/40 bg-xp/10 shadow-card"
                    : "border-border bg-card/40 opacity-60"
                }`}
              >
                <div className={`mx-auto grid h-12 w-12 place-items-center rounded-full text-2xl ${owned ? "bg-xp text-warning-foreground" : "bg-muted"}`}>
                  {owned ? "🏆" : "🔒"}
                </div>
                <p className="mt-2 text-xs font-bold">{getBadgeLabel(b.id)}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
        <h3 className="font-bold text-destructive">إعادة التقدم</h3>
        <p className="mt-1 text-xs text-muted-foreground">سيتم حذف كل XP والشارات والدروس المكتملة.</p>
        <button
          onClick={() => { if (confirm("هل أنت متأكد؟")) reset(); }}
          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-destructive px-4 py-2 text-sm font-bold text-destructive-foreground"
        >
          <RotateCcw className="h-4 w-4" />
          إعادة تعيين
        </button>
      </section>
    </div>
  );
}

function Mini({ icon: Icon, v, l }: { icon: typeof Trophy; v: string; l: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-card">
      <Icon className="mx-auto h-5 w-5 text-primary" />
      <div className="mt-2 text-lg font-extrabold">{v}</div>
      <div className="text-[10px] font-bold text-muted-foreground">{l}</div>
    </div>
  );
}
