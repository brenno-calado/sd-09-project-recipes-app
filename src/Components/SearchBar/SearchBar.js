import React, { useContext, useState } from 'react';
import { string } from 'prop-types';
import { Redirect } from 'react-router';
import DrinksApi from '../../services/DrinkApi';
import MealsApi from '../../services/MealApi';
import './searchBar.css';
import { RecipeContext } from '../../Context';

function SearchBar({ page }) {
  const [inputSearch, setInputSearch] = useState('');
  const [radioSearch, setRadioSearch] = useState();
  const [redirect, setRedirect] = useState(false);
  const [recipeId, setRecipeId] = useState('');
  const { setRecipies, setTypeRecipies } = useContext(RecipeContext);

  function handleSearch({ target: { value } }) {
    setInputSearch(value);
  }

  function handleRadio({ target: { value } }) {
    setRadioSearch(value);
  }

  function handleRecipies(recipies) {
    setTypeRecipies(page);
    if (recipies && recipies.length > 1) {
      setRecipies(recipies);
    }
    if (recipies && recipies.length === 1 && page === 'bebidas') {
      setRecipeId(recipies[0].idDrink);
      setRedirect(true);
    } else if (recipies && recipies.length === 1 && page === 'comidas') {
      setRecipeId(recipies[0].idMeal);
      setRedirect(true);
    }
  }

  async function handleButton() {
    if (radioSearch === 'first-letter' && inputSearch.length > 1) {
      // eslint-disable-next-line no-alert
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (page === 'comidas') {
      const result = await MealsApi(inputSearch, radioSearch);
      handleRecipies(result.meals);
    } else {
      const result = await DrinksApi(inputSearch, radioSearch);
      handleRecipies(result.drinks);
    }
  }

  if (redirect === true) return <Redirect to={ `/${page}/${recipeId}` } />;

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        data-testid="search-input"
        onChange={ handleSearch }
      />
      <label htmlFor="ingredient">
        <input
          name="search-type"
          id="ingredient"
          value="ingredient"
          type="radio"
          data-testid="ingredient-search-radio"
          onClick={ handleRadio }
        />
        Ingredient
      </label>
      <label htmlFor="name-search">
        <input
          name="search-type"
          id="name-search"
          value="name"
          type="radio"
          data-testid="name-search-radio"
          onClick={ handleRadio }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          name="search-type"
          id="first-letter"
          value="first-letter"
          type="radio"
          data-testid="first-letter-search-radio"
          onClick={ handleRadio }
        />
        First letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleButton }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  page: string.isRequired,
};

export default SearchBar;
