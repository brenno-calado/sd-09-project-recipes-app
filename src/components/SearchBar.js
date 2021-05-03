import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { getFilteredRecipes } from '../services/api';

function SearchBar() {
  const [searchState, setSearchState] = useState({ search: '', radioButton: '' });
  const history = useHistory();
  const { setDataFromApi } = useContext(RecipesContext);

  const handleChange = ({ target: { value } }) => {
    setSearchState({ ...searchState, search: value });
  };

  const handleClick = ({ target: { id } }) => {
    setSearchState({ ...searchState, radioButton: id });
  };

  const handleSubmit = async () => {
    const { search, radioButton } = searchState;
    const { pathname } = history.location;
    const route = pathname.substr(1);
    if (search.length > 1 && radioButton === 'primeira-letra') {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const getRecipes = await getFilteredRecipes(route, search, radioButton);
    if (route === 'comidas') {
      setDataFromApi({ recipes: getRecipes.meals, meal: route });
    } else {
      setDataFromApi({ recipes: getRecipes.drinks, meal: route });
    }

    switch (route) {
    case 'comidas':
      if (getRecipes.meals.length === 1) {
        history.push(`/comidas/${getRecipes.meals[0].idMeal}`);
      } else {
        history.push('/comidas');
      }
      break;
    case 'bebidas':
      if (getRecipes.drinks.length === 1) {
        history.push(`/bebidas/${getRecipes.drinks[0].idDrink}`);
      } else {
        history.push('/bebidas');
      }
      break;
    default:
      return undefined;
    }
  };

  return (
    <div>
      <label htmlFor="search">
        <input
          data-testid="search-input"
          name="search"
          id="search"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="ingrediente">
        Ingrediente
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="filter"
          id="ingrediente"
          onClick={ handleClick }
        />
      </label>

      <label htmlFor="nome">
        Nome
        <input
          type="radio"
          data-testid="name-search-radio"
          name="filter"
          id="nome"
          onClick={ handleClick }
        />
      </label>

      <label htmlFor="primeira-letra">
        Primeira letra
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="filter"
          id="primeira-letra"
          onClick={ handleClick }
        />
      </label>

      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => handleSubmit() }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
