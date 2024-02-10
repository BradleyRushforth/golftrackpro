import React from 'react';
import Lottie from 'lottie-react-web';
import animationData from './assets/scrollDown.json';

const ScrollDown = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div style={{ position: 'fixed', top: '58%', right: '0', transform: 'translateY(-50%)' }}>
      <Lottie options={defaultOptions} height={500} width={100} />
    </div>
  );
};

export default ScrollDown;
