import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ingredientFilter from './IngredientFilter';
import {
  getItemLocalStorage,
  setItemLocalStorage } from '../services/servicesLocalStorage';

export default function IngredientCheckbox({ recipe, isFood, callBack }) {
  const type = isFood ? 'meals' : 'cocktails';
  const recipeId = recipe[isFood ? 'idMeal' : 'idDrink'];
  const allInProgress = getItemLocalStorage('inProgressRecipes');
  const recipeInProgress = allInProgress[type];
  const usedIngredients = recipeInProgress[recipeId];
  const allIngredients = ingredientFilter(recipe);
  const [completedItem, setCompletedItem] = useState([]);

  const markAsCompleted = (item) => {
    const updatedInProgress = {
      ...allInProgress,
      [type]: {
        ...allInProgress[type],
        [recipeId]: [...(usedIngredients || []), item],
      },
    };

    setCompletedItem(updatedInProgress[type][recipeId]);
    setItemLocalStorage('inProgressRecipes', updatedInProgress);

    if (completedItem.length === allIngredients.length - 1) {
      callBack();
    }
  };

  return (allIngredients.map((ing, index) => {
    const ingString = ing.measure.length > 1 ? `${ing.measure} of ${ing.item}` : ing.item;
    const itemDisable = usedIngredients ? usedIngredients.includes(ingString) : false;

    return (
      <li
        key={ index }
        data-testid={ `${index}-ingredient-step` }
        className={ itemDisable ? 'completed-item' : '' }
      >
        <input
          type="checkbox"
          id={ `${index}-checkbox` }
          onChange={ () => markAsCompleted(ingString) }
          checked={ itemDisable }
          disabled={ itemDisable }
          className={ itemDisable ? 'completed-item' : '' }
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
