import React from 'react';
import PropTypes from 'prop-types';

export default function IngredientsList({ recipe }) {
  console.log(recipe);
  let ingredients = [];
  const limit = 20;
  for (let i = 1; i <= limit; i += 1) {
    const newIngredient = {
      item: recipe[`strIngredient${i}`],
      measure: recipe[`strMeasure${i}`],
    };
    if (!newIngredient.item) {
      break;
    }
    if (newIngredient.measure === null) {
      newIngredient.measure = '';
    }
    console.log(newIngredient);
    ingredients = [...ingredients, newIngredient];
  }
  console.log('lista de ingredientes:', ingredients);
  return (
    <ul>
      {ingredients.map((ing, index) => {
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
