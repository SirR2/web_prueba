"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar as CalendarIcon, Clock, ChevronRight, ChevronLeft, Send, Loader2, CheckCircle, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const countries = [
  { code: "+52", iso: "mx", label: "MX" },
  { code: "+1", iso: "us", label: "US" },
  { code: "+34", iso: "es", label: "ES" },
  { code: "+57", iso: "co", label: "CO" },
  { code: "+54", iso: "ar", label: "AR" },
  { code: "+56", iso: "cl", label: "CL" },
  { code: "+51", iso: "pe", label: "PE" }
];

export default function SchedulingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<"calendar" | "form">("calendar");
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  
  // Estados del formulario (100% sincronizados con HubSpot)
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [jobTitle, setJobTitle] = useState(""); 
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+52");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  
  // Estados para las casillas de verificación
  const [acceptComms, setAcceptComms] = useState(false);
  const [acceptData, setAcceptData] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
  const daysInMonth = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1).getDay();
  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  const themes = ["Gemelos Digitales", "Catastro", "Soluciones Serverbox", "Cartografía"];

  const isPrevDisabled = currentMonthDate.getMonth() === today.getMonth() && currentMonthDate.getFullYear() === today.getFullYear();
  const isNextDisabled = currentMonthDate.getMonth() === maxDate.getMonth() && currentMonthDate.getFullYear() === maxDate.getFullYear();

  const handlePrevMonth = () => {
    if (!isPrevDisabled) setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    if (!isNextDisabled) setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
  };

  const monthYearString = currentMonthDate.toLocaleString('es-MX', { month: 'long', year: 'numeric' });

  const toggleTheme = (theme: string) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes(selectedThemes.filter(t => t !== theme));
    } else if (selectedThemes.length < 2) {
      setSelectedThemes([...selectedThemes, theme]);
    }
  };

  const getFilteredTimes = () => {
    if (!selectedDate) return [];
    const isToday = selectedDate.toDateString() === new Date().toDateString();
    if (!isToday) return timeSlots;
    const currentHour = new Date().getHours();
    return timeSlots.filter(t => parseInt(t.split(":")[0]) > currentHour);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  };

  // Validación general: Todos los campos son obligatorios excepto "comment"
  const isFormComplete =
    Boolean(selectedDate) &&
    Boolean(selectedTime) &&
    name.trim() !== "" &&
    lastname.trim() !== "" &&
    jobTitle.trim() !== "" &&
    company.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "" &&
    selectedThemes.length > 0 &&
    acceptComms &&
    acceptData;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      date: selectedDate ? selectedDate.toISOString().split("T")[0] : "",
      time: selectedTime,
      themes: selectedThemes,
      comment: comment.trim(),
      acceptComms,
      acceptData
    };
    
    try {
      const response = await fetch('/api/hubspot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        console.warn("Detalle del error de HubSpot:", result);
        const errorDetail =
          result?.details?.errors?.[0]?.message ||
          result?.details?.message ||
          result?.error ||
          "Error en la respuesta del servidor";
        alert(`No se pudo enviar: ${errorDetail}`);
      }
    } catch (error) {
      console.warn("Hubo un error enviando los datos:", error);
      alert("Hubo un problema al enviar tu solicitud. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setStep("calendar");
      setSelectedDate(null);
      setSelectedTime(null);
      setSelectedThemes([]);
      setName("");
      setLastname("");
      setJobTitle(""); 
      setCompany("");
      setEmail("");
      setPhone("");
      setComment("");
      setCountryCode("+52");
      setAcceptComms(false); 
      setAcceptData(false);
      setShowDropdown(false);
      setIsSubmitting(false);
      setIsSuccess(false);
      
      const resetDate = new Date();
      setCurrentMonthDate(new Date(resetDate.getFullYear(), resetDate.getMonth(), 1));
    }
  }, [isOpen]); 

  const selectedCountry = countries.find(c => c.code === countryCode);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            onClick={onClose} 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-[95vh] md:h-[780px] bg-white rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden z-10"
          >
            <button type="button" onClick={onClose} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-slate-400 hover:text-[#0B3D91] bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:shadow-md transition-all z-50 border border-slate-100 cursor-pointer">
              <X size={20} />
            </button>
            
            {/* COLUMNA IZQUIERDA: MARCA */}
            <div className="w-full md:w-2/5 bg-slate-900 relative flex flex-col justify-between overflow-hidden shrink-0 hidden md:flex border-r border-slate-200">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,255,0.15)_0%,_transparent_60%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
              
              <div className="p-10 relative z-10">
                <div className="w-48 h-16 relative mb-12">
                  <Image src="/assets/img/01_LANDING_SIGSA/logo_sigsa_3D.png" alt="SIGSA" fill className="object-contain object-left drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                </div>
                <h3 className="font-poppins font-black text-4xl text-white mb-4 leading-tight">Sesión <br/><span className="text-[#00ffff]">Estratégica</span></h3>
                <p className="font-sans text-slate-300 text-sm leading-relaxed mb-8">Descubre cómo optimizar tus procesos con tecnología de vanguardia y gemelos digitales adaptados a tu industria.</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white font-sans text-sm">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#00ffff]"><Clock size={14}/></div>
                    45 Minutos
                  </div>
                  <div className="flex items-center gap-3 text-white font-sans text-sm">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#00ffff]"><CalendarIcon size={14}/></div>
                    Videollamada Google Meet
                  </div>
                </div>
              </div>

              {!isSuccess && (
                <div className="p-10 relative z-10 mt-auto">
                  <div className="flex gap-2 w-full">
                    <div className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step === 'calendar' ? 'bg-[#00ffff] shadow-[0_0_8px_#00ffff]' : 'bg-white/20'}`} />
                    <div className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step === 'form' ? 'bg-[#00ffff] shadow-[0_0_8px_#00ffff]' : 'bg-white/20'}`} />
                  </div>
                  <div className="flex justify-between font-sans text-[11px] font-bold uppercase tracking-widest mt-4">
                    <span className={step === 'calendar' ? 'text-[#00ffff]' : 'text-slate-500'}>1. Fecha</span>
                    <span className={step === 'form' ? 'text-[#00ffff]' : 'text-slate-500'}>02. Detalles</span>
                  </div>
                </div>
              )}
            </div>

            {/* COLUMNA DERECHA: INTERFAZ DINÁMICA */}
            <div className="w-full md:w-3/5 p-6 md:p-10 overflow-y-auto bg-white flex flex-col relative custom-scrollbar">
              
              {/* HEADER MÓVIL */}
              <div className="md:hidden relative -mx-6 -mt-6 mb-8 bg-slate-900 overflow-hidden rounded-b-[2rem] p-8 pt-12 flex flex-col items-center text-center shadow-lg min-h-[160px] shrink-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.2)_0%,_transparent_70%)] pointer-events-none" />
                <div className="w-40 h-16 relative shrink-0 z-10 mb-4">
                  <Image src="/assets/img/01_LANDING_SIGSA/logo_sigsa_3D.png" alt="SIGSA" fill className="object-contain object-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                </div>
                <div className="z-10 flex flex-col items-center">
                  <h3 className="font-poppins font-bold text-xl text-white leading-tight">Sesión <span className="text-[#00ffff]">Estratégica</span></h3>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <span className="font-sans text-slate-300 text-[11px] uppercase tracking-wider flex items-center gap-1.5 font-bold"><Clock size={12} className="text-[#00ffff]"/> 45 Min</span>
                    <span className="font-sans text-slate-300 text-[11px] uppercase tracking-wider flex items-center gap-1.5 font-bold"><CalendarIcon size={12} className="text-[#00ffff]"/> Meet</span>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex-1 flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="font-poppins font-black text-2xl text-slate-900 mb-3 uppercase">
                      ¡Cita Solicitada con Éxito!
                    </h3>
                    <p className="font-sans text-slate-600 text-base leading-relaxed px-4 max-w-md">
                      Nuestro equipo evaluará tu información y nos pondremos en contacto a tu correo corporativo para confirmar la sesión.
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-8 px-8 py-3.5 bg-[#0B3D91] text-white rounded-xl text-xs font-sans font-bold hover:bg-[#00ffff] hover:text-[#0B3D91] transition-all uppercase tracking-widest shadow-lg shadow-[#0B3D91]/20 cursor-pointer"
                    >
                      Cerrar ventana
                    </button>
                  </motion.div>
                ) : step === "calendar" ? (
                  <motion.div key="cal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex-1 flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <h2 className="font-poppins font-black text-2xl text-slate-900 uppercase tracking-tighter">
                        Tu horario <span className="text-red-500">*</span>
                      </h2>
                      <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-full p-1">
                        <button type="button" onClick={handlePrevMonth} disabled={isPrevDisabled} className={`p-2 rounded-full transition-all ${isPrevDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:shadow-sm text-slate-700 hover:text-[#0B3D91]'}`}><ChevronLeft size={16} /></button>
                        <span className="font-sans font-bold text-slate-700 capitalize text-sm w-36 text-center select-none">{monthYearString}</span>
                        <button type="button" onClick={handleNextMonth} disabled={isNextDisabled} className={`p-2 rounded-full transition-all ${isNextDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:shadow-sm text-slate-700 hover:text-[#0B3D91]'}`}><ChevronRight size={16} /></button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 text-center font-sans text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                      {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(d => <div key={d}>{d}</div>)}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-y-2 gap-x-1 mb-8">
                      {blanks.map(b => <div key={`b-${b}`} />)}
                      {days.map(d => {
                        const date = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), d);
                        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                        const isPast = date < today;
                        const isTooFar = date > maxDate;
                        const isDisabled = isWeekend || isPast || isTooFar;
                        const isSelected = selectedDate?.getDate() === d && selectedDate?.getMonth() === currentMonthDate.getMonth();

                        return (
                          <button
                            key={d} type="button" disabled={isDisabled} onClick={() => setSelectedDate(date)}
                            className={`h-10 w-10 mx-auto rounded-full font-sans text-sm transition-all duration-300 flex items-center justify-center ${
                              isSelected ? 'bg-[#00ffff] text-[#0B3D91] shadow-lg shadow-[#00ffff]/30 font-bold scale-110' : isDisabled ? 'opacity-20 cursor-not-allowed line-through decoration-slate-300' : 'hover:bg-slate-100 text-slate-700 hover:text-[#0B3D91]'
                            }`}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-auto">
                      <AnimatePresence>
                        {getFilteredTimes().map((t, i) => (
                          <motion.button 
                            key={t} type="button" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                            onClick={() => setSelectedTime(t)} 
                            className={`px-4 py-2.5 rounded-xl border font-sans text-xs font-bold transition-all duration-300 ${
                              selectedTime === t ? 'bg-[#00ffff] text-[#0B3D91] border-[#00ffff] shadow-md shadow-[#00ffff]/30' : 'border-slate-200 text-slate-600 hover:border-[#0B3D91] hover:bg-slate-50 hover:text-[#0B3D91]'
                            }`}
                          >
                            {t}
                          </motion.button>
                        ))}
                      </AnimatePresence>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <button type="button" disabled={!selectedDate || !selectedTime} onClick={() => setStep("form")} 
                        className="w-full bg-[#00ffff] text-[#0B3D91] py-4 rounded-xl font-sans font-bold uppercase tracking-widest text-sm hover:bg-[#0B3D91] hover:text-[#00ffff] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg shadow-[#00ffff]/20 cursor-pointer">
                        Continuar <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="flex-1 flex flex-col">
                    <button type="button" onClick={() => setStep("calendar")} className="text-slate-400 hover:text-[#0B3D91] font-sans text-xs font-bold uppercase tracking-widest flex items-center gap-1 mb-3 transition-colors w-fit cursor-pointer">
                      &larr; Volver ({selectedDate?.toLocaleDateString("es-MX")} {selectedTime})
                    </button>
                    <h2 className="font-poppins font-black text-2xl text-slate-900 mb-4 uppercase tracking-tighter">Detalles del Contacto</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4 font-sans flex-1 flex flex-col pb-2">
                      
                      {/* Fila 1: Nombre(s) y Apellidos */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-sans text-xs font-bold text-slate-700 mb-1">
                            Nombre(s) <span className="text-red-500">*</span>
                          </label>
                          <input required type="text" value={name} placeholder="Ej. Roberto" onChange={(e) => setName(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all font-sans text-sm text-slate-800" />
                        </div>
                        <div>
                          <label className="block font-sans text-xs font-bold text-slate-700 mb-1">
                            Apellidos <span className="text-red-500">*</span>
                          </label>
                          <input required type="text" value={lastname} placeholder="Ej. Sánchez" onChange={(e) => setLastname(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all font-sans text-sm text-slate-800" />
                        </div>
                      </div>

                      {/* Fila 2: Cargo y Empresa */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-sans text-xs font-bold text-slate-700 mb-1">
                            Cargo / Puesto <span className="text-red-500">*</span>
                          </label>
                          <input required type="text" value={jobTitle} placeholder="Ej. Director SIG" onChange={(e) => setJobTitle(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all font-sans text-sm text-slate-800" />
                        </div>
                        <div>
                          <label className="block font-sans text-xs font-bold text-slate-700 mb-1">
                            Empresa / Institución <span className="text-red-500">*</span>
                          </label>
                          <input required type="text" value={company} placeholder="Nombre de tu organización" onChange={(e) => setCompany(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all font-sans text-sm text-slate-800" />
                        </div>
                      </div>

                      {/* Fila 3: Correo y Teléfono */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-sans text-xs font-bold text-slate-700 mb-1">
                            Correo Corporativo <span className="text-red-500">*</span>
                          </label>
                          <input required type="email" value={email} placeholder="roberto@tuempresa.com" onChange={(e) => setEmail(e.target.value)} className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:bg-white focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 outline-none transition-all font-sans text-sm text-slate-800" />
                        </div>
                        <div>
                          <label className="block font-sans text-xs font-bold text-slate-700 mb-1">
                            Teléfono <span className="text-red-500">*</span>
                          </label>
                          <div className="flex gap-2 w-full">
                            <div className="relative flex-shrink-0">
                              <button 
                                type="button" onClick={() => setShowDropdown(!showDropdown)} onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                                className="w-20 h-full px-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-100 transition-colors outline-none focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20"
                              >
                                <img src={`https://flagcdn.com/w20/${selectedCountry?.iso}.png`} alt="Bandera" className="w-4 h-auto rounded-sm shadow-sm" />
                                <span className="font-bold text-xs text-slate-700">{selectedCountry?.label}</span>
                              </button>
                              <AnimatePresence>
                                {showDropdown && (
                                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.15 }} className="absolute top-full left-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-2 w-32 flex flex-col overflow-hidden">
                                    {countries.map(c => (
                                      <button
                                        key={c.code} type="button" onClick={() => { setCountryCode(c.code); setShowDropdown(false); }}
                                        className="w-full py-2 px-3 hover:bg-slate-50 flex items-center justify-between transition-colors"
                                      >
                                        <div className="flex items-center gap-2">
                                          <img src={`https://flagcdn.com/w20/${c.iso}.png`} alt={c.label} className="w-4 h-auto rounded-sm" />
                                          <span className="font-bold text-xs text-slate-700">{c.label}</span>
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-mono">{c.code}</span>
                                      </button>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            <input required type="tel" value={phone} onChange={handlePhoneChange} maxLength={15} placeholder="55 1234 5678" className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 transition-all font-sans text-sm text-slate-800" />
                          </div>
                        </div>
                      </div>

                      {/* Fila 4: Temas (Obligatorio) y Comentarios (Opcional) lado a lado */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <label className="block font-sans text-xs font-bold text-slate-700 mb-1">
                            Temas de interés (Mín. 1, Máx. 2) <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-2 gap-2 h-auto max-h-[80px]">
                            {themes.map(theme => (
                              <button
                                key={theme} type="button" onClick={() => toggleTheme(theme)}
                                className={`py-2 px-1 rounded-lg border text-[11px] font-bold transition-all duration-300 flex items-center justify-center text-center cursor-pointer h-9 ${
                                  selectedThemes.includes(theme) ? 'bg-[#0B3D91] text-[#00ffff] border-[#0B3D91] shadow-md shadow-[#0B3D91]/20' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-[#0B3D91] hover:text-[#0B3D91]'
                                }`}
                              >
                                {theme}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col">
                          <label className="block font-sans text-xs font-bold text-slate-700 mb-1">
                            Comentarios Adicionales <span className="text-slate-400 font-normal">(Opcional)</span>
                          </label>
                          <textarea 
                            value={comment} 
                            onChange={(e) => setComment(e.target.value)} 
                            placeholder="Dinos brevemente sobre tu proyecto..." 
                            className="w-full flex-1 min-h-[80px] px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 transition-all font-sans text-xs text-slate-800 resize-none custom-scrollbar" 
                          />
                        </div>
                      </div>

                      {/* Checkboxes de Aceptación (Ambos obligatorios) */}
                      <div className="space-y-2.5 pt-1">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative flex items-start mt-0.5 shrink-0">
                            <input
                              type="checkbox"
                              required
                              checked={acceptComms}
                              onChange={(e) => setAcceptComms(e.target.checked)}
                              className="peer appearance-none w-4 h-4 border-2 border-slate-300 rounded bg-white checked:bg-[#0B3D91] checked:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 transition-all cursor-pointer"
                            />
                            <CheckCircle2 className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                          <span className="font-sans text-xs text-slate-600 leading-snug group-hover:text-slate-800 transition-colors">
                            Acepto recibir comunicaciones, noticias y ofertas exclusivas de SIGSA. <span className="text-red-500">*</span>
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative flex items-start mt-0.5 shrink-0">
                            <input
                              type="checkbox"
                              required
                              checked={acceptData}
                              onChange={(e) => setAcceptData(e.target.checked)}
                              className="peer appearance-none w-4 h-4 border-2 border-slate-300 rounded bg-white checked:bg-[#0B3D91] checked:border-[#0B3D91] focus:ring-2 focus:ring-[#0B3D91]/20 transition-all cursor-pointer"
                            />
                            <CheckCircle2 className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                          <span className="font-sans text-xs text-slate-600 leading-snug group-hover:text-slate-800 transition-colors">
                            Acepto el almacenamiento y manejo de mis datos personales de acuerdo con las políticas vigentes. <span className="text-red-500">*</span>
                          </span>
                        </label>
                      </div>

                      {/* Botón Submit y Texto Legal */}
                      <div className="mt-auto pt-3 border-t border-slate-100">
                        <button
                          type="submit"
                          disabled={isSubmitting || !isFormComplete}
                          className="w-full mb-2 bg-[#00ffff] text-[#0B3D91] font-sans font-bold tracking-widest uppercase text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0B3D91] hover:text-[#00ffff] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#00ffff]/20 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <><Loader2 size={16} className="animate-spin" /> Procesando...</>
                          ) : (
                            <>Confirmar Cita <Send size={16} /></>
                          )}
                        </button>
                        <p className="text-center font-sans text-[10px] text-slate-400 leading-relaxed px-2">
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
    </AnimatePresence>
  );
}