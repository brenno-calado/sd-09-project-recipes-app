import React from 'react';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../Style/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/bebidas">
        <img src={ drinkIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/explorar">
        <img src={ exploreIcon } alt="Explore" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="/comidas">
        <img src={ mealIcon } alt="Meals" data-testid="food-bottom-btn" />
      </Link>
    </footer>
  );
}

Footer.propTypes = {
  sendPage: func,
}.isRequired;

export default Footer;
