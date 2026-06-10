import { createFileRoute, Link } from "@tanstack/react-router";
import { Rocket, ChevronLeft } from "lucide-react";
import { PROJECTS } from "@/lib/projects";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "بايثونا — مشاريع تطبيقية" },
      { name: "description", content: "ابنِ مشاريع بايثون حقيقية: آلة حاسبة، To-Do، تحليل CSV، نظام بنك وأكثر." },
      { property: "og:title", content: "بايثونا — مشاريع تطبيقية" },
      { property: "og:description", content: "تعلّم بالممارسة على ٦ مشاريع متدرّجة من المبتدئ إلى المتقدّم." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="flex items-center gap-2 text-2xl font-extrabold">
          <Rocket className="h-6 w-6 text-primary" />
          مشاريع تطبيقية
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          طبّق ما تعلّمته في مشاريع حقيقية. كل مشروع يفتح في المختبر مع كود بدائي وخطوات.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {PROJECTS.map((p) => (
          <Link
            key={p.id}
            to="/projects/$id"
            params={{ id: p.id }}
            className="group rounded-2xl border border-border bg-card p-4 shadow-card transition hover:border-primary/50"
          >
            <div className="flex items-start justify-between">
              <div className="text-3xl">{p.emoji}</div>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground">
                {p.level}
              </span>
            </div>
            <h2 className="mt-3 font-bold">{p.title}</h2>
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.summary}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="rounded-full bg-xp/15 px-2 py-0.5 text-[11px] font-bold text-xp">
                +{p.xp} XP
              </span>
              <ChevronLeft className="h-4 w-4 text-muted-foreground transition group-hover:-translate-x-1 group-hover:text-primary" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
