import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { Navbar } from "./frontends/gtp-navbar/navbar";
import "@fontsource/staatliches";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import Backdrop from "./shared/backdrop/backdrop";
import { UserProvider } from "./context/userContext";

const theme = createTheme({
  typography: {
    fontFamily: "Staatliches, Arial, sans-serif",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Backdrop color="#DCDCDC" />
      <UserProvider>
        <Router>
          <Navbar />
          <Box sx={{ pt: "80px" }}>
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.component}
                />
              ))}
            </Routes>
          </Box>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
