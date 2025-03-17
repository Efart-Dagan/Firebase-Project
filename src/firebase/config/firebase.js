// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfigFromFile } from "./fireConfig";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig1 = firebaseConfigFromFile;

// Initialize Firebase
const app = initializeApp(firebaseConfig1);
export const dbFire = getFirestore();
export const auth = getAuth();
// const analytics = getAnalytics(app);



const code = `
    const addData = async (colName, newItem) => {
    setLoadFire(true);
    const ref = collection(dbConnect, colName)
    const data = await addDoc(ref, { ...newItem, time_id: Date.now() })
    setUpdateFire(Date.now());
    setLoadFire(false);
    return data.id;

  }
`