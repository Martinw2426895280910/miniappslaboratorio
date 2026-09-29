import React from 'react';
import { 
  X, 
  Cpu, 
  CheckCircle2, 
  ChevronRight 
} from 'lucide-react';
import { LabArea } from '../data/labData';

interface AreaDetailModalProps {
  area: LabArea | null;
  onClose: () => void;
  onGoToAppointment: () => void;
}

export const AreaDetailModal: React.FC<AreaDetailModalProps> = ({
  area,
  onClose,
  onGoToAppointment,
}) => {
  if (!area) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image of Instruments & Reagents ONLY */}
        <div className="relative h-56 w-full shrink-0">
          <img
            src={area.bgImage}
            alt={`Instrumental científico para ${area.name}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-[0.65]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/75 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-black transition-all z-20"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-cyan-600 text-white text-xs font-black rounded-xl uppercase tracking-wider shadow-lg border border-cyan-400/40">
              Área de Análisis Clínico
            </span>
          </div>

          {/* Title on base */}
          <div className="absolute bottom-3.5 left-4 right-4 z-10 space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight leading-tight drop-shadow-md uppercase">
              {area.name}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-slate-100">
              {area.shortDesc}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Instrumental & Technology in focus */}
          <div className="bg-slate-950 p-4 rounded-2xl border-2 border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-cyan-400 text-xs sm:text-sm font-black uppercase">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>Instrumental & Equipamiento Utilizado:</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-200 leading-relaxed">
              {area.instrumentFocus}
            </p>
            <div className="pt-2 border-t border-slate-900 text-xs font-bold text-cyan-300">
              <span className="text-slate-400 font-extrabold uppercase">Tecnología:</span> {area.technologyUsed}
            </div>
          </div>

          {/* Detailed description */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider">
              Alcance Diagnóstico Bioquímico
            </h4>
            <p className="text-xs sm:text-sm font-bold text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-2xl border-2 border-slate-800">
              {area.detailedDescription}
            </p>
          </div>

          {/* Featured Analyses */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider">
                Determinaciones Principales ({area.testCount}+)
              </h4>
              <span className="text-xs font-black text-emerald-400">Calibración Diaria</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {area.featuredTests.map((test, idx) => (
                <div key={idx} className="bg-slate-950 p-3 rounded-2xl border-2 border-slate-800 flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate">{test}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                onGoToAppointment();
              }}
              className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/60 transition-all active:scale-95"
            >
              <span>Agendar Análisis de esta Área</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
