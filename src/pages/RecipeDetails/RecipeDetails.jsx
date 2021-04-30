import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchDrinkNameAPI } from '../../services/fetchDrinkAPI';
import RecipeCard from '../../common/components/RecipeCard';

function RecipeDetails(props) {
  const { history: { location: { state: data } } } = props;
  const [recommended, setRecommended] = useState([]);
  const dois = 2;
  const recipe = {
    state: data,
  };

  async function fetchRecommended() {
    await fetchDrinkNameAPI('').then((response) => setRecommended(response.drinks));
  }

  useEffect(() => {
    fetchRecommended();
  }, []);

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
      { console.log(state.strMealThumb) }
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
        <h4>Video</h4>
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
        <div>
          { recommended && recommended
            .slice(0, dois)
            .map((drink, index) => (
              <RecipeCard
                key={ index }
                data-testid={ `${index}-recomendation-card` }
                recipe={ drink }
              />
            ))}
        </div>
      </div>
      <button data-testid="start-recipe-btn" type="button">Start Recipe</button>
    </div>
  );

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
