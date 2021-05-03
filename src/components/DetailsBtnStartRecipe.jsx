import React from 'react';
import './DetailsBtnStartRecipe.css';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function getIngredientsArray(recipeObj) {
  const maxIngredients = 20;
  const ingredientsList = [];
  for (let index = 1; index < maxIngredients; index += 1) {
    if (recipeObj[`strIngredient${index}`]) {
      ingredientsList[index] = `${recipeObj[`strIngredient${index}`]} 
      - ${recipeObj[`strMeasure${index}`]}`;
    }
  }
  return ingredientsList;
}

function DetailsBtnStartRecipe({ btnName, detailsContext }) {
  const { recipe } = detailsContext;
  function handleRecipeStartOrContinue() {
    const arrayOfIngredients = getIngredientsArray(recipe);
    const objectToSave = {};
    let allInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!allInProgress) {
      allInProgress = {};
    }
    if (btnName === 'Iniciar Receita') {
      if (window.location.pathname.includes('comidas')) {
        objectToSave[recipe.idMeal] = arrayOfIngredients;
        allInProgress.meals = { ...allInProgress.meals, ...objectToSave };
      } else {
        objectToSave[recipe.idDrink] = arrayOfIngredients;
        allInProgress.cocktails = { ...allInProgress.cocktails, ...objectToSave };
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(allInProgress));
    }
  }

  return (
    <div className="btnFixed-container">
      <Link to={ `${window.location.pathname}/in-progress` }>
        <Button
          type="button"
          data-testid="start-recipe-btn"
          color="primary"
          className="btnFixed"
          onClick={ handleRecipeStartOrContinue }
        >
          {btnName}
        </Button>
      </Link>
    </div>
  );
}

DetailsBtnStartRecipe.propTypes = { detailsContext: PropTypes.object }.isRequired;

export default DetailsBtnStartRecipe;
