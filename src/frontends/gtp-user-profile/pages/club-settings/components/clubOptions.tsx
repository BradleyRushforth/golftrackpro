import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

interface IClubOptions {
  clubType: string;
  selectedClubs: string[];
  handleCheckboxChange: (club: string) => void;
}

export const ClubOptions: React.FC<IClubOptions> = ({
  clubType,
  selectedClubs,
  handleCheckboxChange,
}) => {

  const clubOptions: { [key: string]: string[] } = {
    Wood: ["3 Wood", "5 Wood", "7 Wood", "9 Wood"],
    Hybrid: ["3 Hybrid", "4 Hybrid", "5 Hybrid", "6 Hybrid"],
    Iron: ["1i", "2i", "3i", "4i", "5i", "6i", "7i", "8i", "9i", "PW"],
    Wedge: [
      "46°",
      "48°",
      "50°",
      "52°",
      "54°",
      "56°",
      "58°",
      "60°",
      "62°",
      "64°",
      "68°",
    ],
  };

  const clubs = clubOptions[clubType] || [];

  return (
    <>
      {clubs.map((club) => (
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
      ))}
    </>
  );
};
