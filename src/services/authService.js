import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';

export const register = async (email, password, name) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  if (name) {
    await updateProfile(userCredential.user, { displayName: name });
  }
  return userCredential;
};

// Логін
export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Логаут
export const logout = async () => {
  return await signOut(auth);
};

// Слухач змін користувача
export const subscribeToAuthChanges = callback => {
  return onAuthStateChanged(auth, callback);
};
