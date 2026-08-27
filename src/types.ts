/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PortfolioItem {
  id: string;
  type: 'video' | 'photo' | 'design';
  title: string;
  category: string;
  description: string;
  mediaUrl: string;
  aspect: 'square' | 'portrait' | 'video' | 'landscape';
  embedUrl?: string; // Optional YouTube/Vimeo embed or HTML5 mock video source
  links?: { url: string; label: string }[]; // Visible clickable links in modal
}

export interface ServicePlan {
  id: string;
  name: string;
  price: number;
  currency: 'CRC' | 'USD';
  description: string;
  features: string[];
  duration: string;
}

export interface ShopProduct {
  id: string;
  name: string;
  price: number;
  currency: 'CRC' | 'USD';
  image: string;
  description: string;
  category: string;
  inStock: boolean;
}

export interface Bio {
  name: string;
  tagline: string;
  story: string;
  location: string;
  whatsapp: string;
  email: string;
  facebook: string;
  facebookUrl: string;
  instagram: string;
  instagramUrl: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  read: boolean;
  createdAt?: number;
}

export interface CustomEstimate {
  id: string;
  serviceType: 'video' | 'photo' | 'social' | 'combo';
  hours: number;
  photosEdited: number;
  deliveryDays: number;
  addons: string[];
  totalEstimate: number;
}
