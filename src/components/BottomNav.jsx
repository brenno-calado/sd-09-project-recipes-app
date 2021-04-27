import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './BottomNav.css';

function BottomNav() {
  return (
    <nav className="bottom-nav" data-testid="footer">
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
      <Link to="/comidas">
        <img
          src={ mealIcon }
          alt="Icone de Comida"
          data-testid="food-bottom-btn"
        />
      </Link>
    </nav>
  );
}

export default BottomNav;
