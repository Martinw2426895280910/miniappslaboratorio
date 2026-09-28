import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';
import { PREPARATION_GUIDELINES } from '../data/labData';

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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto no-scrollbar flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-950 text-amber-400 border border-amber-800">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Guía de Ayuno & Preparación
              </h3>
              <p className="text-xs text-slate-400">
                Indicaciones de Laboratorio Schvarzstein
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4 text-xs">
          {/* Tabs */}
          <div className="grid grid-cols-2 gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            {PREPARATION_GUIDELINES.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`py-2 px-2.5 rounded-xl text-left transition-all ${
                  activeTab === idx
                    ? 'bg-amber-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span className="block truncate text-[11px]">{item.title}</span>
              </button>
            ))}
          </div>

          {/* Active Detail Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Protocolo Pre-Analítico
              </span>
              <h4 className="text-base font-bold text-white">
                {PREPARATION_GUIDELINES[activeTab].title}
              </h4>
              <p className="text-xs text-cyan-400 font-medium">
                {PREPARATION_GUIDELINES[activeTab].subtitle}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-900">
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                {PREPARATION_GUIDELINES[activeTab].detail}
              </p>
            </div>

            {/* Practical recommendations checklist */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-300 block">
                Recomendaciones Clave:
              </span>
              <div className="space-y-1.5 text-slate-300 text-[11px]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Se puede beber agua mineral pura en pequeñas cantidades (no deshidratarse).</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>No fumar ni mascar chicle durante el período de ayuno.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Traer carnet de obra social y DNI físico al ingresar a Sarmiento 902.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sede Contact Info Footer */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-[11px] text-slate-400">
            <span>¿Dudas sobre medicación?</span>
            <a
              href="https://wa.me/543772636749"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline font-semibold"
            >
              Consultar al bioquímico por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
