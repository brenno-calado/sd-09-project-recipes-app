import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

import mealIcon from '../../images/newIcons/mealIcon.svg';
import exploreIcon from '../../images/newIcons/exploreIcon.svg';
import drinkIcon from '../../images/newIcons/drinkIcon.svg';

function index() {
  return (
    <div className="footer" data-testid="footer">
      <Link data-testid="drinks-bottom-btn" to="/bebidas">
        <img src={ drinkIcon } alt="drinkIcon" />
      </Link>
      <Link data-testid="explore-bottom-btn" to="/explorar">
        <img src={ exploreIcon } alt="exploreIcon" />
      </Link>
      <Link data-testid="food-bottom-btn" to="/comidas">
        <img src={ mealIcon } alt="mealIcon" />
      </Link>
    </div>
  );
}

export default index;
