"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Activity,
  Video,
  Zap,
  X,
  Calendar as CalendarIcon,
  Maximize2,
  Cpu,
  CheckCircle2,
  Send,
  Compass,
  Eye,
  Sliders,
  Loader2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  MoveHorizontal,
  Droplets,
  GraduationCap,
  Target,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Radio,
  Clock, CheckCircle, 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ============================================================================
// 0. DEFINICIÓN DE TIPOS E INTERFACES
// ============================================================================
interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface TabData {
  tabName: string;
  title: string;
  desc: string;
  videoSrc: string;
  features: FeatureItem[];
}

interface TwinTag {
  id: number;
  x: number;
  y: number;
  code: string;
  shortName: string;
  title: string;
  moduleType: string;
  desc: string;
  icon: React.ReactNode;
  videoSrc: string;
}

interface CatalogItem {
  title: string;
  desc: string;
  img: string;
  href: string;
}

interface GeotechUseCase {
  sector: string;
  title: string;
  impact: string;
}

interface GeotechItem extends CatalogItem {
  code: string;
  tagline: string;
  fullDesc: string;
  specs: string[];
  useCases: GeotechUseCase[];
}

interface FaqItem {
  pregunta: string;
  respuesta: string;
}

// ============================================================================
// 1. DATOS ESTÁTICOS Y CONFIGURACIÓN (CONSTANTES)
// ============================================================================
const HERO_IMAGES = {
  desktop: "/assets/img/04_Landing_SMART/banner_hor_smart.webp",
  mobile: "/assets/img/04_Landing_SMART/banner_ver_smart.webp",
};

const CAPABILITIES_TABS: TabData[] = [
  {
    tabName: "Transformación Digital",
    title: "Transforma el mundo real en inteligencia digital",
    desc: "SMART TWIN® es una plataforma diseñada y desarrollada para integrar, visualizar y analizar datos geoespaciales interactivos en entornos de alta demanda.",
    videoSrc: "/assets/img/04_Landing_SMART/Videossmart/Smart_WEB_2.mp4",
    features: [
      {
        icon: <Box className="w-6 h-6" />,
        title: "Modelado 3D Realista",
        desc: "Visualiza activos reales en un entorno digital inmersivo.",
      },
      {
        icon: <Activity className="w-6 h-6" />,
        title: "Simulación y entrenamiento",
        desc: "Ejecuta tareas o procesos reales desde cualquier parte del mundo.",
      },
    ],
  },
  {
    tabName: "Monitoreo Integrado",
    title: "Desde la atmósfera hasta el subsuelo",
    desc: "Conecta múltiples sensores y fuentes de información para tener todo monitoreado y bajo control en tiempo real, garantizando la seguridad operativa.",
    videoSrc: "/assets/img/04_Landing_SMART/Videossmart/Smart_WEB_3.mp4",
    features: [
      {
        icon: <Video className="w-6 h-6" />,
        title: "Cámaras Especializadas",
        desc: "Monitorea y analiza datos sin importar tu ubicación geográfica.",
      },
      {
        icon: <Zap className="w-6 h-6" />,
        title: "Velocidad de Transmisión",
        desc: "Prevén posibles riesgos obteniendo la información al momento exacto.",
      },
    ],
  },
];

const TWIN_VIEWER_STEPS = [
  { icon: <Eye className="w-5 h-5" />, title: "1. Recorrido Virtual & Visualización" },
  { icon: <Sliders className="w-5 h-5" />, title: "2. Interfaces en Tiempo Real" },
  { icon: <GraduationCap className="w-5 h-5" />, title: "3. Entrenamiento Etapa por Etapa" },
];

const TWIN_VIEWER_TAGS: TwinTag[] = [
  {
    id: 1,
    x: 36,
    y: 34,
    code: "TWIN-REC-01",
    shortName: "Recorrido Virtual",
    title: "Navegación por el Entorno de la Presa",
    moduleType: "Exploración Interactiva",
    desc: "Permite realizar un recorrido virtual por toda el área de la presa. El usuario puede navegar libremente por el entorno y comprender su funcionamiento integral etapa por etapa.",
    icon: <Compass className="w-5 h-5" />,
    videoSrc: "/assets/img/04_Landing_SMART/Videossmart/01_presa.mp4",
  },
  {
    id: 2,
    x: 48,
    y: 45,
    code: "TWIN-MON-02",
    shortName: "Monitoreo Real-Time",
    title: "Cortina y Sensores en Tiempo Real",
    moduleType: "Interfaces de Telemetría",
    desc: "Smart Twin que integra visualización e interfaces avanzadas para monitorear la estructura, visualizando datos en tiempo real como temperatura, vibración y humedad en puntos críticos.",
    icon: <Activity className="w-5 h-5" />,
    videoSrc: "/assets/img/04_Landing_SMART/Videossmart/02_presa.mp4",
  },
  {
    id: 3,
    x: 60,
    y: 62,
    code: "TWIN-CTL-03",
    shortName: "Cuarto de Control",
    title: "Cuarto de Control y Apertura de Válvulas",
    moduleType: "Entrenamiento Digital",
    desc: "Acceso inmersivo al cuarto de control y casa de máquinas. Integra interfaces y entrenamiento digital para la apertura de válvulas y control de flujo, aprendiendo el proceso operativo paso a paso.",
    icon: <Cpu className="w-5 h-5" />,
    videoSrc: "/assets/img/04_Landing_SMART/Videossmart/03_presa.mp4",
  },
  {
    id: 4,
    x: 75,
    y: 44,
    code: "TWIN-CMP-04",
    shortName: "Compuertas y Desfogue",
    title: "Operación de Compuertas y Desfogue",
    moduleType: "Simulación de Maniobras",
    desc: "Entorno interactivo diseñado para operar las compuertas de forma segura y observar el desfogue de la presa en tiempo real, comprendiendo el comportamiento hidráulico en cada etapa.",
    icon: <Droplets className="w-5 h-5" />,
    videoSrc: "/assets/img/04_Landing_SMART/Videossmart/04_presa.mp4",
  },
];

const INDUSTRIES_DATA: CatalogItem[] = [
  {
    title: "Gas y petróleo",
    desc: "Monitoreo y mantenimiento de instalaciones operativas y ductos.",
    img: "/assets/img/04_Landing_SMART/SMART_INDUSTRIES/induWEB/01_gas.webp",
    href: "/smart-componentes/gas",
  },
  {
    title: "Minería",
    desc: "Modela minas para mejorar la seguridad y optimizar recursos.",
    img: "/assets/img/04_Landing_SMART/SMART_INDUSTRIES/induWEB/02_mine.webp",
    href: "/smart-componentes/mineria",
  },
  {
    title: "Electricidad",
    desc: "Digitaliza redes para detectar fallas y mejorar eficiencia.",
    img: "/assets/img/04_Landing_SMART/SMART_INDUSTRIES/induWEB/03_elec.webp",
    href: "/smart-componentes/electricidad",
  },
  {
    title: "Desarrollo urbano",
    desc: "Simular ciudades, optimizando el uso del espacio y movilidad.",
    img: "/assets/img/04_Landing_SMART/SMART_INDUSTRIES/induWEB/04_desa.webp",
    href: "/smart-componentes/urbano",
  },
  {
    title: "Logística (SILAG)",
    desc: "Simular y optimizar rutas de transporte y gestión de almacenes.",
    img: "/assets/img/04_Landing_SMART/SMART_INDUSTRIES/induWEB/05_silag.webp",
    href: "/smart-componentes/silag",
  },
  {
    title: "Agricultura",
    desc: "Gestionar cultivos mediante datos climáticos y de suelo.",
    img: "/assets/img/04_Landing_SMART/SMART_INDUSTRIES/induWEB/06_agri.webp",
    href: "/smart-componentes/agricultura",
  },
  {
    title: "AEC",
    desc: "La unión de BIM y GIS que transforma tus obras en activos inteligentes y rentables.",
    img: "/assets/img/04_Landing_SMART/SMART_INDUSTRIES/induWEB/07_AEC.webp",
    href: "/smart-componentes/aec",
  },
  {
    title: "Servicios públicos",
    desc: "Datos en tiempo real para optimizar obras de agua y energía.",
    img: "/assets/img/04_Landing_SMART/SMART_INDUSTRIES/induWEB/08_serv.webp",
    href: "/smart-componentes/servicios",
  },
];

