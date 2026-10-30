"use client";

import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Database, Zap, 
  ChevronDown, CheckCircle2, Leaf, 
  Factory, Map, FileText, Building2, Shield, AlertTriangle, 
  BookOpen, HardHat, Users, Tractor, Droplets, Home, Video,
  ArrowRight, Lock, Send, Loader2, X, Calendar as CalendarIcon, Clock, ChevronRight, ChevronLeft,  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Sphere, 
  MeshDistortMaterial, 
  OrbitControls, 
  Html, 
  Line, 
  QuadraticBezierLine, 
  Float 
} from "@react-three/drei";

// ==========================================
// 1. SHADER BACKGROUND 
// ==========================================
const CorporateFluidCore = () => {
  const sphereRef = useRef<any>(null);
  useFrame(({ clock, pointer }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      sphereRef.current.position.x = pointer.x * 1.2;
      sphereRef.current.position.y = pointer.y * 1.2;
    }
  });
  return (
    <Sphere ref={sphereRef} args={[1, 128, 128]} scale={2.5}>
      <MeshDistortMaterial color="#0B3D91" distort={0.4} speed={1.5} roughness={0.2} transparent opacity={0.03} />
    </Sphere>
  );
};

const LightShaderCanvas = () => (
  <div className="fixed inset-0 z-[-1] bg-slate-50 pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(11,61,145,0.06)_0%,_transparent_60%)]" />
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#0B3D91" />
      <CorporateFluidCore />
    </Canvas>
  </div>
);

