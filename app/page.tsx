"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Play,
  Activity,
  CheckCircle,
  CheckCircle2,
  Send,
  Loader2,
  Box,
  Database,
  Map as MapIcon,
  Zap,
  TrendingUp,
  ShieldCheck,
  ArrowUpRight,
  Newspaper,
  Share2, Calendar as CalendarIcon, Clock, ChevronRight, ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

// ==========================================
// 1. SHADER BACKGROUND: Corporate Light Fluid
// ==========================================
const CorporateFluidCore = () => {
  const sphereRef = useRef<any>(null);

  useFrame(({ clock, pointer }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.1;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      sphereRef.current.position.x = pointer.x * 1.5;
      sphereRef.current.position.y = pointer.y * 1.5;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 128, 128]} scale={2.5}>
      <MeshDistortMaterial
        color="#0B3D91"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.1}
        transparent={true}
        opacity={0.03}
        wireframe={false}
      />
    </Sphere>
  );
};

const ShaderCanvasBase = () => (
  <div className="fixed inset-0 z-[-1] bg-[#ffffff] pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(11,61,145,0.06)_0%,_transparent_60%)] z-0" />
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#0B3D91" />
      <CorporateFluidCore />
    </Canvas>
    <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply" />
  </div>
);

const LightShaderCanvas = dynamic(() => Promise.resolve(ShaderCanvasBase), {
  ssr: false,
});

