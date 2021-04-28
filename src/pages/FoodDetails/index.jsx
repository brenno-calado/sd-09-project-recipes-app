import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../../services';

export default function FoodDetails({ match: { params } }) {
  const [details, setDetails] = useState(null);

  const { id } = params;

  useEffect(() => {
    fetchApi('food', 'details', id).then((res) => setDetails(res.meals[0]));
  }, [id]);

  return (
    <section>
      <img
        src={ details ? details.strMealThumb : '' }
        alt="recipe"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title"> recipe title </h1>
      <section>
        <button type="button" data-testid="share-btn">share</button>
        <button type="button" data-testid="favorite-btn">favorite</button>
      </section>
      <p data-testid="recipe-category">category text</p>
      <ul>
        {/* <li data-testid={ `${index}-ingredient-name-and-measure` }>
        ingredients list</li> */}
      </ul>
      <p data-testid="instructions">{ details ? details.strInstructions : '' }</p>
      <iframe
        src={ details ? details.strYoutube : '' }
        data-testid="video"
        title="video"
      />
      {/* <section data-testid={ `${index}-recomendation-card` }>Card</section> */}
      <button type="button" data-testid="start-recipe-btn">start</button>
    </section>
  );
}

FoodDetails.propTypes = {
  id: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};
