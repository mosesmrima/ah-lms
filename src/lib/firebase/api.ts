import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';
import type { User, Course, Enrollment } from '@/types';

const COLLECTIONS = {
  users: 'users',
  courses: 'courses',
  enrollments: 'enrollments'
} as const;

// User API
export const userApi = {
  async get(id: string): Promise<User> {
    const docRef = doc(db, COLLECTIONS.users, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('User not found');
    return { id: docSnap.id, ...docSnap.data() } as User;
  },

  async getByEmail(email: string): Promise<User> {
    const q = query(
      collection(db, COLLECTIONS.users),
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) throw new Error('User not found');
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as User;
  },

  async create(data: Omit<User, 'id'>): Promise<User> {
    const docRef = await addDoc(collection(db, COLLECTIONS.users), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...data };
  },

  async update(id: string, data: Partial<User>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.users, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.users, id);
    await deleteDoc(docRef);
  }
};

// Course API
export const courseApi = {
  async get(id: string): Promise<Course> {
    const docRef = doc(db, COLLECTIONS.courses, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('Course not found');
    return { id: docSnap.id, ...docSnap.data() } as Course;
  },

  async list(): Promise<Course[]> {
    const q = query(collection(db, COLLECTIONS.courses));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Course[];
  },

  async getEnrolledCourses(userId: string): Promise<Course[]> {
    const enrollmentsQuery = query(
      collection(db, COLLECTIONS.enrollments),
      where('userId', '==', userId)
    );
    const enrollmentsSnapshot = await getDocs(enrollmentsQuery);
    const courseIds = enrollmentsSnapshot.docs.map(doc => doc.data().courseId);
    
    const courses: Course[] = [];
    for (const courseId of courseIds) {
      try {
        const course = await this.get(courseId);
        courses.push(course);
      } catch (error) {
        console.error(`Error fetching course ${courseId}:`, error);
      }
    }
    return courses;
  },

  async create(data: Omit<Course, 'id'>): Promise<Course> {
    const docRef = await addDoc(collection(db, COLLECTIONS.courses), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...data };
  },

  async update(id: string, data: Partial<Course>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.courses, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.courses, id);
    await deleteDoc(docRef);
  }
};

// Enrollment API
export const enrollmentApi = {
  async get(id: string): Promise<Enrollment> {
    const docRef = doc(db, COLLECTIONS.enrollments, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('Enrollment not found');
    return { id: docSnap.id, ...docSnap.data() } as Enrollment;
  },

  async list(): Promise<Enrollment[]> {
    const q = query(collection(db, COLLECTIONS.enrollments));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Enrollment[];
  },

  async getUserEnrollments(userId: string): Promise<Enrollment[]> {
    const q = query(
      collection(db, COLLECTIONS.enrollments),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Enrollment[];
  },

  async create(data: Omit<Enrollment, 'id'>): Promise<Enrollment> {
    const docRef = await addDoc(collection(db, COLLECTIONS.enrollments), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { id: docRef.id, ...data };
  },

  async update(id: string, data: Partial<Enrollment>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.enrollments, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.enrollments, id);
    await deleteDoc(docRef);
  }
}; 