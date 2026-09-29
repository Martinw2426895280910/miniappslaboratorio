import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

export type DeviceMode = 'android' | 'desktop';

interface PhoneFrameProps {
  deviceType: DeviceMode;
  onDeviceChange: (type: DeviceMode) => void;
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  deviceType,
  onDeviceChange,
  children,
}) => {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-start">
      {/* Top Device Switcher Banner (Minimal, non-intrusive) */}
      <aside aria-label="Control de visualización" className="w-full bg-slate-900 border-b border-slate-800 py-1.5 px-3 flex items-center justify-between z-50 text-xs">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-black text-cyan-300 uppercase tracking-tight truncate">
            Laboratorio Schvarzstein · Sarmiento 902
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => onDeviceChange('android')}
            className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-tight flex items-center gap-1.5 transition-all ${
              deviceType === 'android'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
            title="Vista móvil para teléfonos"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Móvil</span>
          </button>

          <button
            type="button"
            onClick={() => onDeviceChange('desktop')}
            className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-tight flex items-center gap-1.5 transition-all ${
              deviceType === 'desktop'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
            title="Vista expandida de escritorio"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Expandir</span>
          </button>
        </div>
      </aside>

      {/* Main App Container: 100% visible, fully responsive, zero-clipping */}
      <div
        className={`w-full transition-all duration-300 flex flex-col min-h-[calc(100vh-36px)] bg-slate-950 ${
          deviceType === 'desktop'
            ? 'max-w-3xl border-x-2 border-slate-800 shadow-2xl'
            : 'max-w-md border-x border-slate-800/80 shadow-2xl'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
