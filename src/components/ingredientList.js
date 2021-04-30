import React from 'react';

export default function IngredientsList({ recipe }) {
  console.log(recipe);
  let ingredients = [];
  const limit = 20;
  for (let i = 1; i <= limit; i += 1) {
    const newIngredient = {
      item: recipe[`strIngredient${i}`],
      measure: recipe[`strMeasure${i}`],
    };
    if (newIngredient.item.length < 1) {
      break;
    }
    console.log(newIngredient);
    ingredients = [...ingredients, newIngredient];
  }
  console.log('lista de ingredientes:', ingredients);
  return (
    <ul>
      {ingredients.map((ing, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ing.measure} of ${ing.item}`}
        </li>))}
    </ul>);
}
