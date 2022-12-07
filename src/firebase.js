import { initializeApp } from "firebase/app";
import{ getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFAb8bT9eV-8SIFVojPVlN-k27sbIu13E",
  authDomain: "web-auth-47fab.firebaseapp.com",
  projectId: "web-auth-47fab",
  storageBucket: "web-auth-47fab.appspot.com",
  messagingSenderId: "38518394491",
  appId: "1:38518394491:web:274b3fad5e9288396b1cde"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {app, auth};