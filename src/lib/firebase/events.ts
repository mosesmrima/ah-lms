import { orderBy, limit, where } from 'firebase/firestore';
import { createDocument, updateDocument, deleteDocument, useDocumentData, useCollectionData } from './base';
import type { Event } from '@/types';
import type { PaginationParams } from '@/types';

const COLLECTION_NAME = 'events';

export const eventApi = {
  create: (data: Omit<Event, 'id'>) => createDocument<Event>(COLLECTION_NAME, data),
  
  update: (id: string, data: Partial<Event>) => 
    updateDocument<Event>(COLLECTION_NAME, id, data),
  
  delete: (id: string) => deleteDocument(COLLECTION_NAME, id),
  
  get: (id: string) => useDocumentData<Event>(COLLECTION_NAME, id),
  
  list: (params: PaginationParams = {}) => {
    const constraints = [];
    if (params.sortBy) {
      constraints.push(orderBy(params.sortBy, params.sortOrder || 'desc'));
    }
    if (params.pageSize) {
      constraints.push(limit(params.pageSize));
    }
    return useCollectionData<Event>(COLLECTION_NAME, constraints);
  },
  
  getUpcoming: () => {
    const now = new Date();
    const constraints = [where('startDate', '>', now)];
    return useCollectionData<Event>(COLLECTION_NAME, constraints);
  },
  
  getPast: () => {
    const now = new Date();
    const constraints = [where('endDate', '<', now)];
    return useCollectionData<Event>(COLLECTION_NAME, constraints);
  },
  
  getByType: (type: Event['type']) => {
    const constraints = [where('type', '==', type)];
    return useCollectionData<Event>(COLLECTION_NAME, constraints);
  },
}; 