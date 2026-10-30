"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { 
  ChevronLeft, ChevronRight, Quote, Plus, Minus, ArrowUpRight, 
  X, UploadCloud, CheckCircle, GraduationCap, Rocket, Map, HeartHandshake
} from "lucide-react";
import Image from "next/image";

// ==========================================
// 1. HERO TALENTO
// ==========================================
const HeroTalento = () => {
  const bgImg = "/assets/img/07_Landing_Nosotros/equipo.jpg"; // Usamos una imagen de equipo
  
  return (
    <section className="relative w-full min-h-[70dvh] md:min-h-[700px] flex items-center justify-center overflow-hidden bg-slate-950 pt-20 md:pt-0">
      <div className="absolute inset-0 z-0">
        <Image src={bgImg} alt="Equipo SIGSA" fill className="object-cover opacity-30 mix-blend-luminosity" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-[#0B3D91]/50 to-slate-950/90 z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 w-full mt-10 md:mt-0 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="font-sans font-bold text-[#00ffff] tracking-[0.3em] uppercase mb-4 md:mb-6 block text-xs md:text-sm">
            Vida en SIGSA
          </span>
          <h1 className="font-space font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-6 md:mb-8 uppercase tracking-tighter">
            El Talento Detrás <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-white">De La Innovación</span>
          </h1>
          <p className="font-sans text-white/80 text-base sm:text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
            Únete a un equipo multidisciplinario donde la precisión técnica se encuentra con la pasión por transformar el entorno. Construye tu futuro con nosotros.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// ==========================================
// 2. BENEFICIOS: ¿POR QUÉ ELEGIR SIGSA?
// ==========================================
const Beneficios = () => {
  const beneficios = [
    { icon: <GraduationCap size={32} />, title: "Capacitación Continua", desc: "Planes de desarrollo y certificaciones constantes para mantenerte a la vanguardia." },
    { icon: <Rocket size={32} />, title: "Tecnología de Punta", desc: "Acceso a equipos LiDAR, radares y software de última generación en todos tus proyectos." },
    { icon: <Map size={32} />, title: "Impacto Nacional", desc: "Participa en proyectos críticos que definen la infraestructura y el desarrollo de México." },
    { icon: <HeartHandshake size={32} />, title: "Cultura Colaborativa", desc: "Un ambiente donde tus ideas son escuchadas y el trabajo en equipo es nuestra mayor fortaleza." }
  ];

  return (
    <section className="py-20 md:py-32 px-6 md:px-8 bg-white relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-sans font-bold text-[#0B3D91] tracking-[0.3em] uppercase text-xs mb-3 block">Propuesta de Valor</span>
          <h2 className="font-space font-black text-3xl md:text-5xl text-slate-900 uppercase tracking-tighter">
            ¿Por qué elegir <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B3D91] to-[#00ffff]">SIGSA?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {beneficios.map((b, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-[#0B3D91]/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-white text-[#0B3D91] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[#0B3D91] group-hover:text-white transition-all duration-500">
                {b.icon}
              </div>
              <h3 className="font-space font-bold text-xl text-slate-900 mb-3">{b.title}</h3>
              <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 3. NUESTRA GENTE (Testimonios)
// ==========================================
const NuestraGente = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const team = [
    { name: "Arturo Yael", role: "Especialista 3D", quote: "En SIGSA aprendí que la precisión de nuestros entornos digitales es vital para tomar decisiones del mundo real. Transformamos datos en experiencias inmersivas.", img: "/assets/img/07_Landing_Nosotros/equipo.jpg" },
    { name: "Nermina Avdic", role: "Directora de Calidad", quote: "He aprendido que no necesito un título para lograr lo que quiero, y que el cambio es posible. SIGSA apoya constantemente mis ideas.", img: "/assets/img/07_Landing_Nosotros/cultura.JPG" },
    { name: "Carlos Mendoza", role: "Ingeniero Geodesta", quote: "La innovación constante en tecnología radar y LiDAR nos mantiene siempre un paso adelante. Es un reto diario que disfruto intensamente.", img: "/assets/img/07_Landing_Nosotros/equipo.jpg" }
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % team.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + team.length) % team.length);

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0B3D91]/20 via-slate-950 to-slate-950" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 md:mb-16 text-center">
          <span className="font-sans font-bold text-[#00ffff] tracking-[0.3em] uppercase text-xs mb-3 block">Nuestra Cultura</span>
          <h2 className="font-space font-black text-3xl md:text-5xl text-white uppercase tracking-tighter">
            Voces de nuestro <span className="text-[#0B3D91]">Equipo</span>
          </h2>
        </div>
        
        <div className="relative bg-white/5 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] p-6 pb-24 md:p-16 border border-white/10 shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex} 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -50 }} 
              transition={{ duration: 0.5, ease: "easeOut" }} 
              drag="x" 
              dragConstraints={{ left: 0, right: 0 }} 
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000 || offset.x < -100) nextSlide();
                else if (swipe > 10000 || offset.x > 100) prevSlide();
              }}
              className="grid md:grid-cols-12 gap-8 md:gap-16 items-center cursor-grab active:cursor-grabbing"
            >
              <div className="md:col-span-5 relative h-56 sm:h-72 md:h-auto md:aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-white/10 pointer-events-none">
                <Image src={team[currentIndex].img} alt={team[currentIndex].name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
              
              <div className="md:col-span-7 flex flex-col justify-center">
                <Quote size={40} className="text-[#00ffff]/40 mb-6" />
                <p className="font-sans text-lg sm:text-xl md:text-3xl text-white leading-relaxed font-light mb-8 md:mb-12 pointer-events-none">
                  "{team[currentIndex].quote}"
                </p>
                <div className="pointer-events-none">
                  <h4 className="font-space font-black text-2xl md:text-4xl text-white">{team[currentIndex].name}</h4>
                  <p className="font-sans text-[#00ffff] font-bold uppercase tracking-widest text-xs md:text-sm mt-2">{team[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute bottom-6 right-6 md:bottom-16 md:right-16 flex gap-3 z-10">
            <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#00ffff] hover:text-[#0B3D91] hover:border-[#00ffff] transition-all backdrop-blur-sm"><ChevronLeft size={24} /></button>
            <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#00ffff] hover:text-[#0B3D91] hover:border-[#00ffff] transition-all backdrop-blur-sm"><ChevronRight size={24} /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 4. VACANTES Y MODAL DE APLICACIÓN
// ==========================================
const Vacantes = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  // Estados Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState("");

  const vacantes = [
    { area: "Geofísica", titulo: "Especialista de Atlas de Riesgos", tipo: "Presencial", desc: "Realizar análisis de detección de derrames mediante imágenes de Radar. Elaborar simulaciones de avance de hidrocarburos sobre el mar hacia la costa." },
    { area: "Desarrollo", titulo: "Programador de Software", tipo: "Híbrido", desc: "Únete a la división de desarrollo para crear interfaces interactivas. Experiencia en HTML5, CSS, JavaScript, React/Next.js o Three.js valorada." },
    { area: "Geodesia", titulo: "Especialista en Fotogrametría", tipo: "Presencial", desc: "Responsable de la captura de datos en campo. Realizar la orientación de imágenes para elaboración de estereoscopía 3D." }
  ];

  const handleOpenModal = (titulo: string) => {
    setSelectedJob(titulo);
    setIsModalOpen(true);
    setIsSuccess(false);
    setFileName("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFileName(e.target.files[0].name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsModalOpen(false), 3000);
    }, 2000);
  };

  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  return (
    <section className="py-20 md:py-32 px-6 md:px-8 relative bg-slate-50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 md:gap-16">
        
        <div className="lg:col-span-5 flex flex-col justify-center text-center md:text-left lg:sticky lg:top-32 self-start">
          <span className="font-sans font-bold text-[#0B3D91] tracking-[0.3em] uppercase mb-4 block text-xs border-l-2 border-[#0B3D91] pl-3 md:mx-0 mx-auto w-fit">Oportunidades</span>
          <h2 className="font-space font-black text-4xl md:text-6xl mb-6 tracking-tighter text-slate-900">
            Construye el <br className="hidden md:block"/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B3D91] to-blue-500">Futuro.</span>
          </h2>
          <p className="font-sans text-slate-600 text-base md:text-lg leading-relaxed mb-8">
            Revisa nuestras vacantes actuales y encuentra el rol perfecto para desarrollar tu potencial. ¿No encuentras tu perfil? Envíanos tu CV de todas formas.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="border-t border-slate-200">
            {vacantes.map((vacante, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border-b border-slate-200">
                  <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full py-8 flex items-center justify-between text-left group">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                      <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-[#0B3D91] md:w-32">{vacante.area}</span>
                      <h3 className={`font-space text-xl md:text-2xl font-medium transition-colors pr-4 md:pr-0 ${isOpen ? 'text-[#0B3D91]' : 'text-slate-700 group-hover:text-slate-900'}`}>{vacante.titulo}</h3>
                    </div>
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all ${isOpen ? 'bg-[#0B3D91] text-white border-[#0B3D91]' : 'border-slate-300 text-slate-400 group-hover:border-[#0B3D91] group-hover:text-[#0B3D91]'}`}>
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="pb-8 md:pl-[10rem] flex flex-col md:flex-row justify-between gap-6 ml-2 md:ml-4 pl-4 md:pr-0 mb-4 items-start md:items-center border-l-2 border-[#0B3D91]/20">
                          <div className="flex-1">
                            <span className="inline-block px-3 py-1 bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">{vacante.tipo}</span>
                            <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">{vacante.desc}</p>
                          </div>
                          <button 
                            onClick={() => handleOpenModal(vacante.titulo)}
                            className="shrink-0 w-full md:w-fit h-fit px-8 py-3 rounded-full bg-slate-900 text-white hover:bg-[#0B3D91] transition-all font-sans font-bold text-[13px] uppercase tracking-widest flex items-center justify-center gap-2"
                          >
                            Aplicar <ArrowUpRight size={18} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 md:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-[2rem] shadow-2xl flex flex-col hide-scrollbar">
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-100 sticky top-0 bg-white z-10">
                <div>
                  <span className="font-sans text-[#0B3D91] text-[10px] uppercase tracking-widest font-bold">Aplicación a Vacante</span>
                  <h3 className="font-space font-bold text-xl md:text-2xl text-slate-900 mt-1">{selectedJob}</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-50 hover:bg-slate-200 text-slate-600 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 md:p-8">
                {isSuccess ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={40} />
                    </div>
                    <h4 className="font-space font-bold text-3xl text-slate-900 mb-3">¡Aplicación Enviada!</h4>
                    <p className="font-sans text-slate-600 text-lg">Nuestro equipo de Talento revisará tu perfil y se pondrá en contacto pronto.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider">Nombre Completo</label>
                        <input required type="text" placeholder="Ej. Juan Pérez" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-sans outline-none focus:border-[#0B3D91] focus:bg-white transition-colors" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider">Teléfono</label>
                        <input required type="tel" placeholder="55 1234 5678" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-sans outline-none focus:border-[#0B3D91] focus:bg-white transition-colors" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider">Correo Electrónico</label>
                      <input required type="email" placeholder="juan@correo.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-sans outline-none focus:border-[#0B3D91] focus:bg-white transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider">Perfil LinkedIn (Opcional)</label>
                      <input type="url" placeholder="https://linkedin.com/in/usuario" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-sans outline-none focus:border-[#0B3D91] focus:bg-white transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                      <label className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider">Adjuntar CV (PDF)</label>
                      <div className="relative w-full border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-100 hover:border-[#0B3D91]/50 transition-colors cursor-pointer group">
                        <input type="file" accept=".pdf,.doc,.docx" required onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <UploadCloud size={36} className="text-slate-400 group-hover:text-[#0B3D91] mb-3 transition-colors" />
                        {fileName ? (
                          <span className="font-sans text-sm text-[#0B3D91] font-bold truncate max-w-full px-4">{fileName}</span>
                        ) : (
                          <>
                            <span className="font-sans text-sm text-slate-700 font-bold mb-1">Haz clic o arrastra tu archivo aquí</span>
                            <span className="font-sans text-xs text-slate-400">Máximo 5MB (PDF)</span>
                          </>
                        )}
                      </div>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="mt-4 w-full bg-[#0B3D91] text-white py-4 md:py-5 rounded-xl font-sans font-bold text-sm uppercase tracking-widest hover:bg-slate-900 disabled:bg-slate-400 transition-colors flex items-center justify-center gap-2 shadow-lg">
                      {isSubmitting ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Enviar Aplicación"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function CarrerasLanding() {
  return (
    <div className="relative text-left bg-slate-50 text-slate-900 selection:bg-[#0B3D91]/20 selection:text-[#0B3D91]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Space+Grotesk:wght@400;500;700;900&display=swap');
        .font-space { font-family: 'Space Grotesk', sans-serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <HeroTalento />
      <Beneficios />
      <NuestraGente />
      <Vacantes />
    </div>
  );
}