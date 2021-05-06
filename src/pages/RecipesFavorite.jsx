import React from 'react';
import { Button } from 'react-bootstrap';
import RecipesDoneCards from '../components/RecipesDoneCards';
import useRecipeFav from '../hooks/useRecipeFav';

function RecipesFavorite() {
  const [mainRecipesFavList, setMainRecipesFilter] = useRecipeFav();
  function filterListByType(type) {
    if (!mainRecipesFavList) {
      return alert('Nenhuma receita favoritada - não há filtros disponiveis');
    }
    setMainRecipesFilter({ shouldFilter: true, type });
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
        recipesDoneList={ mainRecipesFavList }
        doneOrFavorite={ { typeRecipe: 'favorite' } }
      />
    </section>
  );
}

export default RecipesFavorite;
