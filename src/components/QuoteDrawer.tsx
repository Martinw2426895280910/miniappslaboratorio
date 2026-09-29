import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ClipboardList, 
  Send, 
  FileCheck2, 
  PlusCircle, 
  Clock, 
  ShieldCheck,
  Building2 
} from 'lucide-react';
import { StudyProfile, OBRA_SOCIALES, LAB_CONTACT } from '../data/labData';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProfiles: StudyProfile[];
  onRemoveProfile: (profileId: string) => void;
  onClearCart: () => void;
}

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({
  isOpen,
  onClose,
  selectedProfiles,
  onRemoveProfile,
  onClearCart,
}) => {
  const [selectedObraSocialId, setSelectedObraSocialId] = useState('particular');
  const [patientNote, setPatientNote] = useState('');

  if (!isOpen) return null;

  const currentObraSocial = OBRA_SOCIALES.find(o => o.id === selectedObraSocialId) || OBRA_SOCIALES[0];

  const maxFastingHours = selectedProfiles.length > 0 
    ? Math.max(...selectedProfiles.map(p => p.fastingHours)) 
    : 0;

  const handleSendWhatsAppConsultation = () => {
    const cleanPhone = LAB_CONTACT.whatsappNumber.replace(/[^0-9]/g, '');
    const lines = [
      `*CONSULTA DE ESTUDIOS Y COBERTURA - LABORATORIO SCHVARZSTEIN*`,
      `*Sede:* Calle Sarmiento 902, Paso de los Libres, Corrientes`,
      ``,
      `*Obra Social / Cobertura:* ${currentObraSocial.name}`,
      `*Estudios seleccionados (${selectedProfiles.length}):*`,
      ...selectedProfiles.map(p => `• ${p.title} (${p.category} - Ayuno: ${p.fastingHours}hs)`),
      ``,
      maxFastingHours > 0 ? `*Condición de Ayuno estimada:* ${maxFastingHours} horas` : null,
      patientNote ? `*Nota / Consulta adicional:* ${patientNote}` : null,
      ``,
      `_Por favor confirmar disponibilidad de turno, requisitos de orden médica o autorización en sede Sarmiento 902._`
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto no-scrollbar flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b-2 border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/98 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-display uppercase tracking-wide">
                Mis Estudios Seleccionados
              </h3>
              <p className="text-xs font-bold text-slate-400">
                Laboratorio Schvarzstein · Sarmiento 902
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
          {selectedProfiles.length === 0 ? (
            <div className="p-8 text-center space-y-4 bg-slate-950 rounded-3xl border-2 border-slate-800">
              <PlusCircle className="w-12 h-12 text-cyan-500/70 mx-auto" />
              <div className="space-y-1.5">
                <h4 className="font-black text-white text-base uppercase">No has seleccionado estudios</h4>
                <p className="text-slate-300 text-xs sm:text-sm font-semibold">
                  Explora la Pantalla 1 y agrega los perfiles bioquímicos o análisis para coordinar tu atención.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-black uppercase text-xs transition-all shadow-md"
              >
                Ver Catálogo de Perfiles
              </button>
            </div>
          ) : (
            <>
              {/* Selected List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                    Estudios en Lista ({selectedProfiles.length})
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-xs text-red-400 hover:underline flex items-center gap-1 font-black uppercase"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Vaciar lista</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {selectedProfiles.map((p) => (
                    <div
                      key={p.id}
                      className="bg-slate-950 p-4 rounded-2xl border-2 border-slate-800 flex items-center justify-between gap-3 shadow-md"
                    >
                      <div className="min-w-0 space-y-1">
                        <span className="text-xs uppercase font-black text-cyan-400 block">
                          {p.category}
                        </span>
                        <h5 className="font-black text-white text-sm sm:text-base truncate">{p.title}</h5>
                        <p className="text-xs font-bold text-slate-300">
                          {p.includedAnalyses.length} determinaciones · Ayuno: {p.fastingHours}hs
                        </p>
                        <span className="text-xs text-emerald-400 font-black block">
                          Entrega: {p.turnaroundTime}
                        </span>
                      </div>

                      <button
                        onClick={() => onRemoveProfile(p.id)}
                        className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-2xl transition-colors shrink-0"
                        title="Quitar estudio"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Obra Social Selector */}
              <div className="bg-slate-950 p-4 rounded-2xl border-2 border-slate-800 space-y-2.5">
                <label className="text-xs font-black text-slate-200 flex items-center gap-2 uppercase">
                  <FileCheck2 className="w-4 h-4 text-cyan-400" />
                  <span>Obra Social o Cobertura de Salud:</span>
                </label>
                <select
                  value={selectedObraSocialId}
                  onChange={(e) => setSelectedObraSocialId(e.target.value)}
                  className="w-full bg-slate-900 border-2 border-slate-700 text-white rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-cyan-400"
                >
                  {OBRA_SOCIALES.map(os => (
                    <option key={os.id} value={os.id} className="font-bold bg-slate-900">
                      {os.name}
                    </option>
                  ))}
                </select>

                <p className="text-xs font-bold text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
                  {currentObraSocial.planInfo}. Podés enviar la foto de tu orden médica por WhatsApp para que la autoricemos previamente en Sarmiento 902.
                </p>
              </div>

              {/* Fasting Notice */}
              {maxFastingHours > 0 && (
                <div className="bg-cyan-950/60 border-2 border-cyan-800 rounded-2xl p-3.5 flex items-center gap-3 text-xs sm:text-sm text-cyan-200">
                  <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span className="font-bold">
                    Condición de preparación conjunta: <strong className="text-white font-black">Ayuno de {maxFastingHours} horas</strong>.
                  </span>
                </div>
              )}

              {/* Patient Note */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-300 block uppercase">
                  Consulta adicional para el bioquímico (opcional):
                </label>
                <input
                  type="text"
                  value={patientNote}
                  onChange={(e) => setPatientNote(e.target.value)}
                  placeholder="Ej: Adjunto orden médica / Solicito extracción a domicilio"
                  className="w-full bg-slate-950 border-2 border-slate-700 rounded-2xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Summary Box */}
              <div className="bg-slate-950 p-4 rounded-2xl border-2 border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-200">
                  <span className="font-bold">Total de Estudios en Consulta:</span>
                  <span className="font-black text-white">{selectedProfiles.length} perfiles</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm text-slate-200">
                  <span className="font-bold">Cobertura Seleccionada:</span>
                  <span className="font-black text-emerald-400">{currentObraSocial.name}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Sin costo adicional por consulta ni gestión de turno.</span>
                </div>
              </div>

              {/* Send Button */}
              <div className="pt-2">
                <button
                  onClick={handleSendWhatsAppConsultation}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/60 transition-all active:scale-95"
                >
                  <Send className="w-5 h-5 fill-current" />
                  <span>Consultar Cobertura y Turno por WhatsApp</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
