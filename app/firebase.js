// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsiPn4Iwcp5Ks5wLYH3adClkFjJK5Q7b8",
    authDomain: "bon-appetit-9afa8.firebaseapp.com",
    projectId: "bon-appetit-9afa8",
    storageBucket: "bon-appetit-9afa8.appspot.com",
    messagingSenderId: "421593335131",
    appId: "1:421593335131:web:0de6cdff6b285bf173867e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }