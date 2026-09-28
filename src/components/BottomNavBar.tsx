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
    <nav className="sticky bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/90 px-3 py-2 pb-safe">
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        {/* Pantalla 1 Tab: Perfiles & Áreas de Análisis */}
        <button
          onClick={() => onScreenChange('catalog')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1.5 px-2 rounded-2xl transition-all ${
            activeScreen === 'catalog'
              ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <div className="relative">
            <Microscope className={`w-5 h-5 transition-transform ${activeScreen === 'catalog' ? 'scale-110 text-cyan-400' : ''}`} />
            {activeScreen === 'catalog' && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400" />
            )}
          </div>
          <span className="text-[11px] font-semibold tracking-tight mt-1">
            Pantalla 1: Perfiles & Áreas
          </span>
          <span className="text-[9px] text-slate-400 leading-tight">
            Catálogo & Promociones
          </span>
        </button>

        {/* Pantalla 2 Tab: Sede Sarmiento 902, Turnos & Servicios */}
        <button
          onClick={() => onScreenChange('services_location')}
          className={`flex flex-col items-center justify-center min-h-[48px] py-1.5 px-2 rounded-2xl transition-all ${
            activeScreen === 'services_location'
              ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <div className="relative">
            <MapPin className={`w-5 h-5 transition-transform ${activeScreen === 'services_location' ? 'scale-110 text-cyan-400' : ''}`} />
            {activeScreen === 'services_location' && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400" />
            )}
          </div>
          <span className="text-[11px] font-semibold tracking-tight mt-1">
            Pantalla 2: Sede & Turnos
          </span>
          <span className="text-[9px] text-slate-400 leading-tight">
            Sarmiento 902 · Resultados
          </span>
        </button>
      </div>
    </nav>
  );
};
