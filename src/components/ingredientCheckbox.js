import React from 'react';
import PropTypes from 'prop-types';
import ingredientFilter from './IngredientFilter';

export default function IngredientCheckbox({ recipe }) {
  const allIngredients = ingredientFilter(recipe);

  return (allIngredients.map((ing, index) => (
    <li
      key={ index }
      data-testid={ `${index}-ingredient-step` }
    >
      <input type="checkbox" id={ `${index}-checkbox` } />
      <label htmlFor={ `${index}-checkbox` }>
        {ing.measure.length > 1 ? `${ing.measure} of ${ing.item}` : ing.item }
      </label>
    </li>
  )));
}

IngredientCheckbox.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string),
}.isRequired;
