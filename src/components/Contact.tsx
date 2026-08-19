/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactProps {
  biography: {
    whatsapp: string;
    email: string;
    location: string;
    facebookUrl: string;
    instagramUrl: string;
  };
  addMessage: (message: Omit<ContactMessage, 'id' | 'date' | 'read'>) => void;
}

export default function Contact({ biography, addMessage }: ContactProps) {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Producción de Video');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const servicesList = [
    'Producción de Video',
    'Fotografía Profesional',
    'Gestión de Redes / Reels',
    'Catálogo Dropshipping',
    'Consulta General / Alianzas'
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'El nombre es requerido.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Ingrese un correo electrónico válido.';
    if (!phone.trim() || phone.length < 8) newErrors.phone = 'Ingrese un número telefónico costarricense válido.';
    if (!message.trim()) newErrors.message = 'Escriba un mensaje detallado para Miranda.';
    return newErrors;
  };

  const cleanPhoneStr = (phoneNum: string) => {
    return phoneNum.replace(/[^0-9+]/g, '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentErrors = validate();
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors({});
    
    // Dispatch message payload to persistent layout
    addMessage({
      name,
      email,
      phone,
      service,
      message
    });

    setSubmitted(true);
  };

  const handleSendWhatsAppBackup = () => {
    const formattedText = encodeURIComponent(
      `¡Hola Miranda! Mi nombre es *${name}*.\n\n` +
      `*Servicio solicitado:* ${service}\n` +
      `*Correo:* ${email}\n` +
      `*Mensaje:* ${message}\n\n` +
      `Te contacto desde el sitio web oficial. ¡Quedo atento rta!`
    );
    const whatsappLink = `https://wa.me/${cleanPhoneStr(biography.whatsapp)}?text=${formattedText}`;
    window.open(whatsappLink, '_blank');
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setService('Producción de Video');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <section className="bg-[#FAFAFA] text-zinc-900 py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Module Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-zinc-550 mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>MÓDULO DE CONTACTO</span>
          </div>
          
          <h2 className="text-4xl font-serif font-light tracking-tight text-neutral-950 uppercase">
            Hablemos de Tu Proyecto
          </h2>
          <div className="w-16 h-[1px] bg-neutral-250 mx-auto mt-4" />
        </div>

        {/* Contact main split structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch items-center">
          
          {/* Left Column: Coordinates detail details & aesthetic location plate */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 h-full">
            <div className="space-y-6">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">INFORMACIÓN DE CONTACTO</span>
              <h3 className="text-2xl font-serif font-light tracking-tight uppercase max-w-sm text-zinc-950">
                Diseñemos estética para tu emprendimiento
              </h3>
              <p className="text-zinc-650 font-sans text-xs sm:text-sm font-light leading-relaxed max-w-md">
                ¿Tiene alguna consulta específica? Complete el formulario en unos segundos. Miranda responderá a la brevedad. Estaremos encantados de agendar reuniones virtuales o presenciales.
              </p>
            </div>

            {/* List entries */}
            <div className="space-y-4 pt-4">
              {/* WhatsApp phone */}
              <div className="flex items-center space-x-4 bg-white p-4 border border-neutral-200 rounded-none shadow-sm">
                <div className="p-3 bg-neutral-100 text-zinc-800 rounded-full">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">Llame o escriba directo</span>
                  <span className="text-sm font-semibold tracking-wide text-zinc-800">{biography.whatsapp}</span>
                </div>
              </div>

              {/* Email address */}
              <div className="flex items-center space-x-4 bg-white p-4 border border-neutral-200 rounded-none shadow-sm">
                <div className="p-3 bg-neutral-100 text-zinc-800 rounded-full">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">Correo de cotizaciones</span>
                  <span className="text-sm font-semibold tracking-wide text-zinc-800">{biography.email}</span>
                </div>
              </div>

              {/* Physical Location */}
              <div className="flex items-center space-x-4 bg-white p-4 border border-neutral-200 rounded-none shadow-sm">
                <div className="p-3 bg-neutral-100 text-zinc-800 rounded-full">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">Nuestra ubicación</span>
                  <span className="text-sm font-semibold tracking-wide text-zinc-800">{biography.location}</span>
                </div>
              </div>
            </div>

            {/* Location card: base info + directions link (Google Maps) */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Esparza,+Puntarenas,+Costa+Rica"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cómo llegar a Esparza, Puntarenas, Costa Rica en Google Maps"
              className="block bg-white border border-neutral-200 p-5 rounded-none relative overflow-hidden shadow-sm transition-all hover:border-neutral-400 hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] text-zinc-500 tracking-widest font-mono uppercase">COSTA RICA • PACÍFICO</span>
                <span className="text-[8px] bg-black text-white px-2 py-0.5 rounded-none uppercase font-mono font-bold">ESPARZA BASE ↗</span>
              </div>
              
              <div className="h-20 bg-[#FAFAFA] border border-neutral-200 rounded-none relative overflow-hidden flex items-center justify-center">
                {/* Simulated minimal contour path vector lines */}
                <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border border-black" />
                  <div className="w-60 h-60 rounded-full border border-black" />
                  <div className="w-80 h-80 rounded-full border border-black" />
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-neutral-300" />
                  <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-neutral-300" />
                </div>
                
                <div className="relative z-10 flex items-center space-x-2 bg-white border border-neutral-250 px-3 py-1.5 rounded-none shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-black animate-ping" />
                  <span className="text-[9px] font-semibold tracking-widest uppercase text-zinc-800 animate-pulse">Base: Esparza · Cobertura en todo el país</span>
                </div>
              </div>
            </a>

          </div>

          {/* Right Column: Interactive verification form */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 p-6 sm:p-10 rounded-none shadow-sm text-zinc-900">
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="flex flex-col space-y-1.5">
                    <h4 className="text-lg font-serif font-light tracking-tight uppercase text-zinc-950">Escríbenos</h4>
                    <p className="text-xs text-zinc-500">Miranda procesará su mensaje de forma confidencial.</p>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Su Nombre</label>
                      <input
                        type="text"
                        placeholder="Ej: Sofía Quesada"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full bg-white border ${errors.name ? 'border-red-500 focus:border-red-600' : 'border-neutral-200 focus:border-black'} focus:outline-none p-3 text-sm rounded-none text-zinc-900 placeholder-zinc-400 font-sans transition-colors`}
                      />
                      {errors.name && <span className="text-[10px] text-red-500 font-mono block">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Su Correo Electrónico</label>
                      <input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full bg-white border ${errors.email ? 'border-red-500 focus:border-red-600' : 'border-neutral-200 focus:border-black'} focus:outline-none p-3 text-sm rounded-none text-zinc-900 placeholder-zinc-400 font-sans transition-colors`}
                      />
                      {errors.email && <span className="text-[10px] text-red-500 font-mono block">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone WhatsApp number */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Su Teléfono (WhatsApp)</label>
                      <input
                        type="tel"
                        placeholder="Ej: +506 88888888"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full bg-white border ${errors.phone ? 'border-red-500 focus:border-red-600' : 'border-neutral-200 focus:border-black'} focus:outline-none p-3 text-sm rounded-none text-zinc-900 placeholder-zinc-400 font-sans transition-colors`}
                      />
                      {errors.phone && <span className="text-[10px] text-red-500 font-mono block">{errors.phone}</span>}
                    </div>

                    {/* Service type select box */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Especialidad de Interés</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-white border border-neutral-200 focus:border-black focus:outline-none p-3 text-sm rounded-none text-zinc-900 font-sans transition-colors cursor-pointer"
                      >
                        {servicesList.map(ser => (
                          <option key={ser} value={ser} className="bg-white text-zinc-900">
                            {ser}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Body Message */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold tracking-widest text-zinc-500 uppercase">Detalles del Proyecto</label>
                    <textarea
                      rows={5}
                      placeholder="Describa brevemente la idea, locación, fecha estimada del rodaje o tipo de plataforma web que imagina..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`w-full bg-white border ${errors.message ? 'border-red-500 focus:border-red-600' : 'border-neutral-200 focus:border-black'} focus:outline-none p-3 text-sm rounded-none text-zinc-900 placeholder-zinc-400 font-sans transition-colors resize-none`}
                    />
                    {errors.message && <span className="text-[10px] text-red-505 font-mono block">{errors.message}</span>}
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-black text-white text-center font-sans font-bold text-xs tracking-widest uppercase hover:bg-zinc-800 transition-colors flex items-center justify-center space-x-2.5 rounded-none cursor-pointer shadow-sm shadow-black/5"
                    >
                      <Send className="w-4 h-4 shrink-0" />
                      <span>Enviar Mensaje Oficial</span>
                    </button>
                  </div>

                  <div className="text-zinc-500 flex items-center space-x-2 text-[10px] font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
                    <span>Sus datos personales nunca serán distribuidos o vendidos.</span>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8 text-center py-8"
                >
                  <div className="inline-flex p-4 bg-neutral-100 border border-neutral-200 rounded-full text-zinc-800 shadow-sm">
                    <CheckCircle className="w-12 h-12 text-black animate-bounce" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-light tracking-tight uppercase text-zinc-950">¡Mensaje Enviado con Éxito!</h3>
                    <p className="text-sm text-zinc-650 font-sans font-light max-w-md mx-auto">
                      Gracias {name}, su solicitud ha sido resguardada en el buzón local de Mirix Studio CR de forma satisfactoria.
                    </p>
                  </div>

                  <div className="bg-[#FAFAFA] border border-neutral-250 p-6 rounded-none text-center max-w-md mx-auto space-y-4 shadow-sm">
                    <div className="flex items-center justify-center space-x-2 text-xs font-mono text-zinc-500">
                      <Clock className="w-4 h-4 text-black" />
                      <span>¿Quieres agilizar la respuesta al instante?</span>
                    </div>

                    <p className="text-xs text-zinc-550 font-sans font-light">
                      Puede enviar los datos rellenados directamente a Miranda por WhatsApp para asegurar una respuesta exprés hoy mismo.
                    </p>

                    <button
                      onClick={handleSendWhatsAppBackup}
                      className="w-full py-3.5 bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 hover:text-black text-zinc-800 text-[10px] font-bold tracking-widest uppercase transition-all rounded-none flex items-center justify-center space-x-2.5 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-zinc-700" />
                      <span>Comenzar Chat de Whatsapp</span>
                    </button>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleResetForm}
                      className="text-xs font-semibold tracking-wider uppercase text-zinc-500 hover:text-black hover:underline transition-colors"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
