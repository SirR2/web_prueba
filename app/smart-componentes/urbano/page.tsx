"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  Building2,
  Image as ImageIcon,
  BarChart3,
  Map as MapIcon,
  Navigation,
  Layers,
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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ============================================================================
// 0. CONFIGURACIÓN DE RUTAS Y PALETA SKY BLUE
// ============================================================================
const SMART_TWIN_INDUSTRIES_URL = "/smart-twin#ecosistema";
const SKY_MAIN = "#38BDF8"; // Sky 400
const SKY_LIGHT = "#7DD3FC"; // Sky 300
const SKY_DARK = "#0284C7"; // Sky 600 (para textos sobre fondo blanco)

const countries = [
  { code: "+52", iso: "mx", label: "MX" },
  { code: "+1", iso: "us", label: "US" },
  { code: "+34", iso: "es", label: "ES" },
  { code: "+57", iso: "co", label: "CO" },
  { code: "+54", iso: "ar", label: "AR" },
  { code: "+56", iso: "cl", label: "CL" },
  { code: "+51", iso: "pe", label: "PE" },
];

interface StreamLine {
  id: number;
  left: number;
  delay: number;
  duration: number;
  height: number;
  opacity: number;
}

// ============================================================================
// 1. BOTÓN INFERIOR FLOTANTE (CAMBIA A AZUL CIELO / SKY EN HOVER)
// ============================================================================
const FloatingBackToIndustries = () => {
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
          href={SMART_TWIN_INDUSTRIES_URL}
          aria-label="Volver a Industrias"
          style={{
            backgroundColor: isHovered
              ? "rgba(10, 37, 64, 0.98)"
              : "rgba(10, 37, 64, 0.88)",
            borderColor: isHovered ? SKY_MAIN : "rgba(56, 189, 248, 0.4)",
            boxShadow: isHovered
              ? "0 10px 30px rgba(56, 189, 248, 0.3)"
              : "0 10px 30px rgba(5, 11, 20, 0.35)",
          }}
          className="group flex items-center backdrop-blur-xl border rounded-full p-1.5 transition-all duration-300"
        >
          {/* Círculo del ícono: se rellena de Azul Cielo al pasar el cursor */}
          <div
            style={{
              backgroundColor: isHovered
                ? SKY_MAIN
                : "rgba(56, 189, 248, 0.15)",
              color: isHovered ? "#050B14" : SKY_MAIN,
            }}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
          </div>

          {/* Texto: Blanco en reposo y Azul Cielo (#7DD3FC) en hover */}
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
                color: isHovered ? SKY_LIGHT : "rgba(255, 255, 255, 0.95)",
              }}
              className="font-poppinsoppins font-bold text-[11px] md:text-xs uppercase tracking-[0.16em] pl-3 pr-4 block transition-colors duration-300"
            >
              Volver a Industrias
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