const GEOTECH_DATA: GeotechItem[] = [
  {
    code: "GEO-01",
    title: "PROYECTO MÉXICO",
    desc: "Cartografía nacional confiable.",
    tagline: "Infraestructura Base de Datos Geoespaciales",
    fullDesc:
      "Base cartográfica nacional de alta resolución y actualización continua que integra capas sociodemográficas, topográficas, hidrográficas y de infraestructura crítica para cimentar cualquier Gemelo Digital en territorio mexicano.",
    specs: ["Cobertura Nacional 100%", "Capas Multi-escala", "Integración GIS Directa"],
    img: "/assets/img/04_Landing_SMART/Geotecnologias/01_Proyecto_Mexico.webp",
    href: "/proyecto-mexico",
    useCases: [
      {
        sector: "Gobierno y Catastro",
        title: "Modernización Catastral y Recaudación",
        impact: "Identificación precisa de predios y actualización de valores catastrales mediante cruce de capas históricas y actuales.",
      },
      {
        sector: "Infraestructura y Transporte",
        title: "Planeación de Derechos de Vía",
        impact: "Evaluación de factibilidad ambiental, social y topográfica para nuevos trazos carreteros, ferroviarios o energéticos.",
      },
      {
        sector: "Protección Civil",
        title: "Atlas Nacionales de Riesgo",
        impact: "Modelado de zonas vulnerables a inundaciones o deslaves cruzando datos poblacionales e hidrológicos.",
      },
    ],
  },
  {
    code: "GEO-02",
    title: "IMÁGENES 360°",
    desc: "Captura de entornos inmersivos.",
    tagline: "Mobile Mapping & Recorridos Esféricos Georreferenciados",
    fullDesc:
      "Captura fotogramétrica esférica de ultra-alta definición sincronizada con sistemas inerciales y GPS. Permite inspeccionar activos físicos, calles e interiores industriales como si estuvieras en sitio, midiendo directamente sobre la imagen.",
    specs: ["Resolución 8K / 12K HDR", "Georreferenciación Centimétrica", "Medición Fotogramétrica"],
    img: "/assets/img/04_Landing_SMART/Geotecnologias/02_imagenes 360.webp",
    href: "/imagenes-360",
    useCases: [
      {
        sector: "Desarrollo Urbano y Vialidades",
        title: "Inventario Automatizado de Mobiliario Urbano",
        impact: "Detección y geolocalización de luminarias, señalética, baches y estado de pavimento sin interrumpir el tráfico.",
      },
      {
        sector: "Plantas Industriales",
        title: "Auditorías Remotas de Seguridad",
        impact: "Inspección visual de cuartos de máquinas y tuberías para planificar mantenimientos sin exponer al personal.",
      },
      {
        sector: "Telecomunicaciones",
        title: "Censo de Postería y Fibra Óptica",
        impact: "Verificación visual del estado de postes y saturación de cableado aéreo a nivel municipal o estatal.",
      },
    ],
  },
  {
    code: "GEO-03",
    title: "GPR",
    desc: "Detección subterránea.",
    tagline: "Radar de Penetración Terrestre No Destructivo",
    fullDesc:
      "Tecnología geofísica de impulsos electromagnéticos de multifrecuencia capaz de radiografiar el subsuelo. Detecta tuberías metálicas y plásticas, cables, oquedades, filtraciones y estructuras enterradas sin necesidad de excavar.",
    specs: ["Ensayo 100% No Destructivo", "Mapeo 3D Subterráneo", "Detección Metálica y No Metálica"],
    img: "/assets/img/04_Landing_SMART/Geotecnologias/03_GPRW.webp",
    href: "/gpr",
    useCases: [
      {
        sector: "Construcción y Obra Civil",
        title: "Prevención de Rupturas en Excavaciones",
        impact: "Localización exacta de líneas de gas, fibra óptica y alta tensión antes de introducir maquinaria pesada.",
      },
      {
        sector: "Organismos Operadores de Agua",
        title: "Detección de Fugas Fantasma y Socavones",
        impact: "Identificación de zonas con lavado de material o saturación hídrica bajo el asfalto antes de que colapse la vialidad.",
      },
      {
        sector: "Ingeniería Forense y Arqueología",
        title: "Evaluación de Cimentaciones y Estructuras",
        impact: "Verificación de espesores de losas, acero de refuerzo y hallazgo de vestigios sin alterar la superficie.",
      },
    ],
  },
  {
    code: "GEO-04",
    title: "BATIMETRÍA",
    desc: "Análisis subacuático preciso.",
    tagline: "Cartografía Hidrográfica Multihaz y Monohaz",
    fullDesc:
      "Levantamientos acústicos de alta densidad mediante ecosondas avanzadas para modelar con precisión milimétrica la topografía del fondo marino, lechos de ríos, lagos y vasos de almacenamiento en presas.",
    specs: ["Ecosondas Multihaz (MBES)", "Perfilado de Sedimentos", "Modelos Digitales del Fondo"],
    img: "/assets/img/04_Landing_SMART/Geotecnologias/04_BatimetriaW.webp",
    href: "/batimetria",
    useCases: [
      {
        sector: "Hidroeléctricas y CONAGUA",
        title: "Cálculo de Azolve y Capacidad Útil en Presas",
        impact: "Determinación exacta del volumen de sedimentos acumulados para optimizar la vida útil y operación del embalse.",
      },
      {
        sector: "Puertos y Marina Mercante",
        title: "Control de Dragado y Navegación Segura",
        impact: "Certificación de calados oficiales en canales de navegación y muelles de atraque.",
      },
      {
        sector: "Offshore & Energía",
        title: "Inspección de Ductos y Cimentaciones Submarinas",
        impact: "Evaluación de socavación en pilotes de puentes y estado de tuberías subacuáticas.",
      },
    ],
  },
  {
    code: "GEO-05",
    title: "LiDAR AÉREO",
    desc: "Modelos 3D con láser aéreo.",
    tagline: "Escaneo Láser Aerotransportado de Gran Escala",
    fullDesc:
      "Captura masiva de nubes de puntos tridimensionales desde aeronaves o drones pesados. Su capacidad de multi-retorno permite atravesar el dosel de vegetación densa para obtener el Modelo Digital del Terreno (MDT) real con precisión centimétrica.",
    specs: ["Penetración de Vegetación", "Millones de Puntos/Seg", "Modelos MDT y MDS Exactos"],
    img: "/assets/img/04_Landing_SMART/Geotecnologias/05_LiDAR_aereoW.webp",
    href: "/lidar-aereo",
    useCases: [
      {
        sector: "Sector Eléctrico (CFE / Transmisión)",
        title: "Análisis de Brecha Forestal en Líneas de Alta Tensión",
        impact: "Detección automática de árboles con riesgo de contacto en cables y cálculo de catenarias térmicas.",
      },
      {
        sector: "Vías Férreas y Autopistas",
        title: "Topografía de Corredores en Zonas Selva/Montaña",
        impact: "Levantamiento de cientos de kilómetros en días, revelando la topografía exacta bajo la maleza.",
      },
      {
        sector: "Hidrología y Cuencas",
        title: "Simulación Hidrodinámica de Inundaciones",
        impact: "Generación de micro-relieve de llanuras de inundación para predecir el comportamiento del agua ante huracanes.",
      },
    ],
  },
  {
    code: "GEO-06",
    title: "LiDAR TERRESTRE",
    desc: "Escaneo tridimensional de superficie.",
    tagline: "Digitalización Milimétrica de Activos e Instalaciones",
    fullDesc:
      "Escáneres láser fijos y móviles (SLAM) que capturan la geometría exacta de plantas industriales, edificios históricos, túneles y subestaciones para generar modelos As-Built listos para ingeniería inversa y BIM.",
    specs: ["Precisión Milimétrica (±2mm)", "Tecnología Estática y SLAM", "Nube de Puntos a color HDR"],
    img: "/assets/img/04_Landing_SMART/Geotecnologias/06_LiDAR terrestre.webp",
    href: "/lidar-terrestre",
    useCases: [
      {
        sector: "Oil & Gas y Manufactura",
        title: "Ingeniería Inversa y Modelos As-Built (Scan-to-BIM)",
        impact: "Digitalización de cuartos de bombas y refinerías para detectar colisiones antes de fabricar nuevas tuberías.",
      },
      {
        sector: "Minería Subterránea y Túneles",
        title: "Control Volumétrico y Estabilidad de Galerías",
        impact: "Comparación periódica de escaneos para detectar deformaciones milimétricas o desprendimientos en bóvedas.",
      },
      {
        sector: "Construcción Vertical (AEC)",
        title: "Control de Calidad de Obra y Planicidad de Losas",
        impact: "Verificación en tiempo real de desplomes de columnas y nivelación contra el plano ejecutivo.",
      },
    ],
  },
  {
    code: "GEO-07",
    title: "VANT (DRONES)",
    desc: "Vehículos aéreos para exploración.",
    tagline: "Flota Autónoma de Grado Industrial y Largo Alcance",
    fullDesc:
      "Operación de aeronaves no tripuladas de ala fija, multirrotor y VTOL diseñadas para misiones críticas en topografía, vigilancia perimetral e inspección de estructuras de difícil acceso con posicionamiento RTK/PPK.",
    specs: ["Vuelos BVLOS y Autónomos", "Posicionamiento RTK Centimétrico", "Despliegue Rápido en Campo"],
    img: "/assets/img/04_Landing_SMART/Geotecnologias/07_VANT(drones).webp",
    href: "/vant",
    useCases: [
      {
        sector: "Minería a Cielo Abierto y Agregados",
        title: "Cálculo de Volúmenes y Conciliación de Inventarios",
        impact: "Cubicaciones exactas de bancos de material y pilas de mineral en una fracción del tiempo tradicional.",
      },
      {
        sector: "Infraestructura Crítica",
        title: "Inspección de Cortinas de Presas, Puentes y Antenas",
        impact: "Detección de fisuras estructurales o corrosión a gran altura sin necesidad de andamios ni paros operativos.",
      },
      {
        sector: "Grandes Desarrollos de Ingeniería",
        title: "Seguimiento Cronológico de Avance de Obra",
        impact: "Ortofotos actualizadas semanalmente integradas al Gemelo Digital para control de contratistas.",
      },
    ],
  },
  {
    code: "GEO-08",
    title: "SENSORES DRONES",
    desc: "Monitoreo y mapeo aéreo.",
    tagline: "Cargas Útiles Multiespectrales, Térmicas y Gasodetección",
    fullDesc:
      "Integración de cámaras radiométricas infrarrojas, sensores multiespectrales, hiperespectrales y detectores láser de metano (OGI) que amplían la visión humana para diagnosticar anomalías invisibles a simple vista.",
    specs: ["Termografía Radiométrica", "Cámaras Multiespectrales", "Detección Óptica de Gases"],
    img: "/assets/img/04_Landing_SMART/Geotecnologias/08_Sensores drones.webp",
    href: "/sensores-drones",
    useCases: [
      {
        sector: "Energía Solar y Eléctrica",
        title: "Detección de Puntos Calientes (Hotspots)",
        impact: "Identificación inmediata de celdas fotovoltaicas dañadas o sobrecalentamiento en transformadores y aisladores.",
      },
      {
        sector: "Agroindustria y Silvicultura",
        title: "Índices de Vigor Vegetal (NDVI) y Estrés Hídrico",
        impact: "Focalización de riego y fertilizantes mediante el análisis espectral de la salud de cada hectárea.",
      },
      {
        sector: "Ductos y Petroquímica",
        title: "Monitoreo de Fugas de Hidrocarburos y Gas Metano",
        impact: "Trazado aéreo de plumas de gas o derrames incipientes a lo largo de kilómetros de derecho de vía.",
      },
    ],
  },
  {
    code: "GEO-09",
    title: "SENSORES IoT/IIoT",
    desc: "Monitoreo en tiempo real.",
    tagline: "Telemetría Industrial y Redes de Sensores Conectados",
    fullDesc:
      "Ecosistema de sensores industriales interconectados que miden variables físicas (vibración, inclinación, presión, caudal, temperatura, gases y nivel) y las transmiten en tiempo real al Gemelo Digital para activar alertas predictivas.",
    specs: ["Protocolos MQTT / LoRaWAN / OPC-UA", "Integración con SCADA", "Alertas Predictivas 24/7"],
    img: "/assets/img/04_Landing_SMART/Geotecnologias/09_Sensores IoT.webp",
    href: "/sensores-iot",
    useCases: [
      {
        sector: "Presas, Puentes y Edificios",
        title: "Monitoreo de Salud Estructural (SHM)",
        impact: "Acelerómetros y piezómetros midiendo en vivo el comportamiento sísmico y la presión intersticial de la obra.",
      },
      {
        sector: "Redes Hidráulicas Municipales",
        title: "Gestión Inteligente de Presiones y Caudales",
        impact: "Sectorización automática y detección instantánea de caídas de presión por fugas o tomas clandestinas.",
      },
      {
        sector: "Industria 4.0 y Cuartos de Control",
        title: "Mantenimiento Predictivo de Maquinaria Crítica",
        impact: "Análisis de firmas de vibración y temperatura en turbinas y bombas para anticipar fallas antes del paro.",
      },
    ],
  },
  {
    code: "GEO-10",
    title: "SENSORES CCTV",
    desc: "Imágenes ópticas precisas.",
    tagline: "Video Analítica con Inteligencia Artificial y Visión Computacional",
    fullDesc:
      "Sistemas ópticos y térmicos PTZ de largo alcance fusionados con algoritmos de visión artificial que convierten el video en metadatos estructurados dentro del espacio 3D del Gemelo Digital.",
    specs: ["Analítica de Video con IA", "Cámaras PTZ y Térmicas", "Georreferenciación de Eventos"],
    img: "/assets/img/04_Landing_SMART/Geotecnologias/10_Sensores CCTV.webp",
    href: "/sensores-cctv",
    useCases: [
      {
        sector: "Seguridad Industrial (HSE)",
        title: "Detección de EPP y Zonas de Exclusión",
        impact: "Alertas automáticas si un trabajador ingresa a un área de maniobras sin casco, chaleco o autorización.",
      },
      {
        sector: "Movilidad Urbana y Peajes",
        title: "Aforo Vehicular, Clasificación y Lectura LPR",
        impact: "Monitoreo de flujos de tránsito en tiempo real para sincronización semafórica y gestión de incidentes.",
      },
      {
        sector: "Instalaciones Estratégicas",
        title: "Vigilancia Perimetral Todo-Clima",
        impact: "Detección temprana de intrusiones o conatos de incendio en subestaciones, puertos y almacenes.",
      },
    ],
  },
  {
    code: "GEO-11",
    title: "SISTEMAS AR/VR",
    desc: "Experiencias inmersivas.",
    tagline: "Realidad Extendida (XR) para Entrenamiento y Operación en Campo",
    fullDesc:
      "Entornos de Realidad Virtual (VR), Realidad Aumentada (AR) y Realidad Mixta (MR) que conectan al operador con el Gemelo Digital para simular maniobras de alto riesgo o superponer infraestructura oculta sobre el mundo real.",
    specs: ["Simuladores de Entrenamiento VR", "Superposición AR en Campo", "Colaboración Multi-usuario"],
    img: "/assets/img/04_Landing_SMART/Geotecnologias/11_Sistemas AR_VR_MR.webp",
    href: "/sistemas-ar-vr",
    useCases: [
      {
        sector: "Energía, Hidroeléctricas y Petróleo",
        title: "Simuladores de Capacitación en Maniobras Críticas",
        impact: "Entrenamiento paso a paso en apertura de válvulas, desfogue o protocolos de emergencia sin riesgo real.",
      },
      {
        sector: "Mantenimiento y Servicios Públicos",
        title: "Visión de Rayos X en Campo con Realidad Aumentada",
        impact: "Visualización de tuberías subterráneas y manuales técnicos mediante tablets o lentes inteligentes en sitio.",
      },
      {
        sector: "Arquitectura e Ingeniería (AEC)",
        title: "Revisión de Diseño y Aprobación Ejecutiva",
        impact: "Recorridos a escala 1:1 de proyectos antes de colocar la primera piedra para optimizar decisiones.",
      },
    ],
  },
  {
    code: "GEO-12",
    title: "MODELADO 3D",
    desc: "Modelos digitales para diseño.",
    tagline: "Convergencia BIM + GIS + Motores Gráficos en Tiempo Real",
    fullDesc:
      "Transformación de nubes de puntos, planos CAD y datos GIS en mallas tridimensionales semánticas, fotorrealistas y optimizadas para ejecutarse de forma fluida en la web y en centros de mando.",
    specs: ["Integración Nativa BIM + GIS", "Estándares IFC / 3D Tiles", "Renderizado en Tiempo Real"],
    img: "/assets/img/04_Landing_SMART/Geotecnologias/12_Modelado 3D.webp",
    href: "/modelado-3d",
    useCases: [
      {
        sector: "Ciudades Inteligentes (Smart Cities)",
        title: "Gemelos Digitales Urbanos para Planeación",
        impact: "Simulación de impacto visual, sombras, islas de calor y densificación urbana en modelos de ciudades completas.",
      },
      {
        sector: "Facility Management",
        title: "Gestión Integral del Ciclo de Vida del Activo",
        impact: "Cada elemento 3D (válvula, luminaria, motor) contiene su ficha técnica, historial de mantenimiento y telemetría.",
      },
      {
        sector: "Hidráulica y Minería",
        title: "Simulación Visual de Procesos Físicos",
        impact: "Representación dinámica de flujos de agua, niveles de embalses y secuencias de excavación.",
      },
    ],
  },
  {
    code: "GEO-13",
    title: "GNSS / GPS",
    desc: "Posicionamiento global de alta precisión.",
    tagline: "Geodesia Satelital y Redes de Estaciones de Referencia Continua",
    fullDesc:
      "Infraestructura de posicionamiento satelital multi-constelación (GPS, GLONASS, Galileo, BeiDou) con correcciones en tiempo real (RTK/NTRIP) que garantiza que cada dato del Gemelo Digital esté anclado a su coordenada exacta.",
    specs: ["Precisión Milimétrica / Centimétrica", "Correcciones RTK en Tiempo Real", "Monitoreo Geodésico Continuo"],
    img: "/assets/img/04_Landing_SMART/Geotecnologias/13_GNSS_GPSW.webp",
    href: "/gnss-gps",
    useCases: [
      {
        sector: "Grandes Estructuras y Geotecnia",
        title: "Control de Desplazamientos y Subsidencia",
        impact: "Detección continua de hundimientos diferenciales o movimientos milimétricos en taludes y cortinas de presas.",
      },
      {
        sector: "Logística, Puertos y Minería",
        title: "Guiado de Maquinaria Pesada y Flotas (SILAG)",
        impact: "Rastreo de alta precisión de grúas, camiones de acarreo y contenedores en patios logísticos.",
      },
      {
        sector: "Cartografía e Ingeniería Civil",
        title: "Redes Geodésicas Oficiales de Proyecto",
        impact: "Homologación del marco de referencia espacial para que todos los contratistas trabajen sobre la misma base.",
      },
    ],
  },
  {
    code: "GEO-14",
    title: "REDES DE COMUNICACIÓN",
    desc: "Infraestructura de conectividad en tiempo real.",
    tagline: "Telecomunicaciones de Misión Crítica para Entornos Remotos",
    fullDesc:
      "Diseño e implementación de la columna vertebral de conectividad (enlaces microondas, redes privadas LTE/5G, fibra óptica, malla industrial y enlace satelital) que transporta los datos desde el campo hasta el centro de control.",
    specs: ["Baja Latencia y Alta Disponibilidad", "Conectividad Híbrida (Satelital/Fibra/RF)", "Ciberseguridad Industrial"],
    img: "/assets/img/04_Landing_SMART/Geotecnologias/14_Redes de ComunicaciónW.webp",
    href: "/redes-comunicacion",
    useCases: [
      {
        sector: "Presas, Minas y Campos Petroleros",
        title: "Conectividad Total en Zonas Sin Cobertura Comercial",
        impact: "Transmisión ininterrumpida de video y telemetría desde cañones, sierras o instalaciones offshore.",
      },
      {
        sector: "Centros de Mando y Control",
        title: "Integración de Salas de Crisis en Tiempo Real",
        impact: "Sincronización de baja latencia entre operadores en campo y tomadores de decisiones corporativos.",
      },
      {
        sector: "Automatización Industrial",
        title: "Redes Inalámbricas Privadas de Alta Confiabilidad",
        impact: "Soporte para miles de sensores IoT y vehículos autónomos operando simultáneamente sin interferencias.",
      },
    ],
  },
];

