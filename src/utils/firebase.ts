/* eslint-disable prettier/prettier */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDV7e-FnbnapulBiYdXLTGI36d3arWLdnY',
  authDomain: 'applasalle-fr.firebaseapp.com',
  projectId: 'applasalle-fr',
  storageBucket: 'applasalle-fr.appspot.com',
  messagingSenderId: '748535431010',
  appId: '1:748535431010:web:6d30e743794462d54af63b',
  measurementId: 'G-LFXTY9SVL2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db ;
