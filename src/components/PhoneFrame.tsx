import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface PhoneFrameProps {
  deviceType: 'ios' | 'android' | 'desktop';
  onDeviceChange: (type: 'ios' | 'android' | 'desktop') => void;
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  deviceType,
  onDeviceChange,
  children,
}) => {
  const currentTime = "08:15"; // Typical morning lab extraction time

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start p-0 sm:p-4 md:p-6 transition-all">
      {/* Top Device Switcher Toolbar */}
      <div className="w-full max-w-md md:max-w-lg mb-3 flex items-center justify-between px-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-full text-xs text-slate-300 backdrop-blur-md z-30 shadow-lg">
        <span className="font-semibold text-cyan-400 pl-2 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Laboratorio Schvarzstein
        </span>

        <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-full border border-slate-800">
          <button
            onClick={() => onDeviceChange('ios')}
            className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 ${
              deviceType === 'ios'
                ? 'bg-cyan-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Vista simulador iPhone iOS"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iOS</span>
          </button>
          <button
            onClick={() => onDeviceChange('android')}
            className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 ${
              deviceType === 'android'
                ? 'bg-cyan-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Vista simulador Android"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android</span>
          </button>
          <button
            onClick={() => onDeviceChange('desktop')}
            className={`px-2.5 py-1 rounded-full transition-all flex items-center gap-1 ${
              deviceType === 'desktop'
                ? 'bg-cyan-600 text-white font-medium shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Vista fluida completa"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Expandir</span>
          </button>
        </div>
      </div>

      {/* Main Container: Mobile Shell or Fluid Desktop Container */}
      <div
        className={`w-full transition-all duration-300 flex flex-col ${
          deviceType === 'desktop'
            ? 'max-w-2xl bg-slate-900 border border-slate-800 sm:rounded-3xl shadow-2xl overflow-hidden min-h-[92vh]'
            : 'max-w-[412px] bg-slate-900 border-2 sm:border-[8px] border-slate-800 sm:rounded-[44px] shadow-2xl overflow-hidden h-[95vh] sm:h-[860px] relative ring-1 ring-slate-700/50'
        }`}
      >
        {/* Device Status Bar (iOS / Android) */}
        {deviceType !== 'desktop' && (
          <div className="w-full bg-slate-950 px-6 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-semibold text-slate-300 select-none z-40 border-b border-slate-900">
            {/* Left side: Time */}
            <span className="tracking-tight">{currentTime}</span>

            {/* Dynamic Island for iOS or Camera Dot for Android */}
            {deviceType === 'ios' ? (
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-slate-900 mr-2" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800" />
              </div>
            ) : (
              <div className="w-3 h-3 rounded-full bg-black border border-slate-700" />
            )}

            {/* Right side: Signal, Wifi, Battery */}
            <div className="flex items-center gap-1.5 text-slate-300">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9zm0 14.5c-3.04 0-5.5-2.46-5.5-5.5s2.46-5.5 5.5-5.5 5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5z"/>
              </svg>
              <span className="text-[10px] font-bold">5G</span>
              <div className="w-4 h-2 border border-slate-400 rounded-xs p-0.5 flex items-center">
                <div className="w-full h-full bg-emerald-400 rounded-2xs" />
              </div>
            </div>
          </div>
        )}

        {/* Content Viewport */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col bg-slate-950 text-slate-100">
          {children}
        </div>

        {/* Home indicator bar for mobile devices */}
        {deviceType !== 'desktop' && (
          <div className="w-full py-1.5 bg-slate-950 flex justify-center items-center z-40">
            <div className="w-28 h-1 bg-slate-700 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
};
