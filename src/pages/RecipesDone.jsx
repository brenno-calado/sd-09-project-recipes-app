import React, { useState } from 'react';
import './RecipesDone.css';
import { Button } from 'react-bootstrap';
import RecipesDoneCards from '../components/RecipesDoneCards';

const doneRecipe = {
  id: '52765',
  type: 'comida',
  area: 'Mexican',
  category: 'Chicken',
  alcoholicOrNot: '',
  name: 'Chicken Enchilada Casserole',
  image: 'https://www.themealdb.com/images/media/meals/qtuwxu1468233098.jpg',
  doneDate: '',
  tags: 'Casserole,Cheasy,Meat',
};

function handleToStorage(objectToSave) {
  const foundInStorage = JSON.parse(localStorage.getItem('doneRecipes'));
  let favoriteListStorage = [];
  if (foundInStorage) {
    favoriteListStorage = [...foundInStorage, objectToSave];
  } else {
    favoriteListStorage.push(objectToSave);
  }
  localStorage.setItem('doneRecipes', JSON.stringify(favoriteListStorage));
}

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
      <button type="button" onClick={ () => handleToStorage(doneRecipe) }>
        ADD STORAGE
      </button>
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
