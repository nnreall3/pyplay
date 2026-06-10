import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Lightbulb, Play } from "lucide-react";
import { PROJECTS } from "@/lib/projects";

export const Route = createFileRoute("/projects_/$id")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.id === params.id);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `بايثونا — ${loaderData.title}` },
            { name: "description", content: loaderData.summary },
            { property: "og:title", content: `${loaderData.title} — مشروع بايثون` },
            { property: "og:description", content: loaderData.summary },
            { property: "og:type", content: "article" },
          ],
        }
      : {},
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="py-12 text-center">
      <p className="text-muted-foreground">المشروع غير موجود.</p>
      <Link to="/projects" className="mt-4 inline-block font-bold text-primary">
        رجوع
      </Link>
    </div>
  ),
});

function ProjectDetail() {
  const p = Route.useLoaderData();

  // Pass the starter code to playground via URL hash (base64).
  const codeHash = typeof window !== "undefined"
    ? btoa(unescape(encodeURIComponent(p.starter)))
    : "";

  return (
    <div className="space-y-6">
      <Link to="/projects" className="inline-flex items-center gap-1 text-sm font-bold text-primary">
        <ArrowRight className="h-4 w-4" />
        كل المشاريع
      </Link>

      <header className="rounded-3xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-4xl">{p.emoji}</div>
            <h1 className="mt-2 text-2xl font-extrabold">{p.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold">{p.level}</span>
            <span className="rounded-full bg-xp/15 px-2.5 py-1 text-[11px] font-bold text-xp">+{p.xp} XP</span>
          </div>
        </div>
      </header>

      <section>
        <h2 className="mb-3 text-lg font-bold">الأهداف التعلّمية</h2>
        <ul className="space-y-2">
          {p.goals.map((g) => (
            <li key={g} className="flex items-start gap-2 rounded-xl border border-border bg-card/60 p-3 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">الخطوات</h2>
        <ol className="space-y-2">
          {p.steps.map((s, i) => (
            <li key={s.title} className="rounded-xl border border-border bg-card p-4 shadow-card">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-extrabold text-primary-foreground">
                  {i + 1}
                </span>
                <h3 className="font-bold">{s.title}</h3>
              </div>
              <p className="mt-2 pr-9 text-sm text-muted-foreground">{s.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      {p.hints && p.hints.length > 0 && (
        <section className="rounded-2xl border border-xp/30 bg-xp/5 p-4">
          <h3 className="flex items-center gap-2 font-bold text-xp">
            <Lightbulb className="h-4 w-4" />
            تلميحات
          </h3>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {p.hints.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-lg font-bold">كود البداية</h2>
        <pre dir="ltr" className="overflow-auto rounded-2xl border border-border bg-black/40 p-4 font-mono text-xs leading-relaxed text-success">
{p.starter}
        </pre>
        <Link
          to="/playground"
          search={{ code: codeHash }}
          className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-primary-foreground"
        >
          <Play className="h-4 w-4" />
          افتح في المختبر
        </Link>
      </section>
    </div>
  );
}
