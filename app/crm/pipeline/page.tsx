"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MoreVertical, Calendar, Phone, X } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock API para facilitar futura integração com backend real
const mockApi = {
  createLead: async (data: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substring(2, 9),
          status: "new",
          time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
          ...data,
        });
      }, 600); // Simulando delay de rede
    });
  },
};

const COLUMNS = [
  { id: "new", title: "Novos Contatos" },
  { id: "quote", title: "Em Negociação" },
  { id: "scheduled", title: "Consulta Marcada" },
  { id: "noshow", title: "Faltou" },
  { id: "attended", title: "Atendido" },
];

const INITIAL_LEADS = [
  { id: "1", name: "Ana Clara", service: "Consulta Geral", time: "10:00", status: "scheduled", phone: "(11) 98765-4321" },
  { id: "2", name: "João Pedro", service: "Cirurgia Refrativa", time: "14:30", status: "new", phone: "(11) 91234-5678" },
  { id: "3", name: "Marina Silva", service: "Exame de Retina", time: "09:15", status: "attended", phone: "(21) 99999-8888" },
  { id: "4", name: "Carlos Eduardo", service: "Mapeamento", time: "11:00", status: "noshow", phone: "(31) 97777-6666" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

function LeadCard({ lead }: { lead: any }) {
  const router = useRouter();
  const [prospectStatus, setProspectStatus] = useState<"idle" | "talking" | "booked">("idle");

  const handleStart = () => {
    if (prospectStatus !== "idle") return;
    setProspectStatus("talking");
    
    // Simula o agente conversando, em seguida marca a consulta
    setTimeout(() => {
      setProspectStatus("booked");
      
      // Redireciona automaticamente para agendamento após o sucesso
      setTimeout(() => {
        router.push("/crm/scheduling?newLead=" + encodeURIComponent(lead.name));
      }, 1000);
    }, 2500);
  };

  return (
    <div className="group cursor-grab active:cursor-grabbing bg-white dark:bg-[#111] p-4 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-black dark:text-white text-sm">
          {lead.name}
        </h4>
        <span className="text-xs text-black/40 dark:text-white/40 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {lead.time}
        </span>
      </div>
      <p className="text-xs text-black/60 dark:text-white/60 mb-2">
        {lead.service}
      </p>
      {lead.phone && (
        <p className="text-xs text-black/40 dark:text-white/40 flex items-center gap-1 mb-3">
          <Phone className="h-3 w-3" /> {lead.phone}
        </p>
      )}
      
      <div className="flex items-center gap-2 mb-3">
        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
          {lead.name.charAt(0)}
        </div>
      </div>

      {/* Botão Interativo de Prospecção */}
      <div className="pt-3 border-t border-black/5 dark:border-white/5">
        <button 
          onClick={handleStart}
          disabled={prospectStatus !== "idle"}
          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex justify-center items-center gap-2 ${
            prospectStatus === "idle" 
              ? "bg-black text-white dark:bg-white dark:text-black hover:scale-[1.02] shadow-md" 
              : prospectStatus === "talking"
                ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                : "bg-green-500/20 text-green-600 dark:text-green-400 shadow-sm"
          }`}
        >
          {prospectStatus === "idle" && "Iniciar Prospecção"}
          {prospectStatus === "talking" && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
              Conversando...
            </>
          )}
          {prospectStatus === "booked" && "Consulta Marcada"}
        </button>
      </div>
    </div>
  );
}

export default function CRMPipeline() {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLeadData, setNewLeadData] = useState({ name: "", phone: "", service: "Consulta Geral" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadData.name || !newLeadData.phone) return;
    
    setIsSubmitting(true);
    try {
      const createdLead = await mockApi.createLead(newLeadData);
      setLeads((prev) => [...prev, createdLead as any]);
      setNewLeadData({ name: "", phone: "", service: "Consulta Geral" });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white">
            Gestão de Leads
          </h1>
          <p className="text-black/60 dark:text-white/60">
            Gerencie novos contatos e converta pacientes de forma eficiente.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full text-sm font-bold transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <Plus className="h-4 w-4" />
          Adicionar Lead
        </button>
      </motion.div>

      {/* Kanban Board */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex gap-6 overflow-x-auto pb-4 h-full min-h-[600px] hide-scrollbar"
      >
        {COLUMNS.map((column) => {
          const columnLeads = leads.filter((lead) => lead.status === column.id);
          
          return (
            <motion.div
              key={column.id}
              variants={itemVariants}
              className="flex-shrink-0 w-[320px] flex flex-col gap-4 rounded-3xl bg-white/30 dark:bg-[#0a0a0a]/30 p-4 backdrop-blur-xl border border-black/5 dark:border-white/5"
            >
              <div className="flex items-center justify-between px-2">
                <h3 className="font-bold text-black dark:text-white flex items-center gap-2">
                  {column.title}
                  <span className="bg-black/10 dark:bg-white/10 text-black dark:text-white text-xs py-0.5 px-2 rounded-full">
                    {columnLeads.length}
                  </span>
                </h3>
                <button className="text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
                {columnLeads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
                
                {column.id === 'new' && (
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-dashed border-black/10 dark:border-white/10 text-black/40 dark:text-white/40 hover:text-black hover:bg-black/5 dark:hover:text-white dark:hover:bg-white/5 transition-all text-sm font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar Paciente
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Add Lead Modal */}
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
                <h2 className="text-xl font-bold text-black dark:text-white">Novo Lead</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-black/60 dark:text-white/60"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddLead} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-black/60 dark:text-white/60">Nome Completo</label>
                  <input 
                    type="text" 
                    required
                    value={newLeadData.name}
                    onChange={(e) => setNewLeadData({...newLeadData, name: e.target.value})}
                    placeholder="Ex: Roberto Silva"
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 outline-none text-black dark:text-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-black/60 dark:text-white/60">WhatsApp</label>
                  <input 
                    type="tel" 
                    required
                    value={newLeadData.phone}
                    onChange={(e) => setNewLeadData({...newLeadData, phone: e.target.value})}
                    placeholder="(11) 90000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 outline-none text-black dark:text-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-black/60 dark:text-white/60">Serviço de Interesse</label>
                  <select 
                    value={newLeadData.service}
                    onChange={(e) => setNewLeadData({...newLeadData, service: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent focus:border-black/20 dark:focus:border-white/20 outline-none text-black dark:text-white"
                  >
                    <option value="Consulta Geral">Consulta Geral</option>
                    <option value="Exame de Retina">Exame de Retina</option>
                    <option value="Cirurgia Refrativa">Cirurgia Refrativa</option>
                    <option value="Cirurgia de Catarata">Cirurgia de Catarata</option>
                    <option value="Lentes de Contato">Lentes de Contato</option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Salvando..." : "Salvar e Adicionar à Fila"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Utility CSS for scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
