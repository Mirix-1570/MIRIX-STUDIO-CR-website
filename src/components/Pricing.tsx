/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Asterisk, CircleCheck, Sparkles, MessageSquare, Briefcase } from 'lucide-react';
import { ServicePlan } from '../types';

interface PricingProps {
  plans: ServicePlan[];
  biography: {
    whatsapp: string;
  };
}

export default function Pricing({ plans, biography }: PricingProps) {
  const [currency, setCurrency] = useState<'CRC' | 'USD'>('CRC');
  
  // Approximate conversion rate CRC to USD: 1 USD = 515 CRC
  const CONVERSION_RATE = 515;

  const formatPrice = (price: number, planCurrency: 'CRC' | 'USD') => {
    if (currency === 'CRC') {
      return new Intl.NumberFormat('es-CR', {
        style: 'currency',
        currency: 'CRC',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    } else {
      const converted = Math.round(price / CONVERSION_RATE);
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(converted);
    }
  };

  const cleanPhone = (phone: string) => {
    return phone.replace(/[^0-9+]/g, '');
  };

  const handleSelectPlan = (plan: ServicePlan) => {
    const formattedPrice = formatPrice(plan.price, plan.currency);
    const message = encodeURIComponent(
      `¡Hola Miranda! Me interesa contratar el plan *${plan.name}* (${formattedPrice} ${currency}) para mi negocio. Me gustaría agendar una reunión o coordinar la sesión. ¡Gracias!`
    );
    const whatsappLink = `https://wa.me/${cleanPhone(biography.whatsapp)}?text=${message}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <section className="bg-[#FAFAFA] text-zinc-900 py-24 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Background elements */}
      <div className="absolute right-12 top-12 w-80 h-80 bg-neutral-200/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-zinc-550 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-zinc-500" />
            <span>TARIFAS ADAPTABLES CR</span>
          </div>
          
          <h2 className="text-4xl font-serif font-light tracking-tight text-neutral-950 uppercase">
            Planes de Pago
          </h2>
          
          <p className="text-zinc-650 font-sans text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto">
            Paquetes desarrollados de manera justa y competitiva para el mercado de Costa Rica. Elige la solución perfecta según la etapa de tu negocio.
          </p>

          {/* Interactive Currency Selector toggle */}
          <div className="pt-4 flex items-center justify-center space-x-3">
            <span className={`text-xs font-semibold tracking-wider uppercase transition-colors ${currency === 'CRC' ? 'text-zinc-950 font-bold' : 'text-zinc-400'}`}>Colones (₡)</span>
            <button
              onClick={() => setCurrency(currency === 'CRC' ? 'USD' : 'CRC')}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-neutral-300 bg-neutral-200 transition-colors duration-200 ease-in-out focus:outline-none"
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  currency === 'USD' ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-semibold tracking-wider uppercase transition-colors ${currency === 'USD' ? 'text-zinc-950 font-bold' : 'text-zinc-400'}`}>Dólares ($)</span>
          </div>
        </div>

        {/* 3 Columns Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-6">
          {plans.map((plan, index) => {
            const isFeatured = plan.id === 'plan-audiovisual'; // highlight middle plan as standard premium
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col justify-between p-8 bg-white border transition-all duration-300 rounded-none shadow-sm ${
                  isFeatured 
                    ? 'border-black bg-white shadow-md shadow-zinc-200/50' 
                    : 'border-neutral-200 hover:border-neutral-350'
                }`}
              >
                {/* Featured Badge tag decor if selected */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-6 bg-black text-white px-3.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-none">
                    Recomendado
                  </div>
                )}

                {/* Plan Metadata */}
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-serif font-light tracking-tight uppercase text-zinc-950">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-zinc-550 mt-1.5 font-sans font-light leading-relaxed min-h-[40px]">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing tag */}
                  <div className="border-b border-neutral-200 pb-6 mb-6">
                    <span className="text-4xl font-serif font-light tracking-tight text-neutral-950">
                      {formatPrice(plan.price, plan.currency)}
                    </span>
                    <span className="text-zinc-500 text-xs font-light font-sans ml-1.5">
                      {plan.duration}
                    </span>
                  </div>

                  {/* Features listing checkmarks */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono tracking-widest text-zinc-450 uppercase block">Inclusiones claves</span>
                    <ul className="space-y-3.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-sm">
                          <CircleCheck className="w-4 h-4 text-zinc-550 shrink-0 mt-0.5" />
                          <span className="text-zinc-650 font-light font-sans leading-tight">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Booking call message CTA */}
                <div className="pt-8 mt-8 border-t border-neutral-200">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-3.5 font-sans font-bold text-xs tracking-widest uppercase transition-all rounded-none cursor-pointer flex items-center justify-center space-x-2 ${
                      isFeatured
                        ? 'bg-black text-white hover:bg-zinc-800'
                        : 'bg-neutral-100 border border-neutral-200 text-zinc-700 hover:bg-neutral-200 hover:text-black hover:border-neutral-300'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>Contratar vía WhatsApp</span>
                  </button>
                  <p className="text-center text-[10px] text-zinc-450 mt-2 font-mono">
                    Garantía de respuesta rápida • Costa Rica
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Informative advice note */}
        <div className="mt-12 text-center">
          <p className="text-zinc-500 text-xs font-mono max-w-xl mx-auto leading-relaxed">
            * Los precios mostrados están calculados para cobertura directa en Esparza y Puntarenas centro. Para otras ubicaciones en el país, se cotiza viático adicional de forma oportuna.
          </p>
        </div>

      </div>
    </section>
  );
}
