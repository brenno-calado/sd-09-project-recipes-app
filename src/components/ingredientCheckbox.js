import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import ingredientFilter from './IngredientFilter';
import { getItemLocalStorage,
  setItemLocalStorage } from '../services/servicesLocalStorage';

export default function IngredientCheckbox({ recipe, isFood, setCount }) {
  const { id } = useParams();
  const allIngredients = ingredientFilter(recipe);
  const type = isFood ? 'meals' : 'cocktails';
  const allRecipesProgress = getItemLocalStorage('inProgressRecipes');
  const thisRecipeProgress = allRecipesProgress[type];
  const [updateChecklist, setUpdate] = useState(false);

  const handleCheck = ({ target }) => {
    target.checked = true;
    target.className = 'line-through';
    const ingredient = target.name;
    const updateRecipe = thisRecipeProgress[id].concat(ingredient);
    setItemLocalStorage('inProgressRecipes',
      { ...allRecipesProgress,
        [type]: { ...thisRecipeProgress, [id]: [...updateRecipe] } });
    if (thisRecipeProgress[id].includes(target.name)) {
      target.checked = false;
      target.className = 'none';
      const ingRemoved = thisRecipeProgress[id].filter((e) => e !== target.name);
      setItemLocalStorage('inProgressRecipes', { ...allRecipesProgress,
        [type]: { ...thisRecipeProgress, [id]: [...ingRemoved] } });
    }
    setUpdate(!updateChecklist);
  };

  useEffect(() => {
    setCount(thisRecipeProgress[id].length);
  });

  return (allIngredients.map((ing, index) => {
    const thisProgress = thisRecipeProgress[id];
    const isChecked = thisProgress.includes(ing.item);
    console.log(isChecked);
    if (ing.measure.length > 1) {
      return (
        <div
          data-testid={ `${index}-ingredient-step` }
          key={ index }
        >
          <input
            type="checkbox"
            onChange={ handleCheck }
            id={ `${index}-checkbox` }
            name={ ing.item }
            checked={ isChecked }
          />
          <label
            className={ isChecked ? 'doneIngredient' : '' }
            htmlFor={ `${index}-checkbox` }
          >
            {ing.measure}
            {' '}
            of
            {' '}
            {ing.item}
          </label>
        </div>);
    }
    return (
      <div
        key={ index }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          onChange={ handleCheck }
          type="checkbox"
          id={ `${index}-checkbox` }
          name={ ing.item }
          checked={ isChecked }
        />
        <label
          className={ isChecked && 'doneIngredient' }
          htmlFor={ `${index}-checkbox` }
        >
          { ing.item }
        </label>
      </div>
    );
  }));
}

IngredientCheckbox.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string),
}.isRequired;
