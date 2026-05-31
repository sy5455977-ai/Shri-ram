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

function redactPII(text: string | null | undefined): string {
  if (!text) return '';
  // Redact emails and potential UIDs/DocumentIDs (alphanumeric strings >= 20 chars)
  return text
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL_REDACTED]')
    .replace(/\b[A-Za-z0-9]{20,}\b/g, '[ID_REDACTED]');
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const rawMessage = error instanceof Error ? error.message : String(error);

  const sanitizedInfo = {
    error: redactPII(rawMessage),
    authInfo: {
      userId: auth.currentUser ? '[UID_REDACTED]' : null,
      email: auth.currentUser?.email ? '[EMAIL_REDACTED]' : null,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path: redactPII(path)
  };

  // NEXUS Sentinel: Log sanitized info to prevent PII leakage in logs
  console.error('[NEXUS Sentinel] Firestore Error:', JSON.stringify(sanitizedInfo));

  // Throw generic message to UI to prevent internal metadata exposure
  throw new Error(`NEXUS encountered a database error (${operationType}). Stability protocols initiated.`);
}
