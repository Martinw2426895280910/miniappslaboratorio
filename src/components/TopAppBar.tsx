import React from 'react';
import { MapPin, ClipboardList, FlaskConical } from 'lucide-react';
import { LAB_CONTACT } from '../data/labData';

interface TopAppBarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenLocation: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  cartCount,
  onOpenCart,
  onOpenLocation,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between transition-all">
      {/* Brand Identity with Clinical Laboratory Icon */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center shadow-md shadow-cyan-900/40 shrink-0 border border-cyan-400/40">
          <FlaskConical className="w-6 h-6 text-white" />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg font-black tracking-tight text-white uppercase font-display truncate leading-tight">
            {LAB_CONTACT.name}
          </h1>
          <button
            onClick={onOpenLocation}
            className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-cyan-200 transition-colors truncate text-left mt-0.5"
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{LAB_CONTACT.address} · {LAB_CONTACT.city}</span>
          </button>
        </div>
      </div>

      {/* Action Buttons: Selected Studies Manager */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onOpenCart}
          className="relative min-h-[44px] px-3.5 py-2 rounded-2xl bg-slate-900 border-2 border-cyan-500/40 text-xs font-bold text-cyan-300 hover:bg-slate-800 transition-all flex items-center gap-2 active:scale-95 shadow-md"
          title="Ver estudios seleccionados y consultar cobertura"
        >
          <ClipboardList className="w-4 h-4 text-cyan-400" />
          <span className="font-extrabold text-xs">Mis Estudios</span>
          {cartCount > 0 && (
            <span className="px-2 py-0.5 bg-cyan-400 text-slate-950 text-xs font-black rounded-full shadow">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

