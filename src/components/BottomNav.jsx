import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

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
      <Link to="/explorar">
        <img
          src={ exploreIcon }
          alt="Icone de Explorar"
          data-testid="explore-bottom-btn"
        />
      </Link>
    </nav>
  );
}

export default BottomNav;
