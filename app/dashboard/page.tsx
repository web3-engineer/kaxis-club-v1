"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const partners = [
  { name: 'Amazon', src: '/partners/Amazon.png', cashback: 'Até 5%' },
  { name: 'Magalu', src: '/partners/magalu.png', cashback: 'Até 8%' },
  { name: 'Mercado Livre', src: '/partners/Mercado Livre.png', cashback: 'Até 5%' },
  { name: 'iFood', src: '/partners/ifood.png', cashback: 'Até 10%' },
  { name: 'Shopee', src: '/partners/Shopee.png', cashback: 'Até 12%' },
  { name: 'Aliexpress', src: '/partners/aliexpress.png', cashback: 'Até 15%' },
];

export default function DashboardHome() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Busca do localStorage. Fallbacks de segurança aplicados.
    const data = localStorage.getItem("kaxis_user");
    const parsedData = data ? JSON.parse(data) : {};

    setUserData({
      username: parsedData.username || "Usuário",
      kaxisBalance: parsedData.balance ?? parsedData.kaxisBalance ?? 0,
      fiatBalance: (parsedData.balance ?? parsedData.kaxisBalance ?? 0) / 10,
      referrals: 12, // Mock visual
      referralEarnings: 240 // Mock visual
    });
  }, []);

  if (!userData) return (
    <div className="animate-pulse flex flex-col gap-6 w-full">
      <div className="h-32 bg-black/5 dark:bg-white/5 rounded-3xl w-full"></div>
      <div className="h-64 bg-black/5 dark:bg-white/5 rounded-3xl w-full"></div>
    </div>
  );

  return (
    <div className="w-full animate-fade-in flex flex-col gap-6 md:gap-10">

      {/* ========================================================================= */}
      {/* 📱 EXPERIÊNCIA MOBILE (ESTÉTICA FINTECH)                                 */}
      {/* ========================================================================= */}
      <div className="md:hidden flex flex-col gap-6">

        {/* 1. Cartão de Saldo Premium */}
        <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-purple-800 rounded-[2rem] p-6 shadow-xl shadow-blue-600/20 text-white overflow-hidden isolate">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

          <div className="relative z-10 flex justify-between items-center mb-6">
            <span className="text-white/80 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Saldo Disponível
            </span>
            <button className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-sm">
              👁️
            </button>
          </div>

          <div className="relative z-10 flex flex-col">
            <div className="flex items-baseline gap-2">
              <h2 className="text-[2.5rem] font-bold tracking-tight leading-none">{userData.kaxisBalance.toLocaleString('pt-BR')}</h2>
              <span className="text-lg text-blue-200 font-medium">KX</span>
            </div>
            <p className="text-sm text-blue-100/70 mt-2 font-medium">≈ R$ {userData.fiatBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* 2. Grid de Ações Rápidas (Ícones Minimalistas) */}
        <div className="grid grid-cols-4 gap-4 py-2 px-1">
          {[
            { icon: "💸", label: "Pagar" },
            { icon: "🏦", label: "Empréstimo" },
            { icon: "💳", label: "Cartões" },
            { icon: "🤝", label: "Indicar" },
          ].map((action, i) => (
            <button key={i} className="flex flex-col items-center gap-2.5 group active:scale-90 transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-black/5 dark:border-white/5 flex items-center justify-center text-2xl group-hover:border-blue-500/30 group-hover:shadow-blue-500/10 transition-all">
                {action.icon}
              </div>
              <span className="text-[11px] font-bold text-black/70 dark:text-white/70 text-center leading-tight">
                {action.label}
              </span>
            </button>
          ))}
        </div>

        {/* 3. Carrossel de Lojas (Ativar Cashback) */}
        <div className="mt-2 bg-white dark:bg-zinc-900 rounded-[2rem] p-5 shadow-sm border border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Ativar Cashback</h3>
            <span className="text-xs text-blue-600 font-bold px-3 py-1 bg-blue-50 dark:bg-blue-500/10 rounded-full">Ver todos</span>
          </div>

          <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide snap-x">
            {partners.map((partner, i) => (
              <div key={i} className="min-w-[110px] bg-[#f8f9fb] dark:bg-black/40 border border-black/5 dark:border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center shrink-0 snap-center active:scale-95 transition-transform">
                <div className="relative w-10 h-10 mb-3">
                  <Image src={partner.src} alt={partner.name} fill sizes="40px" className="object-contain grayscale opacity-70" />
                </div>
                <span className="text-blue-600 font-black text-sm mb-0.5">{partner.cashback}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 💻 EXPERIÊNCIA DESKTOP (Fiel e Modernizada)                              */}
      {/* ========================================================================= */}
      <div className="hidden md:flex flex-col gap-8">

        {/* 1. Hero Banner */}
        <div className="relative w-full bg-[#080d14] rounded-[2rem] p-12 overflow-hidden shadow-2xl shadow-blue-900/10 border border-white/10 group">
          <div className="absolute right-0 bottom-0 w-2/3 h-[200%] bg-gradient-to-tl from-cyan-400/20 via-blue-600/20 to-transparent blur-[80px] rounded-full transform translate-x-1/3 translate-y-1/4 group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl"></div>

          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-3 bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 border border-white/10">
              Oferta Limitada <span className="w-1 h-1 bg-white rounded-full"></span> <span className="opacity-80 font-medium">Apenas 100 vagas</span>
            </div>
            <h2 className="text-5xl font-black text-white mb-4 leading-[1.1] tracking-tight">
              100 Primeiras Compras <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">100% Cashback</span>
            </h2>
            <p className="text-white/70 mb-8 text-base font-medium max-w-md">
              Receba o valor total de suas compras em tokens KX. Acelere o crescimento da sua carteira no ecossistema hoje mesmo.
            </p>
            <button className="bg-white text-blue-900 hover:bg-blue-50 font-bold py-4 px-8 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-1">
              PARTICIPAR AGORA
            </button>
          </div>
        </div>

        {/* 2. Bloco Indique e Ganhe */}
        <div className="bg-white/80 dark:bg-zinc-900/50 backdrop-blur-xl rounded-[2rem] p-10 border border-black/5 dark:border-white/5 flex flex-row items-center justify-between shadow-sm">
          <div className="flex-1 pr-12">
            <h3 className="text-3xl font-bold mb-3">Indique e Ganhe</h3>
            <p className="text-black/60 dark:text-white/60 text-base leading-relaxed mb-8 font-medium">
              Convide seus amigos para o Kaxis Club. Eles ganham benefícios, e você ganha tokens perpétuos por cada novo cadastro ativo em sua rede.
            </p>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase font-bold tracking-widest text-black/40 dark:text-white/40 mb-2">Seu link exclusivo</span>
              <div className="flex bg-[#f4f6f8] dark:bg-black/50 rounded-2xl p-1.5 border border-black/5 dark:border-white/5 max-w-md focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                <input
                  type="text"
                  readOnly
                  value={`kaxis.club/@${userData.username}`}
                  className="bg-transparent border-none outline-none px-4 w-full text-sm font-mono font-bold text-black/70 dark:text-white/70"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-xs font-bold transition-colors shadow-md">
                  COPIAR
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-16 border-l-2 border-black/5 dark:border-white/5 pl-16 py-4">
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40 mb-3">Convidados</span>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black tracking-tighter">{userData.referrals}</span>
                <span className="text-black/30 dark:text-white/30 text-2xl">👥</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40 mb-3">Saldo Ganho</span>
              <div className="flex flex-col items-center">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black text-blue-600 dark:text-blue-400 tracking-tighter leading-none">{userData.referralEarnings}</span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">KX</span>
                </div>
                <span className="text-[11px] font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-full mt-3">
                  ≈ R$ {(userData.referralEarnings / 10).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Grid de Parceiros */}
        <div className="mt-4 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-md rounded-[2rem] p-10 border border-black/5 dark:border-white/5">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-1">Parceiros Oficiais</h3>
              <p className="text-sm font-medium text-black/50 dark:text-white/50">Aproveite os maiores cashbacks do mercado em marcas globais</p>
            </div>
            <button className="text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline flex items-center gap-1 bg-blue-50 dark:bg-blue-500/10 px-4 py-2 rounded-full transition-colors hover:bg-blue-100 dark:hover:bg-blue-500/20">
              VER TODOS
            </button>
          </div>

          <div className="grid grid-cols-6 gap-5">
            {partners.map((partner, i) => (
              <div key={i} className="bg-white dark:bg-zinc-950 rounded-3xl p-6 flex flex-col items-center justify-center border border-black/5 dark:border-white/5 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer group hover:-translate-y-1">
                <div className="h-10 flex items-center justify-center w-full mb-5 relative">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    fill
                    sizes="80px"
                    className="object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
                <span className="text-black/80 dark:text-white/80 font-black text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{partner.cashback}</span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-black/30 dark:text-white/30">Cashback</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}