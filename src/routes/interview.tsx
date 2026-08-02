import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessagesSquare, ChevronDown } from "lucide-react";
import { INTERVIEW } from "@/lib/interview";

export const Route = createFileRoute("/interview")({
  head: () => ({
    meta: [
      { title: "بايثونا — أسئلة المقابلات" },
      { name: "description", content: "أسئلة وأجوبة لمقابلات بايثون مصنّفة حسب المستوى مع أمثلة عملية." },
      { property: "og:title", content: "بايثونا — أسئلة مقابلات بايثون" },
      { property: "og:description", content: "تحضّر لمقابلة بايثون؟ ابدأ من هنا." },
    ],
  }),
  component: InterviewPage,
});

function InterviewPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="flex items-center gap-2 text-2xl font-extrabold">
          <MessagesSquare className="h-6 w-6 text-primary" />
          أسئلة المقابلات
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          أكثر الأسئلة شيوعاً في مقابلات بايثون، من الأساسيات إلى المتقدّم.
        </p>
      </header>

      {INTERVIEW.map((section) => (
        <section key={section.id}>
          <div className="mb-3 flex items-center gap-2">
            <h2 className="text-lg font-bold">{section.title}</h2>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-bold text-muted-foreground">
              {section.level}
            </span>
          </div>
          <div className="space-y-2">
            {section.questions.map((qa, i) => {
              const key = `${section.id}-${i}`;
              const isOpen = !!open[key];
              return (
                <div key={key} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                  <button
                    onClick={() => toggle(key)}
                    className="flex w-full items-center justify-between gap-3 p-4 text-start"
                  >
                    <span className="font-bold">{qa.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-border bg-secondary/30 p-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">{qa.a}</p>
                      {qa.code && (
                        <pre dir="ltr" className="mt-3 overflow-auto rounded-lg bg-black/40 p-3 font-mono text-xs text-success">
{qa.code}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
