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

  const checkFoodCategory = () => (
    category === 'All' ? getFoodAll() : getFoodByCategory(category)
  );

  const checkDrinksCategory = () => (
    category === 'All' ? getDrinksAll() : getDrinksByCategory(category)
  );

  const checkType = (foodRequest, drinkRequest, option) => {
    const response = recipesType === 'meals'
      ? foodRequest(option)
      : drinkRequest(option);

    return response;
  };

  const handleResponseFromSearch = (response) => {
    const listSize = 12;
    if (!response[recipesType]) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setRecipes({ ...recipes, isFetching: false });
    } else if (response && response[recipesType].length === 1) {
      history.push(`\
${location.pathname}/${response[recipesType][0][`id${recipesTypeSufix}`]}`);
    }
    const newRecipeList = response[recipesType].slice(0, listSize);
    setRecipes({ recipesList: newRecipeList, isFetching: false });
  };

  const requestRecipes = async () => {
    const listSize = 12;
    try {
      setRecipes({ ...recipes, isFetching: true });
      const recipesResponse = await checkType(checkFoodCategory, checkDrinksCategory);
      if (recipesResponse[recipesType]) {
        const newResponseList = recipesResponse[recipesType].slice(0, listSize);
        setRecipes({ recipesList: newResponseList, isFetching: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestCategories = async () => {
    const listSize = 5;
    try {
      setRecipes({ ...recipes, isFetching: true });
      const categoriesResponse = await checkType(getFoodCategories, getDrinksCategories);
      if (categoriesResponse[recipesType]) {
        const newResponseList = categoriesResponse[recipesType].slice(0, listSize);
        setCategories({ categoriesList: newResponseList, isFetching: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestSearch = async (foodSearchRequest, drinkSearchRequest, query) => {
    try {
      setRecipes({ ...recipes, isFetching: true });
      const recipesResponse = await checkType(
        foodSearchRequest,
        drinkSearchRequest,
        query,
      );
      handleResponseFromSearch(recipesResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const cleanCategories = () => {
    setCategory('All');
  };

  useEffect(() => {
    changeRecipesType();
    cleanCategories();
  }, [location]);

  useEffect(() => {
    requestRecipes();
  }, [category, recipesType]);

  useEffect(() => {
    requestCategories();
  }, [recipesType]);

  const contextValue = {
    recipes,
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
