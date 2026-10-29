/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, Film, ArrowRight, Palette } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioProps {
  portfolioItems: PortfolioItem[];
  setCurrentTab: (tab: string) => void;
}

const FILTERS: { id: 'all' | 'video' | 'photo' | 'design'; label: string }[] = [
  { id: 'all', label: 'Todo' },
  { id: 'photo', label: 'Fotografía' },
  { id: 'video', label: 'Cine' },
  { id: 'design', label: 'Diseño' },
];

const TYPE_LABEL: Record<PortfolioItem['type'], string> = {
  photo: 'Fotografía',
  video: 'Cine · Comercial',
  design: 'Identidad · Editorial',
};

export default function Portfolio({ portfolioItems, setCurrentTab }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'photo' | 'design'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = portfolioItems.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  return (
    <section id="portfolio" className="w-full px-6 lg:px-16 py-16 lg:py-20 bg-marfil border-b border-oro/25">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div className="space-y-2">
          <span className="font-label text-[10px] uppercase tracking-[0.22em] text-wine font-bold">
            Casos seleccionados
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl text-ciruela font-normal">Obras curadas</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((filter) => {
            const active = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 font-label text-[10px] uppercase tracking-[0.18em] border transition-colors cursor-pointer ${
                  active
                    ? 'bg-bosque text-champagne border-[#2D5A46] font-semibold'
                    : 'bg-arena text-malva border-oro/30 hover:text-ciruela hover:bg-[#F3ECE0] font-medium'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.button
              layout
              key={item.id}
              type="button"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              onClick={() => setSelectedItem(item)}
              className="group flex flex-col gap-3 text-left cursor-pointer"
            >
              <div className={`relative overflow-hidden aspect-[16/10] border border-oro/30 shadow-md ${item.type === 'video' ? 'bg-bosque' : 'bg-borgona'}`}>
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  decoding="async"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-marfil/95 border border-oro/50 backdrop-blur-md px-3.5 py-1.5">
                  <span className="font-label text-[10px] uppercase tracking-[0.18em] text-wine font-bold">
                    {TYPE_LABEL[item.type]}
                  </span>
                </div>
                <div className={`absolute bottom-4 right-4 px-3.5 py-1.5 font-label text-[10px] tracking-[0.16em] font-semibold shadow-md ${
                  item.type === 'design' || item.type === 'video'
                    ? 'bg-bosque/95 border border-[#2D5A46] text-mint'
                    : 'bg-borgona/95 border border-oro/50 text-champagne'
                }`}>
                  {item.category}
                </div>
              </div>
              <div className="flex items-baseline justify-between gap-4 pt-1">
                <div>
                  <h3 className="font-serif text-2xl text-ciruela group-hover:text-wine transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-5 text-malva mt-1">{item.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16 border border-dashed border-oro/40 bg-white">
          <p className="text-malva font-sans text-sm">No hay obras en esta categoría.</p>
        </div>
      )}

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ciruela/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedItem(null)}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-2 bg-marfil text-ciruela border border-oro/40 hover:bg-beige transition-colors cursor-pointer"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-marfil border border-oro/35 overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl"
            >
              <div className="md:col-span-7 bg-vino flex items-center justify-center relative min-h-[240px]">
                {selectedItem.type === 'video' && selectedItem.embedUrl ? (
                  <video src={selectedItem.embedUrl} controls autoPlay loop className="w-full h-full object-contain" />
                ) : (
                  <img
                    src={selectedItem.mediaUrl}
                    alt={selectedItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain max-h-[80vh]"
                  />
                )}
              </div>

              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-marfil text-ciruela">
                <div className="space-y-4">
                  <span className="font-label text-[10px] tracking-[0.2em] text-wine uppercase font-bold flex items-center gap-2">
                    {selectedItem.type === 'video' ? <Film className="w-3.5 h-3.5" /> : selectedItem.type === 'design' ? <Palette className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
                    {selectedItem.category}
                  </span>
                  <h3 className="font-serif text-3xl leading-tight">{selectedItem.title}</h3>
                  <div className="w-10 h-1 bg-oro" />
                  <p className="text-sm text-malva font-light leading-relaxed">{selectedItem.description}</p>
                  {selectedItem.links && selectedItem.links.length > 0 && (
                    <div className="flex flex-col gap-2 pt-2">
                      {selectedItem.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 px-4 py-3 bg-beige border border-oro/30 hover:border-wine text-ciruela group/link"
                        >
                          <span className="font-label text-[10px] tracking-[0.16em] uppercase">{link.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <div className="pt-8 flex gap-2.5">
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      setCurrentTab('contact');
                    }}
                    className="flex-1 py-3 bg-bosque text-champagne font-label text-[10px] tracking-[0.18em] uppercase hover:bg-verde transition-colors cursor-pointer"
                  >
                    Reservar sesión
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-3 bg-arena border border-oro/30 text-ciruela font-label text-[10px] tracking-[0.18em] uppercase cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
