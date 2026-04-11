"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ username: string } | null>(null);

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

  if (!user) return null; // ou um loader

  const navItems = [
    { name: "Início", path: "/dashboard", icon: "🏠" },
    { name: "Stake", path: "/dashboard/stake", icon: "📈" },
    { name: "Empréstimo", path: "/dashboard/loan", icon: "🏦" },
    { name: "Cartão", path: "/dashboard/card", icon: "💳" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F2F4F7] dark:bg-[#050505] font-sans text-black dark:text-white">
      {/* Sidebar Clássica */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-black/5 dark:border-white/5 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-black/5 dark:border-white/5">
          <Link href="/dashboard" className="font-serif font-bold text-2xl tracking-[0.2em] text-black dark:text-white">
            KAXIS
          </Link>
          <div className="mt-4 px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 rounded-full inline-flex items-center gap-2 border border-blue-100 dark:border-blue-500/20">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-[10px] uppercase tracking-widest font-mono text-blue-600 dark:text-blue-400">@{user.username}</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
                }`}
              >
                <span className={isActive ? "grayscale-0" : "grayscale opacity-70"}>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/5 dark:border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
          >
            <span>🚪</span> Sair
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-x-hidden">
        {/* Mobile Header */}
        <header className="md:hidden p-4 bg-white dark:bg-zinc-900 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
          <Link href="/dashboard" className="font-serif font-bold tracking-[0.2em]">KAXIS</Link>
          <button onClick={handleLogout} className="text-xs font-mono uppercase text-red-500">Sair</button>
        </header>
        
        {/* Mobile Nav */}
        <nav className="md:hidden flex overflow-x-auto p-4 gap-2 bg-white dark:bg-zinc-900 border-b border-black/5 dark:border-white/5 scrollbar-hide">
          {navItems.map((item) => (
             <Link
               key={item.path}
               href={item.path}
               className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium ${pathname === item.path ? 'bg-blue-600 text-white' : 'bg-black/5 dark:bg-white/5'}`}
             >
               {item.name}
             </Link>
          ))}
        </nav>

        <div className="flex-1 p-6 md:p-10 max-w-6xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
