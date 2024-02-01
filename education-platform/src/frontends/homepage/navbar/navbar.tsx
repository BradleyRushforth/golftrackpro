import React, { ReactNode } from 'react';
import './navbar.css';

interface NavbarProps {
  children: ReactNode;
  className?: string;
  activeIndex?: number;
}

const Navbar: React.FC<NavbarProps> = ({ children, className = '', activeIndex = -1 }) => {
  const handleActive = (index: number): string => (index === activeIndex ? 'active' : '');

  return (
    <nav className={`navbar ${className}`}>
      <div className="logo">Virtwine</div>
      <ul className="nav-links">
        {React.Children.map(children, (child, index) => (
          <li className={handleActive(index)}>{child}</li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
