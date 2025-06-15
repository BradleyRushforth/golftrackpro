import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
  Grid2,
  Typography,
} from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../shared/Auth/services/firebaseConfig";
import { getAuth } from "@firebase/auth";

interface IGolfCourseDialogProps {
  open: boolean;
  onClose: () => void;
  onAddedCourse?: () => void;
}

const tees = ["White", "Yellow", "Blue", "Red", "Black"];

export const AddNewCourseDialog: React.FC<IGolfCourseDialogProps> = ({
  open,
  onClose,
  onAddedCourse,
}) => {
  const initialFormData = {
    name: "",
    tee: "",
    totalYards: "",
    slopeRating: "",
    handicap: "",
    total: "",
    parsMade: "",
    fairwaysHit: "",
    greensInReg: "",
    puttsMade: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not authenticated");
      }

      await addDoc(collection(db, "users", user.uid, "golfCourses"), {
        ...formData,
        totalYards: Number(formData.totalYards),
        slopeRating: Number(formData.slopeRating),
        handicap: Number(formData.handicap),
        total: Number(formData.total),
        parsMade: Number(formData.parsMade),
        fairwaysHit: Number(formData.fairwaysHit),
        greensInReg: Number(formData.greensInReg),
        puttsMade: Number(formData.puttsMade),
        createdAt: new Date(),
      });

      setSnackbar({
        open: true,
        message: "New Course Added Successfully",
        severity: "success",
      });

      onAddedCourse?.();
      onClose();
      setFormData({
        name: "",
        tee: "",
        totalYards: "",
        slopeRating: "",
        handicap: "",
        total: "",
        parsMade: "",
        fairwaysHit: "",
        greensInReg: "",
        puttsMade: "",
      });
    } catch (err) {
      console.error("Error adding golf course:", err);
      setSnackbar({
        open: true,
        message: "Failed to add course",
        severity: "error",
      });
    }
  };

  const fontStyling = {
    fontFamily: "Staatliches, Arial, sans-serif",
    marginBottom: "8px",
  };

  const textFieldStyling = {
    "& .MuiInputBase-input": {
      fontFamily: '"Inter Variable", sans-serif',
    },
    "& .MuiInputLabel-root": {
      fontFamily: '"Inter Variable", sans-serif',
    },
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>Add Golf Course</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <Grid2 container spacing={2} mt={2}>
            <Grid2 size={8}>
              <Typography ml={1} variant="body1" sx={{ ...fontStyling }}>
                Golf Course Name
              </Typography>
              <TextField
                placeholder="e.g. TPC Sawgrass"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                sx={{ ...textFieldStyling }}
              />
            </Grid2>
            <Grid2 size={4}>
              <Typography ml={1} variant="body1" sx={{ ...fontStyling }}>
                Select Marker
              </Typography>
              <TextField
                select
                label="Select Tee"
                name="tee"
                value={formData.tee}
                onChange={handleChange}
                fullWidth
                sx={{ ...textFieldStyling }}
              >
                {tees.map((tee) => (
                  <MenuItem key={tee} value={tee}>
                    {tee}
                  </MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 size={4}>
              <Typography ml={1} variant="body1" sx={{ ...fontStyling }}>
                Total Yards
              </Typography>
              <TextField
                placeholder="e.g. 7352"
                name="totalYards"
                type="number"
                value={formData.totalYards}
                onChange={handleChange}
                fullWidth
                sx={{ ...textFieldStyling }}
              />
            </Grid2>
            <Grid2 size={4}>
              <Typography ml={1} variant="body1" sx={{ ...fontStyling }}>
                Slope Rating
              </Typography>
              <TextField
                placeholder="e.g. 155"
                name="slopeRating"
                type="number"
                value={formData.slopeRating}
                onChange={handleChange}
                fullWidth
                sx={{ ...textFieldStyling }}
              />
            </Grid2>
            <Grid2 size={4}>
              <Typography ml={1} variant="body1" sx={{ ...fontStyling }}>
                Playing Handicap
              </Typography>
              <TextField
                placeholder="e.g. 3.2"
                name="handicap"
                type="number"
                value={formData.handicap}
                onChange={handleChange}
                fullWidth
                sx={{ ...textFieldStyling }}
              />
            </Grid2>
            <Grid2 size={4}>
              <Typography ml={1} variant="body1" sx={{ ...fontStyling }}>
                Total Score
              </Typography>
              <TextField
                placeholder="e.g. 78"
                name="total"
                type="number"
                value={formData.total}
                onChange={handleChange}
                fullWidth
                sx={{ ...textFieldStyling }}
              />
            </Grid2>
            <Grid2 size={4}>
              <Typography ml={1} variant="body1" sx={{ ...fontStyling }}>
                Pars Made
              </Typography>
              <TextField
                placeholder="e.g. 12"
                name="parsMade"
                type="number"
                value={formData.parsMade}
                onChange={handleChange}
                fullWidth
                sx={{ ...textFieldStyling }}
              />
            </Grid2>
            <Grid2 size={4}>
              <Typography ml={1} variant="body1" sx={{ ...fontStyling }}>
                FIR
              </Typography>
              <TextField
                placeholder="e.g. 65%"
                name="fairwaysHit"
                type="number"
                value={formData.fairwaysHit}
                onChange={handleChange}
                fullWidth
                sx={{ ...textFieldStyling }}
              />
            </Grid2>
            <Grid2 size={4}>
              <Typography ml={1} variant="body1" sx={{ ...fontStyling }}>
                GIR
              </Typography>
              <TextField
                placeholder="e.g. 72%"
                name="greensInReg"
                type="number"
                value={formData.greensInReg}
                onChange={handleChange}
                fullWidth
                sx={{ ...textFieldStyling }}
              />
            </Grid2>
            <Grid2 size={4}>
              <Typography ml={1} variant="body1" sx={{ ...fontStyling }}>
                Putts Made
              </Typography>
              <TextField
                placeholder="e.g. 21"
                name="puttsMade"
                type="number"
                value={formData.puttsMade}
                onChange={handleChange}
                fullWidth
                sx={{ ...textFieldStyling }}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setFormData(initialFormData);
              onClose();
            }}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ backgroundColor: "#183D26" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
