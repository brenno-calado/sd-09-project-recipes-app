import React, { useContext } from 'react';
import MealContext from '../context/MealContext';

function SearchBar() {
  const {
    handleChangeRadio,
    filters,
    inputValue,
    setInputValue,
  } = useContext(MealContext);

  function handleChange({ target: { value } }) {
    setInputValue(value);
  }

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        onChange={ handleChange }
      />

      <input
        data-testid="ingredient-search-radio"
        type="radio"
        name="Search radio"
        value="ingredient"
        onChange={ handleChangeRadio }
      />
      Ingredientes

      <input
        data-testid="name-search-radio"
        type="radio"
        name="Search radio"
        value="name"
        onChange={ handleChangeRadio }
      />
      Nome

      <input
        data-testid="first-letter-search-radio"
        type="radio"
        name="Search radio"
        value="letter"
        onChange={ handleChangeRadio }
      />
      Primeira Letra

      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => filters(inputValue) }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
