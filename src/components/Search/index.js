import React, { useContext, useState } from 'react';
import { FoodCtx } from '../../context/contextFood';
import { DrinkCtx } from '../../context/contextDrink';

import './Search.css';

function Search({ currentPage }) {
  const { setFilterFood } = useContext(FoodCtx);
  const { setFilterDrink } = useContext(DrinkCtx);
  const [inputChange, setInputChange] = useState({
    inputSearch: '',
    selectedFilter: '',
  });

  function handleChange({ target: { name, value } }) {
    setInputChange({
      ...inputChange,
      [name]: value,
    });
  }

  function handleClick() {
    const { inputSearch, selectedFilter } = inputChange;

    if (selectedFilter === 'first' && inputSearch.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      setInputChange({
        ...inputChange,
        inputSearch: '',
      });
      return;
    }
    if (currentPage === 'Foods') {
      setFilterFood({
        key: selectedFilter,
        value: inputSearch,
      });
      return;
    }
    setFilterDrink({
      key: selectedFilter,
      value: inputSearch,
    });
  }

  return (
    <div className="search-container">
      <input
        type="text"
        data-testid="search-input"
        onChange={ handleChange }
        className="input-search"
        name="inputSearch"
        value={ inputChange.inputSearch }
      />
      <section className="radio">
        <label htmlFor="ingredients">
          Ingredientes:
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            onChange={ handleChange }
            name="selectedFilter"
            value="ing"
            id="ingredients"
          />
        </label>
        <label htmlFor="name">
          Nome:
          <input
            type="radio"
            data-testid="name-search-radio"
            onChange={ handleChange }
            name="selectedFilter"
            value="name"
            id="name"
          />
        </label>
        <label htmlFor="first">
          Primeira Letra:
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            onChange={ handleChange }
            name="selectedFilter"
            value="first"
            id="first"
          />
        </label>
      </section>
      <button
        data-testid="exec-search-btn"
        type="submit"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>
  );
}

export default Search;
