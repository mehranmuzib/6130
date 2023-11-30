// firebase config
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/database';
import 'firebase/app';

import { getApps, initializeApp } from "firebase/app";


//Firebase Config

const firebaseConfig = {
  apiKey: "AIzaSyBO4rIT_8pRUGiM5fLQITb8LLq_Vi7ZyIs",
  authDomain: "project-5624985828616265386.firebaseapp.com",
  projectId: "project-5624985828616265386",
  storageBucket: "project-5624985828616265386.appspot.com",
  messagingSenderId: "637337590993",
  appId: "1:637337590993:web:0b9672cdf613ee605ff9f0",
  measurementId: "G-DT1W7JZKFR"
}

if (!firebase.apps.lenght){
  firebase.initializeApp(firebaseConfig);
}

export {firebase};