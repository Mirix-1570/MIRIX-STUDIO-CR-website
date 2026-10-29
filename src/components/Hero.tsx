/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface HeroProps {
  onNavigate: (target: string) => void;
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

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="home" className="relative w-full overflow-hidden bg-vino text-white">
      <img
        src="/imagen01.jpg"
        alt=""
        fetchPriority="high"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[40%_30%] lg:inset-auto lg:top-1/2 lg:-left-[2vw] lg:h-auto lg:w-[142vw] lg:max-w-none lg:-translate-y-[48%]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(45,6,24,0.96) 0%, rgba(45,6,24,0.86) 22%, rgba(45,6,24,0.45) 38%, rgba(21,0,8,0.12) 52%, rgba(21,0,8,0.45) 100%)',
        }}
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[46%] opacity-70">
        <BotanicalField />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-16 py-12 lg:py-16">
        <div className="max-w-3xl space-y-5">
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
      </div>
    </section>
  );
}
