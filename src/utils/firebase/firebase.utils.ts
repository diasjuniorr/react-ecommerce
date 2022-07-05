import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import "firebase/compat/database";
import {
  getDoc,
  setDoc,
  doc,
  getFirestore,
  DocumentData,
  collection,
  writeBatch,
  query,
  getDocs,
  CollectionReference,
} from "firebase/firestore";
import { Item } from "../../shared/interfaces/category.interface";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const db = getFirestore();

export const auth = getAuth();

export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: CategoriesDoc[]
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
  });

  await batch.commit();
};

export const getCategoriesAndDocuemnts = async () => {
  const collectionRef = collection(
    db,
    "categories"
  ) as CollectionReference<CategoriesDoc>;
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => doc.data());
};

export const signinWithgooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const createUserDocFromAuth = async (
  userAuth: DocumentData,
  userInfo?: UserInfo
) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...userInfo,
      });

      const newUserSnapshot = await getDoc(userDocRef);
      return newUserSnapshot.data();
    } catch (error) {
      console.log("error creating user", error);
    }
  }

  return userSnapshot.data();
};

export const userSignOut = async () => signOut(auth);

export const onAuthStateChangedListener = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};

interface UserInfo {
  displayName: string;
}

export interface CategoriesDoc {
  title: string;
  items: Item[];
}
