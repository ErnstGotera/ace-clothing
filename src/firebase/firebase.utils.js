import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDc_gTiWkAGjl4RK4B512PxHULkgAIzkx4",
  authDomain: "ace-clothing.firebaseapp.com",
  databaseURL: "https://ace-clothing.firebaseio.com",
  projectId: "ace-clothing",
  storageBucket: "ace-clothing.appspot.com",
  messagingSenderId: "181806171434",
  appId: "1:181806171434:web:820f55b7b1ff3744644a53",
  measurementId: "G-EJ1ZSDW7XB"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
