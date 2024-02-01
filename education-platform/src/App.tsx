// App.tsx
import React from 'react';
import BackgroundApp from './frontends/background/background';
import Navbar from './frontends/homepage/navbar/navbar';
import InfoComponent from './frontends/homepage/info/infoComponent';
import ScrollDown from './frontends/homepage/info/scrollDown/scrollDown';

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
      <ScrollDown />
    </div>
  );
};

export default App;