// ============================================================================
// 2. FONDO AMBIENTAL: LÍNEAS DE DATOS VERTICALES (NAVY A SKY BLUE)
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
            backgroundImage: `linear-gradient(to bottom, transparent, #0A2540, ${SKY_MAIN})`,
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
              backgroundColor: SKY_MAIN,
              boxShadow: `0 0 8px 1px ${SKY_MAIN}`,
            }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-[10px] rounded-full"
          />
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// 3. SECCIÓN HERO (ICONO Y TEXTO "URBANO" EN AZUL CIELO / SKY)
// ============================================================================
const HeroDesarrolloUrbano = () => {
  return (
    <section className="relative w-full min-h-[85dvh] md:min-h-[800px] flex items-center justify-center overflow-hidden bg-[#050B14] pt-24 pb-12">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/img/04_Landing_SMART/urba/00_desa.jpg"
          alt="Desarrollo Urbano"
          fill
          priority
          className="object-cover opacity-40 mix-blend-luminosity grayscale-[15%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050B14]/90 via-[#0A2540]/80 to-[#F8FAFC] z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 w-full text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Ícono del Banner en Azul Cielo / Sky */}
          <div
            style={{
              color: SKY_MAIN,
              borderColor: "rgba(56, 189, 248, 0.3)",
              boxShadow: "0 0 30px rgba(56, 189, 248, 0.15)",
            }}
            className="w-16 h-16 md:w-20 md:h-20 bg-white/5 backdrop-blur-md border rounded-2xl flex items-center justify-center mx-auto mb-8"
          >
            <Building2 size={32} strokeWidth={1.5} />
          </div>

          {/* Etiqueta superior en Azul Cielo */}
          <span
            style={{ color: SKY_MAIN }}
            className="font-poppinsoppins font-bold tracking-[0.3em] uppercase mb-4 md:mb-6 block text-xs md:text-sm"
          >
            Ciudades Inteligentes & Territorio
          </span>

          {/* Título principal con "URBANO" en degradado Azul Cielo / Sky */}
          <h1 className="font-poppinsoppins font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white leading-[1.1] mb-6 md:mb-8 uppercase tracking-tight">
            Desarrollo <br className="hidden md:block" />
            <span
              style={{
                backgroundImage: `linear-gradient(90deg, ${SKY_MAIN} 0%, ${SKY_LIGHT} 55%, #BAE6FD 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Urbano
            </span>
          </h1>

          <h2 className="font-poppinsunito text-white/90 text-xl md:text-2xl mb-6 max-w-4xl mx-auto">
            Inteligencia geoespacial para la planeación territorial, movilidad y
            resiliencia metropolitana.
          </h2>

          <p className="font-poppinsunito text-white/60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            Simulamos entornos urbanos complejos a escala real para optimizar el
            uso del espacio público, modernizar la gestión catastral y diseñar
            infraestructura sostenible conectada con sensores IoT en tiempo
            real.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================================================
// 4. SECCIÓN: PILARES ESTRATÉGICOS (DETALLES SKY BLUE EN ETIQUETAS Y HOVER)
// ============================================================================
const CoreCapabilitiesSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const capabilities = [
    {
      icon: <MapIcon size={28} strokeWidth={1.5} />,
      title: "Catastro Multifinalitario 3D",
      desc: "Modelado urbano tridimensional de alta precisión mediante LiDAR aéreo y Mobile Mapping para actualizar padrones, uso de suelo y recaudación.",
    },
    {
      icon: <Navigation size={28} strokeWidth={1.5} />,
      title: "Simulación de Movilidad",
      desc: "Análisis dinámico de flujos vehiculares, transporte público y peatones en tiempo real para optimizar vialidades y reducir cuellos de botella.",
    },
    {
      icon: <Layers size={28} strokeWidth={1.5} />,
      title: "Infraestructura Subterránea",
      desc: "Mapeo no invasivo con georradar (GPR) de redes de agua, drenaje, fibra óptica y gas para evitar rupturas durante obras públicas.",
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 md:px-8 relative z-10 border-b border-slate-200/40 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Etiqueta con punto y texto en Azul Sky */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200/60 mb-4">
              <span
                style={{ backgroundColor: SKY_MAIN }}
                className="w-2 h-2 rounded-full"
              />
              <span
                style={{ color: SKY_DARK }}
                className="font-poppinsoppins font-bold tracking-[0.2em] uppercase text-xs"
              >
                Capacidades Core
              </span>
            </div>

            <h2 className="font-poppinsoppins font-bold text-3xl md:text-5xl text-slate-900 tracking-tight leading-[1.2] max-w-3xl mx-auto">
              Planeación Basada en{" "}
              <span style={{ color: SKY_DARK }}>Evidencia Geoespacial</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {capabilities.map((cap, idx) => {
            const isCardHovered = hoveredCard === idx;
            return (
              <motion.div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                style={{
                  borderColor: isCardHovered
                    ? "rgba(56, 189, 248, 0.4)"
                    : "#F1F5F9",
                }}
                className="bg-white rounded-3xl p-8 lg:p-10 border shadow-[0_10px_30px_-15px_rgba(10,37,64,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.18)] transition-all duration-500 group"
              >
                {/* Caja del ícono: cambia a fondo Navy e ícono Sky Blue en hover */}
                <div
                  style={{
                    backgroundColor: isCardHovered
                      ? "#0A2540"
                      : "rgba(56, 189, 248, 0.1)",
                    color: isCardHovered ? SKY_MAIN : SKY_DARK,
                  }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500"
                >
                  {cap.icon}
                </div>

                <h3 className="font-poppinsoppins font-bold text-xl md:text-2xl text-slate-900 mb-4 group-hover:text-[#0A2540] transition-colors">
                  {cap.title}
                </h3>
                <p className="font-poppinsunito text-slate-600 leading-relaxed text-base">
                  {cap.desc}
                </p>

                {/* Línea inferior en Sky Blue que se expande al hacer hover */}
                <div
                  style={{ backgroundColor: SKY_MAIN }}
                  className="w-0 h-[2px] mt-8 transition-all duration-500 group-hover:w-12"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 5. SECCIÓN: IMAGEN Y RESILIENCIA METROPOLITANA
// ============================================================================
const ImageSection = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-8 relative z-10 border-b border-slate-200/40 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative h-[450px] md:h-[650px] w-full rounded-3xl overflow-hidden shadow-2xl group"
        >
          <Image
            src="/assets/img/04_Landing_SMART/urba/01_desa.jpg"
            alt="Monitoreo Urbano y Movilidad Inteligente"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 to-transparent flex items-end p-10">
            <div
              style={{
                color: SKY_MAIN,
                borderColor: "rgba(56, 189, 248, 0.35)",
              }}
              className="w-14 h-14 bg-[#0A2540]/60 backdrop-blur-md rounded-2xl flex items-center justify-center border"
            >
              <ImageIcon size={24} strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity size={18} style={{ color: SKY_MAIN }} />
            <span
              style={{ color: SKY_DARK }}
              className="font-poppinsoppins font-bold tracking-[0.2em] uppercase text-xs"
            >
              Resiliencia & Sostenibilidad
            </span>
          </div>
          <h2 className="font-poppinsoppins font-bold text-3xl md:text-5xl text-slate-900 tracking-tight mb-8 leading-[1.2]">
            Diseñe Ciudades{" "}
            <span style={{ color: SKY_DARK }}>Preparadas para el Futuro</span>
          </h2>
          <p className="font-poppinsunito text-slate-600 text-lg leading-relaxed mb-10">
            Integramos modelos digitales de elevación, imágenes térmicas y
            sensórica ambiental para simular el impacto de nuevos desarrollos
            inmobiliarios o infraestructuras viales antes de colocar la primera
            piedra. Evalúe escorrentías pluviales, islas de calor y demanda de
            servicios con certeza matemática.
          </p>
          <ul className="space-y-5 mb-8">
            <li className="flex items-start gap-4 font-poppinsunito text-slate-700">
              <ShieldCheck
                style={{ color: SKY_MAIN }}
                className="mt-1 shrink-0"
                size={22}
              />
              <span>
                Simulación hidrodinámica para prevención de inundaciones en
                zonas críticas.
              </span>
            </li>
            <li className="flex items-start gap-4 font-poppinsunito text-slate-700">
              <ShieldCheck
                style={{ color: SKY_MAIN }}
                className="mt-1 shrink-0"
                size={22}
              />
              <span>
                Detección automatizada de construcciones no registradas mediante
                IA comparativa.
              </span>
            </li>
            <li className="flex items-start gap-4 font-poppinsunito text-slate-700">
              <ShieldCheck
                style={{ color: SKY_MAIN }}
                className="mt-1 shrink-0"
                size={22}
              />
              <span>
                Integración directa de modelos BIM arquitectónicos con sistemas
                GIS municipales.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

// ============================================================================
// 6. SECCIÓN: VIDEO CENTRO DE GESTIÓN METROPOLITANA
// ============================================================================
const VideoSection = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  return (
    <section className="pt-24 pb-32 md:py-36 px-6 md:px-8 relative z-10 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1"
        >
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 size={18} style={{ color: SKY_MAIN }} />
            <span
              style={{ color: SKY_DARK }}
              className="font-poppinsoppins font-bold tracking-[0.2em] uppercase text-xs"
            >
              Gobernanza Digital en Tiempo Real
            </span>
          </div>
          <h2 className="font-poppinsoppins font-bold text-3xl md:text-5xl text-slate-900 tracking-tight mb-8 leading-[1.2]">
            Centro de Mando Urbano{" "}
            <span style={{ color: SKY_DARK }}>(Smart City)</span>
          </h2>
          <p className="font-poppinsunito text-slate-600 text-lg leading-relaxed mb-10">
            Unifique seguridad ciudadana, tránsito, alumbrado, calidad del aire
            y obras públicas en un Gemelo Digital Metropolitano (Smart Twin).
            Coordine respuestas interinstitucionales al instante y transforme
            datos complejos en políticas públicas de alto impacto.
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={() => setIsBtnHovered(false)}
            style={{
              backgroundColor: isBtnHovered ? SKY_MAIN : "#0A2540",
              color: isBtnHovered ? "#050B14" : "#FFFFFF",
            }}
            className="px-8 py-4 rounded-xl font-poppinsoppins font-bold text-sm uppercase tracking-widest transition-colors duration-300 flex items-center gap-3 shadow-xl shadow-slate-900/10 cursor-pointer"
          >
            Agendar Presentación <ArrowRight size={18} />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 md:order-2 relative h-[450px] md:h-[550px] w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(10,37,64,0.3)] bg-[#0A2540] group"
        >
          <video
            src="/assets/img/04_Landing_SMART/urba/03_desa.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 pointer-events-none"
          />

          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.2)] pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

// ============================================================================
// 6.1 MODAL SMART TWIN LEAD CAPTURE - DESARROLLO URBANO (UNIFICADO CON HUBSPOT)
// ============================================================================
const SmartTwinLeadCaptureModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Estados del calendario interactivo
  const [wantsAppointment, setWantsAppointment] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonthDate, setCurrentMonthDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedThemes, setSelectedThemes] = useState<string[]>(["Gemelos Digitales"]);

  // Estados del Formulario unificado
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

  useEffect(() => {
    setMounted(true);
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    if (!isOpen) {
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
      setShowDropdown(false);
      setIsSubmitting(false);

      const resetDate = new Date();
      setCurrentMonthDate(new Date(resetDate.getFullYear(), resetDate.getMonth(), 1));
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

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            key="lead-modal-unified"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: isDesktop ? "min(94vw, 1140px)" : "min(94vw, 440px)",
              maxHeight: isDesktop ? "92vh" : "86dvh",
              display: isDesktop ? "grid" : "flex",
              gridTemplateColumns: isDesktop ? "1.02fr 0.98fr" : "none",
            }}
            className={`relative z-10 bg-white border border-slate-100 overflow-hidden text-left ${
              isDesktop ? "rounded-[2.5rem] shadow-2xl" : "flex-col rounded-2xl shadow-2xl"
            }`}
          >
            {/* BOTÓN X PARA CERRAR (PC) */}
            {isDesktop && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar ventana"
                style={{ top: "20px", right: "20px" }}
                className="absolute z-30 w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 flex items-center justify-center shadow-md transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* CABECERA (MÓVIL) */}
            {!isDesktop && (
              <div className="shrink-0 flex items-center justify-between px-4 py-3 bg-slate-900 text-white z-30">
                <div className="flex items-center gap-2 min-w-0">
                  <Box className="w-4 h-4 text-[#00ffff] shrink-0" />
                  <span className="font-poppinsoppins font-bold text-[11px] tracking-wider uppercase truncate">
                    Demo Smart Twin Desarrollo Urbano
                  </span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar formulario"
                  className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 text-[11px] font-bold transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-3.5 h-3.5 text-[#00ffff]" />
                  <span>Cerrar</span>
                </button>
              </div>
            )}

            {/* LADO IZQUIERDO (SOLO PC) */}
            {isDesktop && (
              <div className="p-10 xl:p-14 flex flex-col justify-center bg-white min-w-0 relative">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(11,61,145,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(11,61,145,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#0B3D91]/5 border border-[#0B3D91]/10 rounded-full mb-6 w-max max-w-full">
                    <Box className="w-4 h-4 text-[#0B3D91] shrink-0" />
                    <span className="font-poppinsoppins font-bold text-[#0B3D91] tracking-[0.18em] uppercase text-xs truncate">
                      Taller de Viabilidad Técnica
                    </span>
                  </div>

                  <h2 className="font-poppinsoppins font-black text-4xl xl:text-[2.6rem] text-slate-900 tracking-tighter mb-6 leading-[1.12]">
                    Digitaliza tu territorio urbano. <br />
                    <span className="text-[#0B3D91]">Anticipa el futuro.</span>
                  </h2>

                  <p className="font-poppinsunito text-slate-600 text-base xl:text-lg leading-relaxed mb-8">
                    Descubre el impacto real de integrar cartografía 3D, movilidad e IoT
                    en la gestión territorial. Agenda una demo con nuestros expertos
                    para evaluar cómo un Gemelo Digital Metropolitano puede modernizar tu
                    catastro y optimizar la planeación urbana.
                  </p>

                  <ul className="space-y-6 font-poppinsunito text-slate-700">
                    <li className="flex items-start gap-4">
                      <div className="bg-[#0B3D91]/10 p-2.5 rounded-full shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-[#0B3D91]" />
                      </div>
                      <div className="min-w-0">
                        <strong className="block text-slate-900 font-bold mb-1">
                          Diagnóstico Catastral y Territorial
                        </strong>
                        <span className="text-slate-600 text-sm leading-relaxed block">
                          Analizamos la viabilidad de integrar vuelos LiDAR, Mobile Mapping y bases GIS municipales en un entorno 3D.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-[#0B3D91]/10 p-2.5 rounded-full shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-[#0B3D91]" />
                      </div>
                      <div className="min-w-0">
                        <strong className="block text-slate-900 font-bold mb-1">
                          Hoja de Ruta de Implementación
                        </strong>
                        <span className="text-slate-600 text-sm leading-relaxed block">
                          Diseñamos un plan por fases, desde la actualización cartográfica hasta tu centro de mando Smart City.
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
                        <div className="font-poppinsunito min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#0B3D91]">
                            Horario seleccionado
                          </p>
                          <p className="text-sm font-bold text-slate-800 capitalize truncate">
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
            )}

            {/* FORMULARIO (MÓVIL O LADO DERECHO PC) */}
            <div className={`flex flex-col justify-center min-w-0 relative ${
                isDesktop 
                  ? "bg-slate-50/70 p-8 xl:p-10 border-l border-slate-100 overflow-y-auto" 
                  : "flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50/60"
              }`}
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
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-5 shadow-inner">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-poppins font-black text-2xl text-slate-900 mb-2">
                      {wantsAppointment
                        ? "¡Cita y Solicitud Recibidas!"
                        : "¡Solicitud Recibida!"}
                    </h3>
                    <p className="font-poppinsunito text-slate-600 text-sm sm:text-base leading-relaxed px-4 max-w-md">
                      Un especialista en planeación urbana y gemelos digitales
                      se pondrá en contacto a tu correo institucional pronto.
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-8 px-8 py-3.5 bg-[#0B3D91] text-white rounded-xl text-xs font-poppinsunito font-bold hover:bg-[#00ffff] hover:text-[#0B3D91] transition-all uppercase tracking-widest shadow-lg shadow-[#0B3D91]/20 cursor-pointer"
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
                    className="w-full min-w-0"
                  >
                    <div className={`mb-5 flex ${isDesktop ? "justify-center" : "justify-start"}`}>
                      <Image
                        src="/assets/img/01_LANDING_SIGSA/LOGO_smart.png"
                        alt="Smart Twin Logo"
                        width={isDesktop ? 260 : 180}
                        height={60}
                        className={`object-contain ${isDesktop ? "h-[65px]" : "h-[45px]"} w-auto drop-shadow-sm`}
                      />
                    </div>

                    <h3 className={`font-poppinsoppins font-black text-slate-900 mb-1 ${isDesktop ? "text-2xl" : "text-xl"}`}>
                      Solicitar Demostración
                    </h3>
                    <p className="font-poppinsunito text-slate-500 text-xs sm:text-sm mb-5">
                      Déjanos tus datos institucionales o corporativos para coordinar una sesión.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3.5 font-poppinsunito w-full min-w-0">
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

                      {/* Fila 2: Cargo e Institución / Desarrolladora */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                        <div className="min-w-0">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Cargo / Puesto <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            type="text"
                            value={jobTitle}
                            placeholder="Ej. Director de Catastro / Planeación"
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
                          />
                        </div>
                        <div className="min-w-0">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Institución / Desarrolladora <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            type="text"
                            value={company}
                            placeholder="Ej. Secretaría de Desarrollo Urbano"
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full min-w-0 px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all text-sm text-slate-800 placeholder-slate-400"
                          />
                        </div>
                      </div>

                      {/* Fila 3: Correo y Teléfono */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                        <div className="min-w-0">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Correo Institucional / Corporativo <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            type="email"
                            value={email}
                            placeholder="roberto@institucion.gob.mx"
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
                            placeholder="Cuéntanos sobre tu municipio, catastro o desarrollo urbano..."
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
                                    <span className="font-bold text-slate-700 capitalize text-xs w-24 sm:w-28 text-center select-none">
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
                                        className={`h-7 w-7 sm:h-8 sm:w-8 mx-auto rounded-full text-xs transition-all duration-200 flex items-center justify-center ${
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
                                          className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-bold transition-all cursor-pointer ${
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
                            Acepto recibir comunicaciones, noticias y ofertas exclusivas de SIGSA. <span className="text-red-500">*</span>
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
                            Acepto el almacenamiento y manejo de mis datos personales de acuerdo con las políticas vigentes. <span className="text-red-500">*</span>
                          </span>
                        </label>
                      </div>

                      {/* Botón Submit Dinámico y Texto Legal */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting || !isFormComplete}
                          className="w-full bg-[#0B3D91] text-white font-poppinsoppins font-bold tracking-widest uppercase text-xs sm:text-sm py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#00ffff] hover:text-[#0B3D91] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#0B3D91]/20 group cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" /> Procesando...
                            </>
                          ) : wantsAppointment ? (
                            <>
                              Confirmar Cita y Reunión <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          ) : (
                            <>
                              Agenda una reunión <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </button>

                        <p className="text-center font-poppinsunito text-[10px] text-slate-400 mt-5 pt-1 leading-relaxed px-4">
                          Puedes consultar los términos legales, nuestro aviso de privacidad y la política de uso de datos personales en el pie de página de SIGSA.
                        </p>
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
// 7. COMPONENTE PRINCIPAL DE LA LANDING (DESARROLLO URBANO)
// ============================================================================
export default function DesarrolloUrbanoLanding() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative text-left bg-slate-50 text-slate-900 selection:bg-[#38BDF8]/30 selection:text-[#0A2540] min-h-screen overflow-x-hidden">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&family=Poppins:wght@600;700;900&display=swap");
        .font-poppinsoppins {
          font-family: "Poppins", sans-serif;
        }
        .font-poppinsunito {
          font-family: "Nunito Sans", sans-serif;
        }
      `}</style>

      {/* BOTÓN FLOTANTE CON HOVER EN SKY BLUE */}
      <FloatingBackToIndustries />

      <HeroDesarrolloUrbano />

      <div className="relative w-full overflow-hidden bg-white">
        <VerticalDataStreams />
        <div className="relative z-10">
          <CoreCapabilitiesSection />
          <ImageSection />
          <VideoSection onOpenModal={() => setIsModalOpen(true)} />
        </div>
      </div>

      {/* MODAL UNIFICADO CON HUBSPOT Y CALENDARIO */}
      <SmartTwinLeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}