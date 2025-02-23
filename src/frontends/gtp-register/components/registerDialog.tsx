import React, { useState } from 'react';
import { Button, Card, Checkbox, Grid2, Link, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { RegisterToast } from '../utils/toastAlerts';

interface IRegisterDialog {
  email?: string;
  username?: string;
  password?: string;
  setEmail?: any;
  setUsername?: any;
  setPassword?: any;
  handleSubmit?: (e: React.FormEvent) => Promise<void>;
}

export const RegisterDialog: React.FC<IRegisterDialog> = ({
  email,
  username,
  password,
  setEmail,
  setUsername,
  setPassword,
  handleSubmit,
}) => {

  const {
    handleRegistrationSuccess,
    handleRegistrationFailure,
    openSnackbar,
    snackbarSeverity,
    setOpenSnackbar,
    snackbarMessage
  } = RegisterToast();

  const font = {
    fontFamily: "'Spline Sans', sans-serif",
  };

  const textFieldFontStyles = {
    '& .MuiInputBase-input': {
      fontFamily: "'Spline Sans', sans-serif",
    },
    '& .MuiInputLabel-root': {
      fontFamily: "'Spline Sans', sans-serif",
    },
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await handleSubmit?.(e);
      handleRegistrationSuccess();
    } catch (error) {
      console.error('Error during registration:', error);
      handleRegistrationFailure();
    }
  };

  return (
    <Grid2 display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'80vh'}>
      <Card
        sx={{
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          height: '650px',
          mt: 4,
          width: '60%',
          borderRadius: 5,
        }}
      >
        <Grid2
          size={12}
          sx={{
            backgroundImage: 'url(/images/register-image.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
          }}
        />
        <Grid2
          size={12}
          sx={{
            padding: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <Grid2 size={12} sx={{ textAlign: 'left' }}>
            <Typography variant="h4" sx={font}>
              Sign Up
            </Typography>
          </Grid2>
          <Grid2 size={12}>
            <Typography variant="body2" sx={{ ...font, fontSize: '14px' }}>
              Create an account, or{' '}
              <Link
                href="/login"
                sx={{
                  ...font,
                  textDecoration: 'underline',
                  color: '#1F5132',
                  '&:hover': {
                    color: '#3D9F6A',
                  },
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Grid2>
          <Grid2 container size={12} gap={2} mt={3} direction="column" alignItems="center">
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert
              onClose={() => setOpenSnackbar(false)}
              severity={snackbarSeverity}
              sx={{ width: '100%' }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
            <Grid2 size={12}>
              <Typography
                variant="body1"
                sx={{ fontFamily: "'Spline Sans', sans-serif", color: '#1F5132', marginBottom: '8px' }}
              >
                Email Address
              </Typography>
              <TextField
                name="email"
                placeholder="Email Address"
                sx={{ ...textFieldFontStyles, width: '320px' }}
                value={email}
                variant="outlined"
                onChange={setEmail}
              />
            </Grid2>
            <Grid2 size={12}>
              <Typography
                variant="body1"
                sx={{ fontFamily: "'Spline Sans', sans-serif", color: '#1F5132', marginBottom: '8px' }}
              >
                Username
              </Typography>
              <TextField
                name="username"
                placeholder="Username"
                sx={{ ...textFieldFontStyles, width: '320px' }}
                value={username}
                variant="outlined"
                onChange={setUsername}
              />
            </Grid2>
            <Grid2 size={12}>
              <Typography
                variant="body1"
                sx={{ fontFamily: "'Spline Sans', sans-serif", color: '#1F5132', marginBottom: '8px' }}
              >
                Password
              </Typography>
              <TextField
                name="password"
                placeholder="Password"
                sx={{ ...textFieldFontStyles, width: '320px' }}
                value={password}
                variant="outlined"
                type="password"
                onChange={setPassword}
              />
            </Grid2>
          </Grid2>
          <Grid2
            size={12}
            sx={{
              display: 'flex',
              alignItems: 'center',
              my: 2,
            }}
          >
            <Checkbox defaultChecked />
            <Typography sx={{ ...font, fontSize: '12px', maxWidth: '300px' }}>
              Yes, I want to receive updates, offers, and promotions via email.
            </Typography>
          </Grid2>
          <Grid2 size={12}>
            <Button
              variant="contained"
              sx={{
                ...font,
                width: '320px',
                height: '50px',
                borderRadius: 8,
                backgroundColor: '#1F5132',
              }}
              onClick={handleFormSubmit}
            >
              Sign up
            </Button>
          </Grid2>
        </Grid2>
      </Card>
    </Grid2>
  );
};
