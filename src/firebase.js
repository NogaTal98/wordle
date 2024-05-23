import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: '${process.env.REACT_APP_APIKEY}',
    authDomain: '${process.env.REACT_APP_AUTHDOMAIN}',
    projectId: '${process.env.REACT_APP_PROJECTID}',
    storageBucket: '${process.env.REACT_APP_STORAGEBUCKET}',
    messagingSenderId: '${process.env.REACT_APP_MESSAGINGSUNDERID}',
    appId: '${process.env.REACT_APP_APPID}',
    measurementId: '${process.env.REACT_APP_MEASURMENTID}'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);