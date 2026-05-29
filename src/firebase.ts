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
  // NEXUS Security Optimization: PII Sanitization

  // Redact document IDs from path (e.g., /coll/[ID]/subcoll/[ID])
  // Handles leading slashes correctly by filtering empty segments
  const sanitizePath = (p: string | null) => {
    if (!p) return null;
    const segments = p.split('/').filter(Boolean);
    const sanitized = segments.map((s, i) => i % 2 === 1 ? '[REDACTED_ID]' : s);
    const joined = sanitized.join('/');
    return p.startsWith('/') ? `/${joined}` : joined;
  };

  const sanitizedPath = sanitizePath(path);

  // Log sanitized info for developers without leaking PII in browser logs or screenshots
  console.error('NEXUS Firestore Error:', {
    operationType,
    path: sanitizedPath,
    auth: {
      hasUser: !!auth.currentUser,
      userId: auth.currentUser ? '[REDACTED_UID]' : null,
      emailVerified: auth.currentUser?.emailVerified,
    },
    originalError: error instanceof Error ? error.message : String(error)
  });

  // Throw a clean, human-readable error message to the UI.
  // This avoids the JSON-stringified anti-pattern and prevents PII leakage to the user.
  throw new Error(`Database error during ${operationType}. Operation could not be completed at this time.`);
}
