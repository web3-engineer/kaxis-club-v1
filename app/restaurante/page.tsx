"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const pratosDestaque = [
    { id: 0, title: "Filé ao Vinho da Serra", desc: "Mignon selado com redução de vinho tinto e risoto de parmesão." },
    { id: 1, title: "Truta na Manteiga de Ervas", desc: "Peixe fresco da região grelhado com ervas finas e amêndoas." },
    { id: 2, title: "Tarte Tatin de Caju", desc: "Releitura clássica com a fruta símbolo do nosso Ceará." },
];

export default function RestaurantePage() {
    const [showIntro, setShowIntro] = useState(true);

    // Timer da Intro dedicada do Restaurante (3 segundos)
    useEffect(() => {
        const timer = setTimeout(() => setShowIntro(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    // Observer para animações de scroll
    useEffect(() => {
        if (showIntro) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add("is-visible");
                });
            },
            { threshold: 0.1 }
        );
        document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [showIntro]);

    return (
        <>
            {/* 0. INTRO DEDICADA RIACH */}
            {showIntro && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F0D0B] transition-opacity duration-1000">
                    <div className="flex flex-col items-center animate-blur-reveal">
                        <img src="/riach-logo.png" alt="Riach Logo" className="w-40 md:w-56 h-auto mb-6" />
                        <p className="text-orange-200/40 text-[10px] tracking-[0.4em] uppercase font-light">
                            Culinária Autoral • Serra
                        </p>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes blurReveal {
          0% { filter: blur(20px); opacity: 0; transform: scale(0.9); }
          30% { filter: blur(0px); opacity: 1; transform: scale(1); }
          70% { filter: blur(0px); opacity: 1; transform: scale(1); }
          100% { filter: blur(20px); opacity: 0; transform: scale(1.1); }
        }
        .animate-blur-reveal { animation: blurReveal 3s ease-in-out forwards; }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}} />

            <main className={`flex flex-col items-center bg-[#FAF9F6] dark:bg-[#0F0D0B] text-zinc-900 dark:text-orange-50 transition-opacity duration-1000 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>

                {/* Glows de Fundo em tons Âmbar/Laranja */}
                <div className="fixed inset-0 pointer-events-none -z-10">
                    <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-orange-200/30 dark:bg-orange-900/10 blur-[150px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-100/40 dark:bg-amber-950/10 blur-[120px]" />
                </div>

                {/* 1. HERO SECTION */}
                <section className="relative w-full max-w-7xl px-4 md:px-6 pt-32 md:pt-48 pb-20 mx-auto text-center reveal-on-scroll">
                    <div className="flex flex-col items-center mb-12">
                        <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-orange-100 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-700 dark:text-orange-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                            Gastronomia na Serra
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight mb-8 leading-[1.1]">
                            Uma jornada de <br />
                            <span className="italic text-orange-600 dark:text-orange-400">sabores autorais.</span>
                        </h1>
                    </div>

                    <div className="w-full relative h-[50vh] md:h-[70vh] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/50 dark:border-white/10 shadow-2xl p-2 md:p-3">
                        <div className="relative w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-zinc-200 dark:bg-zinc-900">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0B]/60 to-transparent z-10" />
                            <div className="absolute inset-0 flex items-center justify-center text-orange-900/40 dark:text-orange-100/20 text-sm font-medium z-20">
                                [Imagem Panorâmica do Restaurante]
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. CULINÁRIA E TEXTO */}
                <section className="w-full max-w-4xl px-6 py-20 mx-auto text-center reveal-on-scroll">
                    <h2 className="text-3xl md:text-4xl font-serif font-light mb-8">O encontro entre a terra e o prato.</h2>
                    <p className="text-zinc-600 dark:text-orange-100/60 text-lg md:text-xl font-light leading-relaxed md:leading-loose">
                        No Riach, cada ingrediente é selecionado de produtores locais do Maciço de Baturité. Nossa cozinha combina técnicas clássicas com o frescor da serra, resultando em pratos que contam a história da nossa região através de texturas e aromas inesquecíveis.
                    </p>
                </section>

                {/* 3. PREVIEW DO CARDÁPIO (Carousel) */}
                <section className="w-full max-w-7xl px-4 md:px-6 py-16 mx-auto reveal-on-scroll">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-serif font-light tracking-tight">Destaques do Chef</h2>
                    </div>

                    <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10 px-4">
                        {pratosDestaque.map((prato) => (
                            <div key={prato.id} className="group shrink-0 w-[280px] md:w-[350px] flex flex-col p-4 rounded-[2.5rem] bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 snap-center">
                                <div className="w-full aspect-square rounded-[2rem] bg-black/5 dark:bg-black/30 mb-6 overflow-hidden relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-orange-900/20 dark:text-orange-100/10 text-xs italic">
                                        [Foto: {prato.title}]
                                    </div>
                                </div>
                                <h3 className="text-xl font-serif font-medium mb-3 text-orange-950 dark:text-orange-50">{prato.title}</h3>
                                <p className="text-zinc-500 dark:text-orange-100/40 text-sm leading-relaxed">{prato.desc}</p>
                            </div>
                        ))}
                        <div className="shrink-0 w-8"></div>
                    </div>
                </section>

                {/* 4. CALL TO ACTION (Links) */}
                <section className="w-full max-w-5xl px-4 py-24 reveal-on-scroll">
                    <div className="p-8 md:p-16 rounded-[3rem] bg-orange-600 dark:bg-orange-500/10 border border-orange-500/20 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
                        <h2 className="text-3xl md:text-5xl font-serif font-light text-white mb-10 z-10">Saboreie o momento.</h2>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 z-10 w-full md:w-auto">
                            <a
                                href="https://azzurohotel.namesa.online/home"
                                target="_blank"
                                className="bg-white text-orange-600 px-10 py-4 rounded-full text-sm font-semibold hover:scale-105 transition-transform shadow-lg"
                            >
                                Ver Cardápio Completo
                            </a>
                            <a
                                href="https://wa.me/5585997105228"
                                target="_blank"
                                className="bg-orange-950/20 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full text-sm font-semibold hover:bg-white/10 transition-all shadow-lg"
                            >
                                Reservar uma Mesa
                            </a>
                        </div>
                        {/* Decoração interna */}
                        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-[60px]" />
                    </div>
                </section>

            </main>

            {/* FOOTER RIACH */}
            <footer className="w-full bg-[#FAF9F6] dark:bg-[#0F0D0B] border-t border-orange-900/10 dark:border-white/5 py-16 px-6 flex flex-col items-center">
                <img src="/riach-logo.png" alt="Riach Logo" className="w-24 h-auto mb-6 opacity-80" />
                <p className="text-sm font-light text-zinc-500 dark:text-orange-100/30 mb-2">Riach Restaurante & Azzuro Hotel</p>
                <p className="text-xs font-light text-zinc-400 dark:text-orange-100/20">© 2026 Autêntica Propaganda. Todos os direitos reservados.</p>
            </footer>
        </>
    );
}