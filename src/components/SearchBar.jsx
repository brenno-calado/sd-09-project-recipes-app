import React, { useState } from 'react';

const SEARCH_INITIAL_STATE = {
  searchType: '',
  searchText: '',
};

function SearchBar() {
  const [search, setSearch] = useState(SEARCH_INITIAL_STATE);

  const handleChange = ({ target: { name, value } }) => (
    setSearch({ ...search, [name]: value })
  );

  const renderRadios = () => (
    <>
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="searchType"
          id="ingredient"
          value="Ingrediente"
          onChange={ handleChange }
        />
        {' Ingrediente'}
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          type="radio"
          name="searchType"
          id="name"
          value="Nome"
          onChange={ handleChange }
        />
        {' Nome'}
      </label>
      <label htmlFor="letter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="searchType"
          id="letter"
          value="Letra"
          onChange={ handleChange }
        />
        {' Letra'}
      </label>
    </>
  );

  console.log(search);

  return (
    <section>
      <input
        data-testid="search-input"
        type="text"
        name="searchText"
        onChange={ handleChange }
      />
      { renderRadios()}
      <button
        data-testid="exec-search-btn"
        type="button"
      >
        Pesquisar
      </button>
    </section>
  );
}

export default SearchBar;
