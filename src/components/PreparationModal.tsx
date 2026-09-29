import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  CheckCircle2, 
  MessageCircle 
} from 'lucide-react';
import { PREPARATION_GUIDELINES, LAB_CONTACT } from '../data/labData';

interface PreparationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGuideIndex?: number;
}

export const PreparationModal: React.FC<PreparationModalProps> = ({
  isOpen,
  onClose,
  initialGuideIndex = 0,
}) => {
  const [activeTab, setActiveTab] = useState(initialGuideIndex);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto no-scrollbar flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b-2 border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/98 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-950 text-amber-400 border border-amber-800">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-display uppercase tracking-wide">
                Guía de Ayuno & Preparación
              </h3>
              <p className="text-xs font-bold text-slate-400">
                Indicaciones de Laboratorio Schvarzstein
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs sm:text-sm">
          {/* Tabs with thick font */}
          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2 rounded-2xl border-2 border-slate-800">
            {PREPARATION_GUIDELINES.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`py-2.5 px-3 rounded-xl text-left transition-all ${
                  activeTab === idx
                    ? 'bg-amber-600 text-white font-black shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 font-bold'
                }`}
              >
                <span className="block truncate text-xs sm:text-sm uppercase tracking-tight">{item.title}</span>
              </button>
            ))}
          </div>

          {/* Active Detail Display */}
          <div className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-5 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">
                Protocolo Pre-Analítico Específico
              </span>
              <h4 className="text-lg font-black text-white uppercase">
                {PREPARATION_GUIDELINES[activeTab].title}
              </h4>
              <p className="text-xs sm:text-sm font-extrabold text-cyan-300">
                {PREPARATION_GUIDELINES[activeTab].subtitle}
              </p>
            </div>

            <div className="pt-2 border-t-2 border-slate-900">
              <p className="text-xs sm:text-sm font-bold text-slate-200 leading-relaxed bg-slate-900 p-4 rounded-2xl border border-slate-800">
                {PREPARATION_GUIDELINES[activeTab].detail}
              </p>
            </div>

            {/* Practical recommendations checklist */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-black text-slate-300 uppercase tracking-wider block">
                Recomendaciones Clave del Bioquímico:
              </span>
              <div className="space-y-2 text-slate-200 text-xs sm:text-sm font-bold">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Se puede beber agua mineral pura en pequeños sorbos (no deshidratarse).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>No fumar, no mascar chicle ni tomar café/mate durante el período de ayuno.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Concurrir con orden médica y credencial de obra social a Sarmiento 902.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sede Contact Info Footer */}
          <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-4 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-300">
            <span>¿Dudas sobre tu medicación?</span>
            <a
              href="https://wa.me/543772636749"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline font-black flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar al Bioquímico</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
