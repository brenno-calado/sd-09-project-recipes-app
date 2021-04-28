import React from 'react';
import { Link } from 'react-router-dom';

import mealIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import './Menu.css';

const Menu = () => (
  <footer className="Menu" data-testid="footer">
    <Link to="/comidas">
      <img data-testid="food-bottom-btn" src={ mealIcon } alt="Icone de comidas" />
    </Link>
    <Link to="/explorar">
      <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="Icone de explorar" />
    </Link>
    <Link to="/bebidas">
      <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="Icone de bebidas" />
    </Link>
  </footer>
);

export default Menu;
