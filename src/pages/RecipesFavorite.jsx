import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import RecipesDoneCards from '../components/RecipesDoneCards';

function RecipesFavorite() {
  const favoriteList = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [mainRecipesFavoriteList] = useState(favoriteList);
  const [filterRecipesFavList, setFilterRecipesFavList] = useState(favoriteList);

  function filterListByType(type) {
    if (!mainRecipesFavoriteList) {
      return alert('Nenhuma receita favoritada - não há filtros disponiveis');
    }
    if (type === 'all') {
      setFilterRecipesFavList(mainRecipesFavoriteList);
    } else {
      const newList = mainRecipesFavoriteList.filter((recipe) => recipe.type === type);
      setFilterRecipesFavList(newList);
    }
  }

  return (
    <section>
      <h1>Favorites Recipes</h1>
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
      <RecipesDoneCards
        recipesDoneList={ filterRecipesFavList }
        doneOrFavorite={ { typeRecipe: 'favorite' } }
      />
    </section>
  );
}

export default RecipesFavorite;
