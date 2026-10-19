/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Send, CheckCircle, Clock, ShieldCheck } from 'lucide-react';
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

    // Fire-and-forget notifications (non-blocking; failures tolerated, e.g. local dev)
    // 1) Email via Netlify Forms (AJAX submission; dashboard email notification)
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'contact', name, email, phone, service, message }).toString(),
    }).catch(() => {});
    // 2) Telegram bot via Netlify Function (token stays server-side, never in the bundle)
    fetch('/.netlify/functions/notify-telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, service, message }),
    }).catch(() => {});

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

  const fieldClass = (invalid: boolean) =>
    `w-full bg-beige border ${invalid ? 'border-red-500' : 'border-oro/30'} px-4 py-3 font-sans text-[15px] text-ciruela placeholder:text-[#837377] focus:outline-none focus:border-wine focus:bg-white`;

  return (
    <section id="booking" className="w-full px-6 lg:px-16 py-16 lg:py-20 bg-beige border-b border-oro/25">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-label text-[10px] uppercase tracking-[0.22em] text-wine font-bold">Iniciar el encargo</span>
              <h2 className="font-serif text-4xl lg:text-5xl text-ciruela font-normal">Consulta de proyecto</h2>
              <p className="font-sans text-[15px] leading-6 text-malva">
                El estudio toma un número limitado de sistemas de marca y producciones por trimestre, para cuidar el oficio.
              </p>
            </div>

            {/* List entries */}
            <div className="p-5 bg-marfil border-l-4 border-wine border-y border-r border-oro/35 space-y-3 shadow-sm">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-wine font-bold block">Respuesta del atelier</span>
              <p className="text-[13px] leading-5 text-ciruela">
                Las consultas las revisa Miranda directamente. Las propuestas claras reciben respuesta para coordinar una conversación.
              </p>
              <div className="pt-1 flex items-center gap-3 text-[13px] text-bosque font-semibold">
                <Clock className="w-4 h-4" />
                <span>WhatsApp {biography.whatsapp}</span>
              </div>
            </div>
            <div className="space-y-2 bg-arena border border-oro/40 p-4">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-ciruela font-bold block">Telégrafo del estudio</span>
              <p className="font-sans text-[15px] text-wine font-semibold">{biography.email}</p>
              <p className="text-[13px] text-malva flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{biography.location}</p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-marfil border border-oro/35 p-6 sm:p-8 shadow-xl">
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  name="contact"
                  data-netlify="true"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="flex flex-col space-y-1">
                    <h4 className="font-serif text-2xl text-ciruela">El briefing</h4>
                    <p className="text-[13px] text-malva">Miranda lee cada mensaje de forma directa.</p>
                  </div>

                  {/* Form fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="font-label text-[10px] uppercase tracking-[0.18em] text-malva font-semibold block">Nombre</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Ej: Sofía Quesada"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={fieldClass(!!errors.name)}
                      />
                      {errors.name && <span className="text-[10px] text-red-600 block">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="font-label text-[10px] uppercase tracking-[0.18em] text-malva font-semibold block">Correo</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={fieldClass(!!errors.email)}
                      />
                      {errors.email && <span className="text-[10px] text-red-600 block">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone WhatsApp number */}
                    <div className="space-y-1.5">
                      <label className="font-label text-[10px] uppercase tracking-[0.18em] text-malva font-semibold block">WhatsApp</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Ej: +506 88888888"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={fieldClass(!!errors.phone)}
                      />
                      {errors.phone && <span className="text-[10px] text-red-600 block">{errors.phone}</span>}
                    </div>

                    {/* Service type select box */}
                    <div className="space-y-1.5">
                      <label className="font-label text-[10px] uppercase tracking-[0.18em] text-malva font-semibold block">Especialidad</label>
                      <select
                        name="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-beige border border-oro/30 focus:border-wine focus:bg-white focus:outline-none px-4 py-3 text-[15px] text-ciruela font-sans cursor-pointer"
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
                    <label className="font-label text-[10px] uppercase tracking-[0.18em] text-malva font-semibold block">Brief y objetivos</label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Contá el horizonte estético, los tiempos y lo que la marca necesita lograr..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${fieldClass(!!errors.message)} resize-none`}
                    />
                    {errors.message && <span className="text-[10px] text-red-600 block">{errors.message}</span>}
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="w-full py-4 bg-bosque hover:bg-verde text-champagne border border-[#2D5A46] font-label text-[10px] uppercase tracking-[0.2em] font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4 shrink-0" />
                      <span>Enviar briefing</span>
                    </button>
                  </div>

                  <div className="text-malva flex items-center gap-2 text-[12px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-bosque" />
                    <span>Los datos no se comparten ni se venden.</span>
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
                  <div className="inline-flex p-4 bg-bosque text-champagne">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl text-ciruela">Briefing recibido</h3>
                    <p className="text-sm text-malva max-w-md mx-auto">
                      Gracias {name}. El mensaje quedó en el buzón de Mirix Studio CR.
                    </p>
                  </div>
                  <div className="bg-beige border border-oro/35 p-6 text-center max-w-md mx-auto space-y-4">
                    <p className="text-[13px] text-malva">Si querés acelerar la respuesta, el mismo briefing puede ir por WhatsApp.</p>
                    <button
                      onClick={handleSendWhatsAppBackup}
                      className="w-full py-3.5 bg-oro text-ciruela font-label text-[10px] tracking-[0.16em] uppercase font-bold cursor-pointer"
                    >
                      Escribir por WhatsApp
                    </button>
                  </div>
                  <button
                    onClick={handleResetForm}
                    className="font-label text-[10px] uppercase tracking-[0.16em] text-wine cursor-pointer"
                  >
                    Enviar otra consulta
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

      </div>
    </section>
  );
}
