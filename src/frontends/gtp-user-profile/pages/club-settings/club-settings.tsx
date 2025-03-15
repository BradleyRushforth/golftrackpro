import React, { useEffect, useState } from "react";
import { Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel, Grid, Checkbox, FormControlLabel, Card, CardContent, CardHeader, Chip, Grid2 } from "@mui/material";
import { auth, db } from "../../../../shared/Auth/services/firebaseConfig";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import AddIcon from '@mui/icons-material/Add';
import { useSortClubs } from "../../../../shared/utils/sortClubs";

interface Club {
  clubType: string;
  clubModel: string;
  brand: string;
  setConfiguration: { clubNumber: string; carryDistance: number | null; totalDistance: number | null; lastUpdated: string | null }[];
}

const ClubSettings: React.FC = () => {
  const [newClub, setNewClub] = useState<Club>({
    clubType: "",
    clubModel: "",
    brand: "",
    setConfiguration: []
  });
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [userClubs, setUserClubs] = useState<Club[]>([]);

  const user = auth.currentUser;

  const woods = ['3 Wood', '5 Wood', '7 Wood', '9 Wood'];
  const hybrids = ["3 Hybrid", "4 Hybrid", "5 Hybrid", "6 Hybrid"];
  const irons = ["1i", "2i", "3i", "4i", "5i", "6i", "7i", "8i", "9i", "PW"];
  const wedges = ["46°", "48°", "50°", "52°", "54°", "56°", "58°", "60°", "62°", "64°", "68°"];
  

  useEffect(() => {
    const fetchClubs = async () => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const clubsRef = collection(userRef, "golfClubs");
          const clubsSnapshot = await getDocs(clubsRef);
  
          if (!clubsSnapshot.empty) {
            const fetchedClubs: Club[] = [];
  
            clubsSnapshot.forEach((doc) => {
              const clubData = doc.data();
  
              if (clubData && clubData.name && clubData.setConfiguration) {
                fetchedClubs.push({
                  clubType: doc.id,
                  clubModel: clubData.name,
                  brand: clubData.brand || "",
                  setConfiguration: clubData.setConfiguration,
                });
              } else {
                console.error(`Invalid club data for ${doc.id}`);
              }
            });
  
            setUserClubs(fetchedClubs);
          } else {
            console.log("No golfClubs data found for the user.");
          }
        } catch (error) {
          console.error("Error fetching clubs data:", error);
        }
      }
    };
  
    fetchClubs();
  }, [user]);
  

  const handleClubTypeChange = (e: any) => {
    const { value } = e.target;
    setNewClub({ ...newClub, clubType: value });
    setSelectedClubs([]);
    setIsSaveDisabled(true);
  };

  const handleCheckboxChange = (club: string) => {
    setSelectedClubs((prevSelected) => {
      if (prevSelected.includes(club)) {
        return prevSelected.filter((item) => item !== club);
      }
      return [...prevSelected, club];
    });
  };

  useEffect(() => {
    setIsSaveDisabled(
      !(newClub.clubType && newClub.clubModel && newClub.brand && (newClub.clubType === "Driver" || newClub.clubType === "Putter" || selectedClubs.length > 0))
    );
  }, [newClub, selectedClubs]);

  const handleSaveClub = async () => {
    if (!user) {
      console.error("User not authenticated.");
      alert("User not authenticated.");
      return;
    }
  
    if (!newClub.clubType || !newClub.clubModel || !newClub.brand || (newClub.clubType !== "Driver" && newClub.clubType !== "Putter" && selectedClubs.length === 0)) {
      console.error("Missing required fields:", newClub);
      alert("Please fill in all required fields.");
      return;
    }
  
    const userRef = doc(db, "users", user.uid);
    const clubsRef = collection(userRef, "golfClubs");
  
    try {
      console.log("Saving club:", newClub);
  
      const clubDocRef = doc(clubsRef, newClub.clubType.toLowerCase());
  
      const clubData = {
        name: newClub.clubModel,
        type: newClub.clubType,
        brand: newClub.brand,
        setConfiguration:
          newClub.clubType === "Driver"
            ? [{ clubNumber: "driver", carryDistance: null, totalDistance: null, lastUpdated: null }]
            : newClub.clubType === "Putter"
            ? []
            : selectedClubs.map((club) => ({
                clubNumber: club,
                carryDistance: null,
                totalDistance: null,
                lastUpdated: null,
              })),
      };
  
      await setDoc(clubDocRef, clubData);
  
      console.log("Club successfully saved.");
      setOpenDialog(false);
      setNewClub({ clubType: "", clubModel: "", brand: "", setConfiguration: [] });
      setSelectedClubs([]);
    } catch (error) {
      console.error("Error saving club:", error);
    }
  };
  

  const renderClubOptions = () => {
    switch (newClub.clubType) {
      case "Iron":
        return irons.map((club) => (
          <FormControlLabel
            key={club}
            control={
              <Checkbox
                checked={selectedClubs.includes(club)}
                onChange={() => handleCheckboxChange(club)}
                name={club}
              />
            }
            label={club}
          />
        ));
      case "Wood":
        return woods.map((club) => (
          <FormControlLabel
            key={club}
            control={
              <Checkbox
                checked={selectedClubs.includes(club)}
                onChange={() => handleCheckboxChange(club)}
                name={club}
              />
            }
            label={club}
          />
        ));
      case "Wedge":
        return wedges.map((club) => (
          <FormControlLabel
            key={club}
            control={
              <Checkbox
                checked={selectedClubs.includes(club)}
                onChange={() => handleCheckboxChange(club)}
                name={club}
              />
            }
            label={club}
          />
        ));
      case "Hybrid":
        return hybrids.map((club) => (
          <FormControlLabel
            key={club}
            control={
              <Checkbox
                checked={selectedClubs.includes(club)}
                onChange={() => handleCheckboxChange(club)}
                name={club}
              />
            }
            label={club}
          />
        ));
      default:
        return null;
    }
  };

  const font = {
    fontFamily: "'Spline Sans', sans-serif",
  };

  const renderClubCards = () => {

    const clubOrder = ["driver", "wood", "hybrid", "iron", "wedge", "putter"];

    const sortedClubs = [...userClubs].sort((a, b) => {
      const indexA = clubOrder.indexOf(a.clubType);
      const indexB = clubOrder.indexOf(b.clubType);
      return indexA - indexB;
    });

    return sortedClubs.map((clubData, index) => (
      <Grid2 size={6} key={index}>
        <Card 
          sx={{ 
            width: '440px',
            height: '230px',
            backgroundColor: "#FFFFFF", 
            borderRadius: 4,
            boxShadow: '0px 0px 10px #C8E6C9', 
            }}
          >
          <CardContent>
          <Typography variant="h3">{clubData.clubType}</Typography>
            <Grid2 container direction={'row'}>
            <Grid2 size={6}>
              <Typography variant="h6">Brand</Typography>
              <Typography fontFamily={font} variant="body1">{clubData.brand}</Typography>
            </Grid2>
            <Grid2 size={6}>
              <Typography variant="h6">Model</Typography>
              <Typography fontFamily={font} variant="body1">{clubData.clubModel}</Typography>
            </Grid2>
              </Grid2>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Set Configuration:
            </Typography>
            <Grid2 container spacing={1} sx={{ mt: 1 }}>
              {clubData.setConfiguration.length > 0 ? (
                clubData.setConfiguration.map((club, i) => (
                  <Chip key={i} label={club.clubNumber || clubData.clubModel} sx={{ margin: 0.5 }} />
                ))
              ) : (
                <Typography variant="body2" sx={{ color: "grey" }}>No set configuration available.</Typography>
              )}
            </Grid2>
          </CardContent>
        </Card>
      </Grid2>
    ));
  };

  return (
    <Grid2 container spacing={2} sx={{ maxWidth: 900, margin: "auto", mt: 6 }}>
      <Grid2 size={10}>
        <Typography variant="h3" pl={1} mb={2}>Customize Your Clubs</Typography>
      </Grid2>
      <Grid2 size={2}>
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} sx={{ backgroundColor: "#1F5132", height: "50px", fontSize: "20px" }} startIcon={<AddIcon />}>Add Club</Button>
      </Grid2>

      <Grid2 container spacing={2} sx={{ mt: 3 }}>
        {renderClubCards()}
      </Grid2>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add a New Club</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel>Club Type</InputLabel>
            <Select name="clubType" value={newClub.clubType} onChange={handleClubTypeChange} label="Club Type" required>
              <MenuItem value="Driver">Driver</MenuItem>
              <MenuItem value="Wood">Woods</MenuItem>
              <MenuItem value="Iron">Irons</MenuItem>
              <MenuItem value="Hybrid">Hybrids</MenuItem>
              <MenuItem value="Wedge">Wedges</MenuItem>
              <MenuItem value="Putter">Putter</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Brand" name="brand" fullWidth value={newClub.brand} onChange={(e) => setNewClub({ ...newClub, brand: e.target.value })} sx={{ mb: 2 }} />
          <TextField label="Model" name="clubModel" fullWidth value={newClub.clubModel} onChange={(e) => setNewClub({ ...newClub, clubModel: e.target.value })} />

          {newClub.clubType && renderClubOptions()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveClub} disabled={isSaveDisabled}>Save</Button>
        </DialogActions>
      </Dialog>
    </Grid2>
  );
};

export default ClubSettings;
