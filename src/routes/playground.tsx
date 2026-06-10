import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play, Trash2, Code2, Loader2, Download, Share2, Save, Check, FileCode } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  code: z.string().optional(),
});

export const Route = createFileRoute("/playground")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "بايثونا — المختبر" },
      { name: "description", content: "اكتب ونفّذ كود بايثون حقيقي داخل المتصفح، مع حفظ ومشاركة." },
      { property: "og:title", content: "بايثونا — مختبر بايثون داخل المتصفح" },
      { property: "og:description", content: "Pyodide كامل: حلقات، كلاسات، numpy، pandas — كل شيء بدون تنصيب." },
    ],
  }),
  component: Playground,
});

// Load Pyodide lazily from CDN — full CPython compiled to WebAssembly.
const PYODIDE_VERSION = "0.26.4";
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

type Pyodide = {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
  loadPackagesFromImports: (code: string) => Promise<void>;
};

declare global {
  interface Window {
    loadPyodide?: (opts: { indexURL: string }) => Promise<Pyodide>;
  }
}

let pyodidePromise: Promise<Pyodide> | null = null;

function loadPyodide(): Promise<Pyodide> {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = (async () => {
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src = `${PYODIDE_URL}pyodide.js`;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("فشل تحميل Pyodide"));
        document.head.appendChild(s);
      });
    }
    return window.loadPyodide!({ indexURL: PYODIDE_URL });
  })();
  return pyodidePromise;
}

const SNIPPETS: { label: string; code: string }[] = [
  { label: "Hello", code: 'print("مرحبا بايثون")' },
  {
    label: "if / elif / else",
    code: "x = 7\nif x > 10:\n    print('كبير')\nelif x > 5:\n    print('متوسط')\nelse:\n    print('صغير')",
  },
  {
    label: "حلقة + دالة",
    code: "def square(n):\n    return n * n\n\nfor i in range(1, 6):\n    print(i, '->', square(i))",
  },
  {
    label: "قائمة + فلترة",
    code: "nums = [1,2,3,4,5,6,7,8,9,10]\nevens = [n for n in nums if n % 2 == 0]\nprint('الزوجية:', evens)\nprint('المجموع:', sum(evens))",
  },
  {
    label: "كلاس",
    code: "class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return f'{self.name} يصدر صوتاً'\n\nclass Dog(Animal):\n    def speak(self):\n        return f'{self.name} يقول هاو!'\n\nfor a in [Animal('قط'), Dog('ركس')]:\n    print(a.speak())",
  },
  {
    label: "Try/Except",
    code: "try:\n    x = int('abc')\nexcept ValueError as e:\n    print('خطأ:', e)\nfinally:\n    print('انتهى')",
  },
  {
    label: "Fibonacci",
    code: "def fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nprint(list(fib(10)))",
  },
  {
    label: "numpy",
    code: "import numpy as np\na = np.arange(1, 10)\nprint('mean:', a.mean())\nprint('sum:', a.sum())\nprint('matrix:\\n', a.reshape(3, 3))",
  },
];

const SAVED_KEY = "py-snippets-v1";

interface Saved {
  name: string;
  code: string;
  at: number;
}

function loadSaved(): Saved[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? (JSON.parse(raw) as Saved[]) : [];
  } catch {
    return [];
  }
}

function decodeShared(b64?: string): string | null {
  if (!b64) return null;
  try {
    return decodeURIComponent(escape(atob(b64)));
  } catch {
    return null;
  }
}

