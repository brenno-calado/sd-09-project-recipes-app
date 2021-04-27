import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import styles from './bottomMenu.module.css';

function BottomMenu() {
  return (
    <footer data-testid="footer" style={ styles }>
      <Link to="/bebidas">
        <button
          type="button"
        >
          <img src={ drinkIcon } alt="drinksIcon" data-testid="drinks-bottom-btn" />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button">
          <img src={ exploreIcon } alt="exploreIcon" data-testid="explore-bottom-btn" />
        </button>
      </Link>
      <Link to="/comidas">
        <button type="button">
          <img src={ mealIcon } alt="foodIcon" data-testid="food-bottom-btn" />
        </button>
      </Link>
    </footer>
  );
}

export default BottomMenu;
