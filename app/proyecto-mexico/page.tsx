"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  CheckCircle2, ChevronDown, RefreshCw, Target, TrendingUp, 
  Building2, Droplets, Tractor, Route, X, Info,
  TreePine, Zap, ArrowRight,Activity, 
  MapPin, CheckCircle, Send, Loader2, Calendar as CalendarIcon, Clock, ChevronRight, ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ==========================================
// INTERFACES DE TYPESCRIPT
// ==========================================
interface FichaTecnica {
  subtitulo: string;
  infraUrbana: string;
  viasCom: string;
  infraRural: string;
  resolucionPixel: string;
  resolucionEspectral: string;
  usos: string;
}

interface EscalaCartografica {
  scale: string;
  hex: string;
  title: string;
  img: string;
  bgColor: string;
  textColor: string;
  ficha: FichaTecnica;
}

interface ImageComparatorProps {
  bgImg: string;
  fgImg: string;
  title: string;
  subtitle: string;
}

const fadeInVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// ==========================================
// 1. HERO BANNER
// ==========================================
const HeroPromex = () => {
  const desktopImg = "/assets/img/02_Landing_PROMEX/banner_hor_mex.webp";
  const mobileImg = "/assets/img/02_Landing_PROMEX/banner_ver_mex.webp";

  return (
    <section className="relative w-full min-h-[100dvh] md:min-h-[800px] md:aspect-[16/9] max-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <motion.img 
          src={mobileImg} alt="Proyecto México (Móvil)"
          initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-full h-full object-cover block md:hidden"
        />
        <motion.img 
          src={desktopImg} alt="Proyecto México (Escritorio)"
          initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-full h-full object-cover hidden md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-slate-900/95 via-slate-900/60 to-transparent z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-8 w-full mt-28 mb-24 sm:mb-32 md:mb-0 md:mt-20">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <span className="font-sans font-bold text-[#00ffff] tracking-[0.3em] uppercase mb-6 block text-sm border-l-2 border-[#00ffff] pl-4">
            Cartografía Nacional
          </span>
          <h1 className="font-poppins font-black text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tighter leading-none mb-6">
            PROYECTO <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00ffff]/60">MÉXICO®</span>
          </h1>
          <p className="font-sans text-white/80 text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed font-light mb-10">
            La plataforma de datos geoespaciales más completa para el análisis estratégico del territorio.
          </p>
        </motion.div>
      </div>

      <a href="#sobre-promex" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-[#00ffff]/70 animate-bounce cursor-pointer">
        <span className="font-sans text-xs tracking-widest uppercase">Descubrir</span>
        <ChevronDown className="w-5 h-5 text-white/80" />
      </a>
    </section>
  );
};

// ==========================================
// 2. TRUST BAR
// ==========================================
const TrustBar = () => {
  const baseLogos = [
    "/assets/img/01_LANDING_SIGSA/Clientes y Partners/cliente_2.webp",
    "/assets/img/01_LANDING_SIGSA/Clientes y Partners/cliente_5.webp",
    "/assets/img/01_LANDING_SIGSA/Clientes y Partners/cliente_3.webp",
    "/assets/img/01_LANDING_SIGSA/Clientes y Partners/cliente_4.webp",
    "/assets/img/01_LANDING_SIGSA/Clientes y Partners/cliente_1.webp",
  ];

  const multipliedLogos = Array(12).fill(baseLogos).flat();

  return (
    <section className="py-12 bg-white border-b border-slate-100 overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-8 mb-8">
        <p className="font-sans font-bold text-sm text-center text-slate-400 tracking-widest uppercase">Instituciones que impulsan el desarrollo con nosotros</p>
      </div>
      
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />
      
      <div className="flex w-full overflow-hidden relative">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, ease: "linear", duration: 100 }} 
          className="flex w-max items-center"
        >
          {multipliedLogos.map((logo, idx) => (
            <div key={idx} className="relative w-32 h-16 mx-10 flex-shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <Image src={logo} alt={`Cliente ${idx}`} fill className="object-contain" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================
// 3. ¿QUÉ ES PROYECTO MÉXICO?
// ==========================================
const QuienesSomosPromex = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const caracteristicas = [
    { Icon: RefreshCw, title: "Actualización", desc: "Información de hoy para las decisiones del mañana.", img: "/assets/img/02_Landing_PROMEX/actualizacion.webp" },
    { Icon: Target, title: "Precisión", desc: "La representación más fiel del territorio garantizada.", img: "/assets/img/02_Landing_PROMEX/precision.webp" },
    { Icon: TrendingUp, title: "Evolución", desc: "Nuestra cartografía evoluciona junto con el entorno.", img: "/assets/img/02_Landing_PROMEX/evolucion.webp" }
  ];

  return (
    <section id="sobre-promex" className="py-32 px-8 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ffff]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariant} className="lg:col-span-7">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#0B3D91]/10 bg-[#0B3D91]/5 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#0B3D91] animate-pulse" />
            <span className="font-sans font-bold text-[#0B3D91] tracking-[0.2em] uppercase text-xs">Exclusiva SIGSA</span>
          </div>

          <h2 className="font-poppins font-black text-4xl md:text-6xl text-slate-900 mb-6 tracking-tighter leading-[1.1]">
            ¿Qué es <span className="text-[#0B3D91]">Proyecto México?</span>
          </h2>
          <p className="font-sans text-slate-600 text-lg leading-relaxed mb-12 max-w-2xl">
            Proyecto México® es una iniciativa exclusiva de SIGSA que proporciona la base cartográfica más precisa del país. Mapeamos el territorio a múltiples escalas para tomar decisiones basadas en la realidad física actual.
          </p>
          
          <div className="grid sm:grid-cols-1 gap-4">
            {caracteristicas.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:border-[#0B3D91]/30">
                <div onClick={() => setActiveCard(activeCard === idx ? null : idx)} className="flex items-center justify-between p-5 cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl transition-colors duration-500 ${activeCard === idx ? 'bg-[#0B3D91] text-white' : 'bg-[#0B3D91]/5 text-[#0B3D91] group-hover:bg-[#0B3D91]/10'}`}>
                      <item.Icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-poppins font-bold text-xl text-slate-900 mb-1">{item.title}</h4>
                      <p className="font-sans text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeCard === idx ? 'rotate-180 text-[#0B3D91]' : ''}`} />
                </div>
                <AnimatePresence>
                  {activeCard === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-5 pb-5">
                      <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden shadow-inner mt-2">
                        <Image src={item.img} alt={item.title} fill className="object-cover" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="lg:col-span-5 relative w-full aspect-[4/3] lg:aspect-square max-w-md mx-auto">
          <div className="absolute inset-0 border-2 border-[#0B3D91]/10 rounded-[3rem] transform translate-x-6 translate-y-6" />
          <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl shadow-[#0B3D91]/20 border border-white">
            <Image src="/assets/img/02_Landing_PROMEX/promex_bannerW.webp" alt="Mapa de Proyecto México" fill className="object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================
// 4. DISTRIBUCIÓN CARTOGRÁFICA Y FICHA TÉCNICA (PREMIUM BENTO UI)
// ==========================================
const DistribucionCartografica = () => {
  const [selectedScale, setSelectedScale] = useState<EscalaCartografica | null>(null);

  const escalas: EscalaCartografica[] = [
    { 
      scale: "1:20,000", hex: "#0B3D91", title: "(E13-R)", img: "/assets/img/02_Landing_PROMEX/DistribucionCarto/05_20k.webp", bgColor: "bg-[#0B3D91]", textColor: "text-white", 
      ficha: { 
        subtitulo: "Cartografía vectorial de representación regional generalizada.",
        infraUrbana: "Aeropuertos, puentes, redes eléctricas, oleoductos y equipamiento mayor. Delimitación de manzanas y construcciones relevantes.",
        viasCom: "Carreteras, vías férreas, terracerías, brechas principales y rutas estatales/federales.",
        infraRural: "Curvas de nivel (20m/100m). Hidrología principal (ríos, presas, costas). Identificación de cultivos, parcelas y zonas naturales representativas.",
        resolucionPixel: "Vectorial", 
        resolucionEspectral: "Regional", 
        usos: "Planeación regional, análisis territorial, gestión del territorio, infraestructura, conectividad, estudios ambientales." 
      } 
    },
    { 
      scale: "1:10,000", hex: "#064e3b", title: "(E13-R4)", img: "/assets/img/02_Landing_PROMEX/DistribucionCarto/04_10k.webp", bgColor: "bg-emerald-900", textColor: "text-emerald-50", 
      ficha: { 
        subtitulo: "Representación territorial de detalle intermedio.",
        infraUrbana: "Calles principales y secundarias, manzanas, construcciones relevantes, equipamiento urbano, aeropuertos, puentes.",
        viasCom: "Carreteras, vialidades urbanas y rurales, caminos, vías férreas, terracerías y principales conexiones.",
        infraRural: "Hidrografía, cuerpos de agua, curvas de nivel, parcelas, áreas agrícolas y zonas naturales.",
        resolucionPixel: "Vectorial", 
        resolucionEspectral: "Intermedio", 
        usos: "Planeación urbana y regional, gestión de infraestructura, estudios ambientales, movilidad, ordenamiento territorial." 
      } 
    },
    { 
      scale: "1:5,000", hex: "#581c87", title: "(E13-R4-47)", img: "/assets/img/02_Landing_PROMEX/DistribucionCarto/03_5k.webp", bgColor: "bg-purple-900", textColor: "text-purple-50", 
      ficha: { 
        subtitulo: "Representación territorial de detalle para análisis espacial.",
        infraUrbana: "Manzanas, construcciones, equipamiento urbano, vialidades, puentes, aeropuertos e infraestructura eléctrica.",
        viasCom: "Vialidades principales y secundarias, calles, carreteras, caminos, terracerías, vías férreas.",
        infraRural: "Parcelas, áreas agrícolas, hidrografía, cuerpos de agua, curvas de nivel, zonas naturales.",
        resolucionPixel: "Vectorial", resolucionEspectral: "Alto", 
        usos: "Planeación urbana, gestión territorial, desarrollo de infraestructura, movilidad, estudios ambientales e inventarios." 
      } 
    },
    { 
      scale: "1:2,000", hex: "#881337", title: "(E13-R4-78-G)", img: "/assets/img/02_Landing_PROMEX/DistribucionCarto/02_2k.webp", bgColor: "bg-rose-900", textColor: "text-rose-50", 
      ficha: { 
        subtitulo: "Representación territorial de alta resolución cartográfica.",
        infraUrbana: "Manzanas, construcciones, vialidades, equipamiento, instalaciones urbanas, infraestructura eléctrica.",
        viasCom: "Calles, avenidas, carreteras, caminos, terracerías, brechas, vías férreas asociadas a conectividad.",
        infraRural: "Parcelas, áreas agrícolas, canales, cuerpos de agua, hidrografía, zonas naturales.",
        resolucionPixel: "Vectorial", resolucionEspectral: "Muy Alto", 
        usos: "Diseño y gestión de infraestructura, desarrollo urbano, movilidad, análisis catastral, proyectos territoriales." 
      } 
    },
    { 
      scale: "1:1,000", hex: "#b45309", title: "(E13-R4-47-E)", img: "/assets/img/02_Landing_PROMEX/DistribucionCarto/01_1k.webp", bgColor: "bg-amber-700", textColor: "text-amber-50", 
      ficha: { 
        subtitulo: "Precisión alta, adecuada para mapas urbanos y catastros.",
        infraUrbana: "Construcciones, marquesinas, domos, manzanas, predios, banquetas, glorietas, bardas, kioskos, luminarias.",
        viasCom: "Carreteras, caminos, vías férreas, terracerías, veredas, andadores, helipuertos, puentes peatonales.",
        infraRural: "Áreas agrícolas, canales de riego, acequias, bordos, escurrimientos, obras hidráulicas, bancos de material.",
        resolucionPixel: "Vectorial", resolucionEspectral: "Milimétrico", usos: "Catastro urbano, Planeación urbana detallada, Obras Públicas, Regularización territorial." 
      } 
    },
    { 
      scale: "1:500", hex: "#164e63", title: "(E13-R4-47-E-20)", img: "/assets/img/02_Landing_PROMEX/DistribucionCarto/00_500.webp", bgColor: "bg-cyan-900", textColor: "text-cyan-50", 
      ficha: { 
        subtitulo: "Precisión extrema, nivel de detalle máximo en el mercado.",
        infraUrbana: "Elementos catastrales detallados, balcones, jardineras, parquímetros, bancas, postes de cámara, paneles solares.",
        viasCom: "Vías de comunicación detalladas, banquetas, pasos peatonales, rampas, ciclovías.",
        infraRural: "Detalle de caminos vecinales, cercados y otras estructuras menores del relieve geográfico.",
        resolucionPixel: "Vectorial 3D", resolucionEspectral: "Máximo Detalle", usos: "Proyectos ejecutivos, Catastro de alta precisión, Diseño urbano, Arbolado, Estudios prediales de infraestructura." 
      } 
    },
  ];
  
  useEffect(() => {
    if (selectedScale) document.body.style.overflow = 'hidden';
    else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedScale]);

  return (
    <>
      <section id="escalas" className="pt-32 pb-8 px-6 md:px-8 bg-slate-950 relative overflow-hidden">
        
        {/* Background Decor */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ffff]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-[#0B3D91]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="font-sans font-bold text-[#00ffff] tracking-[0.3em] uppercase text-xs mb-4 block">Resolución sin precedentes</span>
            <h2 className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6 uppercase tracking-tighter">Distribución Cartográfica</h2>
            <p className="font-sans text-slate-400 text-lg max-w-2xl mx-auto">Selecciona una tarjeta para desplegar la ficha técnica detallada y sus casos de uso.</p>
          </div>

          <div className="flex flex-col xl:flex-row gap-8 items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="w-full max-w-[250px] relative drop-shadow-[0_0_30px_rgba(0,255,255,0.15)] hidden xl:block">
              <Image src="/assets/img/02_Landing_PROMEX/DistribucionCarto/inicio_banner.png" alt="Mapa General" width={300} height={600} className="w-full h-auto object-contain" />
            </motion.div>
            
            <div className="w-full flex-1 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 justify-items-center">
              {escalas.map((item, idx) => (
                <motion.div 
                  key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariant} transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedScale(item)}
                  className="group w-full max-w-[220px] cursor-pointer rounded-3xl overflow-hidden bg-slate-900/80 backdrop-blur-md border border-slate-700/80 hover:border-[#00ffff]/60 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,255,255,0.15)] hover:-translate-y-2 flex flex-col"
                >
                  <div className={`h-[70px] flex flex-col items-center justify-center p-2 text-center border-b border-slate-700/50 ${item.bgColor}`}>
                    <h3 className={`font-poppins font-black text-[15px] sm:text-[17px] ${item.textColor}`}>{item.title}</h3>
                    <p className="font-sans font-bold text-white/90 text-[10px] sm:text-xs tracking-widest mt-0.5">{item.scale}</p>
                  </div>
                  <div className="relative flex-1 aspect-[4/5] w-full">
                    <Image src={item.img} alt={item.scale} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 flex items-end justify-center pb-5">
                      <div className="flex items-center gap-2 text-[#00ffff] bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#00ffff]/30 text-[11px] font-bold font-sans transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                        <Info size={14} /> Ficha Técnica
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* MODAL FICHA TÉCNICA (SOLUCIÓN DEFINITIVA RESPONSIVA)        */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedScale && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            /* IMPORTANTE: En móvil anclamos al fondo (items-end), en PC centramos (md:items-center) */
            className="fixed inset-0 z-[99999] flex items-end md:items-center justify-center p-0 md:p-6 lg:p-8 bg-slate-950/90 backdrop-blur-xl"
            onClick={() => setSelectedScale(null)}
          >
            <motion.div 
              onClick={(e) => e.stopPropagation()} 
              initial={{ y: "100%", opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: "100%", opacity: 0 }} 
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              /* IMPORTANTE: Alto estricto en móvil (h-[92dvh]) para evitar desbordes. Flex-col permite scroll interno */
              className="w-full max-w-[1200px] h-[92dvh] md:h-auto md:max-h-[90vh] bg-slate-900 rounded-t-[1.5rem] md:rounded-[2rem] border-t border-slate-700 md:border shadow-[0_-20px_50px_rgba(0,0,0,0.5)] md:shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative"
            >
              {/* Retícula técnica interna del modal */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              
              {/* Indicador de "deslizar hacia abajo" oculto en PC, visible en móvil */}
              <div className="w-full flex justify-center pt-3 pb-1 md:hidden absolute top-0 left-0 z-20 pointer-events-none">
                <div className="w-12 h-1.5 bg-slate-600 rounded-full" />
              </div>
              
              {/* Header Modal - Ajustado para que el texto respire y no choque con la X */}
              <div className="relative z-10 flex items-start sm:items-center justify-between px-5 sm:px-8 md:px-10 pt-8 pb-5 md:py-6 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md shrink-0">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 pr-4">
                  <div className="w-3 h-3 rounded-full animate-pulse shrink-0 mt-2 sm:mt-0" style={{ backgroundColor: selectedScale.hex, boxShadow: `0 0 10px ${selectedScale.hex}` }} />
                  <div className="flex flex-col">
                    <h3 className="font-poppins font-black text-xl sm:text-2xl md:text-3xl text-white tracking-tight leading-none uppercase">
                      Hoja de Datos <span style={{ color: selectedScale.hex }}>{selectedScale.title}</span>
                    </h3>
                    <p className="font-mono text-[10px] md:text-xs text-slate-400 mt-2 uppercase tracking-widest">
                      ESCALA BASE: {selectedScale.scale}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedScale(null)} 
                  className="w-10 h-10 md:w-11 md:h-11 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body Modal (Bento Grid) - Manejo estricto del scroll para móviles */}
              <div className="relative z-10 p-5 sm:p-6 md:p-10 overflow-y-auto custom-scrollbar flex-1 min-h-0 pb-12 md:pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Columna Izquierda: Visual y KPIs */}
                  <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
                    {/* Tarjeta de Imagen Principal */}
                    <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 group shadow-lg">
                      <Image src={selectedScale.img} alt={selectedScale.scale} fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 border-4 border-slate-900/50 pointer-events-none z-10 rounded-2xl" />
                      <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2">
                        <MapPin size={14} className="text-[#00ffff]" />
                        <span className="font-mono text-[10px] font-bold text-[#00ffff] uppercase tracking-wider">Muestra</span>
                      </div>
                    </div>

                    {/* KPIs (Dashboard Style) */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 flex flex-col justify-center">
                        <span className="font-mono text-[9px] text-slate-400 tracking-widest uppercase mb-1 flex items-center gap-1.5">
                          <Target size={12} className="text-slate-500" /> Formato Base
                        </span>
                        <span className="font-poppins font-bold text-lg md:text-xl text-white leading-tight">
                          {selectedScale.ficha.resolucionPixel}
                        </span>
                      </div>
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 flex flex-col justify-center">
                        <span className="font-mono text-[9px] text-slate-400 tracking-widest uppercase mb-1 flex items-center gap-1.5">
                          <Activity size={12} className="text-slate-500" /> Detalle
                        </span>
                        <span className="font-poppins font-bold text-lg md:text-xl text-white leading-tight">
                          {selectedScale.ficha.resolucionEspectral}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Columna Derecha: Specs Detalladas */}
                  <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
                    {/* Caja de Usos Estratégicos */}
                    <div className="bg-gradient-to-br from-[#0B3D91]/20 to-transparent border border-[#0B3D91]/30 rounded-2xl p-5 md:p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Zap size={64} />
                      </div>
                      <h4 className="font-mono text-[10px] text-[#00ffff] tracking-widest uppercase mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#00ffff] rounded-sm" /> Enfoque de Proyecto
                      </h4>
                      <p className="font-poppins text-lg md:text-xl text-white font-bold leading-snug max-w-2xl relative z-10">
                        "{selectedScale.ficha.usos}"
                      </p>
                      <p className="font-sans text-sm text-slate-400 mt-3 max-w-2xl relative z-10">
                        {selectedScale.ficha.subtitulo}
                      </p>
                    </div>

                    {/* Bento de Infraestructura */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Urbana */}
                      <div className="bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/60 transition-colors p-5 rounded-2xl flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-slate-700/50 text-[#00ffff] border border-slate-600/50">
                            <Building2 size={16} />
                          </div>
                          <h4 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wide">Urbana</h4>
                        </div>
                        <p className="font-sans text-sm text-slate-400 leading-relaxed">
                          {selectedScale.ficha.infraUrbana}
                        </p>
                      </div>
                      
                      {/* Vías */}
                      <div className="bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/60 transition-colors p-5 rounded-2xl flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-slate-700/50 text-blue-400 border border-slate-600/50">
                            <Route size={16} />
                          </div>
                          <h4 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wide">Vialidades</h4>
                        </div>
                        <p className="font-sans text-sm text-slate-400 leading-relaxed">
                          {selectedScale.ficha.viasCom}
                        </p>
                      </div>

                      {/* Rural */}
                      <div className="bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/60 transition-colors p-5 rounded-2xl flex flex-col md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-slate-700/50 text-emerald-400 border border-slate-600/50">
                            <TreePine size={16} />
                          </div>
                          <h4 className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wide">Rural e Hídrica</h4>
                        </div>
                        <p className="font-sans text-sm text-slate-400 leading-relaxed">
                          {selectedScale.ficha.infraRural}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


// ==========================================
// 5. USOS CARTOGRAFÍA (Diseño igual a Casos de Éxito Home)
// ==========================================
const UsosCartografia = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Función para realizar el scroll suave hacia la sección de contacto
  const scrollToContact = () => {
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const tabs = [
    { 
      id: "catastro", 
      icon: <Building2 size={18} />, 
      label: "Catastro Predial", 
      badgeIcon: <Target size={14} className="text-[#0B3D91]" />,
      badgeText: "Optimización de Recaudación",
      title: "CATASTRO PREDIAL", 
      desc: "Actualización masiva de bases de datos catastrales mediante cartografía de alta precisión. Identificamos discrepancias entre la base fiscal y la realidad física del territorio, detectando metros de construcción no declarados y optimizando la recaudación municipal sin inspecciones invasivas.", 
      img: "/assets/img/02_Landing_PROMEX/usos_CARTO/usos_catastro_1.webp" 
    },
    { 
      id: "hidrica", 
      icon: <Droplets size={18} />, 
      label: "Gestión Hídrica", 
      badgeIcon: <RefreshCw size={14} className="text-blue-500" />,
      badgeText: "Prevención y Simulación",
      title: "GESTIÓN HÍDRICA", 
      desc: "Análisis de cuencas, modelado de escurrimientos y prevención de inundaciones. Generamos Modelos Digitales de Elevación (MDE) que permiten simular escenarios hidrológicos con precisión centimétrica para salvaguardar infraestructura y población.", 
      img: "/assets/img/02_Landing_PROMEX/usos_CARTO/promex_hidri_1.webp" 
    },
    { 
      id: "agricola", 
      icon: <Tractor size={18} />, 
      label: "Sector Agrícola", 
      badgeIcon: <TreePine size={14} className="text-emerald-500" />,
      badgeText: "Análisis Multiespectral",
      title: "SECTOR AGRÍCOLA", 
      desc: "Análisis de vigor vegetativo, estrés hídrico y planeación de cultivos mediante percepción remota. Optimizamos los recursos naturales y mejoramos el rendimiento agrícola a gran escala analizando la tierra desde el espectro invisible.", 
      img: "/assets/img/02_Landing_PROMEX/usos_CARTO/promex_agri_1.webp" 
    },
    { 
      id: "vias", 
      icon: <Route size={18} />, 
      label: "Vías y Movilidad", 
      badgeIcon: <TrendingUp size={14} className="text-orange-500" />,
      badgeText: "Ingeniería de Trazo",
      title: "VÍAS DE COMUNICACIÓN", 
      desc: "Trazo de carreteras, análisis de pendientes, visibilidad y volumetría de materiales para proyectos de infraestructura mayor. Aseguramos la viabilidad técnica y reducimos la incertidumbre desde las fases iniciales del proyecto constructivo.", 
      img: "/assets/img/02_Landing_PROMEX/usos_CARTO/promex_vias_1.jpg" 
    },
  ];

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-white relative z-10 overflow-hidden">
      {/* Luces ambientales de fondo */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-slate-100 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0B3D91]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="flex flex-col max-w-7xl mx-auto relative z-20">
        
        {/* 1. Encabezado */}
        <div className="order-1 flex flex-col items-center text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B3D91]/5 border border-[#0B3D91]/10 rounded-full mb-6">
            <span className="font-sans font-bold text-[#0B3D91] tracking-[0.2em] uppercase text-xs">
              Aplicaciones Prácticas
            </span>
          </div>
          <h2 className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-slate-900 tracking-tighter uppercase mb-4">
            USOS <span className="text-[#0B3D91]">ESTRATÉGICOS</span>
          </h2>
          <p className="font-sans text-slate-500 text-base max-w-2xl mx-auto">
            Descubre cómo nuestra cartografía se adapta a las necesidades operativas de los sectores más exigentes.
          </p>
        </div>

        {/* 2. Menú Pestañas (Pills) */}
        <div className="order-3 md:order-2 mt-6 md:mt-0 mb-0 md:mb-12 flex justify-center w-full">
          <div className="bg-slate-50 p-1.5 rounded-2xl md:rounded-full shadow-md shadow-slate-200/50 border border-slate-200/60 w-full md:w-auto relative z-30">
            <div className="grid grid-cols-2 md:flex gap-1 md:gap-0">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`relative flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 py-3 px-2 md:px-8 md:py-3.5 rounded-xl md:rounded-full font-sans font-bold text-[11px] sm:text-xs md:text-sm leading-tight text-center transition-all z-10 w-full ${
                    activeTab === idx
                      ? "text-white"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white/60"
                  }`}
                >
                  {activeTab === idx && (
                    <motion.div
                      layoutId="usoPillIndicator"
                      className="absolute inset-0 bg-[#0B3D91] shadow-md rounded-xl md:rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className={`${activeTab === idx ? "text-[#00ffff]" : "text-slate-400"}`}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Tarjeta de Contenido */}
        <div className="order-2 md:order-3 bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden min-h-[500px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
            
            {/* Textos Animados (Izquierda) */}
            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-16 flex flex-col justify-center relative bg-white">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(11,61,145,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(11,61,145,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col h-full"
                  >
                    <h3 className="font-poppins font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 mb-4 sm:mb-6 leading-[1.1] tracking-tight uppercase">
                      {tabs[activeTab].title}
                    </h3>

                    <p className="font-sans font-sans font-normal text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed md:mb-10">
                      {tabs[activeTab].desc}
                    </p>
                    
                    {/* Botón con el evento onClick añadido */}
                    <div onClick={scrollToContact} className="mt-6 md:mt-0 flex items-center gap-4 text-[#0B3D91] font-sans font-bold text-sm group cursor-pointer w-max">
                      Solicitar caso de estudio
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Panel de Imagen (Derecha) */}
            <div className="lg:col-span-7 bg-slate-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-100">
              <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl border-4 border-white bg-slate-100 group">
                {tabs.map((tab, idx) => (
                  <Image
                    key={idx}
                    src={tab.img}
                    alt={tab.title}
                    fill
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                      activeTab === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  />
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none z-20 mix-blend-multiply" />

                {/* Badge Flotante sobre la imagen */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-30 max-w-[90%]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, scale: 0.8, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="bg-white/95 backdrop-blur-md border border-slate-100 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl flex items-center gap-2 sm:gap-3 shadow-lg"
                    >
                      <div className="bg-slate-50 p-1.5 rounded-lg shrink-0 border border-slate-100">
                        {tabs[activeTab].badgeIcon}
                      </div>
                      <span className="font-sans font-bold text-slate-800 text-[10px] sm:text-xs tracking-wider uppercase line-clamp-1">
                        {tabs[activeTab].badgeText}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};
// ==========================================
// 6. MUESTRAS CARTOGRÁFICAS
// ==========================================
const ImageComparator = ({ bgImg, fgImg, title, subtitle }: ImageComparatorProps) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const pos = ((clientX - left) / width) * 100;
    setSliderPos(Math.min(Math.max(pos, 0), 100)); 
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-4 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col group transition-all duration-500">
      <div 
        ref={containerRef}
        className={`relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 touch-none ${isDragging ? 'cursor-ew-resize' : 'cursor-grab'}`}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleMove}
      >
        <Image src={bgImg} alt="Antes" fill className="object-cover pointer-events-none select-none" draggable={false} />
        
        <div className="absolute inset-0 z-10 pointer-events-none select-none" style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}>
          <Image src={fgImg} alt="Después" fill className="object-cover select-none" draggable={false} />
        </div>

        <div className="absolute top-0 bottom-0 z-20 w-1 bg-white/50 backdrop-blur-sm pointer-events-none" style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}>
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md border-2 border-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-transform ${isDragging ? 'scale-90' : 'scale-100'}`}>
            <span className="text-white text-lg font-bold drop-shadow-md">⟷</span>
          </div>
        </div>
      </div>
      
      <div className="text-center px-4 pb-4">
        <h3 className="font-poppins font-bold text-2xl text-slate-900 mb-1">{title}</h3>
        <p className="font-sans font-bold text-[#0B3D91] tracking-widest uppercase text-xs">{subtitle}</p>
      </div>
    </div>
  );
};

const MuestrasCartograficas = () => {
  const comparators = [
    { title: "Ortofoto y Vectorial", subtitle: "Escala 1:500", bgImg: "/assets/img/02_Landing_PROMEX/Muestras_carto/ortofoto_pag_500.webp", fgImg: "/assets/img/02_Landing_PROMEX/Muestras_carto/vector_pag_500.webp" },
    { title: "Ortofoto y Vectorial", subtitle: "Escala 1:1,000", bgImg: "/assets/img/02_Landing_PROMEX/Muestras_carto/ortofoto_pag_1000.webp", fgImg: "/assets/img/02_Landing_PROMEX/Muestras_carto/vector_pag_1000.webp" },
    { title: "Ortofoto y Vectorial", subtitle: "Escala 1:5,000", bgImg: "/assets/img/02_Landing_PROMEX/Muestras_carto/ortofoto_pag_5000.webp", fgImg: "/assets/img/02_Landing_PROMEX/Muestras_carto/vector_pag_5000.webp" },
    { title: "Ortofoto y Vectorial", subtitle: "Escala 1:10,000", bgImg: "/assets/img/02_Landing_PROMEX/Muestras_carto/ortofoto_pag_10k.webp", fgImg: "/assets/img/02_Landing_PROMEX/Muestras_carto/vector_pag_10k.webp" },
    { title: "Modelado Realista", subtitle: "Estado actual vs. Proyecto", bgImg: "/assets/img/02_Landing_PROMEX/Muestras_carto/extruido_artificial.webp", fgImg: "/assets/img/02_Landing_PROMEX/Muestras_carto/extruido_mesh.webp" },
    { title: "Modelado Realista", subtitle: "Mesh 3D vs Nube de Puntos", bgImg: "/assets/img/02_Landing_PROMEX/Muestras_carto/REV_zone.webp", fgImg: "/assets/img/02_Landing_PROMEX/Muestras_carto/Nube_zone.webp" },
  ];

  return (
    <section className="pt-24 pb-12 px-8 bg-slate-50 relative">
      <div className="max-w-[1152px] mx-auto">
        <div className="text-center mb-20">
          <span className="font-sans font-bold text-[#0B3D91] tracking-[0.3em] uppercase text-xs mb-4 block">Interactividad Total</span>
          <h2 className="font-poppins font-black text-4xl md:text-6xl text-slate-900 mb-6 uppercase tracking-tighter">Muestras Cartográficas</h2>
          <p className="font-sans text-slate-500 text-lg max-w-2xl mx-auto">Haz clic y desliza la barra central para comparar las distintas capas, ortofotos y extrusiones vectoriales.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {comparators.map((comp, idx) => (
            <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariant} transition={{ delay: idx * 0.1 }}>
              <ImageComparator {...comp} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// INTRO LiDAR (Opción 1: Dark Tech)
// ==========================================
const LidarIntro = () => {
  return (
    <section id="lidar" className="relative py-24 md:py-32 px-6 md:px-8 bg-slate-900 overflow-hidden border-t border-slate-800 scroll-mt-20">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ffff]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-[#0B3D91]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Columna Izquierda: Texto y CTA */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInVariant}
          className="flex flex-col items-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ffff]/10 border border-[#00ffff]/20 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffff] animate-pulse" />
            <span className="font-sans font-bold text-[#00ffff] text-[10px] sm:text-xs tracking-widest uppercase">
              Tecnología de Escaneo Láser
            </span>
          </div>
          
          <h2 className="font-poppins font-black text-4xl sm:text-5xl md:text-6xl text-white mb-6 tracking-tighter leading-tight">
            Captura la realidad en <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-blue-400">
              Alta Precisión 3D
            </span>
          </h2>
          
          <p className="font-sans text-slate-400 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            Generamos nubes de puntos de alta densidad para una representación milimétrica del entorno. 
            Nuestra tecnología LiDAR es el estándar definitivo para la visualización arquitectónica, 
            análisis geoespacial y la construcción de gemelos digitales precisos.
          </p>
          
          <Link href="/lidar" className="group">
            <button className="flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-[#00ffff] text-[#00ffff] rounded-full font-sans font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-[#00ffff] hover:text-slate-900 hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]">
              Descubrir LiDAR
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </motion.div>

        {/* Columna Derecha: Gráfico/Imagen CENTRADA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          /* Se utiliza flex y justify-center para asegurar un centrado absoluto del bloque entero */
          className="w-full flex justify-center mt-10 lg:mt-0"
        >
          {/* Contenedor relativo que dicta el tamaño de la caja principal */}
          <div className="relative w-[85%] max-w-[320px] sm:max-w-md lg:max-w-none lg:w-[90%] aspect-square md:aspect-[4/3] lg:aspect-square">
            
            {/* Decoración de borde: El translate es menor en móvil (translate-x-3) para evitar sobrepasar el borde de la pantalla */}
            <div className="absolute inset-0 border-2 border-[#00ffff]/30 rounded-[2.5rem] md:rounded-[3rem] translate-x-3 translate-y-3 md:translate-x-5 md:translate-y-5 z-0" />
            
            {/* Contenedor Principal con z-10 para asegurar que tape correctamente y quede en primer plano */}
            <div className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-[#00ffff]/10 border border-slate-700 bg-slate-800 flex items-center justify-center group z-10">
              <video 
                src="/assets/img/02_Landing_PROMEX/lidar.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 pointer-events-none" 
              />
              {/* Animación que simula un escaneo láser */}
              <motion.div 
                animate={{ y: ["-100%", "100%"] }} 
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="absolute inset-0 h-[200%] w-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,255,255,0.1)_50%,transparent_100%)] pointer-events-none" 
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
// ==========================================
// 7. PREGUNTAS FRECUENTES
// ==========================================
const AnimatedResponse = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ");
  const containerVariants: Variants = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const wordVariants: Variants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 15, stiffness: 100 } } };

  return (
    <motion.p className={className} variants={containerVariants} initial="hidden" animate="visible">
      {words.map((word, idx) => (
        <motion.span key={idx} variants={wordVariants} className="inline-block mr-[0.25em]">{word}</motion.span>
      ))}
    </motion.p>
  );
};

const PreguntasFrecuentes = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { pregunta: "¿Cada cuánto se actualiza la base cartográfica?", respuesta: "Proyecto México mantiene un ciclo de actualización continuo. Priorizamos las zonas de mayor crecimiento urbano e industrial, asegurando que las áreas estratégicas cuenten con datos recientes que reflejen la realidad física actual del entorno." },
    { pregunta: "¿En qué formatos se entrega la información?", respuesta: "Nuestros datos están listos para integrarse en cualquier flujo de trabajo técnico. Entregamos en formatos estándar de la industria GIS y CAD, incluyendo Shapefile (.shp), Geodatabases (.gdb), archivos CAD (.dwg, .dxf) y nubes de puntos estructuradas, según la escala requerida." },
    { pregunta: "¿Tienen cobertura en todo el territorio nacional?", respuesta: "Sí. Contamos con cobertura nacional a diferentes niveles de resolución. Las escalas más detalladas (1:1,000 y 1:500) están enfocadas en zonas urbanas y de desarrollo específico, mientras que las escalas regionales cubren la totalidad del país para planeación macro." },
    { pregunta: "¿Es compatible con el software que ya utilizamos?", respuesta: "Absolutamente. La cartografía de Proyecto México es 100% compatible e interoperable con las plataformas líderes del mercado, incluyendo toda la suite de Esri ArcGIS Pro, ArcGIS Online." }
  ];

  const toggleFaq = (index: number) => setOpenIndex(openIndex === index ? null : index);


  return (
    <section className="pt-16 pb-32 px-6 md:px-8 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="font-sans font-bold text-[#0B3D91] tracking-[0.3em] uppercase text-xs mb-4 block">Resolviendo dudas</span>
          <h2 className="font-poppins font-black text-4xl md:text-5xl text-slate-900 mb-6 uppercase tracking-tighter">
            Preguntas <span className="text-[#0B3D91]">Frecuentes</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`bg-white rounded-3xl transition-all duration-500 overflow-hidden border ${openIndex === idx ? 'border-[#0B3D91]/30 shadow-xl shadow-[#0B3D91]/5' : 'border-slate-100 shadow-sm hover:border-slate-300'}`}>
              <button onClick={() => toggleFaq(idx)} className="w-full flex items-center justify-between p-6 sm:p-8 text-left group focus:outline-none">
                <h3 className={`font-poppins font-bold text-lg sm:text-xl pr-8 transition-colors duration-300 ${openIndex === idx ? 'text-[#0B3D91]' : 'text-slate-800 group-hover:text-[#0B3D91]'}`}>
                  {faq.pregunta}
                </h3>
                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${openIndex === idx ? 'bg-[#0B3D91] text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-[#0B3D91]/10 group-hover:text-[#0B3D91]'}`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              <AnimatePresence mode="wait">
                {openIndex === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
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
// 8. INBOUND LEAD CAPTURE: PROYECTO MÉXICO (UNIFICADO CON HUBSPOT + CITA OPCIONAL)
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

const PromexLeadCapture = () => {
  // Estado para saber si el usuario quiere agendar fecha/hora (Opcional)
  const [wantsAppointment, setWantsAppointment] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonthDate, setCurrentMonthDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // Preseleccionamos "Cartografía" por estar en la landing de Proyecto México
  const [selectedThemes, setSelectedThemes] = useState<string[]>([
    "Cartografía",
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
    <section id="contacto" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-slate-50 relative z-10 overflow-hidden border-t border-slate-200">
      {/* Elementos decorativos sutiles de fondo */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0B3D91]/5 rounded-full blur-[80px] pointer-events-none -translate-x-1/4 translate-y-1/3" />

      <div className="max-w-6xl mx-auto relative z-20">
        {/* CONTENEDOR PRINCIPAL: Grid de 12 Columnas */}
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* ========================================================= */}
          {/* COLUMNA IZQUIERDA: TEXTOS Y BENEFICIOS (5 COLUMNAS)       */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 p-8 sm:p-10 md:p-12 lg:py-16 lg:px-12 flex flex-col justify-center relative overflow-hidden min-w-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(11,61,145,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(11,61,145,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#0B3D91]/5 border border-[#0B3D91]/10 rounded-full mb-8 w-max max-w-full">
                  <MapPin className="w-4 h-4 text-[#0B3D91] shrink-0" />
                  <span className="font-sans font-bold text-[#0B3D91] tracking-[0.18em] uppercase text-xs truncate">
                    Análisis Geoespacial sin costo
                  </span>
                </div>

                <h2 className="font-poppins font-black text-3xl sm:text-4xl xl:text-[2.65rem] text-slate-900 tracking-tighter mb-7 leading-[1.12]">
                  ¿Listo para dimensionar tu proyecto con{" "}
                  <span className="text-[#0B3D91]">precisión milimétrica?</span>
                </h2>

                <p className="font-sans text-slate-600 text-base sm:text-lg leading-relaxed mb-10">
                  No tomes decisiones de infraestructura o inversión a ciegas.
                  Solicita un diagnóstico preliminar para evaluar la cobertura
                  cartográfica disponible en tu zona de interés y descubre cómo
                  nuestros datos eliminan los riesgos operativos desde el día uno.
                </p>
              </div>

              <ul className="space-y-8 font-sans text-slate-700 mt-2">
                <li className="flex items-start gap-4">
                  <div className="bg-[#0B3D91]/10 p-2.5 rounded-full shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-[#0B3D91]" />
                  </div>
                  <div className="min-w-0">
                    <strong className="block text-slate-900 font-bold text-base mb-1.5">
                      Verificación de Resoluciones
                    </strong>
                    <span className="text-slate-600 text-sm leading-relaxed block">
                      Comprueba si tu polígono cuenta con cobertura en escalas de
                      hasta 1:500 o 1:1,000.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-[#0B3D91]/10 p-2.5 rounded-full shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-[#0B3D91]" />
                  </div>
                  <div className="min-w-0">
                    <strong className="block text-slate-900 font-bold text-base mb-1.5">
                      Muestra de Datos (Shapefiles / CAD)
                    </strong>
                    <span className="text-slate-600 text-sm leading-relaxed block">
                      Conoce la estructura real de nuestras capas de
                      infraestructura y relieve antes de invertir.
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
                    {wantsAppointment
                      ? "¡Cita y Solicitud Recibidas!"
                      : "¡Solicitud Recibida!"}
                  </h3>
                  <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed px-4 max-w-md">
                    Un especialista geográfico evaluará la cobertura en tu zona
                    de interés y se pondrá en contacto a tu correo corporativo
                    pronto.
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
                  {/* LOGO DE PROYECTO MÉXICO CENTRADO Y 25% MÁS GRANDE */}
                  <div className="flex justify-center mb-6">
                    <Image
                      src="/assets/img/01_LANDING_SIGSA/LOGO_promex.png"
                      alt="Logo Proyecto México"
                      width={225}
                      height={75}
                      className="object-contain drop-shadow-sm h-16 md:h-[75px] w-auto"
                    />
                  </div>

                  <h3 className="font-poppins font-black text-xl sm:text-2xl text-slate-900 mb-1">
                    Solicitar Análisis de Cobertura
                  </h3>
                  <p className="font-sans text-slate-500 text-xs sm:text-sm mb-5">
                    Déjanos tus datos y nos pondremos en contacto.
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
                          placeholder="Ej. Director de Proyectos"
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
                          placeholder="Ej. SIGSA, Constructora..."
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
                        />
                      </div>
                    </div>

                    {/* Fila 3: Correo y Teléfono (Lada centrada con buen aire) */}
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
                          placeholder="Indica el municipio, estado o polígono de tu interés..."
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
                            Confirmar Cita y Cobertura{" "}
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        ) : (
                          <>
                            Validar Cobertura{" "}
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

// ==========================================
// MAIN ASSEMBLY: PROYECTO MÉXICO
// ==========================================
export default function ProyectoMexicoLanding() {
  return (
    <div className="relative text-left selection:bg-[#00ffff] selection:text-[#0B3D91]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@700;900&display=swap');
        .font-poppins { font-family: 'Space Grotesk', sans-serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
      
      <HeroPromex />
      <QuienesSomosPromex />
      <DistribucionCartografica />
      <UsosCartografia />
      <MuestrasCartograficas />
      <LidarIntro />
      <PreguntasFrecuentes />
      <PromexLeadCapture />
      <TrustBar />
    </div> 
  );
}