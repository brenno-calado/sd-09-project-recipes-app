import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ingredientFilter from './IngredientFilter';
import {
  getItemLocalStorage,
  setItemLocalStorage } from '../services/servicesLocalStorage';

export default function IngredientCheckbox({ recipe, isFood }) {
  const type = isFood ? 'meals' : 'cocktails';
  const recipeId = recipe[isFood ? 'idMeal' : 'idDrink'];
  const usedIngredients = getItemLocalStorage('inProgressRecipes')[type][recipeId];
  const allIngredients = ingredientFilter(recipe);
  const [completedItem, setCompletedItem] = useState([]);

  console.log(usedIngredients);
  console.log(allIngredients);

  const markAsCompleted = (item) => {
    setCompletedItem([...completedItem, item]);
  };

  return (allIngredients.map((ing, index) => {
    const ingString = ing.measure.length > 1 ? `${ing.measure} of ${ing.item}` : ing.item;
    const itemDisable = completedItem.includes(ingString);

    return (
      <li
        key={ index }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          type="checkbox"
          id={ `${index}-checkbox` }
          onClick={ () => markAsCompleted(ingString) }
          disabled={ itemDisable }
        />
        <label htmlFor={ `${index}-checkbox` }>
          { ingString }
        </label>
      </li>
    );
  }));
}

IngredientCheckbox.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string),
}.isRequired;
