import React from 'react';
import { func } from 'prop-types';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      style={ {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      } }
    >
      <Link to="/mainPageDrinks">
        <img
          src={ drinkIcon }
          alt="Drinks"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explore">
        <img
          src={ exploreIcon }
          alt="Explore"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/mainPageFood">
        <img
          src={ mealIcon }
          alt="Meals"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

Footer.propTypes = {
  page: func,
}.isRequired;

export default Footer;
