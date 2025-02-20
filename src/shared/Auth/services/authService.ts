import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const registerUser = async (email: string, password: string, username: string): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered successfully");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
