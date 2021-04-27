import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchFoodsAPI from '../services/SearchFoodsAPI';
import SearchDrinksAPI from '../services/SearchDrinksAPI';

export default function HeaderSearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [myChoice, setMyChoice] = useState('');
  const history = useHistory();

  const clickSearchButton = async () => {
    const { pathname } = history.location;
    if (pathname === '/bebidas') {
      const recipes = await SearchDrinksAPI(myChoice, searchTerm);
      if (recipes === null) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        return;
      }
      if (recipes.length === 1) {
        history.push(`/bebidas/${recipes[0].idDrink}`);
      }
      console.log(recipes);
    }

    if (pathname === '/comidas') {
      const recipes = await SearchFoodsAPI(myChoice, searchTerm);
      if (recipes === null) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        return;
      }
      if (recipes.length === 1) {
        history.push(`/comidas/${recipes[0].idMeal}`);
      }
      console.log(recipes);
    }
  };

  const handleMyChoice = (event) => {
    const { value } = event.target;
    setMyChoice(value);
  };

  return (
    <div>
      <fieldset>
        <legend>Barra de Busca</legend>
        <label htmlFor="search-input">
          <input
            type="text"
            id="search-input"
            data-testid="search-input"
            placeholder="digite aqui o termo da busca"
            onChange={ ({ target: { value: searchText } }) => (
              setSearchTerm(searchText)) }
          />
        </label>
        <br />
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="search-term"
            id="ingredient"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ handleMyChoice }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name="search-term"
            id="name"
            data-testid="name-search-radio"
            value="name"
            onChange={ handleMyChoice }
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            type="radio"
            name="search-term"
            id="first-letter"
            data-testid="first-letter-search-radio"
            value="first-letter"
            onChange={ handleMyChoice }
          />
          First Letter
        </label>
        <br />
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ clickSearchButton }
        >
          Click Me
        </button>
      </fieldset>
    </div>
  );
}