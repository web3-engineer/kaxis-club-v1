"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// Mock de dados da Acomodação (Você pode tornar isso dinâmico via props depois)
const roomDetails = {
    title: "Bangalô c/ Jacuzzi",
    subtitle: "O refúgio perfeito para casais, unindo rusticidade e sofisticação.",
    description: "Desenhado para proporcionar momentos inesquecíveis, o nosso Bangalô oferece uma experiência de imersão total na natureza sem abrir mão do conforto contemporâneo. Com uma varanda privativa voltada para o vale, você poderá desfrutar do pôr do sol imerso em uma jacuzzi exclusiva e aquecida. O ambiente interno conta com decoração minimalista, iluminação aconchegante e enxoval de alto padrão para garantir o seu descanso absoluto.",
    price: "R$ 850",
    amenities: [
        { icon: "🛏️", label: "Cama King Size" },
        { icon: "🫧", label: "Jacuzzi Aquecida" },
        { icon: "❄️", label: "Ar Condicionado" },
        { icon: "📺", label: "Smart TV 55\"" },
        { icon: "📶", label: "Wi-Fi Alta Velocidade" },
        { icon: "🥂", label: "Frigobar Premium" },
        { icon: "☕", label: "Cafeteira Nespresso" },
        { icon: "🌅", label: "Varanda Privativa" },
    ],
    gallery: [
        { id: 1, title: "Vista da Varanda" },
        { id: 2, title: "Cama King Size" },
        { id: 3, title: "Jacuzzi em Detalhes" },
        { id: 4, title: "Banheiro Moderno" },
        { id: 5, title: "Área Externa" },
    ]
};

