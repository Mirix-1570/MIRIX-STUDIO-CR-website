/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  height?: number;
  className?: string;
}

export default function Logo({ height = 64, className = '' }: LogoProps) {
  return (
    <img
      src="/logo/logo-mark.jpg"
      alt="Mirix Studio CR"
      height={height}
      fetchPriority="high"
      decoding="async"
      className={`w-auto mix-blend-multiply select-none ${className}`}
      style={{ height }}
    />
  );
}
