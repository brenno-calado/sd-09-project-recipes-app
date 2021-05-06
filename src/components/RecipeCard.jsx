import { number, string } from 'prop-types';
import React from 'react';

const RecipeCard = ({ img, title, index }) => (
  <div data-testid={ `${index}-recipe-card` } key={ title }>
    <h2 data-testid={ `${index}-card-name` }>{ title }</h2>
    <img
      data-testid={ `${index}-card-img` }
      style={ { width: '20vw' } }
      src={ img }
      alt="recipe thumb"
    />
  </div>
);

RecipeCard.propTypes = {
  img: string,
  title: string,
  index: number,
}.isRequired;

export default RecipeCard;