export default function AcomodacaoPage() {
    const carouselRef = useRef<HTMLDivElement>(null);

    // Animação de entrada
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

    // Controle das setas da galeria
    const scrollCarousel = (direction: "left" | "right") => {
        if (carouselRef.current) {
            const scrollAmount = direction === "left" ? -340 : 340;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
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

        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

            <main className="flex flex-col items-center overflow-hidden pb-24">

                {/* 1. HERO IMAGE */}
                <section className="relative w-full max-w-7xl px-4 md:px-6 pt-24 md:pt-32 mx-auto reveal-on-scroll">
                    <div className="w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/50 dark:border-white/10 shadow-2xl p-2">
                        <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-black/10 dark:bg-black/40">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A140E]/80 via-transparent to-transparent z-10" />
                            <div className="absolute inset-0 flex items-center justify-center text-emerald-900/40 dark:text-emerald-100/20 text-sm font-medium z-0">
                                [Imagem Principal do Bangalô]
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. INFORMAÇÕES (Glass Card Sobreposto) */}
                <section className="relative w-full max-w-5xl px-4 md:px-6 mx-auto -mt-20 md:-mt-32 z-20 reveal-on-scroll delay-100">
                    <div className="p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-white/70 dark:bg-[#0A140E]/70 backdrop-blur-3xl border border-white/60 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                        {/* Cabeçalho do Card */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-emerald-900/10 dark:border-white/10 pb-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-emerald-950 dark:text-emerald-50 mb-3">
                                    {roomDetails.title}
                                </h1>
                                <p className="text-emerald-800/80 dark:text-emerald-100/60 font-light text-sm md:text-base">
                                    {roomDetails.subtitle}
                                </p>
                            </div>
                            <div className="flex flex-col md:items-end shrink-0">
                                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-500 mb-1">Diárias a partir de</span>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-3xl font-serif text-emerald-950 dark:text-emerald-50">{roomDetails.price}</span>
                                    <span className="text-sm text-emerald-800/60 dark:text-emerald-100/40">/noite</span>
                                </div>
                                <button className="w-full md:w-auto bg-emerald-700 text-emerald-50 text-sm font-medium px-8 py-3.5 rounded-full hover:scale-105 hover:bg-emerald-600 active:scale-95 transition-all shadow-lg">
                                    Reservar Agora
                                </button>
                            </div>
                        </div>

                        {/* Ícones / Comodidades */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {roomDetails.amenities.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5">
                                    <span className="text-xl md:text-2xl">{item.icon}</span>
                                    <span className="text-xs md:text-sm font-medium text-emerald-900 dark:text-emerald-100/80">{item.label}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* 3. DESCRIÇÃO E DETALHES */}
                <section className="w-full max-w-4xl px-6 py-16 md:py-24 mx-auto text-center reveal-on-scroll">
                    <p className="text-emerald-800/80 dark:text-emerald-100/70 text-lg md:text-xl font-light leading-relaxed md:leading-loose">
                        {roomDetails.description}
                    </p>
                </section>

                {/* 4. GALERIA DE FOTOS DO QUARTO (Slider) */}
                <section className="w-full max-w-7xl px-4 md:px-6 mx-auto relative group reveal-on-scroll">
                    <div className="flex items-center justify-between mb-8 px-2 md:px-4">
                        <h2 className="text-2xl md:text-3xl font-serif font-light text-emerald-950 dark:text-emerald-50">
                            Conheça os detalhes
                        </h2>
                        {/* Controles Desktop */}
                        <div className="hidden md:flex gap-2">
                            <button onClick={() => scrollCarousel("left")} className="p-3 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-md border border-emerald-900/10 dark:border-white/10 text-emerald-900 dark:text-white hover:bg-white dark:hover:bg-white/20 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button onClick={() => scrollCarousel("right")} className="p-3 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-md border border-emerald-900/10 dark:border-white/10 text-emerald-900 dark:text-white hover:bg-white dark:hover:bg-white/20 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>

                    {/* Container do Carrossel */}
                    <div
                        ref={carouselRef}
                        className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-2 md:px-4 -mx-4 md:mx-0"
                    >
                        {roomDetails.gallery.map((photo) => (
                            <div
                                key={photo.id}
                                className="shrink-0 w-[280px] md:w-[400px] flex flex-col p-2 md:p-3 rounded-[2rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-lg hover:shadow-xl transition-shadow snap-center"
                            >
                                <div className="w-full aspect-[4/3] rounded-[1.5rem] bg-black/5 dark:bg-black/30 overflow-hidden relative group-hover:opacity-90 transition-opacity cursor-pointer">
                                    <div className="absolute inset-0 flex items-center justify-center text-emerald-900/30 dark:text-emerald-100/20 text-xs">
                                        [{photo.title}]
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Respiro no final do mobile */}
                        <div className="shrink-0 w-4 md:hidden"></div>
                    </div>
                </section>

                {/* 5. LOCALIZAÇÃO (Google Maps Integrado) */}
                <section className="w-full max-w-7xl px-4 md:px-6 py-16 md:py-24 mx-auto reveal-on-scroll">
                    <div className="flex flex-col items-center mb-10 text-center">
                        <span className="text-emerald-600 dark:text-emerald-500 text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 block">Como Chegar</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-light text-emerald-950 dark:text-emerald-50">
                            Localização Privilegiada
                        </h2>
                        <p className="text-emerald-800/80 dark:text-emerald-100/60 mt-4 text-sm md:text-base max-w-2xl font-light">
                            Estamos situados no coração da serra, cercados pela natureza preservada do Maciço de Baturité.
                        </p>
                    </div>

                    {/* Container Liquid Glass para o Mapa */}
                    <div className="w-full h-[400px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-xl p-2 md:p-3 overflow-hidden">
                        <div className="w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-emerald-50 dark:bg-zinc-900 relative">
                            {/* O iframe do Google Maps */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15915.655829672688!2d-38.97232231284179!3d-4.256860099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7be2d12e8b233a1%3A0xc391b15c9a2072e!2sAzzuro%20Hotel!5e0!3m2!1spt-BR!2sbr!4v1715694205565!5m2!1spt-BR!2sbr"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 grayscale-[20%] contrast-125 dark:opacity-80 dark:invert-[90%] dark:hue-rotate-180 transition-all duration-700"
                            ></iframe>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <a
                            href="https://www.google.com/travel/hotels/0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 transition-colors"
                        >
                            Abrir rota no Google Maps <span>↗</span>
                        </a>
                    </div>
                </section>

            </main>
        </>
    );
}