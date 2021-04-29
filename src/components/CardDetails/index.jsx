import { string, arrayOf, shape, bool } from 'prop-types';
import React from 'react';

function CardDetails({
  image, title, video, categoryText, instructions,
  shouldVideoApear, children, isAlcoholic }) {
  return (
    <li>
      <img
        src={ image }
        data-testid="recipe-photo"
        alt={ title }
      />
      <h2 data-testid="recipe-title">{ title }</h2>
      {!shouldVideoApear && <p data-testid="recipe-category">{isAlcoholic}</p>}
      <button
        data-testid="share-btn"
        type="button"
      >
        Compartilhar
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        Favoritar
      </button>
      <p data-testid="recipe-category">{ categoryText }</p>

      <ul>
        {children}
      </ul>

      <p data-testid="instructions">{ instructions }</p>

      { shouldVideoApear && (
        <iframe
          title={ title }
          width="300"
          height="300"
          src={ video }
          data-testid="video"
        />
      )}
    </li>
  );
}

CardDetails.propTypes = {
  image: string,
  title: string,
  categoryText: string,
  video: string,
  instructions: string,
  isAlcoholic: string,
  children: arrayOf(shape()),
  shouldVideoApear: bool,
};

CardDetails.defaultProps = {
  image: '',
  title: '',
  categoryText: '',
  video: '',
  instructions: '',
  isAlcoholic: '',
  children: [{}],
  shouldVideoApear: bool,
};

export default CardDetails;
