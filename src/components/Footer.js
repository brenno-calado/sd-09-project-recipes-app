import React, { useState } from 'react';
import { useHistory } from 'react-router';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  const [obj] = useState({
    drink: {
      route: '/bebidas',
      dataTestId: 'drinks',
      icon: drinkIcon,
    },
    explore: {
      route: '/explorar',
      dataTestId: 'explore',
      icon: exploreIcon,
    },
    food: {
      route: '/comidas',
      dataTestId: 'food',
      icon: mealIcon,
    },
  });

  function handleButton({ route, dataTestId, icon }) {
    return (
      <button
        onClick={ () => { history.push(route); } }
        data-testid={ `${dataTestId}-bottom-btn` }
        type="button"
        src={ icon }
      >
        <img src={ icon } alt={ dataTestId } />
      </button>
    );
  }

  return (
    <footer className="footer-style" data-testid="footer">
      {handleButton(obj.drink)}
      {handleButton(obj.explore)}
      {handleButton(obj.food)}
    </footer>
  );
}

export default Footer;
