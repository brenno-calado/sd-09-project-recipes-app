import React, { useContext } from 'react';
import RecipeCard from './RecipeCard';
import RecipesContext from '../Provider/RecipesContext';

function DrinksList() {
  const { drinksList } = useContext(RecipesContext);
  const drinksToBeShow = 12;
  const visibleDrinks = drinksList.slice(0, drinksToBeShow);
  return (
    <div>
      {visibleDrinks.map(
        (drink, index) => (
          <RecipeCard
            key={ drink.idDrink }
            recipe={ drink }
            index={ index }
            recipeType="drinks"
          />
        ),
      )}
    </div>
  );
}

export default DrinksList;
