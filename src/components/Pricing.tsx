/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckCircle2, Circle, Gem, Sparkles } from 'lucide-react';
import { ServicePlan } from '../types';

interface PricingProps {
  plans: ServicePlan[];
  biography: {
    whatsapp: string;
  };
}

export default function Pricing({ plans, biography }: PricingProps) {
  const [currency, setCurrency] = useState<'CRC' | 'USD'>('CRC');
  const CONVERSION_RATE = 515;

  const formatPrice = (price: number) => {
    if (currency === 'CRC') {
      return new Intl.NumberFormat('es-CR', {
        style: 'currency',
        currency: 'CRC',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(price / CONVERSION_RATE));
  };

  const cleanPhone = (phone: string) => phone.replace(/[^0-9+]/g, '');

  const handleSelectPlan = (plan: ServicePlan) => {
    const formattedPrice = formatPrice(plan.price);
    const message = encodeURIComponent(
      `¡Hola Miranda! Me interesa contratar el plan *${plan.name}* (${formattedPrice} ${currency}) para mi negocio. Me gustaría agendar una reunión o coordinar la sesión. ¡Gracias!`
    );
    window.open(`https://wa.me/${cleanPhone(biography.whatsapp)}?text=${message}`, '_blank');
  };

  return (
    <section id="retainers" className="w-full px-6 lg:px-16 py-16 lg:py-20 bg-marfil border-b border-oro/25">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 space-y-3">
        <span className="font-label text-[10px] uppercase tracking-[0.22em] text-wine font-bold">
          Acompañamiento creativo
        </span>
        <h2 className="font-serif text-4xl lg:text-5xl text-ciruela tracking-tight">Arquitectura de planes Mirix</h2>
        <p className="font-sans text-[15px] leading-7 text-malva pt-1">
          Una infraestructura creativa clara. El estudio actúa como tu departamento de dirección visual, sin la fricción de una agencia fragmentada.
        </p>
        <div className="pt-4 inline-flex items-center p-1 bg-arena border border-oro/40">
          <button
            type="button"
            onClick={() => setCurrency('CRC')}
            className={`px-5 py-2 font-label text-[10px] uppercase tracking-[0.18em] transition-all cursor-pointer ${
              currency === 'CRC' ? 'bg-bosque text-champagne font-semibold' : 'text-malva hover:text-ciruela font-medium'
            }`}
          >
            Colones
          </button>
          <button
            type="button"
            onClick={() => setCurrency('USD')}
            className={`px-5 py-2 font-label text-[10px] uppercase tracking-[0.18em] transition-all cursor-pointer ${
              currency === 'USD' ? 'bg-bosque text-champagne font-semibold' : 'text-malva hover:text-ciruela font-medium'
            }`}
          >
            Dólares
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, index) => {
          const tier = index % 3;
          const featured = tier === 1;
          const couture = tier === 2;
          const Icon = featured ? Gem : couture ? Sparkles : Circle;

          return (
            <article
              key={plan.id}
              className={`relative flex flex-col justify-between p-8 transition-all duration-300 ${
                featured
                  ? 'bg-borgona border-2 border-oro text-white shadow-2xl'
                  : couture
                  ? 'bg-bosque border border-[#2D5A46] text-white shadow-xl'
                  : 'bg-white border border-oro/35 text-ciruela shadow-sm hover:shadow-xl'
              }`}
            >
              {featured && (
                <div className="absolute -top-3.5 inset-x-0 flex justify-center">
                  <span className="px-4 py-1 bg-wine text-white border border-oro font-label text-[10px] uppercase tracking-[0.18em] font-bold shadow-md">
                    El más solicitado
                  </span>
                </div>
              )}

              <div className={`space-y-5 ${featured ? 'pt-2' : ''}`}>
                <div className={`flex items-center justify-between border-b pb-3 ${featured ? 'border-oro/30' : couture ? 'border-[#2D5A46]' : 'border-oro/20'}`}>
                  <div className="flex items-center gap-1.5">
                    <Icon className={`w-3.5 h-3.5 ${featured || couture ? 'text-champagne' : 'text-wine'}`} />
                    <span className={`font-label text-[10px] tracking-[0.2em] uppercase font-bold ${featured || couture ? 'text-champagne' : 'text-wine'}`}>
                      Nivel 0{index + 1}
                    </span>
                  </div>
                  <span className={`font-label text-[10px] px-2 py-0.5 uppercase font-semibold ${
                    featured
                      ? 'bg-bosque text-mint border border-[#2D5A46]'
                      : couture
                      ? 'bg-borgona text-champagne border border-oro/40'
                      : 'bg-marfil text-bosque border border-oro/30'
                  }`}>
                    {plan.duration}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className={`font-serif text-2xl ${featured || couture ? 'text-white' : 'text-ciruela'}`}>{plan.name}</h3>
                  <p className={`text-[13px] leading-5 ${featured ? 'text-[#FFD9E4]' : couture ? 'text-sage' : 'text-malva'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className={`py-4 border-y ${featured ? 'border-oro/30' : couture ? 'border-[#2D5A46]' : 'border-oro/25'}`}>
                  <div className="flex items-baseline gap-2">
                    <span className={`font-serif text-4xl lg:text-5xl font-semibold leading-none ${featured || couture ? 'text-champagne' : 'text-ciruela'}`}>
                      {formatPrice(plan.price)}
                    </span>
                  </div>
                  <span className={`font-label text-[10px] uppercase tracking-wider block mt-2 ${featured ? 'text-champagne' : couture ? 'text-mint' : 'text-malva'}`}>
                    {currency === 'CRC' ? 'Colones costarricenses' : 'Referencia en dólares'}
                  </span>
                </div>

                <ul className={`space-y-3 text-[13px] leading-5 ${featured ? 'text-marfil' : couture ? 'text-mint' : 'text-ciruela'}`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${featured || couture ? 'text-oro-calido' : 'text-bosque'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full inline-flex items-center justify-center py-3.5 px-6 font-label text-[10px] uppercase tracking-[0.18em] font-bold text-center cursor-pointer transition-colors ${
                    featured
                      ? 'bg-oro hover:bg-oro-calido text-ciruela shadow-lg'
                      : couture
                      ? 'border-2 border-oro text-champagne hover:bg-oro hover:text-ciruela'
                      : 'border-2 border-bosque text-bosque hover:bg-bosque hover:text-mint'
                  }`}
                >
                  {featured ? 'Reservar este plan' : couture ? 'Solicitar briefing' : 'Elegir este plan'}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-10 text-center text-[13px] text-malva max-w-2xl mx-auto">
        Los precios cubren Esparza y Puntarenas centro. Para otras zonas del país se cotiza el viático por separado.
      </p>
    </section>
  );
}
