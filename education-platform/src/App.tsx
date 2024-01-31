// App.tsx
import React from 'react';
import BackgroundApp from './frontends/background/background';
import Navbar from './frontends/navbar/navbar';
import InfoComponent from './frontends/info/infoComponent';

const App: React.FC = () => {
  return (
    <div className='app-container'>
      <InfoComponent />
      <BackgroundApp />
      <Navbar className="navbar" activeIndex={0}>
        <a href="#">Courses</a>
        <a href="#">About</a>
        <a href="#">Team</a>
      </Navbar>
    </div>
  );
};

export default App;
