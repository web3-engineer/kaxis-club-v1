"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ username: string; balance?: number; kaxisBalance?: number } | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("kaxis_user");
    if (!data) {
      router.push("/login");
    } else {
      setUser(JSON.parse(data));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("kaxis_user");
    router.push("/");
  };

  if (!user) return null;

  const userBalance = user.balance ?? user.kaxisBalance ?? 0;

  const navItems = [
    { name: "Início", path: "/dashboard", icon: "🏠" },
    { name: "Cashback", path: "/dashboard/cashback", icon: "🛍️" },
    { name: "Planos", path: "/dashboard/plans", icon: "⭐" },
    { name: "Stake", path: "/dashboard/stake", icon: "📈" },
    { name: "Pagamentos", path: "/dashboard/payments", icon: "💸" },
    { name: "Empréstimo", path: "/dashboard/loan", icon: "🏦" },
    { name: "Cartão", path: "/dashboard/card", icon: "💳" },
  ];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Ubuntu+Sans:wght@300;400;500;600;700&display=swap');
        `}
      </style>

      <div
        className="flex h-screen bg-[#f4f6f8] dark:bg-[#0a0a0a] text-black dark:text-white overflow-hidden transition-colors duration-500"
        style={{ fontFamily: "'Ubuntu Sans', sans-serif" }}
      >
        {/* ========================================== */}
        {/* 💻 SIDEBAR (DESKTOP)                       */}
        {/* ========================================== */}
        <aside className="w-72 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-xl border-r border-black/5 dark:border-white/5 hidden md:flex flex-col h-full shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
          <div className="p-8 pb-6">
            <Link href="/dashboard" className="font-bold text-3xl tracking-tight text-black dark:text-white flex items-center gap-2">
              KAXIS <span className="text-sm font-medium tracking-normal text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-md">Club</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5 scrollbar-hide">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 translate-x-1"
                      : "text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
                    }`}
                >
                  <span className={`text-lg ${isActive ? "opacity-100" : "opacity-50 grayscale transition-all duration-300"}`}>{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t border-black/5 dark:border-white/5 flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <span className="opacity-50">⬅️</span> Voltar ao Site
            </Link>

            <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 p-3 rounded-2xl">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white uppercase shadow-md shrink-0">
                  {user.username?.charAt(0) || "U"}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-bold truncate">@{user.username}</span>
                  <span className="text-[10px] uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">Explorer</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Sair"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-500/10 text-red-500 transition-colors shrink-0"
              >
                🚪
              </button>
            </div>
          </div>
        </aside>

        {/* ========================================== */}
        {/* 📱 ÁREA PRINCIPAL & TOPBAR                 */}
        {/* ========================================== */}
        <div className="flex-1 flex flex-col h-full relative">

          {/* Topbar Desktop */}
          <header className="hidden md:flex h-24 items-center justify-between px-10 shrink-0 z-10">
            <div className="text-black/40 dark:text-white/40 font-medium text-sm">
              Visão Geral do seu Patrimônio
            </div>
            <div className="flex items-center gap-6 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md px-6 py-3 rounded-3xl border border-white/20 dark:border-white/5 shadow-sm">
              <div className="flex flex-col items-end mr-2 border-r border-black/10 dark:border-white/10 pr-6">
                <span className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase tracking-widest mb-0.5">Saldo Total</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold">{userBalance.toLocaleString('pt-BR')} KX</span>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">≈ R$ {(userBalance / 10).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
              <button className="relative p-2 text-xl hover:scale-110 transition-transform">
                🔔<span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
              </button>
            </div>
          </header>

          {/* Mobile Header (Topbar simples) */}
          <header className="md:hidden flex items-center justify-between p-5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 sticky top-0 z-20">
            <Link href="/" className="text-sm font-bold text-black/50 dark:text-white/50 flex items-center gap-1">
              <span>⬅️</span> Site
            </Link>
            <div className="font-bold text-xl tracking-tight">KAXIS</div>
            <button onClick={handleLogout} className="text-xs font-bold text-red-500 bg-red-500/10 px-3 py-1.5 rounded-full">Sair</button>
          </header>

          {/* Conteúdo Dinâmico */}
          <main className="flex-1 overflow-y-auto pb-28 md:pb-10 pt-4 md:pt-0">
            <div className="px-4 md:px-10 max-w-6xl w-full mx-auto">
              {children}
            </div>
          </main>

          {/* ========================================== */}
          {/* 📱 BOTTOM NAV BAR (MOBILE APENAS)          */}
          {/* ========================================== */}
          <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-t border-black/5 dark:border-white/5 flex justify-around items-center pb-safe pt-2 px-2 z-50 shadow-[0_-20px_40px_rgba(0,0,0,0.05)]">
            {navItems.slice(0, 5).map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link key={item.path} href={item.path} className="flex flex-col items-center p-2 gap-1 relative w-16 group">
                  <span className={`text-2xl transition-all duration-300 ${isActive ? '-translate-y-2 scale-110 opacity-100 drop-shadow-md' : 'opacity-40 grayscale group-hover:opacity-100'}`}>
                    {item.icon}
                  </span>
                  <span className={`text-[10px] font-bold transition-all duration-300 ${isActive ? 'text-blue-600 dark:text-blue-400 opacity-100' : 'text-black/50 dark:text-white/50 opacity-0 translate-y-2'}`}>
                    {item.name}
                  </span>
                  {isActive && <div className="absolute -top-3 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>}
                </Link>
              );
            })}
          </nav>

        </div>
      </div>
    </>
  );
}