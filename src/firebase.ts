import { initializeApp } from 'firebase/app';
import { sanitize } from './lib/utils';
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
  const errInfo = {
    error: error instanceof Error ? sanitize(error.message) : sanitize(String(error)),
    authInfo: {
      userId: auth.currentUser?.uid ? '[UID_REDACTED]' : null,
      email: auth.currentUser?.email ? '[EMAIL_REDACTED]' : null,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path: path ? sanitize(path) : null
  };

  // Internal logging (still sanitized for safety)
  console.error('Firestore Error: ', JSON.stringify(errInfo));

  // Throw a generic error to the UI to prevent information disclosure
  throw new Error(`Database operation failed (${operationType}). Please try again later.`);
}
