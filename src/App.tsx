import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes/routes';
import { Navbar } from './shared/gtp-navbar/navbar';
import '@fontsource/staatliches';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import Backdrop from './shared/backdrop/backdrop';

const theme = createTheme({
  typography: {
    fontFamily: 'Staatliches, Arial, sans-serif',
  },
});

const App = () => {
  return (
      <ThemeProvider theme={theme}>
        <Backdrop color="#F4FBF7" />
        <Router>
          <Navbar />
          <Box sx={{pt: '80px'}}>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.component} />
              ))}
            </Routes>
          </Box>
        </Router>
      </ThemeProvider>
  );
};

export default App;
