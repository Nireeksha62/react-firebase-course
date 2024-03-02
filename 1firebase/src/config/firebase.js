import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDh5PSywyYpR22XsvQtLz-HtHQLFMf-CIk",
  authDomain: "fir-course-7370d.firebaseapp.com",
  projectId: "fir-course-7370d",
  storageBucket: "fir-course-7370d.appspot.com",
  messagingSenderId: "689243820748",
  appId: "1:689243820748:web:cac4b9607a4187aace6869",
  measurementId: "G-6201L27XN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app);
export const storage=getStorage(app);