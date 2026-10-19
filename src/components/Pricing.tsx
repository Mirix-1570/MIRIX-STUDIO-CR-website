/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { ServicePlan } from '../types';

interface PricingProps {
  plans: ServicePlan[];
  biography: {
    whatsapp: string;
  };
}

const ACTIONS = ['Elegir este plan', 'Reservar este plan', 'Solicitar briefing'];

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
    <section id="retainers" className="relative w-full overflow-hidden px-6 lg:px-16 py-16 lg:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/logo/fondo.jpeg')" }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center space-y-4 text-center">
          <span className="font-label text-[11px] font-semibold uppercase tracking-[0.32em] text-champagne">
            Acompañamiento creativo
          </span>
          <h2 className="font-serif text-4xl tracking-tight text-white lg:text-6xl">
            Arquitectura de planes Mirix
          </h2>
          <p className="max-w-2xl font-sans text-[15px] leading-7 text-marfil/90">
            Una infraestructura creativa clara. El estudio actúa como tu departamento de dirección visual, sin la fricción de una agencia fragmentada.
          </p>
          <div className="inline-flex overflow-hidden rounded-md shadow-md">
            <button
              type="button"
              onClick={() => setCurrency('CRC')}
              className={`cursor-pointer px-6 py-2.5 font-label text-[11px] uppercase tracking-[0.18em] transition-colors ${
                currency === 'CRC' ? 'bg-bosque font-semibold text-white' : 'bg-[#F7F1E8] font-medium text-malva'
              }`}
            >
              Colones
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`cursor-pointer px-6 py-2.5 font-label text-[11px] uppercase tracking-[0.18em] transition-colors ${
                currency === 'USD' ? 'bg-bosque font-semibold text-white' : 'bg-[#F7F1E8] font-medium text-malva'
              }`}
            >
              Dólares
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
          {plans.map((plan, index) => {
            const featured = index === 1;
            const action = ACTIONS[index] ?? 'Elegir este plan';

            return (
              <article
                key={plan.id}
                className={`relative flex flex-col bg-[#FBF8F3] px-7 pb-7 pt-6 text-ciruela shadow-xl ${
                  featured ? 'border-2 border-oro lg:-mt-3 lg:mb-[-12px]' : 'border border-[#E7DCC8]'
                }`}
              >
                {featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="whitespace-nowrap bg-oro px-4 py-1.5 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-ciruela shadow-sm">
                      El más solicitado
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 border-b border-[#E4D8C4] pb-4">
                  <span className="font-label text-[11px] font-semibold uppercase tracking-[0.22em] text-wine">
                    Nivel 0{index + 1}
                  </span>
                  <span className="border border-[#D9CDB8] px-2.5 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.12em] text-ciruela">
                    {plan.duration}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-[1.7rem] leading-tight text-ciruela">{plan.name}</h3>
                <p className="mt-2 text-[13.5px] leading-6 text-malva">{plan.description}</p>

                <div className="mt-6 border-t border-[#E4D8C4] pt-5">
                  <p className="font-serif text-[2.6rem] font-medium leading-none tracking-tight text-ciruela">
                    {formatPrice(plan.price)}
                  </p>
                  <span className="mt-2 block font-label text-[10px] uppercase tracking-[0.16em] text-malva">
                    {currency === 'CRC' ? 'Colones costarricenses' : 'Referencia en dólares'}
                  </span>
                </div>

                <ul className="mt-6 flex-1 space-y-3 text-[13.5px] leading-5 text-ciruela">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span className="mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-bosque text-bosque">
                        <Check className="h-3 w-3" strokeWidth={2.5} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan)}
                  className="mt-8 inline-flex w-full cursor-pointer items-center justify-center gap-3 bg-bosque py-3.5 font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-verde"
                >
                  {action}
                  <span aria-hidden="true">→</span>
                </button>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-[13px] text-champagne/90">
          Los precios cubren Esparza y Puntarenas centro. Para otras zonas del país se cotiza el viático por separado.
        </p>
      </div>
    </section>
  );
}
