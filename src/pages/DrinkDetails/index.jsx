import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../../services';

export default function DrinkDetails({ match: { params } }) {
  const [details, setDetails] = useState(null);
  const [recomendation, setRecomendation] = useState(null);

  const { id } = params;

  const recomendationDefaultLength = 6;

  useEffect(() => {
    fetchApi('cocktail', 'details', id).then((res) => setDetails(res.drinks[0]));
  }, [id]);

  useEffect(() => {
    fetchApi('food', 'name', '').then((res) => {
      const recomentation = res.meals
        .filter((meal) => res.meals.indexOf(meal) < recomendationDefaultLength);
      setRecomendation(recomentation);
    });
  }, []);

  const ingredientsArray = details && Object.keys(details)
    .filter((ingredientKey) => ingredientKey.includes('strIngredient'))
    .map((strIngredients) => details[strIngredients])
    .filter((ingredient) => ingredient);

  const measureArray = details && Object.keys(details)
    .filter((measureKey) => measureKey.includes('strMeasure'))
    .map((strMeasures) => details[strMeasures])
    .filter((measure) => measure);

  return (
    <section>
      <img
        src={ details && details.strDrinkThumb }
        alt="recipe"
        data-testid="recipe-photo"
      />

      <section>
        <h1 data-testid="recipe-title">{ details && details.strDrink }</h1>
        <div>
          <button type="button" data-testid="share-btn">share</button>
          <button type="button" data-testid="favorite-btn">favorite</button>
        </div>
      </section>
      <h3 data-testid="recipe-category">{ details && details.strCategory }</h3>
      <ul>
        <h4>Ingredients:</h4>
        {
          details && ingredientsArray.map((item, index) => (
            <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              { measureArray[index] }
              &nbsp;
              <strong>{ item }</strong>
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">{ details && details.strInstructions}</p>
      <section>
        {
          recomendation && recomendation.map((recipe, index) => (
            <section key={ index } data-testid={ `${index}-recomendation-card` }>
              <img src={ recipe.strMealThumb } alt="" />
            </section>
          ))
        }
      </section>
      <button type="button" data-testid="start-recipe-btn">start</button>
    </section>
  );
}

DrinkDetails.propTypes = {
  id: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

DrinkDetails.defaultProps = {
  id: '15997',
};
