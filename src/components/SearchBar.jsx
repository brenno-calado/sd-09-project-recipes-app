import React, { useContext, useEffect, useState } from 'react';
import { fetchMeal, fetchDrink } from '../services/api';
import MealsAndDrinkContext from '../context/MealsAndDrinkContext';
import { getPageFromURL } from '../services/others';

const defaultSearchFilters = {
  inputSearch: '',
  ingrediente: false,
  nome: false,
  primeiraLetra: false,
};

function SearchBar() {
  const [searchFilters, setSearchFilters] = useState(defaultSearchFilters);
  const { meals, setMeals, drinks, setDrinks } = useContext(MealsAndDrinkContext);

  function handleChange({ target }) {
    const obj = { ...searchFilters };
    obj[target.name] = target.value;
    setSearchFilters(obj);
  }

  function handleChangeCheck({ target }) {
    const obj = { ...defaultSearchFilters };
    obj.inputSearch = searchFilters.inputSearch;
    obj[target.value] = target.checked;
    setSearchFilters(obj);
  }

  async function handleSearch(searchWithFilters) {
    if (getPageFromURL()) {
      const mealList = await fetchMeal(searchWithFilters);
      setMeals(mealList);
    } else {
      const drinkList = await fetchDrink(searchWithFilters);
      setDrinks(drinkList);
    }
  }

  useEffect(() => {
    async function handleSearchInit() {
      if (meals.length === 0) {
        const mealList = await fetchMeal({ nome: true, inputSearch: '' });
        setMeals(mealList);
      }
      if (drinks.length === 0) {
        const drinkList = await fetchDrink({ nome: true, inputSearch: '' });
        setDrinks(drinkList);
      }
    }
    handleSearchInit();
  }, [meals, drinks, setMeals, setDrinks]);

  console.log('SEARCH BAR');

  return (
    <div>
      <label htmlFor="inputText">
        Buscar por:
        <input
          id="inputText"
          data-testid="search-input"
          type="text"
          placeholder="digite..."
          name="inputSearch"
          value={ searchFilters.inputSearch }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="ingredient-search">
        Ingrediente
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient-search"
          name="search"
          value="ingrediente"
          onChange={ handleChangeCheck }
        />
      </label>
      <label htmlFor="name-search">
        Nome
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name-search"
          name="search"
          value="nome"
          onChange={ handleChangeCheck }
        />
      </label>
      <label htmlFor="first-letter-search">
        Primeira letra
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="first-letter-search"
          name="search"
          value="primeiraLetra"
          onChange={ handleChangeCheck }
        />
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => handleSearch(searchFilters) }
      >
        Busca
      </button>
    </div>
  );
}

export default SearchBar;
