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

/**
 * Redacts PII (Emails, IDs) from strings for secure logging
 * NEXUS Sentinel Security Protocol
 */
export function redactPII(text: string): string {
  if (!text) return text;
  // Redact emails
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  // Redact potential Firebase UIDs/DocIDs (20+ chars)
  const idRegex = /\b[A-Za-z0-9]{20,}\b/g;

  return text
    .replace(emailRegex, '[REDACTED_EMAIL]')
    .replace(idRegex, '[REDACTED_ID]');
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const originalMessage = error instanceof Error ? error.message : String(error);

  const errInfo = {
    error: redactPII(originalMessage),
    authInfo: {
      userId: auth.currentUser ? '[REDACTED_UID]' : null,
      email: auth.currentUser ? '[REDACTED_EMAIL]' : null,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path: path ? redactPII(path) : null
  };

  // NEXUS Sentinel: Sanitized logging to prevent PII exposure in browser logs
  console.error('[NEXUS Sentinel] Firestore Error: ', JSON.stringify(errInfo));

  // Throw generic message to prevent leaking internal metadata or PII to the UI
  throw new Error(`NEXUS encountered a database error (${operationType}). Stability protocols initiated.`);
}
