import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const { isFetchIngredient, setIsFetchIngredient } = useContext(Context);

  const renderImage = (testid, src, alt) => (
    <img data-testid={ testid } src={ src } alt={ alt } />
  );

  const handleClick = () => {
    setIsFetchIngredient({ ...isFetchIngredient, toggleIngredient: false });
  };

  return (
    <footer className="footer" data-testid="footer">
      <Link to="/bebidas" onClick={ handleClick }>
        { renderImage('drinks-bottom-btn', drinkIcon, 'drink-icon') }
      </Link>
      <Link to="/explorar">
        { renderImage('explore-bottom-btn', exploreIcon, 'explore-icon') }
      </Link>
      <Link to="/comidas" onClick={ handleClick }>
        { renderImage('food-bottom-btn', mealIcon, 'meal-icon') }
      </Link>
    </footer>
  );
}

export default Footer;
