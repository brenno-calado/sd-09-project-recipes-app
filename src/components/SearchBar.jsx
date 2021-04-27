import React, { useState } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { searchBarFetch } from '../actions/searchBar';

function SearchBar({ page, setRecipes }) {
  const [search, setSearch] = useState({ searchValue: '', query: '', page });

  const handleChange = ({ target: { value, name } }) => {
    setSearch({ ...search, [name]: value });
  };

  return (
    <div>
      <h3>SearchBar</h3>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Buscar receita"
        name="searchValue"
        onChange={ handleChange }
      />
      <label htmlFor="ingredient">
        Ingrediente
        <input
          type="radio"
          id="ingredient"
          data-testid="ingredient-search-radio"
          name="query"
          value="i"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          type="radio"
          id="name"
          data-testid="name-search-radio"
          name="query"
          value="s"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="firstLetter">
        Primeira Letra
        <input
          type="radio"
          id="firstLetter"
          data-testid="first-letter-search-radio"
          name="query"
          value="f"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => setRecipes(search) }
      >
        Procurar
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setRecipes: (search) => dispatch(searchBarFetch(search)),
});

SearchBar.propTypes = {
  page: string,
}.isRequired;

export default connect(null, mapDispatchToProps)(SearchBar);
