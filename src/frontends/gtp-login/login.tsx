import React, { useState } from "react";
import { loginUser } from "../../shared/Auth/services/authService";
import { LoginDialog } from "./components/loginDialog";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      alert("User logged in successfully!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <LoginDialog 
    email={email}
    password={password}
    setPassword={(e: any) => setPassword(e.target.value)}
    setEmail={(e: any) => setEmail(e.target.value)}
    handleSubmit={handleLogin}
    />
  );
};

export default Login;
