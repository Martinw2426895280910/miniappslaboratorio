import React from 'react';
import { Microscope, MapPin } from 'lucide-react';

export type ActiveScreen = 'catalog' | 'services_location';

interface BottomNavBarProps {
  activeScreen: ActiveScreen;
  onScreenChange: (screen: ActiveScreen) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeScreen,
  onScreenChange,
}) => {
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 bg-slate-950/98 backdrop-blur-lg border-t-2 border-slate-800 px-3 py-2.5 pb-safe shadow-2xl">
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {/* Pantalla 1 Tab: Perfiles & Áreas de Análisis */}
        <button
          onClick={() => onScreenChange('catalog')}
          className={`flex flex-col items-center justify-center min-h-[56px] py-2 px-3 rounded-2xl transition-all active:scale-95 ${
            activeScreen === 'catalog'
              ? 'bg-gradient-to-r from-cyan-950 to-blue-950 text-white border-2 border-cyan-400 shadow-lg shadow-cyan-950/60'
              : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
          }`}
        >
          <div className="relative">
            <Microscope className={`w-6 h-6 transition-transform ${activeScreen === 'catalog' ? 'scale-110 text-cyan-400' : 'text-slate-400'}`} />
            {activeScreen === 'catalog' && (
              <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-slate-950" />
            )}
          </div>
          <span className="text-xs font-black tracking-tight mt-1 uppercase">
            1. Perfiles & Áreas
          </span>
          <span className="text-[11px] font-bold text-cyan-300/90 leading-tight">
            Estudios de Laboratorio
          </span>
        </button>

        {/* Pantalla 2 Tab: Sede Sarmiento 902, Turnos & Servicios */}
        <button
          onClick={() => onScreenChange('services_location')}
          className={`flex flex-col items-center justify-center min-h-[56px] py-2 px-3 rounded-2xl transition-all active:scale-95 ${
            activeScreen === 'services_location'
              ? 'bg-gradient-to-r from-cyan-950 to-blue-950 text-white border-2 border-cyan-400 shadow-lg shadow-cyan-950/60'
              : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
          }`}
        >
          <div className="relative">
            <MapPin className={`w-6 h-6 transition-transform ${activeScreen === 'services_location' ? 'scale-110 text-cyan-400' : 'text-slate-400'}`} />
            {activeScreen === 'services_location' && (
              <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-slate-950" />
            )}
          </div>
          <span className="text-xs font-black tracking-tight mt-1 uppercase">
            2. Sede & Turnos
          </span>
          <span className="text-[11px] font-bold text-cyan-300/90 leading-tight">
            Sarmiento 902 · Resultados
          </span>
        </button>
      </div>
    </nav>
  );
};
