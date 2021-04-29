import React from 'react';
import { number, string } from 'prop-types';

function IngredientCard({ ingredient, db, index }) {
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ `https://www.${db}.com/images/ingredients/${ingredient}-Small.png` }
        alt={ ingredient }
      />
      <p data-testid={ `${index}-card-name` }>{ingredient}</p>
    </div>
  );
}

IngredientCard.propTypes = {
  ingredient: string,
  db: string,
  index: number,
}.isRequired;

export default IngredientCard;
