"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/src/components/navbar";

// --- DADOS DO TEMA ---
const ecosystemCards = [
  { id: 1, icon: "💸", title: "Cashback Descentralizado", desc: "Receba recompensas instantâneas no seu aplicativo a cada compra." },
  { id: 2, icon: "📈", title: "Yield Passivo (Staking)", desc: "Seu cashback não fica parado. Faça staking do seu saldo e gere rendimentos automáticos." },
  { id: 3, icon: "🛍️", title: "Marketplace Exclusivo", desc: "Utilize seus tokens em uma rede de parceiros globais com descontos especiais." },
  { id: 4, icon: "⚖️", title: "Poder de Voto", desc: "Tenha voz ativa no ecossistema. A comunidade decide as próximas parcerias." },
];

// Dados dos parceiros
const localPartners = [
  { name: 'Aliexpress', src: '/partners/aliexpress.png', domain: 'aliexpress.com' },
  { name: 'Amazon', src: '/partners/Amazon.png', domain: 'amazon.com.br' },
  { name: 'eBay', src: '/partners/ebay.png', domain: 'ebay.com' },
  { name: 'iFood', src: '/partners/ifood.png', domain: 'ifood.com.br' },
  { name: 'Magalu', src: '/partners/magalu.png', domain: 'magazineluiza.com.br' },
  { name: 'Mercado Livre', src: '/partners/Mercado Livre.png', domain: 'mercadolivre.com.br' },
  { name: 'Shein', src: '/partners/shein.png', domain: 'shein.com' },
  { name: 'Shopee', src: '/partners/Shopee.png', domain: 'shopee.com.br' },
  { name: 'Temu', src: '/partners/temu.png', domain: 'temu.com' },
  { name: 'Walmart', src: '/partners/walmart.png', domain: 'walmart.com' },
];

const repeatedPartners = [...localPartners, ...localPartners, ...localPartners];

const howItWorksSteps = [
  { step: "01", title: "Integração", desc: "Marcas e parceiros se integram ao Kaxis via API." },
  { step: "02", title: "Consumo", desc: "Você consome normalmente na rede credenciada." },
  { step: "03", title: "Recompensa", desc: "Valor retorna como token KAXIS direto para sua carteira." },
  { step: "04", title: "Liberdade", desc: "Faça staking, troque por fiat, ou use nas marcas." }
];

const pricingPlans = [
  { name: "Explorer", price: "Free", perks: ["Acesso Básico", "1.5% Cashback Base", "Carteira Custodial"] },
  { name: "Pro", price: "$ 55/mês", perks: ["Acesso Premium", "Até 3% Cashback", "Saques Livres de Taxa", "Prioridade Yield"] },
  { name: "Whale Pass", price: "TBA", perks: ["Convite Exclusivo", "Até 8% Cashback", "Governança DAO", "Cartão Metálico"] }
];

const faqs = [
  { q: "O que é o Kaxis Club?", a: "Um clube de benefícios on-chain onde seu cashback é um ativo com valor real e flexibilidade total." },
  { q: "Como sacar meu saldo?", a: "Transfira seus KAXIS na dashboard para qualquer exchange." },
  { q: "Meus pontos podem expirar?", a: "Não. Diferente de sistemas tradicionais, a custódia é sua. Token não expira." }
];

