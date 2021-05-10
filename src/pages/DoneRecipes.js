import React, { useState } from 'react';
import Header from '../components/Header';
import DoneRecipesList from '../components/DoneRecipesList';

const DoneRecipes = () => {
  const storage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [recipes, setRecipes] = useState(storage);
  return (
    <div>
      <Header title="Receitas Feitas" />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setRecipes(storage) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setRecipes(storage
            .filter((recipe) => recipe.type === 'comida')) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setRecipes(storage
            .filter((recipe) => recipe.type === 'bebida')) }
        >
          Drinks
        </button>
      </div>
      <div>
        { recipes.map((recipe, index) => (
          <DoneRecipesList key={ recipe.id } recipe={ recipe } index={ index } />
        )) }
      </div>
    </div>
  );
};

export default DoneRecipes;
