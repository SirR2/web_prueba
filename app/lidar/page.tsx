"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scan,
  Layers,
  Mountain,
  Target,
  Zap,
  Building2,
  TreePine,
  Waves,
  CheckCircle,
  CheckCircle2,
  X,
  Send,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Calendar as CalendarIcon,
  Clock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ============================================================================
// 0. CONFIGURACIÓN DE RUTAS Y PALETA LASER EMERALD-MATRIX
// ============================================================================
const SMART_TWIN_ECOSYSTEM_URL = "/proyecto-mexico#lidar";
const LASER_MAIN = "#00E5A3"; // Laser Emerald brillante
const LASER_LIGHT = "#6EE7B7"; // Destellos suaves sobre fondo oscuro
const LASER_DARK = "#059669"; // Contraste limpio sobre fondo blanco

interface StreamLine {
  id: number;
  left: number;
  delay: number;
  duration: number;
  height: number;
  opacity: number;
}

// ============================================================================
// 1. BOTÓN INFERIOR FLOTANTE INTELIGENTE (LASER EMERALD)
// ============================================================================
const FloatingBackToEcosystem = () => {
  const [isCompact, setIsCompact] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 200 && currentScrollY > lastScrollY) {
        setIsCompact(true);
      } else if (currentScrollY < lastScrollY - 15 || currentScrollY <= 200) {
        setIsCompact(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showFullLabel = !isCompact || isHovered;

  return (
    <div className="fixed bottom-5 left-5 md:bottom-8 md:left-8 z-40 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="pointer-events-auto"
      >
        <Link
          href="/proyecto-mexico"
          aria-label="Volver al Ecosistema Proyecto México"
          style={{
            backgroundColor: isHovered
              ? "rgba(10, 37, 64, 0.98)"
              : "rgba(10, 37, 64, 0.88)",
            borderColor: isHovered ? LASER_MAIN : "rgba(0, 229, 163, 0.4)",
            boxShadow: isHovered
              ? "0 10px 30px rgba(0, 229, 163, 0.3)"
              : "0 10px 30px rgba(5, 11, 20, 0.35)",
          }}
          className="group flex items-center backdrop-blur-xl border rounded-full p-1.5 transition-all duration-300"
        >
          <div
            style={{
              backgroundColor: isHovered ? LASER_MAIN : "rgba(0, 229, 163, 0.15)",
              color: isHovered ? "#050B14" : LASER_MAIN,
            }}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
          </div>

          <motion.div
            initial={false}
            animate={{
              width: showFullLabel ? "auto" : 0,
              opacity: showFullLabel ? 1 : 0,
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden whitespace-nowrap"
          >
            <span
              style={{
                color: isHovered ? LASER_MAIN : "rgba(255, 255, 255, 0.95)",
              }}
              className="font-poppinsoppins font-bold text-[11px] md:text-xs uppercase tracking-[0.16em] pl-3 pr-4 block transition-colors duration-300"
            >
              Volver a Proyecto México
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

// ============================================================================
// 2. FONDO AMBIENTAL: LÍNEAS DE DATOS VERTICALES (LASER EMERALD)
// ============================================================================
const VerticalDataStreams = () => {
  const [lines, setLines] = useState<StreamLine[]>([]);

  useEffect(() => {
    const generatedLines = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 10,
      height: Math.random() * 250 + 100,
      opacity: Math.random() * 0.15 + 0.1,
    }));
    setLines(generatedLines);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(10,37,64,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(10,37,64,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />

      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute w-[1px]"
          style={{
            left: `${line.left}%`,
            height: `${line.height}px`,
            opacity: line.opacity,
            backgroundImage: `linear-gradient(to bottom, transparent, #0A2540, ${LASER_MAIN})`,
          }}
          initial={{ top: "-30%" }}
          animate={{ top: "130%" }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            delay: line.delay,
            ease: "linear",
          }}
        >
          <div
            style={{
              backgroundColor: LASER_MAIN,
              boxShadow: `0 0 8px 1px ${LASER_MAIN}`,
            }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-[10px] rounded-full"
          />
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// 3. SECCIÓN HERO (HOMOLOGADA CON EL ECOSISTEMA + VIDEO DE FONDO)
// ============================================================================
const HeroLidar = () => {
  return (
    <section className="relative w-full min-h-[85dvh] md:min-h-[800px] flex items-center justify-center overflow-hidden bg-[#050B14] pt-24 pb-12">
      <div className="absolute inset-0 z-0">
        <video
          src="/assets/img/08_Landing_Lidar/lidar_aereo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
        />

        <div
          className="absolute inset-0 opacity-25 z-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(${LASER_MAIN} 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 45%, #000 20%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 45%, #000 20%, transparent 100%)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#050B14]/90 via-[#0A2540]/80 to-[#F8FAFC] z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 w-full text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div
            style={{
              color: LASER_MAIN,
              borderColor: "rgba(0, 229, 163, 0.35)",
              boxShadow: "0 0 30px rgba(0, 229, 163, 0.18)",
            }}
            className="w-16 h-16 md:w-20 md:h-20 bg-white/5 backdrop-blur-md border rounded-2xl flex items-center justify-center mx-auto mb-8"
          >
            <Scan size={32} strokeWidth={1.5} />
          </div>

          <span
            style={{ color: LASER_MAIN }}
            className="font-poppinsoppins font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-4 md:mb-6 block text-xs md:text-sm"
          >
            Tecnología de Percepción Activa
          </span>

          <h1 className="font-poppinsoppins font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white leading-[1.1] mb-6 md:mb-8 uppercase tracking-tight">
            Sistemas <br className="hidden md:block" />
            <span
              style={{
                backgroundImage: `linear-gradient(90deg, ${LASER_MAIN} 0%, ${LASER_LIGHT} 55%, #D1FAE5 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              LiDAR 3D
            </span>
          </h1>

          <h2 className="font-poppinsunito text-white/90 text-lg sm:text-xl md:text-2xl mb-6 max-w-4xl mx-auto">
            Levantamientos topográficos y batimétricos de ultra alta precisión
            para Gemelos Digitales.
          </h2>

          <p className="font-poppinsunito text-white/60 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            Capturamos la realidad física en millones de coordenadas
            tridimensionales por segundo, atravesando densas capas de vegetación
            y cuerpos de agua para revelar la verdadera geometría del terreno.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================================================
// 4. SECCIÓN: BENTO GRID TÉCNICO (TEXTOS Y CONTENEDORES AJUSTADOS EN MÓVIL)
// ============================================================================
const LidarBentoFeatures = ({
  onPreviewImage,
}: {
  onPreviewImage: (src: string, title: string) => void;
}) => {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 md:px-8 relative z-10 border-b border-slate-200/40 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 mb-4">
              <span
                style={{ backgroundColor: LASER_MAIN }}
                className="w-2 h-2 rounded-full"
              />
              <span
                style={{ color: LASER_DARK }}
                className="font-poppinsoppins font-bold tracking-[0.2em] uppercase text-xs"
              >
                Capacidades Core LiDAR
              </span>
            </div>

            <h2 className="font-poppinsoppins font-bold text-3xl md:text-5xl text-slate-900 tracking-tight leading-[1.2] max-w-3xl mx-auto mb-4">
              Precisión Láser que{" "}
              <span style={{ color: LASER_DARK }}>Atraviesa Barreras</span>
            </h2>
            <p className="font-poppinsunito text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
              A diferencia de la fotogrametría tradicional, nuestros pulsos
              láser multirretorno penetran el follaje para entregar modelos
              exactos de la superficie terrestre y de las estructuras.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* Card 1: Filtrado de Vegetación */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(10,37,64,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,229,163,0.16)] transition-all duration-500 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div
                  style={{
                    backgroundColor: "rgba(0, 229, 163, 0.12)",
                    color: LASER_DARK,
                  }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-[#0A2540] group-hover:text-[#00E5A3] transition-colors duration-500 shrink-0"
                >
                  <TreePine className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-poppinsoppins font-bold uppercase tracking-wider sm:tracking-widest px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-right">
                  Múltiples Retornos
                </span>
              </div>

              <h3 className="font-poppinsoppins font-bold text-xl sm:text-2xl text-slate-900 mb-3">
                Filtrado Algorítmico de Vegetación
              </h3>
              <p className="font-poppinsunito text-sm sm:text-base text-slate-600 leading-relaxed mb-6 sm:mb-8">
                Clasificación inteligente que separa automáticamente las copas
                de los árboles de la topografía real del suelo, ideal para
                trazado de ductos, carreteras y líneas eléctricas en zonas
                selváticas o boscosas.
              </p>
            </div>

            <div
              onClick={() =>
                onPreviewImage(
                  "/assets/img/08_Landing_Lidar/lidar_veguetal.webp",
                  "Filtrado Algorítmico de Vegetación LiDAR"
                )
              }
              style={{ minHeight: "220px" }}
              className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 cursor-pointer group/img"
            >
              <Image
                src="/assets/img/08_Landing_Lidar/lidar_veguetal.webp"
                alt="Filtrado de Vegetación LiDAR"
                fill
                className="object-cover transition-transform duration-700 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-4">
                <span className="text-white font-poppinsoppins font-bold text-xs uppercase tracking-wider">
                  Ampliar visualización
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Alta Densidad de Puntos */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 bg-[#0A2540] rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-between group"
          >
            <div
              style={{ backgroundColor: "rgba(0, 229, 163, 0.12)" }}
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] pointer-events-none"
            />

            <div className="relative z-10">
              <div
                style={{
                  backgroundColor: "rgba(0, 229, 163, 0.15)",
                  color: LASER_MAIN,
                  borderColor: "rgba(0, 229, 163, 0.3)",
                }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center mb-6"
              >
                <Layers className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              <h3 className="font-poppinsoppins font-bold text-xl sm:text-2xl text-white mb-3">
                Ultra-Alta Densidad de Nube de Puntos
              </h3>
              <p className="font-poppinsunito text-sm sm:text-base text-slate-300 leading-relaxed mb-6 sm:mb-8">
                Capturamos cientos de mediciones láser por metro cuadrado,
                integrando coordenadas georreferenciadas con valores de
                intensidad y color verdadero para gemelos digitales milimétricos.
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-2.5 sm:gap-4 mt-auto">
              <div className="bg-slate-900/90 p-3.5 sm:p-5 rounded-2xl border border-white/10 group-hover:border-[#00E5A3]/50 transition-colors min-w-0 overflow-hidden">
                <span
                  style={{ color: LASER_MAIN }}
                  className="block font-poppinsoppins font-bold text-lg sm:text-2xl mb-1"
                >
                  X, Y, Z
                </span>
                <span className="font-poppinsunito text-[9.5px] sm:text-xs text-slate-400 uppercase tracking-normal sm:tracking-wider block leading-snug break-words">
                  Georreferenciación RTK/PPK
                </span>
              </div>
              <div className="bg-slate-900/90 p-3.5 sm:p-5 rounded-2xl border border-white/10 group-hover:border-[#00E5A3]/50 transition-colors min-w-0 overflow-hidden">
                <span className="block font-poppinsoppins font-bold text-white text-lg sm:text-2xl mb-1">
                  RGB + I
                </span>
                <span className="font-poppinsunito text-[9.5px] sm:text-xs text-slate-400 uppercase tracking-normal sm:tracking-wider block leading-snug break-words">
                  Color + Reflectancia Láser
                </span>
              </div>
              <div className="col-span-2 bg-slate-900/90 p-3.5 sm:p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-2">
                <span className="font-poppinsoppins font-bold text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider">
                  Precisión Vertical Absoluta
                </span>
                <span
                  style={{ color: LASER_MAIN }}
                  className="font-poppinsoppins font-bold text-xs sm:text-sm shrink-0"
                >
                  ± 2 a 5 cm
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Modelado As-Built */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(10,37,64,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,229,163,0.16)] transition-all duration-500 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div
                  style={{
                    backgroundColor: "rgba(0, 229, 163, 0.12)",
                    color: LASER_DARK,
                  }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-[#0A2540] group-hover:text-[#00E5A3] transition-colors duration-500 shrink-0"
                >
                  <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-poppinsoppins font-bold uppercase tracking-wider sm:tracking-widest px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                  Scan-to-BIM
                </span>
              </div>

              <h3 className="font-poppinsoppins font-bold text-xl sm:text-2xl text-slate-900 mb-3">
                Modelado As-Built
              </h3>
              <p className="font-poppinsunito text-sm sm:text-base text-slate-600 leading-relaxed mb-6 sm:mb-8">
                Reconstrucción tridimensional exacta de plantas industriales,
                subestaciones y edificios existentes para ingeniería inversa y
                actualización de planos CAD/BIM.
              </p>
            </div>

            <div
              onClick={() =>
                onPreviewImage(
                  "/assets/img/08_Landing_Lidar/lidar_asbu.webp",
                  "Modelado As-Built Scan-to-BIM"
                )
              }
              style={{ minHeight: "220px" }}
              className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 cursor-pointer group/img"
            >
              <Image
                src="/assets/img/08_Landing_Lidar/lidar_asbu.webp"
                alt="Modelado As-Built LiDAR"
                fill
                className="object-cover transition-transform duration-700 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-4">
                <span className="text-white font-poppinsoppins font-bold text-xs uppercase tracking-wider">
                  Ampliar visualización
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Modelos Digitales de Elevación MDE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-100 shadow-[0_10px_30px_-15px_rgba(10,37,64,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,229,163,0.16)] transition-all duration-500 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-6">
                <div
                  style={{
                    backgroundColor: "rgba(0, 229, 163, 0.12)",
                    color: LASER_DARK,
                  }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-[#0A2540] group-hover:text-[#00E5A3] transition-colors duration-500 shrink-0"
                >
                  <Mountain className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-poppinsoppins font-bold uppercase tracking-wider sm:tracking-widest px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                  MDT + MDS
                </span>
              </div>

              <h3 className="font-poppinsoppins font-bold text-xl sm:text-2xl text-slate-900 mb-3">
                Modelos Digitales de Elevación (MDE)
              </h3>
              <p className="font-poppinsunito text-sm sm:text-base text-slate-600 leading-relaxed mb-6 sm:mb-8">
                Derivamos Modelos Digitales de Terreno (MDT) y de Superficie
                (MDS) con curvas de nivel centimétricas, indispensables para
                simulaciones hidrológicas, prevención de riesgos y cálculo de
                volúmenes.
              </p>
            </div>

            <div
              onClick={() =>
                onPreviewImage(
                  "/assets/img/08_Landing_Lidar/lidar_mde.webp",
                  "Modelos Digitales de Elevación (MDE)"
                )
              }
              style={{ minHeight: "220px" }}
              className="relative w-full h-56 sm:h-64 bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 cursor-pointer group/img"
            >
              <Image
                src="/assets/img/08_Landing_Lidar/lidar_mde.webp"
                alt="Modelos Digitales de Elevación"
                fill
                className="object-cover transition-transform duration-700 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-4">
                <span className="text-white font-poppinsoppins font-bold text-xs uppercase tracking-wider">
                  Ampliar visualización
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 5. SECCIÓN: PLATAFORMAS DE CAPTURA
// ============================================================================
const PlataformasSection = ({
  onOpenModal,
}: {
  onOpenModal: () => void;
}) => {
  const platforms = [
    {
      tag: "Escala Regional & Corredores",
      title: "LiDAR Aéreo",
      desc: "Sensores montados en aeronaves tripuladas y drones (VANT) para cubrir grandes extensiones territoriales, líneas de transmisión, ductos y zonas forestales en tiempo récord.",
      videoSrc: "/assets/img/08_Landing_Lidar/lidar_aereo.mp4",
    },
    {
      tag: "Detalle Milimétrico & Urbano",
      title: "LiDAR Terrestre y Móvil",
      desc: "Escáneres estáticos y sistemas Mobile Mapping sobre vehículos para inventarios viales, fachadas arquitectónicas, túneles e interiores de plantas industriales.",
      videoSrc: "/assets/img/08_Landing_Lidar/lidar_terrestre.mp4",
    },
    {
      tag: "Pulso Láser Verde Subacuático",
      title: "LiDAR Batimétrico",
      desc: "Tecnología de pulso láser verde capaz de penetrar la columna de agua para mapear de forma continua el relieve costero, lechos de ríos, presas y canales.",
      videoSrc: "/assets/img/08_Landing_Lidar/batimetria.mp4",
    },
  ];

  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 md:px-8 bg-[#0A2540] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,163,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,163,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div
        style={{ backgroundColor: "rgba(0, 229, 163, 0.08)" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[130px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span
            style={{ color: LASER_MAIN }}
            className="font-poppinsoppins font-bold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-xs mb-3 block"
          >
            Flexibilidad Operativa Multiescala
          </span>
          <h2 className="font-poppinsoppins font-bold text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
            Plataformas de{" "}
            <span style={{ color: LASER_MAIN }}>Captura Láser</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map((plat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group bg-[#050B14]/80 backdrop-blur-xl rounded-[2.25rem] p-3.5 border border-white/10 hover:border-[#00E5A3]/60 transition-all duration-500 flex flex-col shadow-2xl"
            >
              <div
                style={{ minHeight: "200px" }}
                className="relative w-full aspect-[4/3] rounded-[1.75rem] bg-slate-900 overflow-hidden mb-6 shrink-0 border border-white/5"
              >
                <video
                  src={plat.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent opacity-80" />
                <div className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-full bg-[#050B14]/80 backdrop-blur-md border border-white/10">
                  <span
                    style={{ color: LASER_MAIN }}
                    className="font-poppinsoppins font-bold text-[10px] uppercase tracking-wider"
                  >
                    {plat.tag}
                  </span>
                </div>
              </div>

              <div className="px-4 pb-4 flex flex-col flex-1">
                <h3 className="font-poppinsoppins font-bold text-2xl text-white mb-3 group-hover:text-[#00E5A3] transition-colors">
                  {plat.title}
                </h3>
                <p className="font-poppinsunito text-slate-300 text-sm leading-relaxed mb-6 flex-1">
                  {plat.desc}
                </p>

                <button
                  type="button"
                  onClick={onOpenModal}
                  className="w-full py-3.5 rounded-xl bg-white/5 border border-white/15 text-white font-poppinsoppins font-bold text-xs uppercase tracking-widest hover:bg-[#00E5A3] hover:text-[#050B14] hover:border-[#00E5A3] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Cotizar Levantamiento <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 6. SECCIÓN: CASOS DE USO POR INDUSTRIA (IMÁGENES CON ALTURA BLINDADA + UX MÓVIL)
// ============================================================================
const CasosDeUsoLidar = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isBottomBtnHovered, setIsBottomBtnHovered] = useState(false);

  const useCases = [
    {
      id: "infraestructura",
      shortTitle: "Obra Civil",
      title: "Infraestructura y Obra Civil",
      Icon: Building2,
      desc: "Monitoreo preciso de avances físicos, derecho de vía y control de calidad estructural en megaproyectos.",
      bullets: [
        "Cálculo volumétrico de movimientos de tierra y bancos de material.",
        "Detección de deformaciones milimétricas en túneles, puentes y presas.",
        "Modelos As-Built de alta densidad para integración directa con BIM.",
      ],
      img: "/assets/img/08_Landing_Lidar/01_infra.webp",
    },
    {
      id: "electrico",
      shortTitle: "Eléctrico",
      title: "Sector Eléctrico",
      Icon: Zap,
      desc: "Mantenimiento predictivo y modelado tridimensional de corredores de transmisión de alta tensión.",
      bullets: [
        "Análisis geométrico de catenarias y flechas de conductores.",
        "Identificación crítica de invasión de vegetación en servidumbre de paso.",
        "Digitalización de subestaciones eléctricas para Gemelos Digitales.",
      ],
      img: "/assets/img/08_Landing_Lidar/02_ele.webp",
    },
    {
      id: "ambiental",
      shortTitle: "Forestal",
      title: "Medio Ambiente y Forestal",
      Icon: TreePine,
      desc: "Análisis ecológico y forestal de gran escala gracias a la penetración del pulso láser bajo el dosel.",
      bullets: [
        "Conteo automatizado de individuos arbóreos, altura de dosel y biomasa.",
        "Modelado de cuencas hidrológicas y escorrentías bajo vegetación densa.",
        "Líneas base para estudios de impacto ambiental y captura de carbono.",
      ],
      img: "/assets/img/08_Landing_Lidar/03_fores.webp",
    },
    {
      id: "urbano",
      shortTitle: "Urbano",
      title: "Desarrollo Urbano y Catastro",
      Icon: Target,
      desc: "Cartografía tridimensional base para la modernización catastral y planeación de ciudades inteligentes.",
      bullets: [
        "Generación de Gemelos Digitales urbanos 3D a nivel manzana y predio.",
        "Análisis de línea de vista, riesgos de inundación y asoleamiento.",
        "Detección automatizada de ampliaciones constructivas no declaradas.",
      ],
      img: "/assets/img/08_Landing_Lidar/05_urba.webp",
    },
    {
      id: "batimetria",
      shortTitle: "Batimetría",
      title: "Batimetría y Costas",
      Icon: Waves,
      desc: "Mapeo topográfico continuo entre tierra firme y lechos acuáticos para gestión integral de recursos hídricos.",
      bullets: [
        "Cálculo preciso de volúmenes de dragado y azolve en vasos de presas.",
        "Estudios de erosión, inundabilidad costera y obras portuarias.",
        "Mapeo de canales de navegación someros y riberas de ríos.",
      ],
      img: "/assets/img/08_Landing_Lidar/04_cos.webp",
    },
  ];

  const currentCase = useCases[activeTab];

  const handlePrev = () => {
    setActiveTab((prev) => (prev === 0 ? useCases.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveTab((prev) => (prev === useCases.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-12 md:py-32 px-4 sm:px-6 md:px-8 relative z-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 md:mb-14 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 mb-2 md:mb-4">
            <span
              style={{ backgroundColor: LASER_MAIN }}
              className="w-2 h-2 rounded-full"
            />
            <span
              style={{ color: LASER_DARK }}
              className="font-poppinsoppins font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs"
            >
              Aplicaciones Estratégicas
            </span>
          </div>
          <h2 className="font-poppinsoppins font-bold text-2xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight">
            Casos de Uso{" "}
            <span style={{ color: LASER_DARK }}>por Industria</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-start">
          {/* SELECTOR DE INDUSTRIAS */}
          <div className="lg:col-span-4 order-1 w-full">
            <div className="lg:hidden bg-[#0A2540] p-3 sm:p-4 rounded-2xl border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between mb-2.5 px-1">
                <span className="font-poppinsoppins font-bold text-[10px] uppercase tracking-widest text-slate-300">
                  Sector ({activeTab + 1}/{useCases.length}):
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Sector anterior"
                    className="w-7 h-7 rounded-full bg-white/10 active:bg-[#00E5A3] active:text-[#050B14] text-white flex items-center justify-center transition-colors"
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Siguiente sector"
                    className="w-7 h-7 rounded-full bg-white/10 active:bg-[#00E5A3] active:text-[#050B14] text-white flex items-center justify-center transition-colors"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {useCases.map((item, idx) => {
                  const isSelected = activeTab === idx;
                  const ItemIcon = item.Icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(idx)}
                      style={{
                        backgroundColor: isSelected
                          ? LASER_MAIN
                          : "rgba(255, 255, 255, 0.06)",
                        color: isSelected ? "#050B14" : "#FFFFFF",
                        borderColor: isSelected
                          ? LASER_MAIN
                          : "rgba(255, 255, 255, 0.1)",
                      }}
                      className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border font-poppinsoppins font-bold text-[11px] transition-all duration-200 active:scale-95 min-w-0"
                    >
                      <ItemIcon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.shortTitle}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:flex flex-col gap-3">
              {useCases.map((item, idx) => {
                const isSelected = activeTab === idx;
                const ItemIcon = item.Icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    style={{
                      borderColor: isSelected
                        ? "rgba(0, 229, 163, 0.5)"
                        : "transparent",
                    }}
                    className={`flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 w-full border cursor-pointer ${
                      isSelected
                        ? "bg-[#F8FAFC] shadow-[0_10px_25px_rgba(10,37,64,0.06)]"
                        : "bg-transparent hover:bg-slate-50"
                    }`}
                  >
                    <div
                      style={{
                        backgroundColor: isSelected ? "#0A2540" : "#F1F5F9",
                        color: isSelected ? LASER_MAIN : "#64748B",
                      }}
                      className="p-3 rounded-xl transition-colors duration-300 shrink-0"
                    >
                      <ItemIcon className="w-5 h-5" />
                    </div>
                    <h4
                      className={`font-poppinsoppins font-bold text-base transition-colors duration-300 ${
                        isSelected ? "text-[#0A2540]" : "text-slate-600"
                      }`}
                    >
                      {item.title}
                    </h4>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PANEL DE DETALLE */}
          <div className="lg:col-span-8 order-2 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40"
              >
                <div
                  style={{
                    backgroundImage: `linear-gradient(90deg, #0A2540 0%, ${LASER_MAIN} 100%)`,
                  }}
                  className="h-1.5 md:h-2 w-full"
                />

                <div className="p-4 sm:p-6 md:p-10 flex flex-col md:flex-row gap-5 sm:gap-6 md:gap-8 items-center">
                  <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col justify-center">
                    <span
                      style={{ color: LASER_DARK }}
                      className="font-poppinsoppins font-bold text-[10px] sm:text-[11px] uppercase tracking-widest block mb-1"
                    >
                      Solución Especializada
                    </span>
                    <h3 className="font-poppinsoppins font-bold text-lg sm:text-2xl md:text-3xl text-slate-900 mb-1.5 sm:mb-3 leading-tight">
                      {currentCase.title}
                    </h3>
                    <p className="font-poppinsunito text-slate-600 text-xs sm:text-base leading-relaxed mb-3 sm:mb-5">
                      {currentCase.desc}
                    </p>

                    <ul className="space-y-2 sm:space-y-3.5">
                      {currentCase.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2
                            style={{ color: LASER_DARK }}
                            className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 shrink-0"
                          />
                          <span className="font-poppinsunito text-xs sm:text-sm text-slate-700 leading-snug sm:leading-relaxed">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* IMAGEN CON ALTURA EXPLÍCITA BLINDADA */}
                  <div
                    style={{ minHeight: "190px" }}
                    className="w-full md:w-1/2 order-1 md:order-2 relative h-48 sm:h-64 md:h-[380px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-lg shrink-0"
                  >
                    <Image
                      src={currentCase.img}
                      alt={currentCase.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority
                    />
                    <div className="lg:hidden absolute top-2.5 right-2.5 z-10 px-2.5 py-1 rounded-full bg-[#0A2540]/85 backdrop-blur-md border border-white/15">
                      <span
                        style={{ color: LASER_MAIN }}
                        className="font-poppinsoppins font-bold text-[9px] uppercase tracking-wider"
                      >
                        Sector 0{activeTab + 1} / 0{useCases.length}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* BANNER DE CIERRE EN LA PARTE BAJA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 md:mt-20 relative rounded-3xl bg-[#0A2540] p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 text-center lg:text-left"
        >
          <div
            style={{ backgroundColor: "rgba(0, 229, 163, 0.12)" }}
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
              <Scan size={14} style={{ color: LASER_MAIN }} />
              <span
                style={{ color: LASER_MAIN }}
                className="font-poppinsoppins font-bold text-[10px] uppercase tracking-[0.2em]"
              >
                Evaluación Técnica Sin Costo
              </span>
            </div>
            <h3 className="font-poppinsoppins font-bold text-xl sm:text-3xl text-white mb-2 leading-snug">
              ¿Listo para capturar tu proyecto con precisión milimétrica?
            </h3>
            <p className="font-poppinsunito text-slate-300 text-xs sm:text-base leading-relaxed">
              Nuestros especialistas diseñan el plan de vuelo o escaneo terrestre
              óptimo para entregar tu nube de puntos lista para BIM, GIS y Smart
              Twin®.
            </p>
          </div>

          <div className="relative z-10 w-full sm:w-auto shrink-0">
            <button
              type="button"
              onClick={onOpenModal}
              onMouseEnter={() => setIsBottomBtnHovered(true)}
              onMouseLeave={() => setIsBottomBtnHovered(false)}
              style={{
                backgroundColor: isBottomBtnHovered ? "#FFFFFF" : LASER_MAIN,
                color: "#050B14",
                boxShadow: "0 10px 30px rgba(0, 229, 163, 0.25)",
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-poppinsoppins font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>Agendar Consultoría LiDAR</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================================================
// 7. MODAL DE CONTACTO Y AGENDA LIDAR (BASADO 100% EN PROMEX LEAD CAPTURE + HUBSPOT)
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

const PromexLeadCaptureModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [mounted, setMounted] = useState(false);

  // Estado para saber si el usuario quiere agendar fecha/hora (Opcional)
  const [wantsAppointment, setWantsAppointment] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonthDate, setCurrentMonthDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  if (!mounted) return null;

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

  const isAppointmentValid =
    !wantsAppointment || (Boolean(selectedDate) && Boolean(selectedTime));

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
      alert(
        "Por favor completa todos los campos obligatorios y selecciona al menos un tema de interés."
      );
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

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-end md:items-center justify-center p-0 sm:p-4 md:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md cursor-pointer"
          />

          {/* Contenedor del Modal (Grid de 12 Columnas idéntico a PromexLeadCapture) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-6xl max-h-[92dvh] bg-white rounded-t-[2rem] sm:rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-y-auto custom-scrollbar text-left"
          >
            {/* Botón Cerrar Flotante */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar ventana"
              className="sticky md:absolute top-4 right-4 ml-auto mr-4 mt-4 md:m-0 z-40 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200/80 flex items-center justify-center shadow-sm transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden -mt-10 md:mt-0">
              {/* ========================================================= */}
              {/* COLUMNA IZQUIERDA: TEXTOS Y BENEFICIOS LIDAR (5 COLUMNAS) */}
              {/* ========================================================= */}
              <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 lg:py-12 lg:px-10 flex flex-col justify-center relative overflow-hidden min-w-0 bg-white">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(11,61,145,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(11,61,145,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#0B3D91]/5 border border-[#0B3D91]/10 rounded-full mb-6 w-max max-w-full">
                      <Scan className="w-4 h-4 text-[#0B3D91] shrink-0" />
                      <span className="font-poppinsoppins font-bold text-[#0B3D91] tracking-[0.18em] uppercase text-[11px] truncate">
                        Evaluación Técnica sin costo
                      </span>
                    </div>

                    <h2 className="font-poppinsoppins font-black text-2xl sm:text-3xl xl:text-[2.35rem] text-slate-900 tracking-tight mb-5 leading-[1.12]">
                      ¿Listo para capturar tu proyecto con{" "}
                      <span className="text-[#0B3D91]">precisión milimétrica?</span>
                    </h2>

                    <p className="font-poppinsunito text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                      No tomes decisiones de ingeniería o infraestructura a ciegas.
                      Solicita una consultoría técnica para evaluar el plan de vuelo
                      o escaneo LiDAR óptimo en tu zona de interés y descubre cómo
                      nuestras nubes de puntos eliminan riesgos operativos.
                    </p>
                  </div>

                  <ul className="space-y-6 font-poppinsunito text-slate-700">
                    <li className="flex items-start gap-3.5">
                      <div className="bg-[#0B3D91]/10 p-2 rounded-full shrink-0 mt-0.5">
                        <CheckCircle className="w-5 h-5 text-[#0B3D91]" />
                      </div>
                      <div className="min-w-0">
                        <strong className="block text-slate-900 font-poppinsoppins font-bold text-sm sm:text-base mb-1">
                          Diseño de Plan de Captura Láser
                        </strong>
                        <span className="text-slate-600 text-xs sm:text-sm leading-relaxed block">
                          Definimos la densidad de puntos por m² e instrumentación
                          (Aéreo, Terrestre o Batimétrico) ideal para tu terreno.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3.5">
                      <div className="bg-[#0B3D91]/10 p-2 rounded-full shrink-0 mt-0.5">
                        <CheckCircle className="w-5 h-5 text-[#0B3D91]" />
                      </div>
                      <div className="min-w-0">
                        <strong className="block text-slate-900 font-poppinsoppins font-bold text-sm sm:text-base mb-1">
                          Entregables Listos (LAS / MDT / BIM)
                        </strong>
                        <span className="text-slate-600 text-xs sm:text-sm leading-relaxed block">
                          Conoce la estructura real de nuestras nubes de puntos
                          clasificadas, modelos de elevación y vectores CAD/GIS.
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
                        <div className="font-poppinsunito min-w-0">
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
              <div className="lg:col-span-7 bg-slate-50/70 p-6 sm:p-8 md:p-10 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-center min-w-0 overflow-hidden relative">
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
                      <h3 className="font-poppinsoppins font-black text-2xl text-slate-900 mb-2">
                        {wantsAppointment
                          ? "¡Cita y Solicitud Recibidas!"
                          : "¡Solicitud Recibida!"}
                      </h3>
                      <p className="font-poppinsunito text-slate-600 text-sm sm:text-base leading-relaxed px-4 max-w-md">
                        Un especialista en sistemas LiDAR evaluará los parámetros de
                        tu proyecto y se pondrá en contacto a tu correo corporativo
                        pronto.
                      </p>
                      <div className="flex items-center gap-4 mt-6">
                        <button
                          type="button"
                          onClick={resetAll}
                          className="text-xs font-poppinsoppins font-bold text-[#0B3D91] hover:text-[#059669] transition-colors uppercase tracking-widest cursor-pointer"
                        >
                          Enviar otra solicitud
                        </button>
                        <span className="text-slate-300">•</span>
                        <button
                          type="button"
                          onClick={() => {
                            resetAll();
                            onClose();
                          }}
                          className="text-xs font-poppinsoppins font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-widest cursor-pointer"
                        >
                          Cerrar ventana
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full min-w-0"
                    >
                      {/* LOGO DE PROYECTO MÉXICO CENTRADO */}
                      <div className="flex justify-center mb-4">
                        <Image
                          src="/assets/img/01_LANDING_SIGSA/LOGO_promex.png"
                          alt="Logo Proyecto México"
                          width={200}
                          height={65}
                          className="object-contain drop-shadow-sm h-14 md:h-16 w-auto"
                        />
                      </div>

                      <h3 className="font-poppinsoppins font-black text-xl sm:text-2xl text-slate-900 mb-1">
                        Agendar Consultoría LiDAR
                      </h3>
                      <p className="font-poppinsunito text-slate-500 text-xs sm:text-sm mb-5">
                        Déjanos tus datos y un especialista técnico te contactará.
                      </p>

                      <form
                        onSubmit={handleSubmit}
                        className="space-y-3.5 font-poppinsunito w-full min-w-0"
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
                              placeholder="Ej. Constructora, Gobierno..."
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

                        {/* Fila 4: Temas y Comentarios */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                          <div className="flex flex-col min-w-0">
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Temas de interés (Mín. 1, Máx. 2){" "}
                              <span className="text-red-500">*</span>
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
                              Comentarios Adicionales{" "}
                              <span className="text-slate-400 font-sans font-normal">
                                (Opcional)
                              </span>
                            </label>
                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Indica el municipio, extensión o tipo de levantamiento LiDAR requerido..."
                              className="w-full min-w-0 flex-1 min-h-[76px] px-3.5 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 transition-all text-xs text-slate-800 placeholder-slate-400 resize-none"
                            />
                          </div>
                        </div>

                        {/* SWITCH OPCIONAL: ¿AGENDAR FECHA Y HORA DE UNA VEZ? */}
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
                                      Elige día y hora (Lun - Vie){" "}
                                      <span className="text-red-500">*</span>
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
                                    {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"].map(
                                      (d) => (
                                        <div key={d}>{d}</div>
                                      )
                                    )}
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
                                      const isDisabled =
                                        isWeekend || isPast || isTooFar;
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
                                        Horarios disponibles:{" "}
                                        <span className="text-red-500">*</span>
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

                        {/* Checkboxes Legales */}
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
                              Acepto recibir comunicaciones, noticias y ofertas
                              exclusivas de SIGSA.{" "}
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
                              Acepto el almacenamiento y manejo de mis datos
                              personales de acuerdo con las políticas vigentes.{" "}
                              <span className="text-red-500">*</span>
                            </span>
                          </label>
                        </div>

                        {/* Botón Submit Dinámico */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting || !isFormComplete}
                            className="w-full bg-[#0B3D91] text-white font-poppinsoppins font-bold tracking-widest uppercase text-xs sm:text-sm py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#00E5A3] hover:text-[#050B14] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#0B3D91]/20 group cursor-pointer"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />{" "}
                                Procesando...
                              </>
                            ) : wantsAppointment ? (
                              <>
                                Confirmar Cita y Consultoría{" "}
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </>
                            ) : (
                              <>
                                Solicitar Consultoría LiDAR{" "}
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </button>

                          <p className="text-center font-poppinsunito text-[10px] text-slate-400 mt-4 leading-relaxed px-4">
                            Puedes consultar los términos legales, nuestro aviso de
                            privacidad y la política de uso de datos personales en el
                            pie de página de SIGSA.
                          </p>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// ============================================================================
// 8. COMPONENTE PRINCIPAL DE LA LANDING (SISTEMAS LIDAR)
// ============================================================================
export default function LidarLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    title: string;
  } | null>(null);

  return (
    <div className="relative text-left bg-slate-50 text-slate-900 selection:bg-[#00E5A3]/30 selection:text-[#0A2540] min-h-screen overflow-x-hidden">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&family=Poppins:wght@600;700;900&display=swap");
        .font-poppinsoppins {
          font-family: "Poppins", sans-serif;
        }
        .font-poppinsunito {
          font-family: "Nunito Sans", sans-serif;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>

      <FloatingBackToEcosystem />

      <HeroLidar />

      <div className="relative w-full overflow-hidden bg-white">
        <VerticalDataStreams />
        <div className="relative z-10">
          <LidarBentoFeatures
            onPreviewImage={(src, title) => setLightboxImage({ src, title })}
          />
          <PlataformasSection onOpenModal={() => setIsModalOpen(true)} />
          <CasosDeUsoLidar onOpenModal={() => setIsModalOpen(true)} />
        </div>
      </div>

      {/* Lightbox para ampliar las imágenes técnicas del Bento Grid */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[9999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#0A2540] rounded-3xl overflow-hidden border border-white/15 shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <span className="font-poppinsoppins font-bold text-sm text-white">
                  {lightboxImage.title}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
              <div
                style={{ minHeight: "320px" }}
                className="relative w-full aspect-video bg-slate-950"
              >
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal PromexLeadCapture adaptado para LiDAR */}
      <PromexLeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}