const FAQS_DATA: FaqItem[] = [
  {
    pregunta: "¿Qué necesito para empezar a crear un Gemelo Digital?",
    respuesta:
      "El proceso comienza con la recopilación de datos de tu entorno físico. Utilizamos sensores IoT, drones y escáneres láser. Nosotros nos encargamos de toda la integración inicial.",
  },
  {
    pregunta: "¿En qué industrias tiene mayor impacto Smart Twin?",
    respuesta:
      "Es altamente efectivo en sectores con infraestructura crítica, como Minería, Energía y Petróleo & Gas, donde la simulación reduce riesgos financieros.",
  },
  {
    pregunta: "¿Es posible conectar sensores que ya tenemos instalados?",
    respuesta:
      "Absolutamente. Smart Twin cuenta con arquitectura abierta que permite la ingesta de telemetría proveniente de sistemas SCADA y redes IoT preexistentes.",
  },
];

// ============================================================================
// 2. SUB-COMPONENTES UI REUTILIZABLES (TARJETAS + MODAL PORTAL)
// ============================================================================
const CinematicCard = ({
  item,
  onSelect,
}: {
  item: GeotechItem;
  onSelect: (item: GeotechItem) => void;
}) => (
  <div
    onClick={() => onSelect(item)}
    className="relative w-[300px] h-[400px] md:w-[400px] md:h-[450px] rounded-[2.5rem] overflow-hidden group flex-shrink-0 border border-white/10 hover:border-[#00ffff]/50 shadow-xl bg-slate-800 cursor-pointer transition-colors duration-500"
  >
    <Image
      src={item.img}
      alt={item.title}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

    <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
      <span className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/15 font-mono text-[10px] font-bold text-[#00ffff] tracking-widest uppercase">
        {item.code}
      </span>
      <span className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10 text-[10px] font-poppins font-semibold text-slate-300">
        {item.useCases.length} Casos Reales
      </span>
    </div>

    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
      <h3 className="font-black text-white text-2xl md:text-3xl leading-tight mb-2 group-hover:text-[#00ffff] transition-colors">
        {item.title}
      </h3>
      <p className="text-slate-300 text-sm mb-6 opacity-90">{item.desc}</p>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(item);
        }}
        className="w-full py-3 md:py-4 bg-[#0B3D91]/80 backdrop-blur-md text-white border border-[#00ffff]/30 font-bold rounded-2xl group-hover:bg-[#00ffff] group-hover:text-[#0B3D91] transition-all duration-300 flex items-center justify-center gap-2 group-hover:-translate-y-1 text-xs md:text-sm uppercase tracking-widest shadow-lg"
      >
        <span>Explorar Solución</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  </div>
);

