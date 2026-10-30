"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Construction,
  Box,
  CheckCircle2,
  X,
  Send,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  MapPin,
  Database,
} from "lucide-react";
import Link from "next/link";

// ============================================================================
// 0. CONFIGURACIÓN DE RUTAS Y PALETA MAPA MÓVIL
// ============================================================================
const MAPA_MOVIL_HUB_URL = "/mapa-movil";

// Ruta de la imagen de fondo del Hero (puedes cambiarla aquí fácilmente)
const HERO_BG_IMAGE = "/assets/img/05_Landing_mapaMovil/02_infraestructuraCarretera/banner_carretera.jpeg";

const NAVY_DARKEST = "#050B14";
const NAVY_CORP = "#0A2540";
const BLUE_BRAND = "#0B3D91";
const SKY_ACCENT = "#38BDF8";

const countries = [
  { code: "+52", iso: "mx", label: "MX" },
  { code: "+1", iso: "us", label: "US" },
  { code: "+34", iso: "es", label: "ES" },
  { code: "+57", iso: "co", label: "CO" },
  { code: "+54", iso: "ar", label: "AR" },
  { code: "+56", iso: "cl", label: "CL" },
  { code: "+51", iso: "pe", label: "PE" },
];

// ============================================================================
// 1. BOTÓN INFERIOR FLOTANTE (VOLVER A MAPA MÓVIL)
// ============================================================================
const FloatingBackToMapaMovil = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-50"
        >
          <Link
            href={MAPA_MOVIL_HUB_URL}
            style={{
              backgroundColor: NAVY_CORP,
              padding: "12px 20px",
            }}
            className="flex items-center gap-3 text-white border border-slate-700 rounded-full font-poppinsoppins font-bold text-xs uppercase tracking-widest shadow-2xl hover:border-[#38BDF8] hover:text-[#38BDF8] group transition-all duration-300"
          >
            <ArrowLeft
              size={16}
              className="text-[#38BDF8] group-hover:-translate-x-1 transition-transform duration-300"
            />
            <span>Volver a Mapa Móvil</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ============================================================================
// 2. HERO BANNER MÁS ALTO CON IMAGEN DE FONDO
// ============================================================================
const HeroInfraestructuraCarretera = () => {
  return (
    <header
      style={{
        backgroundColor: NAVY_DARKEST,
        minHeight: "88dvh",
      }}
      className="relative w-full flex items-center justify-center overflow-hidden pt-28 pb-24 border-b border-slate-200"
    >
      {/* Imagen de Fondo del Hero Banner */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={HERO_BG_IMAGE}
          alt="Evaluación de Infraestructura Vial con Mapa Móvil"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.38,
            display: "block",
          }}
        />
        <div
          style={{ backgroundColor: "rgba(5, 11, 20, 0.68)" }}
          className="absolute inset-0"
        />
      </div>

      {/* Contenido Centrado Limpio */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 w-full text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div
            style={{
              backgroundColor: "rgba(10, 37, 64, 0.85)",
              borderColor: "rgba(56, 189, 248, 0.45)",
              color: SKY_ACCENT,
              width: "72px",
              height: "72px",
            }}
            className="rounded-2xl border flex items-center justify-center mb-6 shadow-xl"
          >
            <Construction size={34} strokeWidth={1.5} />
          </div>

          <span
            style={{ color: SKY_ACCENT }}
            className="font-poppinsoppins font-bold tracking-[0.25em] uppercase mb-4 block text-xs md:text-sm"
          >
            Mapa Móvil® • Gestión de Activos e Incidencias Viales
          </span>

          <h1 className="font-poppinsoppins font-black text-4xl sm:text-6xl md:text-7xl text-white leading-none mb-6 uppercase tracking-tight">
            Evaluación de <br />
            <span style={{ color: SKY_ACCENT }}>Infraestructura Vial</span>
          </h1>

          <p
            style={{ color: "#E2E8F0" }}
            className="font-poppinsunito text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Diagnóstico geoespacial móvil para auscultación de pavimentos,
            inventario de señalética y supervisión de derechos de vía en tiempo
            real.
          </p>
        </motion.div>
      </div>
    </header>
  );
};

// ============================================================================
// 3. SECCIÓN PRINCIPAL EN FONDO BLANCO: RULETA DE TEXTOS + MEDIA STICKY CENTRADO
// ============================================================================
interface StoryStep {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  desc: string;
  bullets: string[];
  media: string;
  type: "video" | "image";
  fit?: "cover" | "contain";
  telemetry: string;
}

