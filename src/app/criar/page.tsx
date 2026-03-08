"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Heart, Calendar, Users, Cake, Star } from "lucide-react";
import Link from "next/link";

export default function CriarPresente() {
  const [step, setStep] = useState(1);
  const [ocasião, setOcasião] = useState("casal"); // Guarda o tipo de presente

  // Variáveis de animação do Framer Motion
  const slideVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { x: -50, opacity: 0, transition: { duration: 0.3 } }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Textos dinâmicos baseados na escolha do usuário
  const getTextosDinamicos = () => {
    switch (ocasião) {
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
      {/* Luz de fundo decorativa */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md z-10 flex flex-col h-[85vh] justify-between">
        
        {/* Cabeçalho e Barra de Progresso */}
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

        {/* Área do Formulário Animado */}
        <div className="flex-1 relative mt-12">
          <AnimatePresence mode="wait">
            
            {/* PASSO 1: Escolha a Ocasião */}
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Qual é o motivo da homenagem?</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Botão Casal */}
                  <button onClick={() => setOcasião("casal")} className={`p-6 rounded-2xl flex flex-col items-center gap-3 transition-all ${ocasião === "casal" ? "neu-pressed border border-purple-500/50" : "neu-panel hover:bg-slate-800"}`}>
                    <Heart className={ocasião === "casal" ? "text-purple-400" : "text-slate-400"} size={32} />
                    <span className={ocasião === "casal" ? "text-white font-medium" : "text-slate-400"}>Casal</span>
                  </button>

                  {/* Botão Amizade */}
                  <button onClick={() => setOcasião("amizade")} className={`p-6 rounded-2xl flex flex-col items-center gap-3 transition-all ${ocasião === "amizade" ? "neu-pressed border border-purple-500/50" : "neu-panel hover:bg-slate-800"}`}>
                    <Users className={ocasião === "amizade" ? "text-purple-400" : "text-slate-400"} size={32} />
                    <span className={ocasião === "amizade" ? "text-white font-medium" : "text-slate-400"}>Amizade</span>
                  </button>

                  {/* Botão Aniversário */}
                  <button onClick={() => setOcasião("aniversario")} className={`p-6 rounded-2xl flex flex-col items-center gap-3 transition-all ${ocasião === "aniversario" ? "neu-pressed border border-purple-500/50" : "neu-panel hover:bg-slate-800"}`}>
                    <Cake className={ocasião === "aniversario" ? "text-purple-400" : "text-slate-400"} size={32} />
                    <span className={ocasião === "aniversario" ? "text-white font-medium" : "text-slate-400"}>Aniversário</span>
                  </button>

                  {/* Botão Família */}
                  <button onClick={() => setOcasião("familia")} className={`p-6 rounded-2xl flex flex-col items-center gap-3 transition-all ${ocasião === "familia" ? "neu-pressed border border-purple-500/50" : "neu-panel hover:bg-slate-800"}`}>
                    <Star className={ocasião === "familia" ? "text-purple-400" : "text-slate-400"} size={32} />
                    <span className={ocasião === "familia" ? "text-white font-medium" : "text-slate-400"}>Família</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* PASSO 2: Nomes (Dinâmico) */}
            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-slate-800 rounded-2xl neu-panel">
                    <IconeDinamico className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{textos.tituloNomes}</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2 ml-1">Seu nome</label>
                    <input type="text" className="neu-pressed w-full p-4 text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="Ex: Éricles" />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2 ml-1">{textos.labelAmor}</label>
                    <input type="text" className="neu-pressed w-full p-4 text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder={textos.placeholder} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* PASSO 3: Data (Dinâmico) */}
            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-slate-800 rounded-2xl neu-panel">
                    <Calendar className="text-purple-400" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{textos.tituloData}</h2>
                </div>
                <div>
                  <input type="date" className="neu-pressed w-full p-4 text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all color-scheme-dark" />
                </div>
              </motion.div>
            )}

            {/* PASSO 4: Fotos */}
            {step === 4 && (
              <motion.div key="step4" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-8">Adicione suas memórias</h2>
                <div className="w-full h-48 neu-pressed border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-400 hover:text-purple-400 hover:border-purple-500/50 transition-colors cursor-pointer">
                  <span className="mb-2 text-3xl">+</span>
                  <p>Toque para enviar as fotos</p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Botões de Navegação Inferiores */}
        <div className="flex gap-4 mt-8 pb-8">
          {step > 1 && (
            <button onClick={prevStep} className="p-4 rounded-xl bg-slate-800 text-white neu-panel hover:bg-slate-700 transition-colors flex items-center justify-center">
              <ArrowLeft size={20} />
            </button>
          )}
          
          <button onClick={step === 4 ? () => console.log("Ir para pagamento") : nextStep} className="flex-1 py-4 rounded-xl bg-purple-500 text-slate-900 font-bold text-lg hover:bg-purple-400 transition-all glow-effect flex items-center justify-center gap-2">
            {step === 4 ? "Finalizar" : "Continuar"} <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </main>
  );
}