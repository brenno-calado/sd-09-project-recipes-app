import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import MyContext from '../../../context/context';

function SurpriseMeBtn() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { randomMealIdFilter, randomDrinkIdFilter } = useContext(MyContext);

  const createSurprisePathname = () => {
    let mealOrDrink = '';
    if (pathname === '/explorar/comidas') {
      mealOrDrink = `/comidas/${randomMealIdFilter}`;
      return mealOrDrink;
    }
    if (pathname === '/explorar/bebidas') {
      mealOrDrink = `/bebidas/${randomDrinkIdFilter}`;
      return mealOrDrink;
    }
  };

  return (
    <button
      type="button"
      data-testid="explore-surprise"
      className="basic-btn"
      onClick={ () => history.push(createSurprisePathname()) }
    >
      Me Surpreenda!
    </button>
  );
}

export default SurpriseMeBtn;
