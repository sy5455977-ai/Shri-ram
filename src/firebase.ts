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
 * NEXUS Sentinel: Sanitizes strings by redacting PII like emails and Firebase IDs.
 */
export function redactPII(text: string): string {
  if (!text) return text;
  // Redact emails
  let redacted = text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL_REDACTED]');
  // Redact potential UIDs or Document IDs (alphanumeric, typically 20+ chars)
  redacted = redacted.replace(/\b[A-Za-z0-9]{20,}\b/g, '[ID_REDACTED]');
  return redacted;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const originalError = error instanceof Error ? error.message : String(error);

  // NEXUS Sentinel: Redact PII from logs and internal context
  const sanitizedError = redactPII(originalError);
  const sanitizedPath = path ? redactPII(path) : null;

  const errLog = {
    error: sanitizedError,
    operationType,
    path: sanitizedPath,
    timestamp: new Date().toISOString()
  };

  // Log sanitized version to console for debugging without leaking PII
  console.error('[NEXUS Sentinel] Firestore Error:', JSON.stringify(errLog));

  // Throw a generic message to the UI to prevent leaking internal metadata or PII
  throw new Error(`NEXUS encountered a database error (${operationType}). Stability protocols initiated.`);
}
