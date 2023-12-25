import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBeu4rH8xsnAMCqsVmNNzEYncaIEsw9rYE",
    authDomain: "wordle-noga.firebaseapp.com",
    projectId: "wordle-noga",
    storageBucket: "wordle-noga.appspot.com",
    messagingSenderId: "52540520797",
    appId: "1:52540520797:web:b914df311ff1b6944690b4",
    measurementId: "G-BSXBQMV8FD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);