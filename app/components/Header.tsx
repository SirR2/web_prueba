"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Menu, ArrowRight, Layers, Building2, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  desc: string;
}

export default function Header({ onContactClick }: { onContactClick: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Mobile states
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(true); // Abierto por defecto para invitar a interactuar
  const [isMobileNosotrosOpen, setIsMobileNosotrosOpen] = useState(false);
  
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Control del Sticky Header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsHeaderVisible(false);
        setActiveDropdown(null);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Bloquear scroll de la página cuando el menú está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    // Limpieza al desmontar
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  // Data de Navegación
  const solucionesCol1: NavItem[] = [
    { name: "Proyecto México", href: "/proyecto-mexico", desc: "Cartografía nacional base" },
    { name: "SERVERBOX", href: "/serverbox", desc: "Portal ejecutivo de control" },
    { name: "SMART TWIN", href: "/smart-twin", desc: "Plataforma de Gemelos Digitales" },
    { name: "Mapa Móvil", href: "/mapa-movil", desc: "Software para colecta de datos GIS" },
  ];

  const solucionesCol2: NavItem[] = [
    { name: "Percepción Remota", href: "/percepcion-remota", desc: "Análisis satelital y de radar" },
    { name: "ESRI", href: "https://www.esri.mx/es-mx/home", desc: "Software de GIS" },
  ];

  const nosotrosOptions: NavItem[] = [
    { name: "Identidad Corporativa", href: "/nosotros", desc: "Conoce nuestro ADN e infraestructura" },
    { name: "Únete al Equipo", href: "/EnDesarrollo", desc: "Vacantes y cultura laboral" }
  ];

  const renderDropdownItem = (producto: NavItem) => {
    const isActive = pathname === producto.href;
    const isExternal = producto.href.startsWith('http');
    
    return (
      <Link 
        key={producto.name} 
        href={producto.href} 
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onClick={closeMenus}
        className={`p-3 rounded-xl transition-all duration-200 flex flex-col gap-1 group/item ${
          isActive ? 'bg-slate-50' : 'hover:bg-slate-50'
        }`}
      >
        <span className={`text-[13px] uppercase tracking-wider flex items-center justify-between font-bold ${
          isActive ? 'text-[#0B3D91]' : 'text-slate-700 group-hover/item:text-[#0B3D91]'
        }`}>
          {producto.name}
          <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
            isActive ? 'translate-x-0 opacity-100 text-[#0B3D91]' : '-translate-x-2 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100'
          }`} />
        </span>
        <span className="text-xs text-slate-500 font-medium">{producto.desc}</span>
      </Link>
    );
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: isHeaderVisible || isMobileMenuOpen ? 0 : -100 }} 
        transition={{ duration: 0.3 }}
        className="font-sans fixed top-0 left-0 w-full z-[100]"
      >
        
        {/* BARRA SUPERIOR (NAVBAR DESKTOP & MOBILE) */}
        <div className="relative w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm z-[50]">
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-2 md:py-3 flex justify-between items-center">
            
            {/* Logo */}
            <Link href="/" className="relative block h-16 w-[220px] md:h-20 md:w-[300px] hover:opacity-80 transition-opacity" onClick={closeMenus}>
              <Image 
                src="/assets/img/01_LANDING_SIGSA/LOGO_SIG_AZU.png" 
                alt="SIGSA Logo" 
                fill 
                sizes="(max-width: 768px) 220px, 300px"
                className="object-contain object-left" 
                priority 
              />
            </Link>

            {/* Navegación Desktop */}
            <nav className="hidden lg:flex items-center gap-10 text-[15px] font-bold text-slate-600">
              <Link href="/" className={`${pathname === '/' ? 'text-[#0B3D91]' : 'hover:text-[#0B3D91] transition-colors'}`}>Inicio</Link>
              
              {/* Dropdown Soluciones */}
              <div 
                className="relative h-full py-4"
                onMouseEnter={() => setActiveDropdown('soluciones')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <span className={`flex items-center gap-1.5 cursor-pointer ${activeDropdown === 'soluciones' || pathname.includes('soluciones') ? 'text-[#0B3D91]' : 'hover:text-[#0B3D91]'}`}>
                  Soluciones y Servicios <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'soluciones' ? 'rotate-180' : ''}`} />
                </span>
                
                <AnimatePresence>
                  {activeDropdown === 'soluciones' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white border border-slate-100 rounded-2xl shadow-xl p-4 flex gap-4"
                    >
                      <div className="flex-1 flex flex-col gap-1">{solucionesCol1.map(renderDropdownItem)}</div>
                      <div className="w-[1px] bg-slate-100 my-2"></div>
                      <div className="flex-1 flex flex-col gap-1">{solucionesCol2.map(renderDropdownItem)}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dropdown Nosotros */}
              <div 
                className="relative h-full py-4"
                onMouseEnter={() => setActiveDropdown('nosotros')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <span className={`flex items-center gap-1.5 cursor-pointer ${activeDropdown === 'nosotros' || pathname.includes('nosotros') ? 'text-[#0B3D91]' : 'hover:text-[#0B3D91]'}`}>
                  Nosotros <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'nosotros' ? 'rotate-180' : ''}`} />
                </span>
                
                <AnimatePresence>
                  {activeDropdown === 'nosotros' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] bg-white border border-slate-100 rounded-2xl shadow-xl p-4 flex flex-col gap-1"
                    >
                      {nosotrosOptions.map(renderDropdownItem)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Botón Desktop */}
            <div className="hidden lg:block">
              <button 
                onClick={() => { closeMenus(); onContactClick(); }} 
                className="bg-[#0B3D91] text-white px-8 py-3 rounded-full font-bold text-[14px] hover:bg-[#051e47] hover:scale-105 transition-all duration-300 shadow-md uppercase tracking-wider"
              >
                Contacto
              </button>
            </div>

            {/* Menú de Hamburguesa Móvil */}
            <button 
              className="lg:hidden relative p-2.5 text-[#0B3D91] bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            MENU MÓVIL HÍBRIDO (Ancho parcial + Sombra profunda + Curvas + Cards)
        ========================================================================= */}
        
        {/* Fondo oscuro (Backdrop) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenus}
              className="absolute top-0 left-0 w-full h-[100dvh] bg-slate-900/40 backdrop-blur-sm z-[90] lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Panel lateral derecho (Drawer Curvo) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              // Animación fluida estilo Apple
              transition={{ type: "tween", duration: 0.35, ease: [0.25, 1, 0.5, 1] }} 
              // Aquí está la magia: w-[88%] deja ver el fondo, rounded-l-[2rem] hace la curva profunda, shadow enorme
              className="absolute top-0 right-0 w-[88%] sm:w-[380px] h-[100dvh] bg-white z-[100] shadow-[-30px_0_60px_-15px_rgba(0,0,0,0.4)] flex flex-col lg:hidden overflow-hidden rounded-l-[2rem]"
            >
              
              {/* Encabezado del menú móvil con Logo Integrado */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100/80 bg-white/90 backdrop-blur-md">
                <Link href="/" className="relative block h-10 w-[140px]" onClick={closeMenus}>
                  <Image 
                    src="/assets/img/01_LANDING_SIGSA/LOGO_SIG_AZU.png" 
                    alt="SIGSA Logo" 
                    fill 
                    className="object-contain object-left" 
                    priority 
                  />
                </Link>
                <button onClick={closeMenus} className="p-2.5 bg-slate-100/80 rounded-full text-slate-600 hover:bg-slate-200 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Opciones del menú móvil (Diseño Micro-Cards) */}
              <div className="flex flex-col p-6 gap-5 overflow-y-auto flex-1 pb-24">
                
                <Link 
                  href="/" 
                  className={`text-[15px] font-black uppercase tracking-wider py-3 px-4 rounded-xl transition-all ${pathname === '/' ? 'bg-[#0B3D91]/10 text-[#0B3D91]' : 'text-slate-700 hover:bg-slate-50'}`} 
                  onClick={closeMenus}
                >
                  Inicio
                </Link>
                
                {/* Contenedor Acordeón Soluciones */}
                <div className="flex flex-col rounded-2xl bg-slate-50/50 border border-slate-100">
                  <button onClick={() => { setIsMobileProductsOpen(!isMobileProductsOpen); setIsMobileNosotrosOpen(false); }} className="flex items-center justify-between w-full p-4 hover:text-[#0B3D91] transition-colors">
                    <span className="font-bold text-[15px] text-slate-800 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-[#0B3D91]" /> Soluciones y Servicios
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isMobileProductsOpen ? 'rotate-180 text-[#0B3D91]' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isMobileProductsOpen && (
                      <motion.div key="mobile-products" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="flex flex-col px-3 pb-3 gap-2">
                          {[...solucionesCol1, ...solucionesCol2].map((producto) => {
                            const isExternal = producto.href.startsWith('http');
                            const isSelected = pathname === producto.href;
                            
                            return (
                              <Link 
                                key={producto.name} 
                                href={producto.href}
                                target={isExternal ? "_blank" : "_self"}
                                onClick={closeMenus} 
                                className={`p-3 rounded-xl border transition-all flex flex-col gap-0.5 ${isSelected ? 'bg-white border-[#0B3D91]/30 shadow-sm' : 'bg-white/80 border-slate-200/60 hover:border-slate-300 hover:shadow-sm'}`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className={`text-[13px] font-bold uppercase tracking-wide ${isSelected ? 'text-[#0B3D91]' : 'text-slate-700'}`}>{producto.name}</span>
                                  {isExternal ? <ExternalLink className="w-3.5 h-3.5 text-slate-400" /> : <ArrowRight className="w-3 h-3 text-slate-300" />}
                                </div>
                                <span className="text-xs text-slate-500 font-medium">{producto.desc}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Contenedor Acordeón Nosotros */}
                <div className="flex flex-col rounded-2xl bg-slate-50/50 border border-slate-100">
                  <button onClick={() => { setIsMobileNosotrosOpen(!isMobileNosotrosOpen); setIsMobileProductsOpen(false); }} className="flex items-center justify-between w-full p-4 hover:text-[#0B3D91] transition-colors">
                    <span className="font-bold text-[15px] text-slate-800 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#0B3D91]" /> Nosotros
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isMobileNosotrosOpen ? 'rotate-180 text-[#0B3D91]' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isMobileNosotrosOpen && (
                      <motion.div key="mobile-nosotros" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="flex flex-col px-3 pb-3 gap-2">
                          {nosotrosOptions.map((opcion) => (
                            <Link 
                              key={opcion.name} 
                              href={opcion.href} 
                              onClick={closeMenus} 
                              className={`p-3 rounded-xl border transition-all flex flex-col gap-0.5 ${pathname === opcion.href ? 'bg-white border-[#0B3D91]/30 shadow-sm' : 'bg-white/80 border-slate-200/60 hover:border-slate-300 hover:shadow-sm'}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`text-[13px] font-bold uppercase tracking-wide ${pathname === opcion.href ? 'text-[#0B3D91]' : 'text-slate-700'}`}>{opcion.name}</span>
                                <ArrowRight className="w-3 h-3 text-slate-300" />
                              </div>
                              <span className="text-xs text-slate-500 font-medium">{opcion.desc}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Botón CTA móvil Fijo en la parte inferior del Drawer */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white via-white to-transparent pt-10 border-t border-slate-50">
                <button 
                  onClick={() => { closeMenus(); onContactClick(); }} 
                  className="w-full bg-[#0B3D91] text-white py-4 rounded-xl font-bold text-[14px] uppercase tracking-widest shadow-lg shadow-[#0B3D91]/20 hover:bg-[#051e47] active:scale-[0.98] transition-all"
                >
                  Agendar Sesión
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}