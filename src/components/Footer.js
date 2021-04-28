import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const footerStyle = {
  position: 'fixed',
  bottom: '0',
};

const Footer = () => {
  const history = useHistory();
  return (
    <footer data-testid="footer" style={ footerStyle }>
      <button type="button" onClick={ () => history.push('/bebidas') }>
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink-icon"

        />
      </button>
      <button type="button" onClick={ () => history.push('/explorar') }>
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explore-icon"

        />
      </button>

      <button type="button" onClick={ () => history.push('/comidas') }>
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
