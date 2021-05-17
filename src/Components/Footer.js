import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../Styles/Footer.css';

function Footer() {
  const location = useLocation().pathname;
  const regex = /\d/g;
  const result = regex.test(location);
  console.log(result);
  return (
    <div className="footerContainer">
      { !result
        ? (
          <footer
            className="footer"
            data-testid="footer"
          >
            <Link to="/bebidas">
              <img
                src={ drinkIcon }
                alt="drink-icon"
                data-testid="drinks-bottom-btn"
              />
            </Link>
            <Link to="/explorar">
              <img
                src={ exploreIcon }
                alt="explore-icon"
                data-testid="explore-bottom-btn"
              />
            </Link>
            <Link to="/comidas">
              <img
                src={ mealIcon }
                alt="meal-icon"
                data-testid="food-bottom-btn"
              />
            </Link>
          </footer>)
        : ''}
    </div>
  );
}

export default Footer;
