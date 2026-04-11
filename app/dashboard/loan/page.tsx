"use client";

import { useState } from "react";

export default function LoanPage() {
  const [borrowAmount, setBorrowAmount] = useState(500);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="flex flex-col gap-2">
         <h1 className="text-2xl font-sans font-medium text-black dark:text-white">Empréstimos com Colateral</h1>
         <p className="text-sm font-light text-black/50 dark:text-white/50">Não quer vender seus KAXIS? Use-os como garantia para obter crédito rápido.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Loan Calculator Area */}
        <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 rounded-[2rem] p-6 lg:p-8 flex flex-col gap-8">
           <h3 className="text-lg font-medium text-black dark:text-white">Simulador de Crédito</h3>
           
           <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-sm font-mono tracking-widest uppercase text-black/50 dark:text-white/50">
                <span>Quero Pegar Emprestado (USDC)</span>
                <span className="font-bold text-black dark:text-white">{borrowAmount} USDC</span>
              </div>
              <input 
                 type="range" 
                 min="100" 
                 max="5000" 
                 step="100"
                 value={borrowAmount}
                 onChange={(e) => setBorrowAmount(Number(e.target.value))}
                 className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] uppercase font-mono text-black/30 dark:text-white/30">
                 <span>100 USDC</span>
                 <span>5000 USDC</span>
              </div>
           </div>

           <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                 <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400">Garantia Necessária</span>
                 <span className="font-bold font-sans text-lg text-blue-700 dark:text-blue-300">{(borrowAmount * 1.5).toFixed(2)} KAXIS</span>
              </div>
              <div className="flex justify-between items-center text-sm text-blue-600/70 dark:text-blue-400/70">
                 <span>LTV (Loan to Value)</span>
                 <span>65%</span>
              </div>
              <div className="flex justify-between items-center text-sm text-blue-600/70 dark:text-blue-400/70">
                 <span>Taxa Anual Prevista</span>
                 <span>4.5%</span>
              </div>
           </div>

           <button className="w-full bg-black dark:bg-white text-white dark:text-black rounded-xl py-4 font-medium transition-all hover:scale-105">
              Aprovar Garantia
           </button>
        </div>

        {/* Stats / Info Card */}
        <div className="flex flex-col justify-between bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] p-6 lg:p-8">
           <div>
              <div className="w-12 h-12 bg-white dark:bg-black/20 rounded-xl flex items-center justify-center text-2xl mb-6 shadow-sm">🏦</div>
              <h3 className="text-xl font-medium mb-2">Seus Empréstimos Ativos</h3>
              <p className="text-sm font-light text-black/50 dark:text-white/50 leading-relaxed max-w-sm">
                Você ainda não possui posições de dívida abertas. O crédito é aprovado instantaneamente pelos contratos inteligentes, sem análise restritiva.
              </p>
           </div>
           
           <div className="mt-8 flex items-center gap-4 bg-white/50 dark:bg-zinc-800/50 p-4 rounded-xl">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <p className="text-xs font-mono tracking-widest uppercase text-black/60 dark:text-white/60">Saúde Financeira: Excelente</p>
           </div>
        </div>

      </div>
    </div>
  );
}
