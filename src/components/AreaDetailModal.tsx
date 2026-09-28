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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image of Instruments & Reagents ONLY */}
        <div className="relative h-52 w-full shrink-0">
          <img
            src={area.bgImage}
            alt={`Instrumental científico para ${area.name}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-[0.70]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-black/80 transition-all z-20"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-2.5 py-1 bg-cyan-600/90 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider backdrop-blur-md shadow-md">
              Área de Análisis Especializado
            </span>
          </div>

          {/* Title on base */}
          <div className="absolute bottom-3 left-4 right-4 z-10">
            <h3 className="text-xl font-extrabold text-white font-display tracking-tight leading-tight drop-shadow-md">
              {area.name}
            </h3>
            <p className="text-xs text-cyan-200 font-medium">
              {area.shortDesc}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* Instrumental & Technology in focus */}
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Instrumental & Equipamiento Utilizado:</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {area.instrumentFocus}
            </p>
            <div className="pt-1.5 border-t border-slate-900 text-[11px] text-cyan-300">
              <span className="font-semibold text-slate-400">Tecnología:</span> {area.technologyUsed}
            </div>
          </div>

          {/* Detailed description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Alcance Diagnóstico
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
              {area.detailedDescription}
            </p>
          </div>

          {/* Featured Analyses */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Principales Determinaciones ({area.testCount}+)
              </h4>
              <span className="text-[10px] text-slate-400 font-medium">Con Controles Diarios</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {area.featuredTests.map((test, idx) => (
                <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
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
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/40 transition-all active:scale-95"
            >
              <span>Consultar / Agendar Análisis de esta Área</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
