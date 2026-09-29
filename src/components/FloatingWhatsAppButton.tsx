import React from 'react';
import { MessageCircle } from 'lucide-react';
import { LAB_CONTACT } from '../data/labData';

interface FloatingWhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({
  phoneNumber = "+543772636749",
  defaultMessage = "Hola Laboratorio Schvarzstein (Calle Sarmiento 902, Paso de los Libres), me comunico para una consulta directa de análisis clínicos.",
}) => {
  const cleanPhone = (phoneNumber || LAB_CONTACT.whatsappNumber).replace(/[^0-9]/g, '');

  const handleClick = () => {
    const encodedText = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      aria-label="Contacto rápido por WhatsApp"
      className="sticky bottom-24 self-end mr-3 sm:mr-4 -mt-16 z-40 flex items-center gap-2 select-none pointer-events-auto"
    >
      {/* Pill label button with bold thick font */}
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-2 px-3.5 py-2 bg-slate-900/98 hover:bg-slate-800 text-emerald-400 text-xs sm:text-sm font-black uppercase tracking-wider rounded-full border-2 border-emerald-500/60 shadow-2xl backdrop-blur-md transition-all duration-200 active:scale-95 group"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-white group-hover:text-emerald-300">
          Contacto rápido
        </span>
      </button>

      {/* Main Round Floating WhatsApp Button */}
      <button
        type="button"
        onClick={handleClick}
        aria-label="Contacto rápido WhatsApp con Laboratorio Schvarzstein (+54 3772 636749)"
        title="Contacto rápido por WhatsApp (+54 3772 636749)"
        className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/80 border-2 border-emerald-300/50 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 fill-current drop-shadow-md" />

        {/* Online Status Green Indicator */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-950 rounded-full" />
      </button>
    </div>
  );
};
