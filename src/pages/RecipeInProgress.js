import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import { getFoodById } from '../services/FoodAPI';

const getIngredientsList = (recipe) => {
  const INFERIOR_ING_LIMIT = 9;
  const SUPERIOR_ING_LIMIT = 29;
  const SUPERIOR_MEA_LIMIT = 49;
  const ingedientValues = (Object.values(recipe)).slice(
    INFERIOR_ING_LIMIT, SUPERIOR_ING_LIMIT,
  );
  const measuresValues = (Object.values(recipe)).slice(
    SUPERIOR_ING_LIMIT, SUPERIOR_MEA_LIMIT,
  );
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
            { `${ingredient} - ${measuresValues[index]}` }
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
  const [recipe, setRecipe] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getMealById = async () => {
      const data = await getFoodById(params.id);
      setRecipe(data.meals[0]);
      setIsLoading(false);
    };
    if (isLoading) getMealById();
  }, [recipe, params, isLoading]);

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
                src={ recipe.strMealThumb }
                width="360"
                className="figure-img img-fluid rounded"
                alt="Recipe"
              />
            </figure>
            <h1
              data-testid="recipe-title"
            >
              { recipe.strMeal }
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
              { getIngredientsList(recipe) }
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

export default RecipeInProgress;
