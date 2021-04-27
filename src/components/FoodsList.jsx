import React, { useContext } from 'react';
import FoodCard from './FoodCard';
import RecipesContext from '../Provider/RecipesContext';

function FoodsList() {
  const { foodsList } = useContext(RecipesContext);
  const foodsToBeShow = 12;
  const visibleFoods = foodsList.slice(0, foodsToBeShow);
  return (
    <div>
      {visibleFoods.map(
        (food, index) => (
          <FoodCard key={ food.idMeal } food={ food } index={ index } />
        ),
      )}
    </div>
  );
}

export default FoodsList;
