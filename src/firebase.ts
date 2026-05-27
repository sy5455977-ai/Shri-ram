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
  // NEXUS Security Optimization: Sanitize path by redacting document IDs to prevent Information Disclosure
  const sanitizedPath = path
    ? path.split('/').map((seg, i) => (i % 2 === 1 ? '[REDACTED_ID]' : seg)).join('/')
    : null;

  const sanitizedErrInfo = {
    // Redact technical error details and PII from the user-facing message
    error: 'A database operation failed. Stability protocols initiated.',
    authInfo: {
      userId: auth.currentUser ? '[REDACTED_UID]' : null,
      email: auth.currentUser ? '[REDACTED_EMAIL]' : null,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path: sanitizedPath
  };

  const technicalContext = {
    operationType,
    path: sanitizedPath,
    message: error instanceof Error ? error.message : 'Unknown database error'
  };

  // Log sanitized context for debugging without exposing PII or internal IDs in DevTools
  console.error('NEXUS Database Error:', JSON.stringify(technicalContext));

  // Maintain original JSON structure but with sanitized values to avoid breaking UI consumers
  throw new Error(JSON.stringify(sanitizedErrInfo));
}
