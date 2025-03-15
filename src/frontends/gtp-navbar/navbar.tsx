import React, { useEffect, useState } from 'react';
import { Box, Grid2, Button, useMediaQuery, Drawer, IconButton, List, ListItemText, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { goldGradientStyle } from '../../shared/components/goldGradientStyle';
import { getAuth, onAuthStateChanged, User } from '@firebase/auth';
import { Logout } from '../../shared/Auth/components/logout';
import { getFirestore, doc, getDoc } from '@firebase/firestore';
import MenuIcon from '@mui/icons-material/Menu'; // Hamburger Icon

export const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profilePicture, setProfilePicture] = useState<string>('public/assets/avatars/default.jpg');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 600px)');

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

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { label: 'Stock Yardages', to: '/stockyardages' },
    { label: 'Handicap', to: '/handicap' },
    { label: 'Academy', to: '/academy' },
  ];

  return (
    <>
      <Grid2
        container
        sx={{
          backgroundColor: '#1F5132',
          padding: '0 16px',
          margin: 0,
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          alignItems: 'center',
        }}
      >
        <Grid2 size={2} display="flex" justifyContent="flex-start" alignItems="center">
          <Button component={Link} to="/" sx={goldGradientStyle}>
            <Box component="img" src={`${process.env.PUBLIC_URL}/assets/logo-gold.png`}
              sx={{
                width: '40px',
                height: 'auto',
              }} />
          </Button>
        </Grid2>

        {isMobile ? (
          <Grid2 size={10} display="flex" justifyContent="flex-end" alignItems="center">
            <IconButton onClick={() => setMobileMenuOpen(true)} sx={goldGradientStyle}>
              <MenuIcon sx={{ fontSize: '35px', color: '#FFC702' }}/>
            </IconButton>
          </Grid2>
        ) : (
          <Grid2 size={10} display="flex" justifyContent="flex-end" columnGap={4} alignItems="center">
            {menuItems.map((item) => (
              <Button key={item.to} component={Link} to={item.to} sx={{ ...goldGradientStyle, fontSize: '30px' }}>
                {item.label}
              </Button>
            ))}

            {user ? (
              <>
                <Box component={Link} to="/profile" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box component="img" src={profilePicture} sx={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                </Box>
                <Logout />
              </>
            ) : (
              <>
                <Button component={Link} to="/register" sx={{ ...goldGradientStyle, fontSize: '30px' }}>Register</Button>
                <Button component={Link} to="/login" sx={{ ...goldGradientStyle, fontSize: '30px' }}>Login</Button>
              </>
            )}
          </Grid2>
        )}
      </Grid2>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleCloseMobileMenu}
        sx={{
          width: '250px',
        }}
      >
        <Box sx={{ width: 250, padding: '16px' }}>
          <List>
            {menuItems.map((item) => (
              <ListItemButton key={item.to} component={Link} to={item.to} onClick={handleCloseMobileMenu}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
            {user ? (
              <>
                <ListItemButton component={Link} to="/profile" onClick={handleCloseMobileMenu}>
                  <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton onClick={handleCloseMobileMenu}>
                  <Logout />
                </ListItemButton>
              </>
            ) : (
              <>
                <ListItemButton component={Link} to="/register" onClick={handleCloseMobileMenu}>
                  <ListItemText primary="Register" />
                </ListItemButton>
                <ListItemButton component={Link} to="/login" onClick={handleCloseMobileMenu}>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
