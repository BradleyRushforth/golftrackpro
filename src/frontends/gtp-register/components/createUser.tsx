import React, { useState } from "react";
import { registerUser } from "../../../shared/Auth/services/authService";
import { RegisterDialog } from "./registerDialog";

const CreateUser: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser(email, password, username);
      alert("User registered successfully!");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Error registering user");
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
