import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD3WtOSMNu9aVBWr6eUQggTtIWpDh91Z1A",
  authDomain: "avalialpha.firebaseapp.com",
  projectId: "avalialpha",
  storageBucket: "avalialpha.firebasestorage.app",
  messagingSenderId: "866886322511",
  appId: "1:866886322511:web:276c20008d40b66cc95d3a"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);