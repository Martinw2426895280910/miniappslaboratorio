/**
 * Laboratorio Schvarzstein - Análisis Clínicos
 * Calle Sarmiento 902, Paso de los Libres, Corrientes, Argentina
 * 
 * Contiene perfiles de estudios bioquímicos en promoción,
 * áreas de análisis clínico con imágenes de instrumentos y reactivos de laboratorio.
 */

import microscopeImg from '@/src/assets/images/lab_microscope_bench_1790633977989.jpg';
import testTubesImg from '@/src/assets/images/lab_test_tubes_rack_1790633988467.jpg';
import analyzerImg from '@/src/assets/images/lab_biochem_analyzer_1790633998220.jpg';
import petriImg from '@/src/assets/images/lab_petri_dishes_1790634008571.jpg';
import centrifugeImg from '@/src/assets/images/lab_centrifuge_rotor_1790634018044.jpg';

export interface StudyProfile {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  promoPrice: number;
  regularPrice: number;
  fastingHours: number;
  sampleType: string;
  turnaroundTime: string;
  bgImage: string;
  description: string;
  includedAnalyses: string[];
  clinicalPurpose: string;
  instructions: string;
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

export interface LabTestDetail {
  id: string;
  name: string;
  areaId: string;
  fasting: string;
  sample: string;
  deliveryHours: string;
  price: number;
  description: string;
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
    fastingBloodDraw: "Extracciones de sangre: 06:45 a 10:30 hs",
    homeService: "Servicio de toma de muestra a domicilio disponible en Paso de los Libres"
  }
};

