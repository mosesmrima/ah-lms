import { collection, doc, addDoc, updateDoc, deleteDoc, where, orderBy, limit } from 'firebase/firestore';
import { db } from './config';
import { Event } from '@/types';
import { getDocument, getDocuments } from './utils';

export const eventApi = {
  async get(id: string): Promise<Event | null> {
    return getDocument<Event>('events', id);
  },

  async list(params: { sortBy?: string; sortOrder?: 'asc' | 'desc'; pageSize?: number } = {}): Promise<Event[]> {
    const constraints = [];
    
    if (params.sortBy) {
      constraints.push(orderBy(params.sortBy, params.sortOrder || 'desc'));
    }
    
    if (params.pageSize) {
      constraints.push(limit(params.pageSize));
    }
    
    return getDocuments<Event>('events', constraints);
  },

  async getUpcoming(): Promise<Event[]> {
    const now = new Date();
    const constraints = [
      where('startDate', '>=', now),
      orderBy('startDate', 'asc')
    ];
    return getDocuments<Event>('events', constraints);
  },

  async getPast(): Promise<Event[]> {
    const now = new Date();
    const constraints = [
      where('startDate', '<', now),
      orderBy('startDate', 'desc')
    ];
    return getDocuments<Event>('events', constraints);
  },

  async getByType(type: string): Promise<Event[]> {
    const constraints = [where('type', '==', type)];
    return getDocuments<Event>('events', constraints);
  },

  async create(data: Omit<Event, 'id'>): Promise<Event> {
    const docRef = await addDoc(collection(db, 'events'), data);
    return { id: docRef.id, ...data };
  },

  async update(id: string, data: Partial<Event>): Promise<void> {
    const docRef = doc(db, 'events', id);
    await updateDoc(docRef, data);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'events', id);
    await deleteDoc(docRef);
  }
}; 