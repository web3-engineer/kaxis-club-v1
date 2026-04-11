"use client";

import { useState, useEffect } from "react";

export function Preloader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000); // 3 segundos exatos

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F8FAFC] dark:bg-[#050505] transition-opacity duration-1000">
            {/* Estilos da animação de Blur */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes blurReveal {
          0% { filter: blur(20px); opacity: 0; transform: scale(0.9); }
          30% { filter: blur(0px); opacity: 1; transform: scale(1); }
          70% { filter: blur(0px); opacity: 1; transform: scale(1); }
          100% { filter: blur(20px); opacity: 0; transform: scale(1.1); }
        }
        .animate-blur-reveal {
          animation: blurReveal 3s ease-in-out forwards;
        }
      `}} />

            <div className="flex flex-col items-center">
                <div className="animate-blur-reveal text-center">
                    <img 
                      src="/kaxis-logo.png" 
                      alt="KAXIS Logo" 
                      className="w-40 md:w-64 h-auto object-contain brightness-0 dark:invert transition-all" 
                    />
                </div>

                {/* Detalhe Glassmorphism de fundo para profundidade */}
                <div className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10 animate-pulse" />
            </div>
        </div>
    );
}