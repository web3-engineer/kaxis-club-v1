"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, User, Phone, CheckCircle2, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

// Mock API para facilitar futura integração com backend real
const mockApi = {
  createAppointment: async (data: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...data,
          status: "confirmed", // or pending based on logic
        });
      }, 600); // Simulando delay de rede
    });
  },
};

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30",
  "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30"
];

// Dicionário de agendamentos onde a chave é o dia do mês
const INITIAL_APPOINTMENTS: Record<number, Record<string, { name: string; phone: string; status: "confirmed" | "pending"; service: string }>> = {
  8: {
    "09:00": { name: "Helena Cardoso", phone: "(11) 99999-8888", status: "confirmed", service: "Consulta Geral" },
    "10:30": { name: "Marcos Silva", phone: "(11) 97777-6666", status: "pending", service: "Cirurgia Refrativa" },
    "14:00": { name: "Sofia Martins", phone: "(11) 95555-4444", status: "confirmed", service: "Exame de Retina" },
  },
};

function SchedulingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const newLead = searchParams.get("newLead");

  const [selectedDay, setSelectedDay] = useState(8);
  const [appointmentsByDay, setAppointmentsByDay] = useState(INITIAL_APPOINTMENTS);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newApptData, setNewApptData] = useState({ name: "", phone: "", service: "Consulta Geral" });

  useEffect(() => {
    if (newLead) {
      setNewApptData((prev) => ({ ...prev, name: newLead }));
    }
  }, [newLead]);

  const handleOpenModal = (time: string) => {
    setSelectedTime(time);
    setIsModalOpen(true);
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApptData.name || !newApptData.phone) return;
    
    setIsSubmitting(true);
    try {
      await mockApi.createAppointment({
        ...newApptData,
        day: selectedDay,
        time: selectedTime,
      });

      setAppointmentsByDay((prev) => ({
        ...prev,
        [selectedDay]: {
          ...(prev[selectedDay] || {}),
          [selectedTime]: {
            name: newApptData.name,
            phone: newApptData.phone,
            service: newApptData.service,
            status: "confirmed",
          },
        },
      }));

      // Limpa URL se existia newLead
      if (newLead) {
        router.replace("/crm/scheduling");
      }

      setNewApptData({ name: "", phone: "", service: "Consulta Geral" });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentDayAppointments = appointmentsByDay[selectedDay] || {};

  return (
    <div className="flex flex-col gap-8 h-full relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white">
            Painel de Agendamentos
          </h1>
          <p className="text-black/60 dark:text-white/60">
            Calendário rápido para marcar e gerenciar as consultas do dia.
          </p>
        </div>

        {newLead && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 bg-green-500/10 text-green-600 dark:text-green-400 p-4 rounded-2xl border border-green-500/20"
          >
            <CheckCircle2 className="h-5 w-5" />
            <p className="text-sm font-medium">
              Lead <strong>{newLead}</strong> convertido com sucesso e encaminhado para agendamento! Escolha um horário abaixo.
            </p>
          </motion.div>
        )}
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1">
        {/* Calendar / Date Picker (Left Sidebar) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:w-80 rounded-3xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-[#0a0a0a]/50 p-6 backdrop-blur-xl h-fit"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg text-black dark:text-white">Maio 2026</h2>
            <div className="flex gap-2">
              <button className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white transition-colors">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-black dark:text-white transition-colors">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Simple Mocked Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(day => (
              <div key={day} className="text-xs font-medium text-black/40 dark:text-white/40 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const isSelected = day === selectedDay;
              // Check if this day has any appointments in our state
              const hasAppt = appointmentsByDay[day] && Object.keys(appointmentsByDay[day]).length > 0;
              
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`
                    aspect-square rounded-full flex items-center justify-center text-sm font-medium relative transition-all
                    ${isSelected 
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-md" 
                      : "text-black hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
                    }
                  `}
                >
                  {day}
                  {hasAppt && !isSelected && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-500" />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Time Slots (Right Main Area) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 rounded-3xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-[#0a0a0a]/50 p-6 backdrop-blur-xl flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-xl text-black dark:text-white">
              {/* Fake day calculation for demo purposes */}
              {["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"][(selectedDay + 4) % 7]}, {selectedDay} de Maio
            </h2>
            <div className="flex gap-2">
              <span className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500" /> Confirmado
              </span>
              <span className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 rounded-full bg-yellow-500" /> Pendente
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3">
            {TIME_SLOTS.map((time) => {
              const appt = currentDayAppointments[time];
              
              return (
                <div 
                  key={time} 
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#111] hover:shadow-md transition-all relative overflow-hidden"
                >
                  {/* Status Indicator Bar */}
                  {appt && (
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${appt.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  )}

                  <div className="w-24 flex items-center gap-2 text-black/60 dark:text-white/60 font-medium">
                    <Clock className="h-4 w-4" />
                    {time}
                  </div>

                  <div className="flex-1 flex items-center">
                    {appt ? (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-black dark:text-white flex items-center gap-2">
                            <User className="h-4 w-4 text-black/40 dark:text-white/40" />
                            {appt.name}
                          </span>
                          <span className="text-sm text-black/60 dark:text-white/60 flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {appt.phone}
                            <span className="mx-2 opacity-50">•</span>
                            {appt.service}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {appt.status === 'pending' && (
                            <button className="px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20 rounded-xl text-sm font-bold transition-colors">
                              Confirmar
                            </button>
                          )}
                          <button className="px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white rounded-xl text-sm font-bold transition-colors">
                            Editar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleOpenModal(time)}
                        className="w-full h-full py-3 border-2 border-dashed border-black/10 dark:border-white/10 rounded-xl text-black/40 dark:text-white/40 hover:text-black hover:border-black/30 dark:hover:text-white dark:hover:border-white/30 transition-all font-medium flex items-center justify-center gap-2"
                      >
                        + Agendar Rápido
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-2xl p-6 border border-black/5 dark:border-white/5"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-black dark:text-white">Agendar Consulta</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-black/60 dark:text-white/60"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-6 p-4 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-black/60 dark:text-white/60 font-medium">Data selecionada</p>
                  <p className="text-sm font-bold text-black dark:text-white">{selectedDay} de Maio de 2026</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-black/60 dark:text-white/60 font-medium">Horário</p>
                  <p className="text-sm font-bold text-black dark:text-white">{selectedTime}</p>
                </div>
              </div>

              <form onSubmit={handleBook} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-black/60 dark:text-white/60">Nome Completo</label>
                  <input 
                    type="text" 
                    required
                    value={newApptData.name}
                    onChange={(e) => setNewApptData({...newApptData, name: e.target.value})}
                    placeholder="Ex: Carlos Mendes"
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 outline-none text-black dark:text-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-black/60 dark:text-white/60">WhatsApp</label>
                  <input 
                    type="tel" 
                    required
                    value={newApptData.phone}
                    onChange={(e) => setNewApptData({...newApptData, phone: e.target.value})}
                    placeholder="(11) 90000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 outline-none text-black dark:text-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-black/60 dark:text-white/60">Tipo de Consulta</label>
                  <select 
                    value={newApptData.service}
                    onChange={(e) => setNewApptData({...newApptData, service: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 outline-none text-black dark:text-white"
                  >
                    <option value="Consulta Geral">Consulta Geral</option>
                    <option value="Exame de Retina">Exame de Retina</option>
                    <option value="Cirurgia Refrativa">Cirurgia Refrativa</option>
                    <option value="Cirurgia de Catarata">Cirurgia de Catarata</option>
                    <option value="Retorno">Retorno</option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 w-full py-3.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] shadow-md"
                >
                  {isSubmitting ? "Confirmando..." : "Confirmar Agendamento"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CRMScheduling() {
  return (
    <Suspense fallback={<div className="p-8">Carregando painel...</div>}>
      <SchedulingContent />
    </Suspense>
  );
}
