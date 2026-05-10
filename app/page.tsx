"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/src/components/navbar";
import { Eye, Stethoscope, Microscope, Star, HeartPulse } from "lucide-react";

// --- DADOS DA CLÍNICA ---
const patientJourneySteps = [
  { step: "01", title: "Agendamento", desc: "Marque sua consulta de forma rápida e digital pelo nosso sistema." },
  { step: "02", title: "Triagem", desc: "Avaliação inicial com equipamentos de alta precisão." },
  { step: "03", title: "Consulta", desc: "Atendimento humanizado com nossos oftalmologistas especialistas." },
  { step: "04", title: "Acompanhamento", desc: "Monitoramento contínuo da sua saúde ocular." }
];

const clinicServices = [
  { name: "Check-up de Rotina", price: "Prevenção", perks: ["Acuidade Visual", "Pressão Intraocular", "Mapeamento de Retina"] },
  { name: "Exames Avançados", price: "Diagnóstico", perks: ["Tomografia OCT", "Topografia de Córnea", "Campimetria Computadorizada", "Laudo Imediato"] },
  { name: "Centro Cirúrgico", price: "Tratamento", perks: ["Cirurgia de Catarata", "Cirurgia Refrativa", "Tratamento de Ceratocone", "Acompanhamento Pós-operatório"] }
];

const faqs = [
  { q: "Com que frequência devo ir ao oftalmologista?", a: "Recomendamos pelo menos uma consulta anual para check-up de rotina, ou imediatamente caso note alguma alteração na visão." },
  { q: "A clínica atende convênios médicos?", a: "Sim, atendemos os principais planos de saúde do mercado. Entre em contato com nossa recepção para verificar a cobertura." },
  { q: "Como me preparo para exames com dilatação?", a: "Venha com um acompanhante e traga óculos escuros, pois a dilatação aumenta a sensibilidade à luz e embaça a visão temporariamente." }
];

// Depoimentos para o Carrossel
const testimonials = [
  { text: "Atendimento impecável! A cirurgia de catarata do meu pai foi um sucesso.", author: "Maria S." },
  { text: "Equipe muito atenciosa. Os equipamentos são super modernos.", author: "João P." },
  { text: "Recuperei minha visão 100% após a cirurgia refrativa. Gratidão à Dra. Melo.", author: "Ana C." },
  { text: "Excelente estrutura e pontualidade no atendimento. Recomendo muito.", author: "Carlos E." },
  { text: "Fiz todos os exames no mesmo dia. Muito prático e eficiente.", author: "Luciana C." }
];
const repeatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

