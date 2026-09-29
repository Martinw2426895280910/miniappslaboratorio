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
      preselectedProfile ? `*Estudio / Perfil:* ${preselectedProfile.title} (${preselectedProfile.category})` : null,
      observations ? `*Observaciones / Estudios adicionales:* ${observations}` : null,
      ``,
      `_Mensaje generado automáticamente desde la App Móvil_`
    ].filter(Boolean);

    const fullMessage = encodeURIComponent(messageLines.join('\n'));
    
    const cleanPhone = LAB_CONTACT.whatsappNumber.replace(/[^0-9]/g, '');
    setTimeout(() => {
      window.open(`https://wa.me/${cleanPhone}?text=${fullMessage}`, '_blank');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto no-scrollbar flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b-2 border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/98 backdrop-blur-md z-10">
          <div>
            <h3 className="text-lg font-black text-white font-display uppercase tracking-wide">
              Solicitud de Turno o Domicilio
            </h3>
            <p className="text-xs font-bold text-cyan-400 mt-0.5">
              Calle Sarmiento 902 · Paso de los Libres
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xl font-black text-white uppercase">¡Solicitud Generada!</h4>
              <p className="text-sm font-bold text-slate-300">
                Se ha transferido la solicitud a WhatsApp del laboratorio para confirmación inmediata con el bioquímico.
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-2xl border-2 border-slate-800 text-xs sm:text-sm text-slate-300 text-left space-y-1.5">
              <p className="font-black text-white uppercase">Sede Sarmiento 902:</p>
              <p className="font-semibold text-slate-300">Te responderemos a la brevedad indicando las condiciones exactas de ayuno para tu estudio.</p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all shadow-lg shadow-cyan-950/60"
            >
              Cerrar y Volver a la App
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs sm:text-sm">
            {/* Modalidad Selection */}
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-300 uppercase tracking-wider block">
                Modalidad de Extracción:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setServiceType('presencial')}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                    serviceType === 'presencial'
                      ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Building2 className={`w-6 h-6 ${serviceType === 'presencial' ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <div>
                    <span className="font-black text-xs sm:text-sm block">En Sarmiento 902</span>
                    <span className="text-xs font-bold text-slate-400 block">Sede Central Libres</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType('domicilio')}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                    serviceType === 'domicilio'
                      ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Home className={`w-6 h-6 ${serviceType === 'domicilio' ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <div>
                    <span className="font-black text-xs sm:text-sm block">A Domicilio</span>
                    <span className="text-xs font-bold text-slate-400 block">En Paso de los Libres</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Profile banner if preselected */}
            {preselectedProfile && (
              <div className="bg-cyan-950/60 border-2 border-cyan-700 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-cyan-400 uppercase tracking-wider block">Estudio Seleccionado:</span>
                  <span className="font-black text-white text-sm sm:text-base">{preselectedProfile.title}</span>
                </div>
                <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-black rounded-xl uppercase">
                  {preselectedProfile.category}
                </span>
              </div>
            )}

            {/* Patient Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-200 flex items-center gap-1.5 uppercase">
                <User className="w-4 h-4 text-cyan-400" />
                <span>Nombre y Apellido del Paciente:</span>
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Ej: María Gómez"
                className="w-full bg-slate-950 border-2 border-slate-700 focus:border-cyan-400 rounded-2xl px-4 py-3 font-bold text-white placeholder:text-slate-500 focus:outline-none text-sm"
              />
            </div>

            {/* DNI & Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-200 block uppercase">
                  DNI / Documento:
                </label>
                <input
                  type="text"
                  required
                  value={patientDni}
                  onChange={(e) => setPatientDni(e.target.value)}
                  placeholder="Ej: 35.420.198"
                  className="w-full bg-slate-950 border-2 border-slate-700 focus:border-cyan-400 rounded-2xl px-4 py-3 font-bold text-white placeholder:text-slate-500 focus:outline-none text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-200 flex items-center gap-1.5 uppercase">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>Celular / WhatsApp:</span>
                </label>
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="Ej: 3772-154988"
                  className="w-full bg-slate-950 border-2 border-slate-700 focus:border-cyan-400 rounded-2xl px-4 py-3 font-bold text-white placeholder:text-slate-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Address if domicilio */}
            {serviceType === 'domicilio' && (
              <div className="space-y-1.5 animate-in fade-in">
                <label className="text-xs font-black text-slate-200 flex items-center gap-1.5 uppercase">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>Dirección exacta y Barrio (Paso de los Libres):</span>
                </label>
                <input
                  type="text"
                  required
                  value={patientAddress}
                  onChange={(e) => setPatientAddress(e.target.value)}
                  placeholder="Ej: Calle Colón 1450, Barrio Centro"
                  className="w-full bg-slate-950 border-2 border-slate-700 focus:border-cyan-400 rounded-2xl px-4 py-3 font-bold text-white placeholder:text-slate-500 focus:outline-none text-sm"
                />
              </div>
            )}

            {/* Obra Social Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-200 flex items-center gap-1.5 uppercase">
                <FileCheck2 className="w-4 h-4 text-cyan-400" />
                <span>Obra Social o Prepaga:</span>
              </label>
              <select
                value={selectedObraSocial}
                onChange={(e) => setSelectedObraSocial(e.target.value)}
                className="w-full bg-slate-950 border-2 border-slate-700 focus:border-cyan-400 rounded-2xl px-4 py-3 font-bold text-white focus:outline-none text-sm"
              >
                {OBRA_SOCIALES.map(os => (
                  <option key={os.id} value={os.id} className="bg-slate-900 font-bold">
                    {os.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time slot */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-200 flex items-center gap-1.5 uppercase">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Fecha deseada:</span>
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-slate-950 border-2 border-slate-700 focus:border-cyan-400 rounded-2xl px-4 py-3 font-bold text-white focus:outline-none text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-200 flex items-center gap-1.5 uppercase">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Horario mañana:</span>
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full bg-slate-950 border-2 border-slate-700 focus:border-cyan-400 rounded-2xl px-4 py-3 font-bold text-white focus:outline-none text-sm"
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
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-200 block uppercase">
                Observaciones o estudios de la orden:
              </label>
              <textarea
                rows={2}
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Si tienes orden médica puedes describirla o enviar la foto a continuación..."
                className="w-full bg-slate-950 border-2 border-slate-700 focus:border-cyan-400 rounded-2xl px-4 py-3 font-bold text-white placeholder:text-slate-500 focus:outline-none text-sm resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/60 transition-all active:scale-95"
              >
                <Send className="w-5 h-5 fill-current" />
                <span>Confirmar Turno por WhatsApp Directo</span>
              </button>
              <p className="text-xs font-bold text-slate-400 text-center mt-2">
                Atención personalizada de Laboratorio Schvarzstein, Calle Sarmiento 902.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