// ==========================================
// 2. SECCIÓN: HERO SERVERBOX 
// ==========================================
const HeroServerbox = () => {
  const desktopImg = "/assets/img/03_Landing_SERVERBOX/banner_server_sn.webp";
  const mobileImg = "/assets/img/03_Landing_SERVERBOX/banner_server_sn_V.webp"; 

  return (
    <section className="relative w-full min-h-[100dvh] md:min-h-[800px] max-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <Image src={mobileImg} alt="Banner Serverbox Móvil" fill className="object-cover block md:hidden opacity-80" priority />
        <Image src={desktopImg} alt="Banner Serverbox" fill className="object-cover hidden md:block opacity-80" priority />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-8 w-full mt-28 mb-24 sm:mb-32 md:mb-0 md:mt-20">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, type: "spring", bounce: 0.4 }}>
          <span className="font-sans font-bold text-[#00ffff] tracking-[0.3em] uppercase mb-6 block text-sm border-l-2 border-[#00ffff] pl-4">
            Portal Ejecutivo Inteligente
          </span>
          <h1 className="font-poppins font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-none mb-6 uppercase tracking-tighter">
            SERVER<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#0B3D91]">BOX</span>
          </h1>
          <p className="font-sans text-white/80 text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed mb-10 font-light">
            Inteligencia territorial y control operativo unificados en un portal web corporativo diseñado para centralizar tu información crítica en tiempo real.
          </p>
        </motion.div>
      </div>
      <a href="#soluciones" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-[#00ffff]/70 animate-bounce cursor-pointer">
        <span className="font-sans text-xs tracking-widest uppercase">Descubrir</span>
        <ChevronDown className="w-5 h-5 text-white/80" />
      </a>
    </section>
  );
};

// ==========================================
// 3. SECCIÓN: TABS DE CASOS DE USO
// ==========================================
const CasosDeUsoTabs = () => {
  const [activeTab, setActiveTab] = useState<"catastro" | "hidricos">("catastro");

  const tabContent = {
    catastro: {
      title: "Optimización y Control Catastral",
      desc: "Transforma la gestión territorial de tu municipio mediante inteligencia digital. Identifica predios no registrados, detecta morosidad y automatiza la optimización fiscal.",
      features: [
        { icon: Home, title: "Detección Geoespacial", text: "Visualiza predios irregulares en un entorno digital inmersivo." },
        { icon: Database, title: "Recaudación Inteligente", text: "Cruza bases de datos en tiempo real para proyectar ingresos." }
      ],
      videoSrc: "/assets/img/03_Landing_SERVERBOX/Catastro_muni.webm"
    },
    hidricos: {
      title: "Monitoreo Hídrico en Tiempo Real",
      desc: "Plataforma diseñada para integrar, visualizar y analizar la infraestructura de agua potable. Controla el flujo y detecta anomalías antes de que afecten a la ciudadanía.",
      features: [
        { icon: Droplets, title: "Mapeo de Redes", text: "Supervisa tuberías, válvulas y fugas georreferenciadas." },
        { icon: Zap, title: "Respuesta Rápida", text: "Ejecuta tareas de mantenimiento preventivo desde cualquier dispositivo." }
      ],
      videoSrc: "/assets/img/03_Landing_SERVERBOX/Catastro_agua.webm" 
    }
  };

  return (
    <section id="soluciones" className="py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-slate-50 relative">
      <div className="max-w-[1200px] mx-auto">
        
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="bg-white p-1.5 rounded-full shadow-md border border-slate-200 flex inline-flex w-full sm:w-auto overflow-x-auto">
            <button 
              onClick={() => setActiveTab("catastro")}
              className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 rounded-full font-sans font-bold text-sm transition-all whitespace-nowrap ${activeTab === "catastro" ? "bg-[#0B3D91] text-white shadow-md" : "text-slate-500 hover:text-slate-900"}`}
            >
              Catastro Municipal
            </button>
            <button 
              onClick={() => setActiveTab("hidricos")}
              className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 rounded-full font-sans font-bold text-sm transition-all whitespace-nowrap ${activeTab === "hidricos" ? "bg-[#0B3D91] text-white shadow-md" : "text-slate-500 hover:text-slate-900"}`}
            >
              Recursos Hídricos
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-square bg-slate-200 rounded-[2rem] border border-slate-300 shadow-xl overflow-hidden flex flex-col items-center justify-center group">
              
              {tabContent[activeTab].videoSrc ? (
                <video
                  src={tabContent[activeTab].videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full bg-slate-100">
                  <Video className="w-16 h-16 text-slate-400 mb-4" />
                  <p className="font-sans font-bold text-slate-500 uppercase tracking-widest text-sm text-center px-4">
                    Inserta ruta del video en videoSrc
                  </p>
                </div>
              )}

              <div className="absolute inset-0 bg-slate-900/10 pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-6 leading-tight tracking-tight">
                  {tabContent[activeTab].title}
                </h2>
                <p className="font-sans text-slate-600 text-lg leading-relaxed">
                  {tabContent[activeTab].desc}
                </p>
              </div>

              <div className="space-y-4">
                {tabContent[activeTab].features.map((feat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 text-[#0B3D91]">
                      <feat.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-slate-900 text-lg mb-1">{feat.title}</h4>
                      <p className="font-sans text-slate-500 text-sm leading-relaxed">{feat.text}</p>
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

// ==========================================
// 4. SECCIÓN: PROCESO ISOMÉTRICO 
// ==========================================
const ProcesoIsometrico = () => {
  const pasos = [
    { 
      num: "01", 
      title: "Conexión de Datos", 
      desc: "Vinculamos tus bases a nuestra infraestructura SIG sin interrumpir la operación.", 
      detail: "API Rest / Excel / ERP",
      img: "/assets/img/03_Landing_SERVERBOX/conexion de datos.webp" 
    },
    { 
      num: "02", 
      title: "Orquestación SIG", 
      desc: "Procesamos la información con cartografía precisa para georreferenciar tu territorio.", 
      detail: "Geoprocesamiento Cloud",
      img: "/assets/img/03_Landing_SERVERBOX/orquestacion_sig.webp"
    },
    { 
      num: "03", 
      title: "Control Ejecutivo", 
      desc: "Desplegamos tu tablero personalizado con KPIs en tiempo real.", 
      detail: "Dashboard 100% Web",
      img: "/assets/img/03_Landing_SERVERBOX/control_ejecutivo.webp"
    }
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-8 bg-[#003893] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <span className="font-sans font-bold text-[#00ffff] tracking-[0.2em] text-xs uppercase mb-4 block">Implementación Ágil</span>
          <h2 className="font-poppins font-black text-4xl md:text-5xl text-white uppercase tracking-tighter leading-tight mb-6">
            Tu camino a la <span className="text-[#00ffff]">Transformación Digital</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
          
          {pasos.map((paso, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -60 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, margin: "-50px" }} 
              transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-full aspect-square max-w-[340px] mb-8 relative flex flex-col items-center justify-end">
                
                <motion.div 
                  animate={{ 
                    y: [0, -20, 0],
                    filter: [
                      "drop-shadow(0px 10px 10px rgba(0,255,255,0.05))",
                      "drop-shadow(0px 25px 30px rgba(0,255,255,0.5))",
                      "drop-shadow(0px 10px 10px rgba(0,255,255,0.05))"
                    ]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut", 
                    delay: i * 1.5 
                  }}
                  className="absolute inset-0 flex items-center justify-center z-10 pb-12"
                >
                  <div className="relative w-56 h-56 sm:w-72 sm:h-72">
                    <Image 
                      src={paso.img} 
                      alt={`Render Isométrico ${paso.title}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>

                <motion.div 
                  animate={{
                    boxShadow: [
                      "0px 10px 20px rgba(0,0,0,0.5)",
                      "0px 0px 40px rgba(0,255,255,0.4)",
                      "0px 10px 20px rgba(0,0,0,0.5)"
                    ],
                    borderColor: [
                      "#001845",
                      "rgba(0,255,255,0.4)",
                      "#001845"
                    ]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut", 
                    delay: i * 1.5 
                  }}
                  className="w-[85%] h-20 bg-[#00225e] rounded-[50%] border-b-4 transform rotate-x-60" 
                  style={{ transform: "rotateX(60deg)" }}
                />
              </div>

              <div className="bg-[#00225e] px-4 py-1 rounded-full mb-4 border border-white/10">
                <span className="font-poppins font-black text-sm text-[#00ffff]">Paso {paso.num}</span>
              </div>
              <h4 className="font-poppins font-bold text-2xl text-white uppercase mb-4 tracking-tighter">{paso.title}</h4>
              <p className="font-sans text-white/70 text-[15px] leading-relaxed mb-6 px-4">{paso.desc}</p>
              <span className="font-sans text-[10px] font-bold text-[#00ffff] uppercase tracking-[0.2em] bg-[#00ffff]/10 px-5 py-2.5 rounded-full border border-[#00ffff]/20">
                {paso.detail}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

// ==========================================
// 5. MÓDULOS SERVERBOX (CUBOS DE MARCA + MAPA CON HUD INTEGRADO)
// ==========================================

// 👉 CONFIGURACIÓN PARA TUS PROPIAS IMÁGENES DEL MAPA DE MÉXICO:
const CUSTOM_MAP_IMAGES = {
  usarImagenUnica: false,
  mapaCompleto: "/assets/img/03_Landing_SERVERBOX/mi_mapa_mexico_3capas.webp",

  usarTresCapasImg: true,
  capaPoblacionImg: "/assets/img/03_Landing_SERVERBOX/capa3.png",
  capaSueloImg: "/assets/img/03_Landing_SERVERBOX/capa2.png",
  capaSubsueloImg: "/assets/img/03_Landing_SERVERBOX/capa1.png",
};

const CUBE_PALETTES = {
  green: { top: "#a3c639", left: "#7fa326", right: "#4c6813", stroke: "#293b06" },
  blue: { top: "#8cc0e8", left: "#5892c4", right: "#335c85", stroke: "#18324d" },
  yellow: { top: "#ffec4d", left: "#e6b81e", right: "#b3860b", stroke: "#594100" },
  orange: { top: "#f5b553", left: "#d98a2b", right: "#995811", stroke: "#4d2904" },
  brown: { top: "#b5532f", left: "#8c3519", right: "#591e0b", stroke: "#2e0d03" },
};

const IsometricBrandCube = ({
  palette,
  size,
  variant = 0,
}: {
  palette: keyof typeof CUBE_PALETTES;
  size: number;
  variant?: number;
}) => {
  const colors = CUBE_PALETTES[palette];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ overflow: "visible", filter: "drop-shadow(0px 12px 18px rgba(0,0,0,0.45))" }}
    >
      <polygon points="50,8 90,28 50,48 10,28" fill={colors.top} />
      <polygon points="10,28 50,48 50,92 10,72" fill={colors.left} />
      <polygon points="50,48 90,28 90,72 50,92" fill={colors.right} />

      {variant === 0 && (
        <g stroke={colors.stroke} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.75">
          <polyline points="26,36 26,64 42,72" />
          <polygon points="62,48 76,41 76,57 62,64" />
          <line x1="30" y1="18" x2="50" y2="28" />
        </g>
      )}
      {variant === 1 && (
        <g stroke={colors.stroke} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.75">
          <polyline points="30,20 50,30 70,20" />
          <polyline points="18,48 34,56 34,82" />
          <line x1="65" y1="68" x2="82" y2="59" />
          <line x1="65" y1="76" x2="78" y2="69" />
        </g>
      )}
      {variant === 2 && (
        <g stroke={colors.stroke} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.75">
          <line x1="22" y1="34" x2="22" y2="78" />
          <line x1="34" y1="40" x2="34" y2="84" />
          <polyline points="50,68 70,58 78,64" />
        </g>
      )}
    </svg>
  );
};

const ServerboxCubesBackground = () => {
  const cubes: {
    x: number;
    y: number;
    size: number;
    palette: keyof typeof CUBE_PALETTES;
    rot: number;
    dur: number;
    delay: number;
    variant: number;
    opacity: number;
  }[] = [
    { x: 4, y: 82, size: 38, palette: "orange", rot: -12, dur: 6, delay: 0, variant: 0, opacity: 0.55 },
    { x: 9, y: 68, size: 54, palette: "brown", rot: 15, dur: 7.5, delay: 1.2, variant: 2, opacity: 0.6 },
    { x: 14, y: 76, size: 72, palette: "blue", rot: -8, dur: 8, delay: 0.5, variant: 1, opacity: 0.65 },
    { x: 16, y: 52, size: 68, palette: "green", rot: -18, dur: 6.8, delay: 2.1, variant: 1, opacity: 0.55 },
    { x: 22, y: 86, size: 52, palette: "yellow", rot: 12, dur: 7.2, delay: 0.8, variant: 0, opacity: 0.65 },
    { x: 28, y: 66, size: 32, palette: "yellow", rot: -22, dur: 5.5, delay: 1.5, variant: 2, opacity: 0.5 },
    { x: 33, y: 82, size: 56, palette: "brown", rot: 8, dur: 8.2, delay: 2.7, variant: 2, opacity: 0.55 },
    { x: 36, y: 34, size: 88, palette: "blue", rot: -14, dur: 9, delay: 0.3, variant: 0, opacity: 0.45 },
    { x: 42, y: 56, size: 82, palette: "orange", rot: 16, dur: 7.8, delay: 1.9, variant: 1, opacity: 0.45 },
    { x: 52, y: 18, size: 66, palette: "green", rot: -10, dur: 6.5, delay: 0.7, variant: 1, opacity: 0.5 },
    { x: 56, y: 74, size: 92, palette: "yellow", rot: -15, dur: 8.5, delay: 1.1, variant: 0, opacity: 0.5 },
    { x: 64, y: 38, size: 30, palette: "green", rot: 25, dur: 5.8, delay: 2.4, variant: 2, opacity: 0.45 },
    { x: 70, y: 12, size: 58, palette: "orange", rot: -8, dur: 7.4, delay: 0.2, variant: 1, opacity: 0.55 },
    { x: 76, y: 34, size: 70, palette: "blue", rot: 14, dur: 8.1, delay: 1.6, variant: 1, opacity: 0.5 },
    { x: 78, y: 52, size: 42, palette: "yellow", rot: -18, dur: 6.2, delay: 2.9, variant: 0, opacity: 0.55 },
    { x: 85, y: 16, size: 90, palette: "brown", rot: 10, dur: 9.2, delay: 0.6, variant: 2, opacity: 0.6 },
    { x: 92, y: 28, size: 50, palette: "yellow", rot: -12, dur: 6.9, delay: 1.4, variant: 1, opacity: 0.65 },
    { x: 90, y: 68, size: 64, palette: "green", rot: 18, dur: 7.7, delay: 2.2, variant: 0, opacity: 0.55 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.16 }}>
        <g stroke="#00ffff" strokeWidth="0.7" fill="#00ffff">
          <line x1="5%" y1="20%" x2="18%" y2="35%" />
          <line x1="18%" y1="35%" x2="12%" y2="60%" />
          <line x1="18%" y1="35%" x2="32%" y2="25%" />
          <line x1="75%" y1="15%" x2="88%" y2="30%" />
          <line x1="88%" y1="30%" x2="82%" y2="55%" />
          <circle cx="5%" cy="20%" r="3" />
          <circle cx="18%" cy="35%" r="4" />
          <circle cx="12%" cy="60%" r="2.5" />
          <circle cx="32%" cy="25%" r="3.5" />
          <circle cx="75%" cy="15%" r="3" />
          <circle cx="88%" cy="30%" r="4" />
          <circle cx="82%" cy="55%" r="3" />
        </g>
      </svg>

      {cubes.map((c, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            left: `${c.x}%`,
            top: `${c.y}%`,
            opacity: c.opacity,
            animation: `sbCubeFloat ${c.dur}s ease-in-out ${c.delay}s infinite alternate`,
          }}
        >
          <div style={{ transform: `rotate(${c.rot}deg)` }}>
            <IsometricBrandCube palette={c.palette} size={c.size} variant={c.variant} />
          </div>
        </div>
      ))}
    </div>
  );
};

const ModulosServerboxSection = () => {
  const [moduloActivo, setModuloActivo] = useState<any | null>(null);
  const [hoveredMod, setHoveredMod] = useState<number | null>(null);
  const [capaDestacada, setCapaDestacada] = useState<"todas" | "poblacion" | "suelo" | "subsuelo">("todas");
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  React.useEffect(() => {
    if (moduloActivo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [moduloActivo]);

  const mexicoPath =
    "M 85,55 L 118,58 L 115,145 L 138,205 L 122,218 L 92,155 L 88,92 L 72,68 Z " +
    "M 118,58 L 185,72 L 260,78 L 345,86 L 425,128 L 505,152 L 538,205 L 555,272 L 620,318 L 705,322 L 752,275 L 818,265 L 835,310 L 788,355 L 765,392 L 702,400 L 655,428 L 575,420 L 492,375 L 398,328 L 318,275 L 262,220 L 205,165 L 152,110 L 118,58 Z";

  const modulos = [
    {
      title: "Oil and Gas",
      layer: "subsuelo",
      layerLabel: "Subsuelo y Recursos",
      color: "#6d28d9",
      x: 8, y: 15, tilt: -6,
      anchorX: 255, anchorY: 335,
      icon: Factory,
      img: "/assets/img/03_Landing_SERVERBOX/industrias/01_gasy petroleo.webp",
      description: "Control territorial y operativo de activos energéticos. Visualiza estadísticas de producción, rutas logísticas e identifica zonas de alto riesgo de manera preventiva.",
      bullets: ["Información georreferenciada", "Estadística de producción", "Identifica sitios en riesgo"]
    },
    {
      title: "Admin. Predial",
      layer: "poblacion",
      layerLabel: "Población y Ciudad",
      color: "#0369a1",
      x: 23, y: 10, tilt: -5,
      anchorX: 360, anchorY: 165,
      icon: Home,
      img: "/assets/img/03_Landing_SERVERBOX/industrias/016_admo.webp",
      description: "Transforma la recaudación y gestión predial. Cruza información cartográfica y financiera para agilizar cálculos de impuestos y mejorar los tiempos de respuesta al ciudadano.",
      bullets: ["Aumenta capacitación", "Agiliza tiempo de respuesta", "Cálculo de impuestos"]
    },
    {
      title: "Valuación Cartográfica",
      layer: "suelo",
      layerLabel: "Suelo y Catastro",
      color: "#ca8a04",
      x: 39, y: 9, tilt: -4,
      anchorX: 455, anchorY: 225,
      icon: Map,
      img: "/assets/img/03_Landing_SERVERBOX/industrias/015_val.webp",
      description: "Sistema inteligente para el registro y valuación precisa de predios, permitiendo regular el crecimiento urbano con información territorial exacta y confiable.",
      bullets: ["Ubica y registra predios", "Determina el valor", "Regula crecimiento"]
    },
    {
      title: "SIG Multifinalitario",
      layer: "poblacion",
      layerLabel: "Población y Ciudad",
      color: "#c2410c",
      x: 55, y: 12, tilt: -4,
      anchorX: 530, anchorY: 220,
      icon: Users,
      img: "/assets/img/03_Landing_SERVERBOX/industrias/010_telecom.webp",
      description: "El cerebro territorial de la institución. Una base cartográfica única que permite a múltiples dependencias colaborar, cruzar datos y mejorar la atención ciudadana.",
      bullets: ["Base cartográfica", "Colaboración en tiempo real", "Atención al ciudadano"]
    },
    {
      title: "Educativo",
      layer: "poblacion",
      layerLabel: "Población y Ciudad",
      color: "#d97706",
      x: 69, y: 22, tilt: -5,
      anchorX: 600, anchorY: 260,
      icon: BookOpen,
      img: "/assets/img/03_Landing_SERVERBOX/industrias/013_edu.webp",
      description: "Inventario y gestión de infraestructura escolar. Asegura la certeza jurídica de los planteles y facilita la planificación de mantenimiento o nuevas obras educativas.",
      bullets: ["Certeza jurídica", "Mejora regularización inmobiliaria"]
    },
    {
      title: "Gestión del Agua",
      layer: "subsuelo",
      layerLabel: "Subsuelo y Recursos",
      color: "#0284c7",
      x: 82, y: 16, tilt: -4,
      anchorX: 675, anchorY: 350,
      icon: Droplets,
      img: "/assets/img/03_Landing_SERVERBOX/industrias/014_agua.webp",
      description: "Monitoreo hídrico en tiempo real. Integra la cartografía de tuberías y válvulas para detectar fugas, optimizar procesos de distribución y actualizar la red al instante.",
      bullets: ["Integra redes de agua", "Optimiza procesos", "Actualización de datos"]
    },
    {
      title: "Registro Público",
      layer: "suelo",
      layerLabel: "Suelo y Catastro",
      color: "#15803d",
      x: 92, y: 38, tilt: -5,
      anchorX: 785, anchorY: 310,
      icon: FileText,
      img: "/assets/img/03_Landing_SERVERBOX/industrias/017_rpp.webp",
      description: "Digitalización y blindaje del registro de la propiedad. Brinda certeza jurídica total y acelera los procesos de regularización inmobiliaria con trazabilidad digital.",
      bullets: ["Brinda certeza jurídica", "Mejora regularización"]
    },
    {
      title: "Obra Pública",
      layer: "poblacion",
      layerLabel: "Población y Ciudad",
      color: "#b45309",
      x: 7, y: 38, tilt: -6,
      anchorX: 310, anchorY: 195,
      icon: HardHat,
      img: "/assets/img/03_Landing_SERVERBOX/industrias/06_construccion.webp",
      description: "Supervisión total de proyectos de infraestructura. Prioriza inversiones, georreferencia los avances de obra y genera indicadores de transparencia en tiempo real.",
      bullets: ["Planea obra pública", "Priorización de obras", "Genera indicadores"]
    },
    {
      title: "Ambiental",
      layer: "suelo",
      layerLabel: "Suelo y Catastro",
      color: "#a16207",
      x: 8, y: 62, tilt: -6,
      anchorX: 250, anchorY: 260,
      icon: Leaf,
      img: "/assets/img/03_Landing_SERVERBOX/industrias/011_ecologia.webp",
      description: "Plataforma integral para el monitoreo ecológico. Permite evaluar y mitigar el impacto ambiental con delimitaciones precisas y datos geoespaciales actualizados.",
      bullets: ["Evalúa impacto ambiental", "Administra efectos", "Delimitación geográfica"]
    },
    {
      title: "Agrícola",
      layer: "suelo",
      layerLabel: "Suelo y Catastro",
      color: "#ca8a04",
      x: 20, y: 78, tilt: -5,
      anchorX: 325, anchorY: 300,
      icon: Tractor,
      img: "/assets/img/03_Landing_SERVERBOX/industrias/05_agricultura.webp",
      description: "Inteligencia para el campo. Delimita fronteras agrícolas, monitorea el rendimiento de cultivos y comparte información vital para la gestión de subsidios y recursos.",
      bullets: ["Frontera agrícola", "Comparte información"]
    },
    {
      title: "Atlas de Riesgos",
      layer: "subsuelo",
      layerLabel: "Subsuelo y Recursos",
      color: "#047857",
      x: 36, y: 86, tilt: -5,
      anchorX: 400, anchorY: 380,
      icon: AlertTriangle,
      img: "/assets/img/03_Landing_SERVERBOX/industrias/012_atlas.webp",
      description: "Prevención y mitigación de desastres. Visualiza fenómenos naturales, capas de vulnerabilidad y coordina estrategias de protección civil con un mapa interactivo vivo.",
      bullets: ["Prevención de riesgos", "Visualiza fenómenos", "Ubicación de elementos"]
    },
    {
      title: "Electricidad",
      layer: "subsuelo",
      layerLabel: "Subsuelo y Recursos",
      color: "#c2410c",
      x: 52, y: 89, tilt: -5,
      anchorX: 505, anchorY: 410,
      icon: Zap,
      img: "/assets/img/03_Landing_SERVERBOX/industrias/07_electricidad.webp",
      description: "Optimiza la gestión de redes eléctricas mediante mapeo geoespacial avanzado, modelado predictivo de demanda y administración eficiente de infraestructura en campo.",
      bullets: ["Ubica infraestructura", "Modelado del comportamiento", "Administración de activos"]
    },
    {
      title: "Seguridad",
      layer: "poblacion",
      layerLabel: "Población y Ciudad",
      color: "#1d4ed8",
      x: 69, y: 87, tilt: -5,
      anchorX: 625, anchorY: 295,
      icon: Shield,
      img: "/assets/img/03_Landing_SERVERBOX/industrias/08_Seguridad.webp",
      description: "Centro de comando territorial. Analiza mapas de incidencia delictiva, gestiona cuadrantes de patrullaje y salvaguarda activos estratégicos con inteligencia de datos.",
      bullets: ["Salvaguarda de activos", "Cámaras 360°", "Analiza datos"]
    },
    {
      title: "Desarrollo Urbano",
      layer: "suelo",
      layerLabel: "Suelo y Catastro",
      color: "#b91c1c",
      x: 88, y: 74, tilt: -5,
      anchorX: 735, anchorY: 365,
      icon: Building2,
      img: "/assets/img/03_Landing_SERVERBOX/industrias/03_desarrollo urbano.webp",
      description: "Herramienta clave para la planificación de ciudades inteligentes. Localiza asentamientos, regula el uso de suelo y proyecta el crecimiento ordenado a mediano y largo plazo.",
      bullets: ["Planeación ordenada", "Localiza asentamientos", "Regula uso de suelo"]
    }
  ];

  const modulosFiltrados = capaDestacada === "todas"
    ? modulos
    : modulos.filter((m) => m.layer === capaDestacada);

  // Opciones del menú de capas integrado en el mapa
  const opcionesCapas = [
    { id: "todas", label: "Las 3 Capas", shortLabel: "3 Capas", dotColor: "#ffffff" },
    { id: "poblacion", label: "1. Población y Ciudad", shortLabel: "1. Población", dotColor: "#34d399" },
    { id: "suelo", label: "2. Suelo y Catastro", shortLabel: "2. Suelo", dotColor: "#00ffff" },
    { id: "subsuelo", label: "3. Subsuelo y Recursos", shortLabel: "3. Subsuelo", dotColor: "#f59e0b" }
  ];

  // Control HUD Flotante para incrustar dentro del Mapa (PC y Móvil)
  const renderHudControlCapas = (compact = false) => (
    <div
      style={{
        position: "absolute",
        bottom: compact ? "10px" : "20px",
        left: compact ? "50%" : "22px",
        transform: compact ? "translateX(-50%)" : "none",
        zIndex: 60,
        backgroundColor: "rgba(3, 15, 46, 0.82)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(0, 255, 255, 0.28)",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.55)",
        borderRadius: compact ? "9999px" : "18px",
        padding: compact ? "4px" : "8px 10px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        maxWidth: compact ? "94%" : "auto"
      }}
    >
      {!compact && (
        <div className="flex items-center gap-1.5 px-2 pt-0.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#00ffff" }} />
          <span
            className="font-sans font-bold uppercase tracking-widest"
            style={{ fontSize: "9px", color: "rgba(255,255,255,0.65)" }}
          >
            Filtrar Capas del Territorio
          </span>
        </div>
      )}

      <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
        {opcionesCapas.map((capa) => {
          const isActive = capaDestacada === capa.id;
          return (
            <button
              key={capa.id}
              onClick={() => setCapaDestacada(capa.id as any)}
              className="flex items-center gap-1.5 rounded-full font-sans font-bold transition-all cursor-pointer shrink-0"
              style={{
                padding: compact ? "5px 9px" : "7px 13px",
                fontSize: compact ? "10px" : "11px",
                backgroundColor: isActive ? "#00ffff" : "rgba(255,255,255,0.05)",
                color: isActive ? "#031138" : "#ffffff",
                boxShadow: isActive ? "0 0 16px rgba(0, 255, 255, 0.45)" : "none",
                border: isActive ? "1px solid #00ffff" : "1px solid rgba(255,255,255,0.08)"
              }}
            >
              <span
                className="rounded-full shrink-0"
                style={{
                  width: compact ? "6px" : "7px",
                  height: compact ? "6px" : "7px",
                  backgroundColor: isActive ? "#031138" : capa.dotColor
                }}
              />
              <span>{compact ? capa.shortLabel : capa.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderMapaEstatico = (idPrefix: string) => {
    // Determinamos si se debe mostrar alguna imagen de mapa custom
    const mostrarImagenCustom = CUSTOM_MAP_IMAGES.usarImagenUnica || CUSTOM_MAP_IMAGES.usarTresCapasImg;

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* CONTENEDOR DE IMÁGENES:
            Declaramos una relación de aspecto fija (w-full h-full) para evitar el colapso de dimensión.
            Alineado en el eje z-0 para no bloquear la interactividad de las tarjetas del visualizador. */}
        {mostrarImagenCustom && (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0 overflow-hidden">
            
            {/* 1. MODO: IMAGEN ÚNICA */}
            {CUSTOM_MAP_IMAGES.usarImagenUnica && (
              <div className="relative w-[85%] h-[85%] flex items-center justify-center">
                <Image
                  src={CUSTOM_MAP_IMAGES.mapaCompleto}
                  alt="Mapa de México Completo"
                  fill
                  sizes="(max-width: 1024px) 100vw, 85vw"
                  priority
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
                />
              </div>
            )}

            {/* 2. MODO: TRES CAPAS INDEPENDIENTES */}
            {CUSTOM_MAP_IMAGES.usarTresCapasImg && (
              <div className="relative w-[85%] h-[85%] flex items-center justify-center">
                
                {/* Capa 3: Subsuelo (Fondo / Base) */}
                <div
                  className="absolute w-full h-full transition-all duration-700 ease-in-out transform"
                  style={{
                    transform: "translate(-30px, 35px) scale(0.95)",
                    opacity: capaDestacada === "todas" || capaDestacada === "subsuelo" ? 1 : 0.15,
                    zIndex: 10,
                  }}
                >
                  <Image 
                    src={CUSTOM_MAP_IMAGES.capaSubsueloImg} 
                    alt="Subsuelo y Recursos" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 85vw"
                    priority
                    className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]" 
                  />
                </div>

                {/* Capa 2: Suelo (Centro) */}
                <div
                  className="absolute w-full h-full transition-all duration-700 ease-in-out transform"
                  style={{
                    transform: "translate(0px, 5px) scale(0.95)",
                    opacity: capaDestacada === "todas" || capaDestacada === "suelo" ? 1 : 0.15,
                    zIndex: 20,
                  }}
                >
                  <Image 
                    src={CUSTOM_MAP_IMAGES.capaSueloImg} 
                    alt="Suelo y Catastro" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 85vw"
                    priority
                    className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]" 
                  />
                </div>

                {/* Capa 1: Población (Enfrente / Top) */}
                <div
                  className="absolute w-full h-full transition-all duration-700 ease-in-out transform"
                  style={{
                    transform: "translate(30px, -25px) scale(0.95)",
                    opacity: capaDestacada === "todas" || capaDestacada === "poblacion" ? 1 : 0.15,
                    zIndex: 30,
                  }}
                >
                  <Image 
                    src={CUSTOM_MAP_IMAGES.capaPoblacionImg} 
                    alt="Población y Ciudad" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 85vw"
                    priority
                    className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]" 
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* SVG DE NODOS E INTERACTIVIDAD (Se superpone perfectamente en z-10) */}
        <svg
          viewBox="0 0 1000 560"
          className="absolute inset-0 w-full h-full z-10"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern id={`rockSubsuelo-${idPrefix}`} width="45" height="45" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)">
              <rect width="45" height="45" fill="#5c2d0c" />
              <path d="M0 10 Q 22 4, 45 10" stroke="#9a4e1c" strokeWidth="7" fill="none" />
              <path d="M0 24 Q 22 30, 45 24" stroke="#b86b35" strokeWidth="5" fill="none" />
              <path d="M0 38 Q 22 34, 45 38" stroke="#3d1c05" strokeWidth="4" fill="none" />
            </pattern>

            <pattern id={`parcelasCatastro-${idPrefix}`} width="70" height="70" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
              <rect width="70" height="70" fill="#ecfccb" />
              <rect x="3" y="3" width="28" height="20" fill="#fde047" stroke="#0284c7" strokeWidth="1" />
              <rect x="34" y="3" width="32" height="28" fill="#bef264" stroke="#0284c7" strokeWidth="1" />
              <rect x="3" y="26" width="28" height="40" fill="#fef08a" stroke="#0284c7" strokeWidth="1" />
              <rect x="34" y="34" width="16" height="32" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
              <rect x="53" y="34" width="14" height="16" fill="#15803d" fillOpacity="0.75" />
              <rect x="53" y="53" width="14" height="14" fill="#facc15" />
              <path d="M0 24 L70 24 M32 0 L32 70" stroke="#0369a1" strokeWidth="1.5" strokeOpacity="0.6" />
            </pattern>

            <linearGradient id={`ciudadGrad-${idPrefix}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#047857" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#0f766e" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.95" />
            </linearGradient>

            <filter id={`dropShadow3D-${idPrefix}`} x="-15%" y="-15%" width="140%" height="140%">
              <feDropShadow dx="-12" dy="18" stdDeviation="10" floodColor="#000000" floodOpacity="0.7" />
            </filter>
          </defs>

          {/* RENDERIZADO DEL MAPA VECTORIAL SOLO SI NO HAY IMÁGENES ACTIVAS */}
          {!CUSTOM_MAP_IMAGES.usarImagenUnica && !CUSTOM_MAP_IMAGES.usarTresCapasImg && (
            <>
              {/* CAPA 3: SUBSUELO */}
              <g
                style={{
                  transform: "translate(10px, 85px)",
                  opacity: capaDestacada === "todas" || capaDestacada === "subsuelo" ? 1 : 0.15,
                  transition: "all 0.5s ease"
                }}
              >
                <path d={mexicoPath} fill="#261002" transform="translate(-14, 24)" filter={`url(#dropShadow3D-${idPrefix})`} />
                <path d={mexicoPath} fill="#3d1c05" transform="translate(-9, 16)" />
                <path d={mexicoPath} fill="#5c2d0c" transform="translate(-4, 8)" />
                <path d={mexicoPath} fill={`url(#rockSubsuelo-${idPrefix})`} stroke="#f59e0b" strokeWidth="3.5" />
              </g>

              {/* CAPA 2: SUELO Y CATASTRO */}
              <g
                style={{
                  transform: "translate(65px, 35px)",
                  opacity: capaDestacada === "todas" || capaDestacada === "suelo" ? 1 : 0.15,
                  transition: "all 0.5s ease"
                }}
              >
                <path d={mexicoPath} fill="#0284c7" transform="translate(-5, 9)" filter={`url(#dropShadow3D-${idPrefix})`} />
                <path d={mexicoPath} fill={`url(#parcelasCatastro-${idPrefix})`} stroke="#00ffff" strokeWidth="4.5" />
              </g>

              {/* CAPA 1: POBLACIÓN Y CIUDAD */}
              <g
                style={{
                  transform: "translate(120px, -15px)",
                  opacity: capaDestacada === "todas" || capaDestacada === "poblacion" ? 1 : 0.15,
                  transition: "all 0.5s ease"
                }}
              >
                <path d={mexicoPath} fill="#064e3b" transform="translate(-5, 9)" filter={`url(#dropShadow3D-${idPrefix})`} />
                <path d={mexicoPath} fill={`url(#ciudadGrad-${idPrefix})`} stroke="#34d399" strokeWidth="4" />

                {/* Edificios Zona Norte */}
                <g transform="translate(260, 82)">
                  <rect x="0" y="15" width="22" height="45" fill="#e2e8f0" stroke="#334155" strokeWidth="1" />
                  <rect x="22" y="15" width="9" height="45" fill="#64748b" />
                  <rect x="36" y="0" width="26" height="60" fill="#f8fafc" stroke="#334155" strokeWidth="1" />
                  <rect x="62" y="0" width="10" height="60" fill="#94a3b8" />
                  <path d="M40 10 H58 M40 20 H58 M40 30 H58 M40 40 H58 M40 50 H58" stroke="#0284c7" strokeWidth="3" strokeDasharray="4 2" />
                  <path d="M85 60 V20 L110 20" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
                  <rect x="78" y="54" width="14" height="8" fill="#fef08a" stroke="#b45309" strokeWidth="1" />
                </g>

                {/* Edificios Zona Centro */}
                <g transform="translate(425, 165)">
                  <rect x="0" y="0" width="32" height="68" fill="#f1f5f9" stroke="#1e293b" strokeWidth="1.2" />
                  <rect x="32" y="0" width="12" height="68" fill="#94a3b8" />
                  <path d="M5 10 H27 M5 20 H27 M5 30 H27 M5 40 H27 M5 50 H27" stroke="#0369a1" strokeWidth="3" strokeDasharray="5 2" />
                  <rect x="50" y="20" width="42" height="45" fill="#d9f99d" stroke="#3f6212" strokeWidth="1.2" />
                  <circle cx="71" cy="20" r="10" fill="#16a34a" stroke="#ffffff" strokeWidth="2" />
                  <text x="71" y="24" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">H</text>
                  <rect x="20" y="72" width="52" height="28" fill="#475569" stroke="#1e293b" strokeWidth="1.2" />
                  <rect x="28" y="46" width="8" height="26" fill="#dc2626" />
                  <rect x="28" y="52" width="8" height="5" fill="#ffffff" />
                  <rect x="42" y="50" width="8" height="22" fill="#dc2626" />
                  <rect x="42" y="56" width="8" height="5" fill="#ffffff" />
                </g>

                {/* Viviendas y Población */}
                {[
                  [195, 118], [335, 155], [385, 195], [515, 260], [595, 290], [685, 285], [745, 265]
                ].map(([hx, hy], idx) => (
                  <g key={idx} transform={`translate(${hx}, ${hy})`}>
                    <polygon points="0,12 12,2 24,12" fill="#b45309" />
                    <rect x="3" y="12" width="18" height="12" fill="#fde047" stroke="#78350f" strokeWidth="1" />
                    <rect x="10" y="16" width="4" height="8" fill="#78350f" />
                    <circle cx="-8" cy="18" r="3" fill="#00ffff" />
                    <circle cx="30" cy="16" r="3" fill="#fde047" />
                    <circle cx="14" cy="30" r="3" fill="#fb923c" />
                  </g>
                ))}

                {/* Nubes */}
                <g fill="#ffffff" fillOpacity="0.45">
                  <circle cx="290" cy="70" r="22" />
                  <circle cx="315" cy="65" r="30" />
                  <circle cx="340" cy="72" r="20" />
                  <circle cx="510" cy="150" r="25" />
                  <circle cx="540" cy="145" r="32" />
                  <circle cx="700" cy="245" r="22" />
                  <circle cx="725" cy="240" r="28" />
                </g>
              </g>
            </>
          )}

          {/* Líneas conectoras que se sobreponen */}
          {modulos.map((mod, i) => {
            const isHovered = hoveredMod === i;
            const isLayerActive = capaDestacada === "todas" || capaDestacada === mod.layer;
            const startX = (mod.x / 100) * 1000;
            const startY = (mod.y / 100) * 560;

            return (
              <g
                key={i}
                style={{
                  opacity: isLayerActive ? 1 : 0.12,
                  transition: "opacity 0.3s ease"
                }}
              >
                <line
                  x1={startX}
                  y1={startY}
                  x2={mod.anchorX}
                  y2={mod.anchorY}
                  stroke={isHovered ? "#00ffff" : "#ffffff"}
                  strokeWidth={isHovered ? "3.5" : "1.5"}
                  strokeDasharray={isHovered ? "none" : "6 4"}
                  strokeOpacity={isHovered ? 1 : 0.55}
                />
                <circle
                  cx={mod.anchorX}
                  cy={mod.anchorY}
                  r={isHovered ? 8 : 5}
                  fill={isHovered ? "#00ffff" : mod.color}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <section
      className="py-16 md:py-28 relative overflow-hidden select-none border-t border-white/10"
      style={{
        background: "radial-gradient(circle at 50% 45%, #0d3b9e 0%, #062366 55%, #031138 100%)"
      }}
    >
      <style>{`
        @keyframes sbCardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes sbMiniCardFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes sbCubeFloat {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-22px) translateX(8px); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* FONDO DE PARTÍCULAS DE CUBOS 3D SERVERBOX */}
      <ServerboxCubesBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative" style={{ zIndex: 10 }}>
        
        {/* ENCABEZADO LIMPIO Y CENTRADO */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <span
            className="font-sans font-bold uppercase text-xs mb-2 block"
            style={{ color: "#00ffff", letterSpacing: "0.25em" }}
          >
            Arquitectura Territorial Multicapa
          </span>
          <h2 className="font-poppins font-black text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tighter leading-none">
            Ecosistema <span style={{ color: "#00ffff" }}>ServerBox®</span> en México
          </h2>
        </div>

        {/* =====================================================================
            MODO A: MÓVIL Y TABLET (< 1024px)
            (Visor con HUD Integrado + Mini-Industrias + Carrusel Táctil)
        ===================================================================== */}
        {isMobile ? (
          <div className="flex flex-col gap-6">
            {/* 1. Visor del Mapa con HUD de Capas Integrado adentro */}
            <div
              className="relative w-full rounded-3xl border border-white/20 overflow-hidden shadow-2xl"
              style={{
                height: "340px",
                background: "radial-gradient(circle at 50% 45%, rgba(29, 78, 216, 0.45) 0%, rgba(6, 35, 102, 0.8) 70%, rgba(3, 17, 56, 0.95) 100%)",
                backdropFilter: "blur(6px)"
              }}
            >
              {/* Mapa y líneas conectoras */}
              <div style={{ width: "100%", height: "86%" }}>
                {renderMapaEstatico("mobile")}
              </div>

              {/* Mini-Ventanas Visuales de las Industrias alrededor del mapa móvil */}
              {modulos.map((mod, i) => {
                const Icon = mod.icon;
                const isFilteredOut = capaDestacada !== "todas" && capaDestacada !== mod.layer;

                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: `${mod.x}%`,
                      top: `${mod.y * 0.84}%`,
                      transform: `translate(-50%, -50%) skewY(${mod.tilt}deg)`,
                      opacity: isFilteredOut ? 0.15 : 0.95,
                      transition: "opacity 0.3s ease",
                      pointerEvents: "none",
                      zIndex: 20
                    }}
                  >
                    <div
                      style={{
                        animation: `sbMiniCardFloat ${2.6 + (i % 4) * 0.4}s ease-in-out ${i * 0.15}s infinite`,
                        width: "52px",
                        borderRadius: "6px",
                        overflow: "hidden",
                        backgroundColor: "#ffffff",
                        border: "1px solid rgba(255,255,255,0.9)",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.45)"
                      }}
                    >
                      <div
                        className="flex items-center gap-0.5 px-1 py-0.5 text-white"
                        style={{ backgroundColor: mod.color }}
                      >
                        <Icon size={7} className="shrink-0" />
                        <span
                          className="font-poppins font-bold truncate leading-none"
                          style={{ fontSize: "6px" }}
                        >
                          {mod.title}
                        </span>
                      </div>
                      <div className="relative w-full bg-slate-900" style={{ height: "22px" }}>
                        <Image src={mod.img} alt={mod.title} fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* HUD Integrado en la parte baja del Mapa Móvil */}
              {renderHudControlCapas(true)}
            </div>

            {/* 2. Indicador de Carrusel */}
            <div className="flex items-center justify-between px-1">
              <span className="font-sans text-xs font-bold uppercase tracking-wider" style={{ color: "#00ffff" }}>
                Explora cada industria ({modulosFiltrados.length})
              </span>
              <div className="flex items-center gap-1 text-white/90 font-sans text-xs">
                <span>Desliza y toca</span>
                <ArrowRight size={14} style={{ color: "#00ffff" }} />
              </div>
            </div>

            {/* 3. Carrusel Táctil Inferior (Sin barra de scroll gris) */}
            <div
              className="flex gap-4 overflow-x-auto pb-4 pt-2 px-2 snap-x snap-mandatory no-scrollbar"
              style={{ scrollBehavior: "smooth" }}
            >
              {modulosFiltrados.map((mod, i) => {
                const Icon = mod.icon;
                return (
                  <motion.div
                    key={mod.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setModuloActivo(mod)}
                    className="snap-center shrink-0 rounded-2xl overflow-hidden bg-white cursor-pointer active:scale-95 transition-transform"
                    style={{
                      width: "240px",
                      border: "2px solid rgba(255,255,255,0.95)",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.5)",
                      transform: "skewY(-2deg)"
                    }}
                  >
                    <div
                      className="px-3.5 py-2.5 flex items-center justify-between text-white"
                      style={{ backgroundColor: mod.color }}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                        >
                          <Icon size={14} className="text-white" />
                        </div>
                        <span className="font-poppins font-bold text-sm leading-none truncate">
                          {mod.title}
                        </span>
                      </div>
                    </div>

                    <div className="relative w-full bg-slate-900" style={{ height: "135px" }}>
                      <Image src={mod.img} alt={mod.title} fill className="object-cover" />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: "linear-gradient(to top, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.15) 60%, transparent 100%)"
                        }}
                      />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-white/90">
                          {mod.layerLabel}
                        </span>
                        <span
                          className="font-sans font-bold uppercase px-2 py-1 rounded-md flex items-center gap-1"
                          style={{
                            fontSize: "10px",
                            backgroundColor: "#00ffff",
                            color: "#031138"
                          }}
                        >
                          Ver más <ArrowRight size={10} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          /* =====================================================================
              MODO B: PC DE ESCRITORIO (>= 1024px)
              (Mapa Fijo + HUD de Capas Integrado adentro + Cards Flotantes)
          ===================================================================== */
          <div
            className="relative mx-auto rounded-3xl border border-white/20 overflow-hidden shadow-2xl"
            style={{
              width: "100%",
              height: "780px",
              background: "radial-gradient(circle at 50% 50%, rgba(29, 78, 216, 0.4) 0%, rgba(6, 35, 102, 0.72) 60%, rgba(3, 17, 56, 0.92) 100%)",
              backdropFilter: "blur(6px)"
            }}
          >
            {/* Mapa de México 100% estático con sus líneas conectoras reactivas */}
            {renderMapaEstatico("desktop")}

            {/* HUD Flotante para Cambiar entre Capas Integrado adentro del Mapa (Esquina Inferior Izquierda) */}
            {renderHudControlCapas(false)}

            {/* Las 14 Tarjetas Flotantes con Animación Continua + Hover Fluido */}
            {modulos.map((mod, i) => {
              const Icon = mod.icon;
              const isHovered = hoveredMod === i;
              const isFilteredOut = capaDestacada !== "todas" && capaDestacada !== mod.layer;

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredMod(i)}
                  onMouseLeave={() => setHoveredMod(null)}
                  onClick={() => setModuloActivo(mod)}
                  style={{
                    position: "absolute",
                    left: `${mod.x}%`,
                    top: `${mod.y}%`,
                    width: "150px",
                    zIndex: isHovered ? 50 : 20,
                    opacity: isFilteredOut ? 0.18 : 1,
                    pointerEvents: isFilteredOut ? "none" : "auto",
                    transform: `translate(-50%, -50%) skewY(${mod.tilt}deg) ${
                      isHovered ? "scale(1.16)" : "scale(1)"
                    }`,
                    transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
                    cursor: "pointer"
                  }}
                >
                  <div
                    className="rounded-xl overflow-hidden bg-white transition-shadow duration-300"
                    style={{
                      animation: isHovered
                        ? "none"
                        : `sbCardFloat ${3 + (i % 4) * 0.45}s ease-in-out ${i * 0.2}s infinite`,
                      border: isHovered
                        ? "2.5px solid #00ffff"
                        : "2px solid rgba(255, 255, 255, 0.92)",
                      boxShadow: isHovered
                        ? "0 0 35px rgba(0, 255, 255, 0.85), 0 18px 35px rgba(0, 0, 0, 0.65)"
                        : "0 12px 25px rgba(0, 0, 0, 0.55)"
                    }}
                  >
                    <div
                      className="px-2.5 py-1.5 flex items-center gap-1.5 text-white transition-colors duration-300"
                      style={{
                        backgroundColor: isHovered ? "#0B3D91" : mod.color
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: isHovered ? "#00ffff" : "rgba(255,255,255,0.22)"
                        }}
                      >
                        <Icon size={11} style={{ color: isHovered ? "#031138" : "#ffffff" }} />
                      </div>
                      <span className="font-poppins font-bold text-xs leading-none truncate">
                        {mod.title}
                      </span>
                    </div>

                    <div
                      className="relative w-full overflow-hidden bg-slate-900"
                      style={{ height: "84px" }}
                    >
                      <Image
                        src={mod.img}
                        alt={mod.title}
                        fill
                        className="object-cover transition-transform duration-500"
                        style={{ transform: isHovered ? "scale(1.14)" : "scale(1)" }}
                      />
                      <div
                        className="absolute inset-0 transition-opacity duration-300"
                        style={{
                          background: isHovered
                            ? "linear-gradient(to top, rgba(0, 255, 255, 0.25) 0%, transparent 70%)"
                            : "linear-gradient(to top, rgba(2,6,23,0.65) 0%, transparent 60%)"
                        }}
                      />
                      <span
                        className="absolute bottom-1 right-1.5 font-sans font-bold uppercase px-1.5 py-0.5 rounded transition-colors duration-300"
                        style={{
                          fontSize: "9px",
                          backgroundColor: isHovered ? "#00ffff" : "rgba(3, 17, 56, 0.85)",
                          color: isHovered ? "#031138" : "#00ffff"
                        }}
                      >
                        Explorar +
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ======================= MODAL EMERGENTE AL SELECCIONAR ======================= */}
      <AnimatePresence>
        {moduloActivo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4 pt-20 sm:p-6 sm:pt-24 md:p-8 md:pt-28"
            style={{ zIndex: 99999 }}
          >
            <div
              className="absolute inset-0 cursor-pointer"
              style={{ backgroundColor: "rgba(2, 6, 23, 0.78)", backdropFilter: "blur(8px)" }}
              onClick={() => setModuloActivo(null)}
            />

            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 border-2 border-white"
              style={{ maxHeight: "78vh" }}
            >
              <div className="relative w-full shrink-0" style={{ height: "200px" }}>
                <Image
                  src={moduloActivo.img}
                  alt={moduloActivo.title}
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, #0f172a 0%, rgba(15,23,42,0.45) 55%, transparent 100%)"
                  }}
                />

                <div
                  className="absolute top-4 left-6 z-20 px-3.5 py-1 rounded-full text-white font-sans text-xs font-bold uppercase tracking-widest shadow-md"
                  style={{ backgroundColor: moduloActivo.color }}
                >
                  Capa Territorial: {moduloActivo.layer}
                </div>

                <button
                  onClick={() => setModuloActivo(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors z-20 cursor-pointer"
                  style={{ backgroundColor: "rgba(15, 23, 42, 0.65)", border: "1px solid rgba(255,255,255,0.3)" }}
                >
                  <X size={20} />
                </button>

                <div className="absolute bottom-5 left-6 right-6 flex items-end gap-4 z-10">
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 border-2 border-white/40"
                    style={{ backgroundColor: moduloActivo.color }}
                  >
                    {moduloActivo.icon && <moduloActivo.icon size={32} />}
                  </div>
                  <div>
                    <span
                      className="font-sans font-bold text-xs uppercase tracking-widest block mb-1"
                      style={{ color: "#00ffff" }}
                    >
                      Cómo apoya ServerBox® al sector
                    </span>
                    <h3 className="font-poppins font-black text-2xl sm:text-4xl text-white leading-none uppercase tracking-tighter">
                      {moduloActivo.title}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto no-scrollbar bg-slate-50 flex-1">
                <p className="font-sans text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-light">
                  {moduloActivo.description}
                </p>

                <h4 className="font-sans font-bold text-slate-900 uppercase tracking-widest text-xs mb-4 border-b border-slate-200 pb-2">
                  Capacidades Principales del Módulo
                </h4>

                <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                  {moduloActivo.bullets.map((bullet: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
                    >
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={14} style={{ color: "#0B3D91" }} />
                      </div>
                      <span className="font-sans text-slate-700 text-sm font-medium leading-tight mt-0.5">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2">
                  {/* AQUÍ ESTÁ LA CORRECCIÓN PRINCIPAL PARA EL SCROLL */}
                  <button
                    onClick={() => {
                      setModuloActivo(null); // Cierra el modal
                      setTimeout(() => {
                        // Hace scroll suave hasta la sección de contacto
                        document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
                        // Espera un momento a que termine el scroll para hacer focus en el input
                        setTimeout(() => document.getElementById("name")?.focus(), 600);
                      }, 300);
                    }}
                    className="w-full text-white font-sans font-bold uppercase tracking-widest text-sm py-4 rounded-xl transition-all duration-300 shadow-lg flex justify-center items-center gap-2 cursor-pointer"
                    style={{ backgroundColor: "#0B3D91" }}
                  >
                    Solicita más información
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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

const PreguntasFrecuentesServerbox = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { pregunta: "¿Se puede integrar con nuestro ERP o sistema actual?", respuesta: "Sí, Serverbox está diseñado con una arquitectura API-first, lo que permite una integración bidireccional y transparente con sistemas ERP (SAP, Oracle), CRM, y bases de datos SQL existentes sin interrumpir tu operación diaria." },
    { pregunta: "¿Dónde se almacena mi información crítica?", respuesta: "Ofrecemos flexibilidad total. Puedes optar por un despliegue en nuestra infraestructura Cloud de alta seguridad (con 99.9% de uptime) o una instalación On-Premise directamente en los servidores locales de tu institución." },
    { pregunta: "¿Qué nivel de seguridad maneja el portal?", respuesta: "Implementamos protocolos de ciberseguridad corporativa, encriptación de datos en tránsito y en reposo, control de acceso basado en roles (RBAC) y respaldos automáticos cada 24 horas para garantizar la integridad absoluta de tu información." },
    { pregunta: "¿Es necesario tener conocimientos previos en sistemas GIS?", respuesta: "No. Serverbox extrae toda la complejidad técnica. Nuestro equipo se encarga de la orquestación espacial en el backend, entregándote a ti y a tu equipo un tablero ejecutivo altamente intuitivo enfocado puramente en la toma de decisiones estratégicas." }
  ];

  const toggleFaq = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="py-32 px-6 md:px-8 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="font-sans font-bold text-[#0B3D91] tracking-[0.2em] uppercase text-xs mb-4 block">Resolviendo dudas</span>
          <h2 className="font-poppins font-black text-4xl md:text-5xl text-slate-900 mb-6 uppercase tracking-tighter">Preguntas <span className="text-[#0B3D91]">Frecuentes</span></h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`bg-white rounded-3xl transition-all duration-500 overflow-hidden border ${openIndex === idx ? 'border-[#0B3D91]/30 shadow-xl shadow-[#0B3D91]/5' : 'border-slate-100 shadow-sm hover:border-slate-300'}`}>
              <button onClick={() => toggleFaq(idx)} className="w-full flex items-center justify-between p-6 sm:p-8 text-left group focus:outline-none">
                <h3 className={`font-poppins font-bold text-lg sm:text-xl pr-8 transition-colors duration-300 ${openIndex === idx ? 'text-[#0B3D91]' : 'text-slate-800 group-hover:text-[#0B3D91]'}`}>{faq.pregunta}</h3>
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
// 8. INBOUND LEAD CAPTURE: SERVERBOX (UNIFICADO CON HUBSPOT + CITA OPCIONAL)
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

const ServerboxLeadCapture = () => {
  // Estado para saber si el usuario quiere agendar fecha/hora (Opcional)
  const [wantsAppointment, setWantsAppointment] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonthDate, setCurrentMonthDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // Preseleccionamos "Soluciones Serverbox" por estar en su landing
  const [selectedThemes, setSelectedThemes] = useState<string[]>([
    "Soluciones Serverbox",
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
    setSelectedThemes(["Soluciones Serverbox"]);
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
    // AQUÍ ESTÁ EL ID="contacto" PARA QUE EL SCROLL LLEGUE AQUÍ
    <section id="contacto" className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-slate-50 relative z-10 overflow-hidden border-t border-slate-200">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0B3D91]/5 rounded-full blur-[80px] pointer-events-none -translate-x-1/4 translate-y-1/3" />

      <div className="max-w-6xl mx-auto relative z-20">
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* ========================================================= */}
          {/* COLUMNA IZQUIERDA: INFORMACIÓN SERVERBOX (5 COLUMNAS)     */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 p-8 sm:p-10 md:p-12 lg:py-16 lg:px-12 flex flex-col justify-center relative overflow-hidden min-w-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(11,61,145,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(11,61,145,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#0B3D91]/5 border border-[#0B3D91]/10 rounded-full mb-8 w-max max-w-full">
                  <Lock className="w-4 h-4 text-[#0B3D91] shrink-0" />
                  <span className="font-sans font-bold text-[#0B3D91] tracking-[0.18em] uppercase text-xs truncate">
                    Acceso Corporativo Seguro
                  </span>
                </div>

                <h2 className="font-poppins font-black text-3xl sm:text-4xl xl:text-[2.65rem] text-slate-900 tracking-tighter mb-7 leading-[1.12]">
                  Centraliza tus datos. <br />
                  <span className="text-[#0B3D91]">Domina tu territorio.</span>
                </h2>

                <p className="font-sans text-slate-600 text-base sm:text-lg leading-relaxed mb-10">
                  La información dispersa frena el crecimiento. Agenda una sesión
                  demostrativa de Serverbox y descubre cómo nuestros portales web
                  consolidan tus bases de datos, cartografía y KPIs en un solo
                  centro de control en tiempo real.
                </p>
              </div>

              <ul className="space-y-8 font-sans text-slate-700 mt-2">
                <li className="flex items-start gap-4">
                  <div className="bg-[#0B3D91]/10 p-2.5 rounded-full shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-[#0B3D91]" />
                  </div>
                  <div className="min-w-0">
                    <strong className="block text-slate-900 font-bold text-base mb-1.5">
                      Visualización de Dashboards Reales
                    </strong>
                    <span className="text-slate-600 text-sm leading-relaxed block">
                      Navega por una versión interactiva de los tableros de
                      control ejecutivos adaptados a tu sector.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-[#0B3D91]/10 p-2.5 rounded-full shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-[#0B3D91]" />
                  </div>
                  <div className="min-w-0">
                    <strong className="block text-slate-900 font-bold text-base mb-1.5">
                      Diagnóstico de Arquitectura
                    </strong>
                    <span className="text-slate-600 text-sm leading-relaxed block">
                      Evaluaremos la viabilidad técnica para conectar tus sistemas
                      actuales (ERP/CAD) con la plataforma SIG.
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
                    Nuestro equipo de especialistas en Serverbox evaluará tu
                    información y se pondrá en contacto a tu correo corporativo
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
                  {/* LOGO SERVERBOX CENTRADO Y 25% MÁS GRANDE */}
                  <div className="mb-6 flex justify-center">
                    <Image
                      src="/assets/img/01_LANDING_SIGSA/LOGO_server.png"
                      alt="Serverbox Logo"
                      width={375}
                      height={88}
                      className="object-contain h-16 md:h-[75px] w-auto"
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
                        {/* AQUÍ ESTÁ EL ID="name" PARA EL AUTO FOCUS */}
                        <input
                          id="name"
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
                          placeholder="Ej. Director SIG"
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
                          placeholder="Cuéntanos sobre los datos o sistemas que deseas centralizar..."
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
                            Confirmar Cita y Sesión{" "}
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        ) : (
                          <>
                            Agenda una cita{" "}
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
// MAIN ASSEMBLY
// ==========================================
export default function ServerboxLanding() {
  return (
    <div className="relative text-left selection:bg-[#00ffff] selection:text-[#0B3D91]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@700;900&display=swap');
        .font-poppins { font-family: 'Space Grotesk', sans-serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
      `}</style>
      
      <LightShaderCanvas />

      <HeroServerbox />
      <CasosDeUsoTabs />
      <ProcesoIsometrico />
      <ModulosServerboxSection />
      <PreguntasFrecuentesServerbox />
      <ServerboxLeadCapture />
      
    </div>
  );
}