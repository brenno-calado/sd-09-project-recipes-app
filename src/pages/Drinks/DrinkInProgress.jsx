import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchDrinkById } from '../../services/fetchDrinkAPI';
import ShareLikeButtons from '../../common/components/buttons/ShareLikeButtons';
import '../../common/styles/detailsStyles.css';

function DrinkInProgress(props) {
  const { match: { url, params: { id } } } = props;
  const [drink, setDrink] = useState();
  const idDrink = id;

  useEffect(() => {
    async function fetchData() {
      await fetchDrinkById(idDrink).then((response) => setDrink(response.drinks[0]));
    }
    fetchData();
  }, [idDrink, id]);

  function renderIngredients() {
    const maxIngredient = 21;
    let ingredients = [];
    for (let index = 1; index < maxIngredient; index += 1) {
      if (drink[`strIngredient${index}`]) {
        ingredients = [...ingredients, (
          <li key={ index } data-testid={ `${index - 1}-ingredient-step` }>
            <label htmlFor={ drink[`strIngredient${index}`] }>
              <input
                type="checkbox"
                name={ drink[`strIngredient${index}`] }
                id={ drink[`strIngredient${index}`] }
              />
              {drink[`strIngredient${index}`]}
              -
              {drink[`strMeasure${index}`]}
            </label>
          </li>
        )];
      }
    }
    return <ul style={ { listStyleType: 'none', padding: 0 } }>{ingredients}</ul>;
  }

  function renderDrink() {
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ drink.strDrinkThumb }
          alt="recipeImg"
          width="350px"
        />
        <div className="header-container">
          <div>
            <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
            <h5 data-testid="recipe-category">
              Category:
              { drink.strAlcoholic }
            </h5>
          </div>
          <ShareLikeButtons recipe={ drink } type="bebida" url={ url } />
        </div>
        <div>
          <h4>Ingredients</h4>
          { renderIngredients() }
        </div>
        <div>
          <h4>Instructions</h4>
          <p data-testid="instructions">{ drink.strInstructions }</p>
        </div>
        <button
          className="finish-recipe-btn"
          data-testid="finish-recipe-btn"
          type="button"
          // onClick={ finishRecipe }
        >
          Finish Recipe
        </button>
      </div>
    );
  }

  return (
    (drink ? renderDrink() : <p>Loading...</p>)
  );
}

DrinkInProgress.propTypes = {
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

export default DrinkInProgress;
