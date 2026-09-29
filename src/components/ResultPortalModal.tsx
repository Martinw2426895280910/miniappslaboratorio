import React, { useState } from 'react';
import { 
  X, 
  Search, 
  FileText, 
  Download, 
  ShieldCheck, 
  User, 
  Building2 
} from 'lucide-react';
import { LAB_CONTACT } from '../data/labData';

interface ResultPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TestResultRow {
  parameter: string;
  value: string;
  unit: string;
  referenceInterval: string;
  flag: 'normal' | 'high' | 'low';
}

export const ResultPortalModal: React.FC<ResultPortalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [protocolInput, setProtocolInput] = useState('');
  const [dniInput, setDniInput] = useState('');
  const [reportState, setReportState] = useState<'idle' | 'loading' | 'found' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setReportState('loading');
    setTimeout(() => {
      setReportState('found');
    }, 700);
  };

  const handleLoadDemo = () => {
    setProtocolInput('LIB-2026-9024');
    setDniInput('34.890.122');
    setReportState('loading');
    setTimeout(() => {
      setReportState('found');
    }, 500);
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2500);
  };

  const mockReportResults: { category: string; rows: TestResultRow[] }[] = [
    {
      category: "HEMATOLOGÍA & HEMOSTASIA (Contador Láser 5-Diff)",
      rows: [
        { parameter: "Glóbulos Rojos (Hematíes)", value: "4.820.000", unit: "/mm³", referenceInterval: "4.200.000 - 5.400.000", flag: "normal" },
        { parameter: "Hemoglobina", value: "14.6", unit: "g/dL", referenceInterval: "13.0 - 17.0", flag: "normal" },
        { parameter: "Hematocrito", value: "43.8", unit: "%", referenceInterval: "40.0 - 50.0", flag: "normal" },
        { parameter: "Glóbulos Blancos (Leucocitos)", value: "6.400", unit: "/mm³", referenceInterval: "4.500 - 10.000", flag: "normal" },
        { parameter: "Plaquetas", value: "245.000", unit: "/mm³", referenceInterval: "150.000 - 450.000", flag: "normal" },
        { parameter: "Eritrosedimentación (VSG)", value: "8", unit: "mm/1ª hora", referenceInterval: "Hasta 15", flag: "normal" }
      ]
    },
    {
      category: "BIOQUÍMICA CLÍNICA & METABOLISMO (Analizador Automático)",
      rows: [
        { parameter: "Glucemia Basal", value: "92", unit: "mg/dL", referenceInterval: "70 - 110", flag: "normal" },
        { parameter: "Urea Plasmática", value: "34", unit: "mg/dL", referenceInterval: "15 - 50", flag: "normal" },
        { parameter: "Creatinina Sérica", value: "0.88", unit: "mg/dL", referenceInterval: "0.60 - 1.20", flag: "normal" },
        { parameter: "Colesterol Total", value: "188", unit: "mg/dL", referenceInterval: "Deseable < 200", flag: "normal" },
        { parameter: "Colesterol HDL (Protector)", value: "54", unit: "mg/dL", referenceInterval: "> 40", flag: "normal" },
        { parameter: "Colesterol LDL (Aterogénico)", value: "112", unit: "mg/dL", referenceInterval: "Óptimo < 130", flag: "normal" },
        { parameter: "Triglicéridos Séricos", value: "128", unit: "mg/dL", referenceInterval: "< 150", flag: "normal" },
        { parameter: "TGO / AST (Transaminasa)", value: "22", unit: "UI/L", referenceInterval: "Hasta 38", flag: "normal" },
        { parameter: "TGP / ALT (Transaminasa)", value: "26", unit: "UI/L", referenceInterval: "Hasta 41", flag: "normal" }
      ]
    },
    {
      category: "ENDOCRINOLOGÍA & INMUNOENSAYO QUIMIOLUMINISCENTE",
      rows: [
        { parameter: "TSH Ultrasensible", value: "2.14", unit: "µUI/mL", referenceInterval: "0.40 - 4.20", flag: "normal" },
        { parameter: "T4 Libre", value: "1.25", unit: "ng/dL", referenceInterval: "0.80 - 1.80", flag: "normal" }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-slate-900 border-2 border-slate-700 rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto no-scrollbar flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b-2 border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/98 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-950 text-emerald-400 border border-emerald-800">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-display uppercase tracking-wide">
                Portal de Resultados Online
              </h3>
              <p className="text-xs font-bold text-slate-400">
                Laboratorio Schvarzstein · Paso de los Libres
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 text-slate-200 flex items-center justify-center hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input Section */}
        <div className="p-5 space-y-4 text-xs sm:text-sm">
          <form onSubmit={handleSearch} className="bg-slate-950 p-4 sm:p-5 rounded-3xl border-2 border-slate-800 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="font-black text-white uppercase text-xs sm:text-sm tracking-wide">
                Ingreso de Paciente:
              </span>
              <button
                type="button"
                onClick={handleLoadDemo}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline font-black uppercase"
              >
                Cargar Demo
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 uppercase font-black block">
                  N° de Protocolo:
                </label>
                <input
                  type="text"
                  required
                  value={protocolInput}
                  onChange={(e) => setProtocolInput(e.target.value)}
                  placeholder="Ej: LIB-2026-9024"
                  className="w-full bg-slate-900 border-2 border-slate-700 text-white rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 uppercase font-black block">
                  DNI del Paciente:
                </label>
                <input
                  type="text"
                  required
                  value={dniInput}
                  onChange={(e) => setDniInput(e.target.value)}
                  placeholder="Ej: 34.890.122"
                  className="w-full bg-slate-900 border-2 border-slate-700 text-white rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={reportState === 'loading'}
              className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>{reportState === 'loading' ? 'Buscando protocolo...' : 'Consultar Informe de Resultados'}</span>
            </button>
          </form>

          {/* Report Viewer */}
          {reportState === 'found' && (
            <div className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-5 space-y-4 animate-in fade-in">
              {/* Report Header */}
              <div className="border-b-2 border-slate-800 pb-3 flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-white font-display uppercase">
                      LABORATORIO SCHVARZSTEIN
                    </span>
                    <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-black rounded-lg uppercase">
                      Validado
                    </span>
                  </div>
                  <p className="text-xs text-cyan-400 font-bold mt-0.5">
                    Calle Sarmiento 902 · Paso de los Libres, Corrientes
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 text-white text-xs font-black uppercase rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <Download className={`w-4 h-4 ${isDownloading ? 'text-emerald-400 animate-bounce' : 'text-cyan-400'}`} />
                  <span>{isDownloading ? 'Generando...' : 'PDF'}</span>
                </button>
              </div>

              {/* Patient Meta */}
              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm bg-slate-900 p-4 rounded-2xl border border-slate-800 font-bold">
                <div>
                  <span className="text-slate-400 block text-xs uppercase font-extrabold">Paciente:</span>
                  <span className="font-black text-white">GÓMEZ, MARTA BEATRIZ</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs uppercase font-extrabold">DNI:</span>
                  <span className="font-mono text-white">34.890.122</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs uppercase font-extrabold">Protocolo:</span>
                  <span className="font-mono text-cyan-300">{protocolInput || 'LIB-2026-9024'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs uppercase font-extrabold">Fecha:</span>
                  <span className="text-white">Sarmiento 902</span>
                </div>
              </div>

              {/* Results Tables */}
              <div className="space-y-4">
                {mockReportResults.map((cat, idx) => (
                  <div key={idx} className="space-y-2">
                    <h5 className="text-xs font-black text-cyan-300 uppercase tracking-wider bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                      {cat.category}
                    </h5>

                    <div className="overflow-x-auto no-scrollbar">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead>
                          <tr className="text-xs font-black text-slate-400 border-b border-slate-800 uppercase">
                            <th className="py-2">Determinación</th>
                            <th className="py-2 text-right">Resultado</th>
                            <th className="py-2 text-left pl-3">Unidad</th>
                            <th className="py-2 text-right">Referencia</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900">
                          {cat.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-900/50">
                              <td className="py-2 font-bold text-slate-100">{row.parameter}</td>
                              <td className="py-2 text-right font-black text-white font-mono">
                                {row.value}
                              </td>
                              <td className="py-2 pl-3 text-xs text-slate-400 font-mono font-bold">{row.unit}</td>
                              <td className="py-2 text-right text-xs text-slate-300 font-mono font-bold">{row.referenceInterval}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              {/* Electronic Biochemist Signature Box */}
              <div className="pt-3 border-t-2 border-slate-800 flex items-center justify-between text-xs font-bold text-slate-300">
                <div className="flex items-center gap-2 text-emerald-400 font-black">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Validado electrónicamente por Bioquímico Director Técnico</span>
                </div>
                <span className="font-mono text-xs text-slate-500">Hash: 8A4F-C992</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
