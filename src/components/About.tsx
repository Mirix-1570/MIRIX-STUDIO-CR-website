/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Info, Award, Heart, Sparkles, MapPin, Milestone, Compass } from 'lucide-react';

interface AboutProps {
  biography: {
    name: string;
    tagline: string;
    story: string;
    location: string;
  };
}

export default function About({ biography }: AboutProps) {
  // Split story into paragraphs to render elegantly
  const paragraphs = biography.story.split('\n\n');

  return (
    <section className="bg-[#FAFAFA] text-zinc-900 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Visual background accents */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-neutral-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-12 bottom-12 w-64 h-64 bg-neutral-200/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-zinc-550 mb-3"
          >
            <Info className="w-3.5 h-3.5" />
            <span>NUESTRA INSPIRACIÓN</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-serif font-light tracking-tight text-neutral-950 uppercase"
          >
            Quiénes Somos
          </motion.h2>
          
          <div className="w-16 h-[1.5px] bg-black mx-auto mt-4" />
        </div>

        {/* Story Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-6">
          
          {/* Left Column: Visual Portrait layout with brand quotes */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square sm:aspect-[4/5] w-full bg-white border border-neutral-250 p-3 rounded-none shadow-sm"
            >
              <div className="absolute inset-3 overflow-hidden rounded-none bg-neutral-905 relative">
                {/* Visual Representation of Miranda */}
                <img
                  src="./IMG_20260324_202843.jpg"
                  alt="Miranda Méndez - President & Creator of Mirix Studio CR"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale brightness-95 hover:scale-105 transition-transform duration-1000 select-none"
                />
                
                {/* Signature Tag overlay */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 border border-neutral-250 rounded-none shadow-sm text-black">
                  <span className="font-serif font-bold text-xs tracking-wider block text-zinc-950">{biography.name}</span>
                  <span className="font-sans text-[9px] text-zinc-550 block tracking-widest uppercase">CREATIVA TODO EN UNO</span>
                </div>
              </div>
            </motion.div>

            {/* In-focus Costa Rica location details */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-neutral-250 px-6 py-5 rounded-none shadow-sm flex items-center space-x-4 animate-fade-in"
            >
              <div className="p-3 bg-neutral-100 rounded-full text-zinc-700">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] tracking-widest uppercase text-zinc-450 font-sans block">Sede Creativa</span>
                <span className="text-sm font-serif font-medium text-zinc-900">{biography.location}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Dynamic biography reading from state */}
          <div className="lg:col-span-7 space-y-8 lg:pl-6">
            
            {/* Tagline details */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <span className="text-xs font-sans text-zinc-450 font-medium uppercase tracking-widest">FUNDADORA & DIRECTORA</span>
              <h3 className="text-2xl sm:text-3xl font-serif italic font-light tracking-tight text-neutral-950">
                {biography.tagline}
              </h3>
            </motion.div>

            {/* Paragraph render */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-6 text-zinc-700 font-sans font-light leading-relaxed text-sm sm:text-base selection:bg-black selection:text-white"
            >
              {paragraphs.map((p, index) => (
                <p key={index} className="text-zinc-650 whitespace-pre-line first-line:font-medium first-line:text-zinc-950">
                  {p}
                </p>
              ))}
            </motion.div>

            {/* Core Values / Pillar Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-black/10 pt-8 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white border border-neutral-250 p-5 rounded-none shadow-sm"
              >
                <div className="flex items-center space-x-2.5 mb-2">
                  <Milestone className="w-4 h-4 text-zinc-900" />
                  <span className="text-xs font-semibold tracking-wider text-zinc-950 uppercase">EL ORIGEN (2018)</span>
                </div>
                <p className="text-xs text-zinc-650 font-light font-sans leading-relaxed">
                  Descubrí el universo creativo en octavo de colegio gracias al entorno de diseño de un compañero. Fue ahí donde tracé mi visión de vida.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white border border-neutral-250 p-5 rounded-none shadow-sm"
              >
                <div className="flex items-center space-x-2.5 mb-2">
                  <Compass className="w-4 h-4 text-zinc-900" />
                  <span className="text-xs font-semibold tracking-wider text-zinc-950 uppercase">EL PROPÓSITO celestial</span>
                </div>
                <p className="text-xs text-zinc-650 font-light font-sans leading-relaxed">
                  Mirix Studio no es solo un negocio; es el fruto de mi caminar junto a Dios y de materializar talentos para aportar valor concreto en la sociedad.
                </p>
              </motion.div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
