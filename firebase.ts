import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBQEwtZjsN2exRBynvxLKh_l8471qtwiBg',
  authDomain: 'netflix-clone-3babf.firebaseapp.com',
  projectId: 'netflix-clone-3babf',
  storageBucket: 'netflix-clone-3babf.appspot.com',
  messagingSenderId: '45595905420',
  appId: '1:45595905420:web:411c36635c495a3fafdaa9',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export default app;
export { auth, db };
