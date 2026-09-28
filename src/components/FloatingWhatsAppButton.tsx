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
      className="sticky bottom-20 self-end mr-3 sm:mr-4 -mt-14 z-40 flex items-center gap-1.5 select-none pointer-events-auto"
    >
      {/* Pill label button */}
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/95 hover:bg-slate-800 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/40 shadow-xl backdrop-blur-md transition-all duration-200 active:scale-95 group"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="tracking-tight text-[11px] text-white group-hover:text-emerald-300">
          Contacto rápido
        </span>
      </button>

      {/* Main Round Floating WhatsApp Button */}
      <button
        type="button"
        onClick={handleClick}
        aria-label="Contacto rápido WhatsApp con Laboratorio Schvarzstein (+54 3772 636749)"
        title="Contacto rápido por WhatsApp (+54 3772 636749)"
        className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 text-white flex items-center justify-center shadow-lg shadow-emerald-950/70 border-2 border-emerald-300/40 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-400/25 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageCircle className="w-6 h-6 fill-current drop-shadow-sm" />

        {/* Online Status Green Indicator */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full" />
      </button>
    </div>
  );
};

