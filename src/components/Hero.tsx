/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowRight, Instagram, Facebook, Mail, MapPin, Sparkles, Camera, Film, Code } from 'lucide-react';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
  biography: {
    name: string;
    tagline: string;
    location: string;
    whatsapp: string;
    email: string;
    facebook: string;
    facebookUrl: string;
    instagram: string;
    instagramUrl: string;
  };
}

export default function Hero({ setCurrentTab, biography }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] bg-[#FAFAFA] text-zinc-900 flex flex-col justify-between overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Lines Grid */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="absolute left-[20%] top-0 bottom-0 w-[1px] bg-zinc-200" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-zinc-200" />
        <div className="absolute left-[80%] top-0 bottom-0 w-[1px] bg-zinc-200" />
        <div className="absolute top-[35%] left-0 right-0 h-[1px] bg-zinc-200" />
        <div className="absolute top-[70%] left-0 right-0 h-[1px] bg-zinc-200" />
      </div>

      {/* Hero Body Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column Text details */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-neutral-100 border border-neutral-255 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-zinc-800 w-fit"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-900 animate-pulse" />
            <span>Mirix Studio CR • Producción de Contenido</span>
          </motion.div>

          {/* Master Headings - Beautiful Editorial Style */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl sm:text-8xl md:text-[95px] leading-[0.85] font-serif font-light tracking-tight text-neutral-950"
            >
              Creatividad<br />
              Visual<br />
              <span className="italic">Sin Límites_</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-xl text-base text-zinc-650 font-sans font-light leading-relaxed"
            >
              Capturamos la autenticidad de tu marca con fotografía elegante,
              producciones cinematográficas fluidas y gestión de redes sociales. 
              Diseñamos estrategias digitales para tu negocio.
            </motion.p>
          </div>

          {/* Call to Actions buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => setCurrentTab('portfolio')}
              className="group flex items-center justify-center space-x-3 px-8 py-4 bg-black text-white hover:bg-zinc-855 transition-all font-sans font-semibold text-xs tracking-widest uppercase rounded-none cursor-pointer shadow-sm"
            >
              <span>Ver Portafolio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
            
            <button
              onClick={() => setCurrentTab('pricing')}
              className="flex items-center justify-center space-x-3 px-8 py-4 bg-transparent border border-neutral-300 hover:border-black text-zinc-900 hover:bg-neutral-50 transition-all font-sans font-semibold text-xs tracking-widest uppercase rounded-none cursor-pointer"
            >
              <span>Explorar Planes</span>
            </button>
          </motion.div>

          {/* Brand pillars badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 border-t border-black/10 pt-8 max-w-lg"
          >
            <div className="flex items-center space-x-2">
              <Camera className="w-4 h-4 text-zinc-500" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-zinc-800">FOTOGRAFÍA</span>
            </div>
            <div className="flex items-center space-x-2">
              <Film className="w-4 h-4 text-zinc-500" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-zinc-800">PRODUCCIÓN</span>
            </div>
            <div className="flex items-center space-x-2">
              <Instagram className="w-4 h-4 text-zinc-500" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-zinc-800">REDES SOCIALES</span>
            </div>
          </motion.div>

        </div>

        {/* Right Column Layout Showcase frame */}
        <div className="lg:col-span-5 relative w-full aspect-square sm:aspect-[4/5] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="relative w-full h-[95%] bg-white border border-neutral-200 shadow-sm p-4 rounded-none"
          >
            <div className="absolute inset-4 overflow-hidden rounded-none bg-neutral-900 group">
              <img
                src="./public/IMG_20250209_135527-EFFECTS.jpg"
                alt="Creative photography camera and lighting setup"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center grayscale opacity-75 group-hover:scale-105 transition-transform duration-[4000ms] ease-out select-none"
              />
              
              {/* Internal overlay gradient lines */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
              
              {/* Overlay Interactive Tag */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[9px] tracking-[0.3em] uppercase text-zinc-350 font-sans block mb-1">AUDIOVISUAL SHOWCASE</span>
                <h3 className="text-xl font-serif tracking-tight mb-2">PRODUCCIONES CON ESCENCIA</h3>
                <p className="text-xs text-zinc-200 font-light font-sans max-w-xs">
                  Entregas fluidas e iluminaciones artísticas garantizan el posicionamiento de tu emprendimiento en Costa Rica.
                </p>
              </div>

              {/* Little Floating Badge */}
              <div className="absolute top-4 right-4 bg-white border border-neutral-200 px-3 py-1 rounded text-[9px] tracking-widest uppercase font-mono text-black shadow-sm">
                POÁS • CR
              </div>
            </div>
            
            {/* Outline box decor */}
            <div className="absolute -inset-1 border border-dashed border-neutral-350 rounded-none pointer-events-none -z-10" />
          </motion.div>
        </div>

      </div>

      {/* Hero Footing detail */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between border-t border-black/10 pt-8 text-zinc-500">
        <div className="flex items-center space-x-2 text-xs mb-4 sm:mb-0">
          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
          <span className="font-sans font-medium tracking-wide text-zinc-600">{biography.location}</span>
        </div>

        <div className="flex space-x-6">
          <a
            href={biography.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-zinc-600 hover:text-black transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span className="text-xs font-mono">@{biography.instagram}</span>
          </a>
          <a
            href={biography.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-zinc-600 hover:text-black transition-colors"
          >
            <Facebook className="w-4 h-4" />
            <span className="text-xs font-mono">{biography.facebook}</span>
          </a>
          <a
            href={`mailto:${biography.email}`}
            className="flex items-center space-x-1.5 text-zinc-600 hover:text-black transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span className="text-xs font-mono">{biography.email}</span>
          </a>
        </div>
      </div>
    </section>
  );
}