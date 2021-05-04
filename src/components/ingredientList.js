import React from 'react';
import PropTypes from 'prop-types';

export default function IngredientsList({ recipe }) {
  const headers = Object.keys(recipe);
  const ingredients = headers.filter((i) => i.includes('strIngredient'));
  const ingredientList = ingredients.map((ing, index) => {
    const newIngredient = {
      item: recipe[ing],
      measure: recipe[`strMeasure${index + 1}`],
    };
    if (!newIngredient.item) return null;
    if (!newIngredient.measure) newIngredient.measure = '';
    return newIngredient;
  });
  const allIngredients = ingredientList.filter((i) => i !== null);
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
