import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBKZ46O1ugsbVG4j2WYTdJKzgkp70tP_Js",
  authDomain: "feast-4685d.firebaseapp.com",
  projectId: "feast-4685d",
  storageBucket: "feast-4685d.firebasestorage.app",
  messagingSenderId: "565472067736",
  appId: "1:565472067736:web:d9e71c70a480eb08b790ed",
  measurementId: "G-R51SKGH5NP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;