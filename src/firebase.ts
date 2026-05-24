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
  // Sanitize path to redact IDs (e.g. coll/ID/subcoll/ID -> coll/[REDACTED_ID]/subcoll/[REDACTED_ID])
  const sanitizedPath = path
    ? path.split('/').map((seg, i) => (i % 2 !== 0 ? '[REDACTED_ID]' : seg)).join('/')
    : null;

  const technicalError = error instanceof Error ? error.message : String(error);

  // Log sanitized technical details for developers - PII and Document IDs are redacted
  console.error(`[SENTINEL] Firestore Error (${operationType}):`, {
    error: technicalError,
    path: sanitizedPath
  });

  // Throw a generic error to the user to prevent information disclosure or PII leak
  throw new Error(`NEXUS encountered a database error (${operationType}). Stability protocols initiated.`);
}
