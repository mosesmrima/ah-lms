import { useState, useEffect } from 'react';
import { useUserStore } from '@/store';
import { auth } from '@/lib/firebase/config';
import { api } from '@/lib/firebase/api';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth';
import { useQueryClient } from '@tanstack/react-query';

export function useAuth() {
  const { setUser, logout: storeLogout } = useUserStore();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Force a reload to get the latest user data
          await firebaseUser.reload();
          const user = await api.users.getByEmail(firebaseUser.email!);
          console.log("userr:" ,user)
          console.log("firebase user",firebaseUser)
          if (!user) {
            // Create user if they don't exist
            const newUser = await api.users.create({
              email: firebaseUser.email!,
              name: firebaseUser.displayName || '',
              role: 'student',
              avatar: firebaseUser.photoURL || ''
            });
            setUser(newUser);
          } else {
            setUser(user);
          }
        } catch (error) {
          console.error('Error in auth state change:', error);
          storeLogout();
        }
      } else {
        storeLogout();
      }
    });

    return () => unsubscribe();
  }, [setUser, storeLogout]);

  const login = async (email: string, password: string) => {
    try {
      setIsLoggingIn(true);
      await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setIsSigningUp(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update the user's display name
      await updateProfile(userCredential.user, {
        displayName: fullName
      });
      // Force a reload of the user to get the updated profile
      await userCredential.user.reload();
    } finally {
      setIsSigningUp(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsGoogleSigningIn(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      storeLogout();
      queryClient.clear();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    login,
    signUp,
    signInWithGoogle,
    logout,
    isLoggingIn,
    isSigningUp,
    isGoogleSigningIn,
  };
} 