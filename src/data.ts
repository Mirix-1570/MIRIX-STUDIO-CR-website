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
  facebookUrl: "https://www.facebook.com/share/19DWfWjiKi/", // Mirix Studio CR Facebook page
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
      "Entrega rápida vía Drive en un plazo máximo de 15 días"
    ]
  },
  {
    id: "plan-combo-total",
    name: "Mirix VIP Todo En Uno",
    price: 280000,
    currency: "CRC",
    duration: "mensual/combo",
    description: "La transformación digital total: Producción audiovisual premium combinada con gestión de redes sociales integral para un impacto visual y estratégico sin igual.",
    features: [
      "Todo lo incluido en el Plan Social y Producción Estándar",
      "Catálogo de productos y servicios con fotografía profesional",
      "Foto y video de eventos corporativos o personales (hasta 2 horas de cobertura)",
      "15 Reels de alta fidelidad mensuales en total",
      "Gestión completa de redes sociales con estrategia de marketing digital",
      "Soporte prioritario y reuniones de seguimiento quincenales",
      "Poscisionamiento de empresa en Google y Google Maps",
      "Análisis de métricas y reportes mensuales de desempeño",
      "Asesoría en branding y diseño gráfico para identidad visual"
    ]
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: "port-1",
    type: "photo",
    title: "Fotografía Artística",
    category: "Naturaleza",
    description: "Captura de la creación de Dios y sus obras.",
    mediaUrl: "/FB_IMG_1741379727264.jpg",
    aspect: "landscape",
    links: [
      { url: "https://photos.app.goo.gl/mzCsNbhYmg5gMy8C8", label: "Ver Portfolio" }
    ]
  },
  {
    id: "port-2",
    type: "photo",
    title: "Retratos en Estudio",
    category: "Producciones Vega",
    description: "Fotos jugando con luces incidentes y sombras en estudio o lugar de trabajo.",
    mediaUrl: "/FB_IMG_1755032448510.jpg",
    aspect: "portrait",
    links: [
      { url: "https://photos.app.goo.gl/26wUQZG7JYmj5VoJ8", label: "Ver Portfolio" }
    ]
  },
  {
    id: "port-3",
    type: "photo",
    title: "Recursos Visuales para Diseño",
    category: "Acontecer Espartano Y Algo Más",
    description: "Fotografía de objetos y productos para su uso en diseño gráfico, publicidad y marketing digital.",
    mediaUrl: "/IMG-20260123-WA0140.jpg",
    aspect: "square",
    links: [
      { url: "https://photos.app.goo.gl/HarFx2vejSWXN3Gw5", label: "Ver Portfolio" }
    ]
  },
  {
    id: "port-4",
    type: "video",
    title: "Grabación de Video Comercial",
    category: "Mirix Studio CR + Producciones Vega",
    description: "Video Comercial para promocionar Producciones Vega y sus servicios de fotografía y video profesional.",
    mediaUrl: "/FB_IMG_1755032417111.jpg",
    aspect: "video",
    embedUrl: "/VID-20250409-WA0019.mp4", // Local video file from public folder
    links: [
      { url: "https://photos.app.goo.gl/26wUQZG7JYmj5VoJ8", label: "Ver Portfolio" }
    ]
  },
  {
    id: "port-6",
    type: "photo",
    title: "Fotografía Gatronómica",
    category: "Pa'Pikar Colombia",
    description: "Fotografía de alimentos y bebidas en un estilo artístico y delicioso.",
    mediaUrl: "/IMG-20260226-WA0053.jpg",
    aspect: "landscape",
    links: [
      { url: "https://photos.app.goo.gl/yxMjThrZM4UsJPtw5", label: "Ver Portfolio" }
    ]
  },
  {
    id: "port-7",
    type: "photo",
    title: "Redes Sociales y Marketing Digital",
    category: "Inovatry Solutions",
    description: "Diseño de contenido visual para redes sociales y estrategias de marketing digital.",
    mediaUrl: "/IMG-20260731-WA0015.jpg",
    aspect: "portrait",
    links: [
      { url: "https://photos.app.goo.gl/G75uh8wSekZLHr3x8", label: "Ver Portfolio" }
    ]
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
