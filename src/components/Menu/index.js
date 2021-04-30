import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import mealIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import './Menu.css';

const Menu = () => (
  <footer className="Menu" data-testid="footer">
    <Link to="/comidas">
      <Button>
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="Icone de comidas"
        />
      </Button>
    </Link>
    <Link to="/explorar">
      <Button>
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="Icone de explorar"
        />
      </Button>
    </Link>
    <Link to="/bebidas">
      <Button>
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Icone de bebidas"
        />
      </Button>
    </Link>
  </footer>
);

export default Menu;
