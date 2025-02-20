import React from 'react'
import { Button, Card, Grid2, Link, TextField, Typography } from '@mui/material'

interface IRegisterDialog {
  email?: string,
  password?: string,
  setEmail?: any,
  setPassword?: any,
  handleSubmit?: (e: React.FormEvent) => Promise<void>
}

export const LoginDialog: React.FC<IRegisterDialog> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit
}) => {

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
    '& .MuiFormLabel-root': {
      color: '#1F5132',
    },
  };

  return (
  <Grid2 display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'80vh'}>
    <Card sx={{
      display: "grid",
      gridTemplateColumns: "3fr 2fr",
      height: "650px", 
      mt: 4,
      width: "60%", 
      borderRadius: 5,
    }}>
      <Grid2
        size={12}
        sx={{
          backgroundImage: 'url(/images/login-image.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: "100%",
        }}
      />

      <Grid2
        size={12}
        sx={{
          padding: 4,
          display: "flex",
          justifyContent: 'center',
          alignItems: 'center',
          height: "100%",
          flexDirection: "column",
        }}
      >
          <Grid2 size={12} sx={{ textAlign: 'left' }}>
            <Typography variant="h4" sx={font}>
              Welcome Back!
            </Typography>
          </Grid2>
          <Grid2 size={12}>
          <Typography variant="body2" sx={{ ...font, fontSize: '14px' }}>
            Don't have an account?{' '}
            <Link
              href="/register"
              sx={{
                ...font,
                textDecoration: 'underline',
                color: '#1F5132',
                '&:hover': {
                  color: '#3D9F6A',
                },
              }}
            > 
              Sign up
            </Link>
          </Typography>
          </Grid2>
          <Grid2 container size={12} gap={2} mt={3} direction="column" alignItems="center">
            <Grid2 size={12}>
            <Typography variant="body1" sx={{ fontFamily: "'Spline Sans', sans-serif", color: '#1F5132', marginBottom: '8px' }}>
              Email Address
            </Typography>
              <TextField
                placeholder='Email Address'
                sx={{
                  ...textFieldFontStyles,
                  width: '320px',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#1F5132',
                    },
                  },
                }}
                value={email}
                variant="outlined"
                onChange={setEmail}
              />
            </Grid2>
            <Grid2 size={12}>
            <Typography variant="body1" sx={{ fontFamily: "'Spline Sans', sans-serif", color: '#1F5132', marginBottom: '8px' }}>
              Password
            </Typography>
              <TextField
                placeholder="Password"
                sx={{
                  ...textFieldFontStyles,
                  width: '320px',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#1F5132',
                    },
                  },
                }}
                value={password}
                variant="outlined"
                onChange={setPassword}
              />
            </Grid2>
          </Grid2>
          <Grid2 size={12} my={2}>
            <Button
              variant="contained"
              sx={{
                ...font,
                width: "320px",
                height: "50px",
                borderRadius: 8,
                backgroundColor: '#1F5132'
              }}
              onClick={handleSubmit}
            >
              Sign in
            </Button>
          </Grid2>
      </Grid2>
    </Card>
  </Grid2>
  )
}
