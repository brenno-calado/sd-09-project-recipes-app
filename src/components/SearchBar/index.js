import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { fetchSearchMeals } from '../../service/mealAPI';
import { fetchSearchDrinks } from '../../service/cocktailAPI';

function SearchBar({ path, setResult }) {
  const [filter, setFilter] = useState(null);
  const [searchText, setSearchText] = useState('');

  const filterFood = async () => {
    if (!filter || !searchText) return;
    if (filter === 'f' && searchText.length > 1) {
      return window.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const search = path === '/comidas' ? await fetchSearchMeals(filter, searchText)
      : await fetchSearchDrinks(filter, searchText);
    setResult(search);
  };

  return (
    <div className="search-bar silver-shadow">
      <input
        value={ searchText }
        className="full-width search-bar"
        placeholder="Buscar Receita"
        data-testid="search-input"
        onChange={ ({ target: { value } }) => setSearchText(value) }
      />
      <div>
        <label htmlFor="i">
          <input
            type="radio"
            name="type"
            id="i"
            data-testid="ingredient-search-radio"
            onClick={ ({ target: { id } }) => setFilter(id) }
          />
          Ingrediente
        </label>
        <label htmlFor="s">
          <input
            type="radio"
            name="type"
            id="s"
            data-testid="name-search-radio"
            onClick={ ({ target: { id } }) => setFilter(id) }
          />
          Nome
        </label>
        <label htmlFor="f">
          <input
            type="radio"
            name="type"
            id="f"
            data-testid="first-letter-search-radio"
            onClick={ ({ target: { id } }) => setFilter(id) }
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        size="sm"
        data-testid="exec-search-btn"
        onClick={ () => filterFood() }
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  path: PropTypes.string.isRequired,
  setResult: PropTypes.func.isRequired,
};

export default SearchBar;
