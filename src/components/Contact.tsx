/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle, ShieldCheck } from 'lucide-react';
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

const MAP_QUERY = 'Esparza, Puntarenas, Costa Rica';
const MAP_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15717.266086695985!2d-84.67767374029188!3d9.990691541826509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa036e05f9e6025%3A0xa29124e569265597!2sProvincia%20de%20Puntarenas%2C%20Esparza!5e0!3m2!1ses-419!2scr!4v1792444395758!5m2!1ses-419!2scr';
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

export default function Contact({ biography, addMessage }: ContactProps) {
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

  const cleanPhoneStr = (phoneNum: string) => phoneNum.replace(/[^0-9+]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentErrors = validate();
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors({});
    addMessage({ name, email, phone, service, message });

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'contact', name, email, phone, service, message }).toString(),
    }).catch(() => {});
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
    window.open(`https://wa.me/${cleanPhoneStr(biography.whatsapp)}?text=${formattedText}`, '_blank');
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
    `w-full rounded-lg bg-beige border ${invalid ? 'border-wine' : 'border-arena'} px-4 py-3 font-sans text-[15px] text-ciruela placeholder:text-malva/70 focus:outline-none focus:border-oro focus:bg-white`;

  const cards = [
    { icon: MapPin, label: 'Ubicación', value: biography.location, href: MAP_LINK },
    { icon: Mail, label: 'Correo', value: biography.email, href: `mailto:${biography.email}` },
    { icon: Phone, label: 'WhatsApp', value: biography.whatsapp, href: `https://wa.me/${cleanPhoneStr(biography.whatsapp)}` },
    { icon: Clock, label: 'Horario', value: 'Con cita previa, por WhatsApp', href: undefined },
  ];

  return (
    <section id="booking" className="w-full bg-marfil px-6 py-16 lg:px-16 lg:py-20">
      <div className="mb-10 max-w-2xl">
        <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.22em] text-ciruela">Contacto</h2>
        <div className="mt-3 h-[3px] w-16 bg-oro" />
        <p className="mt-4 font-sans text-[15px] leading-7 text-malva">
          Las consultas las revisa Miranda directamente. Base en Esparza, con cobertura en todo Costa Rica.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        <div className="relative min-h-[460px] overflow-hidden rounded-2xl border border-arena bg-beige shadow-sm lg:row-span-2 lg:min-h-[640px]">
          <iframe
            title="Mapa de Esparza, Puntarenas"
            src={MAP_EMBED}
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon;
            const body = (
              <>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-champagne/70 text-wine">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="mt-3 block font-sans text-sm font-semibold text-ciruela">{card.label}</span>
                <span className="mt-1 block text-[13px] leading-5 text-malva">{card.value}</span>
              </>
            );
            const className = 'rounded-2xl border border-arena bg-white p-5 shadow-sm';
            return card.href ? (
              <a key={card.label} href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={className}>
                {body}
              </a>
            ) : (
              <div key={card.label} className={className}>{body}</div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-arena bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 border-l-4 border-oro pl-4">
            <h3 className="font-serif text-2xl text-ciruela">Escribinos</h3>
            <p className="mt-1 text-[13px] leading-5 text-malva">Miranda lee cada mensaje de forma directa.</p>
          </div>

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
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="contact" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="sr-only" htmlFor="contact-name">Nombre</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={fieldClass(!!errors.name)}
                    />
                    {errors.name && <span className="block text-[11px] text-wine">{errors.name}</span>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="sr-only" htmlFor="contact-email">Correo</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="Tu correo"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={fieldClass(!!errors.email)}
                    />
                    {errors.email && <span className="block text-[11px] text-wine">{errors.email}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="sr-only" htmlFor="contact-phone">WhatsApp</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      placeholder="WhatsApp"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={fieldClass(!!errors.phone)}
                    />
                    {errors.phone && <span className="block text-[11px] text-wine">{errors.phone}</span>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="sr-only" htmlFor="contact-service">Especialidad</label>
                    <select
                      id="contact-service"
                      name="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full cursor-pointer rounded-lg border border-arena bg-beige px-4 py-3 font-sans text-[15px] text-ciruela focus:border-oro focus:bg-white focus:outline-none"
                    >
                      {servicesList.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="sr-only" htmlFor="contact-message">Mensaje</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Mensaje"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${fieldClass(!!errors.message)} resize-none`}
                  />
                  {errors.message && <span className="block text-[11px] text-wine">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-bosque px-6 py-3.5 font-label text-[11px] font-semibold uppercase tracking-[0.16em] text-champagne hover:bg-verde"
                >
                  <Send className="h-4 w-4" />
                  Enviar mensaje
                </button>
                <p className="flex items-center gap-2 text-[12px] text-malva">
                  <ShieldCheck className="h-3.5 w-3.5 text-bosque" />
                  Los datos no se comparten ni se venden.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 py-4 text-center"
              >
                <div className="inline-flex bg-bosque p-4 text-champagne">
                  <CheckCircle className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-3xl text-ciruela">Mensaje recibido</h3>
                  <p className="mx-auto max-w-md text-sm text-malva">
                    Gracias {name}. El mensaje quedó en el buzón de Mirix Studio CR.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSendWhatsAppBackup}
                  className="w-full cursor-pointer bg-oro py-3.5 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-ciruela"
                >
                  Escribir por WhatsApp
                </button>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="cursor-pointer font-label text-[10px] uppercase tracking-[0.16em] text-wine"
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
