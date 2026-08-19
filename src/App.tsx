/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
import { adminLogout } from './lib/firebase';
import {
  FIRESTORE_CONFIGURED,
  subscribeContent,
  saveContent,
  subscribeMessages,
  addMessage,
  deleteAllMessages
} from './lib/firestore';
import CartDrawer from './components/CartDrawer';
import { Bio, PortfolioItem, ServicePlan, ShopProduct, ContactMessage } from './types';
import {
  INITIAL_BIOGRAPHY,
  INITIAL_PLANS,
  INITIAL_PORTFOLIO,
  INITIAL_PRODUCTS,
  getSavedData,
  saveData
} from './data';

// Per-section SEO metadata: the SPA renders one static <title> in index.html,
// so each tab updates document.title + meta description on navigation.
const TAB_SEO: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Mirix Studio CR | Producción Audiovisual y Diseño en Costa Rica',
    description:
      'Mirix Studio CR — Producción audiovisual y diseño en Costa Rica. Creación de video, fotografía artística, diseño gráfico y gestión de redes sociales. Base en Esparza, cobertura en todo el país.'
  },
  portfolio: {
    title: 'Portafolio | Mirix Studio CR',
    description:
      'Explora el portafolio de Mirix Studio CR: videos, fotografía artística y proyectos de diseño en Costa Rica.'
  },
  pricing: {
    title: 'Planes y Cotizador | Mirix Studio CR',
    description:
      'Planes de producción audiovisual y diseño en Costa Rica. Cotizá tu proyecto con el configurador de Mirix Studio CR.'
  },
  about: {
    title: 'Quiénes Somos | Mirix Studio CR',
    description:
      'Conocé a Mirix Studio CR, estudio costarricense de producción audiovisual y diseño con base en Esparza y cobertura en todo el país.'
  },
  shop: {
    title: 'Tienda | Mirix Studio CR',
    description:
      'Equipo y accesorios para creadores de contenido: estabilizadores, aros de luz, micrófonos y más. Tienda de Mirix Studio CR.'
  },
  contact: {
    title: 'Contacto | Mirix Studio CR',
    description:
      'Contactá a Mirix Studio CR por WhatsApp, email o formulario. Base en Esparza, Puntarenas, con cobertura en todo Costa Rica.'
  },
  admin: {
    title: 'Panel Admin | Mirix Studio CR',
    description: 'Acceso de administrador de Mirix Studio CR.'
  }
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [cartOpen, setCartOpen] = useState(false);

  // STATE MANAGEMENT synced with Firestore (content) + localStorage (cart)
  const [biography, setBiography] = useState<Bio>(INITIAL_BIOGRAPHY);
  const [plans, setPlans] = useState<ServicePlan[]>(INITIAL_PLANS);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [products, setProducts] = useState<ShopProduct[]>(INITIAL_PRODUCTS);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const [cart, setCart] = useState<{ product: ShopProduct; quantity: number }[]>(() =>
    getSavedData('mirix_cart', [])
  );

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Per-section SEO: sync <title> and meta description with the active tab
  useEffect(() => {
    const seo = TAB_SEO[currentTab] ?? TAB_SEO.home;
    document.title = seo.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', seo.description);
  }, [currentTab]);

  // Refs mirroring current state so Firestore snapshot callbacks never close over stale values
  const biographyRef = useRef(biography);
  const plansRef = useRef(plans);
  const portfolioItemsRef = useRef(portfolioItems);
  const productsRef = useRef(products);
  const isAdminLoggedInRef = useRef(isAdminLoggedIn);

  useEffect(() => { biographyRef.current = biography; }, [biography]);
  useEffect(() => { plansRef.current = plans; }, [plans]);
  useEffect(() => { portfolioItemsRef.current = portfolioItems; }, [portfolioItems]);
  useEffect(() => { productsRef.current = products; }, [products]);
  useEffect(() => { isAdminLoggedInRef.current = isAdminLoggedIn; }, [isAdminLoggedIn]);

  // FIRESTORE SUBSCRIPTIONS (mounted once). Content docs are public reads; when a doc
  // is missing and the admin is signed in, auto-migrate the current state to Firestore.
  useEffect(() => {
    if (!FIRESTORE_CONFIGURED) return;

    const unsubscribeBio = subscribeContent<Bio>('bio', (snapshot) => {
      if (snapshot.exists) {
        setBiography(snapshot.items[0] ?? INITIAL_BIOGRAPHY);
      } else if (isAdminLoggedInRef.current) {
        saveContent('bio', [biographyRef.current]);
      }
    });

    const unsubscribePlans = subscribeContent<ServicePlan>('plans', (snapshot) => {
      if (snapshot.exists) {
        setPlans(snapshot.items);
      } else if (isAdminLoggedInRef.current) {
        saveContent('plans', plansRef.current);
      }
    });

    const unsubscribePortfolio = subscribeContent<PortfolioItem>('portfolio', (snapshot) => {
      if (snapshot.exists) {
        setPortfolioItems(snapshot.items);
      } else if (isAdminLoggedInRef.current) {
        saveContent('portfolio', portfolioItemsRef.current);
      }
    });

    const unsubscribeProducts = subscribeContent<ShopProduct>('products', (snapshot) => {
      if (snapshot.exists) {
        setProducts(snapshot.items);
      } else if (isAdminLoggedInRef.current) {
        saveContent('products', productsRef.current);
      }
    });

    return () => {
      unsubscribeBio();
      unsubscribePlans();
      unsubscribePortfolio();
      unsubscribeProducts();
    };
  }, []);

  // Messages are admin-only: subscribe while the admin is signed in
  useEffect(() => {
    if (!FIRESTORE_CONFIGURED || !isAdminLoggedIn) return;
    const unsubscribe = subscribeMessages((msgs) => setMessages(msgs));
    return unsubscribe;
  }, [isAdminLoggedIn]);

  // FIRESTORE PERSISTENCE TRIGGERS (admin writes only; visitors never write)
  useEffect(() => {
    if (FIRESTORE_CONFIGURED && isAdminLoggedIn) {
      saveContent('bio', [biography]);
    }
  }, [biography, isAdminLoggedIn]);

  useEffect(() => {
    if (FIRESTORE_CONFIGURED && isAdminLoggedIn) {
      saveContent('plans', plans);
    }
  }, [plans, isAdminLoggedIn]);

  useEffect(() => {
    if (FIRESTORE_CONFIGURED && isAdminLoggedIn) {
      saveContent('portfolio', portfolioItems);
    }
  }, [portfolioItems, isAdminLoggedIn]);

  useEffect(() => {
    if (FIRESTORE_CONFIGURED && isAdminLoggedIn) {
      saveContent('products', products);
    }
  }, [products, isAdminLoggedIn]);

  // CART persistence stays in localStorage (per-visitor session)
  useEffect(() => {
    saveData('mirix_cart', cart);
  }, [cart]);

  // MESSAGES DISPATCH
  const handleAddMessage = (payload: Omit<ContactMessage, 'id' | 'date' | 'read'>) => {
    const createdAt = Date.now();
    const newMessage: ContactMessage = {
      ...payload,
      id: `msg-${createdAt}`,
      date: new Date().toLocaleString('es-CR'),
      createdAt,
      read: false
    };
    if (FIRESTORE_CONFIGURED) {
      addMessage({
        ...payload,
        date: newMessage.date,
        createdAt,
        read: false
      });
    }
    // Optimistic local update so the admin inbox reflects the message instantly
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
    // One-time cleanup of legacy localStorage mirrors (content now lives in Firestore)
    localStorage.removeItem('mirix_bio');
    localStorage.removeItem('mirix_plans');
    localStorage.removeItem('mirix_portfolio');
    localStorage.removeItem('mirix_products');
    localStorage.removeItem('mirix_messages');

    setBiography(INITIAL_BIOGRAPHY);
    setPlans(INITIAL_PLANS);
    setPortfolioItems(INITIAL_PORTFOLIO);
    setProducts(INITIAL_PRODUCTS);
    setMessages([]);

    if (FIRESTORE_CONFIGURED) {
      saveContent('bio', [INITIAL_BIOGRAPHY]);
      saveContent('plans', INITIAL_PLANS);
      saveContent('portfolio', INITIAL_PORTFOLIO);
      saveContent('products', INITIAL_PRODUCTS);
      deleteAllMessages();
    }

    localStorage.removeItem('mirix_cart');
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
        logoutAdmin={() => { adminLogout(); setIsAdminLoggedIn(false); }}
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