import React from 'react';
import { useHistory } from 'react-router';
import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      className="footer-container"
    >
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        className="main-buttons"
        src="drinkIcon"
        onClick={ () => { history.push('/bebidas'); } }
      >
        <img src={ DrinkIcon } alt="drinks" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        className="main-buttons"
        src="exploreIcon"
        onClick={ () => history.push('/explorar') }
      >
        <img src={ ExploreIcon } alt="explore" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        className="main-buttons"
        src="mealIcon"
        onClick={ () => history.push('/comidas') }
      >
        <img src={ MealIcon } alt="meals" />
      </button>
    </footer>
  );
}

export default Footer;
