import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <nav>
          <Link to="/bebidas">
            <img
              src={ drinkIcon }
              alt="drinks icon"
              data-testid="drinks-bottom-btn"
            />
          </Link>

          <Link to="/explorar">
            <img
              src={ exploreIcon }
              alt="explore icon"
              data-testid="explore-bottom-btn"
            />
          </Link>

          <Link to="/comidas">
            <img
              src={ mealIcon }
              alt="meals icon"
              data-testid="food-bottom-btn"
            />
          </Link>
        </nav>
    </footer>
  );
}

export default Footer;
