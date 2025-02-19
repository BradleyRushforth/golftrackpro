import React from 'react'
import { Box, Grid2, Button } from '@mui/material'

export const Navbar = () => {
  
  const defaultStyling = {
    fontSize: '35px',
    color: '#FFFFFF'
  }
  
  return (
    <Grid2 
    container
    alignItems="center"
    justifyContent="space-between"
    sx={{
       backgroundColor:'#1F5132'
    }}>
      <Grid2 size={8} display="flex" justifyContent="flex-start">
        <Button href="/" sx={defaultStyling}>
        <Box component="img" src={`${process.env.PUBLIC_URL}/assets/logo.png`}
        sx={{ 
          width: '50px',
          height: 'auto'
        }} />
        </Button>
      </Grid2>

      <Grid2 size={4} display="flex" justifyContent="flex-end" columnGap={4}>
        <Button href="/stockyardages" sx={defaultStyling}>Stock Yardages</Button>
        <Button href="/handicap" sx={defaultStyling}>Handicap</Button>
        <Button href="/academy" sx={defaultStyling}>Academy</Button>
      </Grid2>
    </Grid2>
)}