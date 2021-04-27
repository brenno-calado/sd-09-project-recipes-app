import React from 'react';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function bottomMenu() {
  return (
    <footer data-testid="footer">
      <button type="button" data-testid="drinks-bottom-btn">
        <img src={ drinkIcon } alt="drinksIcon" />
      </button>
      <button type="button" data-testid="explore-bottom-btn">
        <img src={ exploreIcon } alt="exploreIcon" />
      </button>
      <button type="button" data-testid="food-bottom-btn">
        <img src={ mealIcon } alt="foodIcon" />
      </button>
    </footer>
  );
}

export default bottomMenu;
