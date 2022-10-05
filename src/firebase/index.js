import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuoYkg2xnxRQfafC4zzrhb6HcP2trGIt0",
  authDomain: "vue-journal-7a97c.firebaseapp.com",
  databaseURL: "https://vue-journal-7a97c-default-rtdb.firebaseio.com",
  projectId: "vue-journal-7a97c",
  storageBucket: "vue-journal-7a97c.appspot.com",
  messagingSenderId: "106685248880",
  appId: "1:106685248880:web:e07f9e2fdf959627078bb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
  db
}