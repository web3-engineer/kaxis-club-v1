"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/src/components/navbar";

// --- DADOS DO TEMA ---
const ecosystemCards = [
  { id: 1, icon: "💸", title: "Cashback Descentralizado", desc: "Receba recompensas instantâneas no seu aplicativo a cada compra." },
  { id: 2, icon: "📈", title: "Yield Passivo (Staking)", desc: "Seu cashback não fica parado. Faça staking do seu saldo e gere rendimentos automáticos." },
  { id: 3, icon: "🛍️", title: "Marketplace Exclusivo", desc: "Utilize seus tokens em uma rede de parceiros globais com descontos especiais." },
  { id: 4, icon: "⚖️", title: "Poder de Voto", desc: "Tenha voz ativa no ecossistema. A comunidade decide as próximas parcerias." },
];

const techData = [
  { icon: "⚡", label: "Liquidez Imediata", imageText: "[Gráfico de Transações em Tempo Real]" },
  { icon: "🛡️", label: "Smart Contracts", imageText: "[Visualização de Contrato Auditado]" },
  { icon: "🔗", label: "Multi-Chain", imageText: "[Redes (Ethereum, Solana, Polygon)]" },
  { icon: "🪙", label: "Zero Taxas Ocultas", imageText: "[Comparativo de Taxas]" }
];

const howItWorksSteps = [
  { step: "01", title: "Integração", desc: "Marcas e parceiros se integram ao Kaxis via API." },
  { step: "02", title: "Consumo", desc: "Você consome normalmente na rede credenciada." },
  { step: "03", title: "Recompensa", desc: "Valor retorna como token KAXIS direto para sua carteira." },
  { step: "04", title: "Liberdade", desc: "Faça staking, troque por fiat, ou use nas marcas." }
];

const pricingPlans = [
  { name: "Explorer", price: "Free", perks: ["Acesso Básico", "1.5% Cashback Base", "Carteira Custodial"] },
  { name: "Pro", price: "$ 15/mês", perks: ["Acesso Premium", "Até 3% Cashback", "Saques Livres de Taxa", "Prioridade Yield"] },
  { name: "Whale Pass", price: "TBA", perks: ["Convite Exclusivo", "Até 8% Cashback", "Governança DAO", "Cartão Metálico"] }
];

const faqs = [
  { q: "O que é o Kaxis Club?", a: "Um clube de benefícios on-chain onde seu cashback é um ativo com valor real e flexibilidade total." },
  { q: "Como sacar meu saldo?", a: "Transfira seus KAXIS na dashboard para qualquer exchange." },
  { q: "Meus pontos podem expirar?", a: "Não. Diferente de sistemas tradicionais, a custódia é sua. Token não expira." }
];

