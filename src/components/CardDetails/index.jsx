import { string } from 'prop-types';
import React from 'react';

function CardDetails({
  image, title, video, categoryText, instructions,
  ingredient, recommendedId, ingredientId, recomendedImage, recomendedTitle }) {
  return (
    <li>
      <img
        src={ image }
        data-testid="recipe-photo"
        alt={ title }
      />
      <h2 data-testid="recipe-title">{ title }</h2>
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

      <ul data-testid={ ingredientId }>
        <li>{ ingredient }</li>
      </ul>

      <p data-testid="instructions">{ instructions }</p>

      <iframe
        title={ title }
        width="300"
        height="300"
        src={ video }
        data-testid="video"
      />

      <div data-testid={ recommendedId }>
        <img src={ recomendedImage } alt={ recomendedTitle } />
        <p>{ recomendedTitle }</p>
      </div>

      <button
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar receita
      </button>
    </li>
  );
}

CardDetails.propTypes = {
  image: string,
  title: string,
  categoryText: string,
  ingredient: string,
  video: string,
  instructions: string,
  recommendedId: string,
  recomendedImage: string,
  recomendedTitle: string,
  ingredientId: string,
};

CardDetails.defaultProps = {
  image: '',
  title: '',
  categoryText: '',
  ingredient: '',
  video: '',
  instructions: '',
  recommendedId: '',
  recomendedImage: '',
  recomendedTitle: '',
  ingredientId: '',
};

export default CardDetails;
