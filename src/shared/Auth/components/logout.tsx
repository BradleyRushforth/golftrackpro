import React, { useState } from 'react'
import { Button } from '@mui/material'
import { goldGradientStyle } from '../../components/goldGradientStyle'
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from '../services/authService';
import { User } from '@firebase/auth';

export const Logout = () => {

  const [user, setUser] = useState<User | null>(null);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error: any) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <Button onClick={handleLogout} href="/" sx={goldGradientStyle}>
      <LogoutIcon
        sx={{
          fontSize: '30px',
          color: '#FFFFFF',
        }}
      />
    </Button>
  )
}