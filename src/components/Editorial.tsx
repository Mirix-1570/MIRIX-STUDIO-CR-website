/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Leaf, Grid3x3, Sparkles, PenLine, Clapperboard, Camera, Share2, BookOpen, Megaphone } from 'lucide-react';

const DISCIPLINES = [
  {
    n: '01',
    tone: 'wine' as const,
    icon: PenLine,
    title: 'Identidad y estructura de marca',
    text: 'Sistemas visuales, paletas, tipografías y piezas gráficas que sostienen una marca con presencia editorial.',
    tags: ['Marcas visuales', 'Ciencia del color', 'Tipografía'],
    lead: 'bosque' as const,
  },
  {
    n: '02',
    tone: 'bosque' as const,
    icon: Clapperboard,
    title: 'Audiovisual y cine',
    text: 'Videos comerciales, reels y piezas narrativas con dirección de luz, sonido nítido y un acabado cinematográfico.',
    tags: ['Video comercial', 'Sonido', 'Color'],
    lead: 'wine' as const,
  },
  {
    n: '03',
    tone: 'wine' as const,
    icon: Camera,
    title: 'Fotografía editorial',
    text: 'Retrato de marca, still life, gastronomía y arquitectura. Luz dirigida y composición pensada para perdurar.',
    tags: ['Retrato', 'Producto', 'Dirección de arte'],
    lead: 'bosque' as const,
  },
  {
    n: '04',
    tone: 'bosque' as const,
    icon: BookOpen,
    title: 'Diseño editorial y catálogos',
    text: 'Catálogos, láminas y piezas impresas con composición cuidada, del papel al PDF de alto impacto.',
    tags: ['Catálogos', 'Editorial', 'Impresión'],
    lead: 'wine' as const,
  },
  {
    n: '05',
    tone: 'wine' as const,
    icon: Share2,
    title: 'Redes y sistemas digitales',
    text: 'Contenido estratégico para redes, calendarios y piezas que conectan la marca con su audiencia.',
    tags: ['Reels', 'Feed', 'Calendario'],
    lead: 'bosque' as const,
  },
  {
    n: '06',
    tone: 'bosque' as const,
    icon: Megaphone,
    title: 'Voz editorial y estrategia',
    text: 'Tono de marca, copys y narrativas de temporada para que cada publicación suene a la casa, no a una plantilla.',
    tags: ['Manifiesto', 'Copys', 'Protocolo social'],
    lead: 'wine' as const,
  },
];

export function Manifesto() {
  return (
    <section className="w-full px-6 lg:px-16 py-16 lg:py-20 bg-marfil border-b border-oro/25">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-3 space-y-2">
          <span className="font-label text-[10px] uppercase tracking-[0.22em] text-wine font-bold block">
            Manifiesto del estudio
          </span>
          <span className="font-serif text-2xl text-bosque font-semibold block leading-snug">
            01 / Luz y permanencia
          </span>
          <div className="w-14 h-1 bg-oro mt-3" />
        </div>
        <div className="lg:col-span-9 space-y-5">
          <p className="font-serif text-[28px] lg:text-[32px] leading-snug text-ciruela font-normal">
            “Rechazamos el ruido visual desechable. Unimos la energía orgánica del trópico con una geometría tipográfica rigurosa para componer marcas que permanecen.”
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#F3ECE0] border border-oro/40 px-3.5 py-2">
              <Leaf className="w-4 h-4 text-bosque" />
              <span className="text-bosque font-medium text-[13px]">Luz y flora de Costa Rica</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F3ECE0] border border-oro/40 px-3.5 py-2">
              <Grid3x3 className="w-4 h-4 text-wine" />
              <span className="text-ciruela font-medium text-[13px]">Disciplina de retícula</span>
            </div>
            <div className="flex items-center gap-2 bg-[#F3ECE0] border border-oro/40 px-3.5 py-2">
              <Sparkles className="w-4 h-4 text-[#B38F3F]" />
              <span className="text-ciruela font-medium text-[13px]">Realización digital y tangible</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Disciplines() {
  return (
    <section id="services" className="w-full px-6 lg:px-16 py-16 lg:py-20 bg-beige border-b border-oro/25">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div className="space-y-2">
          <span className="font-label text-[10px] uppercase tracking-[0.22em] text-wine font-bold">
            Capacidades creativas
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl text-ciruela font-normal">Disciplinas del estudio</h2>
        </div>
        <p className="font-sans text-[15px] leading-6 text-malva max-w-md">
          Seis oficios reunidos con precisión de atelier: de la fotografía y el cine al diseño editorial y la voz de marca.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DISCIPLINES.map((item) => {
          const Icon = item.icon;
          const wine = item.tone === 'wine';
          return (
            <article
              key={item.n}
              className={`group bg-marfil border-t-4 ${wine ? 'border-t-wine' : 'border-t-bosque'} border-x border-b border-oro/30 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-6`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`font-label text-[10px] tracking-[0.22em] uppercase font-bold ${wine ? 'text-wine' : 'text-bosque'}`}>
                    Disciplina {item.n}
                  </span>
                  <Icon className={`w-6 h-6 group-hover:translate-x-1 transition-transform ${wine ? 'text-wine' : 'text-bosque'}`} />
                </div>
                <h3 className="font-serif text-2xl text-ciruela">{item.title}</h3>
                <p className="font-sans text-[15px] leading-6 text-malva">{item.text}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-1 font-label text-[10px] tracking-wider uppercase ${
                      index === 0
                        ? item.lead === 'bosque'
                          ? 'bg-bosque text-mint font-semibold'
                          : 'bg-wine text-champagne font-semibold'
                        : 'bg-arena text-ciruela border border-oro/40 font-medium'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
