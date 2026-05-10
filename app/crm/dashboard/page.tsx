"use client";

import { motion, Variants } from "framer-motion";
import { Users, CalendarX, TrendingUp, Activity, DollarSign } from "lucide-react";

const STATS = [
  {
    label: "Consultas de Hoje",
    value: "42",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Cirurgias Agendadas",
    value: "8",
    change: "+2",
    trend: "up",
    icon: Activity,
  },
  {
    label: "Faturamento Projetado",
    value: "R$ 18.4K",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "Taxa de Cancelamento",
    value: "4.2%",
    change: "-1.5%",
    trend: "down",
    icon: CalendarX,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export default function CRMDashboard() {
  return (
    <div className="flex flex-col gap-8 h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white">
          Gestão de Pacientes
        </h1>
        <p className="text-black/60 dark:text-white/60">
          Visão geral em tempo real dos atendimentos da Melo Oftalmologia.
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-[#0a0a0a]/50 p-6 backdrop-blur-xl transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)]"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/5 dark:from-white/0 dark:to-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
              
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-black/5 dark:bg-white/10 p-3 text-black dark:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold ${
                      stat.trend === "up"
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-red-500/10 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingUp className="h-4 w-4 rotate-180" />
                    )}
                    {stat.change}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-black/60 dark:text-white/60">
                    {stat.label}
                  </h3>
                  <div className="mt-1 text-3xl font-bold tracking-tight text-black dark:text-white">
                    {stat.value}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Charts Area (Mocked for visual structure) */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="show"
        className="flex-1 rounded-3xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-[#0a0a0a]/50 p-6 backdrop-blur-xl min-h-[400px] flex flex-col"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
            Fluxo Diário de Pacientes
          </h2>
          <select className="rounded-xl border border-black/10 dark:border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-black dark:text-white outline-none focus:border-black dark:focus:border-white">
            <option>Hoje</option>
            <option>Esta Semana</option>
            <option>Este Mês</option>
          </select>
        </div>
        
        {/* Placeholder for actual chart (e.g., Recharts) */}
        <div className="flex-1 flex items-center justify-center rounded-2xl border border-dashed border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
          <div className="text-center">
            <Activity className="mx-auto h-8 w-8 text-black/20 dark:text-white/20 mb-2" />
            <p className="text-sm font-medium text-black/40 dark:text-white/40">
              Área de Integração de Gráficos (Ex: Recharts)
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
