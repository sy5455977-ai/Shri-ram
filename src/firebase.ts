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

export function redactPII(text: string): string {
  if (!text) return text;
  // Redact emails
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  // Redact potential UIDs or Document IDs (alphanumeric, usually 20+ chars)
  const idRegex = /\b[A-Za-z0-9]{20,}\b/g;

  return text
    .replace(emailRegex, '[EMAIL_REDACTED]')
    .replace(idRegex, '[ID_REDACTED]');
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path: path ? redactPII(path) : null
  };

  const sanitizedOutput = redactPII(JSON.stringify(errInfo));
  console.error('[NEXUS Sentinel] Firestore Error: ', sanitizedOutput);
  throw new Error(sanitizedOutput);
}
