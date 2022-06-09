// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjLAc7xkIckRhMh_SA_5YA7WNqXFZtSbc",
    authDomain: "crud-simples-37904.firebaseapp.com",
    projectId: "crud-simples-37904",
    storageBucket: "crud-simples-37904.appspot.com",
    messagingSenderId: "301285461292",
    appId: "1:301285461292:web:a5284a6403a69174243089"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
