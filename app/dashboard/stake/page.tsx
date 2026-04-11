"use client";

import { useState } from "react";

export default function StakePage() {
  const [amount, setAmount] = useState("");

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex flex-col gap-2">
         <h1 className="text-2xl font-sans font-medium text-black dark:text-white">Yield & Stake</h1>
         <p className="text-sm font-light text-black/50 dark:text-white/50">Tranque seus KAXIS para gerar rendimentos passivos automáticos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Stake Form Area */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-[2rem] p-6 lg:p-8 flex flex-col gap-6">
           <div className="flex justify-between items-end">
              <div>
                 <span className="text-xs font-mono uppercase tracking-widest text-black/40 dark:text-white/40 block mb-1">Total em Stake</span>
                 <h2 className="text-4xl font-sans font-medium tabular-nums">0.00 <span className="text-xl font-serif tracking-widest">KAXIS</span></h2>
              </div>
              <div className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-mono font-bold tracking-widest uppercase rounded-full">
                 APY: 12.5%
              </div>
           </div>

           <div className="w-full h-[1px] bg-black/5 dark:bg-white/5"></div>

           <div className="flex flex-col gap-4">
              <label className="text-xs font-mono tracking-widest uppercase text-black/60 dark:text-white/60">Depositar para Stake</label>
              <div className="relative">
                 <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-6 py-5 outline-none text-2xl font-medium text-black dark:text-white focus:border-blue-500 transition-colors"
                 />
                 <button className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono uppercase text-blue-600 hover:text-blue-500 font-bold bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/5">
                    MAX
                 </button>
              </div>
              <p className="text-xs text-black/40 dark:text-white/40">Saldo disponível: 1.00 KAXIS</p>
           </div>

           <button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-4 font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
              Confirmar Stake
           </button>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-6 lg:p-8 text-white relative overflow-hidden shadow-xl shadow-purple-500/20">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
           <h3 className="text-lg font-medium mb-2 relative z-10">Como funciona o APY?</h3>
           <p className="text-sm text-white/70 font-light leading-relaxed mb-6 relative z-10">
              O rendimento percentual anual (APY) é distribuído a partir das taxas do hub para o pool de liquidez da comunidade. 
           </p>
           
           <div className="flex flex-col gap-3 relative z-10">
              <div className="flex justify-between items-center bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20">
                 <span className="text-xs font-mono uppercase">Recompensa Estimada</span>
                 <span className="font-bold">~ 0.12 KAXIS / ano</span>
              </div>
              <div className="flex justify-between items-center bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20">
                 <span className="text-xs font-mono uppercase">Lock Period</span>
                 <span className="font-bold">Flexível (0 dias)</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
