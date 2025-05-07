import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  QueryConstraint,
  serverTimestamp,
} from 'firebase/firestore';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from './config';

// Generic CRUD operations
export const createDocument = async <T extends { id?: string }>(
  collectionName: string,
  data: Omit<T, 'id'>
): Promise<T> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return { id: docRef.id, ...data } as T;
  } catch (error) {
    console.error(`Error creating ${collectionName} document:`, error);
    throw error;
  }
};

export const updateDocument = async <T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Error updating ${collectionName} document:`, error);
    throw error;
  }
};

export const deleteDocument = async (
  collectionName: string,
  id: string
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting ${collectionName} document:`, error);
    throw error;
  }
};

// React hooks for real-time data
export const useDocumentData = <T>(
  collectionName: string,
  id: string | null
) => {
  const docRef = id ? doc(db, collectionName, id) : null;
  const [snapshot, loading, error] = useDocument(docRef);
  
  const data = snapshot?.exists() 
    ? { id: snapshot.id, ...snapshot.data() } as T 
    : null;
    
  return { data, loading, error };
};

export const useCollectionData = <T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
) => {
  const q = query(collection(db, collectionName), ...constraints);
  const [snapshot, loading, error] = useCollection(q);
  
  const data = snapshot?.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as T[] || [];
    
  return { data, loading, error };
}; 