/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BadgeCheck } from 'lucide-react';

interface HeroProps {
  onNavigate: (target: string) => void;
  portfolioCount: number;
  location: string;
}

function BotanicalField() {
  return (
    <svg className="w-full h-full object-cover" fill="none" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g opacity="0.85" stroke="#FFDEA5" strokeWidth="1.4">
        <path d="M1250 120 C1280 200, 1380 260, 1340 370 C1300 480, 1160 520, 1080 440 C1000 360, 1030 220, 1130 150 Z" />
        <path d="M1130 150 Q1210 290 1210 450" />
        <path d="M1170 210 Q1100 240 1060 230 M1190 260 Q1280 290 1320 280 M1200 320 Q1120 370 1090 380 M1210 380 Q1290 410 1310 440" />
        <path d="M80 620 C140 540, 260 560, 290 680 C320 800, 230 890, 130 870 C30 850, 20 700, 80 620 Z" />
        <path d="M80 620 Q180 730 210 880" />
        <path d="M130 670 Q70 700 40 730 M150 710 Q240 730 270 720 M170 760 Q110 810 80 840" />
        <path d="M680 -60 C740 40, 860 60, 820 180 C780 300, 640 330, 560 250 C480 170, 520 40, 680 -60 Z" />
        <path d="M680 -60 Q700 130 690 270" />
      </g>
    </svg>
  );
}

export default function Hero({ onNavigate, portfolioCount, location }: HeroProps) {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-vino text-white">
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle at 75% 25%, #E9C176 0%, transparent 45%), radial-gradient(circle at 15% 80%, #1A2E26 0%, transparent 55%), #2D0618',
        }}
      >
        <BotanicalField />
      </div>

      <div className="relative isolate w-full px-6 lg:px-16 py-14 lg:py-28 flex flex-col justify-between">
        <img
          src="/imagen01.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_40%] lg:inset-auto lg:left-0 lg:top-1/2 lg:h-[192%] lg:w-auto lg:max-w-none lg:-translate-y-[46%]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(45,6,24,0.9) 0%, rgba(45,6,24,0.62) 26%, rgba(21,0,8,0.22) 48%, rgba(21,0,8,0.58) 100%)',
          }}
        />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 bg-bosque/80 border border-[#2D5A46] px-3.5 py-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-oro-calido" />
            <span className="font-label text-[10px] tracking-[0.22em] text-mint uppercase font-semibold">
              Esparza, Puntarenas · Costa Rica
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span className="font-label text-[10px] uppercase tracking-[0.22em] text-[#FFD9E4] font-medium">
              Vol. 2026 // Edición Atelier
            </span>
            <span className="w-12 h-px bg-oro/50" />
            <span className="font-label text-[10px] uppercase tracking-[0.18em] text-champagne bg-borgona px-3 py-1 border border-oro/40 font-semibold">
              Estudio en activo
            </span>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-bosque border border-[#2D5A46]">
              <span className="font-label text-[10px] uppercase tracking-[0.22em] text-champagne font-semibold">
                Identidad · Cine · Fotografía
              </span>
            </div>
            <h1 className="font-serif text-[40px] leading-[1.05] lg:text-[72px] lg:leading-[80px] tracking-tight text-white">
              El arte de la
              <br />
              <span className="italic font-normal text-champagne tracking-wide">sofisticación</span>
            </h1>
            <p className="font-sans text-lg font-light text-marfil max-w-2xl leading-relaxed">
              Donde la vitalidad de Costa Rica se encuentra con la precisión editorial. Identidades visuales, video cinematográfico y ecosistemas de marca pensados para perdurar.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('retainers')}
                className="inline-flex items-center justify-center bg-oro text-ciruela font-label text-[10px] uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300 hover:bg-oro-calido shadow-md font-semibold cursor-pointer"
              >
                Explorar planes
              </button>
              <button
                onClick={() => onNavigate('portfolio')}
                className="inline-flex items-center justify-center bg-bosque hover:bg-verde text-mint border border-[#2D5A46] font-label text-[10px] uppercase tracking-[0.2em] px-8 py-4 transition-all duration-300 shadow-md cursor-pointer"
              >
                Ver obras seleccionadas
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 w-full">
            <div className="bg-ciruela/80 border border-oro/40 p-5 space-y-4 shadow-2xl relative backdrop-blur-md">
              <div className="flex items-start justify-between border-b border-oro/20 pb-3 gap-3">
                <div>
                  <span className="font-label text-[10px] uppercase tracking-[0.22em] text-oro-calido font-semibold block">
                    Monograma MS
                  </span>
                  <span className="font-serif text-2xl text-white">Índice editorial</span>
                </div>
                <span className="font-label text-[10px] px-2.5 py-1 bg-wine border border-oro/50 text-champagne font-semibold uppercase shrink-0">
                  Costa Rica
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-borgona/60 border border-oro/20">
                  <span className="font-serif text-4xl text-champagne block leading-none">{portfolioCount}</span>
                  <span className="font-label text-[10px] uppercase tracking-[0.16em] text-[#FFD9E4] mt-2 block">
                    Obras en portafolio
                  </span>
                </div>
                <div className="p-3 bg-borgona/60 border border-oro/20">
                  <span className="font-serif text-4xl text-champagne block leading-none">CR</span>
                  <span className="font-label text-[10px] uppercase tracking-[0.16em] text-[#FFD9E4] mt-2 block">
                    Cobertura nacional
                  </span>
                </div>
              </div>
              <div className="p-3 bg-bosque/90 border border-[#2D5A46] space-y-1">
                <span className="font-label text-[10px] uppercase tracking-[0.18em] text-champagne flex items-center gap-1.5 font-semibold">
                  <BadgeCheck className="w-3.5 h-3.5 text-oro-calido" />
                  Sede creativa
                </span>
                <p className="text-[13px] leading-5 text-mint">{location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
