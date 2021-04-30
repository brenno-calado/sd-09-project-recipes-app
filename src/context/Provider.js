import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  const changeRecipesType = () => (
    location.pathname === '/bebidas'
      ? setRecipesType('drinks') : setRecipesType('meals')
  );

  const checkCategoryAndGetFood = () => (
    category === 'All'
      ? getFoodAll()
      : getFoodByCategory(category));

  const checkCategoryAndGetDrinks = () => (
    category === 'All'
      ? getDrinksAll()
      : getDrinksByCategory(category));

  const requestRecipes = async () => {
    try {
      const listSize = 12;
      setRecipes({ ...recipes, isFetching: true });
      const recipesResponse = recipesType === 'meals'
        ? await checkCategoryAndGetFood()
        : await checkCategoryAndGetDrinks();
      const newRecipeList = recipesResponse[recipesType].slice(0, listSize);
      setRecipes({
        recipesList: newRecipeList,
        isFetching: false,
      });
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
      const newCategoriesList = categoriesResponse[recipesType].slice(0, categoriesSize);
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
    category !== filterName ? setCategory(filterName) : cleanCategories()
  );

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
    recipesType,
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
