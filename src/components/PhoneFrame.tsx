import React, { useRef } from 'react';
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
  const currentTime = "08:15"; // Morning lab extraction schedule time
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-start p-0 sm:p-3 md:p-5 transition-all text-slate-100">
      {/* Top Device Switcher Toolbar - Android & Desktop ONLY (iOS completely removed) */}
      <header className="w-full max-w-md md:max-w-xl mb-2 sm:mb-3 flex items-center justify-between px-4 py-2 bg-slate-900 border-2 border-slate-800 rounded-full text-xs text-slate-200 backdrop-blur-md z-30 shadow-xl">
        <div className="font-black text-cyan-400 pl-1 flex items-center gap-2 truncate uppercase tracking-tight">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="truncate">Lab Schvarzstein · Sarmiento 902</span>
        </div>

        <nav aria-label="Selector de dispositivo" className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-full border border-slate-800 shrink-0">
          <button
            type="button"
            onClick={() => onDeviceChange('android')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 text-xs font-black uppercase tracking-tight ${
              deviceType === 'android'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Vista Móvil Android"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Móvil Android</span>
          </button>

          <button
            type="button"
            onClick={() => onDeviceChange('desktop')}
            className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 text-xs font-black uppercase tracking-tight ${
              deviceType === 'desktop'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Vista expandida de escritorio"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Escritorio</span>
          </button>
        </nav>
      </header>

      {/* Main Container: Android Mobile Frame or Fluid Desktop Layout */}
      <main
        className={`w-full transition-all duration-300 flex flex-col ${
          deviceType === 'desktop'
            ? 'max-w-2xl bg-slate-900 border-2 border-slate-800 sm:rounded-3xl shadow-2xl overflow-hidden min-h-[90vh]'
            : 'max-w-[420px] bg-slate-900 border-2 sm:border-[8px] border-slate-800 sm:rounded-[40px] shadow-2xl overflow-hidden h-[95vh] sm:h-[860px] relative ring-2 ring-slate-700/60'
        }`}
      >
        {/* Android Material Status Bar with Thick Bold Font */}
        {deviceType === 'android' && (
          <div className="w-full bg-slate-950 px-5 pt-2 pb-1.5 flex items-center justify-between text-xs font-black text-slate-200 select-none z-40 border-b border-slate-900 shrink-0">
            {/* Left side: Time & Notification Dot */}
            <div className="flex items-center gap-2">
              <span className="tracking-tight font-mono font-black text-xs text-white">{currentTime}</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>

            {/* Centered Android Front Camera Punch Hole */}
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-700 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
            </div>

            {/* Right side: Android Signal, WiFi, Battery */}
            <div className="flex items-center gap-2 text-slate-200 font-mono text-xs font-black">
              <span className="font-black text-slate-100">5G</span>
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.5c3.55 0 6.77 1.41 9.15 3.7L12 18.5 2.85 11.2C5.23 8.91 8.45 7.5 12 7.5z"/>
              </svg>
              <div className="w-4.5 h-2.5 border-2 border-slate-300 rounded-sm p-0.5 flex items-center">
                <div className="w-full h-full bg-emerald-400 rounded-[1px]" />
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Content Viewport */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col bg-slate-950 text-slate-100 min-h-0"
        >
          {children}
        </div>

        {/* Android Gesture Navigation Bar at Bottom */}
        {deviceType === 'android' && (
          <div className="w-full py-2 bg-slate-950 flex justify-center items-center z-40 border-t border-slate-900/60 shrink-0">
            <div className="w-24 h-1 bg-slate-600 rounded-full" />
          </div>
        )}
      </main>
    </div>
  );
};
