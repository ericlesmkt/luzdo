"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stars, Music, Play } from "lucide-react";

// Dados de exemplo (No futuro, o Supabase vai puxar isso do banco de dados baseado no link)
const MOCK_DATA = {
  nomes: "Éricles & Renata",
  musica: "Nossa Trilha Sonora",
  slides: [
    {
      id: 1,
      tipo: "texto",
      titulo: "Tudo começou com um detalhe...",
      texto: "E de repente, você se tornou a minha notificação favorita do dia.",
    },
    {
      id: 2,
      tipo: "stats",
      titulo: "Nossa Jornada",
      dias: 450,
      texto: "Dias iluminando a vida um do outro.",
    },
    {
      id: 3,
      tipo: "mapa",
      titulo: "Sob o mesmo céu",
      texto: "O universo conspirou a nosso favor.",
    },
    {
      id: 4,
      tipo: "final",
      titulo: "Com amor, Éricles.",
      texto: "Para sempre a minha melhor escolha. 💜",
    }
  ]
};

export default function PresenteStory() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Lógica para avançar e voltar os Stories
  const nextSlide = () => {
    if (currentSlide < MOCK_DATA.slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // Variáveis de Animação do Framer Motion
  const slideVariants = {
    enter: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
    center: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.4 } }
  };

  return (
    <main className="h-screen w-full bg-slate-900 text-white overflow-hidden relative flex flex-col">
      {/* Fundo dinâmico escuro com Glow roxo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Áreas de Toque Invisíveis (Esquerda para voltar, Direita para avançar) */}
      <div className="absolute inset-0 z-20 flex">
        <div className="w-1/3 h-full" onClick={prevSlide}></div>
        <div className="w-2/3 h-full" onClick={nextSlide}></div>
      </div>

      {/* UI Superior (Barras de Progresso e Player) */}
      <div className="z-30 w-full px-4 pt-6 space-y-4 pointer-events-none">
        {/* Barras estilo Instagram Story */}
        <div className="flex gap-1.5 w-full">
          {MOCK_DATA.slides.map((_, index) => (
            <div key={index} className="h-1 flex-1 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div 
                className="h-full bg-purple-400 glow-effect"
                initial={{ width: index < currentSlide ? "100%" : "0%" }}
                animate={{ width: index === currentSlide ? "100%" : index < currentSlide ? "100%" : "0%" }}
                transition={{ duration: index === currentSlide ? 5 : 0.3, ease: "linear" }}
                onAnimationComplete={() => {
                  // Se a barra encheu (5 segundos), avança sozinho
                  if (index === currentSlide && currentSlide < MOCK_DATA.slides.length - 1) {
                    nextSlide();
                  }
                }}
              />
            </div>
          ))}
        </div>

        {/* Header com Nomes e Botão de Música */}
        <div className="flex justify-between items-center pointer-events-auto">
          <span className="font-semibold text-sm drop-shadow-md">{MOCK_DATA.nomes}</span>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-purple-300"
          >
            {isPlaying ? <Music size={14} className="animate-pulse" /> : <Play size={14} />}
            {MOCK_DATA.musica}
          </button>
        </div>
      </div>

      {/* Área Central: O Conteúdo do Slide */}
      <div className="flex-1 relative flex items-center justify-center p-6 z-10 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full text-center flex flex-col items-center gap-6"
          >
            {/* Renderização Condicional baseada no tipo de Slide */}
            {MOCK_DATA.slides[currentSlide].tipo === "texto" && (
              <div className="glass-panel p-8 w-full">
                <Heart className="text-purple-400 mx-auto mb-6" size={40} />
                <h2 className="text-3xl font-bold mb-4">{MOCK_DATA.slides[currentSlide].titulo}</h2>
                <p className="text-slate-300 text-lg">{MOCK_DATA.slides[currentSlide].texto}</p>
              </div>
            )}

            {MOCK_DATA.slides[currentSlide].tipo === "stats" && (
              <div className="w-full">
                <h2 className="text-purple-400 text-xl font-medium mb-8 uppercase tracking-widest">{MOCK_DATA.slides[currentSlide].titulo}</h2>
                <div className="text-8xl font-black text-white drop-shadow-[0_0_25px_rgba(168,85,247,0.5)] mb-4">
                  {MOCK_DATA.slides[currentSlide].dias}
                </div>
                <p className="text-slate-300 text-xl">{MOCK_DATA.slides[currentSlide].texto}</p>
              </div>
            )}

            {MOCK_DATA.slides[currentSlide].tipo === "mapa" && (
              <div className="neu-panel p-8 border border-purple-500/20 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                <Stars className="text-purple-400 mx-auto mb-4 relative z-10" size={40} />
                <h2 className="text-2xl font-bold mb-2 relative z-10">{MOCK_DATA.slides[currentSlide].titulo}</h2>
                <p className="text-slate-400 text-sm relative z-10">{MOCK_DATA.slides[currentSlide].texto}</p>
              </div>
            )}

            {MOCK_DATA.slides[currentSlide].tipo === "final" && (
              <div className="mt-20">
                <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                  {MOCK_DATA.slides[currentSlide].titulo}
                </h1>
                <p className="text-xl text-purple-200">{MOCK_DATA.slides[currentSlide].texto}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

    </main>
  );
}