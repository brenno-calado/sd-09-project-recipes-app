import React from 'react';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

const BottomMenu = () => {
  return (
    <footer data-testid="footer">
      <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn"/>
      <img src={ mealIcon } alt="Meal Icon" data-testid="explore-bottom-btn"/>
      <img src={ exploreIcon } alt="Explore Icon" data-testid="food-bottom-btn"/>
    </footer>
  );
};

export default BottomMenu;
