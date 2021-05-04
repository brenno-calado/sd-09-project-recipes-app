import React, { useEffect, useRef, useState } from 'react';
import { string, number, func, arrayOf, shape } from 'prop-types';

function CheckInput({ index, handleCheckedValue, item, match }) {
  const inputRef = useRef(null);
  const [checkedValue, setCheckedValue] = useState();
  const { params, path } = match;
  const { id } = params;
  const [input, setInput] = useState([]);

  useEffect(() => {
    console.log(item);
  }, []);

  function handleDisableBtn() {
    const test = [];
    test.push(inputRef);
    console.log(item);
  }

  console.log(checkedValue);

  useEffect(() => {
    if (path === '/bebidas/:id/in-progress') {
      const localElements = JSON.parse(localStorage.getItem('inProgressRecipes'));
      localStorage.setItem('inProgressRecipes',
        JSON.stringify(localElements || { cocktails: { [id]: [] } }));
      if (localElements) {
        localElements.cocktails[id].forEach((element) => {
          if (inputRef.current.name === element) {
            inputRef.current.checked = true;
            setCheckedValue(inputRef.current.checked = true);
          }
        });
      }
    }
  }, [id, path]);

  useEffect(() => {
    if (path === '/comidas/:id/in-progress') {
      const localElements = JSON.parse(localStorage.getItem('inProgressRecipes'));
      localStorage.setItem('inProgressRecipes',
        JSON.stringify(localElements || { meals: { [id]: [] } }));
      if (localElements) {
        localElements.meals[id].forEach((localItem) => {
          if (inputRef.current.name === localItem) {
            inputRef.current.checked = true;
            setCheckedValue(inputRef.current.checked = true);
          }
        });
      }
    }
  }, [id, path]);

  return (
    <label
      data-testid={ `${index}-ingredient-step` }
      htmlFor={ `${index}-ingredientDrinkStep` }
    >
      <input
        name={ item }
        id={ `${index}-ingredientDrinkStep` }
        type="checkbox"
        onChange={ (event) => { handleCheckedValue(event); handleDisableBtn(); } }
        key={ Math.random() }
        ref={ inputRef }
        checked={ checkedValue }
      />
      { item }
    </label>
  );
}

CheckInput.propTypes = {
  index: number,
  handleCheckedValue: func,
  item: arrayOf(string),
  params: shape(),
  match: shape(),
  path: string,
  id: string,
};

CheckInput.defaultProps = {
  index: 0,
  handleCheckedValue: () => {},
  item: '',
  params: {},
  match: {},
  path: '',
  id: '',
};

export default CheckInput;
