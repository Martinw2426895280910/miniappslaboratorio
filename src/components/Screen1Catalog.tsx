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
  Info,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { 
  PROMO_PROFILES, 
  LAB_AREAS, 
  StudyProfile, 
  LabArea,
  LAB_CONTACT 
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
        p.category.toLowerCase().includes(query) ||
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
    <div className="flex-1 pb-24 space-y-6">
      {/* High-Impact Mobile Hero Welcome Banner */}
      <div className="relative px-4 pt-4 pb-1">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950 border-2 border-cyan-700/50 rounded-3xl p-5 shadow-2xl relative overflow-hidden">
          {/* Instrumental glow effect */}
          <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Bioquímica Diagnóstica
              </span>
              <span className="text-xs bg-slate-950 text-emerald-400 border border-emerald-500/50 px-3 py-1 rounded-full font-black flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Sarmiento 902
              </span>
            </div>

            <h2 className="text-2xl font-black text-white font-display tracking-tight leading-tight uppercase">
              Perfiles Bioquímicos & Áreas de Análisis
            </h2>

            <p className="text-sm font-semibold text-slate-200 leading-relaxed">
              Equipamiento automatizado con instrumental de alta sensibilidad. Atención para <strong className="text-cyan-300 font-extrabold">Obras Sociales, Prepagas y Particulares</strong> en Paso de los Libres, Corrientes.
            </p>
          </div>
        </div>
      </div>

      {/* Large Mobile Search Bar & Fast Filter Buttons */}
      <div className="px-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar estudio: glucemia, TSH, orina, perfil..."
            className="w-full bg-slate-900/95 border-2 border-slate-700 focus:border-cyan-400 text-sm sm:text-base font-bold text-white placeholder:text-slate-400 rounded-2xl pl-12 pr-12 py-3.5 focus:outline-none transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-cyan-400 hover:text-white px-2 py-1 bg-slate-800 rounded-lg"
            >
              Borrar
            </button>
          )}
        </div>

        {/* Big Touch Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase whitespace-nowrap transition-all flex items-center gap-2 active:scale-95 ${
              selectedFilter === 'all'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950/60 ring-2 ring-cyan-400/40'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Todos los Estudios</span>
          </button>

          <button
            onClick={() => setSelectedFilter('promos')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase whitespace-nowrap transition-all flex items-center gap-2 active:scale-95 ${
              selectedFilter === 'promos'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950/60 ring-2 ring-cyan-400/40'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Perfiles ({PROMO_PROFILES.length})</span>
          </button>

          <button
            onClick={() => setSelectedFilter('areas')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase whitespace-nowrap transition-all flex items-center gap-2 active:scale-95 ${
              selectedFilter === 'areas'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950/60 ring-2 ring-cyan-400/40'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-300" />
            <span>Áreas ({LAB_AREAS.length})</span>
          </button>

          <button
            onClick={() => setSelectedFilter('fast_result')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase whitespace-nowrap transition-all flex items-center gap-2 active:scale-95 ${
              selectedFilter === 'fast_result'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-950/60 ring-2 ring-cyan-400/40'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>En el Día</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: PERFILES BIOQUÍMICOS ESPECIALIZADOS */}
      {showProfiles && (
        <section className="px-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <h3 className="text-base font-black text-white uppercase tracking-wider font-display">
                  Perfiles Bioquímicos
                </h3>
              </div>
              <p className="text-xs font-bold text-slate-400 mt-0.5">
                Paneles diagnósticos completos con validación clínica
              </p>
            </div>
            <span className="text-xs font-black text-cyan-300 bg-cyan-950/90 border-2 border-cyan-800/80 px-2.5 py-1 rounded-xl">
              {filteredProfiles.length} Perfiles
            </span>
          </div>

          {filteredProfiles.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center text-slate-300 text-sm font-bold">
              No se encontraron perfiles para &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            <div className="space-y-5">
              {filteredProfiles.map((profile) => {
                const isAdded = cartProfileIds.includes(profile.id);
                return (
                  <div
                    key={profile.id}
                    className="group relative bg-slate-900 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-xl transition-all hover:border-cyan-400"
                  >
                    {/* Background Image of Instruments & Reagents ONLY with Dark Vignette */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={profile.bgImage}
                        alt={`Instrumentos reactivos para ${profile.title}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                      />
                      {/* Strong contrast scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                        <span className="px-3 py-1 bg-cyan-600 text-white text-xs font-black rounded-xl uppercase tracking-wider shadow-lg border border-cyan-400/40">
                          {profile.tag}
                        </span>
                        <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-xl text-xs text-white border border-white/20 font-black">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Ayuno {profile.fastingHours}hs</span>
                        </div>
                      </div>

                      {/* Prominent Bold Title */}
                      <div className="absolute bottom-3 left-3.5 right-3.5">
                        <span className="text-xs uppercase font-black text-cyan-300 tracking-wider block mb-1">
                          {profile.category}
                        </span>
                        <h4 className="text-lg sm:text-xl font-black text-white font-display tracking-tight leading-snug drop-shadow-md">
                          {profile.title}
                        </h4>
                        <p className="text-xs font-bold text-slate-100 line-clamp-1 mt-0.5">
                          {profile.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Card Body & Details */}
                    <div className="p-4 sm:p-5 space-y-3.5 bg-slate-950">
                      {/* Included Analyses List */}
                      <div className="space-y-2">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                          Determinaciones Incluidas ({profile.includedAnalyses.length})
                        </span>
                        <div className="space-y-1.5">
                          {profile.includedAnalyses.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-bold text-slate-100">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{item}</span>
                            </div>
                          ))}
                          {profile.includedAnalyses.length > 3 && (
                            <span className="text-xs font-extrabold text-cyan-400 block pl-6">
                              + {profile.includedAnalyses.length - 3} estudios más en este panel...
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Delivery & Coverage Meta */}
                      <div className="pt-3 border-t-2 border-slate-900 flex items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs font-black text-emerald-400">
                            <ShieldCheck className="w-4 h-4 shrink-0" />
                            <span>Acepta Obras Sociales</span>
                          </div>
                          <span className="text-xs font-bold text-slate-300 block mt-0.5">
                            Entrega: <strong className="text-white font-black">{profile.turnaroundTime}</strong>
                          </span>
                        </div>

                        {/* Interactive Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectProfile(profile)}
                            className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-700 text-xs font-black uppercase rounded-2xl transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
                          >
                            <Info className="w-4 h-4 text-cyan-400" />
                            <span>Ficha</span>
                          </button>

                          <button
                            onClick={() => onAddToCart(profile)}
                            className={`px-4 py-2.5 text-xs font-black uppercase rounded-2xl transition-all flex items-center gap-1.5 shadow-md active:scale-95 ${
                              isAdded
                                ? 'bg-emerald-600 text-white hover:bg-emerald-500 ring-2 ring-emerald-400/40'
                                : 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-cyan-900/40 ring-2 ring-cyan-400/40'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>Agregado</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4" />
                                <span>Solicitar</span>
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
        <section className="px-4 space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h3 className="text-base font-black text-white uppercase tracking-wider font-display">
                  Áreas del Laboratorio
                </h3>
              </div>
              <p className="text-xs font-bold text-slate-400 mt-0.5">
                Botones grandes con equipamiento analítico especializado
              </p>
            </div>
            <span className="text-xs font-black text-slate-300 bg-slate-900 border-2 border-slate-800 px-2.5 py-1 rounded-xl">
              {filteredAreas.length} Áreas
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => onSelectArea(area)}
                className="group relative w-full h-48 sm:h-52 rounded-3xl overflow-hidden border-2 border-slate-800 text-left shadow-2xl transition-all duration-300 hover:border-cyan-400 active:scale-[0.99] focus:outline-none"
              >
                {/* Background Image of Instruments / Reagents ONLY */}
                <img
                  src={area.bgImage}
                  alt={`Instrumental científico para ${area.name}`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.65]"
                />

                {/* Dark Vignette Overlay for High Contrast Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/30 group-hover:via-slate-950/65 transition-colors" />

                {/* Top Bar inside the Large Button */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1.5 bg-black/75 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-xs font-black rounded-xl uppercase tracking-wider shadow">
                    {area.testCount}+ Determinaciones
                  </span>
                  <div className="w-9 h-9 rounded-full bg-cyan-600 backdrop-blur-md flex items-center justify-center text-white shadow-lg group-hover:bg-cyan-500 group-hover:scale-110 transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom Content inside the Large Button */}
                <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1.5">
                  <h4 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight leading-tight group-hover:text-cyan-300 transition-colors drop-shadow-lg uppercase">
                    {area.name}
                  </h4>
                  <p className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-1">
                    {area.shortDesc}
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-xs font-extrabold text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="truncate">Tecnología: {area.technologyUsed}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Trust & Location Notice */}
      <div className="px-4 pt-2">
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-5 text-center space-y-2 shadow-lg">
          <p className="font-black text-sm text-white flex items-center justify-center gap-2 uppercase tracking-wide">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <span>Laboratorio Schvarzstein · Sarmiento 902</span>
          </p>
          <p className="text-xs font-bold text-slate-300 leading-relaxed">
            Paso de los Libres, Corrientes · Calibraciones diarias y validación por bioquímicos especialistas.
          </p>
        </div>
      </div>
    </div>
  );
};
