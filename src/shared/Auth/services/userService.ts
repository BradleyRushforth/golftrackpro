import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "./firebaseConfig";

const db = getFirestore();

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  country: string;
  mobileNumber: string;
  clubs?: Record<string, string>;
}

export const saveUserProfile = async (profile: UserProfile): Promise<void> => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No authenticated user found");
    }

    await setDoc(doc(db, "users", user.uid), {
      ...profile,
    });
    console.log("User profile saved successfully!");
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
};
