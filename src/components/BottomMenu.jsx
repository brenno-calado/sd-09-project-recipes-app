import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/bottomMenu.css';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function BottomMenu() {
  return (
    <div className="bottom-menu" data-testid="footer">
      <Link to="/bebidas" data-testid="drinks-bottom-btn">
        <img
          alt="drinks buttom"
          src={ drinkIcon }
        />
      </Link>
      <Link to="/explorar" data-testid="explore-bottom-btn">
        <img
          alt="search buttom"
          src={ exploreIcon }
        />
      </Link>
      <Link to="/comidas" data-testid="food-bottom-btn">
        <img
          alt="meal buttom"
          src={ mealIcon }
        />
      </Link>
    </div>
  );
}

export default BottomMenu;
