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
  // Sanitize path to redact document IDs (odd-indexed segments: /coll/[ID]/subcoll/[ID])
  const sanitizePath = (p: string | null) => {
    if (!p) return null;
    return p.split('/').map((segment, index) => (index % 2 === 1 ? '[REDACTED_ID]' : segment)).join('/');
  };

  const sanitizedPath = sanitizePath(path);
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path: sanitizedPath
  };

  // Log detailed info to console for developers, but exclude PII
  console.error('NEXUS Database Error:', errInfo);

  // Throw a generic, safe error message to avoid leaking technical details or PII to the UI
  throw new Error(`NEXUS encountered a database error (${operationType}). Stability protocols initiated.`);
}
