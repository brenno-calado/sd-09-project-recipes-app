import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../../services';

export default function FoodDetails({ match: { params } }) {
  const [details, setDetails] = useState(null);

  const { id } = params;

  useEffect(() => {
    fetchApi('food', 'details', id).then((res) => setDetails(res.meals[0]));
  }, [id]);

  const ingredientsArray = details && Object.keys(details)
    .filter((ingredientKey) => ingredientKey.includes('strIngredient'))
    .map((strIngredients) => details[strIngredients])
    .filter((ingredient) => ingredient);

  return (
    <section>
      <img
        src={ details && details.strMealThumb }
        alt="recipe"
        data-testid="recipe-photo"
      />

      <section>
        <h1 data-testid="recipe-title">{ details && details.strMeal }</h1>
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
              { item }
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">{ details && details.strInstructions}</p>
      <iframe
        src={ details && details.strYoutube }
        data-testid="video"
        title="video"
      />
      {/* <section data-testid={ `${index}-recomendation-card` }>Card</section> */}
      <button type="button" data-testid="start-recipe-btn">start</button>
    </section>
  );
}

FoodDetails.propTypes = {
  id: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

FoodDetails.defaultProps = {
  id: '52832',
};
