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
  // Log technical details for developers without manually bundling sensitive user PII.
  // The raw error object is logged to the console for debugging, but is not exposed to the user.
  console.error(`[Firestore Error] ${operationType} at ${path || 'unknown'}:`, error);

  // Throw a generic, safe error message to the UI to prevent internal detail leakage.
  throw new Error(`NEXUS encountered a system issue during ${operationType}. Please try again later.`);
}