function Playground() {
  const search = Route.useSearch();
  const initial = decodeShared(search.code) ?? '# اكتب كود بايثون كاملاً هنا\nfor i in range(5):\n    print(i, i * i)';
  const [code, setCode] = useState(initial);
  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "running" | "ready">("idle");
  const [stdin, setStdin] = useState("");
  const [saved, setSaved] = useState<Saved[]>([]);
  const [shareMsg, setShareMsg] = useState<string | null>(null);
  const [savedOpen, setSavedOpen] = useState(false);
  const pyRef = useRef<Pyodide | null>(null);

  useEffect(() => { setSaved(loadSaved()); }, []);

  // Pre-warm pyodide after first interaction
  useEffect(() => {
    const t = setTimeout(() => { if (status === "idle") boot(); }, 1200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const boot = async () => {
    if (pyRef.current) return pyRef.current;
    setStatus("loading");
    try {
      const py = await loadPyodide();
      pyRef.current = py;
      setStatus("ready");
      return py;
    } catch (e) {
      setStatus("idle");
      setOutput(`فشل تحميل بايثون: ${(e as Error).message}`);
      throw e;
    }
  };

  const run = async () => {
    setOutput("");
    const py = await boot();
    setStatus("running");
    const chunks: string[] = [];
    py.setStdout({ batched: (s) => chunks.push(s) });
    py.setStderr({ batched: (s) => chunks.push(s) });
    const t0 = performance.now();
    try {
      const lines = stdin.split("\n");
      const inputJson = JSON.stringify(lines);
      await py.runPythonAsync(
        `import builtins, json\n__lines = json.loads(${JSON.stringify(inputJson)})\n__idx = [0]\ndef __input(prompt=''):\n    if __idx[0] >= len(__lines):\n        return ''\n    v = __lines[__idx[0]]\n    __idx[0] += 1\n    return v\nbuiltins.input = __input\n`,
      );
      try { await py.loadPackagesFromImports(code); } catch { /* best-effort */ }
      await py.runPythonAsync(code);
      const elapsed = Math.round(performance.now() - t0);
      const out = chunks.join("") || "(لا يوجد خرج)";
      setOutput(`${out}\n\n— تم التنفيذ في ${elapsed}ms`);
    } catch (e) {
      setOutput(`${chunks.join("")}\n${(e as Error).message}`);
    } finally {
      setStatus("ready");
    }
  };

  const download = () => {
    const blob = new Blob([code], { type: "text/x-python" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "main.py";
    a.click();
    URL.revokeObjectURL(url);
  };

  const share = async () => {
    const b64 = btoa(unescape(encodeURIComponent(code)));
    const url = `${window.location.origin}/playground?code=${encodeURIComponent(b64)}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareMsg("تم نسخ رابط المشاركة!");
    } catch {
      setShareMsg(url);
    }
    setTimeout(() => setShareMsg(null), 2500);
  };

  const saveSnippet = () => {
    const name = prompt("اسم القصاصة:", `snippet-${saved.length + 1}`);
    if (!name) return;
    const next = [{ name, code, at: Date.now() }, ...saved].slice(0, 20);
    setSaved(next);
    localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  };

  const removeSnippet = (name: string) => {
    const next = saved.filter((s) => s.name !== name);
    setSaved(next);
    localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  };

  const statusLabel =
    status === "loading" ? "...يتم تحميل بايثون"
    : status === "running" ? "...تشغيل"
    : status === "ready" ? "جاهز" : "غير محمّل";

  return (
    <div className="space-y-4">
      <header>
        <h1 className="flex items-center gap-2 text-2xl font-extrabold">
          <Code2 className="h-6 w-6 text-primary" />
          مختبر الكود
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          بايثون حقيقية تعمل داخل متصفحك (Pyodide) — تدعم الحلقات، الدوال،
          الكلاسات، الاستثناءات، numpy، pandas، وأكثر.
        </p>
        <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs">
          <span className={`h-2 w-2 rounded-full ${status === "ready" ? "bg-success" : status === "idle" ? "bg-muted-foreground" : "bg-xp animate-pulse"}`} />
          {statusLabel}
        </div>
      </header>

      <div className="flex flex-wrap gap-2">
        {SNIPPETS.map((s) => (
          <button
            key={s.label}
            onClick={() => setCode(s.code)}
            className="rounded-full bg-secondary px-3 py-1.5 text-xs font-bold hover:bg-secondary/70"
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-3 py-2">
          <span className="font-mono text-xs text-muted-foreground">main.py</span>
          <div className="flex items-center gap-1">
            <button onClick={saveSnippet} className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-secondary" aria-label="حفظ">
              <Save className="h-3.5 w-3.5" /> حفظ
            </button>
            <button onClick={share} className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-secondary" aria-label="مشاركة">
              <Share2 className="h-3.5 w-3.5" /> مشاركة
            </button>
            <button onClick={download} className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-secondary" aria-label="تنزيل">
              <Download className="h-3.5 w-3.5" /> تنزيل
            </button>
          </div>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            const ta = e.currentTarget;
            const { selectionStart: s, selectionEnd: en, value: v } = ta;
            const INDENT = "    ";
            // Tab / Shift+Tab — indent or dedent
            if (e.key === "Tab") {
              e.preventDefault();
              if (s !== en || e.shiftKey) {
                // Block (de)indent
                const lineStart = v.lastIndexOf("\n", s - 1) + 1;
                const before = v.slice(0, lineStart);
                const block = v.slice(lineStart, en);
                const after = v.slice(en);
                const newBlock = e.shiftKey
                  ? block.replace(/^( {1,4}|\t)/gm, "")
                  : block.replace(/^/gm, INDENT);
                const next = before + newBlock + after;
                setCode(next);
                const delta = newBlock.length - block.length;
                requestAnimationFrame(() => {
                  ta.selectionStart = s + (e.shiftKey ? 0 : INDENT.length);
                  ta.selectionEnd = en + delta;
                });
              } else {
                const next = v.slice(0, s) + INDENT + v.slice(en);
                setCode(next);
                requestAnimationFrame(() => {
                  ta.selectionStart = ta.selectionEnd = s + INDENT.length;
                });
              }
              return;
            }
            // Enter — preserve indent; add extra level after lines ending with ':'
            if (e.key === "Enter") {
              e.preventDefault();
              const lineStart = v.lastIndexOf("\n", s - 1) + 1;
              const curLine = v.slice(lineStart, s);
              const indentMatch = curLine.match(/^[ \t]*/);
              let indent = indentMatch ? indentMatch[0] : "";
              const trimmed = curLine.trimEnd();
              if (trimmed.endsWith(":")) indent += INDENT;
              const insert = "\n" + indent;
              const next = v.slice(0, s) + insert + v.slice(en);
              setCode(next);
              requestAnimationFrame(() => {
                ta.selectionStart = ta.selectionEnd = s + insert.length;
              });
              return;
            }
            // Backspace at start of indent — remove one indent level
            if (e.key === "Backspace" && s === en && s > 0) {
              const lineStart = v.lastIndexOf("\n", s - 1) + 1;
              const before = v.slice(lineStart, s);
              if (before.length > 0 && /^ +$/.test(before) && before.length % INDENT.length === 0) {
                e.preventDefault();
                const next = v.slice(0, s - INDENT.length) + v.slice(en);
                setCode(next);
                requestAnimationFrame(() => {
                  ta.selectionStart = ta.selectionEnd = s - INDENT.length;
                });
              }
            }
          }}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          dir="ltr"
          rows={14}
          className="block w-full resize-y bg-transparent p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
        />
      </div>

      {shareMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-success/40 bg-success/10 px-3 py-2 text-xs font-bold text-success">
          <Check className="h-4 w-4" />
          {shareMsg}
        </div>
      )}

      <details className="rounded-2xl border border-border bg-card/60 p-3 text-sm">
        <summary className="cursor-pointer font-bold">إدخالات input() (سطر لكل قراءة)</summary>
        <textarea
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
          dir="ltr"
          rows={3}
          placeholder="مثلاً:&#10;10&#10;Ali"
          className="mt-2 block w-full resize-y rounded-lg border border-border bg-background p-2 font-mono text-xs outline-none"
        />
      </details>

      {saved.length > 0 && (
        <details
          open={savedOpen}
          onToggle={(e) => setSavedOpen((e.target as HTMLDetailsElement).open)}
          className="rounded-2xl border border-border bg-card/60 p-3 text-sm"
        >
          <summary className="flex cursor-pointer items-center gap-2 font-bold">
            <FileCode className="h-4 w-4 text-primary" />
            قصاصاتي المحفوظة ({saved.length})
          </summary>
          <ul className="mt-2 space-y-1.5">
            {saved.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-2 rounded-lg bg-secondary/40 px-3 py-2">
                <button onClick={() => setCode(s.code)} className="flex-1 text-start text-xs font-bold hover:text-primary">
                  {s.name}
                </button>
                <button onClick={() => removeSnippet(s.name)} aria-label="حذف" className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}

      <div className="flex gap-2">
        <button
          onClick={run}
          disabled={status === "loading" || status === "running"}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-primary-foreground transition disabled:opacity-60 active:scale-[0.98]"
        >
          {status === "loading" || status === "running" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          {status === "loading" ? "تحميل..." : status === "running" ? "...تشغيل" : "تشغيل"}
        </button>
        <button
          onClick={() => { setCode(""); setOutput(""); }}
          className="grid h-12 w-12 place-items-center rounded-xl bg-secondary"
          aria-label="مسح"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-black/40 p-4 font-mono text-sm" dir="ltr">
        <p className="mb-2 text-xs text-muted-foreground">$ python main.py</p>
        <pre className="max-h-80 overflow-auto whitespace-pre-wrap text-success">{output || "اضغط تشغيل لرؤية الخرج."}</pre>
      </div>
    </div>
  );
}
