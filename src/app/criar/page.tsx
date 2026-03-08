"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Heart, Calendar, Users, Cake, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CriarPresente() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estado para capturar todos os dados do formulário
  const [formData, setFormData] = useState({
    ocasião: "casal",
    nome_criador: "",
    nome_presenteado: "",
    data_inicio: "",
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Função para salvar os dados via API segura
  const handleFinalizar = async () => {
    if (!formData.nome_criador || !formData.nome_presenteado) {
      alert("Por favor, preencha os nomes antes de continuar.");
      setStep(2);
      return;
    }

    setIsSubmitting(true);

    try {
      // Gerar um slug temporário baseado nos nomes (ex: joao-e-maria-123)
      const slugBase = `${formData.nome_criador}-${formData.nome_presenteado}`
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-");
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const slugFinal = `${slugBase}-${randomSuffix}`;

      const response = await fetch("/api/homenagens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug: slugFinal,
          tipo_relacao: formData.ocasião,
          status_pagamento: "pendente"
        }),
      });

      const data = await response.json();

      if (data.sucesso) {
        // Redireciona para o checkout levando o slug na URL
        router.push(`/pagamento?slug=${data.slug}`);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Ops! Tivemos um problema ao salvar seu presente. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTextosDinamicos = () => {
    switch (formData.ocasião) {
      case "amizade":
        return { tituloNomes: "Quem é sua dupla?", labelAmor: "Nome do amigo(a)", placeholder: "Ex: João", tituloData: "Desde quando são amigos?", icone: Users };
      case "aniversario":
        return { tituloNomes: "De quem é o dia hoje?", labelAmor: "Nome do aniversariante", placeholder: "Ex: Ana", tituloData: "Data de nascimento", icone: Cake };
      case "familia":
        return { tituloNomes: "Para quem é a homenagem?", labelAmor: "Nome do familiar", placeholder: "Ex: Mãe", tituloData: "Uma data marcante (opcional)", icone: Star };
      case "casal":
      default:
        return { tituloNomes: "Quem são os protagonistas?", labelAmor: "Nome do seu amor", placeholder: "Ex: Renata", tituloData: "Quando tudo começou?", icone: Heart };
    }
  };

  const textos = getTextosDinamicos();
  const IconeDinamico = textos.icone;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md z-10 flex flex-col h-[85vh] justify-between">
        
        <div className="space-y-6 mt-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors">Cancelar</Link>
            <span className="text-purple-400 font-medium text-sm glass-panel px-3 py-1">Passo {step} de 4</span>
          </div>
          
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden neu-pressed">
            <motion.div 
              className="h-full bg-purple-500 glow-effect"
              initial={{ width: "25%" }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="flex-1 relative mt-12">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div key="step1" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Qual é o motivo da homenagem?</h2>
                <div className="grid grid-cols-2 gap-4">
                  {["casal", "amizade", "aniversario", "familia"].map((op) => (
                    <button 
                      key={op}
                      onClick={() => setFormData({ ...formData, ocasião: op })} 
                      className={`p-6 rounded-2xl flex flex-col items-center gap-3 transition-all ${formData.ocasião === op ? "neu-pressed border border-purple-500/50" : "neu-panel hover:bg-slate-800"}`}
                    >
                      {op === "casal" && <Heart className={formData.ocasião === op ? "text-purple-400" : "text-slate-400"} size={32} />}
                      {op === "amizade" && <Users className={formData.ocasião === op ? "text-purple-400" : "text-slate-400"} size={32} />}
                      {op === "aniversario" && <Cake className={formData.ocasião === op ? "text-purple-400" : "text-slate-400"} size={32} />}
                      {op === "familia" && <Star className={formData.ocasião === op ? "text-purple-400" : "text-slate-400"} size={32} />}
                      <span className={formData.ocasião === op ? "text-white font-medium capitalize" : "text-slate-400 capitalize"}>{op}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-slate-800 rounded-2xl neu-panel"><IconeDinamico className="text-purple-400" size={24} /></div>
                  <h2 className="text-2xl font-bold text-white">{textos.tituloNomes}</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2 ml-1">Seu nome</label>
                    <input 
                      type="text" 
                      value={formData.nome_criador}
                      onChange={(e) => setFormData({...formData, nome_criador: e.target.value})}
                      className="neu-pressed w-full p-4 text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" 
                      placeholder="Ex: Éricles" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2 ml-1">{textos.labelAmor}</label>
                    <input 
                      type="text" 
                      value={formData.nome_presenteado}
                      onChange={(e) => setFormData({...formData, nome_presenteado: e.target.value})}
                      className="neu-pressed w-full p-4 text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" 
                      placeholder={textos.placeholder} 
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-slate-800 rounded-2xl neu-panel"><Calendar className="text-purple-400" size={24} /></div>
                  <h2 className="text-2xl font-bold text-white">{textos.tituloData}</h2>
                </div>
                <input 
                  type="date" 
                  value={formData.data_inicio}
                  onChange={(e) => setFormData({...formData, data_inicio: e.target.value})}
                  className="neu-pressed w-full p-4 text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all color-scheme-dark" 
                />
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-8">Adicione suas memórias</h2>
                <div className="w-full h-48 neu-pressed border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-400 hover:text-purple-400 hover:border-purple-500/50 transition-colors cursor-pointer">
                  <span className="mb-2 text-3xl">+</span>
                  <p>Toque para enviar as fotos</p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <div className="flex gap-4 mt-8 pb-8">
          {step > 1 && (
            <button 
              disabled={isSubmitting}
              onClick={prevStep} 
              className="p-4 rounded-xl bg-slate-800 text-white neu-panel hover:bg-slate-700 transition-colors flex items-center justify-center disabled:opacity-50"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          
          <button 
            disabled={isSubmitting}
            onClick={step === 4 ? handleFinalizar : nextStep} 
            className="flex-1 py-4 rounded-xl bg-purple-500 text-slate-900 font-bold text-lg hover:bg-purple-400 transition-all glow-effect flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>Salvando... <Loader2 className="animate-spin" size={20} /></>
            ) : (
              <>{step === 4 ? "Finalizar" : "Continuar"} <ArrowRight size={20} /></>
            )}
          </button>
        </div>

      </div>
    </main>
  );
}