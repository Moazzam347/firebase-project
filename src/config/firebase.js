import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// import {getAnalytics} from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBI2xgPAgX3fFimOgIIbMxIogTz_IuQ-1c",
  authDomain: "fir-project-177e0.firebaseapp.com",
  projectId: "fir-project-177e0",
  storageBucket: "fir-project-177e0.appspot.com",
  messagingSenderId: "466966735404",
  appId: "1:466966735404:web:5441307fd224e205a4bf89",
  measurementId: "G-WN4RNS5TBX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app)
