import React from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const renderImage = (testid, src, alt) => (
    <img data-testid={ testid } src={ src } alt={ alt } />
  );

  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        { renderImage('drinks-bottom-btn', drinkIcon, 'drink icon') }
      </Link>
      <Link to="/explorar">
        { renderImage('explore-bottom-btn', exploreIcon, 'explore icon') }
      </Link>
      <Link to="/comidas">
        { renderImage('food-bottom-btn', mealIcon, 'meal icon') }
      </Link>
    </footer>
  );
}

export default Footer;