export default function Home() {
  const [activeExp, setActiveExp] = useState(0);
  const [showPreloader, setShowPreloader] = useState(true);

  // Controle do Preloader
  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Interseção para revelar elementos ao scrollar
  useEffect(() => {
    if (showPreloader) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showPreloader]);

  return (
    <>
      <Navbar />

      {/* 🚀 PRELOADER */}
      {showPreloader && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F2F4F7] dark:bg-[#050505] transition-opacity duration-1000">
          <div className="flex flex-col items-center animate-blur-reveal">
            {/* Logo do projeto Kaxis */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <img
                src="/kaxis-logo.png"
                alt="Kaxis Logo"
                className="w-full h-full object-contain dark:brightness-0 dark:invert"
              />
            </div>
            <p className="text-black/50 dark:text-white/50 text-[10px] mt-6 tracking-[0.4em] uppercase font-mono">
              Smart Cashback
            </p>
          </div>
        </div>
      )}

      <main className={`flex flex-col items-center overflow-hidden transition-opacity duration-1000 bg-[#F2F4F7] dark:bg-[#050505] min-h-screen ${showPreloader ? 'opacity-0' : 'opacity-100'}`}>

        {/* 1. HERO SECTION */}
        <section id="home" className="relative w-full max-w-7xl px-4 md:px-12 pt-32 md:pt-48 pb-24 mx-auto flex flex-col md:flex-row items-center justify-between gap-16">

          <div className="flex flex-col items-start z-10 reveal-on-scroll flex-1 w-full text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-full bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-[10px] md:text-xs font-mono tracking-wide text-black/80 dark:text-white/80 uppercase">
                Plataforma Ativa
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-medium tracking-tight mb-6 text-black dark:text-white leading-[1.05]">
              Cashback. <br />
              <span className="animate-crypto font-light italic">Reinventado.</span>
            </h1>

            <p className="text-black/60 dark:text-white/60 text-base md:text-lg max-w-md font-light leading-relaxed mb-8">
              O único clube de benefícios que converte seus gastos em rendimentos automáticos através da tecnologia blockchain.
            </p>

            <Link href="/login" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl text-sm font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
              Login / Cadastrar-se
            </Link>
          </div>

          {/* 🃏 ANIMAÇÃO DE CARTAS (Com brilho adicionado) */}
          <div className="flex-1 flex justify-center items-center w-full reveal-on-scroll delay-100 min-h-[400px]">
            <div className="deck-wrapper cursor-pointer">
              {[
                { id: 1, icon: "💳", text: "CASHBACK" },
                { id: 2, icon: "🏷️", text: "DISCOUNT" },
                { id: 3, icon: "💎", text: "PREMIUM" },
                { id: 4, icon: "🤝", text: "AGENTS" },
                { id: 5, icon: "🎟️", text: "COUPONS" }
              ].map((card) => (
                <div
                  key={card.id}
                  className={`playing-card card-${card.id} group overflow-hidden border border-white/40 dark:border-white/10 bg-white/60 dark:bg-zinc-900/80 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center`}
                >
                  {/* ✨ Efeito de Brilho Holográfico (Shine) */}
                  <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -skew-x-20 group-hover:left-[200%] transition-all duration-1000 ease-in-out z-20 pointer-events-none"></div>

                  {card.id === 3 ? (
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-4xl mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-400/30">{card.icon}</div>
                      <span className="font-mono text-lg font-bold tracking-widest text-black dark:text-white">{card.text}</span>
                    </div>
                  ) : (
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="text-3xl mb-3 opacity-60 grayscale group-hover:grayscale-0 transition-all">{card.icon}</div>
                      <span className="font-mono text-xs tracking-widest text-black/50 dark:text-white/50">{card.text}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. PARCEIROS */}
        <section id="parceiros" className="w-full max-w-7xl px-4 md:px-6 py-24 mx-auto reveal-on-scroll">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <span className="text-blue-600 dark:text-blue-400 text-xs md:text-sm font-mono tracking-widest uppercase mb-3 block">
              Rede Integrada
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-medium text-black dark:text-white mb-6">
              Aceito nas maiores marcas.
            </h2>
            <p className="text-black/60 dark:text-white/60 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Utilize seu saldo, ganhe benefícios e acesse vantagens exclusivas nas principais lojas físicas e digitais do Brasil e do mundo.
            </p>
          </div>

          {/* Estilos do Carrossel Infinito */}
          <style>
            {`
      @keyframes infinite-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-infinite-scroll {
        animation: infinite-scroll 40s linear infinite;
        width: max-content;
      }
      .pause-on-hover:hover {
        animation-play-state: paused;
      }
    `}
          </style>

          {/* Container do Carrossel Horizontal (Sem flex-wrap, com overflow-hidden e máscara de fade) */}
          <div
            className="relative w-full overflow-hidden flex items-center"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
          >
            <div className="flex items-center gap-12 md:gap-16 lg:gap-20 animate-infinite-scroll pause-on-hover pl-12">
              {[
                // A lista é duplicada para criar o efeito de loop infinito perfeitamente
                ...[
                  { name: 'Amazon', domain: 'amazon.com.br' },
                  { name: 'Mercado Livre', domain: 'mercadolivre.com.br' },
                  { name: 'Magazine Luiza', domain: 'magazineluiza.com.br' },
                  { name: 'Shopee', domain: 'shopee.com.br' },
                  { name: 'Dafiti', domain: 'dafiti.com.br' },
                  { name: 'Casas Bahia', domain: 'casasbahia.com.br' },
                  { name: 'Netshoes', domain: 'netshoes.com.br' },
                  { name: 'iFood', domain: 'ifood.com.br' },
                  { name: 'Shein', domain: 'shein.com' },
                  { name: 'Centauro', domain: 'centauro.com.br' },
                  { name: 'Kabum', domain: 'kabum.com.br' },
                  { name: 'Growth', domain: 'gsuplementos.com.br' },
                  { name: 'Aliexpress', domain: 'aliexpress.com' },
                  { name: 'Insider', domain: 'insiderstore.com.br' },
                  { name: 'Minimal Club', domain: 'minimalclub.com.br' },
                  { name: 'Nike', domain: 'nike.com.br' },
                  { name: 'Zé Delivery', domain: 'ze.delivery' },
                  { name: 'Petz', domain: 'petz.com.br' },
                  { name: 'Adidas', domain: 'adidas.com.br' },
                  { name: 'Tim', domain: 'tim.com.br' },
                  { name: 'Vivo', domain: 'vivo.com.br' },
                  { name: 'Claro', domain: 'claro.com.br' },
                  { name: 'Hering', domain: 'hering.com.br' },
                  { name: 'Uber', domain: 'uber.com' }
                ],
                ...[
                  { name: 'Amazon', domain: 'amazon.com.br' },
                  { name: 'Mercado Livre', domain: 'mercadolivre.com.br' },
                  { name: 'Magazine Luiza', domain: 'magazineluiza.com.br' },
                  { name: 'Shopee', domain: 'shopee.com.br' },
                  { name: 'Dafiti', domain: 'dafiti.com.br' },
                  { name: 'Casas Bahia', domain: 'casasbahia.com.br' },
                  { name: 'Netshoes', domain: 'netshoes.com.br' },
                  { name: 'iFood', domain: 'ifood.com.br' },
                  { name: 'Shein', domain: 'shein.com' },
                  { name: 'Centauro', domain: 'centauro.com.br' },
                  { name: 'Kabum', domain: 'kabum.com.br' },
                  { name: 'Growth', domain: 'gsuplementos.com.br' },
                  { name: 'Aliexpress', domain: 'aliexpress.com' },
                  { name: 'Insider', domain: 'insiderstore.com.br' },
                  { name: 'Minimal Club', domain: 'minimalclub.com.br' },
                  { name: 'Nike', domain: 'nike.com.br' },
                  { name: 'Zé Delivery', domain: 'ze.delivery' },
                  { name: 'Petz', domain: 'petz.com.br' },
                  { name: 'Adidas', domain: 'adidas.com.br' },
                  { name: 'Tim', domain: 'tim.com.br' },
                  { name: 'Vivo', domain: 'vivo.com.br' },
                  { name: 'Claro', domain: 'claro.com.br' },
                  { name: 'Hering', domain: 'hering.com.br' },
                  { name: 'Uber', domain: 'uber.com' }
                ]
              ].map((partner, index) => (
                <div
                  key={index}
                  // O "shrink-0" impede que os itens sejam esmagados juntos na tela
                  className="group relative flex items-center justify-center shrink-0 p-4 transition-transform duration-300 hover:-translate-y-1"
                  title={partner.name}
                >
                  <img
                    src={`https://logo.clearbit.com/${partner.domain}`}
                    alt={`Logo ${partner.name}`}
                    className="h-8 md:h-10 lg:h-12 w-[120px] md:w-[140px] object-contain grayscale opacity-50 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 cursor-pointer"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.onerror = null;
                      img.src = `https://ui-avatars.com/api/?name=${partner.name}&background=ececec&color=333&font-size=0.33`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

     {/* 5. COMO FAZEMOS */}
<section id="como-fazemos" className="w-full bg-white dark:bg-zinc-950 py-24 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 md:px-6">
    <div className="text-center mb-16 md:mb-20 reveal-on-scroll">
      <span className="text-blue-600 dark:text-blue-400 text-xs md:text-sm font-mono tracking-widest uppercase mb-3 block">
        Processo
      </span>
      <h2 className="text-3xl md:text-5xl font-sans font-medium text-black dark:text-white">
        Como fazemos isso.
      </h2>
    </div>

    {/* ESTILOS DE SINCRONIZAÇÃO DA ENERGIA E DOS CARDS */}
    <style>
      {`
        /* Movimento da partícula de energia */
        @keyframes flow-y {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes flow-x {
          0% { left: -15%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 115%; opacity: 0; }
        }

        /* Pulsos sincronizados para os cards (Borda e Glow) */
        @keyframes sync-glow {
          0%, 100% { opacity: 0; border-color: transparent; box-shadow: none; }
          15%, 25% { 
            opacity: 1; 
            border-color: rgba(59, 130, 246, 0.5); /* blue-500/50 */
            box-shadow: 0 4px 30px -5px rgba(59, 130, 246, 0.2); 
          }
          40% { opacity: 0; border-color: transparent; box-shadow: none; }
        }

        /* Expansão e acendimento do Nó (bolinha na linha) */
        @keyframes sync-node {
          0%, 100% { border-color: inherit; transform: scale(1); }
          15%, 25% { border-color: #3b82f6; transform: scale(1.3); }
          40% { border-color: inherit; transform: scale(1); }
        }

        /* Núcleo do Nó piscando */
        @keyframes sync-dot {
          0%, 100% { opacity: 0; transform: scale(0.5); box-shadow: none; }
          15%, 25% { opacity: 1; transform: scale(1); box-shadow: 0 0 12px 2px rgba(59,130,246,0.8); }
          40% { opacity: 0; transform: scale(0.5); box-shadow: none; }
        }

        .animate-comet-y { animation: flow-y 4s linear infinite; }
        .animate-comet-x { animation: flow-x 4s linear infinite; }
        .animate-pulse-layer { animation: sync-glow 4s linear infinite; }
        .animate-pulse-node { animation: sync-node 4s linear infinite; }
        .animate-pulse-dot { animation: sync-dot 4s linear infinite; }
      `}
    </style>

    <div className="relative max-w-5xl mx-auto">
      {/* FIO DE CONEXÃO (MOBILE - VERTICAL)
        Prioridade Mobile-First. Linha desce pela esquerda conectando como timeline. 
      */}
      <div className="md:hidden absolute top-0 bottom-0 left-8 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent z-0">
        <div className="absolute left-1/2 -translate-x-1/2 h-48 w-[3px] bg-gradient-to-b from-transparent via-blue-500 to-transparent blur-[1px] animate-comet-y z-10" />
      </div>

      {/* FIO DE CONEXÃO (DESKTOP - HORIZONTAL)
        Oculto no mobile, assume em telas médias/grandes.
      */}
      <div className="hidden md:block absolute top-8 -translate-y-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent z-0">
        <div className="absolute top-1/2 -translate-y-1/2 w-48 h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-[1px] animate-comet-x z-10" />
      </div>

      {/* GRID DE ETAPAS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-20">
        {howItWorksSteps.map((item, i) => (
          <div 
            key={i} 
            /* No Mobile: padding left maior (pl-16) para não encostar na linha vertical.
               No Desktop: padding top maior (pt-16) para não encostar na linha horizontal. */
            className="group relative flex flex-col p-8 pl-16 md:pl-8 pt-8 md:pt-16 rounded-[2rem] border border-black/5 dark:border-white/5 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm transition-all duration-300"
          >
            {/* CAMADA DE BRILHO (Acende quando o cometa passa) */}
            <div 
              className="absolute inset-0 rounded-[2rem] border-2 border-transparent bg-blue-500/[0.02] dark:bg-blue-500/[0.04] opacity-0 animate-pulse-layer pointer-events-none z-0"
              style={{ animationDelay: `${i * 0.9}s` }} /* Atraso sequencial matemático */
            />

            {/* NÓ DE CONEXÃO (A bolinha no fio) */}
            <div 
              className="absolute left-8 top-8 md:left-1/2 md:top-8 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-2 border-black/20 dark:border-white/20 z-30 flex items-center justify-center animate-pulse-node group-hover:border-blue-500 group-hover:scale-110 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${i * 0.9}s` }}
            >
              {/* Núcleo do Nó piscando */}
              <div 
                className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 animate-pulse-dot group-hover:opacity-100 group-hover:scale-100 group-hover:shadow-[0_0_12px_2px_rgba(59,130,246,0.8)] transition-all duration-300"
                style={{ animationDelay: `${i * 0.9}s` }}
              />
            </div>

            {/* CONTEÚDO DO CARD (Sem os números grandes) */}
            <div className="relative z-10">
              <h3 className="text-xl font-sans font-medium text-black dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-black/60 dark:text-white/50 text-sm md:text-base font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* 6. PREÇO */}
      <section id="preco" className="w-full max-w-7xl px-4 md:px-6 py-24 mx-auto scroll-mt-20">
        <div className="text-center mb-16 reveal-on-scroll">
          <span className="text-blue-600 dark:text-blue-400 text-xs md:text-sm font-mono tracking-widest uppercase mb-3 block">Acesso</span>
          <h2 className="text-3xl md:text-5xl font-sans font-medium text-black dark:text-white">Assinaturas e Preços.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, i) => (
            <div key={i} className={`reveal-on-scroll flex flex-col p-8 rounded-[2.5rem] border backdrop-blur-md ${i === 1 ? 'bg-blue-600 text-white border-blue-500 shadow-2xl scale-105 z-10' : 'bg-white/50 dark:bg-white/5 border-white/60 dark:border-white/10 text-black dark:text-white'}`}>
              <h3 className={`text-xl font-medium mb-2 ${i === 1 ? 'text-blue-100' : 'text-black/50 dark:text-white/50'}`}>{plan.name}</h3>
              <div className="text-4xl font-sans font-medium mb-8 tracking-tighter">{plan.price}</div>
              <ul className="flex-1 flex flex-col gap-4 mb-8">
                {plan.perks.map((perk, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm font-light">
                    <span className={i === 1 ? 'text-blue-300' : 'text-blue-500'}>✓</span> {perk}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-2xl font-medium transition-all ${i === 1 ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20'}`}>
                Começar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TOKEN */}
      <section id="token" className="relative w-full max-w-7xl px-4 md:px-6 py-24 mx-auto scroll-mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 rounded-[3rem] blur-3xl -z-10"></div>
        <div className="flex flex-col md:flex-row items-center gap-16 reveal-on-scroll">
          <div className="flex-1 text-left">
            <span className="text-purple-600 dark:text-purple-400 text-xs md:text-sm font-mono tracking-widest uppercase mb-3 block">$KAXIS Utility</span>
            <h2 className="text-3xl md:text-5xl font-sans font-medium text-black dark:text-white mb-6">O Fim das Milhas. <br /> O Início da Liquidez.</h2>
            <h3 className="text-xl md:text-2xl font-medium text-black dark:text-white mb-2">Token KAXIS</h3>
            <p className="text-sm font-light leading-relaxed text-black/60 dark:text-white/60 mb-6">
              $KAXIS é o coração do ecossistema. Funciona como recompensa premium, com vantagens exclusivas para membros.
            </p>
            <div className="flex gap-4 font-mono text-xs text-black/50 dark:text-white/50 uppercase tracking-widest">
              <span className="px-4 py-2 border border-black/10 dark:border-white/10 rounded-full">Stake para APY</span>
              <span className="px-4 py-2 border border-black/10 dark:border-white/10 rounded-full">Governance</span>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-full border border-blue-500/30 flex items-center justify-center animate-spin-slow">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -top-1.5 shadow-[0_0_15px_blue]"></div>
              <div className="w-3/4 h-3/4 rounded-full border border-purple-500/30 flex items-center justify-center">
                <span className="text-4xl text-black dark:text-white font-serif tracking-[0.2em] animate-pulse-slow">KAXIS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. DEPOIMENTOS */}
      <section id="depoimentos" className="w-full bg-[#f8f9fb] dark:bg-[#0a0a0a] border-y border-black/5 dark:border-white/5 py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-3xl md:text-4xl font-sans font-medium text-black dark:text-white">Não confie. Verifique.</h2>
            <p className="text-black/50 dark:text-white/50 mt-4">Comunidade transparente utilizando a rede ativamente.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-on-scroll delay-100">
            {["O nível de transparência do contrato de yield é absurdo. Vejo meu saldo crescer em tempo real.", "Nunca pensei que usar o cartão no supermercado me daria frações de cripto que eu posso sacar a qualquer momento.", "Sou lojista. A integração demorou 15 minutos e os clientes estão voltando porque AMAM o cashback real."].map((text, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 shadow-sm hover:shadow-lg transition-all">
                <div className="flex gap-1 mb-4 text-blue-500">★★★★★</div>
                <p className="text-black/70 dark:text-white/70 italic text-sm font-light leading-relaxed mb-6">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20"></div>
                  <div>
                    <h4 className="text-xs font-bold text-black dark:text-white">{['Usuario_29', 'Anon_Max', 'StoreOwner100'][i]}</h4>
                    <span className="text-[10px] text-black/40 dark:text-white/40">Verified Member</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq" className="w-full max-w-4xl px-4 md:px-6 py-24 mx-auto scroll-mt-20">
        <div className="text-center mb-16 reveal-on-scroll">
          <span className="text-blue-600 dark:text-blue-400 text-xs md:text-sm font-mono tracking-widest uppercase mb-3 block">FAQ</span>
          <h2 className="text-3xl md:text-5xl font-sans font-medium text-black dark:text-white">Dúvidas Frequentes.</h2>
        </div>
        <div className="flex flex-col gap-4 reveal-on-scroll delay-100">
          {faqs.map((faq, i) => (
            <details key={i} className="group p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 cursor-pointer hover:border-blue-500/30 transition-all [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between font-medium text-black dark:text-white outline-none">
                {faq.q}
                <span className="transition-transform group-open:rotate-45 text-xl font-light">+</span>
              </summary>
              <div className="mt-4 text-black/60 dark:text-white/60 font-light text-sm leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato" className="w-full border-t border-black/10 dark:border-white/10 pt-20 pb-12 px-6 flex flex-col items-center bg-[#F2F4F7] dark:bg-[#050505]">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col items-start text-left md:col-span-1">
            <h3 className="font-serif font-bold text-2xl tracking-[0.2em] text-black dark:text-white mb-6">KAXIS</h3>
            <p className="text-sm text-black/50 dark:text-white/50 font-light leading-relaxed mb-6">O clube de benefícios de alto rendimento que integra suas compras diárias a uma tecnologia flexível e escalável de recompensas contínuas.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all text-black/40 dark:text-white/40">𝕏</a>
              <a href="#" className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-[#5865F2] hover:text-white transition-all text-black/40 dark:text-white/40">D</a>
              <a href="#" className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-zinc-800 hover:text-white transition-all text-black/40 dark:text-white/40">G</a>
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="font-mono text-xs uppercase tracking-widest text-black/80 dark:text-white/80 font-bold mb-6">Site</h4>
            <a href="#como-fazemos" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Como Fazemos</a>
            <a href="#preco" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Planos & Preço</a>
            <a href="#token" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">KAXIS Token</a>
            <a href="#faq" className="text-sm text-black/50 dark:text-white/50 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">FAQ</a>
          </div>

          <div className="flex flex-col">
            <h4 className="font-mono text-xs uppercase tracking-widest text-black/80 dark:text-white/80 font-bold mb-6">Legal</h4>
            <a href="#" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Termos de Uso</a>
            <a href="#" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Política de Privacidade</a>
            <a href="#" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">KYC / AML</a>
            <a href="#" className="text-sm text-black/50 dark:text-white/50 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Whitepaper PDF</a>
          </div>

          <div className="flex flex-col">
            <h4 className="font-mono text-xs uppercase tracking-widest text-black/80 dark:text-white/80 font-bold mb-6">Contato</h4>
            <a href="mailto:hello@kaxis.club" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">hello@kaxis.club</a>
            <a href="mailto:support@kaxis.club" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">support@kaxis.club</a>
            <p className="text-sm text-black/50 dark:text-white/50 italic mt-4">Respondemos em até 2hrs, suporte 24/7 global.</p>
          </div>
        </div>

        <div className="w-full max-w-7xl border-t border-black/5 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-black/30 dark:text-white/20 font-mono uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Kaxis Protocol.</p>
          <p className="mt-2 md:mt-0">De/Centralized Future.</p>
        </div>
      </footer>
    </>
  );
}