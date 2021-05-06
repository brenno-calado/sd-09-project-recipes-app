import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMealById } from '../../services/fetchMealAPI';
import ShareLikeButtons from '../../common/components/buttons/ShareLikeButtons';
import '../../common/styles/detailsStyles.css';

function RecipeInProgress(props) {
  const { history, match: { url, params: { id } } } = props;
  const [meal, setMeal] = useState();
  const [newURL, setNewURL] = useState();
  const idMeal = id;

  useEffect(() => {
    async function fetchData() {
      await fetchMealById(idMeal).then((response) => setMeal(response.meals[0]));
    }
    fetchData();
    const path = url.split('/in-progress');
    setNewURL(path[0]);
  }, [idMeal, url]);

  function renderIngredients() {
    const maxIngredient = 21;
    let ingredients = [];
    for (let index = 1; index < maxIngredient; index += 1) {
      if (meal[`strIngredient${index}`]) {
        ingredients = [...ingredients, (
          <li key={ index } data-testid={ `${index - 1}-ingredient-step` }>
            <label htmlFor={ meal[`strIngredient${index}`] }>
              <input
                type="checkbox"
                name={ meal[`strIngredient${index}`] }
                id={ meal[`strIngredient${index}`] }
              />
              {meal[`strIngredient${index}`]}
              -
              {meal[`strMeasure${index}`]}
            </label>
          </li>
        )];
      }
    }
    return <ul style={ { listStyleType: 'none', padding: 0 } }>{ingredients}</ul>;
  }

  function finishHandler() {
    history.push('/receitas-feitas');
  }

  function renderMeal() {
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ meal.strMealThumb }
          alt="recipeImg"
          width="350px"
        />
        <div className="header-container">
          <div>
            <h1 data-testid="recipe-title">{ meal.strMeal }</h1>
            <h5 data-testid="recipe-category">
              Category:
              { meal.strCategory }
            </h5>
          </div>
          <ShareLikeButtons complement="" recipe={ meal } type="bebida" url={ newURL } />
        </div>
        <div>
          <h4>Ingredients</h4>
          { renderIngredients() }
        </div>
        <div>
          <h4>Instructions</h4>
          <p data-testid="instructions">{ meal.strInstructions }</p>
        </div>
        <button
          className="finish-recipe-btn"
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ finishHandler }
        >
          Finish Recipe
        </button>
      </div>
    );
  }

  return (
    (meal ? renderMeal() : <p>Loading...</p>)
  );
}

RecipeInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeInProgress;
