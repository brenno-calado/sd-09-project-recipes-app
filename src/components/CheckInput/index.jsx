import React, { useEffect, useRef, useState } from 'react';
import { string, number, func, arrayOf } from 'prop-types';

function CheckInput({ index, handleCheckedValue, item, apiData }) {
  const inputRef = useRef(null);
  const [checkedValue, setCheckedValue] = useState();

  useEffect(() => {
    if (apiData.drinks) {
      const { drinks } = apiData;
      const localElements = JSON.parse(localStorage.getItem('inProgressRecipes'));

      if (localElements !== null) {
        localElements.cocktails[drinks[0].idDrink].forEach((element) => {
          if (inputRef.current.name === element) {
            inputRef.current.checked = true;
            setCheckedValue(inputRef.current.checked = true);
          }
        });
      }
    }
  }, [apiData, inputRef]);

  useEffect(() => {
    if (apiData.meals) {
      const localElements = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const { meals } = apiData;
      if (localElements !== null) {
        localElements.meals[meals[0].idMeal].forEach((localItem) => {
          if (inputRef.current.name === localItem) {
            inputRef.current.checked = true;
            setCheckedValue(inputRef.current.checked = true);
          }
        });
      }
    }
  }, [apiData, inputRef]);

  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      <label
        data-testid={ `${index}-ingredient-step` }
        htmlFor={ `${index}-ingredientDrinkStep` }
      >
        <input
          name={ item }
          id={ `${index}-ingredientDrinkStep` }
          type="checkbox"
          onChange={ handleCheckedValue }
          key={ Math.random() }
          ref={ inputRef }
          checked={ checkedValue }
        />
        { item }
      </label>
    </div>
  );
}

CheckInput.propTypes = {
  index: number,
  handleCheckedValue: func,
  item: arrayOf(string),
  drinks: func,
  apiData: Object,
};

CheckInput.defaultProps = {
  index: 0,
  handleCheckedValue: () => {},
  item: '',
  drinks: null,
  apiData: null,
};

export default CheckInput;
