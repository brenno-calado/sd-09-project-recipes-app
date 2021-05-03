import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import {
  getDrinksAll,
  getDrinksByCategory,
  getDrinksCategories,
} from '../services/DrinksAPI';
import {
  getFoodAll,
  getFoodByCategory,
  getFoodCategories,
} from '../services/FoodAPI';

const Provider = ({ children }) => {
  const [recipes, setRecipes] = useState({
    recipesList: [],
    isFetching: false,
  });
  const [categories, setCategories] = useState({
    categoriesList: [],
    isFetching: false,
  });
  const [category, setCategory] = useState('All');
  const [recipesType, setRecipesType] = useState('');
  const recipesTypeSufix = recipesType === 'meals' ? 'Meal' : 'Drink';
  const location = useLocation();
  const history = useHistory();

  const changeRecipesType = () => {
    switch (location.pathname) {
    case '/bebidas': setRecipesType('drinks');
      break;
    case '/comidas': setRecipesType('meals');
      break;
    default: setRecipesType(recipesType);
      break;
    }
  };

  const checkType = (foodRequest, drinkRequest, option) => {
    const response = recipesType === 'meals'
      ? foodRequest(option)
      : drinkRequest(option);

    return response;
  };

  const checkCategory = () => (
    category === 'All'
      ? checkType(getFoodAll, getDrinksAll)
      : checkType(getFoodByCategory, getDrinksByCategory, category)
  );

  const handleResponseFromSearch = (response) => {
    const listSize = 12;
    const responseList = response[recipesType];

    if (!responseList) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setRecipes({ ...recipes, isFetching: false });
    } else if (responseList.length === 1) {
      history.push(`\
${location.pathname}/${responseList[0][`id${recipesTypeSufix}`]}`);
    } else {
      const newRecipeList = responseList.slice(0, listSize);
      setRecipes({ recipesList: newRecipeList, isFetching: false });
    }
  };

  const requestLists = async () => {
    const recipeListSize = 12;
    const categoriesListSize = 5;

    setRecipes({ ...recipes, isFetching: true });
    setCategories({ ...categories, isFetching: true });

    const recipesResponse = await checkCategory();
    const categoriesResponse = await checkType(getFoodCategories, getDrinksCategories);

    if (recipesResponse[recipesType] && categoriesResponse[recipesType]) {
      const newRecipesList = recipesResponse[recipesType]
        .slice(0, recipeListSize);
      const newCategoriesList = categoriesResponse[recipesType]
        .slice(0, categoriesListSize);

      setRecipes({ recipesList: newRecipesList, isFetching: false });
      setCategories({ categoriesList: newCategoriesList, isFetching: false });
    }
  };

  const requestSearch = async (foodSearchRequest, drinkSearchRequest, query) => {
    setRecipes({ ...recipes, isFetching: true });
    const recipesResponse = await checkType(
      foodSearchRequest,
      drinkSearchRequest,
      query,
    );
    handleResponseFromSearch(recipesResponse);
  };

  const cleanCategories = () => {
    setCategory('All');
  };

  useEffect(() => {
    changeRecipesType();
    cleanCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    requestLists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, recipesType]);

  const contextValue = {
    recipes,
    category,
    categories,
    recipesTypeSufix,
    recipesType,
    setCategory,
    requestSearch,
    cleanCategories,
    changeRecipesType,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
