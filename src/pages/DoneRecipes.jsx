import React, { useState } from 'react';
import Header from '../components/Header';
import DoneRecipesFilters from '../components/DoneRecipesFilters';
import DoneRecipesCard from '../components/DoneRecipesCard';

function DoneRecipes() {
  const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [visibleRecipes, setVisibleRecipes] = useState(doneRecipesList);

  return (
    <div>
      <Header title="Receitas Feitas" />
      <DoneRecipesFilters
        doneRecipesList={ doneRecipesList }
        setVisibleRecipes={ setVisibleRecipes }
      />
      { visibleRecipes.map((doneRecipe, index) => (
        <DoneRecipesCard key={ doneRecipe.id } recipe={ doneRecipe } index={ index } />
      ))}
    </div>
  );
}

export default DoneRecipes;
