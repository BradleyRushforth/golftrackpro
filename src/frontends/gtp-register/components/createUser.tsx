import React, { useState } from "react";
import { RegisterDialog } from "./registerDialog";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../../shared/Auth/services/firebaseConfig";

const CreateUser: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      if (!email || !username || !password) {
        alert('All fields are required!');
        return;
      }
  
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        firstName: null,
        lastName: null,
        username: user.displayName,
        email: user.email,
        mobileNumber: null,
        homeTelephone: null,
        jobTitle: null,
        dateOfBirth: null,
        country: null,
        address: null,
        postcode: null,
        profilePicture: null,
        createdAt: serverTimestamp(),
        clubs: [],
      });
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <>
    <RegisterDialog
      email={email}
      username={username}
      password={password}
      handleSubmit={handleSubmit}
      setEmail={(e: any) => setEmail(e.target.value)}
      setUsername={(e: any) => setUsername(e.target.value)}
      setPassword={(e: any) => setPassword(e.target.value)}
    />
    </>
  );
};

export default CreateUser;
