import React from 'react';
import InfoComponent from './components/info/infoComponent';
import ScrollDown from './components/info/scrollDown/scrollDown';

const Home: React.FC = () => {
    return (
        <div className='app-container'>
            <InfoComponent />
            <ScrollDown />
        </div>
    )
}

export default Home;