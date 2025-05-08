import { collection, doc, addDoc, updateDoc, deleteDoc, where, orderBy, limit } from 'firebase/firestore';
import { db } from './config';
import { Course } from '@/types';
import { getDocument, getDocuments } from './utils';

export const courseApi = {
  async get(id: string): Promise<Course | null> {
    return getDocument<Course>('courses', id);
  },

  async list(params: { sortBy?: string; sortOrder?: 'asc' | 'desc'; pageSize?: number } = {}): Promise<Course[]> {
    const constraints = [];
    
    if (params.sortBy) {
      constraints.push(orderBy(params.sortBy, params.sortOrder || 'desc'));
    }
    
    if (params.pageSize) {
      constraints.push(limit(params.pageSize));
    }
    
    return getDocuments<Course>('courses', constraints);
  },

  async getByInstructor(instructorId: string): Promise<Course[]> {
    const constraints = [where('instructorId', '==', instructorId)];
    return getDocuments<Course>('courses', constraints);
  },

  async getByCategory(category: string): Promise<Course[]> {
    const constraints = [where('category', '==', category)];
    return getDocuments<Course>('courses', constraints);
  },

  async getPublished(): Promise<Course[]> {
    const constraints = [where('status', '==', 'published')];
    return getDocuments<Course>('courses', constraints);
  },

  async create(data: Omit<Course, 'id'>): Promise<Course> {
    const docRef = await addDoc(collection(db, 'courses'), data);
    return { id: docRef.id, ...data };
  },

  async update(id: string, data: Partial<Course>): Promise<void> {
    const docRef = doc(db, 'courses', id);
    await updateDoc(docRef, data);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'courses', id);
    await deleteDoc(docRef);
  }
}; 