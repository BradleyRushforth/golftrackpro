import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Grid2, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, FormControlLabel, Checkbox } from "@mui/material";
import { auth, db } from "../../../../shared/Auth/services/firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import AddIcon from '@mui/icons-material/Add';

interface Club {
  clubType: string;
  clubModel: string;
  brand: string;
  setConfiguration: string[];
}

const ClubSettings: React.FC = () => {
  const [clubs, setClubs] = useState<any[]>([]);
  const [newClub, setNewClub] = useState<Club>({
    clubType: "",
    clubModel: "",
    brand: "",
    setConfiguration: [],
  });
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const user = auth.currentUser;

  const handleClubTypeChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setNewClub({ ...newClub, [name]: value });

    if (newClub.clubType && newClub.clubModel && newClub.brand) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  };

  const handleClubModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClub({ ...newClub, [name]: value });

    if (newClub.clubType && newClub.clubModel && newClub.brand) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  };

  const handleSetConfigurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setNewClub((prevState) => {
      const updatedSetConfiguration = checked
        ? [...prevState.setConfiguration, value]
        : prevState.setConfiguration.filter((item) => item !== value);
      return { ...prevState, setConfiguration: updatedSetConfiguration };
    });
  };

  const handleSaveClub = async () => {
    if (newClub.clubType && newClub.clubModel && newClub.brand) {
      const updatedClubs = [...clubs, newClub];
      setClubs(updatedClubs);

      if (user) {
        const userRef = doc(db, "users", user.uid);
        try {
          await updateDoc(userRef, {
            clubs: updatedClubs,
          });
        } catch (error) {
          console.error("Error updating clubs:", error);
          alert("Failed to save club.");
        }
      }

      setNewClub({ clubType: "", clubModel: "", brand: "", setConfiguration: [] });
      setIsSaveDisabled(true);
      setOpenDialog(false);
    }
  };

  useEffect(() => {
    const fetchClubs = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setClubs(data.clubs || []);
      }
    };

    fetchClubs();
  }, [user]);

  const irons = ["1i", "2i", "3i", "4i", "5i", "6i", "7i", "8i", "9i"];
  const wedges = ["46°", "48°", "50°", "52°", "54°", "56°", "58°", "60°", "62°", "64°", "68°"];

  const font = {
    fontFamily: "'Spline Sans', sans-serif",
  };

  return (
    <Grid2 container spacing={2} sx={{ maxWidth: 900, margin: "auto", mt: 6 }}>
      <Grid2 size={10}>
        <Typography variant="h3" pl={1} mb={2}>
          Customize Your Clubs
        </Typography>
      </Grid2>
      <Grid2 size={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
          sx={{
            backgroundColor: "#1F5132",
            height: "50px",
            fontSize: "20px",
          }}
          startIcon={<AddIcon />}
        >
          Add Club
        </Button>
      </Grid2>

    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>Add New Club</DialogTitle>
      <DialogContent>
        <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <FormControl fullWidth sx={{ my: 2 }}>
              <InputLabel>Club Type</InputLabel>
              <Select
                name="clubType"
                value={newClub.clubType}
                onChange={handleClubTypeChange}
                label="Club Type"
                required
              >
                <MenuItem value="Driver">Driver</MenuItem>
                <MenuItem value="Woods">Woods</MenuItem>
                <MenuItem value="Irons">Irons</MenuItem>
                <MenuItem value="Hybrids">Hybrids</MenuItem>
                <MenuItem value="Wedges">Wedges</MenuItem>
                <MenuItem value="Putter">Putter</MenuItem>
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 size={12}>
            <TextField
              label="Club Brand"
              name="brand"
              value={newClub.brand}
              onChange={handleClubModelChange}
              required
              fullWidth
              sx={{
                marginBottom: 2,
                '& .MuiInputBase-input': { fontFamily: "'Spline Sans', sans-serif" },
              }}
            />
          </Grid2>

          <Grid2 size={12}>
            <TextField
              label="Club Model"
              name="clubModel"
              value={newClub.clubModel}
              onChange={handleClubModelChange}
              required
              fullWidth
              sx={{
                marginBottom: 2,
                '& .MuiInputBase-input': { fontFamily: "'Spline Sans', sans-serif" },
              }}
            />
          </Grid2>

          {newClub.clubType === "Irons" && (
            <Grid2 size={12}>
              <Typography variant="h6">Select the Irons in Your Set</Typography>
              {irons.map((iron) => (
                <FormControlLabel
                  key={iron}
                  control={
                    <Checkbox
                      value={iron}
                      checked={newClub.setConfiguration.includes(iron)}
                      onChange={handleSetConfigurationChange}
                    />
                  }
                  label={iron}
                />
              ))}
            </Grid2>
          )}

          {newClub.clubType === "Wedges" && (
            <Grid2 size={12}>
              <Typography variant="h6">Select the Wedges in Your Set</Typography>
              {wedges.map((wedge) => (
                <FormControlLabel
                  key={wedge}
                  control={
                    <Checkbox
                      value={wedge}
                      checked={newClub.setConfiguration.includes(wedge)}
                      onChange={handleSetConfigurationChange}
                    />
                  }
                  label={wedge}
                />
              ))}
            </Grid2>
          )}
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button 
        onClick={() => setOpenDialog(false)} 
        color="secondary"
        variant="outlined"
        sx={{
          ...font,
          borderColor: '#1F5132',
          color: '#1F5132'
        }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveClub}
          variant="contained"
          color="primary"
          disabled={isSaveDisabled}
          sx={{
            ...font,
            backgroundColor: '#1F5132'
          }}
        >
          Save Club
        </Button>
      </DialogActions>
    </Dialog>

    <Grid2 container spacing={2} sx={{ maxHeight: '500px', overflowY: 'auto' }}>
      {clubs.map((club, index) => (
        <Grid2 key={index} size={6}>
          <Card sx={{ padding: 2, backgroundColor: "#f1f1f1", height: '130px', maxWidth: '390px' }}>
            <CardContent>
              <Typography variant="h4" sx={{ marginBottom: 1 }}>
                {club.clubType}
              </Typography>
              <Grid2 container spacing={2}>
                <Grid2 size={club.clubType === "Irons" || club.clubType === "Wedges" ? 3 : 6}>
                  <Typography variant="h5">
                    Brand:
                  </Typography>
                  <Typography variant="body1">{club.brand}</Typography>
                </Grid2>

                <Grid2 size={club.clubType === "Irons" || club.clubType === "Wedges" ? 3 : 6}>
                  <Typography variant="h5">
                    Model:
                  </Typography>
                  <Typography variant="body1">{club.clubModel}</Typography>
                </Grid2>

                {club.clubType === "Irons" && (
                  <Grid2 size={6}>
                    <Typography variant="h5">
                      Selected Irons:
                    </Typography>
                    <Typography variant="body1">{club.setConfiguration.join(", ")}</Typography>
                  </Grid2>
                )}

                {club.clubType === "Wedges" && (
                  <Grid2 size={6}>
                    <Typography variant="h5">
                      Selected Wedges:
                    </Typography>
                    <Typography variant="body1">{club.setConfiguration.join(", ")}</Typography>
                  </Grid2>
                )}
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
</Grid2>

  );
};

export default ClubSettings;
