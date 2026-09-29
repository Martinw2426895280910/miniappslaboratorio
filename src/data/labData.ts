/**
 * Laboratorio Schvarzstein - Análisis Clínicos
 * Calle Sarmiento 902, Paso de los Libres, Corrientes, Argentina
 * 
 * Contiene perfiles de estudios bioquímicos especializados,
 * áreas de análisis clínico con imágenes de instrumental y reactivos de laboratorio.
 */

import microscopeImg from '../assets/images/lab_microscope_bench_1790633977989.jpg';
import testTubesImg from '../assets/images/lab_test_tubes_rack_1790633988467.jpg';
import analyzerImg from '../assets/images/lab_biochem_analyzer_1790633998220.jpg';
import petriImg from '../assets/images/lab_petri_dishes_1790634008571.jpg';
import centrifugeImg from '../assets/images/lab_centrifuge_rotor_1790634018044.jpg';

export interface StudyProfile {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  fastingHours: number;
  sampleType: string;
  turnaroundTime: string;
  bgImage: string;
  description: string;
  includedAnalyses: string[];
  clinicalPurpose: string;
  instructions: string;
  coverage: string;
}

export interface LabArea {
  id: string;
  name: string;
  shortDesc: string;
  instrumentFocus: string;
  bgImage: string;
  testCount: number;
  featuredTests: string[];
  detailedDescription: string;
  technologyUsed: string;
}

export const LAB_CONTACT = {
  name: "Laboratorio Schvarzstein",
  subtitle: "Análisis Clínicos & Bioquímica Diagnóstica",
  address: "Calle Sarmiento 902",
  cornerRef: "Esq. Los 108 / Centro",
  city: "Paso de los Libres",
  province: "Corrientes",
  country: "Argentina",
  postalCode: "W3230",
  whatsappNumber: "+543772636749",
  whatsappDisplay: "+54 3772 636749",
  phoneLandline: "(03772) 42-1890",
  email: "contacto@laboratorioschvarzstein.com.ar",
  schedule: {
    weekdays: "Lunes a Viernes: 06:30 a 12:30 y 16:30 a 19:30",
    saturdays: "Sábados: 07:00 a 11:30",
    fastingBloodDraw: "Extracciones matutinas: 06:45 a 10:30 hs",
    homeService: "Servicio de toma de muestra a domicilio disponible en Paso de los Libres"
  }
};

