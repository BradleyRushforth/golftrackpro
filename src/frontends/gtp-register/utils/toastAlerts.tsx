import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const RegisterToast = () => {

const navigate = useNavigate();

const [openSnackbar, setOpenSnackbar] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

const handleRegistrationSuccess = () => {
  setSnackbarMessage('Account Created Successfully!');
  setSnackbarSeverity('success');
  setOpenSnackbar(true);
  setTimeout(() => {
    navigate('/login');
  }, 1500);
};

const handleRegistrationFailure = () => {
  setSnackbarMessage('Registration Failed. Please try again.');
  setSnackbarSeverity('error');
  setOpenSnackbar(true);
};

return { 
  handleRegistrationSuccess, 
  handleRegistrationFailure, 
  openSnackbar, 
  snackbarMessage, 
  snackbarSeverity, 
  setOpenSnackbar 
};
}