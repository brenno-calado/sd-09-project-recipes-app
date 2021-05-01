import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';
import {
  getDrinksAll,
  getDrinksByName,
  getDrinksByCategory,
  getDrinksCategories,
  getDrinksByIngredient,
  getDrinksByFirstLetter,
} from '../services/DrinksAPI';
import {
  getFoodAll,
  getFoodByName,
  getFoodByCategory,
  getFoodCategories,
  getFoodByIngredient,
  getFoodByFirstLetter,
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
  const [activeQuery, setActiveQuery] = useState({ query: '', filter: '' });
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

  const checkCategoryAndGetFood = () => (
    category === 'All' ? getFoodAll() : getFoodByCategory(category));

  const checkCategoryAndGetDrinks = () => (
    category === 'All' ? getDrinksAll() : getDrinksByCategory(category));

  const requestRecipes = async () => {
    try {
      const listSize = 12;
      setRecipes({ ...recipes, isFetching: true });
      const recipesResponse = recipesType === 'meals'
        ? await checkCategoryAndGetFood()
        : await checkCategoryAndGetDrinks();
      if (recipesResponse[recipesType]) {
        const newRecipeList = recipesResponse[recipesType].slice(0, listSize);
        setRecipes({
          recipesList: newRecipeList,
          isFetching: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestCategories = async () => {
    try {
      const categoriesSize = 5;
      setCategories({ ...categories, isFetching: true });
      const categoriesResponse = recipesType === 'meals'
        ? await getFoodCategories()
        : await getDrinksCategories();
      const newCategoriesList = categoriesResponse[recipesType]
        .slice(0, categoriesSize);
      setCategories({
        categoriesList: newCategoriesList,
        isFetching: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cleanCategories = () => {
    setCategory('All');
  };

  const handleFilter = (filterName) => (
    category !== filterName ? setCategory(filterName) : cleanCategories());

  const handleChange = ({ target }) => (
    setActiveQuery({ ...activeQuery, [target.name]: target.value }));

  const defaultAlert = () => (
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.'));

  const searchByName = async (query) => {
    setRecipes({ ...recipes, isFetching: true });
    const recipesResponse = recipesType === 'meals'
      ? await getFoodByName(query)
      : await getDrinksByName(query);
    const listSize = 12;
    if (!recipesResponse[recipesType]) {
      defaultAlert();
      setRecipes({ ...recipes, isFetching: false });
    } else if (recipesResponse && recipesResponse[recipesType].length > 1) {
      const newRecipeList = recipesResponse[recipesType].slice(0, listSize);
      setRecipes({ recipesList: newRecipeList, isFetching: false });
    } else {
      history.push(`
      ${location.pathname}
      /${recipesResponse[recipesType][0][`id${recipesTypeSufix}`]}`);
    }
  };

  const searchByIngredients = async (query) => {
    setRecipes({ ...recipes, isFetching: true });
    const recipesResponse = recipesType === 'meals'
      ? await getFoodByIngredient(query)
      : await getDrinksByIngredient(query);
    const listSize = 12;
    if (!recipesResponse[recipesType]) {
      defaultAlert();
      setRecipes({ ...recipes, isFetching: false });
    } else if (recipesResponse && recipesResponse[recipesType].length > 1) {
      const newRecipeList = recipesResponse[recipesType].slice(0, listSize);
      setRecipes({ recipesList: newRecipeList, isFetching: false });
    } else {
      history.push(
        `${location.pathname}/${
          recipesResponse[recipesType][0][`id${recipesTypeSufix}`]}`,
      );
    }
  };

  const searchByFirstLetter = async (query) => {
    if (query.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    setRecipes({ ...recipes, isFetching: true });
    const recipesResponse = recipesType === 'meals'
      ? await getFoodByFirstLetter(query)
      : await getDrinksByFirstLetter(query);
    const listSize = 12;
    if (!recipesResponse[recipesType]) {
      defaultAlert();
      setRecipes({ ...recipes, isFetching: false });
    } else if (recipesResponse && recipesResponse[recipesType].length > 1) {
      const newRecipeList = recipesResponse[recipesType].slice(0, listSize);
      setRecipes({ recipesList: newRecipeList, isFetching: false });
    } else {
      history.push(
        `${location.pathname}/${
          recipesResponse[recipesType][0][`id${recipesTypeSufix}`]}`,
      );
    }
  };

  const handleClick = () => {
    const { query, filter } = activeQuery;
    switch (filter) {
    case 'name':
      searchByName(query);
      break;
    case 'ingredient':
      searchByIngredients(query);
      break;
    case 'first-letter':
      searchByFirstLetter(query);
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    changeRecipesType();
    cleanCategories();
  }, [location]);

  useEffect(() => {
    if (recipesType) {
      requestRecipes();
    }
  }, [category, recipesType]);

  useEffect(() => {
    if (recipesType) {
      requestCategories();
    }
  }, [recipesType]);

  const contextValue = {
    recipes,
    categories,
    recipesTypeSufix,
    recipesType,
    handleClick,
    handleChange,
    handleFilter,
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
