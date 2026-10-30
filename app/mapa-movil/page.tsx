"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Smartphone, ChevronDown, ArrowRight, 
  Camera, Bluetooth, ShieldCheck, Map,
  CheckCircle2, Send, Loader2, Calendar as CalendarIcon, Clock, ChevronRight, ChevronLeft, CheckCircle, 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link"; 
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

const fadeInVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// ==========================================
// 1. SHADER BACKGROUND (FONDO FLUIDO)
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
  <div className="fixed inset-0 z-[-1] bg-[#ffffff] pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(11,61,145,0.06)_0%,_transparent_60%)]" />
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#0B3D91" />
      <CorporateFluidCore />
    </Canvas>
  </div>
);

// ==========================================
// 2. HERO BANNER (CON IMÁGENES DE FONDO)
// ==========================================
const HeroMapaMovil = () => {
  const desktopImg = "/assets/img/05_Landing_mapaMovil/banner_map_sn.webp";
  const mobileImg = "/assets/img/05_Landing_mapaMovil/banner_map_sn_V.webp"; 

  return (
    <section className="relative w-full min-h-[100dvh] md:min-h-[800px] md:aspect-[16/9] max-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <Image src={mobileImg} alt="Banner Mapa Móvil Móvil" fill className="object-cover block md:hidden opacity-50" priority />
        <Image src={desktopImg} alt="Banner Mapa Móvil Escritorio" fill className="object-cover hidden md:block opacity-50" priority />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-8 w-full mt-28 mb-24 sm:mb-32 md:mb-0 md:mt-20">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <span className="font-sans font-bold text-[#00ffff] tracking-[0.3em] uppercase mb-6 block text-sm border-l-2 border-[#00ffff] pl-4 drop-shadow-md">
            Soluciones Móviles GPS / GNSS
          </span>
          <h1 className="font-poppins font-black text-6xl md:text-8xl lg:text-9xl text-white leading-none mb-6 uppercase tracking-tighter">
            MAPA<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#0B3D91]">MÓVIL®</span>
          </h1>
          <p className="font-sans text-white/80 text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed mb-10 font-light">
            Sistema móvil integral para la captura, visualización, consulta y análisis de datos geográficos en campo, impulsado por tecnología de posicionamiento por satélite.
          </p>
        </motion.div>
      </div>

      <a href="#capacidades" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-[#00ffff]/70 animate-bounce cursor-pointer">
        <span className="font-sans text-xs tracking-widest uppercase">Explorar Funciones</span>
        <ChevronDown className="w-5 h-5 text-white/80" />
      </a>
    </section>
  );
};

// ==========================================
// 3. COMPONENTE VISOR 360 
// ==========================================
const Visor360Especifico = () => {
  const [isActivated, setIsActivated] = useState(false);

  return (
    <div 
      className="relative w-full h-[400px] md:h-[600px] min-h-[400px] bg-slate-950 overflow-hidden"
      onMouseLeave={() => setIsActivated(false)}
    >
      <div className="absolute -inset-[60px]">
        <iframe
          src="https://mapss.sigsa.info/g51654_18/DESARROLLO%20URBANO%20PUEBLA/index.html?panorama=VID_20160211_092948_20220218122813%20117.jpg&autoLoad=true"
          className={`w-full h-full border-0 transition-all duration-500 ${
            isActivated ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-80"
          }`}
          allowFullScreen
          allow="gyroscope; accelerometer"
          title="Visor 360 Especializado"
        />
      </div>

      {!isActivated && (
        <div 
          onClick={() => setIsActivated(true)}
          className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer group transition-all duration-300 animate-fadeIn z-10"
        >
          <div className="bg-white text-slate-900 px-8 py-4 rounded-full font-sans font-bold text-sm shadow-2xl flex items-center gap-3 group-hover:scale-105 group-hover:bg-[#00ffff] group-hover:text-[#0B3D91] transition-all duration-300 uppercase tracking-wider">
            <Map size={20} className="animate-pulse" />
            Interactuar con Escena 360°
          </div>
          <p className="text-white/80 text-xs mt-3 font-sans tracking-wide bg-slate-900/60 px-4 py-1.5 rounded-full backdrop-blur-sm">
            Haz clic o toca para navegar libremente por el mapa móvil
          </p>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. CAPACIDADES DEL SISTEMA (VIDEOS Y MULTIMEDIA)
// ==========================================
interface Capacidad {
  title: string;
  desc: string;
  icon: React.ElementType;
  videoUrl?: string;
  is360Section?: boolean;
  reverse: boolean;
}

const CapacidadesMapaMovil = () => {
  const capacidades: Capacidad[] = [
    {
      title: "Captura de Información Inteligente",
      desc: "Mapa Móvil® permite la recopilación de datos directamente adjuntos al elemento geográfico. Utiliza formularios totalmente personalizados y adjunta evidencias fotográficas en tiempo real.",
      icon: Camera,
      videoUrl: "/assets/img/05_Landing_mapaMovil/01_captura.mp4", 
      reverse: false
    },
    {
      title: "Visión Artifical Aplicada",
      desc: "Mapa Movil incorpora el desarrollo de motores de visión artificial para la detección automática de elementos y el llenado de información. A partir de esta tecnología, el reconocimiento de imágenes se traduce directamente en datos estructurados y listos para usar.",
      icon: Bluetooth,
      videoUrl: "/assets/img/05_Landing_mapaMovil/00_vision.mp4",
      reverse: true
    },
    {
      title: "Respaldo de Líderes Tecnológicos",
      desc: "Nuestra solución está sustentada en desarrollos de los mejores fabricantes del mercado global: TRIMBLE Navigation Limited para SIG, Laser Technology para medición remota y NAVCOM Technology para levantamientos en tiempo real.",
      icon: ShieldCheck,
      is360Section: true,
      reverse: false
    }
  ];

  return (
    <section id="capacidades" className="py-24 md:py-32 px-6 md:px-8 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#00ffff]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="font-sans font-bold text-[#0B3D91] tracking-[0.2em] text-xs uppercase mb-4 block">Potencia Geográfica</span>
          <h2 className="font-poppins font-black text-4xl md:text-5xl text-slate-900 uppercase tracking-tighter leading-tight mb-6">
            Lleva el poder del SIG <br/><span className="text-[#0B3D91]">al lugar de los hechos</span>
          </h2>
        </div>

        <div className="space-y-24 md:space-y-32">
          {capacidades.map((cap, idx) => {
            const IconComponent = cap.icon; 
            
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col gap-8 md:gap-16 ${
                  cap.is360Section 
                    ? 'items-center text-center' 
                    : `md:flex-row ${cap.reverse ? 'md:flex-row-reverse' : ''} items-start`
                }`}
              >
                <div className={`w-full flex flex-col ${cap.is360Section ? 'items-center max-w-4xl' : 'md:w-1/2 items-start text-left'}`}>
                  <div className="w-14 h-14 bg-white border border-slate-200 text-[#0B3D91] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    {/* @ts-ignore */}
                    <IconComponent size={28} />
                  </div>
                  <h3 className="font-poppins font-bold text-3xl md:text-4xl text-slate-900 mb-4 leading-tight tracking-tight">
                    {cap.title}
                  </h3>
                  <p className={`font-sans text-slate-600 text-lg leading-relaxed ${cap.is360Section ? 'text-center' : ''}`}>
                    {cap.desc}
                  </p>
                </div>

                <div className={`w-full ${cap.is360Section ? 'mt-4' : 'md:w-1/2'}`}>
                  <div className="relative w-full rounded-[2rem] border border-slate-300 overflow-hidden shadow-xl shadow-slate-300/50 flex flex-col items-center justify-center bg-slate-950">
                    {cap.is360Section ? (
                      <Visor360Especifico />
                    ) : (
                      <video 
                        src={cap.videoUrl} 
                        className="w-full aspect-video md:aspect-square lg:aspect-video object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 5. APLICACIONES ESTRATÉGICAS (CON NAVEGACIÓN VÍA LINK)
// ==========================================
const AplicacionesSection = () => {
  const aplicaciones = [
    { 
      title: "Giros Comerciales", 
      desc: "Identificación, censo y actualización de locales y establecimientos comerciales en campo para optimización de bases de datos de recaudación.", 
      img: "/assets/img/05_Landing_mapaMovil/01_mapa_comercial.webp",
      colSpan: "md:col-span-6",
      href: "/mapaMovil-componentes/girosComerciales"
    },
    { 
      title: "Infraestructura Carretera", 
      desc: "Levantamiento de daños en pavimento, señalética faltante y condiciones de los derechos de vía a lo largo de las redes de transporte.", 
      img: "/assets/img/05_Landing_mapaMovil/02_mapa_carretera.webp",
      colSpan: "md:col-span-6",
      href: "/mapaMovil-componentes/carretera"
    },
    { 
      title: "Catastro", 
      desc: "Verificación de linderos, construcciones no declaradas y actualización de cartografía predial directamente in situ.", 
      img: "/assets/img/05_Landing_mapaMovil/03_mapa_catastro.webp",
      colSpan: "md:col-span-4",
      href: "/mapaMovil-componentes/catastro"
    },
    { 
      title: "Desarrollo Urbano", 
      desc: "Gestión de licencias, supervisión de obras y control del uso de suelo municipal mediante consultas geoespaciales móviles.", 
      img: "/assets/img/05_Landing_mapaMovil/04_mapa_urbano.webp",
      colSpan: "md:col-span-4",
      href: "/mapaMovil-componentes/desarrollo"
    },
    { 
      title: "Parques y Jardines", 
      desc: "Inventario de arbolado, programación de podas y mapeo del mobiliario urbano para un mantenimiento eficiente de áreas verdes.", 
      img: "/assets/img/05_Landing_mapaMovil/05_mapa_parques.webp",
      colSpan: "md:col-span-4",
      href: "/mapaMovil-componentes/parques"
    }
  ];

  return (
    <section className="py-32 px-6 md:px-8 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-slate-900 uppercase tracking-tighter mb-4">
            Aplicaciones <span className="text-[#0B3D91]">Estratégicas</span>
          </h2>
          <p className="font-sans text-slate-500 text-lg">
            Soluciones adaptadas a las necesidades específicas de las cuadrillas en campo, abarcando todas las áreas operativas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {aplicaciones.map((app, i) => {
            const isClickable = app.href && app.href !== "#";
            
            const CardContent = (
              <div className={`flex flex-col gap-5 h-full ${isClickable ? 'group cursor-pointer' : 'group opacity-90'}`}>
                <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-md border border-slate-200/80 bg-slate-100 group-hover:shadow-xl group-hover:border-[#0B3D91]/20 transition-all duration-500 bg-white">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-slate-200/60 border-b border-slate-200/40 px-4 flex items-center gap-1.5 z-10 backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  </div>
                  <div className="absolute inset-0 pt-6">
                    <Image 
                      src={app.img} 
                      alt={app.title} 
                      fill 
                      className={`object-cover object-top transition-transform duration-700 ease-out ${isClickable ? 'group-hover:scale-[1.02]' : ''}`} 
                    />
                  </div>
                </div>
                <div className="px-2">
                  <h4 className={`font-poppins font-bold text-2xl text-slate-900 uppercase tracking-tight mb-2 transition-colors ${isClickable ? 'group-hover:text-[#0B3D91]' : ''}`}>
                    {app.title}
                  </h4>
                  <p className="font-sans text-slate-500 text-sm leading-relaxed mb-4">
                    {app.desc}
                  </p>
                  
                  {/* Botón visual que indica que se puede dar clic */}
                  <div className={`inline-flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 ${isClickable ? 'text-[#0B3D91] group-hover:translate-x-1.5' : 'text-slate-400'}`}>
                    {isClickable ? "Conoce más" : "Próximamente"} 
                    {isClickable && <ArrowRight size={14} />}
                  </div>
                </div>
              </div>
            );

            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={app.colSpan}
              >
                {/* Si la ruta es válida, lo envolvemos en <Link>, si no, renderizamos la tarjeta estática */}
                {isClickable ? (
                  <Link href={app.href} className="block h-full">
                    {CardContent}
                  </Link>
                ) : (
                  CardContent
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 6. PREGUNTAS FRECUENTES
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

const PreguntasFrecuentesMapaMovil = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      pregunta: "¿Mapa Móvil funciona en zonas sin señal de internet?",
      respuesta: "Sí. Mapa Móvil cuenta con un robusto modo Offline. Las cuadrillas pueden descargar los cuadrantes o mapas necesarios antes de salir, operar normalmente recolectando datos o modificando atributos, y sincronizar la información con el servidor central automáticamente en cuanto recuperen la conexión."
    },
    {
      pregunta: "¿En qué dispositivos se puede instalar la aplicación?",
      respuesta: "La aplicación está desarrollada con tecnología multiplataforma, por lo que es totalmente compatible con dispositivos móviles inteligentes y tabletas que operen bajo los sistemas iOS (Apple) y Android."
    },
    {
      pregunta: "¿Cómo se asegura la integridad de los datos institucionales?",
      respuesta: "Mapa Móvil no almacena información sensible de manera permanente en el dispositivo. Todos los datos viajan mediante conexiones encriptadas directamente a los servidores institucionales (vía Serverbox o plataformas ESRI), garantizando que los datos oficiales nunca se comprometan en caso de robo o pérdida del equipo."
    },
    {
      pregunta: "¿Se requiere un equipo especial de topografía para levantar datos?",
      respuesta: "No. La app utiliza el GPS nativo del dispositivo para tareas cotidianas. Si se requiere precisión milimétrica, Mapa Móvil se puede integrar con antenas GNSS externas Bluetooth RTK para levantamientos topográficos o catastrales estrictos."
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
// 7. INBOUND LEAD CAPTURE: MAPA MÓVIL (UNIFICADO CON HUBSPOT + CITA OPCIONAL)
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

const MapaMovilLeadCapture = () => {
  // Estado para saber si el usuario quiere agendar fecha/hora (Opcional)
  const [wantsAppointment, setWantsAppointment] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonthDate, setCurrentMonthDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // Preseleccionamos "Cartografía" para Mapa Móvil
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
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-slate-50 relative z-10 overflow-hidden border-t border-slate-200">
      {/* Elementos decorativos estilo Landing Principal */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0B3D91]/5 rounded-full blur-[80px] pointer-events-none -translate-x-1/4 translate-y-1/3" />

      <div className="max-w-6xl mx-auto relative z-20">
        {/* CONTENEDOR PRINCIPAL: Grid de 12 Columnas */}
        <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* ========================================================= */}
          {/* COLUMNA IZQUIERDA: COPY MAPA MÓVIL (5 COLUMNAS)           */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 p-8 sm:p-10 md:p-12 lg:py-16 lg:px-12 flex flex-col justify-center relative overflow-hidden min-w-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(11,61,145,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(11,61,145,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-[#0B3D91]/5 border border-[#0B3D91]/10 rounded-full mb-8 w-max max-w-full">
                  <Smartphone className="w-4 h-4 text-[#0B3D91] shrink-0" />
                  <span className="font-sans font-bold text-[#0B3D91] tracking-[0.18em] uppercase text-xs truncate">
                    Demostración de la App
                  </span>
                </div>

                <h2 className="font-poppins font-black text-3xl sm:text-4xl xl:text-[2.65rem] text-slate-900 tracking-tighter mb-7 leading-[1.12]">
                  Empodera a tus cuadrillas. <br />
                  <span className="text-[#0B3D91]">Datos exactos en campo.</span>
                </h2>

                <p className="font-sans text-slate-600 text-base sm:text-lg leading-relaxed mb-10">
                  Dile adiós a los reportes en papel y a la pérdida de
                  información. Agenda una demostración interactiva para conocer
                  cómo Mapa Móvil agiliza el levantamiento de datos operando sin
                  conexión a internet y sincronizando directo a tus bases
                  corporativas.
                </p>
              </div>

              <ul className="space-y-8 font-sans text-slate-700 mt-2">
                <li className="flex items-start gap-4">
                  <div className="bg-[#0B3D91]/10 p-2.5 rounded-full shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-[#0B3D91]" />
                  </div>
                  <div className="min-w-0">
                    <strong className="block text-slate-900 font-bold text-base mb-1.5">
                      Prueba de Interfaz en Vivo
                    </strong>
                    <span className="text-slate-600 text-sm leading-relaxed block">
                      Observa el funcionamiento de los formularios dinámicos, la
                      toma de fotografías georreferenciadas y la captura de
                      coordenadas GPS.
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-[#0B3D91]/10 p-2.5 rounded-full shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-[#0B3D91]" />
                  </div>
                  <div className="min-w-0">
                    <strong className="block text-slate-900 font-bold text-base mb-1.5">
                      Análisis de Integración
                    </strong>
                    <span className="text-slate-600 text-sm leading-relaxed block">
                      Evaluaremos cómo conectar y sincronizar los datos
                      recolectados en la app móvil con los sistemas que ya
                      utilizas en tu centro de mando.
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
                    Un especialista en movilidad evaluará tus requerimientos y se
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
                  {/* LOGO DE MAPA MÓVIL (ESCALADO VERTICAL) */}
                  <div className="mb-4 flex justify-center">
                    <Image
                      src="/assets/img/01_LANDING_SIGSA/LOGO_mapa.png"
                      alt="Mapa Móvil Logo"
                      width={240}
                      height={90}
                      className="object-contain h-16.5 md:h-[90px] w-auto drop-shadow-sm"
                    />
                  </div>

                  <h3 className="font-poppins font-black text-xl sm:text-2xl text-slate-900 mb-1">
                    Solicitar Demo
                  </h3>
                  <p className="font-sans text-slate-500 text-xs sm:text-sm mb-5">
                    Cuéntanos sobre tu desafío operativo en campo.
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
                          placeholder="Ej. Ana"
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
                          placeholder="Ej. Martínez"
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
                          placeholder="Ej. Gerente de Operaciones"
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
                          placeholder="ana@tuempresa.com"
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
                          placeholder="Cuéntanos sobre tus cuadrillas o levantamientos en campo..."
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
                            Confirmar Cita y Demo{" "}
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        ) : (
                          <>
                            Agendar Demo{" "}
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
// 8. ENSAMBLAJE FINAL: MAPA MÓVIL
// ==========================================
export default function MapaMovilLanding() {
  return (
    <div className="relative text-left selection:bg-[#00ffff] selection:text-[#0B3D91]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@700;900&display=swap');
        .font-poppins { font-family: 'Space Grotesk', sans-serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
      
      <LightShaderCanvas />
      <HeroMapaMovil />
      <CapacidadesMapaMovil />
      <AplicacionesSection />
      <PreguntasFrecuentesMapaMovil />
      <MapaMovilLeadCapture />
    </div>
  );
}