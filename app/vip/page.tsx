"use client";

import Image from "next/image";
import { useEffect } from "react";

// Textos extraídos diretamente da página de Eventos do Azzuro
const eventosData = [
    {
        id: 1,
        title: "Casamentos e Celebrações Românticas",
        icon: "💍",
        desc: "Celebre o amor em um cenário paradisíaco. Nosso espaço ao ar livre, com vista para a cachoeira exclusiva, é ideal para cerimônias íntimas e recepções sofisticadas. Oferecemos pacotes personalizados, incluindo decoração temática, buffet gourmet e opções de hospedagem romântica com jacuzzi.",
        span: "md:col-span-2 lg:col-span-2"
    },
    {
        id: 2,
        title: "Eventos Corporativos e Treinamentos",
        icon: "💼",
        desc: "Com infraestrutura moderna e ambientes tranquilos, o Azzuro é perfeito para workshops, treinamentos e retiros empresariais. Disponibilizamos salas equipadas com tecnologia audiovisual, coffee breaks personalizados e opções de lazer para momentos de descontração.",
        span: "md:col-span-1 lg:col-span-1"
    },
    {
        id: 3,
        title: "Aniversários e Comemorações",
        icon: "🎉",
        desc: "Torne seu aniversário inesquecível em meio à natureza. Oferecemos espaços internos e externos para festas personalizadas, com cardápios exclusivos, decoração temática e opções de entretenimento, como música ao vivo ou DJ.",
        span: "md:col-span-1 lg:col-span-1"
    },
    {
        id: 4,
        title: "Almoços e Jantares Empresariais",
        icon: "🍽️",
        desc: "Para encontros de negócios ou confraternizações, disponibilizamos ambientes reservados com menus executivos ou degustação, preparados pelo nosso chef. A combinação perfeita entre boa comida e um ambiente inspirador.",
        span: "md:col-span-1 lg:col-span-1"
    },
    {
        id: 5,
        title: "Retiro de Bem-Estar",
        icon: "🌿",
        desc: "Desconecte-se do cotidiano e recarregue as energias. Organizamos retiros com atividades como yoga, meditação, trilhas ecológicas e banhos nas cachoeiras, aliados a refeições saudáveis e relaxamento em nossos quartos com jacuzzi.",
        span: "md:col-span-2 lg:col-span-1"
    }
];

