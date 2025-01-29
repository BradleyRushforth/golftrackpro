import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './frontends/home/navbar/navbar';
import routes from './routes';
import BackgroundApp from './shared/background/background';

const App = () => {
  return (
    <Router>
      <BackgroundApp />
      <NavBar />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
    </Router>
  );
};

export default App;