// --- DADOS DOS CARTÕES INTERATIVOS ---
const specialtyCards = [
  { id: 1, title: 'Consulta Geral', icon: Stethoscope, gradient: 'from-teal-600 to-teal-900', borderGlow: 'rgba(20,184,166,1)', desc: 'Avaliação completa da saúde ocular' },
  { id: 2, title: 'Exames Avançados', icon: Microscope, gradient: 'from-cyan-800 to-slate-900', borderGlow: 'rgba(6,182,212,0.8)', desc: 'Tecnologia de ponta para diagnósticos' },
  { id: 3, title: 'Microcirurgia', icon: Eye, gradient: 'from-emerald-600 to-emerald-900', borderGlow: 'rgba(16,185,129,1)', desc: 'Procedimentos seguros e precisos' }
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-[#050505] transition-opacity duration-1000">
          <div className="flex flex-col items-center animate-blur-reveal">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <Image
                src="/kaxis-logo.png"
                alt="Logo Clínica"
                fill
                sizes="128px"
                priority
                className="object-contain dark:brightness-0 dark:invert"
              />
            </div>
            <p className="text-teal-600 dark:text-teal-400 text-[10px] mt-6 tracking-[0.4em] uppercase font-mono font-bold">Excelência em Visão</p>
          </div>
        </div>
      )}

      <main className={`flex flex-col items-center overflow-hidden transition-opacity duration-1000 bg-[#F8FAFC] dark:bg-[#050505] min-h-screen ${showPreloader ? 'opacity-0' : 'opacity-100'}`}>

        {/* 1. HERO & SPONSORS */}
        <section id="home" className="relative w-full max-w-7xl px-4 md:px-12 pt-28 md:pt-40 pb-6 mx-auto flex flex-col items-center justify-between">

          {/* Ajuste crucial para o Mobile: Mudamos para flex-col no mobile, mantendo o texto acima dos cartões */}
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 mb-0">

            <div className="flex flex-col items-center lg:items-start z-10 reveal-on-scroll w-full lg:w-1/2 text-center lg:text-left pt-10 lg:pt-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-full bg-white/60 dark:bg-white/5 border border-teal-500/20 shadow-sm backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                <span className="text-[10px] md:text-xs font-mono tracking-wide text-teal-800 dark:text-teal-400 uppercase font-semibold">Melo Oftalmologia</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-sans font-medium tracking-tight mb-6 text-black dark:text-white leading-[1.1]">
                Sua Visão. <span style={{ fontFamily: "'Ubuntu Sans', sans-serif" }} className="whitespace-nowrap font-bold text-teal-600 dark:text-teal-400">Nosso Foco.</span><br />
                <span className="font-light italic opacity-80 text-xl md:text-3xl mt-4 block text-black/70 dark:text-white/70">Saúde ocular levada a sério.</span>
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center lg:justify-start">
                <Link href="/crm" className="bg-teal-600 hover:bg-teal-500 text-white px-8 py-4 rounded-2xl text-sm font-medium transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] text-center">
                  Agendar Consulta
                </Link>
                <Link href="#como-fazemos" className="bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-black dark:text-white border border-black/10 dark:border-white/10 px-8 py-4 rounded-2xl text-sm font-medium transition-all text-center">
                  Conheça a Clínica
                </Link>
              </div>
            </div>

            {/* 🃏 CARTÕES INTERATIVOS E DETACÁVEIS */}
            <div className="flex justify-center items-center w-full lg:w-1/2 reveal-on-scroll delay-100 min-h-[380px] md:min-h-[500px] mt-10 lg:mt-0" ref={deckRef}>

              {/* Reduzimos um pouco o tamanho no mobile (w-56 h-80) para garantir que caiba na tela sem quebrar a UI */}
              <div className="relative flex justify-center items-center w-56 h-80 md:w-[300px] md:h-[450px] group perspective-[1200px]">
                {specialtyCards.map((card, index) => {
                  const isActive = activeCard === card.id;
                  const hasActive = activeCard !== null;
                  const CardIcon = card.icon;

                  // Lógica de Leque ajustada para Mobile
                  let hoverTransform = "";
                  if (index === 0) hoverTransform = "group-hover:-translate-x-10 group-hover:-translate-y-4 md:group-hover:-translate-x-24 md:group-hover:-translate-y-4 group-hover:-rotate-12";
                  if (index === 1) hoverTransform = "group-hover:-translate-y-8 z-20";
                  if (index === 2) hoverTransform = "group-hover:translate-x-10 group-hover:-translate-y-4 md:group-hover:translate-x-24 md:group-hover:-translate-y-4 group-hover:rotate-12";

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

                      <div className={`absolute inset-[3px] rounded-[2.5rem] overflow-hidden bg-gradient-to-br ${card.gradient} shadow-2xl flex flex-col items-center justify-center p-8 border border-white/10 dark:border-white/5 text-white`}>

                        <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
                          <div className="flex justify-between items-start w-full">
                            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
                              <CardIcon size={32} strokeWidth={1.5} />
                            </div>
                            <span className="font-mono text-[8px] md:text-[10px] text-white/50 tracking-[0.2em] uppercase">Melo Oftalmo</span>
                          </div>

                          <div className="mt-auto">
                            <h3 className="font-sans font-medium text-xl md:text-2xl mb-2 text-white/90 drop-shadow-md">
                              {card.title}
                            </h3>
                            <p className="text-white/70 text-xs md:text-sm font-light">
                              {card.desc}
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 🔄 CARROSSEL INFINITO DE DEPOIMENTOS */}
          <div className="w-full mt-16 md:mt-20 reveal-on-scroll delay-300">
            <h3 className="text-center text-sm uppercase tracking-widest text-black/40 dark:text-white/40 mb-8 font-mono">O que nossos pacientes dizem</h3>
            <div className="relative w-full overflow-hidden flex items-center" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>

              <div className="flex animate-infinite-scroll hover:[animation-play-state:paused] py-4">
                {/* METADE 1 */}
                <div className="flex items-center gap-6 px-3 shrink-0">
                  {repeatedTestimonials.map((t, index) => (
                    <div key={`set1-${index}`} className="w-[300px] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-6 rounded-3xl shadow-sm">
                       <div className="flex text-teal-500 mb-3"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                       <p className="text-sm text-black/70 dark:text-white/70 italic mb-4">"{t.text}"</p>
                       <p className="text-xs font-bold text-black/90 dark:text-white/90">— {t.author}</p>
                    </div>
                  ))}
                </div>

                {/* METADE 2 */}
                <div className="flex items-center gap-6 px-3 shrink-0">
                  {repeatedTestimonials.map((t, index) => (
                    <div key={`set2-${index}`} className="w-[300px] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-6 rounded-3xl shadow-sm">
                       <div className="flex text-teal-500 mb-3"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                       <p className="text-sm text-black/70 dark:text-white/70 italic mb-4">"{t.text}"</p>
                       <p className="text-xs font-bold text-black/90 dark:text-white/90">— {t.author}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. DIFERENCIAIS */}
        <section id="diferenciais" className="w-full pb-20 pt-10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-on-scroll">
              {["Equipe médica altamente qualificada e com especialização nos maiores centros.", "Infraestrutura completa com equipamentos de última geração para exames precisos.", "Atendimento humanizado e focado no bem-estar e conforto do paciente."].map((text, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/50 border border-teal-500/10 dark:border-teal-500/20 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-6">
                    {i === 0 ? <Stethoscope size={24} /> : i === 1 ? <Microscope size={24} /> : <HeartPulse size={24} />}
                  </div>
                  <h4 className="text-lg font-bold text-black dark:text-white mb-3">{["Corpo Clínico", "Tecnologia", "Cuidado"][i]}</h4>
                  <p className="text-black/70 dark:text-white/70 text-sm font-light leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. TECNOLOGIA (Animação do Olho/Lente) */}
        <section id="tecnologia" className="relative w-full max-w-7xl px-4 md:px-6 py-20 mx-auto scroll-mt-20 overflow-hidden">
          <div className="absolute inset-0 bg-teal-500/5 dark:bg-cyan-500/10 rounded-[3rem] blur-3xl -z-10"></div>
          <div className="flex flex-col md:flex-row items-center gap-16 reveal-on-scroll">
            <div className="flex-1 text-left">
              <span className="text-teal-600 dark:text-teal-400 text-xs md:text-sm font-mono tracking-widest uppercase mb-3 block">Precisão Diagnóstica</span>
              <h2 className="text-3xl md:text-5xl font-sans font-medium text-black dark:text-white mb-6">Enxergue o Futuro. <br /> Com Clareza.</h2>
              <h3 className="text-xl md:text-2xl font-medium text-black dark:text-white mb-2">Equipamentos de Ponta</h3>
              <p className="text-sm font-light leading-relaxed text-black/60 dark:text-white/60 mb-6">Nossa clínica é equipada com a mais recente tecnologia oftalmológica para garantir diagnósticos precisos e tratamentos seguros para todas as patologias oculares.</p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-full border border-teal-500/30 flex items-center justify-center animate-spin-slow">
                <div className="absolute w-3 h-3 bg-teal-500 rounded-full -top-1.5 shadow-[0_0_15px_teal]"></div>
                <div className="w-3/4 h-3/4 rounded-full border border-cyan-500/30 flex items-center justify-center relative overflow-hidden">
                   {/* Ícone de olho simulando uma lente */}
                   <Eye size={120} strokeWidth={0.5} className="text-teal-500/20 absolute animate-pulse-slow" />
                  <span className="text-2xl text-black dark:text-white font-sans tracking-[0.1em] z-10 font-medium bg-white/50 dark:bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">VISÃO PERFEITA</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SERVIÇOS / PLANOS */}
        <section id="servicos" className="w-full max-w-7xl px-4 md:px-6 py-20 mx-auto scroll-mt-20">
          <div className="text-center mb-16 reveal-on-scroll">
            <span className="text-teal-600 dark:text-teal-400 text-xs md:text-sm font-mono tracking-widest uppercase mb-3 block">Especialidades</span>
            <h2 className="text-3xl md:text-5xl font-sans font-medium text-black dark:text-white">Nossos Serviços.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clinicServices.map((plan, i) => (
              <div key={i} className={`reveal-on-scroll flex flex-col p-8 rounded-[2.5rem] border backdrop-blur-md ${i === 1 ? 'bg-teal-600 text-white border-teal-500 shadow-2xl scale-105 z-10' : 'bg-white/80 dark:bg-white/5 border-black/5 dark:border-white/10 text-black dark:text-white'}`}>
                <h3 className={`text-xl font-medium mb-2 ${i === 1 ? 'text-teal-100' : 'text-black/50 dark:text-white/50'}`}>{plan.name}</h3>
                <div className="text-3xl font-sans font-medium mb-8 tracking-tighter">{plan.price}</div>
                <ul className="flex-1 flex flex-col gap-4 mb-8">
                  {plan.perks.map((perk, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-light"><span className={i === 1 ? 'text-teal-200' : 'text-teal-500'}>✓</span> {perk}</li>
                  ))}
                </ul>
                <Link href="/crm" className={`w-full py-4 rounded-2xl font-medium transition-all text-center block ${i === 1 ? 'bg-white text-teal-600 hover:bg-teal-50' : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20'}`}>Agendar Consulta</Link>
              </div>
            ))}
          </div>
        </section>

        {/* 5. PROCESSO */}
        <section id="como-fazemos" className="w-full bg-white dark:bg-zinc-950 py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16 md:mb-20 reveal-on-scroll">
              <span className="text-teal-600 dark:text-teal-400 text-xs md:text-sm font-mono tracking-widest uppercase mb-3 block">Jornada</span>
              <h2 className="text-3xl md:text-5xl font-sans font-medium text-black dark:text-white">Como cuidamos de você.</h2>
            </div>
            <style>
              {`
                @keyframes flow-y { 0% { top: -10%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 110%; opacity: 0; } }
                @keyframes flow-x { 0% { left: -15%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 115%; opacity: 0; } }
                @keyframes sync-glow { 0%, 100% { opacity: 0; border-color: transparent; box-shadow: none; } 15%, 25% { opacity: 1; border-color: rgba(20, 184, 166, 0.5); box-shadow: 0 4px 30px -5px rgba(20, 184, 166, 0.2); } 40% { opacity: 0; border-color: transparent; box-shadow: none; } }
                .animate-comet-y { animation: flow-y 4s linear infinite; }
                .animate-comet-x { animation: flow-x 4s linear infinite; }
                .animate-pulse-layer { animation: sync-glow 4s linear infinite; }
              `}
            </style>
            <div className="relative max-w-5xl mx-auto">
              <div className="md:hidden absolute top-0 bottom-0 left-8 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent z-0">
                <div className="absolute left-1/2 -translate-x-1/2 h-48 w-[3px] bg-gradient-to-b from-transparent via-teal-500 to-transparent blur-[1px] animate-comet-y z-10" />
              </div>
              <div className="hidden md:block absolute top-8 -translate-y-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent z-0">
                <div className="absolute top-1/2 -translate-y-1/2 w-48 h-[3px] bg-gradient-to-r from-transparent via-teal-500 to-transparent blur-[1px] animate-comet-x z-10" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-20">
                {patientJourneySteps.map((item, i) => (
                  <div key={i} className="group relative flex flex-col p-8 pl-16 md:pl-8 pt-8 md:pt-16 rounded-[2rem] border border-black/5 dark:border-white/5 bg-white/80 dark:bg-zinc-900/40 backdrop-blur-sm transition-all duration-300">
                    <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent bg-teal-500/[0.02] dark:bg-teal-500/[0.04] opacity-0 animate-pulse-layer pointer-events-none z-0" style={{ animationDelay: `${i * 0.9}s` }} />
                    <div className="absolute left-8 top-8 md:left-1/2 md:top-8 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-2 border-black/20 dark:border-white/20 z-30 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-sans font-medium text-black dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{item.title}</h3>
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
            <span className="text-teal-600 dark:text-teal-400 text-xs md:text-sm font-mono tracking-widest uppercase mb-3 block">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-sans font-medium text-black dark:text-white">Dúvidas Frequentes.</h2>
          </div>
          <div className="flex flex-col gap-4 reveal-on-scroll delay-100">
            {faqs.map((faq, i) => (
              <details key={i} className="group p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 cursor-pointer hover:border-teal-500/30 transition-all">
                <summary className="flex items-center justify-between font-medium text-black dark:text-white outline-none">
                  {faq.q} <span className="transition-transform group-open:rotate-45 text-xl font-light text-teal-600">+</span>
                </summary>
                <div className="mt-4 text-black/60 dark:text-white/60 font-light text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contato" className="w-full border-t border-black/10 dark:border-white/10 pt-20 pb-12 px-6 flex flex-col items-center bg-[#F8FAFC] dark:bg-[#050505]">
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col items-start text-left md:col-span-1">
              <h3 className="font-serif font-bold text-2xl tracking-[0.1em] text-teal-600 dark:text-teal-400 mb-6">Melo Oftalmologia</h3>
              <p className="text-sm text-black/50 dark:text-white/50 font-light leading-relaxed mb-6">Cuidando da sua visão com excelência, tecnologia e atendimento humanizado.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-all">Insta</a>
                <a href="#" className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all">Face</a>
              </div>
            </div>
            <div className="flex flex-col">
              <h4 className="font-mono text-xs uppercase tracking-widest text-black/80 dark:text-white/80 font-bold mb-6">Clínica</h4>
              <a href="#como-fazemos" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-teal-500 transition-colors">Como Cuidamos</a>
              <a href="#servicos" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-teal-500 transition-colors">Especialidades</a>
              <a href="#tecnologia" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-teal-500 transition-colors">Tecnologia</a>
              <a href="#faq" className="text-sm text-black/50 dark:text-white/50 hover:text-teal-500 transition-colors">FAQ</a>
            </div>
            <div className="flex flex-col">
              <h4 className="font-mono text-xs uppercase tracking-widest text-black/80 dark:text-white/80 font-bold mb-6">Legal</h4>
              <a href="#" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-teal-500 transition-colors">Termos de Uso</a>
              <a href="#" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-teal-500 transition-colors">Política de Privacidade</a>
            </div>
            <div className="flex flex-col">
              <h4 className="font-mono text-xs uppercase tracking-widest text-black/80 dark:text-white/80 font-bold mb-6">Contato</h4>
              <a href="mailto:contato@melooftalmologia.com.br" className="mb-3 text-sm text-black/50 dark:text-white/50 hover:text-teal-500 transition-colors">contato@melooftalmologia.com.br</a>
              <p className="text-sm text-black/50 dark:text-white/50 mt-4">(11) 9999-9999</p>
            </div>
          </div>
          <div className="w-full max-w-7xl border-t border-black/5 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-black/40 dark:text-white/30 font-mono uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Melo Oftalmologia.</p>
            <p className="mt-2 md:mt-0">Sua visão em primeiro lugar.</p>
          </div>
        </footer>
      </main>
    </>
  );
}