import { number, object, string } from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const IngredientCard = ({ ingredient, type, index }) => {
  const [urlThumb] = useState(() => {
    if (type === 'comidas') {
      return `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`;
    }
    return `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`;
  });

  return (
    <Link
      to={ `/${type}/${ingredient.strIngredient || ingredient.strIngredient1}` }
    >
      <div
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ urlThumb }
          alt="ingredient-thumb"
          style={ { width: '25vw' } }
        />
        <h4 data-testid={ `${index}-card-name` }>
          { type === 'comidas' ? ingredient.strIngredient : ingredient.strIngredient1 }
        </h4>
      </div>
    </Link>
  );
};

IngredientCard.propTypes = {
  ingredient: object,
  type: string,
  index: number,
}.isRequired;

export default IngredientCard;
