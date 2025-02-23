import React, { useState } from "react";
import { LoginToast } from "./utils/toastAlerts";
import { loginUser } from "../../shared/Auth/services/authService";
import { LoginDialog } from "./components/loginDialog";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
    setError("");

    if (!email || !password) {
      setError("Email and password cannot be empty.");
      handleLoginFailure("Email and password cannot be empty.");
      return;
    }

    try {
      await loginUser(email, password);
      handleLoginSuccess();

      navigate('/');  
    } catch (err: any) {
      setError(err.message);
      handleLoginFailure(err.message);
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