const STORY_STEPS: StoryStep[] = [
  {
    id: "captura",
    badge: "Levantamiento en Ruta",
    title: "Auscultación de",
    highlight: "Daños en Pavimento",
    desc: "Sustituye las bitácoras físicas en papel. Documenta baches, grietas, deformaciones y hundimientos indicando nivel de severidad, carril y cadenamiento kilométrico con fotografías georreferenciadas.",
    bullets: [
      "Formularios adaptados a catálogos de deterioros viales.",
      "Coordenadas GPS de alta exactitud en cada fotografía.",
    ],
    media: "/assets/img/05_Landing_mapaMovil/01_captura.mp4",
    type: "video",
    fit: "cover",
    telemetry: "CAPTURA EN CAMPO • CADENAMIENTO KM 0+000",
  },
  {
    id: "inventario",
    badge: "Activos Carreteros",
    title: "Padrón Físico",
    highlight: "Georreferenciado",
    desc: "Levanta y actualiza el inventario completo a lo largo de toda la red carretera. Audita el estado físico y reflectividad de señalización vertical, barreras de protección, puentes y obras de drenaje.",
    bullets: [
      "Censo continuo de señalética restrictiva, preventiva e informativa.",
      "Historial de mantenimiento por activo para auditorías técnicas.",
    ],
    media: "/assets/img/05_Landing_mapaMovil/02_mapa_carretera.webp",
    type: "image",
    fit: "cover",
    telemetry: "INVENTARIO VIAL • CAPA DE ACTIVOS",
  },
  {
    id: "derechovia",
    badge: "Precisión Topográfica",
    title: "Monitoreo de",
    highlight: "Derechos de Vía",
    desc: "Integra distanciómetros láser y antenas GNSS externas vía Bluetooth para delimitar linderos, detectar invasiones, auditar anuncios espectaculares y supervisar vegetación en bermas y taludes.",
    bullets: [
      "Operación 100% Offline en tramos carreteros sin cobertura celular.",
      "Mediciones submétricas vinculadas directamente al expediente SIG.",
    ],
    media:
      "/assets/img/05_Landing_mapaMovil/02_infraestructuraCarretera/ver_com.jpeg",
    type: "image",
    fit: "cover",
    telemetry: "MODO OFFLINE • GNSS RTK + LÁSER",
  },
  {
    id: "panel",
    badge: "Del Campo al Gabinete",
    title: "Centro de Control",
    highlight: "y Conservación SIG",
    desc: "Todas las incidencias levantadas por las cuadrillas se indexan en tu servidor cartográfico central. Cruza el historial de daños para auditar tramos concesionados y priorizar presupuestos de reencarpetamiento.",
    bullets: [
      "Interoperabilidad nativa con WMS, WFS, Shapefile y GeoJSON.",
      "Validación fotográfica del antes y después de cada reparación.",
    ],
    media:
      "/assets/img/05_Landing_mapaMovil/02_infraestructuraCarretera/infracarretera_panel.mp4",
    type: "video",
    fit: "cover",
    telemetry: "SINCRONIZACIÓN SIG • TIEMPO REAL",
  },
];

const AppCentricScrollSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Detector bidireccional (funciona al hacer scroll hacia abajo y hacia arriba)
  useEffect(() => {
    const handleScroll = () => {
      // Punto central de la pantalla (compensando el Header superior)
      const viewportCenter = window.innerHeight * 0.52;
      let closestIdx = 0;
      let minDistance = Infinity;

      blockRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - elementCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveStep((prev) => (prev !== closestIdx ? closestIdx : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStep = (idx: number) => {
    setActiveStep(idx);
    const el = blockRefs.current[idx];
    if (el) {
      const y =
        el.getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight / 2 +
        el.clientHeight / 2;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const currentStep = STORY_STEPS[activeStep];

  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-8 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de la sección en fondo blanco */}
        <div className="max-w-3xl pt-4 pb-8 lg:pb-12">
          <div
            style={{
              backgroundColor: "#E0F2FE",
              borderColor: "#7DD3FC",
              padding: "6px 16px",
            }}
            className="inline-flex items-center gap-2 rounded-full border mb-4"
          >
            <span
              style={{
                backgroundColor: BLUE_BRAND,
                width: "8px",
                height: "8px",
              }}
              className="rounded-full"
            />
            <span
              style={{ color: NAVY_CORP }}
              className="font-poppinsoppins font-bold tracking-widest uppercase text-xs"
            >
              Recorrido Operativo Interactivo
            </span>
          </div>

          <h2 className="font-poppinsoppins font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            Trazabilidad Vial{" "}
            <span style={{ color: BLUE_BRAND }}>Del Campo al Gabinete</span>
          </h2>
        </div>

        {/* Contenedor de 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          {/* LADO IZQUIERDO: Textos estilo Ruleta */}
          <div
            style={{
              paddingTop: "10vh",
              paddingBottom: "18vh",
            }}
            className="lg:col-span-5 relative z-10"
          >
            {STORY_STEPS.map((step, index) => {
              const isActive = activeStep === index;
              const isPast = index < activeStep;

              return (
                <div
                  key={step.id}
                  ref={(el) => {
                    blockRefs.current[index] = el;
                  }}
                  onClick={() => scrollToStep(index)}
                  style={{ minHeight: "62vh" }}
                  className="flex flex-col justify-center py-10 cursor-pointer"
                >
                  <motion.div
                    animate={{
                      opacity: isActive ? 1 : 0.22,
                      scale: isActive ? 1 : 0.92,
                      y: isActive ? 0 : isPast ? -20 : 20,
                      rotateX: isActive ? 0 : isPast ? 16 : -16,
                    }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    style={{ transformPerspective: 1000 }}
                    className="flex flex-col items-start text-left"
                  >
                    {/* Número e indicador de etapa */}
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        style={{
                          backgroundColor: isActive ? BLUE_BRAND : "#E2E8F0",
                          color: isActive ? "#FFFFFF" : "#64748B",
                          padding: "6px 14px",
                        }}
                        className="font-poppinsoppins font-black text-sm rounded-lg transition-colors duration-300"
                      >
                        0{index + 1}
                      </span>
                      <span
                        style={{ color: BLUE_BRAND }}
                        className="font-poppinsoppins font-bold text-xs uppercase tracking-widest"
                      >
                        {step.badge}
                      </span>
                    </div>

                    {/* Título en negro y azul corporativo */}
                    <h3 className="font-poppinsoppins font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight mb-4">
                      {step.title}{" "}
                      <span style={{ color: BLUE_BRAND }}>
                        {step.highlight}
                      </span>
                    </h3>

                    {/* Descripción */}
                    <p className="font-poppinsunito text-slate-600 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                      {step.desc}
                    </p>

                    {/* Puntos clave */}
                    <ul className="space-y-3 mb-6">
                      {step.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 font-poppinsunito text-slate-700 text-sm sm:text-base font-poppins font-semibold"
                        >
                          <CheckCircle2
                            size={18}
                            style={{ color: BLUE_BRAND }}
                            className="shrink-0 mt-0.5"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Vista Multimedia integrada para Móviles y Tablets (< lg) */}
                    <div
                      style={{
                        height: "250px",
                        backgroundColor:
                          step.fit === "contain" ? "#0D5C9E" : NAVY_DARKEST,
                      }}
                      className="block lg:hidden w-full rounded-2xl overflow-hidden border border-slate-200 shadow-lg relative mt-2"
                    >
                      {step.type === "video" ? (
                        <video
                          src={step.media}
                          autoPlay
                          muted
                          loop
                          playsInline
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      ) : (
                        <img
                          src={step.media}
                          alt={step.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: step.fit || "cover",
                            display: "block",
                          }}
                        />
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* LADO DERECHO: Visor Sticky Centrado Matemáticamente en la Pantalla y debajo del Header */}
          <div
            style={{
              position: "sticky",
              // Centrado exacto en la ventana respetando el Header superior (~80px)
              top: "calc(40vh - 210px)",
              paddingTop: "10vh",
              paddingBottom: "18vh",
            }}
            className="hidden lg:block lg:col-span-7 z-20"
          >
            <div
              style={{
                height: "460px",
                backgroundColor: NAVY_DARKEST,
                borderColor: NAVY_CORP,
                borderWidth: "8px",
              }}
              className="relative w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col justify-between"
            >
              {/* Barra superior del dispositivo con botones de acceso rápido 01-04 */}
              <div
                style={{
                  backgroundColor: "rgba(5, 11, 20, 0.94)",
                  padding: "12px 20px",
                }}
                className="relative z-20 border-b border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    style={{
                      width: "9px",
                      height: "9px",
                      backgroundColor: SKY_ACCENT,
                    }}
                    className="rounded-full animate-pulse shrink-0"
                  />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider truncate">
                    {currentStep.telemetry}
                  </span>
                </div>

                {/* Botones interactivos 01 - 04 */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {STORY_STEPS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => scrollToStep(idx)}
                      style={{
                        backgroundColor:
                          activeStep === idx
                            ? SKY_ACCENT
                            : "rgba(255,255,255,0.08)",
                        color: activeStep === idx ? NAVY_DARKEST : "#94A3B8",
                        padding: "4px 10px",
                      }}
                      className="rounded-md font-poppinsoppins font-bold text-xs transition-all cursor-pointer"
                    >
                      0{idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contenido Multimedia con transición tipo ruleta vertical */}
              <div className="relative flex-1 w-full h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -24, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                      backgroundColor:
                        currentStep.fit === "contain"
                          ? "#0D5C9E"
                          : NAVY_DARKEST,
                    }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                  >
                    {currentStep.type === "video" ? (
                      <video
                        src={currentStep.media}
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      <img
                        src={currentStep.media}
                        alt={currentStep.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: currentStep.fit || "cover",
                          display: "block",
                        }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Barra inferior del visor */}
              <div
                style={{
                  backgroundColor: "rgba(5, 11, 20, 0.94)",
                  padding: "14px 20px",
                }}
                className="relative z-20 border-t border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    style={{
                      backgroundColor: "rgba(56, 189, 248, 0.15)",
                      color: SKY_ACCENT,
                      width: "34px",
                      height: "34px",
                    }}
                    className="rounded-lg flex items-center justify-center shrink-0"
                  >
                    <MapPin size={16} />
                  </div>
                  <p className="font-poppinsoppins font-bold text-white text-xs sm:text-sm truncate">
                    {currentStep.title} {currentStep.highlight}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {STORY_STEPS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => scrollToStep(i)}
                      aria-label={`Ir a etapa ${i + 1}`}
                      style={{
                        width: activeStep === i ? "26px" : "8px",
                        height: "8px",
                        backgroundColor:
                          activeStep === i
                            ? SKY_ACCENT
                            : "rgba(255,255,255,0.25)",
                      }}
                      className="rounded-full transition-all duration-300 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 4. SECCIÓN DE CONTACTO Y CONVERSIÓN REDISEÑADA (ACORDE AL TEMA BLANCO)
// ============================================================================
const CTAConversionSection = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  return (
    <section
      style={{ backgroundColor: "#F8FAFC" }}
      className="py-20 md:py-28 px-6 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div
          style={{
            backgroundColor: NAVY_CORP,
            padding: "40px 28px",
          }}
          className="rounded-3xl border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          {/* Columna Izquierda: Llamado a la acción */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div
              style={{
                backgroundColor: NAVY_DARKEST,
                borderColor: "rgba(56, 189, 248, 0.35)",
                padding: "6px 14px",
              }}
              className="inline-flex items-center gap-2 rounded-lg border mb-5"
            >
              <Database size={15} style={{ color: SKY_ACCENT }} />
              <span
                style={{ color: SKY_ACCENT }}
                className="font-poppinsoppins font-bold text-xs uppercase tracking-widest"
              >
                Diagnóstico Operativo sin Costo
              </span>
            </div>

            <h2 className="font-poppinsoppins font-bold text-2xl sm:text-4xl text-white tracking-tight leading-tight mb-4">
              Moderniza la supervisión y conservación de tu{" "}
              <span style={{ color: SKY_ACCENT }}>red carretera</span>
            </h2>

            <p
              style={{ color: "#CBD5E1" }}
              className="font-poppinsunito text-base sm:text-lg leading-relaxed mb-8 max-w-2xl"
            >
              Agenda una demostración técnica con nuestros especialistas para
              configurar un flujo de inspección adaptado a tus tramos viales,
              catálogo de deterioros y requerimientos de auditoría.
            </p>

            <button
              type="button"
              onClick={onOpenModal}
              onMouseEnter={() => setIsBtnHovered(true)}
              onMouseLeave={() => setIsBtnHovered(false)}
              style={{
                backgroundColor: isBtnHovered ? "#FFFFFF" : SKY_ACCENT,
                color: NAVY_DARKEST,
                padding: "16px 32px",
              }}
              className="rounded-xl font-poppinsoppins font-bold text-xs sm:text-sm uppercase tracking-widest transition-colors duration-300 inline-flex items-center justify-center gap-3 shadow-lg cursor-pointer"
            >
              <span>Agendar Presentación</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Columna Derecha: Resumen de entregables de la sesión */}
          <div
            style={{
              backgroundColor: NAVY_DARKEST,
              borderColor: "rgba(56, 189, 248, 0.25)",
              padding: "24px",
            }}
            className="lg:col-span-5 rounded-2xl border flex flex-col justify-between"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-5">
              <span className="font-poppinsoppins font-bold text-xs uppercase tracking-wider text-white">
                ¿Qué incluye la sesión?
              </span>
              <span
                style={{
                  backgroundColor: "rgba(56, 189, 248, 0.15)",
                  color: SKY_ACCENT,
                  padding: "4px 10px",
                }}
                className="font-mono text-xs font-bold rounded-md"
              >
                DEMO EN VIVO
              </span>
            </div>

            <ul className="space-y-4 font-poppinsunito text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  style={{ color: SKY_ACCENT }}
                  className="shrink-0 mt-0.5"
                />
                <span>
                  Configuración de formularios para deterioros, señalética y
                  cadenamientos de tu red vial.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  style={{ color: SKY_ACCENT }}
                  className="shrink-0 mt-0.5"
                />
                <span>
                  Prueba de levantamiento 100% offline y vinculación con
                  antenas GNSS / distanciómetros.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  style={{ color: SKY_ACCENT }}
                  className="shrink-0 mt-0.5"
                />
                <span>
                  Arquitectura de sincronización directa con tus servidores SIG
                  y tableros de conservación.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 5. MODAL LEAD CAPTURE CORREGIDO PARA MÓVILES Y PC (SIN RECORTES NI OVERFLOW)
// ============================================================================
const MapaMovilLeadCaptureModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const [wantsAppointment, setWantsAppointment] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonthDate, setCurrentMonthDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([
    "Mapa Móvil",
  ]);

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
    "Mapa Móvil",
    "Cartografía",
    "Catastro",
    "Gemelos Digitales",
  ];

  useEffect(() => {
    setMounted(true);
    const checkViewport = () => setIsDesktop(window.innerWidth >= 1024);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setWantsAppointment(false);
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedThemes(["Mapa Móvil"]);
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
      setShowDropdown(false);
      setIsSubmitting(false);
      const resetDate = new Date();
      setCurrentMonthDate(
        new Date(resetDate.getFullYear(), resetDate.getMonth(), 1)
      );
      return;
    }
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

  const isPrevDisabled =
    currentMonthDate.getMonth() === today.getMonth() &&
    currentMonthDate.getFullYear() === today.getFullYear();
  const isNextDisabled =
    currentMonthDate.getMonth() === maxDate.getMonth() &&
    currentMonthDate.getFullYear() === maxDate.getFullYear();

  const handlePrevMonth = () => {
    if (!isPrevDisabled)
      setCurrentMonthDate(
        new Date(
          currentMonthDate.getFullYear(),
          currentMonthDate.getMonth() - 1,
          1
        )
      );
  };
  const handleNextMonth = () => {
    if (!isNextDisabled)
      setCurrentMonthDate(
        new Date(
          currentMonthDate.getFullYear(),
          currentMonthDate.getMonth() + 1,
          1
        )
      );
  };

  const monthYearString = currentMonthDate.toLocaleString("es-MX", {
    month: "long",
    year: "numeric",
  });

  const toggleTheme = (theme: string) => {
    if (selectedThemes.includes(theme))
      setSelectedThemes(selectedThemes.filter((t) => t !== theme));
    else if (selectedThemes.length < 2)
      setSelectedThemes([...selectedThemes, theme]);
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
        "Por favor selecciona un día y horario, o desactiva la opción de agendar cita."
      );
      return;
    }
    if (!isFormComplete) {
      alert("Por favor completa todos los campos obligatorios.");
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
      if (response.ok) setIsSuccess(true);
      else
        alert(
          `No se pudo enviar: ${
            result?.details?.errors?.[0]?.message ||
            result?.error ||
            "Error en HubSpot"
          }`
        );
    } catch (error) {
      alert("Hubo un problema al enviar tu solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCountry = countries.find((c) => c.code === countryCode);
  const inputStyle: React.CSSProperties = {
    padding: "10px 14px",
    backgroundColor: "#FFFFFF",
    boxSizing: "border-box",
    width: "100%",
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          style={{ padding: isDesktop ? "24px" : "12px" }}
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            key="lead-modal-carreteras"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: isDesktop ? "min(94vw, 1140px)" : "100%",
              maxWidth: isDesktop ? "1140px" : "440px",
              maxHeight: isDesktop ? "90vh" : "88dvh",
              display: isDesktop ? "grid" : "flex",
              gridTemplateColumns: isDesktop ? "1.02fr 0.98fr" : "none",
              boxSizing: "border-box",
            }}
            className={`relative z-10 bg-white border border-slate-200 overflow-hidden text-left ${
              isDesktop
                ? "rounded-3xl shadow-2xl"
                : "flex-col rounded-2xl shadow-2xl"
            }`}
          >
            {/* Botón X en PC */}
            {isDesktop && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar ventana"
                style={{
                  top: "20px",
                  right: "20px",
                  width: "40px",
                  height: "40px",
                }}
                className="absolute z-30 rounded-full bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 flex items-center justify-center shadow-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Barra Superior Fija en Móvil */}
            {!isDesktop && (
              <div
                style={{
                  backgroundColor: NAVY_DARKEST,
                  padding: "14px 16px",
                }}
                className="shrink-0 flex items-center justify-between gap-2 text-white z-30 border-b border-slate-800"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin
                    className="w-4 h-4 shrink-0"
                    style={{ color: SKY_ACCENT }}
                  />
                  <span className="font-poppinsoppins font-bold text-xs tracking-wider uppercase truncate text-white">
                    Demo Mapa Móvil® Carreteras
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar formulario"
                  style={{ padding: "5px 12px" }}
                  className="rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center gap-1 text-xs font-bold cursor-pointer shrink-0"
                >
                  <X className="w-3.5 h-3.5" style={{ color: SKY_ACCENT }} />{" "}
                  <span>Cerrar</span>
                </button>
              </div>
            )}

            {/* Columna Izquierda Informativa (Solo PC) */}
            {isDesktop && (
              <div
                style={{
                  padding: "40px",
                  backgroundColor: NAVY_CORP,
                  overflowY: "auto",
                }}
                className="flex flex-col justify-center text-white min-w-0 relative"
              >
                <div className="relative z-10">
                  <div
                    style={{
                      padding: "8px 16px",
                      backgroundColor: NAVY_DARKEST,
                      borderColor: "rgba(56, 189, 248, 0.35)",
                    }}
                    className="inline-flex items-center gap-2 border rounded-full mb-6 w-max max-w-full"
                  >
                    <Box
                      className="w-4 h-4 shrink-0"
                      style={{ color: SKY_ACCENT }}
                    />
                    <span
                      style={{ color: SKY_ACCENT }}
                      className="font-poppinsoppins font-bold tracking-widest uppercase text-xs truncate"
                    >
                      Diagnóstico Operativo Vial
                    </span>
                  </div>

                  <h2 className="font-poppinsoppins font-black text-4xl text-white tracking-tight mb-6 leading-tight">
                    Moderniza tu inspección en campo. <br />
                    <span style={{ color: SKY_ACCENT }}>
                      Datos exactos en ruta.
                    </span>
                  </h2>

                  <p className="font-poppinsunito text-slate-300 text-base xl:text-lg leading-relaxed mb-8">
                    Descubre cómo automatizar el levantamiento de deterioros,
                    señalética y derechos de vía con precisión topográfica.
                    Agenda una sesión con nuestros especialistas.
                  </p>

                  <ul className="space-y-6 font-poppinsunito text-slate-200">
                    <li className="flex items-start gap-4">
                      <div
                        style={{
                          padding: "10px",
                          backgroundColor: "rgba(56, 189, 248, 0.15)",
                        }}
                        className="rounded-full shrink-0 mt-0.5"
                      >
                        <CheckCircle2
                          className="w-5 h-5"
                          style={{ color: SKY_ACCENT }}
                        />
                      </div>
                      <div className="min-w-0">
                        <strong className="block text-white font-bold mb-1">
                          Flujos de Captura Personalizados
                        </strong>
                        <span className="text-slate-300 text-sm leading-relaxed block">
                          Configuramos formularios inteligentes para baches,
                          cadenamientos y activos viales.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div
                        style={{
                          padding: "10px",
                          backgroundColor: "rgba(56, 189, 248, 0.15)",
                        }}
                        className="rounded-full shrink-0 mt-0.5"
                      >
                        <CheckCircle2
                          className="w-5 h-5"
                          style={{ color: SKY_ACCENT }}
                        />
                      </div>
                      <div className="min-w-0">
                        <strong className="block text-white font-bold mb-1">
                          Operación Offline y GNSS
                        </strong>
                        <span className="text-slate-300 text-sm leading-relaxed block">
                          Evaluamos la sincronización directa con tu servidor
                          SIG y captura en tramos sin red.
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
                        style={{
                          padding: "16px",
                          backgroundColor: NAVY_DARKEST,
                        }}
                        className="mt-8 rounded-2xl border border-slate-800 flex items-center gap-3"
                      >
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            backgroundColor: BLUE_BRAND,
                            color: SKY_ACCENT,
                          }}
                          className="rounded-xl flex items-center justify-center shrink-0"
                        >
                          <CalendarIcon size={16} />
                        </div>
                        <div className="font-poppinsunito min-w-0">
                          <p
                            style={{ color: SKY_ACCENT }}
                            className="text-xs font-bold uppercase tracking-wider"
                          >
                            Horario seleccionado
                          </p>
                          <p className="text-sm font-bold text-white capitalize truncate">
                            {selectedDate.toLocaleDateString("es-MX", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                            })}{" "}
                            {selectedTime ? `• ${selectedTime} hrs` : ""}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* CONTENEDOR DEL FORMULARIO: justify-start para que NUNCA corte Nombre y Apellidos en móvil */}
            <div
              style={{
                padding: isDesktop ? "32px 36px" : "20px 16px",
                minHeight: 0,
                overflowY: "auto",
                overflowX: "hidden",
                boxSizing: "border-box",
              }}
              className="flex flex-col justify-start min-w-0 relative bg-slate-50 flex-1 w-full"
            >
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-10 my-auto"
                  >
                    <div
                      style={{ width: "64px", height: "64px" }}
                      className="bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-5"
                    >
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-poppinsoppins font-black text-2xl text-slate-900 mb-2">
                      {wantsAppointment
                        ? "¡Cita y Solicitud Recibidas!"
                        : "¡Solicitud Recibida!"}
                    </h3>
                    <p className="font-poppinsunito text-slate-600 text-sm sm:text-base leading-relaxed px-4 max-w-md">
                      Un especialista se pondrá en contacto a tu correo
                      institucional pronto.
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      style={{
                        backgroundColor: NAVY_CORP,
                        color: "#FFFFFF",
                        padding: "14px 32px",
                      }}
                      className="mt-8 rounded-xl text-xs font-poppinsoppins font-bold hover:opacity-90 transition-all uppercase tracking-widest cursor-pointer"
                    >
                      Cerrar ventana
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full min-w-0 my-auto"
                  >
                    <h3
                      className={`font-poppinsoppins font-black text-slate-900 mb-1 ${
                        isDesktop ? "text-2xl" : "text-lg"
                      }`}
                    >
                      Solicitar Diagnóstico Vial
                    </h3>
                    <p className="font-poppinsunito text-slate-600 text-xs sm:text-sm mb-4">
                      Déjanos tus datos institucionales para coordinar una
                      demostración técnica.
                    </p>

                    <form
                      onSubmit={handleSubmit}
                      className="space-y-3.5 font-poppinsunito w-full min-w-0"
                    >
                      {/* Fila 1: Nombre(s) y Apellidos totalmente visibles */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                        <div className="min-w-0">
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Nombre(s) <span className="text-red-600">*</span>
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Ej. Roberto"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={inputStyle}
                            className="rounded-xl border border-slate-300 focus:border-[#0B3D91] outline-none text-sm text-slate-900"
                          />
                        </div>
                        <div className="min-w-0">
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Apellidos <span className="text-red-600">*</span>
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Ej. Sánchez"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            style={inputStyle}
                            className="rounded-xl border border-slate-300 focus:border-[#0B3D91] outline-none text-sm text-slate-900"
                          />
                        </div>
                      </div>

                      {/* Fila 2: Cargo e Institución */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                        <div className="min-w-0">
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Cargo / Puesto{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Ej. Gerente de Conservación"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            style={inputStyle}
                            className="rounded-xl border border-slate-300 focus:border-[#0B3D91] outline-none text-sm text-slate-900"
                          />
                        </div>
                        <div className="min-w-0">
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Institución / Concesionaria{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Ej. Autopistas / SICT"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            style={inputStyle}
                            className="rounded-xl border border-slate-300 focus:border-[#0B3D91] outline-none text-sm text-slate-900"
                          />
                        </div>
                      </div>

                      {/* Fila 3: Correo y Teléfono */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                        <div className="min-w-0">
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Correo Institucional{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <input
                            required
                            type="email"
                            placeholder="roberto@concesionaria.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                            className="rounded-xl border border-slate-300 focus:border-[#0B3D91] outline-none text-sm text-slate-900"
                          />
                        </div>
                        <div className="min-w-0">
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Teléfono <span className="text-red-600">*</span>
                          </label>
                          <div className="relative flex items-center w-full bg-white border border-slate-300 rounded-xl focus-within:border-[#0B3D91] transition-all">
                            <button
                              type="button"
                              onClick={() => setShowDropdown(!showDropdown)}
                              onBlur={() =>
                                setTimeout(() => setShowDropdown(false), 200)
                              }
                              style={{ padding: "10px 10px", width: "72px" }}
                              className="h-full flex items-center justify-center gap-1.5 border-r border-slate-300 hover:bg-slate-50 rounded-l-xl outline-none cursor-pointer shrink-0"
                            >
                              <img
                                src={`https://flagcdn.com/w20/${selectedCountry?.iso}.png`}
                                alt="Bandera"
                                className="w-4 h-auto shrink-0"
                              />
                              <span className="font-bold text-xs text-slate-800 leading-none">
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
                                  className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1 w-32 flex flex-col overflow-hidden"
                                >
                                  {countries.map((c) => (
                                    <button
                                      key={c.code}
                                      type="button"
                                      onClick={() => {
                                        setCountryCode(c.code);
                                        setShowDropdown(false);
                                      }}
                                      style={{ padding: "6px 12px" }}
                                      className="w-full hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                                    >
                                      <div className="flex items-center gap-2">
                                        <img
                                          src={`https://flagcdn.com/w20/${c.iso}.png`}
                                          alt={c.label}
                                          className="w-4 h-auto"
                                        />
                                        <span className="font-bold text-xs text-slate-800">
                                          {c.label}
                                        </span>
                                      </div>
                                      <span className="text-xs text-slate-500 font-mono">
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
                              placeholder="55 1234 5678"
                              value={phone}
                              onChange={handlePhoneChange}
                              maxLength={15}
                              style={{
                                padding: "10px 12px",
                                boxSizing: "border-box",
                              }}
                              className="w-full min-w-0 bg-transparent rounded-r-xl outline-none text-sm text-slate-900"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Fila 4: Temas y Comentarios */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                        <div className="flex flex-col min-w-0">
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Temas (Mín. 1){" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <div className="grid grid-cols-2 gap-2 flex-1">
                            {themes.map((theme) => {
                              const isSelected = selectedThemes.includes(theme);
                              return (
                                <button
                                  key={theme}
                                  type="button"
                                  onClick={() => toggleTheme(theme)}
                                  style={{
                                    backgroundColor: isSelected
                                      ? NAVY_CORP
                                      : "#FFFFFF",
                                    color: isSelected ? "#FFFFFF" : "#334155",
                                    borderColor: isSelected
                                      ? NAVY_CORP
                                      : "#CBD5E1",
                                    padding: "8px 6px",
                                    wordBreak: "break-word",
                                  }}
                                  className="rounded-xl border text-xs font-bold transition-all flex items-center justify-center text-center cursor-pointer leading-tight"
                                >
                                  {theme}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Comentarios{" "}
                            <span className="text-slate-500 font-sans font-normal">
                              (Opcional)
                            </span>
                          </label>
                          <textarea
                            value={comment}
                            placeholder="Kilómetros de red vial o cuadrillas..."
                            onChange={(e) => setComment(e.target.value)}
                            style={{
                              minHeight: "76px",
                              padding: "8px 12px",
                              boxSizing: "border-box",
                              width: "100%",
                            }}
                            className="flex-1 bg-white border border-slate-300 rounded-xl outline-none focus:border-[#0B3D91] text-xs text-slate-900 resize-none"
                          />
                        </div>
                      </div>

                      {/* RECUADRO DE AGENDAR CITA: Con salto de línea natural para que NUNCA se salga el texto */}
                      <div className="pt-1 w-full min-w-0">
                        <div
                          onClick={handleToggleAppointment}
                          style={{
                            padding: "12px",
                            boxSizing: "border-box",
                          }}
                          className={`w-full rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                            wantsAppointment
                              ? "bg-sky-50 border-sky-300"
                              : "bg-white border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <div
                              style={{
                                backgroundColor: wantsAppointment
                                  ? NAVY_CORP
                                  : "#F1F5F9",
                                color: wantsAppointment
                                  ? SKY_ACCENT
                                  : "#475569",
                                width: "36px",
                                height: "36px",
                              }}
                              className="rounded-xl flex items-center justify-center shrink-0"
                            >
                              <CalendarIcon size={17} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="block text-xs font-bold text-slate-900 leading-snug break-words">
                                ¿Deseas proponer fecha y hora?
                              </span>
                              <span className="block text-[11px] text-slate-600 leading-tight mt-0.5 break-words">
                                Opcional — Agendar ahora o por correo
                              </span>
                            </div>
                          </div>

                          <div
                            style={{
                              backgroundColor: wantsAppointment
                                ? NAVY_CORP
                                : "#CBD5E1",
                              width: "44px",
                              height: "24px",
                              padding: "2px",
                            }}
                            className="rounded-full shrink-0 flex items-center"
                          >
                            <div
                              style={{
                                backgroundColor: wantsAppointment
                                  ? SKY_ACCENT
                                  : "#FFFFFF",
                                width: "20px",
                                height: "20px",
                              }}
                              className={`rounded-full shadow-sm transition-transform duration-300 ${
                                wantsAppointment
                                  ? "translate-x-5"
                                  : "translate-x-0"
                              }`}
                            />
                          </div>
                        </div>

                        <AnimatePresence>
                          {wantsAppointment && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div
                                style={{
                                  padding: "14px",
                                  boxSizing: "border-box",
                                }}
                                className="mt-3 bg-white rounded-2xl border border-slate-300 w-full"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                    <Clock
                                      size={14}
                                      className="text-[#0B3D91] shrink-0"
                                    />{" "}
                                    Elige día y hora{" "}
                                    <span className="text-red-600">*</span>
                                  </span>
                                  <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-full p-1">
                                    <button
                                      type="button"
                                      onClick={handlePrevMonth}
                                      disabled={isPrevDisabled}
                                      className={`p-1 rounded-full ${
                                        isPrevDisabled
                                          ? "opacity-30"
                                          : "hover:bg-white text-slate-800"
                                      }`}
                                    >
                                      <ChevronLeft size={14} />
                                    </button>
                                    <span className="font-bold text-slate-800 capitalize text-xs px-2 text-center">
                                      {monthYearString}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={handleNextMonth}
                                      disabled={isNextDisabled}
                                      className={`p-1 rounded-full ${
                                        isNextDisabled
                                          ? "opacity-30"
                                          : "hover:bg-white text-slate-800"
                                      }`}
                                    >
                                      <ChevronRight size={14} />
                                    </button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-500 uppercase mb-2 border-b border-slate-100 pb-2">
                                  {["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"].map(
                                    (d) => (
                                      <div key={d}>{d}</div>
                                    )
                                  )}
                                </div>
                                <div className="grid grid-cols-7 gap-1 mb-3">
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
                                      date.getDay() === 0 ||
                                      date.getDay() === 6;
                                    const isDisabled =
                                      isWeekend ||
                                      date < today ||
                                      date > maxDate;
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
                                        style={{
                                          backgroundColor: isSelected
                                            ? NAVY_CORP
                                            : "transparent",
                                          color: isSelected
                                            ? "#FFFFFF"
                                            : "#1E293B",
                                          width: "30px",
                                          height: "30px",
                                        }}
                                        className={`mx-auto rounded-full text-xs flex items-center justify-center ${
                                          isSelected
                                            ? "font-bold"
                                            : isDisabled
                                            ? "opacity-25 line-through"
                                            : "hover:bg-slate-100 cursor-pointer"
                                        }`}
                                      >
                                        {d}
                                      </button>
                                    );
                                  })}
                                </div>
                                {selectedDate && (
                                  <div className="pt-2 border-t border-slate-100">
                                    <div className="flex flex-wrap gap-1.5">
                                      {getFilteredTimes().map((t) => {
                                        const isTimeSelected =
                                          selectedTime === t;
                                        return (
                                          <button
                                            key={t}
                                            type="button"
                                            onClick={() => setSelectedTime(t)}
                                            style={{
                                              backgroundColor: isTimeSelected
                                                ? NAVY_CORP
                                                : "#F8FAFC",
                                              color: isTimeSelected
                                                ? "#FFFFFF"
                                                : "#334155",
                                              borderColor: isTimeSelected
                                                ? NAVY_CORP
                                                : "#CBD5E1",
                                              padding: "6px 10px",
                                            }}
                                            className="rounded-lg border text-xs font-bold cursor-pointer"
                                          >
                                            {t}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Checkboxes */}
                      <div className="space-y-2 pt-1">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            required
                            checked={acceptComms}
                            onChange={(e) => setAcceptComms(e.target.checked)}
                            className="mt-0.5 w-4 h-4 shrink-0 rounded border-slate-400 accent-[#0B3D91]"
                          />
                          <span className="text-xs text-slate-700 leading-snug break-words">
                            Acepto recibir comunicaciones y noticias.{" "}
                            <span className="text-red-600">*</span>
                          </span>
                        </label>
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            required
                            checked={acceptData}
                            onChange={(e) => setAcceptData(e.target.checked)}
                            className="mt-0.5 w-4 h-4 shrink-0 rounded border-slate-400 accent-[#0B3D91]"
                          />
                          <span className="text-xs text-slate-700 leading-snug break-words">
                            Acepto el manejo de mis datos de acuerdo con las
                            políticas. <span className="text-red-600">*</span>
                          </span>
                        </label>
                      </div>

                      <div className="pt-2 pb-1">
                        <button
                          type="submit"
                          disabled={isSubmitting || !isFormComplete}
                          style={{
                            backgroundColor: isFormComplete
                              ? BLUE_BRAND
                              : NAVY_CORP,
                            color: "#FFFFFF",
                            padding: "14px 20px",
                            boxSizing: "border-box",
                          }}
                          className="w-full font-poppinsoppins font-bold tracking-widest uppercase text-xs rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 disabled:opacity-50 shadow-lg cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />{" "}
                              Procesando...
                            </>
                          ) : (
                            <>
                              {wantsAppointment
                                ? "Confirmar Cita"
                                : "Agendar Reunión"}{" "}
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

// ============================================================================
// 6. COMPONENTE PRINCIPAL (ENSAMBLAJE EN FONDO BLANCO)
// ============================================================================
export default function InfraestructuraCarreteraLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="relative text-left selection:bg-[#38BDF8]/30 selection:text-[#0B3D91] min-h-screen overflow-x-clip bg-white">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&family=Poppins:wght@600;700;900&display=swap");
        .font-poppinsoppins {
          font-family: "Poppins", sans-serif;
        }
        .font-poppinsunito {
          font-family: "Nunito Sans", sans-serif;
        }
      `}</style>

      <FloatingBackToMapaMovil />
      <HeroInfraestructuraCarretera />
      <AppCentricScrollSection />
      <CTAConversionSection onOpenModal={() => setIsModalOpen(true)} />
      <MapaMovilLeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}