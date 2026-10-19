/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// Recorte del PNG (1600²) sobre el monograma y el wordmark, sin el margen de papel.
const SRC = 1600;
const CROP = { x: 364, y: 432, w: 924, h: 672 };

interface LogoProps {
  height?: number;
  className?: string;
}

export default function Logo({ height = 64, className = '' }: LogoProps) {
  const scale = height / CROP.h;

  return (
    <span
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ width: CROP.w * scale, height }}
    >
      <img
        src="/logo/logo.png"
        alt="Mirix Studio CR"
        className="absolute max-w-none mix-blend-multiply select-none"
        style={{
          width: SRC * scale,
          height: SRC * scale,
          left: -CROP.x * scale,
          top: -CROP.y * scale,
        }}
      />
    </span>
  );
}
