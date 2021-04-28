import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';
import fetchMealApi from '../services/MealApi';
import fetchCocktailApi from '../services/CocktailApi';

const { Provider } = RecipesAppContext;

function RecipesAppProvider({ children }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [mealRecipes, setMealRecipes] = useState({});
  const [cocktailRecipes, setCocktailRecipes] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const handleClickShowSearchButton = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleSearchClick = async (inputs, pathname) => {
    const { searchText, filter } = inputs;
    let apiResponse = [];
    if ((filter === 'firstLetter') && (searchText.length > 1)) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    }
    if (pathname.includes('comidas')) {
      apiResponse = await fetchMealApi(inputs);
      setMealRecipes({ recipes: apiResponse });
    } else if (pathname.includes('bebidas')) {
      apiResponse = await fetchCocktailApi(inputs);
      setCocktailRecipes({ recipes: apiResponse });
    }
    if ((apiResponse === null) || (apiResponse === undefined)) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return;
    } else if (apiResponse.length === 1) {
      setRedirect(true);
    } else {
      setShowCards(true);
    }
  };

  const contextValue = {
    showSearchBar,
    mealRecipes,
    cocktailRecipes,
    redirect,
    showCards,
    handleClickShowSearchButton,
    handleSearchClick,
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
