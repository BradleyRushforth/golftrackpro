import { useState } from "react";

export const LoginToast = () => {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');


  const handleLoginSuccess = () => {
    setSnackbarMessage('Login Successful!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };
  
  const handleLoginFailure = (message?: string) => {
    setSnackbarMessage(message || 'Invalid email or password. Please try again.');
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
  };

  return {
    handleLoginSuccess, 
    handleLoginFailure, 
    openSnackbar, 
    snackbarMessage, 
    snackbarSeverity, 
    setOpenSnackbar 
  };
};
