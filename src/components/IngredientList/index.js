import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function updateProgress(items, id, isMeal) {
  const inProgress = localStorage.getItem('inProgressRecipes');
  let inProgressData = { cocktails: {}, meals: {} };
  if (inProgress) {
    inProgressData = JSON.parse(inProgress);
  }
  inProgressData[isMeal ? 'meals' : 'cocktails'][id] = items;
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressData));
}
/**
 * @param {string} id
 * @param {boolean} isMeal
 * @returns {Array}
 */
function getProgress(id, isMeal) {
  const data = localStorage.getItem('inProgressRecipes');
  if (!data) {
    return [];
  }
  const parsedData = JSON.parse(data);
  return parsedData[isMeal ? 'meals' : 'cocktails'][id] || [];
}

export default function IngredientsList({ ingredients, recipeId, isMeal, onChangeItem }) {
  const [items, setItems] = useState(getProgress(recipeId, isMeal));
  const handleCheck = (index) => () => {
    const item = items.indexOf(index);
    if (item >= 0) {
      items.splice(item, 1);
      setItems([...items]);
      updateProgress(items, recipeId, isMeal);
    } else {
      const newItems = [...items, index];
      setItems(newItems);
      updateProgress(newItems, recipeId, isMeal);
    }
  };
  const isChecked = useCallback((index) => items.includes(index), [items]);
  useEffect(() => {
    const isFinalized = ingredients.every((_, index) => isChecked(index));
    onChangeItem(isFinalized);
  }, [ingredients, isChecked, onChangeItem]);
  return (
    <div>
      <h3>Ingredientes</h3>
      <ul className="ingredients-steps">
        { ingredients.map(({ ingredient, measure }, index) => (
          <li data-testid={ `${index}-ingredient-step` } key={ index }>
            <label
              className={ isChecked(index) ? 'completed' : '' }
              htmlFor={ index }
            >
              <input
                onChange={ handleCheck(index) }
                checked={ isChecked(index) }
                id={ index }
                type="checkbox"
              />
              { `${ingredient} - ${measure}` }
            </label>
          </li>))}
      </ul>
    </div>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  recipeId: PropTypes.string.isRequired,
  isMeal: PropTypes.bool.isRequired,
  onChangeItem: PropTypes.func.isRequired,
};
