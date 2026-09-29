import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Calendar, 
  FileText, 
  ChevronRight, 
  Navigation, 
  ShieldCheck, 
  Share2,
  AlertCircle,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { LAB_CONTACT } from '../data/labData';
import microscopeImg from '../assets/images/lab_microscope_bench_1790633977989.jpg';
import testTubesImg from '../assets/images/lab_test_tubes_rack_1790633988467.jpg';
import analyzerImg from '../assets/images/lab_biochem_analyzer_1790633998220.jpg';
import petriImg from '../assets/images/lab_petri_dishes_1790634008571.jpg';
import centrifugeImg from '../assets/images/lab_centrifuge_rotor_1790634018044.jpg';

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
      `Hola Laboratorio Schvarzstein (Sarmiento 902, Paso de los Libres), me comunico para una consulta de análisis clínicos.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="flex-1 pb-24 space-y-6">
      {/* Sede Central Hero Header Card with Lab Microscope Background */}
      <div className="px-4 pt-4">
        <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-700/60 shadow-2xl bg-slate-900">
          <div className="relative h-60 w-full">
            <img
              src={microscopeImg}
              alt="Microscopio e instrumental en Laboratorio Schvarzstein Sarmiento 902"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.60]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 bg-cyan-600 text-white text-xs font-black rounded-xl uppercase tracking-wider shadow-lg border border-cyan-400/40">
                Sede Central Paso de los Libres
              </span>
              <span className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-xl text-xs text-emerald-400 border border-emerald-500/50 font-black">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Atención Abierta
              </span>
            </div>

            {/* Big Bold Title & Street Address */}
            <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
              <h2 className="text-2xl font-black text-white font-display tracking-tight leading-tight uppercase drop-shadow-lg">
                {LAB_CONTACT.name}
              </h2>
              <div className="flex items-center gap-2 text-cyan-300 font-extrabold text-base">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>{LAB_CONTACT.address} · {LAB_CONTACT.city}</span>
              </div>
              <p className="text-xs font-bold text-slate-200">
                {LAB_CONTACT.province}, Argentina · {LAB_CONTACT.cornerRef}
              </p>
            </div>
          </div>

          {/* Schedule Summary Bar */}
          <div className="p-4 sm:p-5 bg-slate-950 border-t-2 border-slate-900 space-y-3">
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
              <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-black text-white uppercase text-xs tracking-wider block">Horarios de Atención:</span>
                <span className="text-xs font-bold text-slate-300 block">{LAB_CONTACT.schedule.weekdays}</span>
                <span className="text-xs font-bold text-slate-300 block">{LAB_CONTACT.schedule.saturdays}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-900 text-xs font-black text-amber-300 bg-amber-950/20 p-2.5 rounded-xl border-amber-800/30">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Extracciones matutinas en ayunas: 06:45 a 10:30 hs</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTONES GRANDES CON IMÁGENES DE FONDO DE INSTRUMENTAL Y REACTIVOS */}
      <section className="px-4 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <h3 className="text-base font-black text-white uppercase tracking-wider font-display">
            Servicios Principales & Gestiones
          </h3>
        </div>

        <div className="space-y-4">
          {/* BOTÓN GRANDE 1: Turnos & Domicilio */}
          <button
            onClick={onOpenAppointment}
            className="group relative w-full h-48 sm:h-52 rounded-3xl overflow-hidden border-2 border-slate-800 text-left shadow-2xl transition-all duration-300 hover:border-cyan-400 active:scale-[0.99] focus:outline-none"
          >
            <img
              src={testTubesImg}
              alt="Tubos de ensayo para turnos de laboratorio"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.65]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-3 py-1 bg-cyan-600 text-white text-xs font-black rounded-xl uppercase tracking-wider shadow">
                Turnos & Extracción Domicilio
              </span>
              <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
              <h4 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight group-hover:text-cyan-300 transition-colors drop-shadow-md uppercase">
                Solicitar Turno o Domicilio
              </h4>
              <p className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-1">
                Atención presencial en Sarmiento 902 o toma a domicilio en Paso de los Libres
              </p>
              <div className="flex items-center gap-2 text-xs font-extrabold text-cyan-300 pt-1">
                <Calendar className="w-4 h-4" />
                <span>Confirmación digital directa por WhatsApp</span>
              </div>
            </div>
          </button>

          {/* BOTÓN GRANDE 2: Portal de Resultados Online */}
          <button
            onClick={onOpenResults}
            className="group relative w-full h-48 sm:h-52 rounded-3xl overflow-hidden border-2 border-slate-800 text-left shadow-2xl transition-all duration-300 hover:border-cyan-400 active:scale-[0.99] focus:outline-none"
          >
            <img
              src={analyzerImg}
              alt="Analizador bioquímico para consulta de resultados"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.65]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-black rounded-xl uppercase tracking-wider shadow">
                Portal de Pacientes
              </span>
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
              <h4 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight group-hover:text-emerald-300 transition-colors drop-shadow-md uppercase">
                Consultar & Descargar Resultados
              </h4>
              <p className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-1">
                Acceso seguro con N° de Protocolo y DNI con informe analítico validado
              </p>
              <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-300 pt-1">
                <FileText className="w-4 h-4" />
                <span>Disponible las 24 hs online</span>
              </div>
            </div>
          </button>

          {/* BOTÓN GRANDE 3: Obras Sociales & Gestión de Estudios */}
          <button
            onClick={onOpenCart}
            className="group relative w-full h-48 sm:h-52 rounded-3xl overflow-hidden border-2 border-slate-800 text-left shadow-2xl transition-all duration-300 hover:border-cyan-400 active:scale-[0.99] focus:outline-none"
          >
            <img
              src={centrifugeImg}
              alt="Centrífuga de laboratorio para convenios y obras sociales"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.65]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-black rounded-xl uppercase tracking-wider shadow">
                Obras Sociales & Prepagas
              </span>
              <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
              <h4 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight group-hover:text-blue-300 transition-colors drop-shadow-md uppercase">
                Gestión de Estudios & Cobertura
              </h4>
              <p className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-1">
                Convenios activos con IOSCOR, OSDE, Swiss Medical, PAMI y más
              </p>
              <div className="flex items-center gap-2 text-xs font-extrabold text-blue-300 pt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Atención directa y reintegros en Sarmiento 902</span>
              </div>
            </div>
          </button>

          {/* BOTÓN GRANDE 4: Guía de Ayuno e Instrucciones */}
          <button
            onClick={() => onOpenPreparation()}
            className="group relative w-full h-48 sm:h-52 rounded-3xl overflow-hidden border-2 border-slate-800 text-left shadow-2xl transition-all duration-300 hover:border-cyan-400 active:scale-[0.99] focus:outline-none"
          >
            <img
              src={petriImg}
              alt="Placas de Petri y reactivos para preparación pre-analítica"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.65]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-3 py-1 bg-amber-600 text-white text-xs font-black rounded-xl uppercase tracking-wider shadow">
                Preparación Pre-Analítica
              </span>
              <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
              <h4 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight group-hover:text-amber-300 transition-colors drop-shadow-md uppercase">
                Guía de Ayuno & Indicaciones
              </h4>
              <p className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-1">
                Instrucciones exactas de ayuno, orina de 24 hs, medicación y urocultivo
              </p>
              <div className="flex items-center gap-2 text-xs font-extrabold text-amber-300 pt-1">
                <Clock className="w-4 h-4" />
                <span>Garantiza resultados exactos</span>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Ubicación & Contacto Directo Paso de los Libres */}
      <section className="px-4 space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
          <h3 className="text-base font-black text-white uppercase tracking-wider font-display">
            Ubicación en Paso de los Libres
          </h3>
        </div>

        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
          {/* Address Box */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-lg font-black text-white flex items-center gap-2 uppercase">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <span>{LAB_CONTACT.address}</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-300 mt-0.5">
                {LAB_CONTACT.city}, Corrientes · {LAB_CONTACT.cornerRef}
              </p>
              <span className="text-xs font-extrabold text-cyan-400 mt-1 block">
                Código Postal {LAB_CONTACT.postalCode} · República Argentina
              </span>
            </div>

            <button
              onClick={handleCopyAddress}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-2xl text-slate-200 text-xs font-black flex items-center gap-1.5 border border-slate-700 shrink-0 transition-all active:scale-95"
              title="Copiar dirección"
            >
              <Share2 className="w-4 h-4 text-cyan-400" />
              <span>{copiedAddress ? '¡Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          {/* Simulated Street View Schematic */}
          <div className="relative h-36 w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden p-4 flex flex-col justify-between">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]" />
            
            <div className="relative z-10 flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Paso de los Libres · Zona Centro</span>
              <span className="text-emerald-400 font-black flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Acceso Rápido
              </span>
            </div>

            <div className="relative z-10 text-center py-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-950 border-2 border-cyan-400 rounded-2xl text-cyan-200 text-sm font-black shadow-xl">
                <MapPin className="w-5 h-5 text-cyan-400 animate-bounce" />
                <span>Calle Sarmiento 902</span>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs font-bold text-slate-400">
              <span>A metros de Av. San Martín</span>
              <span>Paso de los Libres, Ctes.</span>
            </div>
          </div>

          {/* Action buttons: Open in Google Maps & Direct WhatsApp */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleOpenGoogleMaps}
              className="w-full py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs sm:text-sm font-black uppercase flex items-center justify-center gap-2 border-2 border-slate-700 transition-all active:scale-95 shadow-md"
            >
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>Abrir en Maps</span>
            </button>

            <button
              onClick={handleWhatsAppDirect}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs sm:text-sm font-black uppercase flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>WhatsApp Directo</span>
            </button>
          </div>

          {/* Phone call & Contact detail */}
          <div className="pt-3 border-t-2 border-slate-800/80 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-300">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Tel: <a href="tel:03772421890" className="text-white font-black hover:underline">{LAB_CONTACT.phoneLandline}</a></span>
            </div>
            <span className="text-cyan-400 font-black">WhatsApp 24/7</span>
          </div>
        </div>
      </section>

      {/* Quality Notice */}
      <div className="px-4">
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 border-2 border-slate-800 rounded-3xl p-5 flex items-start gap-4">
          <div className="p-2.5 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h5 className="text-sm font-black text-white uppercase">
              Calidad Analítica & Acreditación Bioquímica
            </h5>
            <p className="text-xs font-bold text-slate-300 leading-relaxed">
              En Laboratorio Schvarzstein procesamos cada muestra con controles de calidad internos diarios y calibración continua de instrumentos automatizados en Sarmiento 902.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
