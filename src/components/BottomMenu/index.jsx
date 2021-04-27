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
          data-testid="drinks-bottom-btn"
        >
          <img src={ drinkIcon } alt="drinksIcon" />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button" data-testid="explore-bottom-btn">
          <img src={ exploreIcon } alt="exploreIcon" />
        </button>
      </Link>
      <Link to="/comidas">
        <button type="button" data-testid="food-bottom-btn">
          <img src={ mealIcon } alt="foodIcon" />
        </button>
      </Link>
    </footer>
  );
}

export default BottomMenu;
