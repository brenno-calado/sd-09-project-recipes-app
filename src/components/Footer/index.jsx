import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import FooterContainer from './styled';

export default function Footer() {
  return (
    <FooterContainer data-testid="footer">
      <Link to="/bebidas">
        <img src={ drinkIcon } alt="bebidas" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/explorar">
        <img src={ exploreIcon } alt="bebidas" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="/comidas">
        <img src={ mealIcon } alt="bebidas" data-testid="food-bottom-btn" />
      </Link>
    </FooterContainer>
  );
}
