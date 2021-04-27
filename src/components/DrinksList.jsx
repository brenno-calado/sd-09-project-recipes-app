import React, { useContext } from 'react';
import DrinkCard from './DrinkCard';
import RecipesContext from '../Provider/RecipesContext';

function DrinksList() {
  const { drinksList } = useContext(RecipesContext);
  console.log(drinksList);
  const drinksToBeShow = 12;
  const visibleDrinks = drinksList.slice(0, drinksToBeShow);
  return (
    <div>
      {visibleDrinks.map(
        (drink, index) => (
          <DrinkCard key={ drink.idDrink } drink={ drink } index={ index } />
        ),
      )}
    </div>
  );
}

export default DrinksList;
