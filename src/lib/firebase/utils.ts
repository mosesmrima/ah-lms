import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryConstraint,
  addDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword as firebaseCreateUser,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { db, auth } from './config';
import type { Course, Enrollment, User, Event } from '@/types';
import type { PaginationParams } from '@/types';

// Auth functions
export const signInWithEmailAndPassword = async (email: string, password: string) => {
  return firebaseSignIn(auth, email, password);
};

export const createUserWithEmailAndPassword = async (email: string, password: string, fullName: string) => {
  const result = await firebaseCreateUser(auth, email, password);
  await updateProfile(result.user, { displayName: fullName });
  return result;
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Generic function to get a document by ID
export const getDocument = async <T extends DocumentData>(
  collectionName: string,
  id: string
): Promise<(T & { id: string }) | null> => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as T & { id: string } : null;
};

// Generic function to get documents with pagination
export const getDocuments = async <T extends DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<(T & { id: string })[]> => {
  const q = query(collection(db, collectionName), ...constraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T & { id: string });
};

// Course-specific functions
export const getCourse = async (id: string): Promise<Course | null> => {
  return getDocument<Course>('courses', id);
};

export const getCourses = async (
  params: PaginationParams = {}
): Promise<Course[]> => {
  const constraints: QueryConstraint[] = [];
  
  if (params.sortBy) {
    constraints.push(orderBy(params.sortBy, params.sortOrder || 'desc'));
  }
  
  if (params.pageSize) {
    constraints.push(limit(params.pageSize));
  }
  
  return getDocuments<Course>('courses', constraints);
};

// Enrollment-specific functions
export const getUserEnrollments = async (
  userId: string,
  status?: string
): Promise<Enrollment[]> => {
  const constraints: QueryConstraint[] = [
    where('userId', '==', userId)
  ];
  
  if (status) {
    constraints.push(where('status', '==', status));
  }
  
  return getDocuments<Enrollment>('enrollments', constraints);
};

// User-specific functions
export const getUser = async (id: string): Promise<User | null> => {
  return getDocument<User>('users', id);
};

// Event-specific functions
export const getEvent = async (id: string): Promise<Event | null> => {
  return getDocument<Event>('events', id);
};

export const getEvents = async (
  params: PaginationParams = {}
): Promise<Event[]> => {
  const constraints: QueryConstraint[] = [];
  
  if (params.sortBy) {
    constraints.push(orderBy(params.sortBy, params.sortOrder || 'desc'));
  }
  
  if (params.pageSize) {
    constraints.push(limit(params.pageSize));
  }
  
  return getDocuments<Event>('events', constraints);
};

export const createDocument = async <T extends DocumentData>(
  collectionName: string,
  data: T
): Promise<T & { id: string }> => {
  const docRef = await addDoc(collection(db, collectionName), data);
  return { id: docRef.id, ...data };
};

export const updateDocument = async <T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data as DocumentData);
};

export const deleteDocument = async (
  collectionName: string,
  id: string
): Promise<void> => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}; 