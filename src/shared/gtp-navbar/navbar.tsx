import React from 'react'
import { Box, Grid2, Button } from '@mui/material'
import { goldGradientStyle } from '../components/goldGradientStyle'

export const Navbar = () => {
  
  return (
    <Grid2
      container
      sx={{
        backgroundColor:'#1F5132',
        padding: '0 16px',
        margin: 0,
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
      }}
    >
      <Grid2 size={2} display="flex" justifyContent="flex-start" alignItems="center">
        <Button href="/" sx={goldGradientStyle}>
          <Box component="img" src={`${process.env.PUBLIC_URL}/assets/logo-gold.png`}
            sx={{ 
              width: '50px',
              height: 'auto'
            }} />
        </Button>
      </Grid2>

      <Grid2 size={10} display="flex" justifyContent="flex-end" columnGap={4} alignItems="center">
        <Button href="/stockyardages" sx={goldGradientStyle}>Stock Yardages</Button>
        <Button href="/handicap" sx={goldGradientStyle}>Handicap</Button>
        <Button href="/academy" sx={goldGradientStyle}>Academy</Button>
        <Button href="/register" sx={goldGradientStyle}>Register</Button>
        <Button href="/login" sx={goldGradientStyle}>Login</Button>
        <Button href="/profile" sx={goldGradientStyle}>Profile</Button>
        <Button href="/logout" sx={goldGradientStyle}>Logout</Button>
      </Grid2>
    </Grid2>
)}