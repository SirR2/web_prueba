"use client";

import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SchedulingModal from "./SchedulingModal";
import { Calendar } from "lucide-react";

export default function GlobalUI({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Ocultar si estamos muy arriba (viendo el Hero Banner)
      // Ajusta este valor (400) según el alto de tu Hero
      const isAtTop = window.scrollY < 400;

      // 2. Ocultar si estamos muy abajo (llegando al Footer)
      // Comparamos el scroll actual + el alto de la ventana contra el total del documento
      // Ajusta este valor (600) según qué tan alto sea tu Footer final
      const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 600);

      // 3. Evaluar visibilidad
      if (isAtTop || isAtBottom) {
        setShowFloatingButton(false);
      } else {
        setShowFloatingButton(true);
      }
    };

    // Revisar la posición apenas cargue la página
    handleScroll();

    // Activar el sensor cada vez que el usuario haga scroll
    window.addEventListener("scroll", handleScroll);
    
    // Limpieza de seguridad para optimizar memoria
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header global */}
      <Header onContactClick={() => setIsModalOpen(true)} />
      
      {/* Todo el contenido de tus páginas (Hero, Cards, etc.) se inyectará aquí */}
      <main>
        {children}
      </main>

      {/* Footer global */}
      <Footer />
      
      {/* Modal global */}
      <SchedulingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Botón flotante global */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className={`fixed z-[90] bg-[#0B3D91] text-white font-sans font-bold shadow-2xl flex items-center justify-center transition-all duration-300
          
          /* === POSICIÓN Y ESTILOS MÓVIL (Ícono Circular) === */
          bottom-6 right-6 w-14 h-14 rounded-full p-0
          
          /* === POSICIÓN Y ESTILOS ESCRITORIO (Botón Expandido) === */
          md:bottom-8 md:right-8 md:w-auto md:px-8 md:py-4 md:gap-3 md:hover:scale-105 md:hover:-translate-y-2
          
          /* === LÓGICA DE VISIBILIDAD (Aparecer/Desaparecer suavemente) === */
          ${showFloatingButton 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-10 pointer-events-none'
          }
        `}
      >
        <Calendar size={20} className="shrink-0" /> 
        {/* El texto solo aparece en pantallas medianas (md) hacia arriba */}
        <span className="hidden md:inline whitespace-nowrap">Agendar Asesoría</span>
      </button>
    </>
  );
}