// ==========================================
// 2. HERO VIDEO (Pantalla Completa y Centrado)
// ==========================================
const HeroVideo = () => {
  return (
    <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-slate-900">
      <h1 className="sr-only font-poppins font-bold">
        SIGSA - Liderazgo Geotecnológico, Cartografía 3D, LiDAR y Gemelos Digitales en México
      </h1>

      {/* CONTENEDOR DEL VIDEO */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          src="/assets/img/01_LANDING_SIGSA/hero_banner_low.mp4"
        />
        {/* Gradiente oscuro sutil para dar contraste al texto centrado */}
        <div className="absolute inset-0 bg-slate-900/50 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(15,23,42,0.6)_100%)] z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-4 md:mb-6"
        >
          <span className="w-8 md:w-12 h-[2px] bg-[#00ffff] rounded-full"></span>
          <span className="font-sans font-bold text-[#00ffff] tracking-[0.3em] uppercase text-xs md:text-sm">
            45 años mapeando México
          </span>
          <span className="w-8 md:w-12 h-[2px] bg-[#00ffff] rounded-full"></span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="w-full flex flex-col items-center"
        >
          {/* TEXTO DE ALTO IMPACTO CENTRADO */}
          <h2 className="font-poppins font-bold text-[clamp(2rem,6vw,3.5rem)] md:text-[clamp(3.5rem,6vw,5.5rem)] text-white leading-[1.1] md:leading-[1.1] tracking-tighter mb-4 md:mb-6 uppercase break-words w-full max-w-5xl">
            VISUALIZA EL FUTURO CON <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00ffff] to-white block mt-2 font-sans font-semibold">
              PRECISIÓN ABSOLUTA
            </span>
          </h2>
          <p className="font-sans font-normal text-white/90 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed mx-auto">
            Potenciamos tus decisiones estratégicas capturando la realidad al milímetro. Experimenta la evolución de tus activos a través de Inteligencia Geoespacial, portales ejecutivos a tu medida y Gemelos Digitales de clase mundial.
          </p>
        </motion.div>
      </div>

      <a
        href="#sobre-sigsa"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-[#00ffff]/70 animate-bounce cursor-pointer hover:text-[#00ffff] transition-colors"
      >
        <span className="font-sans font-normal text-[10px] md:text-xs tracking-widest uppercase">
          Conocer Más
        </span>
        <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-white/80" />
      </a>
    </section>
  );
};

// ==========================================
// 3. QUIÉNES SOMOS
// ==========================================
const QuienesSomos = () => (
  <section id="sobre-sigsa" className="py-32 px-8 md:px-24 bg-white relative z-10 overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0B3D91]/5 rounded-full blur-[100px] pointer-events-none" />
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative aspect-video lg:aspect-square w-full max-w-lg mx-auto lg:mx-0"
      >
        <div className="absolute inset-0 border-2 border-[#0B3D91]/10 rounded-[3rem] transform translate-x-6 translate-y-6" />
        <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl shadow-[#0B3D91]/20 border border-white">
          <Image
            src="/assets/img/01_LANDING_SIGSA/pag_prinW_2.webp"
            alt="Equipo y tecnología SIGSA trabajando con Cartografía 3D"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#0B3D91]/10 bg-[#0B3D91]/5 mb-6">
          <div className="w-2 h-2 rounded-full bg-[#0B3D91] animate-pulse" />
          <span className="font-sans font-normal text-[#0B3D91] tracking-[0.2em] uppercase text-xs">
            Trayectoria y Excelencia
          </span>
        </div>
        <h2 className="font-poppins font-bold text-5xl md:text-6xl tracking-tighter mb-8 text-slate-900 leading-[1.1]">
          45 años transformando <span className="text-[#0B3D91]">datos en decisiones.</span>
        </h2>
        <p className="font-sans font-normal text-slate-600 text-lg leading-relaxed mb-10 max-w-xl">
          Integramos soluciones innovadoras y servicios especializados de la más alta calidad. Entendemos las necesidades de tu negocio para ofrecerte herramientas que optimicen tus procesos y garanticen resultados medibles.
        </p>
        <Link
          href="/nosotros"
          className="inline-flex items-center gap-4 bg-[#0B3D91] text-white px-8 py-4 rounded-full font-sans font-normal hover:bg-[#00ffff] hover:text-[#0B3D91] transition-all shadow-lg shadow-[#0B3D91]/20"
        >
          Nuestra historia completa
        </Link>
      </motion.div>
    </div>
  </section>
);

// ==========================================
// 4. BENTO DE VIDEOS
// ==========================================
const VideoGalleryBento = () => {
  const products = [
    {
      title: "Proyecto México®",
      desc: "Nuestra propia cartografía a nivel nacional.",
      video: "/assets/img/01_LANDING_SIGSA/videos_web/01_VID_PROMEX.webm",
      poster: "/assets/img/01_LOGO_SIG.png",
      link: "/proyecto-mexico",
      col: "md:col-span-2",
    },
    {
      title: "SERVERBOX",
      desc: "Soluciones para catastro y predial.",
      video: "/assets/img/01_LANDING_SIGSA/videos_web/02_VID_SERVER.webm",
      poster: "/assets/img/01_LOGO_SIG.png",
      link: "/serverbox",
      col: "md:col-span-1",
    },
    {
      title: "Smart Twin®",
      desc: "Gemelos digitales para optimización.",
      video: "/assets/img/01_LANDING_SIGSA/videos_web/03_VID_SMART.webm",
      poster: "/assets/img/01_LOGO_SIG.png",
      link: "/smart-twin",
      col: "md:col-span-1",
    },
    {
      title: "LiDAR",
      desc: "Escaneo láser de alta precisión.",
      video: "/assets/img/01_LANDING_SIGSA/videos_web/04_VID_LiDAR.webm",
      poster: "/assets/img/01_LOGO_SIG.png",
      link: "/lidar",
      col: "md:col-span-1",
    },
    {
      title: "Mapa Móvil",
      desc: "Captura masiva de datos en movimiento.",
      video: "/assets/img/01_LANDING_SIGSA/videos_web/05_VID_MapaMovil.webm",
      poster: "/assets/img/01_LOGO_SIG.png",
      link: "/mapa-movil",
      col: "md:col-span-1",
    },
    {
      title: "Percepción Remota",
      desc: "Procesamiento avanzado de imágenes satelitales.",
      video: "/assets/img/01_LANDING_SIGSA/videos_web/06_VID_Percepcion.webm",
      poster: "/assets/img/01_LOGO_SIG.png",
      link: "/percepcion-remota",
      col: "md:col-span-3",
    },
  ];

  return (
    <section id="soluciones" className="py-32 px-8 md:px-24 bg-slate-50 relative z-10 border-y border-slate-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-poppins font-bold text-5xl md:text-6xl tracking-tighter mb-4 text-center text-slate-900 uppercase">
          Productos Destacados
        </h2>
        <p className="font-sans font-normal text-center text-slate-500 mb-16 max-w-2xl mx-auto">
          Nuestra suite de soluciones tecnológicas diseñadas para resolver los retos geográficos más complejos de la industria.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px]">
          {products.map((prod, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`group relative overflow-hidden bg-slate-900 rounded-[2rem] shadow-lg hover:shadow-2xl hover:shadow-[#0B3D91]/20 transition-all duration-500 flex flex-col justify-end p-8 border border-white/10 ${prod.col}`}
            >
              <div className="absolute inset-0 bg-slate-800 transition-transform duration-700 group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D91] via-[#0B3D91]/40 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity" />
                <video
                  className="w-full h-full object-cover absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={prod.poster}
                >
                  <source src={prod.video} type="video/webm" />
                </video>
              </div>
              <div className="relative z-20 text-white transform transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="font-poppins font-bold text-3xl mb-3">{prod.title}</h3>
                <p className="font-sans font-normal text-white/70 max-w-md text-sm leading-relaxed mb-6">
                  {prod.desc}
                </p>
                <Link
                  href={prod.link}
                  className="inline-flex items-center gap-2 font-sans font-normal text-xs tracking-widest uppercase bg-white/10 backdrop-blur-md border border-white/20 hover:bg-[#00ffff] hover:border-[#00ffff] hover:text-[#0B3D91] px-6 py-3 rounded-full transition-all duration-300"
                >
                  Conozca más <Play className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 5. SECCIÓN: CASOS DE USO
// ==========================================
const CasosDeExito = () => {
  const [activeTab, setActiveTab] = useState(0);

  const casos = [
    {
      titulo: "Gemelos Digitales",
      tag: "INNOVACIÓN 3D",
      desc: "Implementación de réplicas virtuales exactas de infraestructura física. Permite la simulación, monitoreo en tiempo real y optimización del ciclo de vida de los activos, reduciendo costos operativos y mejorando la toma de decisiones.",
      icon: <Box size={18} />,
      badgeIcon: <Zap size={14} className="text-[#00ffff]" />,
      badgeText: "Monitoreo en Tiempo Real",
      video: "/assets/img/01_LANDING_SIGSA/casos/caso_smart_1.mp4",
    },
    {
      titulo: "Minería Catastral",
      tag: "RECAUDACIÓN",
      desc: "Procesamiento y cruce masivo de información geoespacial y registral. Identificamos discrepancias, predios no registrados y variaciones de construcción para incrementar sustancialmente la recaudación fiscal de los municipios.",
      icon: <Database size={18} />,
      badgeIcon: <TrendingUp size={14} className="text-emerald-400" />,
      badgeText: "Incremento de Ingresos",
      video: "/assets/img/01_LANDING_SIGSA/casos/caso_catastro_2.mp4",
    },
    {
      titulo: "Cartografía",
      tag: "PRECISIÓN",
      desc: "Generación de bases cartográficas de alta precisión a nivel nacional. Utilizando tecnología LiDAR y fotogrametría de vanguardia, proporcionamos el lienzo geográfico exacto para la planeación urbana y proyectos de gran escala.",
      icon: <MapIcon size={18} />,
      badgeIcon: <ShieldCheck size={14} className="text-[#0B3D91]" />,
      badgeText: "Precisión Milimétrica",
      video: "/assets/img/01_LANDING_SIGSA/casos/caso_promex_3.mp4",
    },
  ];

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-white relative z-10 overflow-hidden">
      {/* Luces ambientales de fondo */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#00ffff]/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#0B3D91]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3" />

      {/* Contenedor Flex para manejar el orden (Móvil vs Desktop) */}
      <div className="flex flex-col max-w-7xl mx-auto relative z-20">
        {/* 1. Encabezado (Siempre arriba) */}
        <div className="order-1 flex flex-col items-center text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B3D91]/5 border border-[#0B3D91]/10 rounded-full mb-6">
            <span className="font-sans font-bold text-[#0B3D91] tracking-[0.2em] uppercase text-xs">
              Nuestra Experiencia
            </span>
          </div>
          <h2 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl text-slate-900 tracking-tighter uppercase mb-4">
            Casos de <span className="text-[#0B3D91]">USO</span>
          </h2>
        </div>

        {/* 2. Menú Pestañas - En PC: Arriba (order-2) | En Móvil: Abajo (order-3) */}
        <div className="order-3 md:order-2 mt-6 md:mt-0 mb-0 md:mb-12 flex justify-center w-full">
          <div className="bg-slate-50 p-1.5 rounded-2xl md:rounded-full shadow-md shadow-slate-200/50 border border-slate-200/60 w-full md:w-auto relative z-30">
            <div className="grid grid-cols-3 md:flex gap-1 md:gap-0">
              {casos.map((caso, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`relative flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 py-3 px-1 sm:px-2 md:px-8 md:py-3.5 rounded-xl md:rounded-full font-sans font-bold text-[10px] sm:text-xs md:text-sm leading-tight text-center transition-all z-10 w-full ${
                    activeTab === idx
                      ? "text-[#0B3D91]"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white/60"
                  }`}
                >
                  {activeTab === idx && (
                    <motion.div
                      layoutId="pillIndicator"
                      className="absolute inset-0 bg-[#00ffff]/20 border border-[#00ffff]/50 rounded-xl md:rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  <span className={`${activeTab === idx ? "text-[#0B3D91]" : "text-slate-400"} md:mb-0`}>
                    {caso.icon}
                  </span>
                  <span>{caso.titulo}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Tarjeta de Contenido - En PC: Abajo (order-3) | En Móvil: Medio (order-2) */}
        <div className="order-2 md:order-3 bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden min-h-[500px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
            {/* Izquierda (Móvil: Arriba): Textos Animados */}
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
                    <div className="w-max px-3 py-1 mb-6 rounded-md border-l-2 border-[#00ffff] bg-[#0B3D91]/5 text-[#0B3D91] font-sans font-bold text-[10px] tracking-widest uppercase">
                      {casos[activeTab].tag}
                    </div>

                    <h3 className="font-poppins font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 mb-4 sm:mb-6 leading-[1.1] tracking-tight uppercase">
                      {casos[activeTab].titulo}
                    </h3>

                    <p className="font-sans font-normal text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed md:mb-10">
                      {casos[activeTab].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Derecha (Móvil: Abajo): Pantalla de Video */}
            <div className="lg:col-span-7 bg-slate-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-100">
              <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl border-4 border-white bg-slate-900 group">
                {casos.map((caso, idx) => (
                  <video
                    key={idx}
                    src={caso.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                      activeTab === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  />
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/10 pointer-events-none z-20 mix-blend-multiply" />

                {/* Badge Flotante sobre el video */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-30 max-w-[90%]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, scale: 0.8, x: -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="bg-slate-900/80 backdrop-blur-md border border-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl flex items-center gap-2 sm:gap-3 shadow-lg"
                    >
                      <div className="bg-white/10 p-1.5 rounded-lg shrink-0">
                        {casos[activeTab].badgeIcon}
                      </div>
                      <span className="font-sans font-bold text-white text-[10px] sm:text-xs tracking-wider line-clamp-1">
                        {casos[activeTab].badgeText}
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
// 6. SECCIÓN: NOTICIAS Y ECOSISTEMA SOCIAL (COMPACTA 100VH & TÍTULOS HORIZONTALES)
// ==========================================
const NoticiasSigsa = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [activeSocialPost, setActiveSocialPost] = useState(0);

  // Puedes configurar "link" hacia una sección interna (ej. "/smart-twin") o a una red social ("https://...")
  // Si "isExternal" es true, abrirá en una nueva pestaña.
  const noticias = [
    {
      id: "01",
      categoria: "GEMELOS DIGITALES",
      fecha: "OCT 2026",
      coords: "19.4326° N, 99.1332° W",
      titulo: "Smart Twin® optimiza tus activos fisicos en un ambiente virtual",
      resumen:
        "Integramos telemetría IoT, sensores SCADA en tiempo real y modelado GeoBIM de alta fidelidad para anticipar escenarios en todas las industrias.",
      imagen: "/assets/img/01_LANDING_SIGSA/noticias_SMART_2.webp",
      ctaText: "Explorar Smart Twin®",
      link: "/smart-twin",
      isExternal: false,
      lectura: "SOLUCIÓN DESTACADA",
    },
    {
      id: "02",
      categoria: "INNOVACIÓN CATASTRAL",
      fecha: "SEP 2026",
      coords: "20.6597° N, 103.3496° W",
      titulo: "Inteligencia Geoespacial aplicada a la actualización masiva de padrones municipales",
      resumen:
        "Mediante portales ejecutivos hechos a la medida, logramos detectar variaciones constructivas con 99.2% de exactitud sin inspecciones invasivas.",
      imagen: "/assets/img/01_LANDING_SIGSA/catastro.webp",
      ctaText: "Conocer SERVERBOX",
      link: "/serverbox",
      isExternal: false,
      lectura: "CASO DE ÉXITO",
    },
    {
      id: "03",
      categoria: "PROYECTO MÉXICO®",
      fecha: "AGO 2026",
      coords: "25.6866° N, 100.3161° W",
      titulo: "Todas las ciudades de la republica mexicana a escala 1:5,000",
      resumen:
        "Nuestra base cartográfica propia alcanza un nuevo hito de cobertura tridimensional, habilitando planeación logística, telecomunicaciones 5G y análisis de riesgo con precisión milimétrica.",
      imagen: "/assets/img/01_LANDING_SIGSA/noticias_PROMEX_2.webp",
      ctaText: "Ir a Proyecto México®",
      link: "/proyecto-mexico",
      isExternal: false,
      lectura: "COBERTURA NACIONAL",
    },
    {
      id: "04",
      categoria: "POST DESTACADOS",
      fecha: "OCT 2026",
      coords: "19.3621° N, 99.1764° W",
      titulo: "¿Sabes exactamente dónde estan todos tus activos?",
      resumen:
        "Tener identificado un activo es importante. Los sistemas de Información Geográfica permiten organizar y visualizar tus activos sobre el territorio para facilitar su consulta, análisis y gestión.",
      imagen: "/assets/img/01_LANDING_SIGSA/redes y noticias_2.webp",
      ctaText: "Ver cobertura en LinkedIn",
      link: "https://www.linkedin.com/company/sistemas-de-informacion-geografica/",
      isExternal: true,
      lectura: "EVENTO OFICIAL",
    },
  ];

  const socialFeed = [
    {
      red: "LinkedIn",
      handle: "SIGSA | sistemas de informacion geográfica",
      tiempo: "Hace 2 días",
      texto:
        "Descubre cómo la integración de nubes de puntos LiDAR y modelos 3D está optimizando la supervisión de grandes obras de infraestructura en México. #Geotecnología #SmartTwin #SIGSA",
      url: "https://www.linkedin.com/company/sistemas-de-informacion-geografica/",
      color: "text-[#0A66C2]",
    },
    {
      red: "YouTube",
      handle: "SIGSA | sistemas de informacion geográfica",
      tiempo: "Hace 5 días",
      texto:
        "NUEVO VIDEO: Recorrido virtual por nuestro ecosistema SERVERBOX y cómo transforma la recaudación predial municipal en tiempo récord.",
      url: "https://www.youtube.com",
      color: "text-red-500",
    },
    {
      red: "Facebook",
      handle: "SIGSA | sistemas de informacion geográfica",
      tiempo: "Hace 1 semana",
      texto:
        "45 años capturando la realidad al milímetro. Así se ve el procesamiento de Percepción Remota desde nuestro centro de operaciones.",
      url: "https://www.facebook.com/people/SIGSA-Sistemas-de-Informaci%C3%B3n-Geogr%C3%A1fica-SA-de-CV/61577805703966/?locale=es_LA",
      color: "text-pink-500",
    },
  ];

  const socialChannels = [
    {
      name: "LinkedIn",
      role: "Artículos B2B & Casos",
      url: "https://www.linkedin.com/company/sistemas-de-informacion-geografica/",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
      hoverClass: "hover:border-[#00ffff] hover:bg-[#0B3D91] hover:text-white",
    },
    {
      name: "YouTube",
      role: "Demos & Webinars",
      url: "https://www.youtube.com/@SIGSA-SistemasdeInformaci%C3%B3nGeo",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      hoverClass: "hover:border-[#00ffff] hover:bg-[#0B3D91] hover:text-white",
    },
    {
      name: "Facebook",
      role: "Cultura,Tecnología & Noticias",
      url: "https://www.facebook.com/people/SIGSA-Sistemas-de-Informaci%C3%B3n-Geogr%C3%A1fica-SA-de-CV/61577805703966/?locale=es_LA",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
        </svg>
      ),
      hoverClass: "hover:border-[#00ffff] hover:bg-[#0B3D91] hover:text-white",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSocialPost((prev) => (prev + 1) % socialFeed.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [socialFeed.length]);

  return (
    <section
      id="noticias"
      className="py-12 lg:py-14 px-4 sm:px-6 md:px-12 bg-slate-50 relative z-10 overflow-hidden border-t border-slate-200 flex flex-col justify-center"
    >
      {/* Retícula técnica de fondo sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(11,61,145,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(11,61,145,0.025)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#0B3D91]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-20">
        {/* ENCABEZADO COMPACTO (Sin botón "Ver todas") */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 lg:mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0B3D91]/5 border border-[#0B3D91]/10 rounded-full mb-3">
              <Newspaper className="w-3.5 h-3.5 text-[#0B3D91]" />
              <span className="font-sans font-bold text-[#0B3D91] tracking-[0.2em] uppercase text-[11px]">
               noticias y redes
              </span>
            </div>
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tighter uppercase leading-[1.05]">
              conoce todo lo nuevo y <span className="text-[#0B3D91]"> Dale SIG</span>
            </h2>
          </div>

          <p className="font-sans text-slate-500 text-xs sm:text-sm max-w-md leading-relaxed md:text-right">
            Explora nuestras ultimas actualizaciones tecnológicas, casos destacados, publicaciones y actividad en tiempo real.
          </p>
        </div>

        {/* PARTE 1: KINETIC ACCORDION DECK (Altura optimizada para caber junto con redes en 1 pantalla) */}
        <div className="flex flex-col lg:flex-row gap-3.5 h-auto lg:h-[370px] w-full mb-5">
          {noticias.map((item, idx) => {
            const isExpanded = activeCard === idx;

            return (
              <motion.article
                key={item.id}
                layout
                onClick={() => setActiveCard(idx)}
                onMouseEnter={() => setActiveCard(idx)}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                className={`relative rounded-[1.75rem] overflow-hidden cursor-pointer border transition-colors duration-500 flex flex-col justify-between ${
                  isExpanded
                    ? "lg:flex-[2.8] min-h-[360px] sm:min-h-[380px] lg:min-h-full border-[#00ffff]/60 shadow-2xl shadow-[#0B3D91]/20 bg-slate-900"
                    : "lg:flex-[1] min-h-[100px] lg:min-h-full border-slate-200/80 bg-slate-900/95 hover:border-[#00ffff]/40 group"
                }`}
              >
                {/* IMAGEN DE FONDO */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={item.imagen}
                    alt={item.titulo}
                    fill
                    className={`object-cover transition-all duration-1000 ease-out ${
                      isExpanded
                        ? "scale-100 opacity-55 grayscale-0"
                        : "scale-110 opacity-25 grayscale group-hover:opacity-35"
                    }`}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isExpanded
                        ? "bg-gradient-to-t from-slate-950 via-[#0B3D91]/75 to-slate-900/30 opacity-95"
                        : "bg-gradient-to-t from-slate-950 via-slate-900/85 to-[#0B3D91]/60 opacity-95"
                    }`}
                  />
                  {isExpanded && (
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                  )}
                </div>

                {/* BARRA SUPERIOR DE LA TARJETA */}
                <div className="relative z-20 p-5 sm:p-6 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`font-poppins font-bold text-sm sm:text-base px-3 py-1 rounded-xl border transition-all duration-300 ${
                        isExpanded
                          ? "bg-[#00ffff] text-[#0B3D91] border-[#00ffff] shadow-lg shadow-[#00ffff]/20"
                          : "bg-white/10 text-white/80 border-white/15 group-hover:border-[#00ffff]/50 group-hover:text-[#00ffff]"
                      }`}
                    >
                      {item.id}
                    </span>

                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.08 }}
                        className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-sans font-bold text-[10px] text-[#00ffff] tracking-widest uppercase"
                      >
                        {item.categoria}
                      </motion.span>
                    )}
                  </div>

                  {isExpanded ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-950/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/70"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ffff] animate-ping" />
                      <span>{item.coords}</span>
                    </motion.div>
                  ) : (
                    <span className="font-sans font-bold text-[9px] tracking-widest uppercase text-white/50">
                      {item.fecha}
                    </span>
                  )}
                </div>

                {/* CONTENIDO INFERIOR (Horizontal y al derecho tanto expandido como contraído) */}
                <div className="relative z-20 p-5 sm:p-6 pt-0 flex flex-col justify-end flex-1">
                  {isExpanded ? (
                    <motion.div
                      key={`expanded-${item.id}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.1 }}
                      className="max-w-2xl"
                    >
                      <div className="flex items-center gap-2.5 text-white/60 font-sans text-[11px] tracking-widest uppercase mb-2">
                        <span>{item.fecha}</span>
                        <span>•</span>
                        <span className="text-[#00ffff] font-bold">{item.lectura}</span>
                      </div>

                      <h3 className="font-poppins font-bold text-xl sm:text-2xl lg:text-[26px] text-white leading-[1.2] tracking-tight mb-2.5">
                        {item.titulo}
                      </h3>

                      <p className="font-sans font-normal text-white/80 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-2 sm:line-clamp-3">
                        {item.resumen}
                      </p>

                      <div className="flex items-center justify-between gap-4 pt-3.5 border-t border-white/15">
                        {item.isExternal ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 bg-[#00ffff] text-[#0B3D91] px-5 py-2.5 rounded-full font-sans font-extrabold text-xs tracking-widest uppercase hover:bg-white transition-all shadow-lg shadow-[#00ffff]/20 group/btn"
                          >
                            {item.ctaText}
                            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </a>
                        ) : (
                          <Link
                            href={item.link}
                            className="inline-flex items-center gap-2.5 bg-[#00ffff] text-[#0B3D91] px-5 py-2.5 rounded-full font-sans font-extrabold text-xs tracking-widest uppercase hover:bg-white transition-all shadow-lg shadow-[#00ffff]/20 group/btn"
                          >
                            {item.ctaText}
                            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </Link>
                        )}

                        <span className="text-[10px] font-sans text-white/50 hidden sm:inline-block">
                          SIGSA Press Room®
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col justify-end w-full h-full">
                      <span className="font-sans font-bold text-[10px] tracking-[0.2em] uppercase text-[#00ffff] mb-2 block">
                        {item.categoria}
                      </span>
                      <h4 className="font-poppins font-bold text-sm sm:text-base text-white/90 group-hover:text-white leading-snug line-clamp-2 lg:line-clamp-3 mb-3 transition-colors">
                        {item.titulo}
                      </h4>
                      <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-sans font-bold text-white/50 group-hover:text-[#00ffff] transition-colors pt-2 border-t border-white/10">
                        <span>Explorar nota</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* PARTE 2: SOCIAL PULSE & LIVE ECOSYSTEM BAR (3 REDES: LINKEDIN, YOUTUBE, INSTAGRAM) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[1.75rem] p-4 sm:p-6 border border-slate-200/80 shadow-xl shadow-slate-200/50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Columna Izquierda: Live Social Feed Ticker */}
            <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffff] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0B3D91]"></span>
                  </span>
                  <span className="font-sans font-extrabold text-[11px] tracking-[0.2em] uppercase text-[#0B3D91]">
                    SIGSA Social Live
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {socialFeed.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSocialPost(i)}
                      aria-label={`Ver publicación social ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        activeSocialPost === i
                          ? "w-5 bg-[#0B3D91]"
                          : "w-1.5 bg-slate-200 hover:bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="min-h-[68px] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSocialPost}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex items-center gap-2 text-[11px] font-sans mb-1">
                      <span className={`font-bold ${socialFeed[activeSocialPost].color}`}>
                        {socialFeed[activeSocialPost].red}
                      </span>
                      <span className="text-slate-400">{socialFeed[activeSocialPost].handle}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-400">{socialFeed[activeSocialPost].tiempo}</span>
                    </div>
                    <p className="font-sans text-slate-700 text-xs sm:text-sm leading-snug line-clamp-2">
                      “{socialFeed[activeSocialPost].texto}”
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Columna Derecha: 3 Canales Oficiales (LinkedIn, YouTube, Instagram) */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-3">
                <span className="font-poppins font-bold text-xs sm:text-sm text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#0B3D91]" /> Conecta con nuestro ecosistema digital
                </span>
                <span className="text-[11px] font-sans text-slate-400 hidden sm:inline">
                  Canales Oficiales
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {socialChannels.map((channel, i) => (
                  <a
                    key={i}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 transition-all duration-300 flex items-center gap-3.5 ${channel.hoverClass}`}
                  >
                    <div className="p-2.5 rounded-xl bg-white text-[#0B3D91] shadow-sm group-hover:bg-[#00ffff] group-hover:text-[#0B3D91] transition-colors shrink-0">
                      {channel.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-poppins font-bold text-sm text-slate-900 group-hover:text-white transition-colors">
                          {channel.name}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#00ffff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                      </div>
                      <span className="block font-sans text-[11px] text-slate-500 group-hover:text-white/80 transition-colors truncate">
                        {channel.role}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================
// 7. CAPTURA DE LEADS (LAYOUT GRID FIJO + CITA OPCIONAL)
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

const InboundLeadCapture = () => {
  // Estado para saber si el usuario quiere agendar fecha/hora (Opcional)
  const [wantsAppointment, setWantsAppointment] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonthDate, setCurrentMonthDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  // Estados del formulario (100% sincronizados con HubSpot)
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
    setSelectedThemes([]);
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
        // Mostramos el detalle real que devuelve HubSpot sin disparar el overlay de Next.js
        const errorDetail =
          result?.details?.errors?.[0]?.message ||
          result?.details?.message ||
          result?.error ||
          "Error desconocido en HubSpot";
        console.warn("Respuesta de error de HubSpot:", result);
        alert(`No se pudo enviar: ${errorDetail}`);
      }
    } catch (error) {
      console.warn("Error de conexión:", error);
      alert("Hubo un problema temporal de conexión. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCountry = countries.find((c) => c.code === countryCode);

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-white relative z-10 overflow-hidden border-t border-slate-200">
      {/* Luces de fondo tecnológicas */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#0B3D91]/5 rounded-full blur-[80px] pointer-events-none -translate-x-1/4 translate-y-1/3" />

      <div className="max-w-6xl mx-auto relative z-20">
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl shadow-slate-200/70 border border-slate-100 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* ========================================================= */}
          {/* COLUMNA IZQUIERDA (5 de 12 columnas en PC)                */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden min-w-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(11,61,145,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(11,61,145,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0B3D91]/5 border border-[#0B3D91]/10 rounded-full mb-5 w-max max-w-full">
                <Activity className="w-4 h-4 text-[#0B3D91] shrink-0" />
                <span className="font-sans font-bold text-[#0B3D91] tracking-[0.18em] uppercase text-[11px] truncate">
                  Acceso Exclusivo
                </span>
              </div>

              <h2 className="font-poppins font-bold text-2xl sm:text-3xl xl:text-4xl text-slate-900 tracking-tight mb-4 leading-[1.15]">
                Descubre el potencial de tus datos con una{" "}
                <span className="text-[#0B3D91]">Demo Personalizada.</span>
              </h2>

              <p className="font-sans font-normal text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Comprueba cómo nuestros productos y servicios pueden transformar la toma de decisiones en tu organización. Déjanos tus datos o agenda directamente el horario que mejor te funcione.
              </p>

              <ul className="space-y-4 font-sans font-normal text-slate-700">
                <li className="flex items-start gap-3.5">
                  <div className="bg-[#0B3D91]/10 p-2 rounded-xl shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-[#0B3D91]" />
                  </div>
                  <div className="min-w-0">
                    <strong className="block text-slate-900 font-poppins font-bold text-sm mb-0.5">
                      Casos de Uso Reales
                    </strong>
                    <span className="text-slate-600 text-xs sm:text-sm leading-snug block">
                      Ejemplos y flujos de trabajo específicos adaptados a los retos de tu industria.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <div className="bg-[#0B3D91]/10 p-2 rounded-xl shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-[#0B3D91]" />
                  </div>
                  <div className="min-w-0">
                    <strong className="block text-slate-900 font-poppins font-bold text-sm mb-0.5">
                      Visualización 3D Avanzada
                    </strong>
                    <span className="text-slate-600 text-xs sm:text-sm leading-snug block">
                      Explora entornos tridimensionales e integraciones cartográficas en tiempo real.
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
                    className="mt-6 p-3.5 rounded-2xl bg-[#0B3D91]/5 border border-[#0B3D91]/15 flex items-center gap-3"
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
          {/* COLUMNA DERECHA (7 de 12 columnas en PC)                  */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 bg-slate-50/80 p-6 sm:p-8 md:p-10 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-center min-w-0 overflow-hidden">
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
                  <h3 className="font-poppins font-bold text-2xl text-slate-900 mb-2">
                    {wantsAppointment ? "¡Cita y Solicitud Recibidas!" : "¡Solicitud Recibida!"}
                  </h3>
                  <p className="font-sans font-normal text-slate-600 text-sm sm:text-base leading-relaxed px-4 max-w-md">
                    Nuestro equipo evaluará tu información y nos pondremos en contacto a tu correo corporativo para{" "}
                    {wantsAppointment
                      ? "confirmar la invitación de tu sesión."
                      : "coordinar los detalles de tu demo."}
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
                  <h3 className="font-poppins font-bold text-xl sm:text-2xl text-slate-900 mb-1">
                    Solicitar Demostración
                  </h3>
                  <p className="font-sans font-normal text-slate-500 text-xs sm:text-sm mb-5">
                    Completa tus datos y un especialista te contactará.
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
                          className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800"
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
                          className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800"
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
                          className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800"
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
                          className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800"
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
                          className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800"
                        />
                      </div>

                      <div className="min-w-0">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Teléfono <span className="text-red-500">*</span>
                        </label>
                        {/* Caja contenedora unificada de país + teléfono */}
                        <div className="relative flex items-center w-full bg-white border border-slate-200 rounded-xl focus-within:border-[#0B3D91] focus-within:ring-2 focus-within:ring-[#0B3D91]/20 transition-all">
                          <button
                            type="button"
                            onClick={() => setShowDropdown(!showDropdown)}
                            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
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
                            className="w-full min-w-0 pl-3.5 pr-3 py-2.5 bg-transparent rounded-r-xl outline-none text-sm text-slate-800"
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
                          Comentarios Adicionales <span className="text-slate-400 font-normal">(Opcional)</span>
                        </label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Cuéntanos brevemente sobre tu proyecto..."
                          className="w-full min-w-0 flex-1 min-h-[76px] px-3.5 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 transition-all text-xs text-slate-800 resize-none"
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

                        {/* Toggle Switch Visual */}
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

                      {/* PANEL ACORDEÓN DEL CALENDARIO (SOLO SI ACTIVA EL SWITCH) */}
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
                          Acepto recibir comunicaciones, noticias y ofertas exclusivas de SIGSA.{" "}
                          <span className="text-red-500">*</span>
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
                          Acepto el almacenamiento y manejo de mis datos personales de acuerdo con las políticas vigentes.{" "}
                          <span className="text-red-500">*</span>
                        </span>
                      </label>
                    </div>

                    {/* Botón Submit Dinámico y Texto Legal con mayor separación */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting || !isFormComplete}
                        className="w-full bg-[#0B3D91] text-white font-bold tracking-widest uppercase text-xs sm:text-sm py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#00ffff] hover:text-[#0B3D91] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#0B3D91]/20 group cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Procesando...
                          </>
                        ) : wantsAppointment ? (
                          <>
                            Confirmar Cita y Demo{" "}
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        ) : (
                          <>
                            Solicitar Demo{" "}
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-[10px] text-slate-400 mt-5 pt-1 leading-relaxed px-4">
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
// 8. CARRUSEL DE PARTNERS (Al final, pegado al Footer)
// ==========================================
const PartnersCarousel = () => {
  const partnersLogos = [
    "/assets/img/01_LANDING_SIGSA/Clientes y Partners/partner_4.webp",
    "/assets/img/01_LANDING_SIGSA/Clientes y Partners/partner_5.webp",
    "/assets/img/01_LANDING_SIGSA/Clientes y Partners/partner_6.webp",
    "/assets/img/01_LANDING_SIGSA/Clientes y Partners/partner_7.webp",
    "/assets/img/01_LANDING_SIGSA/Clientes y Partners/partner_2.webp",
    "/assets/img/01_LANDING_SIGSA/Clientes y Partners/partner_8.webp",
  ];

  const multipliedLogos = Array(4).fill(partnersLogos).flat();

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200 overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-8 mb-8">
        <p className="font-sans font-bold text-xs text-center text-slate-400 tracking-[0.25em] uppercase">
          Nuestros Partners Estratégicos
        </p>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-slate-50 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-slate-50 to-transparent z-20 pointer-events-none" />

      <div className="flex w-full overflow-hidden relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex w-max items-center"
        >
          {multipliedLogos.map((logo, idx) => (
            <div
              key={idx}
              className="relative w-40 h-20 mx-8 flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image src={logo} alt={`Partner ${idx}`} fill className="object-contain" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================
// MAIN ASSEMBLY (ORDEN ACTUALIZADO)
// ==========================================
export default function SIGSALanding() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#00ffff] selection:text-[#0B3D91] overflow-x-hidden relative font-sans font-normal">
      <LightShaderCanvas />

      <main>
        <HeroVideo />
        <QuienesSomos />
        <VideoGalleryBento />
        <CasosDeExito />
        <NoticiasSigsa />
        <InboundLeadCapture />
        <PartnersCarousel />
      </main>
    </div>
  );
}