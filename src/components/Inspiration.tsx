/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import carouselImages from 'virtual:carousel-images';

function LeafField() {
  return (
    <svg className="h-full w-full" viewBox="0 0 360 520" fill="none" aria-hidden="true">
      <g stroke="#C4A574" strokeWidth="1.2">
        <path d="M180 40 C250 90 310 180 280 280 C250 380 160 430 110 360 C60 290 90 140 180 40 Z" />
        <path d="M180 70 L168 340" />
        <path d="M176 120 L230 150 M174 170 L120 190 M172 220 L236 250 M170 270 L124 300" />
        <path d="M70 430 C120 400 150 450 130 500 C100 470 60 470 70 430 Z" />
        <path d="M280 20 C320 70 350 60 340 20 C310 10 290 0 280 20 Z" />
      </g>
    </svg>
  );
}

function slidesInView() {
  if (typeof window === 'undefined') return 3.25;
  if (window.innerWidth >= 1024) return 3.25;
  if (window.innerWidth >= 640) return 2.15;
  return 1.12;
}

export default function Inspiration() {
  const images = carouselImages;
  const count = images.length;
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(slidesInView);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const onResize = () => setPerView(slidesInView());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (count < 2 || paused) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const timer = window.setInterval(() => setIndex((current) => current + 1), 4500);
    return () => window.clearInterval(timer);
  }, [count, paused]);

  useEffect(() => {
    if (count === 0 || index < count) return;
    const timer = window.setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [index, count]);

  useEffect(() => {
    if (animate) return;
    const frame = window.requestAnimationFrame(() => setAnimate(true));
    return () => window.cancelAnimationFrame(frame);
  }, [animate]);

  if (count === 0) return null;

  const loop = [...images, ...images];
  const activeDot = index % count;

  const goTo = (next: number) => {
    setAnimate(true);
    setIndex((next + count) % count);
  };

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden border-b border-oro/25 bg-marfil py-16 lg:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute -right-6 top-0 hidden h-72 w-72 opacity-60 sm:block">
        <LeafField />
      </div>
      <div className="pointer-events-none absolute -left-10 bottom-0 hidden h-64 w-64 rotate-180 opacity-50 sm:block">
        <LeafField />
      </div>

      <div className="relative px-6 lg:px-16">
        <div className="mb-3 h-px w-14 bg-oro" />
        <h2 className="max-w-4xl font-serif text-4xl leading-tight text-ciruela lg:text-5xl">
          Mi inspiración{' '}
          <span className="italic text-oro">de traerme un recuerdo.</span>
        </h2>
      </div>

      <div className="relative mt-10">
        <button
          type="button"
          aria-label="Foto anterior"
          onClick={() => goTo(activeDot - 1)}
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-wine text-white shadow-md transition-colors hover:bg-borgona lg:left-8"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Foto siguiente"
          onClick={() => {
            setAnimate(true);
            setIndex((current) => current + 1);
          }}
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-wine text-white shadow-md transition-colors hover:bg-borgona lg:right-8"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="overflow-hidden px-2 sm:px-8">
          <div
            className="flex"
            style={{
              transform: `translateX(-${index * (100 / perView)}%)`,
              transition: animate ? 'transform 700ms ease' : 'none',
            }}
          >
            {loop.map((src, slide) => (
              <div
                key={`${src}-${slide}`}
                className="shrink-0 px-2"
                style={{ width: `${100 / perView}%` }}
              >
                <img
                  src={src}
                  alt=""
                  className="aspect-[4/5] w-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2.5">
        {images.map((src, dot) => (
          <button
            key={src}
            type="button"
            aria-label={`Ver foto ${dot + 1}`}
            aria-current={dot === activeDot}
            onClick={() => goTo(dot)}
            className={`h-2.5 w-2.5 cursor-pointer rounded-full transition-colors ${
              dot === activeDot ? 'bg-wine' : 'bg-oro/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
