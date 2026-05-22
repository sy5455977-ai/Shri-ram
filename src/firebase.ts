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
  // Sentinel: Log technical details to console but REMOVE PII (uid/email/IDs) from logs and UI-facing errors

  // Sanitize path to remove potential document IDs which could be UIDs or other sensitive data
  const sanitizedPath = path ? path.split('/').map((segment, index) => {
    // Basic heuristic: odd-indexed segments in Firestore paths are usually IDs
    // e.g. conversations/{id}, users/{id}, conversations/{id}/messages/{id}
    return index % 2 === 1 ? '[REDACTED_ID]' : segment;
  }).join('/') : null;

  const technicalErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path: sanitizedPath,
    timestamp: new Date().toISOString()
  };

  // Log sanitized error for developers
  console.error('NEXUS Database Error:', technicalErrorInfo);

  // Throw generic message to UI to prevent PII leakage and provide a better UX
  throw new Error(`NEXUS encountered a database error (${operationType}). Stability protocols initiated.`);
}
