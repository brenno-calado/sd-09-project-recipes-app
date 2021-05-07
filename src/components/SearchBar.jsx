import React, { useContext } from 'react';
import { Context } from '../contexts/Context.tsx';

export default function SearchBar() {
  const {
    inputToSearch,
    setInputToSearch,
    filterSelected,
    setFilterSelected,
    submitInputToSearch,
  } = useContext(Context);

  return (
    <div>

      <input
        className="search-input"
        id="search-input"
        data-testId="search-input"
        value={ inputToSearch }
        onChange={ ({ target }) => (
          filterSelected === 'firstLetter'
          && inputToSearch.length > 1
            ? (alert('Sua busca deve conter somente 1 (um) caracter'),
            setInputToSearch(target.value[0]))
            : setInputToSearch(target.value)) }
      />
      <button
        type="submit"
        data-testid="exec-search-btn"
        onClick={ () => console.log(submitInputToSearch(inputToSearch)) }
      >
        Procurar
      </button>

      <div className="containerRadioBtns" id="containerRadioBtns">
        <label htmlFor="ingredient-search-radio">
          Ingrediente
          <input
            type="radio"
            name="search-radio"
            className="search-radio"
            id="ingredient-search-radio"
            data-testId="ingredient-search-radio"
            onClick={ () => setFilterSelected('ingredient') }
          />
        </label>

        <label htmlFor="name-search-radio">
          Nome
          <input
            type="radio"
            name="search-radio"
            className="search-radio"
            id="name-search-radio"
            data-testId="name-search-radio"
            onClick={ () => setFilterSelected('name') }
          />
        </label>

        <label htmlFor="first-letter-search-radio">
          Primeira letra
          <input
            type="radio"
            name="search-radio"
            className="search-radio"
            id="first-letter-search-radio"
            data-testId="first-letter-search-radio"
            onClick={ () => setFilterSelected('firstLetter') }
          />
        </label>
      </div>
    </div>
  );
}
