import React, { useState } from 'react';
import { func, string } from 'prop-types';
import {
  requestDrinks,
  requestDrinksByIngredients,
  requestDrinksByName,
  requestDrinksByFirstLetter,
  requestMeals,
  requestMealsByIngredients,
  requestMealsByName,
  requestMealsByFirstLetter,
} from '../../services/api';
import './search.css';

const msgAlertNoRecipe = (
  'Sinto muito, não encontramos nenhuma receita para esses filtros.');
const msgAlertMinLetter = 'Sua busca deve conter somente 1 (um) caracter';

function searchByDrinks(infoSearch, setItems) {
  const { searchBy, text } = infoSearch;
  switch (searchBy) {
  case 'ingredients':
    requestDrinksByIngredients(text).then(({ drinks }) => {
      if (drinks === null) alert(msgAlertNoRecipe);
      else setItems(drinks);
    }).catch(() => alert(msgAlertNoRecipe));
    break;
  case 'name':
    requestDrinksByName(text).then(({ drinks }) => {
      if (drinks === null) alert(msgAlertNoRecipe);
      else setItems(drinks);
    });
    break;
  case 'firstLetter':
    requestDrinksByFirstLetter(text).then(({ drinks }) => {
      if (drinks === null) alert(msgAlertNoRecipe);
      else setItems(drinks);
    });
    break;
  default:
    requestDrinks().then(({ drinks }) => setItems(drinks));
    break;
  }
}

function searchByMeals(infoSearch, setItems) {
  const { searchBy, text } = infoSearch;
  switch (searchBy) {
  case 'ingredients':
    requestMealsByIngredients(text).then(({ meals }) => {
      if (meals === null) alert(msgAlertNoRecipe);
      else setItems(meals);
    });
    break;
  case 'name':
    requestMealsByName(text).then(({ meals }) => {
      if (meals === null) alert(msgAlertNoRecipe);
      else setItems(meals);
    });
    break;
  case 'firstLetter':
    requestMealsByFirstLetter(text).then(({ meals }) => {
      if (meals === null) alert(msgAlertNoRecipe);
      else setItems(meals);
    });
    break;
  default:
    requestMeals().then(({ meals }) => setItems(meals));
    break;
  }
}

function requestApiSearch(infoSearch, setItems) {
  const { type } = infoSearch;
  if (type === 'drinks') searchByDrinks(infoSearch, setItems);
  else searchByMeals(infoSearch, setItems);
}

function Search({ setItems, type }) {
  const [infoSearch, setInfoSearch] = useState({ text: '', searchBy: '', type });
  return (
    <div className="container-search">
      <input
        className="input-search"
        data-testid="search-input"
        type="text"
        placeholder="Buscar Reaceitas"
        value={ infoSearch.text }
        onChange={
          (evt) => setInfoSearch({ ...infoSearch, text: evt.target.value })
        }
      />
      <div className="container-radios">
        <label htmlFor="ingredients">
          <input
            className="input-radio"
            data-testid="ingredient-search-radio"
            id="ingredients"
            type="radio"
            name="search"
            value="ingredients"
            onClick={
              (evt) => setInfoSearch({ ...infoSearch, searchBy: evt.target.value })
            }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            className="input-radio"
            data-testid="name-search-radio"
            id="name"
            type="radio"
            name="search"
            value="name"
            onClick={
              (evt) => setInfoSearch({ ...infoSearch, searchBy: evt.target.value })
            }
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            className="input-radio"
            data-testid="first-letter-search-radio"
            id="firstLetter"
            type="radio"
            name="search"
            value="firstLetter"
            onClick={
              (evt) => setInfoSearch({ ...infoSearch, searchBy: evt.target.value })
            }
          />
          Primeira letra
        </label>
      </div>
      <button
        className="btn-search"
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => {
          if (infoSearch.searchBy === 'firstLetter' && infoSearch.text.length !== 1) {
            alert(msgAlertMinLetter);
          } else requestApiSearch(infoSearch, setItems);
        } }
      >
        Buscar
      </button>
    </div>
  );
}

Search.propTypes = {
  setItems: func,
  type: string,
}.isRequired;

export default Search;
