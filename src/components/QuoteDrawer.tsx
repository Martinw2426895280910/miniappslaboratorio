import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Calculator, 
  Send, 
  FileCheck2, 
  PlusCircle, 
  Clock, 
  ShieldCheck 
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

  const subtotalPromo = selectedProfiles.reduce((acc, curr) => acc + curr.promoPrice, 0);
  const subtotalRegular = selectedProfiles.reduce((acc, curr) => acc + curr.regularPrice, 0);

  // Discount calculation if Obra Social selected
  const discountAmount = Math.round(subtotalPromo * (currentObraSocial.discountPercent / 100));
  const totalEstimate = subtotalPromo - discountAmount;

  const maxFastingHours = selectedProfiles.length > 0 
    ? Math.max(...selectedProfiles.map(p => p.fastingHours)) 
    : 0;

  const handleSendWhatsAppQuote = () => {
    const lines = [
      `*COTIZACIÓN DE ANÁLISIS - LABORATORIO SCHVARZSTEIN*`,
      `*Sede:* Calle Sarmiento 902, Paso de los Libres, Corrientes`,
      ``,
      `*Obra Social / Cobertura:* ${currentObraSocial.name}`,
      `*Estudios solicitados:*`,
      ...selectedProfiles.map(p => `• ${p.title} (Promo: $${p.promoPrice.toLocaleString('es-AR')})`),
      ``,
      `*Total Estimado:* $${totalEstimate.toLocaleString('es-AR')}`,
      maxFastingHours > 0 ? `*Ayuno estimado requerido:* ${maxFastingHours} horas` : null,
      patientNote ? `*Nota / Consulta:* ${patientNote}` : null,
      ``,
      `_Por favor confirmar requisitos de autorización o disponibilidad de turno en Sarmiento 902._`
    ].filter(Boolean);

    const cleanPhone = LAB_CONTACT.whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto no-scrollbar flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Calculador de Presupuesto
              </h3>
              <p className="text-xs text-slate-400">
                Laboratorio Schvarzstein · Sarmiento 902
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
          {selectedProfiles.length === 0 ? (
            <div className="p-8 text-center space-y-3 bg-slate-950 rounded-2xl border border-slate-800">
              <PlusCircle className="w-10 h-10 text-cyan-500/60 mx-auto" />
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm">No has seleccionado estudios aún</h4>
                <p className="text-slate-400 text-xs">
                  Explora la Pantalla 1 y agrega los perfiles bioquímicos o análisis que desees cotizar.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all text-xs"
              >
                Ver Catálogo de Perfiles
              </button>
            </div>
          ) : (
            <>
              {/* Selected List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Estudios Seleccionados ({selectedProfiles.length})
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-[10px] text-red-400 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Vaciar lista</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {selectedProfiles.map((p) => (
                    <div
                      key={p.id}
                      className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <h5 className="font-bold text-white text-xs truncate">{p.title}</h5>
                        <p className="text-[10px] text-slate-400">{p.includedAnalyses.length} determinaciones · Ayuno {p.fastingHours}hs</p>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-cyan-400 font-extrabold text-sm tabular-nums">
                            ${p.promoPrice.toLocaleString('es-AR')}
                          </span>
                          <span className="text-[10px] text-slate-500 line-through tabular-nums">
                            ${p.regularPrice.toLocaleString('es-AR')}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveProfile(p.id)}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-xl transition-colors"
                        title="Quitar de cotización"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Obra Social Selector */}
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Selecciona tu Obra Social o Cobertura:</span>
                </label>
                <select
                  value={selectedObraSocialId}
                  onChange={(e) => setSelectedObraSocialId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500"
                >
                  {OBRA_SOCIALES.map(os => (
                    <option key={os.id} value={os.id}>
                      {os.name} {os.discountPercent > 0 ? `(Aprox. -${os.discountPercent}% cobertura)` : ''}
                    </option>
                  ))}
                </select>

                <p className="text-[10px] text-slate-400 leading-tight">
                  * Aceptamos IOSCOR, OSDE, Swiss Medical, PAMI y convenios con federaciones bioquímicas. El arancel final puede requerir autorización previa.
                </p>
              </div>

              {/* Fasting Notice */}
              {maxFastingHours > 0 && (
                <div className="bg-cyan-950/40 border border-cyan-800/60 rounded-2xl p-3 flex items-center gap-2 text-xs text-cyan-200">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    Condición de preparación conjunta: <strong className="text-white">Ayuno de {maxFastingHours} horas</strong>.
                  </span>
                </div>
              )}

              {/* Patient Note */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 block">
                  Consulta o comentario adicional (opcional):
                </label>
                <input
                  type="text"
                  value={patientNote}
                  onChange={(e) => setPatientNote(e.target.value)}
                  placeholder="Ej: Tengo orden con firma digital / Quiero saber si cubre copago"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Price Breakdown */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Precio de Lista:</span>
                  <span className="line-through tabular-nums">${subtotalRegular.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Arancel Promocional Particular:</span>
                  <span className="tabular-nums">${subtotalPromo.toLocaleString('es-AR')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-400">
                    <span>Estimación Cobertura {currentObraSocial.name}:</span>
                    <span className="tabular-nums font-semibold">-${discountAmount.toLocaleString('es-AR')}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-bold text-white block">Total Estimado a Pagar:</span>
                    <span className="text-[10px] text-cyan-400">Tarifa en Sarmiento 902</span>
                  </div>
                  <span className="text-xl font-extrabold text-cyan-400 tabular-nums">
                    ${totalEstimate.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>

              {/* Send Button */}
              <div className="pt-1">
                <button
                  onClick={handleSendWhatsAppQuote}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all active:scale-95"
                >
                  <Send className="w-4 h-4 fill-current" />
                  <span>Enviar Presupuesto a WhatsApp del Laboratorio</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
