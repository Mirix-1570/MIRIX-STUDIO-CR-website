/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock, Unlock, LogOut, Settings, Plus, Trash2, Edit2, CheckCircle, Eye,
  LayoutDashboard, ShoppingBag, FolderOpen, Mail, UserCheck, RefreshCw, Key, ArrowRight, UserPlus
} from 'lucide-react';
import { ServicePlan, ShopProduct, PortfolioItem, ContactMessage } from '../types';

interface AdminPanelProps {
  plans: ServicePlan[];
  setPlans: (plans: ServicePlan[]) => void;
  products: ShopProduct[];
  setProducts: (products: ShopProduct[]) => void;
  portfolioItems: PortfolioItem[];
  setPortfolioItems: (items: PortfolioItem[]) => void;
  messages: ContactMessage[];
  setMessages: (messages: ContactMessage[]) => void;
  biography: any;
  setBiography: (bio: any) => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (loggedIn: boolean) => void;
  resetAllToDefaults: () => void;
}

export default function AdminPanel({
  plans,
  setPlans,
  products,
  setProducts,
  portfolioItems,
  setPortfolioItems,
  messages,
  setMessages,
  biography,
  setBiography,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
  resetAllToDefaults
}: AdminPanelProps) {
  
  // Auth Form states
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Active Control Panel Tab
  const [activeTab, setActiveTab] = useState<'plans' | 'products' | 'portfolio' | 'messages' | 'biography'>('messages');

  // Products CRUD states
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState<number>(0);
  const [prodCategory, setProdCategory] = useState('Creador de Contenido');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodInStock, setProdInStock] = useState(true);

  // Plans CRUD states
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [planName, setPlanName] = useState('');
  const [planPrice, setPlanPrice] = useState<number>(0);
  const [planDuration, setPlanDuration] = useState('');
  const [planDesc, setPlanDesc] = useState('');
  const [planFeatures, setPlanFeatures] = useState<string[]>([]);
  const [newFeatureText, setNewFeatureText] = useState('');

  // Portfolio CRUD states
  const [editingPortId, setEditingPortId] = useState<string | null>(null);
  const [portTitle, setPortTitle] = useState('');
  const [portType, setPortType] = useState<'photo' | 'video'>('photo');
  const [portCategory, setPortCategory] = useState('Fotografía Professional');
  const [portDesc, setPortDesc] = useState('');
  const [portMediaUrl, setPortMediaUrl] = useState('');
  const [portAspect, setPortAspect] = useState<'square' | 'portrait' | 'video' | 'landscape'>('square');
  const [portEmbed, setPortEmbed] = useState('');

  // Biography settings states
  const [bioName, setBioName] = useState(biography.name);
  const [bioTagline, setBioTagline] = useState(biography.tagline);
  const [bioStory, setBioStory] = useState(biography.story);
  const [bioLocation, setBioLocation] = useState(biography.location);
  const [bioWhatsapp, setBioWhatsapp] = useState(biography.whatsapp);
  const [bioEmail, setBioEmail] = useState(biography.email);
  const [bioInstagram, setBioInstagram] = useState(biography.instagram);
  const [bioFacebook, setBioFacebook] = useState(biography.facebook);

  // Authentication Setup on launch on local storage
  useEffect(() => {
    // Check if there is any account created. If not, seed default admin/password
    const existingUsers = localStorage.getItem('mirix_users');
    if (!existingUsers) {
      const defaultUsers = [{ username: 'admin', password: 'password' }];
      localStorage.setItem('mirix_users', JSON.stringify(defaultUsers));
    }
  }, []);

  // Hydrate Bio states if parent changes
  useEffect(() => {
    setBioName(biography.name);
    setBioTagline(biography.tagline);
    setBioStory(biography.story);
    setBioLocation(biography.location);
    setBioWhatsapp(biography.whatsapp);
    setBioEmail(biography.email);
    setBioInstagram(biography.instagram);
    setBioFacebook(biography.facebook);
  }, [biography]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (!username.trim() || !password.trim()) {
      setAuthError('Por favor complete todos los campos.');
      return;
    }

    try {
      const usersStr = localStorage.getItem('mirix_users') || '[]';
      const users = JSON.parse(usersStr);

      const foundUser = users.find(
        (u: any) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
      );

      if (foundUser) {
        setIsAdminLoggedIn(true);
        setAuthSuccess('Ingreso autorizado. ¡Bienvenida, Miranda!');
        setUsername('');
        setPassword('');
      } else {
        setAuthError('Credenciales incorrectas. Verifique e intente nuevamente.');
      }
    } catch (err) {
      setAuthError('Fallo en el sistema de autenticación de seguridad.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (!username.trim() || !password || !confirmPassword) {
      setAuthError('Por favor complete todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      setAuthError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      setAuthError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      const usersStr = localStorage.getItem('mirix_users') || '[]';
      const users = JSON.parse(usersStr);

      const exists = users.some((u: any) => u.username.toLowerCase() === username.trim().toLowerCase());
      if (exists) {
        setAuthError('Este nombre de usuario ya está registrado en el sistema.');
        return;
      }

      const updatedUsers = [...users, { username: username.trim(), password }];
      localStorage.setItem('mirix_users', JSON.stringify(updatedUsers));
      
      setAuthSuccess('Registro completo. Perfil creado exitosamente. Ya puedes iniciar sesión.');
      setAuthMode('login');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setAuthError('Error guardando la cuenta.');
    }
  };

  // PRODUCTS OPERATIONS
  const handleAddNewProductInput = () => {
    setEditingProductId('new');
    setProdName('');
    setProdPrice(15000);
    setProdCategory('Creador de Contenido');
    setProdDesc('');
    setProdImage('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600');
    setProdInStock(true);
  };

  const handleEditProductClick = (product: ShopProduct) => {
    setEditingProductId(product.id);
    setProdName(product.name);
    setProdPrice(product.price);
    setProdCategory(product.category);
    setProdDesc(product.description);
    setProdImage(product.image);
    setProdInStock(product.inStock);
  };

  const handleSaveProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || prodPrice <= 0 || !prodDesc.trim()) {
      alert('Por favor rellene los campos obligatorios.');
      return;
    }

    if (editingProductId === 'new') {
      const newProduct: ShopProduct = {
        id: `prod-${Date.now()}`,
        name: prodName,
        price: prodPrice,
        currency: 'CRC',
        category: prodCategory,
        description: prodDesc,
        image: prodImage || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600',
        inStock: prodInStock
      };
      setProducts([newProduct, ...products]);
    } else {
      const updated = products.map(p => {
        if (p.id === editingProductId) {
          return {
            ...p,
            name: prodName,
            price: prodPrice,
            category: prodCategory,
            description: prodDesc,
            image: prodImage,
            inStock: prodInStock
          };
        }
        return p;
      });
      setProducts(updated);
    }

    setEditingProductId(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar este producto de dropshipping de la tienda?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // PLANS OPERATIONS
  const handlePlanEditClick = (plan: ServicePlan) => {
    setEditingPlanId(plan.id);
    setPlanName(plan.name);
    setPlanPrice(plan.price);
    setPlanDuration(plan.duration);
    setPlanDesc(plan.description);
    setPlanFeatures(plan.features);
  };

  const handleAddFeature = () => {
    if (newFeatureText.trim()) {
      setPlanFeatures([...planFeatures, newFeatureText.trim()]);
      setNewFeatureText('');
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setPlanFeatures(planFeatures.filter((_, i) => i !== idx));
  };

  const handleSavePlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!planName.trim() || planPrice <= 0 || !planDesc.trim() || planFeatures.length === 0) {
      alert('Rellene todos los campos obligatorios del plan y añada al menos una especificación.');
      return;
    }

    const updated = plans.map(p => {
      if (p.id === editingPlanId) {
        return {
          ...p,
          name: planName,
          price: planPrice,
          duration: planDuration,
          description: planDesc,
          features: planFeatures
        };
      }
      return p;
    });

    setPlans(updated);
    setEditingPlanId(null);
  };

  // PORTFOLIO OPERATIONS
  const handleAddPortfolioInput = () => {
    setEditingPortId('new');
    setPortTitle('');
    setPortType('photo');
    setPortCategory('Fotografía');
    setPortDesc('');
    setPortMediaUrl('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1000');
    setPortAspect('square');
    setPortEmbed('');
  };

  const handleEditPortClick = (item: PortfolioItem) => {
    setEditingPortId(item.id);
    setPortTitle(item.title);
    setPortType(item.type);
    setPortCategory(item.category);
    setPortDesc(item.description);
    setPortMediaUrl(item.mediaUrl);
    setPortAspect(item.aspect);
    setPortEmbed(item.embedUrl || '');
  };

  const handleSavePortfolioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portTitle.trim() || !portCategory.trim() || !portMediaUrl.trim()) {
      alert('Complete los campos obligatorios.');
      return;
    }

    if (editingPortId === 'new') {
      const newItem: PortfolioItem = {
        id: `port-${Date.now()}`,
        title: portTitle,
        type: portType,
        category: portCategory,
        description: portDesc,
        mediaUrl: portMediaUrl,
        aspect: portAspect,
        embedUrl: portEmbed || undefined
      };
      setPortfolioItems([newItem, ...portfolioItems]);
    } else {
      const updated = portfolioItems.map(p => {
        if (p.id === editingPortId) {
          return {
            ...p,
            title: portTitle,
            type: portType,
            category: portCategory,
            description: portDesc,
            mediaUrl: portMediaUrl,
            aspect: portAspect,
            embedUrl: portEmbed || undefined
          };
        }
        return p;
      });
      setPortfolioItems(updated);
    }

    setEditingPortId(null);
  };

  const handleDeletePortItem = (id: string) => {
    if (confirm('¿Desea borrar esta entrada multimedia de la galería?')) {
      setPortfolioItems(portfolioItems.filter(p => p.id !== id));
    }
  };

  // GENERAL BIOGRAPHY SAVING
  const handleSaveBiographySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBio = {
      name: bioName,
      tagline: bioTagline,
      story: bioStory,
      location: bioLocation,
      whatsapp: bioWhatsapp,
      email: bioEmail,
      facebook: bioFacebook,
      instagram: bioInstagram,
      facebookUrl: `https://facebook.com/${bioFacebook.replace(/\s+/g, '')}`,
      instagramUrl: `https://instagram.com/${bioInstagram.replace(/\s+/g, '')}`
    };
    setBiography(updatedBio);
    alert('Biografía y Redes de Mirix Studio CR actualizadas exitosamente.');
  };

  // INQUIRIES FOLDER OPERATIONS
  const toggleMessageRead = (id: string) => {
    setMessages(
      messages.map(m => {
        if (m.id === id) return { ...m, read: !m.read };
        return m;
      })
    );
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm('¿Desea eliminar de forma permanente esta solicitud del cliente?')) {
      setMessages(messages.filter(m => m.id !== id));
    }
  };

  // Sign out admin
  const handleLogout = () => {
    setIsAdminLoggedIn(false);
  };

  // RESET FALLBACKS
  const handleReset = () => {
    if (confirm('¿Restablecer todos los datos editados vuelven hoy a sus valores originales iniciales? Se borrarán cuentas registradas extra.')) {
      resetAllToDefaults();
      setIsAdminLoggedIn(false);
      alert('Sitio web restablecido.');
    }
  };

  return (
    <div className="bg-zinc-950 text-white min-h-[85vh] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* UNAUTHENTICATED: LOGIN & SIGN IN VIEW (Requirement #6) */}
        {!isAdminLoggedIn ? (
          <div className="max-w-md mx-auto bg-black border border-zinc-900 p-8 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
            
            {/* Logo heading */}
            <div className="text-center mb-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-white flex items-center justify-center text-black mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-sans font-black tracking-tight uppercase">
                {authMode === 'login' ? 'Acceso Administrativo' : 'Crear Cuenta Admin'}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                {authMode === 'login' 
                  ? 'Inicie sesión para editar planes, tienda y proformas.' 
                  : 'Registre un nuevo perfil de control administrativo.'}
              </p>
            </div>

            {/* Error notifications */}
            {authError && (
              <div className="p-3.5 mb-4 bg-red-950/40 border border-red-900 rounded text-xs text-red-400 font-mono">
                {authError}
              </div>
            )}

            {/* Success notifications */}
            {authSuccess && (
              <div className="p-3.5 mb-4 bg-green-950/40 border border-green-900 rounded text-xs text-green-400 font-mono">
                {authSuccess}
              </div>
            )}

            <form onSubmit={authMode === 'login' ? handleLoginSubmit : handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 block mb-1">Nombre de Usuario</label>
                <input
                  type="text"
                  placeholder="Ej: nomeselaclave"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm placeholder-zinc-700 font-sans transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 block mb-1">Contraseña secreta</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm placeholder-zinc-700 font-mono transition-colors"
                />
              </div>

              {authMode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 block mb-1">Confirmar contraseña</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm placeholder-zinc-700 font-mono transition-colors"
                  />
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-white text-black font-sans font-bold text-xs tracking-widest uppercase rounded-sm hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-2 cursor-pointer mt-6"
              >
                {authMode === 'login' ? <Unlock className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                <span>{authMode === 'login' ? 'Iniciar Sesión' : 'Registrar Credencial'}</span>
              </button>
            </form>

            <div className="pt-6 mt-6 border-t border-zinc-900 text-center text-xs">
              {authMode === 'login' ? (
                <p className="text-zinc-500">
                  ¿No tienes acceso?{' '}
                  <button
                    onClick={() => setAuthMode('register')}
                    className="text-white hover:underline uppercase text-[10px] font-semibold tracking-wider cursor-pointer"
                  >
                    Registrar Cuenta (Sign In)
                  </button>
                </p>
              ) : (
                <p className="text-zinc-500">
                  ¿Ya tienes un usuario autorizado?{' '}
                  <button
                    onClick={() => setAuthMode('login')}
                    className="text-white hover:underline uppercase text-[10px] font-semibold tracking-wider cursor-pointer"
                  >
                    Ingresar (Log In)
                  </button>
                </p>
              )}
            </div>

          </div>
        ) : (
          
          /* AUTHENTICATED REAL CONTROL BACKOFFICE VIEW */
          <div className="space-y-8">
            
            {/* Header control line */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-900 pb-6 gap-4">
              <div>
                <div className="flex items-center space-x-2 text-zinc-400 text-xs font-semibold tracking-widest uppercase">
                  <Settings className="w-4 h-4 text-white animate-spin-slow" />
                  <span>SISTEMA INTERNO DE COMANDOS</span>
                </div>
                <h2 className="text-3xl font-sans font-black tracking-tight uppercase mt-1">Gabinete de Control</h2>
                <p className="text-xs text-zinc-400 mt-1">Actualice de manera dinámica los precios de planes, existencias de dropshipping, multimedia de galería y lea su correspondencia.</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-transparent border border-red-900 hover:border-red-500 text-red-400 hover:text-white transition-all text-xs font-semibold tracking-wider rounded-sm uppercase cursor-pointer"
                  title="Restablecer base de datos inicial"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Restaurar Base</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all text-xs font-semibold tracking-wider rounded-sm uppercase cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Salir</span>
                </button>
              </div>
            </div>

            {/* Layout tabs dashboard split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Navigation column list */}
              <div className="lg:col-span-3 space-y-2 bg-zinc-950 border border-zinc-900 p-4 rounded-sm">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block px-3 mb-2">Módulos del Sistema</span>
                
                {[
                  { id: 'messages', label: `Buzón Correspondencia (${messages.filter(m => !m.read).length})`, icon: Mail },
                  { id: 'products', label: 'Tienda Dropshipping', icon: ShoppingBag },
                  { id: 'plans', label: 'Planes Tarifas CR', icon: LayoutDashboard },
                  { id: 'portfolio', label: 'Portafolio Multimedia', icon: FolderOpen },
                  { id: 'biography', label: 'Configuración de Bio', icon: UserCheck }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        setEditingProductId(null);
                        setEditingPlanId(null);
                        setEditingPortId(null);
                      }}
                      className={`flex items-center space-x-3 w-full px-4 py-3 rounded text-left text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white text-black'
                          : 'text-zinc-400 hover:bg-zinc-900/40 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Main edit workspace panel */}
              <div className="lg:col-span-9 bg-black border border-zinc-900 p-6 sm:p-8 rounded-sm">
                
                {/* 1. MESSAGES CENTER BUZÓN TAB */}
                {activeTab === 'messages' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-sans font-black tracking-tight uppercase text-white">Mensajes del Formulario de Contacto</h3>
                      <span className="text-xs bg-zinc-900 px-3 py-1 rounded text-zinc-400 border border-zinc-800 font-mono">
                        {messages.length} mensajes en total
                      </span>
                    </div>

                    <div className="space-y-4">
                      {messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`p-5 rounded border transition-all ${
                            msg.read 
                              ? 'bg-zinc-950/20 border-zinc-900' 
                              : 'bg-zinc-900/60 border-zinc-700 shadow-sm'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm tracking-wide text-white">{msg.name}</span>
                                {!msg.read && (
                                  <span className="bg-white text-black font-mono text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-wide rounded">Nuevo</span>
                                )}
                              </div>
                              <span className="text-xs text-zinc-400 font-light block">{msg.email} • {msg.phone}</span>
                            </div>
                            <span className="text-[10px] text-zinc-500 font-mono">{msg.date}</span>
                          </div>

                          <div className="bg-zinc-950/40 p-3 border border-zinc-900 rounded mb-4 text-xs font-light text-zinc-300 leading-relaxed font-sans">
                            <span className="block font-semibold uppercase text-[9px] tracking-widest text-zinc-500 mb-1">
                              Servicio de Interés: <span className="text-zinc-200">{msg.service}</span>
                            </span>
                            <p className="whitespace-pre-line">{msg.message}</p>
                          </div>

                          <div className="flex flex-wrap gap-2.5 justify-end">
                            <button
                              onClick={() => toggleMessageRead(msg.id)}
                              className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-[10px] font-bold tracking-wider rounded-sm uppercase transition-colors"
                            >
                              {msg.read ? 'Marcar como Pendiente' : 'Marcar como Leído'}
                            </button>
                            
                            <a
                              href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white text-[10px] font-bold tracking-wider rounded-sm uppercase transition-colors flex items-center gap-1"
                            >
                              Contestar WhatsApp
                            </a>

                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="px-3 py-1.5 bg-zinc-950 border border-red-900/40 hover:border-red-500 text-red-500 hover:text-white text-[10px] font-bold tracking-wider rounded-sm uppercase transition-colors"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      ))}

                      {messages.length === 0 && (
                        <div className="text-center py-12 text-zinc-500 font-sans text-sm">
                          El buzón local de correspondencia se encuentra completamente vacío.
                        </div>
                      )}
                    </div>
                  </div>
                )}


                {/* 2. TIENDA DE PRODUCTOS DROPSHIPPING TAB */}
                {activeTab === 'products' && (
                  <div className="space-y-6">
                    {editingProductId === null ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-sans font-black tracking-tight uppercase text-white">Administración de Dropshipping</h3>
                          <button
                            onClick={handleAddNewProductInput}
                            className="flex items-center space-x-1.5 px-4 py-2 bg-white text-black text-xs font-bold tracking-wider rounded-sm uppercase hover:bg-zinc-200 transition-colors cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Nuevo Artículo</span>
                          </button>
                        </div>

                        <div className="space-y-3.5">
                          {products.map(prod => (
                            <div key={prod.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-zinc-950 border border-zinc-900 rounded-sm hover:border-zinc-800 transition-all gap-4">
                              <div className="flex items-center space-x-3.5">
                                <img
                                  src={prod.image}
                                  alt={prod.name}
                                  referrerPolicy="no-referrer"
                                  className="w-12 h-12 rounded object-cover grayscale border border-zinc-800"
                                />
                                <div>
                                  <h4 className="font-bold text-sm tracking-wide text-white uppercase">{prod.name}</h4>
                                  <span className="text-xs text-zinc-400 font-mono">
                                    {prod.category} • ₡{new Intl.NumberFormat('es-CR').format(prod.price)} CRC
                                  </span>
                                  <span className={`text-[9px] block font-semibold uppercase mt-0.5 ${prod.inStock ? 'text-green-500' : 'text-zinc-550'}`}>
                                    {prod.inStock ? 'Disp. Inmediata' : 'Agotado'}
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-2 self-end sm:self-center">
                                <button
                                  onClick={() => handleEditProductClick(prod)}
                                  className="p-2 bg-zinc-900 hover:bg-white hover:text-black border border-zinc-800 text-zinc-300 rounded transition"
                                  title="Editar"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(prod.id)}
                                  className="p-2 bg-zinc-950 border border-red-900 hover:bg-red-500 hover:text-white text-red-400 rounded transition"
                                  title="Borrar"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      // EDITING / ADDING COMPONENT SPACE
                      <form onSubmit={handleSaveProductSubmit} className="space-y-6">
                        <h3 className="text-lg font-sans font-black tracking-tight uppercase text-white border-b border-zinc-900 pb-3">
                          {editingProductId === 'new' ? 'Añadir Nuevo Producto Dropshipping' : 'Editar Propiedades de Producto'}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Nombre de Artículo</label>
                            <input
                              type="text"
                              value={prodName}
                              onChange={(e) => setProdName(e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm placeholder-zinc-700 font-sans"
                              required
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Inversión (Precio en Colones ₡)</label>
                            <input
                              type="number"
                              value={prodPrice}
                              onChange={(e) => setProdPrice(parseInt(e.target.value) || 0)}
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-mono"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Categoría de Catálogo</label>
                            <input
                              type="text"
                              value={prodCategory}
                              onChange={(e) => setProdCategory(e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans"
                              required
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Enlace de Imagen URL</label>
                            <input
                              type="text"
                              value={prodImage}
                              onChange={(e) => setProdImage(e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Descripción del Producto</label>
                          <textarea
                            rows={4}
                            value={prodDesc}
                            onChange={(e) => setProdDesc(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans resize-none"
                            required
                          />
                        </div>

                        <div className="flex items-center space-x-3 bg-zinc-900/40 p-4 border border-zinc-900 rounded-sm">
                          <input
                            type="checkbox"
                            id="inStockCheck"
                            checked={prodInStock}
                            onChange={(e) => setProdInStock(e.target.checked)}
                            className="h-4 w-4 rounded border-zinc-800 bg-zinc-950 accent-white"
                          />
                          <label htmlFor="inStockCheck" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                            Disponibilidad Activa (Marcar si hay existencias)
                          </label>
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="submit"
                            className="px-6 py-3 bg-white text-black font-sans font-bold text-xs tracking-widest uppercase hover:bg-zinc-200 transition rounded-sm"
                          >
                            Guardar Cambios
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingProductId(null)}
                            className="px-6 py-3 bg-zinc-900 text-zinc-400 font-sans font-medium text-xs tracking-widest uppercase hover:text-white transition rounded-sm"
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}


                {/* 3. PLANES TARIFAS CR TAB */}
                {activeTab === 'plans' && (
                  <div className="space-y-6">
                    {editingPlanId === null ? (
                      <div className="space-y-6">
                        <h3 className="text-xl font-sans font-black tracking-tight uppercase text-white">Editar Planes de Pago</h3>
                        
                        <div className="space-y-4">
                          {plans.map(plan => (
                            <div key={plan.id} className="p-5 border border-zinc-900 bg-zinc-950/40 rounded-sm">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-extrabold text-base tracking-tight uppercase text-white">{plan.name}</h4>
                                  <span className="text-zinc-400 text-xs font-light">{plan.description}</span>
                                </div>
                                <button
                                  onClick={() => handlePlanEditClick(plan)}
                                  className="flex items-center space-x-1 px-3 py-1.5 bg-zinc-900 hover:bg-white text-zinc-300 hover:text-black border border-zinc-800 rounded text-[10px] font-bold tracking-wider uppercase transition-all"
                                >
                                  <Edit2 className="w-3 h-3" />
                                  <span>Editar Tarifa</span>
                                </button>
                              </div>

                              <div className="flex justify-between border-t border-zinc-900/60 pt-4 mt-4 text-xs font-mono text-zinc-300">
                                <span>Inversión básica:</span>
                                <span className="font-bold text-white">₡{new Intl.NumberFormat('es-CR').format(plan.price)} CRC / {plan.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      // EDITING SINGLE PLAN VIEW
                      <form onSubmit={handleSavePlanSubmit} className="space-y-6">
                        <h3 className="text-lg font-sans font-black tracking-tight uppercase text-white border-b border-zinc-900 pb-3">
                          Editar Plan: {planName}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Nombre de Paquete</label>
                            <input
                              type="text"
                              value={planName}
                              onChange={(e) => setPlanName(e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans"
                              required
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Precios en Colones (₡)</label>
                            <input
                              type="number"
                              value={planPrice}
                              onChange={(e) => setPlanPrice(parseInt(e.target.value) || 0)}
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-mono"
                              required
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Duración / Unidad temporal</label>
                            <input
                              type="text"
                              value={planDuration}
                              onChange={(e) => setPlanDuration(e.target.value)}
                              placeholder="Ej: por mes"
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Descripción del Plan</label>
                          <textarea
                            rows={3}
                            value={planDesc}
                            onChange={(e) => setPlanDesc(e.target.value)}
                            className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans resize-none"
                            required
                          />
                        </div>

                        {/* List entries for plan features bullets */}
                        <div className="space-y-3 pt-4 border-t border-zinc-900">
                          <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Inclusiones de Servicio (Viñetas)</label>
                          
                          <div className="space-y-2">
                            {planFeatures.map((feat, idx) => (
                              <div key={idx} className="flex justify-between items-center bg-zinc-950 border border-zinc-900 p-2.5 rounded text-xs">
                                <span className="text-zinc-300 font-sans">{feat}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFeature(idx)}
                                  className="text-red-500 hover:text-white uppercase font-mono text-[9px] font-bold"
                                >
                                  Remover
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* Add new feature inline */}
                          <div className="flex gap-2.5 pt-2">
                            <input
                              type="text"
                              value={newFeatureText}
                              onChange={(e) => setNewFeatureText(e.target.value)}
                              placeholder="Añadir beneficio Ej: 15 fotografías editadas..."
                              className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans"
                            />
                            <button
                              type="button"
                              onClick={handleAddFeature}
                              className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm"
                            >
                              Añadir
                            </button>
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <button
                            type="submit"
                            className="px-6 py-3 bg-white text-black font-sans font-bold text-xs tracking-widest uppercase hover:bg-zinc-200 transition rounded-sm"
                          >
                            Guardar Cambios
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingPlanId(null)}
                            className="px-6 py-3 bg-zinc-900 text-zinc-400 font-sans font-medium text-xs tracking-widest uppercase hover:text-white transition rounded-sm"
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}


                {/* 4. PORTFOLIO MULTIMEDIA GRID TAB */}
                {activeTab === 'portfolio' && (
                  <div className="space-y-6">
                    {editingPortId === null ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-sans font-black tracking-tight uppercase text-white">Galería Multimedia</h3>
                          <button
                            onClick={handleAddPortfolioInput}
                            className="flex items-center space-x-1.5 px-4 py-2 bg-white text-black text-xs font-bold tracking-wider rounded-sm uppercase hover:bg-zinc-200 transition-colors cursor-pointer"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Añadir Galería</span>
                          </button>
                        </div>

                        <div className="space-y-3.5">
                          {portfolioItems.map(item => (
                            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-zinc-950 border border-zinc-900 rounded-sm hover:border-zinc-850 gap-4">
                              <div className="flex items-center space-x-3.5">
                                <img
                                  src={item.mediaUrl}
                                  alt={item.title}
                                  referrerPolicy="no-referrer"
                                  className="w-12 h-12 object-cover rounded grayscale border border-zinc-800"
                                />
                                <div>
                                  <h4 className="font-extrabold text-sm tracking-wide text-white uppercase">{item.title}</h4>
                                  <span className="text-[10px] font-mono uppercase bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800 block w-fit mt-1">
                                    {item.type === 'video' ? 'VIDEO CINEMÀTICO' : 'FOTOGRAFÍA'} • {item.category}
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-2 self-end sm:self-center">
                                <button
                                  onClick={() => handleEditPortClick(item)}
                                  className="p-2 bg-zinc-900 hover:bg-white hover:text-black border border-zinc-800 text-zinc-300 rounded transition cursor-pointer"
                                  title="Editar"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeletePortItem(item.id)}
                                  className="p-2 bg-zinc-950 border border-red-900 hover:bg-red-500 hover:text-white text-red-500 rounded transition cursor-pointer"
                                  title="Eliminar"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      // EDITING PORTFOLIO ITEM SPACE
                      <form onSubmit={handleSavePortfolioSubmit} className="space-y-6">
                        <h3 className="text-lg font-sans font-black tracking-tight uppercase text-white border-b border-zinc-900 pb-3">
                          {editingPortId === 'new' ? 'Nueva Entrada del Portafolio' : 'Editar Entrada Portafolio'}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Título de la Obra</label>
                            <input
                              type="text"
                              value={portTitle}
                              onChange={(e) => setPortTitle(e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans"
                              required
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Tipo de Medio</label>
                            <select
                              value={portType}
                              onChange={(e) => setPortType(e.target.value as any)}
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans cursor-pointer"
                            >
                              <option value="photo">Fotografía Estática</option>
                              <option value="video">Vídeo Cinematográfico</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Categoría Específica</label>
                            <input
                              type="text"
                              value={portCategory}
                              onChange={(e) => setPortCategory(e.target.value)}
                              placeholder="Ej: Retrato, Paisaje, Cine"
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans"
                              required
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Enlace Portada Imagen (URL)</label>
                            <input
                              type="text"
                              value={portMediaUrl}
                              onChange={(e) => setPortMediaUrl(e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans"
                              required
                            />
                          </div>
                        </div>

                        {/* Video embeds settings */}
                        {portType === 'video' && (
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Enlace MP4 directo o Embed Video (URL)</label>
                            <input
                              type="text"
                              value={portEmbed}
                              onChange={(e) => setPortEmbed(e.target.value)}
                              placeholder="Ej: https://player.vimeo.com/external/..."
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans"
                            />
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Proporción de cuadrícula (Layout Aspect)</label>
                            <select
                              value={portAspect}
                              onChange={(e) => setPortAspect(e.target.value as any)}
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans cursor-pointer"
                            >
                              <option value="square">Cuadrado estándar (1 col)</option>
                              <option value="portrait">Vertical extendido (portrait • 1 col x 2 rows)</option>
                              <option value="landscape">Horizontal ancho (landscape • 2 cols)</option>
                            </select>
                          </div>
                          
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Descripción Breve</label>
                            <input
                              type="text"
                              value={portDesc}
                              onChange={(e) => setPortDesc(e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="submit"
                            className="px-6 py-3 bg-white text-black font-sans font-bold text-xs tracking-widest uppercase hover:bg-zinc-200 transition rounded-sm cursor-pointer"
                          >
                            Guardar Cambios
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingPortId(null)}
                            className="px-6 py-3 bg-zinc-900 text-zinc-400 font-sans font-medium text-xs tracking-widest uppercase hover:text-white transition rounded-sm cursor-pointer"
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}


                {/* 5. CONFIGURACIÓN BIOGRAFÍA GENERAL TAB */}
                {activeTab === 'biography' && (
                  <form onSubmit={handleSaveBiographySubmit} className="space-y-6">
                    <h3 className="text-xl font-sans font-black tracking-tight uppercase text-white pb-3 border-b border-zinc-900">
                      Configuración del Emprendimiento (Biografía & Contacto)
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Su Nombre público</label>
                        <input
                          type="text"
                          value={bioName}
                          onChange={(e) => setBioName(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Eslogan / Tagline Creativo</label>
                        <input
                          type="text"
                          value={bioTagline}
                          onChange={(e) => setBioTagline(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Ubicación principal en CR</label>
                        <input
                          type="text"
                          value={bioLocation}
                          onChange={(e) => setBioLocation(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Número de WhatsApp</label>
                        <input
                          type="text"
                          value={bioWhatsapp}
                          onChange={(e) => setBioWhatsapp(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-mono"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Correo Electrónico</label>
                        <input
                          type="email"
                          value={bioEmail}
                          onChange={(e) => setBioEmail(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-mono"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Usuario Instagram (sin @)</label>
                        <input
                          type="text"
                          value={bioInstagram}
                          onChange={(e) => setBioInstagram(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Nombre de Página Facebook</label>
                        <input
                          type="text"
                          value={bioFacebook}
                          onChange={(e) => setBioFacebook(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">Nuestra Historia / Biografía Oficial</label>
                      <textarea
                        rows={8}
                        value={bioStory}
                        onChange={(e) => setBioStory(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-white focus:outline-none p-3 text-sm text-white rounded-sm font-sans resize-none leading-relaxed"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-white text-black font-sans font-bold text-xs tracking-widest uppercase hover:bg-zinc-200 transition rounded-sm cursor-pointer"
                    >
                      Guardar Biografía y Enlaces
                    </button>
                  </form>
                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
