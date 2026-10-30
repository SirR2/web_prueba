"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { 
  ScanEye, Radar, Layers, MonitorCheck, ChevronDown, Satellite,
  Globe, CheckCircle2, Send, Loader2, Calendar as CalendarIcon, Clock, ChevronRight, ChevronLeft, CheckCircle,
  X, Play, Image as ImageIcon, ArrowUpRight, Cpu, Activity, Sparkles
} from "lucide-react";
import Image from "next/image";

const fadeInVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

/// ==========================================
// 1. HERO BANNER (PREMIUM UNIFICADO - TEXTOS REDUCIDOS)
// ==========================================
const HeroRemota = () => {
  const desktopImg = "/assets/img/06_Landing_Percepcion/banner_sn.webp";
  const mobileImg = "/assets/img/06_Landing_Percepcion/banner_sn_V.webp";

  return (
    <section className="relative w-full min-h-screen md:min-h-0 md:h-[800px] flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        {/* Imágenes */}
        <Image
          src={mobileImg}
          alt="Percepción Remota (Móvil)"
          fill
          className="object-cover block md:hidden opacity-80"
          priority
        />
        <Image
          src={desktopImg}
          alt="Percepción Remota (Escritorio)"
          fill
          className="object-cover hidden md:block opacity-80"
          priority
        />

        {/* Gradiente Premium Oscuro */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent z-10" />
      </div>

      {/* Contenido con altura segura y textos ajustados con escalas nativas de Tailwind */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 w-full mt-28 mb-24 sm:mb-32 md:mb-0 md:mt-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="font-sans font-bold text-[#00ffff] tracking-[0.2em] uppercase mb-4 md:mb-6 block text-xs border-l-2 border-[#00ffff] pl-4 drop-shadow-md">
            Inteligencia Territorial Espacial
          </span>

          <h1 className="font-poppins font-bold text-5xl sm:text-7xl md:text-9xl lg:text-8xl text-white tracking-tighter leading-none mb-6">
            PERCEPCIÓN <br/>
            {/* SOLUCIÓN AQUÍ: Se agregó pr-2 y pb-1 para evitar que la "A" se corte */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00ffff]/60 pr-2 pb-1">
              REMOTA
            </span>
          </h1>

          <p className="font-sans text-white/80 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-light">
            Transformamos datos satelitales y sensores avanzados en conocimiento estratégico para el monitoreo y análisis preciso del territorio.
          </p>
        </motion.div>
      </div>

      {/* Flecha Descubrir */}
      <a
        href="#soluciones"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-[#00ffff]/70 animate-bounce cursor-pointer"
      >
        <span className="font-sans text-xs tracking-widest uppercase">Descubrir</span>
        <ChevronDown className="w-5 h-5 text-white/80" />
      </a>
    </section>
  );
};

// ==========================================
// 2. SOLUCIONES ESPECIALIZADAS (MÓDULOS UI)
// ==========================================
const SolucionesEspecializadas = () => (
  <section id="soluciones" className="py-32 px-6 md:px-8 bg-slate-50 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0B3D91]/5 rounded-full blur-[150px] pointer-events-none" />

    <div className="max-w-7xl mx-auto relative z-10">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariant} className="text-center mb-20">
        <span className="font-sans font-bold text-[#0B3D91] tracking-[0.2em] uppercase mb-4 block text-xs">Análisis Espacial</span>
        <h2 className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-6 uppercase tracking-tighter">Soluciones <span className="text-[#0B3D91]">Especializadas</span></h2>
        <p className="font-sans text-slate-500 text-lg max-w-2xl mx-auto">
          Apoyo esencial en la toma de decisiones para mitigar riesgos y optimizar recursos interpretando la huella del mundo físico a través de tecnología de punta.
        </p>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {[
          { Icon: Radar, title: "Análisis de Riesgos", desc: "Evaluación detallada de vulnerabilidad en infraestructura y zonas naturales." },
          { Icon: ScanEye, title: "Percepción Remota", desc: "Procesamiento avanzado, análisis e interpretación de imágenes satelitales, aéreas y de V.A.N.T." },
          { Icon: Layers, title: "Modelado 3D y LiDAR", desc: "Levantamientos topográficos de ultra alta precisión y nubes de puntos." },
          { Icon: MonitorCheck, title: "Monitoreo de Cambios", desc: "Seguimiento continuo a zonas de interés, deforestación o expansión urbana." }
        ].map((item, i) => (
          <motion.div key={i} variants={fadeInVariant} className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-[#0B3D91]/10 hover:-translate-y-2 hover:border-[#00ffff]/40 transition-all duration-500 group relative overflow-hidden flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0B3D91] to-[#00ffff] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            
            <div className="w-16 h-16 bg-slate-50 text-[#0B3D91] border border-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#0B3D91] group-hover:text-[#00ffff] group-hover:scale-110 transition-all duration-500 shadow-sm">
              <item.Icon size={30} className="group-hover:rotate-12 transition-transform duration-500" />
            </div>
            <h3 className="font-poppins font-bold text-2xl text-slate-900 mb-4 uppercase tracking-tight">{item.title}</h3>
            <p className="font-sans text-slate-500 text-[15px] leading-relaxed mt-auto">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

// ==========================================
// 3. METODOLOGÍA (DARK TECH TIMELINE)
// ==========================================
const MetodologiaSection = () => (
  <section className="py-32 px-6 md:px-8 bg-slate-900 text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(11,61,145,0.5)_0%,_transparent_60%)] pointer-events-none" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center relative z-10">
      
      <div className="lg:col-span-5">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#00ffff]/30 bg-[#00ffff]/5 mb-6">
          <Satellite className="w-4 h-4 text-[#00ffff] animate-pulse" />
          <span className="font-sans font-bold text-[#00ffff] tracking-[0.2em] uppercase text-xs">Flujo de Trabajo</span>
        </div>
        <h2 className="font-poppins font-black text-5xl md:text-6xl mb-6 uppercase tracking-tighter leading-tight">
          Nuestra <br /><span className="text-[#00ffff]">Metodología</span>
        </h2>
        <p className="font-sans text-white/60 text-lg leading-relaxed mb-10 max-w-md">
          Garantizamos precisión y confiabilidad desde la captura y procesamiento de los datos en el espacio hasta la integración de los resultados a diversas plataformas.
        </p>
      </div>

      <div className="lg:col-span-7 relative">
        {/* Línea conectora de la línea de tiempo */}
        <div className="absolute left-10 top-10 bottom-10 w-[2px] bg-white/10 hidden md:block">
          <motion.div animate={{ y: ["0%", "100%", "0%"] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="w-full h-1/3 bg-gradient-to-b from-transparent via-[#00ffff] to-transparent" />
        </div>

        <div className="grid gap-6 relative">
          {[
            { num: "01", title: "Adquisición de Datos", desc: "Captura mediante constelaciones de satélites, radares, sensores especializados y drones (VANT)." },
            { num: "02", title: "Procesamiento y Análisis", desc: "Aplicación de algoritmos avanzados en teledetección y empleo de sistemas inteligentes y autónomos para el ordenamiento y depuración de la información obtenida." },
            { num: "03", title: "Entrega de Resultados", desc: "Generación de modelos predictivos e información interactiva visual para la toma de decisiones críticas." }
          ].map((step, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} 
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row items-start md:items-center gap-8 hover:bg-white/10 hover:border-[#00ffff]/30 transition-all duration-500 group"
            >
              <div className="relative shrink-0">
                <span className="font-poppins font-black text-6xl text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.2)] group-hover:[-webkit-text-stroke:2px_#00ffff] transition-all duration-500">
                  {step.num}
                </span>
                <div className="absolute -inset-4 bg-[#00ffff]/0 group-hover:bg-[#00ffff]/20 blur-xl rounded-full transition-all duration-500" />
              </div>
              <div>
                <h4 className="font-poppins font-bold text-2xl mb-3 uppercase text-white tracking-tight">{step.title}</h4>
                <p className="font-sans text-white/60 text-base leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ==========================================
// 4. CASOS DE USO (CON MODAL FLOTANTE)
// ==========================================
interface CasoDeUso {
  title: string;
  subtitle: string;
  desc: string;
  seoDescription: string;
  impacto: string;
  img: string;
  video: string;
  col: string;
  sensores: string[];
  entregables: string[];
  metricas: { label: string; value: string }[];
}

const CasosUso = () => {
  const casos: CasoDeUso[] = [
    { 
      title: "Evaluación de Inundaciones", 
      subtitle: "Modelado Hidrológico y Gestión de Riesgos Hidrometeorológicos",
      desc: "Análisis de cuencas hidrológicas, simulación de inundaciones y delimitación de zonas de afectación.", 
      seoDescription: "Mediante el uso combinado de imágenes de Radar de Apertura Sintética (SAR), capaces de penetrar nubes y operar bajo lluvia extrema, junto con Modelos Digitales de Elevación (DEM) generados con LiDAR, mapeamos con exactitud milimétrica la dinámica del agua. Evaluamos cuencas hidrológicas, simulamos escenarios de retorno y delimitamos llanuras de inundación para proteger infraestructura crítica, zonas urbanas y activos estratégicos antes, durante y después de una emergencia.",
      impacto: "Reducción de hasta un 40% en tiempos de respuesta ante desastres naturales y planeación urbana resiliente.",
      img: "/assets/img/06_Landing_Percepcion/08_inundaciones.webp", 
      video: "/assets/img/06_Landing_Percepcion/03_inundacion.mp4",
      col: "lg:col-span-2",
      sensores: ["Radar SAR (Banda C y X)", "LiDAR Aerotransportado", "Sensores Ópticos Multiespectrales"],
      entregables: ["Mapas de Tirantes de Agua y Velocidad", "Modelos Digitales de Terreno (MDT)", "Zonificación de Peligro y Vulnerabilidad GIS"],
      metricas: [{ label: "Precisión Vertical", value: "± 5 - 15 cm" }, { label: "Operatividad", value: "24/7 Todo Clima" }]
    },
    { 
      title: "Evaluación de Incendios", 
      subtitle: "Monitoreo Térmico y Severidad de Áreas Quemadas",
      desc: "Cuantificación del área afectada, evaluación de daños y monitoreo de las zonas.", 
      seoDescription: "Implementamos algoritmos de teledetección térmica e infrarroja de onda corta (SWIR) para detectar puntos de calor activos en tiempo casi real y evaluar el impacto post-incendio. A través del cálculo del Índice Normalizado de Área Quemada (NBR), cuantificamos la hectárea exacta afectada, clasificamos los niveles de severidad en el ecosistema y diseñamos estrategias de restauración forestal basadas en inteligencia geoespacial.",
      impacto: "Identificación oportuna de focos secundarios y cuantificación precisa de pérdida de biomasa para seguros y medio ambiente.",
      img: "/assets/img/06_Landing_Percepcion/04_incendios.webp", 
      video: "/assets/img/06_Landing_Percepcion/incendios.mp4",
      col: "lg:col-span-1",
      sensores: ["Infrarrojo Térmico (TIR)", "Bandas SWIR y NIR", "Drones con Cámara Térmica"],
      entregables: ["Mapas de Severidad de Incendio (dNBR)", "Monitoreo de Focos de Calor Activos", "Planimetría para Reforestación"],
      metricas: [{ label: "Espectro Clave", value: "SWIR / Térmico" }, { label: "Frecuencia", value: "Monitoreo Diario" }]
    },
    { 
      title: "Prospección Minera", 
      subtitle: "Exploración Geológica y Monitoreo Geotécnico",
      desc: "Identificación de anomalías geológicas, mapeo estructural y optimización de exploración.", 
      seoDescription: "Aceleramos la exploración minera y reducimos costos operativos en campo mediante sensores hiperespectrales y multiespectrales de alta resolución. Identificamos firmas espectrales de alteración hidrotermal, óxidos e indicadores mineralógicos en grandes extensiones territoriales. Además, aplicamos interferometría diferencial (InSAR) para monitorear la estabilidad de taludes, presas de jales y subsidencia del terreno con precisión milimétrica.",
      impacto: "Optimización de campañas de perforación y prevención de riesgos geotécnicos en minas a cielo abierto y subterráneas.",
      img: "/assets/img/06_Landing_Percepcion/03_mineria.webp", 
      video: "/assets/img/06_Landing_Percepcion/01_mineria.mp4",
      col: "lg:col-span-1",
      sensores: ["Sensores Hiperespectrales", "InSAR (Interferometría Radar)", "Fotogrametría con VANT"],
      entregables: ["Cartografía de Alteración Mineralógica", "Lineamientos Estructurales y Fallas", "Control Volumétrico y Estabilidad de Taludes"],
      metricas: [{ label: "Detección InSAR", value: "Milimétrica" }, { label: "Bandas Espectrales", value: "+150 Canales" }]
    },
    { 
      title: "Agricultura de Precisión", 
      subtitle: "Salud Vegetal, Estrés Hídrico y Rendimiento de Cultivos",
      desc: "Cálculo de índices NDVI, análisis de salud de cultivos y representación y visualización del cultivo en 3D.", 
      seoDescription: "Transformamos la gestión agroindustrial mediante el monitoreo multiespectral periódico de parcelas y grandes extensiones agrícolas. Calculamos índices de vegetación avanzados (NDVI, NDRE, GNDVI) y estrés hídrico (NDWI) para detectar plagas, deficiencias nutricionales o fallas de riego semanas antes de que sean visibles al ojo humano. Complementamos con modelos 3D de cultivos para conteo automatizado de plantas y estimación de cosecha.",
      impacto: "Ahorro de hasta 30% en insumos agrícolas (agua y fertilizantes) y maximización del rendimiento por hectárea.",
      img: "/assets/img/06_Landing_Percepcion/01_agricultura.webp", 
      video: "/assets/img/06_Landing_Percepcion/agricultura.mp4",
      col: "lg:col-span-2",
      sensores: ["Cámaras Multiespectrales (RedEdge/NIR)", "Satélites de Alta Revisita", "VANT Fotogramétrico RTK"],
      entregables: ["Mapas de Vigor Vegetal (NDVI / NDRE)", "Zonificación para Fertilización Variable", "Conteo de Plantas e Inventario Agrícola IA"],
      metricas: [{ label: "Resolución VANT", value: "2 - 5 cm/píxel" }, { label: "Optimización", value: "+25% Rendimiento" }]
    },
    { 
      title: "Detección de Cambios", 
      subtitle: "Análisis Multitemporal, Obra Civil y Expansión Urbana",
      desc: "Análisis multitemporal para identificar y medir la modificación del paisaje por expansión urbana o alteraciones ambientales y supervisión de obras civiles.", 
      seoDescription: "Ejecutamos auditorías territoriales automatizadas comparando series históricas y actuales de imágenes satelitales de ultra alta resolución. Nuestro flujo de trabajo con Inteligencia Artificial Geoespacial (GeoAI) detecta construcciones no registradas para actualización catastral, invasión de derechos de vía, deforestación y avance físico de megaproyectos de infraestructura, entregando evidencia visual y métrica auditable en el tiempo.",
      impacto: "Control total sobre activos territoriales extensos, actualización catastral masiva y supervisión remota de obra.",
      img: "/assets/img/06_Landing_Percepcion/07_cambios.webp", 
      video: "/assets/img/06_Landing_Percepcion/02_cambios.mp4",
      col: "lg:col-span-2",
      sensores: ["Satélites Ópticos Submétricos (30-50 cm)", "Radar SAR Multitemporal", "Vuelos LiDAR Comparativos"],
      entregables: ["Vectores de Cambio Automatizados (GeoAI)", "Histórico Multitemporal Comparativo", "Reportes de Avance de Obra e Invasión de Vía"],
      metricas: [{ label: "Resolución Óptica", value: "Hasta 30 cm" }, { label: "Archivo Histórico", value: "+20 Años" }]
    },
    { 
      title: "Contaminación Hídrica", 
      subtitle: "Vigilancia Ambiental, Derrames y Calidad del Agua",
      desc: "Detección temprana de plumas de contaminación en cuerpos de agua y evaluación de impacto.", 
      seoDescription: "Monitoreamos océanos, ríos, presas y lagunas mediante sensores satelitales ópticos y de radar para identificar de forma temprana derrames de hidrocarburos, descargas residuales, turbidez anómala y proliferación de algas (floraciones algales nocivas o sargazo). Modelamos la dispersión de plumas contaminantes para dirigir las labores de contención ambiental y garantizar el cumplimiento normativo de la industria energética y marítima.",
      impacto: "Mitigación inmediata de daños ecológicos y monitoreo continuo de activos offshore y cuerpos de agua continentales.",
      img: "/assets/img/06_Landing_Percepcion/06_petroleo.webp", 
      video: "/assets/img/06_Landing_Percepcion/04_contaminacion.mp4",
      col: "lg:col-span-1",
      sensores: ["Radar SAR (Detección de Hidrocarburos)", "Sensores Ópticos Costeros y Marinos", "Espectrorradiómetros"],
      entregables: ["Detección y Deriva de Derrames de Petróleo", "Índices de Clorofila, Turbidez y Sedimentos", "Alertas Tempranas de Impacto Ambiental"],
      metricas: [{ label: "Cobertura", value: "Regional / Global" }, { label: "Detección", value: "Óptica + Radar" }]
    },
  ];

  const [selectedCaso, setSelectedCaso] = useState<CasoDeUso | null>(null);
  const [activeMedia, setActiveMedia] = useState<"video" | "image">("image");
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCaso(null);
    };
    if (selectedCaso) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCaso]);

  const handleOpenModal = (caso: CasoDeUso) => {
    setSelectedCaso(caso);
    setActiveMedia("image");
    setVideoError(false);
  };

  return (
    <section className="py-32 px-6 md:px-8 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariant} className="mb-16 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-3xl">
            <span className="font-sans font-bold text-[#0B3D91] tracking-[0.2em] uppercase text-xs mb-3 block">Casos de Uso Reales</span>
            <h2 className="font-poppins font-black text-4xl md:text-5xl text-slate-900 mb-4 uppercase tracking-tighter">Aplicaciones <span className="text-[#0B3D91]">Críticas</span></h2>
            <p className="font-sans text-slate-500 text-lg">Visualización y análisis de datos geoespaciales aplicados para resolver los retos más complejos de diversos sectores.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-sans font-bold text-[#0B3D91] bg-[#0B3D91]/5 border border-[#0B3D91]/15 px-4 py-2.5 rounded-full shrink-0">
            <Sparkles className="w-4 h-4 text-[#0B3D91]" />
            <span>Haz clic en cualquier tarjeta para expandir</span>
          </div>
        </motion.div>

        {/* GRID ORIGINAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] lg:auto-rows-[350px]">
          {casos.map((caso, i) => (
            <motion.div
              key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              onClick={() => handleOpenModal(caso)}
              className={`group relative overflow-hidden rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer ${caso.col}`}
            >
              <Image src={caso.img} alt={caso.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              
              {/* Velos Oscuros */}
              <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              
              {/* Borde sutil interactivo */}
              <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 rounded-[1.5rem] transition-all duration-500 z-10 pointer-events-none" />
              
              {/* Botón flotante superior derecho de indicación de clic */}
              <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-slate-900/70 backdrop-blur-md border border-white/15 group-hover:border-[#00ffff]/60 group-hover:bg-[#0B3D91] px-3.5 py-1.5 rounded-full transition-all duration-300 shadow-lg">
                <Play className="w-3 h-3 text-[#00ffff] fill-[#00ffff]" />
                <span className="font-sans font-bold text-[10px] text-white uppercase tracking-wider">Explorar</span>
              </div>

              <div className="absolute bottom-0 left-0 p-8 lg:p-10 z-20 w-full pointer-events-none">
                <h3 className="font-poppins font-bold text-2xl lg:text-3xl text-white mb-3 uppercase tracking-tight transform group-hover:-translate-y-2 transition-transform duration-500">{caso.title}</h3>
                
                {/* Texto revelado suavemente */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500">
                  <p className="font-sans text-white/80 text-[15px] leading-relaxed overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {caso.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* TARJETA FLOTANTE (MODAL CORPORATIVO / TECNOLÓGICO) */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedCaso && (
          // Padding incrementado en pantallas grandes (lg:p-20 xl:p-24) para despegarlo del header
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 lg:p-20 xl:p-24">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
              onClick={() => setSelectedCaso(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.96 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
              // Altura controlada (lg:max-h-[80vh]) para que se vea flotante y centrado
              className="relative z-10 w-full max-w-6xl max-h-[90vh] lg:max-h-[80vh] bg-slate-900 border border-white/15 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col lg:grid lg:grid-cols-12 text-white"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(11,61,145,0.4)_0%,_transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

              <button
                type="button" onClick={() => setSelectedCaso(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-950/80 hover:bg-[#0B3D91] text-white/80 hover:text-[#00ffff] border border-white/15 hover:border-[#00ffff]/50 flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="lg:col-span-5 relative bg-slate-950 flex flex-col justify-between min-h-[260px] sm:min-h-[340px] lg:min-h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 shrink-0">
                <div className="relative flex-1 w-full h-full min-h-[260px] sm:min-h-[340px]">
                  <AnimatePresence mode="wait">
                    {activeMedia === "video" && !videoError ? (
                      <motion.div key="video-player" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0 w-full h-full">
                        <video src={selectedCaso.video} poster={selectedCaso.img} autoPlay loop muted playsInline controls onError={() => setVideoError(true)} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none" />
                      </motion.div>
                    ) : (
                      <motion.div key="image-viewer" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 w-full h-full">
                        <Image src={selectedCaso.img} alt={selectedCaso.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-1.5 p-1 bg-slate-950/80 backdrop-blur-md border border-white/15 rounded-full shadow-lg">
                    <button type="button" onClick={() => { setVideoError(false); setActiveMedia("video"); }} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer ${activeMedia === "video" && !videoError ? "bg-[#0B3D91] text-[#00ffff] shadow-sm" : "text-white/70 hover:text-white"}`}>
                      <Play className="w-3.5 h-3.5 fill-current" /> <span>Video</span>
                    </button>
                    <button type="button" onClick={() => setActiveMedia("image")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-bold transition-all cursor-pointer ${activeMedia === "image" || videoError ? "bg-[#0B3D91] text-[#00ffff] shadow-sm" : "text-white/70 hover:text-white"}`}>
                      <ImageIcon className="w-3.5 h-3.5" /> <span>Imagen Satelital</span>
                    </button>
                  </div>
                </div>

                <div className="relative z-20 bg-slate-950/95 backdrop-blur-md p-4 sm:p-6 border-t border-white/10 grid grid-cols-2 gap-4">
                  {selectedCaso.metricas.map((metrica, idx) => (
                    <div key={idx} className="border-l-2 border-[#00ffff] pl-3">
                      <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-white/50 block">{metrica.label}</span>
                      <span className="font-poppins font-bold text-sm sm:text-base text-white">{metrica.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 overflow-y-auto flex flex-col justify-between gap-6 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00ffff]/10 border border-[#00ffff]/30 mb-4">
                    <Satellite className="w-3.5 h-3.5 text-[#00ffff]" />
                    <span className="font-sans font-bold text-[#00ffff] tracking-[0.18em] uppercase text-[11px]">Aplicación Crítica Geoespacial</span>
                  </div>
                  <h2 id="modal-caso-title" className="font-poppins font-black text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight leading-tight mb-2 pr-8">{selectedCaso.title}</h2>
                  <h3 className="font-sans font-bold text-sm sm:text-base text-[#00ffff]/90 mb-5">{selectedCaso.subtitle}</h3>
                  <p className="font-sans text-white/80 text-sm sm:text-[15px] leading-relaxed mb-6">{selectedCaso.seoDescription}</p>

                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0B3D91]/40 to-slate-800/40 border border-[#00ffff]/20 mb-6 flex items-start gap-3.5">
                    <Activity className="w-5 h-5 text-[#00ffff] shrink-0 mt-0.5" />
                    <div className="font-sans text-xs sm:text-sm">
                      <strong className="text-white font-bold block mb-0.5">Impacto Estratégico:</strong>
                      <span className="text-white/80 leading-relaxed">{selectedCaso.impacto}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <div className="flex items-center gap-2 mb-3">
                        <Cpu className="w-4 h-4 text-[#00ffff]" />
                        <h4 className="font-poppins font-bold text-xs uppercase tracking-wider text-white">Tecnología y Sensores</h4>
                      </div>
                      <ul className="space-y-2">
                        {selectedCaso.sensores.map((sensor, idx) => (
                          <li key={idx} className="font-sans text-xs text-white/75 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00ffff] shrink-0" />{sensor}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                      <div className="flex items-center gap-2 mb-3">
                        <Layers className="w-4 h-4 text-[#00ffff]" />
                        <h4 className="font-poppins font-bold text-xs uppercase tracking-wider text-white">Entregables Ejecutivos</h4>
                      </div>
                      <ul className="space-y-2">
                        {selectedCaso.entregables.map((item, idx) => (
                          <li key={idx} className="font-sans text-xs text-white/75 flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#00ffff] shrink-0" />{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="font-sans text-xs text-white/60 text-center sm:text-left">¿Requieres implementar este análisis en tu zona de interés?</p>
                  <a href="#contacto" onClick={() => setSelectedCaso(null)} className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#00ffff] hover:bg-white text-slate-950 font-sans font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#00ffff]/20 shrink-0">
                    <span>Solicitar Estudio</span><ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
// ==========================================
// 5. PREGUNTAS FRECUENTES (FAQ PERCEPCIÓN REMOTA)
// ==========================================
const AnimatedResponse = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ");
  const containerVariants: Variants = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const wordVariants: Variants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 15, stiffness: 100 } } };

  return (
    <motion.p className={className} variants={containerVariants} initial="hidden" animate="visible">
      {words.map((word, idx) => (
        <motion.span key={idx} variants={wordVariants} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

const PreguntasFrecuentesPercepcion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      pregunta: "¿Qué tipo de imágenes satelitales o sensores utilizan?",
      respuesta: "Trabajamos con una amplia gama de constelaciones satelitales ópticas y de radar (SAR), así como sensores LiDAR y multiespectrales montados en drones (VANT). Esto nos permite adaptarnos a la resolución, precisión y temporalidad específica que requiera tu proyecto."
    },
    {
      pregunta: "¿Es posible analizar cambios históricos en un terreno?",
      respuesta: "Sí. Mediante el análisis multitemporal podemos acceder a extensos archivos históricos de imágenes satelitales para evaluar cambios en la cobertura vegetal, la expansión urbana, la deforestación o la alteración de cuerpos de agua a lo largo de meses, años o décadas."
    },
    {
      pregunta: "¿En qué formatos se entregan los resultados del análisis?",
      respuesta: "Entregamos la información procesada en formatos estándar GIS (Shapefile, GeoTIFF, Geodatabases) totalmente interoperables con plataformas como ArcGIS y Serverbox, además de generar reportes ejecutivos listos para la toma de decisiones."
    },
    {
      pregunta: "¿Qué tan precisa es la información obtenida?",
      respuesta: "La precisión depende del sensor desplegado. Podemos lograr resoluciones submétricas (de pocos centímetros) mediante vuelos fotogramétricos con drones o LiDAR, y resoluciones de ultra alta calidad con satélites comerciales para análisis regionales extensos."
    }
  ];

  return (
    <section className="py-32 px-6 md:px-8 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <span className="font-sans font-bold text-[#0B3D91] tracking-[0.2em] uppercase text-xs mb-4 block">Resolviendo dudas</span>
          <h2 className="font-poppins font-black text-4xl md:text-5xl text-slate-900 mb-6 uppercase tracking-tighter">
            Preguntas <span className="text-[#0B3D91]">Frecuentes</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-3xl transition-all duration-500 overflow-hidden border ${openIndex === idx ? 'border-[#0B3D91]/30 shadow-xl shadow-[#0B3D91]/5' : 'border-slate-100 shadow-sm hover:border-slate-300'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 sm:p-8 text-left group focus:outline-none"
              >
                <h3 className={`font-poppins font-bold text-lg sm:text-xl pr-8 transition-colors duration-300 ${openIndex === idx ? 'text-[#0B3D91]' : 'text-slate-800 group-hover:text-[#0B3D91]'}`}>
                  {faq.pregunta}
                </h3>
                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${openIndex === idx ? 'bg-[#0B3D91] text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-[#0B3D91]/10 group-hover:text-[#0B3D91]'}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              <AnimatePresence mode="wait">
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-8 sm:px-8 sm:pb-8">
                      <div className="h-px w-full bg-gradient-to-r from-slate-100 via-slate-200 to-transparent mb-6" />
                      <AnimatedResponse text={faq.respuesta} className="font-sans text-slate-600 text-base leading-relaxed" />
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

// ==========================================
// 6. INBOUND LEAD CAPTURE: PERCEPCIÓN REMOTA (UNIFICADO CON HUBSPOT + CITA OPCIONAL)
// ==========================================
const countries = [
  { code: "+52", iso: "mx", label: "MX" },
  { code: "+1", iso: "us", label: "US" },
  { code: "+34", iso: "es", label: "ES" },
  { code: "+57", iso: "co", label: "CO" },
  { code: "+54", iso: "ar", label: "AR" },
  { code: "+56", iso: "cl", label: "CL" },
  { code: "+51", iso: "pe", label: "PE" },
];

const PercepcionLeadCapture = () => {
  const [wantsAppointment, setWantsAppointment] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonthDate, setCurrentMonthDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedThemes, setSelectedThemes] = useState<string[]>(["Cartografía"]);

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
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  ];
  const themes = [
    "Gemelos Digitales", "Catastro", "Soluciones Serverbox", "Cartografía",
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
    setSelectedThemes(["Cartografía"]);
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
      alert("Por favor selecciona un día y horario en el calendario, o desactiva la opción de agendar cita.");
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
      date: wantsAppointment && selectedDate ? selectedDate.toISOString().split("T")[0] : "",
      time: wantsAppointment && selectedTime ? selectedTime : "Por coordinar",
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
        const errorDetail = result?.details?.errors?.[0]?.message || result?.details?.message || result?.error || "Error desconocido en HubSpot";
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
    <section id="contacto" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-slate-50 relative z-10 overflow-hidden border-t border-slate-200">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0B3D91]/5 rounded-full blur-[80px] pointer-events-none -translate-x-1/4 translate-y-1/3" />

      <div className="max-w-6xl mx-auto relative z-20">
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          <div className="lg:col-span-5 p-8 sm:p-10 md:p-12 lg:py-16 lg:px-12 flex flex-col justify-center relative overflow-hidden min-w-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(11,61,145,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(11,61,145,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#0B3D91]/5 border border-[#0B3D91]/10 rounded-full mb-8 w-max max-w-full">
                  <Globe className="w-4 h-4 text-[#0B3D91] shrink-0" />
                  <span className="font-sans font-bold text-[#0B3D91] tracking-[0.18em] uppercase text-xs truncate">
                    Estudio de Viabilidad Espacial
                  </span>
                </div>

                <h2 className="font-poppins font-black text-3xl sm:text-4xl xl:text-[2.65rem] text-slate-900 tracking-tighter mb-7 leading-[1.12]">
                  Monitorea el territorio. <br />
                  <span className="text-[#0B3D91]">Anticípate al riesgo.</span>
                </h2>

                <p className="font-sans text-slate-600 text-base sm:text-lg leading-relaxed mb-10">
                  Toma decisiones basadas en evidencia satelital. Solicita un
                  análisis preliminar para conocer la disponibilidad de imágenes,
                  resolución y sensores óptimos para evaluar tu zona de interés.
                </p>
              </div>

              <ul className="space-y-8 font-sans text-slate-700 mt-2">
                <li className="flex items-start gap-4">
                  <div className="bg-[#0B3D91]/10 p-2.5 rounded-full shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-[#0B3D91]" />
                  </div>
                  <div className="min-w-0">
                    <strong className="block text-slate-900 font-bold text-base mb-1.5">
                      Evaluación de Cobertura y Resolución
                    </strong>
                    <span className="text-slate-600 text-sm leading-relaxed block">
                      Validamos la factibilidad técnica y te recomendamos el
                      satélite o sensor ideal (SAR, Óptico, LiDAR) para tu
                      objetivo.
                    </span>
                  </div>
                </li>
              </ul>

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
                        {selectedDate.toLocaleDateString("es-MX", { weekday: "short", day: "numeric", month: "short" })}{" "}
                        {selectedTime ? `• ${selectedTime} hrs` : "(Elige una hora)"}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-50/50 p-6 sm:p-8 md:p-10 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-center min-w-0 overflow-hidden relative">
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
                    {wantsAppointment ? "¡Cita y Solicitud Recibidas!" : "¡Solicitud Recibida!"}
                  </h3>
                  <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed px-4 max-w-md">
                    Un especialista geoespacial evaluará tu zona de interés y se pondrá en contacto a tu correo corporativo pronto.
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
                  <h3 className="font-poppins font-black text-xl sm:text-2xl text-slate-900 mb-1">
                    Solicitar Análisis
                  </h3>
                  <p className="font-sans text-slate-500 text-xs sm:text-sm mb-5">
                    Cuéntanos sobre tu organización y proyecto.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3.5 font-sans w-full min-w-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                      <div className="min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nombre(s) <span className="text-red-500">*</span></label>
                        <input required type="text" value={name} placeholder="Ej. Roberto" onChange={(e) => setName(e.target.value)} className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800 placeholder-slate-400" />
                      </div>
                      <div className="min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Apellidos <span className="text-red-500">*</span></label>
                        <input required type="text" value={lastname} placeholder="Ej. Sánchez" onChange={(e) => setLastname(e.target.value)} className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800 placeholder-slate-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                      <div className="min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Cargo / Puesto <span className="text-red-500">*</span></label>
                        <input required type="text" value={jobTitle} placeholder="Ej. Analista GIS" onChange={(e) => setJobTitle(e.target.value)} className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800 placeholder-slate-400" />
                      </div>
                      <div className="min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Empresa / Proyecto <span className="text-red-500">*</span></label>
                        <input required type="text" value={company} placeholder="Organización o proyecto" onChange={(e) => setCompany(e.target.value)} className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800 placeholder-slate-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                      <div className="min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Correo Corporativo <span className="text-red-500">*</span></label>
                        <input required type="email" value={email} placeholder="roberto@tuempresa.com" onChange={(e) => setEmail(e.target.value)} className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800 placeholder-slate-400" />
                      </div>
                      <div className="min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono <span className="text-red-500">*</span></label>
                        <div className="relative flex items-center w-full bg-white border border-slate-200 rounded-xl focus-within:border-[#0B3D91] focus-within:ring-2 focus-within:ring-[#0B3D91]/20 transition-all">
                          <button
                            type="button"
                            onClick={() => setShowDropdown(!showDropdown)}
                            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                            className="w-[76px] h-full px-3 py-2.5 flex items-center justify-center gap-2 border-r border-slate-200 hover:bg-slate-50 rounded-l-xl transition-colors shrink-0 outline-none cursor-pointer"
                          >
                            <img src={`https://flagcdn.com/w20/${selectedCountry?.iso}.png`} alt="Bandera" className="w-4 h-auto rounded-xs shrink-0" />
                            <span className="font-bold text-xs text-slate-700 leading-none">{selectedCountry?.label}</span>
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
                                    onClick={() => { setCountryCode(c.code); setShowDropdown(false); }}
                                    className="w-full py-1.5 px-3 hover:bg-slate-50 flex items-center justify-between transition-colors cursor-pointer"
                                  >
                                    <div className="flex items-center gap-2">
                                      <img src={`https://flagcdn.com/w20/${c.iso}.png`} alt={c.label} className="w-4 h-auto rounded-xs" />
                                      <span className="font-bold text-xs text-slate-700">{c.label}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-mono">{c.code}</span>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <input required type="tel" value={phone} onChange={handlePhoneChange} maxLength={15} placeholder="55 1234 5678" className="w-full min-w-0 pl-3.5 pr-3 py-2.5 bg-transparent rounded-r-xl outline-none text-sm text-slate-800 placeholder-slate-400" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                      <div className="flex flex-col min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Temas de interés (Mín. 1, Máx. 2) <span className="text-red-500">*</span></label>
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          {themes.map((theme) => (
                            <button
                              key={theme}
                              type="button"
                              onClick={() => toggleTheme(theme)}
                              className={`p-2 rounded-xl border text-[11px] font-bold transition-all duration-200 flex items-center justify-center text-center cursor-pointer leading-tight ${selectedThemes.includes(theme) ? "bg-[#0B3D91] text-[#00ffff] border-[#0B3D91] shadow-sm" : "bg-white border-slate-200 text-slate-600 hover:border-[#0B3D91] hover:text-[#0B3D91]"}`}
                            >
                              {theme}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Comentarios Adicionales <span className="text-slate-400 font-sans font-normal">(Opcional)</span></label>
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Indica tu zona de interés o requerimiento satelital (SAR, Óptico, LiDAR)..." className="w-full min-w-0 flex-1 min-h-[76px] px-3.5 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 transition-all text-xs text-slate-800 placeholder-slate-400 resize-none" />
                      </div>
                    </div>

                    <div className="pt-1 w-full min-w-0">
                      <div onClick={handleToggleAppointment} className={`p-3 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${wantsAppointment ? "bg-[#0B3D91]/5 border-[#0B3D91]/30" : "bg-white border-slate-200 hover:border-[#0B3D91]/40"}`}>
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${wantsAppointment ? "bg-[#0B3D91] text-[#00ffff]" : "bg-slate-100 text-slate-600"}`}>
                            <CalendarIcon size={17} />
                          </div>
                          <div className="min-w-0">
                            <span className="block text-xs font-bold text-slate-800 truncate">¿Deseas proponer fecha y hora de una vez?</span>
                            <span className="block text-[11px] text-slate-500 truncate">Opcional — Agendar ahora o coordinar por correo</span>
                          </div>
                        </div>
                        <div className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 shrink-0 flex items-center ${wantsAppointment ? "bg-[#0B3D91]" : "bg-slate-300"}`}>
                          <div className={`w-5 h-5 rounded-full shadow-xs transition-transform duration-300 ${wantsAppointment ? "bg-[#00ffff] translate-x-5" : "bg-white translate-x-0"}`} />
                        </div>
                      </div>

                      <AnimatePresence>
                        {wantsAppointment && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                            <div className="mt-3 p-4 bg-white rounded-2xl border border-slate-200">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5"><Clock size={14} className="text-[#0B3D91]" /> Elige día y hora (Lun - Vie) <span className="text-red-500">*</span></span>
                                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-full p-0.5">
                                  <button type="button" onClick={handlePrevMonth} disabled={isPrevDisabled} className={`p-1 rounded-full transition-all ${isPrevDisabled ? "opacity-30 cursor-not-allowed" : "hover:bg-white text-slate-700 hover:text-[#0B3D91]"}`}><ChevronLeft size={14} /></button>
                                  <span className="font-bold text-slate-700 capitalize text-xs w-28 text-center select-none">{monthYearString}</span>
                                  <button type="button" onClick={handleNextMonth} disabled={isNextDisabled} className={`p-1 rounded-full transition-all ${isNextDisabled ? "opacity-30 cursor-not-allowed" : "hover:bg-white text-slate-700 hover:text-[#0B3D91]"}`}><ChevronRight size={14} /></button>
                                </div>
                              </div>
                              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1.5">
                                {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"].map((d) => (<div key={d}>{d}</div>))}
                              </div>
                              <div className="grid grid-cols-7 gap-y-1 gap-x-1 mb-3">
                                {blanks.map((b) => (<div key={`b-${b}`} />))}
                                {days.map((d) => {
                                  const date = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), d);
                                  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                                  const isPast = date < today;
                                  const isTooFar = date > maxDate;
                                  const isDisabled = isWeekend || isPast || isTooFar;
                                  const isSelected = selectedDate?.getDate() === d && selectedDate?.getMonth() === currentMonthDate.getMonth();
                                  return (
                                    <button
                                      key={d} type="button" disabled={isDisabled} onClick={() => setSelectedDate(date)}
                                      className={`h-8 w-8 mx-auto rounded-full text-xs transition-all duration-200 flex items-center justify-center ${isSelected ? "bg-[#0B3D91] text-[#00ffff] shadow-sm font-bold scale-105" : isDisabled ? "opacity-25 cursor-not-allowed line-through decoration-slate-300" : "hover:bg-slate-100 text-slate-700 hover:text-[#0B3D91] cursor-pointer"}`}
                                    >
                                      {d}
                                    </button>
                                  );
                                })}
                              </div>
                              {selectedDate ? (
                                <div className="pt-2 border-t border-slate-100">
                                  <p className="text-[11px] font-bold text-slate-600 mb-2">Horarios disponibles: <span className="text-red-500">*</span></p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {getFilteredTimes().map((t) => (
                                      <button key={t} type="button" onClick={() => setSelectedTime(t)} className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${selectedTime === t ? "bg-[#0B3D91] text-[#00ffff] border-[#0B3D91]" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-[#0B3D91] hover:text-[#0B3D91]"}`}>{t}</button>
                                    ))}
                                  </div>
                                </div>
                              ) : (<p className="text-center text-[11px] text-slate-400 py-1">Toca un día disponible para elegir la hora.</p>)}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="space-y-2 pt-1">
                      <label className="flex items-start gap-2.5 cursor-pointer group">
                        <div className="relative flex items-start mt-0.5 shrink-0">
                          <input type="checkbox" required checked={acceptComms} onChange={(e) => setAcceptComms(e.target.checked)} className="peer appearance-none w-4 h-4 border-2 border-slate-300 rounded bg-white checked:bg-[#0B3D91] checked:border-[#0B3D91] transition-all cursor-pointer" />
                          <CheckCircle2 className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-[11px] text-slate-600 leading-snug group-hover:text-slate-800 transition-colors">
                          Acepto recibir comunicaciones, noticias y ofertas exclusivas de SIGSA. <span className="text-red-500">*</span>
                        </span>
                      </label>
                      <label className="flex items-start gap-2.5 cursor-pointer group">
                        <div className="relative flex items-start mt-0.5 shrink-0">
                          <input type="checkbox" required checked={acceptData} onChange={(e) => setAcceptData(e.target.checked)} className="peer appearance-none w-4 h-4 border-2 border-slate-300 rounded bg-white checked:bg-[#0B3D91] checked:border-[#0B3D91] transition-all cursor-pointer" />
                          <CheckCircle2 className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-[11px] text-slate-600 leading-snug group-hover:text-slate-800 transition-colors">
                          Acepto el almacenamiento y manejo de mis datos personales de acuerdo con las políticas vigentes. <span className="text-red-500">*</span>
                        </span>
                      </label>
                    </div>

                    <div className="pt-2">
                      <button type="submit" disabled={isSubmitting || !isFormComplete} className="w-full bg-[#0B3D91] text-white font-sans font-bold tracking-widest uppercase text-xs sm:text-sm py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#00ffff] hover:text-[#0B3D91] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#0B3D91]/20 group cursor-pointer">
                        {isSubmitting ? (<><Loader2 className="w-5 h-5 animate-spin" /> Procesando...</>) : wantsAppointment ? (<>Confirmar Cita y Análisis <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>) : (<>Solicita más información <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>)}
                      </button>
                      <p className="text-center font-sans text-[10px] text-slate-400 mt-5 pt-1 leading-relaxed px-4">
                        Puedes consultar los términos legales, nuestro aviso de privacidad y la política de uso de datos personales en el pie de página de SIGSA.
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

// ==========================================
// MAIN ASSEMBLY: PERCEPCIÓN REMOTA
// ==========================================
export default function PercepcionRemotaLanding() {
  return (
    <div className="relative text-left selection:bg-[#00ffff] selection:text-[#0B3D91]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@700;900&display=swap');
        .font-poppins { font-family: 'Space Grotesk', sans-serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
      `}</style>
      
      <HeroRemota />
      <SolucionesEspecializadas />
      <MetodologiaSection />
      <CasosUso />
      <PreguntasFrecuentesPercepcion />
      <PercepcionLeadCapture />
      
    </div>
  );
}