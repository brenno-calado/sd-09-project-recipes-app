import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchDrinkNameAPI } from '../../services/fetchDrinkAPI';
import { fetchMealById } from '../../services/fetchMealAPI';
import RecipeCard from '../../common/components/RecipeCard';

function RecipeDetails(props) {
  const { match: { params: { id } } } = props;
  const [recommended, setRecommended] = useState([]);
  const [meal, setMeal] = useState();
  const seis = 6;
  const idMeal = id;

  async function fetchData() {
    await fetchDrinkNameAPI('').then((response) => setRecommended(response.drinks));
    await fetchMealById(idMeal).then((response) => setMeal(response.meals[0]));
  }

  useEffect(() => {
    fetchData();
  }, []);

  function showDetails() {
    const maxIngredient = 21;
    let ingredients = [];
    for (let index = 1; index < maxIngredient; index += 1) {
      if (meal[`strIngredient${index}`]) {
        ingredients = [...ingredients, (
          <li key={ index } data-testid={ `${index - 1}-ingredient-name-and-measure` }>
            {meal[`strIngredient${index}`]}
            -
            {meal[`strMeasure${index}`]}
          </li>
        )];
      }
    }
    return <ul>{ingredients}</ul>;
  }

  function renderMeal() {
    const recipeURL = meal.strYoutube;
    const recipeEndPoint = recipeURL.split('.com/');
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ meal.strMealThumb }
          alt="recipeImg"
          width="350px"
        />
        { console.log(meal.strMealThumb) }
        <div>
          <h1 data-testid="recipe-title">{ meal.strMeal }</h1>
          <h5 data-testid="recipe-category">
            Category:
            { meal.strCategory }
          </h5>
          <button data-testid="share-btn" type="button">Share</button>
          <button data-testid="favorite-btn" type="button">♡</button>
        </div>
        <div>
          <h4>Instructions</h4>
          <p data-testid="instructions">{ meal.strInstructions }</p>
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
              .slice(0, seis)
              .map((drink, index) => (
                <div key={ index } data-testid={ `${index}-recomendation-card` }>
                  <RecipeCard recipe={ drink } />
                </div>
              ))}
          </div>
        </div>
        <button data-testid="start-recipe-btn" type="button">Start Recipe</button>
      </div>
    );
  }

  return (
    (meal ? renderMeal() : <p>Loading...</p>)
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
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
