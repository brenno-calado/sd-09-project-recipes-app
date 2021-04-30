import React from 'react';
import { number, string } from 'prop-types';
import './CardIngredient.css';

function CardIngredient({ ingredient, index, pageType }) {
  return (
    <div className="card-ingredient-container" data-testid={ `${index}-ingredient-card` }>
      <img
        src={ pageType === 'comidas'
          ? `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`
          : `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
        alt={ `imagen de ${ingredient}` }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>
        { ingredient }
      </p>
    </div>
  );
}

CardIngredient.propTypes = {
  ingredient: string.isRequired,
  index: number.isRequired,
  pageType: string.isRequired,
};

export default CardIngredient;
