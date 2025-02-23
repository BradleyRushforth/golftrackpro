import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqmVSFdc_3fGtsf-4ApmEgR9bhWRfsqXU",
  authDomain: "golftrackpro-1a0ab.firebaseapp.com",
  projectId: "golftrackpro-1a0ab",
  storageBucket: "golftrackpro-1a0ab.firebasestorage.app",
  messagingSenderId: "130294570603",
  appId: "1:130294570603:web:06d60bbe104f04070c1b2e",
  measurementId: "G-J2Y0XCTB0E"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);