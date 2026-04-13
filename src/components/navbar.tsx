"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Como fazemos", id: "como-fazemos" },
  { label: "Parceiros", id: "tiers" },
  { label: "Preço", id: "preco" },
  { label: "Token", id: "token" },
  { label: "Depoimentos", id: "depoimentos" },
  { label: "FAQ", id: "faq" },
  { label: "Contato", id: "contato" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Active section tracking
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = navLinks.map((l) => l.id);
    const handleScroll = () => {
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
    `transition-all duration-200 ${pathname === "/" && activeSection === id
      ? "text-blue-600 dark:text-blue-400 font-bold"
      : "text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white"
    }`;

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <div className="w-full max-w-7xl flex items-center justify-between px-5 py-3 rounded-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-lg">

          {/* Logo */}
          <Link href="/" onClick={(e) => handleLinkClick(e, "home")} className="hover:scale-105 transition-transform flex items-center">
            <img src="/kaxis-logo.png" alt="KAXIS Logo" className="h-6 md:h-8 w-auto object-contain brightness-0 dark:invert transition-all" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 text-[13px] font-medium">
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
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-black dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all"
              aria-label="Toggle theme"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>

            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full text-[12px] font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] whitespace-nowrap"
            >
              Launch App
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all"
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
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white dark:bg-zinc-900 shadow-2xl flex flex-col transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="p-6 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
            <img src="/kaxis-logo.png" alt="KAXIS Logo" className="h-6 w-auto object-contain brightness-0 dark:invert" />
            <button
              onClick={() => setMenuOpen(false)}
              className="text-2xl leading-none text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
            >
              ✕
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`/#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`px-4 py-3 rounded-xl text-sm font-medium ${pathname === "/" && activeSection === link.id
                    ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "text-black/70 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-black/5 dark:border-white/5 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl text-sm font-bold text-center transition-all"
            >
              Launch App
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}