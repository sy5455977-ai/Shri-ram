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
  // Mask document identifiers in paths to avoid exposing specific record IDs
  const sanitizedPath = path ? path.replace(/[a-zA-Z0-9-_]{20,}/g, '[ID]') : null;

  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      // Scrub PII (emails, UIDs) from logs
      isAuthenticated: !!auth.currentUser,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path: sanitizedPath
  };

  // Log sanitized info for debugging
  console.error('Firestore Error: ', JSON.stringify(errInfo));

  // Throw a generic error to the UI to prevent information disclosure through Error Boundaries
  throw new Error('Database operation failed');
}
