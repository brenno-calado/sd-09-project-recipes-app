import React from 'react';
import { arrayOf, string } from 'prop-types';

function CardeInProgress({ image, title, category, instructions, children }) {
  return (
    <li>
      <img data-testid="recipe-photo" src={ image } alt={ title } />
      <h2 data-testid="recipe-title">{title}</h2>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favorito</button>
      <p data-testid="recipe-category">{category}</p>
      <ul>
        {children}
      </ul>
      <p data-testid="instructions">{instructions}</p>
      <button type="button" data-testid="finish-recipe-btn">Finalizar receita</button>
    </li>
  );
}

CardeInProgress.propTypes = {
  image: string,
  title: string,
  category: string,
  instructions: string,
  children: arrayOf(Object),
};

CardeInProgress.defaultProps = {
  image: '',
  title: '',
  category: '',
  instructions: '',
  children: [],
};

export default CardeInProgress;
