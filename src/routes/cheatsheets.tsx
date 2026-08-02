import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookMarked, Copy, Check } from "lucide-react";
import { CHEATSHEETS } from "@/lib/cheatsheets";

export const Route = createFileRoute("/cheatsheets")({
  head: () => ({
    meta: [
      { title: "بايثونا — بطاقات مرجعية" },
      { name: "description", content: "بطاقات سريعة لكل أساسيات بايثون: متغيرات، حلقات، كلاسات، استثناءات، وأكثر." },
      { property: "og:title", content: "بايثونا — بطاقات مرجعية" },
      { property: "og:description", content: "مرجع مكثّف للجمل والأنماط الأكثر استخداماً في بايثون." },
    ],
  }),
  component: CheatsheetsPage,
});

function CheatsheetsPage() {
  const [active, setActive] = useState(CHEATSHEETS[0].id);
  const [copied, setCopied] = useState<string | null>(null);
  const current = CHEATSHEETS.find((c) => c.id === active)!;

  const copy = async (code: string, key: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-5">
      <header>
        <h1 className="flex items-center gap-2 text-2xl font-extrabold">
          <BookMarked className="h-6 w-6 text-primary" />
          بطاقات مرجعية
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          أمسك الأنماط الأكثر استخداماً في بايثون بنظرة واحدة.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {CHEATSHEETS.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
              active === c.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="me-1">{c.emoji}</span>
            {c.title}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {current.items.map((it) => {
          const key = `${current.id}-${it.label}`;
          return (
            <div key={it.label} className="rounded-2xl border border-border bg-card p-4 shadow-card">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold">{it.label}</h3>
                <button
                  onClick={() => copy(it.code, key)}
                  className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-secondary"
                  aria-label="نسخ"
                >
                  {copied === key ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
              <pre dir="ltr" className="mt-2 overflow-auto rounded-lg bg-black/40 p-3 font-mono text-xs leading-relaxed text-success">
{it.code}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
}
