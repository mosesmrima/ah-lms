import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from './config';
import type { Course, Enrollment, User, Event } from '@/types';
import type { PaginationParams } from '@/types';

// Generic function to get a document by ID
export const getDocument = async <T>(
  collectionName: string,
  id: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${collectionName} document:`, error);
    throw error;
  }
};

// Generic function to get documents with pagination
export const getDocuments = async <T>(
  collectionName: string,
  constraints: QueryConstraint[] = [],
  lastDoc?: DocumentSnapshot
): Promise<{ items: T[]; lastDoc: DocumentSnapshot | null }> => {
  try {
    let q = collection(db, collectionName);
    
    if (constraints.length > 0) {
      q = query(q, ...constraints);
    }
    
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
    
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
    
    return {
      items,
      lastDoc: snapshot.docs[snapshot.docs.length - 1] || null
    };
  } catch (error) {
    console.error(`Error fetching ${collectionName} documents:`, error);
    throw error;
  }
};

// Course-specific functions
export const getCourse = async (id: string): Promise<Course | null> => {
  return getDocument<Course>('courses', id);
};

export const getCourses = async (
  params: PaginationParams = {}
): Promise<{ items: Course[]; lastDoc: DocumentSnapshot | null }> => {
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
  
  const { items } = await getDocuments<Enrollment>('enrollments', constraints);
  return items;
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
): Promise<{ items: Event[]; lastDoc: DocumentSnapshot | null }> => {
  const constraints: QueryConstraint[] = [];
  
  if (params.sortBy) {
    constraints.push(orderBy(params.sortBy, params.sortOrder || 'desc'));
  }
  
  if (params.pageSize) {
    constraints.push(limit(params.pageSize));
  }
  
  return getDocuments<Event>('events', constraints);
}; 