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
  const [formData, setFormData] = useState({
    name: "",
    tee: "",
    totalYards: "",
    slopeRating: "",
    handicap: "",
    total: "",
    parsMade: "",
    fairwaysHit: "",
    greensInReg: "",
  });

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

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add Golf Course</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Golf Course Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            select
            label="Tee"
            name="tee"
            value={formData.tee}
            onChange={handleChange}
            fullWidth
          >
            {tees.map((tee) => (
              <MenuItem key={tee} value={tee}>
                {tee}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Total Yards"
            name="totalYards"
            type="number"
            value={formData.totalYards}
            onChange={handleChange}
          />
          <TextField
            label="Slope Rating"
            name="slopeRating"
            type="number"
            value={formData.slopeRating}
            onChange={handleChange}
          />
          <TextField
            label="Handicap"
            name="handicap"
            type="number"
            value={formData.handicap}
            onChange={handleChange}
          />
          <TextField
            label="Total"
            name="total"
            type="number"
            value={formData.total}
            onChange={handleChange}
          />
          <TextField
            label="Pars Made"
            name="parsMade"
            type="number"
            value={formData.parsMade}
            onChange={handleChange}
          />
          <TextField
            label="Fairways Hit"
            name="fairwaysHit"
            type="number"
            value={formData.fairwaysHit}
            onChange={handleChange}
          />
          <TextField
            label="Greens in Regulation"
            name="greensInReg"
            type="number"
            value={formData.greensInReg}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
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
