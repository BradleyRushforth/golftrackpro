import React from 'react'
import Button from '@mui/material/Button'
import { Grid2, Typography } from '@mui/material'

export const Navbar = () => {
  
  const defaultStyling = {
    fontSize: '40px',
    color: '#FFFFFF'
  }
  
  return (
    <Grid2 container alignItems="center"justifyContent="space-between" px={2}>
      <Grid2 size={8} display="flex" justifyContent="flex-start">
        <Button href="/" sx={defaultStyling}>Golf Track Pro</Button>
      </Grid2>

      <Grid2 size={4} display="flex" justifyContent="flex-end" columnGap={4}>
        <Button href="/stockyardages" sx={defaultStyling}>Stock Yardages</Button>
        <Button href="/handicap" sx={defaultStyling}>Handicap</Button>
        <Button href="/academy" sx={defaultStyling}>Academy</Button>
      </Grid2>
    </Grid2>
)}