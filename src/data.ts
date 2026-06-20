/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioItem, ServicePlan, ShopProduct } from './types';

export const INITIAL_BIOGRAPHY = {
  name: "Miranda Méndez",
  tagline: "Diseñadora de experiencias visuales y desarrolladora web",
  story: `Soy Miranda Méndez, una chica todo en uno con creatividad y talento para aportar en la sociedad. Cuando era pequeña creía que sabía de arquitectura, amaba el diseño de interiores y exteriores, tenía y aún tengo talento para la fotografía, y entre otras cosas más.

Durante mi trayecto en el colegio, no sabía ni qué estudiar al salir, hasta que conocí a un compañero de clase en octavo en 2018 que se creía diseñador gráfico. En ese año conocí uno de los mundos más hermosos para mí, el mundo de la creatividad. Después de ahí, supe qué quería estudiar y de la mano de Dios hacia dónde caminar en la vida, y créeme, el resto es historia. Dios me ha mostrado cuál es su propósito conmigo y creo firmemente que este emprendimiento es parte de él.`,
  location: "Esparza, Puntarenas, Costa Rica.",
  whatsapp: "+506 63105876",
  email: "mirixstudiocr@gmail.com",
  facebook: "Mirix Studio CR",
  facebookUrl: "https://www.facebook.com/profile.php?id=61560948967916", // Beautiful direct link format
  instagram: "mirix_studio.cr",
  instagramUrl: "https://www.instagram.com/mirix_studio.cr/",
};

export const INITIAL_PLANS: ServicePlan[] = [
  {
    id: "plan-social",
    name: "Social Creator",
    price: 75000,
    currency: "CRC",
    duration: "por mes",
    description: "Gestión básica y creación de contenido estratégico para marcas emergentes que quieren brillar con luz propia.",
    features: [
      "8 Reels de alta definición adaptados a tendencias",
      "4 Posts gráficos o carruseles interactivos",
      "Planificación y calendario de contenido mensual",
      "Edición de copys estratégicos y estudio de hashtags",
      "Sesión virtual de lluvia de ideas de 1 hora",
      "Soporte rápido vía WhatsApp"
    ]
  },
  {
    id: "plan-audiovisual",
    name: "Producción Audiovisual Élite",
    price: 145000,
    currency: "CRC",
    duration: "por sesión",
    description: "Servicio completo de rodaje y fotografía profesional para capturar la esencia de tu proyecto con el más alto impacto visual.",
    features: [
      "Hasta 3 horas de producción en locación (Esparza o Puntarenas)",
      "20 Fotografías artísticas en alta resolución (editadas)",
      "2 Videos promocionales cinematicos (30-60 seg, formato vertical/horizontal)",
      "Equipo profesional de iluminación portátil y micrófonos inalámbricos",
      "Dirección artística personalizada por Miranda",
      "Entrega rápida vía Drive en un plazo máximo de 7 días"
    ]
  },
  {
    id: "plan-combo-total",
    name: "Mirix VIP Todo En Uno",
    price: 280000,
    currency: "CRC",
    duration: "mensual/combo",
    description: "La transformación digital total: Producción audiovisual premium combinada con el desarrollo de tu sitio web profesional.",
    features: [
      "Todo lo incluido en el Plan Social y Producción Estándar",
      "Diseño y Desarrollo de Sitio Web Portafolio Profesional",
      "Integración de tienda online básica o catálogo interactivo",
      "Formularios de contacto inteligentes con notificaciones",
      "15 Reels de alta fidelidad mensuales en total",
      "Sección prioritaria de fotografía corporativa o de marca personal",
      "Soporte y mantenimiento web preferencial"
    ]
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: "port-1",
    type: "photo",
    title: "Estructuras & Sombras",
    category: "Arquitectura",
    description: "Estudio geométrico del concreto y las perspectivas lineales bajo un sol de mediodía costarricense.",
    mediaUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
    aspect: "landscape"
  },
  {
    id: "port-2",
    type: "photo",
    title: "Retrato en Claroscuro",
    category: "Fotografía de Retrato",
    description: "Captura íntima jugando con luces incidentes y sombras pronunciadas en estudio.",
    mediaUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000",
    aspect: "portrait"
  },
  {
    id: "port-3",
    type: "photo",
    title: "Diseño Interior Orgánico",
    category: "Diseño Interior",
    description: "Composición de textiles, maderas crudas y plantas en un espacio minimalista contemporáneo.",
    mediaUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000",
    aspect: "square"
  },
  {
    id: "port-4",
    type: "video",
    title: "Llum: Cortometraje del Atardecer",
    category: "Cine / Video",
    description: "Cortometraje experimental centrado en las tonalidades de luz dorada en las costas del golfo de Nicoya.",
    mediaUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000",
    aspect: "video",
    embedUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c05427382c201cab29656b2c4e9ec030&profile_id=139&oauth2_token_id=57447761" // Dynamic high-quality safe video file
  },
  {
    id: "port-5",
    type: "video",
    title: "Estilo & Ritmo en Redes",
    category: "Social Reels",
    description: "Muestra de transiciones rápidas y estética visual moderna creada para marcas de café local.",
    mediaUrl: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=1000",
    aspect: "video",
    embedUrl: "https://player.vimeo.com/external/435674703.sd.mp4?s=7f32e315afda1afaf98695029e2467d1f4d9a449&profile_id=139&oauth2_token_id=57447761" // Creative studio shoot video loop
  },
  {
    id: "port-6",
    type: "photo",
    title: "Desarrollo Web Auténtico",
    category: "Desarrollo Web",
    description: "Interfaces webs minimalistas construidas con animaciones fluidas y accesibilidad extrema.",
    mediaUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    aspect: "landscape"
  },
  {
    id: "port-7",
    type: "photo",
    title: "Siluetas de Puntarenas",
    category: "Fotografía de Calle",
    description: "Estudio de las personas moviéndose frente al mar en una tarde de brisa salada.",
    mediaUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000",
    aspect: "portrait"
  }
];

