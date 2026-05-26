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
 * Sanitize Firestore paths to prevent Information Disclosure by redacting document IDs.
 * Redacts odd-indexed segments (e.g., /conversations/[ID]/messages/[ID] -> /conversations/[REDACTED]/messages/[REDACTED])
 */
function sanitizePath(path: string | null): string | null {
  if (!path) return null;
  return path
    .split('/')
    .map((segment, index) => (index % 2 !== 0 ? '[REDACTED_ID]' : segment))
    .join('/');
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const sanitizedPath = sanitizePath(path);
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid ? '[REDACTED_UID]' : null,
      email: auth.currentUser?.email ? '[REDACTED_EMAIL]' : null,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path: sanitizedPath,
  };

  // Log technical details to console for developer debugging (still sanitized)
  console.error(`[Security] NEXUS Database Error (${operationType}):`, JSON.stringify(errInfo));

  // Throw a generic error to the UI to prevent Information Disclosure and PII leakage
  throw new Error(`NEXUS encountered a database error (${operationType}). Stability protocols initiated.`);
}
