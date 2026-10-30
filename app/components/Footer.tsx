import React from "react";
import Image from "next/image";
import Link from "next/link"; 
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { name: 'In', href: 'https://www.linkedin.com/company/sistemas-de-informacion-geografica/' },
    { name: 'Fb', href: 'https://www.facebook.com/people/SIGSA-Sistemas-de-Informaci%C3%B3n-Geogr%C3%A1fica-SA-de-CV/61577805703966/?locale=es_LA' },
    { name: 'Yt', href: 'https://www.youtube.com/@SIGSA-SistemasdeInformaci%C3%B3nGeo' }
  ];

  const solutionLinks = [
    { name: 'Proyecto México', href: "/proyecto-mexico" },
    { name: 'Smart Twin', href: "/smart-twin" },
    { name: 'Serverbox', href: "/serverbox" },
    { name: 'Mapa Móvil', href: "/mapa-movil" },
    { name: 'Percepción Remota', href: "/percepcion-remota" }
  ];

  return (
    <footer className="bg-slate-900 pt-20 pb-8 px-6 md:px-12 relative overflow-hidden text-white border-t border-slate-800">
      
      {/* Destello muy sutil centrado para no robar atención */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00ffff]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 relative z-10">
        
        {/* Columna Marca */}
        <div className="flex flex-col gap-6 md:col-span-5 pr-0 md:pr-12">
          <div className="relative w-48 h-16 md:w-56 md:h-20">
            <Image src="/assets/img/01_LANDING_SIGSA/logo_sigsa_3D.png" alt="SIGSA" fill className="object-contain object-left" />
          </div>
          <p className="font-sans text-slate-400 text-base leading-relaxed">
            Innovación y consultoría estratégica para el crecimiento de tu negocio. Integramos tecnología geoespacial y gemelos digitales de última generación.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400 hover:text-[#0B3D91] hover:border-[#00ffff] hover:bg-[#00ffff] transition-all duration-300 font-sans text-xs font-bold"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Columna Navegación Rápida */}
        <div className="md:col-span-3">
          <h4 className="font-poppins font-bold text-xl mb-6 text-white">
            Soluciones
          </h4>
          <ul className="flex flex-col gap-4 font-sans text-slate-400 font-medium text-sm">
            {solutionLinks.map((link, i) => (
              <li key={i}>
                <Link href={link.href} className="flex items-center gap-2 hover:text-white transition-colors group w-fit">
                  <span className="transform group-hover:translate-x-1 transition-transform">{link.name}</span>
                  <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#00ffff]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna Contacto */}
        <div className="md:col-span-4">
          <h4 className="font-poppins font-bold text-xl mb-6 text-white">
            Contacto
          </h4>
          <div className="flex flex-col gap-5 font-sans text-slate-400 text-sm">
            <a href="mailto:soluciones@sigsa.com.mx" className="flex items-center gap-4 hover:text-white transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:border-[#00ffff] group-hover:text-[#00ffff] transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white uppercase tracking-widest text-[10px]">Email Corporativo</span>
                soluciones@sigsa.com.mx
              </div>
            </a>
            <div className="flex items-center gap-4 group cursor-default">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white uppercase tracking-widest text-[10px]">Sede Central</span>
                Ciudad de México, México
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="w-full h-px bg-slate-800 mb-6" />

      {/* Copyright Bar & Legal Documents */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 font-sans text-xs font-bold tracking-widest text-slate-500 uppercase text-center md:text-left">
        <p>© 2026 SIGSA. Todos los derechos reservados.</p>
        
        {/* Usamos <a> nativos con target="_blank" para que los PDFs se abran en una nueva pestaña del visor del navegador */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
          <a 
            href="/docs/aviso-privacidad-sigsa2026.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white transition-colors"
          >
            Aviso de Privacidad
          </a>
          <a 
            href="/docs/politica-datos-personales-sigsa2026.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white transition-colors"
          >
            Protección de Datos
          </a>
          <a 
            href="/docs/terminos-y-condiciones-sigsa2026.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white transition-colors"
          >
            Términos y Condiciones
          </a>
        </div>
      </div>
    </footer>
  );
}