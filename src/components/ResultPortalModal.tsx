import React, { useState } from 'react';
import { 
  X, 
  Search, 
  FileText, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Printer, 
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
  const [loadedReport, setLoadedReport] = useState<boolean>(false);
  const [reportState, setReportState] = useState<'idle' | 'loading' | 'found' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setReportState('loading');
    setTimeout(() => {
      setReportState('found');
      setLoadedReport(true);
    }, 700);
  };

  const handleLoadDemo = () => {
    setProtocolInput('LIB-2026-9024');
    setDniInput('34.890.122');
    setReportState('loading');
    setTimeout(() => {
      setReportState('found');
      setLoadedReport(true);
    }, 500);
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto no-scrollbar flex flex-col shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Portal de Resultados Online
              </h3>
              <p className="text-xs text-slate-400">
                Laboratorio Schvarzstein · Paso de los Libres
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input Section */}
        <div className="p-4 sm:p-5 space-y-4 text-xs">
          <form onSubmit={handleSearch} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs">Ingreso de Paciente:</span>
              <button
                type="button"
                onClick={handleLoadDemo}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 underline font-medium"
              >
                Cargar Protocolo de Demostración
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold block">
                  N° de Protocolo:
                </label>
                <input
                  type="text"
                  required
                  value={protocolInput}
                  onChange={(e) => setProtocolInput(e.target.value)}
                  placeholder="Ej: LIB-2026-9024"
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold block">
                  DNI del Paciente:
                </label>
                <input
                  type="text"
                  required
                  value={dniInput}
                  onChange={(e) => setDniInput(e.target.value)}
                  placeholder="Ej: 34.890.122"
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={reportState === 'loading'}
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{reportState === 'loading' ? 'Buscando protocolo...' : 'Consultar Informe de Resultados'}</span>
            </button>
          </form>

          {/* Report Viewer */}
          {reportState === 'found' && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4 animate-in fade-in">
              {/* Report Header */}
              <div className="border-b border-slate-800 pb-3 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-white font-display">
                      LABORATORIO SCHVARZSTEIN
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold rounded-md">
                      Protocolo Validado
                    </span>
                  </div>
                  <p className="text-[10px] text-cyan-400 font-medium">
                    Calle Sarmiento 902 · Paso de los Libres, Corrientes · Matrícula Bioquímica Prov. Ctes.
                  </p>
                </div>

                <button
                  onClick={() => alert("Descargando informe oficial firmado digitalmente en formato PDF...")}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>PDF</span>
                </button>
              </div>

              {/* Patient Meta */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                <div>
                  <span className="text-slate-400 block text-[10px]">Paciente:</span>
                  <span className="font-bold text-white">GÓMEZ, MARTA BEATRIZ</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">DNI:</span>
                  <span className="font-mono text-white">34.890.122</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Protocolo:</span>
                  <span className="font-mono text-cyan-300 font-semibold">{protocolInput || 'LIB-2026-9024'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Fecha de Extracción:</span>
                  <span className="text-white">28/09/2026 - Sarmiento 902</span>
                </div>
              </div>

              {/* Results Tables */}
              <div className="space-y-4">
                {mockReportResults.map((cat, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <h5 className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider bg-slate-900/90 px-2 py-1 rounded-md border border-slate-800">
                      {cat.category}
                    </h5>

                    <div className="overflow-x-auto no-scrollbar">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-[10px] text-slate-500 border-b border-slate-800">
                            <th className="py-1">Determinación</th>
                            <th className="py-1 text-right">Resultado</th>
                            <th className="py-1 text-left pl-2">Unidad</th>
                            <th className="py-1 text-right">Valores Referencia</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900">
                          {cat.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-900/40">
                              <td className="py-1.5 font-medium text-slate-200 text-[11px]">{row.parameter}</td>
                              <td className="py-1.5 text-right font-bold text-white font-mono text-[11px]">
                                {row.value}
                              </td>
                              <td className="py-1.5 pl-2 text-[10px] text-slate-400 font-mono">{row.unit}</td>
                              <td className="py-1.5 text-right text-[10px] text-slate-400 font-mono">{row.referenceInterval}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>

              {/* Electronic Biochemist Signature Box */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Validado electrónicamente por Bioquímico Director Técnico</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">Hash: 8A4F-C992</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
