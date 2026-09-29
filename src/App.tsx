import React, { useState } from 'react';
import { PhoneFrame, DeviceMode } from './components/PhoneFrame';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar, ActiveScreen } from './components/BottomNavBar';
import { Screen1Catalog } from './components/Screen1Catalog';
import { Screen2ServicesLocation } from './components/Screen2ServicesLocation';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { AreaDetailModal } from './components/AreaDetailModal';
import { AppointmentModal } from './components/AppointmentModal';
import { QuoteDrawer } from './components/QuoteDrawer';
import { ResultPortalModal } from './components/ResultPortalModal';
import { PreparationModal } from './components/PreparationModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { StudyProfile, LabArea } from './data/labData';

export default function App() {
  // Mobile device simulation state: Android or fluid desktop ONLY (iOS removed)
  const [deviceType, setDeviceType] = useState<DeviceMode>('android');
  
  // 2-Screen application state
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('catalog');

  // Modals & drawers
  const [viewingProfile, setViewingProfile] = useState<StudyProfile | null>(null);
  const [viewingArea, setViewingArea] = useState<LabArea | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentProfile, setAppointmentProfile] = useState<StudyProfile | null>(null);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [isPreparationOpen, setIsPreparationOpen] = useState(false);
  const [initialGuideIndex, setInitialGuideIndex] = useState(0);

  // Cart / Quote selected profiles
  const [cartProfiles, setCartProfiles] = useState<StudyProfile[]>([]);

  const handleToggleCartProfile = (profile: StudyProfile) => {
    setCartProfiles(prev => {
      const exists = prev.some(p => p.id === profile.id);
      if (exists) {
        return prev.filter(p => p.id !== profile.id);
      } else {
        return [...prev, profile];
      }
    });
  };

  const handleRemoveFromCart = (profileId: string) => {
    setCartProfiles(prev => prev.filter(p => p.id !== profileId));
  };

  const handleClearCart = () => {
    setCartProfiles([]);
  };

  const handleBookProfile = (profile: StudyProfile) => {
    setAppointmentProfile(profile);
    setIsAppointmentOpen(true);
  };

  const handleOpenGeneralAppointment = () => {
    setAppointmentProfile(null);
    setIsAppointmentOpen(true);
  };

  const handleOpenPreparation = (guideIndex: number = 0) => {
    setInitialGuideIndex(guideIndex);
    setIsPreparationOpen(true);
  };

  return (
    <PhoneFrame deviceType={deviceType} onDeviceChange={setDeviceType}>
      {/* Top Application Bar */}
      <TopAppBar
        cartCount={cartProfiles.length}
        onOpenCart={() => setIsQuoteDrawerOpen(true)}
        onOpenLocation={() => setActiveScreen('services_location')}
      />

      {/* Screen 1: Catálogo de Perfiles Bioquímicos & Áreas de Análisis con Botones Grandes */}
      {activeScreen === 'catalog' && (
        <Screen1Catalog
          onSelectProfile={(profile) => setViewingProfile(profile)}
          onSelectArea={(area) => setViewingArea(area)}
          onAddToCart={handleToggleCartProfile}
          cartProfileIds={cartProfiles.map(p => p.id)}
        />
      )}

      {/* Screen 2: Sede Sarmiento 902 en Paso de los Libres, Turnos, Resultados, Cotizador, Ayuno */}
      {activeScreen === 'services_location' && (
        <Screen2ServicesLocation
          onOpenAppointment={handleOpenGeneralAppointment}
          onOpenResults={() => setIsResultsOpen(true)}
          onOpenCart={() => setIsQuoteDrawerOpen(true)}
          onOpenPreparation={handleOpenPreparation}
        />
      )}

      {/* Botón Flotante de Contacto Rápido por WhatsApp */}
      <FloatingWhatsAppButton phoneNumber="+543772636749" />

      {/* Bottom 2-Screen Navigation Bar */}
      <BottomNavBar
        activeScreen={activeScreen}
        onScreenChange={(screen) => {
          setActiveScreen(screen);
        }}
      />

      {/* Modals & Bottom Drawers */}
      <ProfileDetailModal
        profile={viewingProfile}
        onClose={() => setViewingProfile(null)}
        onAddToCart={handleToggleCartProfile}
        isAdded={viewingProfile ? cartProfiles.some(p => p.id === viewingProfile.id) : false}
        onBookAppointment={handleBookProfile}
      />

      <AreaDetailModal
        area={viewingArea}
        onClose={() => setViewingArea(null)}
        onGoToAppointment={() => {
          setViewingArea(null);
          setIsAppointmentOpen(true);
        }}
      />

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => {
          setIsAppointmentOpen(false);
          setAppointmentProfile(null);
        }}
        preselectedProfile={appointmentProfile}
      />

      <QuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        selectedProfiles={cartProfiles}
        onRemoveProfile={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <ResultPortalModal
        isOpen={isResultsOpen}
        onClose={() => setIsResultsOpen(false)}
      />

      <PreparationModal
        isOpen={isPreparationOpen}
        onClose={() => setIsPreparationOpen(false)}
        initialGuideIndex={initialGuideIndex}
      />
    </PhoneFrame>
  );
}