export const PROMO_PROFILES: StudyProfile[] = [
  {
    id: "perfil-integral",
    title: "Perfil Chequeo Clínico Integral",
    subtitle: "Evaluación metabólica, hematológica, renal y hepática completa",
    category: "Chequeo Preventivo",
    tag: "Panel Preventivo Anual",
    fastingHours: 10,
    sampleType: "Sangre venosa (EDTA + Suero) y Orina completa",
    turnaroundTime: "En el día (19:00 hs)",
    bgImage: testTubesImg,
    coverage: "Obras Sociales, Prepagas y Particulares",
    description: "Panel exhaustivo de control anual para evaluar el estado fisiológico global del paciente, detectando anemias, alteraciones glucémicas, lipídicas, función renal y actividad hepática.",
    includedAnalyses: [
      "Hemograma Completo automatizado con fórmula leucocitaria diferencial",
      "Glucemia en ayunas",
      "Uremia (Urea plasmática)",
      "Creatinina en sangre (con estimación de TFG CKD-EPI)",
      "Hepatograma Completo (TGO, TGP, Fosfatasa Alcalina, Bilirrubinas)",
      "Perfil Lipídico Básico (Colesterol Total, HDL, LDL, Triglicéridos)",
      "Ácido Úrico sérico",
      "Examen Físico-Químico y Sedimento Urinario microscópico"
    ],
    clinicalPurpose: "Detección temprana de trastornos metabólicos asintomáticos, control de factores de riesgo cardiovascular y tamizaje de rutina para adultos y jóvenes.",
    instructions: "Ayuno de 10 a 12 horas (beber solo pequeños sorbos de agua si tiene sed). Primera orina de la mañana en recolector estéril con higiene previa."
  },
  {
    id: "perfil-tiroideo",
    title: "Perfil Tiroideo Completo",
    subtitle: "Dosaje hormonal de ultra alta sensibilidad por quimioluminiscencia",
    category: "Endocrinología & Hormonas",
    tag: "Inmunoensayo Ultrasensible",
    fastingHours: 8,
    sampleType: "Suero (Tubo seco sin anticoagulante)",
    turnaroundTime: "24 horas hábiles",
    bgImage: analyzerImg,
    coverage: "Obras Sociales, Prepagas y Particulares",
    description: "Evaluación precisa de la función de la glándula tiroides mediante analizador automatizado de inmunoensayo quimioluminiscente de última generación.",
    includedAnalyses: [
      "TSH Ultrasensible (Tirotrofina sérica)",
      "T4 Libre (Tiroxina activa no unida a proteínas)",
      "T3 Total (Triyodotironina)",
      "Anticuerpos Anti-TPO (Anti-Peroxidasa tiroidea)",
      "Anticuerpos Anti-Tiroglobulina (Anti-TG)"
    ],
    clinicalPurpose: "Diagnóstico y seguimiento de hipotiroidismo, hipertiroidismo, tiroiditis autoinmune (Hashimoto) y monitoreo de dosificación de levotiroxina.",
    instructions: "Ayuno de 8 horas. Si toma medicación tiroidea (T4), tomar la pastilla después de la extracción sanguínea, salvo indicación médica expresa."
  },
  {
    id: "perfil-cardio-lipidico",
    title: "Perfil Cardiovascular & Lipídico Avanzado",
    subtitle: "Fracciones lipoproteicas, riesgo aterogénico y microinflamación",
    category: "Cardiología & Metabolismo",
    tag: "Estratificación de Riesgo Coronario",
    fastingHours: 12,
    sampleType: "Suero en ayunas estricto",
    turnaroundTime: "En el día (19:00 hs)",
    bgImage: centrifugeImg,
    coverage: "Obras Sociales, Prepagas y Particulares",
    description: "Determinación de todas las fracciones lipídicas y marcadores inflamatorios endoteliales para estratificación cuantitativa de riesgo coronario.",
    includedAnalyses: [
      "Colesterol Total",
      "Colesterol HDL (Fracción protectora de alta densidad)",
      "Colesterol LDL (Fracción aterogénica de baja densidad)",
      "Colesterol No-HDL y VLDL",
      "Triglicéridos séricos",
      "Índice de Castelli (Relación Colesterol Total / HDL)",
      "Proteína C Reactiva Ultrasensible (PCR-us cardiovascular)"
    ],
    clinicalPurpose: "Detección de dislipidemias, evaluación de riesgo cardiovascular antes de iniciar estatinas y control en pacientes con antecedentes hipertensivos.",
    instructions: "Ayuno estricto de 12 horas. Evitar comidas copiosas, consumo de grasas saturadas y bebidas alcohólicas durante las 48 horas previas al estudio."
  },
  {
    id: "perfil-diabetes",
    title: "Perfil Metabólico & Control Diabetes",
    subtitle: "Glicemia, hemoglobina glicada HPLC e índice de resistencia insulínica",
    category: "Diabetes & Metabolismo",
    tag: "Control Glucémico Integral",
    fastingHours: 8,
    sampleType: "Sangre entera EDTA + Suero",
    turnaroundTime: "En el día (19:00 hs)",
    bgImage: testTubesImg,
    coverage: "Obras Sociales, Prepagas y Particulares",
    description: "Evaluación integral del metabolismo hidrocarbonado tanto a nivel basal inmediato como retrospectivo de los últimos 90 días mediante HPLC.",
    includedAnalyses: [
      "Glucemia basal en ayunas",
      "Hemoglobina Glicosilada (HbA1c por método de referencia HPLC)",
      "Insulinemia basal",
      "Índice HOMA-IR (Evaluación de resistencia a la insulina)",
      "Microalbuminuria en muestra aislada de orina (Cociente Albúmina/Creatinina)"
    ],
    clinicalPurpose: "Diagnóstico de prediabetes, diabetes tipo 2, síndrome metabólico y detección temprana de nefropatía diabética incipiente.",
    instructions: "Ayuno de 8 horas. No suspender la medicación antidiabética habitual salvo instrucción específica de su médico tratante."
  },
  {
    id: "perfil-renal-electrolitos",
    title: "Perfil Renal & Ionograma Sérico",
    subtitle: "Filtrado glomerular, depuración nitrogenada y equilibrio iónico",
    category: "Nefrología",
    tag: "Función Renal & Depuración",
    fastingHours: 8,
    sampleType: "Suero + Orina fresca",
    turnaroundTime: "En el día (19:00 hs)",
    bgImage: analyzerImg,
    coverage: "Obras Sociales, Prepagas y Particulares",
    description: "Monitoreo integral de la capacidad depurativa renal y concentraciones de electrolitos para pacientes hipertensos, cardiópatas o bajo terapia diurética.",
    includedAnalyses: [
      "Urea sérica y Nitrógeno ureico (BUN)",
      "Creatinina plasmática con Tasa de Filtrado Glomerular estimada (CKD-EPI)",
      "Ionograma plasmático completo (Sodio, Potasio, Cloro por electrodo selectivo)",
      "Calcio iónico y Fósforo sérico",
      "Sedimento urinario con microscopía de contraste para cilindros y cristales"
    ],
    clinicalPurpose: "Evaluación de insuficiencia renal aguda o crónica, deshidratación, litiasis urinaria y control de balance electrolítico.",
    instructions: "Ayuno de 8 horas. Mantener una hidratación habitual el día anterior al análisis (no restringir agua ni sobrehidratarse de golpe)."
  },
  {
    id: "perfil-deportivo",
    title: "Perfil Deportivo & Rendimiento Físico",
    subtitle: "Marcadores de sobreentrenamiento muscular, reservas de hierro y fatiga",
    category: "Medicina Deportiva",
    tag: "Atletas & Alto Rendimiento",
    fastingHours: 8,
    sampleType: "Sangre entera EDTA + Suero",
    turnaroundTime: "24 horas hábiles",
    bgImage: centrifugeImg,
    coverage: "Obras Sociales, Prepagas y Particulares",
    description: "Diseñado para atletas, corredores y personas con entrenamiento regular en gimnasios o deportes en Paso de los Libres.",
    includedAnalyses: [
      "Hemograma Completo con recuento de reticulocitos (transporte de oxígeno)",
      "Ferritina sérica y Ferremia (depósitos y disponibilidad de hierro)",
      "Creatina Fosfoquinasa (CPK total - biomarcador de fatiga y daño muscular)",
      "Magnesio sérico y Calcio",
      "Proteínas Totales, Albúmina y Globulinas",
      "Lactato Deshidrogenasa (LDH) y Hepatograma"
    ],
    clinicalPurpose: "Detección temprana de sobreentrenamiento, prevención de rabdomiólisis leve, anemia deportiva y ajuste de cargas físicas.",
    instructions: "Ayuno de 8 horas. Evitar entrenamientos intensos o sesiones pesadas de gimnasio durante las 24 horas previas a la extracción."
  },
  {
    id: "perfil-prenatal",
    title: "Perfil Materno Gestacional / Prenatal",
    subtitle: "Serología infecciosa reglamentaria, grupo sanguíneo y pesquisa obstétrica",
    category: "Maternidad & Obstetricia",
    tag: "Pesquisa Obstétrica Obligatoria",
    fastingHours: 8,
    sampleType: "Sangre venosa + Suero + Orina estéril",
    turnaroundTime: "24 a 48 horas",
    bgImage: petriImg,
    coverage: "Obras Sociales, Prepagas y Particulares",
    description: "Panel reglamentario de tamizaje prenatal según normativas del Ministerio de Salud para el cuidado integral de la madre y el bebé en gestación.",
    includedAnalyses: [
      "Grupo Sanguíneo y Factor Rh (con prueba de Coombs indirecta)",
      "Hemograma Completo y Coagulograma básico (Quick y KPTT)",
      "Glucemia en ayunas",
      "Serología para Toxoplasmosis (IgG e IgM)",
      "Serología para Chagas (ELISA y Hemaglutinación confirmatoria)",
      "VDRL cuantitativa (Sífilis)",
      "Detección de VIH y Antígeno de superficie Hepatitis B (HBsAg)",
      "Urocultivo con recuento de colonias y antibiograma estéril"
    ],
    clinicalPurpose: "Cuidado de la salud materno-fetal, prevención de transmisión vertical de infecciones y preparación para el parto.",
    instructions: "Ayuno de 8 horas. Higiene íntima minuciosa para urocultivo con recolección de chorro medio en frasco estéril nuevo."
  }
];

