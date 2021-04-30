import React from 'react';

function CardeInProgress({ image, title }) {
  return (
    <li>
      <img data-testid="recipe-photo" src={ image } alt={ title } />
      <h2 data-testid="recipe-title">{title}</h2>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favorito</button>
    </li>
  );
}

export default CardeInProgress;
