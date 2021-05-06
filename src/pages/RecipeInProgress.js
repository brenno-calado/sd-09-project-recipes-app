import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import { getFoodById } from '../services/FoodAPI';
import { getDrinkById } from '../services/DrinksAPI';
import './RecipeInProgress.css';
import { Link } from 'react-router-dom';

const setRecipeToLocalStorage = (recipeInProgress, recipeType) => {
  recipeType = recipeType === 'Meal' ? 'meals' : 'drinks';
  const newRecipeInProgress = { [recipeType]: recipeInProgress };
  localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipeInProgress));
};

const getLocalStorageData = (recipeType, id) => {
  const localInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let recipeTypeSelected = {};
  let newRecipe = { };
  if (recipeType === 'Meal' && localInProgressRecipes) {
    recipeTypeSelected = localInProgressRecipes.meals;
    newRecipe = { ...localInProgressRecipes, ...localInProgressRecipes.meals, [id]: [] };
  } else if (localInProgressRecipes) {
    recipeTypeSelected = localInProgressRecipes.drinks || {};
    newRecipe = {
      ...localInProgressRecipes, ...localInProgressRecipes.drinks, [id]: [] };
  }

  if (!localInProgressRecipes || !(recipeTypeSelected && recipeTypeSelected[id])) {
    setRecipeToLocalStorage(newRecipe, recipeType);
    return newRecipe;
  }
  return recipeTypeSelected;
};

const getIngredientsQuantity = (recipe, recipeInProgress = []) => {
  const doneIngredients = recipeInProgress.length;
  let ingredientsQuantity = -doneIngredients;
  Object.keys(recipe).forEach((key) => {
    if (key.startsWith('strIngredient') && recipe[key] && recipe[key].length) {
      ingredientsQuantity += 1;
    }
  });
  return ingredientsQuantity;
};

const getIngredientsList = (recipe, handleIngredientsCheckBox, recipeInProgress = []) => {
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
    let doneIngredient = '';
    let markChecked = false;
    recipeInProgress.forEach((ingredien) => {
      if (ingredien.value.includes(ingredient)) {
        doneIngredient = 'ingredient-done';
        markChecked = true;
      }
    });
    if (ingredient && ingredient.length) {
      ingredientsCheckBox.push(
        <label
          className={ `form-check-label ${doneIngredient}` }
          htmlFor={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            className="form-check-input"
            onClick={ (event) => handleIngredientsCheckBox(event) }
            type="checkbox"
            defaultChecked={ markChecked }
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

const removeIngredient = (ingredient, recipeInProgress) => {
  let newRecipeInProgress = [];
  recipeInProgress.forEach((storedIngredient, ingredientIndex) => {
    if (storedIngredient.id === ingredient.id) {
      newRecipeInProgress = [...recipeInProgress.slice(0, ingredientIndex),
        ...recipeInProgress.slice(ingredientIndex + 1, recipeInProgress.length)];
    }
  });
  return newRecipeInProgress;
};

const RecipeInProgress = ({ match }) => {
  const { params } = match;
  const { id } = params;
  let recipeType = ((match.url).split('/'))[1];
  const URL = `http://localhost:3000/${recipeType}/${id}`;
  recipeType = recipeType === 'comidas' ? 'Meal' : 'Drink';
  const recipeInProgress = getLocalStorageData(recipeType, id);
  const [recipe, setRecipe] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [recipeIsGoing, setRecipeIsGoing] = useState(true);
  let ingredientsToDo = 0;

  useEffect(() => {
    const getDrinkRecipe = async () => {
      const data = await getDrinkById(id);
      setRecipe(data.drinks[0]);
      setIsLoading(false);
    };

    const getFoodRecipe = async () => {
      const data = await getFoodById(id);
      setRecipe(data.meals[0]);
      setIsLoading(false);
    };

    if (isLoading && recipeType === 'Meal') {
      getFoodRecipe();
    } else if (isLoading) {
      getDrinkRecipe();
    }
  }, [recipe, params, isLoading, id, recipeType]);

  if (!isLoading && recipeInProgress && Object.keys(recipe).length) {
    ingredientsToDo = getIngredientsQuantity(recipe, recipeInProgress[id]);
  }

  const handleIngredientsCheckBox = ({ target }) => {
    const ingredient = { id: target.id, value: target.parentElement.innerText };
    const stripedClass = 'form-check-label ingredient-done';
    const currentClass = target.parentElement.className;
    if (currentClass === stripedClass) {
      target.parentElement.className = 'form-check-label';
      ingredientsToDo += 1;
      recipeInProgress[id] = removeIngredient(ingredient, recipeInProgress[id]);
    } else {
      target.parentElement.className = stripedClass;
      ingredientsToDo -= 1;
      recipeInProgress[id].push(ingredient);
    }
    setRecipeToLocalStorage(recipeInProgress, recipeType);
    if (ingredientsToDo === 0) {
      setRecipeIsGoing(false);
    }
    console.log(ingredientsToDo);
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
                {
                  getIngredientsList(
                    recipe, handleIngredientsCheckBox, recipeInProgress[id],
                  )
                }
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
        URL={ URL }
      />
      <br />
      <Link to="/receitas-feitas">
        <Button
          block
          disabled={ recipeIsGoing }
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </Button>
      </Link>
    </div>
  );
};
RecipeInProgress.propTypes = {
  match: PropTypes.shape().isRequired,
};
export default RecipeInProgress;
