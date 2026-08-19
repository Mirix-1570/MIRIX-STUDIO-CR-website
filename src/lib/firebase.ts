/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type Auth,
  type User,
} from 'firebase/auth';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY as string | undefined;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined;
const appId = import.meta.env.VITE_FIREBASE_APP_ID as string | undefined;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined;

/** Authorized admin email (compared case-insensitively against the signed-in user). */
export const ADMIN_EMAIL = ((import.meta.env.VITE_FIREBASE_ADMIN_EMAIL as string | undefined) ?? '').trim().toLowerCase();

/** True when the required Firebase Web App config values are present. */
export const FIREBASE_CONFIGURED = Boolean(apiKey && authDomain && projectId && appId);

let auth: Auth | null = null;

if (FIREBASE_CONFIGURED) {
  const app = initializeApp({
    apiKey,
    authDomain,
    projectId,
    appId,
    ...(storageBucket ? { storageBucket } : {}),
    ...(messagingSenderId ? { messagingSenderId } : {}),
  });
  auth = getAuth(app);
}

/** Returns the Firebase Auth instance, or null when Firebase is not configured. */
export function getAdminAuth(): Auth | null {
  return auth;
}

/** Signs in with the Firebase Email/Password provider. Throws on failure. */
export async function adminLogin(email: string, password: string): Promise<User> {
  if (!auth) {
    throw new Error('Firebase no está configurado.');
  }
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

/** Signs out the current Firebase session (safe no-op when unconfigured). */
export async function adminLogout(): Promise<void> {
  if (auth) {
    await signOut(auth);
  }
}

/** Subscribes to Firebase auth state changes (safe no-op when unconfigured). */
export function onAdminAuthChange(callback: (user: User | null) => void): () => void {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/** Maps Firebase Auth error codes to friendly Spanish messages. */
export function mapAuthError(error: unknown): string {
  const code = (error as { code?: string })?.code ?? '';
  switch (code) {
    case 'auth/invalid-email':
      return 'Ingrese un correo electrónico válido.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Credenciales incorrectas. Verifique e intente nuevamente.';
    case 'auth/user-disabled':
      return 'Esta cuenta fue deshabilitada. Contacte al administrador.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos fallidos. Espere unos minutos e intente nuevamente.';
    case 'auth/network-request-failed':
      return 'Error de red. Verifique su conexión e intente nuevamente.';
    default:
      return 'Fallo en el sistema de autenticación.';
  }
}