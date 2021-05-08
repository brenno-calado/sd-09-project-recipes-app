import { number, string } from 'prop-types';
import React from 'react';

const RecipeCard = ({ img, title, index, testid }) => (
  <div data-testid={ `${index}-recipe-card` } key={ title }>
    <h2
      data-testid={ testid ? `${index}-recomendation-title` : `${index}-card-name` }
    >
      { title }
    </h2>
    <img
      data-testid={ testid || `${index}-card-img` }
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