const ResponsiveGridCard = ({
  item,
  onSelect,
}: {
  item: GeotechItem;
  onSelect: (item: GeotechItem) => void;
}) => (
  <button
    type="button"
    onClick={() => onSelect(item)}
    className="block w-full h-full group outline-none text-left cursor-pointer"
  >
    {/* Vista Móvil */}
    <div className="md:hidden relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#00ffff]/50 shadow-lg bg-slate-800">
      <Image
        src={item.img}
        alt={item.title}
        fill
        className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
      <div className="absolute top-2.5 left-2.5">
        <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-sm border border-[#00ffff]/30 font-mono text-[9px] font-bold text-[#00ffff]">
          {item.code}
        </span>
      </div>
      <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end">
        <div className="flex justify-between items-end gap-2">
          <div>
            <h3 className="font-bold text-white text-xs sm:text-sm leading-tight group-hover:text-[#00ffff] transition-colors">
              {item.title}
            </h3>
            <span className="text-[10px] text-slate-300/80 block mt-0.5 line-clamp-1">
              Ver casos de uso
            </span>
          </div>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0B3D91]/90 backdrop-blur-sm flex items-center justify-center border border-[#00ffff]/40 flex-shrink-0 group-hover:bg-[#00ffff] transition-colors">
            <ArrowRight className="w-3.5 h-3.5 text-white group-hover:text-[#0B3D91]" />
          </div>
        </div>
      </div>
    </div>

    {/* Vista Escritorio */}
    <div className="hidden md:block relative w-full h-[360px] xl:h-[380px] rounded-[2rem] overflow-hidden border border-white/10 group-hover:border-[#00ffff]/50 shadow-xl bg-slate-800 transition-colors">
      <Image
        src={item.img}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
      <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
        <span className="px-2.5 py-1 rounded-full bg-slate-950/75 backdrop-blur-md border border-white/15 font-mono text-[10px] font-bold text-[#00ffff]">
          {item.code}
        </span>
      </div>
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="font-black text-white text-xl leading-tight mb-2 group-hover:text-[#00ffff] transition-colors">
          {item.title}
        </h3>
        <p className="text-slate-300 text-xs mb-4 opacity-90 line-clamp-2">
          {item.desc}
        </p>
        <div className="w-full py-3 bg-[#0B3D91]/80 backdrop-blur-md text-white border border-[#00ffff]/30 font-bold rounded-xl group-hover:bg-[#00ffff] group-hover:text-[#0B3D91] transition-all duration-300 flex items-center justify-center gap-2 group-hover:-translate-y-1 text-xs uppercase tracking-widest">
          <span>Ficha & Casos</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  </button>
);

// ============================================================================
// 2.1 VENTANA DESPLEGABLE CON REACT PORTAL (NUNCA QUEDA DETRÁS DEL CONTENIDO)
// ============================================================================
const GeotechSpotlightModal = ({
  item,
  onClose,
  onSelectOther,
}: {
  item: GeotechItem | null;
  onClose: () => void;
  onSelectOther: (item: GeotechItem) => void;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloquear scroll del body cuando está abierto y permitir cerrar con ESC
  useEffect(() => {
    if (!item) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!mounted) return null;

  const currentIndex = item
    ? GEOTECH_DATA.findIndex((g) => g.code === item.code)
    : -1;
  const prevItem =
    currentIndex >= 0
      ? GEOTECH_DATA[
          (currentIndex - 1 + GEOTECH_DATA.length) % GEOTECH_DATA.length
        ]
      : null;
  const nextItem =
    currentIndex >= 0
      ? GEOTECH_DATA[(currentIndex + 1) % GEOTECH_DATA.length]
      : null;

  // Renderizamos en document.body mediante Portal para romper cualquier stacking context
  return createPortal(
    <AnimatePresence>
      {item && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop oscuro: tocar en cualquier parte alrededor cierra el modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md cursor-pointer"
          />

          {/* Ventana Flotante Centrada (Compacta tanto en Móvil como en PC) */}
          <motion.div
            key={item.code}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 330, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-[92vw] max-w-3xl max-h-[78dvh] sm:max-h-[82vh] bg-slate-900 border border-[#00ffff]/40 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col text-white"
          >
            {/* ================================================================
                BARRA SUPERIOR FIJA (SIEMPRE VISIBLE EN MÓVIL Y PC)
            ================================================================ */}
            <div className="shrink-0 bg-slate-950 px-4 py-3 sm:px-6 sm:py-3.5 border-b border-white/10 flex items-center justify-between gap-2 z-20">
              <div className="flex items-center gap-2 min-w-0">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00ffff]/10 border border-[#00ffff]/30 font-mono text-[10px] sm:text-xs font-bold text-[#00ffff] shrink-0">
                  <Radio className="w-3 h-3 animate-pulse" />
                  {item.code}
                </span>
                <span className="font-mono text-[11px] text-slate-400">
                  {String(currentIndex + 1).padStart(2, "0")} /{" "}
                  {String(GEOTECH_DATA.length).padStart(2, "0")}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar ventana"
                className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-[#00ffff] text-white hover:text-[#0B3D91] border border-[#00ffff]/40 flex items-center gap-1.5 text-xs font-bold transition-all active:scale-95 cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Cerrar</span>
              </button>
            </div>

            {/* ================================================================
                CUERPO SCROLLABLE COMPACTO (IMAGEN CONTROLADA + CASOS DE USO)
            ================================================================ */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 overscroll-contain">
              {/* Bloque Superior: Miniatura Proporcionada + Resumen */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center bg-slate-950/60 border border-white/10 rounded-2xl p-3.5 sm:p-4">
                {/* Imagen enmarcada con altura controlada para que no se vea gigante ni en móvil ni en PC */}
                <div className="relative w-full sm:w-48 md:w-56 h-36 sm:h-36 md:h-40 rounded-xl overflow-hidden bg-slate-900 border border-white/15 shrink-0">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />
                  <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ffff]/80 to-transparent pointer-events-none"
                  />
                </div>

                {/* Texto y Especificaciones */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#00ffff] block mb-1">
                    {item.tagline}
                  </span>
                  <h2 className="font-black text-xl sm:text-2xl text-white tracking-tight leading-tight mb-2">
                    {item.title}
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                    {item.fullDesc}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {item.specs.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-[#0B3D91]/40 border border-[#00ffff]/25 text-[10px] sm:text-[11px] font-poppins font-semibold text-slate-100 flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-[#00ffff] shrink-0" />
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bloque Inferior: Casos de Uso Reales */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00ffff] mb-3">
                  <Target className="w-4 h-4" />
                  <span>Casos de Uso Reales en Proyectos</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {item.useCases.map((uCase, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl bg-slate-800/50 hover:bg-slate-800/90 border border-white/10 hover:border-[#00ffff]/35 p-3.5 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#00ffff]/10 text-[#00ffff] border border-[#00ffff]/20 truncate">
                          {uCase.sector}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-slate-500">
                          0{idx + 1}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-xs sm:text-sm mb-1 leading-snug">
                        {uCase.title}
                      </h4>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {uCase.impact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ================================================================
                PIE FIJO: NAVEGACIÓN ENTRE GEOTECNOLOGÍAS + BOTÓN CERRAR
            ================================================================ */}
            <div className="shrink-0 bg-slate-950 px-4 py-3 sm:px-6 sm:py-3.5 border-t border-white/10 flex items-center justify-between gap-2 z-20">
              <div className="flex items-center gap-2 flex-1 sm:flex-initial">
                {prevItem && (
                  <button
                    type="button"
                    onClick={() => onSelectOther(prevItem)}
                    className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#00ffff] shrink-0" />
                    <span className="truncate max-w-[85px] sm:max-w-[130px]">
                      {prevItem.title}
                    </span>
                  </button>
                )}
                {nextItem && (
                  <button
                    type="button"
                    onClick={() => onSelectOther(nextItem)}
                    className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="truncate max-w-[85px] sm:max-w-[130px]">
                      {nextItem.title}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#00ffff] shrink-0" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#0B3D91] hover:bg-[#00ffff] text-white hover:text-[#0B3D91] font-bold text-xs uppercase tracking-wider border border-[#00ffff]/30 transition-all cursor-pointer shrink-0"
              >
                Listo
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const AnimatedResponse = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const words = text.split(" ");
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
  };
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 15, stiffness: 100 },
    },
  };

  return (
    <motion.p
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={wordVariants}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

// ============================================================================
// 3. SECCIÓN 1: FONDO AMBIENTAL "CLEAN LAB" + MALLA 3D
// ============================================================================
const LightTechBackground = () => (
  <div className="fixed inset-0 z-[-1] bg-slate-50 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(11,61,145,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(11,61,145,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_30%,transparent_100%)]" />
    <motion.div
      animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
      transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      className="absolute top-[10%] left-[10%] w-96 h-96 bg-[#0B3D91] rounded-full mix-blend-multiply filter blur-[120px] opacity-[0.08]"
    />
    <motion.div
      animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
      transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
      className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] bg-[#00ffff] rounded-full mix-blend-multiply filter blur-[150px] opacity-[0.15]"
    />
  </div>
);

// ============================================================================
// 4. SECCIÓN 2: HERO PRINCIPAL SMART TWIN
// ============================================================================
const HeroSmartTwin = () => (
  <section className="relative w-full min-h-[100dvh] md:min-h-[800px] md:aspect-[16/9] max-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
    <div className="absolute inset-0 z-0">
      <motion.img
        src={HERO_IMAGES.mobile}
        alt="Smart Twin (Móvil)"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-full h-full object-cover block md:hidden"
      />
      <motion.img
        src={HERO_IMAGES.desktop}
        alt="Smart Twin (Escritorio)"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-full h-full object-cover hidden md:block"
      />
      <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent z-10" />
    </div>

    <div className="relative z-20 max-w-7xl mx-auto px-8 w-full mt-28 mb-24 sm:mb-32 md:mb-0 md:mt-20">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="font-bold text-[#00ffff] tracking-[0.3em] uppercase mb-6 block text-sm border-l-2 border-[#00ffff] pl-4 drop-shadow-md">
          Gemelos Digitales
        </span>
        <h1 className="font-black text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tighter leading-none mb-6">
          SMART <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00ffff]/70">
            TWIN®
          </span>
        </h1>
        <p className="text-white/80 text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed font-light mb-10">
          Optimiza y simula entornos con nuestra tecnología avanzada para la
          toma de decisiones estratégicas en un ecosistema claro y preciso.
        </p>
      </motion.div>
    </div>

    <a
      href="#capacidades"
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-[#00ffff]/70 animate-bounce cursor-pointer"
    >
      <span className="text-xs tracking-widest uppercase">Explorar</span>
      <ChevronDown className="w-5 h-5 text-white/80" />
    </a>
  </section>
);

// ============================================================================
// 5. SECCIÓN 3: CAPACIDADES CORE (TABS DE VIDEO)
// ============================================================================
const UnifiedVideoShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);
  const currentData = CAPABILITIES_TABS[activeTab];

  return (
    <section className="py-24 px-6 md:px-8 relative z-10" id="capacidades">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-md p-2 rounded-full border border-slate-200 shadow-sm flex gap-2">
            {CAPABILITIES_TABS.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeTab === idx
                    ? "bg-[#0B3D91] text-white shadow-md"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab.tabName}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="w-full lg:col-span-6 relative aspect-[4/3] lg:aspect-square max-h-[500px] rounded-[3rem] overflow-hidden shadow-2xl shadow-[#0B3D91]/10 group border-4 border-white z-0 lg:mr-[-60px]">
              <video
                key={currentData.videoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={currentData.videoSrc} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D91]/30 to-transparent pointer-events-none mix-blend-overlay" />
            </div>

            <div className="w-full lg:col-span-6 bg-white/95 backdrop-blur-3xl border border-slate-100 p-8 lg:p-14 rounded-[3rem] shadow-2xl shadow-slate-200/60 flex flex-col justify-center z-10">
              <h2 className="font-black text-3xl lg:text-4xl text-slate-900 mb-4 leading-tight tracking-tighter">
                {currentData.title}
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                {currentData.desc}
              </p>
              <div className="space-y-4">
                {currentData.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="text-[#0B3D91] bg-white shadow-sm p-3 rounded-2xl group-hover:bg-[#0B3D91] group-hover:text-white transition-colors duration-300">
                      {feat.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 mb-1">
                        {feat.title}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// ============================================================================
// 6. SECCIÓN 4: VISOR INTERACTIVO PRESA BELISARIO DOMÍNGUEZ
// ============================================================================
const IntegratedTwinViewer = () => {
  const [activeTag, setActiveTag] = useState<TwinTag>(TWIN_VIEWER_TAGS[0]);
  const [isHudOpen, setIsHudOpen] = useState(false);

  const getCameraTransform = () => {
    if (!isHudOpen) return { scale: 1, x: "0%", y: "0%" };
    const offsetX = Math.max(-18, Math.min(18, (50 - activeTag.x) * 0.55));
    const offsetY = Math.max(-18, Math.min(18, (50 - activeTag.y) * 0.55));
    return {
      scale: 1.38,
      x: `${offsetX}%`,
      y: `${offsetY}%`,
    };
  };

  const handleSelectTag = (tag: TwinTag, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveTag(tag);
    setIsHudOpen(true);
  };

  const handleResetCamera = () => {
    setIsHudOpen(false);
  };

  return (
    <section
      className="py-16 md:py-24 px-4 sm:px-6 md:px-8 relative z-10 bg-slate-900 overflow-hidden"
      onClick={handleResetCamera}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ffff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0B3D91]/25 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <span className="font-bold text-[#00ffff] tracking-[0.3em] uppercase text-xs mb-3 block">
            Visualización, Interfaces & Entrenamiento Digital
          </span>
          <h2 className="font-black text-3xl sm:text-4xl md:text-5xl text-white mb-4 uppercase tracking-tighter">
            Smart Twin: Presa “EOS : Electricidad”
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto text-sm md:text-base mb-8 leading-relaxed">
            Permite realizar un recorrido virtual por toda el área de la presa y
            del cuarto de control, monitorear y comprender su funcionamiento
            etapa por etapa visualizando datos en tiempo real (temperatura,
            vibración, humedad, etc.), así como operar las compuertas y observar
            el desfogue de la presa.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-2.5 md:gap-6 max-w-4xl mx-auto mb-6">
            {TWIN_VIEWER_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-3 bg-slate-800/60 backdrop-blur-md border border-slate-700/80 rounded-full px-5 py-2.5 shadow-md"
              >
                <div className="text-[#00ffff]">{step.icon}</div>
                <span className="text-xs md:text-sm font-bold text-white tracking-wide">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex flex-col lg:flex-row gap-6 lg:gap-8 bg-slate-800/50 backdrop-blur-2xl rounded-[2rem] sm:rounded-[2.5rem] p-3.5 sm:p-6 lg:p-8 shadow-2xl border border-white/10 items-stretch"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full lg:w-2/3 flex flex-col justify-between gap-3">
            <div className="flex flex-wrap justify-between items-center gap-2 px-1">
              <div className="bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10 flex items-center gap-2 shadow-md">
                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffff] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#00ffff]" />
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-white tracking-wider uppercase">
                  {isHudOpen
                    ? `Enfocando: ${activeTag.shortName}`
                    : "Vista General • Presa "}
                </span>
              </div>

              {isHudOpen ? (
                <button
                  onClick={handleResetCamera}
                  className="bg-slate-900/90 hover:bg-slate-800 text-[#00ffff] border border-[#00ffff]/40 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Maximize2 className="w-3 h-3" /> Vista General
                </button>
              ) : (
                <div className="hidden sm:flex bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#00ffff]/30 items-center gap-2 shadow-md">
                  <span className="text-[10px] font-poppins font-semibold text-[#00ffff] tracking-wide uppercase">
                    Telemetría: Temp • Vibración • Humedad
                  </span>
                </div>
              )}
            </div>

            <div
              className="relative w-full aspect-[16/9] bg-slate-950 rounded-[1.25rem] sm:rounded-[1.75rem] overflow-hidden border border-slate-700/70 shadow-2xl cursor-grab active:cursor-grabbing"
              onClick={handleResetCamera}
            >
              <motion.div
                animate={getCameraTransform()}
                transition={{ type: "spring", stiffness: 180, damping: 26 }}
                className="relative w-full h-full"
              >
                <Image
                  src="/assets/img/04_Landing_SMART/presa_smart.png"
                  alt="Gemelo Digital Presa Belisario Domínguez - La Angostura"
                  fill
                  priority
                  className="object-cover pointer-events-none"
                />

                {TWIN_VIEWER_TAGS.map((tag) => {
                  const isSelected = activeTag.id === tag.id && isHudOpen;
                  const isRightSide = tag.x > 65;

                  return (
                    <div
                      key={tag.id}
                      className="absolute z-20 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin"
                      style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
                      onClick={(e) => handleSelectTag(tag, e)}
                    >
                      {isSelected && (
                        <span className="absolute -inset-2.5 rounded-full border border-dashed border-[#00ffff] animate-[spin_8s_linear_infinite] pointer-events-none" />
                      )}

                      <div
                        className={`absolute w-7 h-[1.5px] ${
                          isSelected
                            ? "bg-[#00ffff] shadow-[0_0_8px_#00ffff]"
                            : "bg-white/40"
                        } ${
                          isRightSide
                            ? "rotate-45 -translate-x-4"
                            : "-rotate-45 translate-x-4"
                        } -translate-y-3 transition-all duration-300 hidden sm:block`}
                      />

                      <motion.div
                        animate={
                          isSelected
                            ? { scale: [0.9, 1.05, 0.9] }
                            : { scale: isHudOpen ? 0.82 : 1 }
                        }
                        transition={
                          isSelected
                            ? { repeat: Infinity, duration: 2 }
                            : { duration: 0.3 }
                        }
                        className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.85)] transition-colors duration-300 border-2 ${
                          isSelected
                            ? "bg-[#00ffff] text-[#0B3D91] border-white"
                            : "bg-slate-900/90 text-white border-[#00ffff]/70 hover:border-white hover:bg-slate-800"
                        }`}
                      >
                        <span className="font-black text-xs">{tag.id}</span>
                        {isSelected && (
                          <span className="absolute w-full h-full rounded-full border-2 border-[#00ffff] animate-ping opacity-75" />
                        )}
                      </motion.div>

                      <span
                        className={`hidden md:block absolute ${
                          isRightSide ? "right-10" : "left-10"
                        } whitespace-nowrap px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-wider uppercase transition-all pointer-events-none shadow-xl ${
                          isSelected
                            ? "bg-[#00ffff] text-[#0B3D91] opacity-100 scale-90"
                            : "bg-slate-900/95 text-white border border-white/15 opacity-0 group-hover/pin:opacity-100"
                        }`}
                      >
                        {tag.shortName}
                      </span>
                    </div>
                  );
                })}
              </motion.div>

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(15,23,42,0.75)_100%)] pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_35px_rgba(15,23,42,0.9)] pointer-events-none" />

              <AnimatePresence>
                {!isHudOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="lg:hidden absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 bg-slate-950/85 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#00ffff]/40 pointer-events-none whitespace-nowrap shadow-lg"
                  >
                    <span className="text-[9px] font-bold text-[#00ffff] uppercase tracking-wider animate-pulse">
                      Toca un nodo para acercar cámara y abrir HUD
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-1.5 shadow-xl relative z-30">
              {TWIN_VIEWER_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  onClick={(e) => handleSelectTag(tag, e)}
                  className={`px-2.5 py-2 sm:px-3 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 sm:gap-2 ${
                    activeTag.id === tag.id
                      ? "bg-[#00ffff] text-[#0B3D91] shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                  }`}
                >
                  <span className="opacity-70 font-mono">0{tag.id}.</span>
                  <span className="truncate">{tag.shortName}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {isHudOpen && (
                <motion.div
                  key={`mobile-hud-${activeTag.id}`}
                  initial={{ opacity: 0, y: -12, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -12, height: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className="lg:hidden relative overflow-hidden"
                >
                  <div className="w-16 h-1 bg-[#00ffff] mx-auto rounded-full mb-2 shadow-[0_0_12px_#00ffff]" />

                  <div className="relative bg-slate-900/90 backdrop-blur-xl border border-[#00ffff]/40 rounded-[1.5rem] p-4 sm:p-5 shadow-[0_10px_40px_rgba(0,255,255,0.12)]">
                    <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00ffff] rounded-tl-[1.5rem] pointer-events-none" />
                    <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00ffff] rounded-br-[1.5rem] pointer-events-none" />

                    <button
                      onClick={handleResetCamera}
                      aria-label="Cerrar HUD y alejar cámara"
                      className="absolute top-3.5 right-3.5 z-30 w-8 h-8 rounded-full bg-slate-800/90 border border-[#00ffff]/30 text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0B3D91] active:scale-95 flex items-center justify-center transition-all shadow-md"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-3 pr-9 mb-3">
                      <div className="p-2.5 bg-slate-800/90 border border-[#00ffff]/40 rounded-xl text-[#00ffff] shrink-0 shadow-[0_0_12px_rgba(0,255,255,0.15)]">
                        {activeTag.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] uppercase tracking-widest text-[#00ffff] font-bold">
                            {activeTag.moduleType}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                            {activeTag.code}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-white leading-snug mt-0.5">
                          {activeTag.title}
                        </h3>
                      </div>
                    </div>

                    <div className="relative w-full aspect-video bg-slate-950 rounded-xl overflow-hidden border border-[#00ffff]/25 shadow-lg mb-3">
                      <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                        <div className="w-1.5 h-1.5 bg-[#00ffff] rounded-full animate-pulse" />
                        <span className="text-[8px] font-bold text-white uppercase tracking-widest">
                          Feed en Tiempo Real • Nodo 0{activeTag.id}
                        </span>
                      </div>
                      <video
                        key={activeTag.videoSrc}
                        src={activeTag.videoSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover block"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.04)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none mix-blend-overlay opacity-40" />
                    </div>

                    <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                      {activeTag.desc}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden lg:flex w-full lg:w-1/3 flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTag.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-slate-900 border border-slate-700/60 rounded-[2rem] p-6 shadow-2xl h-full flex flex-col relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2 mb-4 relative z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 bg-slate-800 border border-[#00ffff]/30 rounded-2xl text-[#00ffff] shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                      {activeTag.icon}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#00ffff] font-bold block mb-0.5">
                        {activeTag.moduleType}
                      </span>
                      <h3 className="font-bold text-lg md:text-xl text-white leading-snug">
                        {activeTag.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700 shrink-0">
                    {activeTag.code}
                  </span>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed text-sm relative z-10">
                  {activeTag.desc}
                </p>

                <div className="relative w-full flex-1 min-h-[260px] bg-slate-950 rounded-2xl overflow-hidden border border-white/15 group z-10 shadow-2xl">
                  <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <div className="w-2 h-2 bg-[#00ffff] rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                      Simulación Interactiva
                    </span>
                  </div>
                  <video
                    key={activeTag.videoSrc}
                    src={activeTag.videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover block opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.04)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none mix-blend-overlay opacity-40" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 7. SECCIÓN 5: ECOSISTEMA UNIFICADO (INDUSTRIAS ISOMÉTRICAS + GEOTECNOLOGÍAS)
// ============================================================================
const EcosystemSection = () => {
  const [showFullGrid, setShowFullGrid] = useState(false);
  const [hoveredIndustry, setHoveredIndustry] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<"top" | "bottom">("top");
  const [activeMobileId, setActiveMobileId] = useState<number | null>(null);
  const [selectedGeotech, setSelectedGeotech] = useState<GeotechItem | null>(
    null
  );

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.top < 280) {
      setTooltipPos("bottom");
    } else {
      setTooltipPos("top");
    }
    setHoveredIndustry(idx);
  };

  return (
    <section
      className="py-24 relative z-10 bg-slate-50 border-t border-slate-200 overflow-visible"
      id="ecosistema"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block z-0">
        <div
          className="absolute top-1/2 left-1/2 w-[300vw] h-[300vh] origin-center opacity-50"
          style={{
            transform: "translate(-50%, -50%) rotateX(65deg) rotateZ(-45deg)",
            backgroundImage:
              "linear-gradient(rgba(11,61,145,0.06) 2px, transparent 2px), linear-gradient(90deg, rgba(11,61,145,0.06) 2px, transparent 2px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, #000 30%, transparent 80%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-0 md:px-8 relative z-10">
        <div className="text-center md:text-left mb-6 lg:mb-16 max-w-3xl px-6 md:px-0">
          <span className="font-bold text-[#0B3D91] tracking-[0.2em] uppercase mb-4 block text-xs">
            Ecosistema Completo
          </span>
          <h2 className="font-black text-4xl md:text-5xl text-slate-900 mb-4 uppercase tracking-tighter">
            Adaptabilidad Institucional
          </h2>
        </div>

        {/* 5.1 VISTA MÓVIL Y TABLET: CARRUSEL HORIZONTAL */}
        <div className="flex lg:hidden justify-center items-center gap-2 mb-6 text-slate-400 text-sm animate-pulse">
          <MoveHorizontal className="w-5 h-5 text-[#0B3D91]" />
          <span>Desliza para explorar industrias</span>
        </div>

        <div className="flex lg:hidden overflow-x-auto gap-8 pb-12 hide-scrollbar snap-x snap-mandatory px-8 scroll-smooth">
          {INDUSTRIES_DATA.map((item, idx) => (
            <div
              key={`mob-${idx}`}
              onClick={() =>
                setActiveMobileId(activeMobileId === idx ? null : idx)
              }
              className="relative min-w-[280px] w-[80vw] md:w-[320px] shrink-0 snap-center flex flex-col items-center outline-none cursor-pointer"
            >
              <div
                className={`relative w-full h-[200px] md:h-[240px] z-10 transition-transform duration-500 ease-out ${
                  activeMobileId === idx ? "-translate-y-4" : ""
                }`}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-contain object-bottom filter drop-shadow-xl"
                />
                <div
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-4 bg-slate-900/10 blur-[8px] rounded-[100%] transition-all duration-500 pointer-events-none ${
                    activeMobileId === idx
                      ? "w-1/2 opacity-50"
                      : "w-2/3 opacity-100"
                  }`}
                />
              </div>

              <h4
                className={`font-bold text-xl mt-6 text-center transition-colors duration-300 ${
                  activeMobileId === idx ? "text-[#0B3D91]" : "text-slate-900"
                }`}
              >
                {item.title}
              </h4>

              <AnimatePresence>
                {activeMobileId === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full overflow-hidden"
                  >
                    <div className="flex flex-col items-center px-2 pb-2">
                      <p className="text-slate-500 text-sm text-center pt-3 mb-5 leading-relaxed">
                        {item.desc}
                      </p>
                      <Link
                        href={item.href}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-3.5 bg-[#0B3D91] text-white font-bold rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#0B3D91]/20 active:scale-95 transition-transform"
                      >
                        Saber más <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {activeMobileId !== idx && (
                  <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="text-[10px] text-slate-400 uppercase tracking-widest block"
                  >
                    Tocar para detalles
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="w-4 shrink-0" />
        </div>

        {/* VISTA ESCRITORIO: CITYSCAPE ISOMÉTRICO */}
        <div className="hidden lg:flex relative w-full min-h-[600px] justify-center items-center py-16 mt-6">
          <div className="grid grid-cols-4 items-start gap-x-6 gap-y-16 w-full max-w-6xl relative z-20">
            {INDUSTRIES_DATA.map((item, idx) => {
              const isHovered = hoveredIndustry === idx;
              const isAnyHovered = hoveredIndustry !== null;
              const isEvenColumn = idx % 4 === 1 || idx % 4 === 3;
              const isTop = tooltipPos === "top";

              return (
                <div
                  key={`pc-${idx}`}
                  onMouseEnter={(e) => handleMouseEnter(e, idx)}
                  onMouseLeave={() => setHoveredIndustry(null)}
                  className={`relative flex flex-col items-center transition-all duration-500 ease-out ${
                    isAnyHovered && !isHovered
                      ? "opacity-30 scale-95 blur-[2px]"
                      : "opacity-100"
                  } ${isHovered ? "z-50" : "z-10"} ${
                    isEvenColumn ? "mt-20" : ""
                  }`}
                >
                  <div className="relative w-[220px] xl:w-[260px] h-[190px] xl:h-[220px] flex items-end justify-center">
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 w-[310px] bg-white/95 backdrop-blur-2xl border border-slate-200/90 p-5 rounded-3xl shadow-[0_20px_50px_rgba(11,61,145,0.18)] transition-all duration-300 ease-out z-50 ${
                        isTop ? "bottom-[78%]" : "top-[82%]"
                      } ${
                        isHovered
                          ? "opacity-100 visible pointer-events-auto translate-y-0 scale-100"
                          : `opacity-0 invisible pointer-events-none scale-95 ${
                              isTop ? "translate-y-3" : "-translate-y-3"
                            }`
                      }`}
                    >
                      <div
                        className={`absolute left-0 w-full h-8 bg-transparent ${
                          isTop ? "-bottom-8" : "-top-8"
                        }`}
                      />

                      <div
                        className={`absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-white rotate-45 border-slate-200/90 ${
                          isTop
                            ? "-bottom-2.5 border-b border-r"
                            : "-top-2.5 border-t border-l"
                        }`}
                      />

                      <div className="relative z-10">
                        <h4 className="font-black text-lg text-[#0B3D91] mb-1.5">
                          {item.title}
                        </h4>
                        <p className="text-slate-600 text-xs xl:text-sm leading-relaxed mb-4">
                          {item.desc}
                        </p>
                        <Link
                          href={item.href}
                          className="pointer-events-auto w-full py-2.5 bg-slate-50 border border-slate-200 text-[#0B3D91] font-bold rounded-xl hover:bg-[#0B3D91] hover:text-white transition-all duration-300 text-xs uppercase tracking-widest flex items-center justify-center gap-2 group/btn cursor-pointer"
                        >
                          Saber más
                          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    <motion.div
                      animate={
                        !isHovered
                          ? { y: [0, -8, 0] }
                          : { y: isTop ? 4 : -10, scale: 1.12 }
                      }
                      transition={
                        !isHovered
                          ? {
                              repeat: Infinity,
                              duration: 4 + (idx % 3),
                              ease: "easeInOut",
                            }
                          : { type: "spring", stiffness: 300, damping: 20 }
                      }
                      className="relative w-full h-full cursor-pointer"
                    >
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]"
                      />

                      <div
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-5 bg-[#0B3D91]/15 blur-[10px] rounded-[100%] transition-all duration-500 pointer-events-none ${
                          isHovered
                            ? "w-[120px] opacity-25"
                            : "w-[160px] opacity-50"
                        }`}
                      />
                    </motion.div>
                  </div>

                  <h4
                    className={`font-bold text-lg xl:text-xl text-slate-800 mt-3 text-center transition-all duration-300 w-full cursor-default ${
                      isHovered
                        ? "opacity-0 translate-y-2 pointer-events-none"
                        : "opacity-100"
                    }`}
                  >
                    {item.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CARRUSEL Y CATÁLOGO DE GEOTECNOLOGÍAS */}
      <div className="mt-12 lg:mt-16 bg-slate-900 py-20 overflow-hidden relative border-y border-slate-800 transition-all duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-[#00ffff]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 mb-10 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#00ffff]/20 bg-[#00ffff]/10 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#00ffff] animate-ping" />
              <span className="font-bold text-[#00ffff] tracking-[0.2em] uppercase text-[10px]">
                Respaldado por
              </span>
            </div>
            <h3 className="font-black text-3xl md:text-4xl text-white uppercase tracking-tighter">
              Geotecnologías Avanzadas
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl">
              Selecciona cualquier tecnología para inspeccionar su arquitectura
              técnica y casos de uso reales en la industria.
            </p>
          </div>

          <button
            onClick={() => setShowFullGrid(!showFullGrid)}
            className="flex px-6 md:px-8 py-3 rounded-full border border-white/20 text-white font-bold text-sm hover:bg-white hover:text-slate-900 transition-all items-center gap-2 z-10 bg-slate-900/50 backdrop-blur-md cursor-pointer"
          >
            {showFullGrid ? (
              <>
                Ocultar Catálogo <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Ver Catálogo Completo ({GEOTECH_DATA.length}){" "}
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!showFullGrid ? (
            <motion.div
              key="carousel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative flex w-fit hover:[animation-play-state:paused] mt-4"
            >
              <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-slate-900 to-transparent z-20 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-slate-900 to-transparent z-20 pointer-events-none" />

              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
                className="flex flex-nowrap w-max"
              >
                <div className="flex gap-4 md:gap-6 pr-4 md:pr-6 flex-nowrap">
                  {GEOTECH_DATA.map((item, idx) => (
                    <CinematicCard
                      key={`b1-${idx}`}
                      item={item}
                      onSelect={setSelectedGeotech}
                    />
                  ))}
                </div>
                <div className="flex gap-4 md:gap-6 pr-4 md:pr-6 flex-nowrap">
                  {GEOTECH_DATA.map((item, idx) => (
                    <CinematicCard
                      key={`b2-${idx}`}
                      item={item}
                      onSelect={setSelectedGeotech}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 overflow-hidden"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5 pt-4">
                {GEOTECH_DATA.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ResponsiveGridCard
                      item={item}
                      onSelect={setSelectedGeotech}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal renderizado en document.body vía Portal */}
      <GeotechSpotlightModal
        item={selectedGeotech}
        onClose={() => setSelectedGeotech(null)}
        onSelectOther={(other) => setSelectedGeotech(other)}
      />
    </section>
  );
};

// ============================================================================
// PREGUNTAS FRECUENTES (FAQ)
// ============================================================================
const PreguntasFrecuentesSmartTwin = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 md:px-8 bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="font-bold text-[#0B3D91] tracking-[0.2em] uppercase text-xs mb-4 block">
            Resolviendo dudas
          </span>
          <h2 className="font-black text-4xl text-slate-900 mb-6 uppercase tracking-tighter">
            Preguntas Frecuentes
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS_DATA.map((faq, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl border ${
                openIndex === idx
                  ? "border-[#0B3D91]/30 shadow-md"
                  : "border-slate-100 transition-colors duration-300 hover:border-slate-300"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
              >
                <h3
                  className={`font-bold text-base sm:text-lg pr-8 transition-colors duration-300 ${
                    openIndex === idx
                      ? "text-[#0B3D91]"
                      : "text-slate-800 group-hover:text-[#0B3D91]"
                  }`}
                >
                  {faq.pregunta}
                </h3>
                <div
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === idx
                      ? "bg-[#0B3D91] text-white rotate-180"
                      : "bg-slate-100 text-slate-400 group-hover:bg-[#0B3D91]/10 group-hover:text-[#0B3D91]"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-slate-50 mt-2">
                      <AnimatedResponse
                        text={faq.respuesta}
                        className="text-slate-600 text-sm leading-relaxed"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// CAPTURA DE LEADS SMART TWIN (UNIFICADA CON HUBSPOT + CITA OPCIONAL)
// ============================================================================
const countries = [
  { code: "+52", iso: "mx", label: "MX" },
  { code: "+1", iso: "us", label: "US" },
  { code: "+34", iso: "es", label: "ES" },
  { code: "+57", iso: "co", label: "CO" },
  { code: "+54", iso: "ar", label: "AR" },
  { code: "+56", iso: "cl", label: "CL" },
  { code: "+51", iso: "pe", label: "PE" },
];

const SmartTwinLeadCapture = () => {
  // Estado para saber si el usuario quiere agendar fecha/hora (Opcional)
  const [wantsAppointment, setWantsAppointment] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonthDate, setCurrentMonthDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // Preseleccionamos "Gemelos Digitales" por estar en la landing de Smart Twin
  const [selectedThemes, setSelectedThemes] = useState<string[]>([
    "Gemelos Digitales",
  ]);

  // Estados del formulario (100% sincronizados con /api/hubspot)
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+52");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [acceptComms, setAcceptComms] = useState(false);
  const [acceptData, setAcceptData] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
  const daysInMonth = new Date(
    currentMonthDate.getFullYear(),
    currentMonthDate.getMonth() + 1,
    0
  ).getDate();
  const firstDay = new Date(
    currentMonthDate.getFullYear(),
    currentMonthDate.getMonth(),
    1
  ).getDay();
  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];
  const themes = [
    "Gemelos Digitales",
    "Catastro",
    "Soluciones Serverbox",
    "Cartografía",
  ];

  const isPrevDisabled =
    currentMonthDate.getMonth() === today.getMonth() &&
    currentMonthDate.getFullYear() === today.getFullYear();
  const isNextDisabled =
    currentMonthDate.getMonth() === maxDate.getMonth() &&
    currentMonthDate.getFullYear() === maxDate.getFullYear();

  const handlePrevMonth = () => {
    if (!isPrevDisabled)
      setCurrentMonthDate(
        new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1)
      );
  };

  const handleNextMonth = () => {
    if (!isNextDisabled)
      setCurrentMonthDate(
        new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1)
      );
  };

  const monthYearString = currentMonthDate.toLocaleString("es-MX", {
    month: "long",
    year: "numeric",
  });

  const toggleTheme = (theme: string) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes(selectedThemes.filter((t) => t !== theme));
    } else if (selectedThemes.length < 2) {
      setSelectedThemes([...selectedThemes, theme]);
    }
  };

  const getFilteredTimes = () => {
    if (!selectedDate) return [];
    const isToday = selectedDate.toDateString() === new Date().toDateString();
    if (!isToday) return timeSlots;
    const currentHour = new Date().getHours();
    return timeSlots.filter((t) => parseInt(t.split(":")[0]) > currentHour);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  };

  const handleToggleAppointment = () => {
    const nextValue = !wantsAppointment;
    setWantsAppointment(nextValue);
    if (!nextValue) {
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };

  const resetAll = () => {
    setWantsAppointment(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedThemes(["Gemelos Digitales"]);
    setName("");
    setLastname("");
    setJobTitle("");
    setCompany("");
    setEmail("");
    setCountryCode("+52");
    setPhone("");
    setComment("");
    setAcceptComms(false);
    setAcceptData(false);
    setIsSuccess(false);
  };

  // Validación general: Todos los campos obligatorios excepto "comment" (y cita opcional a menos que active el switch)
  const isAppointmentValid = !wantsAppointment || (Boolean(selectedDate) && Boolean(selectedTime));

  const isFormComplete =
    name.trim() !== "" &&
    lastname.trim() !== "" &&
    jobTitle.trim() !== "" &&
    company.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "" &&
    selectedThemes.length > 0 &&
    acceptComms &&
    acceptData &&
    isAppointmentValid;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (wantsAppointment && (!selectedDate || !selectedTime)) {
      alert(
        "Por favor selecciona un día y horario en el calendario, o desactiva la opción de agendar cita."
      );
      return;
    }

    if (!isFormComplete) {
      alert("Por favor completa todos los campos obligatorios y selecciona al menos un tema de interés.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      lastname: lastname.trim(),
      jobtitle: jobTitle.trim(),
      company: company.trim(),
      email: email.trim(),
      phone: `${countryCode} ${phone.trim()}`,
      // Enviamos vacío si no agenda cita para no romper campos tipo Date en HubSpot
      date:
        wantsAppointment && selectedDate
          ? selectedDate.toISOString().split("T")[0]
          : "",
      time:
        wantsAppointment && selectedTime ? selectedTime : "Por coordinar",
      themes: selectedThemes,
      comment: comment.trim(),
      acceptComms,
      acceptData,
    };

    try {
      const response = await fetch("/api/hubspot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const errorDetail =
          result?.details?.errors?.[0]?.message ||
          result?.details?.message ||
          result?.error ||
          "Error desconocido en HubSpot";
        console.warn("Respuesta de error de HubSpot:", result);
        alert(`No se pudo enviar: ${errorDetail}`);
      }
    } catch (error) {
      console.warn("Error enviando a CRM:", error);
      alert("Hubo un problema al enviar tu solicitud. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCountry = countries.find((c) => c.code === countryCode);

  return (
    <section
      id="contacto-demo"
      className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-slate-50 relative z-10 overflow-hidden border-t border-slate-200"
    >
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0B3D91]/5 rounded-full blur-[80px] pointer-events-none -translate-x-1/4 translate-y-1/3" />

      <div className="max-w-6xl mx-auto relative z-20">
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* ========================================================= */}
          {/* COLUMNA IZQUIERDA: MAYOR ESPACIADO VERTICAL (5 COLUMNAS)  */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 p-8 sm:p-10 md:p-12 lg:py-16 lg:px-12 flex flex-col justify-center relative overflow-hidden min-w-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(11,61,145,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(11,61,145,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#0B3D91]/5 border border-[#0B3D91]/10 rounded-full mb-8 w-max max-w-full">
                  <Box className="w-4 h-4 text-[#0B3D91] shrink-0" />
                  <span className="font-sans font-bold text-[#0B3D91] tracking-[0.18em] uppercase text-xs truncate">
                    Taller de Viabilidad Técnica
                  </span>
                </div>

                <h2 className="font-poppins font-black text-3xl sm:text-4xl xl:text-[2.65rem] text-slate-900 tracking-tighter mb-7 leading-[1.12]">
                  Digitaliza tus activos físicos. <br />
                  <span className="text-[#0B3D91]">Anticipa el futuro.</span>
                </h2>

                <p className="font-sans text-slate-600 text-base sm:text-lg leading-relaxed mb-10">
                  Descubre el impacto real de integrar telemetría, IoT y modelos 3D
                  en tus operaciones. Agenda una demo con nuestros expertos para
                  evaluar cómo un Gemelo Digital puede reducir tus riesgos y
                  optimizar tus recursos.
                </p>
              </div>

              <ul className="space-y-8 font-sans text-slate-700 mt-2">
                <li className="flex items-start gap-4">
                  <div className="bg-[#0B3D91]/10 p-2.5 rounded-full shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-[#0B3D91]" />
                  </div>
                  <div className="min-w-0">
                    <strong className="block text-slate-900 font-bold text-base mb-1.5">
                      Evaluación de Infraestructura
                    </strong>
                    <span className="text-slate-600 text-sm leading-relaxed block">
                      Analizamos si tu entorno actual cuenta con los sensores
                      (IoT/SCADA) necesarios para alimentar un modelo 3D.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-[#0B3D91]/10 p-2.5 rounded-full shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-[#0B3D91]" />
                  </div>
                  <div className="min-w-0">
                    <strong className="block text-slate-900 font-bold text-base mb-1.5">
                      Hoja de Ruta de Implementación
                    </strong>
                    <span className="text-slate-600 text-sm leading-relaxed block">
                      Diseñamos un plan por fases, desde el levantamiento LiDAR
                      hasta la integración en tu centro de mando.
                    </span>
                  </div>
                </li>
              </ul>

              {/* Resumen dinámico si el usuario eligió fecha */}
              <AnimatePresence>
                {wantsAppointment && selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-8 p-4 rounded-2xl bg-[#0B3D91]/5 border border-[#0B3D91]/15 flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#0B3D91] text-[#00ffff] flex items-center justify-center shrink-0">
                      <CalendarIcon size={16} />
                    </div>
                    <div className="font-sans min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#0B3D91]">
                        Horario seleccionado
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 capitalize truncate">
                        {selectedDate.toLocaleDateString("es-MX", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}{" "}
                        {selectedTime ? `• ${selectedTime} hrs` : "(Elige una hora)"}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMNA DERECHA: FORMULARIO + CITA OPCIONAL (7 COLUMNAS)  */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 bg-slate-50/50 p-6 sm:p-8 md:p-10 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-center min-w-0 overflow-hidden">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-5 shadow-inner">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-poppins font-black text-2xl text-slate-900 mb-2">
                    {wantsAppointment
                      ? "¡Cita y Solicitud Recibidas!"
                      : "¡Solicitud Recibida!"}
                  </h3>
                  <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed px-4 max-w-md">
                    Un experto de gemelos digitales evaluará tu información y se
                    pondrá en contacto a tu correo corporativo pronto.
                  </p>
                  <button
                    type="button"
                    onClick={resetAll}
                    className="mt-6 text-xs font-sans font-bold text-[#0B3D91] hover:text-[#00ffff] transition-colors uppercase tracking-widest cursor-pointer"
                  >
                    Enviar otra solicitud
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full min-w-0"
                >
                  {/* LOGO CENTRADO Y 25% MÁS GRANDE */}
                  <div className="mb-6 flex justify-center">
                    <Image
                      src="/assets/img/01_LANDING_SIGSA/LOGO_smart.png"
                      alt="Smart Twin Logo"
                      width={275}
                      height={70}
                      className="object-contain h-16 md:h-[70px] w-auto"
                    />
                  </div>

                  <h3 className="font-poppins font-black text-xl sm:text-2xl text-slate-900 mb-1">
                    Solicitar Demostración
                  </h3>
                  <p className="font-sans text-slate-500 text-xs sm:text-sm mb-5">
                    Déjanos tus datos para coordinar una sesión.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-3.5 font-sans w-full min-w-0"
                  >
                    {/* Fila 1: Nombre(s) y Apellidos */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                      <div className="min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Nombre(s) <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          value={name}
                          placeholder="Ej. Roberto"
                          onChange={(e) => setName(e.target.value)}
                          className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
                        />
                      </div>
                      <div className="min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Apellidos <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          value={lastname}
                          placeholder="Ej. Sánchez"
                          onChange={(e) => setLastname(e.target.value)}
                          className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    {/* Fila 2: Cargo y Empresa */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                      <div className="min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Cargo / Puesto <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          value={jobTitle}
                          placeholder="Ej. Director de Innovación"
                          onChange={(e) => setJobTitle(e.target.value)}
                          className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
                        />
                      </div>
                      <div className="min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Empresa / Institución <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          value={company}
                          placeholder="Nombre de tu organización"
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    {/* Fila 3: Correo y Teléfono */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                      <div className="min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Correo Corporativo <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="email"
                          value={email}
                          placeholder="roberto@tuempresa.com"
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
                        />
                      </div>

                      <div className="min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Teléfono <span className="text-red-500">*</span>
                        </label>
                        <div className="relative flex items-center w-full bg-white border border-slate-200 rounded-xl focus-within:border-[#0B3D91] focus-within:ring-2 focus-within:ring-[#0B3D91]/20 transition-all">
                          <button
                            type="button"
                            onClick={() => setShowDropdown(!showDropdown)}
                            onBlur={() =>
                              setTimeout(() => setShowDropdown(false), 200)
                            }
                            className="w-[76px] h-full px-3 py-2.5 flex items-center justify-center gap-2 border-r border-slate-200 hover:bg-slate-50 rounded-l-xl transition-colors shrink-0 outline-none cursor-pointer"
                          >
                            <img
                              src={`https://flagcdn.com/w20/${selectedCountry?.iso}.png`}
                              alt="Bandera"
                              className="w-4 h-auto rounded-xs shrink-0"
                            />
                            <span className="font-bold text-xs text-slate-700 leading-none">
                              {selectedCountry?.label}
                            </span>
                          </button>

                          <AnimatePresence>
                            {showDropdown && (
                              <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.15 }}
                                className="absolute top-full left-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1.5 w-32 flex flex-col overflow-hidden"
                              >
                                {countries.map((c) => (
                                  <button
                                    key={c.code}
                                    type="button"
                                    onClick={() => {
                                      setCountryCode(c.code);
                                      setShowDropdown(false);
                                    }}
                                    className="w-full py-1.5 px-3 hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer"
                                  >
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={`https://flagcdn.com/w20/${c.iso}.png`}
                                        alt={c.label}
                                        className="w-4 h-auto rounded-xs"
                                      />
                                      <span className="font-bold text-xs text-slate-700">
                                        {c.label}
                                      </span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-mono">
                                      {c.code}
                                    </span>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <input
                            required
                            type="tel"
                            value={phone}
                            onChange={handlePhoneChange}
                            maxLength={15}
                            placeholder="55 1234 5678"
                            className="w-full min-w-0 pl-3.5 pr-3 py-2.5 bg-transparent rounded-r-xl outline-none text-sm text-slate-800 placeholder-slate-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Fila 4: Temas (Obligatorio) y Comentarios (Opcional) lado a lado */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                      <div className="flex flex-col min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Temas de interés (Mín. 1, Máx. 2) <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          {themes.map((theme) => (
                            <button
                              key={theme}
                              type="button"
                              onClick={() => toggleTheme(theme)}
                              className={`p-2 rounded-xl border text-[11px] font-bold transition-all duration-200 flex items-center justify-center text-center cursor-pointer leading-tight ${
                                selectedThemes.includes(theme)
                                  ? "bg-[#0B3D91] text-[#00ffff] border-[#0B3D91] shadow-sm"
                                  : "bg-white border-slate-200 text-slate-600 hover:border-[#0B3D91] hover:text-[#0B3D91]"
                              }`}
                            >
                              {theme}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Comentarios Adicionales <span className="text-slate-400 font-sans font-normal">(Opcional)</span>
                        </label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Cuéntanos sobre los activos que deseas digitalizar..."
                          className="w-full min-w-0 flex-1 min-h-[76px] px-3.5 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 transition-all text-xs text-slate-800 placeholder-slate-400 resize-none"
                        />
                      </div>
                    </div>

                    {/* ========================================================= */}
                    {/* SWITCH OPCIONAL: ¿AGENDAR FECHA Y HORA DE UNA VEZ?         */}
                    {/* ========================================================= */}
                    <div className="pt-1 w-full min-w-0">
                      <div
                        onClick={handleToggleAppointment}
                        className={`p-3 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${
                          wantsAppointment
                            ? "bg-[#0B3D91]/5 border-[#0B3D91]/30"
                            : "bg-white border-slate-200 hover:border-[#0B3D91]/40"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              wantsAppointment
                                ? "bg-[#0B3D91] text-[#00ffff]"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <CalendarIcon size={17} />
                          </div>
                          <div className="min-w-0">
                            <span className="block text-xs font-bold text-slate-800 truncate">
                              ¿Deseas proponer fecha y hora de una vez?
                            </span>
                            <span className="block text-[11px] text-slate-500 truncate">
                              Opcional — Agendar ahora o coordinar por correo
                            </span>
                          </div>
                        </div>

                        <div
                          className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 shrink-0 flex items-center ${
                            wantsAppointment ? "bg-[#0B3D91]" : "bg-slate-300"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full shadow-xs transition-transform duration-300 ${
                              wantsAppointment
                                ? "bg-[#00ffff] translate-x-5"
                                : "bg-white translate-x-0"
                            }`}
                          />
                        </div>
                      </div>

                      {/* PANEL ACORDEÓN DEL CALENDARIO */}
                      <AnimatePresence>
                        {wantsAppointment && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 p-4 bg-white rounded-2xl border border-slate-200">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                  <Clock size={14} className="text-[#0B3D91]" />
                                  Elige día y hora (Lun - Vie) <span className="text-red-500">*</span>
                                </span>
                                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-full p-0.5">
                                  <button
                                    type="button"
                                    onClick={handlePrevMonth}
                                    disabled={isPrevDisabled}
                                    className={`p-1 rounded-full transition-all ${
                                      isPrevDisabled
                                        ? "opacity-30 cursor-not-allowed"
                                        : "hover:bg-white text-slate-700 hover:text-[#0B3D91]"
                                    }`}
                                  >
                                    <ChevronLeft size={14} />
                                  </button>
                                  <span className="font-bold text-slate-700 capitalize text-xs w-28 text-center select-none">
                                    {monthYearString}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={handleNextMonth}
                                    disabled={isNextDisabled}
                                    className={`p-1 rounded-full transition-all ${
                                      isNextDisabled
                                        ? "opacity-30 cursor-not-allowed"
                                        : "hover:bg-white text-slate-700 hover:text-[#0B3D91]"
                                    }`}
                                  >
                                    <ChevronRight size={14} />
                                  </button>
                                </div>
                              </div>

                              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1.5">
                                {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"].map((d) => (
                                  <div key={d}>{d}</div>
                                ))}
                              </div>

                              <div className="grid grid-cols-7 gap-y-1 gap-x-1 mb-3">
                                {blanks.map((b) => (
                                  <div key={`b-${b}`} />
                                ))}
                                {days.map((d) => {
                                  const date = new Date(
                                    currentMonthDate.getFullYear(),
                                    currentMonthDate.getMonth(),
                                    d
                                  );
                                  const isWeekend =
                                    date.getDay() === 0 || date.getDay() === 6;
                                  const isPast = date < today;
                                  const isTooFar = date > maxDate;
                                  const isDisabled = isWeekend || isPast || isTooFar;
                                  const isSelected =
                                    selectedDate?.getDate() === d &&
                                    selectedDate?.getMonth() ===
                                      currentMonthDate.getMonth();

                                  return (
                                    <button
                                      key={d}
                                      type="button"
                                      disabled={isDisabled}
                                      onClick={() => setSelectedDate(date)}
                                      className={`h-8 w-8 mx-auto rounded-full text-xs transition-all duration-200 flex items-center justify-center ${
                                        isSelected
                                          ? "bg-[#0B3D91] text-[#00ffff] shadow-sm font-bold scale-105"
                                          : isDisabled
                                          ? "opacity-25 cursor-not-allowed line-through decoration-slate-300"
                                          : "hover:bg-slate-100 text-slate-700 hover:text-[#0B3D91] cursor-pointer"
                                      }`}
                                    >
                                      {d}
                                    </button>
                                  );
                                })}
                              </div>

                              {selectedDate ? (
                                <div className="pt-2 border-t border-slate-100">
                                  <p className="text-[11px] font-bold text-slate-600 mb-2">
                                    Horarios disponibles: <span className="text-red-500">*</span>
                                  </p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {getFilteredTimes().map((t) => (
                                      <button
                                        key={t}
                                        type="button"
                                        onClick={() => setSelectedTime(t)}
                                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                                          selectedTime === t
                                            ? "bg-[#0B3D91] text-[#00ffff] border-[#0B3D91]"
                                            : "bg-slate-50 border-slate-200 text-slate-600 hover:border-[#0B3D91] hover:text-[#0B3D91]"
                                        }`}
                                      >
                                        {t}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <p className="text-center text-[11px] text-slate-400 py-1">
                                  Toca un día disponible para elegir la hora.
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Checkboxes Legales (Ambos obligatorios) */}
                    <div className="space-y-2 pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer group">
                        <div className="relative flex items-start mt-0.5 shrink-0">
                          <input
                            type="checkbox"
                            required
                            checked={acceptComms}
                            onChange={(e) => setAcceptComms(e.target.checked)}
                            className="peer appearance-none w-4 h-4 border-2 border-slate-300 rounded bg-white checked:bg-[#0B3D91] checked:border-[#0B3D91] transition-all cursor-pointer"
                          />
                          <CheckCircle2 className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-[11px] text-slate-600 leading-snug group-hover:text-slate-800 transition-colors">
                          Acepto recibir comunicaciones, noticias y ofertas exclusivas
                          de SIGSA. <span className="text-red-500">*</span>
                        </span>
                      </label>

                      <label className="flex items-start gap-2.5 cursor-pointer group">
                        <div className="relative flex items-start mt-0.5 shrink-0">
                          <input
                            type="checkbox"
                            required
                            checked={acceptData}
                            onChange={(e) => setAcceptData(e.target.checked)}
                            className="peer appearance-none w-4 h-4 border-2 border-slate-300 rounded bg-white checked:bg-[#0B3D91] checked:border-[#0B3D91] transition-all cursor-pointer"
                          />
                          <CheckCircle2 className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-[11px] text-slate-600 leading-snug group-hover:text-slate-800 transition-colors">
                          Acepto el almacenamiento y manejo de mis datos personales de
                          acuerdo con las políticas vigentes.{" "}
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                    </div>

                    {/* Botón Submit Dinámico y Texto Legal con buena separación */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting || !isFormComplete}
                        className="w-full bg-[#0B3D91] text-white font-sans font-bold tracking-widest uppercase text-xs sm:text-sm py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#00ffff] hover:text-[#0B3D91] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#0B3D91]/20 group cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Procesando...
                          </>
                        ) : wantsAppointment ? (
                          <>
                            Confirmar Cita y Reunión{" "}
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        ) : (
                          <>
                            Agenda una reunión{" "}
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      <p className="text-center font-sans text-[10px] text-slate-400 mt-5 pt-1 leading-relaxed px-4">
                        Puedes consultar los términos legales, nuestro aviso de
                        privacidad y la política de uso de datos personales en el pie de
                        página de SIGSA.
                      </p>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
// ============================================================================
// 10. ENSAMBLAJE PRINCIPAL DE LA PÁGINA (MAIN PAGE EXPORT)
// ============================================================================
export default function SmartTwinLanding() {
  return (
    <div className="relative text-left selection:bg-[#00ffff] selection:text-[#0B3D91] overflow-x-hidden">
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        body {
          overflow-x: hidden;
          width: 100%;
        }
      `}</style>

      <LightTechBackground />
      <HeroSmartTwin />
      <UnifiedVideoShowcase />
      <IntegratedTwinViewer />
      <EcosystemSection />
      <PreguntasFrecuentesSmartTwin />
      <SmartTwinLeadCapture />
    </div>
  );
}