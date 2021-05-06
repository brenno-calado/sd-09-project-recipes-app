import React, { useContext } from 'react';
import RecipeCard from './RecipeCard';
import RecipesContext from '../Provider/RecipesContext';

function FoodsList() {
  const { foodsList, fetchingFoods } = useContext(RecipesContext);
  const foodsToBeShow = 12;
  const visibleFoods = foodsList.slice(0, foodsToBeShow);
  if (fetchingFoods) return <h1>Loading...</h1>;
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
