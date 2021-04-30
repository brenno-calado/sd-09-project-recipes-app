import React from 'react';
import PropTypes from 'prop-types';
// import { fetchMealsAcompaniments, fetchDrinksAcompaniments } from '../services/api';
import { getPageFromURL, getYouTubeLink } from '../services/others';

function Details({ detailsContext }) {
  const { recipe, recomendedList } = detailsContext;
  function getIngredientsLiElements() {
    const maxIngredients = 20;
    const ingredientsList = [];
    for (let index = 1; index < maxIngredients; index += 1) {
      if (recipe[`strIngredient${index}`]) {
        ingredientsList[index] = (
          <li data-testid={ `${index - 1}-ingredient-name-and-measure` } key={ index }>
            {`${recipe[`strIngredient${index}`]} - ${recipe[`strMeasure${index}`]}`}
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
    <div>
      { getPageFromURL() ? (
        <h2 data-testid="recipe-title" className="detail-img">{recipe.strMeal}</h2>)
        : (<h2 data-testid="recipe-title" className="detail-img">{recipe.strDrink}</h2>)}
      { getPageFromURL() ? (<p data-testid="recipe-category">{recipe.strCategory}</p>)
        : (<p data-testid="recipe-category">{recipe.strAlcoholic}</p>)}
      { getPageFromURL() ? (
        <img data-testid="recipe-photo" src={ recipe.strMealThumb } alt="img" />)
        : (<img data-testid="recipe-photo" src={ recipe.strDrinkThumb } alt="img" />)}
      <br />
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite it</button>
      <h4>ingredients</h4>
      <div>
        <ul>
          {getIngredientsLiElements()}
        </ul>
      </div>
      <div>
        <h4>Instructions</h4>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <section>
        <h2>Recomended Recipes</h2>
        {recomendedList ? <p>Loading...</p> : <p>Lista vazia</p> }
        {/* O card de receitas recomendadas deve possuir o */}
        {/* atributo data-testid="${index}-recomendation-card" */}
      </section>
      { getPageFromURL() && (
        <iframe
          data-testid="video"
          title="video"
          width="700"
          height="500"
          src={ getYouTubeLink(recipe) }
          allow="autoplay; encrypted-media"
        />
      )}
      <br />
      <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
    </div>
  );
}

Details.propTypes = { detailsContext: PropTypes.object }.isRequired;

export default Details;
