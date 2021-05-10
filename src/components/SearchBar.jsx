import React, { useContext } from 'react';
import Context from '../contextApi/context';

export default function SearchBar() {
  const {
    inputToSearch,
    setInputToSearch,
    filterSelected,
    setFilterSelected,
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
            ? (Window.alert('Sua busca deve conter somente 1 (um) caracter'),
            setInputToSearch(target.value[0]))
            : setInputToSearch(target.value)) }
      />

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
