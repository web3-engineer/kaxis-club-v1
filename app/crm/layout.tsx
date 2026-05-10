"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Users, ListTodo, Menu, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const sidebarLinks = [
  { name: "Leads", href: "/crm/pipeline", icon: ListTodo },
  { name: "Agendamentos", href: "/crm/scheduling", icon: Calendar },
  { name: "Clientes", href: "/crm/retention", icon: Users },
  { name: "Dashboard", href: "/crm/dashboard", icon: LayoutDashboard },
];

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] dark:bg-[#050505] overflow-hidden pt-20">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform hover:scale-105 active:scale-95"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-xl h-full">
        <div className="p-6 flex flex-col h-full">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
              CLINIC<span className="text-blue-600 dark:text-blue-500">OS</span>
            </h2>
          </div>

          <nav className="flex-1 space-y-2">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-lg"
                      : "text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-black/5 dark:border-white/5 pt-6">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-medium text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              Voltar para o Site
            </Link>
          </div>
        </div>
      </aside>

      {/* Sidebar - Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-black/5 dark:border-white/5 bg-white/90 dark:bg-black/90 backdrop-blur-2xl lg:hidden"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
                    CLINIC<span className="text-blue-600 dark:text-blue-500">OS</span>
                  </h2>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="rounded-full p-2 text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex-1 space-y-2">
                  {sidebarLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${
                          isActive
                            ? "bg-black text-white dark:bg-white dark:text-black shadow-lg"
                            : "text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-auto border-t border-black/5 dark:border-white/5 pt-6">
                  <Link
                    href="/"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-medium text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Voltar para o Site
                  </Link>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
        {/* Subtle Background Glow for Main Content */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-400/5 dark:bg-blue-600/5 blur-[120px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl relative z-10 h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
