import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sparkles, Copy, Check, Play, Search, Lightbulb } from "lucide-react";
import { EXAMPLES, EXAMPLE_CATEGORIES, encodeCode } from "@/lib/examples";

export const Route = createFileRoute("/examples")({
  head: () => ({
    meta: [
      { title: "بايثونا — أمثلة حيّة" },
      {
        name: "description",
        content: "أكثر من ٢٥ مثالاً عملياً في بايثون مع الشرح والخرج المتوقّع، تفتح مباشرة في المختبر.",
      },
      { property: "og:title", content: "بايثونا — أمثلة بايثون حيّة" },
      { property: "og:description", content: "من f-string إلى asyncio و pandas: أمثلة جاهزة للتشغيل بنقرة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExamplesPage,
});

const LEVEL_STYLE: Record<string, string> = {
  "مبتدئ": "bg-success/15 text-success",
  "متوسط": "bg-xp/15 text-xp",
  "متقدم": "bg-accent/15 text-accent",
};

function ExamplesPage() {
  const [cat, setCat] = useState<string>("الكل");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(EXAMPLES[0].id);
  const [copied, setCopied] = useState<string | null>(null);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return EXAMPLES.filter(
      (e) =>
        (cat === "الكل" || e.category === cat) &&
        (!term ||
          e.title.toLowerCase().includes(term) ||
          e.desc.toLowerCase().includes(term) ||
          e.code.toLowerCase().includes(term)),
    );
  }, [cat, q]);

  const copy = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="space-y-5">
      <header className="overflow-hidden rounded-2xl gradient-hero p-5 shadow-glow">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold text-primary-foreground">
          <Sparkles className="h-6 w-6" />
          أمثلة حيّة
        </h1>
        <p className="mt-1 max-w-xl text-sm text-primary-foreground/85">
          {EXAMPLES.length} مثالاً حقيقياً مع الشرح والخرج المتوقّع — اضغط «جرّب» ليفتح المثال
          داخل المختبر ويعمل فوراً في متصفحك.
        </p>
      </header>

      <div className="relative">
        <Search className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحث: decorator، pandas، regex..."
          className="w-full rounded-xl border border-border bg-card py-2.5 pe-10 ps-3 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {["الكل", ...EXAMPLE_CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${
              cat === c ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((e) => {
          const expanded = open === e.id;
          return (
            <article key={e.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <button
                onClick={() => setOpen(expanded ? null : e.id)}
                className="flex w-full items-start gap-3 p-4 text-start"
              >
                <span className="text-2xl">{e.emoji}</span>
                <span className="flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold">{e.title}</h2>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${LEVEL_STYLE[e.level]}`}>
                      {e.level}
                    </span>
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">{e.desc}</p>
                </span>
              </button>

              {expanded && (
                <div className="space-y-3 border-t border-border p-4 pt-3 animate-fade-in">
                  <div className="relative">
                    <button
                      onClick={() => copy(e.code, e.id)}
                      aria-label="نسخ"
                      className="absolute end-2 top-2 grid h-7 w-7 place-items-center rounded-md bg-secondary/70 text-muted-foreground hover:text-foreground"
                    >
                      {copied === e.id ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                    <pre
                      dir="ltr"
                      className="max-h-80 overflow-auto rounded-xl bg-black/40 p-3 font-mono text-xs leading-relaxed text-foreground"
                    >
{e.code}
                    </pre>
                  </div>

                  <div>
                    <p className="mb-1 text-[11px] font-bold text-muted-foreground">الخرج المتوقّع</p>
                    <pre
                      dir="ltr"
                      className="max-h-60 overflow-auto rounded-xl border border-success/25 bg-success/5 p-3 font-mono text-xs leading-relaxed text-success"
                    >
{e.output}
                    </pre>
                  </div>

                  {e.tip && (
                    <p className="flex items-start gap-2 rounded-xl bg-xp/10 p-3 text-xs text-xp">
                      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
                      {e.tip}
                    </p>
                  )}

                  <Link
                    to="/playground"
                    search={{ code: encodeCode(e.code) }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground active:scale-[0.98]"
                  >
                    <Play className="h-4 w-4" />
                    جرّبه في المختبر
                  </Link>
                </div>
              )}
            </article>
          );
        })}

        {list.length === 0 && (
          <p className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            لا نتائج مطابقة. جرّب كلمة أخرى.
          </p>
        )}
      </div>
    </div>
  );
}
