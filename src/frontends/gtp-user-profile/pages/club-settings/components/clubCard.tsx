import React from "react";
import { Card, CardContent, Typography, Grid2, Chip } from "@mui/material";

interface ClubCardProps {
  clubData: {
    clubType: string;
    clubModel: string;
    brand: string;
    setConfiguration: { clubNumber: string }[];
  };
}

const ClubCard: React.FC<ClubCardProps> = ({ clubData }) => {
  const font = {
    fontFamily: "'Spline Sans', sans-serif",
  };

  return (
    <Grid2 size={3} sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: "400px",
          height: "270px",
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          boxShadow:
            "0px 4px 10px rgba(0, 0, 0, 0.25), 0px 2px 6px rgba(95, 189, 123, 0.1)",
        }}
      >
        <CardContent>
          <Typography variant="h3">{clubData.clubType}</Typography>
          <Grid2 container direction={"row"}>
            <Grid2 size={6}>
              <Typography variant="h6">Brand</Typography>
              <Typography fontFamily={font} variant="body1">
                {clubData.brand}
              </Typography>
            </Grid2>
            <Grid2 size={6}>
              <Typography variant="h6">Model</Typography>
              <Typography fontFamily={font} variant="body1">
                {clubData.clubModel}
              </Typography>
            </Grid2>
          </Grid2>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Set Configuration:
          </Typography>
          <Grid2 container spacing={1} sx={{ mt: 1 }}>
            {clubData.setConfiguration.length > 0 ? (
              clubData.setConfiguration.map((club, i) => (
                <Chip key={i} label={club.clubNumber} sx={{ margin: 0.5 }} />
              ))
            ) : (
              <Typography variant="body2" sx={{ color: "grey" }}>
                No set configuration available.
              </Typography>
            )}
          </Grid2>
        </CardContent>
      </Card>
    </Grid2>
  );
};

export default ClubCard;
