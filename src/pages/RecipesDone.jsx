import React, { useState } from 'react';
import './RecipesDone.css';
import { Button } from 'react-bootstrap';
import RecipesDoneCards from '../components/RecipesDoneCards';

function RecipesDone() {
  const recipesDoneList = JSON.parse(localStorage.getItem('doneRecipes'));
  const [mainRecipesDoneList] = useState(recipesDoneList);
  const [filteredRecipesDoneList, setFilteredRecipesDoneList] = useState(recipesDoneList);

  function filterListByType(type) {
    if (!mainRecipesDoneList) {
      return alert('Nenhuma receita está concluída - não há filtros disponiveis');
    }
    if (type === 'all') {
      setFilteredRecipesDoneList(mainRecipesDoneList);
    } else {
      const newList = mainRecipesDoneList.filter((recipe) => recipe.type === type);
      setFilteredRecipesDoneList(newList);
    }
  }

  return (
    <section>
      <h1>Recipes Done</h1>
      <hr />
      <div className="buttons-section">
        <Button
          type="button"
          data-testid="filter-by-all-btn"
          color="primary"
          onClick={ () => filterListByType('all') }
        >
          All
        </Button>
        <Button
          type="button"
          data-testid="filter-by-drink-btn"
          color="primary"
          onClick={ () => filterListByType('bebida') }
        >
          Drink
        </Button>
        <Button
          type="button"
          data-testid="filter-by-food-btn"
          color="primary"
          onClick={ () => filterListByType('comida') }
        >
          Food
        </Button>
      </div>
      <RecipesDoneCards recipesDoneList={ filteredRecipesDoneList } />
    </section>
  );
}

export default RecipesDone;
