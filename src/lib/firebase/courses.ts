import { orderBy, limit, where } from 'firebase/firestore';
import { createDocument, updateDocument, deleteDocument, useDocumentData, useCollectionData } from './base';
import type { Course } from '@/types';
import type { PaginationParams } from '@/types';

const COLLECTION_NAME = 'courses';

export const courseApi = {
  create: (data: Omit<Course, 'id'>) => createDocument<Course>(COLLECTION_NAME, data),
  
  update: (id: string, data: Partial<Course>) => 
    updateDocument<Course>(COLLECTION_NAME, id, data),
  
  delete: (id: string) => deleteDocument(COLLECTION_NAME, id),
  
  get: (id: string) => useDocumentData<Course>(COLLECTION_NAME, id),
  
  list: (params: PaginationParams = {}) => {
    const constraints = [];
    if (params.sortBy) {
      constraints.push(orderBy(params.sortBy, params.sortOrder || 'desc'));
    }
    if (params.pageSize) {
      constraints.push(limit(params.pageSize));
    }
    return useCollectionData<Course>(COLLECTION_NAME, constraints);
  },
  
  getByInstructor: (instructorId: string) => {
    const constraints = [where('instructorId', '==', instructorId)];
    return useCollectionData<Course>(COLLECTION_NAME, constraints);
  },
  
  getByCategory: (category: string) => {
    const constraints = [where('category', '==', category)];
    return useCollectionData<Course>(COLLECTION_NAME, constraints);
  },
  
  getPublished: () => {
    const constraints = [where('status', '==', 'published')];
    return useCollectionData<Course>(COLLECTION_NAME, constraints);
  },
}; 