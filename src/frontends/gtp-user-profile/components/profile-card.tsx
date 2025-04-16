import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
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
  ListItem,
  Tooltip,
} from "@mui/material";
import { auth, db } from "../../../shared/Auth/services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ProfileSettings from "../pages/profile-settings/profile-settings";
import ClubSettings from "../pages/club-settings/club-settings";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

export default function ProfileCard() {
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

  return (
    <Box
      sx={{
        display: "flex",
        maxWidth: 1500,
        height: "700px",
        boxShadow:
          "0px 4px 10px rgba(0, 0, 0, 0.25), 0px 2px 6px rgba(95, 189, 123, 0.1)",
        borderRadius: 8,
        my: 8,
        mx: "auto",
      }}
    >
      <Card
        sx={{
          minWidth: 360,
          height: "700px",
          borderRadius: 8,
          position: "absolute",
          backgroundColor: "#183D26",
          boxShadow: "none",
        }}
      >
        <CardContent>
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
                sx={{ width: 100, height: "auto", mb: 2 }}
              />
              <Tooltip title={"Change Avatar"}>
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
              </Tooltip>
            </Box>
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: "#FFFFFF", mt: 2 }}
            >
              Welcome, {firstName || "Loading..."}
            </Typography>
          </Box>
          <List>
            <ListItemButton
              onClick={() => setSelectedOption("profile")}
              sx={{
                borderRadius: 5,
                mb: 1,
                backgroundColor:
                  selectedOption === "profile" ? "white" : "transparent",
                "&:hover": {
                  backgroundColor:
                    selectedOption === "profile" ? "white" : "transparent",
                },
                "&.Mui-selected": {
                  backgroundColor: "white",
                },
              }}
            >
              <Typography
                variant="h5"
                color={selectedOption === "profile" ? "#183D26" : "#FFFFFF"}
              >
                Profile Settings
              </Typography>
            </ListItemButton>
            <ListItemButton
              onClick={() => setSelectedOption("clubs")}
              sx={{
                borderRadius: 5,
                mb: 1,
                backgroundColor:
                  selectedOption === "clubs" ? "white" : "transparent",
                "&:hover": {
                  backgroundColor:
                    selectedOption === "clubs" ? "white" : "transparent",
                },
                "&.Mui-selected": {
                  backgroundColor: "white",
                },
              }}
            >
              <Typography
                variant="h5"
                color={selectedOption === "clubs" ? "#183D26" : "#FFFFFF"}
              >
                Clubs
              </Typography>
            </ListItemButton>
          </List>
        </CardContent>
      </Card>
      <Card
        sx={{
          flex: 1,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
          boxShadow: "none",
          ml: "20%",
          overflow: "auto",
        }}
      >
        <CardContent>
          {selectedOption === "profile" ? (
            <ProfileSettings />
          ) : (
            <ClubSettings />
          )}
        </CardContent>
      </Card>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
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
    </Box>
  );
}
