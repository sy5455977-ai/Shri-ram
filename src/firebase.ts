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
  // Security: Mask sensitive document identifiers (20+ chars) and PII
  const sanitize = (str: string) => str.replace(/[a-zA-Z0-9-_]{20,}/g, '[ID]').replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]');

  const errorMessage = error instanceof Error ? error.message : String(error);
  const sanitizedPath = path ? sanitize(path) : null;
  const sanitizedError = sanitize(errorMessage);

  const logInfo = {
    error: sanitizedError,
    operationType,
    path: sanitizedPath,
    // We log UID for internal debugging but never expose it to the UI
    uid: auth.currentUser?.uid ? '[MASKED_UID]' : null
  };

  console.error('Firestore Error:', JSON.stringify(logInfo));

  // Security: Throw a generic error to prevent leaking internal state or PII to the UI Error Boundary
  throw new Error(`Database operation failed (${operationType}). Please check your connection and try again.`);
}
