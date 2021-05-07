import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import IngredientList from '../components/IngredientList';
import { getRecipeAndParseById } from '../services/api';

import ShareButton from '../components/ShareRecipeButton';
import FavoriteRecipeButton from '../components/FavoriteRecipeButton';

export default function RecipeInProgress() {
  const [recipe, setRecipe] = useState();
  const [finalizedRecipe, setFinalizedRecipe] = useState(true);
  const { id } = useParams();

  const { pathname } = useLocation();
  const isMealsPage = pathname.split('/')[1] === 'comidas';

  useEffect(() => {
    getRecipeAndParseById(id, isMealsPage).then((recipeItem) => {
      setRecipe({
        ...recipeItem,
        alcoholicOrNot: recipeItem.alcoholic ? 'Alcoholic' : '',
      });
    });
  }, [id, isMealsPage]);

  if (!recipe) return <h3>Carregando...</h3>;

  return (
    <div>
      <img
        width="300"
        data-testid="recipe-photo"
        src={ recipe.image }
        alt="Imagem da receita"
      />
      <h2 data-testid="recipe-title">{recipe.name}</h2>
      <ShareButton dataTestid="share-btn" isMeal={ isMealsPage } recipeId={ id } />
      <FavoriteRecipeButton recipe={ recipe } dataTestid="favorite-btn" />
      <h4 data-testid="recipe-category">{recipe.category}</h4>
      <IngredientList
        ingredients={ recipe.ingredients }
        recipeId={ id }
        isMeal={ isMealsPage }
        onChangeItem={ setFinalizedRecipe }
      />
      <section data-testid="instructions">
        <h3>Instruções</h3>
        <p>{recipe.instructions}</p>
      </section>
      <Link to="/receitas-feitas">
        <button
          disabled={ !finalizedRecipe }
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finalizar
        </button>
      </Link>
    </div>
  );
}
