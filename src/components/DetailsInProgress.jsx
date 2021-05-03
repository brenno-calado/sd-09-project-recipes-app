import React from 'react';
import { getPageFromURL } from '../services/others';
import mockMeals from '../mock/mockMeals.json';

function DetailsInProgress() {
  // pegar id pelo .find
  function renderIngredientsInProgress() {
    const maxIngredients = 20;
    const ingredientsList = mockmeals.meals[0];
    ingredientsList.map((ingredient, index) => {
      if (recipe[`strIngredient${index}`]) {
        ingredientsList[index] = (
          <label htmlFor={ `${index}` }>
            <input type="checkbox" id={ `${index}` } data-testid={ `${index - 1}-ingredient-name-and-measure` } key={ index } />
            <span>{`${recipe[`strIngredient${index}`]} - ${recipe[`strMeasure${index}`]}`}</span>
          </label>
        );
      }
    });

    return ingredientsList
      .filter((ingr) => ingr.props.children !== null
        && ingr.props.children !== ''
        && ingr.props.children !== undefined);
  }

  return (
    <div>
      {
        getPageFromURL() ? (
          <img data-testid="recipe-photo" src={ recipe.strMealThumb } alt="img" />)
          : (<img data-testid="recipe-photo" src={ recipe.strDrinkThumb } alt="img" />)
      }
      {
        getPageFromURL() ? (
          <h2 data-testid="recipe-title" className="detail-img">{recipe.strMeal}</h2>)
          : (<h2 data-testid="recipe-title" className="detail-img">{recipe.strDrink}</h2>)
      }
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      {
        getPageFromURL() ? (
          <p data-testid="recipe-category">{recipe.strCategory}</p>)
          : (<p data-testid="recipe-category">{recipe.strAlcoholic}</p>)
      }
      <h4>Ingredients</h4>
      <div>
        <ul>
          { renderIngredientsInProgress() }
        </ul>
      </div>
      <div>
        <h4>Instructions</h4>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <br />
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

export default DetailsInProgress;
