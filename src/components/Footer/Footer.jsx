import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

const Footer = () => {
  const createButtonDrink = () => (
    <Link to="/bebidas">
      <img src={ drinkIcon } alt="bebidas" data-testid="drinks-bottom-btn" />
    </Link>
  );

  const createButtonExplore = () => (
    <Link to="/explorar">
      <img src={ exploreIcon } alt="bebidas" data-testid="explore-bottom-btn" />
    </Link>
  );

  const createButtonMeal = () => (
    <Link to="/comidas">
      <img src={ mealIcon } alt="bebidas" data-testid="food-bottom-btn" />
    </Link>
  );
  return (
    <div className="Footer" data-testid="footer">
      { createButtonDrink() }
      { createButtonExplore() }
      { createButtonMeal() }
    </div>

  );
};

export default Footer;
