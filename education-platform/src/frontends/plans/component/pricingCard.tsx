import React from "react";
import "../styles/PricingCard.css";

interface PricingCardProps {
  title: string;
  price: string;
  access: string;
  features: string;
  extras: string;
}
 
const PricingCard: React.FC<PricingCardProps> = ({ title, price, access, features, extras }) => {
  return (
    <div className="PricingCard">
      <header>
        <h1 className="card-title">{title}</h1>
        <h3 className="card-price">{price}</h3>
        <p className="card-month">/month</p>
      </header>
      <div className="card-features">
        <div className="card-access">{access}</div>
        <div className="card-users-allowed">{features}</div>
        <div className="card-send-up">+ {extras}</div>
      </div>
      <button className="card-btn">READ MORE</button>
    </div>
  );
};

export default PricingCard;
