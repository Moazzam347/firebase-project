import {useState} from "react";
import {auth, googleProvider} from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {} from "firebase/firestore";
export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error during sign in ", error);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log("Error signing in with google");
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Error signing in with google");
    }
  };
  console.log(auth?.currentUser?.email);
  return (
    <div>
      <input
        type='text'
        placeholder='Email...'
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type='text'
        placeholder='Password...'
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign in with google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
