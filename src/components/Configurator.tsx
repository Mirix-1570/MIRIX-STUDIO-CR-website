/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sliders, Calculator, Check, MessageSquare, ArrowRight, Camera, Lightbulb } from 'lucide-react';

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
  const [isWebDevSelected, setIsWebDevSelected] = useState<boolean>(false);
  const [isSocialSetupSelected, setIsSocialSetupSelected] = useState<boolean>(false);
  const [isRawDeliverySelected, setIsRawDeliverySelected] = useState<boolean>(false);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Approximate realistic CR pricing calculation
  useEffect(() => {
    let baseRate = 0;
    
    // Base cost depending on service category
    if (serviceType === 'photo') {
      baseRate = 35000; // base photography rate
    } else if (serviceType === 'video') {
      baseRate = 50000; // base videography core
    } else {
      baseRate = 75000; // combo base
    }

    // Cost of shooting hours
    const hourlyCost = serviceType === 'combo' ? 18000 : 12000;
    const hoursPrice = hours * hourlyCost;

    // Cost of extra photo processing
    const photosPrice = photosEdited * 1500; // 1,500 colones per edited high-res file

    // Addons cost additions
    const webDevAddon = isWebDevSelected ? 120000 : 0; // professional landing
    const socialSetupAddon = isSocialSetupSelected ? 35000 : 0; // complete profile setups
    const rawDeliveryAddon = isRawDeliverySelected ? 20000 : 0; // master files

    const calculatedTotal = baseRate + hoursPrice + photosPrice + webDevAddon + socialSetupAddon + rawDeliveryAddon;
    setTotalPrice(calculatedTotal);
  }, [serviceType, hours, photosEdited, isWebDevSelected, isSocialSetupSelected, isRawDeliverySelected]);

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
      isWebDevSelected ? '• Desarrollo Web Profesional' : '',
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

  return (
    <section className="bg-[#FAFAFA] text-zinc-900 py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Module Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-zinc-550 mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>MÓDULO INTERACTIVO DE COTIZACIÓN</span>
          </div>
          
          <h2 className="text-4xl font-serif font-light tracking-tight text-neutral-950 uppercase border-b border-black/5 pb-2">
            Cotizador Personalizado
          </h2>
          
          <p className="text-zinc-650 font-sans text-xs sm:text-sm font-light mt-2 max-w-xl leading-relaxed">
            Diseña tu solución a medida en vivo. Ajusta los parámetros según las necesidades financieras e intelectuales de tu marca, y solicita una proforma oficial instantánea.
          </p>
        </div>

        {/* Configurator Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form panel */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 p-6 sm:p-8 rounded-none space-y-8 shadow-sm">
            
            {/* Control Group 1: Service Type */}
            <div className="space-y-3">
              <label className="text-xs font-semibold tracking-wider uppercase text-zinc-500 block">
                Tipo de Servicio Requerido
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'photo', label: 'Solo Fotografía' },
                  { id: 'video', label: 'Solo Video' },
                  { id: 'combo', label: 'Combo M&M' }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setServiceType(type.id as any)}
                    className={`py-3.5 px-2 rounded-none text-center text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                      serviceType === type.id
                        ? 'bg-black text-white border-black'
                        : 'bg-neutral-100 border-neutral-200 text-zinc-500 hover:border-black'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Control Group 2: Hours range slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold tracking-wider uppercase">
                <span className="text-zinc-550">Duración del Rodaje / Cobertura</span>
                <span className="text-zinc-900 font-mono bg-neutral-100 px-2 py-0.5 rounded-none border border-neutral-200 text-[11px]">
                  {hours} {hours === 1 ? 'Hora' : 'Horas'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="w-full h-1 bg-neutral-200 rounded-none appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                <span>1 Hora</span>
                <span>4 Horas (Sesión media)</span>
                <span>8 Horas (Día Completo)</span>
              </div>
            </div>

            {/* Control Group 3: Photos slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold tracking-wider uppercase">
                <span className="text-zinc-550">Fotografías Editadas Premium</span>
                <span className="text-zinc-900 font-mono bg-neutral-100 px-2 py-0.5 rounded-none border border-neutral-200 text-[11px]">
                  {photosEdited} Unidades
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={photosEdited}
                onChange={(e) => setPhotosEdited(parseInt(e.target.value))}
                className="w-full h-1 bg-neutral-200 rounded-none appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                <span>5 Fotos</span>
                <span>40 Fotos</span>
                <span>80 Fotos Max</span>
              </div>
            </div>

            {/* Control Group 4: Addons switches list */}
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <label className="text-xs font-semibold tracking-wider uppercase text-zinc-500 block">
                Planes y Módulos Extra de Emprendimiento
              </label>

              <div className="space-y-3">
                {/* Addon 1: Web Development */}
                <button
                  onClick={() => setIsWebDevSelected(!isWebDevSelected)}
                  className={`flex items-center justify-between w-full p-4 border rounded-none text-left transition-all ${
                    isWebDevSelected
                      ? 'border-black bg-neutral-50 shadow-sm'
                      : 'border-neutral-200 bg-white hover:border-black'
                  }`}
                >
                  <div className="flex items-start space-x-3 pr-3">
                    <input
                      type="checkbox"
                      checked={isWebDevSelected}
                      readOnly
                      className="mt-1 accent-black"
                    />
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-zinc-905">Desarrollo Web de Portafolio</span>
                      <span className="block text-xs text-zinc-500 font-light font-sans mt-0.5 leading-relaxed">Te programamos tu web profesional elegante integrada para captar prospectos.</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-black shrink-0">+₡120k</span>
                </button>

                {/* Addon 2: Social Setup */}
                <button
                  onClick={() => setIsSocialSetupSelected(!isSocialSetupSelected)}
                  className={`flex items-center justify-between w-full p-4 border rounded-none text-left transition-all ${
                    isSocialSetupSelected
                      ? 'border-black bg-neutral-50 shadow-sm'
                      : 'border-neutral-200 bg-white hover:border-black'
                  }`}
                >
                  <div className="flex items-start space-x-3 pr-3">
                    <input
                      type="checkbox"
                      checked={isSocialSetupSelected}
                      readOnly
                      className="mt-1 accent-black"
                    />
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-zinc-905">Optimización de Perfiles de Redes</span>
                      <span className="block text-xs text-zinc-500 font-light font-sans mt-0.5 leading-relaxed">Estrategia SEO local, hashtags definidos y configuración avanzada de tus perfiles en CR.</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-black shrink-0">+₡35k</span>
                </button>

                {/* Addon 3: Raw files */}
                <button
                  onClick={() => setIsRawDeliverySelected(!isRawDeliverySelected)}
                  className={`flex items-center justify-between w-full p-4 border rounded-none text-left transition-all ${
                    isRawDeliverySelected
                      ? 'border-black bg-neutral-50 shadow-sm'
                      : 'border-neutral-200 bg-white hover:border-black'
                  }`}
                >
                  <div className="flex items-start space-x-3 pr-3">
                    <input
                      type="checkbox"
                      checked={isRawDeliverySelected}
                      readOnly
                      className="mt-1 accent-black"
                    />
                    <div>
                      <span className="block text-xs font-bold uppercase tracking-wider text-zinc-905">Entrega Completa de Archivos RAW</span>
                      <span className="block text-xs text-zinc-500 font-light font-sans mt-0.5 leading-relaxed">Te enviamos todo el material bruto sin comprimir vía SSD o Drive.</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-black shrink-0">+₡20k</span>
                </button>
              </div>

            </div>

          </div>

          {/* Estimates Price Output panel */}
          <div className="lg:col-span-5 bg-white p-8 border border-neutral-250 rounded-none space-y-6 flex flex-col justify-between self-stretch shadow-sm text-zinc-900">
            
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-zinc-450 uppercase block">Resumen del Presupuesto</span>
              
              <h3 className="text-2xl font-serif font-light tracking-tight text-zinc-950 uppercase leading-none">
                Estudio Estético Estimado
              </h3>
              
              <div className="w-12 h-[1px] bg-black" />

              <div className="space-y-3.5 pt-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-550 font-sans">Precio Base de Cobertura</span>
                  <span className="font-mono text-zinc-800 font-semibold">
                    {serviceType === 'photo' ? '₡35,000' : serviceType === 'video' ? '₡50,000' : '₡75,000'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-550 font-sans">Sesión ({hours} horas de rodaje)</span>
                  <span className="font-mono text-zinc-800 font-semibold">
                    +₡{new Intl.NumberFormat('es-CR').format(hours * (serviceType === 'combo' ? 18000 : 12000))}
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-550 font-sans">Retoques ({photosEdited} archivos de imagen)</span>
                  <span className="font-mono text-zinc-800 font-semibold">
                    +₡{new Intl.NumberFormat('es-CR').format(photosEdited * 1500)}
                  </span>
                </div>

                {isWebDevSelected && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-555 font-sans">Módulo Desarrollo Web Fijo</span>
                    <span className="font-mono text-zinc-800 font-semibold">+₡120,000</span>
                  </div>
                )}

                {isSocialSetupSelected && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-555 font-sans">Módulo Redes Sociales Fijo</span>
                    <span className="font-mono text-zinc-800 font-semibold">+₡35,000</span>
                  </div>
                )}

                {isRawDeliverySelected && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-555 font-sans">Entrega Bruta RAW Fijo</span>
                    <span className="font-mono text-zinc-800 font-semibold">+₡20,000</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing total calculations */}
            <div className="pt-8 border-t border-neutral-200 space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-xs uppercase font-sans text-zinc-500 tracking-wide font-medium">Inversión Final Sugerida</span>
                <div className="text-right">
                  <span className="block text-4xl font-serif font-light tracking-tight text-black">
                    {new Intl.NumberFormat('es-CR', {
                      style: 'currency',
                      currency: 'CRC',
                      minimumFractionDigits: 0,
                    }).format(totalPrice)}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono tracking-wider block mt-1">₡ Colones costarricenses aprox.</span>
                </div>
              </div>

              <div className="bg-neutral-50 p-4 border border-neutral-200 rounded-none flex items-start space-x-3.5">
                <Lightbulb className="w-4 h-4 text-black shrink-0 mt-0.5 animate-pulse" />
                <p className="text-[11px] leading-relaxed text-zinc-505">
                  Las estimaciones calculadas son aproximadas. Al presionar el botón de WhatsApp se enviará un desglose preciso del servicio a Miranda para darte una oferta formal exacta en menos de 24 horas.
                </p>
              </div>

              <button
                onClick={handleSendEstimate}
                className="w-full py-4 bg-black text-white text-center font-sans font-bold text-xs tracking-widest uppercase rounded-none hover:bg-zinc-800 transition-colors flex items-center justify-center space-x-2.5 cursor-pointer shadow-sm shadow-black/5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Solicitar Proforma vía WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
