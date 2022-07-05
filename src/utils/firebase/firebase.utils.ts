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
import {
  CategoriesMap,
  Items,
} from "../../shared/interfaces/category.interface";

const firebaseConfig = {
  apiKey: "AIzaSyAldbzxfXG0B_viWyvFed77B1RJr9D2qCQ",
  authDomain: "react-ecommerce-5e1f8.firebaseapp.com",
  projectId: "react-ecommerce-5e1f8",
  storageBucket: "react-ecommerce-5e1f8.appspot.com",
  messagingSenderId: "1028839396787",
  appId: "1:1028839396787:web:3fa6b929d018dd90c127c6",
  measurementId: "G-NQZDTF7JK4",
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
  const categoriesMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();

    acc[title.toLowerCase()] = items;

    return acc;
  }, {} as CategoriesMap);

  return categoriesMap;
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

interface CategoriesDoc {
  title: string;
  items: Items[];
}
