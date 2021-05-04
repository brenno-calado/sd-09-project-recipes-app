import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPageFromURL } from '../services/others';
import { fetchOneMeal, fetchOneDrink } from '../services/api';

function DetailsInProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    async function fetchOne() {
      const urlId = id;
      let found;
      if (getPageFromURL()) {
        found = await fetchOneMeal(urlId);
      } else {
        found = await fetchOneDrink(urlId);
      }
      setRecipe(found[0]);
    }
    fetchOne();
  }, [id]);

  console.log(recipe);

  function renderIngredientsInProgress() {
    const maxIngredients = 20;
    const ingredientsList = [];
    for (let index = 1; index < maxIngredients; index += 1) {
      if (recipe[`strIngredient${index}`]) {
        ingredientsList[index] = (
          <li data-testid={`${index}-ingredient-step`}>
            <input type="checkbox" id={`${index}-ingredient-step`} />
            <label htmlFor={`${index}-ingredient-step`} >
              {`${recipe[`strIngredient${index}`]} - ${recipe[`strMeasure${index}`]}`}
            </label>
          </li>
        );
      }
    }
    return ingredientsList
      .filter((ingr) => ingr.props.children !== null
        && ingr.props.children !== ''
        && ingr.props.children !== undefined);
  }

  return (
    !recipe
      ? <p>loading</p>
      : (
        <div>
          {
            getPageFromURL()
              ? (
                <img data-testid="recipe-photo" src={ recipe.strMealThumb } alt="img" />
              )
              : (
                <img data-testid="recipe-photo" src={ recipe.strDrinkThumb } alt="img" />
              )
          }
          {
            getPageFromURL()
              ? (
                <h2 data-testid="recipe-title" className="detail-img">
                  {recipe.strMeal}
                </h2>
              )
              : (
                <h2 data-testid="recipe-title" className="detail-img">
                  {recipe.strDrink}
                </h2>
              )
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
            <ul className="ingredients-in-progess">
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
      )
  );
}

export default DetailsInProgress;
