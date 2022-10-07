import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDypsCZdMIKkO_YcQtsqVKkrQdzaCeAk9U",
  authDomain: "jbnudyd2022eswcontest.firebaseapp.com",
  databaseURL: "https://jbnudyd2022eswcontest-default-rtdb.firebaseio.com",
  projectId: "jbnudyd2022eswcontest",
  storageBucket: "jbnudyd2022eswcontest.appspot.com",
  messagingSenderId: "633134548871",
  appId: "1:633134548871:web:8c3dcac8bc93acd094b522",
  measurementId: "G-KTKC68EFJS"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();