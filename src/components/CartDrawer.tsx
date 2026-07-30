/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingCart, MessageSquare, Plus, Minus, Inbox } from 'lucide-react';
import { ShopProduct } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { product: ShopProduct; quantity: number }[];
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  biography: {
    whatsapp: string;
  };
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  removeFromCart,
  updateQuantity,
  biography
}: CartDrawerProps) {
  
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const cleanPhoneStr = (p: string) => {
    return p.replace(/[^0-9+]/g, '');
  };

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;

    const formattedSubtotal = new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
    }).format(subtotal);

    const itemsList = cart
      .map(item => `• ${item.quantity}x ${item.product.name} (₡${new Intl.NumberFormat('es-CR').format(item.product.price * item.quantity)})`)
      .join('\n');

    const rawMsg = 
      `¡Hola Miranda! Me interesa adquirir los siguientes productos de dropshipping en tu catálogo:\n\n` +
      `${itemsList}\n\n` +
      `*Total Estimado:* ${formattedSubtotal}\n\n` +
      `¿Me podrías brindar los datos de Sinpe Móvil o cuenta bancaria y cotizar el envío para mi localidad? ¡Muchas gracias!`;

    const whatsappLink = `https://wa.me/${cleanPhoneStr(biography.whatsapp)}?text=${encodeURIComponent(rawMsg)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-55 bg-black"
          />

          {/* Drawer layout */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-55 w-full max-w-md bg-zinc-950 border-l border-zinc-900 shadow-2xl p-6 flex flex-col justify-between text-white"
          >
            
            {/* Header controls bar */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-zinc-900">
                <div className="flex items-center space-x-2.5">
                  <ShoppingCart className="w-4 h-4 text-white" />
                  <h3 className="text-sm font-sans font-black tracking-widest uppercase text-white">Tu Carrito</h3>
                  <span className="text-[10px] bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400 font-mono">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
                  </span>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-1.5 bg-zinc-900 border border-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-white rounded transition cursor-pointer"
                  title="Cerrar bolsa de compras"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Shopping List Container */}
              <div className="overflow-y-auto max-h-[60vh] py-4 space-y-4 pr-1">
                {cart.map(item => (
                  <div
                    key={item.product.id}
                    className="flex justify-between items-center p-3.5 bg-zinc-900/40 border border-zinc-900 rounded-sm hover:border-zinc-850 transition-all gap-4"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-cover rounded grayscale"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wide line-clamp-1 max-w-[150px] sm:max-w-[180px]">
                          {item.product.name}
                        </h4>
                        <span className="text-[10px] text-zinc-400 font-mono block">
                          ₡{new Intl.NumberFormat('es-CR').format(item.product.price)} c/u
                        </span>
                        <span className="text-xs font-bold text-white block mt-0.5">
                          ₡{new Intl.NumberFormat('es-CR').format(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity selectors & Trash */}
                    <div className="flex items-center space-x-2 shrink-0">
                      <div className="flex items-center bg-black border border-zinc-800 rounded">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="p-1 bg-transparent hover:text-white text-zinc-400 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="p-1 bg-transparent hover:text-white text-zinc-400 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-900/30 text-red-500 rounded transition cursor-pointer"
                        title="Borrar artículo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {cart.length === 0 && (
                  <div className="text-center py-16 space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500">
                      <Inbox className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-zinc-400 font-sans">
                      No has agregado ningún producto a tu carrito de compras todavía.
                    </p>
                    <button
                      onClick={onClose}
                      className="text-xs font-semibold tracking-wider uppercase text-white hover:underline cursor-pointer"
                    >
                      Seguir explorando tienda
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Total checkout details block */}
            <div className="border-t border-zinc-900 pt-5 space-y-4 mt-auto">
              <div className="flex items-end justify-between">
                <span className="text-xs uppercase tracking-wide text-zinc-400 font-sans">Total Inversión:</span>
                <div className="text-right">
                  <span className="text-2xl font-sans font-black tracking-tight text-white block">
                    {new Intl.NumberFormat('es-CR', {
                      style: 'currency',
                      currency: 'CRC',
                      minimumFractionDigits: 0,
                    }).format(subtotal)}
                  </span>
                  <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider block">₡ CRC Colones Costarricenses</span>
                </div>
              </div>

              <div className="bg-zinc-900 p-3.5 border border-zinc-900 rounded text-[10px] text-zinc-400 leading-relaxed font-sans">
                💡 Los pedidos se coordinan y despachan directamente de manera manual a través de WhatsApp. Miranda organizará tu Sinpe Móvil de forma expedita.
              </div>

              <button
                disabled={cart.length === 0}
                onClick={handleCheckoutWhatsApp}
                className={`w-full py-4 text-center font-sans font-bold text-xs tracking-widest uppercase rounded-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  cart.length === 0
                    ? 'bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-950'
                    : 'bg-white text-black hover:bg-zinc-200'
                }`}
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>Encargar por WhatsApp</span>
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
