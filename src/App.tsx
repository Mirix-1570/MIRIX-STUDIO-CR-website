/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Logo from './components/Logo';
import Hero from './components/Hero';
import Inspiration from './components/Inspiration';
import Legal from './components/Legal';
const About = lazy(() => import('./components/About'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Pricing = lazy(() => import('./components/Pricing'));
const Configurator = lazy(() => import('./components/Configurator'));
const Shop = lazy(() => import('./components/Shop'));
const Contact = lazy(() => import('./components/Contact'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
import { adminLogout } from './lib/firebase';
import {
  FIRESTORE_CONFIGURED,
  subscribeContent,
  saveContent,
  subscribeMessages,
  addMessage,
  deleteAllMessages
} from './lib/firestore';
const CartDrawer = lazy(() => import('./components/CartDrawer'));
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

  const navigate = (target: string) => {
    if (target === 'admin' || target === 'privacy' || target === 'terms') {
      setCurrentTab(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const sectionByTarget: Record<string, string> = {
      home: 'home',
      portfolio: 'portfolio',
      pricing: 'retainers',
      about: 'about',
      shop: 'vault',
      contact: 'booking',
      services: 'services',
      retainers: 'retainers',
      vault: 'vault',
      booking: 'booking',
    };
    const sectionId = sectionByTarget[target] ?? target;

    const leavingPage = currentTab !== 'home';
    setCurrentTab('home');
    window.setTimeout(() => {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, leavingPage ? 80 : 0);
  };

  return (
    <div className="bg-marfil text-ciruela min-h-screen flex flex-col justify-between">

      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        openCart={() => setCartOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        logoutAdmin={() => { adminLogout(); setIsAdminLoggedIn(false); }}
        onNavigate={navigate}
      />

      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab === 'home' ? 'home' : currentTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Suspense fallback={<div className="py-24 text-center font-label text-[10px] tracking-[0.22em] uppercase text-malva">Cargando…</div>}>
            {currentTab === 'privacy' || currentTab === 'terms' ? (
              <Legal kind={currentTab} email={biography.email} location={biography.location} />
            ) : currentTab !== 'admin' ? (
              <>
                <Hero
                  onNavigate={navigate}
                  portfolioCount={portfolioItems.length}
                  location={biography.location}
                />
                <About biography={biography} />
                <Inspiration />
                <Portfolio portfolioItems={portfolioItems} setCurrentTab={navigate} />
                <Pricing plans={plans} biography={biography} />
                <Configurator biography={biography} />
                <Shop
                  products={products}
                  addToCart={addToCart}
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  openCart={() => setCartOpen(true)}
                />
                <Contact biography={biography} addMessage={handleAddMessage} />
              </>
            ) : (
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
            </Suspense>
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

      <footer className="w-full bg-bosque text-white border-t-2 border-oro/40">
        <div className="w-full px-6 lg:px-16 pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex bg-marfil px-4 py-3">
                <Logo height={84} />
              </span>
              <p className="font-label text-[10px] uppercase tracking-[0.22em] text-mint font-semibold">
                Alma costarricense. Oficio editorial.
              </p>
              <p className="font-sans text-[15px] text-sage max-w-sm">
                Estudio creativo de producción audiovisual, fotografía y diseño. Base en Esparza, cobertura en todo Costa Rica.
              </p>
            </div>
            <div className="lg:col-span-3 space-y-2">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-champagne font-bold block">Sede</span>
              <div className="text-[13px] leading-6 text-sage">
                <p>{biography.location}</p>
                <a href={`mailto:${biography.email}`} className="text-champagne pt-2 inline-block">{biography.email}</a>
                <p className="text-mint">{biography.whatsapp}</p>
              </div>
            </div>
            <div className="lg:col-span-4 space-y-3">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-champagne font-bold block">Recorrido</span>
              <div className="flex flex-col items-start gap-2">
                <button onClick={() => navigate('home')} className="font-sans text-xs font-semibold tracking-[0.16em] uppercase text-sage hover:text-champagne cursor-pointer">Inicio</button>
                <button onClick={() => navigate('portfolio')} className="font-sans text-xs font-semibold tracking-[0.16em] uppercase text-sage hover:text-champagne cursor-pointer">Portafolio</button>
                <button onClick={() => navigate('retainers')} className="font-sans text-xs font-semibold tracking-[0.16em] uppercase text-sage hover:text-champagne cursor-pointer">Planes</button>
                <button onClick={() => navigate('about')} className="font-sans text-xs font-semibold tracking-[0.16em] uppercase text-sage hover:text-champagne cursor-pointer">Quiénes somos</button>
                <button onClick={() => navigate('vault')} className="font-sans text-xs font-semibold tracking-[0.16em] uppercase text-sage hover:text-champagne cursor-pointer">Tienda</button>
                <button onClick={() => navigate('booking')} className="font-sans text-xs font-semibold tracking-[0.16em] uppercase text-sage hover:text-champagne cursor-pointer">Contacto</button>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-[#2D5A46] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <a href={biography.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-sans text-xs font-semibold tracking-[0.16em] uppercase text-sage hover:text-champagne">Instagram</a>
              <a href={biography.facebookUrl} target="_blank" rel="noopener noreferrer" className="font-sans text-xs font-semibold tracking-[0.16em] uppercase text-sage hover:text-champagne">Facebook</a>
              <button onClick={() => navigate('privacy')} className="font-sans text-xs font-semibold tracking-[0.16em] uppercase text-sage hover:text-champagne cursor-pointer">Privacidad</button>
              <button onClick={() => navigate('terms')} className="font-sans text-xs font-semibold tracking-[0.16em] uppercase text-sage hover:text-champagne cursor-pointer">Términos</button>
            </div>
            <span className="text-[13px] text-sage text-center">© 2026 Mirix Studio CR. Esparza, Costa Rica. Diseño de Miranda Méndez.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}