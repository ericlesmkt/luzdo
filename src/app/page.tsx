import Link from 'next/link';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Luz de fundo decorativa sutil (Glow) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="z-10 w-full max-w-md flex flex-col items-center text-center gap-8">
        
        {/* Badge de Destaque (Glasmorfismo) */}
        <div className="glass-panel px-4 py-2 flex items-center gap-2 text-purple-400 text-sm font-medium">
          <Sparkles size={16} />
          <span>O presente que emociona</span>
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          Eternize a <span className="text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">Luz</span> da sua relação
        </h1>

        <p className="text-slate-400 text-lg px-4">
          Crie uma experiência imersiva, musical e inesquecível para quem você ama em menos de 3 minutos.
        </p>

        {/* Card de Demonstração (Neumorfismo) */}
        <div className="neu-panel w-full p-8 mt-4 flex flex-col items-center gap-6 relative">
          
          {/* Ícone flutuando na borda superior */}
          <div className="absolute -top-6 bg-slate-800 p-4 rounded-full shadow-lg border border-slate-700/50">
            <Heart className="text-purple-400" fill="currentColor" size={28} />
          </div>
          
          <h3 className="text-2xl font-semibold text-white mt-4">Surpreenda hoje</h3>
          
          <ul className="text-slate-400 text-sm mb-2 text-left space-y-3 w-full px-4">
            <li className="flex items-center gap-2">✨ Fotos e momentos marcantes</li>
            <li className="flex items-center gap-2">🎵 Trilha sonora do casal</li>
            <li className="flex items-center gap-2">🌌 O mapa das estrelas de vocês</li>
          </ul>

          {/* Botão de Call to Action com o Efeito Glow */}
          <Link href="/criar" className="w-full">
            <button className="w-full py-4 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-900 font-bold text-lg transition-all glow-effect flex items-center justify-center gap-2">
              Criar meu presente <ArrowRight size={20} />
            </button>
          </Link>
        </div>
        
      </div>
    </main>
  );
}