import React, { useEffect, useState } from 'react';
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
  const [recipesType, setRecipesType] = useState('meals');

  const changeRecipesType = (type) => {
    if (type !== recipesType) {
      setRecipesType(type);
    }
  };

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
      const newRecipeList = recipesResponse[recipesType];
      setRecipes({
        recipesList: newRecipeList.slice(0, listSize),
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

      const newCategoriesList = categoriesResponse[recipesType];

      setCategories({
        categoriesList: newCategoriesList.slice(0, categoriesSize),
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
    requestRecipes();
  }, [recipesType, category]);

  useEffect(() => {
    requestCategories();
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
