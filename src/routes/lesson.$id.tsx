import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Lock, Sparkles, Lightbulb, AlertTriangle, BookOpen } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getLesson, getNextLessonId, getModule } from "@/lib/curriculum";
import { useProgress, getBadgeLabel } from "@/lib/progress";
import { Challenge } from "@/components/Challenge";

export const Route = createFileRoute("/lesson/$id")({
  head: ({ params }) => {
    const l = getLesson(params.id);
    return {
      meta: [
        { title: l ? `${l.title} — بايثونا` : "درس — بايثونا" },
        { name: "description", content: l?.intro ?? "درس تفاعلي لتعلّم بايثون." },
      ],
    };
  },
  component: LessonPage,
});

function LessonPage() {
  const { id } = Route.useParams();
  const router = useRouter();
  const navigate = useNavigate();
  const lesson = getLesson(id);
  const { isUnlocked, isCompleted, completeLesson } = useProgress();
  const [solvedIdx, setSolvedIdx] = useState<Set<number>>(new Set());
  const [activeIdx, setActiveIdx] = useState(0);
  const [earned, setEarned] = useState<string[]>([]);
  const [justFinished, setJustFinished] = useState(false);

  useEffect(() => {
    setSolvedIdx(new Set());
    setActiveIdx(0);
    setEarned([]);
    setJustFinished(false);
  }, [id]);

  const challenges = useMemo(() => lesson?.challenges ?? [], [lesson]);

  if (!lesson) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">الدرس غير موجود.</p>
        <Link to="/modules" className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2 font-bold text-primary-foreground">
          عودة للمسارات
        </Link>
      </div>
    );
  }

  const mod = getModule((lesson as { moduleId: string }).moduleId);
  const nextId = getNextLessonId(lesson.id);
  const alreadyDone = isCompleted(lesson.id);

  if (!isUnlocked(lesson.id)) {
    return (
      <div className="grid place-items-center py-20 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-muted">
          <Lock className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="mt-4 text-xl font-bold">هذا الدرس مقفل</h1>
        <p className="mt-1 text-sm text-muted-foreground">أكمل الدرس السابق لفتحه.</p>
        <button onClick={() => router.history.back()} className="mt-6 rounded-xl bg-primary px-4 py-2 font-bold text-primary-foreground">
          العودة
        </button>
      </div>
    );
  }

  const allSolved = solvedIdx.size === challenges.length || alreadyDone;

  const onChallengeSolved = (idx: number) => {
    setSolvedIdx((prev) => {
      const next = new Set(prev);
      next.add(idx);
      // Auto-advance to next unsolved
      const nextUnsolved = challenges.findIndex((_, i) => !next.has(i));
      if (nextUnsolved !== -1) setActiveIdx(nextUnsolved);

      // Finalize lesson completion when all done
      if (next.size === challenges.length && !alreadyDone && !justFinished) {
        const e = completeLesson(lesson.id, lesson.xp);
        setEarned(e);
        setJustFinished(true);
      }
      return next;
    });
  };

  return (
    <article className="mx-auto max-w-2xl space-y-6">
      <header>
        <Link to="/modules" className="text-xs font-bold text-primary">
          ← {mod?.title}
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold">{lesson.title}</h1>
        <p className="mt-2 leading-relaxed text-muted-foreground">{lesson.intro}</p>
      </header>

      {lesson.sections?.map((s, i) => (
        <section key={i} className="rounded-2xl border border-border bg-card/60 p-4">
          <h2 className="mb-2 flex items-center gap-2 text-sm font-bold text-primary">
            <BookOpen className="h-4 w-4" /> {s.heading}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{s.body}</p>
        </section>
      ))}

      {lesson.code && (
        <div>
          <p className="mb-1.5 text-xs font-bold text-muted-foreground">مثال</p>
          <pre className="overflow-x-auto rounded-2xl bg-card p-4 font-mono text-sm leading-relaxed shadow-card" dir="ltr">
            <code>{lesson.code}</code>
          </pre>
        </div>
      )}

      {lesson.examples && lesson.examples.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground">أمثلة إضافية</p>
          {lesson.examples.map((ex, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed" dir="ltr">
                <code>{ex.code}</code>
              </pre>
              {ex.caption && (
                <p className="border-t border-border bg-secondary/40 px-4 py-2 text-xs text-muted-foreground">
                  {ex.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {lesson.notes && lesson.notes.length > 0 && (
        <ul className="space-y-2 rounded-2xl border border-border bg-card/60 p-4">
          {lesson.notes.map((n, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {n}
            </li>
          ))}
        </ul>
      )}

      {lesson.tip && (
        <div className="flex gap-3 rounded-2xl border border-xp/30 bg-xp/10 p-4 text-sm">
          <Lightbulb className="h-5 w-5 shrink-0 text-xp" />
          <p>{lesson.tip}</p>
        </div>
      )}

      {lesson.pitfalls && lesson.pitfalls.length > 0 && (
        <div className="space-y-2 rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
          <p className="flex items-center gap-2 text-sm font-bold text-destructive">
            <AlertTriangle className="h-4 w-4" /> أخطاء شائعة
          </p>
          <ul className="space-y-1.5 text-sm">
            {lesson.pitfalls.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      <section className="rounded-3xl border-2 border-primary/30 bg-card p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold">🎮 التحديات ({challenges.length})</h2>
          <span className="rounded-full bg-xp/15 px-2.5 py-1 text-[11px] font-bold text-xp">+{lesson.xp} XP</span>
        </div>

        {/* Challenge tabs / progress dots */}
        <div className="mb-4 flex flex-wrap gap-2">
          {challenges.map((_, i) => {
            const solved = solvedIdx.has(i) || alreadyDone;
            const active = i === activeIdx;
            return (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`grid h-9 min-w-9 place-items-center rounded-full px-3 text-xs font-bold transition ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : solved
                    ? "bg-success/20 text-success"
                    : "bg-secondary text-foreground"
                }`}
              >
                {solved ? "✓" : i + 1}
              </button>
            );
          })}
        </div>

        {challenges[activeIdx] && (
          <Challenge
            key={`${lesson.id}-${activeIdx}`}
            challenge={challenges[activeIdx]}
            onSolved={() => onChallengeSolved(activeIdx)}
          />
        )}
      </section>

      {allSolved && (
        <div className="space-y-4 rounded-3xl gradient-hero p-6 text-primary-foreground shadow-glow">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <h3 className="text-lg font-extrabold">رائع! أكملت كل التحديات</h3>
          </div>
          {earned.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {earned.map((b) => (
                <span key={b} className="rounded-full bg-black/25 px-3 py-1 text-xs font-bold">
                  🏆 شارة جديدة: {getBadgeLabel(b)}
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            {nextId ? (
              <button
                onClick={() => navigate({ to: "/lesson/$id", params: { id: nextId } })}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3 font-bold text-primary"
              >
                الدرس التالي
                <ArrowLeft className="h-4 w-4" />
              </button>
            ) : (
              <Link to="/modules" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3 font-bold text-primary">
                عودة للمسارات
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
