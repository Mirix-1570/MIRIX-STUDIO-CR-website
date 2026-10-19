/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Milestone, Compass } from 'lucide-react';

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
    <section id="about" className="w-full px-6 lg:px-16 py-16 lg:py-20 bg-marfil text-ciruela relative overflow-hidden border-b border-oro/25">
      <div className="w-full">
        <div className="max-w-2xl mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-label text-[10px] uppercase tracking-[0.22em] text-wine font-bold mb-3"
          >
            El estudio
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl lg:text-5xl font-normal text-ciruela"
          >
            Quiénes somos
          </motion.h2>
          <div className="w-14 h-1 bg-oro mt-4" />
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
              className="relative aspect-square sm:aspect-[4/5] w-full bg-white border border-oro/30 p-3 shadow-sm"
            >
              <div className="absolute inset-3 overflow-hidden bg-vino relative">
                {/* Visual Representation of Miranda */}
                <img
                  src="/logo/presentacion%2001.png"
                  alt="Miranda Méndez, dirección creativa de Mirix Studio CR"
                  className="w-full h-full object-cover object-[center_18%] hover:scale-105 transition-transform duration-1000 select-none"
                />
                
                {/* Signature Tag overlay */}
                <div className="absolute bottom-4 left-4 bg-marfil/95 backdrop-blur-sm px-4 py-2 border border-oro/40 shadow-sm text-ciruela">
                  <span className="font-serif text-sm block">{biography.name}</span>
                  <span className="font-label text-[9px] text-wine block tracking-[0.18em] uppercase">Dirección creativa</span>
                </div>
              </div>
            </motion.div>

            {/* In-focus Costa Rica location details */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-beige border border-oro/35 px-6 py-5 shadow-sm flex items-center gap-4"
            >
              <div className="p-3 bg-bosque text-mint">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-label text-[10px] tracking-[0.18em] uppercase text-wine block">Sede creativa</span>
                <span className="font-serif text-lg text-ciruela">{biography.location}</span>
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
              <span className="font-label text-[10px] text-wine font-semibold uppercase tracking-[0.2em]">Fundadora y directora</span>
              <h3 className="text-2xl sm:text-3xl font-serif italic font-normal tracking-tight text-ciruela">
                {biography.tagline}
              </h3>
            </motion.div>

            {/* Paragraph render */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-6 text-malva font-sans font-light leading-relaxed text-sm sm:text-base"
            >
              {paragraphs.map((p, index) => (
                <p key={index} className="text-malva whitespace-pre-line">
                  {p}
                </p>
              ))}
            </motion.div>

            {/* Core Values / Pillar Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-oro/25 pt-8 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-beige border border-oro/30 p-5 shadow-sm"
              >
                <div className="flex items-center space-x-2.5 mb-2">
                  <Milestone className="w-4 h-4 text-wine" />
                  <span className="font-label text-[10px] tracking-[0.16em] text-ciruela uppercase">El origen (2018)</span>
                </div>
                <p className="text-[13px] text-malva font-light font-sans leading-relaxed">
                  Descubrí el universo creativo en octavo de colegio gracias al entorno de diseño de un compañero. Fue ahí donde tracé mi visión de vida.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-beige border border-oro/30 p-5 shadow-sm"
              >
                <div className="flex items-center space-x-2.5 mb-2">
                  <Compass className="w-4 h-4 text-bosque" />
                  <span className="font-label text-[10px] tracking-[0.16em] text-ciruela uppercase">El propósito</span>
                </div>
                <p className="text-[13px] text-malva font-light font-sans leading-relaxed">
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
