/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, ShoppingCart, Plus, HelpCircle, Check, Eye, Trash2, ArrowRight, X } from 'lucide-react';
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
    <section className="bg-[#FAFAFA] text-zinc-900 py-24 px-4 sm:px-6 lg:px-8 relative min-h-[85vh]">
      <div className="max-w-7xl mx-auto">
        
        {/* Module Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-zinc-550 mb-3">
              <ShoppingBag className="w-3.5 h-3.5 animate-pulse" />
              <span>CATÁLOGO DROPSHIPPING</span>
            </div>
            
            <h2 className="text-4xl font-serif font-light tracking-tight text-neutral-950 uppercase border-b border-black/5 pb-2">
              Galería de Productos
            </h2>
            <p className="text-zinc-650 font-sans text-xs sm:text-sm font-light mt-2 max-w-lg leading-relaxed">
              Tecnología de punta y complementos estéticos en venta para fotógrafos independientes, streamers y creadores de contenido digital.
            </p>
          </div>

          {/* Quick Floating Cart indicator showing counts */}
          <button
            onClick={openCart}
            className="flex items-center space-x-2.5 px-5 py-3 border border-neutral-250 bg-white rounded-none hover:border-black shadow-sm transition-all cursor-pointer self-start lg:self-end text-zinc-900"
          >
            <ShoppingCart className="w-4 h-4 text-zinc-800" />
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-800">Mi Carrito ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
          </button>
        </div>

        {/* Filters and Search utilities */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10 items-center">
          
          {/* Text search Bar */}
          <div className="md:col-span-4 relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-400" />
            </span>
            <input
              type="text"
              placeholder="Buscar equipamiento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-3 bg-white border border-neutral-250 focus:border-black focus:outline-none rounded-none text-sm text-zinc-900 placeholder-zinc-450 transition-colors font-sans shadow-sm"
            />
          </div>

          {/* Category caps selection */}
          <div className="md:col-span-8 flex flex-wrap gap-1.5 md:justify-end">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-none text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-white text-zinc-550 hover:text-black border-neutral-200 hover:border-black shadow-sm'
                }`}
              >
                {cat === 'all' ? 'Ver Todos' : cat}
              </button>
            ))}
          </div>

        </div>

        {/* Products Display Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const quantityInCart = getFriendlyQuantityInCart(product.id);
            
            return (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col justify-between bg-white border border-neutral-250 p-4 rounded-none hover:border-neutral-450 transition-all duration-300 shadow-sm"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden rounded-none mb-4 border border-neutral-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 ease-out select-none"
                  />
                  
                  {/* Category overlay tags */}
                  <div className="absolute top-3 left-3 bg-white/90 px-2.5 py-1 text-[9px] font-semibold tracking-widest text-zinc-800 uppercase rounded-none border border-neutral-200 shadow-sm">
                    {product.category}
                  </div>

                  {/* Stock flag */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex items-center justify-center">
                      <span className="text-[10px] font-bold tracking-widest uppercase bg-black text-white px-4 py-2 rounded-none">Agotado</span>
                    </div>
                  )}
                </div>

                {/* Details text panel */}
                <div className="space-y-2 flex-grow">
                  <h3 className="text-sm font-serif font-light tracking-tight text-neutral-950 uppercase group-hover:text-black transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  
                  <span className="block text-lg font-serif font-light text-zinc-950">
                    {new Intl.NumberFormat('es-CR', {
                      style: 'currency',
                      currency: 'CRC',
                      minimumFractionDigits: 0,
                    }).format(product.price)}
                  </span>
                  
                  <p className="text-xs text-zinc-500 font-sans font-light leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Action buttons bar */}
                <div className="pt-4 border-t border-neutral-150 mt-4 flex items-center gap-2">
                  <button
                    onClick={() => setDetailedProduct(product)}
                    className="p-3 bg-neutral-100 border border-neutral-200 hover:text-black text-zinc-500 hover:bg-neutral-200 rounded-none transition-colors cursor-pointer"
                    title="Ver Detalles de Producto"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => product.inStock && addToCart(product)}
                    disabled={!product.inStock}
                    className={`flex-1 py-3 text-center font-sans font-bold text-[10px] tracking-widest uppercase transition-colors rounded-none flex items-center justify-center space-x-1.5 cursor-pointer ${
                      !product.inStock
                        ? 'bg-neutral-100 text-zinc-400 cursor-not-allowed border border-neutral-205'
                        : quantityInCart > 0
                        ? 'bg-black text-white hover:bg-zinc-800'
                        : 'bg-neutral-100 hover:bg-neutral-250 text-zinc-800 border border-neutral-250'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5 animate-pulse" />
                    <span>
                      {quantityInCart > 0 ? `En Carrito (${quantityInCart})` : 'Añadir'}
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty list search */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 border border-dashed border-neutral-205 rounded-none bg-white">
            <p className="text-zinc-500 font-sans text-sm mb-2">No se encontraron productos que coincidan con los filtros.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-xs font-semibold tracking-wider uppercase text-zinc-950 hover:underline cursor-pointer"
            >
              Restablecer Filtros
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
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white border border-neutral-255 rounded-none overflow-hidden p-6 sm:p-8 relative shadow-2xl text-zinc-900"
            >
              <button
                onClick={() => setDetailedProduct(null)}
                className="absolute top-4 right-4 p-2 bg-[#FAFAFA] text-zinc-550 hover:text-black hover:bg-neutral-100 rounded-full border border-neutral-200 transition-all cursor-pointer shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Image */}
                <div className="md:col-span-5 bg-neutral-100 aspect-square rounded-none border border-neutral-200 overflow-hidden max-h-[250px]">
                  <img
                    src={detailedProduct.image}
                    alt={detailedProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale select-none"
                  />
                </div>

                {/* Info Text details */}
                <div className="md:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block">{detailedProduct.category}</span>
                    <h3 className="text-xl font-serif font-light tracking-tight text-neutral-950 uppercase">{detailedProduct.name}</h3>
                  </div>

                  <span className="block text-2xl font-serif font-light text-black">
                    {new Intl.NumberFormat('es-CR', {
                      style: 'currency',
                      currency: 'CRC',
                      minimumFractionDigits: 0,
                    }).format(detailedProduct.price)}
                  </span>

                  <p className="text-xs text-zinc-650 font-sans font-light leading-relaxed">
                    {detailedProduct.description}
                  </p>

                  <div className="bg-neutral-50 px-4 py-3 border border-neutral-200 rounded-none flex items-center space-x-2 text-[11px] text-zinc-650">
                    <Check className="w-3.5 h-3.5 text-zinc-800" />
                    <span>Modalidad Dropshipping: Envío directo y seguro para todo Costa Rica.</span>
                  </div>

                  <div className="pt-4 flex gap-2">
                    <button
                      onClick={() => {
                        if (detailedProduct.inStock) {
                          addToCart(detailedProduct);
                          setDetailedProduct(null);
                        }
                      }}
                      disabled={!detailedProduct.inStock}
                      className="flex-1 py-3 bg-black text-white font-sans font-bold text-xs tracking-widest uppercase hover:bg-zinc-805 transition-colors cursor-pointer rounded-none"
                    >
                      Añadir al Carrito de compra
                    </button>
                    <button
                      onClick={() => setDetailedProduct(null)}
                      className="px-4 py-3 bg-neutral-100 border border-neutral-200 text-zinc-650 font-sans font-medium text-xs tracking-widest uppercase hover:text-black hover:bg-neutral-200 transition-colors cursor-pointer rounded-none"
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
