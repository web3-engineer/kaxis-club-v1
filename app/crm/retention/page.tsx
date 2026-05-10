"use client";

import { motion } from "framer-motion";
import { AlertCircle, CalendarClock, PhoneCall, CheckCircle2, MessageCircle } from "lucide-react";

const ALERTS = [
  {
    id: 1,
    type: "confirmation",
    patient: "Carlos Ramirez",
    procedure: "Exame Geral de Rotina",
    date: "Amanhã, 09:00",
    risk: "high", // High risk of no-show
    contact: "+55 11 91234-5678",
  },
  {
    id: 2,
    type: "checkup",
    patient: "Lucia Mendes",
    procedure: "Exames de Sangue Anuais",
    date: "Atrasado desde a semana passada",
    risk: "medium",
    contact: "+55 11 98765-4321",
  },
  {
    id: 3,
    type: "confirmation",
    patient: "Arthur Pendragon",
    procedure: "Consulta Cardiológica",
    date: "Amanhã, 14:30",
    risk: "low",
    contact: "+55 11 99999-1111",
  },
  {
    id: 4,
    type: "checkup",
    patient: "Beatriz Costa",
    procedure: "Retorno Dermatológico",
    date: "Vence em 3 dias",
    risk: "low",
    contact: "+55 11 97777-2222",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CRMRetention() {
  return (
    <div className="flex flex-col gap-8 h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white flex items-center gap-3">
            Gestão de Clientes
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-sm">
              4
            </span>
          </h1>
          <p className="text-black/60 dark:text-white/60">
            Lista de ações para reduzir faltas e gerenciar retornos periódicos.
          </p>
        </div>

        <div className="flex gap-2 bg-black/5 dark:bg-white/5 p-1 rounded-full">
          <button className="px-4 py-2 rounded-full bg-white dark:bg-[#1a1a1a] shadow-sm text-sm font-bold text-black dark:text-white">
            Todos os Alertas
          </button>
          <button className="px-4 py-2 rounded-full text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white text-sm font-bold transition-colors">
            Confirmações
          </button>
          <button className="px-4 py-2 rounded-full text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white text-sm font-bold transition-colors">
            Retornos
          </button>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4"
      >
        {ALERTS.map((alert) => (
          <motion.div
            key={alert.id}
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-4 md:items-center justify-between p-5 rounded-3xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-xl hover:shadow-md transition-all group relative overflow-hidden"
          >
            {/* Risk Indicator Bar */}
            <div 
              className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                alert.risk === 'high' ? 'bg-red-500' : 
                alert.risk === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} 
            />

            <div className="flex items-center gap-4 pl-2">
              <div className={`p-3 rounded-2xl ${
                alert.type === 'confirmation' 
                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                  : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
              }`}>
                {alert.type === 'confirmation' ? <AlertCircle className="h-6 w-6" /> : <CalendarClock className="h-6 w-6" />}
              </div>
              
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-lg text-black dark:text-white flex items-center gap-2">
                  {alert.patient}
                  {alert.risk === 'high' && (
                    <span className="text-[10px] uppercase font-bold bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full tracking-wider">
                      Alto Risco de Falta
                    </span>
                  )}
                </h3>
                <p className="text-sm text-black/60 dark:text-white/60 font-medium">
                  {alert.procedure} • {alert.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 md:pl-0 pl-16">
              <button className="flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white rounded-xl text-sm font-bold transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white rounded-xl text-sm font-bold transition-colors">
                <PhoneCall className="h-4 w-4" />
                <span className="hidden sm:inline">Ligar</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-green-500/20">
                <CheckCircle2 className="h-4 w-4" />
                <span className="hidden sm:inline">Marcar Confirmado</span>
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
