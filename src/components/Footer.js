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
      <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink-icon" onClick={ () => history.push('/bebidas') } />
      <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore-icon" onClick={ () => history.push('/explorar') } />
      <img data-testid="food-bottom-btn" src={ mealIcon } alt="meal-icon" onClick={ () => history.push('/comidas') } />
    </footer>
  );
};

export default Footer;
