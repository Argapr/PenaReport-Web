import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCXzT-7tJ636J_Y_ERP6cqfL6cUBkW_8mI",
  authDomain: "penareport.firebaseapp.com",
  projectId: "penareport",
  storageBucket: "penareport.appspot.com",
  messagingSenderId: "362273969734",
  appId: "1:362273969734:android:e8c73b98ef593b63075c47",
  measurementId: "G-1LBZJKWWB3",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);