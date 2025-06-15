import React, { useState, useEffect } from "react";
import {
  CardContent,
  ListItemButton,
  Typography,
  Box,
  Grid2,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Avatar,
  IconButton,
  Drawer,
  Toolbar,
  ListItem,
  ListItemIcon,
  List,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../shared/Auth/services/firebaseConfig";
import CustomTooltip from "../../shared/utils/customTooltip";
import ClubSettings from "./pages/club-settings/club-settings";
import SettingsIcon from "@mui/icons-material/Settings";
import ProfileSettings from "./pages/profile-settings/profile-settings";

const drawerWidth = 305;

const Profile: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedOption, setSelectedOption] = useState<"profile" | "clubs">(
    "profile"
  );
  const [firstName, setFirstName] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const avatars = [
    "/assets/avatars/avatar-1.jpg",
    "/assets/avatars/avatar-2.jpg",
    "/assets/avatars/avatar-3.jpg",
    "/assets/avatars/avatar-4.jpg",
    "/assets/avatars/avatar-5.jpg",
    "/assets/avatars/avatar-6.jpg",
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserData(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setFirstName(userData.firstName);
        setProfilePicture(userData.profilePicture || null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const saveProfilePicture = async () => {
    if (user && selectedAvatar) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          profilePicture: selectedAvatar,
        });
        setProfilePicture(selectedAvatar);
        setOpenDialog(false);
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  };

  const font = {
    fontFamily: "'Spline Sans', sans-serif",
  };

  const listItemStyling = {
    borderRadius: 2,
    m: 1,
    "&.Mui-selected": {
      backgroundColor: "white",
    },
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: isMobile ? 70 : drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isMobile ? 70 : drawerWidth,
            boxSizing: "border-box",
            top: "80px",
          },
          height: "100%",
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              mt: 2,
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={profilePicture || "/assets/avatars/default.jpg"}
                alt="User Avatar"
                sx={{
                  width: isMobile ? 50 : 100,
                  height: isMobile ? 50 : "auto",
                  mb: 2,
                }}
              />
              {!isMobile && (
                <CustomTooltip title={"Change Avatar"}>
                  <IconButton
                    onClick={() => setOpenDialog(true)}
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      backgroundColor: "white",
                      borderRadius: "50%",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                      "&:hover": {
                        backgroundColor: "#C8E6C9",
                      },
                    }}
                  >
                    <CameraAltIcon
                      sx={{
                        color: "#183D26",
                      }}
                    />
                  </IconButton>
                </CustomTooltip>
              )}
            </Box>
            {!isMobile && (
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "#000000", mt: 2 }}
              >
                Welcome, {firstName || "Loading..."}
              </Typography>
            )}
          </Box>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => setSelectedOption("profile")}
                sx={{
                  ...listItemStyling,
                  backgroundColor:
                    selectedOption === "profile" ? "#dbdbdb" : "transparent",
                  "&:hover": {
                    backgroundColor:
                      selectedOption === "profile" ? "#dbdbdb" : "transparent",
                  },
                }}
              >
                <ListItemIcon>
                  <SettingsIcon
                    sx={{
                      color:
                        selectedOption === "profile" ? "#183D26" : "#000000",
                      pr: isMobile ? 0 : 1,
                      pt: "3px",
                    }}
                  />
                  {!isMobile && (
                    <Typography
                      variant="h6"
                      color={
                        selectedOption === "profile" ? "#183D26" : "#000000"
                      }
                    >
                      Profile Settings
                    </Typography>
                  )}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItemButton
              onClick={() => setSelectedOption("clubs")}
              sx={{
                ...listItemStyling,
                backgroundColor:
                  selectedOption === "clubs" ? "#dbdbdb" : "transparent",
                "&:hover": {
                  backgroundColor:
                    selectedOption === "clubs" ? "#dbdbdb" : "transparent",
                },
              }}
            >
              <ListItemIcon>
                <SportsGolfIcon
                  sx={{
                    color: selectedOption === "clubs" ? "#183D26" : "#000000",
                    pr: isMobile ? 0 : 1,
                    pt: "3px",
                  }}
                />
                {!isMobile && (
                  <Typography
                    variant="h6"
                    color={selectedOption === "clubs" ? "#183D26" : "#000000"}
                  >
                    Clubs
                  </Typography>
                )}
              </ListItemIcon>
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      <CardContent>
        {selectedOption === "profile" ? <ProfileSettings /> : <ClubSettings />}
      </CardContent>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle variant="h4">Select Avatar</DialogTitle>
        <DialogContent>
          <Grid2
            container
            spacing={2}
            sx={{
              mt: 2,
              padding: 0,
              display: "flex",
              flexWrap: "nowrap",
            }}
          >
            {avatars.map((avatar, index) => (
              <Grid2 key={index} sx={{ padding: 0 }}>
                <Avatar
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  sx={{
                    width: 90,
                    height: "auto",
                    cursor: "pointer",
                    boxShadow:
                      selectedAvatar === avatar
                        ? "0px 0px 8px 4px #C8E6C9"
                        : "none",
                    transition: "box-shadow 0.3s ease",
                  }}
                  onClick={() => handleAvatarSelect(avatar)}
                />
              </Grid2>
            ))}
          </Grid2>
        </DialogContent>
        <DialogActions sx={{ mr: 1 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            color="primary"
            variant="outlined"
            sx={{
              ...font,
              borderColor: "#183D26",
              color: "#183D26",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={saveProfilePicture}
            color="primary"
            variant="contained"
            sx={{
              ...font,
              backgroundColor: "#183D26",
              color: "#FFFFFF",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
