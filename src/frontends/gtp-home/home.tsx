import React from "react";
import { Button, Grid2, Typography, useMediaQuery } from "@mui/material";
import { Background } from "../../shared/background/background";

const Home: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <>
      <Background />
      <Grid2 container pl={isMobile ? 0 : 2}>
        <Grid2
          size={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          sx={{
            textAlign: "left",
            mt: isMobile ? '25%' : '12%',
            ml: isMobile ? 0 : '3%',
            paddingLeft: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: isMobile ? "70px" : "80px",
              color: "#FFFFFF",
            }}
          >
            AI-Powered Golf Performance, Simplified
          </Typography>
          <Button
            href="#"
            variant="contained"
            sx={{ fontSize: "20px", backgroundColor: "red" }}
          >
            Explore
          </Button>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Home;
