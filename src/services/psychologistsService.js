import { ref, get } from 'firebase/database';
import { db } from '../firebase';

export const getPsychologists = async () => {
  const snapshot = await get(ref(db)); // корінь
  if (snapshot.exists()) {
    const data = snapshot.val(); // {0: {...}, 1: {...}}
    return Object.values(data); // масив [{...}, {...}]
  }
  return [];
};
