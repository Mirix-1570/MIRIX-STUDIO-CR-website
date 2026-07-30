/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Video, Camera, Star, Code, Compass, ArrowUpRight, Instagram } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import Configurator from './components/Configurator';
import Shop from './components/Shop';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import CartDrawer from './components/CartDrawer';
import { PortfolioItem, ServicePlan, ShopProduct, ContactMessage } from './types';
import {
  INITIAL_BIOGRAPHY,
  INITIAL_PLANS,
  INITIAL_PORTFOLIO,
  INITIAL_PRODUCTS,
  getSavedData,
  saveData
} from './data';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [cartOpen, setCartOpen] = useState(false);
  
  // STATE MANAGEMENT synced with localStorage
  const [biography, setBiography] = useState(() => 
    getSavedData('mirix_bio', INITIAL_BIOGRAPHY)
  );
  
  const [plans, setPlans] = useState<ServicePlan[]>(() => 
    getSavedData('mirix_plans', INITIAL_PLANS)
  );
  
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(() => 
    getSavedData('mirix_portfolio', INITIAL_PORTFOLIO)
  );
  
  const [products, setProducts] = useState<ShopProduct[]>(() => 
    getSavedData('mirix_products', INITIAL_PRODUCTS)
  );

  const [messages, setMessages] = useState<ContactMessage[]>(() => 
    getSavedData('mirix_messages', [
      {
        id: 'msg-seed-1',
        name: 'Carlos Solano',
        email: 'carlos@saborlocal.cr',
        phone: '50688997766',
        service: 'Producción de Video',
        message: 'Hola Miranda, nos encanta tu portafolio cinematográfico de reels. Queremos coordinar una sesión audiovisual para nuestra cafetería de especialidad en Miramar de Puntarenas. ¿Tienes espacio disponible el próximo sábado para un rodaje de 3 horas?',
        date: '19/06/2026, 09:30 AM',
        read: false
      }
    ])
  );

  const [cart, setCart] = useState<{ product: ShopProduct; quantity: number }[]>(() => 
    getSavedData('mirix_cart', [])
  );

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      const saved = sessionStorage.getItem('mirix_admin_logged');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  // PERSISTENCE TRIGGERS
  useEffect(() => {
    saveData('mirix_bio', biography);
  }, [biography]);

  useEffect(() => {
    saveData('mirix_plans', plans);
  }, [plans]);

  useEffect(() => {
    saveData('mirix_portfolio', portfolioItems);
  }, [portfolioItems]);

  useEffect(() => {
    saveData('mirix_products', products);
  }, [products]);

  useEffect(() => {
    saveData('mirix_messages', messages);
  }, [messages]);

  useEffect(() => {
    saveData('mirix_cart', cart);
  }, [cart]);

  useEffect(() => {
    try {
      sessionStorage.setItem('mirix_admin_logged', String(isAdminLoggedIn));
    } catch (e) {
      console.error(e);
    }
  }, [isAdminLoggedIn]);

  // MESSAGES DISPATCH
  const handleAddMessage = (payload: Omit<ContactMessage, 'id' | 'date' | 'read'>) => {
    const newMessage: ContactMessage = {
      ...payload,
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleString('es-CR'),
      read: false
    };
    setMessages([newMessage, ...messages]);
  };

  // CART TRIGGERS
  const addToCart = (product: ShopProduct) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    setCartOpen(true); // open cart automatically on adding item
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    const updated = cart.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    });
    setCart(updated);
  };

  // REST RESET BUTTON SUPPORT
  const handleResetAllToDefaults = () => {
    localStorage.removeItem('mirix_bio');
    localStorage.removeItem('mirix_plans');
    localStorage.removeItem('mirix_portfolio');
    localStorage.removeItem('mirix_products');
    localStorage.removeItem('mirix_messages');
    localStorage.removeItem('mirix_cart');
    localStorage.removeItem('mirix_users');
    
    setBiography(INITIAL_BIOGRAPHY);
    setPlans(INITIAL_PLANS);
    setPortfolioItems(INITIAL_PORTFOLIO);
    setProducts(INITIAL_PRODUCTS);
    setMessages([]);
    setCart([]);
    setIsAdminLoggedIn(false);
  };

  return (
    <div className="bg-[#FAFAFA] text-zinc-900 min-h-screen flex flex-col justify-between selection:bg-black selection:text-white">
      
      {/* Top navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        openCart={() => setCartOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        logoutAdmin={() => setIsAdminLoggedIn(false)}
      />

      {/* Main Dynamic Workspace Frame */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {currentTab === 'home' && (
              <>
                <Hero setCurrentTab={setCurrentTab} biography={biography} />
                
                {/* Immersive Swiss Grid Feature Highlights of our services categories */}
                <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-t border-black/10">
                  <div className="max-w-7xl mx-auto">
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Grid Item 1 Video details list */}
                      <div className="p-8 bg-neutral-50 border border-neutral-200/80 rounded-none relative group hover:border-black transition-all duration-300">
                        <div className="flex justify-between items-start mb-6">
                          <span className="text-zinc-400 font-mono text-xs">01 / PRODUCCIÓN</span>
                          <Video className="w-5 h-5 text-zinc-800" />
                        </div>
                        <h3 className="text-xl font-serif font-bold tracking-tight text-zinc-950 mb-2">Creación de Video</h3>
                        <p className="text-xs text-zinc-600 font-sans font-light leading-relaxed mb-4">
                          Grabaciones fluidas en alta definición, reels de tendencia listos para enganchar a tu audiencia, iluminación selectiva y audios nítidos que cuentan historias memorables.
                        </p>
                        <button
                          onClick={() => setCurrentTab('portfolio')}
                          className="flex items-center space-x-1.5 text-[10px] font-bold tracking-widest uppercase text-zinc-900 hover:underline cursor-pointer"
                        >
                          <span>Explorar videos</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Grid Item 2 */}
                      <div className="p-8 bg-neutral-50 border border-neutral-200/80 rounded-none relative group hover:border-black transition-all duration-300">
                        <div className="flex justify-between items-start mb-6">
                          <span className="text-zinc-400 font-mono text-xs">02 / PORTAFOLIO</span>
                          <Camera className="w-5 h-5 text-zinc-800" />
                        </div>
                        <h3 className="text-xl font-serif font-bold tracking-tight text-zinc-950 mb-2">Fotografía Artística</h3>
                        <p className="text-xs text-zinc-600 font-sans font-light leading-relaxed mb-4">
                          Sesiones de retrato de marca personal, perspectivas arquitectónicas, tomas con luz indirecta de diseño interior y capturas estelares de productos de dropshipping.
                        </p>
                        <button
                          onClick={() => setCurrentTab('portfolio')}
                          className="flex items-center space-x-1.5 text-[10px] font-bold tracking-widest uppercase text-zinc-900 hover:underline cursor-pointer"
                        >
                          <span>Explorar fotos</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Grid Item 3 */}
                      <div className="p-8 bg-neutral-50 border border-neutral-200/80 rounded-none relative group hover:border-black transition-all duration-300">
                        <div className="flex justify-between items-start mb-6">
                          <span className="text-zinc-400 font-mono text-xs">03 / REDES SOCIALES</span>
                          <Instagram className="w-5 h-5 text-zinc-800" />
                        </div>
                        <h3 className="text-xl font-serif font-bold tracking-tight text-zinc-950 mb-2">Gestión de Redes Sociales</h3>
                        <p className="text-xs text-zinc-600 font-sans font-light leading-relaxed mb-4">
                          Creamos y gestionamos contenido estratégico para tus redes sociales, aumentando tu presencia digital y conectando con tu audiencia de manera auténtica y profesional.
                        </p>
                        <button
                          onClick={() => setCurrentTab('contact')}
                          className="flex items-center space-x-1.5 text-[10px] font-bold tracking-widest uppercase text-zinc-900 hover:underline cursor-pointer"
                        >
                          <span>Consultar gestión</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Bold secondary branding tagline section */}
                    <div className="mt-20 text-center max-w-2xl mx-auto space-y-4">
                      <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-zinc-400 font-medium">NUESTRA VISIÓN ESTÉTICA</span>
                      <h3 className="text-3xl sm:text-4xl font-serif italic font-light tracking-tight text-zinc-900 leading-snug">
                        "La belleza surge cuando se elimina lo innecesario"
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-500 font-sans font-light max-w-md mx-auto">
                        Creemos firmemente en el poder del minimalismo. El juego de luz y sombra evoca permanencia, elegancia y dirige toda la potencia compositiva hacia el sujeto y la emoción genuina.
                      </p>
                      
                      <div className="pt-3">
                        <button
                          onClick={() => setCurrentTab('about')}
                          className="px-6 py-2.5 bg-black text-white text-xs font-semibold font-sans tracking-widest uppercase hover:bg-zinc-800 transition-colors"
                        >
                          Nuestra Historia
                        </button>
                      </div>
                    </div>

                  </div>
                </section>
              </>
            )}

            {currentTab === 'portfolio' && (
              <Portfolio portfolioItems={portfolioItems} setCurrentTab={setCurrentTab} />
            )}

            {currentTab === 'pricing' && (
              <>
                <Pricing plans={plans} biography={biography} />
                <Configurator biography={biography} />
              </>
            )}

            {currentTab === 'about' && (
              <About biography={biography} />
            )}

            {currentTab === 'shop' && (
              <Shop
                products={products}
                addToCart={addToCart}
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                openCart={() => setCartOpen(true)}
              />
            )}

            {currentTab === 'contact' && (
              <Contact biography={biography} addMessage={handleAddMessage} />
            )}

            {currentTab === 'admin' && (
              <AdminPanel
                plans={plans}
                setPlans={setPlans}
                products={products}
                setProducts={setProducts}
                portfolioItems={portfolioItems}
                setPortfolioItems={setPortfolioItems}
                messages={messages}
                setMessages={setMessages}
                biography={biography}
                setBiography={setBiography}
                isAdminLoggedIn={isAdminLoggedIn}
                setIsAdminLoggedIn={setIsAdminLoggedIn}
                resetAllToDefaults={handleResetAllToDefaults}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Shopping Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        biography={biography}
      />

      {/* Universal Footer */}
      <footer className="bg-white border-t border-black/10 py-12 text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2 text-left">
            <span className="font-sans font-extrabold tracking-[0.2em] text-xs text-black uppercase">MIRIX STUDIO CR</span>
            <span className="text-[10px] text-zinc-400 font-mono">| © 2026</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold tracking-wider uppercase text-zinc-650">
            <button onClick={() => setCurrentTab('home')} className="hover:text-black transition-colors cursor-pointer">Inicio</button>
            <button onClick={() => setCurrentTab('portfolio')} className="hover:text-black transition-colors cursor-pointer">Portafolio</button>
            <button onClick={() => setCurrentTab('pricing')} className="hover:text-black transition-colors cursor-pointer">Precios</button>
            <button onClick={() => setCurrentTab('shop')} className="hover:text-black transition-colors cursor-pointer">Tienda</button>
            <button onClick={() => setCurrentTab('about')} className="hover:text-black transition-colors cursor-pointer">Quiénes Somos</button>
            <button onClick={() => setCurrentTab('contact')} className="hover:text-black transition-colors cursor-pointer">Contacto</button>
          </div>

          <div className="text-[10px] text-zinc-450 font-sans text-center md:text-right">
            <span>Diseñado por Miranda Méndez Cruz • Esparza, Costa Rica</span>
          </div>
        </div>
      </footer>

    </div>
  );
}