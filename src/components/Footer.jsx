import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/components/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <img
          src={ drinkIcon }
          alt="link to drink page"
          data-testid="drinks-bottom-btn"
        />
      </Link>

      <Link to="/explorar">
        <img
          src={ exploreIcon }
          alt="link to explore page"
          data-testid="explore-bottom-btn"
        />
      </Link>

      <Link to="/comidas">
        <img
          src={ mealIcon }
          alt="link to food page"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
