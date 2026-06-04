import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play, Trash2, Code2, Loader2, Download } from "lucide-react";

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "بايثونا — المختبر" },
      { name: "description", content: "اكتب ونفّذ كود بايثون حقيقي داخل المتصفح." },
    ],
  }),
  component: Playground,
});


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
  { label: "Hello", code: 'print("مرحبا ")' },
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
];

function Playground() {
  const [code, setCode] = useState('# اكتب كود بايثون كاملاً هنا\nfor i in range(5):\n    print(i, i * i)');
  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "running" | "ready">("idle");
  const [stdin, setStdin] = useState("");
  const pyRef = useRef<Pyodide | null>(null);

  // Pre-warm pyodide after first interaction
  useEffect(() => {
    const onIdle = () => {
      if (status === "idle") boot();
    };
    const t = setTimeout(onIdle, 1200);
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

    try {
     
      const lines = stdin.split("\n");
      const inputJson = JSON.stringify(lines);
      await py.runPythonAsync(
        `import builtins, json\n__lines = json.loads(${JSON.stringify(inputJson)})\n__idx = [0]\ndef __input(prompt=''):\n    if __idx[0] >= len(__lines):\n        return ''\n    v = __lines[__idx[0]]\n    __idx[0] += 1\n    return v\nbuiltins.input = __input\n`,
      );
     
      try {
        await py.loadPackagesFromImports(code);
      } catch {
        // best-effort
      }
      await py.runPythonAsync(code);
      const out = chunks.join("") || "(لا يوجد خرج)";
      setOutput(out);
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

  const statusLabel =
    status === "loading"
      ? "...يتم تحميل بايثون"
      : status === "running"
        ? "...تشغيل"
        : status === "ready"
          ? "جاهز"
          : "غير محمّل";

  return (
    <div className="space-y-4">
      <header>
        <h1 className="flex items-center gap-2 text-2xl font-extrabold">
          <Code2 className="h-6 w-6 text-primary" />
          مختبر الكود
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          بايثون حقيقية تعمل داخل متصفحك (Pyodide) — تدعم الحلقات، الدوال،
          الكلاسات، الاستثناءات، وحتى مكتبات مثل numpy و pandas.
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
          <button
            onClick={download}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-secondary"
            aria-label="تنزيل"
          >
            <Download className="h-3.5 w-3.5" />
            تنزيل
          </button>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          dir="ltr"
          rows={14}
          className="block w-full resize-y bg-transparent p-4 font-mono text-sm leading-relaxed text-foreground outline-none"
        />
      </div>

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
