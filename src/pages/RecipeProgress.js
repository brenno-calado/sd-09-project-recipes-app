import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import { fetchApi } from '../services/api';
import {
  saveRecipeInProgress,
  loadRecipesInProgress,
  saveDoneRecipe,
} from '../services/storage';
import paths from '../routes/paths';

const RecipeProgress = ({ match: { params } }) => {
  const { id } = params;
  const location = useLocation();
  const isFoodPage = location.pathname.includes('comida');
  const storageTypeKey = isFoodPage ? 'meals' : 'cocktails';
  const stateProgress = loadRecipesInProgress(storageTypeKey)[id] || {};

  const [recipe, setRecipe] = useState(false);
  const [progress, setProgress] = useState(stateProgress);

  const ingredients = Object.keys(recipe)
    .filter((key) => (key.includes('Ingredient') && recipe[key]));

  const isFinishButtonDisabled = !Object.values(progress).every((done) => done)
    || Object.keys(progress).length < ingredients.length;

  const history = useHistory();
  const { DONE_RECIPES } = paths;
  const setRecipeAsDone = () => {
    saveDoneRecipe(recipe);
    history.push(DONE_RECIPES);
  };

  useEffect(() => {
    const fetchById = async () => {
      const fetchDetails = await fetchApi(
        { i: id, isDetails: true, isFoodsPage: isFoodPage },
      );
      const key = Object.keys(fetchDetails)[0];
      return fetchDetails[key]['0'];
    };
    fetchById().then((recipeResponse) => setRecipe(recipeResponse));
  }, []);

  useEffect(() => {
    saveRecipeInProgress(storageTypeKey, id, progress);
  }, [progress]);

  if (!recipe) {
    return <div>Carregando</div>;
  }

  const recipeData = {
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strDrinkThumb || recipe.strMealThumb,
    instructions: recipe.strInstructions,
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
  };

  const handleDoneIngredient = ({ target }) => {
    if (target.checked) {
      target.nextSibling.style = 'text-decoration: line-through;';
    } else {
      target.nextSibling.style = '';
      target.checked = false;
    }
    setProgress((currentState) => ({
      ...currentState,
      [target.value]: target.checked,
    }));
  };

  const renderIngredients = () => (
    ingredients.map((key, index) => {
      const ingredientName = recipe[key];
      const ingredientMeasure = recipe[`strMeasure${index + 1}`];
      return (
        <li key={ index }>
          <label htmlFor="ingredient" data-testid={ `${index}-ingredient-step` }>
            <input
              type="checkbox"
              name=""
              value={ index }
              onClick={ handleDoneIngredient }
              defaultChecked={ progress[index] }
            />
            <span>
              { ingredientName }
              { ingredientMeasure && ` - ${ingredientMeasure}` }
            </span>
          </label>
        </li>
      );
    }));

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ recipeData.image }
        alt="recipePhoto"
        style={ { height: 200 } }
      />
      <h1 data-testid="recipe-title">{ recipeData.name }</h1>

      <ShareButton isFoodPage={ isFoodPage } recipeId={ id } testId="share-btn" />
      <FavoriteButton recipe={ recipe } testId="favorite-btn" />

      <h4 data-testid="recipe-category">
        { recipeData.alcoholicOrNot || recipeData.category }
      </h4>

      <h2>Ingredientes</h2>
      <ul>{ renderIngredients() }</ul>

      <h2>Instruções</h2>
      <p data-testid="instructions">{ recipeData.instructions }</p>

      <button
        className="finish-recipe-btn"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isFinishButtonDisabled }
        onClick={ () => setRecipeAsDone() }
      >
        Finalizar Receita
      </button>
    </>
  );
};

export default RecipeProgress;

RecipeProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.string,
  }).isRequired,
};
