import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Send, 
  Home, 
  Building2, 
  FileCheck2,
  CheckCircle2
} from 'lucide-react';
import { LAB_CONTACT, OBRA_SOCIALES, StudyProfile } from '../data/labData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProfile?: StudyProfile | null;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedProfile,
}) => {
  const [serviceType, setServiceType] = useState<'presencial' | 'domicilio'>('presencial');
  const [patientName, setPatientName] = useState('');
  const [patientDni, setPatientDni] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [selectedObraSocial, setSelectedObraSocial] = useState('particular');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('07:30');
  const [observations, setObservations] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const obraSocialObj = OBRA_SOCIALES.find(o => o.id === selectedObraSocial);
    const obraSocialName = obraSocialObj ? obraSocialObj.name : 'Particular';

    const messageLines = [
      `*SOLICITUD DE TURNO - LABORATORIO SCHVARZSTEIN*`,
      `*Sede:* Calle Sarmiento 902, Paso de los Libres, Corrientes`,
      ``,
      `*Modalidad:* ${serviceType === 'presencial' ? '🏢 Presencial en Sarmiento 902' : '🏠 Extracción a Domicilio en Paso de los Libres'}`,
      `*Paciente:* ${patientName || 'A confirmar'}`,
      `*DNI:* ${patientDni || 'Sin especificar'}`,
      `*Teléfono:* ${patientPhone || 'Sin especificar'}`,
      serviceType === 'domicilio' ? `*Dirección en Libres:* ${patientAddress}` : null,
      `*Obra Social / Cobertura:* ${obraSocialName}`,
      `*Fecha solicitada:* ${preferredDate || 'Lo antes posible'}`,
      `*Horario matutino preferido:* ${preferredTime} hs`,
      preselectedProfile ? `*Estudio / Perfil:* ${preselectedProfile.title} ($${preselectedProfile.promoPrice.toLocaleString('es-AR')})` : null,
      observations ? `*Observaciones / Estudios adicionales:* ${observations}` : null,
      ``,
      `_Mensaje generado automáticamente desde la App Móvil_`
    ].filter(Boolean);

    const fullMessage = encodeURIComponent(messageLines.join('\n'));
    
    const cleanPhone = LAB_CONTACT.whatsappNumber.replace(/[^0-9]/g, '');
    // Open WhatsApp
    setTimeout(() => {
      window.open(`https://wa.me/${cleanPhone}?text=${fullMessage}`, '_blank');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto no-scrollbar flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
          <div>
            <h3 className="text-base font-bold text-white font-display">
              Solicitud de Turno o Domicilio
            </h3>
            <p className="text-xs text-cyan-400">
              Calle Sarmiento 902 · Paso de los Libres
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white">¡Solicitud Generada!</h4>
              <p className="text-xs text-slate-300">
                Se ha transferido la solicitud a WhatsApp del laboratorio para confirmación inmediata con el bioquímico.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-400 text-left space-y-1">
              <p className="font-semibold text-slate-300">Sede Sarmiento 902:</p>
              <p>Te responderemos a la brevedad indicando las condiciones exactas de ayuno para tu estudio.</p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl transition-all"
            >
              Cerrar y Volver a la App
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 text-xs">
            {/* Modalidad Selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Modalidad de Atención:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setServiceType('presencial')}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                    serviceType === 'presencial'
                      ? 'bg-cyan-950/80 border-cyan-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Building2 className={`w-5 h-5 ${serviceType === 'presencial' ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <div>
                    <span className="font-bold text-xs block">En Sarmiento 902</span>
                    <span className="text-[10px] text-slate-400 block">Sede Central Libres</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('domicilio')}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                    serviceType === 'domicilio'
                      ? 'bg-cyan-950/80 border-cyan-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Home className={`w-5 h-5 ${serviceType === 'domicilio' ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <div>
                    <span className="font-bold text-xs block">A Domicilio</span>
                    <span className="text-[10px] text-slate-400 block">En Paso de los Libres</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Profile banner if preselected */}
            {preselectedProfile && (
              <div className="bg-cyan-950/40 border border-cyan-800/60 rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-cyan-400 uppercase font-bold block">Estudio Seleccionado:</span>
                  <span className="font-bold text-white text-xs">{preselectedProfile.title}</span>
                </div>
                <span className="text-cyan-300 font-extrabold text-sm tabular-nums">
                  ${preselectedProfile.promoPrice.toLocaleString('es-AR')}
                </span>
              </div>
            )}

            {/* Patient Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Nombre y Apellido del Paciente:</span>
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Ej: María Gómez"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-white placeholder:text-slate-600 focus:outline-none"
              />
            </div>

            {/* DNI & Phone */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 block">
                  DNI / Documento:
                </label>
                <input
                  type="text"
                  required
                  value={patientDni}
                  onChange={(e) => setPatientDni(e.target.value)}
                  placeholder="Ej: 35.420.198"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-white placeholder:text-slate-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-cyan-400" />
                  <span>Celular / WhatsApp:</span>
                </label>
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="Ej: 3772-154988"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-white placeholder:text-slate-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Address if domicilio */}
            {serviceType === 'domicilio' && (
              <div className="space-y-1 animate-in fade-in">
                <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dirección exacta y Barrio (Paso de los Libres):</span>
                </label>
                <input
                  type="text"
                  required
                  value={patientAddress}
                  onChange={(e) => setPatientAddress(e.target.value)}
                  placeholder="Ej: Calle Colón 1450, Barrio Centro"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-white placeholder:text-slate-600 focus:outline-none"
                />
              </div>
            )}

            {/* Obra Social Selector */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                <FileCheck2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Obra Social o Prepaga:</span>
              </label>
              <select
                value={selectedObraSocial}
                onChange={(e) => setSelectedObraSocial(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-white focus:outline-none"
              >
                {OBRA_SOCIALES.map(os => (
                  <option key={os.id} value={os.id} className="bg-slate-900">
                    {os.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time slot */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  <span>Fecha preferida:</span>
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-white focus:outline-none text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>Horario mañana:</span>
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-white focus:outline-none text-xs"
                >
                  <option value="06:45">06:45 hs (Apertura)</option>
                  <option value="07:15">07:15 hs</option>
                  <option value="07:45">07:45 hs</option>
                  <option value="08:15">08:15 hs</option>
                  <option value="08:45">08:45 hs</option>
                  <option value="09:15">09:15 hs</option>
                  <option value="09:45">09:45 hs</option>
                  <option value="10:15">10:15 hs</option>
                </select>
              </div>
            </div>

            {/* Observations */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 block">
                Observaciones o lista de análisis a realizar:
              </label>
              <textarea
                rows={2}
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Si tienes orden médica puedes describirla o enviar la foto a continuación por WhatsApp..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-3 py-2 text-white placeholder:text-slate-600 focus:outline-none text-xs resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all active:scale-95"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>Confirmar Turno por WhatsApp Directo</span>
              </button>
              <p className="text-[10px] text-slate-400 text-center mt-2">
                Atención personalizada con bioquímicos de Laboratorio Schvarzstein, Sarmiento 902.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
