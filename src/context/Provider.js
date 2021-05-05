import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import searchApi from '../services/RecipesApi';
import searchCategories from '../services/CategoriesApi';
import searchByCategory from '../services/CategoryApi';

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

  const addByCategory = async (typeRecipe, category) => {
    const byCategorySearch = await (searchByCategory(typeRecipe, category));
    setRecipes(byCategorySearch);
  };

  const [categories, setCategories] = useState([]);

  const addCategories = async (typeRecipe) => {
    const limitCat = 5;
    const categoriesSearch = await (searchCategories(typeRecipe));
    const arrayFilter = categoriesSearch.filter((cat, index) => index < limitCat);
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
    addByCategory,
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
