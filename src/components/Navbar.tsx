/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  currentTab: string;
  onNavigate: (target: string) => void;
}

const NAV = [
  { id: 'home', label: 'Inicio' },
  { id: 'portfolio', label: 'Portafolio' },
  { id: 'retainers', label: 'Planes' },
  { id: 'about', label: 'Quiénes somos' },
  { id: 'vault', label: 'Tienda' },
  { id: 'booking', label: 'Contacto' },
];

export default function Navbar({
  currentTab,
  onNavigate,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    if (currentTab !== 'home') return;
    const sections = NAV.map((item) => document.getElementById(item.id)).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.15, 0.35, 0.6] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [currentTab]);

  const go = (target: string) => {
    setMobileMenuOpen(false);
    if (NAV.some((item) => item.id === target)) setActiveId(target);
    onNavigate(target);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-oro/30 shadow-[0_2px_12px_rgba(59,13,35,0.08)]">
      <div className="h-20 w-full px-6 lg:px-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <button onClick={() => go('home')} className="shrink-0 cursor-pointer" aria-label="Ir al inicio">
            <Logo height={58} />
          </button>
          <span className="hidden sm:inline-flex items-center font-label text-[10px] uppercase tracking-[0.22em] text-mint bg-bosque border border-[#2D5A46] font-semibold px-2.5 py-1">
            Esparza — CR
          </span>
        </div>

        <nav className="hidden lg:flex flex-1 items-center justify-center gap-1">
          {NAV.map((item) => {
            const active = currentTab === 'home' && activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={`px-3 xl:px-4 py-2 rounded-sm font-sans text-[11px] xl:text-xs font-semibold tracking-[0.16em] uppercase cursor-pointer transition-colors ${
                  active ? 'bg-neutral-100 text-zinc-800' : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-ciruela cursor-pointer"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-neutral-200 bg-white overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV.map((item) => {
                const active = currentTab === 'home' && activeId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => go(item.id)}
                    className={`text-left px-4 py-3 rounded-sm font-sans text-xs font-semibold tracking-[0.16em] uppercase cursor-pointer ${
                      active ? 'bg-neutral-100 text-zinc-800' : 'text-zinc-500 hover:text-zinc-800'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
