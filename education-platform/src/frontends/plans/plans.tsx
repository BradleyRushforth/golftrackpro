import PricingCard from "./component/pricingCard";
import "./styles/PricingApp.css";

function Plans() {
  return (
    <div className="PricingApp">
      <div className="app-container">
        <header>
          <h1 className="header-topic">Pricing Plans</h1>
        </header>
        <div className="pricing-cards">
          <PricingCard
            title="Standard"
            price={'£1.99'}
            access="Unlimited access to all CPD courses, materials, and resources."
            features="Mobile App Access"
            extras="3 Added Extras"
          />
          <PricingCard
            title="Ultimate"
            price={'£6.99'}
            access="Unlimited access to all CPD courses, materials, and resources."
            features="Mobile App Access"
            extras="13 Bonus Features"
          />
          <PricingCard
            title="Premium"
            price={'£3.99'}
            access="Unlimited access to all CPD courses, materials, and resources."
            features="Mobile App Access"
            extras="8 Added Extras"
          />
        </div>
      </div>
    </div>
  );
}

export default Plans;