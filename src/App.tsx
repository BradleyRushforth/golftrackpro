import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes/routes';
import { Navbar } from './shared/gtp-navbar/navbar';
import '@fontsource/staatliches';
import { createTheme, ThemeProvider } from '@mui/material';
import Backdrop from './shared/backdrop/backdrop';

const theme = createTheme({
  typography: {
    fontFamily: 'Staatliches, Arial, sans-serif',
  },
});

const App = () => {
  return (
      <ThemeProvider theme={theme}>
        <Backdrop color="#F5F5F5" />
        <Router>
          <Navbar />
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
          </Routes>
        </Router>
      </ThemeProvider>
  );
};

export default App;
