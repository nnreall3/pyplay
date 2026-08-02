import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, LogIn, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "بايثونا — تسجيل الدخول" },
      { name: "description", content: "سجّل الدخول لحفظ تقدمك في تعلّم بايثون ومزامنته بين أجهزتك." },
      { property: "og:title", content: "بايثونا — تسجيل الدخول" },
      { property: "og:description", content: "احفظ XP والشارات والدروس المكتملة في حسابك." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/profile", replace: true });
  }, [user, loading, navigate]);

  const google = async () => {
    setErr(null);
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setErr("تعذّر تسجيل الدخول عبر Google. حاول مرة أخرى.");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/profile", replace: true });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    if (!email.trim() || password.length < 6) {
      setErr("أدخل بريدًا صحيحًا وكلمة مرور من 6 أحرف على الأقل.");
      return;
    }
    setBusy(true);
    if (mode === "up") {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) setErr(error.message);
      else if (!data.session) setMsg("تحقّق من بريدك الإلكتروني لتأكيد الحساب ثم سجّل الدخول.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) setErr("بيانات الدخول غير صحيحة.");
    }
    setBusy(false);
  };

  return (
    <div className="mx-auto max-w-md space-y-6 py-6">
      <header className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-hero shadow-glow">
          <span className="font-mono text-lg font-bold text-primary-foreground">Py</span>
        </div>
        <h1 className="mt-4 text-2xl font-extrabold">مرحبًا بك في بايثونا</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          سجّل الدخول لحفظ تقدمك (XP، الشارات، الدروس) ومزامنته بين أجهزتك.
        </p>
      </header>

      <button
        onClick={google}
        disabled={busy}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 font-bold shadow-card transition hover:bg-secondary disabled:opacity-60"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
          <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z" />
          <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24z" />
          <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7H1.4a12 12 0 0 0 0 10.7l4-3z" />
          <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.6 1.4 6.7l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
        </svg>
        المتابعة باستخدام Google
      </button>

      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        أو بالبريد الإلكتروني
        <div className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={submit} className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-card">
        <div>
          <label className="mb-1 block text-xs font-bold text-muted-foreground">البريد الإلكتروني</label>
          <input
            type="email"
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={255}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold text-muted-foreground">كلمة المرور</label>
          <input
            type="password"
            dir="ltr"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            maxLength={72}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
            placeholder="••••••••"
          />
        </div>

        {err && <p className="rounded-xl bg-destructive/10 p-2 text-xs font-bold text-destructive">{err}</p>}
        {msg && <p className="rounded-xl bg-success/10 p-2 text-xs font-bold text-success">{msg}</p>}

        <button
          type="submit"
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "in" ? <LogIn className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
          {mode === "in" ? "تسجيل الدخول" : "إنشاء حساب"}
        </button>

        <button
          type="button"
          onClick={() => { setMode(mode === "in" ? "up" : "in"); setErr(null); setMsg(null); }}
          className="w-full text-center text-xs font-bold text-primary"
        >
          {mode === "in" ? "ليس لديك حساب؟ أنشئ واحدًا" : "لديك حساب؟ سجّل الدخول"}
        </button>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        يمكنك أيضًا المتابعة بدون حساب — سيُحفظ تقدمك على هذا الجهاز فقط.{" "}
        <Link to="/" className="font-bold text-primary">العودة للرئيسية</Link>
      </p>
    </div>
  );
}
