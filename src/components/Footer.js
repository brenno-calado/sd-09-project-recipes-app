import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const footerStyle = {
  bottom: '0px',
  margin: 'auto',
  position: 'fixed',
  // width: '100%',
  // display: 'flex',
  // justifyContent: 'space-between',
};

const Footer = () => (
  <footer data-testid="footer" style={ footerStyle }>
    <Link to="/bebidas">
      <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Drink Shortcut" />
    </Link>

    <Link to="/explorar">
      <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="Explore Shorcut" />
    </Link>

    <Link to="/comidas">
      <img data-testid="food-bottom-btn" src={ mealIcon } alt="Food Shortcut" />
    </Link>
  </footer>
);

export default Footer;
