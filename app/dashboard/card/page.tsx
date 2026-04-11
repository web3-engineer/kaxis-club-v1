"use client";

const tiers = [
  { name: "STANDARD", cashback: "1.5%", desc: "Cartão básico para novos membros. Cashback automático em toda rede.", color: "from-slate-300 to-slate-500", ring: "ring-slate-300", shadow: "", label: "Nível Inicial", badge: "bg-slate-200 text-slate-700" },
  { name: "GOLD PASS", cashback: "3.0%", desc: "Acesso a parceiros premium e cashback dobrado em e-commerces.", color: "from-yellow-300 to-amber-500", ring: "ring-amber-400", shadow: "shadow-amber-300/30", label: "Popular", badge: "bg-yellow-100 text-yellow-700" },
  { name: "PLATINUM", cashback: "5.0%", desc: "Ideal para quem compra mais. Prioridade nos saques e yield premium.", color: "from-cyan-300 via-blue-400 to-cyan-500", ring: "ring-cyan-400", shadow: "shadow-cyan-300/30", label: "Recomendado", badge: "bg-cyan-100 text-cyan-700" },
  { name: "OBSIDIAN", cashback: "8.0%", desc: "Convite exclusivo. Cartão metálico físico. Governança DAO total.", color: "from-zinc-700 via-black to-zinc-800", ring: "ring-purple-500", shadow: "shadow-purple-500/30", label: "Exclusivo", badge: "bg-purple-100 text-purple-700" },
];

export default function CardPage() {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-sans font-medium text-black dark:text-white">Meu Cartão KAXIS</h1>
        <p className="text-sm font-light text-black/50 dark:text-white/50">Escolha seu nível de acesso. Quanto mais KAXIS em stake, maior seu tier.</p>
      </div>

      {/* Card Visual */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-500/20 aspect-[1.586/1] max-w-sm mx-auto w-full flex flex-col justify-between">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIwLjMiIG9wYWNpdHk9IjAuMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="relative z-10 flex justify-between items-start">
          <span className="font-serif font-bold text-xl tracking-[0.2em]">KAXIS</span>
          <span className="text-white/60 font-mono text-xs uppercase tracking-widest">Standard</span>
        </div>
        <div className="relative z-10">
          <div className="font-mono text-sm tracking-[0.3em] text-white/70 mb-1">KAXIS #0001</div>
          <div className="font-mono text-lg tracking-[0.2em] text-white mb-4">•••• •••• •••• 0001</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest mb-0.5">Cashback</div>
              <div className="text-2xl font-bold">1.5%</div>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Tiers */}
      <div>
        <h2 className="text-lg font-medium text-black dark:text-white mb-4">Tiers Disponíveis</h2>
        <div className="grid grid-cols-1 gap-4">
          {tiers.map((tier, i) => (
            <div key={i} className={`flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 hover:ring-1 ${tier.ring} hover:shadow-lg ${tier.shadow} transition-all`}>
              <div className={`w-12 h-12 rounded-xl shrink-0 bg-gradient-to-br ${tier.color} shadow-md`}></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-medium text-sm text-black dark:text-white">{tier.name}</h3>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${tier.badge}`}>{tier.label}</span>
                </div>
                <p className="text-xs text-black/50 dark:text-white/50 leading-relaxed">{tier.desc}</p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-xl font-bold text-black dark:text-white">{tier.cashback}</div>
                <div className="text-[10px] font-mono uppercase text-black/40 dark:text-white/40">cashback</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-5 flex gap-3">
        <span className="text-2xl shrink-0">🔒</span>
        <p className="text-sm text-blue-700 dark:text-blue-300 font-light leading-relaxed">
          Para fazer upgrade de tier, coloque KAXIS em <strong>stake</strong> correspondente ao saldo mínimo de cada nível. O upgrade é automático assim que o lock é detectado.
        </p>
      </div>
    </div>
  );
}
