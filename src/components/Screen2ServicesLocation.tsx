import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Calendar, 
  FileText, 
  Calculator, 
  ChevronRight, 
  Navigation, 
  ShieldCheck, 
  Home, 
  Share2,
  AlertCircle
} from 'lucide-react';
import { LAB_CONTACT, PREPARATION_GUIDELINES } from '../data/labData';
import microscopeImg from '@/src/assets/images/lab_microscope_bench_1790633977989.jpg';
import testTubesImg from '@/src/assets/images/lab_test_tubes_rack_1790633988467.jpg';
import analyzerImg from '@/src/assets/images/lab_biochem_analyzer_1790633998220.jpg';
import petriImg from '@/src/assets/images/lab_petri_dishes_1790634008571.jpg';
import centrifugeImg from '@/src/assets/images/lab_centrifuge_rotor_1790634018044.jpg';

interface Screen2ServicesLocationProps {
  onOpenAppointment: () => void;
  onOpenResults: () => void;
  onOpenCart: () => void;
  onOpenPreparation: (guideIndex?: number) => void;
}

export const Screen2ServicesLocation: React.FC<Screen2ServicesLocationProps> = ({
  onOpenAppointment,
  onOpenResults,
  onOpenCart,
  onOpenPreparation,
}) => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${LAB_CONTACT.address}, ${LAB_CONTACT.city}, ${LAB_CONTACT.province}, Argentina`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleOpenGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(`${LAB_CONTACT.address}, ${LAB_CONTACT.city}, ${LAB_CONTACT.province}, Argentina`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleWhatsAppDirect = () => {
    const cleanPhone = LAB_CONTACT.whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hola Laboratorio Schvarzstein (Sarmiento 902, Paso de los Libres), me comunico desde la app para consultar por un estudio de análisis clínicos.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="flex-1 pb-20 space-y-6">
      {/* Sede Central Hero Header Card with Lab Microscope Background */}
      <div className="px-4 pt-4">
        <div className="relative rounded-3xl overflow-hidden border border-cyan-800/40 shadow-xl bg-slate-900">
          <div className="relative h-56 w-full">
            <img
              src={microscopeImg}
              alt="Microscopio e instrumental en Laboratorio Schvarzstein Sarmiento 902"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.65]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/20" />

            {/* Badge on top */}
            <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
              <span className="px-2.5 py-1 bg-cyan-600/90 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider backdrop-blur-md shadow-md">
                Sede Central Paso de los Libres
              </span>
              <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-emerald-400 border border-emerald-500/30 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Atención Abierta
              </span>
            </div>

            {/* Title & Street Address */}
            <div className="absolute bottom-3 left-4 right-4 space-y-1">
              <h2 className="text-xl font-extrabold text-white font-display tracking-tight leading-tight drop-shadow-md">
                {LAB_CONTACT.name}
              </h2>
              <div className="flex items-center gap-1.5 text-cyan-300 font-semibold text-sm">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{LAB_CONTACT.address} · {LAB_CONTACT.city}</span>
              </div>
              <p className="text-[11px] text-slate-300">
                {LAB_CONTACT.province}, Argentina · {LAB_CONTACT.cornerRef}
              </p>
            </div>
          </div>

          {/* Quick Schedule summary bar */}
          <div className="p-3.5 bg-slate-950 border-t border-slate-900 space-y-2">
            <div className="flex items-start gap-2 text-xs text-slate-300">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block">Horarios de Atención:</span>
                <span className="text-[11px] text-slate-400 block">{LAB_CONTACT.schedule.weekdays}</span>
                <span className="text-[11px] text-slate-400 block">{LAB_CONTACT.schedule.saturdays}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1.5 border-t border-slate-900/80 text-[11px] text-amber-300">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Extracciones en ayunas: 06:45 a 10:30 hs</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTONES GRANDES CON IMÁGENES DE FONDO DE INSTRUMENTAL Y REACTIVOS */}
      <section className="px-4 space-y-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
            Servicios Principales & Gestiones
          </h3>
        </div>

        <div className="space-y-3.5">
          {/* BOTÓN GRANDE 1: Turnos & Domicilio con fondo de tubos de ensayo */}
          <button
            onClick={onOpenAppointment}
            className="group relative w-full h-44 rounded-3xl overflow-hidden border border-slate-800 text-left shadow-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-950/40 active:scale-[0.99] focus:outline-none"
          >
            <img
              src={testTubesImg}
              alt="Instrumentos tubos de ensayo para turnos de laboratorio"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.70]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />

            <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-2.5 py-1 bg-cyan-600/90 backdrop-blur-md text-white text-[10px] font-bold rounded-lg uppercase tracking-wider shadow">
                Turnos & Extracción Domicilio
              </span>
              <div className="w-7 h-7 rounded-full bg-cyan-500/80 backdrop-blur-md flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="absolute bottom-3.5 left-4 right-4 z-10 space-y-1">
              <h4 className="text-lg font-bold text-white font-display tracking-tight group-hover:text-cyan-300 transition-colors drop-shadow-md">
                Solicitar Turno o Toma a Domicilio
              </h4>
              <p className="text-xs text-slate-200 line-clamp-1 font-medium">
                Atención presencial en Sarmiento 902 o bioquímico a domicilio en Paso de los Libres
              </p>
              <div className="flex items-center gap-2 text-[10px] text-cyan-300 pt-0.5">
                <Calendar className="w-3 h-3" />
                <span>Agenda digital directa por WhatsApp</span>
              </div>
            </div>
          </button>

          {/* BOTÓN GRANDE 2: Portal de Resultados Online con fondo de analizador bioquímico */}
          <button
            onClick={onOpenResults}
            className="group relative w-full h-44 rounded-3xl overflow-hidden border border-slate-800 text-left shadow-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-950/40 active:scale-[0.99] focus:outline-none"
          >
            <img
              src={analyzerImg}
              alt="Analizador bioquímico para consulta de resultados"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.70]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />

            <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-2.5 py-1 bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold rounded-lg uppercase tracking-wider shadow">
                Portal de Pacientes
              </span>
              <div className="w-7 h-7 rounded-full bg-emerald-500/80 backdrop-blur-md flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="absolute bottom-3.5 left-4 right-4 z-10 space-y-1">
              <h4 className="text-lg font-bold text-white font-display tracking-tight group-hover:text-emerald-300 transition-colors drop-shadow-md">
                Consultar & Descargar Resultados
              </h4>
              <p className="text-xs text-slate-200 line-clamp-1 font-medium">
                Acceso con N° de Protocolo y DNI con informe analítico y valores de referencia
              </p>
              <div className="flex items-center gap-2 text-[10px] text-emerald-300 pt-0.5">
                <FileText className="w-3 h-3" />
                <span>Disponible las 24 hs online</span>
              </div>
            </div>
          </button>

          {/* BOTÓN GRANDE 3: Calculador de Presupuesto con fondo de centrífuga */}
          <button
            onClick={onOpenCart}
            className="group relative w-full h-44 rounded-3xl overflow-hidden border border-slate-800 text-left shadow-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-950/40 active:scale-[0.99] focus:outline-none"
          >
            <img
              src={centrifugeImg}
              alt="Centrífuga de laboratorio para cotizador de análisis"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.70]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />

            <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-2.5 py-1 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold rounded-lg uppercase tracking-wider shadow">
                Cotizador en Vivo
              </span>
              <div className="w-7 h-7 rounded-full bg-blue-500/80 backdrop-blur-md flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="absolute bottom-3.5 left-4 right-4 z-10 space-y-1">
              <h4 className="text-lg font-bold text-white font-display tracking-tight group-hover:text-blue-300 transition-colors drop-shadow-md">
                Calculador de Presupuesto & Cobertura
              </h4>
              <p className="text-xs text-slate-200 line-clamp-1 font-medium">
                Cotización al instante con IOSCOR, OSDE, Swiss Medical, PAMI o Particular
              </p>
              <div className="flex items-center gap-2 text-[10px] text-blue-300 pt-0.5">
                <Calculator className="w-3 h-3" />
                <span>Desglose de aranceles y descuentos</span>
              </div>
            </div>
          </button>

          {/* BOTÓN GRANDE 4: Guía de Ayuno e Instrucciones con fondo de placas petri */}
          <button
            onClick={() => onOpenPreparation()}
            className="group relative w-full h-44 rounded-3xl overflow-hidden border border-slate-800 text-left shadow-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-950/40 active:scale-[0.99] focus:outline-none"
          >
            <img
              src={petriImg}
              alt="Placas de Petri y reactivos para preparación de estudios"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.70]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />

            <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-2.5 py-1 bg-amber-600/90 backdrop-blur-md text-white text-[10px] font-bold rounded-lg uppercase tracking-wider shadow">
                Preparación de Pacientes
              </span>
              <div className="w-7 h-7 rounded-full bg-amber-500/80 backdrop-blur-md flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="absolute bottom-3.5 left-4 right-4 z-10 space-y-1">
              <h4 className="text-lg font-bold text-white font-display tracking-tight group-hover:text-amber-300 transition-colors drop-shadow-md">
                Guía de Ayuno & Tomas de Muestras
              </h4>
              <p className="text-xs text-slate-200 line-clamp-1 font-medium">
                Instrucciones exactas de ayuno, orina de 24 hs, medicación y urocultivo
              </p>
              <div className="flex items-center gap-2 text-[10px] text-amber-300 pt-0.5">
                <Clock className="w-3 h-3" />
                <span>Garantiza resultados exactos</span>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Ubicación & Contacto Directo Paso de los Libres */}
      <section className="px-4 space-y-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
            Ubicación en Paso de los Libres
          </h3>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-lg space-y-4">
          {/* Address Box */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-base font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{LAB_CONTACT.address}</span>
              </div>
              <p className="text-xs text-slate-400">
                {LAB_CONTACT.city}, Corrientes · {LAB_CONTACT.cornerRef}
              </p>
              <span className="text-[11px] text-cyan-400 font-medium mt-1 block">
                Código Postal {LAB_CONTACT.postalCode} · República Argentina
              </span>
            </div>

            <button
              onClick={handleCopyAddress}
              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 text-xs flex items-center gap-1 border border-slate-700 shrink-0 transition-all"
              title="Copiar dirección"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedAddress ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          {/* Simulated Street View Schematic */}
          <div className="relative h-32 w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden p-3 flex flex-col justify-between">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]" />
            
            <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Paso de los Libres · Zona Centro</span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Acceso Rápido
              </span>
            </div>

            <div className="relative z-10 text-center py-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-950/90 border border-cyan-500/60 rounded-xl text-cyan-200 text-xs font-bold shadow-lg">
                <MapPin className="w-4 h-4 text-cyan-400 animate-bounce" />
                <span>Calle Sarmiento 902</span>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-500">
              <span>A metros de Av. San Martín</span>
              <span>Paso de los Libres, Ctes.</span>
            </div>
          </div>

          {/* Action buttons: Open in Google Maps & Direct WhatsApp */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleOpenGoogleMaps}
              className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-all active:scale-95"
            >
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>Abrir en Maps</span>
            </button>

            <button
              onClick={handleWhatsAppDirect}
              className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/40 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Directo</span>
            </button>
          </div>

          {/* Phone call & Contact detail */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Tel: <a href="tel:03772421890" className="text-slate-200 font-medium hover:underline">{LAB_CONTACT.phoneLandline}</a></span>
            </div>
            <span className="text-[11px] text-slate-400">Atención WhatsApp 24/7</span>
          </div>
        </div>
      </section>

      {/* Safety & Quality Assurance Notice */}
      <div className="px-4">
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-4 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/60 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h5 className="text-xs font-bold text-white">
              Calidad Analítica & Acreditación Bioquímica
            </h5>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              En Laboratorio Schvarzstein procesamos cada muestra con controles de calidad internos diarios y calibración de instrumentos automatizados en Sarmiento 902.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
