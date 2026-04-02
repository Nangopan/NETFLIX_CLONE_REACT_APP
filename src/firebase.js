import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {addDoc, collection, getFirestore} from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const firebaseConfig = {
  apiKey: "AIzaSyBoxPYKulzYgCBm7-n5DKFxV9AoCRUx_uQ",
  authDomain: "netflix-clone-e69ab.firebaseapp.com",
  projectId: "netflix-clone-e69ab",
  storageBucket: "netflix-clone-e69ab.firebasestorage.app",
  messagingSenderId: "726802284849",
  appId: "1:726802284849:web:d003c037bb40331b28b010"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
  if (!name.trim()) {
    return toast.error("Name is required!");
  }
  if (name.length < 3) {
    return toast.error("Name must be at least 3 characters!");
  }
  if (!email.trim()) {
    return toast.error("Email is required!");
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return toast.error("Enter a valid email!");
  }
  if (!password.trim()) {
    return toast.error("Password is required!");
  }
  if (password.length < 6) {
    return toast.error("Password must be at least 6 characters!");
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
    toast.success("Signup successful! 🎉 Welcome " + name);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password)=>{
  try {
    await signInWithEmailAndPassword(auth, email, password)
    toast.success("Login Successful! 🎉");
  } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = ()=>{
  signOut(auth)
}

export {auth, db, login, signup, logout}