export const PROMO_PROFILES: StudyProfile[] = [
  {
    id: "perfil-integral",
    title: "Perfil Chequeo Integral Clínico",
    subtitle: "Evaluación metabólica, hematológica, renal y hepática",
    tag: "Más Solicitado · -25%",
    promoPrice: 28500,
    regularPrice: 38000,
    fastingHours: 10,
    sampleType: "Sangre venosa (EDTA + Suero) y Orina completa",
    turnaroundTime: "Mismo día (19:00 hs)",
    bgImage: testTubesImg,
    description: "Panel exhaustivo preventivo anual para evaluar el estado fisiológico global del paciente, detectando anemias, alteraciones glucémicas, lipídicas, función renal y del hígado.",
    includedAnalyses: [
      "Hemograma Completo automatizado con fórmula leucocitaria",
      "Glucemia en ayunas",
      "Uremia (Urea plasmática)",
      "Creatinina en sangre (TFG estimada)",
      "Hepatograma Completo (TGO, TGP, Fosfatasa Alcalina, Bilirrubina Total y Fraccionada)",
      "Perfil Lipídico Básico (Colesterol Total, HDL, LDL, Triglicéridos)",
      "Ácido Úrico",
      "Sedimento y físico-químico de Orina completa"
    ],
    clinicalPurpose: "Detección temprana de trastornos metabólicos asintomáticos, control de factores de riesgo cardiovascular y tamizaje de rutina.",
    instructions: "Ayuno de 10 a 12 horas (puede beber pequeños sorbos de agua). Primera orina de la mañana en recolector estéril con higiene previa."
  },
  {
    id: "perfil-tiroideo",
    title: "Perfil Tiroideo Completo",
    subtitle: "Dosaje hormonal de alta sensibilidad por quimioluminiscencia",
    tag: "Hormonal · -20%",
    promoPrice: 34000,
    regularPrice: 42500,
    fastingHours: 8,
    sampleType: "Suero (Tubo seco sin anticoagulante)",
    turnaroundTime: "24 horas hábiles",
    bgImage: analyzerImg,
    description: "Evaluación precisa de la función de la glándula tiroides mediante analizador automatizado de inmunoensayo quimioluminiscente.",
    includedAnalyses: [
      "TSH Ultrasensible (Tirotrofina sérica)",
      "T4 Libre (Tiroxina libre activa)",
      "T3 Total (Triyodotironina)",
      "Anticuerpos Anti-TPO (Anti-Peroxidasa tiroidea)",
      "Anticuerpos Anti-Tiroglobulina (Anti-TG)"
    ],
    clinicalPurpose: "Diagnóstico y seguimiento de hipotiroidismo, hipertiroidismo, tiroiditis autoinmune (Hashimoto) y ajuste de dosis de levotiroxina.",
    instructions: "Ayuno de 8 horas. Si toma levotiroxina (T4), tomar la medicación después de la extracción sanguínea, a menos que su médico indique lo contrario."
  },
  {
    id: "perfil-cardio-lipidico",
    title: "Perfil Cardiovascular & Lipídico Avanzado",
    subtitle: "Riesgo aterogénico y proteína C reactiva ultrasensible",
    tag: "Salud Cardíaca · -15%",
    promoPrice: 24900,
    regularPrice: 29500,
    fastingHours: 12,
    sampleType: "Suero en ayunas estricto",
    turnaroundTime: "Mismo día",
    bgImage: centrifugeImg,
    description: "Determinación de todas las fracciones lipoproteicas y marcadores de microinflamación endotelial para estratificación de riesgo coronario.",
    includedAnalyses: [
      "Colesterol Total",
      "Colesterol HDL (Protector de alta densidad)",
      "Colesterol LDL (Aterogénico por cálculo de Friedewald)",
      "Colesterol VLDL y No-HDL",
      "Triglicéridos séricos",
      "Índice de Castelli (Riesgo Coronario)",
      "Proteína C Reactiva Ultrasensible (PCR-us)"
    ],
    clinicalPurpose: "Detección de dislipidemias, evaluación de riesgo cardiovascular previo a inicio de estatinas o control de pacientes hipertensos.",
    instructions: "Ayuno estricto de 12 horas. Evitar comidas copiosas, grasas y consumo de alcohol durante las 48 horas previas al examen."
  },
  {
    id: "perfil-diabetes",
    title: "Perfil Metabólico & Control Diabetes",
    subtitle: "Glicemia, hemoglobina glicada e índice de resistencia a insulina",
    tag: "Control Metabólico · -20%",
    promoPrice: 26000,
    regularPrice: 32500,
    fastingHours: 8,
    sampleType: "Sangre entera EDTA + Suero",
    turnaroundTime: "Mismo día",
    bgImage: testTubesImg,
    description: "Evaluación integral del metabolismo hidrocarbonado tanto a nivel basal como retrospectivo de los últimos 90 días.",
    includedAnalyses: [
      "Glucemia basal en ayunas",
      "Hemoglobina Glicosilada (HbA1c por HPLC de referencia)",
      "Insulinemia basal",
      "Índice HOMA-IR (Resistencia a la insulina)",
      "Microalbuminuria en muestra aislada de orina (Cociente Alb/Creatinina)"
    ],
    clinicalPurpose: "Diagnóstico de prediabetes, diabetes tipo 2, síndrome metabólico y monitoreo de daño endotelial renal incipiente.",
    instructions: "Ayuno de 8 horas. No suspender medicación habitual salvo indicación expresa de su médico diabetólogo."
  },
  {
    id: "perfil-renal-electrolitos",
    title: "Perfil Renal & Ionograma Sérico",
    subtitle: "Filtrado glomerular, clearance y equilibrio electrolítico",
    tag: "Función Renal · -15%",
    promoPrice: 22000,
    regularPrice: 26000,
    fastingHours: 8,
    sampleType: "Suero + Orina fresca",
    turnaroundTime: "Mismo día",
    bgImage: analyzerImg,
    description: "Monitoreo de la capacidad depurativa renal y concentraciones iónicas para pacientes hipertensos, cardiópatas o bajo terapia diurética.",
    includedAnalyses: [
      "Urea sérica y Nitrógeno ureico (BUN)",
      "Creatinina sérica con Tasa de Filtrado Glomerular (CKD-EPI)",
      "Ionograma plasmático completo (Sodio, Potasio, Cloro)",
      "Calcio iónico y Fósforo sérico",
      "Sedimento urinario centrifugado con microscopía de contraste"
    ],
    clinicalPurpose: "Evaluación de insuficiencia renal aguda o crónica, deshidratación, desequilibrios hidroelectrolíticos.",
    instructions: "Ayuno de 8 horas. Hidratación normal el día previo (no sobrehidratarse ni restringir agua bruscamente)."
  },
  {
    id: "perfil-deportivo",
    title: "Perfil Deportivo & Rendimiento Físico",
    subtitle: "Marcadores de sobreentrenamiento, muscular y hierro",
    tag: "Deportistas · -20%",
    promoPrice: 31000,
    regularPrice: 38800,
    fastingHours: 8,
    sampleType: "Sangre entera + Suero",
    turnaroundTime: "24 horas",
    bgImage: centrifugeImg,
    description: "Optimizado para atletas, corredores y personas con entrenamiento regular en gimnasios o deportes de Paso de los Libres.",
    includedAnalyses: [
      "Hemograma con recuento de reticulocitos (transporte de O2)",
      "Ferritina sérica y Ferremia (reservas de hierro)",
      "Creatina Fosfoquinasa (CPK total - daño muscular)",
      "Magnesio sérico y Calcio",
      "Proteínas Totales y Albúmina",
      "Hepatograma y Lactato Deshidrogenasa (LDH)"
    ],
    clinicalPurpose: "Detección de fatiga muscular crónica, prevención de rabdomiólisis leve, anemia del deportista y optimización de cargas.",
    instructions: "Ayuno de 8 horas. Evitar entrenamientos de alta intensidad o pesas durante las 24 horas previas al análisis."
  },
  {
    id: "perfil-prenatal",
    title: "Perfil Materno Gestacional / Prenatal",
    subtitle: "Serología infecciosa, grupo sanguíneo y pesquisa gestacional",
    tag: "Maternidad · Promo Especial",
    promoPrice: 36000,
    regularPrice: 45000,
    fastingHours: 8,
    sampleType: "Sangre EDTA + Suero + Orina",
    turnaroundTime: "24 a 48 horas",
    bgImage: petriImg,
    description: "Panel reglamentario de tamizaje para embarazadas según normativas obstétricas del Ministerio de Salud de la Nación y Corrientes.",
    includedAnalyses: [
      "Grupo Sanguíneo y Factor Rh (con prueba de Coombs indirecta si corresponde)",
      "Hemograma Completo y Coagulograma básico (KPTT, Quick)",
      "Glucemia en ayunas",
      "Serología Toxoplasmosis (IgG e IgM)",
      "Serología Chagas (ELISA e HAI confirmatoria)",
      "VDRL cuantitativa (Sífilis)",
      "Prueba de detección de VIH y Hepatitis B (HBsAg)",
      "Urocultivo con antibiograma"
    ],
    clinicalPurpose: "Cuidado de la salud materna y fetal, prevención de transmisión vertical y preparación para el parto.",
    instructions: "Ayuno de 8 horas. Higiene íntima minuciosa para urocultivo con recolección de chorro medio en frasco estéril."
  }
];

