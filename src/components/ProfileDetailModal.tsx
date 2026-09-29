import React from 'react';
import { 
  X, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Check, 
  FileCheck, 
  AlertCircle,
  ShieldCheck,
  Building2 
} from 'lucide-react';
import { StudyProfile, LAB_CONTACT } from '../data/labData';

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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image of Instruments & Reagents with Close Button */}
        <div className="relative h-56 w-full shrink-0">
          <img
            src={profile.bgImage}
            alt={profile.title}
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
              {profile.tag}
            </span>
          </div>

          {/* Title on image base */}
          <div className="absolute bottom-3.5 left-4 right-4 z-10">
            <span className="text-xs uppercase font-black text-cyan-300 tracking-wider block mb-1">
              {profile.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight leading-tight drop-shadow-md uppercase">
              {profile.title}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-slate-100 mt-0.5">
              {profile.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Key Facts Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="bg-slate-950 p-3.5 rounded-2xl border-2 border-slate-800 flex items-center gap-3">
              <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-xs font-extrabold text-slate-400 uppercase block">Ayuno:</span>
                <span className="font-black text-white text-sm">{profile.fastingHours} Horas</span>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border-2 border-slate-800 flex items-center gap-3">
              <FileCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-xs font-extrabold text-slate-400 uppercase block">Informe:</span>
                <span className="font-black text-white text-sm">{profile.turnaroundTime}</span>
              </div>
            </div>
          </div>

          {/* Sample Type */}
          <div className="bg-slate-950 p-4 rounded-2xl border-2 border-slate-800/80">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-1">
              Muestra Requerida:
            </span>
            <p className="text-sm font-bold text-slate-100">{profile.sampleType}</p>
          </div>

          {/* Clinical Purpose Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider">
              Objetivo Clínico Diagnóstico
            </h4>
            <p className="text-xs sm:text-sm font-bold text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-2xl border-2 border-slate-800">
              {profile.description}
            </p>
          </div>

          {/* Included Determinations */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider">
                Determinaciones Incluidas ({profile.includedAnalyses.length})
              </h4>
              <span className="text-xs font-black text-cyan-400">Control Diario</span>
            </div>
            
            <div className="bg-slate-950 rounded-2xl border-2 border-slate-800 p-4 space-y-2.5 divide-y divide-slate-900">
              {profile.includedAnalyses.map((analysis, index) => (
                <div key={index} className="flex items-start gap-2.5 pt-2.5 first:pt-0 text-xs sm:text-sm font-bold text-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{analysis}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Preparation Instructions */}
          <div className="bg-amber-950/30 border-2 border-amber-800/50 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 text-xs sm:text-sm font-black">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Instrucciones de Preparación Pre-Analítica:</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-amber-100 leading-relaxed">
              {profile.instructions}
            </p>
          </div>

          {/* Cobertura & Obra Social Card */}
          <div className="bg-slate-950 p-4 rounded-2xl border-2 border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-black">
              <ShieldCheck className="w-5 h-5" />
              <span>Cobertura de Salud & Obras Sociales:</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-200 leading-relaxed">
              Atención con convenio para afiliados de <strong className="text-white font-black">IOSCOR, OSDE, Swiss Medical, PAMI, Medifé, Galeno, Sancor Salud</strong> y pacientes particulares.
            </p>
            <div className="pt-2 flex items-center justify-between text-xs font-extrabold text-slate-400">
              <span>Sede: {LAB_CONTACT.address}</span>
              <span className="text-cyan-400">Paso de los Libres</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => onAddToCart(profile)}
              className={`py-4 px-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                isAdded
                  ? 'bg-emerald-700 text-white border-2 border-emerald-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border-2 border-slate-700'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>En Mis Estudios</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-cyan-400" />
                  <span>Agregar a Lista</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                onClose();
                onBookAppointment(profile);
              }}
              className="py-4 px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/60 transition-all active:scale-95"
            >
              <span>Solicitar Turno</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
