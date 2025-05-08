import { collection, doc, addDoc, updateDoc, deleteDoc, where, orderBy, limit } from 'firebase/firestore';
import { db } from './config';
import { Enrollment } from '@/types';
import { getDocument, getDocuments } from './utils';

export const enrollmentApi = {
  async get(id: string): Promise<Enrollment | null> {
    return getDocument<Enrollment>('enrollments', id);
  },

  async list(params: { sortBy?: string; sortOrder?: 'asc' | 'desc'; pageSize?: number } = {}): Promise<Enrollment[]> {
    const constraints = [];
    
    if (params.sortBy) {
      constraints.push(orderBy(params.sortBy, params.sortOrder || 'desc'));
    }
    
    if (params.pageSize) {
      constraints.push(limit(params.pageSize));
    }
    
    return getDocuments<Enrollment>('enrollments', constraints);
  },

  async getUserEnrollments(userId: string): Promise<Enrollment[]> {
    const constraints = [where('userId', '==', userId)];
    return getDocuments<Enrollment>('enrollments', constraints);
  },

  async getCourseEnrollments(courseId: string): Promise<Enrollment[]> {
    const constraints = [where('courseId', '==', courseId)];
    return getDocuments<Enrollment>('enrollments', constraints);
  },

  async getByStatus(status: string): Promise<Enrollment[]> {
    const constraints = [where('status', '==', status)];
    return getDocuments<Enrollment>('enrollments', constraints);
  },

  async create(data: Omit<Enrollment, 'id'>): Promise<Enrollment> {
    const docRef = await addDoc(collection(db, 'enrollments'), data);
    return { id: docRef.id, ...data };
  },

  async update(id: string, data: Partial<Enrollment>): Promise<void> {
    const docRef = doc(db, 'enrollments', id);
    await updateDoc(docRef, data);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'enrollments', id);
    await deleteDoc(docRef);
  }
}; 