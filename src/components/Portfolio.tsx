/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Eye, X, Filter, Camera, Film, ArrowRight, Check } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioProps {
  portfolioItems: PortfolioItem[];
  setCurrentTab: (tab: string) => void;
}

export default function Portfolio({ portfolioItems, setCurrentTab }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'photo'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Filter items based on selected category type
  const filteredItems = portfolioItems.filter(item => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  return (
    <section className="bg-[#FAFAFA] text-zinc-900 py-24 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Visual Accent */}
      <div className="absolute left-[10%] top-1/4 w-72 h-72 bg-neutral-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-zinc-550 mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>OBRAS SELECCIONADAS</span>
            </div>
            
            <h2 className="text-4xl font-serif font-light tracking-tight text-neutral-950 uppercase">
              Galería Creativa
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm font-light mt-2 max-w-md">
              Colección exclusiva de producciones fotográficas, cortometrajes y material audiovisual optimizado para marcas de alto nivel.
            </p>
          </div>

          {/* Interactive filter caps - Minimal rectangle block editorial style */}
          <div className="flex flex-wrap gap-1 bg-neutral-105 p-1 border border-neutral-200 rounded-none w-fit self-start md:self-end shadow-sm">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2.5 rounded-none text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-black text-white'
                  : 'text-zinc-500 hover:text-black'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveFilter('photo')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-none text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeFilter === 'photo'
                  ? 'bg-black text-white'
                  : 'text-zinc-500 hover:text-black'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>FOTOGRAFÍA</span>
            </button>
            <button
              onClick={() => setActiveFilter('video')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-none text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeFilter === 'video'
                  ? 'bg-black text-white'
                  : 'text-zinc-500 hover:text-black'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>VIDEO</span>
            </button>
          </div>
        </div>

        {/* Dynamic Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              // Uniform 1:1 square aspect ratio for all items
              const gridClasses = "relative group overflow-hidden border border-neutral-250 bg-white rounded-none cursor-pointer shadow-sm aspect-square";

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={gridClasses}
                >
                  {/* Photo Thumbnail */}
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 ease-out select-none opacity-80 group-hover:opacity-100"
                  />

                  {/* Elegant Editorial Hover Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-white/95 border-t border-neutral-200 p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg text-zinc-950">
                    <span className="text-[9px] font-mono tracking-widest text-zinc-550 uppercase mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-serif tracking-tight uppercase leading-tight text-neutral-950 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-650 font-light font-sans max-w-sm line-clamp-2">
                      {item.description}
                    </p>
                    
                    <span className="mt-3 flex items-center space-x-1.5 text-[10px] font-semibold tracking-widest uppercase text-black hover:underline">
                      <span>{item.type === 'video' ? 'Ver cortometraje de video' : 'Visualismo completo'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 border border-neutral-250 p-2 rounded-none text-zinc-900 flex items-center space-x-1 shadow-sm">
                    {item.type === 'video' ? (
                      <Play className="w-3 h-3 fill-zinc-900" />
                    ) : (
                      <Camera className="w-3 h-3" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 border border-dashed border-neutral-250 rounded-none bg-white">
            <p className="text-zinc-500 font-sans text-sm">No se encontraron items en esta categoría.</p>
          </div>
        )}

        {/* REQUIRED: CALL TO ACTION BLOCK AT THE BOTTOM OF THE MODULE (#3 in instruction list) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 border border-neutral-250 bg-white p-8 sm:p-12 md:p-16 rounded-none text-center relative overflow-hidden shadow-sm"
        >
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase block">¿Listo para transformar tu presencia visual?</span>
            
            <h3 className="text-3xl sm:text-4xl font-serif font-light tracking-tight uppercase leading-none text-neutral-950">
              Llevemos la estética y estilo de tu marca al próximo nivel
            </h3>
            
            <p className="text-zinc-600 font-sans font-light text-sm sm:text-base leading-relaxed">
              Ya sea que necesites reels fluidos para Instagram, un rediseño de feed, fotografía profesional para tu negocio en Costa Rica, tengo un plan diseñado para ti.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentTab('pricing')}
                className="group flex items-center justify-center space-x-2.5 px-7 py-3.5 bg-black text-white hover:bg-zinc-800 transition-colors font-sans font-bold text-xs tracking-widest uppercase rounded-none cursor-pointer"
              >
                <span>Explorar Planes y Tarifas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => setCurrentTab('contact')}
                className="px-7 py-3.5 bg-transparent border border-neutral-300 hover:border-black text-zinc-900 transition-colors font-sans font-semibold text-xs tracking-widest uppercase rounded-none cursor-pointer"
              >
                <span>Hablemos por Whatsapp</span>
              </button>
            </div>
          </div>
        </motion.div>

      </div>

      {/* LIGHTBOX DETAIL OVERLAY MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-2 bg-white text-black border border-neutral-200 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer z-55 shadow"
              title="Cerrar Visualizador"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-white border border-neutral-250 rounded-none overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl"
            >
              {/* Media viewer panel */}
              <div className="md:col-span-7 bg-neutral-950 flex items-center justify-center relative aspect-video md:aspect-auto">
                {selectedItem.type === 'video' && selectedItem.embedUrl ? (
                  // Safe custom video loop or embedded video player
                  <video
                    src={selectedItem.embedUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={selectedItem.mediaUrl}
                    alt={selectedItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain grayscale-0 select-none max-h-[80vh]"
                  />
                )}
              </div>

              {/* Description Panel */}
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-neutral-200 bg-[#FAFAFA] text-zinc-900">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-450 uppercase block">
                    {selectedItem.category}
                  </span>
                  
                  <h3 className="text-2xl font-serif font-light tracking-tight uppercase leading-tight text-neutral-950">
                    {selectedItem.title}
                  </h3>
                  
                  <div className="w-10 h-[1.5px] bg-black" />
                  
                  <p className="text-sm text-zinc-650 font-light font-sans leading-relaxed">
                    {selectedItem.description}
                  </p>

                  {/* Visible clickable links */}
                  {selectedItem.links && selectedItem.links.length > 0 && (
                    <div className="flex flex-col gap-2 pt-2">
                      {selectedItem.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 px-4 py-3 bg-white border border-neutral-200 rounded-none hover:border-black hover:bg-neutral-50 transition-colors text-zinc-900 group/link"
                        >
                          <span className="text-xs font-sans font-semibold tracking-wider uppercase">
                            {link.label}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-8 space-y-4 mt-auto">
                  <div className="bg-white p-4 border border-neutral-200 rounded-none shadow-xs">
                    <span className="text-[10px] tracking-widest uppercase font-sans text-zinc-450 block mb-1">
                      Servicios Relacionados
                    </span>
                    <p className="text-xs text-zinc-600 font-light font-sans">
                      Producción audiovisual, iluminación de estudio, post-producción y edición de alta fidelidad.
                    </p>
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      onClick={() => {
                        setSelectedItem(null);
                        setCurrentTab('contact');
                      }}
                      className="flex-1 py-3 bg-black text-white text-center font-sans font-bold text-[10px] tracking-widest uppercase rounded-none hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      Reservar sesión
                    </button>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-4 py-3 bg-neutral-100 border border-neutral-200 text-zinc-600 text-center font-sans font-medium text-[10px] tracking-widest uppercase rounded-none hover:text-black hover:bg-neutral-200 transition-colors cursor-pointer"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}