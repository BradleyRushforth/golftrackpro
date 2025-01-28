import React from 'react';
import './infoComponent.css';

const InfoComponent: React.FC = () => {
  return (
    <div className="info-container">
      <div className="info-text">
        <h2>Welcome to Virtwine</h2>
            <p>Welcome to Virtwine - Where Tech Dreams Take Off! Get Ready to geek out with our impressive lineup of CPD tech courses.
                Set free your inner tech mindset and level up your skills in the coolest way possible!
            </p>
      </div>
      <button className="learn-more-btn">Learn More</button>
    </div>
  );
};

export default InfoComponent;
