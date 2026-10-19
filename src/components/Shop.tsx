/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingCart, Check, Eye, X } from 'lucide-react';
import { ShopProduct } from '../types';

interface ShopProps {
  products: ShopProduct[];
  addToCart: (product: ShopProduct) => void;
  cart: { product: ShopProduct; quantity: number }[];
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  openCart: () => void;
}

export default function Shop({
  products,
  addToCart,
  cart,
  removeFromCart,
  updateQuantity,
  openCart
}: ShopProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [detailedProduct, setDetailedProduct] = useState<ShopProduct | null>(null);

  // Available categories list
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  // Filters calculation
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFriendlyQuantityInCart = (productId: string) => {
    const found = cart.find(item => item.product.id === productId);
    return found ? found.quantity : 0;
  };

  return (
    <section id="vault" className="w-full px-6 lg:px-16 py-16 lg:py-20 bg-marfil border-b border-oro/25">
      <div className="w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <span className="font-label text-[10px] uppercase tracking-[0.22em] text-wine font-bold block">
              La bóveda del estudio
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-ciruela font-normal">
              Piezas y herramientas
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <p className="font-sans text-[15px] leading-6 text-malva max-w-md">
              Equipo y accesorios para creadores: estabilizadores, luz, audio y piezas que usa el estudio en producción.
            </p>
            <button
              onClick={openCart}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 border border-oro/40 bg-white hover:bg-beige text-ciruela font-label text-[10px] uppercase tracking-[0.16em] cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              Carrito ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
          </div>
        </div>

        {/* Filters and Search utilities */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10 items-center">
          <div className="md:col-span-4 relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-malva" />
            </span>
            <input
              type="text"
              placeholder="Buscar en la bóveda..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-3 bg-beige border border-oro/30 focus:border-wine focus:bg-white focus:outline-none text-sm text-ciruela placeholder:text-[#837377] font-sans"
            />
          </div>
          <div className="md:col-span-8 flex flex-wrap gap-1.5 md:justify-end">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 font-label text-[10px] uppercase tracking-[0.14em] transition-colors cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-bosque text-champagne border-[#2D5A46]'
                    : 'bg-arena text-malva border-oro/30 hover:text-ciruela hover:bg-[#F3ECE0]'
                }`}
              >
                {cat === 'all' ? 'Todo' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Display Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => {
            const quantityInCart = getFriendlyQuantityInCart(product.id);

            return (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group bg-white border border-oro/35 p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="relative overflow-hidden aspect-[16/10] bg-bosque border border-oro/25">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 bg-wine text-champagne px-2 py-0.5 border border-oro/40">
                      <span className="font-label text-[9px] uppercase tracking-[0.16em] font-bold">{product.category}</span>
                    </div>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-marfil/90 flex items-center justify-center">
                        <span className="font-label text-[10px] uppercase tracking-[0.16em] bg-ciruela text-champagne px-4 py-2">Agotado</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-[19px] leading-snug text-ciruela group-hover:text-wine transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[13px] leading-5 text-malva line-clamp-2">{product.description}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-oro/25 flex items-center justify-between gap-2">
                  <span className="font-serif text-2xl text-ciruela font-semibold">
                    {new Intl.NumberFormat('es-CR', {
                      style: 'currency',
                      currency: 'CRC',
                      minimumFractionDigits: 0,
                    }).format(product.price)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDetailedProduct(product)}
                      className="p-2 border border-oro/40 text-malva hover:text-ciruela cursor-pointer"
                      title="Ver detalle"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => product.inStock && addToCart(product)}
                      disabled={!product.inStock}
                      className={`px-4 py-2 font-label text-[10px] uppercase tracking-[0.14em] font-bold transition-colors cursor-pointer ${
                        !product.inStock
                          ? 'bg-arena text-malva cursor-not-allowed'
                          : quantityInCart > 0
                          ? 'bg-oro text-ciruela hover:bg-oro-calido'
                          : 'bg-bosque hover:bg-verde text-champagne border border-[#2D5A46]'
                      }`}
                    >
                      {quantityInCart > 0 ? `En carrito (${quantityInCart})` : 'Agregar'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 border border-dashed border-oro/40 bg-white">
            <p className="text-malva font-sans text-sm mb-2">No hay piezas con ese filtro.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="font-label text-[10px] uppercase tracking-[0.16em] text-wine cursor-pointer"
            >
              Restablecer
            </button>
          </div>
        )}

      </div>

      {/* DETAILED INTERACTIVE PRODUCT OVERLAY */}
      <AnimatePresence>
        {detailedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ciruela/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-marfil border border-oro/35 overflow-hidden p-6 sm:p-8 relative shadow-2xl text-ciruela"
            >
              <button
                onClick={() => setDetailedProduct(null)}
                className="absolute top-4 right-4 p-2 bg-beige text-malva hover:text-ciruela border border-oro/30 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 bg-bosque aspect-square border border-oro/25 overflow-hidden max-h-[250px]">
                  <img
                    src={detailedProduct.image}
                    alt={detailedProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <span className="font-label text-[10px] tracking-[0.18em] text-wine uppercase block">{detailedProduct.category}</span>
                    <h3 className="font-serif text-2xl text-ciruela">{detailedProduct.name}</h3>
                  </div>
                  <span className="block font-serif text-3xl text-ciruela">
                    {new Intl.NumberFormat('es-CR', {
                      style: 'currency',
                      currency: 'CRC',
                      minimumFractionDigits: 0,
                    }).format(detailedProduct.price)}
                  </span>
                  <p className="text-sm text-malva font-light leading-relaxed">{detailedProduct.description}</p>
                  <div className="bg-beige px-4 py-3 border border-oro/30 flex items-center gap-2 text-[13px] text-bosque">
                    <Check className="w-3.5 h-3.5" />
                    <span>Envío coordinado a todo Costa Rica.</span>
                  </div>
                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => {
                        if (detailedProduct.inStock) {
                          addToCart(detailedProduct);
                          setDetailedProduct(null);
                        }
                      }}
                      disabled={!detailedProduct.inStock}
                      className="flex-1 py-3 bg-bosque text-champagne font-label text-[10px] tracking-[0.16em] uppercase hover:bg-verde cursor-pointer"
                    >
                      Agregar al carrito
                    </button>
                    <button
                      onClick={() => setDetailedProduct(null)}
                      className="px-4 py-3 bg-arena border border-oro/30 text-ciruela font-label text-[10px] tracking-[0.16em] uppercase cursor-pointer"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
