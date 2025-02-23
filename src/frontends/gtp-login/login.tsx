import React, { useState } from "react";
import { LoginToast } from "./utils/toastAlerts";
import { loginUser } from "../../shared/Auth/services/authService";
import { LoginDialog } from "./components/loginDialog";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Use the toast notification system
  const {
    handleLoginSuccess,
    handleLoginFailure,
    openSnackbar,
    setOpenSnackbar,
    snackbarMessage,
    snackbarSeverity
  } = LoginToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!email || !password) {
      setError("Email and password cannot be empty.");
      handleLoginFailure("Email and password cannot be empty.");
      return;
    }

    try {
      await loginUser(email, password);
      handleLoginSuccess(); // Show success message
    } catch (err: any) {
      setError(err.message);
      handleLoginFailure(err.message); // Show failure message
    }
  };

  return (
    <LoginDialog
      email={email}
      password={password}
      setEmail={(e) => setEmail(e.target.value)}
      setPassword={(e) => setPassword(e.target.value)}
      handleSubmit={handleSubmit}
      error={error}
      openSnackbar={openSnackbar}
      setOpenSnackbar={setOpenSnackbar}
      snackbarMessage={snackbarMessage}
      snackbarSeverity={snackbarSeverity}
    />
  );
};

export default Login;
