import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../services/firebaseConfig";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  country: string;
  phoneNumber: string;
}

export const registerUser = async (email: string, password: string, profile: UserProfile) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      ...profile,
      email: user.email,
      createdAt: new Date().toISOString(),
    });

    console.log("User registered and profile saved successfully!");
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
