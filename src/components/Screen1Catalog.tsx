import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  Plus, 
  Check, 
  Activity, 
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { 
  PROMO_PROFILES, 
  LAB_AREAS, 
  StudyProfile, 
  LabArea 
} from '../data/labData';

interface Screen1CatalogProps {
  onSelectProfile: (profile: StudyProfile) => void;
  onSelectArea: (area: LabArea) => void;
  onAddToCart: (profile: StudyProfile) => void;
  cartProfileIds: string[];
}

export const Screen1Catalog: React.FC<Screen1CatalogProps> = ({
  onSelectProfile,
  onSelectArea,
  onAddToCart,
  cartProfileIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'promos' | 'areas' | 'fast_result'>('all');

  // Filter profiles and areas based on search query
  const filteredProfiles = useMemo(() => {
    if (!searchQuery.trim()) return PROMO_PROFILES;
    const query = searchQuery.toLowerCase();
    return PROMO_PROFILES.filter(
      p =>
        p.title.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.includedAnalyses.some(a => a.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const filteredAreas = useMemo(() => {
    if (!searchQuery.trim()) return LAB_AREAS;
    const query = searchQuery.toLowerCase();
    return LAB_AREAS.filter(
      a =>
        a.name.toLowerCase().includes(query) ||
        a.shortDesc.toLowerCase().includes(query) ||
        a.featuredTests.some(t => t.toLowerCase().includes(query)) ||
        a.instrumentFocus.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const showProfiles = selectedFilter === 'all' || selectedFilter === 'promos' || selectedFilter === 'fast_result';
  const showAreas = selectedFilter === 'all' || selectedFilter === 'areas';

  return (
    <div className="flex-1 pb-20 space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative px-4 pt-4 pb-2">
        <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-blue-950/80 border border-cyan-800/40 rounded-3xl p-4 shadow-xl relative overflow-hidden">
          {/* Subtle instrument background watermark glow */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Bioquímica Diagnóstica de Vanguardia
              </span>
              <span className="text-[10px] bg-cyan-900/80 text-cyan-200 border border-cyan-700/60 px-2 py-0.5 rounded-full font-medium">
                Paso de los Libres
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-white font-display tracking-tight leading-snug">
              Perfiles Bioquímicos & Áreas de Análisis
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              Equipamiento automatizado con instrumental de alta precisión y reactivos estandarizados. Ubicados en <span className="text-cyan-300 font-semibold">Calle Sarmiento 902</span>, Corrientes.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar & Instant Filter */}
      <div className="px-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar estudio, perfil, glucemia, TSH, orina..."
            className="w-full bg-slate-900/90 border border-slate-800 focus:border-cyan-500 text-sm text-slate-100 placeholder:text-slate-500 rounded-2xl pl-10 pr-4 py-3 focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1"
            >
              Borrar
            </button>
          )}
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
              selectedFilter === 'all'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Todos los Estudios</span>
          </button>

          <button
            onClick={() => setSelectedFilter('promos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
              selectedFilter === 'promos'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Perfiles en Promoción ({PROMO_PROFILES.length})</span>
          </button>

          <button
            onClick={() => setSelectedFilter('areas')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
              selectedFilter === 'areas'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Activity className="w-3 h-3 text-cyan-300" />
            <span>Áreas del Laboratorio ({LAB_AREAS.length})</span>
          </button>

          <button
            onClick={() => setSelectedFilter('fast_result')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
              selectedFilter === 'fast_result'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Clock className="w-3 h-3 text-emerald-400" />
            <span>En el Día</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: PROMOCIÓN DE PERFILES DE ESTUDIOS BIOQUÍMICOS */}
      {showProfiles && (
        <section className="px-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  Promoción de Perfiles Bioquímicos
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Paneles diagnósticos completos con descuento promocional
              </p>
            </div>
            <span className="text-[11px] font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800 px-2 py-0.5 rounded-md">
              {filteredProfiles.length} Perfiles
            </span>
          </div>

          {filteredProfiles.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center text-slate-400 text-xs">
              No se encontraron perfiles con el término &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProfiles.map((profile) => {
                const isAdded = cartProfileIds.includes(profile.id);
                return (
                  <div
                    key={profile.id}
                    className="group relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg transition-all hover:border-cyan-500/50 hover:shadow-cyan-950/30"
                  >
                    {/* Background Image of Instruments & Reagents with Dark Scrim */}
                    <div className="relative h-44 w-full overflow-hidden">
                      <img
                        src={profile.bgImage}
                        alt={`Instrumentos reactivos para ${profile.title}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                      />
                      {/* Gradient overlay for high legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 bg-cyan-600/90 backdrop-blur-md text-white text-[10px] font-bold rounded-lg uppercase tracking-wider shadow-md">
                          {profile.tag}
                        </span>
                        <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-slate-200 border border-white/10 font-medium">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          <span>Ayuno {profile.fastingHours}hs</span>
                        </div>
                      </div>

                      {/* Title & Subtitle sitting on bottom of the image area */}
                      <div className="absolute bottom-2.5 left-3 right-3">
                        <h4 className="text-base font-bold text-white font-display tracking-tight leading-snug drop-shadow-md">
                          {profile.title}
                        </h4>
                        <p className="text-xs text-cyan-200/90 font-medium line-clamp-1">
                          {profile.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Card Body & Details */}
                    <div className="p-4 space-y-3 bg-slate-950">
                      {/* Included Analyses mini-list */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Determinaciones Incluidas ({profile.includedAnalyses.length})
                        </span>
                        <div className="grid grid-cols-1 gap-1">
                          {profile.includedAnalyses.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-1 text-[11px]">{item}</span>
                            </div>
                          ))}
                          {profile.includedAnalyses.length > 3 && (
                            <span className="text-[10px] text-cyan-400 font-medium pl-5">
                              + {profile.includedAnalyses.length - 3} estudios más en este perfil...
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price & Delivery Meta */}
                      <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-extrabold text-white tabular-nums tracking-tight">
                              ${profile.promoPrice.toLocaleString('es-AR')}
                            </span>
                            <span className="text-xs text-slate-500 line-through tabular-nums">
                              ${profile.regularPrice.toLocaleString('es-AR')}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 block">
                            Entrega: <span className="text-slate-300">{profile.turnaroundTime}</span>
                          </span>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onSelectProfile(profile)}
                            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition-all flex items-center gap-1 active:scale-95"
                          >
                            <Info className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Detalle</span>
                          </button>

                          <button
                            onClick={() => onAddToCart(profile)}
                            className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1 shadow-md active:scale-95 ${
                              isAdded
                                ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                                : 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-cyan-900/30'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Agregado</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Cotizar</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* SECTION 2: ÁREAS DE ANÁLISIS CLÍNICOS - BOTONES GRANDES CON IMÁGENES DE FONDO DE INSTRUMENTOS/REACTIVOS */}
      {showAreas && (
        <section className="px-4 space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  Áreas del Laboratorio
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Botones interactivos con tecnología analítica e instrumental
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md">
              {filteredAreas.length} Áreas
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {filteredAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => onSelectArea(area)}
                className="group relative w-full h-44 rounded-3xl overflow-hidden border border-slate-800 text-left shadow-xl transition-all duration-300 hover:border-cyan-400/60 hover:shadow-cyan-950/40 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {/* Background Image of Instruments / Reagents ONLY */}
                <img
                  src={area.bgImage}
                  alt={`Instrumental de reactivos y análisis para ${area.name}`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.70]"
                />

                {/* Dark Vignette Overlay for High Contrast Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/30 group-hover:via-slate-950/65 transition-colors" />

                {/* Top Bar inside the Large Button */}
                <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-cyan-400/30 text-cyan-300 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                    {area.testCount}+ Análisis
                  </span>
                  <div className="w-7 h-7 rounded-full bg-cyan-600/80 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-cyan-500 group-hover:translate-x-0.5 transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content inside the Large Button */}
                <div className="absolute bottom-3 left-4 right-4 z-10 space-y-1">
                  <h4 className="text-lg font-bold text-white font-display tracking-tight leading-tight group-hover:text-cyan-300 transition-colors drop-shadow-md">
                    {area.name}
                  </h4>
                  <p className="text-xs text-slate-200 line-clamp-1 font-medium">
                    {area.shortDesc}
                  </p>
                  <div className="pt-1 flex items-center gap-1.5 text-[10px] text-cyan-300/90 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="truncate">Instrumental: {area.technologyUsed}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Quick Footer Notice */}
      <div className="px-4 pt-2">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5 text-center text-xs text-slate-400 space-y-1">
          <p className="font-semibold text-slate-300">
            Laboratorio Schvarzstein · Bioquímica Clínica
          </p>
          <p className="text-[11px] text-slate-400">
            Calle Sarmiento 902 · Paso de los Libres, Corrientes. Todos los análisis con validación bioquímica.
          </p>
        </div>
      </div>
    </div>
  );
};
