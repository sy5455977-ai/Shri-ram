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
  // NEXUS Security Optimization: Redact PII and sanitize paths in client logs
  const sanitizedPath = path
    ? path.split('/')
        .map((segment, index) => (index % 2 === 1 ? '[REDACTED_ID]' : segment))
        .join('/')
    : null;

  const errInfo = {
    // Standard: Use generic error message to avoid leaking internals/stack traces
    error: `NEXUS encountered a database error (${operationType}). Stability protocols initiated.`,
    authInfo: {
      userId: auth.currentUser ? '[REDACTED_UID]' : null,
      email: auth.currentUser ? '[REDACTED_EMAIL]' : null,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path: sanitizedPath
  };

  // Log only sanitized data to developer console
  console.error('Firestore Error: ', JSON.stringify(errInfo));

  // Throw sanitized JSON for ErrorBoundary parsing while preventing sensitive leakage
  throw new Error(JSON.stringify(errInfo));
}
