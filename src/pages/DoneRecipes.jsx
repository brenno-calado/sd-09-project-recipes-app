import React from 'react';
import DoneRecipesFilters from '../components/DoneRecipesFilters';
import DoneRecipesCard from '../components/DoneRecipesCard';

function DoneRecipes() {
  const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <div>
      <DoneRecipesFilters />
      { doneRecipesList.map((doneRecipe, index) => (
        <DoneRecipesCard key={ doneRecipe.id } recipe={ doneRecipe } index={ index } />
      ))}
    </div>
  );
}

export default DoneRecipes;
