import React, { useEffect, useState } from "react";
import {
  Box,
  Grid2,
  Button,
  useMediaQuery,
  Drawer,
  IconButton,
  List,
  ListItemText,
  ListItemButton,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, User } from "@firebase/auth";
import { Logout } from "../../shared/Auth/components/logout";
import { getFirestore, doc, getDoc } from "@firebase/firestore";
import MenuIcon from "@mui/icons-material/Menu";
import "@fontsource-variable/montserrat";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";

export const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profilePicture, setProfilePicture] = useState<string>(
    "public/assets/avatars/default.jpg"
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("mLg"));

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const db = getFirestore();
        const userRef = doc(db, "users", currentUser.uid);

        try {
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setProfilePicture(userData.profilePicture || "default.jpg");
          } else {
            console.log("No such document!");
            setProfilePicture("default.jpg");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      } else {
        setProfilePicture("public/assets/avatars/default.jpg");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { label: "Stock Yardages", to: "/stockyardages" },
    { label: "Courses", to: "/courses" },
    { label: "Academy", to: "/academy" },
  ];

  const font = {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 400,
    fontSize: "20px",
    color: "#FFFFFF",
    letterSpacing: "2px",
  };

  return (
    <>
      <Grid2
        container
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.76)",
          padding: "0 16px",
          margin: 0,
          width: "100%",
          height: "80px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          alignItems: "center",
          px: "4%",
          zIndex: 1000,
        }}
      >
        <Grid2
          size={isMobile ? 10 : 3}
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Button
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textTransform: "none",
            }}
          >
            <OutlinedFlagIcon
              sx={{
                fontSize: "40px",
                color: "#FFFFFF",
                mr: 1,
                display: "inline-block",
                verticalAlign: "center",
              }}
            />
            <Typography
              sx={{
                fontSize: "35px",
                color: "#FFFFFF",
                letterSpacing: "2px",
                lineHeight: 1,
                p: 0,
              }}
            >
              Golf Track Pro
            </Typography>
          </Button>
        </Grid2>

        {isMobile ? (
          <Grid2
            size={2}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <IconButton onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon sx={{ fontSize: "35px", color: "#FFFFFF" }} />
            </IconButton>
          </Grid2>
        ) : (
          <Grid2
            size={9}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            {menuItems.map((item) => (
              <Button
                key={item.to}
                component={Link}
                to={item.to}
                sx={{
                  ...font,
                  mx: 3,
                }}
              >
                {item.label}
              </Button>
            ))}

            {user ? (
              <>
                <Box
                  component={Link}
                  to="/profile"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    component="img"
                    src={profilePicture}
                    sx={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      mx: 3,
                    }}
                  />
                </Box>
                <Logout />
              </>
            ) : (
              <>
                <Button component={Link} to="/login" sx={{ ...font }}>
                  Login
                </Button>
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
          width: "250px",
        }}
      >
        <Box sx={{ width: 250, padding: "16px" }}>
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.to}
                component={Link}
                to={item.to}
                onClick={handleCloseMobileMenu}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
            {user ? (
              <>
                <ListItemButton
                  component={Link}
                  to="/profile"
                  onClick={handleCloseMobileMenu}
                >
                  <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton onClick={handleCloseMobileMenu}>
                  <Logout />
                </ListItemButton>
              </>
            ) : (
              <>
                <ListItemButton
                  component={Link}
                  to="/login"
                  onClick={handleCloseMobileMenu}
                >
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
