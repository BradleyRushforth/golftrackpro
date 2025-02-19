import React from 'react'
import { Button, Grid2, Typography } from '@mui/material'
import { Background } from '../../shared/background/background'


const Home: React.FC = () => {
  
  return(
    <>
    <Background />
    <Grid2 container pl={2}>
      <Grid2
        size={4} 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" 
        alignItems="flex-start"
        sx={{
          textAlign: 'left', 
          minHeight: '100vh',  // Ensures full height and prevents overflow
          paddingLeft: 2, // Optional, add some padding to the left
        }}
      >
        <Typography sx={{
          fontSize: '100px',
          color: '#FFFFFF'
        }}>
          AI-Powered Golf Performance, Simplified
        </Typography>
        <Button href="#" variant="contained" sx={{ fontSize: '20px', backgroundColor: 'red' }}>
          Explore
        </Button>
      </Grid2>
    </Grid2>
    </>
  )}

export default Home
