import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';
import { Background } from './shared/background/background';
import { Navbar } from './shared/gtp-navbar/navbar';
import '@fontsource/staatliches';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Staatliches, Arial, sans-serif', // Add fallback fonts
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Background />
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