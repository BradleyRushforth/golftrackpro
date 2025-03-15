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
          fill: 'url(#gold-gradient)',
        }}
      />
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="25%" stopColor="#FFC700" />
            <stop offset="50%" stopColor="#FFE08A" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
      </svg>
    </Button>
  )
}