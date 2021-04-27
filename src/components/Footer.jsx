import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/explorar/bebidas">
        <img
          src={ drinkIcon }
          alt="Ícone de um drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>

      <Link to="/explorar">
        <img
          src={ exploreIcon }
          alt="Ícone de uma bússola"
          data-testid="explore-bottom-btn"
        />
      </Link>

      <Link to="/explorar/comidas">
        <img
          src={ mealIcon }
          alt="Ícone de talheres"
          data-testid="food-bottom-btn"
        />
      </Link>

    </footer>
  );
}

export default Footer;
