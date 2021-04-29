import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import '../App.css';

function RecipeList({ item }) {
  const [checkboxes, setCheckboxes] = useState(
    JSON.parse(localStorage.getItem('checks')) || {},
  );

  const handleChanges = async ({ target }) => {
    setCheckboxes({ ...checkboxes, [target.name]: target.checked });
  };

  useEffect(() => {
    localStorage.setItem('checks', JSON.stringify(checkboxes));
  }, [checkboxes]);

  const setList = () => {
    const max = true;
    const ingredients = [];
    let index = 1;
    while (max) {
      if (!item[`strIngredient${index}`]) return ingredients;
      ingredients.push(
        <label
          htmlFor={ `strIngredient${index}` }
          data-testid={ `${index - 1}-ingredient-step` }
          className={ checkboxes[`strIngredient${index}`] && 'check' }
        >
          <input
            className="check"
            type="checkbox"
            checked={ checkboxes[`strIngredient${index}`] }
            id={ `strIngredient${index}` }
            name={ `strIngredient${index}` }
            onChange={ handleChanges }
          />
          {`${item[`strIngredient${index}`]} - ${item[`strMeasure${index}`]}`}
        </label>,
      );
      index += 1;
    }
  };

  return (
    <div>
      { setList() }
    </div>
  );
}

RecipeList.propTypes = {
  item: object,
}.isRequired;

export default RecipeList;
