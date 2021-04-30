import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      data-testid="footer"
      style={ {
        display: 'flex',
        justifyContent: 'space-around',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        color: 'white',
        backgroundColor: '#ccc',
      } }
    >
      <button
        style={ {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        } }
        type="button"
      >
        <Link to="/bebidas">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="drinks"
          />
        </Link>
      </button>
      <button
        type="button"
        style={ {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        } }
      >
        <Link to="/explorar">
          <img
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt="explorer"
          />
        </Link>
      </button>
      <button
        type="button"
        style={ {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        } }
      >
        <Link to="/comidas">
          <img
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt="foods"
          />
        </Link>
      </button>
    </footer>
  );
}

export default Footer;
