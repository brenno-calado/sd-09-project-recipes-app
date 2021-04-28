import React, { useState, useContext } from 'react';
import * as fetchAPI from '../services/fetchAPI';
import { MyContext } from '../MyContext';

function SearchBar() {
  const [radioSelected, setRadioSelected] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { setResultAPI } = useContext(MyContext);

  const handleChange = ({ target }) => {
    if (target.type === 'radio') {
      setRadioSelected(target.id);
    } else {
      setSearchInput(target.value);
    }
  };

  function searchFetch() {
    if (radioSelected === 'firstLetter' && searchInput.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      fetchAPI.mealAPI(radioSelected, searchInput)
        .then((results) => setResultAPI(results));
    }
  }
  return (
    <div>
      <input data-testid="search-input" type="text" onChange={ handleChange } />
      <div>
        <label htmlFor="ingrediente">
          Ingrediente
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingrediente"
            name="search"
            onClick={ handleChange }
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            data-testid="name-search-radio"
            type="radio"
            id="name"
            name="search"
            onClick={ handleChange }
          />
        </label>
        <label htmlFor="firstLetter">
          Primeira letra
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="firstLetter"
            name="search"
            onClick={ handleChange }
          />
        </label>
      </div>
      <input
        data-testid="exec-search-btn"
        type="button"
        value="Buscar"
        onClick={ searchFetch }
      />
    </div>
  );
}

export default SearchBar;
