import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import { getFoodById } from '../services/FoodAPI';
import { getDrinkById } from '../services/DrinksAPI';

const getIngredientsList = (recipe, recipeType) => {
  const MEAL_ING_LIMIT_INF = 9;
  const MEAL_ING_LIMIT_SUP = 29;
  const MEAL_MEA_LIMIT_SUP = 49;
  const DRINK_ING_LIMIT_INF = 17;
  const DRINK_ING_LIMIT_SUP = 32;
  const DRINK_MEA_LIMIT_SUP = 47;
  let ingedientValues = [];
  let measuresValues = [];
  if (recipeType === 'meal') {
    ingedientValues = (Object.values(recipe)).slice(
      MEAL_ING_LIMIT_INF, MEAL_ING_LIMIT_SUP,
    );
    measuresValues = (Object.values(recipe)).slice(
      MEAL_ING_LIMIT_SUP, MEAL_MEA_LIMIT_SUP,
    );
  } else {
    ingedientValues = (Object.values(recipe)).slice(
      DRINK_ING_LIMIT_INF, DRINK_ING_LIMIT_SUP,
    );
    measuresValues = (Object.values(recipe)).slice(
      DRINK_ING_LIMIT_SUP, DRINK_MEA_LIMIT_SUP,
    );
  }
  const ingredientsCheckBox = [];
  ingedientValues.forEach((ingredient, index) => {
    if (ingredient && ingredient.length) {
      ingredientsCheckBox.push(
        <div className="form-check">
          <label
            className="form-check-label"
            htmlFor="flexCheckDefault"
          >
            <input
              className="form-check-input"
              type="checkbox"
              value="teste"
              data-testid={ `${index}-ingredient-step` }
              id="flexCheckDefault"
            />
            { `${ingredient} - ${measuresValues[index] || 'To taste'}` }
          </label>
        </div>,
      );
    }
  });
  return ingredientsCheckBox.map(
    (checkBox, index) => (<div key={ `id${index}` }>{ checkBox }</div>));
};

const RecipeInProgress = ({ match }) => {
  const { params } = match;
  const { id } = params;
  let recipeType = ((match.url).split('/'))[1];
  recipeType = recipeType === 'comidas' ? 'meal' : 'drink';
  const [recipe, setRecipe] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRecipeByType = async () => {
      let data = {};
      if (recipeType === 'meal') {
        data = await getFoodById(id);
        setRecipe(data.meals[0]);
      } else {
        data = await getDrinkById(id);
        setRecipe(data.drinks[0]);
      }
      setIsLoading(false);
    };
    if (isLoading) getRecipeByType();
  }, [recipe, params, isLoading, id, recipeType]);

  return (
    <div>
      { isLoading
        ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )
        : (
          <div>
            <figure className="figure" data-testid="recipe-photo">
              <img
                src={ recipe.strMealThumb || recipe.strDrinkThumb }
                width="360"
                className="figure-img img-fluid rounded"
                alt="Recipe"
              />
            </figure>
            <h1
              data-testid="recipe-title"
            >
              { recipe.strMeal || recipe.strDrink}
            </h1>
            <h4
              className="text-secondary"
              data-testid="recipe-category"
            >
              { recipe.strCategory }
            </h4>
            <br />
            <div className="container-fluid">
              <h4>Ingredients</h4>
              { getIngredientsList(recipe, recipeType) }
            </div>
            <div
              className="container-fluid"
              data-testid="instructions"
            >
              <br />
              <h4>Instructions</h4>
              { recipe.strInstructions }
            </div>
          </div>
        )}
      <ShareButton
        data-testid="share-btn"
      />
      <FavoriteButton
        data-testid="favorite-btn"
      />
      <br />
      <Button
        block
        data-testid="finish-recipe-btn"
      >
        Finalizar Receita
      </Button>
    </div>
  );
};
RecipeInProgress.propTypes = {
  match: PropTypes.shape().isRequired,
};
export default RecipeInProgress;
