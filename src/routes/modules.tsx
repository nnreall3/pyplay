import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Lock, Play, Flag, MapPin, Trophy } from "lucide-react";
import { MODULES } from "@/lib/curriculum";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/modules")({
  head: () => ({
    meta: [
      { title: "بايثونا — خريطة الرحلة" },
      { name: "description", content: "تنقّل بين دروس بايثون على شكل رحلة تفاعلية: أكمل المحطات، افتح ما بعدها، واكسب نقاط الخبرة." },
      { property: "og:title", content: "بايثونا — خريطة الرحلة" },
      { property: "og:description", content: "خريطة تفاعلية لدروس بايثون من الأساسيات إلى الاحتراف." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ModulesPage,
});

function ModulesPage() {
  const { isCompleted, isUnlocked, progress } = useProgress();
  const totalLessons = MODULES.reduce((n, m) => n + m.lessons.length, 0);
  const doneLessons = MODULES.reduce((n, m) => n + m.lessons.filter((l) => isCompleted(l.id)).length, 0);
  const overall = Math.round((doneLessons / totalLessons) * 100);

  return (
    <div className="space-y-8">
      <header className="overflow-hidden rounded-3xl gradient-hero p-6 text-primary-foreground shadow-glow">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold opacity-80">خريطة الرحلة</p>
            <h1 className="mt-1 text-2xl font-extrabold">اتبع المسار محطة بمحطة</h1>
            <p className="mt-2 text-sm opacity-90">
              {doneLessons} من {totalLessons} محطة مكتملة · {progress.xp} XP
            </p>
          </div>
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-black/20 text-center">
            <Trophy className="h-5 w-5" />
            <span className="mt-1 text-xs font-extrabold">{overall}%</span>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/25">
          <div className="h-full rounded-full bg-white transition-all duration-700" style={{ width: `${overall}%` }} />
        </div>
      </header>

      <div className="space-y-10">
        {MODULES.map((m, midx) => {
          const done = m.lessons.filter((l) => isCompleted(l.id)).length;
          const pct = Math.round((done / m.lessons.length) * 100);
          return (
            <section key={m.id} id={m.id} className="scroll-mt-24">
              <div className="mb-5 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl gradient-hero text-primary-foreground shadow-glow">
                  <span className="text-sm font-extrabold">{midx + 1}</span>
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-bold">{m.title}</h2>
                  <p className="truncate text-xs text-muted-foreground">{m.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[11px] font-bold text-muted-foreground">{done}/{m.lessons.length}</span>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
                  {m.level}
                </span>
              </div>

              <Trail>
                {m.lessons.map((l, i) => (
                  <TrailNode
                    key={l.id}
                    index={i}
                    number={i + 1}
                    title={l.title}
                    intro={l.intro}
                    xp={l.xp}
                    id={l.id}
                    done={isCompleted(l.id)}
                    unlocked={isUnlocked(l.id)}
                    last={i === m.lessons.length - 1}
                  />
                ))}
              </Trail>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function Trail({ children }: { children: React.ReactNode }) {
  return (
    <ol className="relative">
      {/* the path line: near the start edge on mobile, centered on desktop */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 top-6 w-[3px] -translate-x-1/2 rounded-full bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0_10px,transparent_10px_20px)] right-[22px] md:right-1/2"
      />
      <div className="space-y-4">{children}</div>
    </ol>
  );
}

function TrailNode({
  index, number, title, intro, xp, id, done, unlocked, last,
}: {
  index: number; number: number; title: string; intro: string; xp: number;
  id: string; done: boolean; unlocked: boolean; last: boolean;
}) {
  const side = index % 2 === 0; // true = card on the start side (desktop)
  const Icon = done ? Check : unlocked ? Play : Lock;

  const marker = (
    <span
      aria-hidden
      className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border-4 border-background transition duration-300 ${
        done
          ? "bg-success text-success-foreground shadow-glow"
          : unlocked
            ? "gradient-hero text-primary-foreground shadow-glow group-hover:scale-110"
            : "bg-muted text-muted-foreground"
      }`}
    >
      <Icon className="h-5 w-5" />
      {unlocked && !done && (
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
      )}
    </span>
  );

  const card = (
    <div
      className={`min-w-0 flex-1 rounded-2xl border p-4 transition duration-300 ${
        done
          ? "border-success/40 bg-success/5"
          : unlocked
            ? "border-border bg-card shadow-card group-hover:-translate-y-0.5 group-hover:border-primary/60"
            : "border-border/50 bg-card/40 opacity-70"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-extrabold text-muted-foreground">
          محطة {number}
        </span>
        {last && <Flag className="h-3.5 w-3.5 text-xp" aria-hidden />}
        <span className="ms-auto shrink-0 rounded-full bg-xp/15 px-2 py-0.5 text-[11px] font-bold text-xp">+{xp} XP</span>
      </div>
      <h3 className="mt-1.5 truncate font-bold">{title}</h3>
      <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
        {unlocked ? intro : "أكمل المحطة السابقة لفتح هذه المحطة"}
      </p>
      {done && (
        <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-success">
          <Check className="h-3 w-3" /> مكتمل
        </span>
      )}
    </div>
  );

  const rowClass =
    "group flex items-center gap-3 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-6";

  const inner = (
    <>
      {/* desktop: card on one side, spacer on the other */}
      <div className={`hidden md:block ${side ? "md:order-1" : "md:order-3"}`}>{card}</div>
      <div className="hidden md:order-2 md:flex md:justify-center">{marker}</div>
      <div className={`hidden md:block ${side ? "md:order-3" : "md:order-1"}`} aria-hidden />


      {/* mobile / tablet: marker then card */}
      <div className="flex w-full items-center gap-3 md:hidden">
        {marker}
        {card}
      </div>
    </>
  );

  return (
    <li>
      {unlocked ? (
        <Link
          to="/lesson/$id"
          params={{ id }}
          aria-label={`المحطة ${number}: ${title}${done ? " — مكتملة" : ""}`}
          className={`${rowClass} rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
        >
          {inner}
        </Link>
      ) : (
        <div
          aria-disabled="true"
          aria-label={`المحطة ${number}: ${title} — مقفلة`}
          className={rowClass}
        >
          {inner}
        </div>
      )}
    </li>
  );
}
