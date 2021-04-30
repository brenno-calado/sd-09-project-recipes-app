import React from 'react';
import PropTypes from 'prop-types';

function RecipeDetails(props) {
  const { history: { location: { state: data } } } = props;
  const recipe = {
    state: data,
  };

  function showDetails() {
    const { state } = recipe;
    const maxIngredient = 21;
    let ingredients = [];
    for (let index = 1; index < maxIngredient; index += 1) {
      if (state[`strIngredient${index}`] !== '') {
        ingredients = [...ingredients, (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {state[`strIngredient${index}`]}
            -
            {state[`strMeasure${index}`]}
          </li>
        )];
      }
    }
    return <ul>{ingredients}</ul>;
  }

  // function renderRecommendedRecipes() {
  //   return console.log(null);
  //   // data-testid="${index}-recomendation-card")
  // }

  const { state } = recipe;
  const recipeURL = state.strYoutube;
  const recipeEndPoint = recipeURL.split('.com/');

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ state.strMealThumb }
        alt="recipeImg"
        width="350px"
      />
      <div>
        <h1 data-testid="recipe-title">{ state.strMeal }</h1>
        <h5 data-testid="recipe-category">
          Category:
          { state.strCategory }
        </h5>
        <button data-testid="share-btn" type="button">Share</button>
        <button data-testid="favorite-btn" type="button">♡</button>
      </div>
      <div>
        <h4>Instructions</h4>
        <p data-testid="instructions">{ state.strInstructions }</p>
      </div>
      <div>
        <h4>Ingredients</h4>
        { showDetails() }
      </div>
      <div>
        <iframe
          data-testid="video"
          width="420"
          height="315"
          src={ `https://www.youtube.com/embed/${recipeEndPoint[1]}` }
          title="recipeVideo"
        />
      </div>
      <div>
        <h4>Recommended Recipes</h4>
        {/* { renderRecommendedRecipes() } */}
      </div>
      <button data-testid="start-recipe-btn" type="button">Start Recipe</button>
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
  recipe: PropTypes.shape({
    filter: PropTypes.func,
    includes: PropTypes.func,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    srtCategory: PropTypes.string,
    srtInstructions: PropTypes.string,
    srtSource: PropTypes.string,
    srtMeasure: PropTypes.string,
  }).isRequired,
};

export default RecipeDetails;
