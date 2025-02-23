import React, { useEffect, useState } from 'react'
import { Box, Grid2, Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { goldGradientStyle } from '../../shared/components/goldGradientStyle'
import { getAuth, onAuthStateChanged, User } from '@firebase/auth';
import { Logout } from '../../shared/Auth/components/logout';
import { getFirestore, doc, getDoc } from '@firebase/firestore';

export const Navbar = () => {
  
  const [user, setUser] = useState<User | null>(null);
  const [profilePicture, setProfilePicture] = useState<string>('public/assets/avatars/default.jpg');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const db = getFirestore();
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfilePicture(userData.profilePicture || 'default.jpg');
        } else {
          console.log("No such document!");
          setProfilePicture('default.jpg');
        }
      }
    });

    return () => unsubscribe();
  }, []);

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
        <Button component={Link} to="/" sx={goldGradientStyle}>
          <Box component="img" src={`${process.env.PUBLIC_URL}/assets/logo-gold.png`}
            sx={{ 
              width: '50px',
              height: 'auto'
            }} />
        </Button>
      </Grid2>

      <Grid2 size={10} display="flex" justifyContent="flex-end" columnGap={4} alignItems="center">
    
        <Button component={Link} to="/stockyardages" sx={goldGradientStyle}>Stock Yardages</Button>
        <Button component={Link} to="/handicap" sx={goldGradientStyle}>Handicap</Button>
        <Button component={Link} to="/academy" sx={goldGradientStyle}>Academy</Button>

        {user ? (
          <>
            <Box component={Link} to="/profile" sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component="img" src={profilePicture} sx={{ width: '40px', height: '40px', borderRadius: '50%' }} />
            </Box>
          <Logout />
        </>
        ) : (
          <>
            <Button component={Link} to="/register" sx={goldGradientStyle}>Register</Button>
            <Button component={Link} to="/login" sx={goldGradientStyle}>Login</Button>
          </>
        )}
      </Grid2>
    </Grid2>
  );
}
