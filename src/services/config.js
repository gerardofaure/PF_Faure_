import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBzyr6b-hUBjTnx6RXhhTRdjEfUG5RQbFE",
    authDomain: "chilectra-final.firebaseapp.com",
    projectId: "chilectra-final",
    storageBucket: "chilectra-final.appspot.com",
    messagingSenderId: "641094458461",
    appId: "1:641094458461:web:076643e941d019f42a01b4",
    measurementId: "G-3D9B4FMK19"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
