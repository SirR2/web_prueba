"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Map, Settings, Compass } from "lucide-react";

export default function EnDesarrollo() {
  return (
    <main className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-slate-900 selection:bg-[#00ffff] selection:text-[#0B3D91]">
      {/* Estilos tipográficos en caso de usarse como página independiente */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@700;900&display=swap');
        .font-poppins { font-family: 'Space Grotesk', sans-serif; }
        .font-sans { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* ==========================================
          FONDOS Y EFECTOS ATMOSFÉRICOS
      ========================================== */}
      {/* Patrón de cuadrícula de fondo simulando cartografía */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Luces desenfocadas (Glows) */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#00ffff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0B3D91]/20 rounded-full blur-[150px] pointer-events-none" />

      {/* ==========================================
          CONTENEDOR CENTRAL
      ========================================== */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Elemento gráfico animado */}
        <div className="relative mb-12">
          {/* Círculos pulsantes de fondo */}
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }} 
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#00ffff] rounded-full blur-xl"
          />
          
          <motion.div 
            animate={{ y: [-10, 10, -10] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-32 h-32 md:w-40 md:h-40 bg-slate-800/80 backdrop-blur-md rounded-[2.5rem] border border-slate-700/50 shadow-2xl shadow-[#00ffff]/10 flex items-center justify-center group overflow-hidden"
          >
            {/* Engranaje girando lentamente en el fondo del ícono */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute text-slate-700/30"
            >
              <Settings size={120} strokeWidth={1} />
            </motion.div>
            
            {/* Ícono principal estático */}
            <Map size={56} className="text-[#00ffff] relative z-10 group-hover:scale-110 transition-transform duration-500" />
            
            {/* Brújula flotante pequeña */}
            <motion.div 
              animate={{ rotate: [-10, 10, -10] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-4 right-4 bg-slate-900 p-2 rounded-xl border border-slate-700 text-white z-20"
            >
              <Compass size={20} />
            </motion.div>
          </motion.div>
        </div>

        {/* Textos principales */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00ffff]/20 bg-[#00ffff]/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00ffff] animate-pulse" />
            <span className="font-sans font-bold text-[#00ffff] tracking-[0.2em] uppercase text-[10px] md:text-xs">
              Sección en Desarrollo
            </span>
          </span>

          <h1 className="font-poppins font-black text-4xl md:text-6xl text-white tracking-tighter leading-[1.1] mb-6">
            ESTAMOS CREANDO <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00ffff]/60">
              NUEVO CONTENIDO
            </span>
          </h1>

          <p className="font-sans text-slate-400 text-base md:text-xl max-w-xl mx-auto leading-relaxed mb-10 font-light">
            Nuestro equipo está deswarrollando y ajustando el contenido de este apartado para brindarte herramientas, datos e informacion adaptadas a tus necesidades.
          </p>
        </motion.div>

        {/* Botón de regreso */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Cambia la etiqueta <a> por <Link href="/"> si estás usando Next.js App/Pages router */}
          <a 
            href="/" 
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-sans font-bold text-sm tracking-widest uppercase overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white via-[#00ffff]/20 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <ChevronLeft size={18} className="relative z-10 group-hover:-translate-x-1 transition-transform" />
            <span className="relative z-10">Regresar al inicio</span>
          </a>
        </motion.div>

      </div>
    </main>
  );
}