export default function VIPPage() {
    // Animações no Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        const elements = document.querySelectorAll(".reveal-on-scroll");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // Scroll suave para o formulário
    const scrollToForm = () => {
        const form = document.getElementById("orcamento-form");
        if (form) {
            window.scrollTo({ top: form.offsetTop - 100, behavior: "smooth" });
        }
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
        @media (prefers-color-scheme: light) {
          @keyframes nature-breathe {
            0%, 100% { color: #059669; text-shadow: 0 0 15px rgba(5, 150, 105, 0.2); }
            50% { color: #047857; text-shadow: 0 0 25px rgba(4, 120, 87, 0.4); }
          }
        }
        @media (prefers-color-scheme: dark) {
          @keyframes nature-breathe {
            0%, 100% { color: #6ee7b7; text-shadow: 0 0 15px rgba(110, 231, 183, 0.2); }
            50% { color: #10b981; text-shadow: 0 0 25px rgba(16, 185, 129, 0.6); }
          }
        }

        .animate-nature { animation: nature-breathe 4s ease-in-out infinite; }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
      `}} />

            <main className="flex flex-col items-center overflow-hidden pb-24">

                {/* 1. HERO SECTION (Exclusividade) */}
                <section className="relative w-full max-w-7xl px-4 md:px-6 pt-32 md:pt-40 pb-16 mx-auto flex flex-col items-center text-center">

                    <div className="flex flex-col items-center z-10 reveal-on-scroll mb-6">
                        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-5 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-sm">
                            <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-emerald-900 dark:text-emerald-400">
                                Azzuro Eventos
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight mb-6 text-emerald-950 dark:text-emerald-50 leading-[1.1]">
                            Experiências únicas na <br className="hidden md:block" />
                            <span className="italic animate-nature"> Serra de Baturité.</span>
                        </h1>

                        <p className="max-w-2xl text-base md:text-xl text-emerald-800/80 dark:text-emerald-100/60 mb-8 md:mb-10 font-light leading-relaxed">
                            Momentos inesquecíveis em meio à natureza. Oferecemos ambientes exclusivos para diferentes ocasiões, combinando conforto, natureza e gastronomia de excelência.
                        </p>

                        <button
                            onClick={scrollToForm}
                            className="bg-emerald-700 text-emerald-50 text-xs md:text-sm font-medium px-8 py-3.5 rounded-full hover:scale-105 hover:bg-emerald-600 active:scale-95 transition-all shadow-lg"
                        >
                            Solicitar Orçamento
                        </button>
                    </div>

                    <div className="w-full relative z-10 reveal-on-scroll delay-100">
                        <div className="relative w-full h-[50vh] md:h-[65vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/50 dark:border-white/10 shadow-2xl p-2 md:p-3">
                            <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-black/10 dark:bg-black/40">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A140E]/60 to-transparent z-10 opacity-60 dark:opacity-100" />
                                <div className="absolute inset-0 flex items-center justify-center text-emerald-900/40 dark:text-emerald-100/20 text-xs md:text-sm font-medium z-20">
                                    [Imagem Ampla de Casamento ou Evento]
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. TIPOS DE EVENTOS (Bento Grid) */}
                <section className="w-full max-w-7xl px-4 md:px-6 py-16 md:py-24 scroll-mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {eventosData.map((item, index) => (
                            <div
                                key={item.id}
                                className={`group flex flex-col p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-lg hover:shadow-2xl hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-500 reveal-on-scroll ${item.span}`}
                                style={{ transitionDelay: `${index * 50}ms` }}
              >
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-3xl md:text-4xl p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-white/60 dark:border-white/5 shadow-inner">
                                {item.icon}
                            </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-serif font-medium text-emerald-950 dark:text-emerald-50 mb-4 leading-tight">
                            {item.title}
                        </h3>
                        <p className="text-emerald-800/80 dark:text-emerald-100/60 font-light text-sm md:text-base leading-relaxed flex-1">
                            {item.desc}
                        </p>
                    </div>
            ))}
                </div>
            </section>

            {/* 3. FORMULÁRIO DE ORÇAMENTO (Glassmorphism Imersivo) */}
            <section id="orcamento-form" className="w-full max-w-5xl px-4 md:px-6 py-16 scroll-mt-32 reveal-on-scroll">
                <div className="p-6 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/50 dark:bg-gradient-to-br dark:from-white/10 dark:to-transparent backdrop-blur-3xl border border-white/60 dark:border-white/10 shadow-2xl relative overflow-hidden">

                    {/* Efeito Glow Interno */}
                    <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-400/20 dark:bg-emerald-500/10 blur-[90px] pointer-events-none" />

                    <div className="relative z-10 text-center mb-10 md:mb-12">
                        <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-emerald-950 dark:text-emerald-50 mb-4">
                            Solicite seu Orçamento Personalizado
                        </h2>
                        <p className="text-emerald-800/80 dark:text-emerald-100/60 font-light text-sm md:text-base max-w-2xl mx-auto">
                            Preencha o formulário abaixo e a nossa equipa entrará em contacto para planear o evento dos seus sonhos.
                        </p>
                    </div>

                    <form className="relative z-10 flex flex-col gap-4 md:gap-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <input
                                type="text"
                                placeholder="Nome Completo"
                                className="w-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-[1.5rem] px-6 py-4 text-sm text-emerald-950 dark:text-emerald-50 placeholder-emerald-900/40 dark:placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-inner"
                                required
                            />
                            <input
                                type="email"
                                placeholder="E-mail"
                                className="w-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-[1.5rem] px-6 py-4 text-sm text-emerald-950 dark:text-emerald-50 placeholder-emerald-900/40 dark:placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-inner"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Telefone"
                                className="w-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-[1.5rem] px-6 py-4 text-sm text-emerald-950 dark:text-emerald-50 placeholder-emerald-900/40 dark:placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-inner"
                                required
                            />
                            <select
                                className="w-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-[1.5rem] px-6 py-4 text-sm text-emerald-900/70 dark:text-emerald-100/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-inner appearance-none cursor-pointer"
                                required
                                defaultValue=""
                            >
                                <option value="" disabled hidden>Tipo de Evento</option>
                                <option value="Casamento" className="text-emerald-950 bg-white">Casamento</option>
                                <option value="Corporativo" className="text-emerald-950 bg-white">Evento Corporativo</option>
                                <option value="Aniversario" className="text-emerald-950 bg-white">Aniversário</option>
                                <option value="AlmocoJantar" className="text-emerald-950 bg-white">Almoço/Jantar Empresarial</option>
                                <option value="Retiro" className="text-emerald-950 bg-white">Retiro de Bem-Estar</option>
                                <option value="Outro" className="text-emerald-950 bg-white">Outro</option>
                            </select>
                            <input
                                type="date"
                                className="w-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-[1.5rem] px-6 py-4 text-sm text-emerald-900/70 dark:text-emerald-100/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-inner uppercase tracking-wider"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Nº de Convidados"
                                min="1"
                                className="w-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-[1.5rem] px-6 py-4 text-sm text-emerald-950 dark:text-emerald-50 placeholder-emerald-900/40 dark:placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-inner"
                                required
                            />
                        </div>

                        <textarea
                            placeholder="Mensagem Adicional (Descreva um pouco do seu evento)"
                            rows={4}
                            className="w-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-white/60 dark:border-white/10 rounded-[1.5rem] px-6 py-4 text-sm text-emerald-950 dark:text-emerald-50 placeholder-emerald-900/40 dark:placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-inner resize-none"
                        />

                        <button
                            type="submit"
                            className="mt-4 w-full md:w-auto md:self-center bg-emerald-700 text-emerald-50 text-sm font-medium px-12 py-4 rounded-full hover:scale-105 hover:bg-emerald-600 active:scale-95 transition-all shadow-xl"
                        >
                            Enviar Solicitação
                        </button>
                    </form>
                </div>
            </section>
        </main>

        {/* FOOTER */}
        <footer className="w-full border-t border-emerald-900/10 dark:border-white/10 mt-6 md:mt-12 py-12 md:py-16 px-6 flex flex-col items-center reveal-on-scroll">
        <span className="font-bold tracking-[0.2em] text-xl md:text-2xl text-emerald-700 dark:text-emerald-600 mb-6">AZZURO</span>
        <div className="flex gap-6 md:gap-8 mb-8 text-xs md:text-sm text-emerald-800/60 dark:text-emerald-100/40">
          <a href="#" className="hover:text-emerald-600 transition-colors">Instagram</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">WhatsApp</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Localização</a>
        </div>
        <p className="text-[10px] md:text-xs font-light text-emerald-800/40 dark:text-emerald-100/20 text-center">
          © {new Date().getFullYear()} Azzuro Hotel. Excelência em hospitalidade na serra.
        </p>
      </footer>
    </>
  );
}