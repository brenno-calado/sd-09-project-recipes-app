import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';

function BottomNav() {
  return (
    <nav data-testid="footer">
      <h1>BottomNav</h1>
      <Link to="/bebidas">
        <img
          src={ drinkIcon }
          alt="Icone de Drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>
    </nav>
  );
}

export default BottomNav;
