/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calculator, Check, MessageSquare, ArrowRight, Camera, Lightbulb,
  Film, Layers, Palette, Share2, FileImage, Sparkles, Clock, Image as ImageIcon
} from 'lucide-react';

interface ConfiguratorProps {
  biography: {
    whatsapp: string;
  };
}

export default function Configurator({ biography }: ConfiguratorProps) {
  // Config state
  const [serviceType, setServiceType] = useState<'photo' | 'video' | 'combo'>('combo');
  const [hours, setHours] = useState<number>(3);
  const [photosEdited, setPhotosEdited] = useState<number>(20);
  const [isDesignSelected, setIsDesignSelected] = useState<boolean>(false);
  const [isSocialSetupSelected, setIsSocialSetupSelected] = useState<boolean>(false);
  const [isRawDeliverySelected, setIsRawDeliverySelected] = useState<boolean>(false);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Approximate realistic CR pricing calculation
  useEffect(() => {
    let baseRate = 0;

    if (serviceType === 'photo') {
      baseRate = 35000;
    } else if (serviceType === 'video') {
      baseRate = 50000;
    } else {
      baseRate = 75000;
    }

    const hourlyCost = serviceType === 'combo' ? 18000 : 12000;
    const hoursPrice = hours * hourlyCost;
    const photosPrice = photosEdited * 1500;

    const designAddon = isDesignSelected ? 120000 : 0;
    const socialSetupAddon = isSocialSetupSelected ? 35000 : 0;
    const rawDeliveryAddon = isRawDeliverySelected ? 20000 : 0;

    const calculatedTotal = baseRate + hoursPrice + photosPrice + designAddon + socialSetupAddon + rawDeliveryAddon;
    setTotalPrice(calculatedTotal);
  }, [serviceType, hours, photosEdited, isDesignSelected, isSocialSetupSelected, isRawDeliverySelected]);

  const cleanPhone = (phone: string) => {
    return phone.replace(/[^0-9+]/g, '');
  };

  const handleSendEstimate = () => {
    const formattedPrice = new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
    }).format(totalPrice);

    const addonsText = [
      isDesignSelected ? '• Diseño Gráfico para redes sociales' : '',
      isSocialSetupSelected ? '• Optimización de Redes Sociales' : '',
      isRawDeliverySelected ? '• Entrega de Archivos RAW Brutos' : '',
    ].filter(Boolean).join('\n');

    const message = encodeURIComponent(
      `¡Hola Miranda! He usado la calculadora de presupuestos interactiva en tu web y me gustaría cotizar Formalmente:\n\n` +
      `*Servicio:* ${serviceType === 'photo' ? 'Fotografía Profesional' : serviceType === 'video' ? 'Creación de Video' : 'Combo Audiovisual'}\n` +
      `*Horas de sesión:* ${hours} horas\n` +
      `*Fotos a editar:* ${photosEdited} unidades\n` +
      `*Extras añadidos:*\n${addonsText || '• Ninguno seleccionado'}\n\n` +
      `*Estimación Total:* ${formattedPrice}\n\n` +
      `¿Me podrías confirmar la disponibilidad en Esparza para agendar? ¡Muchas gracias!`
    );

    const whatsappLink = `https://wa.me/${cleanPhone(biography.whatsapp)}?text=${message}`;
    window.open(whatsappLink, '_blank');
  };

  // Service type options with icons
  const serviceOptions = [
    { id: 'photo' as const, label: 'Solo Fotografía', icon: Camera, base: '₡35,000' },
    { id: 'video' as const, label: 'Solo Video', icon: Film, base: '₡50,000' },
    { id: 'combo' as const, label: 'Combo M&M', icon: Layers, base: '₡75,000' },
  ];

  // Addon options
  const addons = [
    {
      id: 'design' as const,
      selected: isDesignSelected,
      toggle: () => setIsDesignSelected(!isDesignSelected),
      icon: Palette,
      title: 'Diseño Gráfico para redes sociales',
      desc: 'Te entregamos un set de plantillas editables para tus publicaciones y stories en CR.',
      price: '+₡120k',
    },
    {
      id: 'socialSetup' as const,
      selected: isSocialSetupSelected,
      toggle: () => setIsSocialSetupSelected(!isSocialSetupSelected),
      icon: Share2,
      title: 'Optimización de Perfiles de Redes',
      desc: 'Estrategia SEO local, hashtags definidos y configuración avanzada de tus perfiles en CR.',
      price: '+₡35k',
    },
    {
      id: 'rawDelivery' as const,
      selected: isRawDeliverySelected,
      toggle: () => setIsRawDeliverySelected(!isRawDeliverySelected),
      icon: FileImage,
      title: 'Entrega Completa de Archivos RAW',
      desc: 'Te enviamos todo el material bruto sin comprimir vía SSD o Drive.',
      price: '+₡20k',
    },
  ];

  // Progress percentage for sliders
  const hoursProgress = ((hours - 1) / 7) * 100;
  const photosProgress = ((photosEdited - 5) / 75) * 100;

  return (
    <section className="bg-gradient-to-b from-[#FAFAFA] to-neutral-100/50 text-zinc-900 pt-20 pb-32 lg:pb-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 relative overflow-hidden">

      {/* Decorative background accents */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-neutral-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-1/4 bottom-0 w-64 h-64 bg-neutral-200/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Module Header — Compact with step indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
              <div className="flex items-center space-x-1.5">
                <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-mono font-bold">03</span>
                <Calculator className="w-3.5 h-3.5" />
              </div>
              <span>COTIZADOR EN VIVO</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-serif font-light tracking-tight text-neutral-950 uppercase leading-none">
              Diseña tu<br />
              <span className="italic font-normal">Presupuesto_</span>
            </h2>

            <p className="text-zinc-600 font-sans text-xs sm:text-sm font-light mt-3 max-w-md leading-relaxed">
              Ajusta los parámetros según las necesidades de tu marca y solicita una proforma oficial instantánea vía WhatsApp.
            </p>
          </div>

          {/* Quick stats badge */}
          <div className="flex items-center gap-6 bg-white border border-neutral-200 px-6 py-4 rounded-sm shadow-sm">
            <div className="text-center">
              <span className="block text-2xl font-serif font-light text-black leading-none">
                {hours + (photosEdited > 0 ? 1 : 0)}
              </span>
              <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-500">Parámetros</span>
            </div>
            <div className="w-px h-10 bg-neutral-200" />
            <div className="text-center">
              <span className="block text-2xl font-serif font-light text-black leading-none">
                {[isDesignSelected, isSocialSetupSelected, isRawDeliverySelected].filter(Boolean).length}
              </span>
              <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-500">Add-ons</span>
            </div>
          </div>
        </div>

        {/* Configurator Grid — New asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* === LEFT: Controls Panel === */}
          <div className="lg:col-span-7 space-y-6">

            {/* Step 1: Service Type — Card style with icons */}
            <div className="bg-white border border-neutral-200 rounded-sm p-6 sm:p-7 shadow-sm">
              <div className="flex items-center space-x-2 mb-5">
                <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[9px] font-mono font-bold">1</span>
                <label className="text-xs font-semibold tracking-wider uppercase text-zinc-600">
                  Tipo de Servicio
                </label>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {serviceOptions.map(opt => {
                  const Icon = opt.icon;
                  const isActive = serviceType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setServiceType(opt.id)}
                      className={`relative p-4 rounded-sm text-center border-2 transition-all duration-300 cursor-pointer group ${
                        isActive
                          ? 'border-black bg-neutral-950 text-white'
                          : 'border-neutral-200 bg-white text-zinc-600 hover:border-neutral-400 hover:bg-neutral-50'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 transition-colors ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-600'}`} />
                      <span className="block text-[10px] font-bold uppercase tracking-wider mb-1">{opt.label}</span>
                      <span className={`block text-[9px] font-mono ${isActive ? 'text-zinc-300' : 'text-zinc-400'}`}>{opt.base}</span>

                      {isActive && (
                        <motion.div
                          layoutId="serviceActive"
                          className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white border-2 border-black flex items-center justify-center"
                        >
                          <Check className="w-2.5 h-2.5 text-black" />
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Sliders — Modern with progress visualization */}
            <div className="bg-white border border-neutral-200 rounded-sm p-6 sm:p-7 shadow-sm space-y-8">

              <div className="flex items-center space-x-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[9px] font-mono font-bold">2</span>
                <label className="text-xs font-semibold tracking-wider uppercase text-zinc-600">
                  Parámetros de Producción
                </label>
              </div>

              {/* Hours Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-xs font-semibold tracking-wider uppercase text-zinc-500">Duración del Rodaje</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-black bg-neutral-100 px-3 py-1 rounded-sm border border-neutral-200">
                    {hours} {hours === 1 ? 'Hora' : 'Horas'}
                  </span>
                </div>

                {/* Custom slider with progress fill */}
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={hours}
                    onChange={(e) => setHours(parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-black relative z-10"
                    style={{
                      background: `linear-gradient(to right, #000 0%, #000 ${hoursProgress}%, #e5e5e5 ${hoursProgress}%, #e5e5e5 100%)`,
                    }}
                  />
                </div>

                <div className="flex justify-between text-[9px] text-zinc-400 font-mono uppercase tracking-wider">
                  <span>1h</span>
                  <span>4h</span>
                  <span>8h</span>
                </div>
              </div>

              {/* Photos Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-xs font-semibold tracking-wider uppercase text-zinc-500">Fotografías Editadas</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-black bg-neutral-100 px-3 py-1 rounded-sm border border-neutral-200">
                    {photosEdited} Unidades
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="range"
                    min="5"
                    max="80"
                    step="5"
                    value={photosEdited}
                    onChange={(e) => setPhotosEdited(parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-black relative z-10"
                    style={{
                      background: `linear-gradient(to right, #000 0%, #000 ${photosProgress}%, #e5e5e5 ${photosProgress}%, #e5e5e5 100%)`,
                    }}
                  />
                </div>

                <div className="flex justify-between text-[9px] text-zinc-400 font-mono uppercase tracking-wider">
                  <span>5 Fotos</span>
                  <span>40 Fotos</span>
                  <span>80 Max</span>
                </div>
              </div>
            </div>

            {/* Step 3: Addons — Toggle switch style */}
            <div className="bg-white border border-neutral-200 rounded-sm p-6 sm:p-7 shadow-sm">
              <div className="flex items-center space-x-2 mb-5">
                <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[9px] font-mono font-bold">3</span>
                <label className="text-xs font-semibold tracking-wider uppercase text-zinc-600">
                  Módulos Extra
                </label>
              </div>

              <div className="space-y-3">
                {addons.map(addon => {
                  const Icon = addon.icon;
                  return (
                    <button
                      key={addon.id}
                      onClick={addon.toggle}
                      className={`flex items-center justify-between w-full p-4 rounded-sm border-2 text-left transition-all duration-300 cursor-pointer group ${
                        addon.selected
                          ? 'border-black bg-neutral-50'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3 pr-3">
                        <div className={`p-2 rounded-sm transition-colors ${addon.selected ? 'bg-black text-white' : 'bg-neutral-100 text-zinc-400 group-hover:text-zinc-600'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold uppercase tracking-wider text-zinc-900">{addon.title}</span>
                          <span className="block text-[11px] text-zinc-500 font-light font-sans mt-0.5 leading-relaxed max-w-xs">{addon.desc}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        <span className="text-xs font-mono font-bold text-black">{addon.price}</span>
                        {/* Toggle switch */}
                        <div className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${addon.selected ? 'bg-black' : 'bg-neutral-200'}`}>
                          <motion.div
                            animate={{ x: addon.selected ? 20 : 2 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* === RIGHT: Sticky Summary Panel — Ticket style === */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">

            <div className="bg-white border-2 border-dashed border-neutral-300 rounded-sm shadow-sm overflow-hidden">

              {/* Ticket header */}
              <div className="bg-neutral-950 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-mono tracking-widest uppercase">Resumen Proforma</span>
                </div>
                <span className="text-[9px] font-mono text-zinc-400">N° {Date.now().toString().slice(-6)}</span>
              </div>

              {/* Ticket body */}
              <div className="p-6 space-y-5">

                {/* Service line */}
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400 block">Servicio Base</span>
                    <span className="text-sm font-serif text-zinc-900">
                      {serviceType === 'photo' ? 'Fotografía' : serviceType === 'video' ? 'Video' : 'Combo M&M'}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-semibold text-zinc-800">
                    {serviceType === 'photo' ? '₡35,000' : serviceType === 'video' ? '₡50,000' : '₡75,000'}
                  </span>
                </div>

                {/* Hours line */}
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400 block">Rodaje</span>
                    <span className="text-sm font-serif text-zinc-900">{hours} {hours === 1 ? 'Hora' : 'Horas'}</span>
                  </div>
                  <span className="font-mono text-sm font-semibold text-zinc-800">
                    +₡{new Intl.NumberFormat('es-CR').format(hours * (serviceType === 'combo' ? 18000 : 12000))}
                  </span>
                </div>

                {/* Photos line */}
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400 block">Edición</span>
                    <span className="text-sm font-serif text-zinc-900">{photosEdited} Fotos</span>
                  </div>
                  <span className="font-mono text-sm font-semibold text-zinc-800">
                    +₡{new Intl.NumberFormat('es-CR').format(photosEdited * 1500)}
                  </span>
                </div>

                {/* Addon lines */}
                {isDesignSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex justify-between items-start text-xs"
                  >
                    <div>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400 block">Add-on</span>
                      <span className="text-sm font-serif text-zinc-900">Diseño Gráfico</span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-zinc-800">+₡120,000</span>
                  </motion.div>
                )}

                {isSocialSetupSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex justify-between items-start text-xs"
                  >
                    <div>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400 block">Add-on</span>
                      <span className="text-sm font-serif text-zinc-900">Optimización Redes</span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-zinc-800">+₡35,000</span>
                  </motion.div>
                )}

                {isRawDeliverySelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex justify-between items-start text-xs"
                  >
                    <div>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400 block">Add-on</span>
                      <span className="text-sm font-serif text-zinc-900">Archivos RAW</span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-zinc-800">+₡20,000</span>
                  </motion.div>
                )}

                {/* Dashed separator */}
                <div className="border-t-2 border-dashed border-neutral-200 pt-5" />

                {/* Total */}
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-400 block">Inversión Total</span>
                    <span className="text-[10px] text-zinc-400 font-mono">Colones costarricenses</span>
                  </div>
                  <motion.span
                    key={totalPrice}
                    initial={{ opacity: 0.5, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl sm:text-4xl font-serif font-light tracking-tight text-black"
                  >
                    {new Intl.NumberFormat('es-CR', {
                      style: 'currency',
                      currency: 'CRC',
                      minimumFractionDigits: 0,
                    }).format(totalPrice)}
                  </motion.span>
                </div>
              </div>

              {/* Ticket footer with CTA */}
              <div className="p-6 pt-0 space-y-4">
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-sm flex items-start space-x-2.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <p className="text-[10px] leading-relaxed text-amber-800 font-sans">
                    Estimación aproximada. Al enviar por WhatsApp, Miranda te dará una oferta formal exacta en menos de 24 horas.
                  </p>
                </div>

                <button
                  onClick={handleSendEstimate}
                  className="w-full py-4 px-4 bg-black text-white text-center font-sans font-bold text-xs tracking-widest uppercase rounded-sm hover:bg-zinc-800 transition-all duration-300 flex items-center justify-center space-x-2.5 cursor-pointer shadow-md shadow-black/10 group"
                >
                  <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Solicitar Proforma vía WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Mobile sticky summary bar — live total always visible, no scroll needed (mobile only) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div
          className="flex items-center justify-between gap-3 px-4 pt-3"
          style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
        >
          <div className="min-w-0 flex-1">
            <span className="block text-[9px] font-mono tracking-widest uppercase text-zinc-500">Inversión Total · En Vivo</span>
            <motion.span
              key={totalPrice}
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="block text-xl font-serif font-light tracking-tight text-black leading-tight"
            >
              {new Intl.NumberFormat('es-CR', {
                style: 'currency',
                currency: 'CRC',
                minimumFractionDigits: 0,
              }).format(totalPrice)}
            </motion.span>
            <span className="block text-[9px] font-mono text-zinc-400 truncate">
              {serviceType === 'photo' ? 'Solo Fotografía' : serviceType === 'video' ? 'Solo Video' : 'Combo M&M'} · {hours}h · {photosEdited} fotos · {[isDesignSelected, isSocialSetupSelected, isRawDeliverySelected].filter(Boolean).length} add-on
            </span>
          </div>
          <button
            onClick={handleSendEstimate}
            className="shrink-0 flex items-center space-x-2 bg-black text-white px-4 py-3 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors cursor-pointer active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Solicitar</span>
          </button>
        </div>
      </div>
    </section>
  );
}