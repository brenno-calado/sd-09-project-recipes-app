import React, { useContext } from 'react';
import { RecipeContext } from '../../Context';

function IngredientList() {
  const { recipeSpec } = useContext(RecipeContext);
  const recipeIngredient = [];
  function setRecipeIngredient() {
    const numberOfIngredinets = 20;
    let cont = 1;
    for (let index = 0; index <= numberOfIngredinets; index += 1) {
      if (recipeSpec[`strIngredient${cont}`] !== '') {
        recipeIngredient
          .push(
            `${recipeSpec[`strIngredient${cont}`]} - ${recipeSpec[`strMeasure${cont}`]}`,
          );
        cont += 1;
      } else {
        return null;
      }
    }
  }
  setRecipeIngredient();

  return (
    <div>
      <h3>Ingredinets</h3>
      <ul>
        {(recipeIngredient.length) && recipeIngredient.map((item, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            { item }
          </li>
        )) }
      </ul>
    </div>
  );
}

export default IngredientList;
