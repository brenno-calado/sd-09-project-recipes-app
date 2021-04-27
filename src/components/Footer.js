import React from 'react';
import { useHistory } from 'react-router';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  function handleButton(route, dataTestId, icon) {
    return (
      <button
        onClick={ () => { history.push(route); } }
        data-testid={ `${dataTestId}-bottom-btn` }
        type="button"
      >
        <img src={ icon } alt={ dataTestId } />
      </button>
    );
  }

  return (
    <footer data-testid="footer">
      {handleButton('/bebidas', 'drinks', drinkIcon)}
      {handleButton('/explorar', 'explore', exploreIcon)}
      {handleButton('/comidas', 'food', mealIcon)}
    </footer>
  );
}

export default Footer;