export const LAB_AREAS: LabArea[] = [
  {
    id: "area-hematologia",
    name: "Hematología & Hemostasia",
    shortDesc: "Contadores hematológicos automáticos láser y coagulometría computarizada",
    instrumentFocus: "Contador hematológico automatizado diferencial de 5 estirpes, microscopio óptico binocular de alta definición para frotis periférico, y coagulómetro de detección óptica.",
    bgImage: testTubesImg,
    testCount: 24,
    featuredTests: ["Hemograma Automatizado", "Frotis de Sangre Periférica", "Tiempo de Quick / RIN", "KPTT", "Eritrosedimentación (VSG)", "Fibrinógeno"],
    detailedDescription: "Estudio exhaustivo de la serie roja, glóbulos blancos, plaquetas y cascada de coagulación. Controles de calidad diarios con calibradores certificados.",
    technologyUsed: "Citometría de flujo impedanciométrica + Óptica láser y Coagulometría fotométrica computarizada."
  },
  {
    id: "area-bioquimica",
    name: "Bioquímica Clínica & Metabolismo",
    shortDesc: "Analizadores multiparamétricos automáticos de química líquida continua",
    instrumentFocus: "Espectrofotómetro automatizado de química clínica con reactivos líquidos estables, carrusel refrigerado y lectura cinética de enzimología.",
    bgImage: analyzerImg,
    testCount: 42,
    featuredTests: ["Glucemia", "Uremia", "Creatinina", "Hepatograma", "Perfil Lipídico", "Ionograma", "Ácido Úrico", "Amilasa"],
    detailedDescription: "Cuantificación de analitos orgánicos e inorgánicos que reflejan la actividad de órganos vitales como riñón, páncreas, hígado y sistema circulatorio.",
    technologyUsed: "Analizador químico fotométrico continuo con electrodo selectivo de iones (ISE)."
  },
  {
    id: "area-inmunologia",
    name: "Inmunología & Serología Infecciosa",
    shortDesc: "Detección de anticuerpos, antígenos y pruebas serológicas de alta especificidad",
    instrumentFocus: "Lavador y lector de microplacas ELISA de 96 pocillos, centrífuga de alta velocidad para separación de suero y reactivos de quimioluminiscencia.",
    bgImage: centrifugeImg,
    testCount: 35,
    featuredTests: ["Chagas (HAI / ELISA)", "Toxoplasmosis IgG/IgM", "VDRL Sífilis", "Hepatitis A, B y C", "VIH 4ta generación", "Artritis / Factor Reumatoideo"],
    detailedDescription: "Diagnóstico de enfermedades infecciosas, autoinmunes y respuestas del sistema inmunitario con máxima especificidad analítica.",
    technologyUsed: "Inmunoensayo enzimático (ELISA), aglutinación de partículas de látex e inmunocromatografía confirmatoria."
  },
  {
    id: "area-microbiologia",
    name: "Microbiología & Cultivos",
    shortDesc: "Placas de cultivo, agares nutritivos y antibiogramas guiados",
    instrumentFocus: "Estufa de cultivo bacteriológico a 37°C, cabina de flujo laminar estéril, medios de agar sangre/MacConkey y microscopio con tinción Gram.",
    bgImage: petriImg,
    testCount: 18,
    featuredTests: ["Urocultivo", "Exudado Faríngeo", "Coprocultivo", "Cultivo de Micosis / Hongos", "Antibiograma Kirby-Bauer", "Hisopado de Fauces"],
    detailedDescription: "Aislamiento e identificación bacteriana y micológica a partir de muestras biológicas, evaluando la sensibilidad exacta a antibióticos según normas CLSI.",
    technologyUsed: "Aislamiento en agares diferenciales, batería bioquímica de identificación y sensidiscos para antibiograma guiado."
  },
  {
    id: "area-endocrinologia",
    name: "Endocrinología & Hormonas",
    shortDesc: "Dosaje de hormonas tiroideas, reproductivas y esteroideas",
    instrumentFocus: "Analizador de inmunoensayo quimioluminiscente (CLIA) con micropipetas volumétricas calibradas y tubos de ensayo especiales.",
    bgImage: microscopeImg,
    testCount: 29,
    featuredTests: ["TSH y T4 Libre", "Subunidad Beta HCG", "Prolactina", "Cortisol Sérico", "Testosterona Total y Libre", "FSH / LH / Estradiol"],
    detailedDescription: "Medición ultrasensible de concentraciones hormonales en rangos de picogramos y nanogramos para el diagnóstico endócrino y de fertilidad.",
    technologyUsed: "Quimioluminiscencia de partículas magnéticas de ultra alta sensibilidad diagnóstica."
  },
  {
    id: "area-urianalisis",
    name: "Urianálisis & Química Urinaria",
    shortDesc: "Tiras reactivas multiparamétricas y microscopía de sedimento",
    instrumentFocus: "Lector reflectómetro de tiras de orina de 10 parámetros, tubos cónicos graduados para centrifugación y cámara de recuento microscópico.",
    bgImage: testTubesImg,
    testCount: 15,
    featuredTests: ["Orina Completa", "Microalbuminuria", "Proteinuria de 24 hs", "Clearance de Creatinina", "Sedimento Microscópico", "Cuerpos Cetónicos"],
    detailedDescription: "Examen físico-químico y microscópico de la orina para detectar patologías renales, infecciones del tracto urinario, litiasis o nefropatías.",
    technologyUsed: "Reflectometría digital fotométrica y microscopía óptica de luz transmitida a 400x."
  },
  {
    id: "area-toxicologia",
    name: "Toxicología & Fármacos",
    shortDesc: "Monitoreo terapéutico y cribado toxicológico analítico",
    instrumentFocus: "Paneles de reacción cromogénica, reactivos para dosaje de anticonvulsivantes y analizador de absorción espectral.",
    bgImage: analyzerImg,
    testCount: 12,
    featuredTests: ["Dosaje de Carbamazepina", "Ácido Valproico", "Litio en sangre", "Cribado de Tóxicos en orina", "Dosaje de Digoxina"],
    detailedDescription: "Determinación de niveles plasmáticos de fármacos para asegurar concentraciones en rango terapéutico y evitar toxicidad medicamentosa.",
    technologyUsed: "Inmunoensayo homogéneo enzimático con calibradores multiescala."
  },
  {
    id: "area-molecular",
    name: "Biología Molecular",
    shortDesc: "Termocicladores para amplificación de ácidos nucleicos (PCR)",
    instrumentFocus: "Termociclador de PCR en tiempo real (qPCR), micropipetas con filtro libre de nucleasas y reactivos de retrotranscripción.",
    bgImage: microscopeImg,
    testCount: 10,
    featuredTests: ["PCR Panel Respiratorio", "Carga Viral Hepatitis", "HPV Detección por PCR", "Paneles de Genotipificación"],
    detailedDescription: "Diagnóstico genético molecular mediante amplificación específica de secuencias de ADN y ARN con sensibilidad absoluta.",
    technologyUsed: "Reacción en cadena de la polimerasa en tiempo real con sondas TaqMan fluorescentes."
  }
];