// --- DADOS DOS CARTÕES INTERATIVOS ---
const creditCards = [
  { id: 1, src: '/cards/card-1.png', alt: 'Kaxis Explorer', gradient: 'from-blue-600 to-blue-900', borderGlow: 'rgba(59,130,246,1)' },
  { id: 2, src: '/cards/card-2.png', alt: 'Kaxis Pro', gradient: 'from-zinc-800 to-black', borderGlow: 'rgba(255,255,255,0.8)' },
  { id: 3, src: '/cards/card-3.png', alt: 'Kaxis Whale', gradient: 'from-purple-600 to-indigo-900', borderGlow: 'rgba(168,85,247,1)' }
];

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (deckRef.current && !deckRef.current.contains(event.target as Node)) {
        setActiveCard(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Navbar />

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Ubuntu+Sans:wght@400;500;700&display=swap');
          @keyframes spin { 100% { transform: rotate(360deg); } }
          @keyframes infinite-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-infinite-scroll { animation: infinite-scroll 45s linear infinite; width: max-content; }
        `}
      </style>

      {/* 🚀 PRELOADER */}
      {showPreloader && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F2F4F7] dark:bg-[#050505] transition-opacity duration-1000">
          <div className="flex flex-col items-center animate-blur-reveal">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <Image
                src="/kaxis-logo.png"
                alt="Kaxis Logo"
                fill
                sizes="128px"
                priority
                className="object-contain dark:brightness-0 dark:invert"
              />
            </div>
            <p className="text-black/50 dark:text-white/50 text-[10px] mt-6 tracking-[0.4em] uppercase font-mono">Smart Cashback</p>
          </div>
        </div>
      )}

      <main className={`flex flex-col items-center overflow-hidden transition-opacity duration-1000 bg-[#F2F4F7] dark:bg-[#050505] min-h-screen ${showPreloader ? 'opacity-0' : 'opacity-100'}`}>

        {/* 1. HERO & SPONSORS */}
        <section id="home" className="relative w-full max-w-7xl px-4 md:px-12 pt-32 md:pt-32 pb-6 mx-auto flex flex-col items-center justify-between">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 mb-0">

            <div className="flex flex-col items-start z-10 reveal-on-scroll flex-1 w-full text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-full bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-[10px] md:text-xs font-mono tracking-wide text-black/80 dark:text-white/80 uppercase">Powered by Solana</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-sans font-medium tracking-tight mb-6 text-black dark:text-white leading-[1.1]">
                1 Cupom. <span style={{ fontFamily: "'Ubuntu Sans', sans-serif" }} className="whitespace-nowrap font-bold">Vários Cashbacks.</span><br />
                <span className="animate-crypto font-light italic opacity-80">Receba em Cripto.</span>
              </h1>

              <p className="text-black/60 dark:text-white/60 text-base md:text-lg max-w-md font-light leading-relaxed mb-8"></p>
              <Link href="/login" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl text-sm font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                Login / Cadastrar-se
              </Link>
            </div>

            {/* 🃏 CARTÕES INTERATIVOS E DETACÁVEIS */}
            <div className="flex-1 flex justify-center items-center w-full reveal-on-scroll delay-100 min-h-[400px] md:min-h-[500px]" ref={deckRef}>

              <div className="relative flex justify-center items-center w-64 h-96 md:w-[300px] md:h-[450px] group perspective-[1200px]">
                {creditCards.map((card, index) => {
                  const isActive = activeCard === card.id;
                  const hasActive = activeCard !== null;

                  let hoverTransform = "";
                  if (index === 0) hoverTransform = "group-hover:-translate-x-12 group-hover:-translate-y-4 md:group-hover:-translate-x-24 group-hover:-rotate-12";
                  if (index === 1) hoverTransform = "group-hover:-translate-y-8 z-20";
                  if (index === 2) hoverTransform = "group-hover:translate-x-12 group-hover:-translate-y-4 md:group-hover:translate-x-24 group-hover:rotate-12";

                  let activeTransform = "";
                  if (isActive) {
                    activeTransform = "z-50 scale-105 md:scale-110 -translate-y-4 md:-translate-y-6 rotate-0 shadow-[0_30px_60px_rgba(0,0,0,0.6)]";
                  } else if (hasActive) {
                    activeTransform = "z-10 scale-95 opacity-40 blur-[3px] translate-y-4";
                  }

                  return (
                    <div
                      key={card.id}
                      onClick={() => setActiveCard(isActive ? null : card.id)}
                      className={`absolute inset-0 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom ${hasActive ? activeTransform : hoverTransform}`}
                      style={{ zIndex: isActive ? 50 : (index === 1 && !hasActive ? 20 : 10) }}
                    >
                      <div className="absolute inset-[-3px] rounded-[2.5rem] overflow-hidden">
                        <div
                          className="absolute inset-[-50%] w-[200%] h-[200%] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            backgroundImage: `conic-gradient(from 0deg, transparent 0 340deg, ${card.borderGlow} 360deg)`,
                            animation: 'spin 4s linear infinite'
                          }}
                        ></div>
                      </div>

                      <div className={`absolute inset-[3px] rounded-[2.5rem] overflow-hidden bg-gradient-to-br ${card.gradient} shadow-2xl flex flex-col items-center justify-center p-6 border border-white/10 dark:border-white/5`}>

                        <Image
                          src={card.src}
                          alt={card.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover z-0 mix-blend-overlay opacity-60"
                        />

                        <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
                          <div className="flex justify-between items-start w-full">
                            <span className="text-2xl opacity-80">💳</span>
                            <span className="font-mono text-[10px] text-white/50 tracking-[0.2em] uppercase">Kaxis Club</span>
                          </div>

                          <div className="w-10 h-8 rounded-md bg-gradient-to-br from-yellow-100/30 to-yellow-600/30 border border-white/20 backdrop-blur-sm mt-8"></div>

                          <div className="mt-auto">
                            <div className="font-mono text-lg md:text-xl tracking-[0.15em] text-white/90 mb-4 drop-shadow-md">
                              **** **** **** {1000 + card.id * 1111}
                            </div>
                            <div className="flex justify-between items-end w-full">
                              <div className="flex flex-col text-white/70 font-mono">
                                <span className="text-[8px] uppercase tracking-widest opacity-60">APY</span>
                                <span className="text-xs md:text-sm tracking-widest">20%</span>
                              </div>
                              <div className="flex flex-col text-white/70 font-mono text-right">
                                <span className="text-[8px] uppercase tracking-widest opacity-60">Valid Thru</span>
                                <span className="text-xs md:text-sm tracking-widest">12/28</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 🔄 CARROSSEL INFINITO DE PARCEIROS COM NEXT/IMAGE */}
          <div className="w-full mt-2 reveal-on-scroll delay-300">
            <div className="relative w-full overflow-hidden flex items-center" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>

              <div className="flex animate-infinite-scroll hover:[animation-play-state:paused]">
                {/* METADE 1 */}
                <div className="flex items-center gap-12 md:gap-20 px-6 md:px-10 shrink-0">
                  {repeatedPartners.map((partner, index) => (
                    <a key={`set1-${index}`} href={`https://${partner.domain}`} target="_blank" rel="noopener noreferrer" className="group relative w-20 h-6 md:w-32 md:h-10 flex items-center justify-center shrink-0 transition-transform duration-300 hover:-translate-y-1">
                      <Image
                        src={partner.src}
                        alt={partner.name}
                        title={partner.name}
                        fill
                        sizes="(max-width: 768px) 100px, 150px"
                        className="object-contain grayscale opacity-40 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 cursor-pointer"
                      />
                    </a>
                  ))}
                </div>

                {/* METADE 2 */}
                <div className="flex items-center gap-12 md:gap-20 px-6 md:px-10 shrink-0">
                  {repeatedPartners.map((partner, index) => (
                    <a key={`set2-${index}`} href={`https://${partner.domain}`} target="_blank" rel="noopener noreferrer" className="group relative w-20 h-6 md:w-32 md:h-10 flex items-center justify-center shrink-0 transition-transform duration-300 hover:-translate-y-1">
                      <Image
                        src={partner.src}
                        alt={partner.name}
                        title={partner.name}
                        fill
                        sizes="(max-width: 768px) 100px, 150px"
                        className="object-contain grayscale opacity-40 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 cursor-pointer"
                      />
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. DEPOIMENTOS */}
        <section id="depoimentos" className="w-full pb-20 pt-10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-on-scroll">
              {["O nível de transparência do contrato de yield é absurdo.", "Nunca pensei que usar o cartão no mercado daria cripto.", "Sou lojista. A integração demorou 15 minutos."].map((text, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 shadow-sm">
                  <div className="flex gap-1 mb-4 text-blue-500 text-xs">★★★★★</div>
                  <p className="text-black/70 dark:text-white/70 italic text-sm font-light leading-relaxed mb-6">"{text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20"></div>
                    <div>
                      <h4 className="text-[10px] font-bold text-black dark:text-white">{['Usuario_29', 'Anon_Max', 'StoreOwner100'][i]}</h4>
                      <span className="text-[9px] uppercase tracking-tighter text-black/40 dark:text-white/40">Verified Member</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. TOKEN ($KAXIS Utility) */}
        <section id="token" className="relative w-full max-w-7xl px-4 md:px-6 py-20 mx-auto scroll-mt-20 overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 rounded-[3rem] blur-3xl -z-10"></div>
          <div className="flex flex-col md:flex-row items-center gap-16 reveal-on-scroll">
            <div className="flex-1 text-left">
              <span className="text-purple-600 dark:text-purple-400 text-xs md:text-sm font-mono tracking-widest uppercase mb-3 block">$KAXIS Utility</span>
              <h2 className="text-3xl md:text-5xl font-sans font-medium text-black dark:text-white mb-6">O Fim das Milhas. <br /> O Início da Liquidez.</h2>
              <h3 className="text-xl md:text-2xl font-medium text-black dark:text-white mb-2">Token KAXIS</h3>
              <p className="text-sm font-light leading-relaxed text-black/60 dark:text-white/60 mb-6">$KAXIS é o coração do ecossistema. Funciona como recompensa premium, com vantagens exclusivas para membros.</p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-full border border-blue-500/30 flex items-center justify-center animate-spin-slow">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -top-1.5 shadow-[0_0_15px_blue]"></div>
                <div className="w-3/4 h-3/4 rounded-full border border-purple-500/30 flex items-center justify-center">
                  <span className="text-4xl text-black dark:text-white font-serif tracking-[0.2em] animate-pulse-slow">KAXIS CLUB</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PREÇO */}
        <section id="preco" className="w-full max-w-7xl px-4 md:px-6 py-20 mx-auto scroll-mt-20">
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
                    <li key={j} className="flex items-center gap-3 text-sm font-light"><span className={i === 1 ? 'text-blue-300' : 'text-blue-500'}>✓</span> {perk}</li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-2xl font-medium transition-all ${i === 1 ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20'}`}>Começar</button>
              </div>
            ))}
          </div>
        </section>

        {/* 5. PROCESSO */}
        <section id="como-fazemos" className="w-full bg-white dark:bg-zinc-950 py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16 md:mb-20 reveal-on-scroll">
              <span className="text-blue-600 dark:text-blue-400 text-xs md:text-sm font-mono tracking-widest uppercase mb-3 block">Processo</span>
              <h2 className="text-3xl md:text-5xl font-sans font-medium text-black dark:text-white">Como fazemos isso.</h2>
            </div>
            <style>
              {`
                @keyframes flow-y { 0% { top: -10%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 110%; opacity: 0; } }
                @keyframes flow-x { 0% { left: -15%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 115%; opacity: 0; } }
                @keyframes sync-glow { 0%, 100% { opacity: 0; border-color: transparent; box-shadow: none; } 15%, 25% { opacity: 1; border-color: rgba(59, 130, 246, 0.5); box-shadow: 0 4px 30px -5px rgba(59, 130, 246, 0.2); } 40% { opacity: 0; border-color: transparent; box-shadow: none; } }
                .animate-comet-y { animation: flow-y 4s linear infinite; }
                .animate-comet-x { animation: flow-x 4s linear infinite; }
                .animate-pulse-layer { animation: sync-glow 4s linear infinite; }
              `}
            </style>
            <div className="relative max-w-5xl mx-auto">
              <div className="md:hidden absolute top-0 bottom-0 left-8 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent z-0">
                <div className="absolute left-1/2 -translate-x-1/2 h-48 w-[3px] bg-gradient-to-b from-transparent via-blue-500 to-transparent blur-[1px] animate-comet-y z-10" />
              </div>
              <div className="hidden md:block absolute top-8 -translate-y-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent z-0">
                <div className="absolute top-1/2 -translate-y-1/2 w-48 h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-[1px] animate-comet-x z-10" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-20">
                {howItWorksSteps.map((item, i) => (
                  <div key={i} className="group relative flex flex-col p-8 pl-16 md:pl-8 pt-8 md:pt-16 rounded-[2rem] border border-black/5 dark:border-white/5 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm transition-all duration-300">
                    <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent bg-blue-500/[0.02] dark:bg-blue-500/[0.04] opacity-0 animate-pulse-layer pointer-events-none z-0" style={{ animationDelay: `${i * 0.9}s` }} />
                    <div className="absolute left-8 top-8 md:left-1/2 md:top-8 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-2 border-black/20 dark:border-white/20 z-30 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-sans font-medium text-black dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
                      <p className="text-black/60 dark:text-white/50 text-sm md:text-base font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
        <section id="faq" className="w-full max-w-4xl px-4 md:px-6 py-20 mx-auto scroll-mt-20">
          <div className="text-center mb-16 reveal-on-scroll">
            <span className="text-blue-600 dark:text-blue-400 text-xs md:text-sm font-mono tracking-widest uppercase mb-3 block">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-sans font-medium text-black dark:text-white">Dúvidas Frequentes.</h2>
          </div>
          <div className="flex flex-col gap-4 reveal-on-scroll delay-100">
            {faqs.map((faq, i) => (
              <details key={i} className="group p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 cursor-pointer hover:border-blue-500/30 transition-all">
                <summary className="flex items-center justify-between font-medium text-black dark:text-white outline-none">
                  {faq.q} <span className="transition-transform group-open:rotate-45 text-xl font-light">+</span>
                </summary>
                <div className="mt-4 text-black/60 dark:text-white/60 font-light text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contato" className="w-full border-t border-black/10 dark:border-white/10 pt-20 pb-12 px-6 flex flex-col items-center bg-[#F2F4F7] dark:bg-[#050505]">
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col items-start text-left md:col-span-1">
              <h3 className="font-serif font-bold text-2xl tracking-[0.2em] text-black dark:text-white mb-6">KAXIS</h3>
              <p className="text-sm text-black/50 dark:text-white/50 font-light leading-relaxed mb-6">O clube de benefícios de alto rendimento que integra suas compras diárias a uma tecnologia flexível.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">𝕏</a>
                <a href="#" className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-[#5865F2] hover:text-white transition-all">D</a>
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="font-mono text-xs uppercase tracking-widest text-black/80 dark:text-white/80 font-bold mb-6">Site</h4>
              <a href="#como-fazemos" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-blue-500 transition-colors">Como Fazemos</a>
              <a href="#preco" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-blue-500 transition-colors">Planos & Preço</a>
              <a href="#token" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-blue-500 transition-colors">KAXIS Token</a>
              <a href="#faq" className="text-sm text-black/50 dark:text-white/50 hover:text-blue-500 transition-colors">FAQ</a>
            </div>
            <div className="flex flex-col">
              <h4 className="font-mono text-xs uppercase tracking-widest text-black/80 dark:text-white/80 font-bold mb-6">Legal</h4>
              <a href="#" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-blue-500 transition-colors">Termos de Uso</a>
              <a href="#" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-blue-500 transition-colors">Política de Privacidade</a>
            </div>
            <div className="flex flex-col">
              <h4 className="font-mono text-xs uppercase tracking-widest text-black/80 dark:text-white/80 font-bold mb-6">Contato</h4>
              <a href="mailto:hello@kaxis.club" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-blue-500 transition-colors">hello@kaxis.club</a>
              <p className="text-sm text-black/50 dark:text-white/50 italic mt-4">Suporte 24/7 global.</p>
            </div>
          </div>
          <div className="w-full max-w-7xl border-t border-black/5 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-black/30 dark:text-white/20 font-mono uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Kaxis Protocol.</p>
            <p className="mt-2 md:mt-0">De/Centralized Future.</p>
          </div>
        </footer>
      </main>
    </>
  );
}