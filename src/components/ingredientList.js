import React from 'react';
import PropTypes from 'prop-types';
import ingredientFilter from './IngredientFilter';

export default function IngredientsList({ recipe }) {
  const allIngredients = ingredientFilter(recipe);
  return (
    <ul>
      {allIngredients.map((ing, index) => {
        if (ing.measure.length > 1) {
          return (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ing.measure} of ${ing.item}`}
            </li>);
        }
        return (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ing.item}
          </li>
        );
      })}
    </ul>);
}

IngredientsList.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string),
}.isRequired;
