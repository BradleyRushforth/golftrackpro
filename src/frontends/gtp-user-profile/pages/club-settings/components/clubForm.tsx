import React, { JSX } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  DialogContent,
} from "@mui/material";

interface ClubFormProps {
  newClub: any;
  setNewClub: React.Dispatch<React.SetStateAction<any>>;
  selectedClubs: string[];
  setSelectedClubs: React.Dispatch<React.SetStateAction<string[]>>;
  renderClubOptions: () => JSX.Element | null;
  handleSaveClub: () => void;
  isSaveDisabled: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClubForm: React.FC<ClubFormProps> = ({
  newClub,
  setNewClub,
  renderClubOptions,
}) => {
  return (
    <DialogContent>
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel>Club Type</InputLabel>
        <Select
          name="clubType"
          value={newClub.clubType}
          onChange={(e) => setNewClub({ ...newClub, clubType: e.target.value })}
          label="Club Type"
          required
        >
          <MenuItem value="Driver">Driver</MenuItem>
          <MenuItem value="Wood">Woods</MenuItem>
          <MenuItem value="Iron">Irons</MenuItem>
          <MenuItem value="Hybrid">Hybrids</MenuItem>
          <MenuItem value="Wedge">Wedges</MenuItem>
          <MenuItem value="Putter">Putter</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Brand"
        name="brand"
        fullWidth
        value={newClub.brand}
        onChange={(e) => setNewClub({ ...newClub, brand: e.target.value })}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Model"
        name="clubModel"
        fullWidth
        value={newClub.clubModel}
        onChange={(e) => setNewClub({ ...newClub, clubModel: e.target.value })} 
      />
      {newClub.clubType && renderClubOptions()}
    </DialogContent>
  );
};

export default ClubForm;
