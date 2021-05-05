import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/SearchBar.css';

function SearchBar() {
  const [inputs, setInputs] = useState({ searchText: '', filter: 'ingredient' });
  const { handleSearchClick } = useContext(RecipesAppContext);
  const location = useLocation();

  const handleChange = ({ target: { name, value } }) => {
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <form className="search-bar-container">
      <input
        type="text"
        name="searchText"
        data-testid="search-input"
        onChange={ handleChange }
        placeholder="Buscar Receita"
      />
      <div>
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            name="filter"
            value="ingredient"
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
            onChange={ handleChange }
            checked
          />
          Ingrediente
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            name="filter"
            value="name"
            id="name-search-radio"
            data-testid="name-search-radio"
            onChange={ handleChange }
          />
          Nome
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            name="filter"
            value="firstLetter"
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
            onChange={ handleChange }
          />
          Primeira Letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        disabled={ (inputs.searchText.length === 0) }
        onClick={ () => handleSearchClick(inputs, location.pathname) }
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
