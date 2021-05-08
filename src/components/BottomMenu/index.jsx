import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import styles from './bottomMenu.module.css';

function BottomMenu() {
  return (
    <footer data-testid="footer" className={ styles.footerContainer }>
      <Link to="/bebidas">
        <button
          className={ styles.footerBtn }
          type="button"
        >
          <img src={ drinkIcon } alt="drinksIcon" data-testid="drinks-bottom-btn" />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button" className={ styles.footerBtn }>
          <img src={ exploreIcon } alt="exploreIcon" data-testid="explore-bottom-btn" />
        </button>
      </Link>
      <Link to="/comidas">
        <button type="button" className={ styles.footerBtn }>
          <img src={ mealIcon } alt="foodIcon" data-testid="food-bottom-btn" />
        </button>
      </Link>
    </footer>
  );
}

export default BottomMenu;
