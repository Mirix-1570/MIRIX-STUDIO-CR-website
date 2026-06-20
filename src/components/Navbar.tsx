/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, Settings, User, Phone, Briefcase, Info, MessageSquare, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  isAdminLoggedIn: boolean;
  logoutAdmin: () => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  cartCount,
  openCart,
  isAdminLoggedIn,
  logoutAdmin
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Briefcase },
    { id: 'portfolio', label: 'Portafolio', icon: Phone },
    { id: 'pricing', label: 'Planes', icon: Briefcase },
    { id: 'about', label: 'Quiénes Somos', icon: Info },
    { id: 'shop', label: 'Tienda', icon: ShoppingBag },
    { id: 'contact', label: 'Contacto', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/10 text-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand Brand */}
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center space-x-3 group text-left cursor-pointer"
          >
            <img
              src="/logo.png"
              alt="Mirix Studio CR Logo"
              className="h-12 w-auto object-contain"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className="relative px-4 py-2 font-sans text-xs font-semibold tracking-widest text-zinc-600 hover:text-black transition-colors duration-300 uppercase cursor-pointer"
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-neutral-100 rounded-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-black"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Icons Bar: Cart, Admin Panel */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2 text-zinc-700 hover:text-black transition-colors cursor-pointer group"
              title="Ver Carrito de Dropshipping"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Admin Backoffice Button */}
            <button
              onClick={() => setCurrentTab('admin')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                currentTab === 'admin'
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-zinc-700 border-zinc-200 hover:border-black hover:text-black'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{isAdminLoggedIn ? 'Panel Admin' : 'Admin'}</span>
            </button>
          </div>

          {/* Mobile Right Buttons */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Cart Icon */}
            <button
              onClick={openCart}
              className="relative p-2 text-zinc-700 hover:text-black"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Set mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-700 hover:text-black focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-black/10 bg-white"
          >
            <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md text-sm font-semibold tracking-widest uppercase transition-colors ${
                      isActive ? 'bg-neutral-100 text-black' : 'text-zinc-600 hover:bg-neutral-50 hover:text-black'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div className="pt-4 mt-4 border-t border-black/10 flex flex-col space-y-2 px-4">
                <button
                  onClick={() => {
                    setCurrentTab('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-md border border-neutral-200 bg-transparent text-black text-xs font-semibold tracking-wider uppercase hover:border-black transition-all"
                >
                  <Settings className="w-4 h-4" />
                  <span>{isAdminLoggedIn ? 'Ir al Panel Admin' : 'Ingreso de Administrador'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
