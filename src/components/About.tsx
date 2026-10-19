/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface AboutProps {
  biography: {
    name: string;
    tagline: string;
    story: string;
    location: string;
  };
}

const pillars = [
  {
    number: '01',
    title: 'Mi historia',
    text: 'Nací y crecí en Esparza, Puntarenas, un lugar que me inspira y me conecta con lo auténtico. Desde pequeña siempre me ha gustado crear, observar, aprender y transformar ideas en algo visualmente significativo. En 2018 descubrí el diseño gráfico y desde entonces supe que la creatividad sería parte de mi camino.',
  },
  {
    number: '02',
    title: 'Mi propósito',
    text: 'Mirix Studio no es solo un negocio; es el fruto de mi caminar junto a Dios y de materializar talentos para aportar valor en la sociedad. Mi propósito es ayudar a personas y marcas a comunicar su esencia a través del diseño de experiencias visuales, la creación de contenido y la locución, generando impacto positivo en las personas y sus proyectos.',
  },
];

export default function About({ biography }: AboutProps) {
  const paragraphs = biography.story.split('\n\n');

  return (
    <section id="about" className="w-full px-6 lg:px-16 py-16 lg:py-24 bg-marfil text-ciruela border-b border-oro/25">
      <div className="w-full max-w-[1280px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl lg:text-5xl font-normal text-ciruela"
        >
          Quiénes somos
        </motion.h2>
        <div className="w-16 h-[3px] bg-oro mt-3" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mt-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <img
              src="/logo/presentacion%2001.png"
              alt="Miranda Méndez, fundadora y directora creativa de Mirix Studio CR"
              className="w-full aspect-[4/5] object-cover object-[center_18%] select-none"
            />
          </motion.div>

          <div className="lg:col-span-7 lg:pt-1">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-label text-[11px] text-wine font-semibold uppercase tracking-[0.28em]">
                Fundadora y directora creativa
              </span>
              <h3 className="mt-4 font-serif italic font-normal text-[1.85rem] sm:text-4xl lg:text-[2.7rem] leading-[1.15] tracking-tight text-ciruela">
                Diseñadora de experiencias visuales, creadora de contenido y locutora.
              </h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-7 space-y-5 text-malva font-sans font-normal leading-[1.75] text-[15px] sm:text-base"
            >
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 mt-10">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                >
                  <span className="font-label text-[11px] tracking-[0.18em] text-oro font-semibold">
                    {pillar.number}
                  </span>
                  <h4 className="mt-1.5 font-serif text-[15px] uppercase tracking-[0.22em] text-ciruela">
                    {pillar.title}
                  </h4>
                  <div className="w-10 h-px bg-oro mt-3 mb-4" />
                  <p className="text-[13.5px] text-malva font-sans font-normal leading-[1.7]">
                    {pillar.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
