"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { label: "Jornada", id: "como-fazemos" },
  { label: "Diferenciais", id: "diferenciais" },
  { label: "Serviços", id: "servicos" },
  { label: "Tecnologia", id: "tecnologia" },
  { label: "FAQ", id: "faq" },
  { label: "Contato", id: "contato" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Theme init
  useEffect(() => {
    const root = window.document.documentElement;
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(isDark);
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  // Active section & Scroll styling tracking
  useEffect(() => {
    const handleScroll = () => {
      // Toggle nav shadow based on scroll
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (pathname !== "/") return;
      const ids = navLinks.map((l) => l.id);
      const scrollPosition = window.scrollY + 200;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  const linkCls = (id: string) =>
    `transition-colors duration-200 ${pathname === "/" && activeSection === id
      ? "text-teal-600 dark:text-teal-400 font-bold"
      : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
    }`;

  return (
    <>
      {/* Importação global da fonte caso já não esteja no layout raiz */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Ubuntu+Sans:wght@400;500;700&display=swap');
        `}
      </style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 font-sans ${scrolled
          ? "bg-white/90 dark:bg-[#050505]/90 backdrop-blur-md border-b border-black/5 dark:border-white/5 shadow-sm py-3"
          : "bg-transparent py-5"
          }`}
        style={{ fontFamily: "'Ubuntu Sans', sans-serif" }}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12">

          {/* Logo (Diminuída) */}
          <Link href="/" onClick={(e) => handleLinkClick(e, "home")} className="hover:opacity-80 transition-opacity flex items-center">
            <div className="relative h-5 md:h-6 w-24 md:w-32">
              <Image
                src="/kaxis-logo.png"
                alt="Melo Oftalmologia Logo"
                fill
                className="object-contain object-left brightness-0 dark:invert transition-all"
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`/#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={linkCls(link.id)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all"
              aria-label="Toggle theme"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            <Link
              href="/crm"
              className="hidden md:flex border border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap"
            >
              Clinic Dashboard
            </Link>

            <Link
              href="/crm"
              className="hidden md:flex bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_0_15px_rgba(20,184,166,0.2)] hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] whitespace-nowrap"
            >
              Agendar Consulta
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all"
              aria-label="Menu"
            >
              <span className={`block w-5 h-0.5 bg-black dark:bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`block w-5 h-0.5 bg-black dark:bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
              <span className={`block w-5 h-0.5 bg-black dark:bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ fontFamily: "'Ubuntu Sans', sans-serif" }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-[80%] max-w-sm bg-white dark:bg-[#0a0a0a] shadow-2xl flex flex-col transition-transform duration-300 ease-out border-l border-black/5 dark:border-white/5 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-black/5 dark:bg-white/5">
            <div className="relative h-5 w-24">
              <Image src="/kaxis-logo.png" alt="Melo Oftalmologia Logo" fill className="object-contain object-left brightness-0 dark:invert" />
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`/#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`px-4 py-3.5 rounded-2xl text-base font-medium transition-colors ${pathname === "/" && activeSection === link.id
                  ? "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400"
                  : "text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="p-6 border-t border-black/5 dark:border-white/5 bg-white dark:bg-[#0a0a0a] flex flex-col gap-3">
            <Link
              href="/crm"
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center justify-center border border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black py-4 rounded-2xl text-base font-bold transition-all"
            >
              Clinic Dashboard
            </Link>
            <Link
              href="/crm"
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-2xl text-base font-bold transition-all shadow-md shadow-teal-600/20"
            >
              Agendar Consulta
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}