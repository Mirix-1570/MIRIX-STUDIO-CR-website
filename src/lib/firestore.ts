/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  writeBatch,
  type Firestore,
} from 'firebase/firestore';
import { app } from './firebase';
import type { ContactMessage } from '../types';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY as string | undefined;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined;
const appId = import.meta.env.VITE_FIREBASE_APP_ID as string | undefined;

/** True when the required Firebase Web App config values are present. */
export const FIRESTORE_CONFIGURED = Boolean(apiKey && authDomain && projectId && appId);

let db: Firestore | null = null;

if (FIRESTORE_CONFIGURED && app) {
  db = getFirestore(app);
}

/** Returns the Firestore instance, or null when Firebase is not configured. */
function getDb(): Firestore | null {
  return db;
}

export type ContentDomain = 'bio' | 'plans' | 'portfolio' | 'products';

/** Subscribes to a content document under `content/{domain}` (public read). */
export function subscribeContent<T>(
  domain: ContentDomain,
  onData: (snapshot: { exists: boolean; items: T[] }) => void
): () => void {
  const firestore = getDb();
  if (!firestore) return () => {};
  return onSnapshot(doc(firestore, 'content', domain), (snapshot) => {
    onData({ exists: snapshot.exists(), items: (snapshot.data()?.items ?? []) as T[] });
  });
}

/** Writes the whole content document (admin only per Firestore rules). */
export async function saveContent<T>(domain: ContentDomain, items: T[]): Promise<void> {
  const firestore = getDb();
  if (!firestore) return;
  await setDoc(doc(firestore, 'content', domain), { items });
}

/** Subscribes to all messages, newest first (admin only per Firestore rules). */
export function subscribeMessages(onData: (messages: ContactMessage[]) => void): () => void {
  const firestore = getDb();
  if (!firestore) return () => {};
  return onSnapshot(
    query(collection(firestore, 'messages'), orderBy('createdAt', 'desc')),
    (snapshot) => {
      onData(
        snapshot.docs.map((messageDoc) => ({ ...messageDoc.data(), id: messageDoc.id }) as ContactMessage)
      );
    }
  );
}

/** Creates a new message document with a Firestore auto-ID (public create). */
export async function addMessage(
  data: Omit<ContactMessage, 'id' | 'read'> & { read: boolean }
): Promise<void> {
  const firestore = getDb();
  if (!firestore) return;
  await addDoc(collection(firestore, 'messages'), data);
}

/** Marks a message as read/unread (admin only). */
export async function setMessageRead(id: string, read: boolean): Promise<void> {
  const firestore = getDb();
  if (!firestore) return;
  await updateDoc(doc(firestore, 'messages', id), { read });
}

/** Deletes a single message document (admin only). */
export async function deleteMessage(id: string): Promise<void> {
  const firestore = getDb();
  if (!firestore) return;
  await deleteDoc(doc(firestore, 'messages', id));
}

/** Deletes every message document in a single batched write (admin only). */
export async function deleteAllMessages(): Promise<void> {
  const firestore = getDb();
  if (!firestore) return;
  const snapshot = await getDocs(collection(firestore, 'messages'));
  const batch = writeBatch(firestore);
  snapshot.docs.forEach((messageDoc) => batch.delete(messageDoc.ref));
  await batch.commit();
}