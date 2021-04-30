import { shape } from 'prop-types';
import React from 'react';

function RecipeDrinkDetailComponent({ recipe }) {
  return (
    <img
      src={ recipe.strDrinkThumb }
      alt="foto da receita"
      data-testid="recipe-photo"
    />
  );
}

RecipeDrinkDetailComponent.propTypes = {
  recipe: shape().isRequired,
};

export default RecipeDrinkDetailComponent;
