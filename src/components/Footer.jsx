import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer className="Footer" data-testid="footer">
      <Link to="/bebidas">
        <button type="button">
          <img src={ drinkIcon } alt="drink" data-testid="drinks-bottom-btn" />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button">
          <img
            src={ exploreIcon }
            alt="explore"
            data-testid="explore-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/comidas">
        <button type="button">
          <img src={ mealIcon } alt="drink" data-testid="food-bottom-btn" />
        </button>
      </Link>
    </footer>
  );
}

Footer.propTypes = {
  getRecipes: PropTypes.func,
}.isRequired;

export default Footer;
