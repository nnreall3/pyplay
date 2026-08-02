import { useMemo, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import type { Challenge as Ch } from "@/lib/curriculum";

interface Props {
  challenge: Ch;
  onSolved: () => void;
}

export function Challenge({ challenge, onSolved }: Props) {
  if (challenge.type === "arrange") return <Arrange ch={challenge} onSolved={onSolved} />;
  if (challenge.type === "fill") return <Fill ch={challenge} onSolved={onSolved} />;
  return <Choice ch={challenge} onSolved={onSolved} />;
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ResultBanner({ status }: { status: "ok" | "bad" | null }) {
  if (!status) return null;
  return (
    <div
      className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold ${
        status === "ok"
          ? "bg-success/15 text-success"
          : "bg-destructive/15 text-destructive"
      }`}
    >
      {status === "ok" ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
      {status === "ok" ? "أحسنت! إجابة صحيحة" : "ليست صحيحة، حاول مرة أخرى"}
    </div>
  );
}

function Arrange({ ch, onSolved }: { ch: Ch; onSolved: () => void }) {
  const correct = ch.blocks ?? [];
  const [pool, setPool] = useState(() => shuffle(correct.map((b, i) => ({ b, i }))));
  const [picked, setPicked] = useState<{ b: string; i: number }[]>([]);
  const [status, setStatus] = useState<"ok" | "bad" | null>(null);

  const reset = () => {
    setPool(shuffle(correct.map((b, i) => ({ b, i }))));
    setPicked([]);
    setStatus(null);
  };

  const check = () => {
    const ok = picked.map((p) => p.b).join("\n") === correct.join("\n");
    setStatus(ok ? "ok" : "bad");
    if (ok) setTimeout(onSolved, 600);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{ch.prompt}</p>

      <div className="min-h-[120px] rounded-2xl border-2 border-dashed border-border bg-card/50 p-3">
        {picked.length === 0 ? (
          <p className="grid h-full place-items-center py-6 text-center text-xs text-muted-foreground">
            انقر على الأسطر بالترتيب الصحيح
          </p>
        ) : (
          <ol className="space-y-1.5 font-mono text-sm" dir="ltr">
            {picked.map((p, idx) => (
              <li key={idx}>
                <button
                  onClick={() => {
                    setPicked(picked.filter((_, i) => i !== idx));
                    setPool([...pool, p]);
                    setStatus(null);
                  }}
                  className="w-full rounded-lg bg-primary/15 px-3 py-2 text-start text-primary transition hover:bg-primary/25"
                >
                  {p.b}
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="flex flex-wrap gap-2" dir="ltr">
        {pool.map((p, idx) => (
          <button
            key={`${p.i}-${idx}`}
            onClick={() => {
              setPicked([...picked, p]);
              setPool(pool.filter((_, i) => i !== idx));
              setStatus(null);
            }}
            className="rounded-lg bg-secondary px-3 py-2 font-mono text-sm transition hover:bg-secondary/70 active:scale-95"
          >
            {p.b}
          </button>
        ))}
      </div>

      <ResultBanner status={status} />

      <div className="flex gap-2">
        <button
          onClick={check}
          disabled={picked.length !== correct.length}
          className="flex-1 rounded-xl bg-primary py-3 font-bold text-primary-foreground transition disabled:opacity-50 active:scale-[0.98]"
        >
          تحقق
        </button>
        <button
          onClick={reset}
          className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-foreground"
          aria-label="إعادة"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Fill({ ch, onSolved }: { ch: Ch; onSolved: () => void }) {
  const parts = useMemo(() => (ch.template ?? "").split("___"), [ch.template]);
  const [vals, setVals] = useState<string[]>(() => (ch.answers ?? []).map(() => ""));
  const [status, setStatus] = useState<"ok" | "bad" | null>(null);

  const check = () => {
    const ok = (ch.answers ?? []).every(
      (a, i) => (vals[i] ?? "").trim() === a.trim(),
    );
    setStatus(ok ? "ok" : "bad");
    if (ok) setTimeout(onSolved, 600);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{ch.prompt}</p>
      <div className="rounded-2xl bg-card p-4 font-mono text-sm leading-loose shadow-card" dir="ltr">
        {parts.map((p, i) => (
          <span key={i} className="whitespace-pre-wrap">
            {p}
            {i < parts.length - 1 && (
              <input
                value={vals[i] ?? ""}
                onChange={(e) => {
                  const next = [...vals];
                  next[i] = e.target.value;
                  setVals(next);
                  setStatus(null);
                }}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                className="mx-1 inline-block w-24 rounded-md border border-primary/40 bg-primary/10 px-2 py-1 text-center font-mono text-primary outline-none focus:border-primary"
              />
            )}
          </span>
        ))}
      </div>
      <ResultBanner status={status} />
      <button
        onClick={check}
        className="w-full rounded-xl bg-primary py-3 font-bold text-primary-foreground transition active:scale-[0.98]"
      >
        تحقق
      </button>
    </div>
  );
}

function Choice({ ch, onSolved }: { ch: Ch; onSolved: () => void }) {
  const [pick, setPick] = useState<number | null>(null);
  const [status, setStatus] = useState<"ok" | "bad" | null>(null);

  const check = () => {
    if (pick === null) return;
    const ok = pick === ch.correctIndex;
    setStatus(ok ? "ok" : "bad");
    if (ok) setTimeout(onSolved, 600);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{ch.prompt}</p>
      <div className="space-y-2">
        {(ch.options ?? []).map((opt, i) => {
          const active = pick === i;
          return (
            <button
              key={i}
              onClick={() => {
                setPick(i);
                setStatus(null);
              }}
              className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-start font-mono text-sm transition ${
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card hover:border-primary/40"
              }`}
              dir="ltr"
            >
              <span className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${active ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      <ResultBanner status={status} />
      <button
        onClick={check}
        disabled={pick === null}
        className="w-full rounded-xl bg-primary py-3 font-bold text-primary-foreground transition disabled:opacity-50 active:scale-[0.98]"
      >
        تحقق
      </button>
    </div>
  );
}
