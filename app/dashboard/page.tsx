"use client";

import { useEffect, useState } from "react";

export default function DashboardHome() {
  const [userData, setUserData] = useState<any>(null);
  const [inviteLinkCopied, setInviteLinkCopied] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("kaxis_user");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  const copyInviteLink = () => {
    if (!userData) return;
    const link = `${window.location.origin}/login?ref=${userData.username}`;
    navigator.clipboard.writeText(link);
    setInviteLinkCopied(true);
    setTimeout(() => setInviteLinkCopied(false), 2000);
  };

  if (!userData) return <div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-4 py-1"><div className="h-4 bg-black/10 dark:bg-white/10 rounded w-3/4"></div></div></div>;

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* HEADER / BOAS VINDAS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-black/5 dark:border-white/5 backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-sans font-medium">
            Bem-vindo de volta, <span className="text-blue-600 dark:text-blue-400">@{userData.username}</span>.
          </h1>
          <p className="text-sm text-black/50 dark:text-white/50 mt-1 font-light">
            Aqui está o resumo dos seus ativos.
          </p>
        </div>
        <div className="px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-mono font-bold tracking-widest uppercase rounded-full border border-green-500/20 inline-flex items-center gap-2 w-fit">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          Status: Active
        </div>
      </div>

      {/* BALANÇO PRINCIPAL */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-blue-500/20">
        <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-white/70 font-mono text-sm tracking-widest uppercase mb-2 block">Saldo Disponível</span>
            <div className="flex items-end gap-3">
              <span className="text-6xl md:text-8xl font-sans font-medium tracking-tighter tabular-nums leading-none">
                {userData.kaxisBalance.toFixed(2)}
              </span>
              <span className="text-2xl md:text-3xl font-serif tracking-[0.1em] mb-2">KAXIS</span>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">~$ 0.00 USD</span>
              <span className="px-3 py-1 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm text-green-300">Bônus de Cadastro Recebido</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <button className="bg-white text-blue-600 font-medium py-3 px-8 rounded-xl shadow-lg hover:scale-105 transition-transform w-full md:w-auto">
              Fazer Stake
            </button>
            <button className="bg-transparent border border-white/30 text-white font-medium py-3 px-8 rounded-xl hover:bg-white/10 transition-colors w-full md:w-auto">
              Sacar para Carteira
            </button>
          </div>
        </div>
      </div>

      {/* ÁREA DE CUPONS / INVENTÁRIO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CUPOM DE CASHBACK */}
        <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-[2rem] p-6 md:p-8 flex items-center gap-6 group hover:border-blue-500/30 transition-colors">
          <div className="w-16 h-16 shrink-0 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
             💸
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-lg">Cupom de Boost</h3>
              <span className="bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">+10% APY</span>
            </div>
            <p className="text-sm text-black/50 dark:text-white/50 leading-relaxed">
              Você possui <strong>{userData.cashbackCoupons}</strong> cupom de boost disponível. Ative antes da próxima compra para multiplicar seu KAXIS.
            </p>
            <button className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
              Ativar Cupom →
            </button>
          </div>
        </div>

        {/* CUPOM DE CONVITE */}
        <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-[2rem] p-6 md:p-8 flex items-center gap-6 group hover:border-green-500/30 transition-colors">
          <div className="w-16 h-16 shrink-0 bg-green-50 dark:bg-green-500/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
             🤝
          </div>
          <div className="flex-1">
             <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-lg">Indique e Ganhe</h3>
              <span className="bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">1 PENDENTE</span>
            </div>
            <p className="text-sm text-black/50 dark:text-white/50 leading-relaxed">
              Convide um amigo para o Kaxis Club. Quando ele se inscrever e fizer a primeira compra, vocês dois ganham KAXIS.
            </p>
            
            <button 
              onClick={copyInviteLink}
              className={`mt-4 w-full py-2.5 rounded-xl text-sm font-mono tracking-tight font-medium transition-all flex items-center justify-center gap-2 ${
                inviteLinkCopied ? "bg-green-500 text-white" : "bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white"
              }`}
            >
              {inviteLinkCopied ? "✓ Link Copiado!" : "Copiar Link de Convite"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
