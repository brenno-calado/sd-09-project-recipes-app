import React, { useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { functionFood, functionDrink } from '../services/functions';
import Cards from './Cards';

function SearchBar() {
  const [data, setData] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [localRedirect, setLocalRedirect] = useState('');
  const [shouldCards, setShouldCards] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const { pathname } = useLocation();

  async function getData() {
    const obj = {
      data,
      searchValue,
      setLocalRedirect,
      setShouldCards,
      setRecipes,
      setShouldRedirect };
    if (pathname === '/comidas') {
      functionFood(obj);
    } else {
      functionDrink(obj);
    }
  }

  if (shouldRedirect) return <Redirect to={ localRedirect } />;

  function renderSearch() {
    return (
      <div>
        <input
          type="text"
          id="searchBar"
          data-testid="search-input"
          onChange={ ({ target }) => setSearchValue(target.value) }
        />
        <div>
          <label htmlFor="Ingredient">
            <input
              type="radio"
              id="Ingredient"
              name="filter"
              value="ingredient"
              data-testid="ingredient-search-radio"
              onClick={ ({ target }) => setData(target.value) }
            />
            Ingrediente
          </label>
          <label htmlFor="name">
            <input
              type="radio"
              id="name"
              name="filter"
              value="name"
              data-testid="name-search-radio"
              onClick={ ({ target }) => setData(target.value) }
            />
            Nome
          </label>
          <label htmlFor="letter">
            <input
              type="radio"
              id="letter"
              name="filter"
              value="letter"
              data-testid="first-letter-search-radio"
              onClick={ ({ target }) => setData(target.value) }
            />
            Primeira letra
          </label>
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ getData }
          >
            Buscar
          </button>
        </div>
      </div>
    );
  }

  function renderContents() {
    if (shouldCards) {
      return (
        renderSearch(), <Cards data={ recipes } />
      );
    }
  }

  if (shouldCards) return renderContents();

  return (
    renderSearch()
  );
}

export default SearchBar;
