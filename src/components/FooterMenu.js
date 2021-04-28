import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../App.css';

export default function FooterMenu() {
  return (
    <footer className="footer-bar" data-testid="footer">
      <Link to="/bebidas">
        <img
          src={ drinkIcon }
          alt="drinks"
          className="footer-icons"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <img
          src={ exploreIcon }
          alt="explore"
          className="footer-icons"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/comidas">
        <img
          src={ mealIcon }
          alt="meals"
          className="footer-icons"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}