export const INITIAL_PRODUCTS: ShopProduct[] = [
  {
    id: "prod-1",
    name: "Estabilizador de 3 Ejes SmartPro",
    price: 45000,
    currency: "CRC",
    image: "https://images.unsplash.com/photo-1601524909162-be87252be298?auto=format&fit=crop&q=80&w=600",
    description: "Gimbal activo para celulares inteligentes que elimina cualquier vibración. Ideal para crear reels súper fluidos y cinematográficos.",
    category: "Creador de Contenido",
    inStock: true
  },
  {
    id: "prod-2",
    name: "Kit Aro de Luz LED Minimalist Pro",
    price: 18500,
    currency: "CRC",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600",
    description: "Iluminación difusa y ajustable con control de calidez y trípode de aluminio. Dale a tus retratos y videos un acabado de estudio profesional.",
    category: "Iluminación",
    inStock: true
  },
  {
    id: "prod-3",
    name: "Micrófono Dual Lavalier Inalámbrico",
    price: 12000,
    currency: "CRC",
    image: "https://images.unsplash.com/photo-1590608897129-79da98d15969?auto=format&fit=crop&q=80&w=600",
    description: "Micrófonos inalámbricos ultra sutiles para celular. Excelente reducción de ruido externo, perfecto para grabaciones y entrevistas en la calle.",
    category: "Audio",
    inStock: true
  },
  {
    id: "prod-4",
    name: "Lentes de Sol Vintage Creator Edition",
    price: 7500,
    currency: "CRC",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600",
    description: "Estilo atemporal y retro. El accesorio perfecto para tus posts de marca de moda personal o sesiones fotográficas bajo el sol de Puntarenas.",
    category: "Accesorios / Estilo",
    inStock: true
  },
  {
    id: "prod-5",
    name: "Reflector de Luz 5-en-1 Colapsable",
    price: 9500,
    currency: "CRC",
    image: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80&w=600",
    description: "Discos reflectores (Rojo, Dorado, Plateado, Negro, Blanco) para suavizar sombras duras y modelar la luz solar directa. Plegable y fácil de transportar.",
    category: "Fotografía",
    inStock: true
  }
];

// Helper Functions to load state with falling backs
export function getSavedData<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (e) {
    console.error(`Error loading state for key ${key}`, e);
    return defaultValue;
  }
}

export function saveData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving state for key ${key}`, e);
  }
}
