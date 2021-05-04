import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import paths from '../routes/paths';

const { DRINKS, EXPLORE, FOODS } = paths;

const footerStyle = {
  position: 'fixed',
  bottom: '0',
};

const Footer = () => {
  const history = useHistory();
  return (
    <footer className="footer" data-testid="footer" style={ footerStyle }>
      <button type="button" onClick={ () => history.push(DRINKS) }>
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink-icon"

        />
      </button>
      <button type="button" onClick={ () => history.push(EXPLORE) }>
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explore-icon"

        />
      </button>

      <button type="button" onClick={ () => history.push(FOODS) }>
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="meal-icon"
        />
      </button>
    </footer>
  );
};

export default Footer;
