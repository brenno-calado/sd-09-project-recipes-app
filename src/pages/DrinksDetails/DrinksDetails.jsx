import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMealNameAPI } from '../../services/fetchMealAPI';
import RecipeCard from '../../common/components/RecipeCard';

function DrinkDetails(props) {
  const { history: { location: { state: data } } } = props;
  const [recommended, setRecommended] = useState([]);
  const dois = 2;
  const recipe = {
    state: data,
  };

  console.log(data);
  async function fetchRecommended() {
    await fetchMealNameAPI('').then((response) => setRecommended(response.meals));
  }

  useEffect(() => {
    fetchRecommended();
  }, []);

  function showDetails() {
    const { state } = recipe;
    const maxIngredient = 21;
    let ingredients = [];
    for (let index = 1; index < maxIngredient; index += 1) {
      if (state[`strIngredient${index}`]) {
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

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ state.strDrinkThumb }
        alt="recipeImg"
        width="350px"
      />
      <div>
        <h1 data-testid="recipe-title">{ state.strDrink }</h1>
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
        <h4>Recommended Recipes</h4>
        <div>
          { recommended && recommended
            .slice(0, dois)
            .map((meal, index) => (
              <RecipeCard
                key={ index }
                data-testid={ `${index}-recomendation-card` }
                recipe={ meal }
              />
            ))}
        </div>
      </div>
      <button data-testid="start-recipe-btn" type="button">Start Recipe</button>
    </div>
  );
}

DrinkDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
  recipe: PropTypes.shape({
    filter: PropTypes.func,
    includes: PropTypes.func,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    srtCategory: PropTypes.string,
    srtInstructions: PropTypes.string,
    srtSource: PropTypes.string,
    srtMeasure: PropTypes.string,
  }).isRequired,
};

export default DrinkDetails;
