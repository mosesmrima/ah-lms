import { orderBy, limit, where } from 'firebase/firestore';
import { createDocument, updateDocument, deleteDocument, useDocumentData, useCollectionData } from './base';
import type { Enrollment } from '@/types';
import type { PaginationParams } from '@/types';

const COLLECTION_NAME = 'enrollments';

export const enrollmentApi = {
  create: (data: Omit<Enrollment, 'id'>) => createDocument<Enrollment>(COLLECTION_NAME, data),
  
  update: (id: string, data: Partial<Enrollment>) => 
    updateDocument<Enrollment>(COLLECTION_NAME, id, data),
  
  delete: (id: string) => deleteDocument(COLLECTION_NAME, id),
  
  get: (id: string) => useDocumentData<Enrollment>(COLLECTION_NAME, id),
  
  list: (params: PaginationParams = {}) => {
    const constraints = [];
    if (params.sortBy) {
      constraints.push(orderBy(params.sortBy, params.sortOrder || 'desc'));
    }
    if (params.pageSize) {
      constraints.push(limit(params.pageSize));
    }
    return useCollectionData<Enrollment>(COLLECTION_NAME, constraints);
  },
  
  getUserEnrollments: (userId: string) => {
    const constraints = [where('userId', '==', userId)];
    return useCollectionData<Enrollment>(COLLECTION_NAME, constraints);
  },
  
  getCourseEnrollments: (courseId: string) => {
    const constraints = [where('courseId', '==', courseId)];
    return useCollectionData<Enrollment>(COLLECTION_NAME, constraints);
  },
  
  getByStatus: (status: Enrollment['status']) => {
    const constraints = [where('status', '==', status)];
    return useCollectionData<Enrollment>(COLLECTION_NAME, constraints);
  },
}; 