import { orderBy, limit, where } from 'firebase/firestore';
import { createDocument, updateDocument, deleteDocument, useDocumentData, useCollectionData } from './base';
import type { User } from '@/types';
import type { PaginationParams } from '@/types';

const COLLECTION_NAME = 'users';

export const userApi = {
  create: (data: Omit<User, 'id'>) => createDocument<User>(COLLECTION_NAME, data),
  
  update: (id: string, data: Partial<User>) => 
    updateDocument<User>(COLLECTION_NAME, id, data),
  
  delete: (id: string) => deleteDocument(COLLECTION_NAME, id),
  
  get: (id: string) => useDocumentData<User>(COLLECTION_NAME, id),
  
  list: (params: PaginationParams = {}) => {
    const constraints = [];
    if (params.sortBy) {
      constraints.push(orderBy(params.sortBy, params.sortOrder || 'desc'));
    }
    if (params.pageSize) {
      constraints.push(limit(params.pageSize));
    }
    return useCollectionData<User>(COLLECTION_NAME, constraints);
  },
  
  getByEmail: (email: string) => {
    const constraints = [where('email', '==', email)];
    return useCollectionData<User>(COLLECTION_NAME, constraints);
  },
  
  getByRole: (role: User['role']) => {
    const constraints = [where('role', '==', role)];
    return useCollectionData<User>(COLLECTION_NAME, constraints);
  },
}; 