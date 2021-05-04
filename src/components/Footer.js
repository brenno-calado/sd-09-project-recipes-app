import '../App.css';
import { Link } from 'react-router-dom';
import React from 'react';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../CSS/Footer.css';

function Footer() {
  // const [foods, setFoods] = useState('');

  return (
    <footer className="optionsPerfil" data-testid="footer">
      <Link to="/bebidas">
        <img src={ drinkIcon } alt="Bebidas" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/explorar">
        <img src={ exploreIcon } alt="Explorar" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="/comidas">
        <img src={ mealIcon } alt="Comidas" data-testid="food-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
