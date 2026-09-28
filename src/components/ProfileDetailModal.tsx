import React from 'react';
import { 
  X, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Check, 
  FileCheck, 
  AlertCircle 
} from 'lucide-react';
import { StudyProfile } from '../data/labData';

interface ProfileDetailModalProps {
  profile: StudyProfile | null;
  onClose: () => void;
  onAddToCart: (profile: StudyProfile) => void;
  isAdded: boolean;
  onBookAppointment: (profile: StudyProfile) => void;
}

export const ProfileDetailModal: React.FC<ProfileDetailModalProps> = ({
  profile,
  onClose,
  onAddToCart,
  isAdded,
  onBookAppointment,
}) => {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image of Instruments & Reagents with Close Button */}
        <div className="relative h-52 w-full shrink-0">
          <img
            src={profile.bgImage}
            alt={profile.title}
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
              {profile.tag}
            </span>
          </div>

          {/* Title on image base */}
          <div className="absolute bottom-3 left-4 right-4 z-10">
            <h3 className="text-xl font-extrabold text-white font-display tracking-tight leading-tight drop-shadow-md">
              {profile.title}
            </h3>
            <p className="text-xs text-cyan-200 font-medium">
              {profile.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-5 space-y-5">
          {/* Key Facts Pills Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Ayuno Requerido:</span>
                <span className="font-bold text-white text-xs">{profile.fastingHours} Horas</span>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Entrega de Resultados:</span>
                <span className="font-bold text-white text-xs">{profile.turnaroundTime}</span>
              </div>
            </div>
          </div>

          {/* Sample Type */}
          <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80 text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
              Tipo de Muestra Biológica:
            </span>
            <p className="text-slate-200 font-medium">{profile.sampleType}</p>
          </div>

          {/* Clinical Purpose Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Objetivo Diagnóstico
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-2xl border border-slate-800">
              {profile.description}
            </p>
          </div>

          {/* Included Determinations */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Determinaciones Incluidas ({profile.includedAnalyses.length})
              </h4>
              <span className="text-[10px] text-cyan-400 font-semibold">Validadas en Laboratorio</span>
            </div>
            
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-3 space-y-2 divide-y divide-slate-900">
              {profile.includedAnalyses.map((analysis, index) => (
                <div key={index} className="flex items-start gap-2 pt-2 first:pt-0 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{analysis}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Preparation Instructions */}
          <div className="bg-amber-950/30 border border-amber-800/50 rounded-2xl p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Instrucciones de Preparación:</span>
            </div>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              {profile.instructions}
            </p>
          </div>

          {/* Pricing breakdown */}
          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold">Arancel Promocional Particular:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-cyan-400 tabular-nums">
                  ${profile.promoPrice.toLocaleString('es-AR')}
                </span>
                <span className="text-xs text-slate-500 line-through tabular-nums">
                  ${profile.regularPrice.toLocaleString('es-AR')}
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold rounded-lg">
              Ahorrás ${(profile.regularPrice - profile.promoPrice).toLocaleString('es-AR')}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => onAddToCart(profile)}
              className={`py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>En Cotización</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-cyan-400" />
                  <span>Agregar a Cotizar</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                onClose();
                onBookAppointment(profile);
              }}
              className="py-3 px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/40 transition-all active:scale-95"
            >
              <span>Solicitar Turno</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
