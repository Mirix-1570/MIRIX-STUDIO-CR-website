/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PortfolioItem {
  id: string;
  type: 'video' | 'photo';
  title: string;
  category: string;
  description: string;
  mediaUrl: string;
  aspect: 'square' | 'portrait' | 'video' | 'landscape';
  embedUrl?: string; // Optional YouTube/Vimeo embed or HTML5 mock video source
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

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  read: boolean;
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
