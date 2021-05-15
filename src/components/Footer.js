import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../context';
import { fecthByName } from '../services/api';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footer.css';

function Footer() {
  const { updateData } = useContext(Context);
  const { pathname } = useLocation();

  const renderImage = (testid, src, alt, className) => (
    <img
      data-testid={ testid }
      src={ src }
      alt={ alt }
      className={ className }
    />
  );

  const inOrOutMealsPage = pathname.includes('comidas') ? 'in-page' : 'out-page';
  const inOrOutExplorePage = pathname.includes('explorar') ? 'in-page' : 'out-page';
  const inOrOutDrinksPage = pathname.includes('bebidas') ? 'in-page' : 'out-page';

  return (
    <footer data-testid="footer" className="footer-wrapper">
      <Link
        to="/comidas"
        onClick={ () => updateData(fecthByName('', true)) }
        className={ inOrOutMealsPage }
      >
        { renderImage('food-bottom-btn', mealIcon, 'meal-icon') }
      </Link>
      <Link to="/explorar" className={ inOrOutExplorePage }>
        { renderImage('explore-bottom-btn', exploreIcon, 'explore-icon') }
      </Link>
      <Link
        to="/bebidas"
        onClick={ () => updateData(fecthByName('', false)) }
        className={ inOrOutDrinksPage }
      >
        { renderImage('drinks-bottom-btn', drinkIcon, 'drink-icon') }
      </Link>
    </footer>
  );
}

export default Footer;
