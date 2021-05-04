import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';
import {
  fetchMealApi,
  fetchMealsCategories,
  fetchMealsByCategory,
  fetchMealsList,
} from '../services/MealApi';
import {
  fetchCocktailApi,
  fetchCocktailsCategories,
  fetchCocktailsByCategory,
  fetchCocktailsList,
} from '../services/CocktailApi';

const { Provider } = RecipesAppContext;

function RecipesAppProvider({ children }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [mealsRecipes, setMealsRecipes] = useState([]);
  const [cocktailsRecipes, setCocktailsRecipes] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [cocktailsCategories, setCocktailsCategories] = useState([]);
  const [mealsBkp, setMealsBkp] = useState([]);
  const [cocktailsBkp, setCocktailsBkp] = useState([]);
  const [mealCategoryBkp, setMealCategoryBkp] = useState(null);
  const [cocktailCategoryBkp, setCocktailCategoryBkp] = useState(null);

  const handleSearchClick = async (inputs, pathname) => {
    const { searchText, filter } = inputs;
    let apiResponse = [];
    if ((filter === 'firstLetter') && (searchText.length > 1)) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }
    setIsFetching(true);
    if (pathname.includes('comidas')) {
      apiResponse = await fetchMealApi(inputs);
      setMealsRecipes(apiResponse);
    } else if (pathname.includes('bebidas')) {
      apiResponse = await fetchCocktailApi(inputs);
      setCocktailsRecipes(apiResponse);
    }
    if ((apiResponse === null) || (apiResponse === undefined)) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setIsFetching(false);
    } else if (apiResponse.length === 1) {
      setRedirect(true);
      setIsFetching(false);
    } else {
      setIsFetching(false);
    }
  };

  const getRecipes = async () => {
    const apiMealsResponse = await fetchMealsList();
    const apiCocktailsResponse = await fetchCocktailsList();
    setMealsRecipes(apiMealsResponse);
    setMealsBkp(apiMealsResponse);
    setCocktailsRecipes(apiCocktailsResponse);
    setCocktailsBkp(apiCocktailsResponse);
    setIsFetching(false);
  };

  const getCategories = async () => {
    const apiMealsResponse = await fetchMealsCategories();
    setMealsCategories(apiMealsResponse);
    const apiCocktailsResponse = await fetchCocktailsCategories();
    setCocktailsCategories(apiCocktailsResponse);
  };

  const handleMealCategoryClick = async ({ target: { innerText } }) => {
    setMealCategoryBkp(innerText);
    if (innerText === 'All') {
      setMealsRecipes(mealsBkp);
    } else if (mealCategoryBkp !== innerText) {
      setIsFetching(true);
      const apiRespone = await fetchMealsByCategory(innerText);
      setMealsRecipes(apiRespone);
      setIsFetching(false);
    } else {
      setMealsRecipes(mealsBkp);
      setMealCategoryBkp(null);
    }
  };

  const handleCocktailCategoryClick = async ({ target: { innerText } }) => {
    setCocktailCategoryBkp(innerText);
    if (innerText === 'All') {
      setCocktailsRecipes(cocktailsBkp);
    } else if (cocktailCategoryBkp !== innerText) {
      setIsFetching(true);
      const apiRespone = await fetchCocktailsByCategory(innerText);
      setCocktailsRecipes(apiRespone);
      setIsFetching(false);
    } else {
      setCocktailsRecipes(cocktailsBkp);
      setCocktailCategoryBkp(null);
    }
  };

  useEffect(() => {
    getRecipes();
    getCategories();
  }, []);

  const contextValue = {
    showSearchBar,
    mealsRecipes,
    cocktailsRecipes,
    redirect,
    isFetching,
    mealsCategories,
    cocktailsCategories,
    setShowSearchBar,
    handleSearchClick,
    handleMealCategoryClick,
    handleCocktailCategoryClick,
  };

  return (
    <Provider value={ contextValue }>
      { children }
    </Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesAppProvider;
