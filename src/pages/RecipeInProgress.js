import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import { getFoodById } from '../services/FoodAPI';
import { getDrinkById } from '../services/DrinksAPI';

const getIngredientsList = (recipe, handleIngredientsCheckBox) => {
  const ingredientsValues = [];
  const measuresValues = [];
  Object.keys(recipe).forEach((key) => {
    if (key.startsWith('strIngredient')) {
      ingredientsValues.push(recipe[key]);
    }
    if (key.startsWith('strMeasure')) {
      measuresValues.push(recipe[key]);
    }
  });
  const ingredientsCheckBox = [];
  ingredientsValues.forEach((ingredient, index) => {
    if (ingredient && ingredient.length) {
      ingredientsCheckBox.push(
        <label
          className="form-check-label"
          htmlFor={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            className="form-check-input"
            onClick={ (event) => handleIngredientsCheckBox(event) }
            type="checkbox"
            id={ index }
          />
          { `${ingredient} - ${measuresValues[index] || 'To taste'}` }
        </label>,
      );
    }
  });
  return ingredientsCheckBox.map(
    (checkBox, index) => (<div key={ `id${index}` }>{ checkBox }</div>),
  );
};

const RecipeInProgress = ({ match }) => {
  const { params } = match;
  const { id } = params;
  let recipeType = ((match.url).split('/'))[1];
  recipeType = recipeType === 'comidas' ? 'Meal' : 'Drink';
  const [recipe, setRecipe] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRecipeByType = async () => {
      let data = {};
      if (recipeType === 'Meal') {
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

  const handleIngredientsCheckBox = ({ target }) => {
    const stripedClass = 'line-through';
    const currentClass = target.parentElement.style.textDecoration;
    target.parentElement.style.textDecoration = stripedClass === currentClass
      ? 'none' : stripedClass;
  };

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
              <div className="form-check">
                { getIngredientsList(recipe, handleIngredientsCheckBox) }
              </div>
            </div>
            <div
              className="container-fluid"
              data-testid="instructions"
            >
              <br />
              <h4>Instructions</h4>
              { recipe.strInstructions }
            </div>
            <FavoriteButton
              recipe={ recipe }
              recipeType={ recipeType }
              data-testid="favorite-btn"
            />
          </div>
        )}
      <ShareButton
        data-testid="share-btn"
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
