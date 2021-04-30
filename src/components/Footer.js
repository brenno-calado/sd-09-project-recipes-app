import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context';
import { fecthByName } from '../services/api';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const { updateData } = useContext(Context);

  const renderImage = (testid, src, alt) => (
    <img data-testid={ testid } src={ src } alt={ alt } />
  );

  return (
    <footer data-testid="footer">
      <Link to="/bebidas" onClick={ () => updateData(fecthByName('', false)) }>
        { renderImage('drinks-bottom-btn', drinkIcon, 'drink-icon') }
      </Link>
      <Link to="/explorar">
        { renderImage('explore-bottom-btn', exploreIcon, 'explore-icon') }
      </Link>
      <Link to="/comidas" onClick={ () => updateData(fecthByName('', true)) }>
        { renderImage('food-bottom-btn', mealIcon, 'meal-icon') }
      </Link>
    </footer>
  );
}

export default Footer;
