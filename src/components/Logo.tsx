/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  height?: number;
  className?: string;
  src?: string;
}

export default function Logo({ height = 64, className = '', src = '/logo/logo-mark.png' }: LogoProps) {
  return (
    <img
      src={src}
      alt="Mirix Studio CR"
      height={height}
      decoding="async"
      className={`block w-auto max-w-none shrink-0 select-none ${className}`}
      style={{ height, minHeight: height }}
    />
  );
}
