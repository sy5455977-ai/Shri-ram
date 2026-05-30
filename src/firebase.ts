import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  Timestamp,
  getDocs,
  getDoc,
  limit
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

export const signIn = () => signInWithPopup(auth, googleProvider);
export const logOut = () => signOut(auth);

// Types
export interface Conversation {
  id: string;
  title: string;
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  generatedImage?: string;
  generatedVideo?: string;
  createdAt: Timestamp;
}

// Error Handler
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const originalMessage = error instanceof Error ? error.message : String(error);

  // NEXUS Security: Redact PII (emails) and normalize path to redact document IDs
  const redactPII = (text: string) => text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]');

  const sanitizePath = (p: string | null) => {
    if (!p) return 'unknown';
    const segments = p.split('/').filter(Boolean);
    // Redact odd-indexed segments (document IDs) in collection/doc/collection/doc pattern
    return segments.map((s, i) => (i % 2 === 1 ? '[ID]' : s)).join('/');
  };

  const errInfo = {
    error: redactPII(originalMessage),
    operationType,
    path: sanitizePath(path),
    authStatus: auth.currentUser ? 'authenticated' : 'unauthenticated'
  };

  // Log detailed (but sanitized) info for developers to console
  console.error('NEXUS Security Protocol [Firestore Error]:', {
    ...errInfo,
    timestamp: new Date().toISOString(),
    // Redact UID even in console logs to minimize PII exposure in browser logs
    sanitizedUid: auth.currentUser?.uid ? `${auth.currentUser.uid.substring(0, 4)}...` : null
  });

  // Throw a generic message to the UI to prevent leaking internal error details or stack traces
  throw new Error(`NEXUS encountered a database error (${operationType}). Stability protocols initiated.`);
}
