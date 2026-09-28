import React from 'react';
import { MapPin, Calculator, FlaskConical } from 'lucide-react';
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
    <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between transition-all">
      {/* Brand Identity with Clinical Laboratory Icon */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center shadow-md shadow-cyan-900/30 shrink-0 border border-cyan-400/30">
          <FlaskConical className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-bold tracking-tight text-white font-display truncate">
              {LAB_CONTACT.name}
            </h1>
          </div>
          <button
            onClick={onOpenLocation}
            className="flex items-center gap-1 text-[11px] text-cyan-400/90 hover:text-cyan-300 transition-colors truncate text-left"
          >
            <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">{LAB_CONTACT.address}, {LAB_CONTACT.city}</span>
          </button>
        </div>
      </div>

      {/* Action Buttons: Cart / Budget Calculator Trigger */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onOpenCart}
          className="relative min-h-[40px] px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs font-medium text-cyan-300 hover:bg-slate-800 transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
          title="Ver presupuesto y estudios seleccionados"
        >
          <Calculator className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-xs">Cotizar</span>
          {cartCount > 0 && (
            <span className="ml-0.5 px-1.5 py-0.2 bg-cyan-500 text-slate-950 text-[10px] font-bold rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