export const PREPARATION_GUIDELINES = [
  {
    title: "Ayuno de 10 a 12 Horas",
    subtitle: "Para Lípidos, Glucemia y Chequeos Generales",
    icon: "clock",
    detail: "Cenar liviano la noche anterior (sin grasas ni alcohol) antes de las 21:00 hs. A la mañana siguiente no ingerir alimentos ni mate, café o jugos. Está permitido beber pequeños sorbos de agua para no deshidratarse."
  },
  {
    title: "Recolección de Orina Completa",
    subtitle: "Muestra de primera mañana",
    icon: "test-tube",
    detail: "Lavar previamente la zona genital con agua y jabón neutro. Descartar el primer chorro de orina en el inodoro y recolectar el chorro medio directamente en frasco estéril nuevo provisto por el laboratorio o farmacia."
  },
  {
    title: "Estudios Hormonales & Tiroides",
    subtitle: "Extracción matutina sin esfuerzo físico",
    icon: "activity",
    detail: "Asistir entre las 07:00 y las 09:00 hs. Para dosaje de TSH/T4L, no tomar la pastilla de levotiroxina antes de la extracción. Para prolactina y cortisol, reposar 20 minutos en la sala del laboratorio antes de la toma de muestra."
  },
  {
    title: "Urocultivo & Antibiograma",
    subtitle: "Cultivo bacteriológico estéril",
    icon: "shield-alert",
    detail: "No estar tomando antibióticos (deben haber transcurrido al menos 72 horas desde la última dosis, salvo orden médica expresa). Recolectar con higiene estricta y remitir al laboratorio en menos de 2 horas."
  }
];

export const OBRA_SOCIALES = [
  { id: "particular", name: "Particular / Atención Directa", planInfo: "Atención inmediata con o sin orden médica" },
  { id: "ioscor", name: "IOSCOR (Obra Social de Corrientes)", planInfo: "Convenio provincial activo en sede Sarmiento 902" },
  { id: "osde", name: "OSDE (Binario 210, 310, 410, 450, 510)", planInfo: "Validación digital directa con credencial" },
  { id: "swiss", name: "Swiss Medical", planInfo: "Cobertura ambulatoria por convenio bioquímico" },
  { id: "pami", name: "PAMI", planInfo: "Atención a afiliados con orden médica electrónica" },
  { id: "medife", name: "Medifé", planInfo: "Planes Bronce, Plata, Oro y Platino" },
  { id: "galeno", name: "Galeno", planInfo: "Atención con credencial y orden autorizada" },
  { id: "sancor", name: "Sancor Salud", planInfo: "Red de prestadores bioquímicos de Corrientes" },
  { id: "otra", name: "Otras Obras Sociales / Mutuales", planInfo: "Consultar requisitos de autorización vía WhatsApp" }
];
