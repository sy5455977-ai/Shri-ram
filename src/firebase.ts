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

const redactPII = (text: string) => {
  return text
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]')
    .replace(/\b[A-Za-z0-9]{20,}\b/g, '[REDACTED_ID]');
};

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const rawError = error instanceof Error ? error.message : String(error);
  const sanitizedPath = path ? redactPII(path) : null;
  const sanitizedError = redactPII(rawError);

  const authInfo = auth.currentUser ? {
    userId: '[REDACTED_UID]',
    email: '[REDACTED_EMAIL]',
    emailVerified: auth.currentUser.emailVerified,
  } : null;

  const errLog = {
    error: sanitizedError,
    authInfo,
    operationType,
    path: sanitizedPath
  };

  // NEXUS Sentinel: Log sanitized error to console, keep generic for UI
  console.error('[NEXUS Sentinel] Firestore Error:', JSON.stringify(errLog));
  throw new Error(`NEXUS encountered a database error (${operationType}). Stability protocols initiated.`);
}
