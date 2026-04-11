"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", cpf: "", email: "" });
  const [referralFrom, setReferralFrom] = useState<string | null>(null);

  // Captura o ref da URL e credita ao usuário que indicou
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setReferralFrom(ref);
    }
  }, [searchParams]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const userData = {
        username: form.username || "kaxis_user",
        cpf: form.cpf,
        email: form.email,
        kaxisBalance: 1.0,
        cashbackCoupons: 1,
        inviteCoupons: 1,
        isPro: false,
        referredBy: referralFrom || null,
      };

      localStorage.setItem("kaxis_user", JSON.stringify(userData));

      // Se veio de um convite, registra que esse usuário foi indicado
      if (referralFrom) {
        const referrals = JSON.parse(localStorage.getItem("kaxis_referrals") || "{}");
        referrals[form.username] = referralFrom;
        localStorage.setItem("kaxis_referrals", JSON.stringify(referrals));
      }

      router.push("/dashboard");
    }, 1500);
  };

  const handleSocialLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const rndId = Math.floor(Math.random() * 9999);
      const userData = {
        username: `google_user${rndId}`,
        kaxisBalance: 1.0,
        cashbackCoupons: 1,
        inviteCoupons: 1,
        isPro: false,
        referredBy: referralFrom || null,
      };
      localStorage.setItem("kaxis_user", JSON.stringify(userData));

      if (referralFrom) {
        const referrals = JSON.parse(localStorage.getItem("kaxis_referrals") || "{}");
        referrals[`google_user${rndId}`] = referralFrom;
        localStorage.setItem("kaxis_referrals", JSON.stringify(referrals));
      }

      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F4F7] dark:bg-[#050505] px-4 py-10 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-500/10 dark:bg-purple-500/20 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">

        {/* Logo */}
        <Link href="/" className="flex justify-center mb-8 hover:scale-105 transition-transform">
          <span className="font-serif font-bold text-3xl tracking-[0.2em] text-black dark:text-white">KAXIS</span>
        </Link>

        {/* Referral banner */}
        {referralFrom && (
          <div className="mb-4 px-4 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center gap-3">
            <span className="text-xl">🎁</span>
            <div>
              <p className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-widest">Convite Ativo</p>
              <p className="text-xs text-green-600 dark:text-green-500 font-light">
                Você foi indicado por <strong>@{referralFrom}</strong>. Vocês dois ganharão bônus após o cadastro!
              </p>
            </div>
          </div>
        )}

        <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-black/5 dark:border-white/10 p-7 rounded-[2rem] shadow-2xl">
          <h2 className="text-2xl font-sans font-medium text-black dark:text-white mb-1">Acesse o Hub</h2>
          <p className="text-sm font-light text-black/50 dark:text-white/50 mb-7">
            Gerencie seus rendimentos e KAXIS.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-widest uppercase text-black/60 dark:text-white/50">
                Nome de Usuário (único)
              </label>
              <input
                required
                type="text"
                placeholder="@username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value.toLowerCase().replace(/\s+/g, "_") })}
                className="w-full bg-transparent border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none text-black dark:text-white focus:border-blue-500 transition-colors placeholder:text-black/30 dark:placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-widest uppercase text-black/60 dark:text-white/50">CPF</label>
              <input
                required
                type="text"
                placeholder="000.000.000-00"
                value={form.cpf}
                maxLength={14}
                onChange={(e) => {
                  // Auto-format CPF
                  let v = e.target.value.replace(/\D/g, "");
                  if (v.length > 9) v = v.slice(0, 9) + "-" + v.slice(9, 11);
                  if (v.length > 6) v = v.slice(0, 6).replace(/(\d{3})(\d)/, "$1.$2") + v.slice(6);
                  if (v.length > 3) v = v.slice(0, 3) + "." + v.replace(/\./g, "").slice(3);
                  setForm({ ...form, cpf: v });
                }}
                className="w-full bg-transparent border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none text-black dark:text-white focus:border-blue-500 transition-colors placeholder:text-black/30 dark:placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-widest uppercase text-black/60 dark:text-white/50">
                E-mail <span className="normal-case">(opcional)</span>
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm outline-none text-black dark:text-white focus:border-blue-500 transition-colors placeholder:text-black/30 dark:placeholder:text-white/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl py-4 text-sm font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center mt-1 disabled:opacity-70"
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : "Entrar / Cadastrar"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-black/5 dark:bg-white/5" />
            <span className="text-[10px] font-mono tracking-widest text-black/30 dark:text-white/30 uppercase">Ou</span>
            <div className="flex-1 h-px bg-black/5 dark:bg-white/5" />
          </div>

          <button
            type="button"
            onClick={handleSocialLogin}
            disabled={loading}
            className="w-full bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-zinc-700 active:bg-gray-100 text-black dark:text-white rounded-xl py-3.5 text-sm font-medium transition-all flex items-center justify-center gap-3 disabled:opacity-70"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar com Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F2F4F7] dark:bg-[#050505]"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
