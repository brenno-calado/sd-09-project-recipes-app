import React, { useContext } from 'react';
import RecipeCard from './RecipeCard';
import RecipesContext from '../Provider/RecipesContext';

function FoodsList() {
  const { foodsList } = useContext(RecipesContext);
  const foodsToBeShow = 12;
  const visibleFoods = foodsList.slice(0, foodsToBeShow);
  return (
    <div>
      {visibleFoods.map(
        (food, index) => (
          <RecipeCard
            key={ food.idMeal }
            recipe={ food }
            index={ index }
            recipeType="meals"
          />
        ),
      )}
    </div>
  );
}

export default FoodsList;
