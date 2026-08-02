import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, BookA, Sparkles } from "lucide-react";
import { GLOSSARY, GLOSSARY_CATEGORIES, type GlossaryTerm } from "@/lib/glossary";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "بايثونا — المعجم" },
      { name: "description", content: "معجم بايثون بالعربية: شرح أهم المصطلحات مع أمثلة عملية." },
      { property: "og:title", content: "معجم بايثون بالعربية — بايثونا" },
      { property: "og:description", content: "ابحث عن مصطلحات بايثون بسرعة: قائمة، قاموس، دالة، Decorator، GIL وأكثر." },
    ],
  }),
  component: GlossaryPage,
});

function GlossaryPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("الكل");

  const filtered = useMemo(() => {
    const norm = q.trim().toLowerCase();
    return GLOSSARY.filter((t) => {
      const okCat = cat === "الكل" || t.category === cat;
      if (!okCat) return false;
      if (!norm) return true;
      return (
        t.term.toLowerCase().includes(norm) ||
        t.en.toLowerCase().includes(norm) ||
        t.definition.toLowerCase().includes(norm)
      );
    });
  }, [q, cat]);

  const grouped = useMemo(() => {
    const map = new Map<string, GlossaryTerm[]>();
    for (const t of filtered) {
      const arr = map.get(t.category) ?? [];
      arr.push(t);
      map.set(t.category, arr);
    }
    return map;
  }, [filtered]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="flex items-center gap-2 text-2xl font-extrabold">
          <BookA className="h-6 w-6 text-primary" />
          المعجم
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {GLOSSARY.length} مصطلح بايثون مع شرح عربي مبسّط ومثال مختصر.
        </p>
      </header>

      <div className="sticky top-14 z-10 -mx-4 border-b border-border bg-background/85 px-4 py-3 backdrop-blur md:top-24">
        <label className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-card">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث عن مصطلح أو كلمة إنجليزية..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {q && (
            <button onClick={() => setQ("")} className="text-xs text-muted-foreground hover:text-foreground">
              مسح
            </button>
          )}
        </label>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["الكل", ...GLOSSARY_CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                cat === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          لا توجد نتائج مطابقة.
        </p>
      ) : (
        <div className="space-y-6">
          {Array.from(grouped.entries()).map(([category, terms]) => (
            <section key={category}>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-primary">
                <Sparkles className="h-3.5 w-3.5" /> {category}
                <span className="text-xs font-normal text-muted-foreground">({terms.length})</span>
              </h2>
              <ul className="space-y-2.5">
                {terms.map((t) => (
                  <li
                    key={t.term}
                    className="rounded-2xl border border-border bg-card p-4 shadow-card transition hover:border-primary/40"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-base font-extrabold">{t.term}</h3>
                      <code className="font-mono text-xs text-muted-foreground" dir="ltr">{t.en}</code>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{t.definition}</p>
                    {t.example && (
                      <pre
                        dir="ltr"
                        className="mt-2 overflow-x-auto rounded-lg bg-secondary/60 p-3 font-mono text-xs leading-relaxed"
                      >
                        <code>{t.example}</code>
                      </pre>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card/60 p-4 text-sm">
        <p className="text-muted-foreground">
          جرّب أي مصطلح مباشرة في{" "}
          <Link to="/playground" className="font-bold text-primary hover:underline">
            المختبر
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
