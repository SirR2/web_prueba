"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, Eye, Ruler, Lightbulb, Handshake, 
  Sprout, Trees, Globe, MapPin
} from "lucide-react";
import Image from "next/image";

// ==========================================
// 1. HERO CORPORATIVO
// ==========================================
const HeroCorporativo = () => {
  const bgImg = "/assets/img/07_Landing_Nosotros/banner_nosotros.webp";
  
  return (
    <section className="relative w-full min-h-[70dvh] md:min-h-[700px] flex items-center justify-center overflow-hidden bg-slate-950 pt-20 md:pt-0">
      <div className="absolute inset-0 z-0">
        <Image src={bgImg} alt="SIGSA Corporativo" fill className="object-cover opacity-40 mix-blend-luminosity" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950/90 z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 w-full mt-10 md:mt-0 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="font-sans font-bold text-[#00ffff] tracking-[0.3em] uppercase mb-4 md:mb-6 block text-xs md:text-sm">
            Identidad Corporativa
          </span>
          <h1 className="font-poppins font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-6 md:mb-8 uppercase tracking-tighter">
            Innovación y <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#0b3d91]">Precisión Geoespacial</span>
          </h1>
          <p className="font-sans text-white/80 text-base sm:text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
            Conoce el propósito, la infraestructura y el compromiso que hacen de SIGSA el referente nacional en soluciones tecnológicas de alta precisión.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================
// 2. ADN 
// ==========================================
const NuestroADN = () => {
  return (
    <section className="py-20 md:py-32 px-6 md:px-8 bg-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <span className="font-sans font-bold text-[#0B3D91] tracking-[0.3em] uppercase text-xs mb-3 block">Filosofía</span>
          <h2 className="font-poppins font-black text-3xl md:text-5xl text-slate-900 uppercase tracking-tighter">
            Nuestro <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B3D91] to-[#00ffff]">ADN</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Target size={120} />
            </div>
            <Target size={40} className="text-[#0B3D91] mb-6" />
            <h3 className="font-poppins font-black text-3xl text-slate-900 uppercase tracking-tighter mb-4">Misión</h3>
            <p className="font-sans text-slate-600 text-lg md:text-xl leading-relaxed font-light">
              Brindar soluciones integrales e innovadoras, superando las expectativas de nuestros clientes a través de un servicio de calidad y precisión técnica.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0B3D91] rounded-[2rem] p-8 md:p-12 shadow-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Eye size={120} className="text-white" />
            </div>
            <Eye size={40} className="text-[#00ffff] mb-6" />
            <h3 className="font-poppins font-black text-3xl text-white uppercase tracking-tighter mb-4">Visión</h3>
            <p className="font-sans text-white/90 text-lg md:text-xl leading-relaxed font-light">
              Consolidarnos como la empresa líder en el sector, reconocida por nuestra capacidad de adaptación, excelencia operativa y compromiso con el desarrollo de México.
            </p>
          </motion.div>
        </div>

        <div>
          <h3 className="font-poppins font-black text-2xl md:text-3xl text-slate-900 uppercase tracking-tighter text-center mb-10">Valores Fundamentales</h3>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { Icon: Ruler, title: "Precisión", desc: "Rigor técnico y exactitud en cada detalle de nuestros procesos." },
              { Icon: Lightbulb, title: "Innovación", desc: "Implementación constante de tecnologías de punta." },
              { Icon: Handshake, title: "Compromiso", desc: "Dedicación total al éxito de nuestros aliados y clientes." }
            ].map((v, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center p-8 bg-white rounded-[1.5rem] border border-slate-100 hover:border-[#00ffff]/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto bg-slate-50 text-[#0B3D91] rounded-full flex items-center justify-center mb-6">
                  <v.Icon size={32} strokeWidth={1.5} />
                </div>
                <h4 className="font-poppins font-black text-xl text-slate-900 uppercase tracking-tighter mb-3">{v.title}</h4>
                <p className="font-sans text-slate-500 text-base">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 3. NUESTRAS OFICINAS
// ==========================================
const NuestrasOficinas = () => {
  const oficinas = [
    { city: "CDMX", img: "/assets/img/07_Landing_Nosotros/sucursales/cdmx.webp", desc: "Sede Corporativa Central" },
    { city: "Tulancingo", img: "/assets/img/07_Landing_Nosotros/sucursales/tulancingo.webp", desc: "Centro Operativo" },
    { city: "Puebla", img: "/assets/img/07_Landing_Nosotros/sucursales/puebla.jpg", desc: "Desarrollo Regional" },
    { city: "Villahermosa", img: "/assets/img/07_Landing_Nosotros/sucursales/VillaHermosa.jpg", desc: "Operaciones Sureste" }
  ];

  return (
    <section className="py-20 md:py-32 pl-6 pr-0 md:px-8 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-4 pr-6 md:pr-0">
          <div>
            <span className="font-sans font-bold text-[#0B3D91] tracking-[0.3em] uppercase text-xs mb-3 block">Infraestructura</span>
            <h2 className="font-poppins font-black text-3xl md:text-5xl text-slate-900 uppercase tracking-tighter">
              Nuestras <span className="text-[#0B3D91]">Oficinas</span>
            </h2>
          </div>
          <p className="font-sans text-slate-600 text-sm md:text-lg max-w-md">
            Presencia estratégica a nivel nacional para brindar soporte técnico, operativo y logístico de primer nivel a todos nuestros proyectos.
          </p>
        </div>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-4 gap-4 md:gap-6 hide-scrollbar pb-6 pr-6 md:pr-0">
          {oficinas.map((oficina, i) => (
            <div key={i} className="min-w-[280px] w-[80vw] md:w-auto h-[400px] md:h-[500px] snap-center group relative rounded-[2rem] overflow-hidden cursor-pointer shrink-0">
              <div className="absolute inset-0 bg-slate-200">
                <Image src={oficina.img} alt={oficina.city} fill sizes="(max-width: 768px) 80vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-full p-8 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 text-[#00ffff] mb-3">
                  <MapPin size={18} />
                  <span className="font-sans text-xs uppercase tracking-widest font-bold">{oficina.desc}</span>
                </div>
                {/* AQUÍ SE AJUSTÓ EL TAMAÑO A text-2xl md:text-3xl */}
                <h3 className="font-poppins font-black text-2xl md:text-3xl text-white uppercase">{oficina.city}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 4. RESPONSABILIDAD SOCIAL
// ==========================================
const ResponsabilidadSocial = () => {
  return (
    <section className="py-20 md:py-32 px-6 md:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <span className="font-sans font-bold tracking-[0.3em] uppercase text-xs mb-3 block text-[#0B3D91]">Compromiso</span>
          <h2 className="font-poppins font-black text-3xl md:text-5xl text-slate-900 uppercase tracking-tighter">
            Responsabilidad <span className="text-[#0B3D91]">Cultural y Social</span>
          </h2>
        </div>

        {/* Talavera */}
        <div className="bg-slate-950 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl mb-16 md:mb-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.08)_0%,_transparent_70%)]" />
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
            <motion.div 
              animate={{ y: [-10, 10, -10] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
              className="relative aspect-square w-full max-w-[300px] md:max-w-md mx-auto lg:mx-0 order-2 lg:order-1"
            >
              <div className="absolute inset-0 border-2 border-[#00ffff]/20 rounded-[2rem] transform -translate-x-4 translate-y-4" />
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <Image src="/assets/img/07_Landing_Nosotros/IMG_TALAVERA.webp" alt="Talavera" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-90" />
              </div>
            </motion.div>
            
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#00ffff] animate-pulse" />
                <span className="font-sans font-bold text-slate-300 tracking-[0.2em] uppercase text-xs">Apoyo Cultural</span>
              </div>
              <h3 className="font-poppins font-black text-4xl md:text-5xl mb-6 text-white uppercase tracking-tighter">
                Talavera <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 font-light">de la luz</span>
              </h3>
              <p className="font-sans text-slate-400 text-base md:text-lg leading-relaxed mb-8 font-light max-w-lg mx-auto lg:mx-0">
                Nuestra colaboración representa la unión perfecta entre la precisión técnica de la ingeniería moderna y la perfección artesanal histórica de México. Preservamos las tradiciones mientras construimos el futuro.
              </p>
            </div>
          </div>
        </div>

        {/* Viveros SIGSA - DISEÑO ADAPTATIVO (MÓVIL / PC) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full flex flex-col md:items-center md:justify-center bg-white md:bg-slate-100/50 rounded-[2rem] md:rounded-[3rem] md:overflow-hidden md:border md:border-slate-100 md:shadow-inner md:min-h-[800px] py-10 md:p-0"
        >
          {/* PC: Fondo Constelación Animada (Oculto en móvil) */}
          <div className="hidden md:block absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <ViverosAnimatedCollagePC />
          </div>

          {/* Tarjeta Central de Contenido */}
          {/* En Móvil: Fondo blanco, texto a la izquierda. En PC: Glassmorphism centrado. */}
          <div className="relative z-10 w-full md:max-w-3xl md:p-14 md:bg-white/70 md:backdrop-blur-xl md:border md:border-white/80 md:shadow-[0_8px_32px_rgba(0,0,0,0.08)] md:rounded-[2rem] flex flex-col items-start md:items-center text-left md:text-center">
            
            <span className="font-sans font-bold text-emerald-600 tracking-[0.3em] uppercase mb-4 block text-[10px] md:text-xs border-l-2 border-emerald-600 pl-3 md:border-0 md:pl-0">
              Impacto Ambiental
            </span>
            
            <h3 className="font-poppins font-black text-4xl sm:text-5xl md:text-6xl text-slate-900 mb-4 md:mb-6 tracking-tighter uppercase">
              Viveros <br className="md:hidden"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">SIGSA</span>
            </h3>
            
            <p className="font-sans text-slate-600 md:text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed mb-8 md:mb-10 md:max-w-xl">
              No solo analizamos el terreno, lo restauramos. A través de nuestros viveros, cultivamos y reforestamos áreas clave para garantizar un impacto ecológico positivo continuo.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 w-full">
              {[
                { icon: <Sprout size={20} />, title: "Producción", desc: "Especies nativas." }, 
                { icon: <Trees size={20} />, title: "Reforestación", desc: "Plantación masiva." }, 
                { icon: <Globe size={20} />, title: "Sostenibilidad", desc: "Monitoreo constante." }
              ].map((item, i) => (
                <div key={i} className="flex flex-row md:flex-col items-center md:items-center p-4 bg-slate-50 md:bg-white/60 rounded-2xl border border-slate-100 md:border-white/50 hover:bg-white hover:shadow-md transition-all duration-300 gap-4 md:gap-0">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl md:mb-3 shrink-0">{item.icon}</div>
                  <div className="text-left md:text-center">
                    <h4 className="font-poppins font-bold text-sm text-slate-900 mb-0.5 md:mb-1">{item.title}</h4>
                    <p className="font-sans text-slate-500 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Móvil: Cuadrícula Bento de Imágenes (Oculto en PC) */}
          <div className="md:hidden w-full mt-10">
            <ViverosMobileGrid />
          </div>

        </motion.div>

      </div>
    </section>
  );
};

// ==========================================
// 4.1 COLLAGE ANIMADO - PC (Constelación)
// ==========================================
const ViverosAnimatedCollagePC = () => {
  const imagesData = [
    { id: 1, class: "w-56 h-56 top-[5%] left-[5%]" },
    { id: 2, class: "w-48 h-64 top-[8%] right-[8%]" },
    { id: 3, class: "w-64 h-48 bottom-[10%] left-[6%]" },
    { id: 4, class: "w-56 h-56 bottom-[5%] right-[5%]" },
    { id: 5, class: "w-40 h-40 top-[40%] left-[2%]" },
    { id: 6, class: "w-44 h-44 top-[45%] right-[2%]" },
    { id: 7, class: "w-48 h-32 top-[2%] left-[35%] -z-10" },
    { id: 8, class: "w-40 h-40 bottom-[2%] left-[45%] -z-10" },
    { id: 9, class: "w-32 h-32 top-[20%] left-[25%] -z-10 blur-[2px]" },
  ];

  return (
    <>
      {imagesData.map((img, i) => {
        const floatDelay = [0, 4, 2, 6, 1, 5, 3, 7, 2][i];
        const floatDuration = [10, 12, 14, 11, 13, 15, 10, 12, 14][i];
        const opacityPeak = img.id === 9 ? 0.3 : 0.6; 

        return (
          <motion.div
            key={img.id}
            className={`absolute rounded-[2rem] overflow-hidden shadow-xl ${img.class}`}
            animate={{ 
              opacity: [0, opacityPeak, 0],
              scale: [0.9, 1, 0.9],
              y: [15, -15, 15] 
            }}
            transition={{ duration: floatDuration, repeat: Infinity, delay: floatDelay, ease: "easeInOut" }}
          >
            <Image src={`/assets/img/07_Landing_Nosotros/viveros/0${img.id}.webp`} alt={`Viveros SIGSA ${img.id}`} fill sizes="20vw" className="object-cover" />
          </motion.div>
        );
      })}
    </>
  );
};

// ==========================================
// 4.2 CUADRÍCULA BENTO - MÓVIL
// ==========================================
const ViverosMobileGrid = () => {
  // Un arreglo curado para que encaje perfecto en un Grid de 2 columnas
  const bentoLayout = [
    { id: 1, class: "col-span-2 row-span-2 h-56" }, // Principal (Ancha y alta)
    { id: 2, class: "col-span-1 row-span-1 h-36" }, // Cuadrada
    { id: 3, class: "col-span-1 row-span-1 h-36" }, // Cuadrada
    { id: 4, class: "col-span-2 row-span-1 h-40" }, // Horizontal inferior
  ];

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {bentoLayout.map((img, index) => (
        <motion.div
          key={img.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          className={`relative rounded-2xl overflow-hidden shadow-sm bg-slate-200 ${img.class}`}
        >
          {/* Animación continua de zoom lento (Ken Burns) muy sutil */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 15 + index * 2, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
          >
            <Image 
              src={`/assets/img/07_Landing_Nosotros/viveros/0${img.id}.webp`} 
              alt={`Viveros SIGSA Móvil ${img.id}`} 
              fill 
              sizes="50vw"
              className="object-cover" 
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function NosotrosLanding() {
  return (
    <div className="relative text-left bg-slate-50 text-slate-900 selection:bg-[#0B3D91]/20 selection:text-[#0B3D91]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Space+Grotesk:wght@400;500;700;900&display=swap');
        .font-poppins { font-family: 'Space Grotesk', sans-serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <HeroCorporativo />
      <NuestroADN />
      <NuestrasOficinas />
      <ResponsabilidadSocial />
      
      
    </div>
  );
}