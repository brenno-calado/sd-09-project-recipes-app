import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import searchApi from '../services/RecipesApi';
import searchCategories from '../services/CategoriesApi';

const Provider = ({ children }) => {
  const [displaySearchBar, changeStatus] = useState({ status: false });

  const statusSearchBar = () => {
    const { status } = displaySearchBar;
    changeStatus({
      status: !status,
    });
  };

  const searchBarInit = {
    text: '',
    radio: 'ingredient',
    seachClicked: false,
  };

  const [searchBar, setSearchBar] = useState(searchBarInit);

  const addSearchBar = (text, radio, seachClicked) => {
    setSearchBar({
      text,
      radio,
      seachClicked,
    });
  };

  const [recipes, setRecipes] = useState([]);

  const addRecipes = async (typeRecipe, typeSearch, itemSearch) => {
    const recipesSearch = await (searchApi(typeRecipe, typeSearch, itemSearch));
    setRecipes(recipesSearch);
  };

  const [categories, setCategories] = useState([]);

  const addCategories = async (typeCategory) => {
    const limitCat = 5;
    const categoriesSearch = await (searchCategories(typeCategory));
    const arrayFilter = categoriesSearch.filter((category, index) => index < limitCat);
    setCategories(arrayFilter);
  };

  const context = {
    displaySearchBar,
    statusSearchBar,
    searchBar,
    addSearchBar,
    recipes,
    addRecipes,
    categories,
    addCategories,
  };

  return (
    <RecipesContext.Provider
      value={ context }
    >
      { children }
    </RecipesContext.Provider>

  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
