import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
  Grid2,
  Stack,
} from "@mui/material";
import ClubForm from "./components/clubForm";
import ClubCard from "./components/clubCard";
import useFetchClubs from "./components/useFetchClubs";
import AddIcon from "@mui/icons-material/Add";
import { doc, collection, setDoc } from "@firebase/firestore";
import { auth, db } from "../../../../shared/Auth/services/firebaseConfig";
import { ClubOptions } from "./components/clubOptions";
import { useSortClubs } from "../../../../shared/utils/sortClubs";

const ClubSettings: React.FC = () => {
  const initialClubState = {
    clubType: "",
    clubModel: "",
    brand: "",
    setConfiguration: [],
  };

  const [newClub, setNewClub] = useState<any>(initialClubState);
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const user = auth.currentUser;

  const userClubs = useFetchClubs();

  useEffect(() => {
    setIsSaveDisabled(
      !(
        newClub.clubType &&
        newClub.clubModel &&
        newClub.brand &&
        (newClub.clubType === "Driver" ||
          newClub.clubType === "Putter" ||
          selectedClubs.length > 0)
      )
    );
  }, [newClub, selectedClubs]);

  const handleCheckboxChange = (club: string) => {
    setSelectedClubs((prevSelected) => {
      if (prevSelected.includes(club)) {
        return prevSelected.filter((item) => item !== club);
      }
      return [...prevSelected, club];
    });
  };

  const renderClubOptions = () => {
    return (
      <Stack direction={"row"}>
        {newClub.clubType && (
          <ClubOptions
            clubType={newClub.clubType}
            selectedClubs={selectedClubs}
            handleCheckboxChange={handleCheckboxChange}
          />
        )}
      </Stack>
    );
  };

  const handleSaveClub = async () => {
    if (!user) {
      console.error("User not authenticated.");
      alert("User not authenticated.");
      return;
    }

    if (
      !newClub.clubType ||
      !newClub.clubModel ||
      !newClub.brand ||
      (newClub.clubType !== "Driver" &&
        newClub.clubType !== "Putter" &&
        selectedClubs.length === 0)
    ) {
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
            ? [
                {
                  clubNumber: "driver",
                  carryDistance: null,
                  totalDistance: null,
                  lastUpdated: null,
                },
              ]
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
      setNewClub({
        clubType: "",
        clubModel: "",
        brand: "",
        setConfiguration: [],
      });
      setSelectedClubs([]);
    } catch (error) {
      console.error("Error saving club:", error);
      alert("Error saving club. Please try again.");
    }
  };

  const handleCancel = () => {
    setNewClub(initialClubState);
    setSelectedClubs([]);
    setOpenDialog(false);
  };

  const RenderClubCards = () => {
    const sortedClubs = useSortClubs(userClubs);

    return sortedClubs.map((clubData: any, index: any) => (
      <ClubCard key={index} clubData={clubData} />
    ));
  };

  return (
    <Grid2
      container
      spacing={2}
      sx={{
        margin: "auto",
        mt: 6,
        ml: "18%",
        backgroundColor: "#F5F5F5",
        p: 5,
        borderRadius: 5,
        width: "80%",
      }}
    >
      <Grid2 size={10}>
        <Typography variant="h3" pl={1} mb={2}>
          Customize Your Clubs
        </Typography>
      </Grid2>
      <Grid2 size={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
          sx={{
            backgroundColor: "#183D26",
            height: "50px",
            fontSize: "20px",
          }}
          startIcon={<AddIcon />}
        >
          Add Club
        </Button>
      </Grid2>
      <Grid2 container spacing={2} sx={{ mt: 3 }}>
        {RenderClubCards()}
      </Grid2>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add a New Club</DialogTitle>
        <ClubForm
          newClub={newClub}
          setNewClub={setNewClub}
          selectedClubs={selectedClubs}
          setSelectedClubs={setSelectedClubs}
          renderClubOptions={renderClubOptions}
          handleSaveClub={handleSaveClub}
          isSaveDisabled={isSaveDisabled}
          setOpenDialog={setOpenDialog}
        />
        <DialogActions>
          <Button onClick={() => handleCancel()}>Cancel</Button>
          <Button onClick={handleSaveClub} disabled={isSaveDisabled}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid2>
  );
};

export default ClubSettings;