export const LAB_AREAS: LabArea[] = [
  {
    id: "area-hematologia",
    name: "Hematología & Hemostasia",
    shortDesc: "Contadores hematológicos automáticos láser y coagulometría",
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
    shortDesc: "Analizadores multiparamétricos automáticos de química líquida",
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
    shortDesc: "Detección de anticuerpos, antígenos y pruebas serológicas",
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
    shortDesc: "Placas de cultivo, agares nutritivos y antibiogramas",
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
    featuredTests: ["TSH y T4 Libre", "Subunidad Beta HCG", "Prolactina", "Cortisol Sérique", "Testosterona Total y Libre", "FSH / LH / Estradiol"],
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
    shortDesc: "Monitoreo terapéutico y cribado toxicológico",
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
    subtitle: "Extracción matutina sin esfuerzo",
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
  { id: "particular", name: "Particular (Promoción Contado / Débito)", discountPercent: 0 },
  { id: "ioscor", name: "IOSCOR (Instituto de Obra Social de Corrientes)", discountPercent: 30 },
  { id: "osde", name: "OSDE (210, 310, 410, 450)", discountPercent: 40 },
  { id: "swiss", name: "Swiss Medical", discountPercent: 40 },
  { id: "pami", name: "PAMI", discountPercent: 35 },
  { id: "medife", name: "Medifé", discountPercent: 30 },
  { id: "galeno", name: "Galeno", discountPercent: 35 },
  { id: "sancor", name: "Sancor Salud", discountPercent: 30 },
  { id: "otra", name: "Otras Obras Sociales / Mutuales", discountPercent: 20 }
];
